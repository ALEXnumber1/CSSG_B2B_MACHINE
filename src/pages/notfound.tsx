import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft, Shield } from 'lucide-react';

export default function NotFound() {
  const { i18n } = useTranslation();
  const isEs = i18n.language.startsWith('es');

  const copy = {
    badge: isEs ? 'ERROR 404 — RUTA NO ENCONTRADA' : 'ERROR 404 — ROUTE NOT FOUND',
    title: isEs ? 'Esta ubicación no figura en nuestro perímetro' : 'This location is outside our perimeter',
    body: isEs
      ? 'La página que intenta consultar no existe o fue reubicada. Verifique la URL o regrese al centro de operaciones.'
      : 'The page you are trying to reach does not exist or was relocated. Verify the URL or return to operations.',
    cta1: isEs ? 'Volver al inicio' : 'Return home',
    cta2: isEs ? 'Solicitar diagnóstico' : 'Request diagnostic',
    helpTitle: isEs ? 'Páginas más visitadas' : 'Most visited pages',
    links: [
      { to: '/consultoria', label: isEs ? 'Consultoría Estratégica' : 'Strategic Consulting' },
      { to: '/tecnologia', label: isEs ? 'Tecnología ShieldTrace' : 'ShieldTrace Technology' },
      { to: '/analisis-riesgo', label: isEs ? 'Análisis de Riesgo (Gratis)' : 'Risk Analysis (Free)' },
      { to: '/quienes-somos', label: isEs ? 'Quiénes Somos' : 'About Us' },
    ],
  };

  return (
    <main className="flex-1 flex items-center justify-center py-32 px-6 relative z-10">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 mb-8">
            <Shield className="w-4 h-4 text-red-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-300">
              {copy.badge}
            </span>
          </div>

          <h1 className="text-[120px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-sky-400 to-sky-700 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight">
            {copy.title}
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {copy.body}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-8 py-4 rounded-lg text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all"
            >
              <Home className="w-4 h-4" />
              {copy.cta1}
            </Link>
            <Link
              to="/#contacto"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-sky-500/50 hover:text-sky-400 text-white px-8 py-4 rounded-lg text-sm font-black uppercase tracking-widest transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {copy.cta2}
            </Link>
          </div>

          <div className="pt-12 border-t border-white/5">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-6 font-bold">
              {copy.helpTitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {copy.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-gray-400 hover:text-sky-400 py-3 px-4 rounded-lg border border-white/5 hover:border-sky-500/30 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}