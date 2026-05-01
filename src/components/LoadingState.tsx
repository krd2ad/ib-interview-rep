export default function LoadingState() {
  return (
    <div className="mt-4 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center animate-slide-up">
      <div className="flex justify-center gap-1.5 mb-4">
        {[0, 0.15, 0.3].map((delay, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <p className="text-white/40 text-sm">
        Reviewing your answer like an investment banking recruiter...
      </p>
    </div>
  )
}
