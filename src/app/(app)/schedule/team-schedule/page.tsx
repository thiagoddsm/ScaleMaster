"use client"

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { teams as allTeams, teamSchedules as initialTeamSchedules } from '@/lib/data';
import { format, addDays, startOfWeek, endOfWeek, getWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TeamSchedule } from '@/lib/types';
import { ArrowUpDown } from 'lucide-react';

const DND_TYPE_TEAM = 'team';

export default function TeamSchedulePage() {
  const [rotationStartDate, setRotationStartDate] = useState<string>('2024-07-07');
  const [teamOrder, setTeamOrder] = useState<string[]>(initialTeamSchedules.map(ts => ts.team).filter((t, i, a) => a.indexOf(t) === i));
  const [schedules, setSchedules] = useState<TeamSchedule[]>(initialTeamSchedules);

  const generatedSchedule = useMemo(() => {
    if (!rotationStartDate || teamOrder.length === 0) return [];
    
    const startDate = new Date(rotationStartDate + 'T12:00:00Z');
    const schedule: TeamSchedule[] = [];
    
    for (let i = 0; i < 26; i++) { // Generate for roughly 6 months
      const weekStartDate = startOfWeek(addDays(startDate, i * 7), { weekStartsOn: 0 }); // Sunday
      const weekEndDate = endOfWeek(addDays(startDate, i * 7), { weekStartsOn: 0 }); // Saturday
      const team = teamOrder[i % teamOrder.length];
      schedule.push({
        team: team,
        startDate: format(weekStartDate, 'yyyy-MM-dd'),
        endDate: format(weekEndDate, 'yyyy-MM-dd'),
      });
    }
    return schedule;
  }, [rotationStartDate, teamOrder]);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.dataTransfer.setData(DND_TYPE_TEAM, index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData(DND_TYPE_TEAM), 10);
    const newOrder = [...teamOrder];
    const [draggedItem] = newOrder.splice(dragIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);
    setTeamOrder(newOrder);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault(); 
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Equipes da Semana</h1>
        <p className="text-muted-foreground">
          Defina a data de início e a ordem de rotação para gerar o calendário de equipes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle>Configurar Rotação</CardTitle>
                    <CardDescription>Defina os parâmetros para a geração automática.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="start-date">Data de Início da Rotação</Label>
                        <Input 
                            id="start-date"
                            type="date" 
                            value={rotationStartDate}
                            onChange={(e) => setRotationStartDate(e.target.value)}
                        />
                         <p className="text-xs text-muted-foreground mt-1">A rotação sempre começará em um domingo.</p>
                    </div>
                     <div>
                        <Label>Ordem das Equipes</Label>
                        <p className="text-xs text-muted-foreground mb-2">Arraste e solte para reordenar.</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-10"></TableHead>
                                    <TableHead>Equipe</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {teamOrder.map((team, index) => (
                                    <TableRow 
                                        key={team}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDrop={(e) => handleDrop(e, index)}
                                        onDragOver={handleDragOver}
                                        className="cursor-move"
                                    >
                                        <TableCell><ArrowUpDown className="h-4 w-4 text-muted-foreground"/></TableCell>
                                        <TableCell className="font-medium">{team}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                     </div>
                     <Button className="w-full" disabled>Salvar Configuração (Em breve)</Button>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2">
           <Card>
                <CardHeader>
                    <CardTitle>Calendário de Rotação</CardTitle>
                    <CardDescription>Visualização de qual equipe está responsável por cada semana.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-md max-h-[600px] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Semana do Ano</TableHead>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Equipe Responsável</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {generatedSchedule.map((item, index) => {
                                 const startDate = new Date(item.startDate + 'T12:00:00Z');
                                 return(
                                  <TableRow key={index}>
                                      <TableCell>{getWeek(startDate, { weekStartsOn: 0, firstWeekContainsDate: 1})}</TableCell>
                                      <TableCell>
                                        {format(startDate, "d 'de' MMMM", { locale: ptBR })} - {format(new Date(item.endDate + 'T12:00:00Z'), "d 'de' MMMM", { locale: ptBR })}
                                      </TableCell>
                                      <TableCell>
                                          <span className="font-medium">{item.team}</span>
                                      </TableCell>
                                  </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
