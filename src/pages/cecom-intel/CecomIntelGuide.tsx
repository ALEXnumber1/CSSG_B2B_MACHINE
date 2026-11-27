import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CecomIntelWordmark, JsonLd, useCecomIntelFonts } from '../../components/cecom-intel/CecomIntelMark';
import { GUIDES, REVIEWED, guideBySlug } from './guides';
import { LEAD_ANALYST, personSchema } from './analysts';
import { PAGES } from './content';
import '../../styles/cecom-intel.css';

/** English field guide published by CECOM-Intel (prerendered; see postbuild.js). */
export default function CecomIntelGuide({ slug }: { slug: string }) {
  const g = guideBySlug(slug);
  const others = GUIDES.filter(o => o.slug !== slug);
  const reviewed = g.reviewed ?? REVIEWED;
  useCecomIntelFonts();

  useEffect(() => {
    document.title = g.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', g.description);
    document.documentElement.lang = 'en';
  }, [g]);

  return (
    <div className="ci-zone pt-20">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.title,
        description: g.description,
        inLanguage: 'en',
        datePublished: g.published ?? '2026-10-18',
        dateModified: reviewed.iso,
        mainEntityOfPage: `https://cssg-global.com/cecom-intel/${g.slug}`,
        image: 'https://cssg-global.com/cecom-intel/og-cecom-intel.jpg',
        author: personSchema(LEAD_ANALYST),
        publisher: { '@type': 'Organization', '@id': 'https://cssg-global.com/#organization', name: 'CSSG — Company Of Security And Service Global', logo: { '@type': 'ImageObject', url: 'https://cssg-global.com/logo_full.png' } },
        about: { '@type': 'Country', name: 'Venezuela' },
        citation: g.sources.map(s => s.url),
      }} />
      {g.faqs && (
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: 'en',
          mainEntity: g.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }} />
      )}

      <nav className="ci-subnav" aria-label="CECOM-Intel">
        <div className="ci-subnav__inner">
          <Link to="/cecom-intel" style={{ textDecoration: 'none' }}><CecomIntelWordmark /></Link>
          <div className="ci-subnav__links">
            <div className="ci-subnav__anchors">
              <Link to="/cecom-intel#planes">Plans</Link>
              <Link to={PAGES.partners.en}>Partners</Link>
              <Link to={PAGES.methodology.en}>Methodology</Link>
            </div>
            <Link to="/cecom-intel#muestra" className="ci-btn ci-btn--gold">Sample bulletin</Link>
          </div>
        </div>
      </nav>

      <article>
        <header className="ci-section ci-guide__hero">
          <div className="ci-guide__wrap">
            <p className="ci-eyebrow">{g.eyebrow}</p>
            <h1 className="ci-guide__title">{g.title}</h1>
            <p className="ci-note">
              By <Link to={`${PAGES.analysts.en}#${LEAD_ANALYST.id}`} rel="author">{LEAD_ANALYST.name}</Link>, {LEAD_ANALYST.role.en} · Last reviewed <time dateTime={reviewed.iso}>{reviewed.label}</time>
            </p>
            <div className="ci-guide__bluf">
              <p className="ci-method__label">BOTTOM LINE</p>
              <p className="ci-p ci-p--lead">{g.bottomLine}</p>
            </div>
          </div>
        </header>

        <div className="ci-section" style={{ paddingTop: 0 }}>
          <div className="ci-guide__wrap ci-guide__body">
            {g.sections.map(s => (
              <section key={s.h2}>
                <h2 className="ci-guide__h2">{s.h2}</h2>
                {s.paragraphs?.map(p => <p key={p.slice(0, 40)} className="ci-p ci-p--body">{p}</p>)}
                {s.bullets && (
                  <ul className="ci-list">
                    {s.bullets.map(b => (
                      <li key={b.slice(0, 40)}><span className="ci-dash" aria-hidden="true">—</span><p className="ci-p ci-p--body">{b}</p></li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {g.faqs && (
              <section aria-labelledby="ci-faq">
                <h2 id="ci-faq" className="ci-guide__h2">Frequently asked questions</h2>
                {g.faqs.map(f => (
                  <div key={f.q}>
                    <h3 className="ci-p ci-p--lead" style={{ fontWeight: 600, marginBottom: 4 }}>{f.q}</h3>
                    <p className="ci-p ci-p--body">{f.a}</p>
                  </div>
                ))}
              </section>
            )}

            {g.cta ? (
              <aside className="ci-ai" aria-label="Next step">
                <p className="ci-eyebrow">KNOW, THEN DECIDE.</p>
                <p className="ci-p ci-p--lead">{g.cta.text}</p>
                <div className="ci-hero__ctas">
                  {/* Plain anchors: /secure-ground is a static page outside the SPA router. */}
                  <a href={g.cta.primary.href} className="ci-btn ci-btn--gold">{g.cta.primary.label}</a>
                  <a href={g.cta.secondary.href} className="ci-btn ci-btn--ghost">{g.cta.secondary.label}</a>
                </div>
              </aside>
            ) : (
              <aside className="ci-ai" aria-label="Sample bulletin">
                <p className="ci-eyebrow">KNOW, THEN DECIDE.</p>
                <p className="ci-p ci-p--lead">Receive a free sample edition of our country-level risk bulletin. We will contact you within 24 hours.</p>
                <div className="ci-hero__ctas">
                  <Link to="/cecom-intel#muestra" className="ci-btn ci-btn--gold">Request a sample bulletin</Link>
                  <Link to="/cecom-intel" className="ci-btn ci-btn--ghost">About CECOM-Intel</Link>
                </div>
              </aside>
            )}

            <section aria-labelledby="ci-sources">
              <h2 id="ci-sources" className="ci-guide__h2">Sources</h2>
              <ul className="ci-guide__sources">
                {g.sources.map(s => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a> <span className="ci-note">— {s.note}</span></li>
                ))}
              </ul>
              <p className="ci-note">
                This guide summarizes public sources and CSSG’s operational experience for general planning. It is not legal advice and does not replace an assessment of your specific trip or operation.
              </p>
            </section>

            <nav aria-label="More guides">
              <h2 className="ci-guide__h2">More from CECOM-Intel</h2>
              <div className="ci-resources">
                {others.map(o => <Link key={o.slug} to={`/cecom-intel/${o.slug}`}>{o.title}</Link>)}
              </div>
            </nav>
          </div>
        </div>
      </article>
    </div>
  );
}
