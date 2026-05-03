import { motion } from 'framer-motion';
import { BrainCircuit, ArrowRight, LineChart } from 'lucide-react';
import { useState } from 'react';
import AuditModal from '../components/AuditModal';

export default function ConsultingAndTech() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden bg-[#030305]" id="specialized-services">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden border border-indigo-500/20 bg-[#0A0B10] shadow-[0_0_50px_rgba(79,70,229,0.1)]"
        >
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* Left side: Large Image */}
            <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[600px] order-2 lg:order-1">
              <img 
                src="/consultoria_card.png" 
                alt="Consultoría de Seguridad Estratégica" 
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A0B10] lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent lg:hidden block" />
              
              {/* Overlay Badge */}
              <div className="absolute top-8 left-8 p-6 bg-indigo-600/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xl font-black text-white leading-none">Consultoría B2B</div>
                    <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mt-1">Soluciones Eficientes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="lg:w-1/2 p-10 md:p-14 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8 w-fit">
                <LineChart className="w-4 h-4" />
                <span>Optimización Corporativa</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">
                Consultoría Ejecutiva <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                  y Reducción de Costos
                </span>
              </h2>

              <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                Entendemos la consultoría como un <span className="text-white font-bold">método de soluciones a problemas y estructuración de modelos de seguridad altamente eficientes</span>. Utilizamos la tecnología de vanguardia para disminuir los costos operativos y maximizar la efectividad.
              </p>

              <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
                <h4 className="text-indigo-400 font-bold uppercase tracking-widest text-[10px] mb-3">Oferta Especial B2B</h4>
                <p className="text-white text-sm leading-relaxed font-medium">
                  Al contratar un programa de auditoría de riesgo, obtenga <span className="text-indigo-300 font-bold">GRATIS por 4 meses un Dashboard de Seguridad Integral</span> en una tablet customizada y directamente asociada a los sistemas de su empresa.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAuditModalOpen(true);
                  }}
                  className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black transition-all shadow-[0_15px_30px_rgba(79,70,229,0.3)] hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
                >
                  <span className="uppercase tracking-widest text-sm">Solicitar Auditoría</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <AuditModal 
        isOpen={isAuditModalOpen} 
        onClose={() => setIsAuditModalOpen(false)} 
      />
    </section>
  );
}
