import { useEffect, useRef, useState } from 'react'
import chevronIcon from '../icons/chevron.svg'
import checkIcon from '../icons/check.svg'

export type DropdownOption = { label: string; value: string }

type Props = {
  label?: string
  value: string
  options: DropdownOption[]
  placeholder?: string
  onChange: (value: string) => void
}

export function Dropdown({ label, value, options, placeholder, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const selected = options.find((o) => o.value === value)
  const displayLabel = selected?.label ?? placeholder ?? 'Select'

  return (
    <div ref={containerRef} className="relative w-full text-left">
      {label ? <div className="mb-1 text-xs font-medium text-slate-600">{label}</div> : null}

      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="truncate">{displayLabel}</span>
        <img
          src={chevronIcon}
          alt=""
          aria-hidden="true"
          className={`h-4 w-4 opacity-60 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open ? (
        <div className="absolute z-20 mt-1 w-full rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg">
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                className={`flex w-full items-center justify-between px-3 py-1.5 text-left ${
                  isSelected ? 'bg-slate-50 font-medium text-slate-900' : 'text-slate-700 hover:bg-slate-50'
                }`}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected ? (
                  <img src={checkIcon} alt="" aria-hidden="true" className="h-4 w-4 opacity-80" />
                ) : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}


