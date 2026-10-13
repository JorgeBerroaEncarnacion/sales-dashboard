import { Bell, ChevronDown, Menu } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="hidden text-xs text-slate-500 sm:block">Overview of your store this month</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-lg py-1 pr-1 pl-1 hover:bg-slate-100 sm:pr-2"
          aria-label="Open profile menu"
        >
          <div className="flex size-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
            JB
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm leading-tight font-medium">Jorge Berroa</p>
            <p className="text-xs leading-tight text-slate-500">Admin</p>
          </div>
          <ChevronDown className="hidden size-4 text-slate-400 sm:block" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
