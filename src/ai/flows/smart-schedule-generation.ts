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
    **CONTEXTO E OBJETIVO:**
    O seu objetivo é criar o esqueleto de uma escala de serviço para um mês específico, com base nos eventos que acontecem. Você NÃO deve alocar nenhum voluntário.

    **REGRAS E PROCESSO DE GERAÇÃO:**

    Você deve seguir este processo de 3 etapas na ordem exata.

    **1. Calcular Datas dos Eventos:**
    - Para o mês e ano fornecidos, determine todas as datas de ocorrência para cada evento.
    - Para eventos 'Semanal', encontre todas as datas para o 'dayOfWeek' especificado no mês.
    - Para eventos 'Pontual', verifique se a 'date' do evento ocorre no mês/ano solicitados.

    **2. Gerar a Lista Mestra de Vagas:**
    - Para cada ocorrência de evento calculada na Etapa 1, e para cada área de serviço necessária nesse evento, crie uma lista de vagas.
    - Se um evento precisa de 2 voluntários para "Recepção", sua lista mestre de vagas deve conter duas entradas separadas para "Recepção" naquele dia (uma para a Posição 1 e outra para a Posição 2).
    - Ignore os filtros de 'areasToSchedule' por enquanto. Gere para todas as áreas de todos os eventos.

    **3. Formato de Saída (Output):**
    - O resultado final deve ser um objeto JSON que corresponda perfeitamente ao schema de saída fornecido.
    - Cada vaga da Etapa 2 deve resultar em exatamente um objeto no array 'assignments'.
    - O campo 'eventUniqueName' deve ser no formato "Nome do Evento - dd/MM". Use dois dígitos para dia e mês.
    - **IMPORTANTE:** Os campos 'volunteer' e 'reason' devem ser **sempre** nulos para esta etapa. Apenas gere a estrutura de vagas.

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
