# Trada — Cumulative Product Requirements & Product Analysis

**Coverage:** Phase One and Phase Two, with explicitly separated future vision  
**Document type:** Product requirements context and business/product analysis — **not a technical requirements specification**  
**Version:** 1.1 | **Prepared:** 3 November 2026 | **Implementation status updated:** 20 November 2026
**Intended use:** Source context for a separate technical requirements, design system, UX, and engineering planning exercise.

> **Important:** This compilation consolidates the decisions, product directions, concepts and suggestions developed in the Trada conversations. A feature being discussed does not mean it has been approved, built, or committed to Phase One. The Phase One/Phase Two split below is a **recommended consolidation** of our evolving scope, not a formally signed-off release contract. This distinction matters because previous conversations used terms such as MVP, V2, “next,” and “later” at different times.

## 0. How to interpret this document

| Label                     | Meaning                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Established direction** | A product choice or strategic direction expressly adopted in discussion. Does not imply implementation. |
| **Proposed Phase One**    | Strong launch/MVP candidate discussed repeatedly; still requires final scope approval.                  |
| **Proposed Phase Two**    | Valuable expansion after core usage and data reliability are proven.                                    |
| **Future / deferred**     | Explicitly not part of the near-term product, or a longer-term opportunity.                             |
| **Not yet defined**       | The conversation has not settled the exact policy, limits, rules or behavior.                           |
| **Superseded**            | An earlier assumption was replaced by a newer direction.                                                |

### Key facts and corrections

- **Product name:** Trada. Occasional conversational references to “Sabidex” do not establish a separate product name.
- **Proposed subscription price:** **₦12,000 per month**. Earlier **₦10,000** references are **superseded**. The currency is Nigerian naira, not US dollars.
- **Primary paying customer:** Business owner or other decision-maker. Staff are critical users, but the owner must receive visible business value.
- **Strategic promise:** **Record → Understand → Control → Grow.** Voice and image AI make capture easier; intelligence, controls and commerce make the subscription valuable.
- **Storefront:** A unique shareable storefront for eligible businesses is part of the current product direction.
- **Marketplace:** A Jiji-like multi-vendor marketplace with vendor subscriptions/paid promotions is a **deferred future business**, not a Phase One or Phase Two commitment.
- **Architecture scope principle:** Accommodate many business models without delivering every industry-specific workflow at launch.
- **Risk-based confirmation:** Adopted as a product principle. Exact levels, thresholds, approvers and automation rules remain to be ratified.
- **No trial policy, staff seat limit, payment provider, AI provider, or precise plan entitlements have been finally established.**

---

# PART A — PRODUCT STRATEGY AND MARKET

## 1. Product definition

**Trada** is a proposed AI-assisted business operating and intelligence platform for Nigerian SMEs. It helps businesses capture day-to-day activities, manage stock, sales, expenses and customer balances, understand performance, supervise operations, and market their products or services through a shareable online storefront.

The product serves two connected jobs:

1. **Make recording work easier for the person doing the work.** An attendant, owner or manager can enter information manually, speak a transaction, photograph a product, or photograph handwritten sales records and other business documents. Extracted data is reviewed and confirmed as appropriate.
2. **Make the business understandable and manageable for the person responsible for results.** The owner can monitor performance remotely, see profit and cash indicators, identify exceptions, make purchasing and pricing decisions, follow up outstanding money, and take action without relying exclusively on staff explanations.

A third job is emerging as a major commercial differentiator: **help merchants attract and convert customers** through a storefront and practical marketing tools.

### 1.1 Product vision

Enable SME owners to understand and control their businesses even when they are not physically present, using records that are simple for staff to create and useful for owners to act upon.

### 1.2 Mission and outcomes

- Replace or complement fragmented notebooks, informal messaging and disconnected tools with coherent business records.
- Make routine capture practical for busy, nontechnical operators.
- Convert recorded activity into credible sales, profit, cash, debt and inventory intelligence.
- Highlight matters requiring attention, not merely charts.
- Support accountability and approvals without treating every discrepancy as misconduct.
- Help businesses become discoverable and promote products without maintaining a second catalog.

### 1.3 Core value proposition

**“Even when you are away from your business, Trada helps you know what is selling, what you are making, where your money and stock are, what needs your attention, and how to reach more customers.”**

This is a positioning statement, not a guarantee of perfect real-time visibility, fraud detection, or sales growth. Results depend on complete, accurate and timely business records.

## 2. Problems, buyers and willingness to pay

| Business owner pain                   | Desired outcome                               | Trada response                                        | Commercial importance    |
| ------------------------------------- | --------------------------------------------- | ----------------------------------------------------- | ------------------------ |
| Owner absent from shop                | Know what happened without calling staff      | Owner Command Centre and daily briefing               | Very high                |
| Revenue mistaken for profit           | Know gross profit, costs and margins          | Product and transaction profitability                 | Very high                |
| Stock/cash differences                | Detect and investigate exceptions             | Stock movement, cash checks, audit history, approvals | Very high                |
| Credit sales and late collections     | Know who owes what and when                   | Debtor ledger, aging and follow-up                    | Very high                |
| Working capital locked in stock       | Know fast movers, slow movers and stock value | Inventory intelligence                                | Very high                |
| Staff decisions outside owner control | Review discounts, reversals and adjustments   | Permissions and risk-based approvals                  | High                     |
| Slow handwritten bookkeeping          | Reduce re-entry and delayed reporting         | Voice, image and manual capture                       | High adoption value      |
| Low customer reach                    | Give products a shareable online presence     | Storefront, links, promotional media                  | High growth appeal       |
| Too many numbers, little direction    | Know what to do next                          | AI briefings and Owner Action Centre                  | High retention potential |
| Unclear supplier economics            | Buy and price more intelligently              | Supplier comparison and pricing advice                | Proposed Phase Two       |

**Pricing hypothesis:** ₦12,000 monthly (₦144,000 annually) could be attractive for businesses with staff, meaningful stock value, credit exposure and recurring transactions. This has **not** been validated by measured willingness to pay. The owner needs demonstrable saved time, recovered money, avoided losses, better decisions, or additional profitable sales.

## 3. Target market and business diversity

### 3.1 Geographic focus

Nigeria is the initial market. Examples discussed include **Computer Village** and **Alaba** in Lagos and comparable commercial markets in **Abuja, Port Harcourt and Kano**. These are examples of prospective outreach areas, not confirmed launch territories or distribution commitments.

### 3.2 Business sectors explicitly raised

| Sector / examples                                      | Important business behavior                                                         | Implication for product capability                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Gadget and electronics shops; laptop and phone traders | High-value units, fluctuating cost/price, possible serial or IMEI tracking, returns | Unit-level profitability, precise stock, optional serialized-item concepts |
| Retail stores and supermarkets                         | High-frequency product sales, many SKUs, several attendants                         | Fast sales capture, catalog search, stock monitoring                       |
| Frozen foods and egg retail                            | Quantity by weight/crate, spoilage or breakage                                      | Units, loss adjustments, stock and margin visibility                       |
| Wholesalers and distributors                           | Bulk transactions, supplier purchases, credit customers                             | Receivables, supplier obligations, inventory and pricing                   |
| Restaurants and food businesses                        | Menu items made from ingredients                                                    | Recipe/ingredient consumption and menu profitability concepts              |
| Online-driven sellers                                  | Products promoted online, enquiries, order requests                                 | Storefront, share links, order status and source attribution               |
| Car dealerships                                        | Individually valuable vehicles, acquisition and associated costs                    | Asset/unit identity, costs, days in stock, per-unit margin                 |
| Auto spare-parts dealers                               | Wide catalogs and compatibility complexity                                          | Search, variants, stock and margins                                        |
| Poultry, fish farming/aquaculture, farming             | Inputs, batches/cycles, production outputs and losses                               | Production/input models and industry-specific KPIs                         |
| Salons and service businesses                          | Appointments/services, staff delivery and consumables                               | Service catalog, staff attribution, optional booking later                 |
| Construction/project operators                         | Project-specific costs and receipts                                                 | Project allocation and profitability concepts                              |
| Manufacturing/input-based businesses                   | Inputs converted to finished outputs                                                | Bill of materials, production and cost concepts                            |

**Important distinction:** Inclusion in the strategic business-model map does **not** mean the industry has a complete approved Phase One workflow. The initial pilot segment remains **not yet defined**. An inventory-heavy merchant with staff—especially gadgets/electronics or distribution—was proposed as an attractive starting point.

### 3.3 Business model families

To avoid designing Trada only for a supermarket, the product should conceptually account for:

- **Stocked resale:** Buy products, hold inventory, resell.
- **Serialized/high-value inventory:** Individually identifiable items, such as gadgets and vehicles.
- **Perishable/batch inventory:** Expiry, spoilage, damage and unit conversion.
- **Ingredient/input transformation:** Restaurant recipes, production or assembly.
- **Agricultural/biological production:** Production cycles, inputs, outputs and losses.
- **Services:** Services performed rather than physical goods transferred.
- **Projects/jobs:** Revenue and costs tracked against a project.
- **Online/order-led selling:** Enquiries, orders, fulfillment and payments across channels.

A common product foundation should allow future capability expansion; specialized operational screens may be phased.

## 4. User groups and their jobs

| Persona                         | Primary objective                            | Core product value                                       | Scope caveat                                        |
| ------------------------------- | -------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------- |
| Business owner / decision-maker | Know, control and grow business              | Dashboard, profit, cash, approvals, insights, storefront | Primary buyer                                       |
| Manager / supervisor            | Run daily operations and supervise staff     | Operational overview, exception handling, daily close    | Exact rights not defined                            |
| Cashier / sales attendant       | Record transactions quickly and accurately   | Fast sales, payments, AI capture                         | Exact permissions not defined                       |
| Stock or inventory operator     | Maintain catalog and stock                   | Product setup, receipts, adjustments, counts             | Exact permissions not defined                       |
| Finance/bookkeeping operator    | Review payments, expenses, debts and reports | Finance records, reconciliation, exports                 | Exact permissions not defined                       |
| Trada field sales agent         | Demonstrate value and assist sign-up         | Five-minute demo and secure owner activation             | Agent console policy not defined                    |
| Storefront shopper              | Discover goods and contact merchant          | Public catalog, enquiries and order requests             | Buyer account not required by established direction |
| Trada platform support/admin    | Support merchants and platform operations    | Support functions                                        | Scope and access policy not defined                 |

**Role principle:** Owners and staff should not see identical home experiences. Staff are oriented toward capture and execution; owners toward intelligence, exceptions, approvals and action. Precise role/permission matrices are **not yet defined**.

---

# PART B — PRODUCT REQUIREMENTS: PHASE ONE

**Phase One interpretation:** The smallest credible end-to-end product that can demonstrate business capture, reliable core records, meaningful owner value and an immediately shareable merchant storefront. Items below are **proposed Phase One scope**, except where the underlying direction is explicitly established. Final sign-off is still needed.

## 5. Account, business and initial setup

### 5.1 Business registration and activation

**Purpose:** Allow an owner to establish a business presence and begin recording activity.

**Capabilities discussed:**

- Create an owner account and business workspace.
- Record business name, business type/category and owner contact details.
- Establish the owner's access to the business.
- Support secure invitation/activation for an owner onboarded by a Trada field agent.
- Capture basic business information needed for reporting and storefront identity.
- Allow setup to be completed progressively, without forcing extensive configuration before the first useful action.

**Outputs:** Business workspace, owner access and an initial configured context.

**Not yet defined:** Identity verification method, password/OTP policy, legal identity fields, business ownership transfer, duplicate-business rules, invitation expiry, exact mandatory fields, multi-business ownership, trial start point.

### 5.2 Business configuration

**Purpose:** Make the experience relevant to the merchant's operating model.

**Capabilities discussed:** Business category selection; business identity; contact/location; basic brand assets; working currency; industry-relevant product types; owner/staff distinction; storefront configuration.

**Not yet defined:** Exact business taxonomy, settings hierarchy, defaults, branch rules, sector-specific onboarding questions, publication eligibility and regulatory disclosures.

### 5.3 Staff and access

**Purpose:** Give employees the ability to operate without giving every employee unrestricted control.

**Capabilities discussed:** Staff membership, role-based access, visibility into who performed transactions, owner-controlled permissions and approval of sensitive actions.

**Not yet defined:** Exact roles, permission matrix, staff limits, invitations, multi-branch assignment, self-approval and account suspension rules.

## 6. Product/service catalog and inventory

### 6.1 Catalog setup

**Purpose:** Give the business a reusable record of what it sells.

**Capabilities discussed:**

- Add products or services manually, by voice, or with product photography.
- Record product name/description, category, selling price, purchase/cost price where relevant, quantity, unit and image.
- Support products suitable for physical sales and storefront publication.
- Permit product updates and controlled price changes.
- Distinguish a private catalog item from a public storefront listing.
- Accommodate categories, units and industry-relevant characteristics without forcing every field on every merchant.

**Important caveat:** Product photo recognition should **suggest** identity/details. It cannot be treated as proof of the correct product, cost, stock or selling price. The user must verify critical fields.

**Not yet defined:** Product code/SKU policy, duplicate handling, variants, unit conversions, serialized item workflow, image count, barcode support, cost confidentiality, bulk import and catalog limits.

### 6.2 Stock and movements

**Purpose:** Know how much stock is recorded, what changed and why.

**Capabilities discussed:** Opening stock, stock increases through purchases/receipts, decreases through sales, controlled adjustments, current balance, low-stock indications, movement history and estimated stock value where cost data is available.

**Requirements that matter to owners:** Distinguish available stock from unknown/unverified stock; record responsible staff; surface unusual adjustments; prevent misleading profit/stock calculations from missing information.

**Not yet defined:** Negative stock policy, reservation for online orders, returns, transfers, stock count frequency, valuation method, spoilage/expiry tracking, per-unit serial tracking and branch-level allocation.

## 7. Sales, payments, customers and debts

### 7.1 Sales recording

**Purpose:** Capture a sale once and make it useful across operational and owner reporting.

**Capabilities discussed:**

- Record one or multiple products/services, quantities and selling prices.
- Accept manual, text/voice-assisted or image-derived draft entries.
- Associate the sale with staff and optionally a customer.
- Record the payment situation, including cash, transfer and credit/unpaid scenarios.
- Display transaction details, totals and subsequent record impact.
- Support review and confirmation appropriate to transaction risk.
- Preserve a traceable transaction history; sensitive corrections require controls.

**Outputs:** Recorded sale, product/stock impact where relevant, customer debt if unpaid, payment status and updated reporting.

**Not yet defined:** Discount limits, taxes, receipts/invoices, deposits, partial payments, split tender, returns, refunds, reversals, cancellation, transfer verification, credit limit rules and offline sale posting.

### 7.2 Customer records and receivables

**Purpose:** Track money owed and support follow-up.

**Capabilities discussed:** Customer identity/contact where supplied, customer purchase history, outstanding balances, overdue items, credit sales and debt follow-up priorities.

**Not yet defined:** Customer identity requirements, due-date defaults, credit limits, reminder consent, collections workflow, aging buckets and write-offs.

### 7.3 Payments and cash visibility

**Purpose:** Let owners distinguish sales booked from money actually received.

**Capabilities discussed:** Payments received, payment method, cash/bank movement indicators, outstanding amounts, cash position and payment verification concerns.

**Critical product rule:** Sales revenue, money collected, profit and cash balance are different concepts. The owner experience must not blur them.

**Not yet defined:** Bank reconciliation integration, verified transfer evidence, opening balances, cash drawer closing, payment-provider selection, bank account handling and settlement treatment.

## 8. Expenses, purchases and supplier obligations

**Purpose:** Track what the business spends and what it owes.

**Capabilities discussed:** Record business expenses; capture receipts/invoices with image AI; categorize spending; show expense totals and trends; capture purchase costs and supplier-related obligations; relate purchase costs to product profitability.

**Outputs:** Expense history, spending summaries, cost information and relevant cash/payable indicators.

**Not yet defined:** Full expense taxonomy, recurring expenses, supplier payment workflow, approval limits, tax treatment, purchase returns, accruals, landed costs, accounting basis and supplier master data depth.

## 9. Owner Command Centre

**Purpose:** Give the decision-maker a quick, trustworthy understanding of the business and a path from insight to action.

### 9.1 Owner home — core questions

1. **How are we performing?** Sales today/period, trends, transaction volume and gross profit where calculable.
2. **Where is my money?** Payments collected, recorded cash/bank position, customer debts and known obligations.
3. **What is selling?** Bestsellers by units, revenue and gross profit; product margin and stock remaining.
4. **What needs attention?** Low stock, overdue balances, missing data, discounts/adjustments requiring review and possible discrepancies.
5. **What should I do next?** A prioritized briefing, recommendations and action links.

### 9.2 Core proposed owner features

- Daily/weekly/monthly performance summary and date comparisons.
- Sales by product, employee and relevant business location (if configured).
- Product ranking by quantity, revenue, gross profit and margin.
- Gross profit with explicit qualification when cost prices are missing.
- Expense totals and trends.
- Customer receivables and overdue balances.
- Stock quantities, low-stock alerts and estimated stock value.
- Staff activity and exception/approval queue.
- Daily AI business briefing grounded in recorded data.
- “Ask Sabi” questions about the business using trustworthy figures.
- Drill-down from summary or alert to underlying activity.
- Reporting completeness/data-quality cues; no fabricated historic trends for new businesses.

### 9.3 Core design and behavior principles established in discussion

- **Owner-first, not chart-first.** The first screen should emphasize business status, a concise briefing, risks and actions.
- **Different from staff experience.** Staff should see fast operational workflows, not a cluttered owner analytics home.
- **Mobile-first owner use; tablet-friendly deeper views.** Owners may check performance while away.
- **AI explains verified numbers.** It should not invent calculations or infer missing financial records.
- **Actionable exceptions.** A warning should lead to reviewing evidence, assigning follow-up or approving/rejecting where permitted.
- **Honest data confidence.** If a cost is unknown or a day is incomplete, communicate the limitation.

### 9.4 Owner insight examples, not guaranteed launch behavior

- “Sales rose but gross margin fell because recorded costs increased.”
- “A popular product is running low; check whether to reorder.”
- “Two customer invoices are overdue.”
- “One high-value stock adjustment requires approval.”

These require sufficient and accurate underlying records. Example dashboard figures used previously are **illustrative only**.

## 10. Risk-based confirmation, control and accountability

**Established principle:** Use **risk-based confirmation** rather than requiring the same friction for every action.

**Product requirements:**

- Distinguish ordinary, low-risk data entry from sensitive or consequential changes.
- Let users review AI-generated drafts before committing critical records.
- Route sensitive actions to an appropriately authorized person where approval is required.
- Provide a visible state for pending, approved, rejected or blocked actions.
- Preserve who initiated, reviewed and approved consequential changes.
- Avoid treating an anomaly as proof of fraud.

**Illustrative risk categories discussed:** routine entry; explicit review; authorized approval; blocked/unresolved actions. A four-level L1–L4 scheme was proposed in prior design work, but **exact tier names, thresholds and operation mapping are not yet finally defined**.

**Candidate controlled events:** Unusual discounts, stock adjustments, reversals/voids, changes affecting financial records, questionable payment claims and high-impact AI extractions. Their exact classification is **not yet defined**.

## 11. AI capture and assistance

### 11.1 Inputs

| Input                          | User benefit                       | Expected product behavior                     | Scope status                              |
| ------------------------------ | ---------------------------------- | --------------------------------------------- | ----------------------------------------- |
| Manual/text                    | Reliable fallback and direct entry | Enter or correct data explicitly              | Proposed Phase One                        |
| Voice                          | Record without typing long forms   | Interpret spoken intent and prepare a draft   | Established direction; proposed Phase One |
| Handwritten sales book photo   | Digitize existing notebooks        | Extract entries and request review/correction | Established direction; proposed Phase One |
| Receipt/invoice photo          | Reduce expense/purchase entry      | Extract candidate details and retain evidence | Established direction; proposed Phase One |
| Product photograph             | Speed catalog setup                | Suggest product details; require confirmation | Established direction; proposed Phase One |
| Multiple products in one photo | Batch cataloging                   | Identify and separate candidates              | Experimental/proposed; not confirmed MVP  |
| AI-written marketing text      | Save promotional effort            | Generate captions for merchant review         | Established direction; proposed Phase One |

### 11.2 Product safety and trust

