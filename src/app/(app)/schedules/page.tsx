"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { savedSchedules as initialSavedSchedules } from '@/lib/data';
import type { SavedSchedule } from '@/lib/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<SavedSchedule[]>([]);

  useEffect(() => {
    // In a real app, you might fetch this. For now, we sort the in-memory data.
    const sortedSchedules = [...initialSavedSchedules].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setSchedules(sortedSchedules);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Escalas Salvas</h1>
        <p className="text-muted-foreground">Consulte as escalas que foram geradas e salvas anteriormente.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Escalas</CardTitle>
          <CardDescription>
            {schedules.length > 0
              ? `Total de ${schedules.length} escalas salvas. Clique em uma para ver os detalhes.`
              : "Nenhuma escala salva ainda."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {schedules.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {schedules.map((schedule) => (
                <AccordionItem value={schedule.id} key={schedule.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                        <span>{schedule.title}</span>
                        <span className="text-sm text-muted-foreground">
                            Salva em: {format(new Date(schedule.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
                          {schedule.data.scheduleData.flatMap(day => 
                            day.assignments.map((assignment, index) => (
                              <TableRow key={`${day.date}-${assignment.evento}-${assignment.area}-${index}`}>
                                <TableCell>{new Date(day.date + 'T00:00:00').toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>{day.dayOfWeek}</TableCell>
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
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
             <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gere e salve uma escala para vê-la aqui.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
