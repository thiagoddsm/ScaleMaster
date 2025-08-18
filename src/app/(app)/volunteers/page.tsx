"use client"

import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
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

const availabilityItems = Array.from(new Set(events.map(e => e.name)));

const volunteerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  team: z.string().min(1, "Equipe é obrigatória"),
  areas: z.array(z.string()).min(1, "Selecione ao menos uma área"),
  availability: z.array(z.string()).min(1, "Selecione ao menos uma disponibilidade"),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
});

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      name: '',
      team: '',
      areas: [],
      availability: [],
      phone: '',
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof volunteerSchema>) {
    const newVolunteer: Volunteer = {
      id: (volunteers.length + 1).toString(),
      ...data,
    };
    setVolunteers([...volunteers, newVolunteer]);
    toast({
      title: "Sucesso!",
      description: "Novo voluntário adicionado.",
      className: "bg-primary text-primary-foreground",
    });
    setIsDialogOpen(false);
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
          <Button onClick={() => setIsDialogOpen(true)}>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell className="font-medium">{volunteer.name}</TableCell>
                  <TableCell>{volunteer.team}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.areas.map(area => <Badge key={area} variant="secondary">{area}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {volunteer.availability.map(avail => <Badge key={avail} variant="outline">{avail}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{volunteer.email}</div>
                      <div>{volunteer.phone}</div>
                    </div>
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
            <DialogTitle>Adicionar Novo Voluntário</DialogTitle>
            <DialogDescription>Preencha os dados do novo voluntário.</DialogDescription>
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
                        {teams.map(team => <SelectItem key={team.name} value={team.name}>{team.name}</SelectItem>)}
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
                                        ? field.onChange([...field.value, area.name])
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
                                        ? field.onChange([...field.value, item])
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
                <Button type="submit">Salvar Voluntário</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
