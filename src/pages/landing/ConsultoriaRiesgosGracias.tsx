import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Check, ArrowRight, Lock, Mail, ShieldCheck, Download } from 'lucide-react';
import CookieConsent from '../../components/CookieConsent';

const GOLD = '#EAB308';
const BORDER = 'rgba(255,255,255,0.08)';
const PDF_URL = '/CSSG_Guia_Evaluacion_Riesgos_Seguridad.pdf';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

interface LocationState {
  nombre?: string;
  correo?: string;
  duplicate?: boolean;
}

export default function ConsultoriaRiesgosGracias() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as LocationState;

  useEffect(() => {
    if (!state.correo) {
      navigate('/consultoria-y-analisis-de-riesgos', { replace: true });
      return;
    }
    document.title = state.duplicate ? 'Ya tenemos tus datos | CSSG Global' : 'Guía en camino | CSSG Global';
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

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
            {state.duplicate ? 'Ya tenemos tus datos' : `Gracias${firstName ? `, ${firstName}` : ''}. Tu guía va en camino.`}
          </h1>

          <p className="text-gray-400">
            {state.duplicate
              ? <>Ya contamos con tu información en nuestro sistema. Te reenviamos la guía «Evaluación de Riesgos de Seguridad» a <b className="text-white">{state.correo}</b> en los próximos minutos.</>
              : <>Te enviamos el checklist ISO 31000 y la matriz de riesgos FMEA a <b className="text-white">{state.correo}</b>. Si no aparece en unos minutos, verifica spam o promociones.</>}
          </p>

          <a
            href={PDF_URL}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors"
          >
            <Download className="w-4 h-4" /> Descargar el PDF ahora
          </a>

          <div className="mt-8 pt-8 text-left" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-xs font-black uppercase tracking-widest mb-4 text-sky-400">Mientras tanto</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                <span className="text-sm text-gray-400">Guarda el remitente <b className="text-gray-300">gerencia@globalservices-ven.com</b> para no perderte el resto de la serie con criterios de auditoría.</span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm text-gray-400">¿Quieres un índice preliminar automatizado en minutos? Prueba también nuestra <a href="/analisis-riesgo" className="text-sky-400 hover:underline">herramienta de análisis de riesgo online</a>.</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                <span className="text-sm text-gray-400">Tus datos se manejan bajo protocolo de confidencialidad. Puedes darte de baja cuando quieras.</span>
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