- AI interpretation is a **draft**, not an authoritative financial record.
- Display uncertain fields and allow corrections.
- Require confirmation or approval based on business risk and permission.
- Handle failed processing and duplicate suggestions without duplicate postings.
- Allow manual fallback if speech or image recognition is poor.
- The owner must be able to distinguish recorded facts, estimates, assumptions and recommendations.
- Supported languages, local accents, handwriting quality, confidence thresholds, retention and usage limits are **not yet defined**.

### 11.3 Owner AI

**Ask Sabi** and the **Daily Business Briefing** are intended to answer practical questions: “What sold most?”, “How much did we make?”, “Who owes us?”, “Why is margin down?” and “What needs my attention?” Answers must rely on available business data and state when the evidence is insufficient.

## 12. Storefront and basic merchant marketing

**Established direction:** Eligible Trada businesses receive a unique shareable storefront link, allowing them to promote goods/services without maintaining a disconnected product database.

### 12.1 Proposed Phase One storefront

- Merchant-facing storefront profile: business identity, branding, contact information and relevant location/service details.
- Public catalog of products/services the merchant chooses to publish.
- Product pictures, descriptions, selling prices and availability information as appropriate.
- Unique merchant and product links suitable for WhatsApp and social sharing.
- WhatsApp enquiry/contact path and/or simple order request.
- Merchant control over publication and visibility.
- Basic indicators of interest such as storefront visits, product views and enquiry clicks, subject to measurement feasibility.

**Important restrictions:** Do not expose private purchase costs, margins, staff details, internal stock adjustments or customer financial records. Publishing a product to a private inventory must not automatically publish it to a future public marketplace.

### 12.2 Proposed Phase One marketing helpers

- Generate a branded product flyer, particularly for WhatsApp Status use.
- Generate suggested promotional captions.
- Share product links through available device/app sharing workflows.
- Let merchants save assets or copy links as fallback.

**Platform reality:** Direct automatic WhatsApp Status posting is **not a committed feature**. Sharing can be user-assisted and device-dependent. Likewise, automatic posting to social networks is not a Phase One promise.

### 12.3 Order boundary — unresolved

The discussions considered both **WhatsApp enquiries** and **simple storefront order requests**. It is **not yet decided** whether Phase One stops at contact/enquiry or includes a formal cart/order request. Online checkout, logistics and complex fulfillment are not current MVP requirements.

## 13. Agent-assisted five-minute demonstration

**Established commercial goal:** A Trada salesperson should be able to create a compelling on-site demonstration in about five minutes.

**Intended journey:**

1. Create an isolated demo business using basic information.
2. Add a product by speaking or taking a photo, with the merchant confirming critical details.
3. Record an example sale using AI-assisted input.
4. Show its immediate impact on sales, stock, payment status and estimated gross profit.
5. Show the Owner Command Centre and a shareable storefront/product link.
6. Invite the merchant owner to securely activate the account, with consent, potentially through WhatsApp.

**Trust rules:** Never send plaintext passwords over WhatsApp. The owner activates securely. A single recorded sale does not support real trends, bestsellers or cash-flow forecasts. Any advanced analytics in the demo must be clearly labeled **sample data**, separate from real merchant records.

**Not yet defined:** Agent permissions, demo expiry, data conversion from demo to live, customer consent capture, onboarding ownership, lead attribution, invitation delivery method and whether five minutes is a measured SLA or a target.

## 14. Phase One product-level acceptance expectations

These are **product outcomes**, not API or engineering acceptance tests:

1. A new merchant can reach a useful first action without extensive setup.
2. An authorized user can add a product with the critical price/cost/quantity details reviewed.
3. A merchant can record a sale and distinguish booked revenue from received payment.
4. A sale affects the appropriate stock and customer-balance views when applicable.
5. An owner can understand recorded sales, estimated gross profit, stock and outstanding debts.
6. The owner can identify why a number is missing, provisional or unreliable.
7. A sensitive change can be held for appropriate review rather than silently committed.
8. AI capture failures can be corrected or entered manually.
9. The merchant can publish an eligible product to a shareable storefront and promote it through practical sharing tools.
10. A field agent can demonstrate the core loop without mixing sample and actual business data.

---

# PART C — PRODUCT REQUIREMENTS: PHASE TWO

**Phase Two interpretation:** Expand owner intelligence, controls, commercial effectiveness and industry coverage after reliable core transaction capture is established. These are **proposals** unless otherwise stated; no final Phase Two release date or signed scope exists.

## 15. Advanced owner intelligence and business health

### 15.1 Working-capital intelligence

- Slow-moving, aging and dead-stock analysis.
- Estimate capital tied up in inventory, subject to recorded costs.
- Compare outstanding customer debt with upcoming supplier obligations.
- Show known payment commitments and possible shortfalls.
- Highlight opportunities to reduce excess stock or follow up debtors.

### 15.2 Pricing and profitability adviser

- Suggest selling prices based on cost and desired margin.
- Show the effect of a proposed discount on gross profit.
- Warn when a proposed sale may fall below cost or owner-defined margin limits.
- Compare profitability across products, time periods and staff/branches where relevant.

**Not yet defined:** Target margin policy, minimum price authorization, costing basis, price override rights and treatment of bundled offers.

### 15.3 Supplier intelligence

- Compare supplier prices and purchase history.
- Identify notable supplier cost increases.
- Show purchasing trends and potentially delivery reliability when data exists.
- Support negotiation and purchasing decisions.

### 15.4 Cash planning and forecasting

- Upcoming obligations: supplier payments, rent, salaries, loan payments and other known commitments.
- Cash availability after known commitments.
- Potential short-term cash-flow projections, explicitly qualified by data completeness.

### 15.5 Business health review

- Summaries of profitability, liquidity, stock movement, debt collection and control exceptions.
- Weekly owner review and trend commentary.
- Optional business-health score only if its criteria and data-quality requirements are explicitly defined.

**Important:** Earlier mockups used example scores; they are **not** an approved universal scoring formula.

## 16. Stronger controls and owner action management

- Physical stock count and reconciliation workflows.
- Expected versus counted cash at daily closing.
- Detailed review of reversals, unusual discounts and stock adjustments.
- Owner-assigned tasks with responsibility and follow-up.
- More sophisticated approval policies and exception escalation.
- Branch/location comparisons for owners of multi-site operations.

**Product distinction:** Exceptions are signals for review, not proof of dishonesty.

## 17. Customer and growth intelligence

- Repeat-customer and high-value-customer analysis.
- Customers who have stopped purchasing recently.
- Marketing campaign creation with temporary promotions.
- Trackable links and attribution to visits, enquiries and orders.
- Promotional effectiveness, including sales and margin impact where reliably measured.
- Product-interest signals: highly viewed products with weak conversion.
- Better sales targets and progress tracking.

**Not yet defined:** Customer consent and outreach rules, campaign attribution windows, discount stacking, promotion eligibility and customer identity matching.

## 18. Expanded AI advice and scenario planning

- Explain changes in product mix, supplier costs, margin and expenses.
- Reorder recommendations using recent sales velocity and stock levels.
- “What-if” calculations for price increases, cost changes and margin targets.
- More tailored owner recommendations by business type.
- Advanced question-answering over historical business data.

**Guardrail:** Scenario results are estimates based on assumptions, not predictions of guaranteed business outcomes.

## 19. Industry-specific operating workflows

Potential Phase Two or later depth, depending on selected pilot markets:

| Industry model              | Expanded capabilities considered                                                                  | Release commitment                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Gadgets/electronics         | Serial/IMEI-level stock, per-unit purchase cost and margin, repairs/returns where relevant        | Not yet decided; could move into Phase One if gadget traders are pilot segment |
| Restaurants                 | Ingredients, recipes, ingredient consumption, food cost, wastage and menu profitability           | Proposed expansion                                                             |
| Frozen food/eggs            | Weight/crate units, spoilage, breakage and loss reporting                                         | Proposed expansion                                                             |
| Poultry/farming/aquaculture | Feed/input costs, batches/flocks/ponds, mortality or losses, production yield and cost per output | Proposed expansion                                                             |
| Vehicle dealerships         | Vehicle-level stock and acquisition/additional costs, days unsold, margin per vehicle             | Proposed expansion                                                             |
| Service businesses          | Service profitability, staff performance, consumables; booking where relevant                     | Proposed expansion                                                             |
| Manufacturing               | Inputs, production batches and finished output costs                                              | Proposed expansion                                                             |
| Projects                    | Project budgets, expenses and profitability                                                       | Proposed expansion                                                             |
| Online merchants            | Richer order handling, fulfillment, returns and source reporting                                  | Proposed expansion                                                             |

The product should not advertise any of these as fully supported before the corresponding workflow is validated with real merchants.

## 20. Administrative and documentation value

- Exportable transaction summaries, invoices, receipts and expense evidence.
- More structured accountant-ready or tax-documentation-ready records.
- Business financial health summaries useful in conversations with lenders or investors.

**Not yet defined:** Tax calculation and filing functionality, regulatory compliance scope, report formats, lender integrations and legal responsibilities. Automated tax filing is not an established requirement.

---

# PART D — DEFERRED FUTURE VISION

## 21. Central marketplace (not Phase One or Two)

A possible future **Jiji-like multi-vendor discovery and marketing platform**, built on top of merchants already operating Trada storefronts. Potential capabilities discussed:

- Central customer-facing search and discovery by category or location.
- Vendor participation, public listings and merchant opt-in.
- Paid vendor subscriptions, sponsored listings and promotional placement.
- Buyer trust, moderation, reporting and possibly reviews.
- Merchant performance reporting for marketplace-driven interest and orders.

**Why deferred:** A marketplace requires its own consumer traffic, marketing spend, trust and moderation, and a viable two-sided network. It is not a natural byproduct of simply having many merchant storefronts.

**Product boundary:** Private business inventory must never be published to the marketplace without merchant consent. Marketplace pricing, commissions, advertising rules, ranking and launch date are **not yet defined**.

## 22. Other longer-term possibilities

- Advanced demand forecasting and predictive anomaly detection.
- Sophisticated automated marketing and cross-platform publishing, subject to platform permissions.
- Complex logistics, fulfillment and integrated online checkout.
- Industry benchmarking and large-scale comparative intelligence, subject to privacy and data quality.
- Broader financial services or financing integrations, if ever pursued; no commitment exists.

---

# PART E — CROSS-CUTTING PRODUCT PRINCIPLES

## 23. Financial truth and reporting integrity

- **Revenue is not cash received.** A credit sale can increase sales without increasing cash.
- **Gross profit is not net profit.** Gross profit depends on cost of goods/services; net profit also depends on operating expenses and other factors.
- **Profit may be unknown.** Missing purchase costs, unrecorded expenses or incomplete stock records should produce qualified or unavailable metrics, not fabricated numbers.
- **Inventory balance is only as reliable as recorded movements and physical counts.**
- **Orders are not completed sales.** Storefront enquiries, order requests, fulfilled orders and paid transactions must be distinguishable.
- **A payment claim is not necessarily a verified transfer.**
- **Historical comparisons need history.** New businesses need setup guidance and truthful first-day insights, not fictitious trends.
- **Recommendations require evidence.** The owner should be able to understand why Sabi suggested an action.

## 24. Business-owner-first information priorities

The Owner Command Centre should prioritize, in order of business usefulness:

1. Business status and urgent attention items.
2. Clear sales, profit, collections, debt and stock indicators.
3. A short daily briefing and recommended actions.
4. Approvals, investigation and follow-up workflows.
5. Product, staff, customer and period drill-downs.
6. Detailed charts and advanced reports when needed.

This ordering reflects a product recommendation that emerged from critique of an earlier dashboard concept. It is not a fixed wireframe specification.

## 25. Trust, permissions and privacy

- Owners must be able to control sensitive operations.
- Staff access should be proportionate to responsibilities.
- Internal cost, profit and financial data must not appear on public storefronts.
- AI-derived records require review proportional to risk.
- Activity and approvals should be attributable and auditable.
- Merchant and customer contact information should be used appropriately and with required consent.
- Do not represent staff exceptions as proven misconduct.

**Not yet defined:** Detailed retention periods, regulatory notices, audit retention, exact privacy controls and incident-handling policies.

## 26. Adoption and everyday practicality

- The app must be simple enough for busy shop staff to use repeatedly.
- Manual entry remains necessary even when AI is available.
- Voice and image capture should reduce effort, not introduce uncertainty that staff cannot resolve.
- Mobile use is central for both staff and owners; tablet experience matters for richer monitoring.
- Internet interruptions and slow connections are likely product realities, but **offline transactional support has not been committed**.
- Business terminology and workflows must be understandable to Nigerian merchants.
- Default commercial presentation is Nigerian naira; multilingual support and other currencies are **not yet defined**.

---

# PART F — RELEASE CONSOLIDATION AND ANALYSIS

## 27. Phase One versus Phase Two product map

| Capability                           | Proposed Phase One                                               | Proposed Phase Two                                            | Future / deferred                                         |
| ------------------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| Business onboarding and owner access | Core setup and secure activation                                 | More advanced organization configuration                      | —                                                         |
| Staff access                         | Basic membership, permissions and accountability                 | More granular roles and multi-site controls                   | —                                                         |
| Product catalog                      | Basic products/services, price, cost, images                     | Variants, advanced sector-specific data                       | —                                                         |
| Inventory                            | Opening stock, sales impact, low-stock alerts, basic adjustments | Counts, reconciliation, aging, specialized stock              | —                                                         |
| Sales and payments                   | Core sale, cash/transfer/credit status, customer debt            | More complex payments, returns and fulfillment                | —                                                         |
| Purchases and expenses               | Core capture and cost visibility                                 | Supplier comparisons, obligations and deeper controls         | —                                                         |
| AI capture                           | Text, voice, handwritten-record/photo extraction with review     | Advanced extraction and multi-item workflows                  | —                                                         |
| Owner Command Centre                 | Core metrics, briefing, alerts, drill-down                       | Health checks, forecasting, scenario analysis                 | Benchmarking                                              |
| Risk-based confirmation              | Basic review and approval behavior                               | Advanced policy, escalation and reconciliation                | —                                                         |
| Storefront                           | Merchant link, public catalog, share and enquiry                 | Campaigns, analytics and richer orders                        | Marketplace discovery                                     |
| Marketing                            | Flyer, caption and share-link assistance                         | Campaign management and attribution                           | Automated publishing subject to APIs                      |
| Business-specific operations         | Selected pilot requirements                                      | Broader restaurant, farming, dealership and service workflows | Wider ecosystem                                           |
| Commerce marketplace                 | —                                                                | —                                                             | Central marketplace, paid listings and vendor advertising |

**Release tension requiring explicit decision:** The discussions repeatedly proposed a wide Phase One (AI voice + image + inventory + accounting + owner BI + storefront + marketing). That is a compelling demonstration, but also a large delivery surface. Final MVP approval should define the minimum end-to-end workflow and select a first industry rather than assume every discussed feature must ship at once.

## 28. Product dependencies, not technical implementation prescriptions

- **Owner analytics depend on capture discipline.** If staff do not record sales, expenses and stock changes, owner intelligence cannot be trusted.
- **Profit depends on cost data.** Cost-price completeness is as important as sales capture.
- **Storefront depends on catalog quality.** Product images, descriptions, prices and publication status must be maintained.
- **Marketing measurement depends on traceability.** Views, enquiries and orders must be distinguishable and attributed carefully.
- **Risk-based approvals depend on clear authority.** The product owner must decide which actions need whose approval.
- **Industry depth depends on pilot selection.** Gadget-specific IMEI needs may be essential if Computer Village traders are the first target.
- **Trial and subscription experience depends on commercial policy.** Price alone does not determine entitlements, expiry or payment handling.

## 29. Decision register: established, superseded and unresolved

### 29.1 Established product directions

| Decision           | Current direction                                                      |
| ------------------ | ---------------------------------------------------------------------- |
| Core buyer         | Business owner / decision-maker                                        |
| Value proposition  | Capture + operate + owner intelligence + growth                        |
| AI input           | Voice, images, text/manual; including handwritten sales records        |
| AI trust           | Review/correct, risk-based confirmation, no fabricated financial truth |
| Industry strategy  | Flexible business model foundation; manageable launch scope            |
| Owner experience   | Command Centre with actionable briefings and controls                  |
| Commerce           | Unique merchant storefront and product sharing                         |
| Subscription price | ₦12,000 per month proposed                                             |
| Marketplace        | Future, deliberately deferred                                          |
| Demo strategy      | Five-minute agent-led demonstration target                             |

### 29.2 Superseded or corrected assumptions

| Earlier idea                                   | Current position                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ₦10,000 monthly                                | Replaced by **₦12,000**                                                                             |
| Product chiefly helps salespeople record sales | Owner value and decisions are the commercial center; staff capture remains vital                    |
| Voice AI is the central AI feature             | Image AI, including handwritten sales-book extraction and product photography, is equally important |
| Retail/supermarket emphasis                    | Explicitly include gadgets/electronics and broader business models                                  |
| Traditional KPI/chart-heavy owner home         | Favor briefing, attention items, action and trusted numbers                                         |
| Build a marketplace alongside storefronts      | Marketplace deferred; storefront is the near-term commerce offering                                 |

### 29.3 Unresolved product decisions, prioritized

| Priority | Question needing owner/team decision                                                           | Why it matters                                |
| -------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Critical | Which business segment is the first real pilot: gadget traders, distributors, or another?      | Determines required industry workflows        |
| Critical | Which capabilities are _mandatory_ for Phase One launch versus demo-only or Phase Two?         | Prevents MVP overreach                        |
| Critical | What is the exact sale lifecycle, including credit, partial payment, returns and cancellation? | Defines financial truth                       |
| Critical | How are cost and gross profit determined when stock has multiple purchase prices?              | Owner trust and profitability                 |
| Critical | What are the risk tiers, thresholds and approval authorities?                                  | Controls, staff experience and accountability |
| Critical | Is IMEI/serial tracking required for the first gadget pilot?                                   | Fundamental stock workflow                    |
| Critical | Is storefront Phase One enquiry-only, or does it create formal orders?                         | Commerce scope and conversion tracking        |
| Critical | What is the free trial duration, eligibility and expiry behavior?                              | Customer conversion and access                |
| Critical | What exactly does ₦12,000 include: staff seats, branches, AI usage and storage?                | Commercial promise and perceived fairness     |
| High     | What happens when payment fails or subscription expires?                                       | Merchant continuity and data access           |
| High     | What are the owner, manager, cashier, inventory and agent permissions?                         | Role expectations and security                |
| High     | What are the minimum business setup fields and supported business categories?                  | Onboarding complexity                         |
| High     | How should stock adjustment, reconciliation and daily closing work?                            | Control and data reliability                  |
| High     | Which payment states count as verified, especially bank transfers?                             | Cash accuracy                                 |
| High     | What languages, accents and document types must AI support?                                    | Product usefulness and error rates            |
| High     | What are the privacy, consent and retention expectations for media and customer contacts?      | Trust and compliance                          |
| High     | Which storefront items can be published and how is availability displayed?                     | Customer trust                                |
| High     | What are the exact definitions of dashboard metrics and data-quality warnings?                 | Consistent interpretation                     |
| Medium   | Will one user manage multiple businesses and branches at launch?                               | Context and reporting                         |
| Medium   | Are receipts, invoices, tax documents and exports launch requirements?                         | Day-to-day merchant utility                   |
| Medium   | What is the exact agent-led conversion and demo-data migration policy?                         | Sales operation                               |
| Medium   | Which social sharing channels are supported in the initial release?                            | Marketing expectations                        |
| Medium   | How should owner recommendations turn into assigned tasks?                                     | Phase Two action management                   |

## 30. Proposed product validation plan

**Not a committed delivery plan; suggested way to validate the business case.**

1. Interview owners and staff separately. Ask about actual stock, cash, credit, profit and recording failures, not just feature preferences.
2. Choose a small number of businesses in one initial segment, with real product catalogs and transaction patterns.
3. Test whether staff can record daily activity consistently using manual, voice and image input.
4. Validate that owners trust the figures and understand where data is incomplete.
5. Test the five-minute demonstration, including the first product, first sale, owner insight and storefront link.
6. Measure whether merchants receive tangible value from controls, debt tracking, stock visibility or additional enquiries.
7. Test willingness to pay **₦12,000 per month** through actual conversion and renewal behavior, not verbal enthusiasm alone.
8. Refine Phase Two priorities using usage evidence and the problems owners repeatedly act on.

**Potential outcome measures (proposed):** activation to first product and first sale; regular transaction recording; cost-price completeness; owner dashboard usage; debt follow-up; exception resolution; storefront publication and enquiries; trial-to-paid conversion; renewal and merchant-reported value.

---

