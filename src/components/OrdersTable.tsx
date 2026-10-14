import { useTable } from '../hooks/useTable'
import type { Order, OrderStatus } from '../types'
import { formatCurrency, formatDate } from '../utils/format'
import DataTable, { type Column } from './DataTable'
import StatusBadge from './StatusBadge'
import type { ReactNode } from 'react'

type OrderSortKey = 'customer' | 'date' | 'amount'

const statuses: OrderStatus[] = ['Paid', 'Pending', 'Shipped', 'Refunded']

// Defined at module level so the table hook's memoization stays stable between renders.
const searchFields = (o: Order) => [o.id, o.customer, o.email, o.product]
const filterBy = (o: Order) => o.status
const sortAccessors: Record<OrderSortKey, (o: Order) => string | number> = {
  customer: (o) => o.customer,
  // Same-day orders fall back to the order id so the order stays stable.
  date: (o) => `${o.date}-${o.id}`,
  amount: (o) => o.amount,
}

const columns: Column<Order, OrderSortKey>[] = [
  { header: 'Order', cell: (o) => o.id, className: 'font-medium whitespace-nowrap text-slate-700' },
  {
    header: 'Customer',
    sortKey: 'customer',
    cell: (o) => (
      <>
        <p className="font-medium">{o.customer}</p>
        <p className="text-xs text-slate-500">{o.email}</p>
      </>
    ),
  },
  { header: 'Product', cell: (o) => o.product, className: 'text-slate-600' },
  { header: 'Date', sortKey: 'date', cell: (o) => formatDate(o.date), className: 'whitespace-nowrap text-slate-600' },
  { header: 'Status', cell: (o) => <StatusBadge status={o.status} /> },
  {
    header: 'Amount',
    sortKey: 'amount',
    align: 'right',
    cell: (o) => formatCurrency(o.amount),
    className: 'font-medium whitespace-nowrap tabular-nums',
  },
]

const mobileCard = (o: Order) => (
  <div className="space-y-2">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{o.customer}</p>
        <p className="truncate text-xs text-slate-500">{o.product}</p>
      </div>
      <p className="font-semibold tabular-nums">{formatCurrency(o.amount)}</p>
    </div>
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>
        {o.id} · {formatDate(o.date)}
      </span>
      <StatusBadge status={o.status} />
    </div>
  </div>
)

interface OrdersTableProps {
  orders: Order[]
  title?: string
  description?: string
  pageSize?: number
  action?: ReactNode
}

export default function OrdersTable({
  orders,
  title = 'Recent orders',
  description = 'Search, filter and sort the latest transactions.',
  pageSize,
  action,
}: OrdersTableProps) {
  const table = useTable({
    items: orders,
    searchFields,
    sortAccessors,
    filterBy,
    initialSort: { key: 'date', direction: 'desc' },
    pageSize,
  })

  return (
    <DataTable
      title={title}
      description={description}
      table={table}
      columns={columns}
      rowKey={(o) => o.id}
      mobileCard={mobileCard}
      searchPlaceholder="Search orders, customers, products..."
      filter={{ label: 'status', allLabel: 'All statuses', options: statuses }}
      action={action}
    />
  )
}
