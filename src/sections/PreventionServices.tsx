import { motion } from 'framer-motion';
import { Crosshair, Activity, Users, Zap, Truck, GraduationCap, MessageSquare, Shield, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuditModal from '../components/AuditModal';

const services = [
  { id: 1, icon: <Crosshair className="w-6 h-6" />, accent: 'sky', bg: '/svc_perimetral.png' },
  { id: 2, icon: <Shield className="w-6 h-6" />, accent: 'sky', bg: '/diplomatic_security.png' },
  { id: 3, icon: <Activity className="w-6 h-6" />, accent: 'sky', bg: '/svc_auditoria.png', hideOnMobile: true },
  { id: 4, icon: <Users className="w-6 h-6" />, accent: 'sky', bg: '/svc_ejecutivos.png' },
  { id: 5, icon: <Zap className="w-6 h-6" />, accent: 'emerald', bg: '/svc_reaccion_motorizada.png' },
  { id: 6, icon: <Truck className="w-6 h-6" />, accent: 'emerald', bg: '/svc_custodia.png', hideOnMobile: true },
  { id: 7, icon: <Activity className="w-6 h-6" />, accent: 'emerald', bg: '/ambulancia.png', hideOnMobile: true },
  { id: 8, icon: <MessageSquare className="w-6 h-6" />, accent: 'sky', bg: '/svc_licitaciones.png' },
  { id: 9, icon: <GraduationCap className="w-6 h-6" />, accent: 'amber', bg: '/academia.png' },
];

const accentConfig = {
  sky: {
    icon: 'text-sky-400',
    hoverBorder: 'hover:border-sky-500/30',
    hoverIconBg: 'group-hover:bg-sky-500/10',
    tint: 'bg-sky-950/70',
    tintHover: 'group-hover:bg-sky-950/50',
  },
  emerald: {
    icon: 'text-emerald-400',
    hoverBorder: 'hover:border-emerald-500/30',
    hoverIconBg: 'group-hover:bg-emerald-500/10',
    tint: 'bg-emerald-950/70',
    tintHover: 'group-hover:bg-emerald-950/50',
  },
  amber: {
    icon: 'text-amber-400',
    hoverBorder: 'hover:border-amber-500/30',
    hoverIconBg: 'group-hover:bg-amber-500/10',
    tint: 'bg-amber-950/70',
    tintHover: 'group-hover:bg-amber-950/50',
  },
};

export default function PreventionServices() {
  const { t } = useTranslation();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <section className="py-24 relative z-10" id="services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/5 bg-white/5 mb-6"
          >
            <div className="w-1 h-1 rounded-full bg-sky-400" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em]">{t('services.badge')}</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-light tracking-tighter mb-6 text-white leading-tight">
            {t('services.title_1')} <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{t('services.title_2')}</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const colors = accentConfig[svc.accent as keyof typeof accentConfig];
            const isMain = svc.id === 2;

            return (
              <motion.div 
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative overflow-hidden border border-white/[0.08] rounded-3xl ${colors.hoverBorder} transition-all duration-500 min-h-[300px] shadow-2xl ${isMain ? 'ring-2 ring-orange-500/50 scale-105 z-20 order-first lg:order-none' : ''} ${svc.hideOnMobile ? 'hidden lg:block' : ''}`}
              >
                <img 
                  src={svc.bg} 
                  alt="" 
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${isMain ? 'opacity-100' : 'opacity-30 group-hover:opacity-80 group-hover:scale-110 group-hover:brightness-125'}`}
                  loading="lazy"
                />
                
                {!isMain && (
                  <>
                    <div className={`absolute inset-0 ${colors.tint} group-hover:bg-transparent transition-all duration-1000 mix-blend-multiply`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:from-black/80 transition-all duration-1000" />
                  </>
                )}

                {isMain && <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />}

                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  {isMain && (
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {t('prevention.main_badge')}
                      </span>
                    </div>
                  )}

                  <div className={`mb-6 w-12 h-12 ${isMain ? 'bg-black border border-white/10' : 'bg-black/40 border border-white/10 text-sky-400'} rounded-xl flex items-center justify-center transition-colors duration-500 backdrop-blur-md`}>
                    {isMain ? (
                      <img src="/logo.png" alt="CSSG Logo" className="w-8 h-8 object-contain brightness-110" />
                    ) : (
                      svc.icon
                    )}
                  </div>
                  
                  <h3 className={`text-xl font-black mb-3 tracking-tight leading-tight uppercase ${isMain ? 'text-black' : 'text-white'}`}>
                    {isMain ? t('services.s2_title_clean') : t(`services.s${svc.id}_title`)}
                  </h3>
                  
                  <p className={`text-xs leading-relaxed mb-4 font-bold ${isMain ? 'text-gray-900 bg-white/50 backdrop-blur-sm p-2 rounded-lg' : 'text-gray-300'}`}>
                    {t(`services.s${svc.id}_desc`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Strategic Meeting CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 group relative overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Background Image with Cinematic Effects */}
          <div className="absolute inset-0">
            <img 
              src="/risk_analysis_cta.png" 
              alt="Security Analysis" 
              className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-sky-950/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.15),transparent)]" />
          </div>

          <div className="relative z-10 p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{t('prevention.cta_badge')}</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter uppercase italic leading-[0.9]">
                {t('prevention.cta_title_1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-100">{t('prevention.cta_title_2')}</span>
              </h3>
              <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light max-w-xl">
                {t('prevention.cta_desc')}
              </p>
            </div>
            
            <div className="shrink-0">
              <button 
                onClick={() => setIsAuditModalOpen(true)}
                className="group relative flex flex-col items-center gap-3 px-14 py-10 bg-sky-700 hover:bg-sky-600 text-white rounded-[2rem] font-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 cursor-pointer"
              >
                <div className="flex items-center gap-5 uppercase tracking-[0.3em] text-sm md:text-base">
                  <span>{t('prevention.cta_btn')}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </div>
                <span className="text-xs md:text-sm text-orange-400/90 normal-case tracking-normal font-bold">
                  {t('prevention.cta_note')}
                </span>
                
                {/* Subtle Border Glow */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/5 group-hover:border-white/20 transition-colors" />
              </button>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-center mt-4">
                {t('prevention.cta_footer')}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
      <AuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </section>
  );
}
