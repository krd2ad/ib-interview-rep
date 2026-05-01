import { useCallback, useRef, useState } from 'react'
import type { Question } from '../lib/types'

export function useRandomQuestion(pool: Question[]) {
  // Always reflects the latest pool without recreating newQuestion on every render
  const poolRef = useRef(pool)
  poolRef.current = pool

  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    () => pool[Math.floor(Math.random() * pool.length)],
  )

  const newQuestion = useCallback(() => {
    const p = poolRef.current
    setCurrentQuestion(p[Math.floor(Math.random() * p.length)])
  }, [])

  return { currentQuestion, newQuestion, jumpTo: setCurrentQuestion }
}
