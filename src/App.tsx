import { useMemo, useState } from 'react'
import FeedbackPanel from './components/FeedbackPanel'
import FilterScreen from './components/FilterScreen'
import Layout from './components/Layout'
import LoadingState from './components/LoadingState'
import PasswordGate from './components/PasswordGate'
import QuestionCard from './components/QuestionCard'
import { useRandomQuestion } from './hooks/useRandomQuestion'
import { buildPool } from './lib/buildPool'
import { evaluateAnswer } from './lib/evaluateAnswer'
import type { EvaluationResponse, FilterState } from './lib/types'

const PASSWORD_KEY = 'ib-prep-password'
const FILTER_KEY = 'ib-prep-filter'
const CURRENT_PASSWORD = 'DARDENCO2028'

function loadFilter(): FilterState {
  try {
    const stored = localStorage.getItem(FILTER_KEY)
    if (stored) return JSON.parse(stored) as FilterState
  } catch { /* ignore */ }
  return { categories: [], difficulties: [] }
}

type View = 'filter' | 'app'

export default function App() {
  const [sitePassword, setSitePassword] = useState(() => localStorage.getItem(PASSWORD_KEY) ?? '')
  const unlocked = sitePassword === CURRENT_PASSWORD
  const [view, setView] = useState<View>('filter')
  const [filter, setFilter] = useState<FilterState>(loadFilter)

  const pool = useMemo(() => buildPool(filter.categories, filter.difficulties), [filter])
  const { currentQuestion, newQuestion, jumpTo } = useRandomQuestion(pool)

  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<EvaluationResponse | null>(null)
  const [costUsd, setCostUsd] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleUnlock(password: string) {
    localStorage.setItem(PASSWORD_KEY, password)
    setSitePassword(password)
  }

  function handleApplyFilter(newFilter: FilterState) {
    const newPool = buildPool(newFilter.categories, newFilter.difficulties)
    localStorage.setItem(FILTER_KEY, JSON.stringify(newFilter))
    setFilter(newFilter)
    jumpTo(newPool[Math.floor(Math.random() * newPool.length)])
    setAnswer('')
    setFeedback(null)
    setCostUsd(null)
    setError(null)
    setView('app')
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
      }, sitePassword)
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

  if (!unlocked) return <PasswordGate onUnlock={handleUnlock} />

  if (view === 'filter') {
    return <FilterScreen initial={filter} onApply={handleApplyFilter} />
  }

  return (
    <Layout onShowFilters={() => setView('filter')}>
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
