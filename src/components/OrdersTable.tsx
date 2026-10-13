import { useOrderFilters } from '../hooks/useOrderFilters'
import type { Order } from '../types'
import { formatCurrency, formatDate } from '../utils/format'
import EmptyState from './EmptyState'
import Pagination from './Pagination'
import SortableHeader from './SortableHeader'
import StatusBadge from './StatusBadge'
import TableToolbar from './TableToolbar'

export default function OrdersTable({ orders }: { orders: Order[] }) {
  const filters = useOrderFilters(orders)
  const { pageItems, sortKey, sortDirection, toggleSort } = filters

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="orders-title">
      <div className="space-y-4 p-4 sm:p-5">
        <div>
          <h2 id="orders-title" className="text-base font-semibold">
            Recent orders
          </h2>
          <p className="text-sm text-slate-500">Search, filter and sort the latest transactions.</p>
        </div>
        <TableToolbar
          query={filters.query}
          status={filters.status}
          onQueryChange={filters.setQuery}
          onStatusChange={filters.setStatus}
        />
      </div>

      {filters.totalResults === 0 ? (
        <EmptyState onReset={filters.resetFilters} />
      ) : (
        <>
          {/* Desktop / tablet: full table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-y border-slate-100 bg-slate-50 text-xs text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Order</th>
                  <SortableHeader label="Customer" sortKey="customer" activeKey={sortKey} direction={sortDirection} onSort={toggleSort} />
                  <th scope="col" className="px-4 py-3 text-left font-medium">Product</th>
                  <SortableHeader label="Date" sortKey="date" activeKey={sortKey} direction={sortDirection} onSort={toggleSort} />
                  <th scope="col" className="px-4 py-3 text-left font-medium">Status</th>
                  <SortableHeader label="Amount" sortKey="amount" activeKey={sortKey} direction={sortDirection} onSort={toggleSort} align="right" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageItems.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium whitespace-nowrap text-slate-700">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-xs text-slate-500">{order.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{order.product}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-600">{formatDate(order.date)}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-right font-medium whitespace-nowrap tabular-nums">
                      {formatCurrency(order.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards instead of a cramped table */}
          <ul className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">
            {pageItems.map((order) => (
              <li key={order.id} className="space-y-2 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{order.customer}</p>
                    <p className="truncate text-xs text-slate-500">{order.product}</p>
                  </div>
                  <p className="font-semibold tabular-nums">{formatCurrency(order.amount)}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {order.id} · {formatDate(order.date)}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            page={filters.page}
            pageCount={filters.pageCount}
            pageSize={filters.pageSize}
            totalResults={filters.totalResults}
            onPageChange={filters.setPage}
          />
        </>
      )}
    </section>
  )
}
