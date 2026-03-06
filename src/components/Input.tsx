import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  leftIconSrc?: string
}

export function Input({ label, leftIconSrc, className = '', id, ...props }: Props) {
  const inputId = id ?? props.name
  return (
    <label className="block w-full">
      {label ? <div className="mb-1 text-xs font-medium text-slate-600">{label}</div> : null}
      <div className="relative">
        {leftIconSrc ? (
          <img
            src={leftIconSrc}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
          />
        ) : null}
        <input
          id={inputId}
          className={`w-full rounded-lg bg-white py-2 text-sm text-slate-900 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-400 ${
            leftIconSrc ? 'pl-9 pr-3' : 'px-3'
          } ${className}`.trim()}
          {...props}
        />
      </div>
    </label>
  )
}


