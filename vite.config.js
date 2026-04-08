import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        narrative: resolve(__dirname, 'narrative/index.html'),
        commercial: resolve(__dirname, 'commercial/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        watch: resolve(__dirname, 'watch/index.html'),
      }
    }
  }
});
