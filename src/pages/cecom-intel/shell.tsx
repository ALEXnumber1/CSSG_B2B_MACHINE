import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CecomIntelWordmark } from '../../components/cecom-intel/CecomIntelMark';
import { CONTENT, PAGES, PATHS, type Lang } from './content';

// Shared frame of the CECOM-Intel sub-pages (partners, methodology, analysts).

export type Page = keyof typeof PAGES;

const LABELS: Record<Lang, Record<Page, string> & { cta: string }> = {
  en: { partners: 'Partners', methodology: 'Methodology', analysts: 'Analysts', cta: 'Sample bulletin' },
  es: { partners: 'Socios', methodology: 'Metodología', analysts: 'Analistas', cta: 'Boletín de muestra' },
};

// eslint-disable-next-line react-refresh/only-export-components -- shared by the sub-pages
export function usePageMeta(title: string, description: string, lang: Lang) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.documentElement.lang = lang;
  }, [title, description, lang]);
}

export function SubpageNav({ lang, page }: { lang: Lang; page: Page }) {
  const l = LABELS[lang];
  return (
    <nav className="ci-subnav" aria-label="CECOM-Intel">
      <div className="ci-subnav__inner">
        <Link to={PATHS[lang]} style={{ textDecoration: 'none' }}><CecomIntelWordmark /></Link>
        <div className="ci-subnav__links">
          <div className="ci-subnav__anchors">
            {(Object.keys(PAGES) as Page[]).map(p => (
              <Link key={p} to={PAGES[p][lang]} aria-current={p === page ? 'page' : undefined}>{l[p]}</Link>
            ))}
          </div>
          <div className="ci-lang" role="group" aria-label={CONTENT[lang].nav.langLabel}>
            {(['en', 'es'] as Lang[]).map(x => (
              <Link key={x} to={PAGES[page][x]} aria-current={x === lang ? 'true' : undefined} hrefLang={x} lang={x}>
                {x.toUpperCase()}
              </Link>
            ))}
          </div>
          <Link to={`${PATHS[lang]}#muestra`} className="ci-btn ci-btn--gold">{l.cta}</Link>
        </div>
      </div>
    </nav>
  );
}

export function CiFooter({ lang }: { lang: Lang }) {
  return (
    <div className="ci-footer">
      <div className="ci-footer__inner">
        <div className="ci-footer__org">
          <img src="/cecom-intel/cssg-eagle-120.webp" alt="CSSG" width="120" height="102" loading="lazy" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Company Of Security And Service Global C.A.</div>
            <div className="ci-note">{CONTENT[lang].footer.address}</div>
          </div>
        </div>
        <div className="ci-footer__right">
          <a href="mailto:gerencia@globalservices-ven.com">gerencia@globalservices-ven.com</a>
          <div className="ci-note">ISO 9001:2015 · Cyber Essentials · RIF J-29782024-8</div>
        </div>
      </div>
    </div>
  );
}
