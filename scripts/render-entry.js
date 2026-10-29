import { render } from 'svelte/server';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const pages = import.meta.glob('/src/routes/kb/**/+page.svx', { eager: true });
await mkdir('rendered', { recursive: true });
const manifest = JSON.parse(await readFile('rendered/.vite/manifest.json', 'utf8'));
const client = manifest['scripts/client-entry.js'].file;
const clientCode = await readFile('rendered/' + client, 'utf8');
for (const [path, mod] of Object.entries(pages)) {
  const result = render(mod.default);
  const route = path.replace('/src/routes/', '').replace('/+page.svx', '');
  const dir = resolve('rendered', route);
  await mkdir(dir, { recursive: true });
  const prefix = '../'.repeat(route.split('/').length);
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + result.head + '</head><body data-page="' + path + '"><div id="app">' + (result.body ?? result.html) + '</div><script type="module" src="' + prefix + client + '"></script></body></html>';
  await writeFile(resolve(dir, 'index.html'), html);
  if (route === 'kb/incidents/4471-review' || route === 'kb/decisions/0002-dedupe-by-evidence') {
    const name = route.includes('/incidents/') ? '4471-review' : 'decision-0002';
    const standalone = html.replace(/<script type="module" src="[^"]+"><\/script>/, () => '<script type="module">' + clientCode.replaceAll('</script','<\\/script') + '</script>').replace('</head>', '<style>html,body{background:transparent!important}.kb{padding-left:0!important;padding-right:0!important}</style></head>');
    await writeFile(resolve('rendered', name + '.html'), standalone);
  }
  console.log('Rendered /' + route);
}
