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
import type { Volunteer, Event, TeamSchedule } from '@/lib/types';


export const GenerateScheduleInputSchema = z.object({
  year: z.number().describe('The year for which to generate the schedule.'),
  month: z.number().describe('The month for which to generate the schedule (1-12).'),
  volunteers: z.any().describe('The list of all available volunteers.'),
  events: z.any().describe('The list of all possible events.'),
  teamSchedules: z.any().describe('The team rotation schedule.'),
});
export type GenerateScheduleInput = z.infer<typeof GenerateScheduleInputSchema>;


export const GenerateScheduleOutputSchema = z.object({
    scaleTable: z.string().describe("A Markdown table representing the generated schedule."),
    report: z.object({
        fillRate: z.string().describe("The fill rate of the schedule."),
        volunteerDistribution: z.string().describe("The distribution of services per volunteer."),
        bottlenecks: z.string().describe("Analysis of bottlenecks in the schedule."),
        recommendations: z.string().describe("Recommendations for improving future schedules."),
    }).describe("A complementary report with analytics about the schedule."),
    jsonData: z.record(z.string(), z.any()).describe("The generated schedule in JSON format."),
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

OBJETIVO: Gerar a escala de serviço completa para o mês de {{month}}/{{year}}, alocando voluntários em eventos com base em sua competência, disponibilidade e equipe de rodízio. O resultado deve ser (1) uma tabela de escala funcional, (2) um relatório analítico e (3) uma saída de dados em JSON. Em caso de falha na alocação, você deve fornecer um diagnóstico preciso do motivo.

# 2. ARQUITETURA DO SISTEMA

2.1. ESTRUTURAS DE DADOS ESSENCIAIS
As seguintes estruturas de dados JSON são a única fonte da verdade para esta tarefa.

Voluntario:
\`\`\`json
{{{json volunteers}}}
\`\`\`

Evento:
\`\`\`json
{{{json events}}}
\`\`\`

2.2. REGRAS DE NEGÓCIO E OTIMIZAÇÃO
Regra de Unicidade: Um voluntário não pode ser alocado para mais de uma vaga no mesmo evento.

Regra de Competência: Um voluntário só pode ser alocado na Area_de_Servico em que está cadastrado.

Regra de Disponibilidade: A lista Eventos_Disponiveis de um voluntário deve ser estritamente respeitada.

Regra de Rotação: A escala de equipes por semana (Alpha -> Bravo -> Charlie -> Delta) é obrigatória.

Regra da 5ª Semana: Se um mês tiver uma quinta semana que precise de cobertura, a responsabilidade retorna para a Equipe Alpha.

Regra de Otimização (Justiça): Ao escolher entre candidatos qualificados, sempre priorize aquele com o menor valor em Contagem_Servicos_Mes.

Critério de Desempate: Em caso de empate na Contagem_Servicos_Mes, desempate escolhendo o voluntário com o ID_Voluntario de menor valor em ordem alfanumérica.

2.3. ALGORITMO DE ALOCAÇÃO SEQUENCIAL
Execute as seguintes fases e passos na ordem exata apresentada.

Fase 1: Configuração e Preparação
Definir Período: Identifique o mês e ano da escala (Mês: {{month}}, Ano: {{year}}).

Expandir Eventos: Para todos os eventos do tipo "Fixo Semanal", crie uma ocorrência para cada data correspondente dentro do mês.

Mapear Equipes: Crie um mapa Data -> ID_Equipe para cada dia do mês, seguindo a rotação semanal. A troca de equipe ocorre sempre no Domingo. Você receberá os dados de rotação em \`teamSchedules\`.

Validação Pré-Alocação: Para cada Area em cada Demanda de todos os eventos, verifique se existe pelo menos um Voluntario cuja Area_de_Servico corresponda. Se uma área demandada não existir no cadastro, marque todas as vagas para essa área com o erro: "FALHA: Área de Serviço ('[Nome da Área]') não encontrada no cadastro de voluntários." e não prossiga com a alocação para essa vaga específica.

Fase 2: Processo de Geração da Escala
Processe cada evento em ordem cronológica. Para cada evento, processe cada Demanda. Para cada Demanda, itere de 1 até a Quantidade para preencher cada vaga individualmente. Para cada vaga, aplique o seguinte funil de filtragem:

Passo 2.1: Filtro por Competência (Área de Serviço)
Crie uma lista de candidatos a partir de todos os voluntários.
Filtre-a, mantendo apenas voluntários cuja Area_de_Servico seja idêntica à Area da vaga.

Passo 2.2: Filtro por Disponibilidade de Evento
Use a lista do passo anterior.
Filtre-a novamente, mantendo apenas voluntários cuja lista Eventos_Disponiveis contenha o Nome_Evento.

Passo 2.3: Filtro por Equipe da Semana
Use a lista do passo anterior.
Consulte o mapa Data -> ID_Equipe para obter a equipe responsável.
Filtre a lista, mantendo apenas voluntários cujo ID_Equipe corresponda à equipe da semana.

Passo 2.4: Seleção Final, Alocação e Diagnóstico
Analise a lista final de candidatos.
SE A LISTA ESTIVER VAZIA: A vaga falhou. Determine o motivo verificando os filtros em ordem inversa e registre a primeira falha encontrada:
- Se a lista ficou vazia no Passo 2.3: "MOTIVO: Voluntários disponíveis não pertencem à equipe da semana ([Nome da Equipe])."
- Se a lista ficou vazia no Passo 2.2: "MOTIVO: Nenhum voluntário desta área está disponível para este evento."
- Se a lista ficou vazia no Passo 2.1: "MOTIVO: Nenhum voluntário cadastrado nesta área de serviço."

SE A LISTA CONTIVER CANDIDATOS:
- Aplique a Regra de Unicidade: Remova candidatos já alocados em outra vaga deste mesmo evento.
- Aplique a Otimização e Desempate: Ordene os candidatos restantes por Contagem_Servicos_Mes (crescente) e, em seguida, por ID_Voluntario (alfanumérico).
- Alocação: Escale o primeiro voluntário da lista ordenada.
- Atualização: Incremente em +1 a Contagem_Servicos_Mes do voluntário alocado.

# 4. FORMATOS DE SAÍDA EXIGIDOS
A sua resposta final deve conter as três seções a seguir, sem nenhum texto introdutório ou conclusivo adicional.

4.1. Tabela de Escala (Markdown)
| Data | Dia da Semana | Evento | Área de Serviço | Voluntário Escalado / Motivo da Falha |
| :--- | :--- | :--- | :--- | :--- |

4.2. Relatório Complementar
- Taxa de Preenchimento: [Calcular]% de vagas preenchidas ([Número de Vagas Preenchidas] de [Total de Vagas]).
- Distribuição por Voluntário: Liste cada voluntário e o número total de vezes que foi escalado.
- Análise de Gargalos: Identifique as 3 combinações de Evento e Area com o maior número de falhas de alocação.
- Recomendações: Com base nos gargalos, forneça uma sugestão curta para melhorar futuras escalas (ex: "Recomenda-se recrutar mais voluntários para a área de 'Projeção' disponíveis para o 'Culto da Tarde'").

4.3. Saída de Dados (JSON)
Gere um objeto JSON contendo a escala final, onde cada chave é a data do evento no formato "AAAA-MM-DD".
\`\`\`json
{
  "AAAA-MM-DD": [
    {
      "evento": "Nome do Evento",
      "area": "Nome da Area",
      "voluntario_alocado": "Nome do Voluntário",
      "status": "Preenchida"
    },
    {
      "evento": "Nome do Evento",
      "area": "Nome da Area",
      "voluntario_alocado": null,
      "status": "Falha",
      "motivo": "Motivo da falha..."
    }
  ]
}
\`\`\`
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
