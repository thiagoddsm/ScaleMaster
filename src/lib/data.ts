import type { Volunteer, Event, Team, TeamSchedule, AreaOfService, UserPermission } from './types';

export const adminUserEmail = "thiagoddsm@gmail.com";

export const areasOfService: AreaOfService[] = [
    { name: "Som" },
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
];

export const events: Event[] = [
  {
    id: '1',
    name: 'Culto da Família',
    frequency: 'Semanal',
    dayOfWeek: 'Domingo',
    time: '10:00',
    areas: [
      { name: 'Som', volunteersNeeded: 2 },
    ],
    responsible: 'Pastor Jonas',
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
