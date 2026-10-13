import { TrendingDown, TrendingUp, type LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change: number
  icon: LucideIcon
}

export default function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
  const positive = change >= 0
  const Trend = positive ? TrendingUp : TrendingDown

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="rounded-lg bg-slate-100 p-2">
          <Icon className="size-4.5 text-slate-600" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <p className="mt-1 flex items-center gap-1 text-xs">
        <span
          className={`inline-flex items-center gap-0.5 font-medium ${
            positive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          <Trend className="size-3.5" aria-hidden="true" />
          {positive ? '+' : ''}
          {change}%
        </span>
        <span className="text-slate-500">vs last month</span>
      </p>
    </div>
  )
}
