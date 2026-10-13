import type { OrderStatus } from '../types'

const styles: Record<OrderStatus, string> = {
  Paid: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Pending: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Shipped: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Refunded: 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${styles[status]}`}
    >
      {status}
    </span>
  )
}
