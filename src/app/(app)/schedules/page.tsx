"use client"

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { savedSchedules as initialSavedSchedules } from '@/lib/data';
import type { SavedSchedule, ScheduleAssignment } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<SavedSchedule[]>(initialSavedSchedules);
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' }) }));

  const filteredAssignments = useMemo(() => {
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month);

    const relevantSchedules = schedules.filter(s => s.year === numericYear && s.month === numericMonth);
    
    if (relevantSchedules.length === 0) {
        return [];
    }

    // Combine all assignments from all relevant saved schedules for that month
    const allAssignments = relevantSchedules.flatMap(s => 
        s.data.scheduleData.flatMap(day => 
            day.assignments.map(assignment => ({
                ...assignment,
                fullDate: day.date,
                dayOfWeek: day.dayOfWeek,
            }))
        )
    );

    // Sort by date, then event, then area
    return allAssignments.sort((a, b) => {
        if (a.fullDate < b.fullDate) return -1;
        if (a.fullDate > b.fullDate) return 1;
        if (a.evento < b.evento) return -1;
        if (a.evento > b.evento) return 1;
        if (a.area < b.area) return -1;
        if (a.area > b.area) return 1;
        return 0;
    });

  }, [schedules, year, month]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Escalas Salvas</h1>
        <p className="text-muted-foreground">Consulte as escalas unificadas para um mês e ano específicos.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Filtrar Escala</CardTitle>
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
          <CardTitle>Escala Unificada</CardTitle>
          <CardDescription>
            Exibindo todos os agendamentos para {months.find(m => m.value === month)?.label} de {year}.
          </CardDescription>
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
                      Nenhuma escala salva encontrada para este período.
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
