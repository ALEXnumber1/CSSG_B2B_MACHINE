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

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center min-h-[100vh]">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-security-camera-monitoring-a-parking-lot-4467-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/40 to-[#030305]" />
        <HeroSpline />
        {/* Laser Scanning Effect */}
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-sky-500/30 z-20 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={i18n.language}
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md mb-8">
                  <Shield className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-medium tracking-wider text-sky-300 uppercase">{t('hero.badge')}</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-[1.05]">
                  {t('hero.title_1')} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-white">{t('hero.title_2')}</span> <br />
                  <span className="text-4xl md:text-6xl lg:text-7xl text-rose-600 drop-shadow-[0_0_15px_rgba(225,29,72,0.3)]">{t('hero.title_3')}</span>
                </h1>
                
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

          {/* Right: Floating Logo */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
            <motion.img 
              src="/logo.png" 
              alt="CSSG Logo"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -16, 0],
                rotate: [0, 3, 0, -3, 0]
              }}
              transition={{ 
                opacity: { delay: 0.4, duration: 1 },
                scale: { delay: 0.4, duration: 1, ease: "easeOut" },
                y: { delay: 1.2, duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { delay: 1.2, duration: 7, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] object-contain brightness-110 contrast-110 saturate-110 drop-shadow-[0_0_100px_rgba(234,179,8,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
