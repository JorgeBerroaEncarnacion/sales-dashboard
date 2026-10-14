import Avatar from '../components/Avatar'
import DataTable, { type Column } from '../components/DataTable'
import { orders } from '../data/orders'
import { getCustomers, type CustomerSummary } from '../data/selectors'
import { useTable } from '../hooks/useTable'
import { formatCurrency, formatDate } from '../utils/format'

type CustomerSortKey = 'name' | 'orders' | 'totalSpent' | 'lastOrder'

const customers = getCustomers(orders)

const searchFields = (c: CustomerSummary) => [c.name, c.email]
const sortAccessors: Record<CustomerSortKey, (c: CustomerSummary) => string | number> = {
  name: (c) => c.name,
  orders: (c) => c.orders,
  totalSpent: (c) => c.totalSpent,
  lastOrder: (c) => c.lastOrder,
}

const columns: Column<CustomerSummary, CustomerSortKey>[] = [
  {
    header: 'Customer',
    sortKey: 'name',
    cell: (c) => (
      <div className="flex items-center gap-3">
        <Avatar name={c.name} size="sm" />
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-slate-500">{c.email}</p>
        </div>
      </div>
    ),
  },
  { header: 'Orders', sortKey: 'orders', align: 'right', cell: (c) => c.orders, className: 'tabular-nums' },
  {
    header: 'Total spent',
    sortKey: 'totalSpent',
    align: 'right',
    cell: (c) => formatCurrency(c.totalSpent),
    className: 'font-medium tabular-nums',
  },
  {
    header: 'Last order',
    sortKey: 'lastOrder',
    align: 'right',
    cell: (c) => formatDate(c.lastOrder),
    className: 'whitespace-nowrap text-slate-600',
  },
]

const mobileCard = (c: CustomerSummary) => (
  <div className="flex items-center gap-3">
    <Avatar name={c.name} size="sm" />
    <div className="min-w-0 flex-1">
      <p className="truncate font-medium">{c.name}</p>
      <p className="truncate text-xs text-slate-500">
        {c.orders} {c.orders === 1 ? 'order' : 'orders'} · last {formatDate(c.lastOrder)}
      </p>
    </div>
    <p className="font-semibold tabular-nums">{formatCurrency(c.totalSpent)}</p>
  </div>
)

export default function CustomersPage() {
  const table = useTable({
    items: customers,
    searchFields,
    sortAccessors,
    initialSort: { key: 'totalSpent', direction: 'desc' },
    pageSize: 10,
  })

  return (
    <DataTable
      title="Customers"
      description={`${customers.length} customers placed orders this month.`}
      table={table}
      columns={columns}
      rowKey={(c) => c.email}
      mobileCard={mobileCard}
      searchPlaceholder="Search by name or email..."
    />
  )
}
