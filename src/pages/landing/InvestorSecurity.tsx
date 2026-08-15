import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, animate } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShieldCheck, Radar, Users, Award, ArrowRight, Check, X as XIcon, Loader2, ChevronDown,
  FileCheck, Radio, Eye, MapPin, BadgeCheck, Globe2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

// ─────────────────────────────────────────────────────────────
// LP5 — EXECUTIVE PROTECTION FOR INVESTORS (EN)
// Same "The Distinction" editorial system as CorporateSecurity.tsx /
// DiplomaticSecurity.tsx: full-bleed photography with dark wash,
// Playfair Display serif headlines, black / white / muted gold accent.
// Service-presentation page, no downloadable lead magnet — captures
// the lead into a consultative email sequence with a direct
// calendar-booking CTA.
// Primary persona: U.S. C-level executives, COOs and corporate
// security heads evaluating or executing investment trips to
// Venezuela (energy, mining, infrastructure, trade) who need
// pre-travel intelligence, due diligence/vetting and secured ground
// logistics — not just a bodyguard on arrival.
// Keywords: executive protection Venezuela, security for investors
// Venezuela, due diligence Venezuela, travel risk management Venezuela.
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
  { to: 17, suffix: '+', label: 'Years serving G7 embassies and corporations without incident' },
  { to: 1, suffix: ' of few', label: 'ISO 9001-certified security firms in Venezuela' },
  { to: 24, suffix: '/7', label: 'Command center (CECOM) oversight' },
  { to: 12, suffix: 'h', label: 'Response time to a qualified inquiry' },
];

const comparison = [
  { them: 'Executive protection arranged with no pre-travel intelligence', us: 'Preventive intelligence study and risk briefing completed before you land' },
  { them: 'Local partners and counterparties taken at face value', us: 'Due diligence and vetting cross-referenced against judicial, fiscal and OSINT sources' },
  { them: 'Rented vehicles, no armored or escort option', us: 'Armored vehicles and motorcycle escort teams, operated by our own vetted drivers' },
  { them: 'Ground logistics coordinated ad hoc, day of travel', us: 'Logistics guaranteed and confirmed in advance — routes, lodging, contingencies' },
];

const services = [
  {
    icon: Radar,
    title: 'Preventive Intelligence & Pre-Travel Risk Briefing',
    body: 'Before your itinerary is finalized, our Preventive Intelligence Unit maps the current threat environment across your destinations — Caracas, Maracaibo, Valencia and beyond — and delivers a documented risk briefing your board or security office can review.',
  },
  {
    icon: FileCheck,
    title: 'Due Diligence & Counterparty Vetting',
    body: 'We verify the local partners, contractors and counterparties involved in your investment before you sign — cross-referencing judicial, fiscal and open-source intelligence to expose what a superficial background check misses.',
  },
  {
    icon: ShieldCheck,
    title: 'Executive Protection & Secured Transport',
    body: 'Vetted, specialized protective personnel and a dedicated fleet of armored vehicles and motorcycle escorts — coordinated as a single detail, not a loose collection of subcontractors.',
  },
  {
    icon: MapPin,
    title: 'Guaranteed Ground Logistics',
    body: 'Routes, lodging, ground transport and contingency planning are confirmed and locked in before you travel — so your trip runs on a schedule you control, not one improvised on arrival.',
  },
  {
    icon: Eye,
    title: 'On-the-Ground Local Knowledge',
    body: 'Our teams operate daily in the regions you are visiting. That on-the-ground knowledge — not a briefing assembled from open sources alone — is what lets us anticipate conditions a remote provider cannot see.',
  },
  {
    icon: Users,
    title: 'Specialized Consulting & Crisis Response',
    body: 'A senior consultant remains engaged from planning through your return, with documented crisis-response and medical-evacuation protocols coordinated in advance — tested before they are ever needed.',
  },
];

