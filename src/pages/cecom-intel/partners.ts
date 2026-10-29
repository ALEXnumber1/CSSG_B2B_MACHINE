// Copy for /cecom-intel/partners (English) and /cecom-intel/es/socios (Spanish): the in-country
// partner program for global security firms, insurers and travel-risk companies.
// Rules: never name other firms or imply relationships that do not exist; only list compliance
// documents that exist today; service levels are the ones CSSG already commits to elsewhere.

import type { Lang } from './content';

export type PartnerType = 'security_firm' | 'insurer' | 'travel' | 'multinational' | 'other';

const en = {
  meta: {
    title: 'In-Country Security Partner in Venezuela | CECOM-Intel',
    description: 'CSSG is the in-country partner of global security firms, insurers and travel-risk companies in Venezuela: GSOC 24/7, protection, transfers, English reports.',
  },
  hero: {
    eyebrow: 'PARTNER PROGRAM · VENEZUELA',
    title: 'Your in-country partner in Venezuela',
    motto: 'Global firms bring the reach. We bring the ground.',
    lead: 'International risk, protection, insurance and travel-risk firms that cover Venezuela without a team of their own need someone to deliver on the ground. CSSG has operated in Caracas since 2009, with 17 years without a security incident, 12 of them protecting G7 embassies. You keep the client and the relationship; we deliver under your standard and report in English.',
    cta: 'Start a partnership conversation',
    ctaMethod: 'Read our methodology',
  },
  who: {
    eyebrow: 'WHO WE WORK WITH',
    title: 'Built for firms that answer to a client abroad',
    cards: [
      { title: 'Global risk and security firms', text: 'Ground execution for your Venezuela clients: protection, transfers, site work and a GSOC that reports to yours.' },
      { title: 'K&R and travel-assistance insurers', text: 'A vetted local responder for your policyholders, with verified information before and during an incident.' },
      { title: 'Corporate travel management', text: 'Pre-trip assessments, airport meet-and-greet and journey management your travelers can rely on.' },
      { title: 'Security directors of multinationals', text: 'A local partner that reports to head office in English, in the formats your team already uses.' },
    ],
  },
  capabilities: {
    eyebrow: 'CAPABILITIES',
    title: 'What we deliver on the ground',
    items: [
      { label: 'GSOC 24/7', text: 'CECOM, our Security Operations Center in Caracas, follows movements and sites in real time and escalates to your operations center.' },
      { label: 'DAILY BULLETIN', text: 'Risk bulletin at 06:30 (Venezuela time) in English, with OSINT, HUMINT and SOCMINT layers and sources graded on the Admiralty code.' },
      { label: 'PROTECTION', text: 'Executive protection, airport meet-and-greet at Maiquetía, vetted drivers and secure ground transport.' },
      { label: 'JOURNEY MANAGEMENT', text: 'Approved routes and alternates, timed check-ins and follow-up of every movement by the CECOM.' },
      { label: 'ASSESSMENTS', text: 'Site surveys and risk assessments of cities, routes, hotels and venues under ISO 31000.' },
      { label: 'VETTING', text: 'Verification of local staff, suppliers and partners within the legal framework.' },
    ],
  },
  coverage: {
    eyebrow: 'COVERAGE',
    title: 'Honest about where we deliver',
    rows: [
      { area: 'Capital District and Miranda', how: 'Own personnel and physical response. DIGESERVISP authorization for unarmed private security.' },
      { area: 'Rest of Venezuela', how: 'Through vetted local subcontractors, coordinated and followed by the CECOM. We tell you which service is delivered by whom.' },
      { area: 'Border and mining regions', how: 'Specific assessment for every request. In many cases the right recommendation is not to go.' },
      { area: 'Risk analysis', how: 'Nationwide, every day.' },
    ],
    head: { area: 'Area', how: 'How we deliver' },
  },
  sla: {
    eyebrow: 'SERVICE LEVELS',
    title: 'What we commit to',
    lead: 'Service levels are the response times and deliverables we commit to in writing. These are our standard; each engagement fixes them in the contract.',
    rows: [
      { item: 'Daily risk bulletin', level: 'Delivered by 06:30, Venezuela time, every day' },
      { item: 'Alert verification', level: 'Within 90 seconds of detection by the CECOM' },
      { item: 'Post-incident report', level: 'Within 24 hours' },
      { item: 'Reply to any request', level: 'Within 24 hours, even if only to confirm receipt and delivery time' },
      { item: 'Reporting', level: 'In English or Spanish, in your formats; white-label on request' },
      { item: 'Escalation', level: 'To your operations center, under the protocol agreed for each engagement' },
    ],
    head: { item: 'Deliverable', level: 'Standard' },
  },
  cases: {
    eyebrow: 'TRACK RECORD',
    title: 'Who already relies on us',
    note: 'Client names are confidential. References are available under a non-disclosure agreement.',
    items: [
      { tag: 'G7 DIPLOMATIC MISSIONS · CARACAS', text: 'More than 12 years of continuous protection of G7 embassies in Venezuela, without a security incident.' },
      { tag: 'MULTINATIONAL SECURITY COMPANY · VENEZUELA', text: 'CSSG works as the in-country partner of a multinational security company: we deliver on the ground in Venezuela under its standards and reporting, while it keeps the client relationship.' },
    ],
  },
  compliance: {
    eyebrow: 'VENDOR DUE DILIGENCE',
    title: 'Documents ready for your onboarding',
    lead: 'We send the vendor due diligence pack under a non-disclosure agreement, so your onboarding takes days instead of weeks.',
    items: [
      'Commercial registration, tax ID (RIF J-29782024-8) and legal representatives',
      'ISO 9001:2015 certificate',
      'Cyber Essentials certificate',
      'DIGESERVISP authorization for private security',
      'Current insurance policies',
      'Human rights policy',
      'Anti-corruption policy',
      'References, under a non-disclosure agreement',
    ],
    billing: 'Invoicing in U.S. dollars through Company of Security and Service Global LLC, our company in Miami.',
  },
  faq: {
    eyebrow: 'QUESTIONS FROM PARTNERS',
    title: 'Before you send us a client',
    items: [
      { q: 'Do you work under our brand?', a: 'Yes. The bulletin and the reports can be delivered white-label, and our teams work under your standard and protocols. The client relationship stays with you.' },
      { q: 'Who delivers outside Caracas and Miranda?', a: 'Vetted local subcontractors, coordinated and followed by the CECOM. Before each engagement we tell you which service is delivered by our own personnel and which by a partner.' },
      { q: 'Can you invoice outside Venezuela?', a: 'Yes. We invoice in U.S. dollars through Company of Security and Service Global LLC, our company in Miami.' },
      { q: 'How do we start?', a: 'Send us the form below. We reply within 24 hours and, under a non-disclosure agreement, share the vendor due diligence pack and a sample of the daily bulletin.' },
    ],
  },
  form: {
    eyebrow: 'PARTNERSHIPS',
    title: 'Start a partnership conversation',
    text: 'Tell us about your firm and the clients you cover in Venezuela. We reply within 24 hours; confidentiality under NDA.',
    name: 'Name',
    org: 'Firm',
    email: 'Corporate email',
    type: 'Type of firm',
    types: {
      security_firm: 'Global risk or security firm',
      insurer: 'K&R or travel-assistance insurer',
      travel: 'Corporate travel management',
      multinational: 'Multinational (security department)',
      other: 'Other',
    } as Record<PartnerType, string>,
    message: 'What do you need in Venezuela? (optional)',
    submit: 'Send',
    sending: 'Sending…',
    ok: (email: string) => `Request received. Our partnerships team will contact you within 24 hours at ${email}.`,
    err: 'We could not send your request. Please try again or write to gerencia@globalservices-ven.com.',
    privacy: 'We will only use your details to respond to your request.',
    privacyLink: 'Privacy policy',
  },
};

