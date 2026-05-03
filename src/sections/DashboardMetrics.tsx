import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ShieldCheck, Activity, GraduationCap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [inView, motionValue, to]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function DashboardMetrics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="relative py-24 w-full bg-[#030305] overflow-hidden" id="dashboard">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 top-0 pointer-events-none">
        <div className="absolute left-[10%] top-[20%] w-[300px] h-[300px] bg-sky-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute right-[20%] bottom-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">Métricas de Desempeño</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tighter text-white mb-6"
          >
            Nuestros Resultados <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">lo Demuestran</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 100 }}
            viewport={{ once: true }}
            className="h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent w-48 mx-auto mb-8"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Card 1: 0 Incidentes - "Historical Integrity Index" */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-white/[0.06] backdrop-blur-3xl rounded-3xl border border-white/[0.1] p-10 overflow-hidden hover:border-sky-500/30 transition-all duration-700"
          >
            {/* Tactical Grid Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:20px_20px]" />
            
            <div className="flex items-start justify-between mb-12 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-sky-500/60 uppercase tracking-[0.3em] mb-2">Historial Operativo</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">Historial de Seguridad</h3>
              </div>
              <div className="w-10 h-10 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center">
                <ShieldCheck className="text-sky-500/40" size={18} />
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-8xl font-black tracking-tighter text-white">
                  <Counter from={150} to={0} duration={2.5} />
                </span>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-emerald-400">CERO INCIDENTES</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">En toda nuestra historia</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-10 border-t border-white/5 pt-8">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Operación Continua</p>
                  <p className="text-xl font-bold text-white">+17 Años</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Disponibilidad</p>
                  <p className="text-xl font-bold text-emerald-400">24/7</p>
                </div>
              </div>
            </div>
            
            {/* Shimmer Border */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>

          {/* Card 2: Strategic Reconnaissance */}
          <motion.div 
            variants={itemVariants}
            className="group relative bg-white/[0.06] backdrop-blur-3xl rounded-3xl border border-white/[0.1] p-10 flex flex-col hover:border-indigo-500/30 transition-all duration-700"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(90deg,transparent_1px,#ffffff05_1px,transparent_2px)] bg-[size:40px_100%]" />

            <div className="flex items-start justify-between mb-12 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-indigo-400/60 uppercase tracking-[0.3em] mb-2">Capacidad Operativa</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">Despliegue Operativo</h3>
              </div>
              <div className="w-10 h-10 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Activity className="text-indigo-400" size={18} />
              </div>
            </div>
 
            <div className="flex-1 flex flex-col gap-10 relative z-10">
              
              <div className="space-y-6">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-3">
                    <GraduationCap size={16} className="text-indigo-400" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cobertura de Operaciones</span>
                  </div>
                  <span className="text-2xl font-black text-white tabular-nums">
                    <Counter from={0} to={98} duration={2} />%
                  </span>
                </div>
                
                <div className="h-[1px] w-full bg-white/5 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "98%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" as const }}
                    className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-sky-400 relative"
                  >
                    <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#0EA5E9]" />
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Formación Continua del Personal", status: "Activo" },
                  { label: "Protocolos de Prevención", status: "Óptimo" },
                  { label: "Tiempo de Respuesta Inmediato", status: "Listo" }
                ].map((item, id) => (
                  <div key={id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group/item hover:bg-white/[0.04] transition-colors">
                    <span className="text-xs text-gray-400 font-medium">{item.label}</span>
                    <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded tracking-tighter">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
