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
    path: 'consultoria',
    title: 'Consultoria Integral de Seguridad | Calidad Certificada ISO 9001:2015',
    description: 'Diagnóstico integral de seguridad y consultoría estratégica bajo la norma ISO 9001:2015. Reduzca costos operativos y optimice la protección de sus activos críticos.',
    image: 'https://cssg-global.com/consultoria_card.png'
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
  },
  {
    path: 'analisis-riesgo',
    title: 'Análisis de Riesgo Gratuito ISO 31000 | CSSG',
    description: 'Realice un autodiagnóstico de seguridad corporativa basado en la norma ISO 31000. Obtenga su nivel de riesgo y recomendaciones inmediatas.',
    image: 'https://cssg-global.com/risk_analysis_cta.png'
  },
  {
    path: 'quienes-somos',
    title: 'Quiénes Somos | CSSG - +17 Años de Trayectoria Impecable',
    description: 'Conozca la historia, misión y el equipo directivo de CSSG. Expertos en seguridad diplomática y corporativa con certificación ISO 9001:2015.',
    image: 'https://cssg-global.com/formal_guards.png'
  },
  {
    path: 'tecnologia',
    title: 'Tecnología Aplicada al Servicio | Calidad Garantizada',
    description: 'Integración de CCTV analítico, drones de vigilancia y control biométrico. Gestión operativa basada en datos para máxima eficiencia.',
    image: 'https://cssg-global.com/shieldtrace_tablet_dashboard_1777552473752.png'
  },
  {
    path: 'licitaciones',
    title: 'Licitaciones y Proyectos de Seguridad | CSSG',
    description: 'Participamos en licitaciones de alto nivel para embajadas y corporaciones internacionales. Calidad garantizada.',
    image: 'https://cssg-global.com/svc_licitaciones.png'
  },
  {
    path: 'partners',
    title: 'Nuestros Partners y Alianzas Globales | CSSG',
    description: 'Colaboramos con empresas líderes mundiales en tecnología de seguridad para ofrecer las mejores soluciones en Venezuela.',
    image: 'https://cssg-global.com/zentinel_logo.jpg'
  },
  {
    path: 'consultoria/escudo-diplomatico',
    title: 'SERVICIO DE PROTECCION A PERSONALIDADES DE ELITE | CSSG',
    description: 'Servicio exclusivo de protección a personalidades de élite. Conformamos esquemas de seguridad a un nivel diplomático. Filtro High-Ticket.',
    image: 'https://cssg-global.com/secuestro.webp'
  }
];

routes.forEach(route => {
  let newHtml = originalHtml;
  
  // Update Title
  newHtml = newHtml.replace(/<title>.*?<\/title>/gi, `<title>${route.title}</title>`);
  newHtml = newHtml.replace(/<meta property="og:title" content=".*?"\s*\/?>/gi, `<meta property="og:title" content="${route.title}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:title" content=".*?"\s*\/?>/gi, `<meta property="twitter:title" content="${route.title}" />`);
  
  // Update Description
  newHtml = newHtml.replace(/<meta name="description" content=".*?"\s*\/?>/gi, `<meta name="description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta property="og:description" content=".*?"\s*\/?>/gi, `<meta property="og:description" content="${route.description}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:description" content=".*?"\s*\/?>/gi, `<meta property="twitter:description" content="${route.description}" />`);
  
  // Update Image
  newHtml = newHtml.replace(/<meta property="og:image" content=".*?"\s*\/?>/gi, `<meta property="og:image" content="${route.image}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/gi, `<meta property="twitter:image" content="${route.image}" />`);
  
  // Update Canonical URL
  newHtml = newHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/gi, `<link rel="canonical" href="https://cssg-global.com/${route.path}" />`);
  newHtml = newHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/gi, `<meta property="og:url" content="https://cssg-global.com/${route.path}" />`);

  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
  console.log(`[SEO Generation] Created static route for /${route.path}`);
});
