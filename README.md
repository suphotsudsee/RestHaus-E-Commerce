# RestHaus E-Commerce

Next.js App Router e-commerce project for mattresses and furniture, built from `prd.md`, `design.md`, and `db.md`.

## Features

- Customer storefront: home, product catalog search/filter, product detail, variants, cart, checkout, and order tracking.
- Admin back-office: dashboard KPIs, product management table, stock view, and order management table.
- API routes for order creation and lookup.
- Prisma schema for MySQL plus Docker Compose for MySQL and Redis.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database Services

```bash
docker compose up -d
copy .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

The current UI uses local seed data so it can run immediately without MySQL. The Prisma schema and seed are ready for wiring into server data access when moving from prototype to production persistence.
