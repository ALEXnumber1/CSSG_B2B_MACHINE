import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  const baseUrl = 'https://cssg-global.com';
  
  // 1. Rutas estáticas y de consultoría especializada
  const staticRoutes = [
    { path: '', priority: '1.0' },
    { path: '/quienes-somos', priority: '0.8' },
    { path: '/tecnologia', priority: '0.9' },
    { path: '/consultoria-seguridad-caracas', priority: '0.9' },
    { path: '/auditoria-seguridad-iso-31000', priority: '0.9' },
    { path: '/analisis-riesgos-corporativos-venezuela', priority: '0.9' },
    { path: '/optimizacion-costos-seguridad', priority: '0.9' },
    { path: '/blog', priority: '0.7' },
    { path: '/analisis-riesgo', priority: '0.8' }
  ];

  let blogPosts = [];
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true);
    
    if (data) {
      blogPosts = data;
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // 3. Generar el XML con lastmod
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes.map(route => `
    <url>
      <loc>${baseUrl}${route.path}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <priority>${route.priority}</priority>
    </url>`).join('')}
  ${blogPosts.map(post => `
    <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${new Date(post.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod>
      <priority>0.6</priority>
    </url>`).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).send(sitemap);
}
