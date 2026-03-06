export function Badge({
  children,
  variant = 'gray',
}: {
  children: React.ReactNode
  variant?: 'gray' | 'dark' | 'outline'
}) {
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold'
  const styles =
    variant === 'dark'
      ? 'bg-slate-900 text-white'
      : variant === 'outline'
        ? 'bg-white text-slate-700 ring-1 ring-slate-200'
        : 'bg-slate-100 text-slate-700'
  return <span className={`${base} ${styles}`}>{children}</span>
}


