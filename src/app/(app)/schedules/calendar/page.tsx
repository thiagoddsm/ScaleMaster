"use client"

import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAppData } from '@/context/AppDataContext';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TeamCalendarPage() {
  const { teamSchedules } = useAppData();

  const sortedSchedules = useMemo(() => {
    return [...teamSchedules].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [teamSchedules]);

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  const formatWeek = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const startDay = format(start, 'dd');
    const endDay = format(end, 'dd');
    const month = format(start, 'MMMM', { locale: ptBR });
    const year = format(start, 'yyyy');
    
    return `${startDay} a ${endDay} de ${month} de ${year}`;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Calendário de Rotação de Equipes</h1>
        <p className="text-muted-foreground">Consulte a escala de responsabilidade semanal de cada equipe.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Equipes</CardTitle>
          <CardDescription>
            Cada equipe é responsável por todos os eventos que ocorrem na sua semana designada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Período de Responsabilidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedSchedules.map((schedule, index) => (
                  <TableRow key={`${schedule.team}-${schedule.startDate}-${index}`}>
                    <TableCell>
                      <Badge variant="default" className="text-base px-3 py-1">{schedule.team}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-lg">
                        {formatWeek(schedule.startDate, schedule.endDate)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
