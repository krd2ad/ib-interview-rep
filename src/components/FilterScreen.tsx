import { SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { buildPool } from '../lib/buildPool'
import { questions } from '../data/questions'
import type { FilterState } from '../lib/types'

const CATEGORIES = [
  'Accounting',
  'Analytical / Attention to Detail',
  'Background / Personal',
  'Brain Teaser',
  'Career Changer',
  'Commitment',
  'Culture',
  'Discounted Cash Flow',
  'Discussing Transaction Experience',
  'Enterprise Value / Equity Value',
  'Failure',
  'Future Goals',
  'LBO Model',
  'Market / Investing',
  'Merger Model',
  'Outside the Box',
  'Restructuring / Distressed M&A',
  'Strengths / Weaknesses',
  'Team / Leadership',
  'Understanding Banking',
  'Valuation',
  'Why Banking',
] as const

const DIFFICULTIES = ['Basic', 'Intermediate', 'Advanced'] as const

const TOTAL = questions.length

interface Props {
  initial: FilterState
  onApply: (filter: FilterState) => void
}

export default function FilterScreen({ initial, onApply }: Props) {
  const [categories, setCategories] = useState<string[]>(initial.categories)
  const [difficulties, setDifficulties] = useState<string[]>(initial.difficulties)

  function toggleCategory(cat: string) {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    )
  }

  function toggleDifficulty(diff: string) {
    setDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff],
    )
  }

  const matchCount = buildPool(categories, difficulties).length
  const isFiltered = categories.length > 0 || difficulties.length > 0

  return (
    <div className="min-h-screen bg-[#070c18] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <header className="relative z-10 px-6 pt-6">
        <div>
          <span className="text-white font-semibold tracking-tight text-lg select-none">Investment Banking Interview Prep</span>
          <p className="text-white/35 text-xs mt-0.5 select-none">For those in need of review...</p>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[760px]">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

            {/* Header */}
            <div className="flex items-center gap-3 mb-7">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <SlidersHorizontal size={16} className="text-indigo-400" />
              </div>
              <div>
                <h1 className="text-white font-semibold leading-none mb-1">Customize Practice</h1>
                <p className="text-white/40 text-xs">
                  Select topics and difficulty, or leave blank for fully random.
                </p>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                  Topics
                </h2>
                {categories.length > 0 && (
                  <button
                    onClick={() => setCategories([])}
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      categories.includes(cat)
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:bg-white/[0.07] hover:text-white/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                  Difficulty
                </h2>
                {difficulties.length > 0 && (
                  <button
                    onClick={() => setDifficulties([])}
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => toggleDifficulty(diff)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      difficulties.includes(diff)
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                        : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:bg-white/[0.07] hover:text-white/70'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <span className={`text-sm ${matchCount === 0 && isFiltered ? 'text-rose-400/70' : 'text-white/30'}`}>
                {!isFiltered
                  ? `${TOTAL} questions`
                  : matchCount === 0
                  ? 'No questions match — adjust filters'
                  : `${matchCount} of ${TOTAL} questions`}
              </span>
              <button
                onClick={() => onApply({ categories, difficulties })}
                disabled={matchCount === 0}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
              >
                Start Practicing
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
