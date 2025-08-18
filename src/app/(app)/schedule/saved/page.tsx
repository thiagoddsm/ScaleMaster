
"use client"

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { savedSchedules, areasOfService as allAreas } from '@/lib/data';
import type { SavedSchedule } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Eye, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const months = Array.from({ length: 12 }, (_, i) => 
  new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
);

const getMonthName = (month: number) => {
    const monthName = months[month - 1];
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

export default function SavedSchedulesPage() {
    const [schedules, setSchedules] = useState<SavedSchedule[]>(savedSchedules.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [scheduleToDelete, setScheduleToDelete] = useState<SavedSchedule | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<SavedSchedule | null>(null);

    const { toast } = useToast();

    const groupedSchedules = useMemo(() => {
        return schedules.reduce((acc, schedule) => {
            const key = `${schedule.year}-${schedule.month}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(schedule);
            return acc;
        }, {} as Record<string, SavedSchedule[]>);
    }, [schedules]);

    const openDeleteDialog = (schedule: SavedSchedule) => {
        setScheduleToDelete(schedule);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (!scheduleToDelete) return;
        
        const indexToDelete = savedSchedules.findIndex(s => s.id === scheduleToDelete.id);
        if (indexToDelete > -1) {
            savedSchedules.splice(indexToDelete, 1);
        }

        setSchedules(savedSchedules.filter(s => s.id !== scheduleToDelete.id));

        toast({
            title: 'Sucesso!',
            description: 'Escala salva foi excluída.',
        });

        if(selectedSchedule?.id === scheduleToDelete.id) {
            setSelectedSchedule(null);
        }

        setIsDeleteDialogOpen(false);
        setScheduleToDelete(null);
    };

    const areasForTable = useMemo(() => {
        if (!selectedSchedule) return [];
        if (selectedSchedule.areaFilter !== 'Todas') {
          return allAreas.filter(a => a.name === selectedSchedule.areaFilter);
        }
        return allAreas;
    }, [selectedSchedule]);


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Escalas Salvas</h1>
                <p className="text-muted-foreground">Visualize e gerencie as escalas que foram geradas e salvas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Histórico</CardTitle>
                        <CardDescription>Lista de escalas salvas, agrupadas por mês.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {Object.keys(groupedSchedules).length > 0 ? (
                         <Accordion type="single" collapsible className="w-full">
                            {Object.entries(groupedSchedules).map(([key, scheduleGroup]) => {
                                const [year, month] = key.split('-');
                                return (
                                <AccordionItem value={key} key={key}>
                                    <AccordionTrigger>{getMonthName(parseInt(month))} de {year}</AccordionTrigger>
                                    <AccordionContent>
                                    <div className="flex flex-col gap-2">
                                    {scheduleGroup.map(schedule => (
                                        <div key={schedule.id} className="flex justify-between items-center p-2 rounded-md hover:bg-muted">
                                            <div className="text-sm">
                                                <div><Badge variant="outline">{schedule.areaFilter}</Badge></div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    Salva em: {format(schedule.createdAt, 'dd/MM/yyyy HH:mm')}
                                                </div>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedSchedule(schedule)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDeleteDialog(schedule)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                    </AccordionContent>
                                </AccordionItem>
                                )
                            })}
                         </Accordion>
                       ) : (
                        <p className="text-sm text-muted-foreground text-center p-4">Nenhuma escala salva ainda.</p>
                       )}
                    </CardContent>
                </Card>

                <div className="md:col-span-2">
                    {selectedSchedule ? (
                        <Card>
                             <CardHeader>
                                <CardTitle>Detalhes da Escala</CardTitle>
                                <CardDescription>
                                    Escala de {getMonthName(selectedSchedule.month)} de {selectedSchedule.year} (Filtro: {selectedSchedule.areaFilter})
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                <Table className="min-w-full">
                                    <TableHeader>
                                    <TableRow>
                                        <TableHead className="sticky left-0 bg-background/95 backdrop-blur-sm w-[150px] z-10">Área</TableHead>
                                        {selectedSchedule.monthlyEvents.map((event, index) => (
                                        <TableHead key={index} className="text-center whitespace-nowrap">
                                            <div className="font-bold">{format(new Date(event.date), 'dd/MM')}</div>
                                            <div className="text-xs font-normal">{format(new Date(event.date), 'EEEE', {locale: ptBR})}</div>
                                            <div className="text-sm font-normal">{event.name}</div>
                                        </TableHead>
                                        ))}
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {areasForTable.map(area => {
                                        const maxVolunteers = Math.max(1, ...selectedSchedule.monthlyEvents.map(event =>
                                            event.areas.find(a => a.name === area.name)?.volunteersNeeded || 0
                                        ));

                                        return Array.from({ length: maxVolunteers }).map((_, i) => (
                                            <TableRow key={`${area.name}-${i}`}>
                                            <TableCell className="font-semibold sticky left-0 bg-background/95 backdrop-blur-sm w-[150px] z-10">
                                                {area.name} {maxVolunteers > 1 && `(${i + 1})`}
                                            </TableCell>
                                            {selectedSchedule.monthlyEvents.map((event, index) => {
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
                                                const scheduleSlot = selectedSchedule.schedule[scheduleKey];
                                                const volunteerName = scheduleSlot?.volunteer;
                                                const reason = scheduleSlot?.reason;
                                                
                                                return (
                                                <TableCell key={index} className="text-center">
                                                     <div className="flex-col">
                                                        <span className={volunteerName ? 'font-medium' : 'text-muted-foreground italic'}>
                                                            {volunteerName || 'Não alocado'}
                                                        </span>
                                                        {reason && (
                                                            <span className="text-xs text-muted-foreground italic block">({reason})</span>
                                                        )}
                                                    </div>
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
                    ) : (
                        <Card className="flex items-center justify-center h-96">
                            <p className="text-muted-foreground">Selecione uma escala salva para ver os detalhes.</p>
                        </Card>
                    )}
                </div>
            </div>
            
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso excluirá permanentemente a escala salva.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
