"use client"

import React, { useState } from 'react';
import { PlusCircle, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { teams as initialTeams } from '@/lib/data';
import type { Team } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const teamSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof teamSchema>>({
    resolver: zodResolver(teamSchema),
    defaultValues: { name: '' },
  });

  function handleAdd() {
    setSelectedTeam(null);
    form.reset({ name: '' });
    setIsDialogOpen(true);
  }

  function handleEdit(team: Team) {
    setSelectedTeam(team);
    form.reset(team);
    setIsDialogOpen(true);
  }

  function handleDelete(team: Team) {
    setSelectedTeam(team);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (selectedTeam) {
      setTeams(teams.filter((t) => t.name !== selectedTeam.name));
      toast({
        title: "Sucesso!",
        description: "Equipe excluída.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedTeam(null);
    }
  }

  function onSubmit(data: z.infer<typeof teamSchema>) {
    if (selectedTeam) {
      // Edit
      setTeams(teams.map((t) => t.name === selectedTeam.name ? { ...t, ...data } : t));
       toast({
        title: "Sucesso!",
        description: "Equipe atualizada.",
        className: "bg-primary text-primary-foreground",
      });
    } else {
      // Add
      if (teams.find(t => t.name.toLowerCase() === data.name.toLowerCase())) {
        form.setError("name", { type: "manual", message: "Essa equipe já existe." });
        return;
      }
      setTeams([...teams, data].sort((a,b) => a.name.localeCompare(b.name)));
       toast({
        title: "Sucesso!",
        description: "Nova equipe adicionada.",
        className: "bg-primary text-primary-foreground",
      });
    }
    setIsDialogOpen(false);
    setSelectedTeam(null);
    form.reset();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Equipes</h1>
        <p className="text-muted-foreground">Adicione, visualize e gerencie as equipes de voluntários.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Equipes</CardTitle>
            <CardDescription>Todas as equipes cadastradas no sistema.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Equipe
          </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="w-20 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.name}>
                    <TableCell className="font-medium">
                        {team.name}
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
                          <DropdownMenuItem onClick={() => handleEdit(team)}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(team)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedTeam ? 'Editar Equipe' : 'Adicionar Nova Equipe'}</DialogTitle>
            <DialogDescription>Preencha os dados da equipe.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Equipe</FormLabel>
                  <FormControl><Input placeholder="Ex: Alpha" {...field} /></FormControl>
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
              Essa ação não pode ser desfeita. Isso excluirá permanentemente a equipe.
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
