import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Download, CheckCircle2, Building } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { startSequence } from '../lib/sequences';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const downloadPortfolio = () => {
    // Attempt to download even if database fails
    const link = document.createElement('a');
    link.href = '/Portafolio_Servicios_CSSG.pdf';
    link.download = 'Portafolio_Servicios_CSSG.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Calculate Baremo (Lead Scoring for CRM)
    let baremoScore = 20; 
    const isCorporate = !formData.email.match(/@(gmail|hotmail|outlook|yahoo|icloud|live)\./i);
    if (isCorporate) baremoScore += 50; 
    if (formData.phone.length > 8) baremoScore += 30;

    try {
      // Save lead to Supabase (CRM Integration)
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{ 
          nombre: formData.name,
          correo: formData.email,
          empresa: formData.company,
          telefono: formData.phone,
          fuente: 'portfolio_download',
          score: baremoScore,
          estado: 'nuevo',
          mensaje: `[DESCARGA: Portafolio]`
        }]);
      
      if (supabaseError) {
        console.error('CRM Sync Error:', supabaseError);
        alert(`Error al sincronizar con el CRM: ${supabaseError.message}`);
        throw supabaseError;
      }

      // 2. Start Automated Nurturing Sequence
      const { data: leadData } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', formData.email)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (leadData) {
        await startSequence(leadData.id, formData.email, formData.name, 'contacto', formData.company);
      }
    } catch (error) {
      console.error('CRM Sync Exception:', error);
    }

    // ALWAYS trigger success and download for the user
    setSubmitted(true);
    downloadPortfolio();

    // Close modal after delay
    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '' });
      }, 500);
    }, 3500);
    
    setIsSubmitting(false);
  };

  return (
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
            className="relative w-full max-w-md bg-[#0D0F16] border border-white/10 rounded-[2.5rem] p-8 overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.3)]"
          >
            {/* Decorative Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full -mr-16 -mt-16" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Download className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('lead_modal.title')}</h3>
                  <p className="text-gray-400 text-sm">
                    {t('lead_modal.subtitle')}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('lead_modal.label_name')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                        placeholder={t('lead_modal.placeholder_name')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('lead_modal.label_company') || 'Empresa'}</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                        placeholder={t('lead_modal.placeholder_company') || 'Nombre de su empresa'}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('lead_modal.label_email')}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                        placeholder={t('lead_modal.placeholder_email')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">{t('lead_modal.label_phone')}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-sky-500/50 transition-all"
                        placeholder={t('lead_modal.placeholder_phone')}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-sky-900/20 flex items-center justify-center gap-2 group mt-4"
                  >
                    {isSubmitting ? t('lead_modal.btn_processing') : t('lead_modal.btn_get')}
                    <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t('lead_modal.success_title')}</h3>
                <p className="text-gray-400">
                  {t('lead_modal.success_desc')}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
