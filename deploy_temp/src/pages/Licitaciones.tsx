import { motion } from 'framer-motion';
import { FileText, Send, Building2, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function Licitaciones() {

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] opacity-20" />
        <img 
          src="/licitaciones_left.png" 
          alt="" 
          className="absolute top-0 left-0 w-1/2 h-full object-cover opacity-[0.07] grayscale mix-blend-screen hidden lg:block"
        />
        <img 
          src="/svc_licitaciones.png" 
          alt="" 
          className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 grayscale mix-blend-screen hidden lg:block"
        />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-6">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">Portal Corporativo</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Invitación a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">Licitaciones</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Portal exclusivo para organizaciones gubernamentales y corporativas que desean integrar a CSSG Global en sus procesos de selección de seguridad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <Building2 className="w-6 h-6" />, title: 'Capacidad Operativa', desc: 'Respaldo financiero y logístico para proyectos de gran escala.' },
            { icon: <ShieldCheck className="w-6 h-6" />, title: 'Cumplimiento Legal', desc: 'Solvencia absoluta en Digesservisp, IVSS, INCES y normativas ISO.' },
            { icon: <Clock className="w-6 h-6" />, title: 'Respuesta Rápida', desc: 'Presentación de ofertas técnicas y económicas en plazos récord.' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-sky-500/30 transition-colors"
            >
              <div className="w-12 h-12 bg-sky-500/10 border border-sky-500/20 rounded-xl flex items-center justify-center mb-6 text-sky-400">
                {item.icon}
              </div>
              <h3 className="text-white font-bold mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Envíenos su pliego <br /> de condiciones</h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Atención prioritaria para invitaciones corporativas',
                  'Documentación legal siempre al día',
                  'Garantía de confidencialidad absoluta (NDA)',
                  'Visitas técnicas de inspección sin costo'
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-sky-500" />
                    {li}
                  </li>
                ))}
              </ul>
              <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-2xl">
                <p className="text-sky-300 font-bold text-xs uppercase mb-2">Contacto Directo Licitaciones:</p>
                <p className="text-white font-mono text-lg">comercial@globalservices-ven.com</p>
              </div>
            </div>

            <div className="bg-[#030305] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Institución</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all" placeholder="Ej. Embajada / Corp" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Tipo de Licitación</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all">
                      <option>Pública</option>
                      <option>Privada / Cerrada</option>
                      <option>Cotización Directa</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Link de Pliegos (Opcional)</label>
                  <input type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Mensaje Adicional</label>
                  <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all h-24" placeholder="Detalles de la invitación..." />
                </div>
                <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-sky-400 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Enviar Invitación Oficial
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
