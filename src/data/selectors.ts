import type { Order, OrderStatus, Product } from '../types'

// Pure functions that derive the views used by each page from the raw data.
// Refunded orders count as orders but not as revenue.

const isCompleted = (order: Order) => order.status !== 'Refunded'

export interface CustomerSummary {
  name: string
  email: string
  orders: number
  totalSpent: number
  lastOrder: string
}

export function getCustomers(orders: Order[]): CustomerSummary[] {
  const byEmail = new Map<string, CustomerSummary>()
  for (const order of orders) {
    const current = byEmail.get(order.email) ?? {
      name: order.customer,
      email: order.email,
      orders: 0,
      totalSpent: 0,
      lastOrder: order.date,
    }
    current.orders += 1
    if (isCompleted(order)) current.totalSpent += order.amount
    if (order.date > current.lastOrder) current.lastOrder = order.date
    byEmail.set(order.email, current)
  }
  return [...byEmail.values()]
}

export interface ProductSummary extends Product {
  unitsSold: number
  revenue: number
}

export function getProductSummaries(products: Product[], orders: Order[]): ProductSummary[] {
  return products.map((product) => {
    const sold = orders.filter((o) => o.product === product.name && isCompleted(o))
    return {
      ...product,
      unitsSold: sold.length,
      revenue: sold.reduce((sum, o) => sum + o.amount, 0),
    }
  })
}

export function getStatusCounts(orders: Order[]): Record<OrderStatus, number> {
  const counts: Record<OrderStatus, number> = { Paid: 0, Pending: 0, Shipped: 0, Refunded: 0 }
  for (const order of orders) counts[order.status] += 1
  return counts
}

export interface DailyRevenue {
  date: string
  revenue: number
  orders: number
}

export function getDailyRevenue(orders: Order[]): DailyRevenue[] {
  const byDate = new Map<string, DailyRevenue>()
  for (const order of orders) {
    const day = byDate.get(order.date) ?? { date: order.date, revenue: 0, orders: 0 }
    day.orders += 1
    if (isCompleted(order)) day.revenue += order.amount
    byDate.set(order.date, day)
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date))
}
