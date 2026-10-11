// Static prerendering for the SPA.
//
// After `vite build` + the meta injection in postbuild.js, every route already has its own
// dist/<route>/index.html with the right <head> — but an empty <div id="root"></div>, so crawlers
// that don't execute JS (and AI bots) see no content. This script serves dist/ locally, opens each
// route in headless Chrome (Puppeteer), waits for React to render, and writes the rendered #root
// markup back into that route's HTML file. main.tsx then hydrates that markup instead of
// re-rendering from scratch.
//
// We use a real browser instead of SSR (vite-react-ssg) because many pages depend on browser-only
// APIs (Three.js, Spline, react-pdf, localStorage-based i18n) — this captures exactly what a
// visitor sees without refactoring the router or any page.

import fs from 'fs';
import http from 'http';
import path from 'path';
import puppeteer from 'puppeteer';

// Vercel's build image lacks the system libraries Puppeteer's bundled Chrome needs (libnspr4, libnss3…),
// so there we use @sparticuz/chromium, a Chromium build that ships its own. Locally, the regular Chrome.
export async function launchBrowser() {
  if (process.env.VERCEL) {
    const { default: chromium } = await import('@sparticuz/chromium');
    // Its defaults target single-page Lambda runs: drop --single-process (we render 4 pages in parallel)
    // and the flags that relax web security, so snapshots match what a real visitor's browser renders.
    const dropped = new Set(['--single-process', '--disable-web-security', '--allow-running-insecure-content']);
    const args = chromium.args.filter(a => !dropped.has(a));
    return puppeteer.launch({ executablePath: await chromium.executablePath(), args, headless: true });
  }
  return puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain',
  '.xml': 'application/xml', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.splinecode': 'application/octet-stream', '.glb': 'model/gltf-binary',
};

// Third parties that must not run (or be counted as page views) during prerendering.
// Supabase stays allowed so the blog renders posts stored in the DB.
const BLOCKED_HOSTS = [
  'googletagmanager.com', 'google-analytics.com', 'analytics.google.com', 'ahrefs.com',
  'vercel-insights.com', 'va.vercel-scripts.com', 'vercel-scripts.com', 'youtube.com', 'ytimg.com',
  'meet.jit.si', 'spline.design', 'mixkit.co', 'api.resend.com', 'formsubmit.co',
];

const CONCURRENCY = 4;
const NAV_TIMEOUT = 45000;

export function startServer(distDir) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(distDir, urlPath);
    if (!file.startsWith(distDir)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      // Same fallback as Vercel: unknown paths get the SPA shell.
      const asHtml = path.join(distDir, urlPath, 'index.html');
      file = fs.existsSync(asHtml) ? asHtml : path.join(distDir, 'spa-shell.html');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function renderRoute(browser, origin, route) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setViewport({ width: 1366, height: 900 });

  const lang = route.path.startsWith('en/') ? 'en' : 'es';
  // Deterministic first-visit state: language fixed per route, cookie banner and exit-intent
  // CTA suppressed (they only appear after mount, so hydration stays consistent either way).
  await page.evaluateOnNewDocument(l => {
    try {
      localStorage.setItem('i18nextLng', l);
      localStorage.setItem('cssg_cookie_consent', 'declined');
      localStorage.setItem('cssg_cta_exit_seen', 'true');
    } catch { /* ignore */ }
    window.__PRERENDER__ = true;
  }, lang);

  await page.setRequestInterception(true);
  page.on('request', req => {
    const url = req.url();
    if (BLOCKED_HOSTS.some(h => url.includes(h)) || req.resourceType() === 'media') return req.abort();
    req.continue();
  });

  const url = `${origin}/${route.path}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT });
  } catch (e) {
    // networkidle can time out on pages with long-polling widgets; the DOM is usually ready.
    if (!/timeout/i.test(e.message)) throw e;
  }
  await page.waitForFunction(() => (document.getElementById('root')?.innerText || '').trim().length > 100, { timeout: 15000 });

  // Scroll through the page so Framer Motion `whileInView` sections reveal before the snapshot.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.75;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1200));

  // Pages that redirect on load (e.g. a guard) must not be saved under the original path.
  const finalPath = decodeURI(new URL(page.url()).pathname).replace(/\/+$/, '');
  if (finalPath !== `/${route.path}`.replace(/\/+$/, '')) {
    await page.close();
    throw new Error(`redirected to ${finalPath} — not prerendered`);
  }

  const html = await page.evaluate(() => document.getElementById('root').innerHTML);
  const textLength = await page.evaluate(() => document.getElementById('root').innerText.trim().length);
  await page.close();
  return { html, textLength, errors };
}

/**
 * @param {{ distDir: string, routes: { path: string }[] }} opts  route.path has no leading slash; '' = home
 */
export async function prerender({ distDir, routes }) {
  const server = await startServer(distDir);
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  const results = [];
  try {
    browser = await launchBrowser();
  } catch (e) {
    server.close();
    console.warn(`\n[Prerender] ⚠️  Could not launch headless Chrome — pages ship WITHOUT prerendered content.\n  ${e.message}\n`);
    return results;
  }

  const queue = [...routes];
  async function worker() {
    while (queue.length) {
      const route = queue.shift();
      const file = path.join(distDir, route.path, 'index.html');
      try {
        const { html, textLength, errors } = await renderRoute(browser, origin, route);
        const source = fs.readFileSync(file, 'utf8');
        const routeAttr = '/' + route.path;
        const out = source.replace(
          /<div id="root"><\/div>/,
          () => `<div id="root" data-prerendered="${routeAttr}">${html}</div>`
        );
        fs.writeFileSync(file, out);
        results.push({ path: routeAttr, ok: true, textLength, errors });
        console.log(`[Prerender] ✓ ${routeAttr} (${textLength} chars of text)${errors.length ? ` — ${errors.length} page error(s)` : ''}`);
      } catch (e) {
        results.push({ path: '/' + route.path, ok: false, error: e.message });
        console.warn(`[Prerender] ✗ /${route.path}: ${e.message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();
  server.close();

  const failed = results.filter(r => !r.ok);
  console.log(`[Prerender] ${results.length - failed.length}/${results.length} routes prerendered.`);
  if (failed.length) console.warn(`[Prerender] ⚠️  Failed: ${failed.map(f => f.path).join(', ')}`);
  return results;
}
