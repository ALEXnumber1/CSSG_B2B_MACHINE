import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award, 
  ShieldCheck, 
  Cpu, 
  Zap,
  Globe,
  Lock,
  BarChart3, 
  MousePointer2,
  TrendingUp,
  CalendarDays,
  Target,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startSequence } from '../lib/sequences';
import { useTranslation } from 'react-i18next';

interface ConsultingFormData {
  nombre: string;
  empresa: string;
  correo: string;
  tipo_proyecto: string;
}

export default function Consultoria() {
  // Fix: Explicitly use the 'consultoria' namespace to ensure translations load correctly
  const { t } = useTranslation('consultoria');
  const [formData, setFormData] = useState<ConsultingFormData>({ 
    nombre: '', 
    empresa: '', 
    correo: '', 
    tipo_proyecto: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `Interés en Consultoría: ${formData.tipo_proyecto}`,
        fuente: 'consultoria_v5',
        score: 60,
      }]);

      if (error) throw error;

      if (formData.correo) {
        await startSequence(
          'lead-' + Date.now(), 
          formData.correo, 
          formData.nombre, 
          'consultoria', 
          formData.empresa
        );
      }

      setStatus('success');
      setFormData({ nombre: '', empresa: '', correo: '', tipo_proyecto: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const primaryBtnClass = "inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 md:px-10 py-4 md:py-5 rounded-2xl font-black text-base md:text-lg shadow-[0_20px_40px_rgba(14,165,233,0.3)] hover:shadow-[0_20px_60px_rgba(14,165,233,0.5)] hover:scale-105 transition-all group w-full sm:w-auto";

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      
      {/* Sticky CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 z-[100] px-6 sm:px-0 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xs"
          >
            <a 
              href="#contacto"
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-4 px-8 rounded-full font-black shadow-2xl backdrop-blur-md border border-white/20 hover:scale-105 transition-all text-sm uppercase tracking-widest"
            >
              <Zap className="w-4 h-4 fill-current" />
              {t('meeting_cta.btn_short') || "Solicitar Diagnóstico"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-sky-500/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/5 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] md:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative">
        
        {/* --- SECTION 1: HERO (INVESTMENT CONCEPT) --- */}
        <section className="relative mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center text-center lg:text-left">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-6 md:mb-8">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] md:text-xs font-black text-sky-300 uppercase tracking-widest">{t('hero.badge')}</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6 md:mb-8 leading-[1] md:leading-[0.9]">
                  {t('hero.title_white')} <br />
                  <span className="text-sky-400">
                    {t('hero.title_blue')}
                  </span>
                </h1>
                
                {/* Improved Copy/Design Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl border-l-0 lg:border-l-4 border-sky-500/50 pl-0 lg:pl-8 mb-8 md:mb-10 mx-auto lg:mx-0 relative group"
                >
                  <p className="mb-4">{t('hero.desc_p1')}</p>
                  <p className="text-yellow-400 font-bold drop-shadow-[0_0_10px_rgba(250,204,21,0.4)] transition-all group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]">
                    {t('hero.desc_p2')}
                  </p>
                  {/* Subtle decorative glow for the sidebar */}
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 bg-sky-500 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <motion.a 
                    href="#contacto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={primaryBtnClass}
                  >
                    {t('hero.cta')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              {/* Official Medal Image Sticker */}
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute -top-40 -right-20 md:-right-40 z-[30] w-[400px] h-[400px] md:w-[500px] md:h-[500px] cursor-pointer hidden sm:block drop-shadow-[0_50px_120px_rgba(250,204,21,0.4)]"
              >
                <img 
                  src="/images/medalla.png" 
                  alt="Garantía 4 Meses Gratis" 
                  className="w-full h-full object-contain"
                  style={{ 
                    imageRendering: 'auto',
                    filter: 'contrast(1.05) brightness(1.05) drop-shadow(0 0 10px rgba(250,204,21,0.2))'
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="relative rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(14,165,233,0.15)] bg-[#0A0B10]">
                  <img 
                    src="/consultoria_card.png" 
                    alt="Asset Protection View" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-60" />
                </div>
                <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl max-w-[200px]">
                  <Cpu className="w-8 h-8 text-sky-400 mb-3" />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Tecnología de Punta</p>
                  <p className="text-xs text-white font-medium leading-tight">Gestión Operativa basada en Datos.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- TICKER RIBBON --- */}
        <div className="mb-20 md:mb-32 overflow-hidden border-y border-sky-500/20 py-8 md:py-10 bg-sky-950/20 backdrop-blur-xl group cursor-pointer relative z-20 shadow-[0_0_50px_rgba(14,165,233,0.1)]">
          <motion.div 
            animate={{ x: [0, -1800] }}
            transition={{ 
              repeat: Infinity, 
              duration: 25, 
              ease: "linear" 
            }}
            className="flex whitespace-nowrap gap-12 md:gap-20"
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-xl md:text-2xl font-black tracking-tight text-sky-400 group-hover:text-yellow-400 transition-all duration-300 flex items-center gap-6 md:gap-10 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">
                {t('ticker.message')}
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-sky-500 group-hover:text-yellow-400 transition-colors" />
              </span>
            ))}
          </motion.div>
        </div>

        {/* --- SECTION 2: AUTHORITY --- */}
        <section className="mb-20 md:mb-32">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl md:rounded-[3rem] p-6 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-sky-500/5 to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 mb-6">
                  <Award className="w-3.5 h-3.5 text-sky-400" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('authority.badge')}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {t('authority.title')}
                </h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8">
                  {t('authority.desc')}
                </p>
                
                <div className="space-y-4 mb-8">
                  {(t('authority.points', { returnObjects: true }) as string[]).map((p: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm text-gray-300 font-medium">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl md:text-3xl font-black text-white mb-1">17 Años</div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trayectoria Líder</p>
                  </div>
                  <div className="p-5 md:p-6 rounded-2xl bg-sky-500 text-black border border-sky-400 shadow-xl">
                    <div className="text-2xl md:text-3xl font-black mb-1">80%</div>
                    <p className="text-[10px] font-bold text-black/70 uppercase tracking-widest">Éxito en Licitaciones</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8 md:space-y-12">
                {/* 100% KPI Pie Chart */}
                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 bg-white/[0.03] p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 text-center sm:text-left">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                      <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle
                        cx="64" cy="64" r="58" fill="transparent" stroke="#10b981" strokeWidth="8"
                        strokeDasharray="364.4" initial={{ strokeDashoffset: 364.4 }}
                        whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }} strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-base md:text-xl font-black text-white">100%</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-black text-lg md:text-xl mb-1">{t('authority.metrics.kpi')}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{t('authority.metrics.kpi_label')}</p>
                  </div>
                </div>

                <div className="bg-white/[0.03] p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h4 className="text-red-400 font-black text-lg md:text-xl mb-1">{t('authority.metrics.incidents')}</h4>
                      <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{t('authority.metrics.incidents_label')}</p>
                    </div>
                    <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-red-500/50" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 md:h-4 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "100%" }}
                        whileInView={{ width: "50%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-red-500 to-emerald-500 rounded-full"
                      />
                    </div>
                    <div className="flex justify-between text-[8px] md:text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <span>Antes: 100% Riesgo</span>
                      <span className="text-emerald-400">Después: -50%</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 bg-white/[0.03] p-6 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 text-center sm:text-left">
                  <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-sky-500/20 rounded-full blur-xl"
                    />
                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-sky-400 relative z-10" />
                  </div>
                  <div>
                    <h4 className="text-sky-400 font-black text-2xl md:text-3xl mb-1">{t('authority.metrics.roi')}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">{t('authority.metrics.roi_label')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 3: METHODOLOGY --- */}
        <section className="mb-20 md:mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-3xl md:text-6xl font-black text-white mb-12 md:mb-20 px-4 leading-[1.1] max-w-5xl mx-auto"
          >
            ¿Cómo logramos tus objetivos organizacionales o de gestión?
          </motion.h1>

          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="flex-1 order-2 lg:order-1 w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
              >
                <img 
                  src="/shieldtrace1.png" 
                  alt="Tactic Planning with ShieldTrace" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
              </motion.div>
            </div>
            
            <div className="flex-1 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{t('methodology.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                {t('methodology.title')}
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
                {t('methodology.desc')}
              </p>
              
              <div className="space-y-6">
                {(t('methodology.phases', { returnObjects: true }) as any[]).map((phase: any, i: number) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] md:text-xs font-black text-sky-400 group-hover:bg-sky-500 group-hover:text-black transition-all">
                        {phase.id}
                      </div>
                      {i < 3 && <div className="w-px h-full bg-white/10 group-hover:bg-sky-500/30 transition-all mt-2" />}
                    </div>
                    <div className="pb-6 md:pb-8">
                      <h4 className="text-lg md:text-xl font-bold text-white mb-2">{phase.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{phase.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION: SOCIAL PROOF --- */}
        <section className="mb-20 md:mb-32 relative">
          <div className="absolute inset-0 bg-white/[0.01] rounded-[2rem] md:rounded-[4rem] -z-10" />
          
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20 mb-6">
              <BarChart3 className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{t('social_proof.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 tracking-tighter">
              {t('social_proof.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 text-center"
            >
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">{t('social_proof.metrics.projects')}</div>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{t('social_proof.metrics.projects_label')}</p>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-sky-500/20 to-sky-500/5 border border-sky-500/20 text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="text-5xl md:text-6xl font-black text-sky-400 mb-2 tracking-tighter">{t('social_proof.metrics.savings')}</div>
                <p className="text-sky-300/60 font-bold uppercase tracking-widest text-[10px] md:text-xs">{t('social_proof.metrics.savings_label')}</p>
              </div>
              <TrendingUp className="absolute -bottom-4 -right-4 w-24 md:w-32 h-24 md:h-32 text-sky-500/10 rotate-12" />
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 text-center sm:col-span-2 md:col-span-1"
            >
              <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-2 tracking-tighter">{t('social_proof.metrics.incidents')}</div>
              <p className="text-emerald-300/60 font-bold uppercase tracking-widest text-[10px] md:text-xs">{t('social_proof.metrics.incidents_label')}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch mb-12 md:mb-20">
            <div className="lg:col-span-7 space-y-4 md:space-y-6">
              {(t('social_proof.cases', { returnObjects: true }) as any[]).map((c: any, i: number) => (
                <div key={i} className="group p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-sky-400 transition-colors">{c.title}</h4>
                    <MousePointer2 className="w-5 h-5 text-gray-600 group-hover:text-sky-500 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{c.result}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5">
              <div className="h-full p-8 md:p-10 rounded-3xl md:rounded-[3rem] bg-[#0A0B10] border border-white/10 relative overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-8 opacity-5 md:opacity-10">
                  <Lock className="w-24 md:w-32 h-24 md:h-32 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center mb-6 md:mb-8 border border-white/10">
                    <Lock className="w-5 h-5 md:w-6 md:h-6 text-sky-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-4 md:mb-6 leading-tight">
                    {t('social_proof.disclaimer.title')}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 md:mb-8">
                    {t('social_proof.disclaimer.text')}
                  </p>
                  <div className="pt-6 md:pt-8 border-t border-white/10">
                    <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">Privacidad Garantizada por Contrato</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 md:gap-8 py-12 md:py-16 bg-sky-500/5 rounded-3xl md:rounded-[3rem] border border-sky-500/10 backdrop-blur-sm text-center">
            <h3 className="text-xl md:text-3xl font-black text-white px-6">
              {t('meeting_cta.title')}
            </h3>
            <div className="px-6 w-full sm:w-auto">
              <motion.a 
                href="#contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={primaryBtnClass}
              >
                <CalendarDays className="w-5 h-5 md:w-6 md:h-6" />
                {t('meeting_cta.btn')}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </div>
            <p className="text-sky-400/60 text-xs md:text-sm font-bold uppercase tracking-widest px-4">
              {t('meeting_cta.note')}
            </p>
          </div>
        </section>

        {/* --- SECTION 4: DIFFERENTIATOR --- */}
        <section className="mb-20 md:mb-32 relative">
          <div className="absolute inset-0 bg-sky-500/5 rounded-3xl md:rounded-[4rem] blur-3xl -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20 mb-6">
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{t('technology.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
                {t('technology.title')}
              </h2>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 backdrop-blur-sm">
                <p className="text-sky-400 font-bold mb-4 text-xs md:text-sm uppercase tracking-widest">Definición Estratégica</p>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed italic">
                  {t('technology.psim_def')}
                </p>
              </div>

              <div className="space-y-8 md:space-y-12">
                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-4 flex items-center gap-3">
                    <Target className="w-5 h-5 md:w-6 md:h-6 text-sky-500" />
                    {t('technology.concept_title')}
                  </h4>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {t('technology.concept_desc')}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-6">{t('technology.haas_title')}</h4>
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {(t('technology.haas_benefits', { returnObjects: true }) as string[]).map((b: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 md:gap-4 bg-white/[0.03] p-4 md:p-5 rounded-xl md:rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all">
                        <div className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
                        <span className="text-xs md:text-sm text-gray-300 font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 px-4 sm:px-0">
                  <motion.a 
                    href="#contacto"
                    whileHover={{ scale: 1.05 }}
                    className={primaryBtnClass}
                  >
                    SOLICITAR DEMO DE PSIM
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-6 md:space-y-8 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/images/HS1.jpg" 
                    alt="ShieldTrace Interface" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
                </div>

                <div className="relative rounded-2xl md:rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/images/HS3.png" 
                    alt="HaaS Deployment" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 via-transparent to-transparent" />
                </div>

                <div className="bg-black/80 backdrop-blur-md border border-sky-500/50 px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-3 md:gap-4 shadow-2xl mx-auto sm:mx-0 w-fit">
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-sky-500 animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-widest">Certificación ISO Activa: ShieldTrace Engine</span>
                </div>
              </motion.div>

              <div className="space-y-4 md:space-y-6 pt-4">
                <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-indigo-500/10 border border-indigo-500/20 relative overflow-hidden">
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed relative z-10">
                    {t('technology.compliance')}
                  </p>
                  <ShieldCheck className="absolute -bottom-4 -right-4 w-20 md:w-24 h-20 md:h-24 text-indigo-500/10" />
                </div>

                <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
                  <p className="text-[10px] font-black text-yellow-400 uppercase tracking-widest mb-2">Compromiso Accountability Partner</p>
                  <p className="text-xs md:text-sm text-gray-400 italic">
                    {t('technology.accountability_note')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 5: FAQ --- */}
        <section className="mb-20 md:mb-32">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{t('faq.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t('faq.title')}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 px-2 sm:px-0">
            {(t('faq.questions', { returnObjects: true }) as any[]).map((faq: any, i: number) => (
              <div 
                key={i} 
                className={`rounded-xl md:rounded-2xl border transition-all duration-300 ${activeFaq === i ? 'bg-white/5 border-sky-500/50' : 'bg-white/[0.02] border-white/10'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-bold text-white text-base md:text-lg">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-sky-500 transition-transform shrink-0 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 md:px-8 pb-5 md:pb-6 text-gray-400 text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 6: OFFER & CLOSING --- */}
        <section id="contacto" className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl md:rounded-[3.5rem] overflow-hidden border border-white/10 bg-[#0A0B10] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            
            <div className="p-8 md:p-20 bg-gradient-to-br from-sky-600 to-indigo-900 relative">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/20 border border-white/20 mb-8">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">{t('offer.badge')}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  {t('offer.title')}
                </h3>
                <p className="text-white/80 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                  {t('offer.desc')}
                </p>
                
                <div className="bg-black/30 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-10 border border-white/10">
                  <div className="text-2xl md:text-3xl font-black text-yellow-400 mb-2">{t('offer.highlight')}</div>
                  <p className="text-white text-[10px] md:text-sm font-bold opacity-70 mb-6">{t('offer.inclusion')}</p>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                    <div>
                      <div className="text-xl md:text-2xl font-black text-white">{t('offer.pricing.org')}</div>
                      <p className="text-[8px] md:text-[10px] text-white/50 uppercase font-black">{t('offer.pricing.org_label')}</p>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-black text-white">{t('offer.pricing.prof')}</div>
                      <p className="text-[8px] md:text-[10px] text-white/50 uppercase font-black">{t('offer.pricing.prof_label')}</p>
                    </div>
                  </div>
                  <p className="text-[8px] md:text-[10px] text-white/40 mt-6 italic">{t('offer.note')}</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-20 bg-[#0D0F16]">
              <h4 className="text-xl md:text-2xl font-black text-white mb-2">{t('form.title')}</h4>
              <p className="text-sm text-gray-500 mb-8 md:mb-10">{t('form.desc')}</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('form.name')}</label>
                    <input 
                      type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-sky-500 transition-all font-medium text-sm md:text-base" 
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('form.company')}</label>
                    <input 
                      type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-sky-500 transition-all font-medium text-sm md:text-base" 
                      placeholder="Empresa C.A."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('form.email')}</label>
                  <input 
                    type="email" name="correo" required value={formData.correo} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-sky-500 transition-all font-medium text-sm md:text-base" 
                    placeholder="j.perez@empresa.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('form.type')}</label>
                  <select 
                    name="tipo_proyecto" required value={formData.tipo_proyecto} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-white focus:outline-none focus:border-sky-500 transition-all font-medium appearance-none text-sm md:text-base"
                  >
                    <option value="" className="bg-[#0D0F16]">Seleccione su necesidad</option>
                    <option value="licitacion" className="bg-[#0D0F16]">Optimización de Costos Operativos</option>
                    <option value="auditoria" className="bg-[#0D0F16]">Auditoría e ISO 31000</option>
                    <option value="proyecto" className="bg-[#0D0F16]">Implementación de ShieldTrace PSIM</option>
                    <option value="seguridad" className="bg-[#0D0F16]">Diagnóstico Integral de Riesgos</option>
                  </select>
                </div>

                {status === 'success' && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm rounded-xl text-center font-bold">
                    ¡Solicitud recibida! Un panel de expertos le contactará pronto.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black py-4 md:py-5 rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl group text-sm md:text-base"
                >
                  {status === 'loading' ? 'Procesando...' : (
                    <>
                      <span>{t('form.btn')}</span>
                      <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
