import { motion } from 'framer-motion';
import { AlertTriangle, XOctagon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MarketComparison() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#050508] relative overflow-hidden border-y border-white/5 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
            {t('market.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">{t('market.title_highlight')}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            {t('market.subtitle')}
          </p>
        </div>

        {/* Charts Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 bg-[#0B0D14] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl">
          
          {/* Chart 1: Salaries */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] text-center mb-8 opacity-80">{t('market.chart1_title')}</h3>
            
            <div className="space-y-8 relative">
              {/* Vertical line connector */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5"></div>
              
              {/* Competencia */}
              <div className="relative pl-6">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="flex justify-between text-xs uppercase font-bold mb-3">
                  <span className="text-gray-500">{t('market.comp_label')}</span>
                  <span className="text-red-400">&lt; $400</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '45%' }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-red-600 to-red-400" />
                </div>
              </div>

              {/* CSSG */}
              <div className="relative pl-6">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]"></div>
                <div className="flex justify-between text-xs uppercase font-bold mb-3">
                  <span className="text-emerald-400">{t('market.cssg_label')}</span>
                  <span className="text-emerald-400">$500 - $660+</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart 2: Budgets */}
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] text-center mb-8 opacity-80">{t('market.chart2_title')}</h3>
            
            <div className="space-y-8 relative">
              {/* Vertical line connector */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-white/5"></div>
              
              {/* Competencia */}
              <div className="relative pl-6">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="flex justify-between text-xs uppercase font-bold mb-3">
                  <span className="text-gray-500">{t('market.comp_label')}</span>
                  <span className="text-red-400">{t('market.comp_val')}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} className="h-full bg-gradient-to-r from-red-600 to-red-400" />
                </div>
              </div>

              {/* CSSG */}
              <div className="relative pl-6">
                <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]"></div>
                <div className="flex justify-between text-xs uppercase font-bold mb-3">
                  <span className="text-emerald-400">{t('market.cssg_label')}</span>
                  <span className="text-emerald-400">{t('market.cssg_val')}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '75%' }} viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Conclusion Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0D0F16] border border-red-500/20 p-6 md:p-12 rounded-[2rem] md:rounded-3xl mb-16 overflow-hidden flex flex-col items-center text-center shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <AlertTriangle className="text-red-500/50 w-12 h-12 mb-6" />
          <h3 className="text-2xl md:text-3xl font-light text-white leading-tight max-w-3xl">
            "{t('market.conclusion_1')} <span className="font-bold text-red-400">{t('market.conclusion_highlight_1')}</span> {t('market.conclusion_2')} <span className="font-bold text-red-400">{t('market.conclusion_highlight_2')}</span>."
          </h3>
        </motion.div>

        {/* Consequences Grid */}
        <div className="pt-10">
          <div className="text-center mb-12">
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-widest">
              {t('market.domino_title')}
            </h3>
            <p className="text-sm text-gray-500 mt-2 uppercase tracking-widest">{t('market.domino_sub')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: t('market.i1_t'), desc: t('market.i1_d') },
              { title: t('market.i2_t'), desc: t('market.i2_d') },
              { title: t('market.i3_t'), desc: t('market.i3_d') },
              { title: t('market.i4_t'), desc: t('market.i4_d') },
              { title: t('market.i5_t'), desc: t('market.i5_d') },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0B0D14] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:border-red-500/30 hover:bg-red-500/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-red-500/10 transition-colors">
                  <XOctagon className="text-gray-500 group-hover:text-red-400 w-5 h-5 transition-colors" />
                </div>
                <h4 className="text-white font-bold mb-3 uppercase text-xs tracking-wider">{item.title}</h4>
                <p className="text-gray-500 text-[10px] leading-relaxed uppercase font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
