<script lang="ts">
  import { partitions, total, rawTotal } from '#lib/kb/findings';
  import type { Report } from '#lib/kb/causes';
  const range = (rs: Report[]) => rs.map(r => r.receivedAt.slice(0,10)).sort();
</script>

<p><strong>{total} unique reports</strong> from {rawTotal} export rows; {rawTotal - total} overlapping rows are excluded by report ID.</p>
<table>
  <thead><tr><th>Problem or investigation</th><th>Reports</th><th>Evidence status</th><th>Received</th></tr></thead>
  <tbody>
    {#each partitions as group (group.key)}
      <tr><td>{group.label}</td><td>{group.reports.length}</td><td>{group.state}</td><td>{range(group.reports)[0]} → {range(group.reports).at(-1)}</td></tr>
    {/each}
  </tbody>
  <tfoot><tr><th>Total (disjoint groups)</th><th>{partitions.reduce((sum,g) => sum + g.reports.length, 0)}</th><td colspan="2">Each report appears once.</td></tr></tfoot>
</table>

<figure>
  <svg viewBox="0 0 650 160" role="img" aria-label="Report counts by investigation group">
    {#each partitions as group, i (group.key)}
      <text x="0" y={24+i*50}>{group.label}</text>
      <rect x="240" y={8+i*50} width={group.reports.length/total*340} height="26" class:uncertain={group.key==='one-day-shift'} />
      <text x={250+group.reports.length/total*340} y={27+i*50}>{group.reports.length}</text>
    {/each}
  </svg>
  <figcaption>Counts come from report IDs and tenant/form rules, with the explicitly named anomalous reports separated for investigation.</figcaption>
</figure>

{#each partitions as group (group.key)}
  <details><summary>{group.label}: {group.reports.length} report IDs</summary><p class="ids">{group.reports.map(r => r.id).join(', ')}</p></details>
{/each}

<style>
  svg { width: 100%; height: auto; }
  text { font: 12px system-ui,sans-serif; fill: var(--fg); }
  rect { fill: var(--accent); }
  rect.uncertain { fill: var(--warn); }
  figcaption { color: var(--muted); font-size: .85rem; }
  figure { margin: 1.5rem 0; }
  summary { cursor: pointer; }
  .ids { overflow-wrap: anywhere; font: .8rem/1.8 var(--mono); }
</style>
