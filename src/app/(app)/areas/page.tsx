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
import { areasOfService as initialAreasOfService } from '@/lib/data';
import type { AreaOfService } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';


const areaSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

export default function AreasPage() {
  const [areas, setAreas] = useState<AreaOfService[]>(initialAreasOfService);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<AreaOfService | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof areaSchema>>({
    resolver: zodResolver(areaSchema),
    defaultValues: { name: '' },
  });

  function handleAdd() {
    setSelectedArea(null);
    form.reset({ name: '' });
    setIsDialogOpen(true);
  }

  function handleEdit(area: AreaOfService) {
    setSelectedArea(area);
    form.reset(area);
    setIsDialogOpen(true);
  }

  function handleDelete(area: AreaOfService) {
    setSelectedArea(area);
    setIsDeleteDialogOpen(true);
  }

  function confirmDelete() {
    if (selectedArea) {
      setAreas(areas.filter((a) => a.name !== selectedArea.name));
      toast({
        title: "Sucesso!",
        description: "Área de serviço excluída.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedArea(null);
    }
  }

  function onSubmit(data: z.infer<typeof areaSchema>) {
    if (selectedArea) {
      // Edit
      setAreas(areas.map((a) => a.name === selectedArea.name ? data : a));
       toast({
        title: "Sucesso!",
        description: "Área de serviço atualizada.",
        className: "bg-primary text-primary-foreground",
      });
    } else {
      // Add
      if (areas.find(a => a.name.toLowerCase() === data.name.toLowerCase())) {
        form.setError("name", { type: "manual", message: "Essa área de serviço já existe." });
        return;
      }
      setAreas([...areas, data].sort((a,b) => a.name.localeCompare(b.name)));
       toast({
        title: "Sucesso!",
        description: "Nova área de serviço adicionada.",
        className: "bg-primary text-primary-foreground",
      });
    }
    setIsDialogOpen(false);
    setSelectedArea(null);
    form.reset();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerenciar Áreas de Serviço</h1>
        <p className="text-muted-foreground">Adicione, visualize e gerencie as áreas de serviço.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Áreas de Serviço</CardTitle>
            <CardDescription>Todas as áreas de serviço cadastradas no sistema.</CardDescription>
          </div>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Área
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-20 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {areas.map((area) => (
                <TableRow key={area.name}>
                  <TableCell className="font-medium">{area.name}</TableCell>
                   <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(area)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(area)} className="text-destructive">
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedArea ? 'Editar Área' : 'Adicionar Nova Área'}</DialogTitle>
            <DialogDescription>Preencha os dados da área.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Área</FormLabel>
                  <FormControl><Input placeholder="Ex: Multimídia" {...field} /></FormControl>
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
              Essa ação não pode ser desfeita. Isso excluirá permanentemente a área de serviço.
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
