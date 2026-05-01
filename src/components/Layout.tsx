import { SlidersHorizontal } from 'lucide-react'

interface Props {
  children: React.ReactNode
  onShowFilters: () => void
}

export default function Layout({ children, onShowFilters }: Props) {
  return (
    <div className="min-h-screen bg-[#070c18] relative overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo + filters button */}
      <header className="relative z-10 px-6 pt-6 flex items-center justify-between">
        <span className="text-white font-semibold tracking-tight text-lg select-none">
          IB Prep
        </span>
        <button
          onClick={onShowFilters}
          aria-label="Customize filters"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 transition-all"
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-8 pb-8">
        <div className="w-full max-w-[760px]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-8 flex justify-center">
        <a
          href="https://buymeacoffee.com/kiernan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/25 text-xs hover:text-white/50 transition-colors"
        >
          Support the API token usage ☕
        </a>
      </footer>
    </div>
  )
}
