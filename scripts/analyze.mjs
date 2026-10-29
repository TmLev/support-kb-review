import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { causeOf, groupByCause, uniqueById } from '../src/lib/kb/causes.ts';

const root = new URL('../src/lib/data/', import.meta.url);
const read = async name => JSON.parse(await readFile(new URL(name, root), 'utf8'));
const raw = await read('reports-4471.json');
const reports = uniqueById(raw).filter(r => r.mergedInto === 4471);
const tenants = new Map(await Promise.all((await readdir(new URL('tenants/', root))).map(async name => {
  const t = await read('tenants/' + name); return [t.handle, t];
})));
const tenantOf = r => tenants.get(r.tenant);
const notes = await read('desk-notes.json');
const exceptionIds = new Set(notes.oneDayMove);
const buckets = { parser: [], hint: [], 'one-day-shift': [] };
for (const r of reports) {
  const cause = exceptionIds.has(r.id) ? 'one-day-shift' : causeOf(r, tenantOf(r));
  if (!(cause in buckets)) throw new Error('Unplaced report ' + r.id);
  buckets[cause].push(r);
}
const summarize = rs => ({ count: rs.length, ids: rs.map(r => r.id), first: rs.map(r=>r.receivedAt.slice(0,10)).sort()[0], last: rs.map(r=>r.receivedAt.slice(0,10)).sort().at(-1), tenants: [...new Set(rs.map(r=>r.tenant))] });
const result = { raw: raw.length, unique: reports.length, duplicateRows: raw.length - reports.length, exportedClassifier: groupByCause(reports, tenantOf).map(g => ({ cause: g.cause, count: g.reports.length, tags: g.taggedAs })), partition: Object.fromEntries(Object.entries(buckets).map(([key,rs])=>[key,summarize(rs)])), exceptions: buckets['one-day-shift'] };
if (Object.values(buckets).reduce((sum,rs)=>sum+rs.length,0) !== 412) throw new Error('Partition does not cover 412 reports');
await writeFile(new URL('../analysis.json', import.meta.url), JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({raw:result.raw,unique:result.unique,duplicateRows:result.duplicateRows,exportedClassifier:result.exportedClassifier,partition:Object.fromEntries(Object.entries(result.partition).map(([k,v])=>[k,v.count]))},null,2));
