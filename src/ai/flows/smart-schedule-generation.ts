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
import type { Event } from '@/lib/types';

const GenerateScheduleInputSchema = z.object({
  month: z.number().min(1).max(12).describe('The month to generate the schedule for (1-12).'),
  year: z.number().min(2024).describe('The year to generate the schedule for.'),
  events: z.array(z.any()).describe('A list of all possible events.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;

const GenerateScheduleOutputSchema = z.object({
  assignments: z.array(z.object({
    eventUniqueName: z.string().describe("The unique name of the event, in the format \"[Event Name] - [dd/MM]\". Use two digits for day and month."),
    area: z.string().describe("The area of service for the assignment."),
    position: z.number().describe("The position number for the assignment (e.g., 1, 2, 3)."),
    volunteer: z.string().nullable().optional().describe("The name of the assigned volunteer. MUST BE NULL for this step."),
    reason: z.string().nullable().optional().describe("The reason for the assignment outcome. MUST BE NULL for this step."),
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
    **CONTEXT AND OBJECTIVE:**
    Your goal is to create the skeleton of a service schedule for a specific month, based on the events that take place. You should NOT allocate any volunteers.

    **RULES AND GENERATION PROCESS:**

    You must follow this 2-step process in the exact order.

    **1. Calculate Event Dates:**
    - For the given month and year, determine all occurrence dates for each event.
    - For 'Semanal' (Weekly) events, find all dates for the specified 'dayOfWeek' in the month.
    - For 'Pontual' (One-time) events, check if the event's 'date' occurs in the requested month/year.

    **2. Generate the Master Slot List:**
    - For each event occurrence calculated in Step 1, and for each service area required in that event, create a list of slots.
    - If an event needs 2 volunteers for "Recepção", your master slot list must contain two separate entries for "Recepção" on that day (one for Position 1 and another for Position 2).
    - The final result should be a JSON object that perfectly matches the provided output schema.
    - Each slot from Step 2 must result in exactly one object in the 'assignments' array.
    - The 'eventUniqueName' field must be in the format "Event Name - dd/MM". Use two digits for day and month.
    - **IMPORTANT:** The 'volunteer' and 'reason' fields must **always** be null for this step. Just generate the structure of the slots.

    **Input Data:**
    - Month: {{{month}}}
    - Year: {{{year}}}
    - Events: {{{json events}}}
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
