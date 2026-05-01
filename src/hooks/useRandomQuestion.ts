import { useCallback, useRef, useState } from 'react'
import { questions } from '../data/questions'
import type { Question } from '../lib/types'

function pick(pool: Question[]): Question {
  const p = pool.length > 0 ? pool : questions
  return p[Math.floor(Math.random() * p.length)]
}

export function useRandomQuestion(pool: Question[]) {
  // Always reflects the latest pool without recreating newQuestion on every render
  const poolRef = useRef(pool)
  poolRef.current = pool

  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => pick(pool))

  const newQuestion = useCallback(() => {
    setCurrentQuestion(pick(poolRef.current))
  }, [])

  return { currentQuestion, newQuestion, jumpTo: setCurrentQuestion }
}
