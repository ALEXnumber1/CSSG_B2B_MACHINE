// Verifies the SEO output of `npm run build`:
//  - every dist/**/index.html has a unique <title>, meta description and an apex canonical
//  - the raw HTML (no JS) contains the page's visible text, measured against what a real
//    browser renders with JS on
//  - React mounting over the prerendered markup never blanks it (no Suspense-fallback flash)
//
// Usage: npm run build && npm run verify:seo [-- --json report.json]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { startServer } from './prerender.mjs';

const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

const decode = s => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
const norm = s => decode(s).replace(/\s+/g, ' ').trim().toLowerCase();

// Text a no-JS crawler gets from the raw HTML file.
function rawText(html) {
  const m = html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>\s*(?:<noscript|<script|<\/body>)/);
  const root = m ? m[1] : '';
  return norm(root
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
    // Block-level boundaries become spaces; inline tags (<strong>, <a>, <span>) join text the way innerText does.
    .replace(/<\/?(p|div|li|ul|ol|h[1-6]|br|section|article|header|footer|nav|td|th|tr|table|blockquote|button|label|option)\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ''));
}
const meta = (html, re) => (html.match(re) || [])[1] || '';

const files = fs.readdirSync(distDir, { recursive: true })
  .map(f => f.replace(/\\/g, '/'))
  .filter(f => f.endsWith('index.html'));

const server = await startServer(distDir);
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

const rows = [];
for (const file of files) {
  const route = '/' + file.replace(/index\.html$/, '').replace(/\/$/, '');
  const html = fs.readFileSync(path.join(distDir, file), 'utf8');
  if (!html.includes('<div id="root"')) continue; // standalone static HTML from public/, not part of the SPA
  const row = {
    route,
    title: decode(meta(html, /<title>(.*?)<\/title>/)),
    description: decode(meta(html, /<meta name="description" content="(.*?)"/)),
    canonical: meta(html, /<link rel="canonical" href="(.*?)"/),
    robots: meta(html, /<meta name="robots" content="(.*?)"/),
    prerendered: /data-prerendered=/.test(html),
  };
  rows.push(row);
  if (row.robots.includes('noindex')) continue;

  const raw = rawText(html);
  const page = await browser.newPage();
  const jsErrors = [];
  page.on('pageerror', e => jsErrors.push(e.message.slice(0, 160)));
  await page.evaluateOnNewDocument(() => {
    try { localStorage.setItem('cssg_cookie_consent', 'declined'); localStorage.setItem('cssg_cta_exit_seen', 'true'); } catch { /* */ }
    // Smallest amount of text #root shows while the app boots: if React swapped the prerendered
    // markup for a Suspense fallback, this drops close to zero.
    window.__minRootText = Infinity;
    const t0 = performance.now();
    const sample = () => {
      const el = document.getElementById('root');
      if (el) window.__minRootText = Math.min(window.__minRootText, el.innerText.trim().length);
      if (performance.now() - t0 < 4000) requestAnimationFrame(sample);
    };
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(sample));
  });
  await page.setRequestInterception(true);
  page.on('request', r => (/googletagmanager|google-analytics|ahrefs|vercel|youtube|spline\.design/.test(r.url()) ? r.abort() : r.continue()));
  await page.goto(origin + route, { waitUntil: 'networkidle0', timeout: 45000 }).catch(() => {});
  await new Promise(r => setTimeout(r, 1500));
  const { lines, h1, minRootText } = await page.evaluate(() => ({
    // Text a visitor can read: one entry per block of visible text.
    lines: (document.getElementById('root')?.innerText || '').split('\n').map(s => s.trim()).filter(s => s.length >= 25),
    h1: document.querySelector('h1')?.innerText || '',
    minRootText: window.__minRootText,
  }));
  await page.close();

  row.h1 = h1.replace(/\s+/g, ' ').trim();
  row.h1InRawHtml = !!row.h1 && raw.includes(norm(row.h1));
  row.rawTextChars = raw.length;
  row.visibleBlocks = lines.length;
  row.coverage = lines.length ? Math.round((lines.filter(l => raw.includes(norm(l))).length / lines.length) * 100) : 0;
  row.missingSample = lines.filter(l => !raw.includes(norm(l))).slice(0, 3);
  row.minTextDuringBoot = minRootText;
  row.flash = minRootText < raw.length * 0.5;
  row.jsErrors = jsErrors;
}
await browser.close();
server.close();

const indexable = rows.filter(r => !r.robots.includes('noindex'));
const dup = key => {
  const seen = new Map();
  indexable.forEach(r => seen.set(r[key], [...(seen.get(r[key]) || []), r.route]));
  return [...seen.entries()].filter(([, v]) => v.length > 1);
};

console.log('\nroute | prerendered | h1 in raw HTML | visible text in raw HTML | raw text chars | min text while booting | JS errors');
for (const r of rows) {
  if (r.robots.includes('noindex')) { console.log(`${r.route} | noindex (not prerendered)`); continue; }
  console.log(`${r.route} | ${r.prerendered ? 'yes' : 'NO'} | ${r.h1InRawHtml ? 'yes' : r.h1 ? 'NO' : 'no <h1> on page'} | ${r.coverage}% of ${r.visibleBlocks} blocks | ${r.rawTextChars} | ${r.minTextDuringBoot}${r.flash ? ' FLASH' : ''} | ${r.jsErrors.length}`);
}
console.log('\nDuplicate titles:', JSON.stringify(dup('title')));
console.log('Duplicate descriptions:', JSON.stringify(dup('description')));
console.log('Non-apex canonicals:', JSON.stringify(rows.filter(r => !r.canonical.startsWith('https://cssg-global.com/')).map(r => r.route)));

const out = process.argv.indexOf('--json');
if (out > -1) fs.writeFileSync(process.argv[out + 1], JSON.stringify(rows, null, 2));

const failures = indexable.filter(r => !r.prerendered || r.coverage < 90 || r.flash);
console.log(`\n${indexable.length - failures.length}/${indexable.length} indexable pages pass (prerendered, ≥90% of visible text in raw HTML, no blank flash on boot).`);
if (failures.length) console.log('Failing:', failures.map(r => r.route).join(', '));
process.exitCode = failures.length ? 1 : 0;
