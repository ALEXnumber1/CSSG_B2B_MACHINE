import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { startSequence } from '../lib/sequences';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    date: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate Baremo
    let baremoScore = 40; // Base score higher since they want to schedule
    const isCorporate = !formData.email.match(/@(gmail|hotmail|outlook|yahoo|icloud|live)\./i);
    if (isCorporate) baremoScore += 40; 
    if (formData.phone.length > 8) baremoScore += 20;

    try {
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{ 
          nombre: formData.name,
          correo: formData.email,
          empresa: formData.company,
          telefono: formData.phone,
          fuente: 'Agendamiento Auditoria',
          score: baremoScore,
          estado: 'nuevo',
          mensaje: `[SERVICIO: ${formData.service}] [FECHA TENTATIVA: ${formData.date}]`
        }]);

      if (supabaseError) throw supabaseError;

      // Start Sequence
      const { data: leadData } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', formData.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (leadData) {
        await startSequence(leadData.id, formData.email, formData.name, 'consultoria', formData.company);
      }
    } catch (error) {
      console.warn('CRM Sync Error (Lead saved locally in console):', formData, error);
    }

    setSubmitted(true);
    setIsSubmitting(false);

    // Open Calendar
    window.open('https://calendar.app.google/jGP8yq3BCM5Rp525A', '_blank');

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', date: '' });
      }, 500);
    }, 2500);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0D0F16] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.2)]"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full -mr-16 -mt-16" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>            {!submitted ? (
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('audit_modal.title')}</h3>
                  <p className="text-gray-400 text-sm">
                    {t('audit_modal.subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_name')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder={t('audit_modal.placeholder_name')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_company')}</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder={t('audit_modal.placeholder_company')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_email')}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder={t('audit_modal.placeholder_email')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_phone')}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder={t('audit_modal.placeholder_phone')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_service')}</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                      >
                        <option value="" disabled>{t('audit_modal.placeholder_service')}</option>
                        <option value="Auditoría de Riesgos">{t('audit_modal.service_1')}</option>
                        <option value="Consultoría Ejecutiva">{t('audit_modal.service_2')}</option>
                        <option value="Vigilancia Estratégica">{t('audit_modal.service_3')}</option>
                        <option value="Escolta VIP">{t('audit_modal.service_4')}</option>
                        <option value="Otro">{t('audit_modal.service_5')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('audit_modal.label_date')}</label>
                    <div className="relative">
                      <input 
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2 mt-6"
                  >
                    {isSubmitting ? t('audit_modal.btn_processing') : t('audit_modal.btn_continue')}
                    <Calendar className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('audit_modal.success_title')}</h3>
                <p className="text-gray-400">
                  {t('audit_modal.success_desc')}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Use createPortal to mount the modal to document.body, escaping parent overflow bounds
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return null;
}
