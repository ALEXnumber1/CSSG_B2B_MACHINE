// Cloudflare Worker for cssg-global.com: serves the prerendered static site (env.ASSETS) and the
// dynamic routes that used to be Vercel rewrites and functions.

const PRODUCTION_HOST = 'cssg-global.com';

// SPA routes without their own prerendered HTML file: served from the app shell.
const SHELL_ROUTES = new Set(['/streaming']);

async function route(request, env) {
  const url = new URL(request.url);

  if (url.pathname.startsWith('/api/')) {
    // Vercel functions are being ported one by one (migration step 5).
    return Response.json({ error: 'Not migrated yet' }, { status: 501 });
  }

  if (SHELL_ROUTES.has(url.pathname)) {
    return env.ASSETS.fetch(new Request(new URL('/spa-shell', url), request));
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
