# Trada Product Design Re-engineering Plan

**Status:** Implementation in progress — Stages 0–7 complete for current contracts  
**Date:** 13 November 2026  
**Scope:** Existing merchant web application on `develop`; the PM-chat handoff is reference material, not an approved specification.

## 1. Decision rule

The redesign must follow this evidence order:

1. Security, tenant isolation, backend authorization and live API contracts.
2. Established PRD principles and explicitly confirmed product decisions.
3. Current working user journeys and verified frontend behavior.
4. Approved brand assets and tokens.
5. PM-chat handoff content and screenshots.

If a lower source conflicts with a higher source, the higher source wins. Screenshot data, routes, features and brand assets are never implementation authority by themselves.

### Implementation progress

- **Stage 0 complete:** capability status is explicit and covered by tests; route/API/RBAC behavior remains the baseline.
- **Stage 1 complete:** normalized foundation tokens and shared form, feedback, page, empty-state and statistic patterns now live in `@trada/ui` with component-owned styling and accessibility-focused tests.
- **Stage 2 complete:** navigation derives from capability plus permission metadata, unsupported destinations are absent, internal links use client navigation, the mobile quick-sale action uses the real checkout route, and every page is route-split.
- **Stage 3 complete for current contracts:** sign-in, registration and business onboarding now share one responsive, trust-first access system using only supported email/password and business-workspace behavior. Speculative OTP, social sign-in, trial and AI controls remain absent.
- **Stage 4 complete:** the Owner Command Centre now supports today, seven-day and thirty-day backend ranges; prioritizes stock exceptions and available next actions; preserves qualified financial meanings; and exposes honest empty, partial and unavailable states without invented trends or charts.
- **Stage 5 complete:** inventory now exposes contract-backed search, type and active-status filters; keeps stock and product availability distinct; uses shared accessible create/edit fields; and protects owner-only deletion with an explicit two-step confirmation.
- **Brand palette corrected:** the supplied product logo establishes deep blue-navy and calm blue-teal, so global tokens now use logo-derived navy (`#002848`) and teal (`#009890`) references with an accessible darker teal for controls. Semantic success green remains separate.
- **Stage 6 complete:** sales discovery now uses supported receipt, payment, sale-status and date filters; checkout uses shared accessible controls and explicit payment wording; receipt detail preserves financial distinctions; and owner-only cancellation uses a two-step inventory-restoration warning.
- **Stage 7 complete:** business settings now use shared private-workspace identity patterns with explicit loading, retry and save states; storefront publication and team-role controls remain absent; and centralized permission denials explain the unavailable action and current provisional role while preserving backend authority.

## 2. Current product baseline

The application currently supports:

- email/password registration, login, session restoration, refresh and logout;
- authenticated owner business resolution, creation and business settings;
- protected, action-guarded merchant routes;
- product catalog CRUD and low-stock alerts;
- sale checkout, sales history, sale detail and guarded cancellation;
- a composed Owner Command Centre using sales analytics, low-stock and recent-sales endpoints;
- contract validation, loading/error/empty states, partial dashboard resilience and a responsive PWA shell.

The current architecture is a sound behavioral base. The redesign should preserve API contracts, Zod validation, RTK Query cache ownership, route guards, financial qualifications and test coverage.

### Current design and architecture debt

- The UI package exposes only `Button`, `Badge`, `Surface` and `AppShell`; screen code repeatedly rebuilds form, feedback, metric, toolbar and table patterns.
- Most visual rules live in one application stylesheet of roughly 1,900 lines, increasing regression risk and making component ownership unclear.
- Navigation is manually coordinated with string `activeNav` values instead of route-aware metadata.
- The shell uses a temporary text `T` mark; no approved production logo asset is present.
- The generic backend role `user` is provisionally over-permitted in the client until membership/RBAC contracts arrive. Backend authorization remains authoritative.
- The bundle has crossed Vite's 500 kB warning threshold and routes are not lazy-loaded.
- Dashboard information is trustworthy but visually flat; it has no user-controlled period despite the analytics endpoint accepting a date range.
- Some page patterns are optimized independently rather than through a shared density, spacing, form and responsive-table system.

## 3. Handoff disposition

