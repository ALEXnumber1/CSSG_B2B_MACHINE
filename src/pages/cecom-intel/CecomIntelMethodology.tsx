import { Link } from 'react-router-dom';
import { JsonLd, useCecomIntelFonts } from '../../components/cecom-intel/CecomIntelMark';
import { PAGES, PATHS, type Lang } from './content';
import { METHODOLOGY } from './methodology';
import { CiFooter, SubpageNav, usePageMeta } from './shell';
import '../../styles/cecom-intel.css';

/** Public methodology and editorial standards of CECOM-Intel. */
export default function CecomIntelMethodology({ lang }: { lang: Lang }) {
  const t = METHODOLOGY[lang];
  useCecomIntelFonts();
  usePageMeta(t.meta.title, t.meta.description, lang);

  const table = (head: [string, string], rows: string[][]) => (
    <div className="ci-table-wrap">
      <table className="ci-table" style={{ minWidth: 0 }}>
        {(head[0] || head[1]) && <thead><tr><th scope="col">{head[0]}</th><th scope="col">{head[1]}</th></tr></thead>}
        <tbody>{rows.map(([k, v]) => <tr key={k}><th scope="row" className="ci-code">{k}</th><td>{v}</td></tr>)}</tbody>
      </table>
    </div>
  );

  return (
    <div className="ci-zone pt-20">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: t.meta.title,
        description: t.meta.description,
        url: `https://cssg-global.com${PAGES.methodology[lang]}`,
        inLanguage: lang,
        publisher: { '@type': 'Organization', '@id': 'https://cssg-global.com/#organization', name: 'Company Of Security And Service Global C.A.' },
      }} />

      <SubpageNav lang={lang} page="methodology" />

      <header className="ci-section ci-guide__hero">
        <div className="ci-guide__wrap">
          <p className="ci-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="ci-guide__title">{t.hero.title}</h1>
          <p className="ci-p ci-p--lead">{t.hero.lead}</p>
        </div>
      </header>

      <section className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.sources.eyebrow}</div>
            <h2 className="ci-h2">{t.sources.title}</h2>
          </div>
          <div className="ci-grid-3">
            {t.sources.items.map(i => (
              <div key={i.label} className="ci-method">
                <div className="ci-method__label">{i.label}</div>
                <p className="ci-p">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-stack">
          <div className="ci-head" style={{ maxWidth: 860 }}>
            <div className="ci-eyebrow">{t.grading.eyebrow}</div>
            <h2 className="ci-h2">{t.grading.title}</h2>
            <p className="ci-p">{t.grading.lead}</p>
          </div>
          <div className="ci-grid-2">
            {table(['', t.grading.reliabilityHead], t.grading.reliability)}
            {table(['', t.grading.credibilityHead], t.grading.credibility)}
          </div>
          <div className="ci-head" style={{ gap: 20 }}>
            <h3 className="ci-card__title">{t.grading.confidenceTitle}</h3>
            {table(['', ''], t.grading.confidence)}
          </div>
        </div>
      </section>

      <section className="ci-section ci-alt">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.scoring.eyebrow}</div>
            <h2 className="ci-h2">{t.scoring.title}</h2>
          </div>
          <div className="ci-col">
            <p className="ci-p ci-p--body">{t.scoring.lead}</p>
            <p className="ci-formula">{t.scoring.formula}</p>
            {table([t.scoring.scaleHead.range, t.scoring.scaleHead.level], t.scoring.scale)}
            <Link to="/analisis-riesgo">{t.scoring.tool} →</Link>
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.process.eyebrow}</div>
            <h2 className="ci-h2">{t.process.title}</h2>
          </div>
          <ol className="ci-col ci-list" style={{ gap: 0 }}>
            {t.process.steps.map((s, i) => (
              <li key={s}><span className="ci-code" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><p className="ci-p ci-p--body">{s}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.standards.eyebrow}</div>
            <h2 className="ci-h2">{t.standards.title}</h2>
          </div>
          <div className="ci-grid-3">
            {t.standards.items.map(i => (
              <div key={i.label} className="ci-method">
                <div className="ci-method__label">{i.label}</div>
                <p className="ci-p">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-stack" style={{ gap: 24 }}>
          <h2 className="ci-h2">{t.ctaTitle}</h2>
          <div className="ci-hero__ctas">
            <Link to={`${PATHS[lang]}#muestra`} className="ci-btn ci-btn--gold">{t.ctaSample}</Link>
            <Link to={PAGES.analysts[lang]} className="ci-btn ci-btn--ghost">{t.ctaAnalysts}</Link>
          </div>
        </div>
      </section>

      <CiFooter lang={lang} />
    </div>
  );
}
