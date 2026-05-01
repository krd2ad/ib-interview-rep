import { questions } from '../data/questions'
import type { Question } from './types'

export function buildPool(categories: string[], difficulties: string[]): Question[] {
  let pool: Question[] = questions
  if (categories.length > 0) pool = pool.filter((q) => categories.includes(q.category))
  if (difficulties.length > 0) pool = pool.filter((q) => difficulties.includes(q.difficulty))
  return pool
}
