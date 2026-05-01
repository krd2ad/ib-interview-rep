import { useState } from 'react'
import { Key } from 'lucide-react'

interface Props {
  onSave: (key: string) => void
}

export default function ApiKeyGate({ onSave }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSave(trimmed)
  }

  return (
    <div className="min-h-screen bg-[#070c18] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-slide-up">
        <div className="flex items-center gap-3 mb-7">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Key size={16} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-white font-semibold leading-none mb-1">IB Rep</h1>
            <p className="text-white/40 text-xs">Fast, AI-scored reps for IB interviews</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="api-key" className="text-white/50 text-xs font-medium mb-2 block uppercase tracking-wide">
              Anthropic API Key
            </label>
            <input
              id="api-key"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="sk-ant-..."
              autoFocus
              autoComplete="off"
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/40 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            Start Practicing
          </button>
        </form>

        <p className="text-white/25 text-xs mt-5 leading-relaxed">
          Your key is stored only in this browser and sent directly to Anthropic — it never touches
          any other server. Get a key at{' '}
          <a
            href="https://console.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400/70 hover:text-indigo-400 underline underline-offset-2"
          >
            console.anthropic.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
