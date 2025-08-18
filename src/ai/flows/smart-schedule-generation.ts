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
  eventsData: z.string().describe('JSON string of events data, each event containing name, areas, and date.'),
  volunteersData: z.string().describe('JSON string of volunteers data, each volunteer containing name, areas, availability, and team.'),
  teamsScheduleData: z.string().describe('JSON string of teams schedule data, assigning teams to date ranges.'),
  areasOfService: z.string().describe('JSON string of areas of service.'),
  specificArea: z.string().optional().describe('An optional specific area of service to generate the schedule for. If not provided, generate for all areas.'),
});
export type SmartScheduleGenerationInput = z.infer<typeof SmartScheduleGenerationInputSchema>;

const SmartScheduleGenerationOutputSchema = z.object({
  schedule: z.string().describe('JSON string of the generated schedule, mapping event and area to assigned volunteer.'),
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

You will be provided with data about events, volunteers, and team schedules. Your goal is to produce a JSON schedule that assigns the best-suited volunteer to each event and area of service.
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
*   If a volunteer is not available leave value empty.

Produce the schedule in JSON format. The JSON should have the following structure:

{
  "[Event Name] - [Area of Service]": "[Volunteer Name]"
}

For example:

{
  "Sunday Service - Sound": "John Doe",
  "Wednesday Service - Tech": "Jane Smith"
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
