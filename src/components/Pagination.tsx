import { Button } from './Button'

function PageButton({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 min-w-8 rounded-md px-2 text-sm font-medium ${
        active ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  )
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}) {
  const safeTotal = Math.max(1, totalPages)
  const safePage = Math.min(Math.max(1, page), safeTotal)

  const pages = Array.from({ length: safeTotal }, (_, i) => i + 1).slice(0, 5)
  // Keep it simple (Figma shows small page list). If many pages, show first 5.

  return (
    <div className="flex items-center justify-between gap-3">
      <Button variant="secondary" onClick={() => onPageChange(Math.max(1, safePage - 1))} disabled={safePage <= 1}>
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <PageButton key={p} active={p === safePage} onClick={() => onPageChange(p)}>
            {p}
          </PageButton>
        ))}
        {safeTotal > pages.length ? <span className="px-1 text-sm text-slate-500">…</span> : null}
      </div>

      <Button onClick={() => onPageChange(Math.min(safeTotal, safePage + 1))} disabled={safePage >= safeTotal}>
        Next
      </Button>
    </div>
  )
}


