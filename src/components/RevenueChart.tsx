import { useState } from 'react'
import type { DailyRevenue } from '../data/selectors'
import { formatCurrency } from '../utils/format'

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })

/** Rounds the axis maximum up to a clean step so gridlines land on round numbers. */
function niceMax(value: number) {
  const step = value > 2000 ? 500 : value > 500 ? 250 : 100
  return Math.max(step, Math.ceil(value / step) * step)
}

/**
 * Single-series bar chart built with plain HTML/CSS. Each column is a focusable
 * button, so the tooltip works with mouse hover, touch and keyboard focus.
 */
export default function RevenueChart({ data }: { data: DailyRevenue[] }) {
  const [active, setActive] = useState<number | null>(null)
  const max = niceMax(Math.max(...data.map((d) => d.revenue)))
  const ticks = [max, (max * 2) / 3, max / 3, 0]

  return (
    <div>
      <div className="flex gap-3">
        {/* Y axis */}
        <div className="relative h-56 w-12 shrink-0 text-right text-xs text-slate-400 tabular-nums" aria-hidden="true">
          {ticks.map((tick, i) => (
            <span
              key={tick}
              className="absolute right-0 -translate-y-1/2"
              style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
            >
              ${Math.round(tick).toLocaleString('en-US')}
            </span>
          ))}
        </div>

        <div className="relative h-56 flex-1">
          {/* Gridlines */}
          {ticks.map((tick, i) => (
            <div
              key={tick}
              className={`absolute inset-x-0 border-t ${i === ticks.length - 1 ? 'border-slate-300' : 'border-dashed border-slate-200'}`}
              style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
              aria-hidden="true"
            />
          ))}

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-0.5" onMouseLeave={() => setActive(null)}>
            {data.map((day, i) => (
              <button
                key={day.date}
                type="button"
                className="group relative flex h-full flex-1 items-end justify-center focus:outline-none"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                aria-label={`${shortDate.format(new Date(day.date))}: ${formatCurrency(day.revenue)} from ${day.orders} orders`}
              >
                <span
                  className={`w-full max-w-10 rounded-t-[4px] transition-colors ${
                    active === i ? 'bg-indigo-700' : 'bg-indigo-500'
                  } group-focus-visible:ring-2 group-focus-visible:ring-indigo-300`}
                  style={{ height: `${(day.revenue / max) * 100}%` }}
                />
                {active === i && (
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute z-10 mb-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left whitespace-nowrap shadow-lg ${
                      i < 2 ? 'left-0' : i > data.length - 3 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                    }`}
                    style={{ bottom: `${(day.revenue / max) * 100}%` }}
                  >
                    <span className="block text-xs text-slate-500">{shortDate.format(new Date(day.date))}</span>
                    <span className="block text-sm font-semibold text-slate-900 tabular-nums">
                      {formatCurrency(day.revenue)}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {day.orders} {day.orders === 1 ? 'order' : 'orders'}
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* X axis: every other label on small screens to avoid collisions */}
      <div className="mt-2 flex gap-0.5 pl-15 text-xs text-slate-400" aria-hidden="true">
        {data.map((day, i) => (
          <span key={day.date} className={`flex-1 text-center ${i % 2 === 1 ? 'hidden sm:block' : ''}`}>
            {shortDate.format(new Date(day.date)).replace(/^\w+ /, '')}
          </span>
        ))}
      </div>
      <p className="mt-1 pl-15 text-xs text-slate-400">October 2026</p>

      <details className="mt-4 text-sm">
        <summary className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700">View as table</summary>
        <table className="mt-3 w-full max-w-md text-sm">
          <thead className="text-xs text-slate-500 uppercase">
            <tr>
              <th className="py-1 text-left font-medium">Date</th>
              <th className="py-1 text-right font-medium">Orders</th>
              <th className="py-1 text-right font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((day) => (
              <tr key={day.date}>
                <td className="py-1.5">{shortDate.format(new Date(day.date))}</td>
                <td className="py-1.5 text-right tabular-nums">{day.orders}</td>
                <td className="py-1.5 text-right tabular-nums">{formatCurrency(day.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  )
}
