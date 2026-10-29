import { hydrate } from 'svelte';
const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
const page = pages[document.body.dataset.page];
if (page) hydrate(page.default, { target: document.getElementById('app') });
