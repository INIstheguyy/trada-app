# Trada repository instructions

## Required session close

After every substantive development session, update Part H of `Trada_Cumulative_Product_Requirements_Phases_1_and_2.md` before reporting completion.

The update must:

1. Change the implementation-status date in the PRD header.
2. Update the current capability status table when delivery state changed.
3. Add or amend the latest session log with completed work, verification, limitations and the next target.
4. Record newly discovered product decisions, backend contract gaps and delivery risks.
5. Keep product requirements separate from implementation proposals. Do not mark a requirement approved merely because code or an API currently behaves that way.

A documentation-only discussion does not require a new session entry unless it changes an agreed decision, requirement, contract, status or delivery plan.

## Sources of truth

- Product scope and decisions: `Trada_Cumulative_Product_Requirements_Phases_1_and_2.md`
- Frontend structure and conventions: `FRONTEND_ARCHITECTURE.md`
- Received backend HTTP contract: `Trada_API_Requests_and_Responses.md`

When these sources conflict, record the conflict in the PRD progress appendix rather than silently choosing one.
