import type { EvaluationRequest, EvaluationResponse } from './types'

export type EvaluationResult = {
  feedback: EvaluationResponse
  costUsd: number
}

const EVALUATION_API_URL = import.meta.env.VITE_EVALUATION_API_URL

export async function evaluateAnswer(
  input: EvaluationRequest,
  sitePassword: string,
): Promise<EvaluationResult> {
  if (!EVALUATION_API_URL) {
    throw new Error('Missing VITE_EVALUATION_API_URL')
  }

  const response = await fetch(EVALUATION_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-site-password': sitePassword,
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    let message = 'Evaluation failed'

    try {
      const errorBody = await response.json()
      if (errorBody?.error) {
        message = errorBody.error
      }
    } catch {
      // Keep default message if response is not JSON
    }

    throw new Error(message)
  }

  return response.json()
}
