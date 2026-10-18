// Copy for /cecom-intel (English, default) and /cecom-intel/es (Spanish).
// Editorial rules for this page: the brand is "CECOM-Intel | CSSG Global"; the words
// "inteligencia"/"intelligence" are not used except in "artificial intelligence" (AI notice).
// Prices are not defined yet: they render as "on request" until set in PRICES.

export type Lang = 'en' | 'es';

/** Monthly prices in USD. null = not published yet ("pricing on request"). */
export const PRICES: { essential: number | null; professional: number | null } = {
  essential: null,
  professional: null,
};

export const PATHS: Record<Lang, string> = { en: '/cecom-intel', es: '/cecom-intel/es' };

export type Interest = 'sample' | 'essential' | 'professional' | 'tailored' | 'analyst' | 'duty_of_care';

const en = {
  meta: {
    title: 'Venezuela GSOC & Security Risk Analysis | CECOM-Intel by CSSG Global',
    description: 'CECOM-Intel is the risk analysis unit of CSSG’s in-country GSOC in Caracas: daily risk bulletin at 06:30, real-time alerts, journey management and tailored assessments for companies operating in Venezuela.',
  },
  nav: { what: 'What it is', patrol: 'Patrol', scope: 'Scope', how: 'How we work', plans: 'Plans', cta: 'Sample bulletin', langLabel: 'Language' },
  hero: {
    eyebrow: 'Venezuela’s in-country GSOC and security risk analysis unit · CSSG',
    lead: 'CSSG Global’s risk analysis layer. Validated information on Venezuela for our operations and for you: every security decision starts with an analysis, not an assumption.',
    ctaSample: 'Request a sample bulletin',
    ctaPlans: 'See plans',
    coverage: 'VENEZUELA · NATIONWIDE COVERAGE 24/7',
    mapLabel: 'Line map of Latin America with Venezuela highlighted under a magnifying glass',
  },
  creds: [
    { value: '06:30', label: 'Daily bulletin, every day (Venezuela time)' },
    { value: '24/7', label: 'CECOM (GSOC) active with nationwide coverage' },
    { value: '17 years', label: 'CSSG operating track record' },
    { value: 'ISO 9001', label: 'And Cyber Essentials certified' },
  ],
  what: {
    eyebrow: 'WHAT CECOM-INTEL IS',
    title: 'CSSG’s risk analysis layer',
    p1: 'CECOM-Intel is the risk analysis unit of CECOM, CSSG Global’s Security Operations Center (GSOC) in Caracas. It works with independent judgment and supplies validated information and situational awareness to all of our operations and directly to our clients.',
    p2: 'Every security decision we make starts with a prior analysis, not an assumption.',
  },
  patrol: {
    eyebrow: 'EXTERIOR PATROL',
    title: 'Insecurity is outside. We are there too.',
    body: 'Most incidents do not start inside a facility but in its surroundings: the street, the parking lot, the arrival route. That is why we designed an exterior patrol system that adds to each client’s coverage, so the organization and everyone who comes and goes are truly protected, not just behind closed doors.',
    items: [
      { title: 'Geo-referenced', text: 'Every patrol route is traced by GPS and logged, so it can be audited.' },
      { title: 'Supervised 24/7', text: 'Our Command Center (CECOM) follows every patrol in real time.' },
      { title: 'At no additional cost', text: 'Included in the coverage of CSSG clients.' },
    ],
    svgSite: 'SITE',
    svgCaption: 'GPS ROUTE · CECOM SUPERVISION 24/7',
    svgLabel: 'Exterior patrol around a client site',
  },
  scope: {
    eyebrow: 'SCOPE',
    title: 'What CECOM-Intel covers',
    items: [
      'Ongoing monitoring of the surroundings of each site and of our clients’ routes.',
      'Daily risk bulletin at 06:30 (Venezuela time), with cited and graded sources.',
      'Immediate alerts on events that affect people, sites or movements.',
      'Risk assessment of cities, routes, hotels and sites before every movement.',
      'Analytical support to CSSG protection, escort and secure transport teams.',
    ],
  },
  tailored: {
    eyebrow: 'TAILORED SERVICES',
    title: 'Analysis for every decision',
    cards: [
      { icon: 'doc', title: 'Risk reports', text: 'By city, region or road corridor, with scenarios and actionable recommendations.' },
      { icon: 'search', title: 'Pre-visit and event analysis', text: 'Executive visits, events and operational launches: the context before you arrive.' },
      { icon: 'search', title: 'Context verification', text: 'Partners, suppliers and locations assessed before you commit resources.' },
      { icon: 'bell', title: 'Dedicated coverage', text: 'A direct line to the CECOM throughout your stay in the country.' },
    ],
  },
  related: {
    eyebrow: 'RELATED SERVICES',
    title: 'When the analysis calls for action',
    items: [
      { title: 'Vetting and personnel verification', text: 'Verification of local staff and candidates, within the legal framework.', href: '/consultoria/due-diligence-corporativa', link: 'View service' },
      { title: 'Audits and compliance', text: 'Review of security operations against your head office’s standards.', href: '/consultoria/auditoria-de-cumplimiento', link: 'View service' },
      { title: 'Duty of Care', text: 'Risk by area where your people are, with actions by level and emergency contacts. Service on request.', interest: 'duty_of_care' as Interest, link: 'Request' },
    ],
    all: 'See all CSSG consulting services',
  },
  how: {
    eyebrow: 'HOW WE WORK',
    title: 'Verifiable sources, human judgment',
    items: [
      { label: 'OSINT', text: 'Predetermined, verifiable open sources, graded with the Admiralty code.' },
      { label: 'FIELD REPORTING', text: 'Field reports from our officers on post and from our professional network, handled ethically and within the law.' },
      { label: 'NATIONAL NETWORK', text: 'Operational presence from Caracas to the rest of the country.' },
      { label: 'ETHICS FIRST', text: 'Legitimate information and protected confidentiality for clients and sources.' },
    ],
    aiQuote: 'We use artificial intelligence; it does not use us.',
    aiText: 'AI helps us process and organize large volumes of information. The judgment, verification and sign-off of every report always belong to our analysts.',
  },
  who: {
    eyebrow: 'WHO IT IS FOR',
    title: 'For those who cannot decide blind',
    proof: 'Since 2009 we have protected G7 diplomatic missions and multinationals in Venezuela.',
    cards: [
      { title: 'Diplomatic missions', text: 'Staff safety, movements across the country and mission continuity.', href: '/en/diplomatic-security', link: 'Diplomatic security' },
      { title: 'Multinationals', text: 'Operational continuity, site protection and assessment of logistics routes.', href: '/en/corporate-security-consulting', link: 'Corporate security' },
      { title: 'Investors and executives', text: 'Reliable context before traveling, setting up or committing capital in Venezuela.', href: '/en/executive-protection-venezuela-investors', link: 'Executive protection' },
    ],
  },
  plans: {
    eyebrow: 'PLANS',
    title: 'Subscribe or request a tailored assessment',
    lead: 'Receive a realistic threat report every morning: no alarmism and no omissions, with the information you need to decide before heading out.',
    recommended: 'RECOMMENDED',
    from: 'From USD',
    perMonth: '/ month',
    onRequest: 'Pricing on request',
    monthly: 'Monthly subscription',
    quote: 'On request',
    essential: { name: 'Essential Bulletin', items: ['Daily risk bulletin at 06:30', 'Cited and graded sources', 'One recipient'], cta: 'Subscribe' },
    professional: { name: 'Professional Bulletin', items: ['Everything in Essential', 'Real-time risk alerts', 'Multiple recipients in your organization'], cta: 'Subscribe' },
    tailored: { name: 'Tailored Assessment', items: ['City, route, site or local partner reports', 'Dedicated coverage for visits and events', 'Direct line to the CECOM 24/7'], cta: 'Talk to an analyst' },
    billing: 'Prices in U.S. dollars. Invoiced by Company of Security and Service Global LLC (Miami).',
  },
  sample: {
    eyebrow: 'SAMPLE BULLETIN',
    title: 'Check the quality before you decide',
    text: 'Receive a free sample edition of our country-level bulletin. We will contact you within 24 hours.',
    sla: 'Response within 24 hours',
    name: 'Name',
    org: 'Organization',
    email: 'Corporate email',
    interest: 'I am interested in',
    interests: {
      sample: 'A sample bulletin',
      essential: 'Essential Bulletin',
      professional: 'Professional Bulletin',
      tailored: 'A tailored assessment',
      analyst: 'Talking to an analyst',
      duty_of_care: 'Duty of Care (on request)',
    } as Record<Interest, string>,
    weekly: 'Also subscribe me to the free weekly country bulletin (English and Spanish).',
    submit: 'Send me the sample bulletin',
    sending: 'Sending…',
    privacy: 'We will only use your email to send you the bulletin and respond to your request. Confidentiality under NDA for clients.',
    privacyLink: 'Privacy policy',
    ok: (email: string) => `Request received. A CSSG analyst will contact you within 24 hours at ${email}.`,
    err: 'We could not send your request. Please try again or write to gerencia@globalservices-ven.com.',
    freeMail: 'Tip: a corporate email helps us verify and prioritize your request.',
  },
  guides: {
    eyebrow: 'FIELD GUIDES',
    title: 'Security in Venezuela, explained',
    note: 'Sourced, dated guides for companies and travelers. Reviewed monthly.',
    read: 'Read the guide',
  },
  faq: {
    eyebrow: 'FREQUENTLY ASKED QUESTIONS',
    title: 'Questions from international security teams',
    items: [
      { q: 'Is it safe to travel to Venezuela for business in 2026?', a: 'Business travel to Caracas is possible with planning, but the environment remains high-risk. The U.S. advisory is Level 3, “Reconsider Travel” (27 June 2026), and the UK advises against all travel to the border and mining regions. The main exposures are the airport transfer, movements after dark and crime; a pre-trip assessment, vetted transport and a 24/7 operations center reduce them.', link: { href: '/cecom-intel/venezuela-security-outlook-2026', label: 'Venezuela security outlook 2026' } },
      { q: 'What is a GSOC, and what does CECOM do?', a: 'A Global Security Operations Center (GSOC) monitors risks around the clock and coordinates the response to incidents. CECOM is CSSG’s GSOC in Caracas: it follows patrols and movements in real time and, through CECOM-Intel, produces the daily risk bulletin, alerts and assessments that support every decision.' },
      { q: 'Can you support a company or risk firm that has no team in Venezuela?', a: 'Yes. We work as the in-country partner of international risk, protection and travel-risk firms: you keep the client and the relationship; we provide the eyes on the ground and the response capacity, under your standard, in English and in the formats your team already uses.', link: { href: '/cecom-intel/doing-business-in-venezuela-security-guide', label: 'Doing business in Venezuela: security guide' } },
      { q: 'What sources and methods do you use?', a: 'Open sources registered in an approved list (OSINT) and field reports from our officers on post and our professional network, all graded with the Admiralty code. Risk is assessed under ISO 31000 and an ESRM approach, with conclusions first. Every report is verified and signed by an analyst.' },
      { q: 'Do you provide physical protection outside Caracas?', a: 'Our analysis covers the whole country. Physical response with our own personnel covers the Capital District and Miranda state; elsewhere we coordinate with authorized partners and tell you which services are delivered by whom.', link: { href: '/cecom-intel/executive-travel-venezuela-journey-management', label: 'Executive travel to Venezuela' } },
      { q: 'How quickly do you respond to a request?', a: 'Within 24 hours, even if only to confirm receipt and the delivery time.' },
    ],
  },
  resources: {
    eyebrow: 'RELATED RESOURCES',
    note: 'Free CSSG tools and publications (in Spanish).',
    links: [
      { href: '/analisis-riesgo', label: 'Risk analyzer (FMEA)' },
      { href: '/informes', label: 'Venezuela PESTEL report' },
      { href: '/white-papers/guia-evaluacion-riesgos-seguridad-venezuela', label: 'White paper: security risk assessment' },
      { href: '/white-papers/due-diligence-corporativa-venezuela', label: 'White paper: corporate due diligence' },
      { href: '/white-papers/plan-continuidad-negocio-venezuela', label: 'White paper: business continuity' },
    ],
  },
  footer: { address: 'Edificio Cosmos, piso 8, oficina 8-B, Chacao, Caracas' },
};

