import { useMemo, useState } from 'react'
import type { Order, OrderStatus, SortDirection, SortKey } from '../types'

export type StatusFilter = OrderStatus | 'All'

const PAGE_SIZE = 8

/**
 * Encapsulates search, status filtering, sorting and pagination for the
 * orders table, so the table component only deals with rendering.
 */
export function useOrderFilters(orders: Order[]) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [sortKey, setSortKey] = useState<SortKey>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()

    const matches = orders.filter((order) => {
      const matchesStatus = status === 'All' || order.status === status
      const matchesQuery =
        term === '' ||
        [order.id, order.customer, order.email, order.product].some((field) =>
          field.toLowerCase().includes(term),
        )
      return matchesStatus && matchesQuery
    })

    const direction = sortDirection === 'asc' ? 1 : -1
    return [...matches].sort((a, b) => {
      if (sortKey === 'amount') return (a.amount - b.amount) * direction
      if (sortKey === 'customer') return a.customer.localeCompare(b.customer) * direction
      // Same-day orders fall back to the order id so the sort stays stable.
      return (a.date.localeCompare(b.date) || a.id.localeCompare(b.id)) * direction
    })
  }, [orders, query, status, sortKey, sortDirection])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection(key === 'customer' ? 'asc' : 'desc')
    }
  }

  // Any change to the filters sends the user back to the first page.
  const updateQuery = (value: string) => {
    setQuery(value)
    setPage(1)
  }
  const updateStatus = (value: StatusFilter) => {
    setStatus(value)
    setPage(1)
  }
  const resetFilters = () => {
    setQuery('')
    setStatus('All')
    setPage(1)
  }

  return {
    query,
    status,
    sortKey,
    sortDirection,
    page: currentPage,
    pageCount,
    pageSize: PAGE_SIZE,
    totalResults: filtered.length,
    pageItems,
    setQuery: updateQuery,
    setStatus: updateStatus,
    setPage,
    toggleSort,
    resetFilters,
  }
}
