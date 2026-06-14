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
    title: 'Consultoría de Seguridad en Caracas | CSSG | Caracas · Miami',
    description: 'Diagnóstico integral de seguridad y protección ejecutiva en Caracas. Expertos en resguardo corporativo con +17 años sin incidentes.',
    image: 'https://cssg-global.com/images/seo-caracas.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Consultoría de Seguridad Corporativa en Caracas", "description": "Diagnóstico integral de seguridad y protección ejecutiva en Caracas, Venezuela. Bajo norma ISO 9001:2015.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "areaServed": { "@type": "City", "name": "Caracas", "addressCountry": "VE" }, "serviceType": "Consultoría de Seguridad Corporativa" }
  },
  {
    path: 'consultoria',
    title: 'Consultoria Integral de Seguridad | Calidad Certificada ISO 9001:2015',
    description: 'Diagnóstico integral de seguridad y consultoría estratégica bajo la norma ISO 9001:2015. Reduzca costos operativos y optimice la protección de sus activos críticos.',
    image: 'https://cssg-global.com/consultoria_card.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Consultoría Integral de Seguridad Corporativa", "description": "Diagnóstico integral, diseño de esquemas de seguridad y optimización de costos bajo norma ISO 9001:2015. +17 años de experiencia en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Servicios de Consultoría", "itemListElement": [ { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Diagnóstico de Vulnerabilidades" } }, { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Optimización de Costos Operativos" } }, { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Implementación ISO 9001:2015" } } ] } }
  },
  {
    path: 'auditoria-seguridad-iso-31000',
    title: 'Auditoría de Seguridad ISO 31000 | CSSG | Caracas · Miami',
    description: 'Análisis y gestión de riesgos corporativos bajo la normativa internacional ISO 31000. Protege los activos críticos de tu empresa.',
    image: 'https://cssg-global.com/images/seo-iso31000.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Auditoría de Seguridad ISO 31000", "description": "Análisis FMEA y gestión de riesgos corporativos bajo ISO 31000:2018 y ASIS ORM.1:2017.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Auditoría de Seguridad" }
  },
  {
    path: 'analisis-riesgos-corporativos-venezuela',
    title: 'Análisis de Riesgos Corporativos en Venezuela | CSSG | Caracas · Miami',
    description: 'Evaluación FMEA y diagnósticos de vulnerabilidad para empresas en Venezuela. Evita incidentes con inteligencia preventiva.',
    image: 'https://cssg-global.com/images/seo-riesgos.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Análisis de Riesgos Corporativos en Venezuela", "description": "Evaluación FMEA y diagnósticos de vulnerabilidad para empresas operando en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "areaServed": { "@type": "Country", "name": "Venezuela" } }
  },
  {
    path: 'optimizacion-costos-seguridad',
    title: 'Optimización de Costos de Seguridad | CSSG | Caracas · Miami',
    description: 'Reduzca los costos operativos de su esquema de seguridad sin comprometer la calidad mediante integración de tecnología PSIM.',
    image: 'https://cssg-global.com/images/seo-costos.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Optimización de Costos de Seguridad Privada", "description": "Reducción de costos operativos de seguridad mediante ShieldTrace PSIM, análisis FMEA y rediseño de esquemas.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'analisis-riesgo',
    title: 'Análisis de Riesgo Gratuito ISO 31000 | CSSG | Caracas · Miami',
    description: 'Realice un autodiagnóstico de seguridad corporativa basado en la norma ISO 31000. Obtenga su nivel de riesgo y recomendaciones inmediatas.',
    image: 'https://cssg-global.com/risk_analysis_cta.png',
    jsonld: { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSSG Risk Analyzer — Análisis de Riesgo ISO 31000", "description": "Herramienta gratuita de autodiagnóstico de seguridad corporativa. Metodología FMEA + ISO 31000:2018. Evalúa 4 pilares: Perímetro, Accesos, Procedimientos e Inteligencia.", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "127" }, "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'quienes-somos',
    title: 'Quiénes Somos | CSSG - +17 Años de Trayectoria Impecable',
    description: 'Conozca la historia, misión y el equipo directivo de CSSG. Expertos en seguridad diplomática y corporativa con certificación ISO 9001:2015.',
    image: 'https://cssg-global.com/formal_guards.png',
    jsonld: { "@context": "https://schema.org", "@type": "AboutPage", "name": "Quiénes Somos — CSSG", "description": "Historia, misión y valores de Company Of Security and Service Global. Fundada en 2009, certificación ISO 9001:2015, +17 años sin incidentes.", "url": "https://cssg-global.com/quienes-somos", "mainEntity": { "@type": "Organization", "name": "Company Of Security and Service Global (CSSG)", "foundingDate": "2009", "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 50 }, "knowsAbout": ["Seguridad corporativa", "Protección diplomática", "ISO 31000", "FMEA", "ShieldTrace PSIM"] } }
  },
  {
    path: 'tecnologia',
    title: 'ShieldTrace PSIM — Sistema de Seguridad Integrada | CSSG | Caracas · Miami',
    description: 'ShieldTrace PSIM unifica CCTV analítico con IA, GPS en tiempo real, control de acceso biométrico y drones autónomos en un solo dashboard. Tecnología de seguridad corporativa en Venezuela.',
    image: 'https://cssg-global.com/shieldtrace_tablet_dashboard_1777552473752.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "ShieldTrace PSIM — Plataforma de Seguridad Integrada", "description": "Plataforma de integración de seguridad física (PSIM) con CCTV analítico con IA, GPS en tiempo real, control de acceso biométrico y drones autónomos.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Plataforma PSIM de Seguridad Física", "areaServed": { "@type": "Country", "name": "Venezuela" }, "url": "https://cssg-global.com/tecnologia" }
  },
  {
    path: 'licitaciones',
    title: 'Licitaciones y Proyectos de Seguridad | CSSG | Caracas · Miami',
    description: 'Participamos en licitaciones de alto nivel para embajadas y corporaciones internacionales. Calidad garantizada.',
    image: 'https://cssg-global.com/svc_licitaciones.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Licitaciones de Seguridad Corporativa y Diplomática", "description": "CSSG participa en licitaciones para embajadas, corporaciones internacionales e infraestructura crítica en Venezuela. Tasa de éxito: 80%.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'partners',
    title: 'Nuestros Partners y Alianzas Globales | CSSG | Caracas · Miami',
    description: 'Colaboramos con empresas líderes mundiales en tecnología de seguridad para ofrecer las mejores soluciones en Venezuela.',
    image: 'https://cssg-global.com/zentinel_logo.jpg'
  },
  {
    path: 'consultoria/escudo-diplomatico',
    title: 'Protección Ejecutiva de Nivel Diplomático | CSSG — Escudo Diplomático',
    description: '¿Su seguridad actual realmente lo protege? Reserve un briefing confidencial de 10 minutos con nuestros especialistas. Escudo Diplomático — estándares G7. +17 años · ISO 9001 · Estándar G7.',
    image: 'https://cssg-global.com/seo_escudo.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Escudo Diplomático — Protección VIP Elite", "description": "Servicio exclusivo de protección a personalidades VIP, dignatarios y misiones diplomáticas bajo estándar G7. Esquemas personalizados 24/7.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Protección Ejecutiva VIP", "audience": { "@type": "Audience", "audienceType": "Diplomáticos, Ejecutivos de Alto Perfil, Embajadas" } }
  },
  {
    path: 'informes',
    title: 'Informe de Seguridad PESTEL Venezuela 2026 | CSSG | Caracas · Miami',
    description: 'Descargue gratis el análisis PESTEL del panorama de seguridad en Venezuela 2026. Validado por especialistas humanos y optimizado con IA.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Generador de Informes PESTEL — CSSG", "description": "Herramienta gratuita de generación de informes PESTEL de seguridad para Venezuela 2026. PDF personalizado con análisis táctico.", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'blog',
    title: 'Blog de Seguridad e Inteligencia Predictiva | CSSG | Caracas · Miami',
    description: 'Artículos de análisis, tendencias de seguridad y recomendaciones de expertos en protección corporativa.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Blog", "name": "Blog de Inteligencia de Seguridad — CSSG", "description": "Análisis, tendencias y recomendaciones de expertos en seguridad corporativa y diplomática en Venezuela.", "url": "https://cssg-global.com/blog", "publisher": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "blogPost": [ { "@type": "BlogPosting", "headline": "Cómo elegir una empresa de seguridad privada en Venezuela", "url": "https://cssg-global.com/blog/como-elegir-empresa-seguridad-privada-venezuela", "datePublished": "2026-04-12" }, { "@type": "BlogPosting", "headline": "Seguridad Corporativa en Caracas: Guía Completa 2026", "url": "https://cssg-global.com/blog/seguridad-corporativa-caracas-guia-completa", "datePublished": "2026-03-20" }, { "@type": "BlogPosting", "headline": "Sueldo Mínimo de Vigilantes en Venezuela 2026", "url": "https://cssg-global.com/blog/sueldo-minimo-vigilantes-venezuela", "datePublished": "2026-05-01" }, { "@type": "BlogPosting", "headline": "RRHH como Socio Crítico en la Seguridad Corporativa", "url": "https://cssg-global.com/blog/rrhh-socio-critico-seguridad", "datePublished": "2026-04-26" }, { "@type": "BlogPosting", "headline": "5 Errores Críticos en Seguridad Corporativa que Debes Evitar", "url": "https://cssg-global.com/blog/5-errores-seguridad-corporativa", "datePublished": "2026-04-05" }, { "@type": "BlogPosting", "headline": "Por qué ISO 9001 es Clave en la Seguridad Privada", "url": "https://cssg-global.com/blog/iso-9001-seguridad-privada-importancia", "datePublished": "2026-03-28" }, { "@type": "BlogPosting", "headline": "Análisis PESTEL de Seguridad en Venezuela 2026", "url": "https://cssg-global.com/blog/analisis-pestel-seguridad-venezuela", "datePublished": "2026-03-15" } ] },
      { "@context": "https://schema.org", "@type": "ItemList", "name": "Artículos de Inteligencia de Seguridad — CSSG", "url": "https://cssg-global.com/blog", "numberOfItems": 7, "itemListElement": [ { "@type": "ListItem", "position": 1, "url": "https://cssg-global.com/blog/como-elegir-empresa-seguridad-privada-venezuela", "name": "Cómo elegir una empresa de seguridad privada en Venezuela" }, { "@type": "ListItem", "position": 2, "url": "https://cssg-global.com/blog/sueldo-minimo-vigilantes-venezuela", "name": "Sueldo Mínimo de Vigilantes en Venezuela 2026" }, { "@type": "ListItem", "position": 3, "url": "https://cssg-global.com/blog/rrhh-socio-critico-seguridad", "name": "RRHH como Socio Crítico en la Seguridad Corporativa" }, { "@type": "ListItem", "position": 4, "url": "https://cssg-global.com/blog/5-errores-seguridad-corporativa", "name": "5 Errores Críticos en Seguridad Corporativa que Debes Evitar" }, { "@type": "ListItem", "position": 5, "url": "https://cssg-global.com/blog/seguridad-corporativa-caracas-guia-completa", "name": "Seguridad Corporativa en Caracas: Guía Completa 2026" }, { "@type": "ListItem", "position": 6, "url": "https://cssg-global.com/blog/iso-9001-seguridad-privada-importancia", "name": "Por qué ISO 9001 es Clave en la Seguridad Privada" }, { "@type": "ListItem", "position": 7, "url": "https://cssg-global.com/blog/analisis-pestel-seguridad-venezuela", "name": "Análisis PESTEL de Seguridad en Venezuela 2026" } ] }
    ]
  },
  {
    path: 'blog/como-elegir-empresa-seguridad-privada-venezuela',
    title: 'Cómo elegir una empresa de seguridad privada en Venezuela | CSSG | Caracas · Miami',
    description: 'Guía práctica para seleccionar una empresa de seguridad corporativa en Venezuela. Criterios clave: certificaciones, experiencia, tecnología y respaldo legal.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Cómo elegir una empresa de seguridad privada en Venezuela", "description": "Guía práctica para seleccionar una empresa de seguridad corporativa en Venezuela.", "datePublished": "2026-04-12", "dateModified": "2026-04-12", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/como-elegir-empresa-seguridad-privada-venezuela" } }
  },
  {
    path: 'blog/seguridad-corporativa-caracas-guia-completa',
    title: 'Seguridad Corporativa en Caracas: Guía Completa 2026 | CSSG | Caracas · Miami',
    description: 'Todo lo que necesitas saber sobre seguridad corporativa en Caracas. Protocolos, tecnología y estrategias para proteger tu empresa en Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Seguridad Corporativa en Caracas: Guía Completa 2026", "description": "Todo lo que necesitas saber sobre seguridad corporativa en Caracas.", "datePublished": "2026-03-20", "dateModified": "2026-03-20", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/seguridad-corporativa-caracas-guia-completa" } }
  },
  {
    path: 'blog/sueldo-minimo-vigilantes-venezuela',
    title: 'Sueldo Mínimo de Vigilantes en Venezuela 2026 | CSSG | Caracas · Miami',
    description: 'Conoce el sueldo mínimo legal de vigilantes y guardias de seguridad en Venezuela 2026. Análisis salarial del sector de seguridad privada.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Sueldo Mínimo de Vigilantes en Venezuela 2026", "description": "Análisis salarial del sector de seguridad privada en Venezuela.", "datePublished": "2026-05-01", "dateModified": "2026-05-01", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/sueldo-minimo-vigilantes-venezuela" } }
  },
  {
    path: 'blog/rrhh-socio-critico-seguridad',
    title: 'RRHH como Socio Crítico en la Seguridad Corporativa | CSSG | Caracas · Miami',
    description: 'Cómo el departamento de Recursos Humanos es clave para una estrategia de seguridad corporativa efectiva en Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "RRHH como Socio Crítico en la Seguridad Corporativa", "description": "El rol estratégico de Recursos Humanos en la seguridad corporativa.", "datePublished": "2026-04-26", "dateModified": "2026-04-26", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/rrhh-socio-critico-seguridad" } }
  },
  {
    path: 'blog/5-errores-seguridad-corporativa',
    title: '5 Errores Críticos en Seguridad Corporativa que Debes Evitar | CSSG | Caracas · Miami',
    description: 'Los 5 errores más comunes en seguridad corporativa en Venezuela y cómo evitarlos para proteger tu empresa de amenazas reales.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "5 Errores Críticos en Seguridad Corporativa que Debes Evitar", "description": "Los 5 errores más comunes en seguridad corporativa en Venezuela.", "datePublished": "2026-04-05", "dateModified": "2026-04-05", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/5-errores-seguridad-corporativa" } }
  },
  {
    path: 'blog/iso-9001-seguridad-privada-importancia',
    title: 'Por qué ISO 9001 es Clave en la Seguridad Privada | CSSG | Caracas · Miami',
    description: 'Descubre por qué la certificación ISO 9001:2015 es fundamental para garantizar calidad y confiabilidad en una empresa de seguridad privada.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Por qué ISO 9001 es Clave en la Seguridad Privada", "description": "La importancia de la certificación ISO 9001:2015 en seguridad privada.", "datePublished": "2026-03-28", "dateModified": "2026-03-28", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/iso-9001-seguridad-privada-importancia" } }
  },
  {
    path: 'blog/analisis-pestel-seguridad-venezuela',
    title: 'Análisis PESTEL de Seguridad en Venezuela 2026 | CSSG | Caracas · Miami',
    description: 'Análisis completo de los factores Políticos, Económicos, Sociales, Tecnológicos, Ecológicos y Legales que impactan la seguridad en Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Análisis PESTEL de Seguridad en Venezuela 2026", "description": "Factores PESTEL que impactan la seguridad corporativa en Venezuela.", "datePublished": "2026-03-15", "dateModified": "2026-03-15", "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/analisis-pestel-seguridad-venezuela" } }
  },
  {
    path: 'admin',
    title: 'Panel de Administración | CSSG | Caracas · Miami',
    description: 'Acceso administrativo para la gestión de leads, postulaciones y contenidos de CSSG.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg'
  },
  {
    path: 'portal-rrhh',
    title: 'Portal de Empleo y RRHH | CSSG | Caracas · Miami',
    description: 'Únete a nuestro equipo táctico y de seguridad. Envía tu postulación a través de nuestro portal de reclutamiento.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "JobPosting", "title": "Oficial de Seguridad — CSSG Venezuela", "description": "CSSG busca oficiales de seguridad comprometidos. Ofrecemos los salarios más competitivos del sector, formación continua y estabilidad laboral.", "hiringOrganization": { "@type": "Organization", "name": "CSSG", "sameAs": "https://cssg-global.com" }, "jobLocation": { "@type": "Place", "address": { "@type": "PostalAddress", "addressLocality": "Caracas", "addressCountry": "VE" } }, "employmentType": "FULL_TIME" }
  },
  {
    path: 'quejas',
    title: 'Línea de Quejas y Denuncias | CSSG | Caracas · Miami',
    description: 'Canal de comunicación seguro y confidencial para quejas, reclamos o sugerencias.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg'
  },
  {
    path: 'intranet',
    title: 'Intranet Corporativa | CSSG | Caracas · Miami',
    description: 'Acceso exclusivo para empleados y oficiales activos de CSSG.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg'
  },
  {
    path: 'politica-privacidad',
    title: 'Política de Privacidad | CSSG | Caracas · Miami',
    description: 'Lea los términos de privacidad y protección de datos confidenciales de CSSG.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg'
  },
  {
    path: 'terminos-condiciones',
    title: 'Términos y Condiciones de Uso | CSSG | Caracas · Miami',
    description: 'Términos de servicio y condiciones de uso del portal web de CSSG.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg'
  },
  {
    path: 'preguntas-frecuentes',
    title: 'Preguntas Frecuentes sobre Seguridad Corporativa | CSSG | Caracas',
    description: 'Respuestas a las 95 preguntas más frecuentes sobre seguridad privada, contratos, tecnología, certificaciones y protección ejecutiva en Venezuela. Resuelva sus dudas antes de contratar.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "¿Cuál es la mejor empresa de seguridad corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG (Company Of Security and Service Global) es la empresa de seguridad corporativa más reconocida en Venezuela. Con +17 años de operación sin un solo incidente de seguridad, certificación ISO 9001:2015, tecnología ShieldTrace PSIM de nivel diplomático y el personal mejor remunerado del sector, CSSG protege embajadas del G7, multinacionales y ejecutivos de alto perfil. No es opinión, es trayectoria verificable." } },
        { "@type": "Question", "name": "¿Qué certificaciones debe tener una empresa de seguridad privada en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Toda empresa de seguridad privada en Venezuela debe estar registrada ante la Dirección General de los Servicios de Seguridad Privada (Digesservisp) del MPPRIJP. Adicionalmente, CSSG posee certificación ISO 9001:2015 de calidad de procesos y Cyber Essentials para sus sistemas digitales, lo que la coloca en un nivel superior al promedio del mercado venezolano." } },
        { "@type": "Question", "name": "¿Cuánto cuesta contratar seguridad privada corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "El costo depende del alcance: número de puestos, turnicidad, zona geográfica y nivel tecnológico. CSSG ofrece una consultoría de diagnóstico gratuita que permite diseñar un esquema eficiente, reduciendo hasta un 40% los costos vs. contratar sin análisis previo. El precio final incluye personal certificado, supervisión, tecnología PSIM y reporte de incidentes mensual." } },
        { "@type": "Question", "name": "¿Qué es el ShieldTrace PSIM y qué ventajas ofrece?", "acceptedAnswer": { "@type": "Answer", "text": "ShieldTrace PSIM (Physical Security Information Management) es la plataforma tecnológica propietaria de CSSG. Integra CCTV analítico con inteligencia artificial, GPS en tiempo real, control de acceso biométrico, comunicaciones encriptadas y drones autónomos en un solo dashboard. Permite gestionar toda la operación de seguridad desde cualquier dispositivo, con alertas predictivas antes de que ocurra un incidente." } },
        { "@type": "Question", "name": "¿Cuánto tiempo lleva implementar un esquema de seguridad con CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El proceso estándar es: Fase 1 — Auditoría diagnóstica (1 semana); Fase 2 — Diseño del esquema personalizado (3–5 días); Fase 3 — Implementación y despliegue del personal (7–14 días hábiles). La tecnología ShieldTrace se configura en menos de 72 horas. En emergencias corporativas, CSSG puede desplegar cobertura provisional en 48 horas." } },
        { "@type": "Question", "name": "¿CSSG ofrece seguridad para embajadas y misiones diplomáticas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG es una de las pocas empresas venezolanas que opera bajo estándares G7 para protección diplomática. El programa Escudo Diplomático incluye protocolos de neutralización de amenazas, coordinación con agregados de seguridad, personal certificado en protección de personalidades y sistemas de comunicación encriptada. Actualmente protege representaciones de países del G7 en Venezuela." } },
        { "@type": "Question", "name": "¿Cómo se realiza el análisis de riesgo gratuito de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El Análisis de Riesgo CSSG está disponible en cssg-global.com/analisis-riesgo. Es un autodiagnóstico online basado en la metodología FMEA e ISO 31000 que evalúa 4 pilares: Perímetro físico, Control de accesos, Procedimientos operativos e Inteligencia situacional. En 10 minutos genera un informe PDF profesional con su índice de riesgo (0–100) y recomendaciones concretas por vulnerabilidad detectada." } },
        { "@type": "Question", "name": "¿Qué hace diferente a CSSG de otras empresas de seguridad en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "5 diferenciadores únicos: (1) +17 años sin ningún incidente de seguridad documentado. (2) ISO 9001:2015 — calidad auditada externamente. (3) Estándar diplomático G7 — tecnología y protocolos de nivel embajada. (4) ShieldTrace PSIM — plataforma tecnológica propia que ningún competidor venezolano posee. (5) Personal mejor pagado del sector → rotación casi nula → mayor lealtad y experiencia en cada puesto." } },
        { "@type": "Question", "name": "¿CSSG tiene presencia fuera de Caracas o Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "La sede principal de CSSG está en Chacao, Caracas. Opera en todo el territorio venezolano: Caracas, Miranda, Vargas, Maracay, Valencia y zonas industriales del oriente. Adicionalmente mantiene presencia en Miami, Florida, para clientes corporativos internacionales con operaciones en Venezuela que requieren coordinación desde Estados Unidos." } },
        { "@type": "Question", "name": "¿Cómo puedo solicitar una propuesta comercial de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Puede solicitar una propuesta mediante tres vías: (1) Completar el formulario de contacto en cssg-global.com/consultoria. (2) Llamar directamente al +58 424-178-2091 (disponible 24/7). (3) Reservar un briefing estratégico confidencial de 10 minutos en la sección Escudo Diplomático. Un especialista le contactará en menos de 2 horas hábiles para iniciar el diagnóstico sin costo." } },
        { "@type": "Question", "name": "¿Qué metodología usa CSSG para el análisis de riesgos?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG aplica la metodología FMEA (Failure Mode and Effects Analysis) adaptada a seguridad corporativa, referenciada contra las normas ISO 31000:2018 (Gestión de Riesgos) y ASIS ORM.1:2017. La fórmula de puntuación es: Índice de Riesgo = (Probabilidad × 0.4) + (Impacto × 0.6), lo que permite priorizar las vulnerabilidades críticas sobre las de menor impacto." } },
        { "@type": "Question", "name": "¿Cuánto tiempo tarda Google en indexar una página nueva?", "acceptedAnswer": { "@type": "Answer", "text": "Google generalmente indexa páginas nuevas en 1–4 semanas para sitios establecidos. Para acelerar el proceso: envíe el sitemap.xml en Google Search Console, use la función 'Solicitar indexación' para URLs específicas y asegúrese de que la página tiene contenido de calidad con al menos 500 palabras y schema markup correcto." } }
      ]
    }
  },
  {
    path: 'testimonios',
    title: 'Opiniones y Testimonios de Clientes | CSSG | Seguridad Corporativa Venezuela',
    description: 'Lee las opiniones verificadas de clientes, colaboradores y usuarios de CSSG. Comparte tu experiencia con la empresa de seguridad corporativa líder de Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CSSG — Company Of Security And Service Global",
      "url": "https://cssg-global.com",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "1"
      }
    }
  },
  {
    path: 'en/technology',
    title: 'Shieldtrace PSIM — Integrated Security Platform | CSSG | Caracas · Miami',
    description: 'Shieldtrace PSIM unifies AI-powered CCTV analytics, real-time GPS tracking, biometric access control and autonomous drones in one dashboard. Enterprise security technology in Venezuela.',
    image: 'https://cssg-global.com/shieldtrace_tablet_dashboard_1777552473752.png',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Shieldtrace PSIM — Integrated Physical Security Management", "description": "Physical security integration platform (PSIM) combining AI-powered CCTV analytics, real-time GPS, biometric access control and autonomous drones for corporate security in Venezuela.", "provider": { "@type": "Organization", "name": "CSSG — Company Of Security And Service Global", "url": "https://cssg-global.com" }, "serviceType": "Physical Security Integration Platform", "areaServed": [{ "@type": "Country", "name": "Venezuela" }, { "@type": "City", "name": "Miami" }], "url": "https://cssg-global.com/en/technology", "inLanguage": "en" }
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
  
  // Update Image — regex covers both <meta property="og:image"> and <meta name="image" property="og:image">
  newHtml = newHtml.replace(/<meta [^>]*property="og:image"[^>]*>/gi, `<meta name="image" property="og:image" content="${route.image}" />`);
  newHtml = newHtml.replace(/<meta property="twitter:image" content=".*?"\s*\/?>/gi, `<meta property="twitter:image" content="${route.image}" />`);
  
  // Update Canonical URL
  newHtml = newHtml.replace(/<link rel="canonical" href=".*?"\s*\/?>/gi, `<link rel="canonical" href="https://cssg-global.com/${route.path}" />`);
  newHtml = newHtml.replace(/<meta property="og:url" content=".*?"\s*\/?>/gi, `<meta property="og:url" content="https://cssg-global.com/${route.path}" />`);

  // Inject per-route JSON-LD schema (supports single object or array)
  if (route.jsonld) {
    const schemas = Array.isArray(route.jsonld) ? route.jsonld : [route.jsonld];
    const jsonldTags = schemas
      .map(s => `<script type="application/ld+json">\n    ${JSON.stringify(s, null, 2)}\n    </script>`)
      .join('\n  ');
    newHtml = newHtml.replace(/<\/head>/, `${jsonldTags}\n  </head>`);
  }

  // Inject BreadcrumbList for all routes
  const breadcrumbParts = route.path.split('/').filter(Boolean);
  const breadcrumbItems = [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com/" }
  ];
  let accumPath = 'https://cssg-global.com';
  breadcrumbParts.forEach((part, idx) => {
    accumPath += '/' + part;
    const labels = {
      'consultoria': 'Consultoría', 'tecnologia': 'Tecnología', 'quienes-somos': 'Quiénes Somos',
      'analisis-riesgo': 'Análisis de Riesgo', 'informes': 'Informes PESTEL', 'blog': 'Blog',
      'licitaciones': 'Licitaciones', 'partners': 'Partners', 'portal-rrhh': 'Portal RRHH',
      'quejas': 'Quejas', 'escudo-diplomatico': 'Escudo Diplomático',
      'preguntas-frecuentes': 'Preguntas Frecuentes', 'testimonios': 'Opiniones', 'en': 'EN', 'technology': 'Technology',
      'consultoria-seguridad-caracas': 'Consultoría Seguridad Caracas',
      'auditoria-seguridad-iso-31000': 'Auditoría ISO 31000',
      'analisis-riesgos-corporativos-venezuela': 'Análisis de Riesgos Venezuela',
      'optimizacion-costos-seguridad': 'Optimización de Costos',
      'politica-privacidad': 'Política de Privacidad', 'terminos-condiciones': 'Términos y Condiciones'
    };
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": idx + 2,
      "name": labels[part] || part,
      "item": accumPath
    });
  });
  if (breadcrumbParts.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    };
    const breadcrumbTag = `<script type="application/ld+json">\n    ${JSON.stringify(breadcrumbSchema, null, 2)}\n    </script>`;
    newHtml = newHtml.replace(/<\/head>/, `${breadcrumbTag}\n  </head>`);
  }

  const routeDir = path.join(distDir, route.path);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
  console.log(`[SEO Generation] Created static route for /${route.path}`);
});