const es: typeof en = {
  meta: {
    title: 'Centro de Comando y Análisis de Riesgo en Venezuela | CECOM-Intel by CSSG',
    description: 'CECOM-Intel es la unidad de análisis de riesgo de CSSG Global en Caracas: boletín diario de riesgo a las 06:30, alertas en tiempo real y evaluaciones a la medida de ciudades, rutas y sedes en Venezuela. Solicite una muestra gratuita.',
  },
  nav: { what: 'Qué es', patrol: 'Patrullaje', scope: 'Alcance', how: 'Cómo trabajamos', plans: 'Planes', cta: 'Boletín de muestra', langLabel: 'Idioma' },
  hero: {
    eyebrow: 'Centro de comando y análisis de riesgo de seguridad en Venezuela · CSSG',
    lead: 'La capa de análisis de riesgo de CSSG Global. Información validada sobre Venezuela para nuestras operaciones y para usted: cada decisión de seguridad parte de un análisis, no de una suposición.',
    ctaSample: 'Solicitar boletín de muestra',
    ctaPlans: 'Ver planes',
    coverage: 'VENEZUELA · COBERTURA NACIONAL 24/7',
    mapLabel: 'Mapa lineal de Latinoamérica con Venezuela destacada bajo una lupa',
  },
  creds: [
    { value: '06:30', label: 'Boletín diario, todos los días' },
    { value: '24/7', label: 'CECOM activo con cobertura nacional' },
    { value: '17 años', label: 'Trayectoria operativa de CSSG' },
    { value: 'ISO 9001', label: 'Y Cyber Essentials certificados' },
  ],
  what: {
    eyebrow: 'QUÉ ES CECOM-INTEL',
    title: 'La capa de análisis de riesgo de CSSG',
    p1: 'CECOM-Intel es la unidad de análisis de riesgo del CECOM, el centro de operaciones de seguridad de CSSG Global en Caracas. Opera con independencia de criterio y abastece de información validada a todas nuestras operaciones y directamente a nuestros clientes.',
    p2: 'Cada decisión de seguridad que tomamos parte de un análisis previo, no de una suposición.',
  },
  patrol: {
    eyebrow: 'PATRULLAJE EXTERIOR',
    title: 'La inseguridad está afuera. Ahí también estamos nosotros.',
    body: 'La mayoría de los incidentes no empiezan dentro de una sede, sino en su entorno: la calle, el estacionamiento, la ruta de llegada. Por eso diseñamos un sistema de patrullaje exterior que se suma a la cobertura de cada cliente, para que la organización y todas las personas que entran y salen de ella estén protegidas de verdad, no solo puertas adentro.',
    items: [
      { title: 'Georreferenciado', text: 'Cada recorrido queda trazado por GPS y registrado: se puede auditar.' },
      { title: 'Supervisado 24/7', text: 'Nuestro Centro de Comando (CECOM) sigue cada patrulla en tiempo real.' },
      { title: 'Sin costo adicional', text: 'Incluido en la cobertura de los clientes de CSSG.' },
    ],
    svgSite: 'SEDE',
    svgCaption: 'RUTA GPS · SUPERVISIÓN CECOM 24/7',
    svgLabel: 'Patrullaje exterior alrededor de la sede del cliente',
  },
  scope: {
    eyebrow: 'ALCANCE',
    title: 'Qué cubre CECOM-Intel',
    items: [
      'Monitoreo permanente del entorno de cada sede y de las rutas de nuestros clientes.',
      'Boletín diario de riesgo a las 06:30, con fuentes citadas y calificadas.',
      'Alertas inmediatas ante eventos que afecten personas, sedes o desplazamientos.',
      'Evaluación de riesgo de ciudades, rutas, hoteles y sedes antes de cada movimiento.',
      'Soporte analítico a los equipos de protección, escolta y transporte seguro de CSSG.',
    ],
  },
  tailored: {
    eyebrow: 'SERVICIOS A LA MEDIDA',
    title: 'Análisis para cada decisión',
    cards: [
      { icon: 'doc', title: 'Informes de riesgo', text: 'Por ciudad, región o corredor vial, con escenarios y recomendaciones accionables.' },
      { icon: 'search', title: 'Análisis previo a visitas y eventos', text: 'Visitas ejecutivas, eventos y aperturas de operaciones: el contexto antes de llegar.' },
      { icon: 'search', title: 'Verificación de contexto', text: 'Socios, proveedores y ubicaciones evaluados antes de comprometer recursos.' },
      { icon: 'bell', title: 'Cobertura dedicada', text: 'Enlace directo con el CECOM durante toda su estadía en el país.' },
    ],
  },
  related: {
    eyebrow: 'SERVICIOS CONEXOS',
    title: 'Cuando el análisis pide acción',
    items: [
      { title: 'Vetting y verificación de personal', text: 'Verificación de personal local y candidatos, dentro del marco legal.', href: '/consultoria/due-diligence-corporativa', link: 'Ver servicio' },
      { title: 'Auditorías y compliance', text: 'Revisión de las operaciones de seguridad frente a los estándares de su casa matriz.', href: '/consultoria/auditoria-de-cumplimiento', link: 'Ver servicio' },
      { title: 'Duty of Care', text: 'Riesgo por zona donde está su personal, con acciones por nivel y contactos de emergencia. Servicio a solicitud.', interest: 'duty_of_care' as Interest, link: 'Solicitar' },
    ],
    all: 'Ver toda la consultoría de CSSG',
  },
  how: {
    eyebrow: 'CÓMO TRABAJAMOS',
    title: 'Fuentes verificables, criterio humano',
    items: [
      { label: 'OSINT', text: 'Fuentes abiertas predeterminadas, verificables y calificadas con el código Admiralty.' },
      { label: 'REPORTES DE CAMPO', text: 'Reportes de campo de nuestros oficiales en puesto y de nuestra red profesional, gestionados con criterios éticos y dentro de la ley.' },
      { label: 'RED NACIONAL', text: 'Presencia operativa desde Caracas hacia el resto del país.' },
      { label: 'ÉTICA PRIMERO', text: 'Información legítima y confidencialidad protegida para clientes y fuentes.' },
    ],
    aiQuote: 'Usamos la inteligencia artificial; ella no nos usa a nosotros.',
    aiText: 'La IA nos ayuda a procesar y ordenar grandes volúmenes de información. El juicio, la verificación y la firma de cada informe son siempre de nuestros analistas.',
  },
  who: {
    eyebrow: 'PARA QUIÉN',
    title: 'Para quienes no pueden decidir a ciegas',
    proof: 'Desde 2009 protegemos misiones diplomáticas del G7 y multinacionales en Venezuela.',
    cards: [
      { title: 'Misiones diplomáticas', text: 'Seguridad del personal, movimientos al interior del país y continuidad de la misión.', href: '/consultoria/escudo-diplomatico', link: 'Escudo Diplomático' },
      { title: 'Multinacionales', text: 'Continuidad operativa, protección de sedes y evaluación de rutas logísticas.', href: '/consultoria', link: 'Consultoría corporativa' },
      { title: 'Inversores y ejecutivos', text: 'Contexto confiable antes de viajar, instalarse o comprometer capital en Venezuela.', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas', link: 'Protección ejecutiva' },
    ],
  },
  plans: {
    eyebrow: 'PLANES',
    title: 'Suscríbase o solicite un análisis a la medida',
    lead: 'Reciba cada mañana un informe de amenazas realista: sin alarmismo y sin omisiones, con la información que necesita para decidir antes de salir.',
    recommended: 'RECOMENDADO',
    from: 'Desde USD',
    perMonth: '/ mes',
    onRequest: 'Precio a consultar',
    monthly: 'Suscripción mensual',
    quote: 'A consultar',
    essential: { name: 'Boletín Esencial', items: ['Boletín diario de riesgo a las 06:30', 'Fuentes citadas y calificadas', 'Un destinatario'], cta: 'Suscribirse' },
    professional: { name: 'Boletín Profesional', items: ['Todo lo del plan Esencial', 'Alertas de riesgo en tiempo real', 'Varios destinatarios en su organización'], cta: 'Suscribirse' },
    tailored: { name: 'Análisis a la medida', items: ['Informes de ciudad, ruta, sede o socio local', 'Cobertura dedicada para visitas y eventos', 'Enlace directo con el CECOM 24/7'], cta: 'Hablar con un analista' },
    billing: 'Precios en dólares estadounidenses. Facturación desde Company of Security and Service Global LLC (Miami).',
  },
  sample: {
    eyebrow: 'BOLETÍN DE MUESTRA',
    title: 'Compruebe la calidad antes de decidir',
    text: 'Reciba sin costo una edición de muestra de nuestro boletín a nivel país. Le contactamos en menos de 24 horas.',
    sla: 'Respuesta en menos de 24 horas',
    name: 'Nombre',
    org: 'Organización',
    email: 'Correo corporativo',
    interest: 'Me interesa',
    interests: {
      sample: 'Un boletín de muestra',
      essential: 'Boletín Esencial',
      professional: 'Boletín Profesional',
      tailored: 'Un análisis a la medida',
      analyst: 'Hablar con un analista',
      duty_of_care: 'Duty of Care (a solicitud)',
    },
    weekly: 'Suscribirme también al boletín semanal gratuito a nivel país (en español e inglés).',
    submit: 'Enviarme el boletín de muestra',
    sending: 'Enviando…',
    privacy: 'Solo usaremos su correo para enviarle el boletín y responder a su solicitud. Confidencialidad bajo NDA para clientes.',
    privacyLink: 'Política de privacidad',
    ok: (email: string) => `Solicitud recibida. Un analista de CSSG le contactará en menos de 24 horas en ${email}.`,
    err: 'No pudimos enviar su solicitud. Intente de nuevo o escriba a gerencia@globalservices-ven.com.',
    freeMail: 'Sugerencia: un correo corporativo nos ayuda a verificar y priorizar su solicitud.',
  },
  guides: {
    eyebrow: 'GUÍAS',
    title: 'La seguridad en Venezuela, explicada',
    note: 'Guías con fuentes y fecha para empresas y viajeros (en inglés). Se revisan cada mes.',
    read: 'Leer la guía (en inglés)',
  },
  faq: {
    eyebrow: 'PREGUNTAS FRECUENTES',
    title: 'Lo que preguntan los equipos de seguridad',
    items: [
      { q: '¿Es seguro viajar a Venezuela por negocios en 2026?', a: 'Es posible viajar a Caracas por negocios con planificación, pero el entorno sigue siendo de riesgo alto. Estados Unidos mantiene el nivel 3, «Reconsider Travel» (27 de junio de 2026), y el Reino Unido desaconseja todo viaje a las zonas fronterizas y mineras. Las mayores exposiciones son el traslado desde el aeropuerto, los movimientos de noche y la delincuencia; una evaluación previa, transporte verificado y un centro de operaciones 24/7 las reducen.', link: { href: '/cecom-intel/venezuela-security-outlook-2026', label: 'Guía: seguridad en Venezuela 2026 (en inglés)' } },
      { q: '¿Qué es el CECOM?', a: 'Es el Centro de Comando de CSSG en Caracas: un centro de operaciones de seguridad que vigila riesgos las 24 horas, sigue patrullas y desplazamientos en tiempo real y coordina la respuesta. CECOM-Intel es su unidad de análisis de riesgo: produce el boletín diario, las alertas y las evaluaciones.' },
      { q: '¿Pueden apoyar a una empresa o firma de riesgo que no tiene equipo en Venezuela?', a: 'Sí. Trabajamos como socio local de firmas internacionales de riesgo, protección y viajes: usted conserva al cliente y la relación; nosotros somos sus ojos y su capacidad de respuesta en Venezuela, bajo su estándar, en inglés y en los formatos que su equipo ya usa.', link: { href: '/cecom-intel/doing-business-in-venezuela-security-guide', label: 'Guía: hacer negocios en Venezuela (en inglés)' } },
      { q: '¿Qué fuentes y métodos usan?', a: 'Fuentes abiertas registradas en una lista aprobada (OSINT) y reportes de campo de nuestros oficiales en puesto y de nuestra red profesional, calificados con el código Admiralty. El riesgo se evalúa según ISO 31000 y el enfoque ESRM, con la conclusión primero. Cada informe lo verifica y firma un analista.' },
      { q: '¿Ofrecen protección física fuera de Caracas?', a: 'El análisis cubre todo el país. La respuesta física con personal propio cubre el Distrito Capital y el estado Miranda; en el resto coordinamos con aliados autorizados y le indicamos qué servicio presta cada quien.', link: { href: '/cecom-intel/executive-travel-venezuela-journey-management', label: 'Guía: viajes ejecutivos a Venezuela (en inglés)' } },
      { q: '¿En cuánto tiempo responden?', a: 'En menos de 24 horas, aunque sea para confirmar la recepción y el plazo de entrega.' },
    ],
  },
  resources: {
    eyebrow: 'RECURSOS RELACIONADOS',
    note: 'Herramientas y publicaciones gratuitas de CSSG.',
    links: [
      { href: '/analisis-riesgo', label: 'Analizador de riesgo (FMEA)' },
      { href: '/informes', label: 'Informe PESTEL Venezuela' },
      { href: '/white-papers/guia-evaluacion-riesgos-seguridad-venezuela', label: 'White paper: evaluación de riesgos' },
      { href: '/white-papers/due-diligence-corporativa-venezuela', label: 'White paper: due diligence corporativa' },
      { href: '/white-papers/plan-continuidad-negocio-venezuela', label: 'White paper: continuidad de negocio' },
    ],
  },
  footer: { address: 'Edificio Cosmos, piso 8, oficina 8-B, Chacao, Caracas' },
};

export const CONTENT: Record<Lang, typeof en> = { en, es };