| Handoff proposal                                                | Decision                               | Product-safe treatment                                                                                                             |
| --------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Deep navigation surface, pale content canvas and spacious cards | **Adapt**                              | Keep the hierarchy, but retain the currently approved Trada navy/green tokens until brand supplies a replacement palette.          |
| Responsive sidebar, tablet rail and mobile bottom navigation    | **Retain**                             | Improve the existing shell instead of replacing route behavior.                                                                    |
| Owner-oriented summary and attention hierarchy                  | **Retain**                             | Prioritize status, trustworthy figures, exceptions and next actions before charts.                                                 |
| Merchant KPI/chart collage                                      | **Adapt**                              | Show only values supported by live contracts; never invent trends, channels, losses, customers or storefront results.              |
| Marketing-heavy authentication artwork                          | **Adapt**                              | Use restrained product copy and lightweight brand treatment; do not ship generated people, unapproved logos or feature claims.     |
| Phone/OTP, recovery and Google sign-in                          | **Defer**                              | No routes or controls until authentication contracts exist. Current email/password flow stays canonical.                           |
| AI voice/photo/text actions                                     | **Defer**                              | Keep the manual workflows strong. Add AI only with draft, confidence, correction and confirmation contracts.                       |
| Customers, debtors and verified receivables                     | **Defer**                              | An unpaid sale balance must not be presented as a customer debtor ledger.                                                          |
| Storefront and online-store performance                         | **Defer**                              | No publication or traffic UI until eligibility, visibility and commerce contracts exist.                                           |
| BNPL                                                            | **Reject from current merchant build** | Partner availability and API/status contracts are unconfirmed; do not imply a live product.                                        |
| Platform subscriptions, trial timers and pricing UI             | **Defer**                              | Commercial policy and backend lifecycle are unresolved.                                                                            |
| Ten-page internal admin portal                                  | **Separate product track**             | It is a Trada operations product, not an extension of the merchant shell. Require its own users, RBAC, contracts and PRD sign-off. |
| Generated dashboard numbers, merchants and performance records  | **Reject**                             | Production surfaces use backend results or explicit empty/unavailable states only.                                                 |
| Theft detection claims                                          | **Reject**                             | Use neutral stock variance or review language when supporting data and workflows exist.                                            |

## 4. Target merchant information architecture

Preserve existing URLs during the design refactor to avoid breaking deployed links and tests.

| Area                | Routes                                        | Navigation label  | Purpose                                                                                            |
| ------------------- | --------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| Access              | `/login`, `/register`                         | Outside app shell | Account access using the supported email/password contract.                                        |
| Business activation | `/onboarding/business`                        | Outside app shell | Minimum required business setup, followed by the first useful action.                              |
| Overview            | `/`                                           | Overview          | Owner status, qualified metrics, low-stock attention and recent sales.                             |
| Sales               | `/sales`, `/sales/new`, `/sales/:id`          | Sales             | Find, record and review sales without blurring revenue, receipts and balances.                     |
| Inventory           | `/products`, `/products/new`, `/products/:id` | Inventory         | Manage the product catalog and current stock information. Route names remain unchanged internally. |
| Settings            | `/settings/business`                          | Settings          | Maintain business identity and show publication as unavailable until authorized.                   |

Unsupported destinations must not appear as enabled navigation. Future destinations can be introduced only when a contract and permission are available; a visual mockup is insufficient.

## 5. Experience principles

1. **Truth before visual completeness.** Use qualified, unavailable and empty states instead of illustrative production data.
2. **Action before analytics.** Each summary or exception should lead to an available workflow.
3. **Owner and operator context.** Owner summaries can expose permitted financial insight; staff-oriented actions must remain permission-scoped when final roles arrive.
4. **Progressive disclosure.** Keep first setup and routine capture short; move optional detail behind clear secondary sections.
5. **Mobile operational speed.** Core actions remain reachable with one hand and readable without shrinking desktop tables.
6. **Calm financial interface.** Navy establishes structure, brand green signals primary action, and semantic colors retain specific meanings.
7. **Accessible by construction.** Semantic regions, labelled controls, visible focus, keyboard operation, 44 px touch targets and non-color state cues are acceptance requirements.
8. **Nigeria-first formatting.** Use NGN, `en-NG` dates/numbers and merchant language that does not assume accounting expertise.

## 6. Design-system target

Evolve `@trada/ui` before reskinning pages.

### Foundations

- Normalize color roles, type scale, spacing scale, radii, shadows, borders, control heights, content widths and responsive breakpoints.
- Keep current navy/green brand values as the baseline pending an approved vector logo and exact brand specification.
- Add motion tokens with reduced-motion behavior and explicit focus-ring tokens.

### Shared primitives and patterns

- Form controls: `Field`, `Input`, `Select`, `Textarea`, validation/help text and password affordance.
- Feedback: inline alert, empty state, error state, loading/skeleton and permission-denied state.
- Structure: page header, section header, toolbar, stat card, detail row and action bar.
- Data: responsive record list/table, status badge and pagination.
- Navigation: route-derived shell items with permission and availability metadata.

Components should own their styles. `apps/web/src/styles.css` should become an application composition layer rather than the source of every component rule.

## 7. End-to-end implementation process

### Stage 0 — Baseline and guardrails

