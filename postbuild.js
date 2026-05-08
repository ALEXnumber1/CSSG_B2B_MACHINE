import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error("No index.html found in dist/");
  process.exit(1);
}

const originalHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const routes = [
  {
    path: 'consultoria-seguridad-caracas',
    title: 'Consultoría de Seguridad en Caracas | CSSG',
    description: 'Diagnóstico integral de seguridad y protección ejecutiva en Caracas. Expertos en resguardo corporativo con +17 años sin incidentes.',
    image: 'https://cssg-global.com/images/seo-caracas.png'
  },
  {
    path: 'auditoria-seguridad-iso-31000',
    title: 'Auditoría de Seguridad ISO 31000 | CSSG',
    description: 'Análisis y gestión de riesgos corporativos bajo la normativa internacional ISO 31000. Protege los activos críticos de tu empresa.',
    image: 'https://cssg-global.com/images/seo-iso31000.png'
  },
  {
    path: 'analisis-riesgos-corporativos-venezuela',
    title: 'Análisis de Riesgos Corporativos en Venezuela | CSSG',
    description: 'Evaluación FMEA y diagnósticos de vulnerabilidad para empresas en Venezuela. Evita incidentes con inteligencia preventiva.',
    image: 'https://cssg-global.com/images/seo-riesgos.png'
  },
  {
    path: 'optimizacion-costos-seguridad',
    title: 'Optimización de Costos de Seguridad | CSSG',
    description: 'Reduzca los costos operativos de su esquema de seguridad sin comprometer la calidad mediante integración de tecnología PSIM.',
    image: 'https://cssg-global.com/images/seo-costos.png'
  }
];

routes.forEach(route => {
  let newHtml = originalHtml;
  
  // Update Title
  newHtml = newHtml.replace(/<title>.*?<\/title>/g, `<title>${route.title}</title>`);
  newHtml = newHtml.replace(/<meta property="og:title" content=".*?"\s*\/>/g, `<meta property="og:title" content="${route.title}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/>/g, `<meta property="twitter:title" content="${route.title}" />`);
  
  // Update Description
  newHtml = newHtml.replace(/<meta name="description" content=".*?"\s*\/>/g, `<meta name="description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta property="og:description" content=".*?"\s*\/>/g, `<meta property="og:description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/>/g, `<meta property="twitter:description" content="${route.description}" />`);
  
  // Update Image
  newHtml = newHtml.replace(/<meta property="og:image" content=".*?"\s*\/>/g, `<meta property="og:image" content="${route.image}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/>/g, `<meta property="twitter:image" content="${route.image}" />`);
  
  // Update Canonical URL
  newHtml = newHtml.replace(/<link rel="canonical" href=".*?"\s*\/>/g, `<link rel="canonical" href="https://cssg-global.com/${route.path}" />`);
  newHtml = newHtml.replace(/<meta property="og:url" content=".*?"\s*\/>/g, `<meta property="og:url" content="https://cssg-global.com/${route.path}" />`);

  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
  console.log(`[SEO Generation] Created static route for /${route.path}`);
});
