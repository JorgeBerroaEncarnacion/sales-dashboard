import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { SortDirection, SortKey } from '../types'

interface SortableHeaderProps {
  label: string
  sortKey: SortKey
  activeKey: SortKey
  direction: SortDirection
  onSort: (key: SortKey) => void
  align?: 'left' | 'right'
}

export default function SortableHeader({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = 'left',
}: SortableHeaderProps) {
  const active = sortKey === activeKey
  const Icon = !active ? ArrowUpDown : direction === 'asc' ? ArrowUp : ArrowDown

  return (
    <th
      scope="col"
      aria-sort={active ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}
      className={`px-4 py-3 ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className={`inline-flex items-center gap-1 font-medium uppercase hover:text-slate-900 ${
          active ? 'text-slate-900' : ''
        }`}
      >
        {label}
        <Icon className="size-3.5" aria-hidden="true" />
      </button>
    </th>
  )
}
