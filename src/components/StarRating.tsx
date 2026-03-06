function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 ${filled ? 'text-amber-400' : 'text-slate-200'}`}
      fill="currentColor"
    >
      <path d="M10 15.27l-5.18 3.06 1.39-5.81L1.6 8.67l5.9-.5L10 2.67l2.5 5.5 5.9.5-4.61 3.85 1.39 5.81L10 15.27z" />
    </svg>
  )
}

export function StarRating({ value = 0, outOf = 5 }: { value?: number; outOf?: number }) {
  const rounded = Math.max(0, Math.min(outOf, Math.round(value)))
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${value} out of ${outOf}`}>
      {Array.from({ length: outOf }).map((_, i) => (
        <Star key={i} filled={i < rounded} />
      ))}
    </div>
  )
}


