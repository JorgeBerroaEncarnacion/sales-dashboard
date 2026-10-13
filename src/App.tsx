import { DollarSign, Receipt, ShoppingCart, Users } from 'lucide-react'
import { useState } from 'react'
import Header from './components/Header'
import OrdersTable from './components/OrdersTable'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import { orders } from './data/orders'
import { useDashboardStats } from './hooks/useDashboardStats'
import { formatCurrency } from './utils/format'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const stats = useDashboardStats(orders)

  const cards = [
    { label: 'Total Revenue', value: formatCurrency(stats.revenue.value), change: stats.revenue.change, icon: DollarSign },
    { label: 'Orders', value: stats.orders.value.toString(), change: stats.orders.change, icon: ShoppingCart },
    { label: 'Customers', value: stats.customers.value.toString(), change: stats.customers.change, icon: Users },
    { label: 'Avg. Order Value', value: formatCurrency(stats.averageOrder.value), change: stats.averageOrder.change, icon: Receipt },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
          <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </section>

          <OrdersTable orders={orders} />
        </main>
      </div>
    </div>
  )
}
