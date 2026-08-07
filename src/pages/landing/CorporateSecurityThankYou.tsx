import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import CookieConsent from '../../components/CookieConsent';

const BG = '#0B0B0F';
const CARD = 'rgba(255,255,255,0.04)';
const BORDER = 'rgba(255,255,255,0.08)';
const BLUE = '#0EA5E9';
const GOLD = '#EAB308';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface LocationState {
  nombre?: string;
  correo?: string;
  duplicate?: boolean;
}

export default function CorporateSecurityThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;

  useEffect(() => {
    if (!state.correo) {
      navigate('/en/corporate-security-consulting', { replace: true });
      return;
    }
    document.title = state.duplicate ? 'We already have your details | CSSG Global' : 'Request received | CSSG Global';
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.correo) return null;

  const firstName = state.nombre?.trim().split(/\s+/)[0] || '';

  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[130px] opacity-50" />
      </div>

      {/* ═══ MINI NAV ═══ */}
      <header className="relative flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-black tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
      </header>

      {/* ═══ CONFIRMATION ═══ */}
      <main className="relative flex flex-col items-center justify-center px-6" style={{ minHeight: '78vh' }}>
        <motion.div className="relative max-w-lg w-full text-center py-16" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 rounded-full" style={{ background: `${BLUE}15`, border: `1px solid ${BLUE}40` }}>
            <Check className="w-8 h-8" style={{ color: BLUE }} />
          </div>

          <h1 className="mb-4 font-black tracking-tight" style={{ fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)' }}>
            {state.duplicate ? 'We already have your details' : `Thank you${firstName ? `, ${firstName}` : ''}. Your request was received.`}
          </h1>

          <p className="text-gray-400">
            {state.duplicate
              ? <>We already have your information on file. A senior consultant will follow up with you at <b className="text-white">{state.correo}</b> shortly.</>
              : <>A senior consultant will review your request and contact you at <b className="text-white">{state.correo}</b> within 12 business hours to schedule your confidential assessment.</>}
          </p>

          <div className="mt-8 pt-8 text-left rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${BORDER}` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: BLUE }}>In the meantime</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span className="text-sm text-gray-400">Save <b className="text-white">gerencia@globalservices-ven.com</b> as a trusted sender so our consultant's email doesn't land in spam.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm text-gray-400">Already have a contractor in place? Mention it in your first call — we can start with an audit of your current provider instead of proposing a new one.</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: BLUE }} />
                <span className="text-sm text-gray-400">Your information is handled under confidentiality protocol. You may withdraw your request at any time.</span>
              </li>
            </ul>
          </div>

          <Link to="/" className="inline-flex items-center gap-1.5 mt-8 text-sm font-bold hover:gap-2.5 transition-all" style={{ color: BLUE }}>
            Back to cssg-global.com <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative py-8 px-4 text-center border-t" style={{ borderColor: BORDER }}>
        <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-2">CSSG Global</p>
        <p className="text-xs text-gray-600">
          CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
