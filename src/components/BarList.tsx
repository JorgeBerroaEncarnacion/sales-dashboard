export interface BarListItem {
  label: string
  value: number
  display: string // formatted value shown on the right
  barClass?: string
}

/** Ranked horizontal bars with the value written out, so nothing relies on color alone. */
export default function BarList({ items }: { items: BarListItem[] }) {
  const max = Math.max(...items.map((i) => i.value), 1)
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-slate-700">{item.label}</span>
            <span className="shrink-0 font-medium text-slate-900 tabular-nums">{item.display}</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className={`h-2 rounded-full ${item.barClass ?? 'bg-indigo-500'}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
