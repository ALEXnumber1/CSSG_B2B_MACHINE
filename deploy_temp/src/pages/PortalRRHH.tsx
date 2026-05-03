import { motion } from 'framer-motion';
import { UserPlus, LockKeyhole, Briefcase, FileText, Send, ShieldCheck, ChevronRight, Building, Users } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PortalRRHH() {
  const [activeTab, setActiveTab] = useState<'recruitment' | 'login'>('recruitment');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'officer',
    experience: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      alert('Por favor, adjunte su Curriculum Vitae para continuar.');
      return;
    }
    try {
      setIsSubmitting(true);
      
      // 1. Guardar en pipeline de leads (CRM)
      const { error: supabaseError } = await supabase
        .from('leads')
        .insert([{
          nombre: formData.name,
          correo: formData.email,
          telefono: formData.phone,
          empresa: `CANDIDATO: ${formData.position} (${formData.experience} años)`,
          mensaje: `CV Adjunto: ${cvFile.name}`,
          fuente: 'Portal RRHH',
          score: 10 // Puntuación base para candidatos
        }]);

      if (supabaseError) {
        console.error('Supabase Error:', supabaseError);
        alert(`Error de base de datos: ${supabaseError.message}`);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
      setCvFile(null); // Reset file
    } catch (err: any) {
      console.error(err);
      alert(`Error inesperado: ${err.message || 'Consulte la consola para más detalles'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Acceso restringido. Contacte a IT para credenciales.');
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sky-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Reclutamiento y Selección de Élite</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            Desarrolle su carrera profesional en <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">CSSG Global</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Forme parte del equipo de seguridad privada más prestigioso de Venezuela. Ofrecemos estabilidad laboral, capacitación técnica continua en nuestra academia Zentinel Global y una estructura de remuneración justa bajo estándares de excelencia G7.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#11111a] p-1.5 rounded-2xl border border-white/5 flex gap-2">
            <button
              onClick={() => setActiveTab('recruitment')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'recruitment' 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Centro de Reclutamiento
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === 'login' 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/20' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              <LockKeyhole className="w-4 h-4" />
              Portal de Oficiales
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info/Benefits */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/[0.02] border border-white/5 rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Building className="w-5 h-5 text-sky-400" />
                ¿Por qué unirse a CSSG?
              </h3>
              <ul className="space-y-6">
                {[
                  { icon: Briefcase, title: 'Estabilidad de Carrera', desc: 'Planes de crecimiento a largo plazo y rotación casi inexistente.' },
                  { icon: Users, title: 'Cultura de Respeto', desc: 'Valoramos al factor humano como el activo más crítico de la seguridad.' },
                  { icon: ShieldCheck, title: 'Formación de Élite', desc: 'Entrenamiento continuo en nuestra academia Zentinel Global.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5 text-sky-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="p-8 border border-[#EAB308]/20 bg-[#EAB308]/5 rounded-3xl">
              <div className="flex gap-3 items-center mb-4 text-[#EAB308]">
                <FileText className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Aviso Importante</span>
              </div>
              <p className="text-[11px] text-[#EAB308]/80 leading-relaxed italic">
                "La seguridad de nuestros clientes comienza con la integridad de nuestro equipo. Cada postulación pasa por un riguroso proceso de verificación de antecedentes y evaluación técnica."
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0B0D14] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/10 rounded-full blur-[80px] -mr-32 -mt-32" />

              {activeTab === 'recruitment' ? (
                isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Postulación Recibida</h3>
                    <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                      Su CV y perfil técnico han sido registrados en nuestra base de datos táctica. Nuestro equipo de RRHH revisará su información a la brevedad.
                    </p>
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className="text-sky-400 font-bold hover:text-white transition-colors flex items-center gap-2 mx-auto text-sm"
                      >
                        Enviar otra postulación <ChevronRight className="w-4 h-4" />
                      </button>
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                        También puede escribir a: rrhh@globalservices-ven.com
                      </p>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6 relative z-10" onSubmit={handleApply}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Nombre y Apellido</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                          placeholder="Nombre completo del candidato"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Correo Electrónico</label>
                        <input 
                          type="email" 
                          required
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                          placeholder="correo@ejemplo.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Teléfono / WhatsApp</label>
                        <input 
                          type="text" 
                          required
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                          placeholder="+58 412 123-4567"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Área de Especialidad</label>
                        <select 
                          className="w-full bg-[#1A1C23] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                          value={formData.position}
                          onChange={e => setFormData({...formData, position: e.target.value})}
                        >
                          <option value="officer">Oficial de Seguridad Preventiva</option>
                          <option value="tactical">Fuerza de Reacción Inmediata</option>
                          <option value="it">Seguridad Electrónica / IT</option>
                          <option value="admin">Administración / Logística</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Años de Experiencia Comprobada</label>
                      <input 
                        type="number" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                        placeholder="Ej. 5"
                        value={formData.experience}
                        onChange={e => setFormData({...formData, experience: e.target.value})}
                      />
                    </div>

                    {/* CV Upload Window */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Curriculum Vitae (PDF/DOCX)</label>
                      <div 
                        className={`relative group border-2 border-dashed rounded-2xl p-8 transition-all flex flex-col items-center justify-center gap-4 ${
                          cvFile 
                            ? 'border-emerald-500/50 bg-emerald-500/5' 
                            : 'border-white/10 bg-white/[0.02] hover:border-sky-500/50 hover:bg-sky-500/5'
                        }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const file = e.dataTransfer.files[0];
                          if (file) setCvFile(file);
                        }}
                      >
                        <input 
                          type="file" 
                          id="cv-upload"
                          className="hidden" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setCvFile(file);
                          }}
                        />
                        <label htmlFor="cv-upload" className="absolute inset-0 cursor-pointer" />
                        
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${cvFile ? 'bg-emerald-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                          {cvFile ? <ShieldCheck /> : <FileText />}
                        </div>
                        
                        <div className="text-center">
                          <p className={`text-sm font-bold ${cvFile ? 'text-emerald-400' : 'text-white'}`}>
                            {cvFile ? cvFile.name : 'Arrastre su CV o haga clic aquí'}
                          </p>
                          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-medium">Máximo 10MB · Solo archivos PDF o Word</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-3 mt-8 group"
                    >
                      {isSubmitting ? 'Procesando...' : 'Enviar Postulación de Élite'}
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                )
              ) : (
                <form className="space-y-8 py-4 relative z-10" onSubmit={handleLogin}>
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Ingreso de Personal Autorizado</h3>
                    <p className="text-gray-500 text-sm">Acceso exclusivo para personal activo</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Credencial de Oficial (ID)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                        placeholder="CSSG-XXXX-2026"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Contraseña de Acceso</label>
                      <input 
                        type="password" 
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-500 transition-all shadow-lg shadow-sky-600/20">
                    Entrar al Sistema
                  </button>

                  <div className="pt-8 border-t border-white/5 flex gap-4">
                    <LockKeyhole className="w-5 h-5 text-gray-600 shrink-0" />
                    <p className="text-[10px] text-gray-600 font-medium leading-relaxed uppercase tracking-tighter">
                      Este sistema de gestión es para uso exclusivo del personal autorizado de CSSG. El acceso no autorizado será monitorizado y está estrictamente prohibido.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
