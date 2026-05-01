import Anthropic from '@anthropic-ai/sdk'
import type { EvaluationRequest, EvaluationResponse } from './types'

const SYSTEM_PROMPT = `You are an investment banking interview evaluator.

You evaluate candidate answers from the perspective of an investment banking recruiter, analyst, associate, or banker involved in MBA or analyst recruiting.

Your job is to score answers honestly and provide concise, actionable feedback.

You should be direct but constructive. Do not flatter the candidate unnecessarily. Do not invent details. Do not assume facts that the candidate did not say.

Prioritize:
- Technical accuracy
- Clear structure
- Specific examples
- Concise delivery
- Relevance to investment banking
- Professional tone
- Interview readiness`

function buildUserPrompt(question: string, answer: string, category: string, difficulty: string): string {
  return `Evaluate the following investment banking interview answer.

Question:
${question}

Category:
${category}

Difficulty:
${difficulty}

Candidate answer:
${answer}

Score the answer from 1 to 10, where:
1 = very poor, inaccurate, rambling, or unprofessional
5 = partially correct but incomplete, generic, or poorly structured
10 = polished, accurate, concise, specific, and interview-ready

For behavioral / fit questions, evaluate on: structure, specificity, relevance to investment banking, professional tone, conciseness, strength of examples.

For technical questions, evaluate on: accuracy, completeness, clarity, prioritization, ability to explain in an interview setting.

Use move_on when score is 8 or higher. Use try_again when score is below 8.`
}

// Pricing for claude-haiku-4-5-20251001 (per token)
const INPUT_COST_PER_TOKEN = 0.80 / 1_000_000
const OUTPUT_COST_PER_TOKEN = 4.00 / 1_000_000

export type EvaluationResult = {
  feedback: EvaluationResponse
  costUsd: number
}

export async function evaluateAnswer(input: EvaluationRequest): Promise<EvaluationResult> {
  const client = new Anthropic({
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
  })

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    tools: [
      {
        name: 'submit_evaluation',
        description: 'Submit the structured evaluation result',
        input_schema: {
          type: 'object' as const,
          properties: {
            score: { type: 'number', description: 'Score from 1 to 10' },
            oneSentenceSummary: { type: 'string' },
            whatWentWell: { type: 'array', items: { type: 'string' } },
            whatToImprove: { type: 'array', items: { type: 'string' } },
            suggestedImprovedAnswer: { type: 'string' },
            recommendation: { type: 'string', enum: ['try_again', 'move_on'] },
          },
          required: [
            'score',
            'oneSentenceSummary',
            'whatWentWell',
            'whatToImprove',
            'suggestedImprovedAnswer',
            'recommendation',
          ],
        },
      },
    ],
    tool_choice: { type: 'tool', name: 'submit_evaluation' },
    messages: [
      {
        role: 'user',
        content: buildUserPrompt(
          input.question,
          input.answer,
          input.category,
          input.difficulty ?? 'Not specified',
        ),
      },
    ],
  })

  const toolUse = response.content.find((b) => b.type === 'tool_use')
  if (!toolUse || toolUse.type !== 'tool_use') throw new Error('Unexpected response from AI')

  const costUsd =
    response.usage.input_tokens * INPUT_COST_PER_TOKEN +
    response.usage.output_tokens * OUTPUT_COST_PER_TOKEN

  return { feedback: toolUse.input as EvaluationResponse, costUsd }
}
