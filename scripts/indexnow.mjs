// Tells Bing (and through it ChatGPT search, Yandex, Seznam, Naver) which pages changed in a
// deploy, via IndexNow. Bing frowns on re-submitting unchanged URLs, so only changed pages go out.
//
//   node scripts/indexnow.mjs diff     before deploy: compare each sitemap page in dist/ with the
//                                      live one and write the changed URLs to indexnow-urls.txt
//   node scripts/indexnow.mjs submit   after deploy: send those URLs to IndexNow
//
// The key is public by design: Bing checks it at https://cssg-global.com/<key>.txt (public/).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const SITE = 'https://cssg-global.com';
const KEY = 'db7069609d180503549a15e00edd5fc6';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const listFile = path.join(root, 'indexnow-urls.txt');

// What a crawler cares about: title, description and visible text. Asset hashes, inline scripts
// and JSON-LD whitespace change on every build and must not count as a content change.
function fingerprint(html) {
  const pick = re => (html.match(re) || [])[1] || '';
  const title = pick(/<title>([\s\S]*?)<\/title>/i);
  const desc = pick(/<meta name="description" content="([^"]*)"/i);
  const body = (html.match(/<div id="root"[^>]*>([\s\S]*)<\/div>/) || [])[1] || '';
  const text = body
    .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return `${title}\n${desc}\n${text}`;
}

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
}

function distFile(url) {
  const p = new URL(url).pathname.replace(/^\/|\/$/g, '');
  return path.join(distDir, p, 'index.html');
}

async function diff() {
  const changed = [];
  for (const url of sitemapUrls()) {
    const file = distFile(url);
    if (!fs.existsSync(file)) continue;
    let live = '';
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
      if (res.ok) live = await res.text();
    } catch { /* unreachable or new: counts as changed */ }
    if (!live || fingerprint(live) !== fingerprint(fs.readFileSync(file, 'utf8'))) changed.push(url);
  }
  fs.writeFileSync(listFile, changed.join('\n'));
  console.log(`[IndexNow] ${changed.length} changed page(s)`);
  changed.forEach(u => console.log(`  ${u}`));
}

async function submit() {
  const urlList = fs.existsSync(listFile) ? fs.readFileSync(listFile, 'utf8').split('\n').filter(Boolean) : [];
  if (!urlList.length) return console.log('[IndexNow] nothing changed, nothing to submit');
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });
  // 200/202 = accepted. Anything else is logged but never fails the deploy: the site is already live.
  console.log(`[IndexNow] submitted ${urlList.length} URL(s): HTTP ${res.status} ${await res.text()}`);
}

const mode = process.argv[2];
if (mode === 'diff') await diff();
else if (mode === 'submit') await submit();
else { console.error('usage: node scripts/indexnow.mjs diff|submit'); process.exit(1); }
