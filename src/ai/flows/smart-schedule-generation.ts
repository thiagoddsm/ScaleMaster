'use server';

/**
 * @fileOverview Automatically assigns volunteers to events based on their availability, area of service, and team.
 *
 * - smartScheduleGeneration - A function that handles the smart schedule generation process.
 * - SmartScheduleGenerationInput - The input type for the smartScheduleGeneration function.
 * - SmartScheduleGenerationOutput - The return type for the smart-schedule-generation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartScheduleGenerationInputSchema = z.object({
  month: z.number().describe('The month for which to generate the schedule (1-12).'),
  year: z.number().describe('The year for which to generate the schedule.'),
  eventsData: z.string().describe('JSON string of events data, each event containing name, areas with volunteers needed, and date.'),
  volunteersData: z.string().describe('JSON string of volunteers data, each volunteer containing name, areas, availability, and team.'),
  teamsScheduleData: z.string().describe('JSON string of teams schedule data, assigning teams to date ranges.'),
  areasOfService: z.string().describe('JSON string of all possible areas of service.'),
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
  prompt: `You are an AI assistant that generates a volunteer schedule for events. Your task is to create a list of assignment objects based on the provided data.

Here is the data you will use:
- Month: {{{month}}}/{{{year}}}
- Events Data: {{{eventsData}}} (A list of all events happening this month)
- Volunteers Data: {{{volunteersData}}} (A list of all volunteers and their details)
- Teams Schedule Data: {{{teamsScheduleData}}} (The rotation schedule for the teams)
- All Possible Areas of Service: {{{areasOfService}}}

**Your Goal:**
Generate a complete list of assignments for all required positions in all events.

**Follow these rules precisely:**

1.  **One Assignment per Slot:** For every single volunteer position required at every event, you MUST create one assignment object.
    - Example: If "Recepção" needs 3 volunteers, you must create 3 separate assignment objects for that area in that event, with \`position\` numbers 1, 2, and 3.

2.  **Check All Constraints Before Assigning:** To assign a volunteer, ALL of the following must be true:
    a.  **Availability:** The volunteer's \`availability\` array must include the name of the event.
    b.  **Area Qualification:** The volunteer's \`areas\` array must include the area of service for the assignment.
    c.  **Team on Duty:** The event's date must fall within the date range for the volunteer's assigned \`team\` according to the \`teamsScheduleData\`.
    d.  **No Double Booking:** A volunteer cannot be assigned to more than one position in the SAME event.

3.  **Assignment Logic:**
    - **Successful Assignment:** If you find a volunteer who meets ALL the constraints (2a, 2b, 2c, 2d), set their name in the \`volunteer\` field and set the \`reason\` field to \`null\`.
    - **Failed Assignment:** If NO volunteer can be found who meets all the constraints for a specific slot, you MUST set the \`volunteer\` field to \`null\` and provide a concise, one-sentence \`reason\`.
        - Examples for \`reason\`: "No volunteers available for this area.", "No available volunteers from the scheduled team.", "All qualified volunteers are already assigned."

4.  **Filtering by Specific Area:**
    - If the \`specificArea\` field is provided, you MUST ONLY generate assignments for that single area of service across all events.
    - If \`specificArea\` is NOT provided, you MUST generate assignments for ALL areas listed in \`areasOfService\` that are required by the events.

5.  **Output Format:**
    - The final output must be a raw JSON object conforming to the schema.
    - Do NOT include markdown formatting, comments, or any text outside the JSON structure.
    - The \`reason\` field must be a short, direct sentence and MUST NOT contain your own thought process or reasoning.

Create the \`assignments\` list now based on these rules.
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
