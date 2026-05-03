import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function TrustSignals() {
  const { t } = useTranslation();
  return (
    <div className="w-full border-y border-[#333345] bg-[#08080B] py-12 relative z-10 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-6 overflow-hidden">
        <p className="text-center text-xs tracking-[0.25em] text-gray-500/80 uppercase mb-8 font-semibold">
          {t('trust.subtitle')}
        </p>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 lg:gap-20 opacity-80 hover:opacity-100 transition-opacity duration-700">
          
          {/* Years of Experience */}
          <div className="flex flex-col items-center gap-2 group">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white"
            >
              {t('trust.stat_years')}
            </motion.span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('trust.stat_years_label')}</span>
          </div>

          <div className="h-12 w-px bg-gray-800 hidden md:block"></div>

          {/* ISO Certification */}
          <a href="/#certifications" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 rounded-full border border-sky-500/30 bg-sky-900/10 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.1)] group-hover:border-sky-400 transition-colors">
              <span className="font-bold text-sky-400 text-sm tracking-tighter">{t('trust.cert_iso')}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-widest text-lg">{t('trust.cert_iso_num')}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">{t('trust.cert_iso_label')}</span>
            </div>
          </a>

          <div className="h-12 w-px bg-gray-800 hidden md:block"></div>

          {/* ZentinelGlobal */}
          <a href="/#certifications" className="flex flex-col items-center md:items-start group cursor-pointer hover:opacity-80 transition-opacity max-w-[250px]">
             <span className="font-serif italic text-2xl text-white tracking-widest text-center md:text-left">{t('trust.acad_title')}</span>
             <span className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed text-center md:text-left">{t('trust.acad_label')}</span>
          </a>

          <div className="h-12 w-px bg-gray-800 hidden md:block"></div>

          {/* DIGESERVISP */}
          <a href="/#certifications" className="flex items-center gap-4 group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-center md:items-end">
              <span className="font-bold text-white tracking-widest text-lg uppercase">{t('trust.digeservisp_title')}</span>
              <span className="text-xs text-sky-400 font-black uppercase tracking-[0.2em]">{t('trust.digeservisp_label')}</span>
            </div>
            <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <img src="/RESOLUCION DIGESERVIP.png" alt="DIGESERVISP" className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all" />
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}
