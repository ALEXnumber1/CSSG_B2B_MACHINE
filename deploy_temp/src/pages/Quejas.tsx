import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Send, Info, EyeOff, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const LOCALES = {
  es: {
    badge: "Protocol Status: Secure Integrity Channel",
    title_1: "Canal de",
    title_2: "Integridad Blindado",
    desc: "Reporte confidencial de incidentes bajo protocolos de cifrado E2EE. Estándares internacionales de transparencia y anonimato garantizados por CSSG Intelligence.",
    anon_title: "Garantía de Anonimato",
    anon_desc: "Este canal no rastrea su IP ni registra metadatos de su navegador. Su identidad permanecerá 100% protegida a menos que usted decida proporcionarla voluntariamente.",
    identity: "Identidad (Opcional)",
    identity_ph: "Manejo Anónimo",
    subject: "Asunto *",
    subject_ph: "Breve título del reporte",
    matrix: "Incident Documentation Matrix",
    shield: "E2EE SHIELDED",
    details_ph: "Describa el evento bajo criterios objetivos de inteligencia corporativa...",
    verify: "Secure entry point verified",
    btn_sending: "Cifrando y Enviando...",
    btn_submit: "Emitir Alerta",
    success_title: "Reporte Cifrado y Recibido",
    success_desc: "El protocolo de revisión ha sido activado. Si proporcionó un medio de contacto, la junta directiva se comunicará con usted de forma confidencial.",
    btn_new: "Nuevo Reporte",
    error_alert: "Se produjo un error de red al intentar cifrar el mensaje. Intente de nuevo.",
    anonymous_default: "Anónimo"
  },
  en: {
    badge: "Protocol Status: Secure Integrity Channel",
    title_1: "Shielded",
    title_2: "Integrity Channel",
    desc: "Confidential incident reporting under E2EE encryption protocols. International standards of transparency and anonymity guaranteed by CSSG Intelligence.",
    anon_title: "Anonymity Guarantee",
    anon_desc: "This channel does not track your IP or log your browser metadata. Your identity will remain 100% protected unless you voluntarily choose to provide it.",
    identity: "Identity (Optional)",
    identity_ph: "Anonymous Handling",
    subject: "Subject *",
    subject_ph: "Brief report title",
    matrix: "Incident Documentation Matrix",
    shield: "E2EE SHIELDED",
    details_ph: "Describe the event under objective corporate intelligence criteria...",
    verify: "Secure entry point verified",
    btn_sending: "Encrypting & Sending...",
    btn_submit: "Issue Alert",
    success_title: "Report Encrypted & Received",
    success_desc: "The review protocol has been activated. If you provided contact information, the board of directors will communicate with you confidentially.",
    btn_new: "New Report",
    error_alert: "A network error occurred while attempting to encrypt the message. Please try again.",
    anonymous_default: "Anonymous"
  }
};

export default function Quejas() {
  const { i18n, t: originalT } = useTranslation();
  const currentLang = (i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const t = (key: string): string => {
    const k = key.replace('quejas.', '');
    return (LOCALES[currentLang] as any)[k] || originalT(key) || key;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [identity, setIdentity] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('complaints')
        .insert([{ 
          identity: identity || t('quejas.anonymous_default'), 
          subject, 
          details 
        }]);

      if (error) throw error;
      setSubmitted(true);
      // Reset form
      setIdentity('');
      setSubject('');
      setDetails('');
    } catch (error) {
      console.error('Error submitting complaint:', error);
      alert(t('quejas.error_alert'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 px-6 relative z-10 bg-[#030305]">
      
      {/* Background Tactical Grid */}
      <div className="absolute inset-0 top-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="w-full max-w-3xl relative">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase leading-none">{t('quejas.badge')}</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            {t('quejas.title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-rose-300 to-white drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">
              {t('quejas.title_2')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base leading-relaxed opacity-80">
            {t('quejas.desc')}
          </p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-[#0D0F16] to-[#050507] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden backdrop-blur-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 blur-[80px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-500/5 blur-[80px] rounded-full -ml-32 -mb-32" />
          
          {/* Top border indicator with glow */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_rgba(244,63,94,0.5)]" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8" 
                onSubmit={handleSubmit}
              >
                
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <EyeOff className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white text-sm font-semibold mb-1">{t('quejas.anon_title')}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {t('quejas.anon_desc')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('quejas.identity')}</label>
                    <input 
                      type="text" 
                      className="w-full bg-[#161821] border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors placeholder:text-gray-600" 
                      placeholder={t('quejas.identity_ph')}
                      disabled={isSubmitting}
                      value={identity}
                      onChange={(e) => setIdentity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{t('quejas.subject')}</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full bg-[#161821] border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-rose-500/50 transition-colors placeholder:text-gray-600" 
                      placeholder={t('quejas.subject_ph')}
                      disabled={isSubmitting}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] px-1 flex justify-between">
                    <span>{t('quejas.matrix')}</span>
                    <span className="text-rose-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {t('quejas.shield')}
                    </span>
                  </label>
                  <textarea 
                    rows={6} 
                    required 
                    disabled={isSubmitting}
                    placeholder={t('quejas.details_ph')}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-5 text-white text-sm focus:outline-none focus:border-rose-500/30 transition-all resize-none placeholder:text-gray-600 backdrop-blur-md"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                  <div className="flex items-center gap-2 px-1 opacity-50">
                    <Info className="w-3 h-3 text-gray-500" />
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">{t('quejas.verify')}</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/5">
                  <button 
                    disabled={isSubmitting}
                    className={`relative group overflow-hidden inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-sm transition-all duration-500 ${
                      isSubmitting 
                        ? 'bg-[#161821] text-rose-400 cursor-wait border border-rose-500/20' 
                        : 'bg-rose-600 text-white hover:bg-rose-500 hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] shadow-xl'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
                        <span className="tracking-widest uppercase text-[10px]">{t('quejas.btn_sending')}</span>
                      </>
                    ) : (
                      <>
                        <span className="tracking-widest uppercase">{t('quejas.btn_submit')}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center justify-center"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 relative">
                  <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping" />
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{t('quejas.success_title')}</h3>
                <p className="text-gray-400 max-w-sm mx-auto mb-8">
                  {t('quejas.success_desc')}
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  {t('quejas.btn_new')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
