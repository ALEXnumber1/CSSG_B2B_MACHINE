import { motion } from 'framer-motion';
import { Handshake, Globe, TrendingUp, ShieldCheck, Users, ArrowRight } from 'lucide-react';

export default function Partners() {
  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-square bg-sky-500/5 rounded-full blur-[160px] opacity-30" />
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 mb-6">
            <Handshake className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em]">Alianzas Estratégicas</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Conviértete en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">Partner de CSSG</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Expandamos juntos el estándar de seguridad en la región. Únete a nuestra red de aliados tecnológicos y consultores de élite.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">¿Por qué ser aliado <br /> de CSSG Global?</h2>
            {[
              { icon: <Globe className="w-5 h-5 text-emerald-400" />, title: 'Alcance Internacional', desc: 'Acceso a misiones diplomáticas y corporaciones G7 en Venezuela.' },
              { icon: <TrendingUp className="w-5 h-5 text-emerald-400" />, title: 'Crecimiento Compartido', desc: 'Modelos de colaboración por resultados y referenciación de alto valor.' },
              { icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />, title: 'Respaldo de Marca', desc: 'Uso de nuestra certificación ISO 9001 en proyectos conjuntos.' },
              { icon: <Users className="w-5 h-5 text-emerald-400" />, title: 'Red de Expertos', desc: 'Sinergia con especialistas en táctica, legal y tecnología avanzada.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />
            <h3 className="text-2xl font-bold text-white mb-6">Solicitud de Alianza</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Nombre o Empresa</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Tipo de Partner</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all">
                  <option>Tecnológico</option>
                  <option>Consultor Independiente</option>
                  <option>Proveedor de Servicios</option>
                  <option>Inversionista / Proyecto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Propuesta de Valor</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-500 outline-none transition-all h-32" placeholder="Cuéntanos cómo podemos colaborar..." />
              </div>
              <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2">
                Enviar Propuesta <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-xs italic">
            * Todas las solicitudes de alianza pasan por un riguroso proceso de debida diligencia (Vetting) para asegurar el cumplimiento de nuestros estándares éticos y legales.
          </p>
        </div>
      </div>
    </div>
  );
}
