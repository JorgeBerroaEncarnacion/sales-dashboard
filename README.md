# Sales Dashboard

A responsive e-commerce sales dashboard built with React, TypeScript and Tailwind CSS.

**Live demo:** _add your Vercel/Netlify URL here_

## Features

- **Responsive sidebar** — fixed on desktop, slide-in drawer with backdrop on mobile
- **Header** with notifications and user/profile section
- **4 statistic cards** (revenue, orders, customers, average order value) computed from the data, with month-over-month trend
- **Orders table** with:
  - Search across order ID, customer, email and product
  - Status filter (segmented control on desktop, select on mobile)
  - Sorting by customer, date and amount
  - Pagination
  - Empty state with "clear filters"
  - Card layout on mobile instead of a cramped table
- Accessible markup: semantic landmarks, `aria-sort`, `aria-pressed`, labelled controls

## Tech stack

- [React 19](https://react.dev) with functional components and hooks
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons

No backend: the app uses static sample data from `src/data/orders.ts`.

## Getting started

Requirements: Node.js 20+.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build for production into dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
├── components/
│   ├── Sidebar.tsx          # Responsive navigation (desktop + mobile drawer)
│   ├── Header.tsx           # Top bar with notifications and profile
│   ├── StatCard.tsx         # Reusable metric card with trend indicator
│   ├── OrdersTable.tsx      # Table/card list composition
│   ├── TableToolbar.tsx     # Search input and status filter
│   ├── SortableHeader.tsx   # Reusable sortable column header
│   ├── Pagination.tsx       # Page navigation and result count
│   ├── StatusBadge.tsx      # Colored order status pill
│   └── EmptyState.tsx       # Shown when no results match
├── hooks/
│   ├── useOrderFilters.ts   # Search, filter, sort and pagination logic
│   └── useDashboardStats.ts # Derives stat-card values from the orders
├── data/orders.ts           # Static sample data
├── types/index.ts           # Shared TypeScript types
├── utils/format.ts          # Currency, date and percentage helpers
├── App.tsx                  # Page layout
└── main.tsx                 # Entry point
```

### Design decisions

- **Logic lives in hooks, rendering lives in components.** `useOrderFilters` owns all table state, so `OrdersTable` stays a thin presentational layer and the logic can be reused or tested on its own.
- **Stats are derived, not hard-coded.** Changing the sample data updates the cards automatically.
- **Mobile-first table.** Below the `md` breakpoint the table becomes a stacked card list, which is easier to read than horizontal scrolling.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. In Vercel, click **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.

### Netlify

1. Push the repository to GitHub.
2. In Netlify, click **Add new site → Import an existing project** and select the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`, then deploy.
