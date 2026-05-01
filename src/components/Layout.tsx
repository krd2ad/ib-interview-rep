export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070c18] relative overflow-hidden">
      {/* Atmospheric gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <header className="relative z-10 px-6 pt-6">
        <span className="text-white font-semibold tracking-tight text-lg select-none">
          IB Prep
        </span>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-8 pb-16">
        <div className="w-full max-w-[760px]">
          {children}
        </div>
      </main>
    </div>
  )
}
