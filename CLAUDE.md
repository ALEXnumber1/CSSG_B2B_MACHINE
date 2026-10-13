# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CSSG B2B Machine — corporate website and lead-generation platform for **Company Of Security And Service Global C.A.** (CSSG), a Venezuelan corporate and diplomatic security firm. The site functions as a full "B2B Machine": captures leads, scores them, sends automated email sequences, and generates PDF reports — all from the browser.

**Production domain:** `cssg-global.com` | **RIF:** J-29782024-8

---

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # TypeScript check + Vite build + postbuild.js (SEO + prerender)
npm run lint       # ESLint
npm run preview    # Preview production build locally
npx wrangler dev   # Run the Cloudflare Worker locally against dist/ (build first)
```

**There are no tests.** The build pipeline is: `tsc -b → vite build → node postbuild.js`.

`postbuild.js` runs after every build — it generates per-route `index.html` files inside `dist/` with route-specific SEO meta tags (title, description, OG image, canonical URL), then prerenders each route with headless Chrome (`scripts/prerender.mjs`) so crawlers get the real content. If Chrome fails it ships un-prerendered pages; the Cloudflare deploy workflow refuses to deploy in that case.

---

## Architecture

### Stack
- **React 19 + TypeScript** via Vite 8
- **Tailwind CSS** with custom `cssg.*` color tokens (see `tailwind.config.js`)
- **Framer Motion** for all animations — every page transition uses `AnimatePresence`
- **react-i18next** for ES/EN bilingual content — all page copy lives in `src/locales/{es,en}/*.json`
- **Supabase** as the backend database (CRM, risk assessments, complaints, RRHH applications)
- **Resend** for transactional email — sent server-side by `api/mailer.js`; `src/lib/email.ts` calls the API, never Resend directly
- **Gemini** for lead scoring and buyer-persona classification (`api/_lead-ai.js`) and the Admin agent (`api/agent.js`). Groq was dropped: it blocks Venezuela
- **@react-pdf/renderer** for PDF generation, always in the browser (`src/lib/pdf/`)
- **@splinetool/react-spline** + **Three.js** for 3D visuals (hero section, security radar)
- **Jitsi Meet** embedded in `/streaming` for secure video consultations

### Code Splitting — Critical
All pages in `App.tsx` are loaded via `React.lazy()` wrapped in `<Suspense fallback={null}>`. **Do not add eager imports for pages.** `vite.config.ts` has `manualChunks` that isolate heavy vendors (three, spline, pdf, supabase, framer, i18n, react) into separate chunks. The home page initial load target is ~350KB gzip.

### Routing
`App.tsx` has a special case: `/consultoria/escudo-diplomatico` renders as a **standalone landing page** (no Navbar, no footer) — check `isStandaloneLanding` before adding layout-level changes.

SEO alias routes (`/consultoria-seguridad-caracas`, `/auditoria-seguridad-iso-31000`, etc.) all render `<Consultoria />` — they exist purely for search indexing.

### Data Layer (`src/lib/`)
- `supabase.ts` — single Supabase client; env vars `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` with hardcoded fallbacks so the site loads without `.env`
- `email.ts` — email templates + calls to `/api/mailer`; `FROM_EMAIL` is `operaciones@cssg-global.com`. The Resend key lives only on the server
- `sequences.ts` — multi-step email nurturing sequences (riesgo, consultoria, escudo flows)
- `agent-intelligence.ts` — client for `/api/agent` (Gemini lead scoring, drafts); only works with an admin session
- `leads.ts` — `saveLead()` / `insertLead()` / `registerSequence()`, the only way the site writes leads (via `/api/lead`)

### PDF System (`src/lib/pdf/`)
All PDFs are generated in the browser with `@react-pdf/renderer`; there is no server-side PDF endpoint.
- `documents/VulnerabilityReport.tsx` — the Risk Analysis report (`/analisis-riesgo`). It is rendered inside a Web Worker (`vulnerabilityReport.worker.tsx`, called through `generateVulnerabilityReport()` in `vulnerabilityReport.tsx`), because on the main thread the layout pass froze the page for 5-10 s.
- `documents/PestelReport.tsx` (`/informes`) and `documents/WhitePaper*.tsx` (white-paper landings).

@react-pdf 4.5 pitfalls, verified with PDFium (Chrome's engine). Still present in 4.9.0:
- **Never put `lineHeight` on a `<Page>` style.** It moves every `fixed` element holding a `<Text render>` (page numbers) thousands of points off the sheet, so the whole header/footer row vanishes and multi-line titles overlap. Put it on a content `View` instead (`baseStyles.pageBody`, as `PestelReport.tsx` does), with the fixed header/footer outside that View.
- A `<Text render>` nested inside another `<Text>` is never drawn.
- WebP images are not supported; use PNG/JPG (`/logo_full.png`).
- Built-in Helvetica has no `≥` glyph; it renders as `e`.
- Verify any PDF change by rendering it with PDFium and looking at it. The text being present in the file proves nothing.

Shared building blocks:
- `theme.ts` — brand colors, typography scale, spacing, `CORPORATE` constants
- `components/Header.tsx` / `components/Footer.tsx` — fixed page header (CSSG logo + document type) and footer (legal info + page numbers), used by the PESTEL report
- `components/Section.tsx` — section wrapper with sky-500 left bar


### Supabase Schema
| Table | Purpose | Public (anon key) may |
|---|---|---|
| `leads` | CRM — every form submission across the site (unique `correo`) | nothing |
| `email_sequences` | Nurturing state per lead (`process-sequences` cron) | nothing |
| `risk_assessments` | FMEA risk analysis results, JSONB pillars/vulnerabilities | INSERT |
| `complaints` | Anonymous complaints channel | INSERT |
| `testimonials` | Client testimonials | INSERT; SELECT approved |
| `blog_posts` | Blog (also prerendered and read by `api/blog.js`) | SELECT published |

Everything else (reads, edits, deletes) is admin-only: `public.is_admin()` checks the signed-in email (keep it in sync with `ADMIN_EMAILS` in `wrangler.jsonc`). Public sign-up is disabled. Migrations: `supabase/migrations/006_rls_phase_a.sql`, `007_rls_phase_b.sql`.

**Leads are only written through `/api/lead`** (`api/lead.js`, service role) via `saveLead()` / `insertLead()` / `registerSequence()` in `src/lib/leads.ts`, including from the static HTML landings in `public/`. Never write `leads` or `email_sequences` from the browser with the anon key: it is blocked by RLS and fails. Re-submitting a known email merges into the existing lead (keeps estado/notas, appends the message, keeps the higher score).

The `notify_classify_lead` trigger posts every new lead to `https://cssg-global.com/api/classify-lead` (Worker, `WEBHOOK_SECRET`), which classifies it with Gemini.

The Supabase MCP `apply_migration` is blocked by this user's permissions: write the SQL to `supabase/migrations/` and ask the user to paste it into the SQL Editor.

### i18n
All translatable content is in `src/locales/{es,en}/{namespace}.json`. The namespace list: `quienes`, `consultoria`, `tecnologia`, `risk`, `informes`, `quejas`, `intranet`, `admin`, `blog`, `streaming`, `rrhh`, `escudo`. Nav, hero, and footer strings live directly in `src/i18n.ts`. Language is auto-detected by browser; `es` is the default fallback.

### Serverless API (`api/`)
Each `api/*.js` file is a Vercel-style `(req, res)` handler. Files starting with `_` (`_gemini.js`, `_lead-ai.js`) are shared helpers, not endpoints. The Worker runs these same files through an adapter, so they must stay `(req, res)` handlers. A new endpoint must also be registered in `API_HANDLERS` in `worker/index.js`, or it returns 404.

### Deployment (Cloudflare Workers) — since 2026-10-11
`cssg-global.com` and `www` are Custom Domains of the Worker **`cssg-global`** (config in `wrangler.jsonc`, code in `worker/index.js`). Vercel no longer serves production.
- **Deploy:** GitHub Actions (`.github/workflows/deploy-cloudflare.yml`) on every push to `main`: `npm run build` with prerender, then `wrangler deploy`. Never deploy by hand from a stale `dist/`.
- **Static site:** `dist/` served as Worker assets. Unknown URLs get `dist/404.html` with a real 404. `/streaming` is served from the SPA shell, and `/blog/:slug` falls back to `api/blog.js` for posts published after the last build.
- **Worker routing:** headers, redirects (`www` → apex, `escudo-diplomático`) and `noindex` on non-production hosts all live in `worker/index.js`.
- **Security headers:** HSTS, CSP, X-Frame-Options DENY and the rest are set in `SECURITY_HEADERS` in `worker/index.js`. **Update the CSP there** when adding a third-party domain; `vercel.json` no longer applies to production.
- **Asset caching:** `/assets/*` gets 1-year immutable caching.
- **Daily cron:** `process-sequences` runs at 09:00 UTC via `triggers.crons` in `wrangler.jsonc` and the `scheduled` handler. Never schedule it in `vercel.json` as well, or leads get every email twice.
- **Secrets:** set with `npx wrangler secret put <NAME>` and never committed: `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `CRON_SECRET`. The public Supabase URL and anon key are `vars` in `wrangler.jsonc`.
- **DNS:** the zone is on Cloudflare. MX records (Google Workspace) and Resend records (`send.`, `resend._domainkey`) must never be touched.

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

Frontend (build time, public — they end up in the bundle):
```bash
VITE_SUPABASE_URL=         # Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Supabase anon key
```
The site loads without them (hardcoded fallbacks in `supabase.ts`). Never put a real secret in a `VITE_*` variable: Vite ships it to every visitor.

Server (`api/` handlers, read via `process.env`): `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `CRON_SECRET`, optional `WEBHOOK_SECRET` and `GEMINI_MODEL`.

**Internal endpoints** (`/api/agent`, `/api/launch-sequence`, `/api/process-sequences`) authorize through `api/_auth.js`. They accept either `CRON_SECRET` (machine calls) or the Admin's Supabase session token, and only for emails listed in `ADMIN_EMAILS` (a var in `wrangler.jsonc`). The frontend sends that session token through `adminAuthHeader()` in `src/lib/supabase.ts`. Never authorize on "is signed in" alone (public sign-up is disabled today, but that is a dashboard setting anyone can flip back). In production they are Worker secrets (see Deployment). Without `RESEND_API_KEY`, emails fail silently; without `GEMINI_API_KEY`, lead scoring returns `null`.

---

## Known Issues / Active Work

- **White papers have no page numbers.** Their `contentPage` style carries the `lineHeight`. Moving it to a wrapper View, as the PESTEL does, restores the numbers but changes pagination: BCP goes from 11 to 12 pages and leaves orphaned table headers. Re-flow those pages by hand before adding page numbers back
- **`notfound.tsx`** filename is lowercase — always import as `'./pages/notfound'` (the Linux CI build is case-sensitive)
- **Vercel only serves `globalservices-ven.com`**, as a 308 redirect to cssg-global.com: the host-conditioned `redirects` in `vercel.json`, deployed by the one remaining Vercel project, `cssg-b2b-machine`. Its GitHub webhook sometimes stalls; redeploy by hand. `postbuild.js` must keep skipping redirects that have a `has` condition when it writes Cloudflare's `_redirects`: copying them once sent every cssg-global.com page into a redirect loop
