"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PlusCircle, Trash2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { areasOfService as allAreas, volunteers as allVolunteers } from '@/lib/data';
import type { AreaOfService, Volunteer } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function AreaDetailPage({ params }: { params: { name: string } }) {
  const { toast } = useToast();
  const areaName = decodeURIComponent(params.name);

  // Using states to manage data, allowing for modifications
  const [area, setArea] = useState<AreaOfService | undefined>(() => allAreas.find(a => a.name === areaName));
  const [volunteers, setVolunteers] = useState<Volunteer[]>(() => allVolunteers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [volunteerToAdd, setVolunteerToAdd] = useState('');


  const volunteersInArea = useMemo(() => {
    return volunteers.filter(v => v.areas.includes(areaName)).sort((a,b) => a.name.localeCompare(b.name));
  }, [volunteers, areaName]);
  
  const availableVolunteers = useMemo(() => {
    return volunteers.filter(v => !v.areas.includes(areaName)).sort((a,b) => a.name.localeCompare(b.name));
  }, [volunteers, areaName]);

  useEffect(() => {
    const foundArea = allAreas.find(a => a.name === areaName);
    setArea(foundArea);
  }, [areaName]);

  if (!area) {
    notFound();
  }

  function handleAddVolunteer() {
    if (!volunteerToAdd) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Selecione um voluntário para adicionar.' });
        return;
    }
    const updatedVolunteers = volunteers.map(v => {
        if (v.id === volunteerToAdd) {
            return { ...v, areas: [...v.areas, areaName] };
        }
        return v;
    });
    setVolunteers(updatedVolunteers);
    toast({ title: 'Sucesso', description: 'Voluntário adicionado à área.' });
    setVolunteerToAdd('');
    setIsAddDialogOpen(false);
  }

  function openRemoveDialog(volunteer: Volunteer) {
    setSelectedVolunteer(volunteer);
    setIsRemoveDialogOpen(true);
  }

  function confirmRemoveVolunteer() {
    if (!selectedVolunteer) return;
    
    const updatedVolunteers = volunteers.map(v => {
        if (v.id === selectedVolunteer.id) {
            return { ...v, areas: v.areas.filter(a => a !== areaName) };
        }
        return v;
    });
    setVolunteers(updatedVolunteers);
    toast({ title: 'Sucesso', description: `voluntário removido da área.` });
    setIsRemoveDialogOpen(false);
    setSelectedVolunteer(null);
  }


  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/areas"><ChevronLeft className="mr-2 h-4 w-4" /> Voltar para Áreas</Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{area.name}</h1>
        <p className="text-muted-foreground">Gerencie os voluntários desta área de serviço.</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Voluntários</CardTitle>
            <CardDescription>{volunteersInArea.length} voluntários nesta área.</CardDescription>
          </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Adicionar Voluntário
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Voluntário à Área</DialogTitle>
                        <DialogDescription>
                            Selecione um voluntário para adicionar à área de '{area.name}'.
                        </DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={setVolunteerToAdd} value={volunteerToAdd}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um voluntário" />
                        </SelectTrigger>
                        <SelectContent>
                        {availableVolunteers.map(v => (
                            <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
                        <Button onClick={handleAddVolunteer}>Adicionar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-20 text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volunteersInArea.length > 0 ? volunteersInArea.map((volunteer) => (
                  <TableRow key={volunteer.id}>
                    <TableCell className="font-medium">{volunteer.name}</TableCell>
                    <TableCell><Badge variant="secondary">{volunteer.team}</Badge></TableCell>
                    <TableCell>{volunteer.phone || '-'}</TableCell>
                    <TableCell>{volunteer.email || '-'}</TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" onClick={() => openRemoveDialog(volunteer)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remover</span>
                       </Button>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            Nenhum voluntário nesta área.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isRemoveDialogOpen} onOpenChange={setIsRemoveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá {selectedVolunteer?.name} da área de {area.name}. O voluntário não será excluído do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveVolunteer}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
