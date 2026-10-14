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

export type ProductCategory = 'Audio' | 'Peripherals' | 'Displays' | 'Furniture' | 'Storage' | 'Accessories'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  price: number
  stock: number
}

export type SortDirection = 'asc' | 'desc'
