"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc, query, orderBy, getDocs, writeBatch, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Volunteer, Event, Team, AreaOfService, TeamSchedule, SavedSchedule } from '@/lib/types';
import { 
    events as initialEvents,
    teams as initialTeams,
    areasOfService as initialAreas,
    teamSchedules as initialTeamSchedules,
    savedSchedules as initialSavedSchedules
} from '@/lib/data';
import { startOfMonth, endOfMonth, eachWeekOfInterval, format, addDays } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';

interface AppDataContextType {
  volunteers: Volunteer[];
  events: Event[];
  teams: Team[];
  areasOfService: AreaOfService[];
  teamSchedules: TeamSchedule[];
  savedSchedules: SavedSchedule[];
  loading: boolean;
  addVolunteer: (volunteer: Omit<Volunteer, 'id'>) => Promise<void>;
  updateVolunteer: (id: string, updatedVolunteer: Partial<Volunteer>) => Promise<void>;
  deleteVolunteer: (id: string) => Promise<void>;
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
  addTeam: (team: Omit<Team, 'id'>) => Promise<void>;
  updateTeam: (id: string, updatedTeam: Partial<Team>) => Promise<void>;
  deleteTeam: (id: string) => Promise<void>;
  addArea: (area: Omit<AreaOfService, 'id'>) => Promise<void>;
  updateArea: (id: string, updatedArea: Partial<AreaOfService>) => Promise<void>;
  deleteArea: (id: string) => Promise<void>;
  setTeamSchedules: React.Dispatch<React.SetStateAction<TeamSchedule[]>>;
  generateTeamSchedules: (year: number, month: number, startTeam: string) => void;
  setSavedSchedules: React.Dispatch<React.SetStateAction<SavedSchedule[]>>;
  saveSchedule: (schedule: SavedSchedule) => void;
  updateSavedSchedule: (id: string, updatedSchedule: SavedSchedule) => void;
  deleteSchedule: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [teams, setTeams] = useState<Team[]>([]);
  const [areasOfService, setAreasOfService] = useState<AreaOfService[]>([]);
  const [teamSchedules, setTeamSchedules] = useState<TeamSchedule[]>(initialTeamSchedules);
  const [savedSchedules, setSavedSchedules] = useState<SavedSchedule[]>(initialSavedSchedules);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
        setLoading(true);
        
        const volunteerQuery = query(collection(db, 'volunteers'), orderBy("name"));
        const teamsQuery = query(collection(db, 'teams'), orderBy("name"));
        const areasQuery = query(collection(db, 'areasOfService'), orderBy("name"));

        const unsubscribeVolunteers = onSnapshot(volunteerQuery, (snapshot) => {
            setVolunteers(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Volunteer)));
            setLoading(false); // Set loading to false after initial volunteer fetch
        }, (error) => {
            console.error("Error fetching volunteers:", error);
            setLoading(false);
        });

        const unsubscribeTeams = onSnapshot(teamsQuery, (snapshot) => {
            const teamsData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Team));
            if (teamsData.length === 0) {
                 const batch = writeBatch(db);
                initialTeams.forEach(team => {
                    const docRef = doc(collection(db, 'teams'));
                    batch.set(docRef, team);
                });
                batch.commit();
            } else {
                setTeams(teamsData);
            }
        }, (error) => console.error("Error fetching teams:", error));
        
        const unsubscribeAreas = onSnapshot(areasQuery, (snapshot) => {
            const areasData = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as AreaOfService));
            if (areasData.length === 0) {
                 const batch = writeBatch(db);
                initialAreas.forEach(area => {
                    const docRef = doc(collection(db, 'areasOfService'));
                    batch.set(docRef, area);
                });
                batch.commit();
            } else {
                 setAreasOfService(areasData);
            }
        }, (error) => console.error("Error fetching areas:", error));


        return () => {
            unsubscribeVolunteers();
            unsubscribeTeams();
            unsubscribeAreas();
        };

    } else {
        // If no user, clear data and stop loading.
        setVolunteers([]);
        setTeams([]);
        setAreasOfService([]);
        setLoading(false);
    }
  }, [user]);


  // Volunteer Actions
  const addVolunteer = async (volunteer: Omit<Volunteer, 'id'>): Promise<void> => {
    if(!user) throw new Error("User not authenticated");
    await addDoc(collection(db, 'volunteers'), volunteer);
  };
  const updateVolunteer = async (id: string, updatedVolunteer: Partial<Volunteer>) => {
    if(!user) return;
    await updateDoc(doc(db, 'volunteers', id), updatedVolunteer);
  };
  const deleteVolunteer = async (id: string) => {
    if(!user) return;
    await deleteDoc(doc(db, 'volunteers', id));
  };


  // Event Actions (still in-memory for now)
  const addEvent = (event: Event) => setEvents(prev => [...prev, event]);
  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents(prev => prev.map(e => e.id === id ? updatedEvent : e));
  };
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  // Team Actions (Firestore)
  const addTeam = async (team: Omit<Team, 'id'>): Promise<void> => {
    if(!user) throw new Error("User not authenticated");
    const existingQuery = query(collection(db, 'teams'), where('name', '==', team.name));
    const existingDocs = await getDocs(existingQuery);
    if (!existingDocs.empty) {
        throw new Error("Uma equipe com este nome já existe.");
    }
    await addDoc(collection(db, 'teams'), team);
  };
  const updateTeam = async (id: string, updatedTeam: Partial<Team>) => {
    if(!user) return;
    await updateDoc(doc(db, 'teams', id), updatedTeam);
  };
  const deleteTeam = async (id: string) => {
    if(!user) return;
    await deleteDoc(doc(db, 'teams', id));
  };

  // Area Actions (Firestore)
  const addArea = async (area: Omit<AreaOfService, 'id'>): Promise<void> => {
    if(!user) throw new Error("User not authenticated");
     const existingQuery = query(collection(db, 'areasOfService'), where('name', '==', area.name));
    const existingDocs = await getDocs(existingQuery);
    if (!existingDocs.empty) {
        throw new Error("Uma área de serviço com este nome já existe.");
    }
    await addDoc(collection(db, 'areasOfService'), area);
  };
  const updateArea = async (id: string, updatedArea: Partial<AreaOfService>) => {
    if(!user) return;
    await updateDoc(doc(db, 'areasOfService', id), updatedArea);
  };
  const deleteArea = async (id: string) => {
    if(!user) return;
    await deleteDoc(doc(db, 'areasOfService', id));
  };
  
  // Team Schedule Actions
  const generateTeamSchedules = (year: number, month: number, startTeam: string) => {
    if (teams.length === 0) return; // Don't generate if there are no teams
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
    volunteers, loading, addVolunteer, updateVolunteer, deleteVolunteer,
    events, setEvents, addEvent, updateEvent, deleteEvent,
    teams, addTeam, updateTeam, deleteTeam,
    areasOfService, addArea, updateArea, deleteArea,
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
