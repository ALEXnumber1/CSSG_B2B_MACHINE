// CECOM-Intel analysts. Every guide, bulletin and assessment is signed by one of them, and the
// guides publish them as the schema.org Person author. Only add facts the person has approved
// (source: his professional profile, October 2026): no invented credentials.

import type { Lang } from './content';

export interface Analyst {
  id: string;
  name: string;
  fullName: string;
  honorific?: string;
  photo?: string;
  role: Record<Lang, string>;
  focus: Record<Lang, string[]>;
  bio?: Record<Lang, string[]>;
  education?: Record<Lang, string[]>;
  affiliations?: Record<Lang, string[]>;
}

export const LEAD_ANALYST: Analyst = {
  id: 'guillermo-amitesarove',
  name: 'Guillermo Amitesarove',
  fullName: 'Guillermo José Amitesarove Pérez',
  honorific: 'Dr.',
  photo: '/cecom-intel/guillermo-amitesarove.webp',
  role: {
    en: 'Director of Security Operations and Risk Management, CSSG Global',
    es: 'Director Corporativo de Operaciones de Seguridad y Gestión de Riesgos de CSSG Global',
  },
  bio: {
    en: [
      'Lawyer and senior consultant in integrated security and risk management, with more than 25 years of experience in state, corporate and asset security. He holds a doctorate in Citizen Security and sits on the Board of Directors of the ASIS International Venezuela Chapter.',
      'His experience covers risk analysis, protection of dignitaries and executives, and the management of control and monitoring centers, including security management at the Multicentro Empresarial del Este in Caracas. At CSSG Global he leads the CECOM and its transition to a SOC and GSOC, risk management under the ESRM methodology and the analysis of validated information for diplomatic missions and multinationals.',
    ],
    es: [
      'Abogado y consultor senior en seguridad integral y gestión de riesgos, con más de 25 años de trayectoria en seguridad de Estado, corporativa y patrimonial. Es doctor en Seguridad Ciudadana y miembro de la Junta Directiva del Capítulo Venezuela de ASIS International.',
      'Su experiencia abarca el análisis de riesgos, la protección de dignatarios y ejecutivos, y la dirección de centros de control y monitoreo, incluida la gerencia de seguridad del Multicentro Empresarial del Este. En CSSG Global dirige el CECOM y su transición a SOC y GSOC, la gestión de riesgos bajo metodología ESRM y el análisis de información validada para misiones diplomáticas y empresas multinacionales.',
    ],
  },
  focus: {
    en: [
      'Risk analysis and management under the ESRM methodology',
      'Validated information analysis and OSINT',
      'Security countermeasures and information protection',
      'Protection of dignitaries and executives',
      'Management of control and monitoring centers',
      'Corporate and asset security',
    ],
    es: [
      'Análisis y gestión de riesgos bajo metodología ESRM',
      'Análisis de información validada y OSINT',
      'Contramedidas y protección de la información',
      'Protección de dignatarios y ejecutivos',
      'Dirección de centros de control y monitoreo',
      'Seguridad corporativa y patrimonial',
    ],
  },
  education: {
    en: [
      'Doctorate and specialization in Citizen Security — UNES',
      'Master’s in Applied Security — UCV / AVES',
      'Master’s studies in General Management — UNELLEZ',
      'Lawyer',
      'Specializations in security countermeasures and supply-chain risk management',
    ],
    es: [
      'Doctorado y especialización en Seguridad Ciudadana — UNES',
      'Máster en Seguridad Aplicada — UCV / AVES',
      'Estudios de maestría en Gerencia General — UNELLEZ',
      'Abogado',
      'Especializaciones en contramedidas de seguridad y en gestión de riesgos en la cadena de suministro',
    ],
  },
  affiliations: {
    en: ['Board of Directors, ASIS International — Venezuela Chapter'],
    es: ['Junta Directiva de ASIS International, Capítulo Venezuela'],
  },
};

export const ANALYSTS: Analyst[] = [LEAD_ANALYST];

export const ANALYSTS_URL = 'https://cssg-global.com/cecom-intel/analysts';

/** schema.org Person for JSON-LD (author of guides, mainEntity of the analysts page). */
export const personSchema = (a: Analyst) => ({
  '@type': 'Person',
  '@id': `${ANALYSTS_URL}#${a.id}`,
  name: a.name,
  alternateName: a.fullName,
  honorificPrefix: a.honorific,
  jobTitle: a.role.en,
  url: `${ANALYSTS_URL}#${a.id}`,
  image: a.photo ? `https://cssg-global.com${a.photo}` : undefined,
  knowsAbout: a.focus.en,
  memberOf: a.affiliations ? { '@type': 'Organization', name: 'ASIS International' } : undefined,
  worksFor: { '@type': 'Organization', '@id': 'https://cssg-global.com/#organization', name: 'Company Of Security And Service Global C.A.' },
});
