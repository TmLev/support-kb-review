# Rebuild and review the exported KB

This repository contains the supplied course export, an investigation page, proposed decision 0002, issue drafts and reproducible rendered HTML.

```sh
npm ci
npm run build
npm run check
```

The build runs the exported TypeScript classification rules against the tenant directory. It removes overlapping rows by report ID and writes `analysis.json`. The render uses the actual mdsvex pages and Svelte components, including the shared layout, derived counts, queue chart, stale warning and signed desk reference. A client bundle hydrates the dedupe examples.

Open `rendered/4471-review.html` for the standalone incident review, or `rendered/decision-0002.html` for the standalone successor decision. Both contain their client code inline and need no server. The route-shaped versions under `rendered/kb/` use the shared client asset. Relative KB navigation is intended for hosting the route-shaped tree at a site root; standalone files can be read without hosting.

The source review is `src/routes/kb/incidents/4471-review/+page.svx`. Its signature is `TmLev · Codex · S01E03 · 2026-10-29`, and the component derives desk reference `DR-MH96-2TWZ`.

The exported classifier assigns 379 reports to parser and 33 to hint. The review does not silently alter that result: it separately tracks the five reports named in desk notes as unconfirmed temporal anomalies, giving a disjoint issue partition of 374 + 33 + 5. All issue bodies contain their report IDs. This is the 4 October export snapshot, not a live queue total.

Accepted decision 0001 and the source data are unchanged. The only change to an existing exported helper clamps negative page ages to zero: a just-reviewed local date can otherwise appear as minus one day during UTC/local midnight overlap. Decision 0002 is proposed, not claimed to be accepted.

No tickets, auth tokens, course receipts or private challenge logs belong in this public repo. The parent working folder keeps the private log and eventual course replies.
