import { useId, useState } from 'react'

export function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = useId()

  return (
    <div className="border-t border-slate-200 py-3">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        <span className="text-slate-500">{open ? '−' : '+'}</span>
      </button>
      {open ? (
        <div id={contentId} className="mt-2 text-sm leading-6 text-slate-700">
          {children}
        </div>
      ) : null}
    </div>
  )
}


