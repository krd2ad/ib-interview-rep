import { AlertCircle, CheckCircle2, ChevronRight, Lightbulb, RefreshCw } from 'lucide-react'
import type { EvaluationResponse } from '../lib/types'

interface Props {
  feedback: EvaluationResponse
  costUsd: number
  onTryAgain: () => void
  onNewQuestion: () => void
}

function formatCost(usd: number): string {
  if (usd === 0) return '$0.0000'
  if (usd < 0.01) return `$${usd.toFixed(4)}`
  return `$${usd.toFixed(2)}`
}

function scoreColor(score: number) {
  if (score >= 8) return 'text-emerald-400'
  if (score >= 6) return 'text-amber-400'
  return 'text-rose-400'
}

function scoreLabel(score: number) {
  if (score >= 9) return 'Excellent'
  if (score >= 8) return 'Strong'
  if (score >= 6) return 'Solid'
  if (score >= 4) return 'Developing'
  return 'Needs Work'
}

function scoreBadgeStyle(score: number) {
  if (score >= 8) return 'bg-emerald-400/10 border-emerald-400/20'
  if (score >= 6) return 'bg-amber-400/10 border-amber-400/20'
  return 'bg-rose-400/10 border-rose-400/20'
}

export default function FeedbackPanel({ feedback, costUsd, onTryAgain, onNewQuestion }: Props) {
  return (
    <div className="mt-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-slide-up">
      {/* Score */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl font-bold tabular-nums ${scoreColor(feedback.score)}`}>
            {feedback.score}
          </span>
          <span className="text-white/30 text-2xl font-light">/&thinsp;10</span>
        </div>
        <span className={`text-sm font-medium border px-3 py-1 rounded-full ${scoreColor(feedback.score)} ${scoreBadgeStyle(feedback.score)}`}>
          {scoreLabel(feedback.score)}
        </span>
      </div>

      {/* One-sentence summary */}
      <p className="text-white/60 text-sm leading-relaxed mb-7">
        {feedback.oneSentenceSummary}
      </p>

      <div className="space-y-6">
        {/* What went well */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
            <h3 className="text-white/80 text-sm font-semibold">What went well</h3>
          </div>
          <ul className="space-y-2">
            {feedback.whatWentWell.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                <span className="mt-2 w-1 h-1 rounded-full bg-emerald-400/50 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* What to improve */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={14} className="text-amber-400 flex-shrink-0" />
            <h3 className="text-white/80 text-sm font-semibold">What to improve</h3>
          </div>
          <ul className="space-y-2">
            {feedback.whatToImprove.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/50">
                <span className="mt-2 w-1 h-1 rounded-full bg-amber-400/50 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested answer */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={14} className="text-indigo-400 flex-shrink-0" />
            <h3 className="text-white/80 text-sm font-semibold">Suggested stronger answer</h3>
          </div>
          <p className="text-white/45 text-sm leading-relaxed bg-white/[0.025] border border-white/[0.06] rounded-xl px-4 py-4">
            {feedback.suggestedImprovedAnswer}
          </p>
        </div>
      </div>

      {/* Actions + cost */}
      <div className="mt-7 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <button
            onClick={onTryAgain}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
          <button
            onClick={onNewQuestion}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white transition-all shadow-lg shadow-indigo-500/20"
          >
            New Question
            <ChevronRight size={14} />
          </button>
        </div>
        <p className="text-white/20 text-xs mt-3">
          API cost: {formatCost(costUsd)}
        </p>
      </div>
    </div>
  )
}
