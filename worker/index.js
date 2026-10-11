// Cloudflare Worker for cssg-global.com: serves the prerendered static site (env.ASSETS) and the
// dynamic routes that used to be Vercel rewrites and functions.
//
// The api/*.js handlers are the same files Vercel runs: runVercelHandler() adapts a Fetch Request to
// the (req, res) shape they expect, so one codebase serves both hosts during the migration.

const PRODUCTION_HOST = 'cssg-global.com';

// SPA routes without their own prerendered HTML file: served from the app shell.
const SHELL_ROUTES = new Set(['/streaming']);

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
    const response = await route(request, env);

    // Only the production domain may be indexed; workers.dev / preview URLs duplicate it.
    if (new URL(request.url).hostname !== PRODUCTION_HOST) {
      const marked = new Response(response.body, response);
      marked.headers.set('X-Robots-Tag', 'noindex');
      return marked;
    }
    return response;
  },
};
