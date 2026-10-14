import { ChevronDown, Mail, Search } from 'lucide-react'
import { useState } from 'react'
import Card from '../components/Card'

const faqs = [
  {
    question: 'How is total revenue calculated?',
    answer: 'Total revenue is the sum of all orders this month, excluding refunded orders. Pending and shipped orders are included.',
  },
  {
    question: 'What does "Low stock" mean on the Products page?',
    answer: 'A product is marked as low stock when it has fewer than 10 units available, and out of stock when it reaches zero.',
  },
  {
    question: 'How do I find a specific order?',
    answer: 'Go to Orders and use the search box. You can search by order ID, customer name, email or product, and combine it with the status filter.',
  },
  {
    question: 'Can I sort the tables?',
    answer: 'Yes. Click any column header with arrows (for example Date or Amount) to sort it. Click again to reverse the order.',
  },
  {
    question: 'How are customers counted?',
    answer: 'Each unique email address that placed at least one order this month counts as one customer.',
  },
  {
    question: 'How do I change my notification preferences?',
    answer: 'Open Settings, toggle the notifications you want under "Notifications", and click "Save changes".',
  },
]

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<number | null>(0)

  const term = query.trim().toLowerCase()
  const results = faqs.filter(
    (faq) => !term || faq.question.toLowerCase().includes(term) || faq.answer.toLowerCase().includes(term),
  )

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card title="Frequently asked questions" className="lg:col-span-2">
        <div className="relative mb-4">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search help articles..."
            aria-label="Search help articles"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-9 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
          />
        </div>

        {results.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">No articles match “{query}”.</p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            {results.map((faq) => {
              const index = faqs.indexOf(faq)
              const expanded = open === index
              return (
                <li key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : index)}
                    aria-expanded={expanded}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium hover:bg-slate-50"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`size-4 shrink-0 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded && <p className="px-4 pb-4 text-sm text-slate-600">{faq.answer}</p>}
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      <Card title="Still need help?" description="Our support team usually replies within one business day." className="h-fit">
        <a
          href="mailto:support@example.com"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          <Mail className="size-4" aria-hidden="true" /> Contact support
        </a>
      </Card>
    </div>
  )
}
