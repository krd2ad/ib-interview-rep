export type Question = {
  id: string
  category: string
  difficulty: 'Basic' | 'Intermediate' | 'Advanced'
  question: string
}

export type FilterState = {
  categories: string[]
  difficulties: string[]
}

export type EvaluationRequest = {
  question: string
  answer: string
  category: string
  difficulty?: string
}

export type EvaluationResponse = {
  score: number
  oneSentenceSummary: string
  whatWentWell: string[]
  whatToImprove: string[]
  suggestedImprovedAnswer: string
  recommendation: 'try_again' | 'move_on'
}