const protocols = [
  {
    icon: BadgeCheck,
    title: 'QMS-coordinated procedures',
    body: 'Every stage of your engagement — from the preventive intelligence study to your final day on the ground — follows a documented procedure under our ISO 9001:2015 Quality Management System. Nothing is improvised; everything is auditable.',
  },
  {
    icon: Radio,
    title: 'CECOM 24/7 command center',
    body: 'Your detail reports to our own command center, not an answering service. CECOM maintains real-time consolidated visibility of your movements and coordinates field response around the clock.',
  },
  {
    icon: Radar,
    title: 'Preventive Intelligence Unit',
    body: 'A dedicated unit tracks the local threat environment around your itinerary on a continuous basis — identifying risk before it reaches your route, not after.',
  },
  {
    icon: ShieldCheck,
    title: 'Armored & motorcycle escort convoy',
    body: 'Ground movement is covered by armored vehicles and motorcycle escort teams operating as a coordinated convoy — the same standard of vehicle security we apply to diplomatic missions under G7 protocol.',
  },
];

const credentials = [
  { src: '/iso-9001-badge-cropped.webp', title: 'ISO 9001:2015', sub: 'Cert. 580181', note: 'Quality management certified — independently audited, not self-declared.' },
  { src: '/cyber-essentials-badge-transparent.webp', title: 'Cyber Essentials', sub: 'Certified', note: 'Baseline cyber-hygiene verified for our operational technology.' },
  { src: '/ifpo-corporate-member-transparent.webp', title: 'IFPO', sub: 'Corporate Member', note: 'International Foundation for Protection Officers membership.' },
];

