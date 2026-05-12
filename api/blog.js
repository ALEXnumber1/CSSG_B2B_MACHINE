export default async function handler(req, res) {
  const { slug } = req.query;

  // Supabase env variables (accessible in Vercel)
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  let postTitle = 'Blog | CSSG';
  let postDescription = 'Artículos, análisis y metodologías de seguridad corporativa y protección ejecutiva.';
  let postImage = 'https://cssg-global.com/images/default-blog.png';

  // Hardcoded posts list as fallback
  const hardcodedPosts = {
    'como-elegir-empresa-seguridad-privada-venezuela': {
      title: 'Cómo elegir una empresa de seguridad privada en Venezuela | CSSG',
      description: 'Factores críticos a considerar al contratar servicios de protección física y tecnológica.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80'
    },
    '5-errores-seguridad-corporativa': {
      title: '5 Errores Críticos en Seguridad Corporativa | CSSG',
      description: 'Análisis de vulnerabilidades comunes y cómo mitigarlas.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
    },
    'iso-9001-seguridad-privada-importancia': {
      title: 'Importancia de la Certificación ISO 9001 en Seguridad | CSSG',
      description: 'Por qué exigir normativas de calidad a tu proveedor de seguridad.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80'
    },
    'seguridad-corporativa-caracas-guia-completa': {
      title: 'Seguridad Corporativa en Caracas: Guía Completa | CSSG',
      description: 'Estrategias y resguardo para operaciones en la Gran Caracas.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80'
    },
    'analisis-pestel-seguridad-venezuela': {
      title: 'Análisis PESTEL de Seguridad en Venezuela | CSSG',
      description: 'Entorno político, económico y social para la gestión de riesgos.',
      image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80'
    },
    'rrhh-socio-critico-seguridad': {
      title: 'RRHH: El socio crítico de la Seguridad | CSSG',
      description: 'Integración del talento humano en la matriz de protección corporativa.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80'
    },
    'sueldo-minimo-vigilantes-venezuela': {
      title: 'Remuneración y Retención de Personal de Seguridad en Venezuela | CSSG',
      description: 'Análisis salarial y su impacto en la calidad del servicio.',
      image: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=1200&q=80'
    }
  };

  // Check if it's a hardcoded post
  if (hardcodedPosts[slug]) {
    postTitle = hardcodedPosts[slug].title;
    postDescription = hardcodedPosts[slug].description;
    postImage = hardcodedPosts[slug].image;
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
    // Fetch the actual SPA index.html from Vercel
    const htmlResponse = await fetch(`${baseUrl}/index.html`);
    let html = await htmlResponse.text();

    // Replace the Open Graph tags dynamically
    html = html.replace(/<title>.*?<\/title>/, `<title>${postTitle}</title>`);
    html = html.replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${postDescription}" />`);
    
    // Replace OG Tags
    html = html.replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${postTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${postDescription}" />`);
    html = html.replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${postImage}" />`);
    html = html.replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${baseUrl}/blog/${slug}" />`);
    
    // Replace Twitter Tags
    html = html.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/g, `<meta property="twitter:title" content="${postTitle}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/g, `<meta property="twitter:description" content="${postDescription}" />`);
    html = html.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/g, `<meta property="twitter:image" content="${postImage}" />`);

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
        <meta property="og:url" content="${baseUrl}/blog/${slug}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:image" content="${postImage}">
        <meta http-equiv="refresh" content="0;url=/">
      </head>
      <body>
        <script>window.location.href = "/blog/${slug}";</script>
      </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(fallbackHtml);
  }
}
