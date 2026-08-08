import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShieldCheck, Radar, Users, Award, ArrowRight, Check, X as XIcon, Loader2, ChevronDown, Globe2,
  FileCheck, Radio, Eye, MapPin, FileText,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

// ─────────────────────────────────────────────────────────────
// LP4 — DIPLOMATIC SECURITY (EN)
// Same "The Distinction" editorial system as CorporateSecurity.tsx v3:
// full-bleed photography with dark wash, Playfair Display serif
// headlines, palette reduced to black / white / a single muted gold
// accent. Service-presentation page, no downloadable lead magnet —
// captures the lead into a consultative email sequence with a direct
// calendar-booking CTA.
// Primary persona: embassies, diplomatic missions and executive
// families operating in Venezuela — aligned with CSSG's existing
// "Escudo Diplomático" positioning (G7 standard, Vienna Convention),
// reframed in English for the international search term.
// Keywords: diplomatic security, diplomatic security service.
// ─────────────────────────────────────────────────────────────

const BG = '#0B0B0F';
const CARD = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.09)';
const GOLD = '#C9A24B';
const GOLD_H = '#DDB65F';
const MUTED = '#9CA3AF';

const SERIF = "'Playfair Display', serif";

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%23C9A24B' stroke-opacity='0.05' stroke-width='1'/%3E%3C/svg%3E")`;

const CALENDAR_URL = 'https://calendar.app.google/ZCLbjCCsbmYwMnEc6';

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
  { to: 17, suffix: '+', label: 'Years protecting diplomatic missions without incident' },
  { to: 1, suffix: ' of few', label: 'Security firms in Venezuela operating at G7 standard' },
  { to: 100, suffix: '%', label: 'Confidential engagement, NDA available' },
  { to: 24, suffix: '/7', label: 'Command center (CECOM) oversight' },
];

const comparison = [
  { them: 'Generic bodyguards, no diplomatic protocol training', us: 'Personnel trained under G7 and Vienna Convention protocol' },
  { them: 'No coordination with host-country authorities', us: 'Established liaison protocols with local security forces' },
  { them: 'Ad hoc response, no command structure', us: '24/7 command center (CECOM) with real-time oversight' },
  { them: 'Any client, any budget, no vetting', us: 'Selective, vetted diplomatic and executive engagements only' },
];

const services = [
  {
    icon: Radar,
    title: 'Threat & environment assessment',
    body: 'Pre-arrival intelligence briefing covering the local threat environment, venue and residence evaluation, and a documented risk profile — before your principal or delegation sets foot in the country.',
  },
  {
    icon: Users,
    title: 'Protective detail & residence security',
    body: 'Vetted close-protection officers and hardened residence security, coordinated under a single command structure — not a loose collection of subcontracted personnel.',
  },
  {
    icon: Globe2,
    title: 'Crisis & evacuation protocols',
    body: 'Documented emergency response and evacuation protocols, coordinated in advance with your mission or organization\'s own security office — tested before they are ever needed.',
  },
];

const protocols = [
  {
    icon: FileCheck,
    title: 'QMS-coordinated procedures',
    body: 'Every action taken by the detail — from pre-arrival planning to daily post orders — follows a documented procedure under our ISO 9001:2015 Quality Management System (SGC). Nothing is improvised; everything is auditable.',
  },
  {
    icon: Radio,
    title: 'CECOM 24/7 command center',
    body: 'Your detail reports to our own command center, not an answering service. CECOM maintains real-time consolidated visibility, activates protocols and coordinates field response around the clock.',
    image: '/cecom_control_center_1777552494604.webp',
  },
  {
    icon: Eye,
    title: 'Preventive Intelligence Unit',
    body: 'A dedicated Preventive Intelligence Unit tracks the local threat environment around your principal, mission or venue on a continuous basis — identifying risk before it reaches your perimeter, not after.',
  },
  {
    icon: MapPin,
    title: 'Perimeter patrols of adjacent streets & zones',
    body: 'Coverage extends beyond the gate: scheduled and randomized patrols of the streets and zones adjacent to your focal point, so surveillance and staging by a hostile actor are detected before they reach the door.',
  },
];

const credentials = [
  { src: '/iso-9001-badge-cropped.webp', title: 'ISO 9001:2015', sub: 'Cert. 580181', note: 'Quality management certified — independently audited, not self-declared.' },
  { src: '/cyber-essentials-badge-transparent.webp', title: 'Cyber Essentials', sub: 'Certified', note: 'Baseline cyber-hygiene verified for our operational technology.' },
  { src: '/ifpo-corporate-member-transparent.webp', title: 'IFPO', sub: 'Corporate Member', note: 'International Foundation for Protection Officers membership.' },
];

