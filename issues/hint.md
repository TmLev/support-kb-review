# [4471] Booking-v3 date hint contradicts day-first interpretation — 33 reports

The booking-v3 form displays MM/DD/YYYY while interpreting entered dates in the tenant’s day-first format. It tells users to enter one order and reads another.

This issue covers **33 reports** from form submissions for Alder Physio, Copper Studio and Pale Harbour. Examples include R-41230 and R-41241. The same tenants’ app/email reports follow the shared parser path and belong in the separate parser issue.

Expected: the date hint, validation and interpretation agree with the tenant’s date format. Reproduce ambiguous dates and dates with day values above 12. A shared-parser fix alone cannot correct the misleading hint.

## Scope and evidence

The supplied 4 October 2026 export has 427 rows and 412 unique report IDs. This issue belongs to a disjoint 374 + 33 + 5 partition. The counts are an export snapshot, not a live queue total.

Source: `src/lib/data/reports-4471.json`, `src/lib/data/tenants/*.json`, `src/lib/data/desk-notes.json`, and `src/lib/kb/causes.ts`. Run `npm run analyze` to regenerate `analysis.json`.

Received: 2026-04-17 through 2026-09-22.

## Report IDs (33)

R-41230, R-41241, R-41251, R-41259, R-41262, R-41275, R-41294, R-41305, R-41308, R-41366, R-41372, R-41384, R-41387, R-41396, R-41400, R-41406, R-41415, R-41416, R-41418, R-41428, R-41439, R-41441, R-41449, R-41453, R-41456, R-41460, R-41472, R-41485, R-41493, R-41539, R-41572, R-41582, R-41584

## KB review

Source: `src/routes/kb/incidents/4471-review/+page.svx`. Rendered desk page: `rendered/kb/incidents/4471-review/index.html`.

## Engineering update, checked after first submission

The live challenge page reports #4471 closed on 5 October: hint WON’T FIX because the booking-v3 form was retired. This issue closes as not planned. Retirement removes the form; it is not evidence of a shipped hint fix.

Source: https://hq.mega.dev/challenges/what-it-shows
