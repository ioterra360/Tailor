// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tailorappstudio.it',
  vite: {
    // Tailwind v4 vite plugin types narrower than Astro PluginOption — cast is safe at runtime
    plugins: [/** @type {any} */ (tailwindcss())],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
