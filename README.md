# Trada

Trada is an AI-assisted operating and intelligence platform for Nigerian SMEs. This repository starts with the owner Command Centre: a trustworthy, action-first summary of sales, cash, profit, debts, stock, and exceptions.

## Run locally

Prerequisite: Node.js 20+. pnpm 10 is the declared workspace manager, but the root scripts also work through npm on Windows systems where Corepack cannot create global shims.

```bash
corepack enable
pnpm install
pnpm dev
```

If `corepack enable` fails with an `EPERM` error, dependencies are already installed in this workspace and you can start the app with:

```powershell
npm run dev
```

Open `http://localhost:5173`. By default, real authentication and API requests use the backend documented at `http://localhost:3002/api/v1`; Vite proxies `/api` to that address during development.

### Demo mode

Development builds provide an isolated owner demo on the login screen. Click **Use demo account**, or enter:

- Email: `demo@trada.local`
- Password: `demo1234`

The demo uses an in-memory implementation of the documented product and sales routes. Mutations work for route testing, but reset when the development server/application runtime restarts. Demo interception is development-only and does not replace live-backend verification.

### Live API mode

Sign in with a non-demo account to use the proxied backend. To use another API environment, copy `apps/web/.env.example` to `apps/web/.env.local`, set `VITE_API_BASE_URL`, and restart Vite. The value must include the API prefix:

```env
VITE_API_BASE_URL=https://api.example.com/api/v1
```

The current backend contract does not yet provide business membership or production RBAC. Live accounts therefore receive the documented generic `user` role and the provisional frontend permissions recorded in the PRD.

## Commands

- `npm run dev` — start the web app
- `npm run check` — lint, type-check, test, and build
- `npm run format` — format the repository

## Repository layout

- `apps/web` — React SPA, app state, API contracts, mocks, and product features
- `packages/ui` — design tokens, business-agnostic primitives, and the responsive app shell
- `FRONTEND_ARCHITECTURE.md` — agreed frontend architecture and build order
- `Trada_Cumulative_Product_Requirements_Phases_1_and_2.md` — product context

## Current scope

Authentication, products, sales, low-stock alerts and the composed Owner Command Centre are implemented against the received backend contract. Subscription limits, business membership, the production RBAC matrix, customer-ledger payments, trial duration and pilot-industry workflows remain unresolved product/backend decisions.
