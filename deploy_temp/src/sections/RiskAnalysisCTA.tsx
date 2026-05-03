import { motion } from 'framer-motion';
import { ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function RiskAnalysisCTA() {
  const { t } = useTranslation();
  return (
    <section className="relative py-32 bg-[#030305] overflow-hidden" id="risk-cta">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-sky-900/15 rounded-full blur-[150px] mix-blend-screen" />
      </div>
      {/* Tactical Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl">
              <img 
                src="/risk_analysis_cta.png" 
                alt="Centro de Operaciones de Análisis de Riesgo CSSG"
                className="w-full h-[350px] md:h-[450px] object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/20 to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{t('cta.badge_avail')}</span>
              </div>
              
              {/* Bottom Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{t('cta.meth')}</p>
                    <p className="text-white font-bold text-sm">{t('cta.meth_val')}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10" />
                  <div>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">{t('cta.rep')}</p>
                    <p className="text-white font-bold text-sm">{t('cta.rep_val')}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/30 bg-sky-500/10">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.2em]">{t('cta.badge_free')}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white leading-tight">
              {t('cta.title_1')} <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">
                {t('cta.title_2')}
              </span>
            </h2>

            <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
              {t('cta.desc')}
            </p>

            <div className="space-y-4">
              {[
                { icon: <ShieldAlert className="w-4 h-4 text-sky-400" />, text: t('cta.li1') },
                { icon: <ShieldAlert className="w-4 h-4 text-sky-400" />, text: t('cta.li2') },
                { icon: <ShieldAlert className="w-4 h-4 text-sky-400" />, text: t('cta.li3') },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-400">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(14,165,233,0.4)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-sky-600 text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all group"
              >
                {t('cta.btn')}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                {t('cta.btn_sub')}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
