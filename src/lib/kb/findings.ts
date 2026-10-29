import reports from '#lib/data/reports-4471.json';
import notes from '#lib/data/desk-notes.json';
import { causeOf, uniqueById, type Report, type Tenant } from '#lib/kb/causes';

const tenants = Object.values(import.meta.glob<Tenant>('/src/lib/data/tenants/*.json', { eager: true, import: 'default' }));
const directory = new Map(tenants.map(t => [t.handle, t]));
const anomalies = new Set(notes.oneDayMove);
export const merged = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
export const partitions = [
  { key: 'parser', label: 'Month-first shared parser', state: 'Confirmed mechanism', issue: 'Parser reads day-first dates month-first', reports: merged.filter(r => !anomalies.has(r.id) && causeOf(r, directory.get(r.tenant)) === 'parser') },
  { key: 'hint', label: 'Month-first booking-v3 hint', state: 'Confirmed mechanism', issue: 'Booking-v3 date hint contradicts tenant format', reports: merged.filter(r => !anomalies.has(r.id) && causeOf(r, directory.get(r.tenant)) === 'hint') },
  { key: 'one-day-shift', label: 'One-day / temporal anomalies', state: 'Cause unconfirmed; investigate separately', issue: 'Investigate one-day shifts and temporal anomalies', reports: merged.filter(r => anomalies.has(r.id)) }
];
export const total = merged.length;
export const rawTotal = reports.length;
export const observationCounts = notes.oneDayMove.length;
