import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ArrowRight, Lock, Mail, ShieldCheck, FileCheck } from 'lucide-react';
import CookieConsent from '../../components/CookieConsent';

const GOLD = '#EAB308';
const BORDER = 'rgba(255,255,255,0.08)';
const CALENDAR_URL = 'https://calendar.app.google/ZCLbjCCsbmYwMnEc6';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface LocationState {
  nombre?: string;
  correo?: string;
  duplicate?: boolean;
  motivo?: string;
}

export default function EmpresaSeguridadGracias() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;
  const isTender = state.motivo === 'licitacion';

  useEffect(() => {
    if (!state.correo) {
      navigate('/empresa-de-seguridad', { replace: true });
      return;
    }
    document.title = state.duplicate ? 'Ya tenemos tus datos | CSSG Global' : 'Solicitud recibida | CSSG Global';
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
    <div className="min-h-screen bg-[#0B0B0F] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />

      {/* ── MINI NAV ── */}
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-black tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
      </header>

      {/* ── CONFIRMACIÓN ── */}
      <main className="relative flex flex-col items-center justify-center px-6 overflow-hidden" style={{ minHeight: '78vh' }}>
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px] opacity-40" />
        <motion.div className="relative max-w-lg w-full text-center py-16" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>

          <h1 className="mb-4 tracking-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)' }}>
            {state.duplicate ? 'Ya tenemos tus datos' : `Gracias${firstName ? `, ${firstName}` : ''}. Su solicitud fue recibida.`}
          </h1>

          <p className="text-gray-400">
            {state.duplicate ? (
              <>Ya contamos con su información en nuestro sistema. Un consultor senior le contactará en <b className="text-white">{state.correo}</b> en breve.</>
            ) : isTender ? (
              <>Un consultor senior está preparando nuestra documentación de licitación — incluyendo certificación ISO 9001:2015 y autorización DIGESERVISP — y le contactará en <b className="text-white">{state.correo}</b> en menos de 12 horas hábiles.</>
            ) : (
              <>Un consultor senior revisará su caso y le contactará en <b className="text-white">{state.correo}</b> en menos de 12 horas hábiles para coordinar la auditoría de su esquema de seguridad.</>
            )}
          </p>

          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">¿Prefiere no esperar? Elija un horario que le convenga:</p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors"
            >
              Agendar mi auditoría ahora <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-xs text-gray-500 mt-2">30 minutos · Confidencial · Sin compromiso</p>
          </div>

          <div className="mt-8 pt-8 text-left" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-4 text-sky-400">Mientras tanto</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                <span className="text-sm text-gray-400">Guarde el remitente <b className="text-gray-300">gerencia@globalservices-ven.com</b> como confiable para que el correo de nuestro consultor no caiga en spam.</span>
              </li>
              {isTender ? (
                <li className="flex items-start gap-3">
                  <FileCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span className="text-sm text-gray-400">Comparta su fecha límite de entrega respondiendo este correo — le enviamos la documentación y propuesta técnica antes de su cierre de licitación.</span>
                </li>
              ) : (
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span className="text-sm text-gray-400">Si ya tiene un proveedor contratado, menciónelo en la primera llamada: podemos empezar auditando su esquema actual en vez de proponer uno nuevo.</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                <span className="text-sm text-gray-400">Sus datos se manejan bajo protocolo de confidencialidad. Puede retirar su solicitud cuando quiera.</span>
              </li>
            </ul>
          </div>

          <Link to="/" className="inline-flex items-center gap-1.5 mt-10 text-sm font-bold text-sky-400 hover:gap-2.5 transition-all">
            Volver a cssg-global.com <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-4 text-center border-t border-white/5">
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Company Of Security And Service Global C.A. · RIF J-29782024-8 · ISO 9001:2015
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
