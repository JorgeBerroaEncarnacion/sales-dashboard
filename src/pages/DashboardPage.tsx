import { ArrowRight, DollarSign, Receipt, ShoppingCart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import OrdersTable from '../components/OrdersTable'
import StatCard from '../components/StatCard'
import { orders } from '../data/orders'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { formatCurrency } from '../utils/format'

export default function DashboardPage() {
  const stats = useDashboardStats(orders)

  const cards = [
    { label: 'Total Revenue', value: formatCurrency(stats.revenue.value), change: stats.revenue.change, icon: DollarSign },
    { label: 'Orders', value: stats.orders.value.toString(), change: stats.orders.change, icon: ShoppingCart },
    { label: 'Customers', value: stats.customers.value.toString(), change: stats.customers.change, icon: Users },
    { label: 'Avg. Order Value', value: formatCurrency(stats.averageOrder.value), change: stats.averageOrder.change, icon: Receipt },
  ]

  return (
    <>
      <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </section>

      <OrdersTable
        orders={orders}
        action={
          <Link
            to="/orders"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />
    </>
  )
}
