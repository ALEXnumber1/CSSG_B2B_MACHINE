import { motion } from 'framer-motion';

export default function ValueProposition() {
  return (
    <section className="py-24 relative z-10 bg-black/40 border-y border-[#333345]/50">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Nuestra Filosofía: <br/>
            <span className="text-[#EAB308]">Cero Incidentes.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            En CSSG sumamos más de 17 años sin incidentes porque invertimos en lo fundamental: <strong className="text-gray-200">nuestro personal</strong>. Al ofrecer la mejor remuneración del sector en Venezuela, garantizamos cero rotación y un equipo comprometido con la seguridad de cada cliente.
          </motion.p>
          
          <ul className="space-y-4">
            {['Evaluaciones de riesgo periódicas', 'Personal estable y comprometido', 'Confidencialidad garantizada'].map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-center gap-3 text-gray-300 font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden glass-card flex items-center justify-center p-8"
          >
            {/* Background Grid & Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            <div className="w-full h-full border border-[#333345] rounded-xl relative overflow-hidden flex items-center justify-center bg-black/60 backdrop-blur-md shadow-2xl">
              
              {/* Radar Grid Circles */}
              <div className="absolute w-[80%] h-[80%] rounded-full border border-sky-500/10" />
              <div className="absolute w-[60%] h-[60%] rounded-full border border-sky-500/20" />
              <div className="absolute w-[40%] h-[40%] rounded-full border border-sky-500/30" />
              <div className="absolute w-[20%] h-[20%] rounded-full border border-sky-400/40" />

              {/* Crosshairs */}
              <div className="absolute w-full h-[1px] bg-sky-500/20" />
              <div className="absolute h-full w-[1px] bg-sky-500/20" />

              {/* Scanning Sweep */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                className="absolute w-[80%] h-[80%] rounded-full opacity-30"
                style={{ 
                  background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #0EA5E9 360deg)',
                  clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 0)' // Roughly masking it to look like a sweep
                }}
              />

              {/* Simulated Nodes/Assets */}
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute w-2 h-2 bg-emerald-400 rounded-full top-[30%] left-[30%] shadow-[0_0_8px_#34d399]" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute w-2 h-2 bg-sky-400 rounded-full top-[60%] right-[25%] shadow-[0_0_8px_#38bdf8]" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }} className="absolute w-2 h-2 bg-emerald-400 rounded-full bottom-[20%] left-[40%] shadow-[0_0_8px_#34d399]" />

              {/* Center Core */}
              <div className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff]" />
              <div className="absolute w-8 h-8 rounded-full border-2 border-sky-400 animate-ping" />

              {/* Status Badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0B0B0F]/80 border border-sky-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sky-400 font-mono tracking-widest text-[10px] uppercase">Monitoreo Activo 24/7</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
