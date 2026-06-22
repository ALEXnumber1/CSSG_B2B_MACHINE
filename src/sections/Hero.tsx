import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LeadModal from '../components/LeadModal';
import AuditModal from '../components/AuditModal';
import HeroSpline from '../components/HeroSpline';


export default function Hero() {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  // Inicialización síncrona: evita que el video se inyecte tarde en desktop (CLS)

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[100vh]">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/foto-hero.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-100 brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/40 to-[#030305]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/80 via-transparent to-[#030305]/40" />
        <HeroSpline />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={i18n.language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md mb-8">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-medium tracking-wider text-sky-300 uppercase">{t('hero.badge')}</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-3 leading-[1.05]">
                  {t('hero.title_1')}
                </h1>
                <p className="text-base md:text-lg font-black text-white mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">{t('hero.title_2')}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-rose-500 drop-shadow-[0_0_8px_rgba(225,29,72,0.4)]">{t('hero.title_3')}</span>
                </p>
                
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed font-light">
                  <strong className="text-white font-bold">{t('hero.subtitle').split('.')[0]}.</strong>
                  <span className="hidden md:inline"> {t('hero.subtitle').split('.').slice(1).join('.')}</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(14,165,233,0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsAuditModalOpen(true)}
                    className="px-8 py-5 bg-sky-600 text-white rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-900/40"
                  >
                    {t('hero.btn_audit')}
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)', boxShadow: '0 0 30px rgba(255,255,255,0.05)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="hidden sm:flex px-8 py-5 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase tracking-widest text-sm items-center justify-center gap-2 transition-all"
                  >
                    {t('hero.btn_divisions')}
                  </motion.button>
                </div>

                <LeadModal 
                  isOpen={isModalOpen} 
                  onClose={() => setIsModalOpen(false)} 
                />
                <AuditModal 
                  isOpen={isAuditModalOpen} 
                  onClose={() => setIsAuditModalOpen(false)} 
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Logo */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <img
              src="/logo.webp"
              alt="CSSG — Company of Security and Service Global"
              fetchPriority="high"
              width="500"
              height="500"
              className="w-[400px] h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[580px] xl:h-[580px] object-contain brightness-110 contrast-110 saturate-110 drop-shadow-[0_0_100px_rgba(234,179,8,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
