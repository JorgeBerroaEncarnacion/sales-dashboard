import type { ReactNode } from 'react'

export type BadgeTone = 'green' | 'amber' | 'sky' | 'rose' | 'slate'

const tones: Record<BadgeTone, string> = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  sky: 'bg-sky-50 text-sky-700 ring-sky-600/20',
  rose: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  slate: 'bg-slate-100 text-slate-700 ring-slate-500/20',
}

export default function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  )
}