- Freeze the route/API/RBAC inventory in tests.
- Record reference screenshots of every current route at 390, 820 and 1440 px when browser QA is available.
- Add a capability registry distinguishing `available`, `contract-blocked` and `product-unapproved` domains.
- Confirm that redesign work does not change request payloads or permission meaning.

**Exit gate:** existing test suite and production build pass; review baseline is documented.

### Stage 1 — Foundations and shared components

- Refactor tokens without changing brand semantics.
- Add shared form, feedback, page, metric and responsive-data components.
- Migrate styles out of the monolithic file by component ownership.
- Add focused component-state and accessibility tests.

**Exit gate:** primitives cover default, hover, focus, disabled, loading, error and empty states; no page behavior changes.

### Stage 2 — Shell and navigation

- Re-engineer desktop sidebar, tablet rail and mobile bottom navigation from one route metadata source.
- Label `/products` as **Inventory** while preserving the URL and API domain.
- Make business/user context and sign-out accessible at all breakpoints.
- Hide destinations that are not supported by contracts.
- Add route-level lazy loading to reduce initial bundle cost.

**Exit gate:** keyboard and responsive navigation pass at 390, 820 and 1440 px; protected-route and permission tests remain green.

### Stage 3 — Authentication and business onboarding

- Redesign login/register around the current email/password contract.
- Reuse a shared access layout and form controls; keep claims limited to implemented capabilities.
- Simplify business onboarding, clarify required fields and preserve duplicate-business recovery and intended-route continuation.
- Do not add OTP, recovery, social sign-in, trial or AI first-action controls without contracts.

**Exit gate:** registration → login → missing-business → create-business → intended route works with loading, backend error and reload states.

### Stage 4 — Owner Command Centre

- Add today/week/month date selection backed by the existing analytics date parameters.
- Reorder content to status/attention → trusted figures → next actions → recent activity.
- Keep cash received unavailable, gross profit qualified and unpaid balances explicitly distinct from a debtor ledger until contracts improve.
- Improve empty-first-day, partial-data and retry presentation without fake history or charts.

**Exit gate:** every displayed number is traceable to an endpoint and labelled with its limitation/as-of context.

### Stage 5 — Inventory workflows

- Redesign catalog list, low-stock attention, product create/edit and destructive-action hierarchy.
- Use responsive table-to-card behavior and persistent primary actions.
- Preserve SKU conflicts, pagination, loading, empty, malformed-response and permission states.

**Exit gate:** product create → list/search → edit → low-stock review → authorized delete is complete across breakpoints.

### Stage 6 — Sales workflows

- Redesign sales list/filter, checkout, receipt detail and cancellation around fast merchant operation.
- Keep booked revenue, amount received and balance due visibly separate.
- Make cart editing, customer optionality, payment status and confirmation easy to audit before submit.

**Exit gate:** product selection → totals → payment → backend confirmation → sale detail → guarded cancellation passes contract and interaction tests.

### Stage 7 — Business settings and permission states

- Align settings with shared form patterns and distinguish private business status from future storefront publication.
- Centralize permission-denied and generic-role messaging.
- Replace provisional client permissions only after backend membership/RBAC contracts arrive.

**Exit gate:** no UI implies publication or role authority the backend has not confirmed.

### Stage 8 — Quality, release and measurement

- Run lint, type-check, unit/component tests and production build after each vertical slice.
- Manually verify 390, 820 and 1440 px layouts, keyboard order, focus visibility, zoom and reduced motion.
- Verify no sensitive data is logged and no unsupported feature claim is visible.
- Smoke-test production registration, login, onboarding, refresh, inventory, sale and logout with a dedicated test account once DNS/CORS are confirmed.
- Track task completion, time-to-first-product, time-to-first-sale, form failure and retry signals only after an approved analytics/privacy plan.

**Exit gate:** release checklist passes, PRD session log is updated and any contract blocker is recorded rather than designed around.

## 8. Product decisions required before later tracks

- Approved production logo/vector and confirmation that current navy/green colors remain authoritative.
- Final owner/manager/cashier/inventory/staff permission matrix and membership API.
- Customer/debtor lifecycle and follow-up-payment model.
- Inventory movement, adjustment, valuation and audit model.
- AI draft/review/confidence/confirmation contracts.
- Storefront publication and order boundary.
- Subscription/trial lifecycle.
- BNPL partner, eligibility and status contract.
- Separate internal-admin product scope, RBAC and APIs.

## 9. Definition of redesign complete

The design refactor is complete when all currently supported merchant journeys use the shared system; behavior and financial truth are preserved; unsupported domains are absent or explicitly unavailable; all route states are responsive and accessible; automated checks pass; production smoke tests pass; and the PRD progress ledger records the delivered scope and remaining contract blocks.
