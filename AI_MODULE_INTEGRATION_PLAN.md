# Trada AI Module Integration Review and Delivery Plan

**Date:** 16 November 2026  
**Status:** Text-first draft-only voice-sale UI implemented locally; live endpoint verification and backend contract confirmation remain pending. No automatic AI persistence is enabled.  
**Source of truth:** AI Endpoints API Documentation, current PRD, and current merchant web application contracts.

## 1. Executive decision

The new backend endpoints are a strong foundation for AI-assisted capture, but they must be integrated as a **draft-first workflow**. The web application must explicitly send `save: false` for every AI request, show the transcript and extracted fields, let the merchant correct them, and only then create or update records through a confirmed path.

Do not expose an action that relies on the API's default `save: true`. It conflicts with the PRD rule that AI interpretation is not an authoritative financial or inventory record.

## 2. Endpoint inventory

| Endpoint                        | Intended use                                          | Draft support            | Initial status                                                         |
| ------------------------------- | ----------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `POST /voice`                   | Unified voice sale, product create, or product update | Yes, `save: false`       | Later convenience layer; do not make the first UI entry point          |
| `POST /products/from-voice`     | Voice product create/update from Inventory            | Yes, `save: false`       | Candidate after response contract is completed                         |
| `POST /products/:id/from-voice` | Voice suggestion while viewing a product              | Yes, `save: false`       | Preview only until stock-adjustment confirmation/audit contract exists |
| `POST /sales/from-voice`        | Voice sale capture in checkout/POS                    | Yes, `save: false`       | Best first production candidate after confirmation contract is agreed  |
| `POST /products/from-image`     | Product photo extraction                              | No documented draft flag | Not safe to expose yet; backend must add preview/draft behavior        |

All endpoints require the current Bearer token. Audio can be base64 or a data URL; the browser path is `MediaRecorder` plus `FileReader`, with `audio/webm` as the practical web default. Text fallback is available and should be the first test and recovery path.

## 3. PRD comparison

| PRD requirement                                                 | API support                                                                | Decision                                                     |
| --------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Voice and product-photo capture reduce manual entry             | Voice and image endpoints exist                                            | Aligned                                                      |
| AI result is a draft, not a record                              | `save: false` supports this for voice endpoints                            | Frontend must always opt in to draft mode                    |
| Merchant can correct uncertain fields                           | Editable extracted fields are returned                                     | Partially aligned: no field confidence or ambiguity metadata |
| Critical sale/inventory changes require review                  | API defaults to automatic save                                             | Conflict unless UI prevents default save                     |
| Risk-based approval and auditable review                        | No reviewer, approval, risk tier, audit, draft ID, or idempotency contract | Blocked for consequential changes                            |
| Product photo requires confirmation                             | Image endpoint documents immediate creation only                           | Blocked pending draft mode                                   |
| Poor recognition has a manual fallback                          | Text fallback and existing manual forms exist                              | Aligned                                                      |
| Nigerian merchant language and NGN support                      | Pidgin, multipliers, payment language, units and conditions documented     | Aligned, subject to live accuracy validation                 |
| AI briefings, Ask Sabi, marketing captions, receipt/book photos | No endpoint contracts in this specification                                | Long-term only                                               |

## 4. What can be delivered now

### Safe first slice: voice-sale draft in the existing checkout

1. Add a clearly labelled **Record sale by voice** secondary action to `/sales/new`.
2. Make browser microphone capture the primary path; retain typed text as a fallback for unavailable permissions or browsers.
3. Call `POST /sales/from-voice` with `save: false`.
4. Present transcript, matched products, quantities, unit prices, payment method, amount received, balance, and any unmatched item in a review panel.
5. Let the merchant correct every field using the existing checkout controls.
6. Submit the final reviewed payload through the existing `POST /sales` endpoint, so the saved record is exactly what the merchant confirmed.
7. Show the normal receipt confirmation and invalidate sales/product/analytics queries through existing cache ownership.

This is the recommended first implementation because it has the strongest product fit, an existing checkout surface, and a manual fallback.

**Implementation status (16 November 2026):** Browser microphone capture (`audio/webm` data URL), typed fallback, the explicit `save: false` request, draft review, and safe application to the existing checkout are complete locally. Production endpoint verification remains pending.

### Second slice: voice-assisted product creation

Use `POST /products/from-voice` with `save: false`, then prefill the existing product form. The merchant completes or corrects product type, stock threshold, location, quantities and prices before submitting through the existing `POST /products` endpoint.

**Implementation status (17 November 2026):** Complete locally. The new-product form supports browser recording with replay/discard and typed fallback, sends `save: false`, then uses the returned draft only to prefill editable fields. The existing Save product action remains the only persistence route.

### Preview-only: voice-assisted product update/restock

Show suggested values from `POST /products/:id/from-voice` with `save: false`, but do not expose one-tap application of a stock change. A quantity mode of `add`, `subtract`, or `set` needs an approved inventory-movement/audit and stale-record strategy. Until then, use it only to prefill a review form.

**Implementation status (17 November 2026):** A text-first preview is available on the existing product-edit page. It sends `save: false`, displays the transcript and extracted quantity/price suggestion, and provides no automatic application path. Merchants must manually edit the existing form and use Save changes. Browser microphone capture for this update endpoint remains deferred until inventory authorization/audit behavior is documented.

