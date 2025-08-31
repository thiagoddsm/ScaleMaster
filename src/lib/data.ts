import type { Volunteer, Event, Team, TeamSchedule, AreaOfService, UserPermission, SavedSchedule } from './types';

export const adminUserEmail = "thiagoddsm@gmail.com";

// This is now initial seed data. The source of truth is Firestore.
export const areasOfService: Omit<AreaOfService, 'id'>[] = [
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

// This is now initial seed data. The source of truth is Firestore.
export const teams: Omit<Team, 'id'>[] = [
  { name: 'Alpha' },
  { name: "Bravo" },
  { name: "Charlie" },
  { name: "Delta" },
];

export const volunteers: Volunteer[] = [
  // This data is now fetched from Firestore.
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
      { name: 'Staff', volunteersNeeded: 1 },
      { name: 'Coordenação De Culto', volunteersNeeded: 1 },
      { name: 'Fotografia', volunteersNeeded: 1 },
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
