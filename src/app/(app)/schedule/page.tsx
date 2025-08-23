
"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { volunteers, events, teamSchedules } from '@/lib/data';
import { generateSchedule, GenerateScheduleOutput } from '@/ai/flows/smart-schedule-generation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';


export default function SchedulePage() {
  const { toast } = useToast();
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateScheduleOutput | null>(null);

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('pt-BR', { month: 'long' }) }));

  const handleGenerateClick = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateSchedule({
        year: parseInt(year),
        month: parseInt(month),
        volunteers,
        events,
        teamSchedules
      });
      setResult(response);
    } catch (error) {
      console.error("Error generating schedule:", error);
      toast({
        variant: 'destructive',
        title: 'Erro ao Gerar Escala',
        description: 'Ocorreu um erro inesperado. Verifique o console para mais detalhes.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Gerar Escala</h1>
        <p className="text-muted-foreground">
          Selecione o mês e o ano para gerar uma nova escala de voluntários.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Parâmetros de Geração</CardTitle>
          <CardDescription>
            Escolha o período para o qual a escala será gerada.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="month-select" className="text-sm font-medium">Mês</label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger id="month-select">
                <SelectValue placeholder="Selecione o mês" />
              </SelectTrigger>
              <SelectContent>
                {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label htmlFor="year-select" className="text-sm font-medium">Ano</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="year-select">
                <SelectValue placeholder="Selecione o ano" />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handleGenerateClick} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                'Gerar Escala'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {result && (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Tabela de Escala</CardTitle>
                </CardHeader>
                <CardContent>
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
                               {result.scheduleData.flatMap(day => 
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
                                {result.scheduleData.length === 0 && (
                                     <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            Nenhum dado para exibir.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-1 gap-8">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                          <CardTitle>Relatório Complementar</CardTitle>
                          <CardDescription>Análise e métricas da escala gerada pela IA.</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Info className="h-4 w-4" />
                                <span className="sr-only">Ver JSON</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                           <DialogHeader>
                               <DialogTitle>Saída de Dados (JSON)</DialogTitle>
                               <DialogDescription>Abaixo está o resultado JSON bruto retornado pela IA.</DialogDescription>
                           </DialogHeader>
                            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs max-h-[60vh]">
                                {JSON.stringify(result.scheduleData, null, 2)}
                            </pre>
                        </DialogContent>
                      </Dialog>
                  </CardHeader>
                  <CardContent className="space-y-6 text-sm">
                      <div>
                          <h3 className="font-semibold text-base mb-2">Taxa de Preenchimento</h3>
                          <p className="text-muted-foreground">{result.report.fillRate}</p>
                      </div>
                      <div>
                          <h3 className="font-semibold text-base mb-2">Distribuição por Voluntário</h3>
                          <ReactMarkdown className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap">{result.report.volunteerDistribution}</ReactMarkdown>
                      </div>
                      <div>
                          <h3 className="font-semibold text-base mb-2">Análise de Gargalos</h3>
                           <ReactMarkdown className="prose prose-sm dark:prose-invert text-muted-foreground whitespace-pre-wrap">{result.report.bottlenecks}</ReactMarkdown>
                      </div>
                      <div>
                          <h3 className="font-semibold text-base mb-2">Recomendações</h3>
                          <p className="text-muted-foreground">{result.report.recommendations}</p>
                      </div>
                  </CardContent>
              </Card>
            </div>
        </div>
      )}
    </div>
  );
}
