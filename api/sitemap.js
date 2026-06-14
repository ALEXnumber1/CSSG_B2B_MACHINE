import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  const baseUrl = 'https://cssg-global.com';
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { path: '', priority: '1.0', lastmod: today },
    { path: '/quienes-somos', priority: '0.8', lastmod: '2026-05-19' },
    { path: '/consultoria', priority: '0.9', lastmod: '2026-05-19' },
    { path: '/consultoria-seguridad-caracas', priority: '0.8', lastmod: '2026-05-19' },
    { path: '/auditoria-seguridad-iso-31000', priority: '0.8', lastmod: '2026-05-19' },
    { path: '/analisis-riesgos-corporativos-venezuela', priority: '0.8', lastmod: '2026-05-19' },
    { path: '/optimizacion-costos-seguridad', priority: '0.8', lastmod: '2026-05-19' },
    { path: '/tecnologia', priority: '0.9', lastmod: '2026-05-19' },
    { path: '/analisis-riesgo', priority: '0.9', lastmod: '2026-05-19' },
    { path: '/informes', priority: '0.7', lastmod: '2026-05-19' },
    { path: '/consultoria/escudo-diplomatico', priority: '0.9', lastmod: '2026-05-19' },
    { path: '/optimizacion/', priority: '0.8', lastmod: '2026-06-11' },
    { path: '/en/technology', priority: '0.8', lastmod: '2026-06-12' },
    { path: '/preguntas-frecuentes', priority: '0.8', lastmod: '2026-06-13' },
    { path: '/testimonios', priority: '0.7', lastmod: '2026-06-13' },
    { path: '/blog', priority: '0.8', lastmod: today },
    { path: '/licitaciones', priority: '0.7', lastmod: '2026-05-19' },
    { path: '/partners', priority: '0.6', lastmod: '2026-05-19' },
  ];

  // Hardcoded blog posts — always included regardless of Supabase availability
  const hardcodedBlogPosts = [
    { slug: 'como-elegir-empresa-seguridad-privada-venezuela', lastmod: '2026-04-12' },
    { slug: 'seguridad-corporativa-caracas-guia-completa', lastmod: '2026-03-20' },
    { slug: 'sueldo-minimo-vigilantes-venezuela', lastmod: '2026-05-01' },
    { slug: 'rrhh-socio-critico-seguridad', lastmod: '2026-04-26' },
    { slug: '5-errores-seguridad-corporativa', lastmod: '2026-04-05' },
    { slug: 'iso-9001-seguridad-privada-importancia', lastmod: '2026-03-28' },
    { slug: 'analisis-pestel-seguridad-venezuela', lastmod: '2026-03-15' },
  ];

  let dbBlogPosts = [];
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('published', true);
      if (data) dbBlogPosts = data;
    } catch (error) {
      console.error('Error fetching blog posts for sitemap:', error);
    }
  }

  // Merge: DB posts take priority, fallback to hardcoded
  const dbSlugs = new Set(dbBlogPosts.map(p => p.slug));
  const blogPosts = [
    ...dbBlogPosts.map(p => ({ slug: p.slug, lastmod: new Date(p.updated_at || Date.now()).toISOString().split('T')[0] })),
    ...hardcodedBlogPosts.filter(p => !dbSlugs.has(p.slug)),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${route.lastmod}</lastmod>
      <priority>${route.priority}</priority>
    </url>`).join('')}
  ${blogPosts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${post.lastmod}</lastmod>
      <priority>0.7</priority>
    </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).send(sitemap);
}
