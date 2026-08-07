import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, SearchCheck, ClipboardList, Award, ArrowRight, Check, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

// ─────────────────────────────────────────────────────────────
// LP3 — CORPORATE SECURITY & SECURITY CONSULTING (EN)
// Service-presentation landing (no downloadable lead magnet) — captures
// the lead directly into a consultative email sequence. Editorial
// "Estratega" treatment — same visual language as EsrmReadiness.tsx /
// ConsultoriaRiesgos.tsx. Primary persona: Julio ("El Estratega" —
// overseas/regional security manager, ISO/ASIS-driven); secondary
// resonance with Ricardo ("El Guardián" — fears an audit he can't
// defend in front of his own leadership).
// Keywords: corporate security services, corporate security, security
// consulting, private security contractor companies, private protection,
// private security companies.
// ─────────────────────────────────────────────────────────────

const NAVY = '#0A1628';
const SLATE = '#16233A';
const BORDER = '#233754';
const WHITE = '#F5F7FA';
const MUTED = '#93A4BE';
const GOLD = '#C9A24B';
const GOLD_H = '#DDB65F';
const ICE = '#7FB3D5';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%237FB3D5' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E")`;

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function CornerFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mark = 'absolute w-3 h-3';
  return (
    <div className={`relative ${className}`}>
      <span className={`${mark} -top-px -left-px border-t border-l`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -top-px -right-px border-t border-r`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -bottom-px -left-px border-b border-l`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -bottom-px -right-px border-b border-r`} style={{ borderColor: GOLD }} />
      {children}
    </div>
  );
}

function SectionNumeral({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="hidden md:block select-none" style={{
      fontFamily: "'Playfair Display', serif", fontSize: '7.5rem', lineHeight: 1, fontWeight: 600,
      color: 'transparent', WebkitTextStroke: `1px ${BORDER}`, position: 'absolute', top: '-1.2rem', right: '1.5rem', zIndex: 0,
    }}>{n}</span>
  );
}

const painCards = [
  {
    Icon: SearchCheck,
    title: 'Present is not the same as accountable',
    body: 'A guard can show up. A supervisor can answer the phone. An operation can run. But without documented procedure, verifiable records and traceable evidence, everything depends on a verbal explanation the moment head office asks — and a verbal explanation does not survive an audit.',
  },
  {
    Icon: ClipboardList,
    title: 'Risk shows up exactly when you ask for proof',
    body: 'When a private security contractor does not operate under a recognized framework — ISO 31000, ASIS ORM.1 — every answer gets assembled by hand under pressure: incident logs, KPIs, escalation protocols, chain of custody. That is precisely where an operation stops being defensible in front of your board or regional office.',
  },
];

const services = [
  {
    badge: '01',
    title: 'Legal & financial standing audits',
    tag: 'Licensing · insurance · labor compliance',
    body: 'We verify your current or prospective contractor\'s operating permit, liability insurance, and standing with Venezuelan labor and social-security obligations — and flag exactly where the exposure sits before it becomes your liability.',
  },
  {
    badge: '02',
    title: 'Contract & service-level redesign',
    tag: 'KPIs · billing transparency · exit terms',
    body: 'We rebuild your security contract around measurable KPIs, immediate-replacement clauses, itemized billing and clear exit terms — replacing vague "24-hour coverage" language with terms you can actually enforce.',
  },
  {
    badge: '03',
    title: 'On-site operational audits',
    tag: 'CPTED · supervision · documented protocols',
    body: 'Our consultants verify perimeter, access control, staff rotation history and documented emergency protocols in person — the same criteria we apply before putting our own name behind a security scheme.',
  },
];

const diferenciadores = [
  '17+ years of continuous operation without a registered security incident.',
  'ISO 9001:2015 certified (Cert. 580181) quality management system.',
  'Risk methodology referenced to ISO 31000:2018 and ASIS ORM.1:2017.',
  'G7 diplomatic-standard experience — embassies and high-value multinationals.',
  'English-speaking liaison for overseas security and regional managers.',
  'Proprietary online risk-analysis tool with an automated preliminary index.',
  '24/7 command center (CECOM) for consolidated, real-time oversight.',
  'Confidential engagement — NDA available from first contact.',
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
    q: 'What do we receive after the assessment?',
    a: 'A written summary of findings against the three areas we review — legal/financial standing, contract terms, and on-site operational criteria — with a prioritized recommendation. No pressure to sign anything.',
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
    <div style={{ background: NAVY, color: WHITE, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* ═══ MINI NAV ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: `${NAVY}E6`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-semibold tracking-widest text-sm" style={{ color: WHITE }}>
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all hover:-translate-y-0.5"
          style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}>
          Request assessment
        </button>
      </header>

      {/* ═══ 1. HERO ═══ */}
      <header className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/consulting_b2b.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 30%', filter: 'blur(1px) saturate(0.75)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(10,22,40,.97) 0%, rgba(10,22,40,.94) 42%, rgba(10,22,40,.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,22,40,.4) 0%, transparent 30%, rgba(10,22,40,.85) 100%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />

        <motion.div className="relative max-w-4xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-5">
            <span style={{ width: '28px', height: '1px', background: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: ICE, letterSpacing: '.22em' }}>
              Corporate security services for overseas security managers and executives in Venezuela
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.6vw, 3.3rem)', lineHeight: 1.15, maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,.35)' }}>
            Is your private security contractor in Venezuela actually accountable — or just present?
          </h1>
          <p className="mb-6" style={{ color: MUTED, fontSize: '1.12rem', maxWidth: '640px' }}>
            CSSG provides corporate security services, security consulting and private protection for
            multinational organizations in Venezuela — built on documented procedure, not improvisation,
            so what happens on-site is exactly what you can show your board.
          </p>
          <p className="text-sm font-semibold mb-8 pl-4" style={{ borderLeft: `2px solid ${GOLD}`, color: GOLD }}>
            We hand you plans and evidence. Not just personnel on-site.
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center font-semibold px-9 py-4 text-base transition-all hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY, borderRadius: '2px', boxShadow: `inset 0 0 0 1px rgba(10,22,40,.35)` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Request a confidential assessment <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <p className="text-xs mt-3 uppercase" style={{ color: MUTED, letterSpacing: '.08em' }}>
            17+ years without incident · Confidential · No obligation
          </p>
        </motion.div>
      </header>

      {/* ═══ 2. AUTHORITY / CERTIFICATIONS ═══ */}
      <div className="relative py-12 px-6 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase font-semibold mb-8" style={{ color: MUTED, letterSpacing: '.18em' }}>Third-party verifiable certifications</p>
          <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8 mb-10">
            {[
              { src: '/iso-9001-badge.webp', alt: 'ISO 9001:2015 Certified Company' },
              { src: '/cyber-essentials-badge.webp', alt: 'Cyber Essentials Certified' },
              { src: '/ifpo-corporate-member.webp', alt: 'IFPO Corporate Membership' },
            ].map((badge) => (
              <img key={badge.src} src={badge.src} alt={badge.alt}
                className="h-16 w-auto transition-all duration-300 hover:-translate-y-0.5"
                style={{ filter: 'grayscale(1) brightness(1.5) contrast(0.9)', opacity: 0.7 }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1) brightness(1.5) contrast(0.9)'; e.currentTarget.style.opacity = '0.7'; }}
                loading="lazy" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-4 text-center">
            <p className="text-sm" style={{ color: MUTED }}>
              <span className="font-semibold" style={{ color: WHITE }}>Methodology referenced to:</span>{' '}
              <span style={{ color: ICE }}>ISO 31000:2018 · ASIS ORM.1:2017 · CPTED</span>
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 3. THE PROBLEM ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="01" />
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>The real problem</p>
            <h2 className="mb-12" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', maxWidth: '780px' }}>
              What is not certified, documented and measured cannot be defended in front of HQ.
            </h2>
          </motion.div>
          <div className="relative grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {painCards.map(({ Icon, title, body }, i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <CornerFrame className="p-8 h-full">
                  <div style={{ background: SLATE, borderTop: `2px solid ${GOLD}`, borderRadius: '2px' }} className="absolute inset-0 -z-10" />
                  <Icon className="w-6 h-6 mb-4" style={{ color: ICE }} />
                  <h3 className="text-base font-semibold mb-3" style={{ color: WHITE }}>{title}</h3>
                  <p className="text-sm" style={{ color: MUTED }}>{body}</p>
                </CornerFrame>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. OUR SERVICE — timeline ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="02" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>Our service</p>
            <h2 className="mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', maxWidth: '760px' }}>
              A structured, auditable corporate security consulting engagement.
            </h2>
          </motion.div>
          <div className="relative flex flex-col gap-12 pl-1" style={{ borderLeft: `1px solid ${BORDER}` }}>
            {services.map(({ badge, title, tag, body }, i) => (
              <motion.div key={badge} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="relative flex flex-col sm:flex-row gap-4 sm:gap-10 items-start pl-8">
                <span className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-1/2" style={{ background: GOLD, transform: 'translateX(-50%) rotate(45deg)' }} />
                <span className="shrink-0 mt-1 font-semibold text-sm px-4 py-2" style={{ border: `1px solid ${GOLD}`, color: GOLD, letterSpacing: '.1em', borderRadius: '2px' }}>
                  {badge}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: WHITE }}>{title}</h3>
                  <p className="text-xs font-semibold uppercase mb-2" style={{ color: ICE, letterSpacing: '.08em' }}>{tag}</p>
                  <p style={{ color: MUTED, maxWidth: '640px' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. DIFFERENTIATORS ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="03" />
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>Differentiators</p>
            <p className="italic mb-10 pl-4" style={{ borderLeft: `3px solid ${GOLD}`, color: WHITE, fontSize: '1.1rem', maxWidth: '640px' }}>
              What we say we do gets recorded.
            </p>
          </motion.div>
          <div className="relative grid sm:grid-cols-2 gap-x-10 gap-y-1">
            {diferenciadores.map((item, i) => (
              <motion.div key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 py-2.5" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm" style={{ color: MUTED }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA + FORM ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #101f36 0%, ${NAVY} 70%)`, paddingTop: '96px', paddingBottom: '96px' }} id="assessment">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <SectionNumeral n="04" />
        <div className="relative max-w-lg mx-auto">
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <CornerFrame className="p-9 sm:p-11">
              <div className="absolute inset-0 -z-10" style={{ background: SLATE, border: `1px solid ${BORDER}`, borderRadius: '2px' }} />
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase px-2 py-1" style={{ color: GOLD, border: `1px solid ${GOLD}66`, letterSpacing: '.12em', borderRadius: '2px', transform: 'rotate(2deg)' }}>
                Confidential
              </span>
              <h2 className="text-center mb-2 mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                Request a confidential assessment
              </h2>
              <p className="text-center text-sm mb-7" style={{ color: MUTED }}>
                A senior consultant reviews your current security scheme or contractor and responds within 12 business hours.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Full name *</label>
                  <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Position (optional)</label>
                  <input type="text" name="cargo" placeholder="Regional Security Manager" value={formData.cargo} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Company / organization *</label>
                  <input type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Corporate email *</label>
                  <input type="email" name="correo" required value={formData.correo} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                  {isFreeEmail && (
                    <p className="text-xs mt-1.5" style={{ color: ICE }}>Given the confidential nature of this engagement, we recommend using your corporate email.</p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-center p-3" style={{ color: '#ef4444', background: '#ef444410', borderRadius: '2px' }}>
                    Error: {errorMsg || 'Please try again or contact us directly.'}
                  </p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    <>Request assessment <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
              <p className="text-xs text-center mt-4" style={{ color: MUTED }}>
                No cost, no contracting obligation. A senior consultant will contact you within 12 business hours.
              </p>
            </CornerFrame>
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIAL ═══ */}
      <section className="relative px-6 py-20 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <motion.div className="relative max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontSize: '3rem', lineHeight: 0, verticalAlign: '-0.4rem' }}>&ldquo;</span>
            CSSG's assessment uncovered duplicated supervision charges we had been paying for two years. The conversation with our contractor changed entirely once we had it in writing.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm" style={{ color: ICE }}>
            — Regional Security Manager, multinational industrial group
            <span className="block text-xs mt-1" style={{ color: MUTED }}>(identity withheld under confidentiality protocol)</span>
          </cite>
        </motion.div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-3xl mx-auto relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3 text-center" style={{ color: ICE, letterSpacing: '.22em' }}>Frequently asked questions</p>
            <h2 className="mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Before you request your assessment
            </h2>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-semibold text-sm sm:text-base" style={{ color: WHITE }}>{f.q}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: GOLD, transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {openFaq === i && (
                    <p className="text-sm pb-5" style={{ color: MUTED, maxWidth: '640px' }}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-9 px-6 text-center text-sm" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <img src="/logo.webp" alt="CSSG" className="h-12 w-12 object-contain mx-auto mb-3" />
        <div className="font-semibold mb-2" style={{ color: GOLD }}>CSSG GLOBAL</div>
        <p>Corporate & Diplomatic Security · 17+ years serving without incident</p>
        <p className="mt-2 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3 h-3" /> Corporate security consulting · Contractor due diligence · ISO 31000 methodology
        </p>
        <p className="mt-4 text-xs" style={{ color: `${MUTED}99` }}>
          <Award className="inline w-3 h-3 mr-1 -mt-0.5" /> CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
        <p className="mt-4 text-xs" style={{ color: `${MUTED}99` }}>
          <a href="/politica-privacidad" className="hover:underline" style={{ color: ICE }}>Privacy policy</a>
          <span className="mx-2">·</span>
          <a href="/terminos-condiciones" className="hover:underline" style={{ color: ICE }}>Terms & conditions</a>
          <span className="mx-2">·</span>
          <a href="mailto:gerencia@globalservices-ven.com" className="hover:underline" style={{ color: ICE }}>gerencia@globalservices-ven.com</a>
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
