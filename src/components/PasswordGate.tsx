import { useState } from 'react'
import { Lock } from 'lucide-react'

const PASSWORD = 'DARDENIBPREP'

interface Props {
  onUnlock: () => void
}

export default function PasswordGate({ onUnlock }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim().toUpperCase() === PASSWORD) {
      onUnlock()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="min-h-screen bg-[#070c18] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl animate-slide-up">
        <div className="flex items-center gap-3 mb-7">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Lock size={16} className="text-indigo-400" />
          </div>
          <div>
            <h1 className="text-white font-semibold leading-none mb-1">Investment Banking Interview Prep</h1>
            <p className="text-white/40 text-xs">For those in need of review...</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(false) }}
              placeholder="Password"
              autoFocus
              autoComplete="off"
              className={`w-full bg-white/[0.05] border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 transition-colors ${
                error
                  ? 'border-rose-500/50 focus:ring-rose-500/30'
                  : 'border-white/10 focus:ring-indigo-500/50 focus:border-indigo-500/40'
              }`}
            />
            {error && (
              <p className="text-rose-400/80 text-xs mt-2">Incorrect password. Try again.</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  )
}
