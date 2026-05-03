import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TheHumanShield() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#030305] relative z-10 overflow-hidden" id="human-shield">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sky-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Cinematic Image & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[700px]">
              <img 
                src="/cssg_officers_uniform_formal.png" 
                alt="Elena y Ricardo - Oficiales de Élite CSSG" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-80" />
              
              {/* Bottom Info Overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <ShieldCheck className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">Cero Rotación</p>
                      <p className="text-gray-400 text-xs">Confianza Validada</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-black text-2xl tabular-nums">100%</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">Lealtad</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gartner-style Mini Chart Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute -top-6 -right-6 bg-[#0D0F16] border border-white/10 p-6 rounded-2xl shadow-2xl hidden md:block w-64"
            >
              <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-4">Métrica de Retención</p>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                    <span>CSSG (Elite)</span>
                    <span className="text-white">98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} className="h-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                    <span>Mercado Promedio</span>
                    <span className="text-gray-500">35%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '35%' }} className="h-full bg-gray-600" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-[9px] text-gray-500 italic">"Los mejores salarios garantizan el mejor servicio."</p>
            </motion.div>
          </motion.div>

          {/* Right: The Story of Elena */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
              >
                <Users size={14} /> {t('shield.widget_badge')}
              </motion.div>
              
              <h2 className="text-5xl md:text-6xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase">
                {t('shield.elena_story_title')}
              </h2>
              <p className="text-2xl font-bold text-yellow-500 uppercase tracking-tight mb-8">
                {t('shield.elena_story_highlight')}
              </p>
            </div>

            <div className="space-y-8 relative">
              {/* Timeline Connector */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500 via-white/20 to-transparent ml-4" />
              
              {/* Point 1 */}
              <div className="relative pl-12">
                <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#EAB308]" />
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">{t('shield.elena_story_year')}</p>
                <p className="text-xl text-white font-bold">{t('shield.elena_story_start')}</p>
              </div>

              {/* Point 2 */}
              <div className="relative pl-12">
                <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Crecimiento Táctico</p>
                <p className="text-xl text-white font-bold leading-snug">{t('shield.elena_story_today')}</p>
              </div>

              {/* Point 3 - Impact */}
              <div className="relative pl-12">
                <div className="absolute left-3 top-2 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981]" />
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Impacto en el Cliente</p>
                <p className="text-lg text-gray-400 leading-relaxed italic">
                  "{t('shield.elena_story_impact')}"
                </p>
              </div>
            </div>

            <div className="pt-8 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                  <TrendingUp className="text-sky-400" size={18} /> +400%
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Incremento en estabilidad salarial</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm uppercase">
                  <ArrowUpRight className="text-emerald-400" size={18} /> Confianza
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Un oficial motivado es inquebrantable</p>
              </div>
            </div>

            {/* Academic Subjects Grid */}
            <div className="pt-10 border-t border-white/10">
              <p className="text-[10px] text-yellow-500 font-black uppercase tracking-[0.3em] mb-6">{t('shield.academic_badge')}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2 group hover:bg-yellow-500/10 hover:border-yellow-500/20 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500" />
                    <span className="text-[10px] text-gray-400 group-hover:text-white font-medium truncate">{t(`shield.c${i}_title`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
