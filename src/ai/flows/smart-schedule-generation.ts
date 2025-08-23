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
    You are an intelligent scheduling assistant for a church. Your task is to generate a volunteer schedule for a given month and year based on a set of rules. You must follow the process below exactly.

    **Process:**

    1.  **Determine Event Dates:** First, identify all event occurrences for the given month and year.
        *   For 'Semanal' events, calculate all dates for the specified 'dayOfWeek'.
        *   For 'Pontual' events, check if their 'date' falls within the requested month and year.

    2.  **Generate All Potential Assignments (Master List of VAGAS):** For each event occurrence identified in Step 1, create a master list of every single required position. For example, if "Culto da família" needs 2 people for "Recepção", your list should contain entries for "Recepção Pos. 1" and "Recepção Pos. 2" for that specific date. This is your master list of VAGAS.

    3.  **Filter and Assign (Iterate through VAGAS):** Now, iterate through your master list of VAGAS. For each vaga, you will create ONE final assignment object.
        *   **Area Filtering:** First, check if the 'areasToSchedule' input array is provided and not empty.
            *   If it is, and the current vaga's area is NOT in the 'areasToSchedule' array, you MUST discard this vaga. Do not create an assignment for it and do not include it in the final output.
            *   If the vaga's area IS in the 'areasToSchedule' array (or if the array is empty), proceed to the next step.
        *   **Assign Volunteer:** If the vaga passes the area filter, proceed to find a suitable volunteer.
            a.  Identify the **responsible team** for the event's date using the 'teamSchedules' data.
            b.  Find a volunteer who meets ALL the following criteria:
                i.   Is a member of the **responsible team**.
                ii.  Serves in the required **area** for the vaga.
                iii. Is **available** for that specific **event name** (e.g., 'Culto da família').
                iv.  Is **not already assigned** to another position on the same day. A volunteer can only take one position per day.
            c.  **Create ONE Output Object:** Based on the assignment outcome, create a single assignment object for the vaga.
                *   If a suitable volunteer is found, set their name in the 'volunteer' field. The 'reason' field should be null.
                *   If no suitable volunteer is found, set the 'volunteer' field to null and provide a **brief, clear reason** in the 'reason' field (e.g., "Equipe sem voluntários para a área", "Voluntário indisponível", "Voluntários já alocados").

    4.  **Final Output Format:**
        *   The final output MUST be a valid JSON object matching the provided output schema.
        *   The 'eventUniqueName' must be in the format "Event Name - dd/MM". Use two digits for day and month.
        *   Ensure every single vaga that passes the area filter from Step 3 results in exactly one assignment object in the final output. There must be no duplicates.

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

