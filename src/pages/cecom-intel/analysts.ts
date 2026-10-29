// CECOM-Intel analysts. Every guide, bulletin and assessment is signed by one of them, and the
// guides publish them as the schema.org Person author. Only add facts the person has approved:
// no invented credentials. `bio` paragraphs render only when present.

import type { Lang } from './content';

export interface Analyst {
  id: string;
  name: string;
  role: Record<Lang, string>;
  focus: Record<Lang, string[]>;
  bio?: Record<Lang, string[]>;
}

export const LEAD_ANALYST: Analyst = {
  id: 'guillermo-amitesarove',
  name: 'Guillermo Amitesarove',
  role: { en: 'Director and Lead Analyst, CECOM-Intel', es: 'Director y analista principal de CECOM-Intel' },
  focus: {
    en: [
      'Leads CECOM-Intel and its method',
      'Signs off the 06:30 bulletin and every assessment',
      'Diplomatic and corporate protection in Venezuela',
      'Journey management and executive travel',
    ],
    es: [
      'Dirige CECOM-Intel y su método de trabajo',
      'Firma el boletín de las 06:30 y cada evaluación',
      'Protección diplomática y corporativa en Venezuela',
      'Gestión de desplazamientos y viajes ejecutivos',
    ],
  },
};

export const ANALYSTS: Analyst[] = [LEAD_ANALYST];

export const ANALYSTS_URL = 'https://cssg-global.com/cecom-intel/analysts';

/** schema.org Person for JSON-LD (author of guides, mainEntity of the analysts page). */
export const personSchema = (a: Analyst) => ({
  '@type': 'Person',
  '@id': `${ANALYSTS_URL}#${a.id}`,
  name: a.name,
  jobTitle: a.role.en,
  url: `${ANALYSTS_URL}#${a.id}`,
  worksFor: { '@type': 'Organization', '@id': 'https://cssg-global.com/#organization', name: 'Company Of Security And Service Global C.A.' },
});
