"use client";

import React from 'react';
import { CalendarPlus, History, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SchedulePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Escalas</h1>
        <p className="text-muted-foreground">
          Gere novas escalas de voluntários, gerencie a rotação de equipes ou visualize as que já foram salvas.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/schedule/generate" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full flex flex-col justify-between cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CalendarPlus className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Gerar Nova Escala</CardTitle>
                  <CardDescription>Crie uma nova escala automatizada.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Selecione os parâmetros e deixe a IA fazer o trabalho pesado de alocação.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/schedule/team-schedule" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full flex flex-col justify-between cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Equipes da Semana</CardTitle>
                  <CardDescription>Defina a rotação de equipes por semana.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                Estabeleça a ordem de serviço das equipes para o ano todo.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/schedule/saved" className="block hover:shadow-lg transition-shadow rounded-lg">
          <Card className="h-full flex flex-col justify-between cursor-pointer">
            <CardHeader>
               <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Escalas Salvas</CardTitle>
                  <CardDescription>Consulte as escalas geradas anteriormente.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground">
                Acesse o histórico de escalas para referência futura e planejamento.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
