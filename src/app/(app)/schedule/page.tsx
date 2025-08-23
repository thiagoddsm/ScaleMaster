"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { volunteers, events, teamSchedules } from '@/lib/data';
import { generateSchedule, GenerateScheduleOutput } from '@/ai/flows/smart-schedule-generation';


export default function SchedulePage() {
  const { toast } = useToast();
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateScheduleOutput | null>(null);

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => ({ value: (i + 1).toString(), label: new Date(0, i).toLocaleString('default', { month: 'long' }) }));

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
  
  const renderableResult = result?.scaleTable?.replace(/\|/g, ' | ') || '';


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
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown 
                          components={{
                            table: ({node, ...props}) => <table className="table-auto w-full" {...props} />,
                            thead: ({node, ...props}) => <thead className="bg-muted" {...props} />,
                            tbody: ({node, ...props}) => <tbody {...props} />,
                            tr: ({node, ...props}) => <tr className="border-b" {...props} />,
                            th: ({node, ...props}) => <th className="p-2 text-left" {...props} />,
                            td: ({node, ...props}) => <td className="p-2 align-top" {...props} />,
                          }}
                        >
                            {renderableResult}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Relatório Complementar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div>
                        <h3 className="font-semibold">Taxa de Preenchimento</h3>
                        <p className="text-muted-foreground">{result.report.fillRate}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Distribuição por Voluntário</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.report.volunteerDistribution}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Análise de Gargalos</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{result.report.bottlenecks}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Recomendações</h3>
                        <p className="text-muted-foreground">{result.report.recommendations}</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle>Saída de Dados (JSON)</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto text-xs">
                        {JSON.stringify(result.scheduleData, null, 2)}
                    </pre>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