const FAQS = [
  {
    q: 'Is the initial briefing really confidential and free of obligation?',
    a: 'Yes. A senior consultant reviews your requirement under NDA, at no cost and with no obligation to contract further services.',
  },
  {
    q: 'What makes CSSG different from a general executive protection firm?',
    a: 'CSSG has operated diplomatic security details for embassies and missions in Venezuela for 17+ years without a single registered incident, under G7 standard and protocols aligned with the Vienna Convention — not a general close-protection background applied to a diplomatic context.',
  },
  {
    q: 'Do you coordinate with our own mission security office or host-government authorities?',
    a: 'Yes. Diplomatic engagements are coordinated with your organization\'s existing security office and, where appropriate, with local authorities — CSSG operates alongside your structure, not around it.',
  },
  {
    q: 'Can you support a single visit, or only long-term details?',
    a: 'Both. We support everything from a single high-level visit or delegation to permanent residence and mission security details.',
  },
  {
    q: 'Can CSSG participate in our tender or RFP process?',
    a: 'Yes. CSSG regularly participates in embassy, mission and corporate tender processes. Select "Invite CSSG to a tender / RFP process" in the form and share your timeline — we will return the required documentation, including ISO 9001:2015 certification and DIGESERVISP authorization, ahead of your deadline.',
  },
  {
    q: 'Why do you limit the number of diplomatic and executive engagements you take on?',
    a: 'Zero incidents in 17+ years is a function of capacity and vetting, not luck. We would rather decline an engagement than dilute the oversight our standard requires.',
  },
  {
    q: 'What happens to my information?',
    a: 'All information is handled under strict confidentiality protocol and is never shared with third parties. You may request its deletion at any time by writing to gerencia@globalservices-ven.com.',
  },
];

interface FormData {
  nombre: string;
  cargo: string;
  empresa: string;
  correo: string;
  motivo: string;
}

