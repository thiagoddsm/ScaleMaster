"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Volunteer, Event, Team, AreaOfService, TeamSchedule, SavedSchedule } from '@/lib/types';
import { 
    volunteers as initialVolunteers,
    events as initialEvents,
    teams as initialTeams,
    areasOfService as initialAreas,
    teamSchedules as initialTeamSchedules,
    savedSchedules as initialSavedSchedules
} from '@/lib/data';
import { startOfMonth, endOfMonth, eachWeekOfInterval, format, addDays } from 'date-fns';

interface AppDataContextType {
  volunteers: Volunteer[];
  events: Event[];
  teams: Team[];
  areasOfService: AreaOfService[];
  teamSchedules: TeamSchedule[];
  savedSchedules: SavedSchedule[];
  setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  addVolunteer: (volunteer: Volunteer) => void;
  updateVolunteer: (id: string, updatedVolunteer: Volunteer) => void;
  deleteVolunteer: (id: string) => void;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  addTeam: (team: Team) => void;
  updateTeam: (name: string, updatedTeam: Team) => void;
  deleteTeam: (name: string) => void;
  setAreasOfService: React.Dispatch<React.SetStateAction<AreaOfService[]>>;
  addArea: (area: AreaOfService) => void;
  updateArea: (name: string, updatedArea: AreaOfService) => void;
  deleteArea: (name: string) => void;
  setTeamSchedules: React.Dispatch<React.SetStateAction<TeamSchedule[]>>;
  generateTeamSchedules: (year: number, month: number, startTeam: string) => void;
  setSavedSchedules: React.Dispatch<React.SetStateAction<SavedSchedule[]>>;
  saveSchedule: (schedule: SavedSchedule) => void;
  updateSavedSchedule: (id: string, updatedSchedule: SavedSchedule) => void;
  deleteSchedule: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [areasOfService, setAreasOfService] = useState<AreaOfService[]>(initialAreas);
  const [teamSchedules, setTeamSchedules] = useState<TeamSchedule[]>(initialTeamSchedules);
  const [savedSchedules, setSavedSchedules] = useState<SavedSchedule[]>(initialSavedSchedules);

  // Volunteer Actions
  const addVolunteer = (volunteer: Volunteer) => setVolunteers(prev => [...prev, volunteer]);
  const updateVolunteer = (id: string, updatedVolunteer: Volunteer) => {
    setVolunteers(prev => prev.map(v => v.id === id ? updatedVolunteer : v));
  };
  const deleteVolunteer = (id: string) => setVolunteers(prev => prev.filter(v => v.id !== id));

  // Event Actions
  const addEvent = (event: Event) => setEvents(prev => [...prev, event]);
  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
  };
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  // Team Actions
  const addTeam = (team: Team) => setTeams(prev => [...prev, team].sort((a,b) => a.name.localeCompare(b.name)));
  const updateTeam = (name: string, updatedTeam: Team) => {
    setTeams(prev => prev.map(t => t.name === name ? updatedTeam : t).sort((a,b) => a.name.localeCompare(b.name)));
  };
  const deleteTeam = (name: string) => setTeams(prev => prev.filter(t => t.name !== name));

  // Area Actions
  const addArea = (area: AreaOfService) => setAreasOfService(prev => [...prev, area].sort((a,b) => a.name.localeCompare(b.name)));
  const updateArea = (name: string, updatedArea: AreaOfService) => {
    setAreasOfService(prev => prev.map(a => a.name === name ? updatedArea : a).sort((a,b) => a.name.localeCompare(b.name)));
  };
  const deleteArea = (name: string) => setAreasOfService(prev => prev.filter(a => a.name !== name));
  
  // Team Schedule Actions
  const generateTeamSchedules = (year: number, month: number, startTeam: string) => {
    const newSchedules: TeamSchedule[] = [];
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));
    
    const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 });

    let teamIndex = teams.findIndex(t => t.name === startTeam);
    if (teamIndex === -1) teamIndex = 0;

    weeks.forEach(weekStart => {
        const weekEnd = addDays(weekStart, 6);
        const team = teams[teamIndex % teams.length];
        
        newSchedules.push({
            team: team.name,
            startDate: format(weekStart, 'yyyy-MM-dd'),
            endDate: format(weekEnd, 'yyyy-MM-dd'),
        });
        
        teamIndex++;
    });

    setTeamSchedules(newSchedules);
  };
  
  // Saved Schedule Actions
  const saveSchedule = (schedule: SavedSchedule) => {
    setSavedSchedules(prev => {
        // Find if a schedule for the same month and year already exists
        const existingIndex = prev.findIndex(s => s.year === schedule.year && s.month === schedule.month);
        if (existingIndex > -1) {
            // If it exists, replace it
            const newSchedules = [...prev];
            newSchedules[existingIndex] = schedule;
            return newSchedules;
        }
        // Otherwise, add the new schedule
        return [...prev, schedule];
    });
  };
  
  const updateSavedSchedule = (id: string, updatedSchedule: SavedSchedule) => {
    setSavedSchedules(prev => prev.map(s => s.id === id ? updatedSchedule : s));
  };
  
  const deleteSchedule = (id: string) => {
      setSavedSchedules(prev => prev.filter(s => s.id !== id));
  };


  const value = {
    volunteers, setVolunteers, addVolunteer, updateVolunteer, deleteVolunteer,
    events, setEvents, addEvent, updateEvent, deleteEvent,
    teams, setTeams, addTeam, updateTeam, deleteTeam,
    areasOfService, setAreasOfService, addArea, updateArea, deleteArea,
    teamSchedules, setTeamSchedules, generateTeamSchedules,
    savedSchedules, setSavedSchedules, saveSchedule, updateSavedSchedule, deleteSchedule,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
}
