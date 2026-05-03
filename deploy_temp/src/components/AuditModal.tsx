import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Phone, Calendar, Building, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabase';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuditModal({ isOpen, onClose }: AuditModalProps) {
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
          telefono: formData.phone,
          empresa: formData.company,
          fuente: 'Agendamiento Auditoria',
          score: baremoScore,
          notas: `[INTENCIÓN: Agendar Auditoría] [SERVICIO: ${formData.service}] [FECHA TENTATIVA: ${formData.date}]`,
          mensaje: `El cliente desea agendar el servicio: ${formData.service} para la fecha tentativa: ${formData.date}.`
        }]);

      if (supabaseError) throw supabaseError;
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
            </button>

            {!submitted ? (
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Formato de Auditoría</h3>
                  <p className="text-gray-400 text-sm">
                    Complete sus datos corporativos para habilitar la agenda y reservar su sesión de consultoría.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Nombre Completo</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder="Ej. Carlos Mendoza"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Empresa / Organización</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder="CSSG Corp"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder="contacto@empresa.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Teléfono Móvil (WhatsApp)</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input 
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                        placeholder="+58 414 1234567"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Servicio que Desea</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-black/50 border border-white/5 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all appearance-none"
                      >
                        <option value="" disabled>Seleccione un servicio...</option>
                        <option value="Auditoría de Riesgos">Auditoría de Riesgos</option>
                        <option value="Consultoría Ejecutiva">Consultoría Ejecutiva</option>
                        <option value="Vigilancia Estratégica">Vigilancia Estratégica</option>
                        <option value="Escolta VIP">Escolta VIP</option>
                        <option value="Otro">Otro requerimiento</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Fecha Tentativa</label>
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
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:-translate-y-1 flex items-center justify-center gap-2 mt-6"
                  >
                    {isSubmitting ? 'Procesando...' : 'Continuar a la Agenda Gratuita'}
                    <Calendar className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">¡Redirigiendo!</h3>
                <p className="text-gray-400">
                  Sus datos han sido guardados. Lo estamos enviando al calendario para seleccionar su fecha...
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
