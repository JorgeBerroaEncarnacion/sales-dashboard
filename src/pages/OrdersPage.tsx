import OrdersTable from '../components/OrdersTable'
import { statusTone } from '../utils/status'
import { orders } from '../data/orders'
import { getStatusCounts } from '../data/selectors'
import type { OrderStatus } from '../types'

const statusCounts = getStatusCounts(orders)

const dotColor = {
  green: 'bg-emerald-500',
  amber: 'bg-amber-500',
  sky: 'bg-sky-500',
  rose: 'bg-rose-500',
  slate: 'bg-slate-400',
}

export default function OrdersPage() {
  return (
    <>
      <section aria-label="Orders by status" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(Object.keys(statusCounts) as OrderStatus[]).map((status) => (
          <div key={status} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span className={`size-2 rounded-full ${dotColor[statusTone[status]]}`} aria-hidden="true" />
              {status}
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{statusCounts[status]}</p>
          </div>
        ))}
      </section>

      <OrdersTable
        orders={orders}
        title="All orders"
        description={`${orders.length} orders this month`}
        pageSize={10}
      />
    </>
  )
}
