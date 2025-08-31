"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Wand2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getDaysInMonth, getDay, getDate, isWithinInterval, parseISO } from 'date-fns';
import { useAppData } from '@/context/AppDataContext';
import type { Volunteer, ScheduleSlot, SavedSchedule, GenerateScheduleOutput } from '@/lib/types';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function SchedulePage() {
  const { toast } = useToast();
  const router = useRouter();
  const { volunteers, events, teams, teamSchedules, saveSchedule } = useAppData();
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);
  const [isAutoFillConfirmOpen, setIsAutoFillConfirmOpen] = useState(false);


  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' }) }));

  const monthLabel = useMemo(() => {
    return months.find(m => m.value === month)?.label || '';
  }, [month, months]);
  
  const getTeamForDate = (date: Date): string | null => {
    const schedule = teamSchedules.find(s => 
        isWithinInterval(date, { start: parseISO(s.startDate), end: parseISO(s.endDate) })
    );
    return schedule ? schedule.team : teams[0]?.name || null;
  }

  const generateManualScheduleSkeleton = () => {
    setIsGenerating(true);
    setScheduleSlots([]);
    const y = parseInt(year);
    const m = parseInt(month) - 1;
    const daysInMonth = getDaysInMonth(new Date(y, m));
    const slots: ScheduleSlot[] = [];

    // Expand weekly events
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(Date.UTC(y, m, day));
        const dayOfWeek = weekDays[getDay(currentDate)];
        const teamForDate = getTeamForDate(currentDate);

        events.filter(e => e.frequency === 'Semanal' && e.dayOfWeek === dayOfWeek)
            .forEach(event => {
                event.areas.forEach(area => {
                    for (let i = 0; i < area.volunteersNeeded; i++) {
                        slots.push({
                            date: currentDate,
                            dayOfWeek: dayOfWeek,
                            event: event.name,
                            eventId: event.id,
                            area: area.name,
                            team: teamForDate,
                            volunteerId: null,
                            slotKey: `${event.id}-${area.name}-${day}-${i}`
                        });
                    }
                });
            });
    }
    
    // Add punctual events
     events.filter(e => e.frequency === 'Pontual' && e.date).forEach(event => {
        const eventDate = parseISO(event.date + 'T00:00:00');
        if (eventDate.getFullYear() === y && eventDate.getMonth() === m) {
            const dayOfWeek = weekDays[getDay(eventDate)];
            const teamForDate = getTeamForDate(eventDate);
             event.areas.forEach(area => {
                for (let i = 0; i < area.volunteersNeeded; i++) {
                     slots.push({
                        date: eventDate,
                        dayOfWeek: dayOfWeek,
                        event: event.name,
                        eventId: event.id,
                        area: area.name,
                        team: teamForDate,
                        volunteerId: null,
                        slotKey: `${event.id}-${area.name}-${getDate(eventDate)}-${i}`
                    });
                }
            });
        }
    });

    slots.sort((a,b) => a.date.getTime() - b.date.getTime() || a.event.localeCompare(b.event) || a.area.localeCompare(b.area));
    setScheduleSlots(slots);
    setIsGenerating(false);
  };
  
  const handleVolunteerChange = (slotKey: string, volunteerId: string) => {
    setScheduleSlots(prev => 
      prev.map(slot => slot.slotKey === slotKey ? { ...slot, volunteerId } : slot)
    );
  };
  
  const getEligibleVolunteers = (areaName: string, teamName: string | null, eventName: string): Volunteer[] => {
    return volunteers
      .filter(v => 
        v.areas.includes(areaName) &&
        (v.team === teamName || v.team === 'N/A' || !teamName) &&
        v.availability.includes(eventName)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleAutoFill = () => {
    const serviceCount: { [key: string]: number } = {};
    volunteers.forEach(v => serviceCount[v.id] = 0);

    const filledSlots = scheduleSlots.map(slot => {
        // If a volunteer is already assigned, keep them.
        if (slot.volunteerId) {
            return slot;
        }
      
      const eligible = getEligibleVolunteers(slot.area, slot.team, slot.event);
      if (eligible.length === 0) {
        return { ...slot, volunteerId: null };
      }

      // Filter out volunteers already assigned to this specific event instance
      const assignedInEvent = scheduleSlots
        .filter(s => s.date.getTime() === slot.date.getTime() && s.event === slot.event && s.volunteerId)
        .map(s => s.volunteerId);

      const available = eligible.filter(v => !assignedInEvent.includes(v.id));
      if (available.length === 0) {
        return { ...slot, volunteerId: null };
      }

      // Sort by service count (asc) and then by name for deterministic tie-breaking
      available.sort((a, b) => {
        const countA = serviceCount[a.id] || 0;
        const countB = serviceCount[b.id] || 0;
        if (countA !== countB) {
          return countA - countB;
        }
        return a.name.localeCompare(b.name);
      });

      const bestCandidate = available[0];
      serviceCount[bestCandidate.id]++;
      
      return { ...slot, volunteerId: bestCandidate.id };
    });

    setScheduleSlots(filledSlots);
    setIsAutoFillConfirmOpen(false);
    toast({
        title: "Escala Preenchida!",
        description: "As vagas foram preenchidas automaticamente com base nas regras."
    });
  };

  const handleSaveSchedule = () => {
    const title = `Escala de ${monthLabel} de ${year}`;
    
    const scheduleData = scheduleSlots.reduce((acc, slot) => {
        const dateStr = slot.date.toISOString().split('T')[0];
        let dayEntry = acc.find(d => d.date === dateStr);
        if (!dayEntry) {
            dayEntry = { date: dateStr, dayOfWeek: slot.dayOfWeek, assignments: [] };
            acc.push(dayEntry);
        }

        const volunteer = volunteers.find(v => v.id === slot.volunteerId);
        dayEntry.assignments.push({
            evento: slot.event,
            area: slot.area,
            equipe: slot.team,
            voluntario_alocado: volunteer?.name || null,
            status: volunteer ? "Preenchida" : "Falha",
            motivo: volunteer ? null : "Nenhum voluntário atribuído"
        });

        return acc;
    }, [] as GenerateScheduleOutput['scheduleData']);
    
    scheduleData.sort((a,b) => a.date.localeCompare(b.date));

    const finalData: GenerateScheduleOutput = {
        scaleTable: "Gerado manualmente",
        report: {
            fillRate: "",
            volunteerDistribution: "",
            bottlenecks: "",
            recommendations: "Escala gerada manualmente. Análise não aplicável.",
        },
        scheduleData,
    };
    
    const newSavedSchedule: SavedSchedule = {
        id: `sched_${new Date().getTime()}`,
        title: title,
        createdAt: new Date().toISOString(),
        year: parseInt(year),
        month: parseInt(month),
        data: finalData,
    };

    saveSchedule(newSavedSchedule);
    
    toast({
      title: 'Escala Salva!',
      description: `A escala para ${monthLabel} de ${year} foi salva com sucesso.`,
    });

    router.push('/schedules');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Montar Escala</h1>
        <p className="text-muted-foreground">
          Selecione o período, monte o esqueleto da escala e preencha as vagas manualmente ou automaticamente.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Período da Escala</CardTitle>
          <CardDescription>
            Escolha o mês e ano para montar a escala.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="month-select" className="text-sm font-medium">Mês</label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger id="month-select">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label htmlFor="year-select" className="text-sm font-medium">Ano</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={generateManualScheduleSkeleton} disabled={isGenerating} className="w-full sm:w-auto">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Montando...
                </>
              ) : (
                'Montar Esqueleto'
              )}
            </Button>
             <Button 
              onClick={() => setIsAutoFillConfirmOpen(true)} 
              disabled={scheduleSlots.length === 0}
              variant="outline"
              className="w-full sm:w-auto"
            >
                <Wand2 className="mr-2 h-4 w-4" />
                Preencher Auto.
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {scheduleSlots.length > 0 && (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Escala para {monthLabel} de {year}</CardTitle>
                    <CardDescription>Atribua um voluntário para cada vaga necessária.</CardDescription>
                </div>
                <Button onClick={handleSaveSchedule}>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Escala
                </Button>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Evento</TableHead>
                                <TableHead>Área</TableHead>
                                <TableHead>Equipe</TableHead>
                                <TableHead className="w-[250px]">Voluntário</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {scheduleSlots.map((slot) => {
                                const eligibleVolunteers = getEligibleVolunteers(slot.area, slot.team, slot.event);
                                return (
                                <TableRow key={slot.slotKey}>
                                    <TableCell>
                                        <div className="font-medium">{slot.date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
                                        <div className="text-sm text-muted-foreground">{slot.dayOfWeek}</div>
                                    </TableCell>
                                    <TableCell>{slot.event}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{slot.area}</Badge>
                                    </TableCell>
                                     <TableCell>
                                        {slot.team && <Badge variant="secondary">{slot.team}</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            value={slot.volunteerId ?? ''}
                                            onValueChange={(volunteerId) => handleVolunteerChange(slot.slotKey, volunteerId)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um voluntário" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {eligibleVolunteers.length > 0 ? (
                                                  eligibleVolunteers.map(v => (
                                                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                                                  ))
                                                ) : (
                                                  <SelectItem value="none" disabled>Nenhum voluntário elegível</SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                           )})}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
      )}

      <AlertDialog open={isAutoFillConfirmOpen} onOpenChange={setIsAutoFillConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Preencher Automaticamente?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação tentará preencher todas as vagas vazias com os voluntários mais elegíveis, respeitando as regras de rodízio e disponibilidade. As atribuições manuais existentes não serão alteradas. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAutoFill}>Sim, Preencher</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
