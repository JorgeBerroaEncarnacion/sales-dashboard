import type { ReactNode } from 'react'

interface CardProps {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

/** Generic white panel used by the non-table sections. */
export default function Card({ title, description, action, children, className = '' }: CardProps) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-base font-semibold">{title}</h2>}
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