const FAQS = [
  {
    q: 'Is the initial risk assessment really free, and does it come with any obligation?',
    a: 'Yes. A senior consultant reviews your itinerary and requirement under NDA, at no cost and with no obligation to contract further services.',
  },
  {
    q: 'What does a preventive intelligence study actually cover?',
    a: 'A documented risk briefing across your specific destinations and dates — local threat environment, route and venue evaluation, and a due-diligence read on any local counterparties involved — delivered before your itinerary is finalized, not after you arrive.',
  },
  {
    q: 'How much does executive protection for an investment trip to Venezuela cost?',
    a: 'Pricing depends on duration, number of principals, destinations and whether armored transport and motorcycle escort are required. A senior consultant scopes exact pricing during your free assessment — we do not publish flat rates because no two itineraries carry the same risk profile.',
  },
  {
    q: 'Which cities and regions do you cover?',
    a: 'We operate nationwide, with the deepest on-the-ground presence in Caracas, Maracaibo and Valencia. Coverage for other regions is confirmed during your risk assessment based on your specific itinerary.',
  },
  {
    q: 'What is your response time if something goes wrong during the trip?',
    a: 'Your detail reports directly to our 24/7 CECOM command center, with documented crisis-response and medical-evacuation protocols agreed and tested before you travel — not improvised in the moment.',
  },
  {
    q: 'Can CSSG vet a local partner or contractor before we sign an agreement?',
    a: 'Yes — this is one of our most common engagements for investors. We cross-reference judicial, fiscal and open-source intelligence on the counterparty before you commit, as a standalone due-diligence and vetting study.',
  },
  {
    q: 'What happens to our information?',
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

export default function InvestorSecurity() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', empresa: '', correo: '', motivo: 'assessment' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Executive Protection & Security Services for Investors in Venezuela | CSSG';
    const desc = '24/7 executive protection, preventive intelligence, due diligence and secured ground transport for U.S. investors traveling to Venezuela. ISO 9001:2015 certified, 17+ years serving G7 embassies. Free risk assessment.';
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

  const purposeLabel = formData.motivo === 'due_diligence'
    ? 'Due Diligence / Vetting Study'
    : 'Pre-Travel Risk Assessment';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `[LP INVESTOR SECURITY EN] Requested: ${purposeLabel}${formData.cargo ? ` | Position: ${formData.cargo}` : ''}`,
        fuente: 'lp_investor_security_en',
        score: formData.motivo === 'due_diligence' ? 55 : 50,
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
              fuente: 'lp_investor_security_en',
              cargo: formData.cargo,
              mensaje: `[REPEAT REQUEST] ${purposeLabel}`,
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/en/executive-protection-venezuela-investors/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true, motivo: formData.motivo } });
          return;
        }
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.empresa,
          fuente: 'lp_investor_security_en',
          cargo: formData.cargo,
        });
        if (!emailRes.success) console.warn('Email Notification Warning:', emailRes.error);
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'investor_security_en', formData.empresa);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      navigate('/en/executive-protection-venezuela-investors/thank-you', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false, motivo: formData.motivo } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection or database error.';
      console.error('Error submitting LP Investor Security EN form:', err);
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
          Get Your Free Risk Assessment
        </button>
      </header>

      {/* ═══ 1. HERO — full-bleed photography, dark wash ═══ */}
      <header className="relative min-h-[94vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/svc_custodia.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 55%', filter: 'saturate(0.75)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(11,11,15,.97) 0%, rgba(11,11,15,.93) 45%, rgba(11,11,15,.55) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.5) 0%, transparent 35%, rgba(11,11,15,.9) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />

        <motion.div className="relative max-w-3xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-4 h-4" style={{ color: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: GOLD, letterSpacing: '.2em' }}>
              For U.S. investors and executives traveling to Venezuela
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(2.1rem, 4.6vw, 3.5rem)', lineHeight: 1.18, textShadow: '0 2px 30px rgba(0,0,0,.5)' }}>
            Executive Protection & Security Services for Investors in Venezuela
          </h1>
          <p className="mb-4 text-gray-300" style={{ fontSize: '1.1rem', maxWidth: '640px' }}>
            Trusted by corporations and G7 embassies for 17+ years. 24/7 coverage across Caracas, Maracaibo,
            Valencia and nationwide — built on preventive intelligence, due diligence and guaranteed logistics,
            not just a bodyguard on arrival.
          </p>
          <p className="mb-8 text-gray-400 text-sm" style={{ maxWidth: '640px' }}>
            Preventive intelligence studies · Due diligence & vetting · Armored vehicles & motorcycle escorts · Specialized protective personnel
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button onClick={scrollToForm}
              className="inline-flex items-center font-semibold px-8 py-4 text-base transition-all hover:-translate-y-0.5"
              style={{ background: GOLD, color: BG, borderRadius: '2px' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Get Your Free Risk Assessment <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button onClick={scrollToForm} className="text-xs uppercase tracking-widest text-gray-300 font-semibold hover:text-white transition-colors underline underline-offset-4 decoration-gray-600">
              Need a due diligence / vetting study? Ask us →
            </button>
          </div>
        </motion.div>
      </header>

      {/* ═══ 2. WHY U.S. INVESTORS NEED PROFESSIONAL SECURITY ═══ */}
      <section className="relative py-20 px-4 sm:px-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs uppercase font-semibold mb-3 text-center" style={{ color: GOLD, letterSpacing: '.18em' }}>The problem</p>
            <h2 className="text-center mb-8" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              Why U.S. investors need professional security in Venezuela
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">
              Venezuela remains classified under the U.S. State Department's highest-risk travel advisory tier —
              citing crime, kidnapping and wrongful-detention risk, and warning that consular assistance for
              U.S. citizens is severely limited on the ground. For an executive evaluating an energy, mining,
              infrastructure or trade opportunity, that means the standard duty-of-care playbook — a hotel car
              and a driver — does not hold up.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Most firms respond to that gap by adding a bodyguard. That solves the wrong problem. What an
              investment trip actually requires is intelligence gathered before you land, verification of who
              you are meeting with, and ground logistics that are guaranteed — not improvised the day you arrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. CREDENTIALS ═══ */}
      <section className="relative py-16 px-6 overflow-hidden" style={{ borderBottom: `1px solid ${BORDER}` }}>
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

      {/* ═══ 4. STAT BAR ═══ */}
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

      {/* ═══ 5. THE DIFFERENCE — comparison ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>The difference</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              What separates a certified security partner from a car and a driver.
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

      {/* ═══ 6. OUR SERVICE ═══ */}
      <section className="relative py-24 px-4 sm:px-6" style={{ background: 'rgba(255,255,255,0.02)', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>Our service</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              Specialized consulting, on-the-ground knowledge, guaranteed logistics.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <motion.div key={s.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}
                className="p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <s.icon className="w-6 h-6 mb-4" style={{ color: GOLD }} />
                <h3 className="font-semibold text-base mb-2 text-white">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6b. THE FLEET & THE TEAM — photo gallery ═══ */}
      <section className="relative py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>The fleet & the team</p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              Armored vehicles, motorcycle escorts and vetted personnel — our own, not subcontracted.
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { src: '/svc_blindados.webp', title: 'Armored Vehicles', body: 'A dedicated fleet, garaged and maintained under our own operational control.' },
              { src: '/svc_reaccion_motorizada.webp', title: 'Motorcycle Escorts', body: 'Coordinated escort teams that clear and secure your route in real time.' },
              { src: '/diplomatic_security.webp', title: 'Specialized Personnel', body: 'Protective officers trained under the same G7 embassy protocol we apply to diplomatic missions.' },
              { src: '/ambulancia.webp', title: 'Medical Evacuation', body: 'Crisis-response and medevac protocols coordinated in advance, not improvised on the day.' },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}
                style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={f.src} alt={f.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-sm mb-1.5 text-white">{f.title}</h3>
                  <p className="text-xs text-gray-400">{f.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6c. THE INVESTOR SECURITY PROTOCOL — deluxe, image-backed ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/electronic_security.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(0.7)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.96) 0%, rgba(11,11,15,.9) 30%, rgba(11,11,15,.96) 100%)' }} />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-14">
            <p className="text-xs uppercase font-semibold mb-3" style={{ color: GOLD, letterSpacing: '.18em' }}>The protocol</p>
            <h2 className="mb-4" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)' }}>
              The same G7 embassy standard, applied to your investment trip.
            </h2>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              This is what "certified, embassy-grade security" means in practice — not a marketing phrase,
              but four documented, auditable procedures your security office can verify.
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

      {/* ═══ 7. CTA + FORM ═══ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden" id="assessment">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />
        <div className="relative max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="p-8 sm:p-10" style={{ background: CARD, border: `1px solid ${GOLD}55` }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest mb-5" style={{ border: `1px solid ${GOLD}66`, color: GOLD }}>
                <Award className="w-3 h-3" /> Confidential engagement
              </span>
              <h2 className="mb-2 text-white" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: '1.5rem' }}>Get Your Free Risk Assessment</h2>
              <p className="text-sm mb-2" style={{ color: MUTED }}>
                A senior consultant reviews your itinerary under NDA and responds within 12 business hours —
                for a pre-travel risk assessment or a due diligence / vetting study.
              </p>
              <div className="mb-7">
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
                  <option value="assessment">Request a Pre-Travel Risk Assessment</option>
                  <option value="due_diligence">Request a Due Diligence / Vetting Study</option>
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
                    <>{formData.motivo === 'due_diligence' ? 'Request vetting study' : 'Get Your Free Risk Assessment'} <ArrowRight className="w-5 h-5" /></>
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

      {/* ═══ 8. TESTIMONIAL ═══ */}
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
            CSSG had a risk briefing and a vetting report on our local partner ready before our team ever
            boarded the flight. Every meeting, every route, was already accounted for.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm text-gray-400">
            — Corporate Security Director, U.S. energy company evaluating a Venezuela investment
            <span className="block text-xs mt-1 text-gray-600">(identity withheld under confidentiality protocol)</span>
          </cite>
        </motion.div>
      </section>

      {/* ═══ 9. FAQ ═══ */}
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

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-16 px-4 sm:px-6 text-center" style={{ borderTop: `1px solid ${BORDER}` }}>
        <Globe2 className="w-6 h-6 mx-auto mb-4" style={{ color: GOLD }} />
        <h2 className="mb-4 max-w-xl mx-auto" style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(1.4rem, 2.6vw, 1.8rem)' }}>
          Ready to secure your trip? Contact us within 24 hours for a customized security plan.
        </h2>
        <button onClick={scrollToForm}
          className="inline-flex items-center font-semibold px-8 py-4 text-base transition-all hover:-translate-y-0.5"
          style={{ background: GOLD, color: BG, borderRadius: '2px' }}
        >
          Get Your Free Risk Assessment <ArrowRight className="w-4 h-4 ml-2" />
        </button>
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
