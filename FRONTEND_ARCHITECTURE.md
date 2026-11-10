# Trada Frontend Architecture

**Status:** Draft v0.1 | **Date:** 3 November 2026
**Sources:** Trada Cumulative PRD (Phases 1 and 2), PM's "Trada UI" Design Foundations v1.0 (proposed, not yet approved)
**Scope:** Frontend structure, design system approach and patterns. Not a product spec; product decisions live in the PRD.

---

## 1. Problem and goal (as the frontend sees it)

**Problem:** Nigerian SME owners cannot reliably see profit, cash, stock, debts or staff activity, especially when away from the shop. Staff records are slow, handwritten or incomplete.

**Goal:** Staff capture activity quickly (type, speak, photograph). Owners see trustworthy numbers, what needs attention, and what to do next.

**What this means for the UI:**
- Two audiences with different home screens: staff (fast capture) and owner (status, exceptions, approvals).
- AI output is always a draft until a human confirms it.
- Revenue, cash received and profit are different things; unknown values are shown as unknown, never invented.
- Mobile-first, tablet-friendly, desktop supported.

---

## 2. Decisions

| Area | Decision | Notes |
|---|---|---|
| Framework | React + TypeScript + Vite (SPA) | Matches PM's foundations doc |
| App delivery | Installable PWA, online-first | No offline writes in this phase; clear error/retry states |
| Repo | Monorepo with shared packages | `packages/ui` + `apps/web` |
| Styling | Tailwind CSS | Reads from CSS-variable tokens |
| Primitives | Radix + shadcn-style components, owned in `packages/ui` | Accessibility behaviour from Radix, look from our tokens |
| Data/state | Redux Toolkit + RTK Query | Server data in RTK Query; drafts and UI state kept local |
| Backend | Team-owned custom REST API | Frontend codes against typed contracts; mocked until ready |
| Storefront | **Paused** | Monorepo leaves room for a second app later |
| Accessibility | WCAG 2.2 AA target | From PM's foundations |
| Monorepo tooling | pnpm workspaces only | Add Turborepo later if builds slow down |
| Tailwind | v4 | Theme registered in CSS, which suits CSS-variable tokens |
| Router | React Router | Role-based route guards |
| Forms | React Hook Form + Zod | Zod schemas double as validation and API types |
| Icons | Lucide | |
| Tests | Vitest + Testing Library | Storybook added later |
| PWA | vite-plugin-pwa, shell caching only | Matches online-first |
| Code quality | ESLint + Prettier (default) | Lint rule: `packages/ui` may not import from `apps/web` |
| First feature slice | Owner dashboard | Built against mocks; see section 9 |

---

## 3. The four layers

A layer may only import from layers listed above it.

1. **Tokens:** raw and semantic design values (CSS variables).
2. **Primitives** (`packages/ui`): business-agnostic components: Button, Input, Badge, Dialog, Surface, Text.
3. **Patterns:** reusable Trada interactions that know the product's rules but not one screen's data: AI capture, AI draft review, draft status, approval flow, empty/error/data-freshness feedback.
4. **Features** (`apps/web`): screens and logic tied to business data: inventory, sales, finance, dashboard, onboarding, auth.

**Rule of thumb:** knows nothing about Trada's business → primitive. Knows Trada's rules but not one screen → pattern. Knows one screen's data → feature.

---

## 4. Proposed structure

```
Trada/
├── packages/
│   └── ui/
│       └── src/
│           ├── tokens/          # tokens.css (raw + semantic)
│           ├── primitives/      # Button, Input, Badge, Dialog, Text, Surface
│           ├── layouts/         # AppShell (bottom nav / rail / sidebar)
│           └── patterns/        # ai-capture, draft-review, draft-status,
│                                # approval-flow, data-feedback
└── apps/
    └── web/
        └── src/
            ├── app/             # providers, routes, store setup
            ├── features/        # inventory, sales, finance, dashboard,
            │                    # onboarding, authentication
            ├── lib/             # api (RTK Query + types), formatters, permissions
            └── mocks/           # MSW handlers for every API state
```

**Open question:** Patterns could live in `packages/ui` (shared if a storefront app is added) or in `apps/web` (simpler now). Recommended default: keep them in `packages/ui` only if they have no dependency on app data; otherwise `apps/web`.

---

## 5. Design tokens

**Source of truth:** a single CSS file of variables. Tailwind's theme points at the *semantic* variables, so components use classes such as `bg-surface-card` and never raw hex values.

**Two tiers:**
- **Raw** (e.g. navy-900, teal-700): values. Used only inside the token file.
- **Semantic** (e.g. action-primary, surface-card, text-muted): jobs. Used by every component.

