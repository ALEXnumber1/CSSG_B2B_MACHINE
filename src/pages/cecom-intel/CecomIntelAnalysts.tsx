import { Link } from 'react-router-dom';
import { JsonLd, useCecomIntelFonts } from '../../components/cecom-intel/CecomIntelMark';
import { PAGES, PATHS, type Lang } from './content';
import { ANALYSTS, personSchema } from './analysts';
import { CiFooter, SubpageNav, usePageMeta } from './shell';
import '../../styles/cecom-intel.css';

const COPY = {
  en: {
    title: 'CECOM-Intel Analysts: Venezuela Security Risk',
    description: 'CECOM-Intel is led by Dr. Guillermo Amitesarove, lawyer with 25+ years in security and board member of ASIS International Venezuela. Profile and credentials.',
    eyebrow: 'ANALYSTS',
    h1: 'The people who sign our reports',
    lead: 'Every bulletin, alert and assessment from CECOM-Intel is reviewed and signed by an analyst. They work with the CECOM operators and the CSSG officers on post in Venezuela.',
    focus: 'Areas of expertise',
    education: 'Education',
    affiliations: 'Professional affiliations',
    contact: 'Talk to an analyst',
    method: 'How we work',
  },
  es: {
    title: 'Analistas de CECOM-Intel: riesgo de seguridad en Venezuela',
    description: 'CECOM-Intel lo dirige el Dr. Guillermo Amitesarove, abogado con más de 25 años en seguridad y directivo de ASIS International Venezuela. Perfil y credenciales.',
    eyebrow: 'ANALISTAS',
    h1: 'Quienes firman nuestros informes',
    lead: 'Un analista revisa y firma cada boletín, alerta y evaluación de CECOM-Intel. Los analistas trabajan con los operadores del CECOM y con los oficiales de CSSG en puesto en Venezuela.',
    focus: 'Áreas de experiencia',
    education: 'Formación académica',
    affiliations: 'Afiliaciones gremiales',
    contact: 'Hablar con un analista',
    method: 'Cómo trabajamos',
  },
};

const initials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2);

/** Analyst profiles; the guides link their Person author here. */
export default function CecomIntelAnalysts({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  useCecomIntelFonts();
  usePageMeta(t.title, t.description, lang);

  return (
    <div className="ci-zone pt-20">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: t.title,
        url: `https://cssg-global.com${PAGES.analysts[lang]}`,
        inLanguage: lang,
        mainEntity: personSchema(ANALYSTS[0]),
      }} />

      <SubpageNav lang={lang} page="analysts" />

      <header className="ci-section ci-guide__hero">
        <div className="ci-guide__wrap">
          <p className="ci-eyebrow">{t.eyebrow}</p>
          <h1 className="ci-guide__title">{t.h1}</h1>
          <p className="ci-p ci-p--lead">{t.lead}</p>
        </div>
      </header>

      <section className="ci-section" style={{ paddingTop: 0 }}>
        <div className="ci-guide__wrap" style={{ gap: 32 }}>
          {ANALYSTS.map(a => (
            <article key={a.id} id={a.id} className="ci-card ci-profile">
              {a.photo
                ? <img className="ci-profile__photo" src={a.photo} alt={a.name} width="160" height="160" />
                : <div className="ci-profile__mono" aria-hidden="true">{initials(a.name)}</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 className="ci-h2" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)' }}>{a.honorific ? `${a.honorific} ${a.name}` : a.name}</h2>
                <div className="ci-method__label" style={{ fontSize: 12 }}>{a.role[lang]}</div>
                {a.bio?.[lang].map(p => <p key={p.slice(0, 40)} className="ci-p ci-p--body">{p}</p>)}
                {([[t.focus, a.focus[lang]], [t.education, a.education?.[lang]], [t.affiliations, a.affiliations?.[lang]]] as [string, string[] | undefined][])
                  .filter(([, items]) => items?.length)
                  .map(([label, items]) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div className="ci-eyebrow" style={{ fontSize: 12, marginTop: 10 }}>{label}</div>
                      <ul className="ci-list">
                        {items!.map(f => (
                          <li key={f} style={{ padding: '10px 0' }}><span className="ci-dash" aria-hidden="true">—</span><p className="ci-p ci-p--body">{f}</p></li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </article>
          ))}
          <div className="ci-hero__ctas">
            <Link to={`${PATHS[lang]}#muestra`} className="ci-btn ci-btn--gold">{t.contact}</Link>
            <Link to={PAGES.methodology[lang]} className="ci-btn ci-btn--ghost">{t.method}</Link>
          </div>
        </div>
      </section>

      <CiFooter lang={lang} />
    </div>
  );
}
