import { useState } from 'react'
import type { Question } from '../lib/types'
import { questions } from '../data/questions'

function getRandomQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)]
}

export function useRandomQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(() => getRandomQuestion())

  function newQuestion() {
    setCurrentQuestion(getRandomQuestion())
  }

  return { currentQuestion, newQuestion }
}
