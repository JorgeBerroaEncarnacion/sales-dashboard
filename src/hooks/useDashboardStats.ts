import { useMemo } from 'react'
import { previousPeriod } from '../data/orders'
import type { Order } from '../types'
import { percentChange } from '../utils/format'

/** Derives the stat-card figures from the order list instead of hard-coding them. */
export function useDashboardStats(orders: Order[]) {
  return useMemo(() => {
    const completed = orders.filter((o) => o.status !== 'Refunded')
    const revenue = completed.reduce((sum, o) => sum + o.amount, 0)
    const customers = new Set(orders.map((o) => o.email)).size
    const averageOrder = completed.length ? revenue / completed.length : 0

    return {
      revenue: { value: revenue, change: percentChange(revenue, previousPeriod.revenue) },
      orders: { value: orders.length, change: percentChange(orders.length, previousPeriod.orders) },
      customers: { value: customers, change: percentChange(customers, previousPeriod.customers) },
      averageOrder: {
        value: averageOrder,
        change: percentChange(averageOrder, previousPeriod.averageOrder),
      },
    }
  }, [orders])
}
