import type { Product } from '../types'

// Static product catalog. Names match the products used in orders.ts.
export const products: Product[] = [
  { id: 'PRD-001', name: 'Wireless Headphones', category: 'Audio', price: 249.0, stock: 34 },
  { id: 'PRD-002', name: 'Noise-Cancelling Earbuds', category: 'Audio', price: 179.0, stock: 8 },
  { id: 'PRD-003', name: 'Mechanical Keyboard', category: 'Peripherals', price: 129.99, stock: 52 },
  { id: 'PRD-004', name: 'Wireless Mouse', category: 'Peripherals', price: 39.99, stock: 120 },
  { id: 'PRD-005', name: 'Webcam HD', category: 'Peripherals', price: 89.99, stock: 0 },
  { id: 'PRD-006', name: '4K Monitor 27"', category: 'Displays', price: 389.5, stock: 15 },
  { id: 'PRD-007', name: 'Ergonomic Chair', category: 'Furniture', price: 449.0, stock: 6 },
  { id: 'PRD-008', name: 'Standing Desk', category: 'Furniture', price: 599.0, stock: 11 },
  { id: 'PRD-009', name: 'Portable SSD 1TB', category: 'Storage', price: 119.0, stock: 47 },
  { id: 'PRD-010', name: 'USB-C Hub', category: 'Accessories', price: 59.0, stock: 88 },
  { id: 'PRD-011', name: 'Laptop Stand', category: 'Accessories', price: 49.5, stock: 3 },
  { id: 'PRD-012', name: 'Desk Lamp LED', category: 'Accessories', price: 45.0, stock: 64 },
]

export const LOW_STOCK_THRESHOLD = 10
