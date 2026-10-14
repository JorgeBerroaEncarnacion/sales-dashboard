import {
  BarChart3,
  HelpCircle,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  type LucideIcon,
} from 'lucide-react'

export interface NavRoute {
  path: string
  label: string
  description: string
  icon: LucideIcon
  section: 'main' | 'secondary'
}

// Single source of truth for the sidebar links and the header title of each page.
export const navRoutes: NavRoute[] = [
  { path: '/', label: 'Dashboard', description: 'Overview of your store this month', icon: LayoutDashboard, section: 'main' },
  { path: '/orders', label: 'Orders', description: 'Track and manage every order', icon: ShoppingCart, section: 'main' },
  { path: '/products', label: 'Products', description: 'Catalog, stock levels and sales', icon: Package, section: 'main' },
  { path: '/customers', label: 'Customers', description: 'Who buys from your store', icon: Users, section: 'main' },
  { path: '/analytics', label: 'Analytics', description: 'Revenue and sales performance', icon: BarChart3, section: 'main' },
  { path: '/settings', label: 'Settings', description: 'Profile, store and notifications', icon: Settings, section: 'secondary' },
  { path: '/help', label: 'Help', description: 'Answers to common questions', icon: HelpCircle, section: 'secondary' },
]
