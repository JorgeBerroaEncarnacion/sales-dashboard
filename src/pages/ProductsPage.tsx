import Badge from '../components/Badge'
import DataTable, { type Column } from '../components/DataTable'
import { orders } from '../data/orders'
import { LOW_STOCK_THRESHOLD, products } from '../data/products'
import { getProductSummaries, type ProductSummary } from '../data/selectors'
import { useTable } from '../hooks/useTable'
import { formatCurrency } from '../utils/format'

type ProductSortKey = 'name' | 'price' | 'stock' | 'unitsSold' | 'revenue'

const summaries = getProductSummaries(products, orders)
const categories = [...new Set(products.map((p) => p.category))]

const searchFields = (p: ProductSummary) => [p.id, p.name, p.category]
const filterBy = (p: ProductSummary) => p.category
const sortAccessors: Record<ProductSortKey, (p: ProductSummary) => string | number> = {
  name: (p) => p.name,
  price: (p) => p.price,
  stock: (p) => p.stock,
  unitsSold: (p) => p.unitsSold,
  revenue: (p) => p.revenue,
}

function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge tone="rose">Out of stock</Badge>
  if (stock < LOW_STOCK_THRESHOLD) return <Badge tone="amber">Low · {stock}</Badge>
  return <Badge tone="green">In stock · {stock}</Badge>
}

const columns: Column<ProductSummary, ProductSortKey>[] = [
  {
    header: 'Product',
    sortKey: 'name',
    cell: (p) => (
      <>
        <p className="font-medium">{p.name}</p>
        <p className="text-xs text-slate-500">{p.id}</p>
      </>
    ),
  },
  { header: 'Category', cell: (p) => <Badge tone="slate">{p.category}</Badge> },
  { header: 'Price', sortKey: 'price', align: 'right', cell: (p) => formatCurrency(p.price), className: 'tabular-nums' },
  { header: 'Stock', sortKey: 'stock', cell: (p) => <StockBadge stock={p.stock} /> },
  { header: 'Sold', sortKey: 'unitsSold', align: 'right', cell: (p) => p.unitsSold, className: 'tabular-nums' },
  {
    header: 'Revenue',
    sortKey: 'revenue',
    align: 'right',
    cell: (p) => formatCurrency(p.revenue),
    className: 'font-medium tabular-nums',
  },
]

const mobileCard = (p: ProductSummary) => (
  <div className="space-y-2">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="truncate font-medium">{p.name}</p>
        <p className="text-xs text-slate-500">
          {p.category} · {formatCurrency(p.price)}
        </p>
      </div>
      <p className="font-semibold tabular-nums">{formatCurrency(p.revenue)}</p>
    </div>
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{p.unitsSold} sold</span>
      <StockBadge stock={p.stock} />
    </div>
  </div>
)

export default function ProductsPage() {
  const table = useTable({
    items: summaries,
    searchFields,
    sortAccessors,
    filterBy,
    initialSort: { key: 'revenue', direction: 'desc' },
    pageSize: 10,
  })

  const lowStock = products.filter((p) => p.stock > 0 && p.stock < LOW_STOCK_THRESHOLD).length
  const outOfStock = products.filter((p) => p.stock === 0).length

  return (
    <>
      <section aria-label="Inventory summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Products', value: products.length },
          { label: 'Low stock', value: lowStock },
          { label: 'Out of stock', value: outOfStock },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tabular-nums">{item.value}</p>
          </div>
        ))}
      </section>

      <DataTable
        title="Product catalog"
        description="Units sold and revenue exclude refunded orders."
        table={table}
        columns={columns}
        rowKey={(p) => p.id}
        mobileCard={mobileCard}
        searchPlaceholder="Search products..."
        filter={{ label: 'category', allLabel: 'All categories', options: categories }}
      />
    </>
  )
}
