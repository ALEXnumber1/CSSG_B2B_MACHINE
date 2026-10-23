import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Genera .gz y .br junto a cada asset — Vercel los sirve automáticamente
    compression({ algorithm: 'gzip', ext: '.gz' }),
    compression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer/',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  // The PDF worker (src/lib/pdf/vulnerabilityReport.worker.tsx) is started with { type: 'module' }.
  worker: { format: 'es' },
  build: {
    rollupOptions: {
      output: {
        // Higher priority captures first. Each group also pulls in its modules' dependencies, so
        // vendor-shims must win over vendor-pdf: buffer/tslib are shared by the entry (Buffer
        // polyfill in main.tsx), Supabase and react-pdf. Inside vendor-pdf they made EVERY page
        // download and run the ~1.4 MB PDF bundle.
        codeSplitting: {
          groups: [
            { name: 'vendor-shims', test: /node_modules[\\/](buffer|base64-js|ieee754|tslib)[\\/]/, priority: 90 },
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|cookie|set-cookie-parser)[\\/]/, priority: 80 },
            { name: 'vendor-pdf', test: /@react-pdf/, priority: 70 },
            { name: 'vendor-spline', test: /@splinetool/, priority: 60 },
            { name: 'vendor-three', test: /three/, priority: 50 },
            { name: 'vendor-supabase', test: /@supabase/, priority: 40 },
            { name: 'vendor-framer', test: /framer-motion/, priority: 30 },
            { name: 'vendor-i18n', test: /i18next/, priority: 20 },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
