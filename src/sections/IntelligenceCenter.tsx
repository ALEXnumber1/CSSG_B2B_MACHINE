import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Search, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TacticalFeed from '../components/TacticalFeed';

const LOCALES = {
  es: {
    badge: "INTELIGENCIA AVANZADA",
    title_1: "Centro de",
    title_2: "Inteligencia Operativa",
    desc: "Supervisión perimetral, análisis OSINT en tiempo real y detección de patrones de riesgo para la protección de activos de alta importancia.",
    item1_title: "Monitoreo OSINT",
    item1_desc: "Recopilación activa de datos de fuentes abiertas sobre el entorno.",
    item2_title: "Análisis Táctico",
    item2_desc: "Evaluación continua de amenazas para la toma de decisiones.",
    btn: "Consultar con Inteligencia"
  },
  en: {
    badge: "ADVANCED INTELLIGENCE",
    title_1: "Operational",
    title_2: "Intelligence Center",
    desc: "Perimeter surveillance, real-time OSINT analysis, and risk pattern detection for the protection of critical assets.",
    item1_title: "OSINT Monitoring",
    item1_desc: "Active collection of open source data about the operational environment.",
    item2_title: "Tactical Analysis",
    item2_desc: "Continuous assessment of threats to support proactive decisions.",
    btn: "Consult with Intelligence"
  }
};

const IntelligenceCenter: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'es';
  const content = LOCALES[lang];

  return (
    <section className="py-24 bg-[#030305] relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{content.badge}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter">
              {content.title_1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{content.title_2}</span>
            </h2>
            
            <p className="hidden md:block text-gray-400 text-lg leading-relaxed max-w-xl">
              {content.desc}
            </p>
 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {[
                { icon: <Search className="w-5 h-5 text-sky-400" />, title: content.item1_title, desc: content.item1_desc },
                { icon: <Shield className="w-5 h-5 text-sky-400" />, title: content.item2_title, desc: content.item2_desc }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest">
                    {item.icon} {item.title}
                  </div>
                  <p className="hidden md:block text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
 
            <div className="pt-6">
              <button onClick={() => { document.getElementById('risk-cta')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-widest hover:text-sky-300 transition-colors group">
                {content.btn} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Side: Tactical Feed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* HUD Decoration around the feed */}
            <div className="absolute -inset-4 border border-sky-500/10 rounded-[2rem] pointer-events-none" />
            <div className="absolute -inset-10 border border-sky-500/5 rounded-[3rem] pointer-events-none" />
            
            <TacticalFeed />
            
            {/* Tactical Label */}
            <div className="absolute -bottom-6 -right-6 px-4 py-2 bg-sky-600 rounded text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-xl">
              Live OSINT Stream v4.2
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default IntelligenceCenter;
