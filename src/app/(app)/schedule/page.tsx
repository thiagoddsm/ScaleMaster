"use client"

import React, { useState, useTransition, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { getDaysInMonth, set, format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { smartScheduleGeneration } from '@/ai/flows/smart-schedule-generation';
import { events as allEvents, volunteers, teamSchedules, areasOfService as allAreas, savedSchedules } from '@/lib/data';
import type { GeneratedSchedule, MonthlyEvent, Volunteer, SavedSchedule } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const scheduleSchema = z.object({
  month: z.string().min(1, "Mês é obrigatório"),
  year: z.string().min(4, "Ano inválido").max(4, "Ano inválido"),
  area: z.string().optional(),
});

const months = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
}));

const weekDaysMap: { [key: string]: number } = {
  "Domingo": 0, "Segunda-feira": 1, "Terça-feira": 2, "Quarta-feira": 3, "Quinta-feira": 4, "Sexta-feira": 5, "Sábado": 6
};

const getEventsForMonth = (month: number, year: number): MonthlyEvent[] => {
  const monthlyEvents: MonthlyEvent[] = [];
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month - 1, day);
    const currentDayOfWeek = currentDate.getDay();

    allEvents.forEach(event => {
      let eventHappensToday = false;

      if (event.frequency === 'Semanal') {
        if (weekDaysMap[event.dayOfWeek!] === currentDayOfWeek) {
          eventHappensToday = true;
        }
      } else if (event.frequency === 'Pontual' && event.date) {
        const [eventYear, eventMonth, eventDay] = event.date.split('-').map(Number);
        if (eventYear === year && eventMonth === month && eventDay === day) {
            eventHappensToday = true;
        }
      }

      if (eventHappensToday) {
        const [hours, minutes] = event.time.split(':').map(Number);
        const eventDateWithTime = set(currentDate, { hours, minutes, seconds: 0, milliseconds: 0 });
        const formattedDate = format(eventDateWithTime, 'dd/MM');
        monthlyEvents.push({
          date: eventDateWithTime,
          name: event.name,
          areas: event.areas,
          uniqueName: `${event.name} - ${formattedDate}`
        });
      }
    });
  }
  return monthlyEvents.sort((a,b) => a.date.getTime() - b.date.getTime());
};


