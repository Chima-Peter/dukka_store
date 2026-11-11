# Dukka Store

Next.js customer storefront for the [Dukka](https://github.com/mobi/Dukka) commerce platform: browse catalog by market, search, cart/checkout (Paystack), orders, profile, and favorites.

Talks to the Dukka API under `/api/v1/dukka`. Default local API: `http://localhost:8000`.

## Prerequisites

- Node.js 20+ (npm)
- A running [Dukka API](../Dukka) (`CORS_ORIGINS` must include this app’s origin, e.g. `http://localhost:3000`)

## Setup

```bash
npm install
cp .env.example .env
```

### Environment

| Variable | Notes |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Dukka API base URL including `/api/v1/dukka` (default `http://localhost:8000/api/v1/dukka`) |

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production:

```bash
npm run build
npm start
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Features

### Auth & session

- **Register / login / logout** — customer auth against `/authentication/customer/*`.
- **JWT cookies** — `access_token` and `refresh_token` stored as cookies; Authorization bearer on API calls.
- **Silent refresh** — on `401`, RTK Query base query retries after `/authentication/customer/refresh` using `x-refresh-token`; clears tokens on failure.
- **Route guards** — `requireCustomerAuth` protects profile pages; `redirectIfAuthenticated` keeps logged-in users off login/register.

### Market & location

- **IP market search** — bootstrap calls `/markets/search` when no market is stored; persists `active_market_id` in localStorage.
- **Active market** — authenticated customers can set market via `/customer/active-market`; catalog and cart are market-scoped.
- **Service states** — delivery coverage loaded per market (`/service/states`) for checkout/location UX.
- **Client location** — layout may hint country via public IP geolocation fallbacks (ipwho / ip-api).

### Catalog & search

- **Home** — hero, category strip, and product sections for the active market.
- **Categories** — market-scoped category browse with filters and desktop/mobile layouts.
- **Product detail** — variant-aware PDP (`/products/:id?market_id=`), quantity picker, add-to-cart, shipping/warranty/return info panels.
- **Search** — keyword results at `/search/[keyword]` with empty-state and suggestions UI.
- **Pagination** — cursor/`limit` product listing; shared pagination component.

### Cart

- **Guest + customer carts** — guest cart id in localStorage (`guest_cart_id`); signed-in users use `/cart`.
- **Item ops** — add, update quantity, and delete for both guest and customer endpoints.
- **Optimistic UI** — Redux cart slice updates immediately, syncs from server cart views, rolls back on failure.
- **Bootstrap** — `MarketBootstrap` hydrates auth user, market, and cart into Redux on load.

### Checkout & payments

- **Addresses** — create shipping and billing addresses (`/address/shipping`, `/address/billing`).
- **Precheckout** — loads checkout preview (`/checkout/precheckout`); checkout session helpers keep funnel state.
- **Checkout** — `POST /checkout` with `X-Idempotency-Key` (UUID); customer/delivery forms on the checkout page.
- **Payment methods** — lists methods from `/payments/methods`; Paystack card flow on `/cart/checkout/payment`.
- **Payment middleware** — soft-guards payment entry (must come from checkout or Paystack); always allows `/cart/checkout/payment/success`.

### Orders

- **Order history** — paginated list under profile (`/orders`).
- **Order detail** — line items, delivery, fees, points discount when present; cancel via `POST /orders/:id/cancel`.
- **Responsive** — separate desktop and mobile order templates.

### Profile

- **Account** — load `/customer/me`; update display name (`PATCH /customer`).
- **Favorites** — profile favorites screens (UI ready; API wiring TBD).
- **Messages** — inbox-style messages UI under profile (UI ready; list currently empty pending notifications API).
- **Layouts** — dedicated desktop and mobile profile shells with bottom nav on small screens.

### Reviews

- **List** — reviews by `market_variant_id` with cursor pagination.
- **Write** — authenticated create (`title`, `review`, `rating`) from the product review dropdown.

## Stack

Next.js 15 · React 19 · Redux Toolkit Query · Tailwind CSS · Zod / React Hook Form · Framer Motion · Paystack (via Dukka API)
