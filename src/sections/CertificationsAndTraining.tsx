import { motion, type Variants } from 'framer-motion';
import { Award, ShieldCheck, BookOpen, Activity, Users, Eye, TrendingUp, MessageSquare, MapPin, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CertificationsAndTraining() {
  const { t } = useTranslation();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="py-24 bg-[#0a0a0e] relative z-10 border-t border-white/[0.02]" id="certifications">
      {/* Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-sky-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
            <Award className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{t('cert.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tighter leading-tight">
            {t('cert.title_1')} <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{t('cert.title_2')}</span>
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto">
            {t('cert.desc')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* ISO 9001 OFFICIAL CERTIFICATE BLOCK */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative bg-white/[0.04] backdrop-blur-3xl border-2 border-sky-500/30 rounded-[2rem] p-8 md:p-12 shadow-[0_0_50px_rgba(14,165,233,0.1)] flex flex-col"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 border-2 border-sky-500/20 rounded-lg flex items-center justify-center p-2 bg-sky-500/5">
                  <Award className="w-10 h-10 text-sky-400" />
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-sky-500 font-black uppercase tracking-widest">{t('trust.cert_iso_num')}</p>
                  <p className="text-[8px] text-gray-500">{t('cert.iso_tag')}</p>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">{t('cert.iso_title')}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {t('cert.iso_desc_1')} <span className="text-sky-400 font-bold">{t('cert.iso_desc_bold')}</span> {t('cert.iso_desc_2')}
              </p>
              
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 group/cert">
                <img 
                  src="/CERTIFICADO 9001 INGLES.jpg" 
                  alt={t('cert.iso_alt', { defaultValue: 'Official ISO 9001:2015 Certificate' })} 
                  className="w-full h-auto opacity-70 group-hover:opacity-100 transition-all duration-700 shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 pointer-events-none">
                  <span className="text-white font-bold text-xs uppercase tracking-widest px-4 py-2 border border-white/20 rounded-full">{t('cert.iso_btn')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ZENTINEL GLOBAL BLOCK */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative bg-white/[0.06] backdrop-blur-3xl border border-white/[0.1] rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col"
          >
            <div className="relative z-10 flex-1">
              <div className="flex items-start justify-between mb-8">
                <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <img src="/Zentinel logo-2.png" alt="Zentinel Global" className="h-20 w-auto object-contain" />
                </div>
                {/* Verification Protocol Badge */}
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">{t('cert.zen_badge')}</span>
                  </div>
                  <p className="text-[8px] text-gray-500 leading-tight">{t('cert.zen_badge_sub')}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
                  {t('cert.zen_title')} <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white italic font-serif">Zentinel Global</span>
                </h3>
                <p className="text-emerald-400/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.1em]">
                  {t('cert.zen_subtitle')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 1, icon: <Activity className="w-4 h-4 text-emerald-400" /> },
                  { id: 2, icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
                  { id: 3, icon: <Users className="w-4 h-4 text-emerald-400" /> },
                  { id: 4, icon: <Eye className="w-4 h-4 text-emerald-400" /> },
                  { id: 5, icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
                  { id: 6, icon: <MessageSquare className="w-4 h-4 text-emerald-400" /> },
                  { id: 7, icon: <Award className="w-4 h-4 text-emerald-400" /> },
                  { id: 8, icon: <BookOpen className="w-4 h-4 text-emerald-400" /> },
                  { id: 9, icon: <MapPin className="w-4 h-4 text-emerald-400" /> },
                  { id: 10, icon: <ShieldAlert className="w-4 h-4 text-emerald-400" /> }
                ].map((item) => (
                  <motion.div 
                    key={item.id}
                    variants={itemVariants} 
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-emerald-500/30 transition-all group/item"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-white text-sm font-bold tracking-tight">{t(`the_human_shield.c${item.id}_title`)}</h4>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed pl-1">
                      {t(`the_human_shield.c${item.id}_desc`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
