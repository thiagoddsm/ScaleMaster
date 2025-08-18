import type { Volunteer, Event, Team, TeamSchedule, AreaOfService } from './types';

export const areasOfService: AreaOfService[] = [
  { name: 'Apoio' },
  { name: 'Estacionamento' },
  { name: 'Recepção' },
  { name: 'Saúde' },
  { name: 'Broadcasting' },
  { name: 'Iluminação' },
  { name: 'Projeção' },
  { name: 'Som' },
  { name: 'Bistro' },
  { name: 'Boutique' },
  { name: 'Cleaning' },
  { name: 'Coffee Break' },
  { name: 'Coordenação de culto' },
  { name: 'DIS' },
  { name: 'Espaço Vip' },
  { name: 'Fotografia' },
  { name: 'Live' },
  { name: 'Musikids' },
  { name: 'Security' },
  { name: 'Staff' },
  { name: 'Stories' },
  { name: 'Coordenação técnica' },
];

export const teams: Team[] = [
  { name: 'Equipe Alpha' },
  { name: 'Equipe Beta' },
  { name: 'Equipe Gamma' },
  { name: 'Equipe Delta' },
];

export const volunteers: Volunteer[] = [
  {
    id: '1',
    name: 'João Silva',
    team: 'Equipe Alpha',
    areas: ['Som', 'Projeção'],
    availability: ['Culto de Domingo', 'Culto de Quarta'],
    email: 'joao.silva@example.com',
    phone: '11-98765-4321',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    team: 'Equipe Beta',
    areas: ['Musikids'],
    availability: ['Culto de Domingo'],
    email: 'maria.oliveira@example.com',
    phone: '21-91234-5678',
  },
  {
    id: '3',
    name: 'Carlos Pereira',
    team: 'Equipe Gamma',
    areas: ['Recepção'],
    availability: ['Culto de Domingo', 'Culto de Quarta', 'Evento Especial'],
    email: 'carlos.pereira@example.com',
    phone: '31-95555-4444',
  },
  {
    id: '4',
    name: 'Ana Costa',
    team: 'Equipe Alpha',
    areas: ['Musikids', 'Cleaning'],
    availability: ['Culto de Domingo'],
    email: 'ana.costa@example.com',
    phone: '41-97777-8888',
  },
  {
    id: '5',
    name: 'Pedro Martins',
    team: 'Equipe Delta',
    areas: ['Som'],
    availability: ['Culto de Quarta'],
    email: 'pedro.martins@example.com',
    phone: '51-98888-7777',
  }
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Culto de Domingo',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '10:00',
    areas: ['Som', 'Projeção', 'Iluminação', 'Broadcasting', 'Recepção', 'Musikids', 'Security', 'Saúde'],
    responsible: 'Pastor Jonas',
  },
  {
    id: '2',
    name: 'Culto de Quarta',
    frequency: 'Semanal',
    dayOfWeek: 'Quarta-feira',
    time: '20:00',
    areas: ['Som', 'Projeção', 'Recepção'],
    responsible: 'Pastor Lucas',
  },
  {
    id: '3',
    name: 'Vigília',
    frequency: 'Pontual',
    date: '2024-07-26',
    time: '22:00',
    areas: ['Som', 'Iluminação', 'Cleaning'],
    responsible: 'Líder de Oração',
  },
    {
    id: '4',
    name: 'Culto da Família',
    frequency: 'Pontual',
    date: '2024-08-11',
    time: '18:00',
    areas: ['Som', 'Projeção', 'Iluminação', 'Broadcasting', 'Recepção', 'Musikids', 'Cleaning', 'Fotografia'],
    responsible: 'Pastor Jonas',
    observations: 'Evento especial de dia dos pais'
  },
];

export const teamSchedules: TeamSchedule[] = [
    { team: 'Equipe Alpha', startDate: '2024-07-01', endDate: '2024-07-07'},
    { team: 'Equipe Beta', startDate: '2024-07-08', endDate: '2024-07-14'},
    { team: 'Equipe Gamma', startDate: '2024-07-15', endDate: '2024-07-21'},
    { team: 'Equipe Delta', startDate: '2024-07-22', endDate: '2024-07-28'},
    { team: 'Equipe Alpha', startDate: '2024-07-29', endDate: '2024-08-04'},
    { team: 'Equipe Beta', startDate: '2024-08-05', endDate: '2024-08-11'},
    { team: 'Equipe Gamma', startDate: '2024-08-12', endDate: '2024-08-18'},
    { team: 'Equipe Delta', startDate: '2024-08-19', endDate: '2024-08-25'},
];
