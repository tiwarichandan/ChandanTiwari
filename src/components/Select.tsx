import type { SelectHTMLAttributes } from 'react'

type Option = { label: string; value: string }

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  options: Option[]
  rightIconSrc?: string
}

export function Select({ label, options, rightIconSrc, className = '', id, ...props }: Props) {
  const selectId = id ?? props.name
  return (
    <label className="block w-full">
      {label ? <div className="mb-1 text-xs font-medium text-slate-600">{label}</div> : null}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none rounded-lg bg-white py-2 pl-3 pr-9 text-sm text-slate-900 ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-400 ${className}`.trim()}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {rightIconSrc ? (
          <img
            src={rightIconSrc}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
          />
        ) : null}
      </div>
    </label>
  )
}


