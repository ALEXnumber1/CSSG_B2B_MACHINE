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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@react-pdf')) return 'vendor-pdf';
          if (id.includes('@splinetool')) return 'vendor-spline';
          if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('framer-motion')) return 'vendor-framer';
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n';
          if (id.includes('react-dom') || id.includes('react-router')) return 'vendor-react';
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
