import BarList from '../components/BarList'
import Card from '../components/Card'
import RevenueChart from '../components/RevenueChart'
import { orders } from '../data/orders'
import { products } from '../data/products'
import { getDailyRevenue, getProductSummaries, getStatusCounts } from '../data/selectors'
import type { OrderStatus } from '../types'
import { formatCurrency } from '../utils/format'

const daily = getDailyRevenue(orders)
const statusCounts = getStatusCounts(orders)
const topProducts = getProductSummaries(products, orders)
  .filter((p) => p.revenue > 0)
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5)

const statusBar: Record<OrderStatus, string> = {
  Paid: 'bg-emerald-500',
  Shipped: 'bg-sky-500',
  Pending: 'bg-amber-500',
  Refunded: 'bg-rose-500',
}

const totalRevenue = daily.reduce((sum, d) => sum + d.revenue, 0)
const bestDay = daily.reduce((best, d) => (d.revenue > best.revenue ? d : best), daily[0])
const refundRate = (statusCounts.Refunded / orders.length) * 100

export default function AnalyticsPage() {
  return (
    <>
      <section aria-label="Highlights" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Revenue this month', value: formatCurrency(totalRevenue) },
          {
            label: 'Best day',
            value: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(
              new Date(bestDay.date),
            ),
            note: formatCurrency(bestDay.revenue),
          },
          { label: 'Refund rate', value: `${refundRate.toFixed(1)}%`, note: `${statusCounts.Refunded} of ${orders.length} orders` },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{item.value}</p>
            {item.note && <p className="mt-0.5 text-xs text-slate-500">{item.note}</p>}
          </div>
        ))}
      </section>

      <Card title="Daily revenue" description="Excludes refunded orders. Hover or tap a bar for details.">
        <RevenueChart data={daily} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Top products" description="By revenue this month">
          <BarList
            items={topProducts.map((p) => ({ label: p.name, value: p.revenue, display: formatCurrency(p.revenue) }))}
          />
        </Card>
        <Card title="Orders by status" description={`${orders.length} orders`}>
          <BarList
            items={(Object.keys(statusCounts) as OrderStatus[]).map((status) => ({
              label: status,
              value: statusCounts[status],
              display: `${statusCounts[status]} · ${Math.round((statusCounts[status] / orders.length) * 100)}%`,
              barClass: statusBar[status],
            }))}
          />
        </Card>
      </div>
    </>
  )
}
