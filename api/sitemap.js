import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export default async function handler(req, res) {
  const baseUrl = 'https://cssg-global.com';
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    // ─── PRINCIPALES ───
    { path: '',                                                        priority: '1.0', changefreq: 'weekly',  lastmod: today },
    { path: '/quienes-somos',                                          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/tecnologia',                                             priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/en/technology',                                          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/analisis-riesgo',                                        priority: '0.9', changefreq: 'weekly',  lastmod: today },
    { path: '/informes',                                               priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/preguntas-frecuentes',                                   priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/testimonios',                                            priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/licitaciones',                                           priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/partners',                                               priority: '0.6', changefreq: 'monthly', lastmod: today },
    { path: '/portal-rrhh',                                            priority: '0.5', changefreq: 'monthly', lastmod: today },
    { path: '/politica-privacidad',                                    priority: '0.3', changefreq: 'yearly',  lastmod: today },
    { path: '/terminos-condiciones',                                   priority: '0.3', changefreq: 'yearly',  lastmod: today },

    // ─── CONSULTORÍA HUB + ALIAS SEO ───
    { path: '/consultoria',                                            priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria-seguridad-caracas',                          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/auditoria-seguridad-iso-31000',                          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/analisis-riesgos-corporativos-venezuela',                priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/optimizacion-costos-seguridad',                          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/escudo-diplomatico',                         priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/certificaciones',                            priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/casos-de-exito',                             priority: '0.7', changefreq: 'monthly', lastmod: today },

    // ─── FAMILIA 1: EVALUACIÓN Y DIAGNÓSTICO ───
    { path: '/consultoria/evaluacion-de-riesgos-de-seguridad',         priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/diagnostico-madurez-seguridad',              priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/site-survey-evaluacion-fisica',              priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/auditoria-de-cumplimiento',                  priority: '0.8', changefreq: 'monthly', lastmod: today },

    // ─── FAMILIA 2: CONSULTORÍA DIPLOMÁTICA ───
    { path: '/consultoria/seguridad-misiones-diplomaticas',            priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/evaluacion-residencias-cancillerias',        priority: '0.8', changefreq: 'monthly', lastmod: today },

    // ─── FAMILIA 3: INTELIGENCIA E INVESTIGACIÓN ───
    { path: '/consultoria/due-diligence-corporativa',                  priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/inteligencia-y-analisis-de-riesgo',          priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/amenaza-interna-insider-threat',             priority: '0.8', changefreq: 'monthly', lastmod: today },

    // ─── FAMILIA 4: RESILIENCIA Y CONTINUIDAD ───
    { path: '/consultoria/continuidad-de-negocio',                     priority: '0.9', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/gestion-de-crisis-y-respuesta',              priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/proteccion-ejecutiva-analisis-amenazas',     priority: '0.8', changefreq: 'monthly', lastmod: today },

    // ─── FAMILIA 5: MARCO LEGAL Y COMPLIANCE ───
    { path: '/consultoria/asesoria-legal-rrhh-seguridad',              priority: '0.9', changefreq: 'monthly', lastmod: today },

    // ─── CAPA TECNOLOGÍA ───
    { path: '/consultoria/tecnologia/monitoreo-tiempo-real',           priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/tecnologia/centro-de-mando-cecom',           priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/tecnologia/scoring-de-seguridad',            priority: '0.7', changefreq: 'monthly', lastmod: today },

    // ─── CAPA CAPACITACIÓN ───
    { path: '/consultoria/capacitacion/formacion-personal-seguridad',  priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/capacitacion/respuesta-crisis-equipos',      priority: '0.7', changefreq: 'monthly', lastmod: today },
    { path: '/consultoria/capacitacion/concienciacion-ejecutiva',      priority: '0.7', changefreq: 'monthly', lastmod: today },

    // ─── WHITE PAPERS ───
    { path: '/white-papers/guia-evaluacion-riesgos-seguridad-venezuela', priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/white-papers/due-diligence-corporativa-venezuela',         priority: '0.8', changefreq: 'monthly', lastmod: today },
    { path: '/white-papers/plan-continuidad-negocio-venezuela',          priority: '0.8', changefreq: 'monthly', lastmod: today },
  ];

  const hardcodedBlogPosts = [
    { slug: 'como-elegir-empresa-seguridad-privada-venezuela', lastmod: '2026-04-12' },
    { slug: 'seguridad-corporativa-caracas-guia-completa',     lastmod: '2026-03-20' },
    { slug: 'sueldo-minimo-vigilantes-venezuela',              lastmod: '2026-05-01' },
    { slug: 'rrhh-socio-critico-seguridad',                    lastmod: '2026-04-26' },
    { slug: '5-errores-seguridad-corporativa',                 lastmod: '2026-04-05' },
    { slug: 'iso-9001-seguridad-privada-importancia',          lastmod: '2026-03-28' },
    { slug: 'analisis-pestel-seguridad-venezuela',             lastmod: '2026-03-15' },
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

  const dbSlugs = new Set(dbBlogPosts.map(p => p.slug));
  const blogPosts = [
    ...dbBlogPosts.map(p => ({ slug: p.slug, lastmod: new Date(p.updated_at || Date.now()).toISOString().split('T')[0] })),
    ...hardcodedBlogPosts.filter(p => !dbSlugs.has(p.slug)),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
${blogPosts.map(post => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).send(sitemap);
}
