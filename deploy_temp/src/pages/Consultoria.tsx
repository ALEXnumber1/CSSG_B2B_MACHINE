import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award, Target, Briefcase, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startSequence } from '../lib/sequences';
import { useTranslation } from 'react-i18next';

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ConsultingFormData {
  nombre: string;
  empresa: string;
  correo: string;
  tipo_proyecto: string;
}

export default function Consultoria() {
  const { t } = useTranslation();
  
  const stats: StatItem[] = [
    { value: t('consultoria.stats.success'), label: t('consultoria.stats.success_label'), icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { value: t('consultoria.stats.years'), label: t('consultoria.stats.years_label'), icon: <Award className="w-5 h-5 text-sky-400" /> },
    { value: t('consultoria.stats.certified'), label: t('consultoria.stats.certified_label'), icon: <Users className="w-5 h-5 text-indigo-400" /> },
  ];

  const steps = [
    { step: '01', title: t('consultoria.steps.s1_title'), desc: t('consultoria.steps.s1_desc') },
    { step: '02', title: t('consultoria.steps.s2_title'), desc: t('consultoria.steps.s2_desc') },
    { step: '03', title: t('consultoria.steps.s3_title'), desc: t('consultoria.steps.s3_desc') },
    { step: '04', title: t('consultoria.steps.s4_title'), desc: t('consultoria.steps.s4_desc') },
  ];

  const [formData, setFormData] = useState<ConsultingFormData>({ 
    nombre: '', 
    empresa: '', 
    correo: '', 
    tipo_proyecto: '' 
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Registrar en el CRM principal (leads)
      const { error } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `Interés en Consultoría: ${formData.tipo_proyecto}`,
        fuente: 'consultoria',
        score: 40,
      }]);

      if (error) throw error;

      // Email de bienvenida automático y secuencia
      if (formData.correo) {
        await startSequence(
          'lead-' + Date.now(), // Fallback ID si no tenemos el de Supabase
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ConsultingFormData) => ({ ...prev, [name as keyof ConsultingFormData]: value }));
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">

        {/* Hero Section Reestructurada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
              <Briefcase className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{t('consultoria.hero.badge')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6 leading-tight">
              {t('consultoria.hero.title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{t('consultoria.hero.title_2')}</span>
            </h1>
            <h2 className="text-xl text-gray-300 font-light leading-relaxed max-w-xl border-l-2 border-sky-500 pl-6">
              {t('consultoria.hero.desc')}
            </h2>
            
            <div className="mt-10 flex gap-4">
              <a href="#contacto" className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-sky-400 transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                {t('consultoria.hero.btn')}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[500px] flex items-center"
          >
            {/* Glow decorativo mínimo */}
            <div className="absolute -inset-10 bg-sky-500/5 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.9)] w-full">
              <img 
                src="/images/consultoria-hero-exact.png" 
                alt="Consultoría Strategica CSSG" 
                className="w-full h-full object-cover"
              />
              {/* Overlay sutil para asegurar el blend inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent opacity-40" />
            </div>
          </motion.div>
        </div>

        {/* Stats / Prueba Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Metodología */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('consultoria.methodology.title')}</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              {t('consultoria.methodology.desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 relative"
              >
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4">{s.step}</span>
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                  <span className="text-sky-400 font-bold text-sm">{s.step}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credenciales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 md:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-indigo-500/20 bg-indigo-500/5 mb-6">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">{t('consultoria.team.badge')}</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{t('consultoria.team.title')}</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {t('consultoria.team.desc')}
              </p>
              <ul className="space-y-3">
                {[
                  t('consultoria.team.li1'),
                  t('consultoria.team.li2'),
                  t('consultoria.team.li3'),
                  t('consultoria.team.li4'),
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white mb-2">{t('consultoria.team.stat1_val')}</div>
                <p className="text-gray-400 text-sm">{t('consultoria.team.stat1_desc')}</p>
              </div>
              <div className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-white mb-2">{t('consultoria.team.stat2_val')}</div>
                <p className="text-gray-400 text-sm">{t('consultoria.team.stat2_desc')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Form — Pre-entrevista */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">{t('consultoria.form.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('consultoria.form.title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {t('consultoria.form.desc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D0F16] border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-transparent" />

            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('consultoria.form.success_title')}</h3>
                <p className="text-gray-400">{t('consultoria.form.success_desc')}</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors">
                  {t('consultoria.form.success_btn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('consultoria.form.name')}</label>
                    <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder={t('consultoria.form.name_ph')} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('consultoria.form.company')}</label>
                    <input type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder={t('consultoria.form.company_ph')} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('consultoria.form.email')}</label>
                  <input type="email" name="correo" required value={formData.correo} onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors" placeholder={t('consultoria.form.email_ph')} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('consultoria.form.type')}</label>
                  <select name="tipo_proyecto" required value={formData.tipo_proyecto} onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors appearance-none">
                    <option value="" className="bg-[#0D0F16]">{t('consultoria.form.opt_select')}</option>
                    <option value="licitacion" className="bg-[#0D0F16]">{t('consultoria.form.opt_lic')}</option>
                    <option value="auditoria" className="bg-[#0D0F16]">{t('consultoria.form.opt_aud')}</option>
                    <option value="proyecto" className="bg-[#0D0F16]">{t('consultoria.form.opt_pro')}</option>
                    <option value="optimizacion" className="bg-[#0D0F16]">{t('consultoria.form.opt_opt')}</option>
                    <option value="otro" className="bg-[#0D0F16]">{t('consultoria.form.opt_other')}</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                    {t('consultoria.form.error')}
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.08)]">
                  {status === 'loading' ? t('consultoria.form.btn_loading') : (
                    <>
                      <span>{t('consultoria.form.btn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
