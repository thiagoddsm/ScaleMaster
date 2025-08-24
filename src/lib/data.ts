import type { Volunteer, Event, Team, TeamSchedule, AreaOfService, UserPermission, SavedSchedule } from './types';

export const adminUserEmail = "thiagoddsm@gmail.com";

export const areasOfService: AreaOfService[] = [
    { name: "Apoio" },
    { name: "Bistrô" },
    { name: "Boutique" },
    { name: "Broadcasting" },
    { name: "Cleaning" },
    { name: "Coffe Break" },
    { name: "Coordenação De Culto" },
    { name: "Dis" },
    { name: "Eklesia" },
    { name: "Espaço Vip" },
    { name: "Estacionamento" },
    { name: "Fotografia" },
    { name: "Iluminação" },
    { name: "Intercessão" },
    { name: "Live" },
    { name: "Musikids" },
    { name: "Professores" },
    { name: "Projeção" },
    { name: "Recepção" },
    { name: "Saúde" },
    { name: "Security" },
    { name: "Som" },
    { name: "Staff" },
    { name: "Stories" },
].sort((a, b) => a.name.localeCompare(b.name));

export const teams: Team[] = [
  { name: 'Alpha' },
  { name: "Bravo" },
  { name: "Charlie" },
  { name: "Delta" },
];

export const volunteers: Volunteer[] = [
  { id: '1', name: 'Lucas Cunha', team: 'Alpha', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '2', name: 'Marcelo Daniel', team: 'Bravo', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '3', name: 'Ramon Abdias', team: 'Charlie', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '4', name: 'Sérgio Ricardo', team: 'Delta', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '5', name: 'Ana Cristina Leal', team: 'Alpha', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '6', name: 'Carlos Borges Junior', team: 'Bravo', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '7', name: 'Daniele Sota', team: 'Charlie', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '8', name: 'Gisele Rocha', team: 'Delta', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '9', name: 'Andressa Roza', team: 'Alpha', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '10', name: 'Filipe Sant\'Anna', team: 'Bravo', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '11', name: 'Isabelle Nunes', team: 'Charlie', areas: ['Som'], availability: ['Culto da Família'] },
  { id: '12', name: 'Raphael Roza', team: 'Delta', areas: ['Som'], availability: ['Culto da Família'] },
  // New Volunteers
  { id: '13', name: 'Juliana Paes', team: 'Alpha', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '14', name: 'Marcos Freitas', team: 'Bravo', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '15', name: 'Beatriz Almeida', team: 'Charlie', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '16', name: 'Leandro Castro', team: 'Delta', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '17', name: 'Fernanda Lima', team: 'Alpha', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '18', name: 'Gustavo Ribeiro', team: 'Bravo', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '19', name: 'Patrícia Souza', team: 'Charlie', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '20', name: 'Ricardo Oliveira', team: 'Delta', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '21', name: 'Camila Santos', team: 'Alpha', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '22', name: 'Rodrigo Pereira', team: 'Bravo', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '23', name: 'Amanda Costa', team: 'Charlie', areas: ['Projeção'], availability: ['Culto da Família'] },
  { id: '24', name: 'Vinicius Ferreira', team: 'Delta', areas: ['Projeção'], availability: ['Culto da Família'] },
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Culto da Família',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '10:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
    ],
    responsible: 'Pastor Jonas',
  },
  {
    id: '2',
    name: 'Culto de Propósitos',
    frequency: 'Semanal',
    dayOfWeek: 'Quinta-feira',
    time: '20:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
    ],
  },
  {
    id: '3',
    name: 'Culto Clássico',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '08:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
    ],
  },
  {
    id: '4',
    name: 'Culto da Tarde',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '16:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
    ],
  },
  {
    id: '5',
    name: 'Culto da Noite',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '19:00',
    areas: [
      { name: 'Som', volunteersNeeded: 1 },
      { name: 'Projeção', volunteersNeeded: 1 },
    ],
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
    { team: 'Alpha', startDate: '2024-08-26', endDate: '2024-09-01'},
    { team: 'Bravo', startDate: '2024-09-02', endDate: '2024-09-08'},
    { team: 'Charlie', startDate: '2024-09-09', endDate: '2024-09-15'},
    { team: 'Delta', startDate: '2024-09-16', endDate: '2024-09-22'},
    { team: 'Alpha', startDate: '2024-09-23', endDate: '2024-09-29'},
    // New Schedules based on user request for 2025
    { team: 'Alpha', startDate: '2025-08-03', endDate: '2025-08-09'},
    { team: 'Bravo', startDate: '2025-08-10', endDate: '2025-08-16'},
    { team: 'Charlie', startDate: '2025-08-17', endDate: '2025-08-23'},
    { team: 'Delta', startDate: '2025-08-24', endDate: '2025-08-30'},
    { team: 'Alpha', startDate: '2025-08-31', endDate: '2025-09-06'},
];

// This is a mock in-memory storage for saved schedules.
// In a real app, this would be stored in a database.
export const savedSchedules: SavedSchedule[] = [];

export const userPermissions: UserPermission[] = [
    // The master admin permissions are now handled in the component
    // based on the adminUserEmail. This array can be used for other
    // specific user permissions in the future.
];
