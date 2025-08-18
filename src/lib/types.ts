export type Volunteer = {
  id: string;
  name: string;
  team: string;
  areas: string[];
  availability: string[];
  phone?: string;
  email?: string;
};

export type Event = {
  id: string;
  name: string;
  frequency: 'Semanal' | 'Pontual';
  dayOfWeek?: string;
  date?: string; // YYYY-MM-DD
  time: string;
  areas: string[];
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

export type GeneratedSchedule = {
  [key: string]: string;
};

export type MonthlyEvent = {
  date: Date;
  name: string;
  areas: string[];
  uniqueName: string;
};
