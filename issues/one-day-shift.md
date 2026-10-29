# [4471] Investigate one-day shifts and temporal anomalies — 5 reports, cause unconfirmed

The export’s desk notes identify five reports that need separate investigation. Their observations do not establish a month/day reversal. This issue covers **5 reports**, excluded from the 374-report parser issue.

- R-41202: Tuesday 12 May on the invite, Monday 11 May on the calendar.
- R-41209: June bookings one day off, with no specific dates provided.
- R-41236: invite reportedly arrived before booking; this is a temporal-order observation, not proof of a one-day shift.
- R-41344: Lisbon and Toronto recipients saw different calendar days for one meeting.
- R-41620: Tuesday 6 October showed as Monday.

Root cause is **unconfirmed**. A time-zone or date-only conversion problem is a hypothesis, not an established diagnosis; a calendar day difference between zones can also be expected. Collect the original input, tenant configuration, stored instant, named zones and offsets, expected local date and delivery timestamp for each report. Reproduce each path before deciding whether these reports share a cause. Do not merge them merely because their subject matches #4471.

## Scope and evidence

The supplied 4 October 2026 export has 427 rows and 412 unique report IDs. This issue belongs to a disjoint 374 + 33 + 5 partition. The counts are an export snapshot, not a live queue total.

Source: `src/lib/data/reports-4471.json`, `src/lib/data/tenants/*.json`, `src/lib/data/desk-notes.json`, and `src/lib/kb/causes.ts`. Run `npm run analyze` to regenerate `analysis.json`.

Received: 2026-04-02 through 2026-10-04.

## Report IDs (5)

R-41202, R-41209, R-41236, R-41344, R-41620

## KB review

Source: `src/routes/kb/incidents/4471-review/+page.svx`. Rendered desk page: `rendered/kb/incidents/4471-review/index.html`.

## Engineering update, checked after first submission

The engineering update supplies outcomes for the parser and hint but no diagnosis or resolution for these five observations. This investigation remains open; the earlier closure for documentation handoff was premature.

Source: https://hq.mega.dev/challenges/what-it-shows
