import type { BadgeTone } from '../components/Badge'
import type { OrderStatus } from '../types'

export const statusTone: Record<OrderStatus, BadgeTone> = {
  Paid: 'green',
  Pending: 'amber',
  Shipped: 'sky',
  Refunded: 'rose',
}