**Starting values** come from the PM's foundations (Deep Navy `#082D4A`, Calm Teal `#0E9F8F`, Accessible Teal `#08756A`, Navy Blue `#1E4B73`, Soft Blue `#E8F4FD`, Cloud White `#F7F9FC`, Slate Text `#344054`; Inter; 4px spacing; 12px card radius; 8px input radius; 16px modal radius).

**Rules:**
- `teal-500` is decoration and icons only. Text and buttons use `teal-700` (the lighter teal is about 3:1 on white; AA needs 4.5:1).
- Colour never carries a state alone; always add an icon and text.
- Money uses NGN formatting and tabular numerals.
- Prefer borders and whitespace to shadows.
- Dark mode is out of scope now. Keep names semantic so it can be added as a separate mapping.
- Raw hex values in components are treated as bugs.

**Tidy-up needed:** a few PM values (for example `--sd-text-primary`) are raw hex with no raw token behind them.

---

## 6. State: four kinds of data

| Kind | Example | Lives in |
|---|---|---|
| Server data | Products, sales, stock | RTK Query cache |
| Draft data | AI-extracted sale awaiting review | Local state until confirmed |
| UI state | Dialog open, selected tab | Component state |
| Session/config | User, role, business, trial and entitlement config | Redux slice |

**AI flow:** Capture → Interpret → Review → Validate → Confirm → Save.
- A draft is never shown as a saved record.
- "Saved" appears only after the backend confirms.
- Optimistic updates are not used for financial records.
- The way the API returns AI results (immediate or polled job) is hidden behind one small layer so screens only ask for "a draft."

---

## 7. API layer

- **Types:** a typed description of each resource (the contract with the backend team).
- **RTK Query endpoints:** one place that defines every call.
- **MSW mocks:** realistic fake responses with the ability to force each state: loading, empty, error, needs-review, pending approval, missing cost price, permission denied.

**Dependency:** request an API spec (OpenAPI or a shared document) from the backend team early. Mocks are only as good as the contract.

---

## 8. Roles and permissions

- The backend enforces permissions. The frontend decides what to show.
- Screens ask `can('action')` rather than checking role names. One config file maps roles to actions.
- Private data (cost prices, margins) is hidden from roles that should not see it.
- Owners and staff get different home screens.

---

## 9. Build order

The first slice is the **owner dashboard**, built against mock data. It depends on data that capture would normally produce, so the mock API must supply realistic sales, stock and debt data, including incomplete data (missing cost prices, not enough history). The PRD requires honest "unknown" states, never invented numbers.

1. Workspace setup, tokens, Text, Surface
2. Button (default, loading, disabled, success, failure), Badge, empty/error states
3. AppShell (bottom nav on mobile, rail on tablet, sidebar on desktop)
4. Permissions helper (`can()`) and owner vs staff home routing
5. Data-confidence patterns: figure with freshness note, "incomplete" state, attention item
6. Mock API (MSW) with forced states, RTK Query endpoints
7. Owner dashboard screen
8. Second slice: product capture with the AI draft review pattern (Input, FormField, Dialog, draft status, approval flow)

No component is built until a screen needs it.

**Layout targets:** 360px, 768px, 1024px (breakpoints from PM: under 768 mobile, 768-1199 tablet, 1200+ desktop).

---

## 10. Open questions

**For the PM**
- Who is the pilot segment (gadget traders, distributors, other)? It determines whether serial/IMEI tracking is in scope.
- Final approval of the palette and tokens.
- Risk tiers and who can approve what.
- Roles and permission matrix.
- Trial length and what ₦12,000 includes (seats, AI usage, storage). The PRD calls these undecided; the PM chat proposed a trial of 3 to 24 hours.
- Is multi-product photo recognition in the first release?
- Which AI languages and accents must be supported?

**For the backend team**
- API spec and authentication method.
- Are AI jobs instant or polled?
- How are drafts, approvals and posted records represented?
- Error format and permission-denied behaviour.

**For us**
- Tailwind version, router, form and test libraries.
- Where patterns live (see section 4).
- When to restart storefront planning.

---

## 11. Acceptance checklist (foundations)

- [ ] All colours come from semantic tokens
- [ ] Text and controls meet contrast requirements
- [ ] Keyboard navigation and visible focus work everywhere
- [ ] Touch targets are at least 44×44px
- [ ] Layouts work at 360, 768 and 1024px
- [ ] Money uses NGN formatting and tabular numerals
- [ ] AI drafts remain separate from saved records
- [ ] Loading, empty, error and permission states exist for each screen
- [ ] No hard-coded subscription prices or trial lengths
