import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-5xl font-semibold text-indigo-600">404</p>
      <p className="mt-3 text-lg font-medium">Page not found</p>
      <p className="mt-1 text-sm text-slate-500">The page you’re looking for doesn’t exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
