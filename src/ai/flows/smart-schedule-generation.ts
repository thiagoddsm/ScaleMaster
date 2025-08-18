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
  prompt: `You are a scheduling assistant. Your task is to generate a list of volunteer assignments based on the provided data.

**DATA:**
- **Month:** {{{month}}}/{{{year}}}
- **Events:** {{{eventsData}}}
- **Volunteers:** {{{volunteersData}}}
- **Team Schedule:** {{{teamsScheduleData}}}
- **All Possible Areas:** {{{areasOfService}}}
- **Specific Area Filter:** {{{specificArea}}}

**RULES (Follow these EXACTLY):**

1.  **Create Assignments ONLY for Required Slots:**
    - Look at each event in the \`Events\` data.
    - For each area listed in an event's \`areas\` array, create the specified number of assignment objects.
    - **IMPORTANT:** If an event does NOT require a specific area, do NOT generate an assignment for it.

2.  **Assignment Criteria (ALL must be met):**
    a.  **Correct Team:** The volunteer's team must be the one scheduled for the event's date, according to the \`Team Schedule\`.
    b.  **Correct Area:** The volunteer must be qualified for the area of service (\`areas\` array).
    c.  **Correct Availability:** The volunteer must be available for the specific event name (\`availability\` array).
    d.  **No Double Booking:** A volunteer cannot be assigned to more than one position in the same event.

3.  **Filling the Assignment Object:**
    - **Successful:** If you find a volunteer who meets ALL criteria (2a, 2b, 2c, 2d), put their name in the \`volunteer\` field. Set the \`reason\` field to \`null\`.
    - **Unsuccessful:** If NO volunteer can be found for a slot, set the \`volunteer\` field to \`null\`. Set the \`reason\` field to a SHORT, one-sentence explanation (e.g., "No available volunteers from the scheduled team.").

4.  **Area Filtering:**
    - If a \`Specific Area Filter\` is provided, ONLY generate assignments for that specific area across all events.
    - If no filter is provided, generate assignments for ALL areas required by the events.

5.  **OUTPUT FORMAT (Strictly Enforced):**
    - The output MUST be a raw JSON object.
    - Do NOT include any text, comments, or markdown formatting outside of the JSON structure.
    - The \`reason\` field must be a short, direct sentence, NOT your thought process.

Generate the \`assignments\` list now.
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
