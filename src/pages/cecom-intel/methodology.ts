// Copy for /cecom-intel/methodology (English) and /cecom-intel/es/metodologia (Spanish).
// The risk formula and scale are the same ones the FMEA analyzer (/analisis-riesgo) uses.

import type { Lang } from './content';

const en = {
  meta: {
    title: 'Methodology and Editorial Standards | CECOM-Intel',
    description: 'How CECOM-Intel works: OSINT, HUMINT and SOCMINT sources graded on the Admiralty code, FMEA risk scoring under ISO 31000, analyst sign-off and corrections.',
  },
  hero: {
    eyebrow: 'METHODOLOGY',
    title: 'How we reach every conclusion',
    lead: 'An assessment is only as good as its sources and the judgment applied to them. This page explains where our information comes from, how we grade it, how we score risk and who signs it off, so you can weigh our conclusions yourself.',
  },
  sources: {
    eyebrow: '1 · SOURCES',
    title: 'Three layers, always verified',
    items: [
      { label: 'OSINT', text: 'Open sources registered in an approved list: official advisories and gazettes, local and international media, transport and utility operators.' },
      { label: 'HUMINT', text: 'Reports from CSSG officers on post across Caracas and Miranda and from our professional network elsewhere. Handled ethically and within the law; sources are protected.' },
      { label: 'SOCMINT', text: 'Public social media and messaging channels, where events usually surface first. Nothing from this layer is reported until another source confirms it.' },
    ],
  },
  grading: {
    eyebrow: '2 · GRADING',
    title: 'The Admiralty code',
    lead: 'Every item carries two marks: how reliable the source is (A–F) and how credible the information is (1–6). “B2” means a usually reliable source reporting information that is probably true.',
    reliabilityHead: 'Source reliability',
    credibilityHead: 'Information credibility',
    reliability: [
      ['A', 'Completely reliable'],
      ['B', 'Usually reliable'],
      ['C', 'Fairly reliable'],
      ['D', 'Not usually reliable'],
      ['E', 'Unreliable'],
      ['F', 'Reliability cannot be judged'],
    ],
    credibility: [
      ['1', 'Confirmed by other sources'],
      ['2', 'Probably true'],
      ['3', 'Possibly true'],
      ['4', 'Doubtful'],
      ['5', 'Improbable'],
      ['6', 'Truth cannot be judged'],
    ],
    confidenceTitle: 'Confidence in each conclusion',
    confidence: [
      ['HIGH', 'Confirmed by at least two independent sources, or observed by our own personnel.'],
      ['MODERATE', 'A credible source, not yet independently confirmed.'],
      ['LOW', 'Unconfirmed. Reported only because the possible impact justifies a warning.'],
    ],
  },
  scoring: {
    eyebrow: '3 · RISK SCORING',
    title: 'FMEA under ISO 31000',
    lead: 'We score each risk with a failure mode and effects analysis (FMEA), within the ISO 31000:2018 risk management framework and the ASIS ORM.1:2017 standard. Impact weighs more than probability because a rare event with severe consequences deserves more attention than a frequent minor one.',
    formula: 'Risk index = (Probability × 0.4) + (Impact × 0.6)',
    scaleHead: { range: 'Index', level: 'Level' },
    scale: [
      ['0–25', 'Low'],
      ['26–50', 'Moderate'],
      ['51–75', 'High'],
      ['76–100', 'Critical'],
    ],
    tool: 'Try the same method on your own organization',
  },
  process: {
    eyebrow: '4 · PROCESS',
    title: 'From report to bulletin',
    steps: [
      'Collection: the CECOM gathers reports from all three layers around the clock.',
      'Verification: each item is graded and cross-checked before it is used.',
      'Analysis: we assess what changed and what it means for people, sites and movements.',
      'Sign-off: an analyst reviews and signs every bulletin and assessment.',
      'Delivery: the bulletin goes out at 06:30, Venezuela time; urgent events go out as alerts.',
    ],
  },
  standards: {
    eyebrow: '5 · EDITORIAL STANDARDS',
    title: 'What we promise readers',
    items: [
      { label: 'NEUTRALITY', text: 'We report operational impact, not political opinion. That protects the reader’s decision and our team in the country.' },
      { label: 'CONCLUSION FIRST', text: 'Every report opens with the bottom line and closes with what it means for your operation.' },
      { label: 'ARTIFICIAL INTELLIGENCE', text: 'We use AI to process and organize large volumes of information. The judgment, verification and sign-off always belong to our analysts.' },
      { label: 'CORRECTIONS', text: 'If we get something wrong, we correct it, date the correction and tell subscribers in the next bulletin. Report an error to gerencia@globalservices-ven.com.' },
      { label: 'NOT LEGAL ADVICE', text: 'Our sanctions and regulatory notes describe security consequences. They never replace advice from counsel.' },
    ],
  },
  ctaTitle: 'See the method applied',
  ctaSample: 'Request a sample bulletin',
  ctaAnalysts: 'Meet the analysts',
};