# PART G — TRANSFER SUMMARY FOR TECHNICAL REQUIREMENTS WORK

## 31. One-page product brief

**Product:** Trada, an AI-assisted operating, intelligence and growth platform for Nigerian SMEs.  
**Buyer:** Owner / decision-maker.  
**Daily users:** Owner, manager, sales attendant, inventory/finance operators; field agents assist onboarding.  
**Key pain:** Owners lack dependable visibility into profit, cash, stock, debts and staff activity, especially when away from the business.  
**Product promise:** Easy capture by text/voice/photo; consistent business records; an Owner Command Centre that explains performance and supports action; a shareable storefront that helps reach customers.  
**Proposed price:** ₦12,000 monthly; commercial entitlements and trials not yet defined.  
**Phase One proposal:** Onboard → add catalog/stock → record sales, payments and expenses → view trusted owner metrics/alerts → publish/share storefront → demonstrate value.  
**Phase Two proposal:** Deeper profitability, pricing, supplier and working-capital intelligence; reconciliation, tasks, campaign analytics and sector-specific workflows.  
**Deferred:** Jiji-like marketplace and paid marketplace advertising.  
**Core guardrails:** AI drafts require appropriate review; distinguish sales from cash and profit; show data-quality limits; protect private financial data; do not promise unsupported social automation or historical insights without data.

## 32. Full product capability inventory — quick reference

| Area                   | Capabilities discussed                                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Account and business   | Registration, agent onboarding, owner activation, business settings, business type, staff access, business/branch concepts                   |
| Core operations        | Catalog, stock, sales, payments, credit customers, expenses, purchases, supplier costs, adjustments, reports                                 |
| AI                     | Text, voice, handwritten sales records, receipts/invoices, product photos, draft completion, correction, Ask Sabi, briefings, marketing copy |
| Owner intelligence     | Revenue, gross profit, cash, expenses, debts, product rankings, margins, low stock, staff performance, alerts, data confidence               |
| Control                | Roles, permissions, risk-based confirmation, approvals, stock discrepancies, unusual discounts, audit history                                |
| Growth                 | Storefront, public catalog, product links, WhatsApp enquiry, promotional flyers/captions, visits and enquiry metrics                         |
| Phase Two intelligence | Supplier comparison, smart pricing, dead stock, obligations, cash planning, targets, customer retention, health checks, scenario analysis    |
| Phase Two operations   | Reconciliation, daily close, task delegation, branch comparisons, deeper industry-specific workflows, advanced marketing                     |
| Future                 | Central marketplace, paid listings/ads, predictive models, complex online checkout/logistics, automated cross-platform marketing             |

## 33. Explicit exclusions from this product document

This document intentionally does **not** decide:

- Frontend framework, state management, component library or routing.
- Database tables, indexes, event schemas or storage design.
- API endpoints, request/response contracts or background processing.
- Hosting, deployment, AI vendor, payment gateway or notification vendor.
- Pixel-level UI layout, screen mockups or visual design tokens.
- Exact performance targets, security controls or regulatory implementations.

Those belong in subsequent technical and design specifications, once product choices have been validated. Where earlier engineering handoffs proposed React/TypeScript, PostgreSQL, typed API contracts or particular frontend patterns, those are **implementation proposals**, not confirmed product requirements.

## 34. Guidance for the next team

Use this document as the **cumulative product context**, not as permission to build everything listed. Before creating technical requirements, obtain decisions on the initial pilot industry, precise Phase One boundary, financial transaction rules, permission/approval policy, subscription/trial rules, and storefront order boundary. Preserve the broader Phase Two and future direction in product planning so the initial solution does not become retail-only or impossible to extend.

**Bottom line:** Trada's product thesis is not “AI enters sales.” It is **“staff can record what happens; owners can understand, control and grow the business.”**

---

# PART H — IMPLEMENTATION PROGRESS AND DELIVERY LOG

## 35. How implementation progress is maintained

This part tracks delivery against the product context without turning an engineering choice into an approved product decision. Product requirements in Parts A–G remain the product baseline; this part records what has actually been built, verified, documented or blocked.

### 35.1 Status vocabulary

| Status                           | Meaning                                                                                                          |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Implemented and verified**     | Present in the codebase and covered by the relevant automated checks/build.                                      |
| **Implemented against mocks**    | Usable in the frontend, but not connected to a production backend contract.                                      |
| **Integration ready**            | A backend endpoint is documented sufficiently for frontend contract work to begin.                               |
| **Partially defined**            | Some supporting implementation or documentation exists, but important product or contract decisions remain open. |
| **Blocked by decision/contract** | Implementation should not proceed by assumption because an owner, security or backend decision is required.      |
| **Planned**                      | Agreed direction, not yet implemented.                                                                           |

### 35.2 Session-close rule

At the end of every substantive delivery session, the team should update:

1. The implementation-status date in this document header.
2. The capability status table below.
3. The newest session entry, including completed work, verification and next work.
4. Contract gaps, product decisions or risks discovered during the session.
5. Any requirement whose meaning changed, while preserving the distinction between approved product scope and an implementation proposal.

## 36. Current implementation status

### 36.1 Frontend status as of 20 November 2026

| Capability                        | Status                           | Current evidence / limitation                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo foundation               | **Implemented and verified**     | React, TypeScript, Vite, pnpm workspaces, `apps/web` and `packages/ui`.                                                                                                                                                                                                                                                                  |
| Design tokens and primitives      | **Implemented and verified**     | Semantic colour tokens plus Button, Badge and Surface primitives.                                                                                                                                                                                                                                                                        |
| Responsive application shell      | **Implemented and verified**     | Mobile bottom navigation, tablet rail and desktop sidebar.                                                                                                                                                                                                                                                                               |
| Design tokens and primitives      | **Implemented and verified**     | Semantic colour tokens updated to Trada.com.ng brand palette (dark navy `#0d1b4b`, brand green `#1a9e36`); Button, Badge (with `tone` prop for success/warning/error/info), Surface, FormField, Input, Select, Textarea, Alert, PageHeader, EmptyState, StatCard and PasswordInput primitives in `@trada/ui`. Shared `TextField`, `NumberField`, `BackLink` app components. Shared `formatStatus`, `formatRecordingDuration`, `formatFileSize`, `localDateKey`, `recordingToDataUrl`, `fileToDataUrl` utility functions in `lib/formatters.ts`. |
| Responsive application shell      | **Implemented and verified**     | Mobile bottom navigation, tablet rail and desktop sidebar. Brand mark updated from "S" to "T".                                                                                                                                                                                                                                           |
| PWA shell                         | **Implemented and verified**     | Production build generates the manifest and service worker; online-first transactional behavior remains the product rule.                                                                                                                                                                                                                |
| Reference-led merchant composition | **Implemented and verified**     | Dashboard, Sales and Inventory now use the shared rounded KPI/action/card language across responsive breakpoints. Current records and qualified/unavailable values are retained; charts, valuation, movements and other unsupported screenshot features remain absent.                                                                                                      |
| Data and validation foundation    | **Implemented and verified**     | Redux Toolkit, RTK Query and Zod contract validation are configured.                                                                                                                                                                                                                                                                     |
| Owner Command Centre              | **Implemented and verified**     | The dashboard composes documented sales analytics, low-stock and recent-sales endpoints. The obsolete fixture endpoint has been removed. Live backend testing was intentionally deferred.                                                                                                                                                |
| Financial-truth presentation      | **Implemented and verified**     | Revenue, cash received, gross profit and unpaid balances remain distinct. Unsupported cash totals are unavailable; profit and unpaid balances are explicitly qualified where the backend contract is incomplete.                                                                                                                         |
| Loading and error feedback        | **Implemented and verified**     | Dashboard sources load and fail independently, with partial-data disclosure and per-panel retries. Mutation feedback consistently distinguishes authentication, authorization, connectivity, malformed-response and backend business errors.                                                                                             |
| Frontend permission helper        | **Partially defined**            | Action-based `can()` guards protect routes and actions. The backend's generic `user` can currently view/create sales and view sales analytics, plus view/create/update products; sale cancellation and product deletion remain owner-only. Final owner, manager and staff mappings remain blocked by the production permission contract. |
| Authentication and session        | **Implemented and verified**     | Typed registration, login and profile integration plus session restoration, protected routing, logout and automatic access-token refresh are implemented. A live backend handshake with real credentials remains to be verified.                                                                                                         |
| Business onboarding and settings  | **Implemented and verified**     | Authenticated users resolve or create their owned business workspace, operational routes require a business, and business identity is editable. Publication remains unavailable pending authorization rules.                                                                                                                             |
| Development demo environment      | **Removed**                      | The demo login and in-memory API adapter were removed when local development switched to the shared production API. Local work must use dedicated test accounts and non-sensitive records.                                                                                                                                               |
| Products and low-stock alerts     | **Implemented and verified**     | Searchable/paginated list, low-stock summary, create, detail/edit and guarded delete routes are implemented against the documented contract. Live backend testing was intentionally deferred.                                                                                                                                            |
| Sales and sales analytics         | **Implemented and verified**     | Protected checkout, filtered/paginated history, detail, guarded cancellation/restock and analytics are implemented against the documented contract. Revenue, received amount and balance due remain distinct. Live backend testing was intentionally deferred.                                                                           |
| Full production RBAC              | **Blocked by decision/contract** | Backend documentation exposes a generic `user` role but no staff membership, permission, branch, approval or authorization-denied contract.                                                                                                                                                                                              |
| AI capture and draft review       | **Partially defined**            | Sales and Products expose their available Voice, Image and/or Text input controls directly in their module action bars; each control routes straight to its matching input stage. Voice selection shows an animated waveform and a three-second countdown before requesting microphone access; after recording stops, its completed audio is sent for a draft request. Text opens only the existing editable form. Product image selection opens an `environment` camera capture on supporting mobile browsers and the normal file picker on desktop. Applying an AI draft opens the existing editable form, and persistence still requires the normal explicit submit action. The mobile centre launcher routes permitted users to these focused draft-only workflows; product-update suggestions remain separately guarded. Unified AI, live transcription, confidence, idempotency, inventory authorization/audit and production release gates remain unresolved. |
| Expenses, purchases and suppliers | **Planned**                      | Required by the PRD but not present in the received backend contract.                                                                                                                                                                                                                                                                    |
| Storefront and marketing          | **Planned**                      | Required direction, but no received backend contract yet.                                                                                                                                                                                                                                                                                |

### 36.2 Received backend API surface

**Source received:** `Trada_API_Requests_and_Responses.md`, dated 4 November 2026.

| Domain         | Documented endpoints                                                                         |
| -------------- | -------------------------------------------------------------------------------------------- |
| Authentication | Register, login, refresh access token and current profile.                                   |
| Products       | Create, list/filter, low-stock alerts, detail, update and delete.                            |
| Sales          | Record cart checkout, list/filter, detail, cancel/restock and sales/profit analytics.        |
| Errors         | Examples for insufficient stock, missing/expired token, duplicate SKU and missing resources. |

The received contract does **not yet document** business creation/selection, business membership, staff invitations, roles/permissions, branches, approvals, audit history, expenses, purchases, customer/debtor ledger, inventory movement history, AI drafts, storefront, subscription/trial or a dedicated Owner Command Centre aggregate.

## 37. Backend decisions and contract gaps discovered

These items require clarification before the frontend treats the backend as the source of truth:

1. **RBAC model:** Define roles, permissions, business membership and whether permissions are claims, API data or both. Document `403 Forbidden` separately from `401 Unauthorized`.
2. **Business scope:** Define how an authenticated user selects a business or branch and how every resource is tenant-scoped. The current product-create behavior assumes the authenticated user's owned business when `businessId` is absent, which does not yet cover staff membership or multi-business users.
3. **Authentication lifecycle:** Define access/refresh expiry, rotation, revocation, logout, reset-password, verification and the intended secure token storage mechanism. Login should return enough role/business context to route safely, or the client must always follow login with `/auth/me` and membership requests.
4. **Financial truth:** Define analytics behavior when cost prices are missing. Gross profit must be qualified or unavailable rather than calculated from invented or default costs.
5. **Partial payment lifecycle:** Enums support partial and unpaid sales, but follow-up payments, payment history, verification and customer balance allocation are not documented.
6. **Cancellation and refunds:** Confirm whether cancelling a sale represents a verified refund or only a reversal/restock request. Approval, actor attribution and audit evidence are not documented.
7. **Inventory integrity:** Direct product quantity updates can bypass stock-movement accountability. Define opening stock, adjustment reasons, counts, movements and approval behavior.
8. **Deletion policy:** Confirm whether product deletion is hard deletion, archival or deactivation, especially when sales already reference the product.
9. **Error contract:** Add stable error codes, field-validation details, `403`, conflict handling and a consistent error payload so the frontend does not branch on human-readable messages.
10. **Dashboard reporting boundaries:** Sales analytics does not expose total payments received, so it cannot support a trustworthy cash-received metric. Define reporting timezone and inclusive date boundaries for daily analytics and sales filters; also distinguish unpaid sale balance from a customer-linked debtor ledger.

## 38. Agreed near-term delivery order

1. Resolve the authentication, business-membership and RBAC contract questions.
2. Implement the frontend authentication/session spine, protected routing and API authorization handling.
3. Implement the product catalog and low-stock slice against the backend contract.
4. Implement sale recording and sales history, preserving the distinction between revenue, payments and balance due.
5. Replace Owner Command Centre fixtures with trustworthy backend aggregates or composed endpoint data.
6. Continue with customer debt, expenses/purchases, inventory controls, AI draft review and storefront slices as their contracts become available.

## 39. Session delivery log

### Session 001 — Frontend foundation and backend-contract intake

**Dates:** 3–4 November 2026  
**Outcome:** Initial frontend foundation completed and verified; first backend API contract reviewed.

**Completed:**

- Created the pnpm React/TypeScript monorepo and shared UI package.
- Implemented semantic tokens, primitives and responsive application navigation.
- Implemented the first Owner Command Centre against typed fixture data.
- Added financial-confidence, loading, error and actionable-attention states.
- Added an action-based frontend permission foundation without claiming it is the final RBAC matrix.
- Added Redux Toolkit, RTK Query, Zod, MSW handlers, PWA generation and a dashboard test.
- Made root development commands work on Windows without requiring a global pnpm executable.
- Received and reviewed the authentication, product and sales API documentation.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest dashboard test passed.
- Production PWA build passed and generated the service worker.

**Key limitation:** The visible dashboard still uses local fixture data. No production authentication, business membership or endpoint integration has been completed.

**Next session target:** Resolve backend authentication/business/RBAC questions, then implement login, session restoration, protected routing and authorized API access.

### Session 002 — Authentication and provisional RBAC spine

**Date:** 4 November 2026  
**Outcome:** The frontend now requires an authenticated session and can integrate with the documented backend login, profile and refresh endpoints.

**Completed:**

- Added typed and Zod-validated login and current-profile API contracts.
- Added bearer-token authorization to the shared RTK Query base layer.
- Added automatic access-token refresh and one retry after an authenticated request receives `401 Unauthorized`.
- Added session restoration and logout using browser `sessionStorage` as an interim compatibility mechanism.
- Added responsive login UI, protected routing and permission-denied feedback.
- Connected the authenticated user's name and provisional role to the application shell.
- Limited the undocumented backend `user` role to dashboard access; it does not receive approval permissions.
- Added a development proxy from `/api` to the documented backend at `http://localhost:3002`.
- Added authentication-state and least-privilege permission tests.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 3 tests across 2 test files.
- Production PWA build passed and generated the service worker.

**Security limitation:** The documented backend returns refresh tokens in JSON. The frontend stores the session in `sessionStorage` so it can integrate now, but the preferred production design is a Secure, HttpOnly, SameSite refresh-token cookie with backend-supported rotation and revocation.

**Integration limitation:** Automated frontend verification passed, but login has not yet been exercised against a running backend with a real test account. The production business-membership and RBAC contract also remains unresolved.

**Next session target:** Verify the live authentication handshake, then implement the product catalog and low-stock slice against the documented endpoints while preserving permission boundaries.

### Session 003 — Account registration route

**Date:** 4 November 2026  
**Outcome:** Users can create a personal Trada account through the documented backend registration contract and continue to login.

**Completed:**

- Added a typed and Zod-validated `POST /auth/register` mutation.
- Added the public `/register` route with first name, last name, email, phone and password fields.
- Added password confirmation and prevents mismatched passwords from reaching the API.
- Added backend error feedback using the documented standard message payload.
- Added successful registration handoff to `/login`, including email prefilling and a confirmation message.
- Added login/register navigation in both directions.
- Kept registration explicitly separate from business onboarding and ownership assignment.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 4 tests across 3 test files.
- Production PWA build passed and generated the service worker.

**Product and backend limitation:** The current registration endpoint creates a generic `user`. It does not create a business, assign an owner role, select a business type or establish staff/business membership. The UI therefore describes this step only as personal account creation; merchant onboarding remains blocked until its backend contract is supplied.

**Next session target:** Verify registration/login against the running backend, then implement product catalog listing, creation and low-stock alerts against the documented endpoints.

### Session 004 — Product catalog and low-stock routes

**Date:** 4 November 2026  
**Outcome:** The documented product endpoint family is represented by typed frontend contracts and protected product-management routes.

**Completed:**

- Added Zod-validated product, pagination and low-stock response contracts.
- Added product list, filter/search, pagination, low-stock, detail, create, update and delete RTK Query endpoints with cache invalidation.
- Added the protected `/products`, `/products/new` and `/products/:id` routes.
- Added a responsive searchable product list with loading, empty, error and pagination states.
- Added low-stock attention feedback based on product quantity and threshold.
- Added product create/edit forms for identity, category, type, condition, SKU, barcode, pricing, opening quantity, threshold, unit and location.
- Added action-based product permissions. The provisional backend `user` can view/create/update; deletion remains owner-only until RBAC is defined.
- Connected application navigation to the inventory routes and active navigation state.
- Corrected the shared Button primitive so Radix `Slot` receives one child when rendering link-style buttons.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 5 tests across 4 test files.
- Production PWA build passed and generated the service worker.

**Integration limitation:** Per delivery direction, these routes were implemented from documentation without testing a running backend. Response validation may reveal backend/document differences during later integration.

**Control limitations:** The documented update endpoint permits direct quantity changes without a stock-movement reason or approval record, and deletion semantics are not defined. The UI therefore keeps deletion owner-only, but backend authorization and archival/history behavior still require resolution.

**Next session target:** Implement the documented sales routes—checkout, filtered sales history, sale detail, guarded cancellation/restock and analytics—while keeping booked revenue, amount paid and balance due distinct.

### Session 005 — Sales checkout, history and analytics routes

**Date:** 4 November 2026  
**Outcome:** The complete documented sales endpoint family is represented by typed frontend contracts and protected sales-management routes.

**Completed:**

- Added Zod-validated sale, sale-item, pagination and analytics response contracts.
- Added sale create, list/filter, detail, cancellation/restock and analytics RTK Query endpoints with cache invalidation.
- Added the protected `/sales`, `/sales/new` and `/sales/:id` routes and connected them to application navigation.
- Added responsive sales history with search, date, status and payment-status filters, pagination, loading, empty and error states.
- Added checkout with product selection, stock-aware quantities, price and discount controls, optional customer details, payment method, partial payment and tax.
- Kept booked revenue, amount received and balance due visually and computationally distinct in checkout, history analytics and sale detail.
- Added sale detail and owner-only cancellation/restock. The UI does not present the backend's `refunded` payment status as proof that money was actually returned.
- Extended provisional action permissions: the generic backend `user` may view/create sales and view analytics but cannot cancel sales.
- Added checkout financial-truth and provisional sale-permission assertions.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 6 tests across 5 test files.
- Production PWA build passed and generated the service worker.

**Integration limitation:** Per delivery direction, the sales routes were implemented from the received documentation without exercising a running backend. Runtime response validation may reveal contract differences during later integration.

**Product and contract gaps:** The API has no follow-up payment or payment-history endpoint, so unpaid balances cannot yet be settled or audited. Cancellation automatically labels payment as `refunded`, but the contract provides no refund transaction, approval, actor, reason or audit evidence. Analytics reports `totalCost` and `grossProfit` without defining how missing product cost is treated; those figures must remain qualified until the backend rule is documented.

**Delivery risk:** Checkout loads up to 100 active products because the documented product API has no product-picker lookup contract. Larger catalogs will need server-side search or an agreed higher-volume selection pattern.

**Next session target:** Replace the supported Owner Command Centre fixture metrics with composed sales analytics, low-stock and recent-sales data. Keep debt follow-up, approvals and any unsupported aggregates explicitly unavailable until their backend contracts exist.