export default function DiplomaticSecurity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', empresa: '', correo: '', motivo: 'levantamiento' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Diplomatic Security Services in Venezuela | G7 Standard | CSSG';
    const desc = 'Diplomatic security service for embassies, missions and executive families in Venezuela. 17+ years without incident, G7 standard, Vienna Convention protocol. Request a confidential briefing — CSSG.';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFreeEmail = (() => {
    const domain = formData.correo.split('@')[1]?.toLowerCase();
    return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
  })();

  const purposeLabel = formData.motivo === 'licitacion'
    ? 'Tender / RFP invitation'
    : 'Technical Site Assessment (levantamiento técnico)';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `[LP DIPLOMATIC SECURITY EN] Requested: ${purposeLabel}${formData.cargo ? ` | Position: ${formData.cargo}` : ''}`,
        fuente: 'lp_diplomatic_security_en',
        score: formData.motivo === 'licitacion' ? 55 : 50,
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
              fuente: 'lp_diplomatic_security_en',
              cargo: formData.cargo,
              mensaje: `[REPEAT REQUEST] ${purposeLabel}`,
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/en/diplomatic-security/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true, motivo: formData.motivo } });
          return;
        }
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.empresa,
          fuente: 'lp_diplomatic_security_en',
          cargo: formData.cargo,
        });
        if (!emailRes.success) console.warn('Email Notification Warning:', emailRes.error);
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'diplomatic_security_en', formData.empresa);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      navigate('/en/diplomatic-security/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false, motivo: formData.motivo } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection or database error.';
      console.error('Error submitting LP Diplomatic Security EN form:', err);
      setErrorMsg(message);
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('briefing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(750px circle at ${e.clientX}px ${e.clientY}px, rgba(201,162,75,0.22), transparent 60%)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Cursor-following spotlight — subtly lifts background intensity near the pointer */}
      <div ref={glowRef} className="fixed inset-0 hidden sm:block" style={{ zIndex: 30, pointerEvents: 'none', mixBlendMode: 'screen' }} aria-hidden="true" />

      {/* ═══ MINI NAV ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5" style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-8 w-8 object-contain" />
          <span className="font-semibold tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all hover:-translate-y-0.5" style={{ background: GOLD, color: BG, borderRadius: '2px' }}>
          Request briefing
        </button>
      </header>

      {/* ═══ 1. HERO — full-bleed photography, dark wash ═══ */}
      <header className="relative min-h-[94vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/ESCOLTA.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center 40%', filter: 'saturate(0.75)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(11,11,15,.97) 0%, rgba(11,11,15,.93) 45%, rgba(11,11,15,.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.5) 0%, transparent 35%, rgba(11,11,15,.9) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />

        <motion.div className="relative max-w-3xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-4 h-4" style={{ color: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: GOLD, letterSpacing: '.2em' }}>
              For embassies, diplomatic missions and executive families in Venezuela
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(2.1rem, 4.6vw, 3.5rem)', lineHeight: 1.18, textShadow: '0 2px 30px rgba(0,0,0,.5)' }}>
            Most security firms have never protected a diplomat.
            <br />CSSG has — for 17 years, without incident.
          </h1>
          <p className="mb-4 text-gray-300" style={{ fontSize: '1.1rem', maxWidth: '620px' }}>
            <strong className="text-white">Escudo Diplomático</strong> is CSSG's diplomatic security service, built on G7 standard
            and Vienna Convention protocol — not a general close-protection background applied to a diplomatic context.
          </p>
          <p className="mb-8 text-gray-400 text-sm" style={{ maxWidth: '620px' }}>
            QMS-coordinated procedures · 24/7 CECOM command center · Preventive Intelligence Unit · perimeter patrols of adjacent streets and zones.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button onClick={scrollToForm}
              className="inline-flex items-center font-semibold px-8 py-4 text-base transition-all hover:-translate-y-0.5"
              style={{ background: GOLD, color: BG, borderRadius: '2px' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Request a Technical Site Assessment <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button onClick={scrollToForm} className="text-xs uppercase tracking-widest text-gray-300 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-gray-600">
              Preparing an RFP? Invite CSSG to your tender →
            </button>
          </div>
        </motion.div>
      </header>

      {/* ═══ 2. CREDENTIALS ═══ */}
      <section className="relative py-16 px-6 overflow-hidden" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase font-semibold mb-10" style={{ color: MUTED, letterSpacing: '.18em' }}>Certified standards — not self-declared</p>
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
          <div className="flex items-center justify-center gap-2 mt-10 text-xs text-gray-500">
            <FileText className="w-3.5 h-3.5" style={{ color: GOLD }} />
            <span>DIGESERVISP-authorized operator — Ministry of Interior, Justice & Peace, Bolivarian Republic of Venezuela</span>
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
              <p className="text-xs text-gray-500 mt-2 max-w-[18ch] mx-auto leading-snug">{s.label}</p>
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
              What separates a diplomatic security service from executive protection for hire.
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
              A structured diplomatic security service, coordinated with your own security office.
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

      {/* ═══ 5b. THE DIPLOMATIC SHIELD PROTOCOL — deluxe, image-backed ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/cecom_control_center_1777552494604.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.7)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.96) 0%, rgba(11,11,15,.9) 30%, rgba(11,11,15,.96) 100%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>The Escudo Diplomático protocol</p>
            <h2 className="mb-4" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              Four canons that govern every diplomatic detail we run.
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              This is what "diplomatic-grade" means in practice — not a marketing phrase, but four
              documented, auditable procedures your security office can verify.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {protocols.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="p-6" style={{ background: 'rgba(11,11,15,0.7)', border: `1px solid ${GOLD}33`, backdropFilter: 'blur(6px)' }}>
                <p.icon className="w-6 h-6 mb-4" style={{ color: GOLD }} />
                <h3 className="font-semibold text-base mb-2 text-white">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA + FORM ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden" id="briefing">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />
        <div className="relative max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="p-8 sm:p-10" style={{ background: CARD, border: `1px solid ${GOLD}55` }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-5" style={{ border: `1px solid ${GOLD}66`, color: GOLD }}>
                <Award className="w-3 h-3" /> Selective engagement
              </span>
              <h2 className="mb-2 text-white" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '1.5rem' }}>Request a Technical Site Assessment</h2>
              <p className="text-center text-sm mb-2" style={{ color: MUTED }}>
                A senior consultant reviews your requirement under NDA and responds within 12 business hours — for a
                site assessment (levantamiento técnico) or a tender/RFP invitation.
              </p>
              <div className="text-center mb-7">
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold hover:underline" style={{ color: GOLD }}>
                  Prefer to skip ahead? Schedule directly →
                </a>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="motivo" required value={formData.motivo} onChange={handleChange}
                  className="w-full px-4 py-3.5 text-sm text-white focus:outline-none transition-colors"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}
                >
                  <option value="levantamiento">Request a Technical Site Assessment</option>
                  <option value="licitacion">Invite CSSG to a tender / RFP process</option>
                </select>
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
                  type="text" name="empresa" required placeholder="Mission / organization *" value={formData.empresa} onChange={handleChange}
                  className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}
                />
                <div>
                  <input
                    type="email" name="correo" required placeholder="Official email *" value={formData.correo} onChange={handleChange}
                    className="w-full px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
                    style={{ background: BG, border: `1px solid ${BORDER}` }}
                  />
                  {isFreeEmail && (
                    <p className="text-xs mt-1.5" style={{ color: GOLD }}>Given the confidential nature of this engagement, we recommend using your official or corporate email.</p>
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
                    <>{formData.motivo === 'licitacion' ? 'Send tender invitation' : 'Request Technical Site Assessment'} <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
              <p className="mt-4 text-xs text-gray-500 text-center">
                No cost, no obligation. Handled under confidentiality protocol.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIAL ═══ */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden" style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/cssg-emblem.webp')",
          backgroundSize: '200px auto', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          opacity: 0.16,
        }} />
        <div className="absolute inset-0" style={{ background: 'rgba(11,11,15,0.35)' }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative max-w-3xl mx-auto text-center">
          <blockquote style={{ fontFamily: SERIF, fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontSize: '3rem', lineHeight: 0, verticalAlign: '-0.4rem' }}>&ldquo;</span>
            In more than a decade working with international security providers, CSSG is the only one that has never once required us to explain a gap between what was promised and what was delivered.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm text-gray-400">
            — Security Officer, foreign diplomatic mission in Caracas
            <span className="block text-xs mt-1 text-gray-600">(identity withheld under confidentiality protocol)</span>
          </cite>
        </motion.div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>Frequently asked questions</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.1rem)' }}>Before you request your briefing</h2>
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
          <ShieldCheck className="inline w-3 h-3 mr-1 -mt-0.5" /> CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
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
