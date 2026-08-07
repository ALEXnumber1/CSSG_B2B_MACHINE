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
// v2 — "The Distinction": credential-led, scarcity-driven design on
// CSSG's actual brand tokens (#0B0B0F, sky-500 electric blue, gold
// reserved for exclusivity accents) — deliberately distinct from the
// navy/gold editorial dossier used on the other landings.
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
const BORDER = 'rgba(255,255,255,0.08)';
const BLUE = '#0EA5E9';
const ACCENT = '#8FAFC7'; // sober, desaturated reading of the brand blue — reserved for headline text
const GOLD = '#EAB308';
const HEAD_FONT = "'Space Grotesk', 'Inter', sans-serif";
const BG_IMAGE = "url('/consulting_b2b.webp')";

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
  { src: '/iso-9001-badge.webp', title: 'ISO 9001:2015', sub: 'Cert. 580181', note: 'Quality management certified — independently audited, not self-declared.' },
  { src: '/cyber-essentials-badge.webp', title: 'Cyber Essentials', sub: 'Certified', note: 'Baseline cyber-hygiene verified for our operational technology.' },
  { src: '/ifpo-corporate-member.webp', title: 'IFPO', sub: 'Corporate Member', note: 'International Foundation for Protection Officers membership.' },
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* watermark background — faint, desaturated, corporate photo texture */}
      <div className="fixed inset-0 pointer-events-none -z-0" style={{
        backgroundImage: BG_IMAGE, backgroundSize: 'cover', backgroundPosition: 'center 30%',
        filter: 'grayscale(1) brightness(0.5)', opacity: 0.1,
      }} />
      <div className="fixed inset-0 pointer-events-none -z-0" style={{ background: `linear-gradient(180deg, ${BG}CC 0%, ${BG}F2 40%, ${BG} 75%)` }} />

      {/* ambient glow */}
      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/15 rounded-full blur-[130px] opacity-50" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[140px] opacity-25" />
      </div>

      {/* ═══ MINI NAV ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5" style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-8 w-8 object-contain" />
          <span className="font-black tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors" style={{ background: BLUE, color: BG }}>
          Request assessment <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ═══ 1. HERO — split, credential-led ═══ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-black uppercase tracking-widest mb-6" style={{ borderColor: `${GOLD}55`, background: `${GOLD}12`, color: GOLD }}>
              <Award className="w-3.5 h-3.5" /> One of the few ISO 9001-certified security firms in Venezuela
            </span>
            <h1 className="font-semibold tracking-tight leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.1rem, 4.4vw, 3.4rem)', fontFamily: HEAD_FONT }}>
              Most private security companies sell guards.
              <span className="block mt-1 text-white">CSSG sells a scheme you can <span style={{ color: ACCENT }}>defend</span>.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mb-8">
              Corporate security services and security consulting for multinational organizations operating
              in Venezuela — built on certification, documented procedure and a methodology your board can
              actually audit.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl px-7 py-4 font-black text-base transition-all hover:-translate-y-0.5" style={{ background: BLUE, color: BG }}>
                Request a confidential assessment <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">No obligation · Confidential</p>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.15 }} className="relative">
            <div className="backdrop-blur-xl rounded-2xl p-7 sm:p-8" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-xs font-black uppercase tracking-widest mb-6" style={{ color: GOLD }}>Verified credentials</p>
              <div className="space-y-5">
                {credentials.map((c) => (
                  <div key={c.title} className="flex items-center gap-4">
                    <img src={c.src} alt={c.title} className="h-12 w-12 object-contain shrink-0" loading="lazy" />
                    <div>
                      <p className="font-black text-sm text-white">{c.title} <span className="text-gray-500 font-medium">· {c.sub}</span></p>
                      <p className="text-xs text-gray-500">{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}` }}>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">G7 diplomatic standard</span>
                <ShieldCheck className="w-5 h-5" style={{ color: BLUE }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 2. STAT BAR ═══ */}
      <section className="relative border-y py-14 px-4 sm:px-6" style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
              <p className="font-semibold tabular-nums" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', color: ACCENT, fontFamily: HEAD_FONT }}>
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs text-gray-500 mt-2 max-w-[16ch] mx-auto leading-snug">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ 3. THE DIFFERENCE — comparison ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: ACCENT }}>The difference</p>
            <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontFamily: HEAD_FONT }}>
              What separates a certified security partner from the rest of the market.
            </h2>
          </motion.div>
          <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
            <div className="grid grid-cols-2">
              <div className="p-5 text-center font-black text-xs uppercase tracking-widest text-gray-500" style={{ borderBottom: `1px solid ${BORDER}`, borderRight: `1px solid ${BORDER}` }}>Typical providers</div>
              <div className="p-5 text-center font-black text-xs uppercase tracking-widest" style={{ borderBottom: `1px solid ${BORDER}`, color: BLUE, background: `${BLUE}0d` }}>CSSG</div>
            </div>
            {comparison.map((row, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }} className="grid grid-cols-2">
                <div className="p-5 flex items-start gap-3" style={{ borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : 'none', borderRight: `1px solid ${BORDER}` }}>
                  <XIcon className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-400">{row.them}</span>
                </div>
                <div className="p-5 flex items-start gap-3" style={{ borderBottom: i < comparison.length - 1 ? `1px solid ${BORDER}` : 'none', background: `${BLUE}08` }}>
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                  <span className="text-sm text-white font-medium">{row.us}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. OUR SERVICE ═══ */}
      <section className="relative py-24 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Our service</p>
            <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)', fontFamily: HEAD_FONT }}>
              A structured, auditable corporate security consulting engagement.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${BLUE}15` }}>
                  <s.icon className="w-5 h-5" style={{ color: BLUE }} />
                </div>
                <h3 className="font-black text-base mb-2 text-white">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA + FORM ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden" id="assessment">
        <div className="max-w-lg mx-auto relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="rounded-2xl p-8 sm:p-10" style={{ background: CARD, border: `1px solid ${BLUE}44`, boxShadow: `0 0 60px ${BLUE}15` }}>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-5" style={{ background: `${GOLD}15`, color: GOLD }}>
                <Award className="w-3 h-3" /> Limited corporate accounts
              </span>
              <h2 className="font-semibold text-xl mb-2 text-white" style={{ fontFamily: HEAD_FONT }}>Request a confidential assessment</h2>
              <p className="text-sm text-gray-400 mb-7">
                A senior consultant reviews your current security scheme or contractor and responds within 12 business hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text" name="nombre" required placeholder="Full name *" value={formData.nombre} onChange={handleChange}
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <input
                  type="text" name="cargo" placeholder="Position (optional)" value={formData.cargo} onChange={handleChange}
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <input
                  type="text" name="empresa" required placeholder="Company / organization *" value={formData.empresa} onChange={handleChange}
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <div>
                  <input
                    type="email" name="correo" required placeholder="Corporate email *" value={formData.correo} onChange={handleChange}
                    className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {isFreeEmail && (
                    <p className="text-xs mt-1.5" style={{ color: BLUE }}>Given the confidential nature of this engagement, we recommend using your corporate email.</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-400 bg-red-500/10 rounded-lg p-3 text-center">
                    Error: {errorMsg || 'Please try again or contact us directly.'}
                  </p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-black text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: BLUE, color: BG }}
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                  ) : (
                    <>Request assessment <ArrowRight className="w-5 h-5" /></>
                  )}
                </motion.button>
              </form>
              <p className="mt-4 text-xs text-gray-500 text-center">
                No cost, no contracting obligation. A senior consultant will contact you within 12 business hours.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 6. TESTIMONIAL ═══ */}
      <section className="relative py-20 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto text-center">
          <p className="text-2xl leading-relaxed font-medium text-white">
            <span style={{ color: GOLD }}>&ldquo;</span>CSSG's assessment uncovered duplicated supervision charges we had been paying for two years. The conversation with our contractor changed entirely once we had it in writing.<span style={{ color: GOLD }}>&rdquo;</span>
          </p>
          <p className="mt-6 text-sm text-gray-400 font-bold">— Regional Security Manager, multinational industrial group</p>
          <p className="text-xs text-gray-600">(identity withheld under confidentiality protocol)</p>
        </motion.div>
      </section>

      {/* ═══ 7. FAQ ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: ACCENT }}>Frequently asked questions</p>
            <h2 className="font-semibold tracking-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontFamily: HEAD_FONT }}>Before you request your assessment</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="font-bold text-sm sm:text-base text-white">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} style={{ color: BLUE }} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-400">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative py-10 px-4 text-center border-t" style={{ borderColor: BORDER }}>
        <img src="/logo.webp" alt="CSSG" className="h-10 w-10 object-contain mx-auto mb-3" />
        <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">CSSG Global</p>
        <p className="text-xs text-gray-600">Corporate & Diplomatic Security · 17+ years serving without incident</p>
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
