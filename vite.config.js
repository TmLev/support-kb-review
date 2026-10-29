import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [svelte({
    extensions: ['.svelte', '.svx'],
    preprocess: [mdsvex({ extensions: ['.svx'], layout: { runbook: fileURLToPath(new URL('./src/lib/layouts/runbook.svelte', import.meta.url)) } })],
    compilerOptions: { css: 'injected' },
    emitCss: false,
    configFile: false
  })],
  resolve: { alias: { '#lib': fileURLToPath(new URL('./src/lib', import.meta.url)) } },
  build: process.env.RENDER_CLIENT ? { ssr: false, target: 'es2022', outDir: 'rendered', emptyOutDir: false, manifest: true, rollupOptions: { input: 'scripts/client-entry.js' } } : { ssr: true, target: 'node22' },
  ssr: { noExternal: ['svelte'] }
});
