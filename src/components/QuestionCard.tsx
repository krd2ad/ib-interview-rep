import { Mic, MicOff, Send, Shuffle } from 'lucide-react'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import type { Question } from '../lib/types'

interface Props {
  question: Question
  answer: string
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onNewQuestion: () => void
  isLoading: boolean
  hasFeedback: boolean
}

const difficultyStyle: Record<Question['difficulty'], string> = {
  Basic: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
}

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
  onSubmit,
  onNewQuestion,
  isLoading,
  hasFeedback,
}: Props) {
  const { isSupported, isListening, startListening, stopListening } = useSpeechRecognition(
    (transcript) => onAnswerChange(answer + transcript),
  )

  const canSubmit = answer.trim().length > 0 && !isLoading && !hasFeedback

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && canSubmit) {
      onSubmit()
    }
  }

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      {/* Category + Difficulty */}
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs font-medium text-indigo-300 bg-indigo-400/10 border border-indigo-400/20 px-2.5 py-1 rounded-full">
          {question.category}
        </span>
        <span className={`text-xs font-medium border px-2.5 py-1 rounded-full ${difficultyStyle[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-white text-xl font-medium leading-snug mb-6">
        {question.question}
      </h2>

      {/* Answer textarea */}
      <div className="relative">
        <textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or dictate your answer here..."
          maxLength={6000}
          aria-label="Your answer"
          rows={6}
          disabled={isLoading || hasFeedback}
          className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        />
        <div className="absolute bottom-3 right-3 text-white/20 text-xs tabular-nums">
          {answer.length}/6000
        </div>
      </div>

      {/* Hint text */}
      <p className="text-white/25 text-xs mt-2">
        {isSupported
          ? 'Speak naturally, then edit your answer before submitting. ⌘↵ to submit.'
          : 'Dictation is not supported in this browser. You can still type your answer.'}
      </p>

      {/* Action row */}
      <div className="flex items-center gap-3 mt-5">
        {isSupported && (
          <button
            onClick={isListening ? stopListening : startListening}
            disabled={isLoading || hasFeedback}
            aria-label={isListening ? 'Stop dictation' : 'Start dictation'}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-rose-500/20 border-rose-500/30 text-rose-300 hover:bg-rose-500/30'
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {isListening ? <MicOff size={14} /> : <Mic size={14} />}
            {isListening ? 'Stop Dictation' : 'Start Dictation'}
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={onNewQuestion}
          disabled={isLoading}
          aria-label="New question"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Shuffle size={14} />
          New Question
        </button>

        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          aria-label="Submit answer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
        >
          <Send size={14} />
          Submit
        </button>
      </div>
    </div>
  )
}
