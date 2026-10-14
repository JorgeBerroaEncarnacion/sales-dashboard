import { Search } from 'lucide-react'
import { ALL } from '../hooks/useTable'

interface TableToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  searchPlaceholder: string
  filter?: {
    label: string // used in aria-labels, e.g. "status"
    allLabel: string // first option in the mobile select, e.g. "All statuses"
    options: string[]
    value: string
    onChange: (value: string) => void
  }
}

export default function TableToolbar({
  query,
  onQueryChange,
  searchPlaceholder,
  filter,
}: TableToolbarProps) {
  const options = filter ? [ALL, ...filter.options] : []

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-xs">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        />
      </div>

      {filter && (
        <>
          {/* Segmented control on larger screens, select on mobile */}
          <div
            className="hidden flex-wrap rounded-lg bg-slate-100 p-1 lg:flex"
            role="group"
            aria-label={`Filter by ${filter.label}`}
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => filter.onChange(option)}
                aria-pressed={filter.value === option}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter.value === option
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            aria-label={`Filter by ${filter.label}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none lg:hidden"
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option === ALL ? filter.allLabel : option}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  )
}
