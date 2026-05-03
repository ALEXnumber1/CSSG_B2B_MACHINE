import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';
import { startSequence } from '../lib/sequences';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    telefono: '',
    whatsapp_consent: false,
    requerimiento: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const asunto = params.get('asunto');
    
    if (asunto === 'tecnologia') {
      setFormData(prev => ({
        ...prev,
        requerimiento: t('contact.default_req')
      }));
      // Scroll sutil hacia el formulario si viene referenciado
      const el = document.getElementById('contacto');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // 1. Guardar en pipeline de leads (CRM)
      const { error: supabaseError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        telefono: formData.telefono,
        mensaje: `${formData.requerimiento} [WHATSAPP: ${formData.whatsapp_consent ? 'SI' : 'NO'}]`,
        fuente: 'contacto',
        score: 20,
        estado: 'nuevo'
      }]);

      if (supabaseError) throw supabaseError;

      // Start Sequence
      const { data: leadData } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', formData.correo)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (leadData) {
        await startSequence(leadData.id, formData.correo, formData.nombre, 'contacto', formData.empresa);
      }

      setStatus('success');
      setFormData({ nombre: '', empresa: '', correo: '', telefono: '', whatsapp_consent: false, requerimiento: '' });
    } catch (error) {
      console.error('Error al procesar solicitud:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 relative z-10" id="contacto">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t('contact.title_1')} <span className="text-sky-400">{t('contact.title_2')}</span>
          </h2>
          <p className="text-gray-400">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Col */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">{t('footer.contact')}</h4>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sky-400">📍</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter mb-1">Dirección Física</p>
                      <p className="text-white text-sm leading-relaxed">Calle la Joya, Edif. Cosmos, Piso 8, Ofic. 8B, Chacao, Caracas.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sky-400">📞</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter mb-1">Teléfono Directo</p>
                      <a href="tel:+584143174373" className="text-white text-lg font-black hover:text-sky-400 transition-colors">+58 414 3174373</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                      <span className="text-sky-400">✉️</span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter mb-1">Correo Electrónico</p>
                      <p className="text-white text-sm">operaciones@cssg-global.com</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-sky-500/5 border border-sky-500/20 p-6 rounded-2xl">
                <p className="text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Disponibilidad</p>
                <p className="text-white text-sm font-bold">Atención 24/7 para misiones críticas y seguridad diplomática.</p>
              </div>
            </motion.div>
          </div>

          {/* Form Col */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0B0D14]/80 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-2xl"
            >
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('contact.success_title')}</h3>
                  <p className="text-gray-400">{t('contact.success_desc')}</p>
                  <button 
                    type="submit"
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sky-400 hover:text-sky-300 text-sm font-semibold transition-colors"
                  >
                    {t('contact.success_btn')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 pl-1">{t('contact.label_name')}</label>
                      <input 
                        type="text" 
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        placeholder={t('contact.placeholder_name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 pl-1">{t('contact.label_company')}</label>
                      <input 
                        type="text" 
                        name="empresa"
                        required
                        value={formData.empresa}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        placeholder={t('contact.placeholder_company')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 pl-1">{t('contact.label_email')}</label>
                      <input 
                        type="email" 
                        name="correo"
                        required
                        value={formData.correo}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        placeholder={t('contact.placeholder_email')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 pl-1">{t('contact.label_phone')}</label>
                      <input 
                        type="tel" 
                        name="telefono"
                        required
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
                        placeholder={t('contact.placeholder_phone')}
                      />
                      <div className="flex items-center space-x-2 pl-1 mt-2">
                        <input 
                          type="checkbox" 
                          id="whatsapp_consent"
                          name="whatsapp_consent"
                          checked={formData.whatsapp_consent}
                          onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_consent: e.target.checked }))}
                          className="w-4 h-4 rounded border-white/10 bg-black/40 text-sky-500 focus:ring-sky-500 focus:ring-offset-black"
                        />
                        <label htmlFor="whatsapp_consent" className="text-[11px] text-gray-400 cursor-pointer">
                          {t('contact.whatsapp_label')}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 pl-1">{t('contact.label_req')}</label>
                    <textarea 
                      rows={4}
                      name="requerimiento"
                      required
                      value={formData.requerimiento}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors resize-none"
                      placeholder={t('contact.placeholder_req')}
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                      {t('contact.error_msg')}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(14,165,233,0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-sky-600 text-white py-5 rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t('contact.btn_sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.btn_send')}</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
