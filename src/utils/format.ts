const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate))

/** Percentage change between two values, rounded to one decimal. */
export const percentChange = (current: number, previous: number) =>
  previous === 0 ? 0 : Math.round(((current - previous) / previous) * 1000) / 10
