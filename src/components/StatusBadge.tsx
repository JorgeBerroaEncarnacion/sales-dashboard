import type { OrderStatus } from '../types'
import { statusTone } from '../utils/status'
import Badge from './Badge'

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return <Badge tone={statusTone[status]}>{status}</Badge>
}
