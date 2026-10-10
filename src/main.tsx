// Buffer polyfill — react-pdf usa Buffer globalmente en el browser
import { Buffer } from 'buffer';
if (typeof (globalThis as Record<string, unknown>).Buffer === 'undefined') {
  (globalThis as Record<string, unknown>).Buffer = Buffer;
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App, { preloadRoute } from './App.tsx'

// Pages ship with prerendered HTML (scripts/prerender.mjs) that stays on screen until React mounts.
// That markup can't be hydrated (a browser snapshot lacks React's Suspense boundary markers), so we
// render normally — but only after the current route's chunk has loaded, so the first commit already
// contains the page and replaces the identical markup without flashing the Suspense fallback.
preloadRoute(window.location.pathname)
  .catch(() => { /* render anyway; lazy() retries and surfaces the error */ })
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
