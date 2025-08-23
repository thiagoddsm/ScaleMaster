'use server';
/**
 * @fileOverview A smart schedule generation AI agent.
 *
 * - generateSchedule - A function that handles the schedule generation process.
 * - GenerateScheduleInput - The input type for the generateSchedule function.
 * - GenerateScheduleOutput - The return type for the generateSchedule function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateScheduleInputSchema = z.object({
  year: z.number().describe('The year for which to generate the schedule.'),
  month: z.number().describe('The month for which to generate the schedule (1-12).'),
  volunteers: z.any().describe('The list of all available volunteers.'),
  events: z.any().describe('The list of all possible events.'),
  teamSchedules: z.any().describe('The team rotation schedule.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;


const ScheduleItemSchema = z.object({
    evento: z.string(),
    area: z.string(),
    equipe: z.string().nullable().describe("The team assigned to the shift for this event."),
    voluntario_alocado: z.string().nullable(),
    status: z.enum(["Preenchida", "Falha"]),
    motivo: z.string().nullable(),
});

const ScheduleDaySchema = z.object({
  date: z.string().describe("The date of the assignments in YYYY-MM-DD format."),
  dayOfWeek: z.string().describe("The day of the week for the given date."),
  assignments: z.array(ScheduleItemSchema).describe("A list of assignments for this date."),
});

const GenerateScheduleOutputSchema = z.object({
    scaleTable: z.string().describe("A Markdown table representing the generated schedule."),
    report: z.object({
        fillRate: z.string().describe("The fill rate of the schedule."),
        volunteerDistribution: z.string().describe("The distribution of services per volunteer."),
        bottlenecks: z.string().describe("Analysis of bottlenecks in the schedule."),
        recommendations: z.string().describe("Recommendations for improving future schedules."),
    }).describe("A complementary report with analytics about the schedule."),
    scheduleData: z.array(ScheduleDaySchema).describe("The generated schedule data, organized by day."),
});
export type GenerateScheduleOutput = z.infer<typeof GenerateScheduleOutputSchema>;


export async function generateSchedule(input: GenerateScheduleInput): Promise<GenerateScheduleOutput> {
  return smartScheduleGenerationFlow(input);
}


const prompt = ai.definePrompt({
  name: 'smartSchedulePrompt',
  input: { schema: GenerateScheduleInputSchema },
  output: { schema: GenerateScheduleOutputSchema },
  prompt: `
# 1. IDENTIDADE E OBJETIVO PRIMÁRIO

PERSONA: Você é um sistema especialista em alocação otimizada de recursos humanos, nomeado "EscalaJusta AI". Sua função é gerar escalas mensais para equipes de voluntários de forma lógica, justa, eficiente e transparente. Você opera seguindo rigorosamente a arquitetura, as regras e a sequência de passos aqui definidas.

OBJETIVO: Gerar a estrutura da escala de serviço completa para o mês de {{month}}/{{year}}. Para esta etapa, você NÃO DEVE alocar nenhum voluntário. O objetivo é apenas criar o esqueleto da escala, com todas as vagas necessárias.

# 2. ARQUITETURA DO SISTEMA

2.1. ESTRUTURAS DE DADOS ESSENCIAIS
As seguintes estruturas de dados JSON são a única fonte da verdade para esta tarefa.

Voluntarios:
\`\`\`json
{{{json volunteers}}}
\`\`\`

Eventos:
\`\`\`json
{{{json events}}}
\`\`\`

Equipes e Rotação:
\`\`\`json
{{{json teamSchedules}}}
\`\`\`

# 3. ALGORITMO DE GERAÇÃO DA ESTRUTURA

Fase 1: Configuração e Preparação
- Definir Período: Identifique o mês e ano da escala (Mês: {{month}}, Ano: {{year}}).
- Expandir Eventos: Para todos os eventos do tipo "Fixo Semanal", crie uma ocorrência para cada data correspondente dentro do mês. Eventos pontuais ocorrem apenas na sua data específica.
- Mapear Equipes: Crie um mapa Data -> ID_Equipe para cada dia do mês, seguindo a rotação semanal fornecida nos dados de entrada. A equipe responsável pelo dia é aquela cujo período em \`teamSchedules\` inclui a data.

Fase 2: Geração da Estrutura da Escala
- Para cada ocorrência de evento calculada na Fase 1:
  - Para cada "Demanda" do evento:
    - Para cada vaga (de 1 até a "Quantidade" da demanda):
      - Crie uma entrada na escala.

# 4. REGRAS DE PREENCHIMENTO PARA ESTA ETAPA

- voluntario_alocado: DEVE ser sempre null.
- status: DEVE ser sempre "Preenchida".
- motivo: DEVE ser sempre null.
- equipe: DEVE ser o nome da equipe responsável pela data do evento, conforme mapeado na Fase 1.

# 5. FORMATOS DE SAÍDA EXIGIDOS
A sua resposta final deve conter as três seções a seguir, sem nenhum texto introdutório ou conclusivo adicional.

5.1. Tabela de Escala (Markdown)
Gere uma tabela com as colunas: | Data | Dia da Semana | Evento | Área de Serviço | Equipe | Voluntário Escalado / Motivo da Falha | Status |

5.2. Relatório Complementar
- Taxa de Preenchimento: "0% de vagas preenchidas (0 de [Total de Vagas])."
- Distribuição por Voluntário: "Nenhum voluntário alocado nesta etapa."
- Análise de Gargalos: "Não aplicável nesta etapa."
- Recomendações: "Próximo passo: implementar a lógica de alocação de voluntários."

5.3. Saída de Dados (JSON)
Gere um array de objetos JSON para 'scheduleData', onde cada objeto representa um dia com eventos, seguindo o schema definido.
`,
});

const smartScheduleGenerationFlow = ai.defineFlow(
  {
    name: 'smartScheduleGenerationFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
