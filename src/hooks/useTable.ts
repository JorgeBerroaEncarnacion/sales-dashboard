import { useMemo, useState } from 'react'
import type { SortDirection } from '../types'

export const ALL = 'All'

interface UseTableOptions<T, K extends string> {
  items: T[]
  /** Text fields the search box matches against. */
  searchFields: (item: T) => string[]
  /** One accessor per sortable column. */
  sortAccessors: Record<K, (item: T) => string | number>
  initialSort: { key: NoInfer<K>; direction: SortDirection }
  /** Optional value used by the dropdown/segmented filter (e.g. status, category). */
  filterBy?: (item: T) => string
  pageSize?: number
}

/**
 * Generic search + filter + sort + pagination state for any table.
 * Components only render what this hook returns.
 */
export function useTable<T, K extends string>({
  items,
  searchFields,
  sortAccessors,
  initialSort,
  filterBy,
  pageSize = 8,
}: UseTableOptions<T, K>) {
  const [query, setQueryState] = useState('')
  const [filter, setFilterState] = useState<string>(ALL)
  const [sortKey, setSortKey] = useState<K>(initialSort.key)
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSort.direction)
  const [page, setPage] = useState(1)

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase()
    const matches = items.filter((item) => {
      const matchesFilter = !filterBy || filter === ALL || filterBy(item) === filter
      const matchesQuery =
        term === '' || searchFields(item).some((field) => field.toLowerCase().includes(term))
      return matchesFilter && matchesQuery
    })

    const accessor = sortAccessors[sortKey]
    const direction = sortDirection === 'asc' ? 1 : -1
    return [...matches].sort((a, b) => {
      const x = accessor(a)
      const y = accessor(b)
      const result =
        typeof x === 'number' && typeof y === 'number' ? x - y : String(x).localeCompare(String(y))
      return result * direction
    })
  }, [items, query, filter, filterBy, searchFields, sortAccessors, sortKey, sortDirection])

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize))
  const currentPage = Math.min(page, pageCount)

  const toggleSort = (key: K) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortKey(key)
    // Text columns start A→Z; numbers and dates start with the largest/newest.
    const sample = items[0] ? sortAccessors[key](items[0]) : ''
    setSortDirection(typeof sample === 'number' || key === 'date' ? 'desc' : 'asc')
  }

  // Changing search or filter always returns to the first page.
  const setQuery = (value: string) => {
    setQueryState(value)
    setPage(1)
  }
  const setFilter = (value: string) => {
    setFilterState(value)
    setPage(1)
  }
  const reset = () => {
    setQueryState('')
    setFilterState(ALL)
    setPage(1)
  }

  return {
    query,
    filter,
    sortKey,
    sortDirection,
    page: currentPage,
    pageCount,
    pageSize,
    totalResults: rows.length,
    pageItems: rows.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    setQuery,
    setFilter,
    setPage,
    toggleSort,
    reset,
  }
}

export type TableState<T, K extends string> = ReturnType<typeof useTable<T, K>>