const es: typeof en = {
  meta: {
    title: 'Socio local de seguridad en Venezuela | CECOM-Intel',
    description: 'CSSG es el socio local de firmas globales de seguridad, aseguradoras y empresas de viajes en Venezuela: centro de comando 24/7, protección e informes en inglés.',
  },
  hero: {
    eyebrow: 'PROGRAMA DE SOCIOS · VENEZUELA',
    title: 'Su socio local en Venezuela',
    motto: 'Las firmas globales ponen el alcance. Nosotros, el terreno.',
    lead: 'Las firmas internacionales de riesgo, protección, seguros y viajes que cubren Venezuela sin equipo propio necesitan a alguien que ejecute en el terreno. CSSG opera en Caracas desde 2009: 17 años sin incidentes de seguridad, 12 de ellos protegiendo embajadas del G7. Usted conserva al cliente y la relación; nosotros ejecutamos bajo su estándar e informamos en inglés.',
    cta: 'Iniciar una conversación',
    ctaMethod: 'Leer la metodología',
  },
  who: {
    eyebrow: 'CON QUIÉN TRABAJAMOS',
    title: 'Pensado para firmas que responden ante un cliente en el exterior',
    cards: [
      { title: 'Firmas globales de riesgo y seguridad', text: 'Ejecución en el terreno para sus clientes en Venezuela: protección, traslados, trabajo en sede y un centro de comando que reporta al suyo.' },
      { title: 'Aseguradoras de secuestro y asistencia en viaje', text: 'Un proveedor local verificado para sus asegurados, con información verificada antes y durante un incidente.' },
      { title: 'Gestión de viajes corporativos', text: 'Evaluaciones previas al viaje, recepción en el aeropuerto y gestión de desplazamientos en la que sus viajeros pueden confiar.' },
      { title: 'Directores de seguridad de multinacionales', text: 'Un socio local que informa a la casa matriz en inglés, en los formatos que su equipo ya usa.' },
    ],
  },
  capabilities: {
    eyebrow: 'CAPACIDADES',
    title: 'Lo que ejecutamos en el terreno',
    items: [
      { label: 'CECOM 24/7', text: 'Nuestro centro de operaciones de seguridad en Caracas sigue desplazamientos y sedes en tiempo real y escala al centro de operaciones del socio.' },
      { label: 'BOLETÍN DIARIO', text: 'Boletín de riesgo a las 06:30 en inglés o español, con capas OSINT, HUMINT y SOCMINT y fuentes calificadas con el código Admiralty.' },
      { label: 'PROTECCIÓN', text: 'Protección ejecutiva, recepción en el aeropuerto de Maiquetía, conductores verificados y transporte terrestre seguro.' },
      { label: 'DESPLAZAMIENTOS', text: 'Rutas aprobadas y alternas, reportes programados y seguimiento de cada movimiento por el CECOM.' },
      { label: 'EVALUACIONES', text: 'Inspecciones de sede y evaluaciones de riesgo de ciudades, rutas, hoteles y lugares de reunión según ISO 31000.' },
      { label: 'VERIFICACIÓN', text: 'Verificación de personal local, proveedores y socios dentro del marco legal.' },
    ],
  },
  coverage: {
    eyebrow: 'COBERTURA',
    title: 'Claros sobre dónde ejecutamos',
    rows: [
      { area: 'Distrito Capital y Miranda', how: 'Personal propio y respuesta física. Autorización de DIGESERVISP para seguridad privada sin armas.' },
      { area: 'Resto de Venezuela', how: 'A través de subcontratistas locales verificados, coordinados y seguidos por el CECOM. Le indicamos qué servicio presta cada quien.' },
      { area: 'Zonas fronterizas y mineras', how: 'Evaluación específica para cada solicitud. En muchos casos la recomendación correcta es no ir.' },
      { area: 'Análisis de riesgo', how: 'Todo el país, todos los días.' },
    ],
    head: { area: 'Zona', how: 'Cómo ejecutamos' },
  },
  sla: {
    eyebrow: 'NIVELES DE SERVICIO',
    title: 'Lo que nos comprometemos a cumplir',
    lead: 'Los niveles de servicio (SLA) son los tiempos de respuesta y entregables que asumimos por escrito. Estos son nuestro estándar; cada contrato los fija para su caso.',
    rows: [
      { item: 'Boletín diario de riesgo', level: 'Entregado antes de las 06:30, hora de Venezuela, todos los días' },
      { item: 'Verificación de alertas', level: 'En 90 segundos desde la detección en el CECOM' },
      { item: 'Informe posincidente', level: 'En menos de 24 horas' },
      { item: 'Respuesta a cualquier solicitud', level: 'En menos de 24 horas, aunque sea para confirmar la recepción y el plazo' },
      { item: 'Informes', level: 'En inglés o español, en sus formatos; marca blanca a solicitud' },
      { item: 'Escalamiento', level: 'Al centro de operaciones del socio, según el protocolo acordado' },
    ],
    head: { item: 'Entregable', level: 'Estándar' },
  },
  cases: {
    eyebrow: 'TRAYECTORIA',
    title: 'Quiénes ya confían en nosotros',
    note: 'Los nombres de los clientes son confidenciales. Hay referencias disponibles bajo acuerdo de confidencialidad.',
    items: [
      { tag: 'MISIONES DIPLOMÁTICAS DEL G7 · CARACAS', text: 'Más de 12 años de protección continua de embajadas del G7 en Venezuela, sin incidentes de seguridad.' },
      { tag: 'EMPRESA MULTINACIONAL DE SEGURIDAD · VENEZUELA', text: 'CSSG es el socio local de una empresa multinacional de seguridad: ejecutamos en el terreno en Venezuela bajo sus estándares e informes, y ella conserva la relación con el cliente.' },
    ],
  },
  compliance: {
    eyebrow: 'DEBIDA DILIGENCIA DE PROVEEDORES',
    title: 'Documentos listos para su proceso de alta',
    lead: 'Enviamos el paquete de debida diligencia de proveedores bajo acuerdo de confidencialidad, para que el alta tome días y no semanas.',
    items: [
      'Registro mercantil, RIF J-29782024-8 y representantes legales',
      'Certificado ISO 9001:2015',
      'Certificado Cyber Essentials',
      'Autorización de DIGESERVISP para seguridad privada',
      'Pólizas de seguro vigentes',
      'Política de derechos humanos',
      'Política anticorrupción',
      'Referencias, bajo acuerdo de confidencialidad',
    ],
    billing: 'Facturación en dólares estadounidenses a través de Company of Security and Service Global LLC, nuestra empresa en Miami.',
  },
  faq: {
    eyebrow: 'PREGUNTAS DE SOCIOS',
    title: 'Antes de enviarnos un cliente',
    items: [
      { q: '¿Trabajan bajo nuestra marca?', a: 'Sí. El boletín y los informes pueden entregarse en marca blanca, y nuestros equipos trabajan con su estándar y sus protocolos. La relación con el cliente sigue siendo suya.' },
      { q: '¿Quién ejecuta fuera de Caracas y Miranda?', a: 'Subcontratistas locales verificados, coordinados y seguidos por el CECOM. Antes de cada servicio le indicamos qué presta nuestro personal y qué presta un aliado.' },
      { q: '¿Pueden facturar fuera de Venezuela?', a: 'Sí. Facturamos en dólares estadounidenses a través de Company of Security and Service Global LLC, nuestra empresa en Miami.' },
      { q: '¿Cómo empezamos?', a: 'Envíenos el formulario. Respondemos en menos de 24 horas y, bajo acuerdo de confidencialidad, compartimos el paquete de debida diligencia y una muestra del boletín diario.' },
    ],
  },
  form: {
    eyebrow: 'ALIANZAS',
    title: 'Iniciar una conversación',
    text: 'Cuéntenos sobre su firma y los clientes que cubre en Venezuela. Respondemos en menos de 24 horas; confidencialidad bajo NDA.',
    name: 'Nombre',
    org: 'Firma',
    email: 'Correo corporativo',
    type: 'Tipo de firma',
    types: {
      security_firm: 'Firma global de riesgo o seguridad',
      insurer: 'Aseguradora de secuestro o asistencia en viaje',
      travel: 'Gestión de viajes corporativos',
      multinational: 'Multinacional (departamento de seguridad)',
      other: 'Otra',
    },
    message: '¿Qué necesita en Venezuela? (opcional)',
    submit: 'Enviar',
    sending: 'Enviando…',
    ok: (email: string) => `Solicitud recibida. Nuestro equipo de alianzas le contactará en menos de 24 horas en ${email}.`,
    err: 'No pudimos enviar su solicitud. Intente de nuevo o escriba a gerencia@globalservices-ven.com.',
    privacy: 'Solo usaremos sus datos para responder a su solicitud.',
    privacyLink: 'Política de privacidad',
  },
};

export const PARTNERS: Record<Lang, typeof en> = { en, es };
