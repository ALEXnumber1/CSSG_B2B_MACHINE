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
    title: 'Consultoría de Seguridad Corporativa en Venezuela | Diagnóstico Gratuito | CSSG',
    description: 'Diagnóstico de vulnerabilidades, auditorías ISO 31000 y diseño de esquemas de protección para corporaciones y misiones diplomáticas en Venezuela. +17 años. Primera sesión sin costo.',
    image: 'https://cssg-global.com/consultoria_card.webp',
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
    title: 'Diagnóstico de Vulnerabilidades Corporativas Gratuito | FMEA ISO 31000 | CSSG',
    description: 'Evalúe el nivel de vulnerabilidad de su organización en 8 minutos. Metodología FMEA aplicada a 4 pilares: Perímetro, Accesos, Procedimientos e Inteligencia. Sin costo.',
    image: 'https://cssg-global.com/risk_analysis_cta.webp',
    jsonld: { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "CSSG Risk Analyzer — Análisis de Riesgo ISO 31000", "description": "Herramienta gratuita de autodiagnóstico de seguridad corporativa. Metodología FMEA + ISO 31000:2018. Evalúa 4 pilares: Perímetro, Accesos, Procedimientos e Inteligencia.", "applicationCategory": "BusinessApplication", "operatingSystem": "Web", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "127" }, "author": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'quienes-somos',
    title: 'Quiénes Somos | CSSG - +17 Años de Trayectoria Impecable',
    description: 'Conozca la historia, misión y el equipo directivo de CSSG. Expertos en seguridad diplomática y corporativa con certificación ISO 9001:2015.',
    image: 'https://cssg-global.com/formal_guards.webp',
    jsonld: { "@context": "https://schema.org", "@type": "AboutPage", "name": "Quiénes Somos — CSSG", "description": "Historia, misión y valores de Company Of Security and Service Global. Fundada en 2009, certificación ISO 9001:2015, +17 años sin incidentes.", "url": "https://cssg-global.com/quienes-somos", "mainEntity": { "@type": "Organization", "name": "Company Of Security and Service Global (CSSG)", "foundingDate": "2009", "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 50 }, "knowsAbout": ["Seguridad corporativa", "Protección diplomática", "ISO 31000", "FMEA", "ShieldTrace PSIM"] } }
  },
  {
    path: 'tecnologia',
    title: 'ShieldTrace PSIM — Seguridad Corporativa Predictiva para Venezuela | CSSG',
    description: 'CCTV analítico con IA, control de acceso biométrico, GPS en tiempo real y drones autónomos en un dashboard único. Potencie el desempeño de su equipo de vigilancia física en Venezuela.',
    image: 'https://cssg-global.com/shieldtrace_tablet_dashboard_1777552473752.webp',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "ShieldTrace PSIM — Plataforma de Seguridad Integrada", "description": "Plataforma de integración de seguridad física (PSIM) con CCTV analítico con IA, GPS en tiempo real, control de acceso biométrico y drones autónomos.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Plataforma PSIM de Seguridad Física", "areaServed": { "@type": "Country", "name": "Venezuela" }, "url": "https://cssg-global.com/tecnologia" }
  },
  {
    path: 'licitaciones',
    title: 'Licitaciones y Proyectos de Seguridad | CSSG | Caracas · Miami',
    description: 'Participamos en licitaciones de alto nivel para embajadas y corporaciones internacionales. Calidad garantizada.',
    image: 'https://cssg-global.com/svc_licitaciones.webp',
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
    title: 'Protección Ejecutiva Bajo Estándar Diplomático G7 | Escudo Diplomático | CSSG',
    description: 'El único esquema de seguridad privada en Venezuela diseñado bajo estándares G7. Evaluación personalizada, protocolo 24/7 y confidencialidad absoluta. Briefing confidencial de 10 minutos.',
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
    path: 'blog/inteligencia-amenazas-venezuela',
    title: 'Inteligencia de Amenazas en Venezuela: Guía para Operaciones Corporativas y Diplomáticas | CSSG',
    description: 'Inteligencia de Amenazas en Venezuela: anticipe riesgos físicos y digitales con OSINT, alertas tempranas y TIaaS para directivos y diplomáticos.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    jsonld: { "@context": "https://schema.org", "@type": "Article", "headline": "Inteligencia de Amenazas en Venezuela: Cómo Proteger Operaciones Corporativas y Diplomáticas", "description": "Panorama de amenazas físico-digitales en Venezuela, actores relevantes y cómo la inteligencia de amenazas (TIaaS) protege operaciones corporativas y diplomáticas.", "keywords": "Inteligencia de Amenazas, Ciberseguridad, Seguridad Corporativa, OSINT, TIaaS, Venezuela", "datePublished": "2026-07-14", "dateModified": "2026-07-14", "author": { "@type": "Person", "name": "Alexander Briceño", "affiliation": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "image": { "@type": "ImageObject", "url": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", "description": "Centro de operaciones de inteligencia de amenazas monitoreando datos globales en tiempo real — CSSG Venezuela" }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/inteligencia-amenazas-venezuela" } }
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
    path: 'blog/resiliencia-corporativa-venezuela',
    title: 'Resiliencia Corporativa Venezuela: ISO 22301, MTPD y BCP | CSSG',
    description: 'Cómo construir un plan de continuidad ISO 22301 en Venezuela: MTPD, RTO, BCP y enfoque all-hazards. Guía de CSSG para riesgo sísmico, geopolítico e infraestructural.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80',
    jsonld: [
      { "@context": "https://schema.org", "@type": ["Article", "BlogPosting"], "headline": "Resiliencia corporativa en entornos de riesgo extremo: la arquitectura que decide quién sigue operando", "description": "Cómo construir un plan de continuidad corporativo en Venezuela bajo ISO 31000, ISO 22301 e ISO 22361. MTPD, RTO, BCP y enfoque all-hazards explicados.", "keywords": ["resiliencia corporativa Venezuela", "ISO 22301 Venezuela", "plan continuidad negocio Venezuela", "MTPD RTO BCP", "ISO 31000 gestión riesgos Venezuela", "all-hazards Venezuela", "ISO 22361 gestión crisis", "continuidad negocio diplomática"], "wordCount": 1900, "datePublished": "2026-06-26", "dateModified": "2026-06-26", "author": { "@type": "Organization", "name": "CSSG — Risk Advisory", "url": "https://cssg-global.com" }, "publisher": { "@type": "Organization", "name": "CSSG", "logo": { "@type": "ImageObject", "url": "https://cssg-global.com/logo.png" } }, "image": { "@type": "ImageObject", "url": "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80" }, "mainEntityOfPage": { "@type": "WebPage", "@id": "https://cssg-global.com/blog/resiliencia-corporativa-venezuela" }, "about": [{ "@type": "Thing", "name": "Resiliencia corporativa" }, { "@type": "Thing", "name": "ISO 22301:2019" }, { "@type": "Thing", "name": "Continuidad del negocio" }, { "@type": "Place", "name": "Venezuela" }], "mentions": [{ "@type": "Thing", "name": "ISO 31000:2018" }, { "@type": "Thing", "name": "ISO 22301:2019" }, { "@type": "Thing", "name": "ISO 22361:2022" }, { "@type": "Thing", "name": "NFPA 1660" }, { "@type": "Thing", "name": "ASIS ORM.1:2017" }, { "@type": "Thing", "name": "MTPD" }, { "@type": "Thing", "name": "RTO" }] },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué son el MTPD y el RTO en continuidad de negocio?", "acceptedAnswer": { "@type": "Answer", "text": "El MTPD (Período Máximo Tolerable de Interrupción) es el tiempo máximo que un proceso crítico puede estar detenido antes de que el daño sea irreversible. El RTO (Tiempo Objetivo de Recuperación) es el plazo para reactivarlo a capacidad mínima aceptable. Ambas cifras las produce el Análisis de Impacto al Negocio (BIA) de la ISO 22301:2019. Sin estas cifras por proceso crítico, no existe un plan de continuidad: existe una intención." } },
        { "@type": "Question", "name": "¿Cuál es la diferencia entre un incidente y una crisis en gestión de riesgos?", "acceptedAnswer": { "@type": "Answer", "text": "Un incidente es predecible, acotado y se gestiona con procedimientos existentes. Una crisis es extraordinaria, impredecible, sistémica y puede amenazar la existencia de la organización. La diferencia no es de magnitud sino de naturaleza. Los incidentes se responden con protocolos; las crisis requieren liderazgo estratégico y estructuras de mando construidas antes del evento. La ISO 22361:2022 codifica la gestión de crisis como disciplina independiente." } },
        { "@type": "Question", "name": "¿ISO 31000 se puede certificar?", "acceptedAnswer": { "@type": "Answer", "text": "No. ISO 31000:2018 es una norma de directrices para la gestión del riesgo, no un estándar de requisitos auditables. Ninguna organización en el mundo puede certificarse en ISO 31000. El estándar de continuidad del negocio certificable por terceros independientes es la ISO 22301:2019." } },
        { "@type": "Question", "name": "¿Qué es el enfoque all-hazards en continuidad de negocio?", "acceptedAnswer": { "@type": "Answer", "text": "All-hazards significa planificar para la categoría de la disrupción (natural, tecnológica o humana) y no para una amenaza específica. Es el principio rector de la NFPA 1660 (2024), que consolidó las normas NFPA 1600, 1616 y 1620. En Venezuela, con riesgo sísmico (fallas Boconó y El Pilar), geopolítico e infraestructural simultáneos, este enfoque es el único metodológicamente correcto." } },
        { "@type": "Question", "name": "¿Por qué Venezuela requiere un plan de continuidad all-hazards?", "acceptedAnswer": { "@type": "Answer", "text": "Venezuela concentra simultáneamente: riesgo geopolítico (reconfiguración institucional 2026), riesgo sísmico confirmado (fallas Boconó/El Pilar; historial: Caracas 1967, Cariaco 1997, Sucre 2018 M7.3) y riesgo de infraestructura crítica (energía intermitente, conectividad frágil). Un plan diseñado para una sola amenaza está estructuralmente incompleto en este entorno." } },
        { "@type": "Question", "name": "¿Cómo comenzar un plan de continuidad de negocio en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "La secuencia correcta: (1) diagnóstico de madurez bajo ANSI/ASIS ORM.1 / SPC.4; (2) BIA por proceso crítico que produce MTPD y RTO; (3) diseño del BCP con estrategias de recuperación; (4) implementación de la capacidad operativa que el diagnóstico justifica. Comprar tecnología o personal sin diagnóstico previo es el error más costoso y el más común." } }
      ] },
      { "@context": "https://schema.org", "@type": "WebPage", "name": "Resiliencia Corporativa Venezuela — ISO 22301 y BCP | CSSG", "url": "https://cssg-global.com/blog/resiliencia-corporativa-venezuela", "inLanguage": "es", "keywords": "resiliencia corporativa Venezuela, ISO 22301 Venezuela, plan continuidad negocio Venezuela, MTPD RTO BCP, ISO 31000 gestión riesgos Venezuela, all-hazards Venezuela, continuidad negocio diplomatica", "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", "blockquote"] } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://cssg-global.com/blog" }, { "@type": "ListItem", "position": 3, "name": "Resiliencia Corporativa en Venezuela", "item": "https://cssg-global.com/blog/resiliencia-corporativa-venezuela" } ] }
    ]
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
  // --- Risk Advisory Services sub-pages ---
  {
    path: 'consultoria/evaluacion-de-riesgos-de-seguridad',
    title: 'Evaluación de Riesgos de Seguridad | CSSG | Caracas · Miami',
    description: 'Evaluación de riesgos de seguridad bajo metodología ESRM e ISO 31000. Identificamos vulnerabilidades reales en su organización antes de que se conviertan en incidentes.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Evaluación de Riesgos de Seguridad", "description": "Servicio de evaluación de riesgos corporativos bajo ESRM e ISO 31000. Identificación de vulnerabilidades y plan de acción.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué metodología usa CSSG para la evaluación de riesgos de seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG aplica la metodología ESRM (Enterprise Security Risk Management) del ASIS Internacional, complementada con ISO 31000:2018. Se evalúan vectores de probabilidad e impacto mediante fórmula FMEA, produciendo un índice de riesgo cuantificado con plan de acción priorizado." } },
        { "@type": "Question", "name": "¿Cuánto tiempo tarda una evaluación de riesgos de seguridad con CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Una evaluación estándar toma entre 3 y 7 días hábiles: 1-2 días de levantamiento in-situ, 2-3 días de análisis y redacción del informe, y 1 día de presentación ejecutiva. Evaluaciones urgentes pueden entregarse en 48-72 horas." } },
        { "@type": "Question", "name": "¿Qué entregables recibe el cliente al finalizar la evaluación de riesgos?", "acceptedAnswer": { "@type": "Answer", "text": "El cliente recibe un informe ejecutivo en PDF con: índice de riesgo global (0-100), mapa de vulnerabilidades por pilar, tabla de riesgos FMEA priorizada, plan de mitigación con responsables y plazos, y una sesión de presentación ante la junta directiva." } },
        { "@type": "Question", "name": "¿La evaluación de riesgos de CSSG cumple con DIGESERVISP?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG está registrada ante DIGESERVISP y sus evaluaciones consideran los requisitos legales venezolanos de seguridad privada, integrándolos con estándares internacionales ISO 31000 y ASIS para una cobertura regulatoria completa." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Evaluación de Riesgos de Seguridad", "item": "https://cssg-global.com/consultoria/evaluacion-de-riesgos-de-seguridad" } ] }
    ]
  },
  {
    path: 'consultoria/diagnostico-madurez-seguridad',
    title: 'Diagnóstico de Madurez en Seguridad | CSSG | Caracas · Miami',
    description: 'Evalúe el nivel de madurez de seguridad de su organización en 5 niveles. Obtenga su Índice de Seguridad Corporativa de Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Diagnóstico de Madurez en Seguridad", "description": "Evaluación del nivel de madurez organizacional en seguridad. Índice de Seguridad Corporativa de Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es el diagnóstico de madurez en seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "Es una evaluación estructurada que ubica a la organización en uno de 5 niveles de madurez de seguridad: Inicial, Reactivo, Definido, Gestionado y Optimizado. El resultado es el Índice de Seguridad Corporativa (ISC-VE), una métrica comparable sectorialmente." } },
        { "@type": "Question", "name": "¿En qué se diferencia el diagnóstico de madurez de una auditoría de riesgos?", "acceptedAnswer": { "@type": "Answer", "text": "La auditoría de riesgos identifica vulnerabilidades específicas; el diagnóstico de madurez evalúa la capacidad organizacional para gestionar la seguridad de forma sostenida. Son complementarios: la madurez indica el 'cómo' y la auditoría revela el 'qué'." } },
        { "@type": "Question", "name": "¿Cuánto demora obtener el Índice de Seguridad Corporativa?", "acceptedAnswer": { "@type": "Answer", "text": "El diagnóstico de madurez estándar toma 2-3 días hábiles: entrevistas con responsables de seguridad, revisión documental y evaluación de controles implementados. El informe con el ISC-VE y hoja de ruta de mejora se entrega en 48 horas adicionales." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Diagnóstico de Madurez en Seguridad", "item": "https://cssg-global.com/consultoria/diagnostico-madurez-seguridad" } ] }
    ]
  },
  {
    path: 'consultoria/site-survey-evaluacion-fisica',
    title: 'Site Survey de Seguridad Física | CSSG | Caracas · Miami',
    description: 'Evaluación física de instalaciones bajo metodología CPTED. Detectamos vulnerabilidades en perímetro, accesos, iluminación y flujo de personas.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Site Survey de Seguridad Física", "description": "Evaluación CPTED de instalaciones. Detección de vulnerabilidades físicas y recomendaciones de mitigación.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es un site survey de seguridad física bajo metodología CPTED?", "acceptedAnswer": { "@type": "Answer", "text": "CPTED (Crime Prevention Through Environmental Design) es una metodología que evalúa cómo el diseño del entorno físico facilita o dificulta actos delictivos. El site survey analiza perímetro, iluminación, control de accesos, visibilidad y flujos de personas para diseñar contramedidas preventivas." } },
        { "@type": "Question", "name": "¿Qué tipos de instalaciones evalúa CSSG en un site survey?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG realiza site surveys en sedes corporativas, embajadas y cancillerías, residencias ejecutivas, almacenes e industrias, centros de datos y cualquier instalación que requiera evaluación sistemática de vulnerabilidades físicas." } },
        { "@type": "Question", "name": "¿El site survey incluye recomendaciones de mejoras tecnológicas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. El informe incluye recomendaciones de CCTV, iluminación perimetral, control de accesos biométrico y sensores de intrusión, integradas con la plataforma ShieldTrace PSIM de CSSG para monitoreo centralizado en tiempo real." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Site Survey de Seguridad Física", "item": "https://cssg-global.com/consultoria/site-survey-evaluacion-fisica" } ] }
    ]
  },
  {
    path: 'consultoria/auditoria-de-cumplimiento',
    title: 'Auditoría de Cumplimiento en Seguridad | CSSG | Caracas · Miami',
    description: 'Auditoría de cumplimiento bajo DIGESERVISP, ISO 9001:2015, ISO 31000 y ASIS ORM.1. Identifique brechas antes de que lo haga una auditoría externa.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Auditoría de Cumplimiento en Seguridad", "description": "Auditoría de cumplimiento DIGESERVISP, ISO 9001:2015, ISO 31000 y ASIS ORM.1.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué normas cubre la auditoría de cumplimiento de seguridad de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "La auditoría cubre DIGESERVISP (regulación venezolana obligatoria), ISO 9001:2015 (gestión de calidad), ISO 31000 (gestión de riesgos) y ASIS ORM.1:2017 (estándar de gestión de riesgos de seguridad organizacional). El informe identifica brechas con prioridad alta, media y baja." } },
        { "@type": "Question", "name": "¿Con qué frecuencia debe realizarse una auditoría de cumplimiento?", "acceptedAnswer": { "@type": "Answer", "text": "Se recomienda auditoría anual para mantenimiento de certificaciones, y revisión semestral para organizaciones en sectores de alta criticidad como diplomático, financiero o industrial. CSSG también ofrece auditorías puntuales ante cambios operacionales significativos." } },
        { "@type": "Question", "name": "¿Qué pasa si se detectan incumplimientos en la auditoría?", "acceptedAnswer": { "@type": "Answer", "text": "El informe incluye un plan de acción correctivo con plazos y responsables. CSSG ofrece acompañamiento en la implementación de correcciones y realiza una auditoría de verificación para confirmar el cierre de brechas antes de auditorías externas." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Auditoría de Cumplimiento", "item": "https://cssg-global.com/consultoria/auditoria-de-cumplimiento" } ] }
    ]
  },
  {
    path: 'consultoria/seguridad-misiones-diplomaticas',
    title: 'Seguridad para Embajadas y Misiones Diplomáticas | CSSG | Caracas · Miami',
    description: 'Servicios de seguridad para embajadas, cancillerías y misiones diplomáticas en Venezuela bajo estándar G7. Más de 12 años sin incidentes.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Seguridad para Misiones Diplomáticas", "description": "Seguridad para embajadas y cancillerías en Venezuela bajo estándar G7. ISO 9001:2015. +12 años sin incidentes.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué estándares aplica CSSG para la seguridad de misiones diplomáticas?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG opera bajo el estándar G7 para protección diplomática, complementado con protocolos de la Convención de Viena sobre Relaciones Diplomáticas. Los esquemas incluyen personal certificado, comunicaciones encriptadas, coordinación con agregados de seguridad y protocolos de evacuación." } },
        { "@type": "Question", "name": "¿Qué diferencia a CSSG de otras empresas en seguridad diplomática en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG lleva más de 12 años protegiendo misiones del G7 en Venezuela sin ningún incidente documentado. Es la única empresa venezolana con certificación ISO 9001:2015 activa, plataforma tecnológica ShieldTrace PSIM y personal con los salarios más altos del sector, garantizando rotación mínima." } },
        { "@type": "Question", "name": "¿CSSG coordina con los cuerpos de seguridad del Estado venezolano?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG mantiene protocolos de coordinación con los cuerpos de seguridad del Estado cuando el esquema lo requiere, siempre dentro del marco legal venezolano y respetando la inmunidad diplomática establecida por la Convención de Viena." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Seguridad para Misiones Diplomáticas", "item": "https://cssg-global.com/consultoria/seguridad-misiones-diplomaticas" } ] }
    ]
  },
  {
    path: 'consultoria/evaluacion-residencias-cancillerias',
    title: 'Evaluación de Seguridad para Residencias y Cancillerías | CSSG | Caracas · Miami',
    description: 'Evaluación de seguridad física para residencias de diplomáticos y cancillerías en Venezuela. Protocolo de confidencialidad total.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Evaluación de Residencias y Cancillerías", "description": "Evaluación de seguridad para residencias diplomáticas y cancillerías en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué aspectos cubre la evaluación de seguridad para residencias diplomáticas?", "acceptedAnswer": { "@type": "Answer", "text": "La evaluación cubre perímetro físico y accesos, sistemas de alarma e iluminación, procedimientos de personal doméstico y visitantes, planes de evacuación, comunicaciones de emergencia y coordinación con la misión diplomática. Se entrega bajo protocolo de confidencialidad total." } },
        { "@type": "Question", "name": "¿CSSG garantiza confidencialidad en las evaluaciones de cancillerías?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutamente. Todos los informes de evaluación de cancillerías y residencias diplomáticas son tratados bajo protocolo de máxima confidencialidad. CSSG firma acuerdos NDA específicos con cada misión y los documentos se transmiten únicamente por canales encriptados." } },
        { "@type": "Question", "name": "¿Con qué frecuencia debe evaluarse la seguridad de una residencia diplomática?", "acceptedAnswer": { "@type": "Answer", "text": "Se recomienda evaluación anual completa y revisiones semestrales de sistemas tecnológicos. Ante cambios de personal de alto rango, renovación de contratos de seguridad o incidentes en la zona, se realiza una evaluación puntual de actualización de riesgos." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Evaluación de Residencias y Cancillerías", "item": "https://cssg-global.com/consultoria/evaluacion-residencias-cancillerias" } ] }
    ]
  },
  {
    path: 'consultoria/due-diligence-corporativa',
    title: 'Due Diligence Corporativa Venezuela | CSSG | Caracas · Miami',
    description: 'Due diligence corporativa en Venezuela: verificación de antecedentes, CICPC, SENIAT, IVSS e investigación de socios. Resultados en 2-15 días hábiles.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Due Diligence Corporativa Venezuela", "description": "Investigación y verificación de personas naturales y jurídicas en Venezuela. CICPC, SENIAT, IVSS, OSINT.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué fuentes utiliza CSSG para la due diligence corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG consulta CICPC (antecedentes penales), SENIAT (situación tributaria), IVSS (historial laboral), SUNDDE, SAREN (registros mercantiles), listas OFAC/ONU de sanciones internacionales y fuentes OSINT especializadas. Los resultados se entregan en 2-15 días hábiles según la profundidad requerida." } },
        { "@type": "Question", "name": "¿Para qué casos es necesaria una due diligence corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Es recomendable antes de contratar socios comerciales locales, incorporar personal directivo, adjudicar contratos de alto valor, establecer joint ventures o ante denuncias de actividades irregulares internas. Especialmente crítica en el contexto venezolano por la complejidad regulatoria." } },
        { "@type": "Question", "name": "¿CSSG puede investigar a personas fuera de Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, mediante fuentes OSINT internacionales, consultas de registros públicos de múltiples países y alianzas con redes de investigación regional. Para investigaciones en el exterior, los plazos varían entre 5 y 20 días hábiles dependiendo del país y nivel de profundidad." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Due Diligence Corporativa", "item": "https://cssg-global.com/consultoria/due-diligence-corporativa" } ] }
    ]
  },
  {
    path: 'consultoria/inteligencia-y-analisis-de-riesgo',
    title: 'Inteligencia y Análisis de Riesgo Venezuela | CSSG | Caracas · Miami',
    description: 'Análisis de riesgo político-operacional, delictivo y geopolítico en Venezuela. Inteligencia accionable para la toma de decisiones ejecutivas.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Inteligencia y Análisis de Riesgo", "description": "Análisis de riesgo político, delictivo y geopolítico en Venezuela para organizaciones corporativas.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué tipo de inteligencia produce CSSG para sus clientes corporativos?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG produce inteligencia operacional (estado de seguridad en zonas operativas), inteligencia delictual (tendencias de criminalidad local y regional), inteligencia política (riesgo regulatorio y social) e inteligencia competitiva (análisis de entorno de negocio). Todos los informes son accionables para la toma de decisiones ejecutivas." } },
        { "@type": "Question", "name": "¿Con qué frecuencia se actualizan los informes de inteligencia de riesgo?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG ofrece informes puntuales bajo demanda, suscripciones semanales de briefing de riesgo y alertas tempranas en tiempo real ante eventos críticos. La frecuencia se define según las necesidades operacionales del cliente y la volatilidad de la zona geográfica." } },
        { "@type": "Question", "name": "¿Cómo se diferencia la inteligencia de CSSG de los informes públicos disponibles?", "acceptedAnswer": { "@type": "Answer", "text": "Los informes de CSSG combinan fuentes humanas verificadas (HUMINT), análisis de señales de medios (OSINT), datos de incidentes propios acumulados en 17 años de operaciones y correlación con vectores históricos locales. Esta combinación produce inteligencia con mayor profundidad y precisión contextual que fuentes de acceso público." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Inteligencia y Análisis de Riesgo", "item": "https://cssg-global.com/consultoria/inteligencia-y-analisis-de-riesgo" } ] }
    ]
  },
  {
    path: 'consultoria/amenaza-interna-insider-threat',
    title: 'Insider Threat — Amenaza Interna Corporativa | CSSG | Caracas · Miami',
    description: 'Detección y mitigación de amenazas internas (insider threat) en organizaciones venezolanas. Análisis de vectores: captado, negligente y ex-empleado.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Gestión de Amenaza Interna (Insider Threat)", "description": "Detección y mitigación de insider threat en empresas venezolanas. Análisis de personal y controles internos.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es el insider threat y por qué es crítico en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "El insider threat es la amenaza que representa el personal interno de una organización: empleados captados por terceros, trabajadores negligentes o ex-empleados con acceso residual. En Venezuela es especialmente crítico por la presión económica sobre el personal y la dificultad de verificación de antecedentes." } },
        { "@type": "Question", "name": "¿Cómo detecta CSSG indicadores de amenaza interna?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG implementa programas de monitoreo conductual, análisis de patrones de acceso, entrevistas estructuradas y revisión de controles de información sensible. No se trata de vigilancia masiva, sino de indicadores objetivos de comportamiento anómalo correlacionados con factores de riesgo conocidos." } },
        { "@type": "Question", "name": "¿Qué medidas preventivas recomienda CSSG contra el insider threat?", "acceptedAnswer": { "@type": "Answer", "text": "Las medidas preventivas incluyen: procesos de selección con due diligence, segmentación de acceso a información sensible, cultura de reporte seguro (canal de denuncias), revisiones periódicas de privilegios de acceso y programas de bienestar laboral que reduzcan factores de vulnerabilidad económica del personal." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Amenaza Interna (Insider Threat)", "item": "https://cssg-global.com/consultoria/amenaza-interna-insider-threat" } ] }
    ]
  },
  {
    path: 'consultoria/continuidad-de-negocio',
    title: 'Continuidad de Negocio Venezuela | ISO 22301 | CSSG | Caracas · Miami',
    description: 'Planes de continuidad de negocio para Venezuela: cortes eléctricos, disturbios, escasez y crisis. Metodología ISO 22301:2019.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Continuidad de Negocio Venezuela", "description": "BCP bajo ISO 22301:2019 adaptado a Venezuela: cortes eléctricos, disturbios, escasez operativa.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué escenarios cubre un plan de continuidad de negocio para Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "El BCP para Venezuela cubre escenarios específicos del entorno local: cortes eléctricos prolongados, fallas de conectividad, escasez de suministros críticos, disturbios civiles, contingencias sanitarias y pérdida de personal clave. El plan define tiempos de recuperación (RTO) y niveles mínimos de servicio (RPO) para cada escenario." } },
        { "@type": "Question", "name": "¿Cuánto tiempo lleva desarrollar un plan de continuidad de negocio?", "acceptedAnswer": { "@type": "Answer", "text": "Un BCP completo bajo ISO 22301:2019 toma entre 4 y 8 semanas: análisis de impacto al negocio (BIA), identificación de procesos críticos, diseño de estrategias de recuperación, documentación del plan y simulacro de validación. CSSG ofrece también planes de emergencia acelerados en 2 semanas para necesidades urgentes." } },
        { "@type": "Question", "name": "¿Con qué frecuencia debe actualizarse el plan de continuidad de negocio?", "acceptedAnswer": { "@type": "Answer", "text": "Se recomienda revisión anual del plan completo, actualización inmediata ante cambios organizacionales significativos y simulacro tabletop semestral para validar que el equipo conoce los procedimientos. En Venezuela, la volatilidad del entorno hace recomendable revisiones trimestrales de los escenarios de amenaza." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Continuidad de Negocio", "item": "https://cssg-global.com/consultoria/continuidad-de-negocio" } ] }
    ]
  },
  {
    path: 'consultoria/gestion-de-crisis-y-respuesta',
    title: 'Gestión de Crisis Empresarial | CSSG | Caracas · Miami',
    description: 'Diseño e implementación de sistemas de gestión de crisis corporativa. Simulacros tabletop, CECOM y protocolos de comunicación bajo presión.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Gestión de Crisis Empresarial", "description": "Sistemas de gestión de crisis: CECOM, protocolos de respuesta, simulacros tabletop.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es un simulacro tabletop y cómo lo conduce CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Un simulacro tabletop es un ejercicio de escritorio donde el equipo directivo enfrenta un escenario de crisis simulado sin activación de recursos reales. CSSG conduce el ejercicio con facilitadores expertos, presenta inyecciones de complejidad progresiva y evalúa la calidad de las decisiones del equipo bajo presión." } },
        { "@type": "Question", "name": "¿Cómo se integra el CECOM de CSSG en la gestión de crisis corporativa?", "acceptedAnswer": { "@type": "Answer", "text": "El CECOM (Centro de Mando 24/7) actúa como núcleo de coordinación durante una crisis: recibe alertas de los sistemas ShieldTrace, coordina los recursos de respuesta, mantiene comunicaciones con el equipo directivo del cliente y registra la cronología del incidente para análisis posterior." } },
        { "@type": "Question", "name": "¿Qué incluye un sistema de gestión de crisis implementado por CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Incluye: manual de gestión de crisis adaptado al cliente, árbol de decisión por tipo de incidente, protocolos de comunicación interna y externa, equipo de gestión de crisis designado con roles definidos, acceso al CECOM 24/7 y dos simulacros anuales de validación." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Gestión de Crisis y Respuesta", "item": "https://cssg-global.com/consultoria/gestion-de-crisis-y-respuesta" } ] }
    ]
  },
  {
    path: 'consultoria/proteccion-ejecutiva-analisis-amenazas',
    title: 'Protección Ejecutiva y Análisis de Amenazas | CSSG | Caracas · Miami',
    description: 'Consultoría de protección ejecutiva: análisis de perfil de amenaza, ajuste del esquema de seguridad personal y coordinación con Escudo Diplomático.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Protección Ejecutiva — Consultoría", "description": "Análisis de amenaza y diseño de esquema de protección personal para ejecutivos en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es el análisis de perfil de amenaza para ejecutivos?", "acceptedAnswer": { "@type": "Answer", "text": "Es una evaluación estructurada que determina el nivel de exposición personal de un ejecutivo: visibilidad pública, viajes frecuentes, valor como objetivo (económico, político, reputacional), vulnerabilidades del entorno doméstico y hábitos de seguridad digital. El resultado calibra el esquema de protección al nivel de riesgo real." } },
        { "@type": "Question", "name": "¿Cuándo es recomendable contratar protección ejecutiva en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Se recomienda ante: amenazas documentadas o percibidas, incremento del perfil público del ejecutivo, viajes a zonas de alta criminalidad, situaciones de conflicto empresarial de alto riesgo o como medida preventiva para directivos de empresas en sectores sensibles como minería, finanzas o salud." } },
        { "@type": "Question", "name": "¿Cómo se coordina la protección ejecutiva con el programa Escudo Diplomático de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Para ejecutivos que requieren protección de nivel diplomático, el servicio se integra con el programa Escudo Diplomático de CSSG, que aplica protocolos G7, vehículos blindados certificados, comunicaciones encriptadas y coordinación táctica con el CECOM 24/7." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Protección Ejecutiva — Análisis de Amenazas", "item": "https://cssg-global.com/consultoria/proteccion-ejecutiva-analisis-amenazas" } ] }
    ]
  },
  {
    path: 'consultoria/tecnologia/monitoreo-tiempo-real',
    title: 'Monitoreo de Seguridad en Tiempo Real | CSSG | Caracas · Miami',
    description: 'Capacidad de monitoreo centralizado 24/7 para instalaciones corporativas en Venezuela. Redundancias ante cortes eléctricos y fallas de conectividad.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Monitoreo de Seguridad en Tiempo Real", "description": "Plataforma de monitoreo centralizado 24/7 con redundancias para el entorno venezolano.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Cómo garantiza CSSG la continuidad del monitoreo ante cortes eléctricos en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "ShieldTrace PSIM opera con redundancias diseñadas para el entorno venezolano: UPS de larga duración, conectividad dual (fibra + LTE/satellite failover), servidores locales en modo stand-alone y protocolos de activación manual del CECOM ante pérdida de señal. El sistema mantiene operatividad hasta 8 horas sin energía externa." } },
        { "@type": "Question", "name": "¿Qué tipos de sensores y dispositivos soporta el monitoreo en tiempo real de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "ShieldTrace integra: cámaras IP con analítica de video (detección de intrusos, conteo de personas, reconocimiento de placas), sensores de perímetro (PIR, barreras de microondas), lectores biométricos de acceso, GPS vehicular, drones autónomos de patrullaje y radios encriptadas del personal." } },
        { "@type": "Question", "name": "¿Desde dónde se puede acceder al panel de monitoreo?", "acceptedAnswer": { "@type": "Answer", "text": "El cliente accede al dashboard ShieldTrace desde cualquier dispositivo con navegador web mediante acceso seguro con doble factor de autenticación. El CECOM de CSSG también monitorea en paralelo, generando alertas proactivas sin necesidad de que el cliente esté conectado permanentemente." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Monitoreo en Tiempo Real", "item": "https://cssg-global.com/consultoria/tecnologia/monitoreo-tiempo-real" } ] }
    ]
  },
  {
    path: 'consultoria/tecnologia/centro-de-mando-cecom',
    title: 'Centro de Mando CECOM | CSSG | Caracas · Miami',
    description: 'El único Centro de Mando operativo 24/7 disponible a empresas en Venezuela. Gestión de incidentes en tiempo real con capacidad de coordinación táctica.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Centro de Mando CECOM", "description": "Centro de Mando corporativo 24/7. Coordinación táctica de incidentes de seguridad en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es el CECOM y qué lo diferencia de un simple centro de monitoreo?", "acceptedAnswer": { "@type": "Answer", "text": "El CECOM (Centro de Comando y Control) de CSSG no es solo monitoreo pasivo: es un centro de coordinación táctica activa con capacidad de despacho de recursos de respuesta, comunicación en tiempo real con personal de campo, gestión de incidentes con cronología auditada y escalamiento automático a servicios de emergencia." } },
        { "@type": "Question", "name": "¿El CECOM de CSSG está disponible para empresas externas?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. El CECOM está disponible como servicio para clientes corporativos que deseen una extensión de su capacidad de seguridad sin la inversión de un centro propio. Se opera bajo contrato de servicio con SLAs de respuesta definidos y acceso dedicado al dashboard ShieldTrace." } },
        { "@type": "Question", "name": "¿Cómo responde el CECOM ante un incidente de seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "El protocolo estándar es: detección de alerta (ShieldTrace o reporte de campo) → verificación en 90 segundos → clasificación del incidente → notificación al cliente → despacho de recursos según protocolo → gestión del incidente en tiempo real → informe post-incidente en 24 horas." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Centro de Mando CECOM", "item": "https://cssg-global.com/consultoria/tecnologia/centro-de-mando-cecom" } ] }
    ]
  },
  {
    path: 'consultoria/tecnologia/scoring-de-seguridad',
    title: 'Scoring de Seguridad Corporativa | CSSG | Caracas · Miami',
    description: 'Índice de seguridad corporativa cuantificado: 4 pilares, fórmula FMEA y benchmark sectorial. Mida su nivel de seguridad con rigor metodológico.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Scoring de Seguridad Corporativa", "description": "Índice de seguridad cuantificado bajo FMEA. 4 pilares: Perímetro, Accesos, Procedimientos, Inteligencia.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Cómo se calcula el scoring de seguridad corporativa de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El índice se calcula sobre 4 pilares: Perímetro físico, Control de accesos, Procedimientos operativos e Inteligencia situacional. Cada pilar se evalúa con indicadores cuantificables. La puntuación final aplica la fórmula FMEA: Índice = (Probabilidad × 0.4) + (Impacto × 0.6), produciendo un score de 0 a 100." } },
        { "@type": "Question", "name": "¿Para qué sirve el scoring de seguridad en la toma de decisiones?", "acceptedAnswer": { "@type": "Answer", "text": "El score convierte la gestión de seguridad en un KPI comparable y trazable. Permite priorizar inversiones, justificar presupuestos ante la junta directiva, hacer benchmark sectorial y medir la mejora de la postura de seguridad a lo largo del tiempo con evidencia objetiva." } },
        { "@type": "Question", "name": "¿Con qué frecuencia se recalcula el scoring de seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "Se recomienda recalcular el score trimestralmente para organizaciones en sectores de alta exposición, y semestralmente para organizaciones con entorno estable. Adicionalmente, se recalcula ante cambios significativos en las instalaciones, personal o contexto de amenaza local." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Scoring de Seguridad", "item": "https://cssg-global.com/consultoria/tecnologia/scoring-de-seguridad" } ] }
    ]
  },
  {
    path: 'consultoria/capacitacion/formacion-personal-seguridad',
    title: 'Formación de Personal de Seguridad DIGESERVISP | CSSG | Caracas · Miami',
    description: 'Programa de formación habilitado DIGESERVISP de 120 horas para personal de seguridad privada en Venezuela. Presencial, e-learning o mixto.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Formación de Personal de Seguridad — 120h DIGESERVISP", "description": "Programa de 120 horas habilitado por DIGESERVISP para seguridad privada en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿El programa de formación de CSSG está habilitado por DIGESERVISP?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG cuenta con habilitación DIGESERVISP para formación de personal de seguridad privada. El programa de 120 horas cumple con todos los requisitos reglamentarios y otorga certificación oficial reconocida por las autoridades venezolanas de seguridad privada." } },
        { "@type": "Question", "name": "¿Cuáles son los módulos del programa de formación de seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "El programa cubre: Marco legal de la seguridad privada en Venezuela, Uso proporcional de la fuerza, Primeros auxilios tácticos, CCTV y analítica forense, Derechos humanos y ética, Defensa personal y control de intrusos, Protección de activos críticos e Inteligencia y contrainteligencia básica." } },
        { "@type": "Question", "name": "¿Se puede realizar la formación en modalidad online o mixta?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG ofrece formación presencial, e-learning a través de la plataforma Zentinel Global y modalidad mixta (blended learning). La modalidad online permite formación asincrónica sin interrumpir la operación, con evaluaciones periódicas y certificación equivalente a la presencial." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Formación de Personal de Seguridad", "item": "https://cssg-global.com/consultoria/capacitacion/formacion-personal-seguridad" } ] }
    ]
  },
  {
    path: 'consultoria/capacitacion/respuesta-crisis-equipos',
    title: 'Formación en Respuesta a Crisis para Equipos | CSSG | Caracas · Miami',
    description: 'Formación corporativa en gestión de crisis para equipos: simulacros tabletop, talleres de roles y validación del plan de crisis.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Formación en Respuesta a Crisis para Equipos", "description": "Talleres y simulacros tabletop para equipos corporativos. Validación del plan de crisis.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué aprende un equipo directivo en el taller de respuesta a crisis de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El taller desarrolla: reconocimiento temprano de señales de crisis, activación del protocolo de gestión, comunicación bajo presión (interna, con medios y con autoridades), toma de decisiones con información incompleta y coordinación entre áreas. Se trabaja con escenarios reales calibrados al contexto venezolano." } },
        { "@type": "Question", "name": "¿Cuántas personas pueden participar en el taller de respuesta a crisis?", "acceptedAnswer": { "@type": "Answer", "text": "El formato óptimo es de 8-15 personas del equipo de gestión de crisis: CEO, CFO, CISO, responsable de operaciones, comunicaciones y seguridad. CSSG también ofrece talleres ampliados para hasta 30 personas en formato mixto con grupos de trabajo diferenciados por rol." } },
        { "@type": "Question", "name": "¿Cuánto dura el taller de respuesta a crisis para equipos corporativos?", "acceptedAnswer": { "@type": "Answer", "text": "El formato estándar es un taller de 8 horas (jornada completa) o dos sesiones de 4 horas en días consecutivos. Incluye: marco conceptual (2h), simulacro tabletop principal (4h), debriefing y lecciones aprendidas (2h). CSSG también ofrece programas de formación continua con simulacros trimestrales." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Respuesta a Crisis para Equipos", "item": "https://cssg-global.com/consultoria/capacitacion/respuesta-crisis-equipos" } ] }
    ]
  },
  {
    path: 'consultoria/capacitacion/concienciacion-ejecutiva',
    title: 'Concienciación Ejecutiva en Seguridad | Duty of Care | CSSG | Caracas · Miami',
    description: 'Programa de concienciación de seguridad para directivos: autoprotección, duty of care, seguridad digital y seguridad residencial. Taller de 4 horas.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Concienciación Ejecutiva en Seguridad", "description": "Formación de directivos en autoprotección, seguridad digital y duty of care en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué temas cubre el programa de concienciación ejecutiva de seguridad?", "acceptedAnswer": { "@type": "Answer", "text": "El programa cubre: autoprotección personal y en vehículo, seguridad digital básica (phishing, contraseñas, redes), seguridad residencial, reconocimiento de seguimientos y vigilancia, protocolo ante secuestro express y concepto de duty of care para directivos con equipos a cargo." } },
        { "@type": "Question", "name": "¿Qué es el duty of care y por qué es relevante para directivos en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Duty of care es la obligación legal y ética de los empleadores de garantizar la seguridad de su personal. En Venezuela, implica evaluar los riesgos para empleados en zonas críticas, proveer formación de seguridad, establecer protocolos de viaje y contar con planes de evacuación actualizados." } },
        { "@type": "Question", "name": "¿El taller de concienciación ejecutiva se puede hacer en formato confidencial one-on-one?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG ofrece sesiones individuales de concienciación ejecutiva para altos directivos que requieren un perfil de riesgo personalizado y asesoría confidencial. El formato incluye evaluación del estilo de vida, hábitos de seguridad actuales y recomendaciones específicas para el perfil del ejecutivo." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Concienciación Ejecutiva", "item": "https://cssg-global.com/consultoria/capacitacion/concienciacion-ejecutiva" } ] }
    ]
  },
  {
    path: 'consultoria/casos-de-exito',
    title: 'Casos de Éxito en Seguridad Corporativa | CSSG | Caracas · Miami',
    description: 'Resultados reales de proyectos de seguridad corporativa y diplomática en Venezuela. Sectores: diplomático, manufactura, due diligence y salud.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "ItemList", "name": "Casos de Éxito — CSSG", "description": "Proyectos de seguridad corporativa y diplomática exitosos en Venezuela.", "url": "https://cssg-global.com/consultoria/casos-de-exito" },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿En qué sectores tiene casos de éxito documentados CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG tiene casos de éxito en los sectores diplomático (embajadas G7), manufactura e industria, clínicas y salud, comercio minorista y corporaciones multinacionales. Los resultados documentados incluyen reducción de incidentes, optimización de costos operativos y mejoras medibles en el índice de seguridad corporativa." } },
        { "@type": "Question", "name": "¿Puede CSSG proporcionar referencias de clientes actuales?", "acceptedAnswer": { "@type": "Answer", "text": "Por razones de confidencialidad y seguridad operacional, CSSG no divulga públicamente los nombres de sus clientes activos. Sin embargo, puede facilitar cartas de referencia genéricas y testimonios verificables bajo acuerdo de confidencialidad para organizaciones en proceso de evaluación de proveedores." } },
        { "@type": "Question", "name": "¿Cuál es el resultado más común reportado por clientes de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "Los resultados más frecuentes reportados por clientes son: reducción de incidentes de seguridad entre 60% y 100% en el primer año, optimización de costos operativos del esquema de seguridad entre 15% y 40%, y mejora significativa en la percepción de seguridad del personal y directivos." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Casos de Éxito", "item": "https://cssg-global.com/consultoria/casos-de-exito" } ] }
    ]
  },
  {
    path: 'consultoria/certificaciones',
    title: 'Empresa de Seguridad Certificada ISO 9001 en Venezuela — N° 580181 | CSSG',
    description: 'Empresa de seguridad con ISO 9001:2015 N° 580181 (LL-C) y Cyber Essentials NCSC. Marcos ESRM, ISO 31000, ISO 22301 y ASIS ORM.1. Certificaciones verificables por terceros · Venezuela.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Organization", "name": "CSSG — Company Of Security And Service Global C.A.", "url": "https://cssg-global.com", "legalName": "Company Of Security And Service Global C.A.", "taxID": "J-29782024-8", "areaServed": ["Venezuela", "Latin America"], "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "ISO 9001:2015", "identifier": "N° 580181", "credentialCategory": "Quality Management System Certificate", "recognizedBy": { "@type": "Organization", "name": "LL-C / International Certification System" }, "validIn": { "@type": "Place", "name": "Venezuela" } },
        { "@type": "EducationalOccupationalCredential", "name": "Cyber Essentials", "credentialCategory": "Cybersecurity Certificate", "validThrough": "2027-05", "recognizedBy": { "@type": "Organization", "name": "National Cyber Security Centre (NCSC) — UK Government" } },
        { "@type": "EducationalOccupationalCredential", "name": "DIGESERVISP", "credentialCategory": "Government Operating License", "recognizedBy": { "@type": "Organization", "name": "Dirección General de los Servicios de Seguridad Privada — Venezuela" } }
      ] },
      { "@context": "https://schema.org", "@type": "WebPage", "name": "Certificaciones ISO 9001 y Cyber Essentials — CSSG Venezuela", "url": "https://cssg-global.com/consultoria/certificaciones", "description": "CSSG es una empresa de seguridad corporativa y diplomática en Venezuela certificada ISO 9001:2015 N° 580181 y Cyber Essentials NCSC. Opera bajo marcos ESRM, ISO 31000:2018, ISO 22301:2019 e ISO 22361:2022.", "inLanguage": "es", "keywords": "empresa seguridad ISO 9001 Venezuela, certificado 580181, Cyber Essentials seguridad privada, ISO 31000 Venezuela, seguridad corporativa certificada Caracas, DIGESERVISP empresa seguridad, ESRM seguridad corporativa Venezuela", "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", "h2", ".intro", ".faq-answer"] } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Cuál es el número de certificado ISO 9001:2015 de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El certificado ISO 9001:2015 de CSSG es el N° 580181, emitido por LL-C (International Certification System). Cubre los procesos de diseño, suministro y operación de servicios de seguridad corporativa y diplomática. El certificado puede solicitarse como documento oficial en procesos de licitación o evaluación de proveedores." } },
        { "@type": "Question", "name": "¿ISO 31000 se puede certificar? ¿CSSG tiene certificación ISO 31000?", "acceptedAnswer": { "@type": "Answer", "text": "No. ISO 31000:2018 es una norma de directrices, no de requisitos auditables. Ninguna organización en el mundo puede certificarse en ISO 31000. CSSG aplica ISO 31000 como metodología base de sus análisis FMEA y modelos de scoring de riesgo, pero el estándar certificable que cubre la calidad de esos procesos es el ISO 9001:2015 N° 580181." } },
        { "@type": "Question", "name": "¿Qué es Cyber Essentials y por qué lo tiene una empresa de seguridad física en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Cyber Essentials es la certificación de ciberseguridad emitida por el National Cyber Security Centre (NCSC) del Gobierno del Reino Unido. Valida cinco controles: firewall, configuración segura, control de acceso, protección contra malware y actualizaciones. CSSG la mantiene porque sus operaciones integran componentes físicos y digitales, y ShieldTrace PSIM opera sobre infraestructura de red que debe estar protegida. La recertificación vigente es hasta mayo de 2027." } },
        { "@type": "Question", "name": "¿Qué ventaja tiene contratar una empresa de seguridad con ISO 9001 en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Una empresa certificada ISO 9001 tiene cada proceso documentado y auditado por un tercero independiente: selección de personal, respuesta a incidentes, supervisión de campo y reporte al cliente. El servicio funciona sistemáticamente, sin depender de decisiones individuales. En licitaciones con embajadas del G7, organismos internacionales (ONU, BID, IFC) o corporaciones multinacionales, el ISO 9001 suele ser requisito excluyente." } },
        { "@type": "Question", "name": "¿Qué marcos normativos aplica CSSG en sus servicios de consultoría?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG aplica: ISO 9001:2015 (gestión de calidad, certificado N° 580181), ISO 31000:2018 (gestión del riesgo), ISO 22301:2019 (continuidad de negocio), ISO 22361:2022 (gestión de crisis), ASIS ORM.1:2017 (resiliencia organizacional), marco ESRM de ASIS International, metodología CPTED y normativa venezolana DIGESERVISP." } },
        { "@type": "Question", "name": "¿Cumple CSSG con la regulación DIGESERVISP en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. CSSG mantiene la credencial vigente de la Dirección General de los Servicios de Seguridad Privada (DIGESERVISP), el organismo gubernamental venezolano que habilita legalmente a las empresas de seguridad privada para operar. Verificar la credencial DIGESERVISP del proveedor es el primer paso en cualquier proceso de selección." } },
        { "@type": "Question", "name": "¿Para qué licitaciones es relevante la certificación ISO 9001 N° 580181 de CSSG?", "acceptedAnswer": { "@type": "Answer", "text": "El ISO 9001:2015 N° 580181 de CSSG es exigido o valorado en licitaciones con embajadas del G7, misiones diplomáticas europeas, organizaciones internacionales (ONU, BID, CAF, IFC), bancos de desarrollo, y corporaciones multinacionales con políticas de compliance de proveedor. También aplica en sectores regulados como energía, minería y telecomunicaciones en Venezuela." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Certificaciones y Estándares", "item": "https://cssg-global.com/consultoria/certificaciones" } ] }
    ]
  },
  {
    path: 'iso-9001-empresa-seguridad-venezuela',
    title: 'ISO 9001 Empresa de Seguridad en Venezuela — Certificado N° 580181 | CSSG',
    description: 'CSSG es la única empresa de seguridad en Venezuela con ISO 9001:2015 N° 580181 verificable por terceros. Auditorías periódicas por LL-C. Requisito para licitaciones G7 y diplomáticas.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Seguridad Corporativa Certificada ISO 9001 — Venezuela", "description": "Servicios de seguridad corporativa y diplomática certificados ISO 9001:2015 N° 580181 en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "areaServed": "Venezuela", "hasCredential": { "@type": "EducationalOccupationalCredential", "name": "ISO 9001:2015", "identifier": "N° 580181" } }
  },
  {
    path: 'certificaciones-seguridad-corporativa-venezuela',
    title: 'Certificaciones de Seguridad Corporativa en Venezuela | ISO 9001 · Cyber Essentials | CSSG',
    description: 'Empresa de seguridad corporativa certificada en Venezuela: ISO 9001:2015, Cyber Essentials NCSC, ESRM, ISO 31000, ISO 22301. Verificables por auditoría independiente.',
    image: 'https://cssg-global.com/cssg-seguridad-corporativa-diplomatica.jpg',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Certificaciones de Seguridad Corporativa Venezuela", "description": "CSSG opera con ISO 9001:2015, Cyber Essentials NCSC y credencial DIGESERVISP. Marcos ESRM, ISO 31000 e ISO 22301.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } }
  },
  {
    path: 'consultoria/asesoria-legal-rrhh-seguridad',
    title: 'Asesoría Legal en Seguridad: RRHH y Derechos Humanos en Venezuela | CSSG',
    description: 'Consultoría legal especializada en derecho laboral LOTTT para empresas de seguridad privada, protocolos DDHH, uso proporcional de la fuerza y compliance DIGESERVISP en Venezuela.',
    image: 'https://cssg-global.com/consulting_b2b.webp',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Asesoría Legal en Seguridad: RRHH y Derechos Humanos", "description": "Consultoría jurídica especializada en derecho laboral de seguridad privada, protocolos DDHH y compliance regulatorio para Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué obligaciones laborales tiene una empresa de seguridad privada en Venezuela bajo la LOTTT?", "acceptedAnswer": { "@type": "Answer", "text": "Las empresas de seguridad privada en Venezuela deben cumplir la LOTTT en jornada laboral, beneficios sociales, utilidades, vacaciones y cesta ticket. El personal operativo requiere contrato formalizado, afiliación IVSS/INPSASEL y registro ante DIGESERVISP." } },
        { "@type": "Question", "name": "¿Los protocolos de derechos humanos son obligatorios para empresas de seguridad privada en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Sí. Venezuela es signataria de la Convención Americana sobre Derechos Humanos y los Principios de la ONU sobre Empresas y DDHH aplican a operadores privados. Un protocolo de uso proporcional de la fuerza documentado es exigido además por normas ESRM y por clientes del G7." } },
        { "@type": "Question", "name": "¿Qué riesgo legal enfrenta una empresa sin protocolo de uso de la fuerza documentado?", "acceptedAnswer": { "@type": "Answer", "text": "Sin documentación del protocolo, ante un incidente cualquier acción del personal puede interpretarse como exceso de fuerza, generando responsabilidad civil y penal para la empresa. Un protocolo certificado protege tanto al operador como a la organización cliente." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Marco Legal y Compliance", "item": "https://cssg-global.com/consultoria/asesoria-legal-rrhh-seguridad" } ] }
    ]
  },
  // --- White Papers ---
  {
    path: 'white-papers/guia-evaluacion-riesgos-seguridad-venezuela',
    title: 'Guía de Evaluación de Riesgos de Seguridad Corporativa en Venezuela 2026 | CSSG',
    description: 'Descargue gratis la guía definitiva de evaluación de riesgos de seguridad empresarial en Venezuela. Metodología ESRM, ISO 31000:2018 y FMEA aplicados al contexto venezolano.',
    image: 'https://cssg-global.com/consultoria_card.webp',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Evaluación de Riesgos de Seguridad Corporativa en Venezuela", "description": "Guía metodológica ESRM + ISO 31000:2018 + FMEA para la evaluación de riesgos de seguridad en empresas venezolanas. Elaborada por CSSG con +17 años de operaciones en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Evaluación de Riesgos de Seguridad", "areaServed": { "@type": "Country", "name": "Venezuela" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué es la evaluación de riesgos de seguridad corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Es el proceso sistemático de identificar, cuantificar y priorizar las amenazas que afectan los activos críticos de una organización en el contexto venezolano. Aplica el marco ESRM de ASIS International y la norma ISO 31000:2018, produciendo un Índice de Seguridad Corporativa (ISC-VE) que permite tomar decisiones de inversión en seguridad con criterio objetivo." } },
        { "@type": "Question", "name": "¿Cómo se calcula el índice de riesgo FMEA en seguridad corporativa?", "acceptedAnswer": { "@type": "Answer", "text": "La fórmula FMEA aplicada por CSSG es: Índice de Riesgo = (Probabilidad × 0.4) + (Impacto × 0.6). La ponderación mayor al impacto refleja que en seguridad corporativa, el daño potencial de un incidente es más relevante que su probabilidad aislada. El resultado es un score de 0 a 100 que clasifica el nivel de riesgo en cuatro categorías: Óptimo, Moderado, Elevado y Crítico." } },
        { "@type": "Question", "name": "¿Por qué Venezuela requiere una metodología de evaluación de riesgos diferente?", "acceptedAnswer": { "@type": "Answer", "text": "Venezuela presenta un perfil de riesgo único: cortes eléctricos que promedian 4-8 horas diarias, tiempos de respuesta policial superiores a 40 minutos, presión económica sobre el personal de seguridad como vector de insider threat, y volatilidad político-social que puede generar disrupciones operacionales en horas. Los marcos metodológicos genéricos no contemplan estos factores, lo que lleva a evaluaciones que subestiman los riesgos críticos del entorno." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Consultoría", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "White Papers", "item": "https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" }, { "@type": "ListItem", "position": 4, "name": "Guía Evaluación de Riesgos", "item": "https://cssg-global.com/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" } ] }
    ]
  },
  {
    path: 'white-papers/due-diligence-corporativa-venezuela',
    title: 'Due Diligence Corporativa en Venezuela: Protocolo de Investigación 2026 | CSSG',
    description: 'Descargue gratis el protocolo completo de due diligence corporativa en Venezuela. Verificación CICPC, SENIAT, IVSS, OSINT y metodología de escritura por inducción.',
    image: 'https://cssg-global.com/consultoria_card.webp',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Due Diligence Corporativa Venezuela", "description": "Protocolo completo de investigación y verificación de personas naturales y jurídicas en Venezuela. Fuentes CICPC, SENIAT, IVSS, SAREN y OSINT. Elaborado por CSSG con +1.200 investigaciones completadas.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Due Diligence Corporativa", "areaServed": { "@type": "Country", "name": "Venezuela" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Qué fuentes se consultan en una due diligence corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Una due diligence corporativa completa en Venezuela consulta: CICPC (antecedentes penales y causas abiertas), SENIAT (situación tributaria y solvencias), IVSS (historial laboral y obligaciones parafiscales), SAREN (registros mercantiles y societarios), listas OFAC/ONU/UE de sanciones internacionales, y fuentes OSINT especializadas en el contexto venezolano incluyendo medios judiciales y redes sociales." } },
        { "@type": "Question", "name": "¿Qué es la 'escritura por inducción' en due diligence corporativa?", "acceptedAnswer": { "@type": "Answer", "text": "Es una metodología de redacción de informes que presenta los hallazgos como evidencias que conducen al lector a la conclusión, sin formular acusaciones directas. Es especialmente importante en Venezuela por el contexto legalmente sensible: un informe que documenta el patrón de evidencias es más sólido jurídicamente que uno que emite juicios explícitos sobre el investigado." } },
        { "@type": "Question", "name": "¿Cuáles son los tres niveles de due diligence corporativa en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG ofrece tres niveles: Básico (2-3 días, CICPC + SENIAT + OSINT básico, ideal para personal operativo), Estándar (5-7 días, incluye IVSS + SAREN + OSINT extendido + historial de litigios, ideal para cargos gerenciales) y Reforzado (10-15 días, incluye investigación de beneficiarios finales + verificación internacional + análisis de vínculos con funcionarios, ideal para directivos y fusiones/adquisiciones)." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Consultoría", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "White Papers", "item": "https://cssg-global.com/white-papers/due-diligence-corporativa-venezuela" }, { "@type": "ListItem", "position": 4, "name": "Due Diligence Corporativa Venezuela", "item": "https://cssg-global.com/white-papers/due-diligence-corporativa-venezuela" } ] }
    ]
  },
  {
    path: 'white-papers/plan-continuidad-negocio-venezuela',
    title: 'Plan de Continuidad de Negocio en Venezuela: Guía ISO 22301:2019 | CSSG',
    description: 'Descargue gratis la guía completa de Plan de Continuidad de Negocio (BCP) para Venezuela. ISO 22301:2019 adaptado a cortes eléctricos, disturbios y escasez operativa.',
    image: 'https://cssg-global.com/consultoria_card.webp',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "Plan de Continuidad de Negocio Venezuela", "description": "Guía metodológica ISO 22301:2019 para diseñar e implementar un BCP calibrado a los escenarios venezolanos: cortes eléctricos, disturbios, escasez y crisis de seguridad. Basada en +80 BCPs implementados por CSSG en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "serviceType": "Plan de Continuidad de Negocio", "areaServed": { "@type": "Country", "name": "Venezuela" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Por qué es crítico tener un Plan de Continuidad de Negocio en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "Venezuela presenta un perfil de disrupción único: cortes eléctricos que promedian 4-12 horas diarias en zonas industriales, volatilidad político-social que puede generar disturbios operacionales en horas, escasez crónica de suministros críticos, y degradación de la infraestructura de comunicaciones. Sin un BCP funcional, cada interrupción se convierte en una crisis improvisada con impacto sobre ingresos, clientes y personal." } },
        { "@type": "Question", "name": "¿Qué cubre el BIA (Business Impact Analysis) en el contexto venezolano?", "acceptedAnswer": { "@type": "Answer", "text": "El BIA en Venezuela debe identificar los procesos críticos de la organización y asignarles RTO (tiempo máximo tolerable de interrupción) y RPO (punto máximo de pérdida de datos aceptable) calibrados al entorno local. Procesos como facturación, comunicaciones con clientes y acceso a instalaciones tienen RTOs de 2-8 horas ante cortes eléctricos, y el plan de continuidad debe diseñarse con soluciones específicas para ese plazo." } },
        { "@type": "Question", "name": "¿Cómo se prueba un Plan de Continuidad de Negocio en Venezuela?", "acceptedAnswer": { "@type": "Answer", "text": "CSSG recomienda dos modalidades: el simulacro tabletop (escritorio) semestral donde el equipo directivo trabaja un escenario de crisis sin activar recursos reales, y el ejercicio funcional anual donde una parte de la organización activa realmente los procedimientos de continuidad para validar que las soluciones técnicas funcionan. El 70% de las mejoras de un BCP se identifican en el primer simulacro." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Consultoría", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "White Papers", "item": "https://cssg-global.com/white-papers/plan-continuidad-negocio-venezuela" }, { "@type": "ListItem", "position": 4, "name": "Plan Continuidad Negocio Venezuela", "item": "https://cssg-global.com/white-papers/plan-continuidad-negocio-venezuela" } ] }
    ]
  },
  // --- End White Papers ---
  // --- End Risk Advisory Services ---
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
    image: 'https://cssg-global.com/shieldtrace_tablet_dashboard_1777552473752.webp',
    jsonld: { "@context": "https://schema.org", "@type": "Service", "name": "Shieldtrace PSIM — Integrated Physical Security Management", "description": "Physical security integration platform (PSIM) combining AI-powered CCTV analytics, real-time GPS, biometric access control and autonomous drones for corporate security in Venezuela.", "provider": { "@type": "Organization", "name": "CSSG — Company Of Security And Service Global", "url": "https://cssg-global.com" }, "serviceType": "Physical Security Integration Platform", "areaServed": [{ "@type": "Country", "name": "Venezuela" }, { "@type": "City", "name": "Miami" }], "url": "https://cssg-global.com/en/technology", "inLanguage": "en" }
  },
  {
    path: 'consultoria/secure-landing',
    title: 'Llegada y Seguridad Ejecutiva en Venezuela | CSSG Secure Landing™',
    description: 'Programa estructurado de seguridad para ejecutivos e inversores extranjeros que llegan a Venezuela: briefing pre-viaje, llegada protegida, residencia fortificada y protección continua 24/7.',
    image: 'https://cssg-global.com/consulting_b2b.webp',
    jsonld: [
      { "@context": "https://schema.org", "@type": "Service", "name": "CSSG Secure Landing™", "description": "Programa de seguridad de cuatro niveles para ejecutivos e inversores extranjeros que llegan, se establecen y operan en Venezuela.", "provider": { "@type": "Organization", "name": "CSSG", "url": "https://cssg-global.com" }, "areaServed": { "@type": "Country", "name": "Venezuela" } },
      { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", "name": "¿Es seguro viajar a Venezuela por negocios?", "acceptedAnswer": { "@type": "Answer", "text": "El riesgo es real, pero gestionable con criterio local, planificación y ejecución disciplinada. Eso es lo que el programa estructura, nivel por nivel." } },
        { "@type": "Question", "name": "¿Necesito el programa completo?", "acceptedAnswer": { "@type": "Answer", "text": "No. La mayoría inicia en el Nivel 1 o 2 para un primer viaje exploratorio. El programa crece solo cuando crece su presencia en el país." } },
        { "@type": "Question", "name": "¿Con quién trataré?", "acceptedAnswer": { "@type": "Answer", "text": "Con un líder de programa CSSG de principio a fin, respaldado por nuestro centro de comando. Nunca será transferido a un subcontratista anónimo." } }
      ] },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://cssg-global.com" }, { "@type": "ListItem", "position": 2, "name": "Risk Advisory Services", "item": "https://cssg-global.com/consultoria" }, { "@type": "ListItem", "position": 3, "name": "Secure Landing", "item": "https://cssg-global.com/consultoria/secure-landing" } ] }
    ]
  },
  {
    path: 'esrm-readiness',
    title: 'Empresa de Seguridad Certificada ISO 9001 — Registro de Proveedores | CSSG Global',
    description: 'Empresa de seguridad certificada ISO 9001 y Cyber Essentials, alineada a ISO 18788, ISO 31000, ISO 28000 y ANSI/ASIS PSC.1. Auditoría de seguridad física, gestión de riesgos y evidencia operativa lista para su registro de proveedores.',
    image: 'https://cssg-global.com/consulting_b2b.webp',
    jsonld: { "@context": "https://schema.org", "@type": "ProfessionalService", "name": "CSSG Global — Registro de Proveedores y Compliance de Seguridad", "description": "Empresa de seguridad certificada ISO 9001 y Cyber Essentials, con gestión de riesgos ISO 31000, operaciones alineadas a ISO 18788 y auditoría de seguridad física lista para procesos de registro de proveedores y licitación.", "provider": { "@type": "Organization", "name": "CSSG — Company Of Security And Service Global", "url": "https://cssg-global.com" }, "areaServed": { "@type": "Country", "name": "Venezuela" }, "audience": { "@type": "Audience", "audienceType": "Overseas Security Managers, Regional Security Managers, Procurement" } }
  },
  {
    path: 'esrm-readiness/gracias',
    title: 'Solicitud recibida | CSSG Global',
    description: 'Confirmación de solicitud de expediente de cumplimiento — CSSG Global.',
    image: 'https://cssg-global.com/consulting_b2b.webp'
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
      'iso-9001-empresa-seguridad-venezuela': 'ISO 9001 Seguridad Venezuela',
      'certificaciones-seguridad-corporativa-venezuela': 'Certificaciones Seguridad Corporativa',
      'politica-privacidad': 'Política de Privacidad', 'terminos-condiciones': 'Términos y Condiciones',
      'white-papers': 'White Papers',
      'guia-evaluacion-riesgos-seguridad-venezuela': 'Guía Evaluación de Riesgos',
      'due-diligence-corporativa-venezuela': 'Due Diligence Corporativa Venezuela',
      'plan-continuidad-negocio-venezuela': 'Plan Continuidad de Negocio Venezuela'
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
