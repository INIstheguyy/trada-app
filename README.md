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

Open `http://localhost:5173`. Local development currently connects directly to the production API at `https://api.trada.com.ng/api/v1` because a separate backend development environment is not available.

### API environment

The production API is the default in source and in `apps/web/.env.example`. To point the frontend at a future backend environment, copy the example to `apps/web/.env.local`, change `VITE_API_BASE_URL`, and restart Vite. The value must include the API prefix and should not end with a slash:

```env
VITE_API_BASE_URL=https://api.trada.com.ng/api/v1
```

Use test accounts and non-sensitive records during local development because requests are sent to production. Live accounts currently receive the documented generic `user` role and the provisional frontend permissions recorded in the PRD.
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
