'use server';
/**
 * @fileOverview A smart scheduling AI agent for volunteers.
 *
 * - generateSchedule - A function that handles the volunteer scheduling process.
 * - GenerateScheduleInput - The input type for the generateSchedule function.
 * - GenerateScheduleOutput - The return type for the generateSchedule function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { Volunteer, Event, Team, TeamSchedule } from '@/lib/types';

const GenerateScheduleInputSchema = z.object({
  month: z.number().min(1).max(12).describe('The month to generate the schedule for (1-12).'),
  year: z.number().min(2024).describe('The year to generate the schedule for.'),
  volunteers: z.array(z.any()).describe('A list of all available volunteers.'),
  events: z.array(z.any()).describe('A list of all possible events.'),
  teams: z.array(z.any()).describe('A list of all teams.'),
  teamSchedules: z.array(z.any()).describe('The rotation schedule for the teams.'),
  areasToSchedule: z.array(z.string()).describe('A list of service areas to generate the schedule for. If the list is empty, generate for all areas required by the events.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;

const GenerateScheduleOutputSchema = z.object({
  assignments: z.array(z.object({
    eventUniqueName: z.string().describe("The unique name of the event, in the format \"[Event Name] - [dd/MM]\". Use two digits for day and month."),
    area: z.string().describe("The area of service for the assignment."),
    position: z.number().describe("The position number for the assignment (e.g., 1, 2, 3)."),
    volunteer: z.string().nullable().optional().describe("The name of the assigned volunteer, or null if no one was assigned."),
    reason: z.string().nullable().optional().describe("The reason for the assignment outcome, especially if a volunteer could not be assigned."),
  })).describe("A list of all the volunteer assignments for the requested schedule."),
});
export type GenerateScheduleOutput = z.infer<typeof GenerateScheduleOutputSchema>;


export async function generateSchedule(input: GenerateScheduleInput): Promise<GenerateScheduleOutput> {
  // This wrapper is needed for the client to call the flow.
  return generateScheduleFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateSchedulePrompt',
  input: { schema: GenerateScheduleInputSchema },
  output: { schema: GenerateScheduleOutputSchema },
  prompt: `
    You are an intelligent scheduling assistant for a church. Your task is to generate a volunteer schedule for a given month and year based on a set of rules.

    **Rules:**
    1.  **Determine Event Dates:** First, identify all event occurrences for the given month and year.
        *   For 'Semanal' events, calculate all dates for the specified 'dayOfWeek'.
        *   For 'Pontual' events, check if their 'date' falls within the requested month and year.
    2.  **Filter by Area (if applicable):** Check if the 'areasToSchedule' list is provided and not empty.
        *   If it is, you MUST ONLY generate assignments for the event areas that are present in the 'areasToSchedule' list.
        *   If 'areasToSchedule' is empty or not provided, generate assignments for all areas required by each event.
    3.  **Identify Responsible Team:** For each event date, determine the responsible team based on the 'teamSchedules' data. The team schedule dictates which team is active for each week (Sunday to Saturday).
    4.  **Assign Volunteers:** For each required position in an event (that matches the area filter):
        *   Find a volunteer who meets ALL the following criteria:
            a.  Is a member of the **responsible team** for that week.
            b.  Serves in the required **area**.
            c.  Is available for that specific **event name** (e.g., 'Culto da família').
            d.  Is **not already assigned** to another position on the same day. A volunteer can only take one position per day.
    5.  **Fill Positions:**
        *   If a suitable volunteer is found, assign their name to the 'volunteer' field and set 'reason' to null.
        *   If no suitable volunteer is found, set 'volunteer' to null and provide a **brief, clear reason** in the 'reason' field (e.g., "Equipe sem voluntários para a área", "Voluntário indisponível", "Voluntários já alocados").
    6.  **Output Format:**
        *   The final output MUST be a valid JSON object matching the provided schema.
        *   For each position required by a filtered event on a specific date, create one assignment object.
        *   The 'eventUniqueName' must be in the format "Event Name - dd/MM". Use two digits for day and month.
        *   **CRITICAL: Do NOT include any assignments for areas that were not requested in the 'areasToSchedule' input (if provided).**
        *   Ensure all event occurrences within the month are processed.

    **Input Data:**
    - Month: {{{month}}}
    - Year: {{{year}}}
    - Volunteers: {{{json volunteers}}}
    - Events: {{{json events}}}
    - Teams: {{{json teams}}}
    - Team Rotation Schedule: {{{json teamSchedules}}}
    - Areas to Schedule: {{{json areasToSchedule}}}
  `,
});

const generateScheduleFlow = ai.defineFlow(
  {
    name: 'generateScheduleFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
