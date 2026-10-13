import type { Order } from '../types'

// Static sample data. No backend is required for this dashboard.
export const orders: Order[] = [
  { id: 'ORD-1048', customer: 'Olivia Martin', email: 'olivia.martin@example.com', product: 'Wireless Headphones', date: '2026-10-12', amount: 249.0, status: 'Paid' },
  { id: 'ORD-1047', customer: 'Jackson Lee', email: 'jackson.lee@example.com', product: 'Mechanical Keyboard', date: '2026-10-12', amount: 129.99, status: 'Pending' },
  { id: 'ORD-1046', customer: 'Isabella Nguyen', email: 'isabella.nguyen@example.com', product: '4K Monitor 27"', date: '2026-10-11', amount: 389.5, status: 'Shipped' },
  { id: 'ORD-1045', customer: 'William Kim', email: 'will.kim@example.com', product: 'USB-C Hub', date: '2026-10-11', amount: 59.0, status: 'Paid' },
  { id: 'ORD-1044', customer: 'Sofia Davis', email: 'sofia.davis@example.com', product: 'Ergonomic Chair', date: '2026-10-10', amount: 449.0, status: 'Refunded' },
  { id: 'ORD-1043', customer: 'Liam Johnson', email: 'liam.johnson@example.com', product: 'Webcam HD', date: '2026-10-10', amount: 89.99, status: 'Paid' },
  { id: 'ORD-1042', customer: 'Emma Wilson', email: 'emma.wilson@example.com', product: 'Standing Desk', date: '2026-10-09', amount: 599.0, status: 'Shipped' },
  { id: 'ORD-1041', customer: 'Noah Brown', email: 'noah.brown@example.com', product: 'Wireless Mouse', date: '2026-10-09', amount: 39.99, status: 'Paid' },
  { id: 'ORD-1040', customer: 'Ava Garcia', email: 'ava.garcia@example.com', product: 'Laptop Stand', date: '2026-10-08', amount: 49.5, status: 'Pending' },
  { id: 'ORD-1039', customer: 'Lucas Rodriguez', email: 'lucas.rod@example.com', product: 'Noise-Cancelling Earbuds', date: '2026-10-08', amount: 179.0, status: 'Paid' },
  { id: 'ORD-1038', customer: 'Mia Hernandez', email: 'mia.hernandez@example.com', product: 'Portable SSD 1TB', date: '2026-10-07', amount: 119.0, status: 'Shipped' },
  { id: 'ORD-1037', customer: 'Ethan Lopez', email: 'ethan.lopez@example.com', product: 'Desk Lamp LED', date: '2026-10-07', amount: 45.0, status: 'Paid' },
  { id: 'ORD-1036', customer: 'Charlotte Clark', email: 'charlotte.clark@example.com', product: 'Mechanical Keyboard', date: '2026-10-06', amount: 129.99, status: 'Refunded' },
  { id: 'ORD-1035', customer: 'Olivia Martin', email: 'olivia.martin@example.com', product: '4K Monitor 27"', date: '2026-10-06', amount: 389.5, status: 'Paid' },
  { id: 'ORD-1034', customer: 'Amelia Walker', email: 'amelia.walker@example.com', product: 'Wireless Headphones', date: '2026-10-05', amount: 249.0, status: 'Pending' },
  { id: 'ORD-1033', customer: 'Benjamin Hall', email: 'ben.hall@example.com', product: 'USB-C Hub', date: '2026-10-05', amount: 59.0, status: 'Shipped' },
  { id: 'ORD-1032', customer: 'Harper Allen', email: 'harper.allen@example.com', product: 'Ergonomic Chair', date: '2026-10-04', amount: 449.0, status: 'Paid' },
  { id: 'ORD-1031', customer: 'Jackson Lee', email: 'jackson.lee@example.com', product: 'Webcam HD', date: '2026-10-04', amount: 89.99, status: 'Paid' },
  { id: 'ORD-1030', customer: 'Evelyn King', email: 'evelyn.king@example.com', product: 'Standing Desk', date: '2026-10-03', amount: 599.0, status: 'Pending' },
  { id: 'ORD-1029', customer: 'Henry Wright', email: 'henry.wright@example.com', product: 'Laptop Stand', date: '2026-10-03', amount: 49.5, status: 'Paid' },
  { id: 'ORD-1028', customer: 'Abigail Scott', email: 'abigail.scott@example.com', product: 'Portable SSD 1TB', date: '2026-10-02', amount: 119.0, status: 'Shipped' },
  { id: 'ORD-1027', customer: 'Alexander Green', email: 'alex.green@example.com', product: 'Noise-Cancelling Earbuds', date: '2026-10-02', amount: 179.0, status: 'Refunded' },
  { id: 'ORD-1026', customer: 'Emily Adams', email: 'emily.adams@example.com', product: 'Wireless Mouse', date: '2026-10-01', amount: 39.99, status: 'Paid' },
  { id: 'ORD-1025', customer: 'Emma Wilson', email: 'emma.wilson@example.com', product: 'Desk Lamp LED', date: '2026-10-01', amount: 45.0, status: 'Shipped' },
]

// Previous-period figures used to compute the trend on each stat card.
export const previousPeriod = {
  revenue: 4120.0,
  orders: 21,
  customers: 19,
  averageOrder: 196.19,
}
