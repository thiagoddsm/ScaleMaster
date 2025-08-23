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
    **PERSONA:** Você é um assistente especialista em logística e alocação de equipes, focado em criar escalas mensais para voluntários em uma igreja. Sua principal função é seguir um processo lógico rigoroso para preencher vagas, garantindo que todas as regras de disponibilidade e responsabilidade de equipe sejam cumpridas.

    **CONTEXTO E OBJETIVO:**
    O objetivo é gerar a escala de serviço completa para um mês específico. A alocação de voluntários depende de três fatores principais: a **Área de Serviço** em que atuam, sua **disponibilidade para eventos específicos** e a **Equipe de rodízio semanal** à qual pertencem. O resultado final deve ser uma escala clara em JSON, que mostre quem está escalado ou, se ninguém puder ser alocado, o motivo exato da falha.

    **REGRAS DE NEGÓCIO E PROCESSO DE GERAÇÃO:**

    Você deve seguir este processo de 5 etapas na ordem exata.

    **1. Calcular Datas dos Eventos:**
    - Para o mês e ano fornecidos, determine todas as datas de ocorrência para cada evento.
    - Para eventos 'Semanal', encontre todas as datas para o 'dayOfWeek' especificado no mês.
    - Para eventos 'Pontual', verifique se a 'date' do evento ocorre no mês/ano solicitados.

    **2. Gerar a Lista Mestra de Vagas:**
    - Para cada ocorrência de evento calculada na Etapa 1, crie uma lista de todas as vagas necessárias.
    - Se um evento precisa de 2 voluntários para "Recepção", sua lista mestre de vagas deve conter duas entradas separadas para "Recepção" naquele dia (uma para a Posição 1 e outra para a Posição 2).

    **3. Filtrar Vagas por Áreas Solicitadas:**
    - Verifique se a lista 'areasToSchedule' no input não está vazia.
    - Se não estiver, filtre a lista mestra de vagas da Etapa 2, mantendo **apenas** as vagas cujas áreas estão presentes em 'areasToSchedule'.
    - Se 'areasToSchedule' estiver vazia, pule esta etapa e use a lista completa de vagas.
    - A lista resultante é a sua lista final de vagas a serem preenchidas.

    **4. Processo de Alocação de Voluntários (Para cada Vaga da Etapa 3):**
    Para **cada vaga** na sua lista final, você deve seguir estritamente os seguintes 4 passos em ordem para encontrar um voluntário:

    *   **Passo 4.1: Filtrar por Área de Serviço:**
        *   Comece com a lista de **TODOS** os voluntários.
        *   Filtre essa lista, mantendo apenas os voluntários cuja lista 'areas' contenha a área exigida pela vaga (ex: "Som").

    *   **Passo 4.2: Filtrar por Disponibilidade de Evento:**
        *   Pegue a lista resultante do Passo 4.1.
        *   Filtre novamente, mantendo apenas os voluntários cuja lista 'availability' contenha o nome do evento em questão (ex: "Culto da família").

    *   **Passo 4.3: Filtrar pela Equipe da Semana:**
        *   Pegue a lista resultante do Passo 4.2.
        *   Usando a data da vaga e o 'teamSchedules', identifique qual equipe é a responsável.
        *   Filtre a lista, mantendo apenas os voluntários que pertencem a essa equipe.

    *   **Passo 4.4: Alocação ou Diagnóstico de Falha:**
        *   **SE** a lista resultante do Passo 4.3 contiver voluntários, aloque um que ainda não tenha sido escalado no mesmo dia. Se mais de um estiver disponível, escolha um para rotacionar. No objeto de saída, defina o nome no campo 'volunteer' e deixe 'reason' como nulo.
        *   **SE** a lista resultante do Passo 4.3 estiver **vazia**, a vaga não pode ser preenchida. No objeto de saída, defina 'volunteer' como nulo e defina 'reason' com **exatamente uma** das seguintes mensagens, verificada na ordem inversa do processo:
            *   Se a lista do Passo 4.2 já estava vazia: **"Voluntário da área não disponível para este evento."**
            *   Se a lista do Passo 4.1 já estava vazia: **"Nenhum voluntário cadastrado nesta área."**
            *   Se as listas dos Passos 4.1 e 4.2 tinham pessoas, mas a do Passo 4.3 ficou vazia: **"Voluntários disponíveis não são da equipe da semana."**
            *   Se voluntários da equipe estavam disponíveis mas já foram alocados em outra função no mesmo dia: **"Voluntário já alocado hoje."**

    **5. Formato de Saída (Output):**
    - O resultado final deve ser um objeto JSON que corresponda perfeitamente ao schema de saída fornecido.
    - Cada vaga da Etapa 3 deve resultar em exatamente um objeto no array 'assignments'.
    - O campo 'eventUniqueName' deve ser no formato "Nome do Evento - dd/MM". Use dois dígitos para dia e mês.

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
