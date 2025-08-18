"use client"

import React, { useState } from 'react';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { events as initialEvents, areasOfService } from '@/lib/data';
import type { Event } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { format, parseISO } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const eventSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  frequency: z.enum(['Semanal', 'Pontual']),
  dayOfWeek: z.string().optional(),
  date: z.string().optional(),
  time: z.string().min(1, "Horário é obrigatório"),
  areas: z.array(z.string()).min(1, "Selecione ao menos uma área"),
  responsible: z.string().optional(),
  contact: z.string().optional(),
  observations: z.string().optional(),
}).refine(data => {
    if (data.frequency === 'Semanal') return !!data.dayOfWeek;
    return true;
}, {
    message: "Dia da semana é obrigatório para eventos semanais",
    path: ["dayOfWeek"],
}).refine(data => {
    if (data.frequency === 'Pontual') return !!data.date;
    return true;
}, {
    message: "Data é obrigatória para eventos pontuais",
    path: ["date"],
});


const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: { name: '', frequency: 'Semanal', time: '', areas: [] },
  });

  const frequency = form.watch('frequency');

  function handleAdd() {
    setSelectedEvent(null);
    form.reset({ name: '', frequency: 'Semanal', time: '', areas: [] });
    setIsDialogOpen(true);
  }

  function handleEdit(event: Event) {
    setSelectedEvent(event);
    const eventDate = event.date ? format(parseISO(event.date+'T00:00:00'), 'yyyy-MM-dd') : undefined;
    form.reset({...event, date: eventDate});
    setIsDialogOpen(true);
  }

  function handleDelete(event: Event) {
    setSelectedEvent(event);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (selectedEvent) {
        setEvents(events.filter(v => v.id !== selectedEvent.id));
        toast({
            title: "Sucesso!",
            description: "Evento excluído.",
        });
        setIsDeleteDialogOpen(false);
        setSelectedEvent(null);
    }
  }


  function onSubmit(data: z.infer<typeof eventSchema>) {
    const formattedData = {
        ...data,
        date: data.date ? format(new Date(data.date+'T12:00:00Z'), 'yyyy-MM-dd') : undefined,
    }

    if (selectedEvent) {
        // Edit
        setEvents(events.map(e => e.id === selectedEvent.id ? { ...e, ...formattedData } : e));
         toast({
            title: "Sucesso!",
            description: "Evento atualizado.",
            className: "bg-primary text-primary-foreground",
        });
    } else {
        // Add
        const newEvent: Event = {
            id: (events.length + 1).toString(),
            ...formattedData,
        };
        setEvents([...events, newEvent]);
         toast({
            title: "Sucesso!",
            description: "Novo evento adicionado.",
            className: "bg-primary text-primary-foreground",
        });
    }

    setIsDialogOpen(false);
    setSelectedEvent(null);
    form.reset();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Eventos</h1>
        <p className="text-muted-foreground">Adicione, visualize e gerencie os eventos fixos e pontuais.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Eventos</CardTitle>
            <CardDescription>Todos os eventos cadastrados no sistema.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Evento
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Detalhes</TableHead>
                <TableHead>Áreas de Serviço</TableHead>
                 <TableHead className="w-20 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell><Badge variant={event.frequency === 'Semanal' ? 'default' : 'secondary'}>{event.frequency}</Badge></TableCell>
                  <TableCell>
                    {event.frequency === 'Semanal' ? event.dayOfWeek : event.date ? format(new Date(event.date+'T12:00:00Z'), 'dd/MM/yyyy') : ''} às {event.time}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {event.areas.map(area => <Badge key={area} variant="outline">{area}</Badge>)}
                    </div>
                  </TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(event)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(event)} className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'Editar Evento' : 'Adicionar Novo Evento'}</DialogTitle>
            <DialogDescription>Preencha os dados do evento.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Evento</FormLabel>
                    <FormControl><Input placeholder="Ex: Culto de Domingo" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="time" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horário</FormLabel>
                    <FormControl><Input type="time" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="frequency" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequência</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione a frequência" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="Semanal">Semanal</SelectItem>
                        <SelectItem value="Pontual">Pontual</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                {frequency === 'Semanal' && (
                  <FormField control={form.control} name="dayOfWeek" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dia da Semana</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl><SelectTrigger><SelectValue placeholder="Selecione o dia" /></SelectTrigger></FormControl>
                         <SelectContent>
                           {weekDays.map(day => <SelectItem key={day} value={day}>{day}</SelectItem>)}
                         </SelectContent>
                       </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
                {frequency === 'Pontual' && (
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                )}
              </div>
              
              <FormField control={form.control} name="areas" render={() => (
                <FormItem>
                    <FormLabel>Áreas de Serviço Necessárias</FormLabel>
                    <div className="space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">
                    {areasOfService.map((area) => (
                        <FormField key={area.name} control={form.control} name="areas" render={({ field }) => (
                        <FormItem key={area.name} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                            <Checkbox
                                checked={field.value?.includes(area.name)}
                                onCheckedChange={(checked) => {
                                return checked
                                    ? field.onChange([...(field.value || []), area.name])
                                    : field.onChange(field.value?.filter((value) => value !== area.name));
                                }}
                            />
                            </FormControl>
                            <FormLabel className="font-normal">{area.name}</FormLabel>
                        </FormItem>
                        )} />
                    ))}
                    </div>
                    <FormMessage />
                </FormItem>
              )} />
              
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="responsible" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsável</FormLabel>
                      <FormControl><Input placeholder="Nome do responsável" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="contact" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contato</FormLabel>
                      <FormControl><Input placeholder="Telefone ou email" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
              </div>
              
              <FormField control={form.control} name="observations" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl><Textarea placeholder="Alguma observação sobre o evento?" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />


              <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary">Cancelar</Button></DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o evento.
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
