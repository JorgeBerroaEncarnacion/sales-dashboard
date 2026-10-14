import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { SortDirection } from '../types'

interface SortableHeaderProps<K extends string> {
  label: string
  sortKey: K
  activeKey: K
  direction: SortDirection
  onSort: (key: K) => void
  align?: 'left' | 'right'
}

export default function SortableHeader<K extends string>({
  label,
  sortKey,
  activeKey,
  direction,
  onSort,
  align = 'left',
}: SortableHeaderProps<K>) {
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