### Session 006 — Owner Command Centre API composition

**Date:** 4 November 2026  
**Outcome:** The dashboard now uses the documented backend contracts instead of synthetic business fixture data.

**Completed:**

- Replaced the fixture-backed dashboard query with concurrent sales analytics, low-stock and recent-sales queries for the local calendar day.
- Built a recorded-data briefing from sales count, revenue and low-stock count without presenting it as AI-generated analysis.
- Connected sales revenue and qualified gross profit to analytics while keeping cash received unavailable because the contract does not provide a payment-total aggregate.
- Presented the analytics unpaid balance as a qualified sale balance rather than claiming it is a verified customer debtor ledger.
- Replaced fixture attention and product rankings with documented low-stock alerts and recent sale records linked to their detail routes.
- Added coordinated loading, error, retry and refresh behavior across the three dashboard data sources.
- Removed the obsolete local dashboard fixture and mock endpoint so development cannot silently present invented business data.
- Updated dashboard coverage to verify that revenue, unavailable cash, qualified profit and unpaid sale balances remain distinct.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 6 tests across 5 test files.
- Production PWA build passed and generated the service worker.

**Integration limitation:** Per delivery direction, the composed dashboard was implemented from documentation without exercising a running backend. A failure in any of its three required queries currently produces the dashboard retry state rather than partially presenting stale or incomplete results.

**Product and contract gaps:** Daily reporting needs an agreed business timezone and inclusive date-boundary semantics. Sales analytics does not expose total payments received, and unpaid balances are not backed by a customer ledger or follow-up payment history. Gross profit remains qualified because missing-cost behavior is undefined.

**Delivery risk:** Recent sales is a five-record operational view, not a complete activity or audit trail. Low-stock alerts also cannot replace purchase-order or stock-movement workflows.

**Next session target:** Add a live-integration readiness pass: environment guidance, contract-focused API tests/mocks and graceful partial dashboard states. Then continue only with frontend capabilities supported by a received backend contract or an explicit product decision.

### Session 007 — Development demo account and route sandbox

**Date:** 4 November 2026  
**Outcome:** The implemented frontend routes can be explored without a running backend through a development-only owner demo session.

**Completed:**

- Added a development-only demo account entry point to the login screen with visible credentials and a one-click sign-in action.
- Added an in-memory API adapter that uses the same RTK Query endpoints and Zod response validation as the documented backend integration.
- Seeded representative products, low-stock alerts, completed and partially paid sales, and computed sales analytics.
- Supported product listing, search, detail, creation, update and deletion in the demo session.
- Supported sales history, detail, checkout, stock deduction, cancellation/restock and analytics in the demo session.
- Assigned the demo user the existing provisional owner role so guarded owner actions can be evaluated.
- Reset RTK Query state on logout to prevent demo data from leaking into a subsequent real session.
- Added an API-level test proving that the demo product and analytics responses pass the production frontend contracts.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 7 tests across 6 test files.
- Production PWA build passed and generated the service worker.

**Implementation boundary:** The demo account is developer tooling, not a product authentication requirement or approved production backdoor. Its login entry point and request interception are guarded by Vite's development-mode flag; the production UI does not expose them.

**Limitation:** Demo mutations are held in browser runtime memory and reset when the development server/application runtime restarts. They do not prove live backend compatibility, persistence, authorization or transaction behavior.

**Delivery risk:** The demo deliberately mirrors the received contract, so an undocumented backend behavior can still differ. Live integration remains required before release.

**Next session target:** Exercise the live authentication and documented endpoint handshake when the backend is available, then add graceful partial dashboard states and contract-focused failure coverage.

### Session 008 — Integration readiness and partial-data resilience

**Date:** 4 November 2026  
**Outcome:** The frontend now preserves usable dashboard data during isolated endpoint failures and provides consistent status-aware mutation feedback.

**Completed:**

- Replaced the dashboard's all-or-nothing error screen with independent analytics, low-stock and recent-sales states.
- Added a visible partial-data disclosure, coordinated retry action and panel-specific retry controls.
- Kept available metrics and panels usable when another dashboard endpoint fails; unavailable analytics values are explicitly marked rather than inferred.
- Added automated coverage proving recent sales and analytics remain visible when low-stock loading fails.
- Centralized mutation error interpretation across login, registration, product management, checkout and sale cancellation.
- Added stable frontend messages for `401`, `403`, connectivity/timeouts and malformed/unverifiable responses while preserving useful backend business messages where available.
- Added contract-focused tests for authentication, authorization, network, parsing and backend business-error feedback.
- Updated repository guidance for development demo mode, proxied live API mode and custom `VITE_API_BASE_URL` configuration.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 11 tests across 7 test files.
- Production PWA build passed and generated the service worker.

**Integration limitation:** These resilience paths are verified with controlled frontend states, not a running backend. Live response payloads, CORS/proxy configuration, token rotation and actual `401`/`403` behavior still require an end-to-end handshake.

**Product and contract gap:** The backend still needs stable machine-readable error codes and field-level validation details. The frontend can classify transport/status failures, but business-message branching must remain limited until that contract exists.

**Delivery risk:** Partial dashboard data can have different retrieval timestamps. The UI discloses partial availability but cannot yet report a server-issued as-of timestamp per source because the contracts do not provide one.

**Next session target:** Perform the live authentication, product and sales handshake when the backend is available. If live integration remains intentionally deferred, pause route expansion until a new backend contract or explicit product decision defines the next domain.

### Session 009 — Brand and colour-theme migration to Trada.com.ng

**Date:** 10 November 2026
**Outcome:** The design system and all visible UI surfaces have been updated to match the Trada.com.ng logo and brand identity.

**Completed:**

- Updated the brand palette in `packages/ui/src/tokens/tokens.css`:
  - Navy (dark text, sidebar, gradients): `#0d1b4b` replacing the former teal-ocean navy.
  - Brand green (primary action, active nav, accents): `#1a9e36` replacing the former teal.
  - Added `--sd-teal-100: #d9f5e0` to cover the existing soft-green surface token reference.
  - Adjusted hover state to `#148a2d` and all related semantics (`--sd-action-primary`, `--sd-action-primary-hover`, `--sd-blue-100`, `--sd-surface-soft`).
- Updated hardcoded hex values in `apps/web/src/styles.css`:
  - Dashboard briefing card gradient end colour, briefing badge background, auth page radial glow, activity-dot ring and sidebar active-nav overlay updated from old teal to brand green equivalents.
  - Sales metric icon background updated.
- Updated `apps/web/index.html`: `theme-color` → `#0d1b4b`; page title → `Trada — Manage · Sell · Grow` (matches the logo tagline).
- Updated `apps/web/vite.config.ts` PWA manifest: `theme_color` → `#0d1b4b`; `description` reflects brand tagline.
- Updated `packages/ui/src/layouts/AppShell.tsx`: brand mark letter changed from `S` to `T`.

**Verification:**

- No old teal (`#08756a`, `#0e9f8f`, `#082d4a`, `#061f33`) hex literals remain in source files.
- All token-driven components (buttons, active nav, links, eyebrows, action elements) inherit the new palette automatically through CSS variables.

**Limitation:** No automated visual regression test exists; manual review of the running dev server is recommended to confirm rendering. The dist build has not been regenerated.

**New product decision recorded:** The product's visible brand identity is **Trada.com.ng** with the tagline **Manage · Sell · Grow**. The legacy document filename migration to the `Trada_` prefix was completed on 19 November 2026.

**Next session target:** Perform the live authentication, product and sales handshake when the backend is available; or proceed to the next domain with a received backend contract.

### Session 010 — Production deployment and live authentication compatibility

**Date:** 12 November 2026  
**Outcome:** The frontend is deployable again and now accepts the live backend authentication response while preserving compatibility with the documented contract.

**Completed:**

- Restored the deployable workspace dependency graph so the shared `@trada/ui` package and its React type dependency resolve during clean production installs.
- Diagnosed the live login failure: the backend returns `data.token` without an embedded user, while the frontend required `data.accessToken` and `data.user`.
- Normalized both `token` and `accessToken` login responses into the frontend session shape.
- Allowed the authenticated session to begin without an embedded user and retained `/auth/me` as the profile-enrichment step.
- Applied the same token-key compatibility to refresh responses.
- Added contract tests for the live response, the documented response and refresh-token normalization.
- Added the Netlify SPA rewrite (`/* /index.html 200`) so direct navigation and browser refreshes resolve through the application entry point.

**Verification:**

- ESLint passed.
- TypeScript type-check passed.
- Vitest passed 14 tests across 8 test files.
- Production PWA build passed and copied the Netlify rewrite into `apps/web/dist/_redirects`.

**Security action required:** Access and refresh tokens were exposed during production diagnosis. They must be revoked or invalidated before the account is used again.

**Integration limitation:** The corrected behavior is covered by contract tests and a production build, but still requires a deployed smoke test against the live API. In particular, `/auth/me`, authenticated route access and the refresh endpoint must be confirmed after redeployment.

**Next session target:** Commit and deploy this fix, rotate the exposed credentials, then smoke-test login, browser refresh, protected routes, logout and automatic token refresh in production.

### Session 011 — Business onboarding endpoint review and integration design

**Date:** 13 November 2026  
**Outcome:** The received business endpoint family has been mapped to the Phase One owner-onboarding journey and the current frontend architecture.

**Confirmed implementation scope:**

- Resolve the authenticated user's business with `GET /businesses/me` during protected-app bootstrap.
- Treat a successful business response as an established workspace and the documented business-not-found response as the onboarding state.
- Add an authenticated business-creation flow using `POST /businesses`, keeping `isLive` false during initial setup.
- Use `PATCH /businesses/:id` for later business-settings edits and hydrate the application shell from the returned business rather than fixture identity.
- Preserve business data as RTK Query server state, add business cache tags, and gate operational routes until authentication, profile and business resolution finish.
- Extend development demo behavior and contract tests for no-business, existing-business, creation, update, authentication-expiry and error states.

**Backend clarifications received:**

- Business creation atomically establishes the authenticated user as the business owner.
- `/auth/me` continues to return the generic `user` role for now; this label must not be treated as the finalized RBAC role.
- Ownership enforcement is confirmed for business retrieval and update by ID.
- Staff membership support is under backend development.
- Authorization for changing `isLive` remains unresolved, so initial onboarding will keep it false and will not expose a publication control.

**Remaining contract and product gaps:**

- Category values, currency codes, industry taxonomy, field-level validation codes and publication rules for `isLive` require agreement.
- Returning `403` for an invalid JWT conflicts with the frontend's authorization handling and may leave an invalid session active; authentication-status semantics must be aligned.
- The five required creation fields limit the PRD's progressive-setup goal, and agent-assisted activation remains unsupported by the received endpoints.
- Staff invitations, membership payloads and the final RBAC permission matrix remain unavailable.

**Implementation boundary:** This endpoint set is sufficient for direct owner self-onboarding and business settings. Backend ownership enforcement is authoritative while the role string remains `user`; the frontend must not rewrite that value to `owner`. Staff onboarding, agent-assisted ownership transfer, multi-business access and complete RBAC remain outside this slice.

**Next session target:** Implement the business schema/endpoints, protected bootstrap gate, onboarding form, business settings, shell hydration and end-to-end contract coverage, while keeping `isLive` and staff workflows unavailable pending their contracts.

### Session 012 — Owner business onboarding and workspace integration

**Date:** 13 November 2026  
**Outcome:** Authenticated owner accounts now resolve, create and maintain their backend business workspace before entering operational product, sales or dashboard routes.

**Completed:**

- Added a Zod-validated business contract and typed RTK Query endpoints for `GET /businesses/me`, `POST /businesses` and `PATCH /businesses/:id`.
- Enforced private initial creation in the API layer by always sending `isLive: false`; no publication control is exposed.
- Added authenticated profile restoration for token sessions that do not yet contain the `/auth/me` user payload.
- Added a business route gate that treats only the documented business `404` as onboarding and presents retry behavior for connectivity or server failures.
- Added `/onboarding/business` with the required name, description, category, currency and industry fields, duplicate-creation recovery and intended-route continuation.
- Added `/settings/business` with action-based provisional update permission and PATCH-backed identity editing.
- Replaced the fixture shell business name with the resolved backend business and added a settings navigation entry.
- Extended the development demo adapter with schema-valid business retrieval, creation and update behavior.
- Added contract and component coverage for valid/malformed business responses, private onboarding fields, no-business routing, server-error isolation and demo business data.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 19 tests across 10 test files.
- Production PWA build passed and generated the service worker.

**Integration limitations:** Live backend execution is still required for the new endpoints. `/auth/me` continues to return `user`, so `business:update` remains a provisional permission for that generic role while backend ownership enforcement is authoritative. Staff membership and invitations are not implemented, and publication remains unavailable until `isLive` authorization is defined.

**Contract risks:** Category and industry taxonomies remain free-form/document-driven. The backend's documented `403` for an invalid JWT still conflicts with permission-denied handling and should be aligned with authentication failure semantics. The client bundle now exceeds Vite's 500 kB warning threshold and should be route-split as the application grows, though the build remains successful.

**Next session target:** Exercise registration, login, business-not-found resolution, creation, refresh, settings update and browser reload against the live backend; then address any observed payload or authorization differences before implementing staff onboarding.

### Session 013 — Production-only API environment and demo removal

**Date:** 13 November 2026  
**Outcome:** Local and deployed frontend builds now target the current production API by default, and the development demo login has been removed.

**Completed:**

- Changed the default API base URL to `https://api.trada.com.ng/api/v1` while preserving `VITE_API_BASE_URL` as a future environment override.
- Updated `apps/web/.env.example` and repository setup guidance to identify production as the current shared backend environment.
- Removed the Vite proxy to the unavailable `http://localhost:3002` backend.
- Removed demo credentials, login interception, the demo login card, demo-only styling, the in-memory demo API adapter and its test.
- Added an explicit warning that local development sends real requests to production and should use test accounts and non-sensitive records.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 18 tests across 9 test files after removal of the demo-only test.
- Production PWA build passed and generated the service worker.
- No local `.env` file or repository deployment configuration overrides the new production URL.

**Operational blocker:** An unauthenticated reachability probe could not resolve `api.trada.com.ng` from the execution environment, and an independent URL opener also could not access it. The frontend configuration is complete, but production DNS/TLS reachability and CORS must be confirmed from an external machine or by the backend/DevOps team before live integration testing.

**Next session target:** Confirm the production hostname resolves publicly and permits the deployed frontend origin, then run the registration, login, business onboarding, settings update, refresh and browser-reload smoke test with a dedicated production test account.

### Session 014 — Product design re-engineering review and implementation plan

**Date:** 13 November 2026  
**Outcome:** The new PM-chat design handoff has been audited against the cumulative PRD, current live-contract surface, implemented routes, provisional RBAC model and existing design system. A product-safe redesign plan now defines what can be retained, adapted, deferred or rejected before screen refactoring begins.

**Completed:**

- Reviewed the current merchant application architecture, routes, shared UI primitives, responsive shell, feature screens, tests and design-token implementation.
- Reviewed the handoff documents and preferred authentication, merchant-dashboard and admin reference images as evidence rather than executable requirements.
- Established a source-of-truth order: security and live contracts, confirmed PRD decisions, working behavior, approved brand assets, then PM-chat references.
- Preserved the implemented owner journey as the redesign spine: account, business activation, inventory/catalog, sales/payment and trustworthy Owner Command Centre.
- Classified the handoff's responsive hierarchy, owner focus and spacious layout as useful direction, while rejecting generated data, generated brand imagery, theft claims and unsupported production feature states.
- Deferred phone/OTP, password recovery, social sign-in, AI capture, customers/debtors, storefront, subscriptions and BNPL until product decisions and backend contracts exist.
- Separated the proposed ten-page internal admin portal into an independent product track requiring its own PRD approval, identity model, RBAC and APIs.
- Defined the target merchant information architecture without changing deployed URLs and specified a staged implementation process covering foundations, shell, auth/onboarding, command centre, inventory, sales, settings/RBAC and release quality.
- Recorded the detailed traceability matrix, design-system target, acceptance gates and definition of done in `PRODUCT_DESIGN_REENGINEERING_PLAN.md`.
- Corrected the current implementation status to reflect completed business onboarding and removal of the development demo environment.

**Key design decision:** The handoff's deep-navy/calm-teal screenshots do not supersede the approved Trada.com.ng navy/green migration. Until an approved vector logo and exact brand specification arrive, the redesign will retain current brand semantics and use the screenshots only for information hierarchy, density and responsive composition.

**Implementation boundary:** This session changes planning documentation only. It does not add speculative routes, fake metrics, unsupported navigation or API behavior, and it does not yet refactor production screens.

**Verification:**

- Confirmed that every currently implemented route maps to a received API capability or an established client-side gate.
- Confirmed that the handoff's OTP, Google sign-in, AI, customer/debtor, storefront, BNPL, subscription and platform-admin concepts lack sufficient current contract coverage.
- Confirmed that the local handoff is untracked and broader than the public repository page accessible through the supplied VS Code URL; the complete local artifacts were used for the audit.

**Next session target:** Execute Stage 0 and Stage 1: preserve a verified behavioral baseline, introduce the capability registry, normalize the token system, add shared form/feedback/page/data primitives and begin moving component-owned styling out of the monolithic application stylesheet without changing route behavior.

### Session 015 — Design-system foundation and capability-aware navigation

**Date:** 13 November 2026  
**Outcome:** The first redesign implementation slice is complete. Product capability status is now explicit, shared UI foundations belong to `@trada/ui`, and merchant navigation exposes only contract-backed destinations permitted for the current role.

**Completed:**

- Added a typed capability registry with `available`, `contract-blocked`, `product-unapproved` and `separate-track` states plus evidence-based reasons.
- Marked email/password authentication, business workspace, owner overview, inventory, sales and business settings as available.
- Kept staff RBAC, customer/debtors, inventory movements, AI capture, storefront and subscriptions contract-blocked; BNPL product-unapproved; and the admin portal a separate product track.
- Added route metadata that combines capability availability with the existing action-based RBAC helper before a destination reaches the shell.
- Removed misleading Storefront and Reports links from merchant navigation because neither has an approved route or contract.
- Changed the mobile quick-sale action from a dead page fragment to the real `/sales/new` route, while continuing to hide it when `sale:create` is unavailable.
- Expanded design tokens with spacing, type, control-height, content-width, shadow, motion and focus-ring foundations without changing established navy/green brand semantics.
- Moved Button, Badge, Surface and spinner styling out of the application stylesheet into component-owned shared UI styling.
- Added shared `FormField`, `Input`, `Select`, `Textarea`, `Alert`, `PageHeader`, `EmptyState` and `StatCard` components.
- Added tests for product capability guardrails, role-aware navigation, labelled form structure, semantic feedback and shared page/data patterns.
- Updated the redesign plan to record Stage 0 and Stage 1 as complete and the navigation portion of Stage 2 as complete.

**Verification:**

- ESLint passed with zero warnings after correcting the navigation projection.
- TypeScript type-check passed.
- Vitest passed 23 tests across 11 test files.
- Production PWA build passed and generated the service worker.
- The initial JavaScript bundle is 510.98 kB minified (156.67 kB gzip), so the existing route-splitting warning remains.

**Implementation boundary:** No API request, payload, cache rule, permission meaning or supported route URL changed. The capability registry controls presentation only; backend authorization remains authoritative.

**Next session target:** Complete Stage 2 with route-level lazy loading and shell refinement, then migrate authentication and business onboarding onto the shared form, alert and page patterns as the first visible redesign vertical slice.

### Session 016 — Route splitting and access/onboarding redesign

**Date:** 13 November 2026  
**Outcome:** Stage 2 is complete and the first visible Stage 3 vertical slice is implemented. Authentication and business activation now use one responsive, trust-first experience grounded only in available contracts, while every application screen loads through a dedicated route chunk.

**Completed:**