## 5. What is blocked or long-term

- **Photo-to-product:** add `save: false`, extracted-field correction, and duplicate detection before use. The documented endpoint currently creates a product immediately.

**Test-only implementation status (17 November 2026):** An explicitly labelled product-image endpoint test is available on the new-product form. It requires a selected image, location and an acknowledgement that it will immediately create a product, then displays the created product result. This is for contract validation only and does not remove the draft-mode requirement for normal product-image release.

- **Unified assistant (`/voice`):** introduce after the focused sales and product flows establish trusted review patterns. Intent auto-detection should never obscure the proposed action.
- **Automatic recording:** do not use for sales, stock changes, pricing, discounts, or payments until risk tiers, permissions, audit trails, idempotency, and approval paths exist.
- **Handwritten book, receipt/invoice capture, marketing copy, Ask Sabi, business briefings, batch images and storefront content:** no supporting endpoint contract is present; retain as future tracks.
- **Production rollout:** block broader release of AI capture until the backend stops serializing password hashes in nested user objects (recorded in PRD Sessions 021–022).

## 6. Backend contract decisions required before implementation

1. **Confirmation contract:** Provide an immutable `draftId` and a confirm endpoint, or guarantee that the draft response includes every field required by the standard sales/product write endpoints. Reprocessing the same audio with `save: true` is not a safe confirmation mechanism.
2. **Idempotency:** Accept an idempotency key for every create/confirm request and return the original result on retry. This prevents duplicate sales after double taps, network retries, or repeated audio submissions.
3. **Confidence and ambiguity:** Return field-level confidence, unresolved fields, product-match candidates, and match rationale. The frontend must not imply confidence that the API did not supply.
4. **Inventory safety:** Define how `add`, `subtract`, and `set` are authorized, recorded as movements, conflict-checked, and approved.
5. **Permissions:** Define which owner/manager/cashier/inventory roles may submit AI drafts, confirm sales, create products, and alter stock/prices.
6. **Privacy and retention:** Define audio/image storage, transcription retention, AI-provider data handling, upload-size/duration limits, supported languages, and user consent copy.
7. **Failure protocol:** Document timeout, rate-limit, malformed media, unsupported MIME, quota, ambiguous match, and partial-result responses.
8. **Response normalization:** Guarantee numeric response serialization or maintain the frontend's decimal-string normalization. Never serialize password hashes or authentication fields in related users.

## 7. End-to-end implementation process

### Phase A — Contract hardening and typed API layer

1. Obtain written answers to the eight backend decisions above.
2. Add Zod schemas for each AI draft/result/error envelope, including decimal normalization and unknown-field stripping.
3. Add RTK Query mutations for draft-only requests; do not add a mutation that defaults `save` to true.
4. Add fixture tests for successful sale/product drafts, unmatched product, silent audio, authorization failure, expired token, duplicate retry, and malformed decimal values.

**Exit gate:** frontend can parse every documented response and the backend confirmation path is deterministic and idempotent.

### Phase B — Text-first voice-sale review

1. Add the checkout entry point and transcript textarea.
2. Submit a draft request with `save: false` and show progress, cancellation, failure, retry and manual-entry states.
3. Map the draft to editable checkout controls without overwriting merchant edits.
4. Require explicit merchant confirmation before the existing standard sale write.
5. Verify product invalidation, receipt routing and accurate distinctions between total, paid and balance.

**Exit gate:** a draft cannot create a sale; a confirmed payload produces one sale exactly once; manual checkout remains available throughout.

### Phase C — Browser microphone support

1. Check browser support and ask for microphone permission only after the merchant chooses voice input.
2. Capture `audio/webm`, show recording duration and discard/re-record controls, then convert the final Blob to a data URL.
3. Enforce backend-approved size/duration limits before upload.
4. Provide transcript fallback for denied permission, unsupported browsers, quiet audio and network failure.

**Exit gate:** recording is accessible by keyboard, has clear privacy copy, and gracefully falls back to text/manual entry.

### Phase D — Voice product creation and edit preview

1. Add a product-form helper using `save: false` and prefilled editable fields.
2. Add product-page voice suggestions, keeping stock/price application behind the existing review controls.
3. Add duplicate warnings only when backend matching data is supplied.

**Exit gate:** AI can accelerate product setup but cannot silently add, overwrite, or adjust stock.

### Phase E — Photo capture and unified assistant

1. Do not start until photo draft/confirmation and privacy contracts are delivered.
2. Reuse the same review component, correction model, audit treatment and idempotent confirmation path.
3. Introduce `/voice` only as an explicit assistant mode with visible proposed action, not hidden auto-routing.

## 8. Measurement and release safeguards

- Track draft started, processing failed, draft corrected, confirmed, manually abandoned, and duplicate-prevented events only after an approved privacy/analytics plan.
- Do not log audio, image data URLs, transcripts with customer details, JWTs, or AI raw responses in browser telemetry.
- Test at 390, 820 and 1440 px; keyboard navigation; microphone denied; poor network; page reload; expired token; two simultaneous tabs; and repeated confirmation.
- Use a dedicated production test business and non-sensitive sample content for live smoke tests.
