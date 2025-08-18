import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarCheck, CalendarPlus, Users, Shield, Construction } from 'lucide-react';
import { events, volunteers } from '@/lib/data';

export default function DashboardPage() {
  const upcomingEvents = events.filter(e => e.date && new Date(e.date) > new Date()).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu gerenciador de escalas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Voluntários</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
            <p className="text-xs text-muted-foreground">voluntários cadastrados</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
            <CalendarPlus className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">eventos fixos e pontuais</p>
          </CardContent>
        </Card>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <CalendarCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">eventos pontuais agendados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Gerar Nova Escala</CardTitle>
            <CardDescription>Use nossa ferramenta inteligente para criar escalas otimizadas para seus eventos em minutos.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              A geração de escala inteligente considera a disponibilidade, áreas de serviço e equipe de cada voluntário para criar a melhor combinação possível.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/schedule">
                Gerar Escala <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Gerenciar Dados</CardTitle>
            <CardDescription>Adicione ou atualize informações de voluntários e eventos para manter tudo organizado.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
             <p className="text-sm text-muted-foreground">
              Mantenha os dados sempre atualizados para garantir que as escalas sejam geradas com as informações mais recentes.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link href="/volunteers">Gerenciar Voluntários</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/events">Gerenciar Eventos</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/areas">Gerenciar Áreas</Link>
            </Button>
             <Button asChild variant="secondary">
              <Link href="/teams">Gerenciar Equipes</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
