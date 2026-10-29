import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { JsonLd, useCecomIntelFonts } from '../../components/cecom-intel/CecomIntelMark';
import { PAGES, type Lang } from './content';
import { PARTNERS, type PartnerType } from './partners';
import { CiFooter, SubpageNav, usePageMeta } from './shell';
import '../../styles/cecom-intel.css';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** In-country partner program for global security firms, insurers and travel-risk companies. */
export default function CecomIntelPartners({ lang }: { lang: Lang }) {
  const t = PARTNERS[lang];
  useCecomIntelFonts();
  usePageMeta(t.meta.title, t.meta.description, lang);

  const [form, setForm] = useState({ nombre: '', empresa: '', correo: '', type: 'security_firm' as PartnerType, message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const mensaje = `[CECOM-Intel socios ${lang.toUpperCase()}] Tipo: ${PARTNERS.es.form.types[form.type]}${form.message ? ` | ${form.message}` : ''}`;
    try {
      const [{ saveLead }, { sendLeadNotification }] = await Promise.all([import('../../lib/leads'), import('../../lib/email')]);
      await saveLead({ nombre: form.nombre, correo: form.correo, empresa: form.empresa, mensaje, fuente: 'cecom_intel_partners', score: 60 });
      try {
        await sendLeadNotification({ nombre: form.nombre, email: form.correo, empresa: form.empresa, fuente: 'cecom_intel_partners', mensaje });
      } catch (notifyErr) {
        console.warn('[CECOM-Intel partners] notification failed (lead is saved):', notifyErr);
      }
      try { (window as GtagWindow).gtag?.('event', 'generate_lead', { form: 'cecom_intel_partners', partner_type: form.type, page_language: lang }); } catch { /* analytics must never break the page */ }
      setStatus('ok');
    } catch (err) {
      console.error('[CECOM-Intel partners] lead not saved:', err);
      setStatus('error');
    }
  };

  const url = `https://cssg-global.com${PAGES.partners[lang]}`;

  return (
    <div className="ci-zone pt-20">
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: t.hero.title,
          serviceType: 'In-country security partner',
          description: t.meta.description,
          url,
          inLanguage: lang,
          provider: { '@type': 'Organization', '@id': 'https://cssg-global.com/#organization', name: 'Company Of Security And Service Global C.A.' },
          areaServed: { '@type': 'Country', name: 'Venezuela' },
          audience: { '@type': 'BusinessAudience', audienceType: t.who.cards.map(c => c.title).join(', ') },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: lang,
          mainEntity: t.faq.items.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
      ]} />

      <SubpageNav lang={lang} page="partners" />

      <header className="ci-section ci-guide__hero">
        <div className="ci-guide__wrap">
          <p className="ci-eyebrow">{t.hero.eyebrow}</p>
          <h1 className="ci-guide__title">{t.hero.title}</h1>
          <p className="ci-p ci-p--lead" style={{ fontStyle: 'italic', color: 'var(--ci-gold-light)' }}>{t.hero.motto}</p>
          <p className="ci-p ci-p--body">{t.hero.lead}</p>
          <div className="ci-hero__ctas">
            <a href="#contacto" className="ci-btn ci-btn--gold">{t.hero.cta}</a>
            <Link to={PAGES.methodology[lang]} className="ci-btn ci-btn--ghost">{t.hero.ctaMethod}</Link>
          </div>
        </div>
      </header>

      <section className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.who.eyebrow}</div>
            <h2 className="ci-h2">{t.who.title}</h2>
          </div>
          <div className="ci-grid-4">
            {t.who.cards.map(c => (
              <div key={c.title} className="ci-audience">
                <div className="ci-audience__title">{c.title}</div>
                <p className="ci-p">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.capabilities.eyebrow}</div>
            <h2 className="ci-h2">{t.capabilities.title}</h2>
          </div>
          <div className="ci-grid-3">
            {t.capabilities.items.map(i => (
              <div key={i.label} className="ci-method">
                <div className="ci-method__label">{i.label}</div>
                <p className="ci-p">{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.coverage.eyebrow}</div>
            <h2 className="ci-h2">{t.coverage.title}</h2>
          </div>
          <div className="ci-table-wrap">
            <table className="ci-table">
              <thead><tr><th scope="col">{t.coverage.head.area}</th><th scope="col">{t.coverage.head.how}</th></tr></thead>
              <tbody>
                {t.coverage.rows.map(r => <tr key={r.area}><th scope="row">{r.area}</th><td>{r.how}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-stack">
          <div className="ci-head" style={{ maxWidth: 860 }}>
            <div className="ci-eyebrow">{t.sla.eyebrow}</div>
            <h2 className="ci-h2">{t.sla.title}</h2>
            <p className="ci-p">{t.sla.lead}</p>
          </div>
          <div className="ci-table-wrap">
            <table className="ci-table">
              <thead><tr><th scope="col">{t.sla.head.item}</th><th scope="col">{t.sla.head.level}</th></tr></thead>
              <tbody>
                {t.sla.rows.map(r => <tr key={r.item}><th scope="row">{r.item}</th><td>{r.level}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="ci-section ci-alt">
        <div className="ci-stack">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.cases.eyebrow}</div>
            <h2 className="ci-h2">{t.cases.title}</h2>
          </div>
          <div className="ci-grid-2">
            {t.cases.items.map(c => (
              <div key={c.tag} className="ci-card">
                <div className="ci-method__label" style={{ fontSize: 12 }}>{c.tag}</div>
                <p className="ci-p ci-p--body">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="ci-note">{t.cases.note}</p>
        </div>
      </section>

      <section className="ci-section">
        <div className="ci-wrap ci-split">
          <div className="ci-head">
            <div className="ci-eyebrow">{t.compliance.eyebrow}</div>
            <h2 className="ci-h2">{t.compliance.title}</h2>
            <p className="ci-p">{t.compliance.lead}</p>
          </div>
          <div className="ci-col">
            <ul className="ci-list" style={{ gap: 0 }}>
              {t.compliance.items.map(i => (
                <li key={i} style={{ padding: '14px 0' }}><span className="ci-dash" aria-hidden="true">—</span><p className="ci-p ci-p--body">{i}</p></li>
              ))}
            </ul>
            <p className="ci-note">{t.compliance.billing}</p>
          </div>
        </div>
      </section>

      <section className="ci-section ci-alt">
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
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="ci-section ci-sample">
        <div className="ci-sample__inner">
          <div className="ci-sample__copy">
            <div className="ci-eyebrow">{t.form.eyebrow}</div>
            <h2 className="ci-h2">{t.form.title}</h2>
            <p className="ci-p">{t.form.text}</p>
          </div>
          <form className="ci-form" onSubmit={handleSubmit}>
            {status === 'ok' ? (
              <div className="ci-alert ci-alert--ok" role="status">{t.form.ok(form.correo)}</div>
            ) : (
              <>
                <div className="ci-form__row">
                  <div className="ci-field">
                    <label htmlFor="cp-nombre">{t.form.name}</label>
                    <input id="cp-nombre" type="text" required autoComplete="name" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                  </div>
                  <div className="ci-field">
                    <label htmlFor="cp-org">{t.form.org}</label>
                    <input id="cp-org" type="text" required autoComplete="organization" value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} />
                  </div>
                </div>
                <div className="ci-field">
                  <label htmlFor="cp-correo">{t.form.email}</label>
                  <input id="cp-correo" type="email" required autoComplete="email" value={form.correo} onChange={e => setForm({ ...form, correo: e.target.value })} />
                </div>
                <div className="ci-field">
                  <label htmlFor="cp-type">{t.form.type}</label>
                  <select id="cp-type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as PartnerType })}>
                    {(Object.keys(t.form.types) as PartnerType[]).map(k => <option key={k} value={k}>{t.form.types[k]}</option>)}
                  </select>
                </div>
                <div className="ci-field">
                  <label htmlFor="cp-msg">{t.form.message}</label>
                  <textarea id="cp-msg" maxLength={2000} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                {status === 'error' && <div className="ci-alert ci-alert--err" role="alert">{t.form.err}</div>}
                <button type="submit" className="ci-btn ci-btn--gold" disabled={status === 'sending'}>
                  {status === 'sending' ? t.form.sending : t.form.submit}
                </button>
                <p className="ci-note">{t.form.privacy} <Link to="/politica-privacidad">{t.form.privacyLink}</Link></p>
              </>
            )}
          </form>
        </div>
      </section>

      <CiFooter lang={lang} />
    </div>
  );
}
