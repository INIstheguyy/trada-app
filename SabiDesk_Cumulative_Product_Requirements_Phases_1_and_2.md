# Trada — Cumulative Product Requirements & Product Analysis

**Coverage:** Phase One and Phase Two, with explicitly separated future vision  
**Document type:** Product requirements context and business/product analysis — **not a technical requirements specification**  
**Version:** 1.1 | **Prepared:** 3 November 2026 | **Implementation status updated:** 12 November 2026  
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

### 36.1 Frontend status as of 4 November 2026

### 36.1 Frontend status as of 10 November 2026

| Capability                        | Status                           | Current evidence / limitation                                                                                                                                                                                                                                                                                                            |
| --------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Monorepo foundation               | **Implemented and verified**     | React, TypeScript, Vite, pnpm workspaces, `apps/web` and `packages/ui`.                                                                                                                                                                                                                                                                  |
| Design tokens and primitives      | **Implemented and verified**     | Semantic colour tokens plus Button, Badge and Surface primitives.                                                                                                                                                                                                                                                                        |
| Responsive application shell      | **Implemented and verified**     | Mobile bottom navigation, tablet rail and desktop sidebar.                                                                                                                                                                                                                                                                               |
| Design tokens and primitives      | **Implemented and verified**     | Semantic colour tokens updated to Trada.com.ng brand palette (dark navy `#0d1b4b`, brand green `#1a9e36`); Button, Badge and Surface primitives unchanged.                                                                                                                                                                               |
| Responsive application shell      | **Implemented and verified**     | Mobile bottom navigation, tablet rail and desktop sidebar. Brand mark updated from "S" to "T".                                                                                                                                                                                                                                           |
| PWA shell                         | **Implemented and verified**     | Production build generates the manifest and service worker; online-first transactional behavior remains the product rule.                                                                                                                                                                                                                |
| Data and validation foundation    | **Implemented and verified**     | Redux Toolkit, RTK Query and Zod contract validation are configured.                                                                                                                                                                                                                                                                     |
| Owner Command Centre              | **Implemented and verified**     | The dashboard composes documented sales analytics, low-stock and recent-sales endpoints. The obsolete fixture endpoint has been removed. Live backend testing was intentionally deferred.                                                                                                                                                |
| Financial-truth presentation      | **Implemented and verified**     | Revenue, cash received, gross profit and unpaid balances remain distinct. Unsupported cash totals are unavailable; profit and unpaid balances are explicitly qualified where the backend contract is incomplete.                                                                                                                         |
| Loading and error feedback        | **Implemented and verified**     | Dashboard sources load and fail independently, with partial-data disclosure and per-panel retries. Mutation feedback consistently distinguishes authentication, authorization, connectivity, malformed-response and backend business errors.                                                                                             |
| Frontend permission helper        | **Partially defined**            | Action-based `can()` guards protect routes and actions. The backend's generic `user` can currently view/create sales and view sales analytics, plus view/create/update products; sale cancellation and product deletion remain owner-only. Final owner, manager and staff mappings remain blocked by the production permission contract. |
| Authentication and session        | **Implemented and verified**     | Typed registration, login and profile integration plus session restoration, protected routing, logout and automatic access-token refresh are implemented. A live backend handshake with real credentials remains to be verified.                                                                                                         |
| Development demo environment      | **Implemented and verified**     | Development builds expose an owner-scoped demo login backed by in-memory product, sale, stock and analytics behavior. It is test tooling, is excluded from the production UI and resets when the dev server restarts.                                                                                                                    |
| Products and low-stock alerts     | **Implemented and verified**     | Searchable/paginated list, low-stock summary, create, detail/edit and guarded delete routes are implemented against the documented contract. Live backend testing was intentionally deferred.                                                                                                                                            |
| Sales and sales analytics         | **Implemented and verified**     | Protected checkout, filtered/paginated history, detail, guarded cancellation/restock and analytics are implemented against the documented contract. Revenue, received amount and balance due remain distinct. Live backend testing was intentionally deferred.                                                                           |
| Full production RBAC              | **Blocked by decision/contract** | Backend documentation exposes a generic `user` role but no staff membership, permission, branch, approval or authorization-denied contract.                                                                                                                                                                                              |
| AI capture and draft review       | **Planned**                      | No backend AI job, draft, confidence, review or confirmation contract is documented yet.                                                                                                                                                                                                                                                 |
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

**New product decision recorded:** The product's visible brand identity is now **Trada.com.ng** with the tagline **Manage · Sell · Grow**. This supersedes any prior "SabiDesk" references that remain in legacy file names. File renames (e.g., `SabiDesk_*.md`) are a housekeeping task, not an urgent delivery requirement.

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
