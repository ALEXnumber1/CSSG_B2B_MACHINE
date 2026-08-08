import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShieldCheck, BadgeCheck, Award, ArrowRight, Check, X as XIcon, Loader2, ChevronDown, Radar,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

// ─────────────────────────────────────────────────────────────
// LP3 — CORPORATE SECURITY & SECURITY CONSULTING (EN)
// v3 — "The Distinction", editorial: full-bleed photography with a
// dark wash, Playfair Display serif headlines, palette reduced to
// black / white / a single muted gold accent (no blue). Distinct
// from the other landings through content (credentials, comparison,
// scarcity) rather than a competing accent color.
// Service-presentation page, no downloadable lead magnet — captures
// the lead directly into a consultative email sequence.
// Primary persona: Julio ("El Estratega"); secondary resonance with
// Ricardo ("El Guardián" — fears an unauditable scheme).
// Keywords: corporate security services, corporate security, security
// consulting, private security contractor companies, private protection,
// private security companies.
// ─────────────────────────────────────────────────────────────

const BG = '#0B0B0F';
const CARD = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.09)';
const GOLD = '#C9A24B';
const GOLD_H = '#DDB65F';
const MUTED = '#9CA3AF';

const SERIF = "'Playfair Display', serif";

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%23C9A24B' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E")`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

function Counter({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = value.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, decimals]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  { to: 17, suffix: '+', label: 'Years without a registered incident' },
  { to: 1, suffix: ' of few', label: 'ISO 9001-certified security firms in Venezuela' },
  { to: 100, suffix: '%', label: 'Confidential engagement, NDA available' },
  { to: 12, suffix: 'h', label: 'Response time to a qualified inquiry' },
];

const comparison = [
  { them: 'Sells personnel and hours on-site', us: 'Sells a documented, auditable security scheme' },
  { them: 'No verifiable certification behind the pitch', us: 'ISO 9001:2015 certified — one of the few in the country' },
  { them: 'Reports are informal, verbal, after the fact', us: 'KPI-based reporting, referenced to ISO 31000 / ASIS ORM.1' },
  { them: 'Any client, any budget, no selection criteria', us: 'A limited number of corporate accounts, by design' },
];

const services = [
  {
    icon: BadgeCheck,
    title: 'Legal & financial standing audits',
    body: 'We verify your current or prospective contractor\'s operating permit, liability insurance, and standing with Venezuelan labor and social-security obligations — and flag exactly where the exposure sits before it becomes your liability.',
  },
  {
    icon: ShieldCheck,
    title: 'Contract & service-level redesign',
    body: 'We rebuild your security contract around measurable KPIs, immediate-replacement clauses, itemized billing and clear exit terms — replacing vague "24-hour coverage" language with terms you can actually enforce.',
  },
  {
    icon: Radar,
    title: 'On-site operational audits',
    body: 'Our consultants verify perimeter, access control, staff rotation history and documented emergency protocols in person — the same criteria we apply before putting our own name behind a security scheme.',
  },
];

const credentials = [
  { src: '/iso-9001-badge-cropped.webp', title: 'ISO 9001:2015', sub: 'Cert. 580181', note: 'Quality management certified — independently audited, not self-declared.' },
  { src: '/cyber-essentials-badge-transparent.webp', title: 'Cyber Essentials', sub: 'Certified', note: 'Baseline cyber-hygiene verified for our operational technology.' },
  { src: '/ifpo-corporate-member-transparent.webp', title: 'IFPO', sub: 'Corporate Member', note: 'International Foundation for Protection Officers membership.' },
];

const FAQS = [
  {
    q: 'Is the initial assessment really free, and does it come with any obligation?',
    a: 'Yes. A senior consultant reviews your current scheme or contractor at no cost and with no obligation to contract further services.',
  },
  {
    q: 'What makes CSSG\'s assessment different from a generic vendor audit?',
    a: 'It is built on the same due-diligence criteria our senior consultants apply before recommending — or auditing — any of the private security contractor companies we review, referenced against ISO 31000:2018 and ASIS ORM.1:2017 — not a generic checklist.',
  },
  {
    q: 'How is CSSG different from other private security companies in Venezuela?',
    a: 'Most private security companies sell personnel. CSSG sells corporate security services built on documented procedure: 17+ years without a registered incident, ISO 9001:2015 certification, and a risk methodology referenced to ISO 31000 and ASIS ORM.1 — the same standard we apply to embassies and multinationals under G7 protocol.',
  },
  {
    q: 'Can you audit a contractor we already have, instead of proposing a new one?',
    a: 'Yes — most of our corporate clients start exactly there. We assess your incumbent provider first; replacing them is never the assumed outcome.',
  },
  {
    q: 'Do you work with companies outside Venezuela?',
    a: 'Yes. We regularly support overseas security managers and regional directors at multinational corporations and diplomatic missions operating in Venezuela, with English-speaking points of contact.',
  },
  {
    q: 'Why do you limit the number of corporate accounts you take on?',
    a: 'Zero incidents in 17+ years is a function of capacity, not luck. We would rather decline an account than dilute the oversight our standard requires.',
  },
  {
    q: 'What happens to my data?',
    a: 'We do not share your information with third parties. It is stored securely and you may request its deletion at any time by writing to gerencia@globalservices-ven.com.',
  },
];

