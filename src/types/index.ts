export type OrderStatus = 'Paid' | 'Pending' | 'Shipped' | 'Refunded'

export interface Order {
  id: string
  customer: string
  email: string
  product: string
  date: string // ISO date (YYYY-MM-DD)
  amount: number
  status: OrderStatus
}

export type SortKey = 'date' | 'amount' | 'customer'
export type SortDirection = 'asc' | 'desc'
