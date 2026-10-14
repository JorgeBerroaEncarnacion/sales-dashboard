import { BarChart3, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { navRoutes, type NavRoute } from '../routes'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function SidebarLink({ route, onNavigate }: { route: NavRoute; onNavigate: () => void }) {
  const Icon = route.icon
  return (
    <NavLink
      to={route.path}
      end={route.path === '/'}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-indigo-50 text-indigo-700'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`
      }
    >
      <Icon className="size-4.5 shrink-0" aria-hidden="true" />
      {route.label}
    </NavLink>
  )
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const main = navRoutes.filter((r) => r.section === 'main')
  const secondary = navRoutes.filter((r) => r.section === 'secondary')

  return (
    <>
      {/* Backdrop on mobile when the drawer is open */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600">
              <BarChart3 className="size-4.5 text-white" aria-hidden="true" />
            </div>
            <span className="text-base font-semibold">ShopPulse</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Menu
            </p>
            {main.map((route) => (
              <SidebarLink key={route.path} route={route} onNavigate={onClose} />
            ))}
          </div>
          <div className="space-y-1 border-t border-slate-100 pt-4">
            {secondary.map((route) => (
              <SidebarLink key={route.path} route={route} onNavigate={onClose} />
            ))}
          </div>
        </nav>
      </aside>
    </>
  )
}
