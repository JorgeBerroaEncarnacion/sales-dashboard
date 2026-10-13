import { SearchX } from 'lucide-react'

export default function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
      <div className="rounded-full bg-slate-100 p-3">
        <SearchX className="size-6 text-slate-500" aria-hidden="true" />
      </div>
      <p className="mt-3 text-sm font-medium">No orders found</p>
      <p className="mt-1 text-sm text-slate-500">Try a different search term or status filter.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        Clear filters
      </button>
    </div>
  )
}
