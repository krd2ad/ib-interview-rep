import { useState } from 'react'
import FeedbackPanel from './components/FeedbackPanel'
import Layout from './components/Layout'
import LoadingState from './components/LoadingState'
import PasswordGate from './components/PasswordGate'
import QuestionCard from './components/QuestionCard'
import { useRandomQuestion } from './hooks/useRandomQuestion'
import { evaluateAnswer } from './lib/evaluateAnswer'
import type { EvaluationResponse } from './lib/types'

// persists password unlock across sessions
const UNLOCK_KEY = 'ib-rep-unlocked'

export default function App() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(UNLOCK_KEY) === 'true')
  const { currentQuestion, newQuestion } = useRandomQuestion()
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null)
  const [costUsd, setCostUsd] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleUnlock() {
    localStorage.setItem(UNLOCK_KEY, 'true')
    setUnlocked(true)
  }

  async function handleSubmit() {
    if (!answer.trim() || isLoading || feedback) return

    setIsLoading(true)
    setError(null)

    try {
      const { feedback: result, costUsd: cost } = await evaluateAnswer({
        question: currentQuestion.question,
        answer,
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
      })
      setFeedback(result)
      setCostUsd(cost)
    } catch {
      setError('Something went wrong while reviewing your answer. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleTryAgain() {
    setAnswer('')
    setFeedback(null)
    setCostUsd(null)
    setError(null)
  }

  function handleNewQuestion() {
    newQuestion()
    setAnswer('')
    setFeedback(null)
    setCostUsd(null)
    setError(null)
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={handleUnlock} />
  }

  return (
    <Layout>
      <QuestionCard
        question={currentQuestion}
        answer={answer}
        onAnswerChange={setAnswer}
        onSubmit={handleSubmit}
        onNewQuestion={handleNewQuestion}
        isLoading={isLoading}
        hasFeedback={!!feedback}
      />

      {error && (
        <div className="mt-4 text-rose-400/80 text-sm text-center bg-rose-500/5 border border-rose-500/10 rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      {isLoading && <LoadingState />}

      {feedback && (
        <FeedbackPanel
          feedback={feedback}
          costUsd={costUsd ?? 0}
          onTryAgain={handleTryAgain}
          onNewQuestion={handleNewQuestion}
        />
      )}
    </Layout>
  )
}
