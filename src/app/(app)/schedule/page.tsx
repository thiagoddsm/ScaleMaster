"use client"

import React, { useState, useTransition } from 'react';
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
import { Loader2 } from 'lucide-react';
import { getDaysInMonth, startOfMonth, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { smartScheduleGeneration } from '@/ai/flows/smart-schedule-generation';
import { events as allEvents, volunteers, teamSchedules, areasOfService } from '@/lib/data';
import type { GeneratedSchedule, MonthlyEvent } from '@/lib/types';


const scheduleSchema = z.object({
  month: z.string().min(1, "Mês é obrigatório"),
  year: z.string().min(4, "Ano inválido").max(4, "Ano inválido"),
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
    const firstDayOfMonth = startOfMonth(new Date(year, month - 1));

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
                const eventDate = parseISO(event.date + 'T12:00:00Z');
                if (eventDate.getUTCDate() === day && eventDate.getUTCMonth() === month - 1 && eventDate.getUTCFullYear() === year) {
                    eventHappensToday = true;
                }
            }

            if (eventHappensToday) {
                const formattedDate = format(currentDate, 'dd/MM');
                monthlyEvents.push({
                    date: currentDate,
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
    },
  });
  
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
          areasOfService: JSON.stringify(areasOfService.map(a => a.name))
        });
        
        const generatedSchedule = JSON.parse(result.schedule);
        setSchedule(generatedSchedule);
        toast({
          title: "Escala Gerada!",
          description: "A escala inteligente foi gerada com sucesso.",
          className: "bg-primary text-primary-foreground",
        });

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
        <p className="text-muted-foreground">Selecione o mês e o ano para gerar uma nova escala otimizada.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seleção de Período</CardTitle>
          <CardDescription>Escolha o mês e o ano para a escala.</CardDescription>
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
          <CardHeader>
            <CardTitle>Escala Gerada</CardTitle>
            <CardDescription>
              Escala de {months.find(m => m.value === form.getValues().month)?.label} de {form.getValues().year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="sticky left-0 bg-background/95 backdrop-blur-sm w-[150px]">Área</TableHead>
                    {monthlyEvents.map((event, index) => (
                      <TableHead key={index} className="text-center whitespace-nowrap">
                        <div className="font-bold">{format(event.date, 'dd/MM')}</div>
                        <div className="text-xs font-normal">{format(event.date, 'EEEE', {locale: ptBR})}</div>
                        <div className="text-sm font-normal">{event.name}</div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {areasOfService.map(area => (
                    <TableRow key={area.name}>
                      <TableCell className="font-semibold sticky left-0 bg-background/95 backdrop-blur-sm w-[150px]">{area.name}</TableCell>
                      {monthlyEvents.map((event, index) => {
                        const scheduleKey = `${event.uniqueName} - ${area.name}`;
                        const volunteer = schedule[scheduleKey];
                        const needsVolunteer = event.areas.includes(area.name);

                        return (
                          <TableCell key={index} className={`text-center ${!needsVolunteer ? 'bg-muted/30' : ''}`}>
                            {needsVolunteer ? (
                                <span className={volunteer ? 'font-medium' : 'text-muted-foreground italic'}>
                                    {volunteer || 'Não alocado'}
                                </span>
                            ) : null}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
