// Cloudflare Worker for cssg-global.com: serves the prerendered static site (env.ASSETS) and the
// dynamic routes that used to be Vercel rewrites and functions.
//
// The api/*.js handlers are the same files Vercel runs: runVercelHandler() adapts a Fetch Request to
// the (req, res) shape they expect, so one codebase serves both hosts during the migration.

const PRODUCTION_HOST = 'cssg-global.com';

// SPA routes without their own prerendered HTML file: served from the app shell.
const SHELL_ROUTES = new Set(['/streaming']);

// Permanent redirects carried over from vercel.json (keys are decoded pathnames).
const REDIRECTS = new Map([
  ['/consultoria/escudo-diplomático', '/consultoria/escudo-diplomatico'],
]);

// Security headers for every response, as vercel.json set them. Update the CSP allowlist when adding
// a third-party domain.
const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.supabase.co https://*.google.com https://meet.jit.si https://www.youtube.com https://s.ytimg.com https://va.vercel-scripts.com https://cdn.tailwindcss.com https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.ahrefs.com",
    "worker-src blob: 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://flagcdn.com https://*.flagcdn.com https://*.supabase.co https://i.ytimg.com https://img.youtube.com https://placehold.co",
    "font-src 'self' data: https://fonts.gstatic.com https://unpkg.com",
    "media-src 'self' blob: https://assets.mixkit.co",
    "connect-src 'self' data: blob: https://*.supabase.co wss://*.supabase.co https://api.resend.com https://vitals.vercel-insights.com https://cdn.tailwindcss.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://analytics.ahrefs.com https://fonts.gstatic.com https://unpkg.com",
    "frame-src 'self' https://*.google.com https://meet.jit.si https://www.youtube.com https://registry.blockmarktech.com https://www.googletagmanager.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formsubmit.co",
  ].join('; ') + ';',
};

// Loaded on first use: each module reads its secrets at import time, so a missing secret only breaks
// its own endpoint (as with Vercel's isolated functions) instead of the whole Worker.
const API_HANDLERS = {
  'mailer': () => import('../api/mailer.js'),
  'send-email': () => import('../api/send-email.js'),
  'agent': () => import('../api/agent.js'),
  'qualify-lead': () => import('../api/qualify-lead.js'),
  'classify-lead': () => import('../api/classify-lead.js'),
  'launch-sequence': () => import('../api/launch-sequence.js'),
  'trigger-sequence': () => import('../api/trigger-sequence.js'),
  'process-sequences': () => import('../api/process-sequences.js'),
};

// PDF rendering (@react-pdf on the server) is too CPU-heavy for a Worker; until it moves to the
// browser, forward it server-to-server to the Vercel deployment that already runs it.
const PDF_ORIGIN = 'https://globalservices-ven.com';

async function runVercelHandler(handler, request, env, query = {}) {
  const url = new URL(request.url);
  const clientIp = request.headers.get('cf-connecting-ip') || '';
  const headers = {
    ...Object.fromEntries(request.headers),
    'x-forwarded-for': clientIp,
    'x-forwarded-proto': url.protocol.replace(':', ''),
    'x-forwarded-host': url.host,
    host: url.host,
  };

  let body;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const text = await request.text();
    if ((headers['content-type'] || '').includes('application/json') && text) {
      try { body = JSON.parse(text); } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
    } else {
      body = text;
    }
  }

  const req = {
    method: request.method,
    url: url.pathname + url.search,
    headers,
    body,
    query: { ...Object.fromEntries(url.searchParams), ...query },
    socket: { remoteAddress: clientIp },
    assets: env.ASSETS, // lets api/blog.js read the SPA shell without fetching its own hostname
  };

  let status = 200;
  let sent = null;
  const outHeaders = new Headers();
  const res = {
    status(code) { status = code; return res; },
    setHeader(name, value) { outHeaders.set(name, String(value)); return res; },
    getHeader(name) { return outHeaders.get(name); },
    json(data) {
      if (!outHeaders.has('content-type')) outHeaders.set('content-type', 'application/json; charset=utf-8');
      sent = JSON.stringify(data);
      return res;
    },
    send(data) {
      if (data !== null && typeof data === 'object' && !(data instanceof Uint8Array) && !(data instanceof ArrayBuffer)) return res.json(data);
      sent = data ?? '';
      return res;
    },
    end(data) { sent = data ?? ''; return res; },
  };

  await handler(req, res);
  return new Response(sent ?? null, { status: sent === null && status === 200 ? 204 : status, headers: outHeaders });
}

async function route(request, env) {
  const url = new URL(request.url);

  // www → apex (the canonical host), as Vercel did.
  if (url.hostname === `www.${PRODUCTION_HOST}`) {
    url.hostname = PRODUCTION_HOST;
    return Response.redirect(url.toString(), 301);
  }

  let pathname = url.pathname;
  try { pathname = decodeURIComponent(pathname); } catch { /* malformed escape: no redirect applies */ }
  const redirect = REDIRECTS.get(pathname);
  if (redirect) return Response.redirect(new URL(redirect + url.search, url).toString(), 308);

  if (url.pathname === '/api/generate-pdf') {
    return fetch(new Request(PDF_ORIGIN + url.pathname + url.search, request));
  }

  if (url.pathname.startsWith('/api/')) {
    const load = API_HANDLERS[url.pathname.slice('/api/'.length)];
    if (!load) return Response.json({ error: 'Not found' }, { status: 404 });
    try {
      return await runVercelHandler((await load()).default, request, env);
    } catch (err) {
      console.error(`[worker] ${url.pathname} failed:`, err);
      return Response.json({ error: 'Internal error' }, { status: 500 });
    }
  }

  if (SHELL_ROUTES.has(url.pathname)) {
    return env.ASSETS.fetch(new Request(new URL('/spa-shell', url), request));
  }

  // /blog/:slug — prerendered posts are static files; posts published after the last build are
  // rendered by api/blog.js (SEO tags injected into the SPA shell), as the Vercel rewrite did.
  const blog = url.pathname.match(/^\/blog\/([^/]+)$/);
  if (blog) {
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;
    const { default: blogHandler } = await import('../api/blog.js');
    return runVercelHandler(blogHandler, request, env, { slug: decodeURIComponent(blog[1]) });
  }

  return env.ASSETS.fetch(request);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const routed = await route(request, env);
    const response = new Response(routed.body, routed); // assets/redirect responses have immutable headers

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) response.headers.set(name, value);
    // Vite fingerprints everything under /assets/, so it can be cached forever.
    if (url.pathname.startsWith('/assets/') && response.ok) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // Only the production domain may be indexed; workers.dev / preview URLs duplicate it.
    if (url.hostname !== PRODUCTION_HOST) response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  },

  // Daily email-sequence run (the Vercel cron in vercel.json). The trigger itself lives in
  // wrangler.jsonc and must only be enabled at the cutover, or both hosts send the same emails.
  async scheduled(_controller, env) {
    const { default: handler } = await import('../api/process-sequences.js');
    const request = new Request(`https://${PRODUCTION_HOST}/api/process-sequences`, {
      headers: env.CRON_SECRET ? { authorization: `Bearer ${env.CRON_SECRET}` } : {},
    });
    const response = await runVercelHandler(handler, request, env);
    console.log(`[cron] process-sequences -> ${response.status}: ${await response.text()}`);
  },
};
