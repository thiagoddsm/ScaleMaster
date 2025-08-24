"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { getDaysInMonth, getDay, getDate, isWithinInterval, parseISO } from 'date-fns';
import { useAppData } from '@/context/AppDataContext';
import type { Volunteer } from '@/lib/types';

type ScheduleSlot = {
  date: Date;
  dayOfWeek: string;
  event: string;
  eventId: string;
  area: string;
  team: string | null;
  volunteerId: string | null;
  slotKey: string;
};

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function SchedulePage() {
  const { toast } = useToast();
  const { volunteers, events, teamSchedules } = useAppData();
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [isGenerating, setIsGenerating] = useState(false);
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>([]);

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' }) }));

  const monthLabel = useMemo(() => {
    return months.find(m => m.value === month)?.label || '';
  }, [month, months]);
  
  const getTeamForDate = (date: Date): string | null => {
    const schedule = teamSchedules.find(s => 
        isWithinInterval(date, { start: parseISO(s.startDate), end: parseISO(s.endDate) })
    );
    return schedule ? schedule.team : 'Alpha'; // Default to Alpha as per rule
  }

  const generateManualScheduleSkeleton = () => {
    setIsGenerating(true);
    const y = parseInt(year);
    const m = parseInt(month) - 1;
    const daysInMonth = getDaysInMonth(new Date(y, m));
    const slots: ScheduleSlot[] = [];

    // Expand weekly events
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(y, m, day);
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
        const eventDate = new Date(event.date + 'T12:00:00Z');
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

    slots.sort((a,b) => a.date.getTime() - b.date.getTime());
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
        (v.team === teamName || v.team === 'N/A') && // Also include volunteers not in a specific team
        v.availability.includes(eventName)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleSaveSchedule = () => {
    // This is where you would implement the logic to save the manually created schedule.
    // For now, it will just show a toast.
    console.log("Saving schedule:", scheduleSlots);
    toast({
      title: 'Funcionalidade em Desenvolvimento',
      description: 'A lógica para salvar a escala manual ainda não foi implementada.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Montar Escala Manual</h1>
        <p className="text-muted-foreground">
          Selecione o período e preencha as vagas para cada evento manualmente.
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
          <div className="flex items-end">
            <Button onClick={generateManualScheduleSkeleton} disabled={isGenerating} className="w-full sm:w-auto">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Montando...
                </>
              ) : (
                'Montar Escala Manual'
              )}
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
                                        <div className="font-medium">{slot.date.toLocaleDateString('pt-BR')}</div>
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
    </div>
  );
}
