"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateSchedule } from '@/ai/flows/smart-schedule-generation';
import type { GenerateScheduleOutput } from '@/ai/flows/smart-schedule-generation';
import { events } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const monthOptions = [
  { value: '1', label: 'Janeiro' }, { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' }, { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' }, { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' }, { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' }, { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' }, { value: '12', label: 'Dezembro' },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => (currentYear + i).toString());

export default function GenerateSchedulePage() {
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState<string>(currentYear.toString());
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<GenerateScheduleOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setSchedule(null);
    try {
      const result = await generateSchedule({
        month: parseInt(month),
        year: parseInt(year),
        events,
      });

      if (result.assignments.length === 0) {
         toast({
          variant: 'default',
          title: 'Nenhuma Vaga Encontrada',
          description: 'Não foram encontrados eventos para o período selecionado.',
        });
      }

      setSchedule(result);
    } catch (error) {
      console.error('Error generating schedule structure:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Estrutura',
        description: 'Ocorreu um erro ao se comunicar com a IA. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const groupedAssignments = useMemo(() => {
    if (!schedule) return null;
    return schedule.assignments.reduce((acc, assignment) => {
        const key = assignment.eventUniqueName;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(assignment);
        return acc;
    }, {} as Record<string, typeof schedule.assignments>);
  }, [schedule]);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerar Estrutura da Escala</h1>
        <p className="text-muted-foreground">
          Gere a estrutura de vagas para os eventos do mês. Este é o primeiro passo para criar a escala.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parâmetros</CardTitle>
          <CardDescription>Selecione o mês e o ano para a geração da estrutura.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Mês" />
                </SelectTrigger>
                <SelectContent>
                  {monthOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateClick} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Gerando...' : 'Gerar Estrutura da Escala'}
            </Button>
        </CardContent>
      </Card>
      
      {schedule && groupedAssignments && Object.keys(groupedAssignments).length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>Estrutura da Escala Gerada</CardTitle>
                <CardDescription>
                    Abaixo estão todas as vagas necessárias para os eventos de {monthOptions.find(m => m.value === month)?.label} de {year}. Nenhum voluntário foi alocado.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {Object.entries(groupedAssignments).sort(([keyA], [keyB]) => {
                    const dateA = keyA.split(' - ')[1].split('/').reverse().join('');
                    const dateB = keyB.split(' - ')[1].split('/').reverse().join('');
                    return dateA.localeCompare(dateB);
                 }).map(([eventUniqueName, assignments]) => {
                    return (
                        <div key={eventUniqueName}>
                            <h3 className="font-semibold text-lg mb-2">{eventUniqueName}</h3>
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[200px]">Área</TableHead>
                                            <TableHead>Voluntário Alocado</TableHead>
                                            <TableHead>Observação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {assignments.sort((a,b) => a.area.localeCompare(b.area)).map((a, index) => (
                                            <TableRow key={`${a.area}-${a.position}-${index}`}>
                                                <TableCell className="font-medium">{a.area} (Pos. {a.position})</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Não alocado</Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">-</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )
                 })}
            </CardContent>
        </Card>
      )}

    </div>
  );
}
