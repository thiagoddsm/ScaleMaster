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
import { volunteers as initialVolunteers, teams, areasOfService, events } from '@/lib/data';
import type { Volunteer } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const availabilityItems = Array.from(new Set(events.map(e => e.name)));
const allTeams = [...teams.map(t => t.name), "N/A"];


const volunteerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  team: z.string().min(1, "Equipe é obrigatória"),
  areas: z.array(z.string()).min(1, "Selecione ao menos uma área"),
  availability: z.array(z.string()),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
});

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers.sort((a, b) => a.name.localeCompare(b.name)));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: '', team: '', areas: [], availability: [], phone: '', email: '' },
  });
  
  function handleAdd() {
    setSelectedVolunteer(null);
    form.reset({ name: '', team: 'N/A', areas: [], availability: [], phone: '', email: '' });
    setIsDialogOpen(true);
  }

  function handleEdit(volunteer: Volunteer) {
    setSelectedVolunteer(volunteer);
    form.reset(volunteer);
    setIsDialogOpen(true);
  }

  function handleDelete(volunteer: Volunteer) {
    setSelectedVolunteer(volunteer);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (selectedVolunteer) {
        setVolunteers(volunteers.filter(v => v.id !== selectedVolunteer.id));
        toast({
            title: "Sucesso!",
            description: "Voluntário excluído.",
        });
        setIsDeleteDialogOpen(false);
        setSelectedVolunteer(null);
    }
  }

  function handleTeamChange(volunteerId: string, newTeam: string) {
    setVolunteers(prevVolunteers => 
      prevVolunteers.map(v => 
        v.id === volunteerId ? { ...v, team: newTeam } : v
      )
    );
    const volunteer = volunteers.find(v => v.id === volunteerId);
    toast({
        title: "Equipe Atualizada",
        description: `${volunteer?.name} agora está na equipe ${newTeam}.`
    });
  }


  function onSubmit(data: z.infer<typeof volunteerSchema>) {
    if (selectedVolunteer) {
        // Edit
        setVolunteers(volunteers.map(v => v.id === selectedVolunteer.id ? { ...v, ...data } : v).sort((a, b) => a.name.localeCompare(b.name)));
        toast({
            title: "Sucesso!",
            description: "Voluntário atualizado.",
            className: "bg-primary text-primary-foreground",
        });
    } else {
        // Add
        const newVolunteer: Volunteer = {
            id: (volunteers.length + 1).toString(),
            ...data,
        };
        setVolunteers([...volunteers, newVolunteer].sort((a, b) => a.name.localeCompare(b.name)));
        toast({
            title: "Sucesso!",
            description: "Novo voluntário adicionado.",
            className: "bg-primary text-primary-foreground",
        });
    }
    
    setIsDialogOpen(false);
    setSelectedVolunteer(null);
    form.reset();
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Voluntários</h1>
        <p className="text-muted-foreground">Adicione, visualize e gerencie os voluntários.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Voluntários</CardTitle>
            <CardDescription>Todos os voluntários cadastrados no sistema.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Voluntário
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Equipe</TableHead>
                <TableHead>Áreas de Serviço</TableHead>
                <TableHead>Disponibilidade</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead className="w-20 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-auto p-1 text-left font-normal">
                          <Badge variant={volunteer.team === 'N/A' ? 'outline' : 'default'} className="cursor-pointer">
                            {volunteer.team}
                          </Badge>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {allTeams.map(teamName => (
                           <DropdownMenuItem 
                              key={teamName} 
                              onClick={() => handleTeamChange(volunteer.id, teamName)}
                              disabled={volunteer.team === teamName}
                            >
                            {teamName}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {volunteer.areas.map(area => <Badge key={area} variant="secondary">{area}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {volunteer.availability.map(avail => <Badge key={avail} variant="outline">{avail}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{volunteer.email}</div>
                      <div>{volunteer.phone}</div>
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
                        <DropdownMenuItem onClick={() => handleEdit(volunteer)}>
                           <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(volunteer)} className="text-destructive">
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
            <DialogTitle>{selectedVolunteer ? 'Editar Voluntário' : 'Adicionar Novo Voluntário'}</DialogTitle>
            <DialogDescription>Preencha os dados do voluntário.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl><Input placeholder="Nome do voluntário" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="team" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Selecione uma equipe" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {allTeams.map(team => <SelectItem key={team} value={team}>{team}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input type="email" placeholder="email@exemplo.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Celular</FormLabel>
                        <FormControl><Input placeholder="(XX) XXXXX-XXXX" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField control={form.control} name="areas" render={() => (
                    <FormItem>
                        <FormLabel>Áreas de Serviço</FormLabel>
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
                 <FormField control={form.control} name="availability" render={() => (
                    <FormItem>
                        <FormLabel>Disponibilidade</FormLabel>
                         <div className="space-y-2 p-2 border rounded-md max-h-40 overflow-y-auto">
                        {availabilityItems.map((item) => (
                             <FormField key={item} control={form.control} name="availability" render={({ field }) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), item])
                                        : field.onChange(field.value?.filter((value) => value !== item));
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                            )} />
                        ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />
              </div>
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
              Essa ação não pode ser desfeita. Isso excluirá permanentemente o voluntário.
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
