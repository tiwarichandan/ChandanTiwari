export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
      {label}
    </div>
  )
}

export function ErrorState({
  title = 'Something went wrong',
  message,
}: {
  title?: string
  message?: string
}) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
      <div className="text-sm font-semibold text-rose-900">{title}</div>
      {message ? <div className="mt-1 text-sm text-rose-800">{message}</div> : null}
    </div>
  )
}


