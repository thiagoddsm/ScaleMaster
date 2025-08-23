import type { Volunteer, Event, Team, TeamSchedule, AreaOfService, UserPermission } from './types';

export const adminUserEmail = "thiagoddsm@gmail.com";

export const areasOfService: AreaOfService[] = [
    { name: "Apoio" },
    { name: "Bistro" },
    { name: "Boutique" },
    { name: "Broadcasting" },
    { name: "Cleaning" },
    { name: "Coffee Break" },
    { name: "Coordenação de culto" },
    { name: "Coordenação técnica" },
    { name: "DIS" },
    { name: "Espaço Vip" },
    { name: "Estacionamento" },
    { name: "Fotografia" },
    { name: "Iluminação" },
    { name: "Live" },
    { name: "Musikids" },
    { name: "Projeção" },
    { name: "Recepção" },
    { name: "Saúde" },
    { name: "Security" },
    { name: "Som" },
    { name: "Staff" },
    { name: "Stories" }
].sort((a, b) => a.name.localeCompare(b.name));

export const teams: Team[] = [
  { name: 'Alpha' },
  { name: "Bravo" },
  { name: "Charlie" },
  { name: "Delta" },
];

export const volunteers: Volunteer[] = [
  // Som - 4 volunteers
  { id: '1', name: 'Lucas Cunha', team: 'Alpha', areas: ['Som'], availability: ['Culto da família', 'Culto da noite', 'Santa Ceia'] },
  { id: '2', name: 'Marcelo Daniel', team: 'Bravo', areas: ['Som'], availability: ['Culto clássico', 'Culto da tarde', 'Culto de Oração'] },
  { id: '3', name: 'Ramon Abdias', team: 'Charlie', areas: ['Som', 'Live'], availability: ['Culto da família', 'Culto propósitos'] },
  { id: '4', name: 'Sérgio Ricardo', team: 'Delta', areas: ['Som'], availability: ['Culto da noite'] },

  // Recepção - 4 volunteers
  { id: '5', name: 'Ana Cristina Leal', team: 'Alpha', areas: ['Recepção'], availability: ['Culto clássico', 'Culto da família'] },
  { id: '6', name: 'Carlos Borges Junior', team: 'Bravo', areas: ['Recepção', 'Estacionamento'], availability: ['Culto da tarde', 'Culto da noite', 'Batismo'] },
  { id: '7', name: 'Daniele Sota', team: 'Charlie', areas: ['Recepção'], availability: ['Culto da família'] },
  { id: '8', name: 'Gisele Rocha', team: 'Delta', areas: ['Recepção', 'Projeção'], availability: ['Culto propósitos', 'Santa Ceia'] },

  // Musikids - 4 volunteers
  { id: '9', name: 'Andressa Roza', team: 'Alpha', areas: ['Musikids'], availability: ['Culto da família'] },
  { id: '10', name: 'Filipe Sant\'Anna', team: 'Bravo', areas: ['Musikids', 'Som'], availability: ['Culto da família'] },
  { id: '11', name: 'Isabelle Nunes', team: 'Charlie', areas: ['Musikids'], availability: ['Culto da família', 'Culto da noite'] },
  { id: '12', name: 'Raphael Roza', team: 'Delta', areas: ['Musikids'], availability: ['Culto da família', 'Culto de Oração'] },

  // Broadcasting - 4 volunteers
  { id: '13', name: 'Filipe Nunes', team: 'Alpha', areas: ['Broadcasting'], availability: ['Culto da família', 'Culto da noite'] },
  { id: '14', name: 'Jean Moraes', team: 'Bravo', areas: ['Broadcasting', 'Staff'], availability: ['Culto da noite', 'Culto propósitos'] },
  { id: '15', name: 'Keren Abdias', team: 'Charlie', areas: ['Broadcasting'], availability: ['Culto da família'] },
  { id: '16', name: 'Rodrigo Rodrigues', team: 'Delta', areas: ['Broadcasting'], availability: ['Culto clássico', 'Culto da tarde'] },
  
  // Apoio - 4 volunteers
  { id: '17', name: 'Arislédio Ferreira', team: 'Alpha', areas: ['Apoio'], availability: ['Culto clássico', 'Culto da família'] },
  { id: '18', name: 'Carlos Thurler', team: 'Bravo', areas: ['Apoio'], availability: ['Culto da tarde', 'Culto da noite', 'Santa Ceia'] },
  { id: '19', name: 'Deyvson Caetano', team: 'Charlie', areas: ['Apoio'], availability: ['Culto da família', 'Culto propósitos', 'Batismo'] },
  { id: '20', name: 'Fabio Sota', team: 'Delta', areas: ['Apoio'], availability: ['Culto da noite'] },
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Culto clássico',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '07:30',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
      { name: 'Recepção', volunteersNeeded: 1 },
      { name: 'Apoio', volunteersNeeded: 1 },
      { name: 'Security', volunteersNeeded: 1 },
      { name: 'Saúde', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Jonas',
  },
  {
    id: '2',
    name: 'Culto da família',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '10:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
      { name: 'Iluminação', volunteersNeeded: 1 },
      { name: 'Broadcasting', volunteersNeeded: 1 },
      { name: 'Recepção', volunteersNeeded: 1 },
      { name: 'Musikids', volunteersNeeded: 1 },
      { name: 'Security', volunteersNeeded: 1 },
      { name: 'Saúde', volunteersNeeded: 1 },
      { name: 'Apoio', volunteersNeeded: 1 },
      { name: 'Estacionamento', volunteersNeeded: 1 },
      { name: 'Fotografia', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Jonas',
  },
  {
    id: '3',
    name: 'Culto da tarde',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '17:30',
    areas: [
        { name: 'Som', volunteersNeeded: 1 },
        { name: 'Projeção', volunteersNeeded: 1 },
        { name: 'Iluminação', volunteersNeeded: 1 },
        { name: 'Broadcasting', volunteersNeeded: 1 },
        { name: 'Recepção', volunteersNeeded: 1 },
        { name: 'Apoio', volunteersNeeded: 1 },
        { name: 'Security', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Lucas',
  },
  {
    id: '4',
    name: 'Culto da noite',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '19:30',
    areas: [
        { name: 'Som', volunteersNeeded: 1 },
        { name: 'Projeção', volunteersNeeded: 1 },
        { name: 'Iluminação', volunteersNeeded: 1 },
        { name: 'Broadcasting', volunteersNeeded: 1 },
        { name: 'Recepção', volunteersNeeded: 1 },
        { name: 'Musikids', volunteersNeeded: 1 },
        { name: 'Security', volunteersNeeded: 1 },
        { name: 'Saúde', volunteersNeeded: 1 },
        { name: 'Apoio', volunteersNeeded: 1 },
        { name: 'Estacionamento', volunteersNeeded: 1 },
        { name: 'Fotografia', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Lucas',
  },
  {
    id: '5',
    name: 'Culto propósitos',
    frequency: 'Semanal',
    dayOfWeek: 'Quinta-feira',
    time: '20:00',
    areas: [
        { name: 'Som', volunteersNeeded: 1 },
        { name: 'Projeção', volunteersNeeded: 1 },
        { name: 'Recepção', volunteersNeeded: 1 },
        { name: 'Apoio', volunteersNeeded: 1 },
    ],
    responsible: 'Líder de Oração',
  },
  {
    id: '6',
    name: 'Santa Ceia',
    frequency: 'Pontual',
    date: '2024-07-07',
    time: '10:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
      { name: 'Apoio', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Sênior',
    observations: 'Evento especial, requer mais apoio.'
  },
  {
    id: '7',
    name: 'Culto de Oração',
    frequency: 'Pontual',
    date: '2024-07-15',
    time: '19:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Apoio', volunteersNeeded: 1 },
    ],
    responsible: 'Líder de Oração',
  },
  {
    id: '8',
    name: 'Batismo',
    frequency: 'Pontual',
    date: '2024-08-25',
    time: '15:00',
    areas: [
      { name: 'Recepção', volunteersNeeded: 1 },
      { name: 'Apoio', volunteersNeeded: 1 },
      { name: 'Fotografia', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Sênior',
  },
];

export const teamSchedules: TeamSchedule[] = [
    { team: 'Alpha', startDate: '2024-07-01', endDate: '2024-07-07'},
    { team: 'Bravo', startDate: '2024-07-08', endDate: '2024-07-14'},
    { team: 'Charlie', startDate: '2024-07-15', endDate: '2024-07-21'},
    { team: 'Delta', startDate: '2024-07-22', endDate: '2024-07-28'},
    { team: 'Alpha', startDate: '2024-07-29', endDate: '2024-08-04'},
    { team: 'Bravo', startDate: '2024-08-05', endDate: '2024-08-11'},
    { team: 'Charlie', startDate: '2024-08-12', endDate: '2024-08-18'},
    { team: 'Delta', startDate: '2024-08-19', endDate: '2024-08-25'},
    { team: 'Alpha', startDate: '2024-09-02', endDate: '2024-09-08'},
    { team: 'Bravo', startDate: '2024-09-09', endDate: '2024-09-15'},
    { team: 'Charlie', startDate: '2024-09-16', endDate: '2024-09-22'},
    { team: 'Delta', startDate: '2024-09-23', endDate: '2024-09-29'},
];

// This is a mock in-memory storage for saved schedules.
// In a real app, this would be stored in a database.
export const savedSchedules: any[] = [];

// This is a mock for user permissions. In a real app, this would be in a database.
export const userPermissions: UserPermission[] = [
    // The master admin permissions are now handled in the component
    // based on the adminUserEmail. This array can be used for other
    // specific user permissions in the future.
];
