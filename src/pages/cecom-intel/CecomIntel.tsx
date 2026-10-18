import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CecomIntelMap, CecomIntelWordmark, CECOM_INTEL_FONTS, JsonLd } from '../../components/cecom-intel/CecomIntelMark';
import { saveLead } from '../../lib/leads';
import { sendLeadNotification } from '../../lib/email';
import { CONTENT, PATHS, PRICES, type Interest, type Lang } from './content';
import { GUIDES } from './guides';
import '../../styles/cecom-intel.css';

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };
function track(event: string, params: Record<string, unknown>) {
  try { (window as GtagWindow).gtag?.('event', event, params); } catch { /* analytics must never break the page */ }
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  const el = document.querySelector(`meta[${attr}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

const Icon = ({ name }: { name: string }) => (
  <svg className="ci-icon" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'doc' && <><path d="M6 3h9l3 3v15H6z" /><path d="M9 9h6M9 13h6M9 17h4" /></>}
    {name === 'search' && <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>}
    {name === 'bell' && <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 20a2 2 0 0 0 4 0" /></>}
  </svg>
);

function PatrolGraphic({ site, caption, label }: { site: string; caption: string; label: string }) {
  const lines = Array.from({ length: 11 }, (_, i) => 40 * (i + 1));
  return (
    <svg className="ci-patrol__svg" viewBox="0 0 460 460" role="img" aria-label={label}>
      <rect x="0" y="0" width="460" height="460" rx="16" fill="#0A0A0A" stroke="#2A2A2A" />
      <g stroke="#1E1E1E" strokeWidth="1">
        {lines.map(p => <path key={`v${p}`} d={`M${p} 0V460`} />)}
        {lines.map(p => <path key={`h${p}`} d={`M0 ${p}H460`} />)}
      </g>
      <path d="M0 150H460M0 320H460M140 0V460M330 0V460" stroke="#262626" strokeWidth="14" />
      <rect x="185" y="185" width="90" height="90" rx="6" fill="#161616" stroke="#F5F5F5" strokeWidth="1.5" />
      <text x="230" y="236" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="2" fill="#F5F5F5">{site}</text>
      <rect x="140" y="150" width="190" height="170" rx="4" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="10 8" />
      <circle cx="140" cy="210" r="7" fill="#E6C45A" /><circle cx="140" cy="210" r="16" fill="none" stroke="#D4AF37" strokeOpacity="0.5" />
      <circle cx="290" cy="320" r="7" fill="#E6C45A" /><circle cx="290" cy="320" r="16" fill="none" stroke="#D4AF37" strokeOpacity="0.5" />
      <circle cx="330" cy="170" r="5" fill="#E6C45A" />
      <text x="24" y="436" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="2" fill="#D4AF37">{caption}</text>
    </svg>
  );
}

export default function CecomIntel({ lang }: { lang: Lang }) {
  const t = CONTENT[lang];
  const location = useLocation();

  const [form, setForm] = useState({ nombre: '', empresa: '', correo: '', interest: 'sample' as Interest, weekly: true });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  useEffect(() => {
    document.title = t.meta.title;
    setMeta('description', t.meta.description);
    setMeta('og:title', t.meta.title, 'property');
    setMeta('og:description', t.meta.description, 'property');
    document.documentElement.lang = lang;
  }, [t, lang]);

  const pickInterest = (interest: Interest, source: string) => {
    setForm(f => ({ ...f, interest }));
    track('select_plan', { plan: interest, source, page_language: lang });
  };

  const isFreeEmail = (() => {
    const domain = form.correo.split('@')[1]?.toLowerCase();
    return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
  })();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const interestLabel = CONTENT.es.sample.interests[form.interest];
    const mensaje = `[CECOM-Intel ${lang.toUpperCase()}] Interés: ${interestLabel} | Boletín semanal gratuito: ${form.weekly ? 'sí' : 'no'}`;
    try {
      await saveLead({
        nombre: form.nombre,
        correo: form.correo,
        empresa: form.empresa,
        mensaje,
        fuente: 'cecom_intel',
        score: form.interest === 'sample' ? 50 : 55,
      });
      try {
        await sendLeadNotification({ nombre: form.nombre, email: form.correo, empresa: form.empresa, fuente: 'cecom_intel', mensaje });
      } catch (notifyErr) {
        console.warn('[CECOM-Intel] notification failed (lead is saved):', notifyErr);
      }
      track('generate_lead', { form: 'cecom_intel_sample', interest: form.interest, weekly_bulletin: form.weekly, page_language: lang });
      setStatus('ok');
    } catch (err) {
      console.error('[CECOM-Intel] lead not saved:', err);
      setStatus('error');
    }
  };

  const price = (amount: number | null) => amount === null
    ? <><span className="ci-plan__amount ci-plan__amount--text">{t.plans.onRequest}</span><span className="ci-plan__unit">{t.plans.monthly}</span></>
    : <><span className="ci-plan__amount">{t.plans.from} {amount}</span><span className="ci-plan__unit">{t.plans.perMonth}</span></>;

  const plans: { key: Interest; badge: string; featured?: boolean; data: typeof t.plans.essential; amount: ReactNode; gold?: boolean }[] = [
    { key: 'essential', badge: '', data: t.plans.essential, amount: price(PRICES.essential) },
    { key: 'professional', badge: t.plans.recommended, featured: true, gold: true, data: t.plans.professional, amount: price(PRICES.professional) },
    { key: 'tailored', badge: '', data: t.plans.tailored, amount: <span className="ci-plan__amount ci-plan__amount--text">{t.plans.quote}</span> },
  ];

  return (
    <div className="ci-zone pt-20">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={CECOM_INTEL_FONTS} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: t.faq.items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }} />

      {/* 1 · Sub-brand menu */}
      <nav className="ci-subnav" aria-label="CECOM-Intel">
        <div className="ci-subnav__inner">
          <a href="#top" className="ci-wordmark-link" style={{ textDecoration: 'none' }}><CecomIntelWordmark /></a>
          <div className="ci-subnav__links">
            <div className="ci-subnav__anchors">
              <a href="#que-es">{t.nav.what}</a>
              <a href="#patrullaje">{t.nav.patrol}</a>
              <a href="#alcance">{t.nav.scope}</a>
              <a href="#como-trabajamos">{t.nav.how}</a>
              <a href="#planes">{t.nav.plans}</a>
            </div>
            <div className="ci-lang" role="group" aria-label={t.nav.langLabel}>
              {(['en', 'es'] as Lang[]).map(l => (
                <Link key={l} to={`${PATHS[l]}${location.hash}`} aria-current={l === lang ? 'true' : undefined} hrefLang={l} lang={l}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <a href="#muestra" className="ci-btn ci-btn--gold" onClick={() => pickInterest('sample', 'subnav')}>{t.nav.cta}</a>
          </div>
        </div>
      </nav>

      {/* 2 · Hero */}
      <header id="top" className="ci-hero">
        <div className="ci-hero__inner">
          <div className="ci-hero__copy">
            <h1 className="ci-eyebrow">{t.hero.eyebrow}</h1>
            <p className="ci-hero__motto">Know, then decide.</p>
            <p className="ci-hero__lead">{t.hero.lead}</p>
            <div className="ci-hero__ctas">
              <a href="#muestra" className="ci-btn ci-btn--gold" onClick={() => pickInterest('sample', 'hero')}>{t.hero.ctaSample}</a>
              <a href="#planes" className="ci-btn ci-btn--ghost">{t.hero.ctaPlans}</a>
            </div>
            <div className="ci-hero__coverage">{t.hero.coverage}</div>
          </div>
          <CecomIntelMap className="ci-hero__map" label={t.hero.mapLabel} />
        </div>
      </header>

      {/* 3 · Credentials */}
      <section className="ci-creds" aria-label="CSSG">
        <div className="ci-creds__grid">
          {t.creds.map(c => (
            <div key={c.value} className="ci-cred">
              <div className="ci-cred__value">{c.value}</div>
              <div className="ci-cred__label">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 4 · What it is */}
      <section id="que-es" className="ci-section">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.what.eyebrow}</div>
            <h2 className="ci-h2">{t.what.title}</h2>
          </div>
          <div className="ci-col">
            <p className="ci-p ci-p--lead">{t.what.p1}</p>
            <p className="ci-p ci-p--lead">{t.what.p2}</p>
          </div>
        </div>
      </section>

      {/* 5 · Exterior patrol */}
      <section id="patrullaje" className="ci-section ci-alt">
        <div className="ci-patrol">
          <div className="ci-patrol__copy">
            <div className="ci-eyebrow">{t.patrol.eyebrow}</div>
            <h2 className="ci-h2">{t.patrol.title}</h2>
            <p className="ci-p">{t.patrol.body}</p>
            <div className="ci-patrol__items">
              {t.patrol.items.map(i => (
                <div key={i.title} className="ci-patrol__item">
                  <strong>{i.title}</strong>
                  <p className="ci-p">{i.text}</p>
                </div>
              ))}
            </div>
          </div>
          <PatrolGraphic site={t.patrol.svgSite} caption={t.patrol.svgCaption} label={t.patrol.svgLabel} />
        </div>
      </section>

      {/* 6 · Scope */}
      <section id="alcance" className="ci-section">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.scope.eyebrow}</div>
            <h2 className="ci-h2">{t.scope.title}</h2>
          </div>
          <ul className="ci-col ci-list" style={{ gap: 0 }}>
            {t.scope.items.map(item => (
              <li key={item}><span className="ci-dash" aria-hidden="true">—</span><p className="ci-p ci-p--body">{item}</p></li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 · Tailored services + related services */}
      <section id="a-la-medida" className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.tailored.eyebrow}</div>
            <h2 className="ci-h2">{t.tailored.title}</h2>
          </div>
          <div className="ci-grid-2">
            {t.tailored.cards.map(c => (
              <div key={c.title} className="ci-card">
                <Icon name={c.icon} />
                <div className="ci-card__title">{c.title}</div>
                <p className="ci-p">{c.text}</p>
              </div>
            ))}
          </div>

          <div className="ci-head" style={{ marginTop: 24 }}>
            <div className="ci-eyebrow">{t.related.eyebrow}</div>
            <h2 className="ci-h2">{t.related.title}</h2>
          </div>
          <div className="ci-grid-3">
            {t.related.items.map(r => (
              <div key={r.title} className="ci-card">
                <div className="ci-card__title">{r.title}</div>
                <p className="ci-p" style={{ flexGrow: 1 }}>{r.text}</p>
                {'href' in r && r.href
                  ? <Link to={r.href}>{r.link} →</Link>
                  : <a href="#muestra" onClick={() => pickInterest(('interest' in r && r.interest) || 'tailored', 'related')}>{r.link} →</a>}
              </div>
            ))}
          </div>
          <Link to="/consultoria">{t.related.all} →</Link>
        </div>
      </section>

      {/* 8 · How we work */}
      <section id="como-trabajamos" className="ci-section">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.how.eyebrow}</div>
            <h2 className="ci-h2">{t.how.title}</h2>
          </div>
          <div className="ci-grid-4">
            {t.how.items.map(i => (
              <div key={i.label} className="ci-method">
                <div className="ci-method__label">{i.label}</div>
                <p className="ci-p">{i.text}</p>
              </div>
            ))}
          </div>
          <div className="ci-ai">
            <blockquote>{t.how.aiQuote}</blockquote>
            <p className="ci-p">{t.how.aiText}</p>
          </div>
        </div>
      </section>

      {/* 9 · Who it is for */}
      <section id="para-quien" className="ci-section">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.who.eyebrow}</div>
            <h2 className="ci-h2">{t.who.title}</h2>
            <p className="ci-p ci-p--body">{t.who.proof}</p>
          </div>
          <div className="ci-grid-3">
            {t.who.cards.map(c => (
              <div key={c.title} className="ci-audience">
                <div className="ci-audience__title">{c.title}</div>
                <p className="ci-p">{c.text}</p>
                <Link to={c.href}>{c.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 · Plans */}
      <section id="planes" className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head" style={{ maxWidth: 860 }}>
            <div className="ci-eyebrow">{t.plans.eyebrow}</div>
            <h2 className="ci-h2">{t.plans.title}</h2>
            <p className="ci-p">{t.plans.lead}</p>
          </div>
          <div className="ci-grid-3" style={{ alignItems: 'stretch' }}>
            {plans.map(p => (
              <div key={p.key} className={`ci-plan${p.featured ? ' ci-plan--featured' : ''}`}>
                <div className="ci-plan__badge">{p.badge}</div>
                <div className="ci-plan__name">{p.data.name}</div>
                <div className="ci-plan__price">{p.amount}</div>
                <ul>
                  {p.data.items.map(i => <li key={i}><span aria-hidden="true">—</span><span>{i}</span></li>)}
                </ul>
                <a
                  href="#muestra"
                  className={`ci-btn ${p.gold ? 'ci-btn--gold' : 'ci-btn--ghost'}`}
                  onClick={() => pickInterest(p.key === 'tailored' ? 'analyst' : p.key, 'plans')}
                >
                  {p.data.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="ci-note">{t.plans.billing}</p>
        </div>
      </section>

      {/* 11 · Sample bulletin */}
      <section id="muestra" className="ci-section ci-sample">
        <div className="ci-sample__inner">
          <div className="ci-sample__copy">
            <div className="ci-eyebrow">{t.sample.eyebrow}</div>
            <h2 className="ci-h2">{t.sample.title}</h2>
            <p className="ci-p">{t.sample.text}</p>
            <div className="ci-sla">{t.sample.sla}</div>
          </div>

          <form className="ci-form" onSubmit={handleSubmit} noValidate={false}>
            {status === 'ok' ? (
              <div className="ci-alert ci-alert--ok" role="status">{t.sample.ok(form.correo)}</div>
            ) : (
              <>
                <div className="ci-form__row">
                  <div className="ci-field">
                    <label htmlFor="ci-nombre">{t.sample.name}</label>
                    <input id="ci-nombre" type="text" required autoComplete="name" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="ci-field">
                    <label htmlFor="ci-org">{t.sample.org}</label>
                    <input id="ci-org" type="text" required autoComplete="organization" value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} />
                  </div>
                </div>
                <div className="ci-field">
                  <label htmlFor="ci-correo">{t.sample.email}</label>
                  <input id="ci-correo" type="email" required autoComplete="email" value={form.correo} onChange={e => setForm({ ...form, correo: e.target.value })} aria-describedby={isFreeEmail ? 'ci-freemail' : undefined} />
                  {isFreeEmail && <span id="ci-freemail" className="ci-note">{t.sample.freeMail}</span>}
                </div>
                <div className="ci-field">
                  <label htmlFor="ci-interest">{t.sample.interest}</label>
                  <select id="ci-interest" value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value as Interest })}>
                    {(Object.keys(t.sample.interests) as Interest[]).map(k => <option key={k} value={k}>{t.sample.interests[k]}</option>)}
                  </select>
                </div>
                <label className="ci-check">
                  <input type="checkbox" checked={form.weekly} onChange={e => setForm({ ...form, weekly: e.target.checked })} />
                  <span>{t.sample.weekly}</span>
                </label>
                {status === 'error' && <div className="ci-alert ci-alert--err" role="alert">{t.sample.err}</div>}
                <button type="submit" className="ci-btn ci-btn--gold" disabled={status === 'sending'}>
                  {status === 'sending' ? t.sample.sending : t.sample.submit}
                </button>
                <p className="ci-note">
                  {t.sample.privacy} <Link to="/politica-privacidad">{t.sample.privacyLink}</Link>
                </p>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Field guides */}
      <section id="guias" className="ci-section">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.guides.eyebrow}</div>
            <h2 className="ci-h2">{t.guides.title}</h2>
            <p className="ci-p">{t.guides.note}</p>
          </div>
          <div className="ci-grid-3">
            {GUIDES.map(g => (
              <div key={g.slug} className="ci-card">
                <div className="ci-method__label" style={{ fontSize: 12 }}>{g.eyebrow}</div>
                <div className="ci-card__title">{g.title}</div>
                <p className="ci-p" style={{ flexGrow: 1 }}>{g.description}</p>
                <Link to={`/cecom-intel/${g.slug}`} hrefLang="en">{t.guides.read} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (mirrored as FAQPage structured data in postbuild.js) */}
      <section id="preguntas" className="ci-section ci-alt">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.faq.eyebrow}</div>
            <h2 className="ci-h2">{t.faq.title}</h2>
          </div>
          <div className="ci-col ci-faq">
            {t.faq.items.map(f => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p className="ci-p ci-p--body">{f.a}</p>
                {'link' in f && f.link && <p className="ci-p" style={{ marginTop: 10 }}><Link to={f.link.href}>{f.link.label} →</Link></p>}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related free resources */}
      <section className="ci-section ci-alt" style={{ paddingTop: 56, paddingBottom: 56 }} aria-labelledby="ci-resources">
        <div className="ci-stack" style={{ gap: 20 }}>
          <div className="ci-head" style={{ gap: 8 }}>
            <div id="ci-resources" className="ci-eyebrow">{t.resources.eyebrow}</div>
            <p className="ci-note">{t.resources.note}</p>
          </div>
          <div className="ci-resources">
            {t.resources.links.map(r => <Link key={r.href} to={r.href}>{r.label}</Link>)}
          </div>
        </div>
      </section>

      {/* 12 · Institutional strip (the global CSSG footer follows) */}
      <div className="ci-footer">
        <div className="ci-footer__inner">
          <div className="ci-footer__org">
            <img src="/cecom-intel/cssg-eagle.webp" alt="CSSG" width="230" height="196" loading="lazy" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Company of Security and Service Global, C.A.</div>
              <div className="ci-note">{t.footer.address}</div>
            </div>
          </div>
          <div className="ci-footer__right">
            <a href="mailto:gerencia@globalservices-ven.com">gerencia@globalservices-ven.com</a>
            <div className="ci-note">ISO 9001:2015 · Cyber Essentials · © {new Date().getFullYear()} CSSG Global</div>
          </div>
        </div>
      </div>

    </div>
  );
}