interface FormData {
  nombre: string;
  cargo: string;
  empresa: string;
  correo: string;
}

export default function CorporateSecurity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', empresa: '', correo: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Corporate Security Services & Security Consulting in Venezuela | CSSG';
    const desc = 'Corporate security services, security consulting and private protection for multinational companies in Venezuela. Vet private security contractor companies with our ISO 31000 methodology. Request a confidential assessment — CSSG, 17+ years without incident.';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', desc);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFreeEmail = (() => {
    const domain = formData.correo.split('@')[1]?.toLowerCase();
    return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `[LP CORPORATE SECURITY EN] Requested: Confidential Corporate Security Assessment${formData.cargo ? ` | Position: ${formData.cargo}` : ''}`,
        fuente: 'lp_corporate_security_en',
        score: 45,
        estado: 'nuevo',
      }]).select('id').single();

      if (insertError) {
        if (insertError.code === '23505') {
          console.warn('Duplicate lead email, treating as already registered:', insertError);
          try {
            await sendLeadNotification({
              nombre: formData.nombre,
              email: formData.correo,
              empresa: formData.empresa,
              fuente: 'lp_corporate_security_en',
              cargo: formData.cargo,
              mensaje: '[REPEAT REQUEST] Confidential Corporate Security Assessment',
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/en/corporate-security-consulting/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true } });
          return;
        }
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.empresa,
          fuente: 'lp_corporate_security_en',
          cargo: formData.cargo,
        });
        if (!emailRes.success) console.warn('Email Notification Warning:', emailRes.error);
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'corporate_security_en', formData.empresa);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      navigate('/en/corporate-security-consulting/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection or database error.';
      console.error('Error submitting LP Corporate Security EN form:', err);
      setErrorMsg(message);
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />

      {/* ═══ MINI NAV ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5" style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-8 w-8 object-contain" />
          <span className="font-semibold tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all hover:-translate-y-0.5" style={{ background: GOLD, color: BG, borderRadius: '2px' }}>
          Request assessment
        </button>
      </header>

      {/* ═══ 1. HERO — full-bleed photography, dark wash ═══ */}
      <header className="relative min-h-[94vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/svc_ejecutivos.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'saturate(0.7)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(11,11,15,.97) 0%, rgba(11,11,15,.93) 45%, rgba(11,11,15,.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.5) 0%, transparent 35%, rgba(11,11,15,.9) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />

        <motion.div className="relative max-w-3xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-4 h-4" style={{ color: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: GOLD, letterSpacing: '.2em' }}>
              One of the few ISO 9001-certified security firms in Venezuela
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(2.1rem, 4.6vw, 3.5rem)', lineHeight: 1.18, textShadow: '0 2px 30px rgba(0,0,0,.5)' }}>
            Most private security companies sell guards.
            <br />CSSG sells a scheme you can defend.
          </h1>
          <p className="mb-8 text-gray-300" style={{ fontSize: '1.1rem', maxWidth: '620px' }}>
            Corporate security services and security consulting for multinational organizations operating
            in Venezuela — built on certification, documented procedure and a methodology your board can
            actually audit.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button onClick={scrollToForm}
              className="inline-flex items-center font-semibold px-8 py-4 text-base transition-all hover:-translate-y-0.5"
              style={{ background: GOLD, color: BG, borderRadius: '2px' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Request a confidential assessment <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold">No obligation · Confidential</p>
          </div>
        </motion.div>
      </header>

      {/* ═══ 2. CREDENTIALS ═══ */}
      <section className="relative py-16 px-6 overflow-hidden" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase font-semibold mb-10" style={{ color: MUTED, letterSpacing: '.18em' }}>Verified credentials — not self-declared</p>
          <div className="grid sm:grid-cols-3 gap-8">
            {credentials.map((c) => (
              <div key={c.title} className="text-center">
                <div className="h-24 mx-auto mb-4 flex items-center justify-center">
                  <img src={c.src} alt={c.title} className="max-h-full max-w-[140px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]" loading="lazy" />
                </div>
                <p className="font-semibold text-sm text-white">{c.title} <span className="text-gray-500 font-normal">· {c.sub}</span></p>
                <p className="text-xs text-gray-500 mt-1 max-w-[26ch] mx-auto">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. STAT BAR ═══ */}
      <section className="relative py-14 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <p className="tabular-nums" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: GOLD }}>
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs text-gray-500 mt-2 max-w-[16ch] mx-auto leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 4. THE DIFFERENCE — comparison ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>The difference</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              What separates a certified security partner from the rest of the market.
            </h2>
          </motion.div>
          <div className="overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
            <div className="grid grid-cols-2">
              <div className="p-5 text-center font-semibold text-xs uppercase tracking-widest text-gray-500" style={{ borderBottom: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}` }}>Typical providers</div>
              <div className="p-5 text-center font-semibold text-xs uppercase tracking-widest" style={{ borderBottom: `1px solid ${BORDER}`, color: GOLD, background: `${GOLD}0d` }}>CSSG</div>
            </div>
            {comparison.map((row, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="grid grid-cols-2">
                <div className="p-5 flex items-start gap-3" style={{ borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : 'none', borderRight: `1px solid ${BORDER}` }}>
                  <XIcon className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">{row.them}</span>
                </div>
                <div className="p-5 flex items-start gap-3" style={{ borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : 'none', background: `${GOLD}08` }}>
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span className="text-sm text-white">{row.us}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. OUR SERVICE ═══ */}
      <section className="relative py-24 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>Our service</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              A structured, auditable corporate security consulting engagement.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <s.icon className="w-6 h-6 mb-4" style={{ color: GOLD }} />
                <h3 className="font-semibold text-base mb-2 text-white">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA + FORM ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden" id="assessment">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />
        <div className="relative max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="p-8 sm:p-10" style={{ background: CARD, border: `1px solid ${GOLD}55` }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-5" style={{ border: `1px solid ${GOLD}66`, color: GOLD }}>
                <Award className="w-3 h-3" /> Limited corporate accounts
              </span>
              <h2 className="mb-2 text-white" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '1.5rem' }}>Request a confidential assessment</h2>
              <p className="text-sm text-gray-400 mb-7">
                A senior consultant reviews your current security scheme or contractor and responds within 12 business hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text" name="nombre" required placeholder="Full name *" value={formData.nombre} onChange={handleChange}
                  className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}
                />
                <input
                  type="text" name="cargo" placeholder="Position (optional)" value={formData.cargo} onChange={handleChange}
                  className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}
                />
                <input
                  type="text" name="empresa" required placeholder="Company / organization *" value={formData.empresa} onChange={handleChange}
                  className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}
                />
                <div>
                  <input
                    type="email" name="correo" required placeholder="Corporate email *" value={formData.correo} onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    style={{ background: BG, border: `1px solid ${BORDER}` }}
                  />
                  {isFreeEmail && (
                    <p className="text-xs mt-1.5" style={{ color: GOLD }}>Given the confidential nature of this engagement, we recommend using your corporate email.</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400 bg-red-500/10 p-3 text-center">
                    Error: {errorMsg || 'Please try again or contact us directly.'}
                  </p>
                )}

                <button
                  type="submit" disabled={status === 'loading'}
                  className="w-full py-4 font-semibold text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                  style={{ background: GOLD, color: BG }}
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                  ) : (
                    <>Request assessment <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-500 text-center">
                No cost, no contracting obligation. A senior consultant will contact you within 12 business hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIAL ═══ */}
      <section className="relative py-20 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontSize: '3rem', lineHeight: 0, verticalAlign: '-0.4rem' }}>&ldquo;</span>
            CSSG's assessment uncovered duplicated supervision charges we had been paying for two years. The conversation with our contractor changed entirely once we had it in writing.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm text-gray-400">
            — Regional Security Manager, multinational industrial group
            <span className="block text-xs mt-1 text-gray-600">(identity withheld under confidentiality protocol)</span>
          </cite>
        </motion.div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>Frequently asked questions</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.1rem)' }}>Before you request your assessment</h2>
          </motion.div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 py-5 text-left">
                  <span className="font-semibold text-sm sm:text-base text-white">{f.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: GOLD }} />
                </button>
                {openFaq === i && (
                  <p className="text-sm pb-5 text-gray-400" style={{ maxWidth: '640px' }}>{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative py-10 px-4 text-center border-t" style={{ borderColor: BORDER }}>
        <img src="/logo.webp" alt="CSSG" className="h-10 w-10 object-contain mx-auto mb-3" />
        <p className="font-semibold mb-2" style={{ color: GOLD }}>CSSG GLOBAL</p>
        <p className="text-xs text-gray-500">Corporate & Diplomatic Security · 17+ years serving without incident</p>
        <p className="text-xs text-gray-600 mt-3">
          CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
        <p className="text-xs text-gray-600 mt-2">
          <a href="/politica-privacidad" className="hover:text-gray-400 transition-colors">Privacy policy</a>
          <span className="mx-2">·</span>
          <a href="/terminos-condiciones" className="hover:text-gray-400 transition-colors">Terms & conditions</a>
          <span className="mx-2">·</span>
          <a href="mailto:gerencia@globalservices-ven.com" className="hover:text-gray-400 transition-colors">gerencia@globalservices-ven.com</a>
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