- Converted login, registration, business onboarding, dashboard, inventory, sales and settings screens to route-level lazy imports behind an accessible Suspense fallback.
- Reduced the production entry JavaScript bundle from 510.98 kB to 459.46 kB minified, eliminating the previous Vite chunk-size warning.
- Added a reusable Trada access layout for sign-in, registration and business setup with responsive navy/green composition and no generated imagery.
- Limited access-page claims to supported product behavior: sales/payment records, stock/low-stock visibility and action on verifiable records.
- Migrated login and registration to shared `FormField`, `Input`, `Alert` and `Button` components without changing their request payloads or navigation behavior.
- Migrated business onboarding to shared fields, select, textarea, alert and state patterns while preserving 404-only onboarding, duplicate-business recovery, private initial creation and intended-route continuation.
- Added explicit onboarding progress and a private-workspace disclosure without exposing storefront publication.
- Added consistent loading and retry states for business resolution.
- Converted shell navigation to client-side transitions, made the desktop brand return to Overview, and allowed mobile navigation columns to match the role-visible destination count.
- Retained compatibility feedback styles for operational pages awaiting their own shared-alert migration.
- Added tests ensuring login exposes only the supported email/password contract and contains no Google/OTP controls.
- Added shell tests confirming unavailable destinations remain absent and supported links use client navigation.
- Updated the redesign plan to mark Stage 2 and the current-contract Stage 3 slice complete.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 25 tests across 13 test files.
- Production PWA build passed, generated the service worker and emitted individual chunks for each route.
- The entry bundle is 459.46 kB minified (145.66 kB gzip), down from 510.98 kB (156.67 kB gzip).

**Visual QA limitation:** The local workflow has no user-facing preview/browser automation tool, so responsive visual inspection at 390, 820 and 1440 px could not be claimed in this session. Responsive behavior is implemented in CSS and requires manual browser confirmation.

**Implementation boundary:** No authentication provider, API payload, business contract, role meaning or publication rule changed. OTP, recovery, Google sign-in, trials, AI first action and storefront controls remain unavailable until their contracts are approved.

**Next session target:** Implement Stage 4 by redesigning the Owner Command Centre around period selection, trustworthy status/attention hierarchy, qualified metrics, available next actions and honest empty/partial-data states.

### Session 017 — Owner Command Centre redesign

**Date:** 13 November 2026  
**Outcome:** Stage 4 is complete for the current backend contracts. The dashboard now behaves as an owner decision surface: it leads with recorded status, stock attention and real next actions, then presents period-aware figures and activity with every financial limitation intact.

**Completed:**

- Added accessible Today, Last 7 days and Last 30 days selection using the existing analytics and sales `startDate`/`endDate` parameters.
- Made the recorded-data briefing, sales metric, recent-sales query, empty copy and as-of context respond to the selected period.
- Reordered the dashboard around business attention and available operational actions before the financial snapshot and recent activity.
- Added direct actions for the implemented `/sales/new`, `/products/new` and `/products` workflows only; no speculative AI, customer, storefront or reporting action was introduced.
- Reduced the low-stock preview to the most urgent three products with an explicit route to the full inventory when more require attention.
- Kept cash received unavailable because the analytics contract does not supply it.
- Kept gross profit qualified because backend handling of missing cost prices is undefined.
- Kept unpaid sale balance explicitly separate from a verified customer debtor ledger.
- Preserved independent endpoint failure, retry, loading and empty states so one failed panel does not hide valid data from the others.
- Added component coverage for period query ranges, currently available next actions, financial distinctions and partial-data resilience.
- Updated `PRODUCT_DESIGN_REENGINEERING_PLAN.md` to mark Stage 4 complete.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 27 tests across 13 test files, including four Owner Command Centre tests.
- Production PWA build passed and generated the service worker.
- The route-split dashboard chunk is 11.47 kB minified (3.73 kB gzip); the entry bundle remains below the warning threshold at 459.50 kB minified (145.67 kB gzip).

**Visual QA limitation:** The local workflow still has no user-facing preview/browser automation tool, so responsive visual inspection at 390, 820 and 1440 px is not claimed. The responsive period selector and two-column action layout require manual browser confirmation.

**Implementation boundary:** The redesign adds no time-series visualization because the current analytics endpoint returns aggregate values only. It changes no API payload meaning, cache rule, route URL or RBAC authority; backend authorization remains authoritative.

**Next session target:** Begin Stage 5 by reviewing and redesigning the inventory list and product create/edit workflow around responsive records, low-stock actionability, validation, destructive-action hierarchy and permission-aware states.

### Session 018 — Inventory workflow redesign

**Date:** 13 November 2026  
**Outcome:** Stage 5 is complete for the current product contracts. Inventory discovery, stock attention and product maintenance now form one responsive workflow without introducing unsupported category taxonomies, stock movements or permission assumptions.

**Completed:**

- Migrated the inventory heading, empty/error feedback and product form to shared page, alert, field, input, select and textarea primitives.
- Added contract-backed product type and active-status filters alongside name, SKU and barcode search.
- Reset pagination when search or filters change and added a single clear-filters action for recovery from empty results.
- Added total-result and active-search context while preserving backend pagination and creation-date ordering.
- Kept low-stock state separate from active/inactive product state so the UI does not collapse inventory health and availability into one label.
- Added retry handling when the independent low-stock endpoint fails while keeping the main product list usable.
- Improved responsive table-to-card presentation, product identifiers, price/offer context, stock threshold context and explicit edit links.
- Reorganized product create/edit into product details, pricing, stock and availability sections with required-field semantics and field guidance.
- Preserved the full product payload, SKU conflict error handling, create/update routes, backend cache invalidation and existing action-based route guards.
- Added an active/inactive control backed by the existing `isActive` product property.
- Replaced the browser confirmation prompt with an owner-only, in-page two-step delete confirmation and retained backend deletion as the authority.
- Added inventory tests covering contract-backed filter parameters, separate stock/availability labels, edit routing and required form controls.
- Updated `PRODUCT_DESIGN_REENGINEERING_PLAN.md` to mark Stage 5 complete.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 29 tests across 14 test files.
- Production PWA build passed and generated the service worker.
- The product list route chunk is 7.51 kB minified (2.57 kB gzip), and the product form route chunk is 9.70 kB minified (3.17 kB gzip).
- The entry bundle remains below the warning threshold at 459.70 kB minified (145.78 kB gzip).

**Visual QA limitation:** The local workflow still has no user-facing preview/browser automation tool, so responsive inspection of the table-to-card transition, sticky form actions and desktop form sidebar at 390, 820 and 1440 px is not claimed. Manual browser confirmation remains required.

**Implementation boundary:** No category taxonomy, product image upload, stock-movement ledger, batch import or bulk update was added because those contracts do not exist. The current generic `user` role still cannot delete products; the delete control remains restricted by the provisional `product:delete` permission while backend authorization is authoritative.

**Next session target:** Begin Stage 6 by redesigning sales discovery, checkout, receipt detail and cancellation around fast merchant operation while preserving the distinctions between booked revenue, amount received and outstanding balance.

### Session 019 — Logo-led palette correction and sales workflow redesign

**Date:** 13 November 2026  
**Outcome:** The application palette now aligns materially with the supplied Trada logo and the PM handoff’s deep-navy/calm-teal direction. Stage 6 is also complete for current sales contracts, covering sales discovery, checkout, receipt review and guarded cancellation.

**Brand review and correction:**

- Reviewed `logo.jpeg` as a 1536 × 427 raster reference with a white background, deep blue-navy wordmark and calm blue-teal symbol.
- Local color sampling identified representative logo clusters near navy `#002848` and teal `#009890`.
- Replaced the previous saturated green masquerading as teal with logo-led navy and teal tokens.
- Added an accessible darker teal (`#007A73`) for buttons, active controls and focus states while retaining `#009890` as the brighter brand accent.
- Kept semantic success green, warning amber and error red separate from brand teal, as required by the PM design guidance.
- Replaced the dashboard’s green-tinted gradient with a solid deep-navy surface and updated teal highlight washes throughout the shell.
- Did not embed the JPEG as the production lockup because it has a white background, compression artifacts and no transparent/vector variant; the approved vector or transparent source remains required for final logo integration.

**Sales workflow completed:**

- Migrated sales headers, feedback, filters and checkout fields to shared accessible UI primitives.
- Added contract-backed sale-status filtering alongside receipt/customer search, payment status and start/end dates.
- Added result totals, clear-filters behavior and independent refresh of sales records and analytics.
- Preserved backend pagination and reset the page when filters change.
- Kept booked revenue distinct from money received and kept unpaid sale balance distinct from a verified customer debtor ledger.
- Qualified gross profit because backend treatment of missing product costs is still undefined.
- Added independent analytics failure disclosure without hiding available receipt records.
- Improved empty, filtered-empty, loading and retry states without adding fake sales data.
- Made unavailable inventory visible during checkout and disabled zero-stock inventory products in the selector.
- Clarified that amount received must represent money already collected and kept booked revenue, amount received and balance due separately auditable before submit.
- Preserved product availability checks, overpayment validation, sale payload structure, backend confirmation and post-create receipt navigation.
- Redesigned receipt detail around shared page hierarchy, line-item audit, payment summary and optional customer notes.
- Replaced browser confirmation with an owner-only two-step cancellation flow that clearly separates inventory restoration from customer refund confirmation.
- Added sales tests for supported filter parameters and qualified financial meanings while retaining checkout financial-distinction coverage.
- Updated `PRODUCT_DESIGN_REENGINEERING_PLAN.md` to mark Stage 6 complete.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 31 tests across 15 test files.
- Production PWA build passed and generated the service worker.
- Sales list is 7.95 kB minified (2.69 kB gzip), checkout is 9.00 kB (2.96 kB gzip), and receipt detail is 4.70 kB (1.86 kB gzip).
- The entry bundle remains below the warning threshold at 459.90 kB minified (145.87 kB gzip).

**Visual QA limitation:** Automated browser preview remains unavailable, so the corrected palette and responsive sales layouts still need manual inspection at 390, 820 and 1440 px. Contrast decisions were made through accessible token selection, but visual and assistive-technology confirmation is still required.

**Implementation boundary:** No payment collection, refund processing, customer ledger, printable receipt, stock movement history or new role authority was introduced. Backend authorization and transaction confirmation remain authoritative.

**Next session target:** Begin Stage 7 by aligning business settings and permission-denied states with the shared design system, then complete the provisional RBAC audit without implying storefront publication or undocumented staff authority.

### Session 020 — Business settings and permission-state alignment

**Date:** 13 November 2026  
**Outcome:** Stage 7 is complete for the current business and authorization contracts. Business identity editing now follows the shared design system, and unavailable actions use one truthful permission state without implying storefront publication, staff administration or authority the backend has not supplied.

**Completed:**

- Rebuilt business settings around shared page, surface, field, input, select, textarea, alert, badge and button patterns.
- Added explicit business-query loading, failure and retry states instead of allowing a failed request to remain indistinguishable from loading.
- Kept the editable scope limited to the existing business name, description, category and industry contract, with Nigerian naira shown as the currently fixed working currency.
- Presented the business as a private workspace and removed any suggestion that this screen publishes a storefront.
- Treated `isLive` only as a backend status flag; the interface explicitly does not interpret it as proof of a public storefront.
- Kept staff invitations and role-management controls unavailable because membership and permission contracts have not arrived.
- Centralized protected-route loading and denied-action presentation using shared feedback patterns.
- Made permission denials action-specific, disclosed the normalized interface role and stated that backend authorization remains authoritative.
- Removed the misleading instruction to ask a business owner, because no supported role-management or invitation workflow currently exists.
- Preserved the provisional action matrix for the backend's generic `user` role and all existing route guards; no frontend permission was promoted to security authority.
- Added component tests for private business settings and permission-denied behavior while retaining the business-resolution gate coverage.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Vitest passed 33 tests across 17 test files.
- Production PWA build passed and generated the service worker with 34 precache entries.
- Business settings is 6.27 kB minified (2.32 kB gzip); the entry bundle remains below the warning threshold at 462.05 kB minified (146.56 kB gzip).

**Test-run note:** An unstable test mock initially returned a new business object on every render and repeatedly retriggered the form synchronization effect. The fixture was made stable, scoped orphan test workers were cleared, and both focused and complete suites then passed. This was test-harness behavior, not a production defect.

**Visual QA limitation:** Automated browser preview remains unavailable, so settings composition, permission states, keyboard order, focus visibility and responsive behavior at 390, 820 and 1440 px still require manual browser confirmation.

**Implementation boundary:** No storefront publication, staff invitation, membership management or backend role contract was added. The current generic `user` mapping remains provisional, client guards remain presentation controls, and backend authorization is authoritative for every request.

**Next session target:** Begin Stage 8 release hardening with manual responsive and keyboard review, production smoke coverage for the supported registration-to-sale journey, sensitive-data inspection and a documented release checklist. Contract-blocked domains remain outside the release scope.

### Session 021 — Production product-response compatibility fix

**Date:** 13 November 2026  
**Outcome:** The production-only product creation error and empty inventory list were traced to response validation rather than failed requests. Product decimal values are now normalized consistently whether the API returns JSON numbers or database-decimal strings.

**Issue confirmed:**

- `POST /products` successfully created the record but returned a mixed representation: fields such as `quantity` and `costPrice` were strings while `stockThreshold` and `sellingPrice` were numbers.
- `GET /products` returned product quantities, thresholds and prices as decimal strings.
- The frontend product schema previously required numbers only, so Zod rejected the successful mutation response and RTK Query surfaced a UI error. The same validation failure rejected the complete list response before any item could render.
- The browser's `304 Not Modified` entry represented HTTP cache revalidation and was not the cause of the missing UI records.

**Completed:**

- Added a shared product-decimal response schema that accepts finite JSON numbers and non-empty numeric strings, then normalizes both to numbers for application use.
- Applied normalization to quantity, stock threshold, cost price, selling price and optional discount price.
- Applied the same normalization to low-stock quantities and thresholds.
- Centralized single-product and paginated-product parsing so create, detail and list endpoints use the same compatibility behavior.
- Preserved numeric request payloads; this change affects response compatibility only.
- Added regression coverage using the exact mixed create-response and string-decimal list-response patterns observed in production.

**Security follow-up required from backend:**

- The production product-list response embeds `createdBy.password`, containing the user's password hash. The frontend Zod schema strips unknown nested objects before application use, but this does not remove the exposure from the network response.
- The backend must exclude `password` and all other authentication secrets from every user serialization and nested relation. A shared safe-user serializer or explicit ORM field selection should be used, followed by an audit of all endpoints that include user records.
- Existing password hashes should be treated as disclosed to authenticated product-list consumers. The backend/security owner must assess credential reset or hash-rotation requirements according to the production incident policy.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Focused product contract, form and list coverage passed 10 tests across 3 test files.
- The complete suite passed 35 tests across 17 test files.
- Production PWA build passed and generated the service worker with 34 precache entries.
- The entry bundle remains below the warning threshold at 462.29 kB minified (146.70 kB gzip).

**Implementation boundary:** No backend record, request payload, inventory rule or cache policy changed. The fix tolerates the production API's documented decimal serialization while continuing to reject empty and non-numeric values.

**Next session target:** Verify product create → inventory list → edit against the deployed frontend after release, and prioritize backend removal of the nested password hash before broader production smoke testing.

### Session 022 — Production sales-response compatibility fix

**Date:** 13 November 2026  
**Outcome:** The production sale-recording UI error was confirmed as the sales equivalent of the product decimal mismatch. Successful sale responses, sales lists, receipt details, cancellations and analytics can now consume finite decimal strings without losing numeric behavior in the interface.

**Issue confirmed:**

- `POST /sales` returned `201 Created` and persisted the sale, but serialized sale totals, payment amounts, balances and line-item values as decimal strings.
- The frontend sales schema required numbers, so Zod rejected the successful response and RTK Query surfaced an error before checkout could navigate to the receipt.
- The same serialization pattern could prevent sales-list, receipt-detail and aggregate analytics responses from rendering.

**Completed:**

- Reused the finite decimal normalizer introduced for production product responses.
- Normalized sale subtotal, discount, tax, total, amount paid and balance due values.
- Normalized line-item cost price, unit price, quantity, subtotal, discount and total values.
- Applied compatible numeric normalization to sales analytics, including backend aggregate values that may be serialized as strings.
- Centralized single-sale and paginated-sales parsing so create, detail and list endpoints share the same response behavior.
- Preserved numeric checkout request payloads and all existing financial distinctions; this is response compatibility only.
- Added regression tests based on the observed production sale and line-item response.

**Security follow-up remains urgent:**

- The sale response also embeds `createdBy.password`. Frontend parsing discards the extra nested object, but the hash is still disclosed in the network response.
- Backend safe-user serialization and an endpoint-wide nested-user audit remain required; the frontend cannot remediate a secret already transmitted by the server.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Focused contract, checkout and sales-list coverage passed 12 tests across 3 test files.
- The complete suite passed 37 tests across 17 test files.
- Production PWA build passed and generated the service worker with 34 precache entries.
- The entry bundle remains below the warning threshold at 462.27 kB minified (146.70 kB gzip).

**Implementation boundary:** No sale calculation, payment rule, stock deduction, request payload, cache policy or backend record was changed. Empty and non-numeric response values continue to fail validation rather than being silently converted.

**Next session target:** Deploy the compatibility fixes, verify product creation and sale recording end to end against production, and block broader release sign-off until the backend removes password hashes from nested user responses.

### Session 023 — Explicit account menu and product-logo integration

**Date:** 14 November 2026  
**Outcome:** The misleading mobile profile interaction is corrected and the supplied Trada logo is integrated into the working application. Opening the account control no longer signs the user out; logout now requires an explicit labelled action.

**Issue confirmed:**

- The mobile top-bar profile icon was directly wired to the local sign-out handler. A control that visually communicated “profile” therefore cleared the session immediately and redirected to `/login`.
- Logout functionality existed, but only as frontend session cleanup: it clears authentication state, removes the stored browser session, resets RTK Query data and navigates to login.
- No backend logout or refresh-token revocation endpoint is present in the current API documentation, so the frontend cannot revoke a refresh token server-side.
- The supplied `logo.jpeg` had informed the palette but had not been rendered in the product; temporary letter `T` marks remained visible.

**Completed:**

- Replaced the mobile profile-as-logout control with an accessible account-menu trigger using `aria-expanded` and `aria-haspopup` semantics.
- Added an account menu that displays the current user name and normalized interface role.
- Added a separate, clearly labelled **Sign out** menu action; opening the menu alone does not alter authentication state or navigation.
- Preserved the existing desktop sign-out control and the full local cleanup sequence.
- Integrated the supplied logo asset into desktop navigation, mobile navigation, access screens and the route-loading state.
- Added responsive logo sizing and neutral white mounting surfaces because the supplied JPEG has an opaque white background.
- Added shell regression coverage proving that the account control opens first and logout occurs only after the explicit menu action.

**Authentication boundary:**

- Current sign-out removes the local session and cached business data, which is the strongest supported behavior with the available contract.
- Backend work is still required for refresh-token rotation/revocation and a documented logout endpoint. Once available, the frontend should call it before clearing local state, with local cleanup retained as a fallback.

**Verification:**

- ESLint passed with zero warnings.
- TypeScript type-check passed.
- Focused shell and authentication coverage passed 5 tests across 3 test files.
- The complete suite passed 38 tests across 17 test files.
- Production PWA build passed and generated the service worker with 34 precache entries.
- The entry bundle remains below the warning threshold at 462.77 kB minified (146.81 kB gzip).

**Visual QA limitation:** Automated browser preview remains unavailable. The logo sizing, white raster mounting surface and account-menu positioning still require manual inspection at 390, 820 and 1440 px.

**Asset limitation:** The supplied JPEG is now used, but a transparent SVG or high-resolution transparent PNG remains preferable for final production branding, particularly on the navy sidebar.

**Next session target:** Manually verify the account menu and logo at supported breakpoints, obtain a transparent/vector logo source, and integrate backend refresh-token revocation when the logout contract is delivered.

### Session 024 — AI module specification review and integration plan

**Date:** 16 November 2026
**Outcome:** The new AI endpoint specification was reviewed against Trada's initial product requirements and current merchant application. The API creates a viable foundation for voice-assisted sales and inventory capture, but no AI UI is enabled until it can honour the PRD's draft-first, reviewable and risk-aware record-creation rules.

**Specification reviewed:**

- Unified authenticated voice processing at `POST /voice` and `POST /voice/process` for sale, product creation and product update intent.
- Dedicated voice flows for sales, inventory creation/update and a currently viewed product.
- Image-based product creation using Vision.
- Browser-compatible base64/data-URL audio support, text fallback, Nigerian commercial language handling, and documented common errors.
- Voice endpoints provide `save: false` draft mode; their documented default remains `save: true` automatic persistence.

**PRD alignment and decision:**

