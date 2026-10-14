import type { ReactNode } from 'react'
import type { TableState } from '../hooks/useTable'
import EmptyState from './EmptyState'
import Pagination from './Pagination'
import SortableHeader from './SortableHeader'
import TableToolbar from './TableToolbar'

export interface Column<T, K extends string> {
  header: string
  cell: (item: T) => ReactNode
  sortKey?: K
  align?: 'left' | 'right'
  className?: string
}

interface DataTableProps<T, K extends string> {
  title: string
  description?: string
  table: TableState<T, K>
  columns: Column<T, K>[]
  rowKey: (item: T) => string
  /** Card layout used below the md breakpoint instead of the table. */
  mobileCard: (item: T) => ReactNode
  searchPlaceholder: string
  filter?: { label: string; allLabel: string; options: string[] }
  action?: ReactNode
}

/** Reusable table with search, optional filter, sorting, pagination and a mobile card view. */
export default function DataTable<T, K extends string>({
  title,
  description,
  table,
  columns,
  rowKey,
  mobileCard,
  searchPlaceholder,
  filter,
  action,
}: DataTableProps<T, K>) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, '-')}-title`

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby={headingId}>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id={headingId} className="text-base font-semibold">
              {title}
            </h2>
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
          {action}
        </div>
        <TableToolbar
          query={table.query}
          onQueryChange={table.setQuery}
          searchPlaceholder={searchPlaceholder}
          filter={filter && { ...filter, value: table.filter, onChange: table.setFilter }}
        />
      </div>

      {table.totalResults === 0 ? (
        <EmptyState onReset={table.reset} />
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead className="border-y border-slate-100 bg-slate-50 text-xs text-slate-500 uppercase">
                <tr>
                  {columns.map((column) =>
                    column.sortKey ? (
                      <SortableHeader
                        key={column.header}
                        label={column.header}
                        sortKey={column.sortKey}
                        activeKey={table.sortKey}
                        direction={table.sortDirection}
                        onSort={table.toggleSort}
                        align={column.align}
                      />
                    ) : (
                      <th
                        key={column.header}
                        scope="col"
                        className={`px-4 py-3 font-medium ${column.align === 'right' ? 'text-right' : 'text-left'}`}
                      >
                        {column.header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {table.pageItems.map((item) => (
                  <tr key={rowKey(item)} className="hover:bg-slate-50">
                    {columns.map((column) => (
                      <td
                        key={column.header}
                        className={`px-4 py-3 ${column.align === 'right' ? 'text-right' : ''} ${column.className ?? ''}`}
                      >
                        {column.cell(item)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">
            {table.pageItems.map((item) => (
              <li key={rowKey(item)} className="px-4 py-3">
                {mobileCard(item)}
              </li>
            ))}
          </ul>

          <Pagination
            page={table.page}
            pageCount={table.pageCount}
            pageSize={table.pageSize}
            totalResults={table.totalResults}
            onPageChange={table.setPage}
          />
        </>
      )}
    </section>
  )
}
