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
  /** Defaults to the first batch's dates (REVIEWED, published 2026-10-18). */
  published?: string;
  reviewed?: { iso: string; label: string };
  /** Replaces the default "sample bulletin" call to action. Hrefs may point outside the SPA. */
  cta?: { text: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
}

const REVIEWED_NOV = { iso: '2026-11-17', label: '17 November 2026' };
const CTA_SECURE_GROUND = {
  text: 'Planning a trip or a delegation to Venezuela? Book a free 30-minute briefing with a senior CSSG specialist, in English.',
  primary: { label: 'Book a 30-minute briefing', href: '/secure-ground#book' },
  secondary: { label: 'About Secure Ground', href: '/secure-ground' },
};

const SRC_US = { label: 'U.S. Department of State — Venezuela Travel Advisory', url: 'https://travel.state.gov/en/international-travel/travel-advisories/venezuela.html', note: 'Level 3, issued 27 June 2026' };
const SRC_UK = { label: 'UK FCDO — Foreign travel advice: Venezuela', url: 'https://www.gov.uk/foreign-travel-advice/venezuela', note: 'Updated 14 October 2026' };
const SRC_UK_SEC = { label: 'UK FCDO — Venezuela: safety and security', url: 'https://www.gov.uk/foreign-travel-advice/venezuela/safety-and-security', note: 'Checked 18 October 2026' };
const SRC_OFAC = { label: 'U.S. Treasury OFAC — Recent actions', url: 'https://ofac.treasury.gov/recent-actions', note: 'GL 60A issued 16 October 2026' };
const SRC_US_EMBASSY = { label: 'U.S. Embassy Caracas — Travel Advisory: Venezuela', url: 'https://ve.usembassy.gov/travel-advisory-travel-advisory-venezuela/', note: 'Level 3 with Level 4 areas, issued 27 June 2026' };
const SRC_ICOC = { label: 'ICoCA — International Code of Conduct for Private Security Service Providers', url: 'https://icoca.ch/wp-content/uploads/2024/08/INTERNATIONAL-CODE-OF-CONDUCT_Amended_2024.pdf', note: 'Amended 2024' };
const SRC_CE = { label: 'UK NCSC — Cyber Essentials', url: 'https://www.ncsc.gov.uk/cyberessentials/overview', note: 'Scheme overview' };
const SRC_TLP = { label: 'FIRST — Traffic Light Protocol (TLP) 2.0', url: 'https://www.first.org/tlp/', note: 'Information-sharing standard' };
const SRC_VEW_DATES = { label: 'Zawya — Venezuela Energy Week moves to February 2027', url: 'https://www.zawya.com/en/press-release/africa-press-releases/venezuela-energy-week-moves-to-february-2027-as-global-investment-engagement-expands-425218', note: 'Organizer’s release, 2026' };
const SRC_VEW_PARTICIPANTS = { label: 'APO Group — Venezuela Energy Week 2027 brings global operators to Caracas', url: 'https://africa.com/apo/venezuela-energy-week-2027-brings-global-operators-to-caracas', note: '10 November 2026' };
const SRC_WRIGHT ={ label: 'World Oil — U.S. won’t provide security for oil operations in Venezuela', url: 'https://worldoil.com/news/2026/1/22/u-s-won-t-provide-security-for-oil-operations-in-venezuela-says-wright', note: '22 January 2026' };

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
  {
    slug: 'how-to-vet-security-partner-venezuela',
    published: REVIEWED_NOV.iso,
    reviewed: REVIEWED_NOV,
    title: 'How to vet an in-country security partner in Venezuela: a due-diligence checklist',
    metaTitle: 'How to Vet a Security Partner in Venezuela | CECOM-Intel',
    description: 'Due-diligence checklist for choosing a local security partner in Venezuela: licence, documents, own staff vs partners, operations and red flags.',
    eyebrow: 'DUE DILIGENCE · IN-COUNTRY PARTNERS',
    bottomLine: 'A local partner in Venezuela carries your name on the ground, so vet it like any critical supplier. Before the first job, check four things: its DIGESERVISP authorization and the territory it covers, which services it delivers with its own staff and which through partners, how it reports to your operations center, and the documents behind every claim.',
    sections: [
      {
        h2: 'Licence and legal standing',
        bullets: [
          'Private security companies operate under an authorization from DIGESERVISP, part of the Ministry of Interior, Justice and Peace. Ask for the document and check the geographic scope it covers.',
          'Ask whether the authorization covers armed or unarmed services. Armed services need a separate weapons authorization; never assume a provider holds one.',
          'Commercial registration and tax ID (RIF) in the company’s legal name, matching the entity that will sign and invoice.',
          'If invoicing comes from abroad, confirm the foreign entity and its relationship to the local licence holder.',
        ],
      },
      {
        h2: 'Documents to request',
        paragraphs: ['A serious provider shares these under a non-disclosure agreement within a few days:'],
        bullets: [
          'Commercial registration and RIF.',
          'DIGESERVISP authorization, with its scope.',
          'Insurance policies and their limits.',
          'Quality certification, such as ISO 9001, with the certificate number and the issuing body.',
          'Information-security certification, such as Cyber Essentials or ISO/IEC 27001.',
          'Human-rights and anti-corruption policies.',
          'Two or three references you can call.',
        ],
      },
      {
        h2: 'Own staff or partners: ask for the map',
        paragraphs: [
          'Most Venezuelan providers cover part of the country with their own staff and the rest through local partners. That is normal; hiding it is not. Ask for a written map, city by city: which service is delivered by whom, who vetted that partner, and who answers to you when something goes wrong.',
        ],
      },
      {
        h2: 'Operations to test before you sign',
        bullets: [
          'The 24/7 operations center: call it at night on a test day and time the answer.',
          'Live tracking: what your own team will see, and how.',
          'A written escalation protocol, with response times.',
          'Drivers: how they are vetted, trained and paid. Low turnover is a security control.',
          'Vehicles: who owns them, how they are maintained, and whether armored vehicles are available.',
          'Reporting: in English, in your formats, and how soon after an incident.',
        ],
      },
      {
        h2: 'Information security and conduct',
        bullets: [
          'Who sees traveller names and itineraries, where that data is stored and for how long.',
          'How reports are classified: the Traffic Light Protocol (TLP) is a common standard.',
          'Who can access dashcam footage and location data.',
          'Conduct standards: the International Code of Conduct for Private Security Service Providers is a useful reference, whether or not the provider is a member of its association.',
        ],
      },
      {
        h2: 'Questions for the first call',
        bullets: [
          'Which of our cities would you cover with your own staff, and which through partners?',
          'Can we see a recent incident report, redacted?',
          'How do you vet a driver, and how does their pay compare with the market?',
          'Who in your team speaks to our operations center at night, and in which language?',
          'What will you not do?',
        ],
      },
      {
        h2: 'Red flags',
        bullets: [
          'Nationwide coverage “with our own people” and no evidence.',
          'Armed services offered without the authorization to show for them.',
          'No written escalation protocol.',
          'Cash-only payment, or an invoicing entity that does not match the licence holder.',
          'No references, or no documents even under NDA.',
          'The same firm auditing your security and selling you the guards.',
        ],
      },
      {
        h2: 'Where CSSG fits',
        paragraphs: [
          'CSSG has operated in Venezuela since 2009 and holds DIGESERVISP authorization for unarmed private security in the Capital District and Miranda state. Elsewhere it works with vetted local partners coordinated live by its CECOM, and says which service each one delivers. It is ISO 9001:2015 (certificate 580181) and Cyber Essentials certified, shares its due-diligence pack under NDA, reports in English and invoices in USD through Company of Security and Service Global LLC (Miami).',
        ],
      },
    ],
    sources: [SRC_ICOC, SRC_CE, SRC_TLP, SRC_US],
    cta: {
      text: 'Vetting CSSG as your in-country partner? Request our due-diligence pack, shared under NDA. We reply within 24 hours.',
      primary: { label: 'Request the due-diligence pack', href: '/cecom-intel/partners' },
      secondary: { label: 'About Secure Ground', href: '/secure-ground' },
    },
  },
  {
    slug: 'venezuela-energy-week-2027-security',
    published: REVIEWED_NOV.iso,
    reviewed: REVIEWED_NOV,
    title: 'Venezuela Energy Week 2027: a security plan for delegations',
    metaTitle: 'Venezuela Energy Week 2027: Security Plan | CECOM-Intel',
    description: 'Attending Venezuela Energy Week in Caracas, 22–25 Feb 2027? How to plan arrival at Maiquetía, transfers, hotel and venue movements and daily updates.',
    eyebrow: 'EVENT SECURITY · CARACAS · FEBRUARY 2027',
    bottomLine: 'Venezuela Energy Week brings international operators, investors and service companies to Caracas from 22 to 25 February 2027. A delegation is most exposed where it is most visible: at the airport, on the road to Caracas, and arriving at or leaving the venue and evening events. Plan those movements before booking flights.',
    sections: [
      {
        h2: 'The event',
        bullets: [
          'Dates: 22–25 February 2027, in Caracas. It was first planned for 26–29 October 2026.',
          'Organizer: Energy Capital & Power, with the official support of the Ministry of Hydrocarbons and PDVSA.',
          'Announced participants include Chevron, Shell, bp (Gold Sponsor) and Qatar’s UCC Holding, according to the organizer’s release of 10 November 2026.',
        ],
      },
      {
        h2: 'Where a delegation is exposed',
        bullets: [
          'Arrival: Maiquetía resumed commercial operations on 1 September 2026 with limited capacity. Travelers have been targeted in the terminals, the car park and on the road to Caracas, particularly at night.',
          'Visibility: sponsor lists, delegate badges and branded vehicles tell anyone watching who is senior and where they will be.',
          'Routine: the same hotel-to-venue route at the same time every day.',
          'Evening events and dinners, which mean movements after dark.',
          'Group size: a large group is slower to move and harder to keep low-profile.',
          'Protests or road closures near official venues.',
        ],
      },
      {
        h2: 'Before you travel',
        bullets: [
          'Read the current U.S. and UK advisories; both changed several times in 2026.',
          'Assess the hotel, the venue, the routes between them and an alternate for each.',
          'Arrive in daylight and be met inside the terminal by a named, pre-identified team.',
          'Carry the identification local authorities require, with copies held by your operations center.',
          'Confirm medical and evacuation cover in writing.',
          'Agree a communications plan and a check-in schedule.',
          'Keep a low profile: badges off outside the venue, unbranded vehicles.',
        ],
      },
      {
        h2: 'During the event',
        bullets: [
          'A sourced risk bulletin every morning, with what changed overnight.',
          'Vary departure times and, where possible, routes.',
          'Use a drop-off and pick-up point agreed in advance with the venue.',
          'No movement after dark without a plan and a vehicle that is tracked.',
          'Alerts on protests, closures or incidents near the delegation.',
          'One point of contact who knows where every member of the delegation is.',
        ],
      },
      {
        h2: 'After the event',
        bullets: [
          'Plan the departure transfer with the same care as the arrival.',
          'Follow-up meetings often happen in the days after the event: assess them too.',
          'Ask for a trip report, with what to change for the next visit.',
        ],
      },
      {
        h2: 'How CSSG supports delegations',
        paragraphs: [
          'Secure Ground, CSSG’s executive travel security service, plans each delegation’s arrival, hotel and venue movements before the trip and follows every movement live from its CECOM command center in Caracas. Caracas is covered by CSSG’s own unarmed teams. The delegation receives a daily risk bulletin at 06:30 (Venezuela time) and a report after the event.',
        ],
      },
    ],
    sources: [SRC_VEW_DATES, SRC_VEW_PARTICIPANTS, SRC_US, SRC_UK],
    cta: CTA_SECURE_GROUND,
  },
  {
    slug: 'venezuela-travel-advisory-by-state',
    published: REVIEWED_NOV.iso,
    reviewed: REVIEWED_NOV,
    title: 'Venezuela travel advisory by state: what Level 3 and Level 4 mean for your team',
    metaTitle: 'Venezuela Travel Advisory by State (2026) | CECOM-Intel',
    description: 'Which Venezuelan states the U.S. rates Level 4 and where the UK advises against travel, as of November 2026, and what each means for a business trip.',
    eyebrow: 'TRAVEL ADVISORIES · BY STATE',
    bottomLine: 'The U.S. rates Venezuela Level 3, “Reconsider Travel”, but six states or parts of states and the border with Colombia are Level 4, “Do Not Travel”. The UK advises against all travel near every land border, to Amazonas and to mining municipalities in Bolívar, and against all but essential travel to the rest of the country, Caracas included. Business trips are possible with planning; trips to the listed areas need a specific assessment, and often the answer is not to go.',
    sections: [
      {
        h2: 'United States: the Level 4 areas',
        paragraphs: ['The country has been Level 3 since 19 March 2026, when it was lowered from Level 4; the advisory was reissued on 27 June 2026. These areas remain Level 4, “Do Not Travel”:'],
        bullets: [
          'The border region with Colombia (about 20 miles, 32 km, deep): crime, kidnapping and terrorism.',
          'Amazonas: terrorism.',
          'Apure: terrorism.',
          'Aragua, outside Maracay: crime and kidnapping.',
          'Bolívar, rural areas: crime and kidnapping.',
          'Guárico: crime and kidnapping.',
          'Táchira: crime and terrorism.',
        ],
      },
      {
        h2: 'United Kingdom: the FCDO’s advice',
        paragraphs: ['Updated 14 October 2026 and still current on 16 November 2026. The FCDO advises against all travel to:'],
        bullets: [
          'Within 40 km (25 miles) of the borders with Colombia, Brazil and Guyana.',
          'Amazonas state.',
          'In Bolívar: all of Cedeño, Piar, Roscio, El Callao and Sifontes municipalities; the northern part of Sucre municipality, from the Orinoco river to 80 km south of the Troncal 19 road; and the northern part of Raúl Leoni municipality, north of the Paragua river.',
          'Delta Amacuro, south of the Orinoco river.',
          'It advises against all but essential travel to the rest of Venezuela, including Zulia state, Maracaibo and the eastern shore of Lake Maracaibo.',
        ],
      },
      {
        h2: 'Where the two governments differ',
        paragraphs: [
          'The U.S. names Apure, Aragua outside Maracay and Guárico as Level 4; the UK does not single them out but already covers them under “all but essential”. The UK draws its strictest zones by distance from every land border and municipality by municipality in Bolívar. Companies that follow UK duty-of-care practice should treat any trip to Venezuela, Caracas included, as essential travel with a written justification and plan.',
        ],
      },
      {
        h2: 'What this means for a business trip',
        bullets: [
          'Caracas and Miranda (U.S. Level 3; UK all but essential): business travel is possible with a pre-trip assessment, vetted transport and a 24/7 operations center following each movement.',
          'Zulia and Maracaibo (U.S. Level 3 outside the Colombian border zone; UK all but essential): plan as a higher-risk trip and check whether any site lies within the border zones.',
          'Level 4 areas and FCDO “all travel” areas: most corporate travel policies prohibit them. Where a visit cannot be avoided, it needs senior approval, a specific assessment, a specialist team and an evacuation plan.',
          'Insurance: travelling against government advice can invalidate travel and medical cover. Check the policy before booking.',
        ],
      },
      {
        h2: 'Keeping up with changes',
        bullets: [
          'The U.S. advisory changed level in March 2026 and was reissued in June 2026, after the 24 June earthquakes.',
          'Register for the U.S. Smart Traveler Enrollment Program (STEP) or the FCDO’s email alerts.',
          'Read a sourced daily update during any trip, not only the advisory.',
        ],
      },
      {
        h2: 'How CSSG helps',
        paragraphs: [
          'CECOM-Intel, the risk analysis unit of CSSG’s CECOM command center in Caracas, assesses routes and sites in any state and publishes a daily risk bulletin at 06:30 (Venezuela time). Physical support comes from CSSG’s own unarmed teams in Caracas and Miranda and from vetted local partners elsewhere. When the right recommendation is not to go, we say so.',
        ],
      },
    ],
    sources: [SRC_US_EMBASSY, SRC_UK, SRC_US],
    cta: CTA_SECURE_GROUND,
  },
];

export const guideBySlug = (slug: string) => GUIDES.find(g => g.slug === slug)!;
