import { Search } from 'lucide-react'
import type { StatusFilter } from '../hooks/useOrderFilters'

const statusOptions: StatusFilter[] = ['All', 'Paid', 'Pending', 'Shipped', 'Refunded']

interface TableToolbarProps {
  query: string
  status: StatusFilter
  onQueryChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
}

export default function TableToolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: TableToolbarProps) {
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
          placeholder="Search orders, customers, products..."
          aria-label="Search orders"
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
        />
      </div>

      {/* Segmented control on larger screens, select on mobile */}
      <div className="hidden rounded-lg bg-slate-100 p-1 md:flex" role="group" aria-label="Filter by status">
        {statusOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onStatusChange(option)}
            aria-pressed={status === option}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              status === option
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        aria-label="Filter by status"
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none md:hidden"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option === 'All' ? 'All statuses' : option}
          </option>
        ))}
      </select>
    </div>
  )
}
