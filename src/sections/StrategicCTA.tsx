import { motion } from 'framer-motion';
import { Shield, ArrowRight, Calendar, CheckCircle2, Award } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuditModal from '../components/AuditModal';

export default function StrategicCTA() {
  const { t } = useTranslation();
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-[#030305]">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 bg-[#0D0F16] shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left side: Large Image */}
            <div className="lg:w-1/2 relative min-h-[300px] md:min-h-[400px] lg:min-h-[600px]">
              <img 
                src="/diplomatic_security.png" 
                alt={t('strategic_cta.img_alt')} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0D0F16] lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F16] via-transparent to-transparent lg:hidden block" />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 p-3 md:p-6 bg-orange-600/90 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/20 shadow-xl z-20">
                <div className="text-xl md:text-3xl font-black text-white leading-none">17+</div>
                <div className="text-[8px] md:text-[10px] font-bold text-orange-100 uppercase tracking-widest mt-1">{t('trust.stat_years_label')}</div>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="lg:w-1/2 p-6 md:p-16 lg:p-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                <Award className="w-4 h-4" />
                <span>{t('strategic_cta.badge')}</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.95]">
                {t('strategic_cta.title_1')} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">
                  {t('strategic_cta.title_2')}
                </span>
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-10 font-light">
                {t('strategic_cta.desc_1')} <span className="text-white font-bold">{t('strategic_cta.desc_bold')}</span> {t('strategic_cta.desc_2')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {[
                  t('strategic_cta.i1'),
                  t('strategic_cta.i2'),
                  t('strategic_cta.i3'),
                  t('strategic_cta.i4')
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAuditModalOpen(true);
                  }}
                  className="group relative flex items-center gap-4 px-10 py-6 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black transition-all shadow-[0_20px_40px_rgba(234,88,12,0.3)] hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto justify-center"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-sm">{t('strategic_cta.btn')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex items-center gap-4 text-gray-500">
                  <Shield className="w-10 h-10 opacity-20" />
                  <div className="text-[10px] font-bold uppercase tracking-widest leading-tight">
                    {t('strategic_cta.footer_title')} <br /> {t('strategic_cta.footer_sub')}
                  </div>
                </div>
              </div>
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
