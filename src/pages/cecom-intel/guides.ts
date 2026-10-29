// CECOM-Intel field guides (English). Each targets a real search intent from international
// buyers. Facts come from the official sources listed in each guide, with the date they were
// checked; review them monthly (REVIEWED) and whenever an advisory changes.
// Editorial rules: sober and factual, no political opinion, no superlatives, no legal advice,
// and no use of the word "intelligence".

export const REVIEWED = { iso: '2026-10-18', label: '18 October 2026' };

export interface GuideSection { h2: string; paragraphs?: string[]; bullets?: string[] }
export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  bottomLine: string;
  sections: GuideSection[];
  sources: { label: string; url: string; note: string }[];
}

const SRC_US = { label: 'U.S. Department of State — Venezuela Travel Advisory', url: 'https://travel.state.gov/en/international-travel/travel-advisories/venezuela.html', note: 'Level 3, issued 27 June 2026' };
const SRC_UK = { label: 'UK FCDO — Foreign travel advice: Venezuela', url: 'https://www.gov.uk/foreign-travel-advice/venezuela', note: 'Updated 14 October 2026' };
const SRC_UK_SEC = { label: 'UK FCDO — Venezuela: safety and security', url: 'https://www.gov.uk/foreign-travel-advice/venezuela/safety-and-security', note: 'Checked 18 October 2026' };
const SRC_OFAC = { label: 'U.S. Treasury OFAC — Recent actions', url: 'https://ofac.treasury.gov/recent-actions', note: 'GL 60A issued 16 October 2026' };
const SRC_WRIGHT = { label: 'World Oil — U.S. won’t provide security for oil operations in Venezuela', url: 'https://worldoil.com/news/2026/1/22/u-s-won-t-provide-security-for-oil-operations-in-venezuela-says-wright', note: '22 January 2026' };

