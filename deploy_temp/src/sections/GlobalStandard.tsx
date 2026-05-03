import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function GlobalStandard() {
  return (
    <section className="py-24 relative z-10" id="estandar">
      <div className="container mx-auto px-6">
        
        <div className="glass-card rounded-2xl overflow-hidden flex flex-col lg:flex-row items-stretch border border-sky-900/30">
          
          <div className="lg:w-5/12 bg-[#101016]/80 p-12 flex flex-col justify-center border-r border-[#333345]/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
              <ShieldCheck className="w-64 h-64 text-sky-500" />
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4 relative z-10"
            >
              El Estándar <br />
              <span className="text-sky-400">Global CSSG</span>
            </motion.h2>
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-gray-400 font-light text-lg relative z-10"
            >
              La excelencia operativa frente a entornos críticos comienza construyéndose desde adentro.
            </motion.p>
          </div>

          <div className="lg:w-7/12 p-12 lg:p-16 flex flex-col justify-center bg-[#15151e]/40">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]"></span>
                  Lealtad y Factor Humano Incorruptible
                </h3>
                <p className="text-gray-400 leading-relaxed md:pr-8">
                  Mantenemos una tasa de rotación prácticamente nula porque somos la empresa con mejor remuneración del sector en Venezuela. <strong className="text-gray-200 font-medium">Un oficial bien remunerado y valorado es un oficial que jamás compromete su integridad ni la seguridad de nuestros clientes.</strong>
                </p>
              </div>

              <div className="border-t border-[#333345] pt-10">
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#EAB308] shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
                  Competitividad y Calidad
                </h3>
                <p className="text-gray-400 leading-relaxed md:pr-8">
                  Nuestra estructura de costos nos permite ofrecer un estándar de protección al nivel de embajadas y delegaciones diplomáticas, manteniendo <strong className="text-gray-200 font-medium">la mejor relación precio-calidad del mercado</strong> sin comprometer ningún aspecto de la seguridad de su organización.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