- The endpoints support the established direction for Nigerian voice-assisted capture, manual fallback and product-photo assistance.
- The default auto-save behavior conflicts with the PRD: AI output is a draft, not an authoritative sale or inventory record, and consequential changes require review appropriate to risk.
- The frontend will never rely on the backend default. It must explicitly request `save: false`, render a correctable review state and require deliberate merchant confirmation.
- The image product endpoint has no documented draft mode, so it remains unavailable until the backend adds preview/confirmation behavior.
- Product update/restock voice results remain preview-only until quantity `add`/`subtract`/`set` has a stock-movement, audit, conflict and authorization contract.
- Ask Sabi, daily briefings, receipt/book ingestion, marketing generation, batch image capture and storefront AI remain future tracks because this specification does not provide their contracts.

**Recommended implementation order:**

1. Harden contracts: draft/confirm semantics, idempotency, field confidence/ambiguity, permissions, inventory safety, privacy/retention and complete failure behavior.
2. Implement text-first voice-sale drafts in existing checkout using `POST /sales/from-voice` with `save: false`; merchant review then uses the existing standard sale write endpoint.
3. Add browser microphone capture (`audio/webm`) only after the transcript path works, with permission, discard/re-record, size/duration, failure and manual fallback states.
4. Add voice-assisted product creation by prefilling the existing product form from a `save: false` draft.
5. Add product-edit suggestions as review-only, then defer photo capture and the unified assistant until draft and inventory-control contracts exist.

**Critical backend gaps recorded:**

- No immutable draft identifier/confirm endpoint or equivalent deterministic confirmation model.
- No idempotency contract to prevent duplicate sales after retries or repeated recording.
- No field-level confidence, unresolved-field or product-match candidate data.
- No approval/audit/permission model for AI-driven stock and price changes.
- No documented audio/image retention, consent, limits, quota/rate-limit or asynchronous processing contract.
- The known nested password-hash exposure must be fixed before broader AI production rollout.

**Deliverable:** Added `AI_MODULE_INTEGRATION_PLAN.md` containing endpoint inventory, PRD comparison, now-vs-later scope, backend decisions, phased end-to-end process, release gates and test safeguards.

**Implementation boundary:** This session added no AI routes, recording code, image upload, persistence call or new feature claim. Manual sales and product workflows remain canonical until the contract gates are met.

**Next session target:** Obtain the listed backend decisions, then implement the text-first draft-only voice-sale review slice with contract fixtures and no automatic persistence.

### Session 025 — Draft-only voice-sale checkout implementation

**Date:** 16 November 2026
**Outcome:** The first AI-assisted capture slice is implemented locally as a microphone-first, draft-only workflow inside the existing sale checkout. It neither creates a sale through an AI endpoint nor permits automatic persistence.

**Completed:**

- Added browser microphone capture using `MediaRecorder`, producing an `audio/webm` data URL for the documented API contract; start and stop are explicit and microphone permission failure has a clear fallback.
- Kept typed sale description as a secondary fallback for unavailable permissions, unsupported browsers or unsuccessful audio capture.
- Added a typed `POST /sales/from-voice` mutation that always sends `{ text, save: false }`, including normalization of documented decimal-string response fields.
- Added a visible review state that displays the returned transcript and proposed line items and explicitly states that no sale has been recorded.
- Limited draft application to an empty cart with valid quantities, prices and currently matched product IDs. The existing checkout remains the place to correct all values.
- Retained the normal confirmed `POST /sales` submission as the only action that records a sale; existing manual checkout remains the recovery path after an AI failure.
- Added contract and checkout tests covering a decimal-string draft response and incomplete-draft safety.

**Verification:**

- Focused API-contract and checkout coverage passed: 12 tests across 2 files.
- Full quality check passed: lint, typecheck, 40 tests across 17 files, and the production PWA build.
- The build generated 34 precache entries; the entry bundle was 463.90 kB minified (146.98 kB gzip).

**Live and backend gates still open:**

- Validate in a production test business that `save: false` performs no write and that the returned sale draft consistently supplies the fields used by checkout.
- Obtain the missing draft/confirm, idempotency, confidence, permissions, inventory-safety, privacy/retention and error contracts before widening the feature.
- Keep product image capture, stock-changing AI actions and the unified assistant out of production until their individual gates are met. Release microphone capture only after a live production-test-business smoke test confirms draft-only behavior.
- Resolve the known nested password-hash exposure before a broader AI rollout.

**Next session target:** Smoke-test browser audio and typed fallback against the draft endpoint once backend confirmation arrives, then add explicit consent, discard/re-record and size/duration controls before release.

### Session 026 — Browser audio preview before voice-draft processing

**Date:** 16 November 2026
**Outcome:** Voice-sale recording now has a browser-only review step before any audio is sent to the AI endpoint.

**Completed:**

- Added a live elapsed recording timer.
- After recording stops, display the duration and Blob file size with a native replay control.
- Added explicit **Prepare audio draft** and **Discard recording** actions; stopping a recording no longer immediately uploads it.
- Kept the audio only in in-memory browser Blob/Object URL storage. It is released when discarded, replaced or the checkout unmounts; no persistent frontend storage was added.
- Corrected the voice-draft schema to accept the backend's valid `sale: null` plus `extractedFields` response shape.

**Verification:** Focused API-contract and checkout coverage passed: 13 tests across 2 files. Web typecheck and diff hygiene passed.

**Known release gate:** A 413 response was observed for an approximately 137 KB JSON base64 audio request. Backend/DevOps must confirm and document the effective application/proxy/gateway body limit. The next frontend hardening pass should add a tested recording duration and encoded-payload-size guard based on that confirmed limit.

### Session 027 — Draft-only voice product creation

**Date:** 17 November 2026
**Outcome:** Voice-assisted creation is now available on the new-product form as a draft-only workflow. It shares the same merchant review and explicit-persistence safeguards as voice sales.

**Completed:**

- Added `POST /products/from-voice` with explicit `save: false` and `action: create` to the typed API layer.
- Added a tolerant product-draft schema for backend `product` and `extractedFields` result variants, including numeric normalization.
- Added microphone recording, elapsed time, temporary replay/discard and typed fallback to the new-product form only.
- Applied AI output solely as editable form defaults. The existing `POST /products` Save product action remains the only creation request.
- Kept voice-assisted editing/restocking out of scope: stock-changing suggestions require the outstanding inventory movement and audit contract.

**Verification:** Focused product-form and API-contract coverage passed: 12 tests across 2 files. Web typecheck and diff hygiene passed.

### Session 030 — Production product-list compatibility fix

**Date:** 17 November 2026
**Outcome:** Restored the product list when a production API response includes a nullable `stockThreshold`.

**Issue:** `GET /products` returned a successful cached response (`304 Not Modified`) with valid product records, but the product created by the image endpoint had `stockThreshold: null`. The client schema required a number, so one malformed/nullable field rejected the entire product array and surfaced a list error.

**Completed:**

- Added a nullable-decimal compatibility parser that renders an absent product or low-stock threshold as `0`.
- Added a regression fixture with a `null` threshold and a second valid product, proving the full list remains available.

**Verification:** Product-list and API-contract coverage passed: 14 tests across 2 files. Web typecheck and diff hygiene passed.

**Backend follow-up:** Product list and product-create responses should consistently serialize `stockThreshold` as a number. The image endpoint must map the recognized low-stock value rather than creating a record with `null`; the frontend fallback prevents a page failure but cannot recover the missing threshold intent.

### Session 029 — Preview-only voice product-update suggestions

**Date:** 17 November 2026
**Outcome:** Added a non-persisting product-update suggestion workflow to the product-edit page.

**Completed:**

- Added `POST /products/:id/from-voice` with explicit `save: false` to the typed API layer.
- Added a text-first proposed-change input and review result containing the transcript plus extracted quantity mode/quantity and selling-price suggestions.
- Made the preview explicitly non-applicable: no stock, price or field is changed from the AI response.
- Preserved the normal editable form and Save changes request as the only way to persist a product update.

**Reason for boundary:** `add`, `subtract` and `set` stock operations still lack the required inventory-movement, audit, stale-record and authorization contract. Browser microphone capture is intentionally deferred for this endpoint until that contract is documented.

**Verification:** Focused product-form and API-contract coverage passed: 12 tests across 2 files. Web typecheck and diff hygiene passed.

**Next session target:** Add the confirmed audio duration/payload guard, then implement product-update voice suggestions as preview-only once the inventory authorization/audit behavior is documented.

### Session 028 — Product-image endpoint contract test

**Date:** 17 November 2026
**Outcome:** Added an explicitly experimental UI for validating the production `POST /products/from-image` endpoint and observing its returned data shape.

**Completed:**

- Added base64/data-URL image submission with the required storage location.
- Added a local image preview, mandatory acknowledgement and immediate-creation warning before the request can be sent.
- Added a typed response parser for the returned created product and extracted fields, plus a link to inspect the created product after success.
- The feature is isolated from the normal form submission path and makes no request until the merchant deliberately confirms the test.

**Safety boundary:** This is a production-contract test only. The documented endpoint has no `save: false` mode and therefore immediately creates a product. It must not be presented as the standard product-image workflow until backend adds a draft/preview path, editable extracted fields and duplicate detection.

**Verification:** Focused product-form and API-contract coverage passed: 12 tests across 2 files. Web typecheck and diff hygiene passed.

### Session 031 — Three-module reference replication analysis

**Date:** 17 November 2026
**Outcome:** The three new mobile references were assessed against the current Dashboard, Sales and Inventory implementation, architecture, product requirements and received HTTP contract. A proposed visual-replication plan now separates safe reference fidelity from features that would invent data, weaken financial meaning or bypass AI/inventory safeguards.

**Completed:**

- Catalogued the shared reference language: mobile header, paired KPI cards, compact actions and lists, semantic status treatment and a raised five-item mobile dock.
- Mapped every major reference element to current code and contracts, distinguishing direct visual adaptations, safe derivations, product decisions and backend-blocked behavior.
- Defined module-specific target compositions and mobile, tablet and desktop responsive behavior.
- Drafted a staged end-to-end process covering product disposition, shared patterns, shell work, three vertical slices, contract-backed enhancements and release hardening.
- Added `THREE_MODULE_REFERENCE_REPLICATION_PLAN.md` as an implementation proposal. It does not approve the screenshots' sample data or depicted features as product requirements.
- Corrected the Part H implementation date and AI capability row to reflect the already logged draft-only voice and experimental image work.

**Product and contract findings:**

- Current contracts do not safely provide trend percentages, a daily sales time series, inventory valuation, stock-movement totals, a complete out-of-stock view, product media, notifications, a customer debtor ledger, invoices, suppliers/purchases or storefront sharing.
- The centre AI control can represent only capability-backed, review-first actions; it must not imply a unified assistant. The immediate-write image endpoint must not become the standard “Scan / Add with AI” action without draft/preview and duplicate-handling contracts.
- “Profit” must remain qualified as gross profit, and “Outstanding debts” must remain an unpaid sale balance unless a customer/payment ledger is delivered.
- A global date control is not approved: the same reference control has defined reporting behavior for Dashboard/Sales but no defined meaning for Inventory.
- “Quick Sale,” mobile “More” and four-card symmetry with unavailable data require explicit product decisions before implementation.

**Delivery and documentation risks:**

- Literal screenshot replication would expose unsupported claims and could misstate financial data; implementation must follow the element dispositions in the new plan.
- Resolved on 19 November 2026: the tracked product-requirements and backend-contract documents now use the `Trada_` prefix required by the repository instructions. The prior source-of-truth filename conflict is closed.
- Product images are absent from the current schema, and the supplied raster logo still needs a production transparent/vector source for faithful shell treatment.

**Verification:** Read-only audit of the three supplied images, current feature components, responsive CSS, shared shell/navigation, capability registry, API schemas, architecture, PRD, backend contract and existing focused tests. No application code or runtime behavior changed; automated test execution was not required for this documentation-only plan.

**Next session target:** Approve or amend the element-disposition tables and first delivery boundary, decide the centre action/More/Quick Sale behavior, then implement Stage 1 shared visual patterns before changing any module composition.

### Session 032 — Reference-led Dashboard, Sales and Inventory implementation

**Date:** 17 November 2026
**Outcome:** The first contract-safe implementation of the three supplied mobile reference direction is complete. The merchant shell and Dashboard, Sales and Inventory compositions now share the new mobile visual hierarchy, while keeping existing routes, access controls, data semantics and response-validation behavior intact.

**Completed:**

- Reworked the mobile dock into a five-position navy surface with a visually dominant raised centre **AI voice** action and a More menu; tablet rail and desktop sidebar behavior remain intact.
- Connected the centre action to a capability-aware voice launcher. It exposes only **Record a sale by voice** and **Add a product by voice** for permitted users, routes to the existing review-first flows and focuses the selected voice-capture section. It never starts the microphone or writes a record automatically.
- Replaced the mobile sale FAB in the authenticated product shell with the central AI launcher. Manual Record sale remains available from the Sales module.
- Applied the shared rounded KPI/action/card treatment to Dashboard, Sales and Inventory across the existing responsive layout.
- Added a truthful Inventory summary: total products and low-stock count use existing data; inventory value and stock movements explicitly remain unavailable because their aggregate/valuation contracts do not exist.
- Added a truthful Voice sale entry from Sales. It uses the existing draft-only checkout route rather than pretending that undefined Quick Sale behavior exists.
- Added shell regression coverage for the centre launcher and its draft-only routes.

**Verification:**

- TypeScript type-check passed.
- ESLint passed with zero warnings.
- Full Vitest suite passed: 43 tests across 17 files.
- Production PWA build passed: 34 precache entries; entry bundle 470.04 kB minified (148.49 kB gzip).

**Implementation boundaries and risks:**

- The centre control is a universal entry to the currently safe, focused voice flows; it is not a general `/voice` assistant because that endpoint has not yet been integrated with a complete review, confidence, idempotency and action-routing contract.
- The browser still requires a separate user gesture before microphone permission or recording. This is intentional security and browser behavior.
- Trend charts/percentages, notifications, inventory valuation, stock movements, product imagery, debtors, storefront actions and photo-based standard product capture remain absent or gated as recorded in Session 031.
- Manual visual and assistive-technology inspection at 360, 390, 768, 1024, 1200 and 1440 px remains required; automated component checks cannot substitute for this review.

**Next session target:** Perform the cross-breakpoint visual/keyboard review, then refine spacing and density from that evidence before considering any contract-blocked reference capability.

### Session 033 — AI draft-and-review contract v2 review

**Date:** 17 November 2026
**Outcome:** Reviewed the backend's v2 AI contract. It formalizes the review-first safeguards required by the PRD and supersedes the earlier immediate-write image assumption.

**Confirmed backend improvements:**

- All AI routes now default to `save: false`; draft requests guarantee no record, ID, receipt number or stock change.
- Draft responses provide `isDraft: true` and a `data.draft` payload intended to be submitted, after merchant edits, to the standard sale/product write API.
- Sales drafts now include hydrated totals, payment values, product-match confidence/candidates, ambiguity metadata and a top-level confidence result.
- Product-update drafts now provide an explicit stock-movement diff and concurrent-record timestamp; product-image extraction now supports draft/preview rather than immediate creation.
- Write routes support idempotency keys, sensitive user fields are excluded from responses, decimals are native JSON numbers, and production limits are documented: 50 MB request maximum, recommended audio <= 10 MB / 60 seconds, images <= 5 MB, and frontend timeout 45 seconds.

**Required frontend adaptations:**

- Replace legacy `sale`/`product`/`extractedFields`-first parsing and mapping with the canonical `data.draft` model while retaining transitional compatibility until production confirms the new response shape.
- Submit an idempotency key with every confirmed `POST /sales` request and propagate the returned key in draft confirmation; add the documented 45-second AI-request timeout.
- Enforce the published client-side media limits before data-URL conversion/upload and expose duration/size feedback.
- Render confidence, ambiguity warnings and candidate-product selection in the sale review. Require an explicit merchant selection for ambiguous or low-confidence matches.
- Replace the experimental, immediate-create image test with a preview that pre-fills the normal editable product form; only its regular Save product action may persist.
- Upgrade product-update review to display the current-to-proposed stock diff and apply only the reviewed `draft` through the normal PATCH flow, retaining current stale-record/permission safeguards.

**Release gate:** Validate each new response against production with a non-sensitive test business before removing compatibility handling or enabling the unified `/voice` entry point. The documented confirmation table still needs an explicit standard-product-write idempotency statement if product creation must be retry-safe.

### Session 034 — AI contract v2 frontend adaptation

**Date:** 17 November 2026
**Outcome:** Adapted the currently delivered AI surfaces to the v2 draft-and-review contract without enabling automatic AI persistence.

**Completed:**

- Extended typed AI response parsing for `isDraft`, canonical `draft` payloads, confidence, ambiguity, candidate matches and product-update stock-movement data; retained legacy response compatibility during the backend rollout.
- Added the documented 45-second request timeout and an `Idempotency-Key` header for confirmed sales. A reviewed sale draft preserves its supplied key; a manual sale receives a client-generated key and retains it for a retry after a failed response.
- Enforced client-side audio limits before base64 conversion/upload: 60 seconds and 10 MB. Product-image selection now rejects files above 5 MB.
- Replaced the experimental immediate-create image test with `save: false` draft preparation. The merchant can apply extracted fields to the existing editable product form; the normal Save product action remains the only product creation request.
- Updated sale review to consume canonical draft fields, show confidence/ambiguity and candidate-product warnings, and prevent automatic cart application where the response needs manual merchant verification.
- Updated product voice creation to prefer canonical draft fields and product-update review to show the returned current/delta/resulting stock summary.

**Verification:** Web typecheck passed. Full Vitest suite passed: 45 tests across 17 files, including new v2 voice-sale and image-draft API-contract fixtures.

**Outstanding backend decisions:** The contract does not yet state whether review metadata in `data.draft` is accepted by `POST /sales`, and it does not define how `stockMovement.currentUpdatedAt` must be submitted to PATCH or how a stale write is reported. The frontend deliberately keeps those paths under manual review pending that response.

**Next session target:** Live-smoke-test v2 draft responses with a non-sensitive test business, then add selectable candidate matching and a product-update confirm path only when the remaining payload and optimistic-concurrency semantics are specified.

### Session 035 — Candidate-match correction and protected voice product update

**Date:** 18 November 2026
**Outcome:** Incorporated the backend’s product-update concurrency contract and corrected the meaning of candidate product matches in the sale review.

**Completed:**

- Candidate matches are now presented as recognition-comparison evidence for the primary voice-to-product match. They no longer block checkout application by themselves; explicit ambiguous fields or low overall confidence still require manual checkout review.
- Added `currentUpdatedAt` to the typed product PATCH payload and submit the draft’s `stockMovement.currentUpdatedAt` when a merchant applies a reviewed voice update.
- Enabled a deliberate **Apply reviewed update** action only where the backend returned both a product-update `draft` and a stock-movement snapshot.
- Added a 409 `CONCURRENT_MODIFICATION` resolution state showing the live stock and selling price, with options to recalculate the voice draft or explicitly overwrite using the supplied fresh server timestamp.

**Verification:** Web typecheck and lint passed. The relevant business-route tests passed in isolation after the full parallel suite experienced unrelated 5-second timing failures; a serialized full-suite run exceeded the local command time limit. The AI contract suite remains green.

**Boundary:** Candidate matches are useful evidence, not proof that the first product is correct. The merchant remains responsible for reviewing the recognised primary product and the resulting sale or inventory change.

### Session 036 — Landing-aligned authentication visual system

**Date:** 18 November 2026
**Outcome:** Re-engineered the sign-in, registration and business-onboarding presentation around the live Trada landing page and the final PM auth references while preserving the supported authentication and onboarding contracts.

**Completed:**

- Added a reusable transparent `BrandLogo` component with dark- and light-surface variants, plus standalone dark and light SVG brand marks. The supplied JPEG is no longer placed as a white rectangle on coloured surfaces.
- Centralised the auth story in the shared layout using the approved hero, supporting statement and four benefit messages from the final references.
- Aligned the module with the landing-page visual language: deep navy-to-teal surfaces, aqua emphasis, Bricolage Grotesque display type, Figtree body type, translucent benefit cards and softer form surfaces.
- Refined the responsive composition into a two-column desktop experience and a compact mobile story with a readable 2-by-2 benefit grid followed by the account form.
- Updated the sign-in and registration page headings without changing their fields, validation, API calls or navigation behavior.
- Retained the current email-and-password sign-in contract and the existing registration fields. Phone sign-in, OTP, social login and combined business creation were not inferred from the concept images.

**Product and asset boundaries:**

