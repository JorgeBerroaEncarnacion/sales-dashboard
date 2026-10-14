# Sales Dashboard

A responsive e-commerce sales dashboard built with React, TypeScript and Tailwind CSS.

**Live demo:** (https://sales-dashboard-peach-theta.vercel.app/)

## Features

Seven pages with client-side routing (React Router):

| Page | What it shows |
|------|---------------|
| **Dashboard** | 4 stat cards (revenue, orders, customers, average order value) with month-over-month trend, and the recent orders table |
| **Orders** | Order count per status and the full orders table |
| **Products** | Inventory summary and product catalog with stock badges, units sold and revenue, filterable by category |
| **Customers** | Customers derived from orders, with order count, total spent and last order date |
| **Analytics** | Daily revenue bar chart with tooltips and a table view, top products and orders by status |
| **Settings** | Profile, store and notification preferences with validation, save and cancel |
| **Help** | Searchable FAQ accordion and a contact card |

Plus a 404 page for unknown routes.

Shared across pages:

- **Responsive sidebar** — fixed on desktop, slide-in drawer with backdrop on mobile that closes after navigating
- **Header** with the current page title, notifications and user/profile section
- **One reusable `DataTable`** used by Orders, Products and Customers: search, filter, column sorting, pagination, empty state, and a card layout on mobile instead of a cramped table
- Accessible markup: semantic landmarks, `aria-current`, `aria-sort`, `aria-pressed`, labelled controls, keyboard-friendly chart tooltips

## Tech stack

- [React 19](https://react.dev) with functional components and hooks
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router](https://reactrouter.com) for client-side routing
- [lucide-react](https://lucide.dev) for icons

No backend: the app uses static sample data from `src/data/`.

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
├── pages/                    # One component per route
│   ├── DashboardPage.tsx
│   ├── OrdersPage.tsx
│   ├── ProductsPage.tsx
│   ├── CustomersPage.tsx
│   ├── AnalyticsPage.tsx
│   ├── SettingsPage.tsx
│   ├── HelpPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   ├── Layout.tsx            # Sidebar + header + <Outlet /> for the active page
│   ├── Sidebar.tsx           # Responsive navigation (desktop + mobile drawer)
│   ├── Header.tsx            # Page title, notifications and profile
│   ├── DataTable.tsx         # Generic table: columns, sorting, pagination, mobile cards
│   ├── TableToolbar.tsx      # Search input and optional filter
│   ├── SortableHeader.tsx    # Sortable column header
│   ├── Pagination.tsx
│   ├── OrdersTable.tsx       # Orders configuration of DataTable
│   ├── RevenueChart.tsx      # Bar chart with tooltips and table view
│   ├── BarList.tsx           # Ranked horizontal bars
│   ├── StatCard.tsx, Card.tsx, Badge.tsx, StatusBadge.tsx,
│   └── Avatar.tsx, Toggle.tsx, EmptyState.tsx
├── hooks/
│   ├── useTable.ts           # Generic search, filter, sort and pagination state
│   └── useDashboardStats.ts  # Derives stat-card values from the orders
├── data/
│   ├── orders.ts             # Static sample orders
│   ├── products.ts           # Static product catalog
│   └── selectors.ts          # Pure functions: customers, product sales, daily revenue
├── routes.ts                 # Route list shared by the sidebar and the header
├── types/index.ts
├── utils/                    # Formatting and status helpers
├── App.tsx                   # Route definitions
└── main.tsx
```

### Design decisions

- **Logic lives in hooks, rendering lives in components.** `useTable` owns all table state and is generic, so the three tables share one implementation and differ only in their column configuration.
- **Data is derived, not duplicated.** Customers, product sales, stats and chart data are computed from the orders, so changing the sample data updates every page.
- **One route list.** `routes.ts` drives both the sidebar links and the header title, so adding a page means touching a single place.
- **Mobile-first table.** Below the `md` breakpoint the table becomes a stacked card list, which is easier to read than horizontal scrolling.

## Deployment

### Vercel

1. Push the repository to GitHub.
2. In Vercel, click **Add New → Project** and import the repository.
3. Vercel detects Vite automatically (build command `npm run build`, output directory `dist`). Click **Deploy**.

`vercel.json` rewrites every path to `index.html`, so refreshing a page like `/orders` works.

### Netlify

1. Push the repository to GitHub.
2. In Netlify, click **Add new site → Import an existing project** and select the repository.
3. Set the build command to `npm run build` and the publish directory to `dist`, then deploy.

`public/_redirects` does the same SPA fallback on Netlify.
