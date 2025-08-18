// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Automatically assigns volunteers to events based on their availability, area of service, and team.
 *
 * - smartScheduleGeneration - A function that handles the smart schedule generation process.
 * - SmartScheduleGenerationInput - The input type for the smartScheduleGeneration function.
 * - SmartScheduleGenerationOutput - The return type for the smartScheduleGeneration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartScheduleGenerationInputSchema = z.object({
  month: z.number().describe('The month for which to generate the schedule (1-12).'),
  year: z.number().describe('The year for which to generate the schedule.'),
  eventsData: z.string().describe('JSON string of events data, each event containing name, areas with volunteers needed, and date.'),
  volunteersData: z.string().describe('JSON string of volunteers data, each volunteer containing name, areas, availability, and team.'),
  teamsScheduleData: z.string().describe('JSON string of teams schedule data, assigning teams to date ranges.'),
  areasOfService: z.string().describe('JSON string of areas of service.'),
  specificArea: z.string().optional().describe('An optional specific area of service to generate the schedule for. If not provided, generate for all areas.'),
});
export type SmartScheduleGenerationInput = z.infer<typeof SmartScheduleGenerationInputSchema>;

const SmartScheduleGenerationOutputSchema = z.object({
  schedule: z.string().describe('JSON string of the generated schedule. The key is "[Event Name] - [Area of Service] - [Position Number]". The value is an object with "volunteer" (string or null) and "reason" (string or null for why it was not assigned).'),
});
export type SmartScheduleGenerationOutput = z.infer<typeof SmartScheduleGenerationOutputSchema>;

export async function smartScheduleGeneration(input: SmartScheduleGenerationInput): Promise<SmartScheduleGenerationOutput> {
  return smartScheduleGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartScheduleGenerationPrompt',
  input: {schema: SmartScheduleGenerationInputSchema},
  output: {schema: SmartScheduleGenerationOutputSchema},
  prompt: `You are an AI scheduling assistant tasked with generating an optimal volunteer schedule for a set of events.

You will be provided with data about events, volunteers, and team schedules. Your goal is to produce a JSON schedule that assigns the best-suited volunteer to each event, area of service, and required position.
{{#if specificArea}}
You will generate the schedule ONLY for the following area: {{{specificArea}}}.
{{else}}
You will generate the schedule for all areas listed in the areas of service data.
{{/if}}


Here is the information you will be working with:

Month: {{{month}}}
Year: {{{year}}}

Events Data:
{{{eventsData}}}
Each event in the data contains a list of areas and the number of volunteers needed for each area.

Volunteers Data:
{{{volunteersData}}}

Teams Schedule Data:
{{{teamsScheduleData}}}

Areas of Service:
{{{areasOfService}}}

Consider the following constraints and guidelines when generating the schedule:

*   Volunteers should only be assigned to events for which they have indicated availability.
*   Volunteers should only be assigned to areas of service in which they are qualified.
*   If team schedules are provided, volunteers should primarily be assigned to events that fall within their team's scheduled dates.
*   Attempt to distribute assignments evenly among volunteers, to avoid overburdening any single individual.
*   A single volunteer cannot be assigned to two different positions in the same event.
*   If an area requires more than one volunteer, you must assign different volunteers to each position.
*   If a volunteer is not available or no suitable volunteer is found, you MUST provide a reason. Set the 'volunteer' field to null and the 'reason' field to a brief explanation (e.g., "No volunteers available", "No one from the scheduled team is available", "Event does not require this area").

Produce the schedule in JSON format. The JSON should have the following structure where the key includes the event name, area, and position number (from 1 to N, where N is the number of volunteers needed).

The value for each key must be an object: { "volunteer": "[Volunteer Name]" | null, "reason": "[Reason for no assignment]" | null }.

Example:

{
  "Sunday Service - Sound - 1": { "volunteer": "John Doe", "reason": null },
  "Sunday Service - Reception - 1": { "volunteer": "Jane Smith", "reason": null },
  "Sunday Service - Reception - 2": { "volunteer": null, "reason": "No available volunteers" }
}

Ensure the JSON is valid and parsable.
`, 
});

const smartScheduleGenerationFlow = ai.defineFlow(
  {
    name: 'smartScheduleGenerationFlow',
    inputSchema: SmartScheduleGenerationInputSchema,
    outputSchema: SmartScheduleGenerationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
