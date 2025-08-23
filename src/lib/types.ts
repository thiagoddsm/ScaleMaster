import { GenerateScheduleOutput, ScheduleItem } from "@/ai/flows/smart-schedule-generation";

export type Volunteer = {
  id: string;
  name: string;
  team: string;
  areas: string[];
  availability: string[];
  phone?: string;
  email?: string;
};

export type EventArea = {
  name: string;
  volunteersNeeded: number;
};

export type Event = {
  id: string;
  name: string;
  frequency: 'Semanal' | 'Pontual';
  dayOfWeek?: string;
  date?: string; // YYYY-MM-DD
  time: string;
  areas: EventArea[];
  responsible?: string;
  contact?: string;
  observations?: string;
};

export type Team = {
  name: string;
};

export type TeamSchedule = {
  team: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
};

export type AreaOfService = {
  name: string;
  leader?: string;
  leaderPhone?: string;
};

export type UserPermission = {
  userId: string;
  userDisplayName: string;
  userPhotoURL: string;
  canManageVolunteers: boolean;
  canManageEvents: boolean;
  canManageAreas: boolean;
  canManageTeams: boolean;
  canGenerateSchedules: boolean;
  canManageSettings: boolean;
};

export type SavedSchedule = {
  id: string;
  title: string;
  createdAt: string;
  year: number;
  month: number;
  data: GenerateScheduleOutput;
}

export type ScheduleAssignment = ScheduleItem & {
  fullDate: string;
  dayOfWeek: string;
};
