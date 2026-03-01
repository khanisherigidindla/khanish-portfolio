import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use root base by default so Vercel (and other hosts) serve assets correctly.
  // When deploying to GitHub Pages, set the base at build time instead (example below).
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    middlewareMode: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    copyPublicDir: true,
  },
  publicDir: 'public',
});

// To build for GitHub Pages with a repo subpath, you can run:
// `vite build --base=/Portfolio-website/`