export default function SchedulePage() {
  const [isPending, startTransition] = useTransition();
  const [schedule, setSchedule] = useState<GeneratedSchedule | null>(null);
  const [monthlyEvents, setMonthlyEvents] = useState<MonthlyEvent[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof scheduleSchema>>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      month: (new Date().getMonth() + 1).toString(),
      year: new Date().getFullYear().toString(),
      area: 'all',
    },
  });

  const selectedArea = form.watch('area');

  const areasForTable = useMemo(() => {
    if (selectedArea && selectedArea !== 'all') {
      return allAreas.filter(a => a.name === selectedArea);
    }
    return allAreas;
  }, [selectedArea]);

  const getEligibleVolunteers = (areaName: string): Volunteer[] => {
    return volunteers
      .filter(v => v.areas.includes(areaName))
      .sort((a,b) => a.name.localeCompare(b.name));
  };

  const handleManualChange = (scheduleKey: string, volunteerName: string | null) => {
    setSchedule(prev => {
        if (!prev) return null;
        const newSchedule = {...prev};
        
        newSchedule[scheduleKey] = {
            volunteer: volunteerName,
            reason: volunteerName ? null : "Manualmente removido"
        };
        
        return newSchedule;
    });
  };

  const handleSaveSchedule = () => {
    if (!schedule || !monthlyEvents.length) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não há escala para salvar.' });
      return;
    }
    const { month, year } = form.getValues();
    const newSavedSchedule: SavedSchedule = {
      id: `${year}-${month}-${new Date().getTime()}`,
      month: parseInt(month),
      year: parseInt(year),
      areaFilter: selectedArea === 'all' ? 'Todas' : selectedArea!,
      createdAt: new Date(),
      schedule,
      monthlyEvents,
    };
    
    // In a real app, this would be an API call.
    // For this prototype, we're pushing to an in-memory array.
    savedSchedules.push(newSavedSchedule);
    
    toast({
      title: 'Escala Salva!',
      description: `A escala de ${months.find(m => m.value === month)?.label} de ${year} foi salva.`,
      className: "bg-primary text-primary-foreground",
    });
  };
  
  function onSubmit(data: z.infer<typeof scheduleSchema>) {
    setSchedule(null);
    startTransition(async () => {
      try {
        const month = parseInt(data.month);
        const year = parseInt(data.year);
        
        const currentMonthlyEvents = getEventsForMonth(month, year);
        setMonthlyEvents(currentMonthlyEvents);

        if (currentMonthlyEvents.length === 0) {
            toast({ title: "Nenhum evento", description: "Não há eventos para o mês selecionado." });
            return;
        }

        const eventsData = JSON.stringify(currentMonthlyEvents.map(e => ({
            name: e.uniqueName,
            areas: e.areas,
            date: format(e.date, 'yyyy-MM-dd')
        })));
        
        const result = await smartScheduleGeneration({
          month: month,
          year: year,
          eventsData,
          volunteersData: JSON.stringify(volunteers),
          teamsScheduleData: JSON.stringify(teamSchedules),
          areasOfService: JSON.stringify(allAreas.map(a => a.name)),
          specificArea: data.area !== 'all' ? data.area : undefined,
        });

        // Transform the array of assignments into the schedule map format
        const generatedSchedule: GeneratedSchedule = {};
        if (result && result.assignments) {
          result.assignments.forEach(assignment => {
              const key = `${assignment.eventUniqueName} - ${assignment.area} - ${assignment.position}`;
              generatedSchedule[key] = {
                  volunteer: assignment.volunteer ?? null,
                  reason: assignment.reason ?? (assignment.volunteer ? null : "Não foi possível alocar"),
              };
          });
        }
        
        if (Object.keys(generatedSchedule).length === 0) {
             toast({
              variant: "default",
              title: "Nenhuma alocação necessária",
              description: data.area !== 'all' ? `Nenhum voluntário precisava ser alocado para a área de "${data.area}" neste mês.` : "Nenhuma alocação foi necessária para o período selecionado.",
            });
        } else {
            toast({
              title: "Escala Gerada!",
              description: "A escala inteligente foi gerada com sucesso.",
              className: "bg-primary text-primary-foreground",
            });
        }
        setSchedule(generatedSchedule);

      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Erro ao gerar escala",
          description: "Ocorreu um erro ao se comunicar com a IA. Tente novamente.",
        });
      }
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerar Escala Inteligente</h1>
        <p className="text-muted-foreground">Selecione o período e a área para gerar uma nova escala otimizada.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleção de Período e Área</CardTitle>
          <CardDescription>Escolha o mês, o ano e a área para a escala.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4 items-end">
              <FormField control={form.control} name="month" render={({ field }) => (
                <FormItem className="w-full md:w-auto md:flex-1">
                  <FormLabel>Mês</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione o mês" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="year" render={({ field }) => (
                <FormItem className="w-full md:w-auto md:flex-1">
                  <FormLabel>Ano</FormLabel>
                  <FormControl><Input type="number" placeholder="AAAA" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="area" render={({ field }) => (
                <FormItem className="w-full md:w-auto md:flex-1">
                  <FormLabel>Área de Serviço</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Selecione a área" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="all">Todas as Áreas</SelectItem>
                      {allAreas.map(a => <SelectItem key={a.name} value={a.name}>{a.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isPending} className="w-full md:w-auto">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Gerar Escala
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isPending && (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Gerando escala, isso pode levar alguns instantes...</p>
        </div>
      )}

      {schedule && monthlyEvents.length > 0 && (
        <Card>
           <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Escala Gerada</CardTitle>
              <CardDescription>
                Escala de {months.find(m => m.value === form.getValues().month)?.label} de {form.getValues().year}. Clique em um voluntário para editar.
              </CardDescription>
            </div>
             <Button onClick={handleSaveSchedule} variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Salvar Escala
             </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 bg-background/95 backdrop-blur-sm z-10 w-[150px]">Área</TableHead>
                    {monthlyEvents.map((event, index) => (
                      <TableHead key={index} className="text-center whitespace-nowrap capitalize w-40">
                        <div className="font-bold">{format(event.date, 'dd/MM')}</div>
                        <div className="text-xs font-normal">{format(event.date, 'EEEE', {locale: ptBR})}</div>
                        <div className="text-sm font-normal">{event.name}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areasForTable.map(area => {
                    // Determine the max number of volunteers needed for this area across all events in the month
                    const maxVolunteers = Math.max(1, ...monthlyEvents.map(event =>
                        event.areas.find(a => a.name === area.name)?.volunteersNeeded || 0
                    ));

                    return Array.from({ length: maxVolunteers }).map((_, i) => (
                        <TableRow key={`${area.name}-${i}`}>
                        <TableCell className="font-semibold sticky left-0 bg-background/95 backdrop-blur-sm z-10 w-[150px]">
                            {area.name} {maxVolunteers > 1 && `(${i + 1})`}
                        </TableCell>
                        {monthlyEvents.map((event, index) => {
                            const eventAreaInfo = event.areas.find(a => a.name === area.name);
                            const needsVolunteer = eventAreaInfo && eventAreaInfo.volunteersNeeded > i;
                            
                            if (!needsVolunteer) {
                                return (
                                  <TableCell key={index} className="bg-muted/30 text-center">
                                    <span className="text-xs text-muted-foreground italic">(Área não requerida)</span>
                                  </TableCell>
                                );
                            }

                            const scheduleKey = `${event.uniqueName} - ${area.name} - ${i + 1}`;
                            const scheduleSlot = schedule[scheduleKey];
                            const volunteerName = scheduleSlot?.volunteer?.replace(/,$/, '') || null;
                            const isGarbage = volunteerName && (volunteerName.includes("if available") || volunteerName.includes("null;"));
                            const finalVolunteerName = isGarbage ? null : volunteerName;
                            const reason = scheduleSlot?.reason;
                            const eligibleVolunteers = getEligibleVolunteers(area.name);
                            
                            return (
                            <TableCell key={index} className="text-center">
                                {scheduleSlot ? (
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-auto p-1 text-left font-normal w-full justify-center flex-col">
                                    <span className={finalVolunteerName ? 'font-medium' : 'text-muted-foreground italic'}>
                                        {finalVolunteerName || 'Não alocado'}
                                    </span>
                                     {reason && (
                                        <span className="text-xs text-muted-foreground italic">({reason})</span>
                                    )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <DropdownMenuItem onClick={() => handleManualChange(scheduleKey, null)}>
                                        Não alocado
                                    </DropdownMenuItem>
                                    {eligibleVolunteers.map(v => (
                                    <DropdownMenuItem 
                                        key={v.id} 
                                        onClick={() => handleManualChange(scheduleKey, v.name)}
                                        disabled={v.name === volunteerName}
                                        >
                                        {v.name}
                                    </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                                </DropdownMenu>
                                ) : (
                                    <div className="flex-col">
                                        <span className='text-muted-foreground italic'>Não alocado</span>
                                        <span className="text-xs text-muted-foreground italic block">(Não foi possível alocar)</span>
                                    </div>
                                )}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    ));
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

    