const es: typeof en = {
  meta: {
    title: 'Metodología y estándares editoriales | CECOM-Intel',
    description: 'Cómo trabaja CECOM-Intel: fuentes OSINT, HUMINT y SOCMINT con código Admiralty, riesgo FMEA según ISO 31000, firma de un analista y política de correcciones.',
  },
  hero: {
    eyebrow: 'METODOLOGÍA',
    title: 'Cómo llegamos a cada conclusión',
    lead: 'Una evaluación vale lo que valen sus fuentes y el criterio con que se analizan. Aquí explicamos de dónde sale nuestra información, cómo la calificamos, cómo medimos el riesgo y quién firma, para que usted pueda ponderar nuestras conclusiones.',
  },
  sources: {
    eyebrow: '1 · FUENTES',
    title: 'Tres capas, siempre verificadas',
    items: [
      { label: 'OSINT', text: 'Fuentes abiertas registradas en una lista aprobada: alertas y gacetas oficiales, medios locales e internacionales, operadores de transporte y servicios públicos.' },
      { label: 'HUMINT', text: 'Reportes de los oficiales de CSSG en puesto en Caracas y Miranda y de nuestra red profesional en el resto del país. Gestionados con criterios éticos y dentro de la ley; las fuentes se protegen.' },
      { label: 'SOCMINT', text: 'Redes sociales y canales de mensajería públicos, donde los hechos suelen aparecer primero. Nada de esta capa se reporta hasta que otra fuente lo confirma.' },
    ],
  },
  grading: {
    eyebrow: '2 · CALIFICACIÓN',
    title: 'El código Admiralty',
    lead: 'Cada dato lleva dos marcas: la fiabilidad de la fuente (A–F) y la credibilidad de la información (1–6). «B2» significa una fuente normalmente fiable que reporta algo probablemente cierto.',
    reliabilityHead: 'Fiabilidad de la fuente',
    credibilityHead: 'Credibilidad de la información',
    reliability: [
      ['A', 'Totalmente fiable'],
      ['B', 'Normalmente fiable'],
      ['C', 'Bastante fiable'],
      ['D', 'Normalmente no fiable'],
      ['E', 'No fiable'],
      ['F', 'No se puede juzgar'],
    ],
    credibility: [
      ['1', 'Confirmada por otras fuentes'],
      ['2', 'Probablemente cierta'],
      ['3', 'Posiblemente cierta'],
      ['4', 'Dudosa'],
      ['5', 'Improbable'],
      ['6', 'No se puede juzgar'],
    ],
    confidenceTitle: 'Confianza en cada conclusión',
    confidence: [
      ['ALTA', 'Confirmada por al menos dos fuentes independientes, u observada por nuestro personal.'],
      ['MODERADA', 'Una fuente creíble, aún sin confirmación independiente.'],
      ['BAJA', 'Sin confirmar. Se reporta solo porque el posible impacto justifica una advertencia.'],
    ],
  },
  scoring: {
    eyebrow: '3 · MEDICIÓN DEL RIESGO',
    title: 'FMEA según ISO 31000',
    lead: 'Medimos cada riesgo con un análisis de modos de falla y efectos (FMEA), dentro del marco de gestión de riesgos ISO 31000:2018 y la norma ASIS ORM.1:2017. El impacto pesa más que la probabilidad, porque un hecho raro con consecuencias graves merece más atención que uno frecuente y menor.',
    formula: 'Índice de riesgo = (Probabilidad × 0,4) + (Impacto × 0,6)',
    scaleHead: { range: 'Índice', level: 'Nivel' },
    scale: [
      ['0–25', 'Bajo'],
      ['26–50', 'Moderado'],
      ['51–75', 'Alto'],
      ['76–100', 'Crítico'],
    ],
    tool: 'Aplique el mismo método a su organización',
  },
  process: {
    eyebrow: '4 · PROCESO',
    title: 'Del reporte al boletín',
    steps: [
      'Recolección: el CECOM recibe reportes de las tres capas las 24 horas.',
      'Verificación: cada dato se califica y se contrasta antes de usarlo.',
      'Análisis: evaluamos qué cambió y qué significa para personas, sedes y desplazamientos.',
      'Firma: un analista revisa y firma cada boletín y cada evaluación.',
      'Entrega: el boletín sale a las 06:30, hora de Venezuela; los hechos urgentes salen como alertas.',
    ],
  },
  standards: {
    eyebrow: '5 · ESTÁNDARES EDITORIALES',
    title: 'Lo que prometemos a quien nos lee',
    items: [
      { label: 'NEUTRALIDAD', text: 'Informamos el impacto operativo, no opiniones políticas. Eso protege la decisión de quien lee y a nuestro equipo en el país.' },
      { label: 'CONCLUSIÓN PRIMERO', text: 'Cada informe abre con la conclusión y cierra con lo que significa para su operación.' },
      { label: 'INTELIGENCIA ARTIFICIAL', text: 'Usamos la IA para procesar y ordenar grandes volúmenes de información. El juicio, la verificación y la firma son siempre de nuestros analistas.' },
      { label: 'CORRECCIONES', text: 'Si nos equivocamos, lo corregimos, fechamos la corrección y lo avisamos en el siguiente boletín. Reporte un error a gerencia@globalservices-ven.com.' },
      { label: 'NO ES ASESORÍA LEGAL', text: 'Nuestras notas sobre sanciones y normativa describen consecuencias de seguridad. Nunca sustituyen la asesoría de un abogado.' },
    ],
  },
  ctaTitle: 'Vea el método aplicado',
  ctaSample: 'Solicitar boletín de muestra',
  ctaAnalysts: 'Conocer a los analistas',
};

export const METHODOLOGY: Record<Lang, typeof en> = { en, es };
