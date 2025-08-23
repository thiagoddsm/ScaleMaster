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

OBJETIVO: Gerar a escala de serviço completa para um mês específico, alocando voluntários em eventos com base em sua competência, disponibilidade e equipe de rodízio. O resultado deve ser (1) uma tabela de escala funcional, (2) um relatório analítico e (3) uma saída de dados em JSON. Em caso de falha na alocação, você deve fornecer um diagnóstico preciso do motivo.

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

2.2. REGRAS DE NEGÓCIO E OTIMIZAÇÃO
Regra de Unicidade: Um voluntário não pode ser alocado para mais de uma vaga no mesmo evento.

Regra de Competência: Um voluntário só pode ser alocado na 'Area_de_Servico' em que está cadastrado.

Regra de Disponibilidade: A lista 'availability' de um voluntário deve ser estritamente respeitada. Um voluntário só pode ser escalado para um evento se o nome do evento ('name' no objeto de evento) constar em sua lista de 'availability'.

Regra de Rotação: A escala de equipes por semana (Alpha -> Bravo -> Charlie -> Delta) é obrigatória.

Regra da 5ª Semana: Se um mês tiver uma quinta semana que precise de cobertura, a responsabilidade retorna para a Equipe Alpha.

Regra de Otimização (Justiça): Ao escolher entre candidatos qualificados, sempre priorize aquele com o menor valor em Contagem_Servicos_Mes (um contador que você deve inicializar e manter).

Critério de Desempate: Em caso de empate na Contagem_Servicos_Mes, desempate escolhendo o voluntário com o 'id' de menor valor em ordem alfanumérica.

2.3. ALGORITMO DE ALOCAÇÃO SEQUENCIAL
Execute as seguintes fases e passos na ordem exata apresentada.

Fase 1: Configuração e Preparação
Definir Período: Identifique o mês e ano da escala (Mês: {{month}}, Ano: {{year}}).

Expandir Eventos: Para todos os eventos do tipo "Semanal", crie uma ocorrência para cada data correspondente dentro do mês. Eventos pontuais ocorrem apenas na sua data específica.

Mapear Equipes: Crie um mapa Data -> nome da Equipe para cada dia do mês, seguindo a rotação semanal fornecida nos dados de entrada.

Validação Pré-Alocação: Para cada area em cada demanda de todos os eventos, verifique se existe pelo menos um voluntario cuja lista 'areas' contenha a area da demanda. Se uma área demandada não existir no cadastro de nenhum voluntário, marque todas as vagas para essa área com o erro: "FALHA: Área de Serviço ('[Nome da Área]') não encontrada no cadastro de voluntários." e não prossiga com a alocação para essa vaga específica.

Fase 2: Processo de Geração da Escala
Processe cada evento em ordem cronológica. Para cada evento, processe cada demanda ('areas' do evento). Para cada demanda, itere de 1 até 'volunteersNeeded' para preencher cada vaga individualmente. Para cada vaga, aplique o seguinte funil de filtragem:

Passo 2.1: Filtro por Competência (Área de Serviço)

Crie uma lista de candidatos a partir de todos os voluntários.

Filtre-a, mantendo apenas voluntários cuja lista 'areas' contenha a area da vaga.

Passo 2.2: Filtro por Disponibilidade de Evento

Use a lista do passo anterior.

Filtre-a novamente, mantendo apenas voluntários cujo nome do evento atual ('name' do objeto de evento) esteja presente em sua lista 'availability'.

Passo 2.3: Filtro por Equipe da Semana

Use a lista do passo anterior.

Consulte o mapa Data -> Equipe para obter a equipe responsável.

Filtre a lista, mantendo apenas voluntários cujo 'team' corresponda à equipe da semana.

Passo 2.4: Seleção Final, Alocação e Diagnóstico

Analise a lista final de candidatos.

SE A LISTA ESTIVER VAZIA: A vaga falhou. Determine o motivo verificando os filtros em ordem inversa e registre a primeira falha encontrada:

Se a lista ficou vazia no Passo 2.3: "MOTIVO: Voluntários disponíveis não pertencem à equipe da semana ([Nome da Equipe])."

Se a lista ficou vazia no Passo 2.2: "MOTIVO: Nenhum voluntário desta área está disponível para este evento."

Se a lista ficou vazia no Passo 2.1: "MOTIVO: Nenhum voluntário cadastrado nesta área de serviço."

SE A LISTA CONTIVER CANDIDATOS:

Aplique a Regra de Unicidade: Remova candidatos já alocados em outra vaga deste mesmo evento.

Aplique a Otimização e Desempate: Ordene os candidatos restantes por Contagem_Servicos_Mes (crescente) e, em seguida, por 'id' (alfanumérico).

Alocação: Escale o primeiro voluntário da lista ordenada.

Atualização: Incremente em +1 a Contagem_Servicos_Mes do voluntário alocado.

# 3. FORMATOS DE SAÍDA EXIGIDOS
A sua resposta final deve conter as três seções a seguir, sem nenhum texto introdutório ou conclusivo adicional.

3.1. Tabela de Escala (Markdown)
Gere uma tabela com as colunas: | Data | Dia da Semana | Evento | Área de Serviço | Equipe | Voluntário Escalado / Motivo da Falha | Status |

3.2. Relatório Complementar
- Taxa de Preenchimento: [Calcular]% de vagas preenchidas ([Número de Vagas Preenchidas] de [Total de Vagas]).
- Distribuição por Voluntário: Liste cada voluntário e o número total de vezes que foi escalado.
- Análise de Gargalos: Identifique as 3 combinações de Evento e Area com o maior número de falhas de alocação.
- Recomendações: Com base nos gargalos, forneça uma sugestão curta para melhorar futuras escalas (ex: "Recomenda-se recrutar mais voluntários para a área de 'Projeção' disponíveis para o 'Culto da Tarde'").

3.3. Saída de Dados (JSON)
Gere um array de objetos JSON para 'scheduleData', onde cada objeto representa um dia com eventos, seguindo o schema definido na declaração de output.

`,
});

const smartScheduleGenerationFlow = ai.defineFlow(
  {
    name: 'smartScheduleGenerationFlow',
    inputSchema: GenerateScheduleInputSchema,
    outputSchema: GenerateScheduleOutputSchema,
  },
  async input => {
    // Initialize service count for volunteers
    const volunteersWithCount = input.volunteers.map((v: any) => ({ ...v, Contagem_Servicos_Mes: 0 }));

    const response = await prompt({ ...input, volunteers: volunteersWithCount });
    return response.output!;
  }
);
