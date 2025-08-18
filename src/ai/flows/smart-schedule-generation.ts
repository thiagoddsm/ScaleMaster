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

const AssignmentSchema = z.object({
  eventUniqueName: z.string().describe('The unique name of the event, in the format "[Event Name] - [dd/MM]".'),
  area: z.string().describe('The area of service for the assignment.'),
  position: z.number().describe('The position number for the assignment (e.g., 1, 2, 3).'),
  volunteer: z.string().nullable().optional().describe('The name of the assigned volunteer, or null if no one was assigned.'),
  reason: z.string().nullable().optional().describe('The reason for the assignment outcome, especially if a volunteer could not be assigned.'),
});

const SmartScheduleGenerationOutputSchema = z.object({
  assignments: z.array(AssignmentSchema).describe('A list of all the volunteer assignments for the requested schedule.'),
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

You will be provided with data about events, volunteers, and team schedules. Your goal is to produce a list of assignment objects, where each object represents a specific volunteer assigned to a specific role in an event.

{{#if specificArea}}
You will generate the schedule ONLY for the following area: {{{specificArea}}}.
{{else}}
You will generate the schedule for all areas listed in the areas of service data.
{{/if}}

Here is the information you will be working with:

Month: {{{month}}}
Year: {{{year}}}

Events Data (uniqueName is the key for each event):
{{{eventsData}}}
Each event in the data contains a list of areas and the number of volunteers needed for each area.

Volunteers Data:
{{{volunteersData}}}

Teams Schedule Data:
{{{teamsScheduleData}}}

Areas of Service:
{{{areasOfService}}}

Consider the following constraints and guidelines when generating the schedule:

*   For every position required in every event, you must generate one assignment object.
*   Volunteers should only be assigned to events for which they have indicated availability.
*   Volunteers should only be assigned to areas of service in which they are qualified.
*   If team schedules are provided, volunteers should primarily be assigned to events that fall within their team's scheduled dates.
*   Attempt to distribute assignments evenly among volunteers to avoid overburdening any single individual.
*   A single volunteer cannot be assigned to two different positions in the same event.
*   If an area requires more than one volunteer (e.g., 3 volunteers for "Recepção"), you must generate 3 separate assignment objects for that area, with position numbers 1, 2, and 3 respectively, assigning a different volunteer to each.
*   If a suitable volunteer is found, set the 'volunteer' field to their name and the 'reason' field to null.
*   If a suitable volunteer is not found, you MUST set the 'volunteer' field to null and provide a clear 'reason' (e.g., "No volunteers available", "No one from the scheduled team is available").
*   If an event does not require a specific area, do NOT generate an assignment for it.

Produce a list of assignments in the 'assignments' output field. Each assignment object in the list must have the following fields: eventUniqueName, area, position, volunteer, reason.

Example of a valid 'assignments' list:
[
  { "eventUniqueName": "Sunday Service - 07/07", "area": "Sound", "position": 1, "volunteer": "John Doe", "reason": null },
  { "eventUniqueName": "Sunday Service - 07/07", "area": "Reception", "position": 1, "volunteer": "Jane Smith", "reason": null },
  { "eventUniqueName": "Sunday Service - 07/07", "area": "Reception", "position": 2, "volunteer": null, "reason": "No available volunteers" }
]

Ensure your output conforms to the requested JSON schema. The output must be a raw JSON object, without any markdown formatting.
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
