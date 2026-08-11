import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ArrowRight, Lock, Mail, ShieldCheck, FileCheck } from 'lucide-react';
import CookieConsent from '../../components/CookieConsent';

const NAVY = '#0A1628';
const SLATE = '#16233A';
const BORDER = '#233754';
const WHITE = '#F5F7FA';
const MUTED = '#93A4BE';
const GOLD = '#C9A24B';
const ICE = '#7FB3D5';
const CALENDAR_URL = 'https://calendar.app.google/ZCLbjCCsbmYwMnEc6';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%237FB3D5' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E")`;

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

export default function ConsultoriaRiesgosGracias() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;
  const isTender = state.motivo === 'licitacion';

  useEffect(() => {
    if (!state.correo) {
      navigate('/consultoria-y-analisis-de-riesgos', { replace: true });
      return;
    }
    document.title = state.duplicate ? 'Ya tenemos sus datos | CSSG Global' : 'Solicitud recibida | CSSG Global';
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
    <div style={{ background: NAVY, color: WHITE, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, minHeight: '100vh' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />

      {/* ═══ MINI NAV ═══ */}
      <header className="flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-semibold tracking-widest text-sm" style={{ color: WHITE }}>
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
      </header>

      {/* ═══ CONFIRMACIÓN ═══ */}
      <main className="relative flex flex-col items-center justify-center px-6 overflow-hidden" style={{ minHeight: '78vh' }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />
        <motion.div className="relative max-w-lg w-full text-center py-16" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30`, borderRadius: '50%' }}>
            <Check className="w-8 h-8" style={{ color: GOLD }} />
          </div>

          <h1 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.4vw, 2.1rem)' }}>
            {state.duplicate ? 'Ya tenemos sus datos' : `Gracias${firstName ? `, ${firstName}` : ''}. Su solicitud fue recibida.`}
          </h1>

          <p style={{ color: MUTED }}>
            {state.duplicate ? (
              <>Ya contamos con su información en nuestro sistema. Un consultor senior le contactará en <b style={{ color: WHITE }}>{state.correo}</b> en breve.</>
            ) : isTender ? (
              <>Un consultor senior está preparando nuestra documentación de licitación — incluyendo certificación ISO 9001:2015 y autorización DIGESERVISP — y le contactará en <b style={{ color: WHITE }}>{state.correo}</b> en menos de 12 horas hábiles.</>
            ) : (
              <>Un consultor senior revisará su caso y le contactará en <b style={{ color: WHITE }}>{state.correo}</b> en menos de 12 horas hábiles para coordinar su evaluación de riesgos.</>
            )}
          </p>

          <div className="mt-6">
            <p className="text-sm mb-3" style={{ color: MUTED }}>¿Prefiere no esperar? Elija un horario que le convenga:</p>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold px-7 py-3.5 text-sm transition-all hover:-translate-y-0.5"
              style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}
            >
              Agendar mi evaluación ahora <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs mt-2" style={{ color: MUTED }}>30 minutos · Confidencial · Sin compromiso</p>
          </div>

          <div className="mt-8 pt-8 text-left" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-xs font-semibold uppercase mb-4" style={{ color: ICE, letterSpacing: '.14em' }}>Mientras tanto</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm" style={{ color: MUTED }}>Guarde el remitente <b style={{ color: WHITE }}>gerencia@globalservices-ven.com</b> como confiable para que el correo de nuestro consultor no caiga en spam.</span>
              </li>
              {isTender ? (
                <li className="flex items-start gap-3">
                  <FileCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span className="text-sm" style={{ color: MUTED }}>Comparta su fecha límite de entrega respondiendo este correo — le enviamos la documentación y propuesta técnica antes de su cierre de licitación.</span>
                </li>
              ) : (
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                  <span className="text-sm" style={{ color: MUTED }}>¿Quiere un índice preliminar automatizado en minutos mientras espera? Pruebe también nuestra <a href="/analisis-riesgo" style={{ color: ICE }} className="hover:underline">herramienta de análisis de riesgo en línea</a>.</span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Lock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm" style={{ color: MUTED }}>Sus datos se manejan bajo protocolo de confidencialidad. Puede retirar su solicitud cuando quiera.</span>
              </li>
            </ul>
          </div>

          <Link to="/" className="inline-flex items-center gap-1.5 mt-10 text-sm font-semibold transition-all hover:gap-2.5"
            style={{ color: GOLD }}>
            Volver a cssg-global.com <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-9 px-6 text-center text-sm" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <div className="font-semibold mb-2" style={{ color: GOLD }}>CSSG GLOBAL</div>
        <p className="text-xs" style={{ color: `${MUTED}99` }}>
          CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
