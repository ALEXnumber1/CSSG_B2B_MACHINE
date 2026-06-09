export default async function handler(req, res) {
  const { slug } = req.query;

  // Supabase env variables (accessible in Vercel)
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  let postTitle = 'Blog | CSSG';
  let postDescription = 'Artículos, análisis y metodologías de seguridad corporativa y protección ejecutiva.';
  let postImage = 'https://cssg-global.com/images/default-blog.png';

  let postDate = '2026-04-01';

  // Hardcoded posts list as fallback
  const hardcodedPosts = {
    'como-elegir-empresa-seguridad-privada-venezuela': {
      title: 'Cómo elegir una empresa de seguridad privada en Venezuela | CSSG | Caracas · Miami',
      description: 'Guía práctica para seleccionar una empresa de seguridad corporativa en Venezuela. Criterios clave: certificaciones, experiencia, tecnología y respaldo legal.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80',
      date: '2026-04-12'
    },
    '5-errores-seguridad-corporativa': {
      title: '5 Errores Críticos en Seguridad Corporativa que Debes Evitar | CSSG | Caracas · Miami',
      description: 'Los 5 errores más comunes en seguridad corporativa en Venezuela y cómo evitarlos para proteger tu empresa de amenazas reales.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      date: '2026-04-05'
    },
    'iso-9001-seguridad-privada-importancia': {
      title: 'Por qué ISO 9001 es Clave en la Seguridad Privada | CSSG | Caracas · Miami',
      description: 'Descubre por qué la certificación ISO 9001:2015 es fundamental para garantizar calidad y confiabilidad en una empresa de seguridad privada.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
      date: '2026-03-28'
    },
    'seguridad-corporativa-caracas-guia-completa': {
      title: 'Seguridad Corporativa en Caracas: Guía Completa 2026 | CSSG | Caracas · Miami',
      description: 'Todo lo que necesitas saber sobre seguridad corporativa en Caracas. Protocolos, tecnología y estrategias para proteger tu empresa en Venezuela.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      date: '2026-03-20'
    },
    'analisis-pestel-seguridad-venezuela': {
      title: 'Análisis PESTEL de Seguridad en Venezuela 2026 | CSSG | Caracas · Miami',
      description: 'Análisis completo de los factores Políticos, Económicos, Sociales, Tecnológicos, Ecológicos y Legales que impactan la seguridad en Venezuela.',
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
      date: '2026-03-15'
    },
    'rrhh-socio-critico-seguridad': {
      title: 'RRHH como Socio Crítico en la Seguridad Corporativa | CSSG | Caracas · Miami',
      description: 'Cómo el departamento de Recursos Humanos es clave para una estrategia de seguridad corporativa efectiva en Venezuela.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      date: '2026-04-26'
    },
    'sueldo-minimo-vigilantes-venezuela': {
      title: 'Sueldo Mínimo de Vigilantes en Venezuela 2026 | CSSG | Caracas · Miami',
      description: 'Conoce el sueldo mínimo legal de vigilantes y guardias de seguridad en Venezuela 2026. Análisis salarial del sector de seguridad privada.',
      image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1200&q=80',
      date: '2026-05-01'
    }
  };

  // Check if it's a hardcoded post
  if (hardcodedPosts[slug]) {
    postTitle = hardcodedPosts[slug].title;
    postDescription = hardcodedPosts[slug].description;
    postImage = hardcodedPosts[slug].image;
    postDate = hardcodedPosts[slug].date;
  } 
  // Otherwise fetch from Supabase dynamically
  else if (supabaseUrl && supabaseKey) {
    try {
      const resp = await fetch(`${supabaseUrl}/rest/v1/blog_posts?slug=eq.${slug}&select=title,excerpt,image,image_url`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      const data = await resp.json();
      if (data && data.length > 0) {
        postTitle = `${data[0].title} | CSSG`;
        postDescription = data[0].excerpt || postDescription;
        postImage = data[0].image || data[0].image_url || postImage;
      }
    } catch (e) {
      console.error('Error fetching post for SEO:', e);
    }
  }

  // Fetch the host to request the base index.html
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  try {
    // Fetch the actual SPA index.html from Vercel (using root to avoid cleanUrls .html redirect issues)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    
    const htmlResponse = await fetch(`${baseUrl}/`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    let html = await htmlResponse.text();

    // Replace the Open Graph tags dynamically
    html = html.replace(/<title>.*?<\/title>/, `<title>${postTitle}</title>`);
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${postDescription}" />`);
    
    // Replace OG Tags (Case insensitive and globally)
    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${postTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${postDescription}" />`);
    html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${postImage}" />`);
    html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/gi, `<meta property="og:url" content="${baseUrl}/blog/${slug}" />`);
    
    // Add missing tags for LinkedIn if they don't exist, or replace them
    const linkedinTags = `
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/jpeg" />
    `;
    html = html.replace('</head>', `${linkedinTags}</head>`);

    // Inject Article JSON-LD schema
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": postTitle.replace(/ \| CSSG.*$/, ''),
      "description": postDescription,
      "image": postImage,
      "datePublished": postDate,
      "dateModified": postDate,
      "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" },
      "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } },
      "mainEntityOfPage": { "@type": "WebPage", "@id": `${baseUrl}/blog/${slug}` }
    };
    const canonicalTag = `<link rel="canonical" href="${baseUrl}/blog/${slug}" />`;
    const articleSchemaTag = `<script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n</script>`;
    html = html.replace('</head>', `${canonicalTag}\n${articleSchemaTag}\n</head>`);

    // Replace Twitter Tags
    html = html.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/gi, `<meta property="twitter:title" content="${postTitle}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/gi, `<meta property="twitter:description" content="${postDescription}" />`);
    html = html.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/gi, `<meta property="twitter:image" content="${postImage}" />`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Error serving dynamic HTML:', error);
    // Fallback: Just return a basic redirect HTML if fetching index.html fails
    const fallbackHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${postTitle}</title>
        <meta name="description" content="${postDescription}">
        <meta property="og:title" content="${postTitle}">
        <meta property="og:description" content="${postDescription}">
        <meta property="og:image" content="${postImage}">
        <meta property="og:url" content="${baseUrl}/blog/${slug}" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="${postImage}" />
      </head>
      <body>
        <script>
          // Avoid infinite loop by redirecting to root with a query parameter
          window.location.href = "/?redirect=/blog/${slug}";
        </script>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
}