export const GUIDES: Guide[] = [
  {
    slug: 'venezuela-security-outlook-2026',
    title: 'Is it safe to travel to Venezuela in 2026? A security outlook for business travelers',
    metaTitle: 'Is It Safe to Travel to Venezuela in 2026? | CECOM-Intel',
    description: 'U.S. and UK advisories, the main risks for business travelers in Caracas, the higher-risk regions and the measures that reduce exposure. Reviewed October 2026.',
    eyebrow: 'SECURITY OUTLOOK · VENEZUELA 2026',
    bottomLine: 'Business travel to Caracas is possible in 2026 with planning, but Venezuela remains a high-risk environment that can change quickly. The U.S. rates the country Level 3, “Reconsider Travel”, and the UK advises against all travel to the border and mining regions. Consular support is limited, so travelers need a plan that does not depend on their embassy.',
    sections: [
      {
        h2: 'What official advisories say',
        bullets: [
          'United States: Level 3, “Reconsider Travel”, issued 27 June 2026. It was lowered from Level 4 on 19 March 2026. The advisory cites crime, kidnapping, terrorism, health infrastructure and natural disasters, with higher risk near the border with Colombia.',
          'United States: the Embassy in Caracas reopened in March 2026 but its Consular Section provides emergency services to U.S. citizens only; visa services are handled in Bogotá.',
          'United Kingdom: the FCDO advises against all travel within 40 km of the border with Colombia, to the Brazil and Guyana border areas, to Amazonas state, to the Orinoco Mining Arc in Bolívar and to Delta Amacuro south of the Orinoco river (updated 14 October 2026).',
          'Both governments warn that their ability to assist citizens in Venezuela is limited.',
        ],
      },
      {
        h2: 'The main risks for a business traveler',
        bullets: [
          'Violent crime: armed robbery, carjacking and mugging occur in parts of the country and can involve extreme violence. Do not resist and keep a low profile.',
          'Airport transfers: travelers have been targeted at Maiquetía’s terminals, car park and on the road to Caracas, especially at night.',
          'Road travel after dark: both the risk of crime and the condition of roads increase at night; police and National Guard checkpoints are common.',
          'Documents: security forces may ask for identification at any time; travelers without it can be detained while their identity is checked.',
          'Protests: demonstrations can turn violent and may be dispersed with tear gas and rubber bullets.',
          'Earthquake aftermath: two earthquakes of magnitude 7.2 and 7.5 struck on 24 June 2026, damaging La Guaira and parts of Caracas. La Guaira remains under enhanced access controls.',
          'Services and health: power, water and fuel can be limited, especially outside Caracas, and medical care may not meet the standards travelers expect.',
        ],
      },
      {
        h2: 'Higher-risk regions',
        paragraphs: [
          'Illegal armed groups and criminal networks are active near the borders and in mining and drug-trafficking areas, including Zulia, Táchira and Apure states and the Orinoco Mining Arc. Movements to these regions require a specific assessment and, in most cases, should be avoided.',
        ],
      },
      {
        h2: 'Practical measures that reduce exposure',
        bullets: [
          'Assess the itinerary before departure: hotel, meeting venues, routes and timings.',
          'Arrive in daylight when possible and use a pre-arranged, vetted airport transfer; never take an unbooked taxi.',
          'Avoid public transport and movements after dark.',
          'Carry the identification required by local authorities.',
          'Agree a check-in schedule with a 24/7 operations center and a contingency plan that does not rely on embassy support.',
          'Confirm medical and evacuation coverage before travel.',
          'Read a current, sourced risk update every morning of the trip.',
        ],
      },
      {
        h2: 'How CECOM-Intel supports travelers',
        paragraphs: [
          'CECOM-Intel is the risk analysis unit of CECOM, CSSG’s in-country Global Security Operations Center (GSOC) in Caracas. We deliver a daily risk bulletin at 06:30 (Venezuela time) with cited and graded sources, alerts on events that affect people, sites or movements, and pre-trip assessments of cities, routes, hotels and venues. Physical response with our own personnel covers the Capital District and Miranda state; elsewhere we coordinate with authorized partners.',
        ],
      },
    ],
    sources: [SRC_US, SRC_UK, SRC_UK_SEC],
  },
  {
    slug: 'doing-business-in-venezuela-security-guide',
    title: 'Doing business in Venezuela in 2026: a security guide for international companies',
    metaTitle: 'Doing Business in Venezuela 2026: Security Guide',
    description: 'Security for companies entering Venezuela in 2026: the operating environment, sanctions context, risk areas and how to choose a licensed local security partner.',
    eyebrow: 'SECURITY GUIDE · INTERNATIONAL COMPANIES',
    bottomLine: 'Commercial engagement with Venezuela is reopening, but security remains each company’s own responsibility. In January 2026 the U.S. Secretary of Energy said Washington would not provide on-the-ground security for oil companies operating in the country. Companies need a security program, a licensed local partner and continuous risk monitoring before they commit people and assets.',
    sections: [
      {
        h2: 'The operating environment',
        bullets: [
          'The U.S. advisory stands at Level 3 (27 June 2026) and the UK advises against all travel to the border and mining regions; both describe limited consular support.',
          'The 24 June 2026 earthquakes disrupted infrastructure around La Guaira and parts of Caracas; Maiquetía airport resumed commercial operations on 1 September with limited capacity.',
          'Power, water and fuel supplies can be unreliable outside Caracas, which affects site operations and contingency planning.',
          'Organized crime and armed groups are concentrated in border, mining and trafficking areas, where extortion and kidnapping risks are higher.',
        ],
      },
      {
        h2: 'Sanctions context (not legal advice)',
        paragraphs: [
          'Many activities are authorized through OFAC general licenses, which can be amended, delayed or revoked. In 2026 OFAC has repeatedly adjusted the Venezuela program: for example, General License 5Z (16 September 2026) delayed the effectiveness of General License 5 until 5 November 2026, and General License 60A (16 October 2026) authorizes earthquake-relief transactions. Companies should obtain advice from sanctions counsel; security findings complement, and never replace, that advice.',
        ],
      },
      {
        h2: 'Security risks to plan for',
        bullets: [
          'Site security: perimeter, access control and the immediate surroundings of each facility, where most incidents begin.',
          'Staff movements: commuting, airport transfers and travel between cities, managed through journey management.',
          'Local hiring: vetting of staff and contractors within the legal framework.',
          'Supply chain and logistics routes, especially through higher-risk regions.',
          'Extortion and criminal pressure on operations in border and mining areas.',
          'Infrastructure failures and natural hazards, including earthquake aftershocks.',
        ],
      },
      {
        h2: 'Building a security program',
        bullets: [
          'Start with a risk assessment based on ISO 31000 and an enterprise security risk management (ESRM) approach.',
          'Adopt a written duty-of-care policy covering employees, visitors and contractors.',
          'Set up 24/7 monitoring through a security operations center (GSOC) with clear escalation to your head office.',
          'Prepare incident, crisis and evacuation plans that do not depend on government assistance.',
          'Require reporting in the formats your head office already uses, in English.',
        ],
      },
      {
        h2: 'Choosing a local security partner',
        bullets: [
          'License: private security companies need authorization from DIGESERVISP (Ministry of Interior, Justice and Peace); check the geographic scope it covers.',
          'Quality management: ISO 9001 certification or an equivalent audited system.',
          'People: how staff are vetted, trained and paid; low turnover is a security control.',
          'Transparency: which services are delivered with own personnel and which through partners.',
          'Independence: a firm that audits your security should not also be bidding to provide it.',
          'References you can verify and reporting in English.',
        ],
      },
      {
        h2: 'Where CSSG fits',
        paragraphs: [
          'CSSG has operated in Venezuela since 2009 and protects G7 diplomatic missions and multinationals. It is ISO 9001:2015 and Cyber Essentials certified and holds DIGESERVISP authorization for unarmed private security in the Capital District and Miranda state. Its CECOM, the company’s in-country GSOC, provides daily risk bulletins, journey management and 24/7 monitoring. For international risk and protection firms without a presence in Venezuela, CSSG works as the in-country partner: you keep the client and the relationship; we provide the eyes on the ground and the response capacity, under your standard. Invoicing is available through Company of Security and Service Global LLC (Miami).',
        ],
      },
    ],
    sources: [SRC_WRIGHT, SRC_US, SRC_UK, SRC_OFAC],
  },
  {
    slug: 'executive-travel-venezuela-journey-management',
    title: 'Executive travel to Venezuela: airport arrival, transfers and journey management',
    metaTitle: 'Executive Travel to Venezuela: Journey Management',
    description: 'Planning an executive trip to Caracas in 2026: pre-trip assessment, arrival at Maiquetía, vetted transfers, journey management and a daily risk bulletin.',
    eyebrow: 'EXECUTIVE TRAVEL · JOURNEY MANAGEMENT',
    bottomLine: 'The moments of highest exposure on an executive trip to Venezuela are the arrival, the airport transfer and any movement after dark. Each should be planned before departure, with a vetted team, a defined route and a 24/7 operations center following the journey.',
    sections: [
      {
        h2: 'Before departure',
        bullets: [
          'Risk assessment of the itinerary: hotel, venues, routes, timings and alternates.',
          'Profile of the traveler and the visit: who needs to know, and what should stay low-profile.',
          'Documents required by local authorities, plus copies held by the operations center.',
          'Medical and evacuation coverage confirmed in writing.',
          'Communications plan and check-in schedule with the operations center.',
          'A pre-travel briefing with the current risk picture.',
        ],
      },
      {
        h2: 'Arrival at Maiquetía',
        paragraphs: [
          'Simón Bolívar International Airport (Maiquetía) resumed commercial operations on 1 September 2026 with limited capacity; international flights also operate from Valencia, Barquisimeto, Barcelona and Maracaibo. Travelers have been targeted in the terminals, the car park and on the road to Caracas, particularly at night, and people posing as officials have been reported. Arrive in daylight when possible, be met inside the terminal by a pre-identified team, and never accept unsolicited help or unbooked transport.',
        ],
      },
      {
        h2: 'Journey management in country',
        bullets: [
          'Approved routes and alternates for every movement, with timings that avoid travel after dark.',
          'Vetted drivers and vehicles; the traveler knows in advance who will collect them.',
          'Awareness of police and National Guard checkpoints and the documents to carry.',
          'Real-time follow-up of each movement by the operations center, with defined escalation.',
          'A low profile: no visible valuables, no predictable routines.',
        ],
      },
      {
        h2: 'During the stay',
        bullets: [
          'A sourced risk bulletin every morning, with what changed in the last 24 hours.',
          'Immediate alerts on protests, road closures, aftershocks or incidents near the traveler.',
          'Scheduled check-ins and a clear plan for each contingency.',
        ],
      },
      {
        h2: 'Outside Caracas',
        paragraphs: [
          'Border, mining and trafficking areas carry higher risk and require a specific assessment; in many cases the right recommendation is not to go. CSSG’s analysis covers the whole country, while physical response with its own personnel is limited to the Capital District and Miranda state; elsewhere, response is coordinated with authorized partners.',
        ],
      },
      {
        h2: 'How CECOM-Intel supports executive travel',
        paragraphs: [
          'CECOM-Intel prepares route and venue assessments before each visit, delivers the daily risk bulletin at 06:30 (Venezuela time) and provides a direct line to CECOM, CSSG’s in-country GSOC, for the whole stay. Secure ground transport and medical response are delivered with vetted partners.',
        ],
      },
    ],
    sources: [SRC_UK, SRC_UK_SEC, SRC_US],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find(g => g.slug === slug)!;