- The auth copy now reflects the approved marketing direction, including website and BNPL outcomes. This visual/copy alignment does not mark storefront or BNPL workflows as newly implemented; capability status remains unchanged and those actions must stay gated until their product and backend contracts are delivered.
- The merchant/business-owner scene from the PM composites was not extracted from a screenshot or embedded as a production asset. A licensed, approved original photograph or illustration is still required before that scene is added faithfully.
- The new transparent marks are code-native reproductions of the supplied raster logo for immediate interface use. An official vector brand master should replace them if brand supplies one later.

**Verification:** ESLint and TypeScript checks passed. Focused sign-in, registration and business-onboarding tests passed: 3 tests across 3 files. The production PWA build passed with 34 precache entries. Desktop and mobile auth renders were inspected locally after the responsive adjustments.

**Next session target:** Review the next screen module against the same landing/reference language, then classify every proposed visual or content change as direct implementation, contract-gated behavior or missing production asset before editing it.

### Session 037 — Mobile auth sheets and desktop scroll containment

**Date:** 18 November 2026
**Outcome:** Simplified the first mobile authentication view and corrected desktop overflow behavior without changing authentication data or API contracts.

**Completed:**

- Collapsed the sign-in and registration forms behind route-specific mobile calls to action: **Sign in** and **Get started**.
- Added a full-height form sheet that animates upward over the auth story, preserves entered values, provides a persistent close control and returns to the story when dismissed.
- Added keyboard behavior: Escape closes an open sheet, focus returns to its trigger, and the trigger exposes its expanded state to assistive technology.
- Added the alternate account route beneath each mobile trigger. A successful registration redirect opens the sign-in sheet immediately so its confirmation message is not hidden behind the story.
- Kept business onboarding on the existing non-collapsed layout; the sheet behavior is explicitly enabled only by sign-in and registration.
- Constrained the desktop auth layout to the viewport, removed the unnecessary story-panel scrollbar and made the account-form panel the only independently scrollable column.
- Hid scrollbar chrome while retaining mouse-wheel, trackpad, touch and keyboard scrolling on the longer registration form.

**Verification:** ESLint and TypeScript checks passed. Focused sign-in, registration and business-onboarding coverage passed: 3 tests across 3 files, including open/close state assertions. The production PWA build passed with 35 precache entries. Closed and open mobile states were inspected at 500 by 1000 pixels, and desktop registration was inspected at 1440 by 800 pixels.

**Boundary:** This is a presentation and navigation-state change only. Registration fields, sign-in fields, validation rules, authentication requests, redirects and RBAC behavior remain unchanged.

**Next session target:** Continue the module-by-module visual review with the next screen selected by product, reusing the established brand hierarchy and documenting any proposed behavior that exceeds the available frontend or backend contract.

### Session 038 — Mobile and tablet auth overflow correction

**Date:** 18 November 2026
**Outcome:** Removed the remaining mobile/tablet auth overflow and added a resilient composition for short-height devices.

**Root cause:** The story content fit the tested viewports, but the large decorative ring pseudo-elements extended beyond the story boundary. Because the story had become a scroll container, those decorations increased its horizontal and vertical scrollable area even though no content element crossed the viewport.

**Completed:**

- Clipped decorative story artwork at the mobile/tablet panel boundary so it no longer creates horizontal or vertical scrolling.
- Preserved the fixed one-screen story and upward form-sheet interaction.
- Added a short-height responsive mode that reduces spacing, logo and heading scale, control height and trust-copy density.
- On narrow short phones, removed benefit descriptions while retaining every benefit title and icon so the primary action and trust statement remain visible without scrolling.

**Verification:** Exact browser emulation confirmed document width and height matched the viewport at 390 by 844, 768 by 1024, 390 by 667 and 768 by 600 pixels. The standard phone, short phone, portrait tablet and short tablet-landscape compositions were visually inspected. The production PWA build passed with 35 precache entries, and diff hygiene passed.

**Boundary:** The account form sheet remains independently scrollable where the registration fields are taller than the available device height; only unintended story/page overflow was removed.

### Session 039 — Viewport-relative auth spacing and focus-zoom prevention

**Date:** 18 November 2026
**Outcome:** Rebalanced mobile and tablet auth composition against the available screen height and removed automatic mobile-browser zoom when focusing account fields.

**Completed:**

- Replaced the mobile/tablet story's compressed flex distribution with a three-row viewport grid: brand at the top, the main story and action centred within the available middle region, and the trust statement anchored at the bottom.
- Converted outer padding, inter-section gaps, headline margins, benefit spacing, action spacing and trust padding to bounded `svh` values so taller tablets gain breathing room while short phones remain compact.
- Retained the separate short-height mode and narrow-phone benefit simplification established in Session 038.
- Set authentication input, select and textarea text to 16 pixels. This prevents iOS Safari's automatic focus zoom without disabling user-controlled pinch zoom or changing the viewport accessibility policy.

**Verification:** Exact browser emulation confirmed a viewport-sized document, grid story layout and 16-pixel form-control text at 390 by 844 and 768 by 1024 pixels. A 390 by 667 short-phone layout was also inspected and retained clear separation between the brand, content and trust regions. The production PWA build passed with 35 precache entries, and diff hygiene passed.

**Boundary:** Height-relative spacing changes only the presentation layer. The mobile sheet interaction, authentication requests, validation, redirects and RBAC behavior remain unchanged.

### Session 040 — Dynamic mobile viewport lock

**Date:** 18 November 2026
**Outcome:** Removed the remaining iOS Safari white strip and page-shift behavior by making the auth experience a true viewport-locked surface.

**Root cause:** The auth story used the static small-viewport unit (`svh`). When Safari's address or navigation chrome changed the visible viewport, the document could retain a vertical scroll offset while the story stayed at the smaller static height. This shifted the logo above the visible area and exposed the white document background beneath the story.

**Completed:**

- Added a scoped document viewport lock while sign-in or registration is mounted; the class is removed automatically when leaving those routes.
- Pinned the mobile/tablet auth layout to the viewport with fixed positioning and `inset: 0`, preventing body scrolling and rubber-band exposure of the page background.
- Added dynamic viewport height (`dvh`) for the layout, story and form sheet while retaining `svh` as the compatibility fallback.
- Added regression coverage confirming the viewport-lock class is active on the login experience.

**Verification:** At a 390 by 844 emulated viewport, the document and auth layout were exactly 844 pixels high and a forced 200-pixel page-scroll attempt remained at `scrollY: 0`. After changing the live viewport height to 720 pixels to simulate mobile browser chrome, the document and layout both immediately became exactly 720 pixels high with top `0`, bottom `720` and no exposed body area. The compact result was visually inspected. ESLint, TypeScript, 2 focused auth tests and the production PWA build passed.

**Boundary:** The registration form sheet can still scroll internally when its fields exceed the available height. The page and story themselves are locked to the visible viewport.

### Session 041 — Expanded mobile story distribution

**Date:** 18 November 2026
**Outcome:** Used more of the available mobile centre height for meaningful auth content and removed the login workspace notice.

**Completed:**

- Grouped the story into an introduction, benefit grid and account action so the mobile/tablet middle region can distribute those sections rather than centre one compact natural-height block.
- Made the middle content stretch across its available grid row and distribute its three groups with viewport-relative gaps.
- Added a no-trust story variant so removing the bottom notice also removes its unused grid row.
- Removed “Your workspace is available only to authenticated and authorised users” from the login experience. Registration retains its separate password-security assurance.
- Added regression coverage confirming the removed login message is not rendered.

**Verification:** At 390 by 844 pixels, the middle story region occupied 723 pixels while the document remained exactly one viewport high and no login trust message was present. The composition was visually inspected. ESLint, TypeScript, 2 focused auth tests and the production PWA build passed.

**Boundary:** This changes auth presentation only. The login form, request, validation, redirects and access-control behavior are unchanged.

### Session 042 — Draggable mobile auth sheet and spacing refinement

**Date:** 18 November 2026
**Outcome:** Improved the mobile/tablet auth hierarchy and converted the form-sheet handle from a decorative element into a working drag control.

**Completed:**

- Added more responsive separation between the introductory heading/subtext and the business-benefit grid.
- Increased the gap below the primary “Get started” or “Sign in” action and increased the alternate-account text size for clearer reading and tapping context.
- Limited the open account form sheet to 80 percent of the dynamic viewport, leaving the branded top region and Trada logo visible.
- Added touch, pen and mouse pointer handling to the sheet bar. Users can drag down to dismiss the sheet; an incomplete gesture returns it to the open position.
- Kept the close button as an explicit keyboard-accessible alternative and retained independent form scrolling inside the shortened sheet.

**Verification:** ESLint, TypeScript, focused authentication tests and the production PWA build were run after integration.

**Boundary:** The sheet only follows downward gestures and closes after a bounded distance threshold. Authentication requests, field validation, redirects and RBAC behavior are unchanged.

### Session 043 — Shared password visibility and form focus refinement

**Date:** 19 November 2026
**Outcome:** Standardised password visibility controls through the shared UI package and simplified focused form-field styling.

**Completed:**

- Confirmed that project forms use shared `FormField`, `Input`, `Select` and `Textarea` primitives from `@trada/ui`.
- Added a reusable `PasswordInput` primitive with accessible show/hide labels, pressed state and eye icon feedback.
- Integrated the shared password control into login, registration password and registration confirmation fields while retaining autocomplete, minimum length and required attributes.
- Removed the shared input/select/textarea focus shadow so focused fields use the existing border without an additional outer ring.
- Added authentication regression coverage for toggling a password between concealed and visible states.

**Verification:** ESLint, TypeScript, focused authentication tests and the production PWA build were run after integration.

**Boundary:** Password visibility is local presentation state only. Password values, validation, browser autocomplete and API request payloads are unchanged.

### Session 044 — Responsive two-stage business onboarding

**Date:** 19 November 2026
**Outcome:** Brought business onboarding into the authentication visual flow and reduced mobile/tablet form density with a guided two-stage setup.

**Completed:**

- Reused the authentication split-page presentation on desktop and its draggable bottom-sheet reveal on tablet and mobile.
- Added a “Set up your business” story action that opens the onboarding form while keeping Trada branding visible above the 80-percent-height sheet.
- Split tablet/mobile onboarding into two stages: business name and description first; category, working currency and industry second.
- Added first-stage completion validation, responsive progress feedback, forward navigation and a back action that preserves entered values.
- Kept both onboarding sections visible together on desktop, where the right-side panel remains independently scrollable.
- Removed the signup password-security footer and both duplicated onboarding privacy notices from the bottom of their respective experiences.

**Verification:** ESLint, TypeScript, focused authentication and business-onboarding tests, and the production PWA build were run after integration.

**Boundary:** The business creation request contract is unchanged. The frontend still submits name, description, category, currency and industry only after explicit final confirmation.

### Session 045 — Two-stage onboarding across every breakpoint

**Date:** 19 November 2026
**Outcome:** Extended the guided onboarding sequence to desktop so every device follows the same two-step business setup model.

**Completed:**

- Changed desktop onboarding from a combined long form to the same sequential stages used on tablet and mobile.
- Stage one now exclusively collects business name and description; stage two collects category, currency and industry.
- Made Continue, Back, progress state and first-stage validation consistent across all breakpoints.
- Retained the desktop split-page shell and independently scrollable right-side panel.

**Verification:** ESLint, TypeScript, focused onboarding tests and the production PWA build were run after integration.

**Boundary:** This is a presentation and client-state change only. The final business creation payload and endpoint remain unchanged.

### Session 046 — Reference-led dashboard overhaul

**Date:** 19 November 2026
**Outcome:** Rebuilt the owner dashboard around the approved mobile reference while preserving strict boundaries between live backend data, unavailable aggregates and future product capabilities.

**Data-model review:**

- Confirmed that `GET /sales` supplies item-level transaction records, amount paid, balance due, payment status and creation timestamps.
- Confirmed that `GET /sales/reports/analytics` is the source of truth for total sales count, revenue, gross profit and unpaid sale balance across a requested inclusive date range.
- Confirmed that `GET /products/alerts/low-stock` supplies the live low-stock notification count and expandable product details.
- Confirmed that the reported 19 November “Today” empty state is consistent with the supplied records, whose newest `createdAt` values are dated 18 November. A `304 Not Modified` response is a valid browser-cache response and not the source of the empty data.
- Kept inventory value unavailable because no trustworthy aggregate contract currently supplies it. The dashboard does not estimate this value from a partial product page.

**Completed:**

- Added time-aware morning, afternoon and evening greetings and adopted the reference subtitle.
- Replaced the fixed period tabs with a mobile collapsible calendar/range control and desktop inline controls for a selected date plus 7, 14 and 30-day ranges.
- Simplified summary cards to icon, label and value only; removed qualification badges and warning copy, and added an animated dash for unavailable values.
- Replaced the standalone low-stock and next-action cards with a reference-led Quick Actions grid. Low stock now carries a live count badge and toggles its detail panel.
- Added a visually distinct Share Store and BNPL preview with an explicit in-development loading state and disabled “Coming soon” action.
- Renamed the sales list to Recent Transactions and used sale item names while retaining receipt, payment status, amount and timestamp context.
- Removed the dashboard briefing card and added the recorded-data briefing to the central AI modal alongside the existing draft-safe voice actions.
- Added focused dashboard and shell regression coverage for date-range queries, unavailable metric states, low-stock disclosure, future-feature boundaries and AI briefing placement.

**Verification:** ESLint and TypeScript checks passed. Focused dashboard and AppShell coverage passed: 8 tests across 2 files. The production PWA build passed with 36 precache entries, and diff hygiene passed.

**Visual QA limitation:** Responsive behavior is implemented for the compact filter, metric grid, quick-action disclosure and Store/BNPL preview, but browser-level visual inspection at phone, tablet and desktop widths is not claimed in this session and remains a manual acceptance step.

**Boundary:** Share Store, BNPL, inventory valuation, invoice creation and a verified debtor ledger remain unavailable. The dashboard does not expose them as working actions or infer unsupported figures.

### Session 047 — Dashboard visual hierarchy correction

**Date:** 19 November 2026
**Outcome:** Corrected the dashboard composition so the greeting and financial summary remain at the top, Quick Actions and the Store/BNPL preview form the middle content band, and recent transactions follow below.

**Completed:**

- Identified a legacy dashboard `order` rule that could place unordered reference-dashboard sections ahead of the greeting and summary despite their correct source order.
- Scoped a final order reset to the reference dashboard so its semantic document order remains authoritative without changing older dashboard variants.
- Grouped Quick Actions and the Store/BNPL preview into a responsive middle grid: stacked on compact screens and presented side-by-side from desktop widths.
- Added regression coverage confirming the greeting precedes the summary and that both middle modules share the same layout group.

**Verification:** ESLint and TypeScript checks passed. Focused dashboard coverage passed: 6 tests in 1 file. Diff hygiene passed.

**Boundary:** This session changes dashboard layout only. It does not activate Store, BNPL or any new backend capability.

### Session 048 — Dashboard reference-order fidelity

**Date:** 19 November 2026
**Outcome:** Corrected the responsive dashboard composition to follow the approved reference image as one continuous vertical hierarchy at every breakpoint.

**Reference mapping:**

1. Greeting and date control.
2. Two-by-two business summary.
3. Quick Actions row.
4. Full-width Store/BNPL banner.
5. Full-width Recent Transactions panel.

**Completed:**

- Removed the desktop-only side-by-side treatment of Quick Actions and the Store/BNPL banner.
- Kept both middle modules in their reference order and at full available width on mobile, tablet and desktop.
- Preserved capability-safe content: unsupported invoice, debtor, live storefront and BNPL actions are not presented as operational features merely to copy the concept image.

**Verification:** ESLint, TypeScript, focused dashboard coverage and diff hygiene passed.

**Boundary:** This is a visual-order correction only. Existing live data mappings, route permissions and future-feature restrictions remain unchanged.

### Session 049 — Localhost-verified dashboard order fix

**Date:** 19 November 2026
**Outcome:** Fixed the CSS cascade that still placed Quick Actions and Store/BNPL ahead of the summary in the real localhost render, then verified the final hierarchy in headless Chrome against `localhost:5173`.

**Root cause:**

- Legacy dashboard rules assigned explicit order values to the heading, metrics, action grid, warning, sales panel and footnote.
- The first reference-dashboard reset did not override the two-class metrics selector because its selector specificity was lower, so component source order and DOM-level tests did not match the browser layout.

**Completed:**

- Removed the obsolete dashboard order declarations so the semantic component order is also the rendered grid order.
- Verified the stylesheet served by the active Vite development server rather than relying only on the source file.
- Rendered the real dashboard component on a temporary contract-valid localhost harness and captured it in a clean Chrome profile at 744 × 1200 pixels.
- Visually confirmed the final sequence: greeting and date filter, summary grid, Quick Actions, Store/BNPL banner, Recent Transactions.
- Removed the temporary visual harness after verification; no test-only route or fixture remains in the application.

**Verification:** Localhost browser capture passed at 744 × 1200 pixels. ESLint, TypeScript, focused dashboard coverage and diff hygiene passed.

**Boundary:** The browser fixture was used only to verify layout and was removed immediately afterward. Production API behavior and authentication state were not changed.

### Session 050 — Reference-led sales activity simplification

**Date:** 19 November 2026
**Outcome:** Reworked the sales activity module around the approved reference’s copy and compact information hierarchy while retaining the existing live analytics, filters, pagination and sale-detail routes.

**Completed:**

- Replaced the prior hero with the exact reference text: “Sales” and “Record sales, view performance and track revenue.”
- Reduced each sales summary card to its metric title and primary figure. Removed icons, qualification badges and explanatory notes from the card surface.
- Preserved financially explicit metric names: Recorded sales, Booked revenue, Gross profit and Unpaid sale balance.
- Replaced the dense receipt table with a compact sales list showing product and quantity, transaction timestamp, payment method and total amount only.
- Kept receipt numbers available in the detail-link accessible name while removing them and the separate received, balance, payment-status and sale-status fields from the visual list.
- Used the first sold item as the row label, included its quantity when greater than one, and indicated additional item lines without inventing a summary product.
- Retained the complete receipt, payment and balance breakdown on the existing sale-detail route.
- Corrected list semantics to `ul > li > a`, preserving both list structure and keyboard-accessible navigation.

**Verification:** ESLint and TypeScript checks passed. Focused sales-list coverage passed: 3 tests in 1 file. A contract-valid localhost render was inspected in Chrome with an emulated 390 × 1200 mobile viewport; `innerWidth`, `clientWidth` and `scrollWidth` all measured 390 pixels. Diff hygiene passed.

**Boundary:** The redesign changes presentation only. Analytics meanings, backend queries, supported filters, pagination, RBAC and sale-detail data remain unchanged.
### Session 051 — Collapsible sales filters and centered controls

- Consolidated `Record sale`, `Voice sale`, and `Filter` into a centered sales toolbar directly beneath the page heading.
- Collapsed the receipt, payment, status, and date filters by default behind an accessible toggle with explicit expanded state.
- Kept active-filter visibility through a toolbar status indicator while preserving clear and refresh controls in the results region.
- Grouped the `From` and `To` date inputs into a single responsive flex row on mobile and desktop.
- Reduced the mobile filter trigger to an accessible icon control so the centered three-control toolbar stays within the viewport.
- Stacked each date label above its native date input within the shared row so mobile date values and picker controls remain legible.
- Added focused coverage for the collapsed default state, toggle behavior, and submitted filter contract.

### Session 052 — Inventory filter and action-toolbar parity

- Applied the Sales control pattern to Inventory with a centered `Add product`, `Voice product`, and `Filter` toolbar.
- Connected `Voice product` to the existing `/products/new?ai=voice` workflow without introducing a new backend capability.
- Collapsed product search, type, and active-status filters behind an accessible toggle with explicit expanded state.
- Preserved the existing product-query contract and moved clear and refresh controls into the results row.
- Added the same active-filter indicator and compact mobile filter trigger used by Sales to prevent horizontal overflow.
- Added focused coverage for collapsed filter behavior, query submission, and toolbar destinations.

### Session 053 — Inventory summary-card parity

- Reduced Inventory summary cards to the same title-and-value structure used by Sales.
- Removed summary icons, warning icon treatments, qualification badges, and explanatory footnotes.
- Replaced unsupported Inventory value and Stock movement figures with neutral em dashes instead of presenting unavailable-state copy inside the cards.
- Preserved the separate actionable low-stock alert and product-row status indicators.


### Session 054 — Cross-module UI consistency audit and shared-component polish

**Date:** 19 November 2026
**Outcome:** Audited the entire user workflow across auth, onboarding, dashboard, sales and inventory for interaction inconsistencies, then unified reusable UI components (inputs, buttons, form fields, badges, metric cards, back links, formatters) across all views.

