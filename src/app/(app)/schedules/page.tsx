"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { savedSchedules as initialSavedSchedules, events as allEvents, areasOfService as allAreas, teams as allTeams } from '@/lib/data';
import type { SavedSchedule, ScheduleAssignment } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function SchedulesPage() {
  const [schedules] = useState<SavedSchedule[]>(initialSavedSchedules);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [dayOfWeekFilter, setDayOfWeekFilter] = useState("all");
  const [eventFilter, setEventFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");


  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' }) }));

  const filteredAssignments = useMemo(() => {
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month);

    const relevantSchedules = schedules.filter(s => s.year === numericYear && s.month === numericMonth);
    
    if (relevantSchedules.length === 0) {
        return [];
    }

    const allAssignments: ScheduleAssignment[] = relevantSchedules.flatMap(s => 
        s.data.scheduleData.flatMap(day => 
            day.assignments.map(assignment => ({
                ...assignment,
                fullDate: day.date,
                dayOfWeek: day.dayOfWeek,
            }))
        )
    );

    const sortedAssignments = allAssignments.sort((a, b) => {
        if (a.fullDate < b.fullDate) return -1;
        if (a.fullDate > b.fullDate) return 1;
        if (a.evento < b.evento) return -1;
        if (a.evento > b.evento) return 1;
        if (a.area < b.area) return -1;
        if (a.area > b.area) return 1;
        return 0;
    });

    return sortedAssignments.filter(assignment => {
        const searchTermLower = searchTerm.toLowerCase();
        const searchMatch = !searchTerm ||
            assignment.evento.toLowerCase().includes(searchTermLower) ||
            assignment.area.toLowerCase().includes(searchTermLower) ||
            (assignment.voluntario_alocado || '').toLowerCase().includes(searchTermLower) ||
            (assignment.motivo || '').toLowerCase().includes(searchTermLower);

        const dayOfWeekMatch = dayOfWeekFilter === 'all' || assignment.dayOfWeek === dayOfWeekFilter;
        const eventMatch = eventFilter === 'all' || assignment.evento === eventFilter;
        const areaMatch = areaFilter === 'all' || assignment.area === areaFilter;
        const teamMatch = teamFilter === 'all' || assignment.equipe === teamFilter;

        return searchMatch && dayOfWeekMatch && eventMatch && areaMatch && teamMatch;
    });

  }, [schedules, year, month, searchTerm, dayOfWeekFilter, eventFilter, areaFilter, teamFilter]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Escalas Salvas</h1>
        <p className="text-muted-foreground">Consulte as escalas unificadas para um mês e ano específicos.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Filtrar Período</CardTitle>
          <CardDescription>
            Selecione o mês e o ano para visualizar a escala consolidada.
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
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle>Filtros Avançados</CardTitle>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
               <div className="relative w-full md:flex-1">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input
                    type="search"
                    placeholder="Buscar por evento, área, voluntário..."
                    className="pl-8 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
               </div>
              <Select value={dayOfWeekFilter} onValueChange={setDayOfWeekFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Dia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Dias</SelectItem>
                  {weekDays.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Eventos</SelectItem>
                  {allEvents.map(event => <SelectItem key={event.id} value={event.name}>{event.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Áreas</SelectItem>
                  {allAreas.map(area => <SelectItem key={area.name} value={area.name}>{area.name}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filtrar por Equipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Equipes</SelectItem>
                  {allTeams.map(team => <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Dia da Semana</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Voluntário</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map((assignment, index) => (
                    <TableRow key={`${assignment.fullDate}-${assignment.evento}-${assignment.area}-${index}`}>
                      <TableCell>{new Date(assignment.fullDate + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{assignment.dayOfWeek}</TableCell>
                      <TableCell>{assignment.evento}</TableCell>
                      <TableCell>{assignment.area}</TableCell>
                      <TableCell>
                        {assignment.equipe && <Badge variant="secondary">{assignment.equipe}</Badge>}
                      </TableCell>
                      <TableCell>{assignment.voluntario_alocado || <span className="text-muted-foreground italic">{assignment.motivo || '-'}</span>}</TableCell>
                      <TableCell>
                         <Badge variant={assignment.status === 'Preenchida' ? 'default' : 'destructive'}>
                          {assignment.status}
                         </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum agendamento encontrado para os filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
