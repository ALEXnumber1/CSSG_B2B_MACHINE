# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CSSG B2B Machine — corporate website and lead-generation platform for **Company Of Security And Service Global C.A.** (CSSG), a Venezuelan corporate and diplomatic security firm. The site functions as a full "B2B Machine": captures leads, scores them, sends automated email sequences, and generates PDF reports — all from the browser.

**Production domain:** `cssg-global.com` | **RIF:** J-29782024-8

---

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # TypeScript check + Vite build + postbuild.js SEO generation
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

**There are no tests.** The build pipeline is: `tsc -b → vite build → node postbuild.js`.

`postbuild.js` runs after every build — it generates per-route `index.html` files inside `dist/` with route-specific SEO meta tags (title, description, OG image, canonical URL). This is required for Vercel SPA deployments to have proper SEO on each route.

---

## Architecture

### Stack
- **React 19 + TypeScript** via Vite 8
- **Tailwind CSS** with custom `cssg.*` color tokens (see `tailwind.config.js`)
- **Framer Motion** for all animations — every page transition uses `AnimatePresence`
- **react-i18next** for ES/EN bilingual content — all page copy lives in `src/locales/{es,en}/*.json`
- **Supabase** as the backend database (CRM, risk assessments, complaints, RRHH applications)
- **Resend** for transactional email (nurturing sequences via `src/lib/email.ts`)
- **@react-pdf/renderer** for PDF generation (Sprint 2 — in progress, base components in `src/lib/pdf/`)
- **@splinetool/react-spline** + **Three.js** for 3D visuals (hero section, security radar)
- **Jitsi Meet** embedded in `/streaming` for secure video consultations

### Code Splitting — Critical
All pages in `App.tsx` are loaded via `React.lazy()` wrapped in `<Suspense fallback={null}>`. **Do not add eager imports for pages.** `vite.config.ts` has `manualChunks` that isolate heavy vendors (three, spline, pdf, supabase, framer, i18n, react) into separate chunks. The home page initial load target is ~350KB gzip.

### Routing
`App.tsx` has a special case: `/consultoria/escudo-diplomatico` renders as a **standalone landing page** (no Navbar, no footer) — check `isStandaloneLanding` before adding layout-level changes.

SEO alias routes (`/consultoria-seguridad-caracas`, `/auditoria-seguridad-iso-31000`, etc.) all render `<Consultoria />` — they exist purely for search indexing.

### Data Layer (`src/lib/`)
- `supabase.ts` — single Supabase client; env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` with hardcoded fallbacks so the site loads without `.env`
- `email.ts` — Resend API wrapper; `FROM_EMAIL` is `operaciones@cssg-global.com`; requires `VITE_RESEND_API_KEY`
- `sequences.ts` — multi-step email nurturing sequences (riesgo, consultoria, escudo flows)
- `agent-intelligence.ts` — stub for an agentic LLM layer (lead scoring, auto-responder); not yet wired to a live LLM API

### PDF System (`src/lib/pdf/`) — Sprint 2 in progress
Reusable component library built on `@react-pdf/renderer`:
- `theme.ts` — brand colors, typography scale, spacing, `CORPORATE` constants
- `components/Header.tsx` — fixed page header with CSSG logo + document type
- `components/Footer.tsx` — fixed page footer with legal info + page numbers
- `components/Section.tsx` — section wrapper with sky-500 left bar
- `components/ScoreCard.tsx` — dark score display card (for risk index)
- `components/InfoGrid.tsx` — two-column client + context data grid

Current PDF generation in `RiskAnalysis.tsx` and `Informes.tsx` still uses the legacy `html2canvas` + `jsPDF` approach and has known Cloudflare interception issues. Migration to `@react-pdf/renderer` is the Sprint 2 goal.

### Supabase Schema (4 tables)
| Table | Purpose |
|---|---|
| `leads` | CRM — all contact form submissions across the site |
| `risk_assessments` | Full FMEA risk analysis results with JSONB pillars/vulnerabilities |
| `complaints` | Anonymous complaints channel |
| `rrhh_applications` | Job applications from `/portal-rrhh` |

RLS is enabled on all tables: public INSERT, authenticated SELECT only.

### i18n
All translatable content is in `src/locales/{es,en}/{namespace}.json`. The namespace list: `quienes`, `consultoria`, `tecnologia`, `risk`, `informes`, `quejas`, `intranet`, `admin`, `blog`, `streaming`, `rrhh`, `escudo`. Nav, hero, and footer strings live directly in `src/i18n.ts`. Language is auto-detected by browser; `es` is the default fallback.

### Deployment (Vercel)
- `vercel.json` rewrites all routes to `/index.html` for SPA routing
- Security headers are set globally: HSTS, CSP, X-Frame-Options DENY, CORP
- `/assets/*` gets 1-year immutable cache headers
- The CSP allowlist includes: Supabase, YouTube, Jitsi, Google Meet, Resend, Vercel Analytics — update it if adding new third-party domains

---

## Design System — Non-Negotiable Rules

This is a **"Luxury Tech"** dark-mode brand. Violating the visual identity is a breaking change.

- **Background:** Always `#0B0B0F` (`bg-[#0B0B0F]`) or `#030305`. Never white backgrounds.
- **Glassmorphism cards:** `backdrop-blur-xl bg-white/5 border border-white/5`
- **Primary accent:** `#0EA5E9` (sky-500) — interactive elements, links, highlights
- **Premium accent:** `#EAB308` (gold) — used sparingly for premium callouts only
- **Success/active:** emerald spectrum (`#10B981` → `#34D399`)
- **Tailwind custom tokens:** `cssg.dark`, `cssg.card`, `cssg.border`, `cssg.accent`, `cssg.premium` (see `tailwind.config.js`)
- **Animations:** All interactions require Framer Motion feedback. Use `shimmer` animation for loading states.
- **Typography:** `font-black tracking-tight` for headings; `text-gray-400` for body copy

---

## Business Context (for copywriting and features)

The 5 authority pillars that must appear in all commercial copy:
1. **+12 years without a single security incident** — primary trust anchor
2. **ISO 9001:2015 certification** — quality guarantee
3. **Diplomatic/G7 standard** — exclusive niche (embassies, high-value corps)
4. **Zentinel Global alliance** — strategic tech partner
5. **Highest-paid security staff in Venezuela** → near-zero rotation → loyalty

**Risk methodology:** FMEA-based scoring, referenced against ISO 31000:2018 and ASIS ORM.1:2017. Score formula: `(Probability × 0.4) + (Impact × 0.6)`.

**Lead funnel:** Risk Analysis tool (free) → PESTEL Report (free) → Commercial Proposal (PDF) → Tactical Audit consultation → Contract. Hot leads (score > 50 or "urgente"/"presupuesto" keywords) must be contacted within 12 hours.

---

## Environment Variables

```bash
VITE_SUPABASE_URL=         # Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Supabase anon key
VITE_RESEND_API_KEY=        # Resend API key for email sequences
```

The site loads without these variables (hardcoded fallbacks in `supabase.ts`), but email sequences will silently fail without `VITE_RESEND_API_KEY`.

---

## Known Issues / Active Work

- **Legacy PDF generation** in `RiskAnalysis.tsx` and `Informes.tsx` uses `html2canvas` which Cloudflare can intercept — being replaced with `@react-pdf/renderer` in Sprint 2
- **`notfound.tsx`** filename is lowercase — always import as `'./pages/notfound'` (Linux/Vercel is case-sensitive)
- **`agent-intelligence.ts`** contains stub LLM skills (lead scoring, auto-responder) not yet connected to a live API