**Completed:**

- Produced a visual workflow audit artifact mapping the complete user journey from registration through dashboard, sales and inventory with a Mermaid flow diagram and identified nine priority issues (P1–P9).
- **P1 — Cart inputs:** Replaced 3 raw `<input>` elements in `SaleCheckoutPage` (quantity, unit price, item discount) with `<Input>` from `@trada/ui`.
- **P2 — Filter buttons:** Replaced raw `<button>` elements in `SalesListPage` and `ProductListPage` with `<Button>` and `<Button variant="ghost">` from `@trada/ui`.
- **P3 — Field wrappers:** Created shared `TextField` and `NumberField` in `apps/web/src/components/FormFields.tsx` with a `showRequiredMarker` prop. Replaced local `CheckoutField`, `SettingsField`, `BusinessField` and local `TextField`/`NumberField` from `ProductFormPage`. `AccountField` in `RegisterPage` was deliberately retained because it branches between `PasswordInput` and `Input`.
- **P4 — Voice recording hook:** Created `apps/web/src/lib/useVoiceRecording.ts` extracting the shared MediaRecorder pattern. The hook is ready but not yet wired into consumers.
- **P5 — Utility consolidation:** Extended `lib/formatters.ts` with `formatStatus`, `formatRecordingDuration`, `formatFileSize`, `localDateKey`, `recordingToDataUrl` and `fileToDataUrl`. Removed duplicates from `SaleDetailPage`, `SalesListPage`, `SaleCheckoutPage`, `ProductFormPage`, `OwnerDashboard` and `App`.
- **P6 — StatCard adoption:** Replaced local `Metric` in `SalesListPage`, `InventoryMetric` in `ProductListPage` and `Surface`-based metric cards in `OwnerDashboard` with `StatCard` from `@trada/ui`.
- **P7 — Badge tone prop:** Added a `tone` prop (`success | warning | error | info`) to `Badge` in `packages/ui`, moved default colours from `.sd-badge` to `.sd-badge--success`, added error and info tone styles, and updated `SaleDetailPage` and `BusinessSettingsPage` to use the prop instead of className overrides.
- **P8 — BackLink component:** Created `apps/web/src/components/BackLink.tsx` and replaced raw `<Link className="back-link">` in `SaleDetailPage`, `SaleCheckoutPage`, `ProductFormPage` and `BusinessSettingsPage`.
- **P9 — Eyebrow consistency:** Fixed duplicate eyebrow/title in `LoginPage` (eyebrow→"Sign in", title kept "Welcome back" for test compatibility), `ProductListPage` (eyebrow "Inventory", title "Products"), added missing eyebrow to `SalesListPage`, and replaced raw `<header>` with `<PageHeader>` in `OwnerDashboard`.
- **Additional:** Changed `BusinessOnboardingPage` default post-setup destination from `/products/new` to `/` (dashboard) for a less disorienting first-run experience.

**Verification:**

- TypeScript type-check passed with zero errors.
- Vitest passed 17 test files, 49 tests, all green.
- 13 files modified, 3 new files created.

**Limitations:**

- `AccountField` in `RegisterPage` was not unified into the shared `TextField` because it branches between `PasswordInput` and `Input` based on field type.
- `useVoiceRecording` hook was created but not yet wired into `SaleCheckoutPage` or `ProductFormPage`; inline recording code remains in place.
- `--sd-blue-700` does not exist in design tokens; Badge info tone uses `--sd-navy-700` as a substitute.

**Product decisions recorded:**

- Business onboarding default destination changed from `/products/new` to `/` (dashboard).

**Delivery risks:**

- Some legacy CSS classes (`.sales-metric`, `.inventory-metric`, `.inventory-filters__apply`) may now be unused after `StatCard` adoption. A CSS audit pass would confirm and clean these up.

**Next session target:** Wire the `useVoiceRecording` hook into `SaleCheckoutPage` and `ProductFormPage`, consider unifying `AccountField`, and perform a dead-CSS cleanup pass.

### Session 055 — Current-date dashboard query alignment

**Date:** 20 November 2026
**Outcome:** Current-date dashboard requests now rely on the backend's default date behavior instead of sending redundant `startDate` and `endDate` query parameters.

**Completed:**

- Removed `startDate` and `endDate` from the dashboard analytics and recent-sales requests when the active period is Today.
- Aligned the home-screen AI briefing analytics request with the same parameter-free current-date request.
- Preserved explicit inclusive date parameters for historical calendar dates and multi-day dashboard ranges.
- Added focused regression coverage for both the parameter-free current-date requests and the retained historical/range behavior.

**Verification:** Focused dashboard coverage passed with 7 tests. ESLint passed for the three changed frontend files, and the TypeScript check passed.

**Verification limitation:** Repository-wide ESLint remains red on eight unrelated, pre-existing unused imports in business, product and sales files. This session did not modify those files or broaden scope to clean them up.

**Product decision:** The dashboard's Today view uses the backend's unfiltered/default date behavior. Historical single-day and multi-day views continue to send explicit inclusive ranges. This implementation direction does not, by itself, approve a broader product requirement for date-default semantics.

**Backend contract gap:** The received HTTP contract marks analytics `startDate` and `endDate` as optional but does not define the date window applied when they are omitted; equivalent omission semantics for `GET /sales` are also not explicitly documented. The frontend now follows the supplied integration direction, but the backend default should be recorded explicitly in the contract.

**Delivery risk:** If the backend's omitted-date default changes or differs between analytics and sales-list endpoints, the Today summary and recent transactions can represent different windows without a client-visible contract signal.

**Next session target:** Confirm and document the backend's omitted-date defaults for both dashboard data sources, then continue the planned shared voice-recording and dead-CSS cleanup work.

### Session 056 — Dashboard action and disclosure simplification

**Date:** 20 November 2026
**Outcome:** Simplified the dashboard's action hierarchy and removed two non-actionable presentation elements.

**Completed:**

- Swapped Low stock into the first Quick Actions position and moved Record sale into the former fourth position; all four existing actions and destinations remain available.
- Removed the disabled `Coming soon` button from the Share Store/BNPL preview while retaining its explicit In development status.
- Removed the dashboard footer disclosure beginning with `Updated`, including its generated client-side timestamp and analytics/inventory explanatory text.
- Added focused regression assertions for the revised action order and removed elements.

**Product presentation decision:** The dashboard no longer repeats analytics-model and unavailable-inventory disclosure in a bottom footnote. Inventory value remains visibly unavailable in its summary card, and the Share Store/BNPL preview remains labelled In development without a disabled call to action.

**Backend contract gaps and delivery risks:** No new backend contract gap was discovered. Removing the footer makes the summary more compact, but it also removes the on-screen explanation of metric provenance; any future requirement for as-of timestamps or financial qualification should be addressed through a deliberate, approved summary-card treatment rather than silently restoring the removed footer.

**Verification:** Focused dashboard coverage passed with 7 tests. ESLint passed for the changed frontend files, and the TypeScript check passed.

**Next session target:** Continue the planned shared voice-recording integration and dead-CSS cleanup, including review of dashboard styles orphaned by removed elements.

### Session 057 — Voice-first capture design continuation

**Date:** 20 November 2026
**Outcome:** Reconstructed the paused workflow-design session and completed an interactive design exploration for voice-first sale recording and product creation without changing production screens.

**Agreed product direction:**

- Counter-speed is the primary capture context for the targeted businesses.
- Voice is the prominent entry mode for sale and product capture; manual entry remains an accessible fallback.
- AI output remains a draft that the merchant reviews and deliberately confirms before any financial or inventory record is saved.
- Product creation may additionally begin from an image, subject to the same review-before-save rule and the backend's safe draft contract.

**Design proposal — not yet an implementation approval:**

- Explored Capture → Review → Confirm as three explicit states, with the normal form serving as the correction/review surface rather than competing with voice capture on the entry screen.
- Produced two interactive mobile directions: a single dominant Focused capture treatment and a Mode dock treatment that makes voice primary while keeping image and manual alternatives visible.
- Proposed hiding ordinary bottom navigation during the focused capture flow to reduce accidental exits; this detail remains subject to selection and usability review.
- Used contract-safe example content and preserved the existing separation between drafts and saved records.

**Artifact:** `design-artifacts/voice-first-capture.html`.

**Verification:** The fragment was checked for size and literal markup integrity. Automated browser rendering could not be run because Python and the Windows Python launcher are unavailable in this environment; no browser-level visual or interaction verification is claimed.

**Backend contract gaps:** Existing gaps remain material to implementation: confidence and ambiguous-field handling must remain visible; image creation must preserve draft-only behavior; and final save payload semantics must remain aligned with the received v2 AI contract. No new backend behavior was assumed by the mockup.

**Delivery risk:** Moving voice ahead of the manual form can slow users in noisy shops or when microphone permission fails unless manual fallback is immediate, keyboard accessible and state preserving. The production implementation must also avoid presenting a successful confirmation before the backend acknowledges the write.

**Next session target:** Select Focused capture or Mode dock as the base direction, settle whether bottom navigation is hidden during capture, then turn the selected direction into an implementation plan covering shared capture state, responsive behavior, failure states and focused accessibility tests.

### Session 058 — Focused voice-first sale and product capture

**Date:** 20 November 2026
**Outcome:** Implemented the selected Focused capture direction for new sales and products while preserving the established draft-review-confirm backend boundary.

**Completed:**

- Made voice capture the default entry state for `/sales/new` and `/products/new`.
- Added a three-step Capture, Review and Confirm progress treatment with a dominant microphone surface, recording state, realistic prompt examples and reduced-motion support.
- Kept manual entry immediately available. Selecting manual capture opens the existing complete checkout or product form without creating a second persistence path.
- Kept typed AI descriptions as an accessibility and device fallback inside the voice flow.
- Added product-photo capture as a secondary mode and allowed users to move between voice, image and manual entry before saving.
- Changed successful voice/image draft application to open the normal populated form as the correction and final review surface.
- Preserved confidence, ambiguity, candidate-match, stock, payment, idempotency and explicit backend-confirmation safeguards already present in the production workflows.
- Hid the mobile bottom navigation on new-sale and new-product capture routes so the focused workflow is not visually or interactively competing with the global AI launcher. Desktop sidebar navigation remains available.
- Left product editing and its protected voice-update suggestion workflow unchanged.
- Added focused coverage for voice-first defaults, manual fallback, product image switching, financial distinctions and focused-shell navigation behavior.

**Verification:** TypeScript passed. The complete frontend suite passed with 52 tests across 17 files. The production PWA build passed with 37 precache entries. ESLint passed for all changed web TypeScript files, and diff hygiene passed.

**Verification limitation:** Repository-wide ESLint remains red on five unrelated stale imports in `BusinessOnboardingPage`, `BusinessSettingsPage` and `SaleDetailPage`. The shared `AppShell` is typechecked and production-built, but the web ESLint configuration ignores files outside its workspace base path, and `packages/ui` does not define its own lint script.

**Product decision:** Focused capture is the selected base direction. New sale and product creation prioritize voice, retain immediate manual fallback, and keep AI output non-authoritative until the merchant reviews the editable form and deliberately submits it. New-product capture additionally exposes image input as a secondary draft source. Mobile bottom navigation is hidden during these two creation workflows; this is a capture-specific presentation rule, not a general navigation change.

**Backend contract gaps:** No new write contract was introduced. Existing confidence/ambiguity semantics, image-draft behavior, candidate resolution and final-save payload requirements remain the governing integration constraints. The frontend still cannot safely bypass form review or treat an AI response as a persisted record.

**Delivery risks and limitations:** Microphone permission, noisy counter environments and unsupported recording APIs can still interrupt the primary path, so manual and typed fallbacks remain essential. Browser-level visual inspection at phone, tablet and desktop widths and a live microphone/image smoke test with a non-sensitive backend workspace remain required before release acceptance.

**Next session target:** Run cross-breakpoint browser QA and live draft smoke tests, then refine spacing or copy only from observed evidence. Follow with the planned shared `useVoiceRecording` integration to remove duplicated recorder lifecycle code without changing the approved workflow.

### Session 070 — Align module input controls with filters

**Date:** 20 November 2026
**Outcome:** Corrected the vertical misalignment between the creation input controls and Filter button.

**Completed:**

- Changed both module toolbars from baseline to center alignment.
- Made the single New sale/New product label and its mode icons one horizontal action group, so the actual icons align with Filter.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 069 — Module controls below summary cards

**Date:** 20 November 2026
**Outcome:** Moved the Sales and Products creation/input controls from below their page headings to the space between their summary content and list panels.

**Completed:**

- Positioned Sales controls after sales summary cards and before the sales list panel.
- Positioned Products controls after inventory summary and low-stock feedback, immediately before the products list panel.
- Changed both toolbars to flex their creation input controls and Filter button to opposite ends with baseline alignment.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 068 — Invalidate discarded audio before request start

**Date:** 20 November 2026
**Outcome:** Closed a race where discarded audio could still produce a late AI review draft while its local audio encoding was completing.

**Completed:**

- Added a per-preview request generation token for sale and product audio capture.
- Invalidated that token on discard, in addition to aborting an already-issued network request.
- Checked the token before starting the draft request and before accepting its result or error, preventing the discarded preview from rendering a Review AI draft panel.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 067 — Abort discarded voice-draft processing

**Date:** 20 November 2026
**Outcome:** Discarding a completed voice preview now cancels its corresponding in-flight AI draft request.

**Completed:**

- Retained the abort handle returned by the sale and product AI draft mutations.
- Aborted the request when the user discards the audio preview or leaves the capture screen.
- Cleared preview, draft and voice-error state on discard, and ignored any late result from the canceled request.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 066 — Continuous countdown-to-recording transition

**Date:** 20 November 2026
**Outcome:** Removed the brief idle recording state that could appear between the voice countdown and active microphone capture.

**Completed:**

- Added an explicit microphone-starting state for both sale and product voice capture.
- Kept the animated capture treatment visible while the browser resolves microphone permissions and initializes recording.
- Replaced the transient idle/re-record appearance with Starting microphone and Waiting for microphone access feedback.
- Preserved the error fallback and post-recording re-record option.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 065 — Single-label icon input controls

**Date:** 20 November 2026
**Outcome:** Consolidated creation labels to one New sale or New product label per input control group.

**Completed:**

- Replaced repeated text inside individual mode buttons with a single contextual group label.
- Left compact microphone, camera and keyboard icons as the visible mode controls.
- Preserved explicit accessible labels for each input method and all direct-routing behavior.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 064 — Icon-led labelled creation actions

**Date:** 20 November 2026
**Outcome:** Simplified module creation controls so the icon communicates the input mode and every button is explicitly labelled with its destination record type.

**Completed:**

- Removed visible Voice, Image and Text mode captions from the module action buttons.
- Labelled each Sales action button New sale and each Products action button New product, while preserving its distinct input-mode icon.
- Kept specific accessible names (for example, New product with image) so the icon-only mode distinction remains available to assistive technology.
- Updated regression assertions to the accessible button names.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 063 — Context labels for module-level input modes

**Date:** 20 November 2026
**Outcome:** Added explicit “New sale” and “New product” labels to the respective module-level input controls.

**Completed:**

- Grouped the Sales Voice/Text selector beneath a clear New sale label.
- Grouped the Products Voice/Image/Text selector beneath a clear New product label.
- Preserved the direct routing and input-mode behavior introduced in Session 062.

**Verification limitation:** Automated checks remain pending because the environment had already exhausted its available execution allowance in the preceding session.

### Session 062 — Direct module-level input-mode routing

**Date:** 20 November 2026
**Outcome:** Removed the separate capture-method page. Input-mode icons now appear directly in the Sales and Products module action bars and route immediately to the corresponding input stage.

**Completed:**

- Replaced Sales' previous Record sale and Voice sale actions with direct Voice and Text icon controls.
- Replaced Products' previous Add product and Voice product actions with direct Voice, Image and Text icon controls.
- Routed Voice controls to the countdown-and-recording stage, Product Image to the image-draft stage, and Text to the existing manual form.
- Removed the former intermediate capture-method chooser from the new-sale and new-product pages.
- Updated focused regression expectations for direct routes and modes.

**Verification limitation:** Automated formatting, focused test and TypeScript commands could not be run after these final edits because the environment rejected further execution after its Codex usage allowance was exhausted. Verification must be rerun before release acceptance.

**Product presentation decision:** Input method is selected from the originating module, not from a subsequent creation-page choice. The destination-specific AI draft, review and persistence safeguards remain unchanged.

**Next session target:** Run formatting, focused list and capture-flow tests, then TypeScript and browser QA once execution capacity is available.

### Session 061 — Compact icon input-mode selector

**Date:** 20 November 2026
**Outcome:** Replaced the large capture-method cards with one compact, reusable icon-led input selector.

**Completed:**

- Added a shared visual selector pattern with distinct Voice, Image and Text icon buttons.
- Applied the three-mode selector to new-product capture and the supported Voice/Text subset to new-sale capture.
- Preserved existing accessible button names, countdown behavior, camera/file-picker invocation and direct manual-form routing.
- Made the selector responsive so the compact options share available mobile width without changing their tap targets.

**Verification:** Focused sale and product capture tests passed (5 tests across 2 files). TypeScript passed.

**Product presentation decision:** The initial capture choice is now a compact icon-led selector rather than a set of explanatory cards. This changes entry-screen hierarchy only; supported modes and their draft-review boundaries remain unchanged.

**Next session target:** Validate the compact selector on real phone widths and adjust only if observed tap-target or label legibility issues arise.

### Session 060 — Voice-capture waveform and preview refinement

**Date:** 20 November 2026
**Outcome:** Corrected the recording waveform layout and refined the completed-recording preview used by both sale and product capture.

**Completed:**

- Fixed a CSS specificity conflict that caused waveform bars to inherit the voice hero's grid layout and stack into a vertical line during recording.
- Kept the waveform as the intended horizontal, animated equalizer; reduced-motion behavior remains supported.
- Redesigned the completed-recording treatment as a compact review card with a captured-state label, duration/size badge, transcription status indicator, responsive action layout and a less visually heavy audio player treatment.

**Verification:** TypeScript passed. Existing focused sale and product capture regression coverage continues to cover waveform rendering; no behavioral or backend request semantics changed.

**Implementation note:** The embedded audio player's play/pause control remains browser-native for reliable media controls and accessibility. The surrounding review card is product-styled; exact native control chrome varies by browser.

**Next session target:** Run the focused capture screens through live browser/device QA, especially native audio-control appearance and camera/microphone permissions.

### Session 059 — Explicit capture-mode routing and automatic voice start

**Date:** 20 November 2026
**Outcome:** Separated new-sale and new-product capture into intentional voice, manual and (for products) image paths, so selecting a mode no longer routes every user through the same initial workflow.

**Completed:**

- Added an explicit entry chooser to `/sales/new` and `/products/new`.
- Made manual selection open the existing checkout or product form directly, without starting a recording workflow.
- Made voice selection enter a dedicated capture screen with visible waveform feedback and a three-second countdown; the browser microphone request and recording start automatically when the countdown completes.
- Sent the completed recording to the existing draft endpoint automatically on stop, retaining the recording preview and editable draft review before any normal-form save.
- Added cancellation during the countdown, typed fallback, and re-recording controls.
- Made product image selection invoke a file input with `capture="environment"`: supported mobile browsers can offer the rear camera, while desktop browsers retain their normal file picker. The selected image remains in the image-draft review path rather than switching to manual entry.
- Added regression coverage for chooser separation, manual routing, countdown/waveform state and the mobile camera capture hint.

**Verification:** TypeScript passed. The complete frontend suite passed: 53 tests across 17 files. The production PWA build passed with 37 precache entries.

**Product decision:** The selected capture method determines the immediate workflow: voice starts only after an intentional countdown, manual opens the established form, and product image capture uses the platform-appropriate browser picker. This refines the approved focused-capture direction; it does not change the requirement that AI output is a reviewed draft rather than a saved record.

**Backend contract gap:** The received AI contract accepts completed audio for draft generation, not a streaming transcription session. Accordingly, “transcription begins” means the automated draft request begins after the user stops recording; the interface must not claim live transcription while audio is still being captured.

**Delivery risks and limitations:** `capture="environment"` is a browser hint, not a guarantee that every mobile device opens a rear camera. Camera, microphone and permission behavior still require live iOS, Android and desktop smoke testing. Noisy environments and unsupported recording APIs continue to require the manual and typed alternatives.

**Next session target:** Perform cross-browser device QA with microphone and camera permissions, then consider extracting the duplicated recorder lifecycle into the existing shared hook without changing capture behavior.
