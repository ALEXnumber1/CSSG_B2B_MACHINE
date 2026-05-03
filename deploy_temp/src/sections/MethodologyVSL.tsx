import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield } from 'lucide-react';

const MethodologyVSL: React.FC = () => {
  return (
    <section className="py-24 bg-[#030305] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden border border-white/10 bg-[#030305] shadow-[0_0_100px_rgba(14,165,233,0.1)]"
        >
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 px-8 py-16 md:px-20 md:py-24 flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left side: Sales Copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                </span>
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em]">Exclusivo para Directivos</span>
              </div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-8 leading-[0.95] tracking-tighter">
                Nuestra Metodología <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-200 to-white">
                  EN 90 SEGUNDOS
                </span>
              </h3>
              
              <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
                Descubra por qué las misiones diplomáticas más exigentes confían en el estándar <strong className="text-white">INCIDENTES CERO</strong> de CSSG.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_20px_40px_rgba(14,165,233,0.3)] flex items-center justify-center gap-3"
                >
                  Implementar este Estándar Ahora
                  <Zap className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side: Cinematic Video Wrapper */}
            <div className="w-full lg:w-[550px] xl:w-[650px] relative group/vsl">
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-sky-500/40 rounded-tl-2xl z-20 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-sky-500/40 rounded-br-2xl z-20 pointer-events-none" />
              
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-sky-500/10 group-hover/vsl:shadow-sky-500/20 transition-all duration-700 bg-black">
                <iframe 
                  className="w-full h-full grayscale-[30%] group-hover/vsl:grayscale-0 transition-all duration-700"
                  src="https://www.youtube.com/embed/S_vLz87z7aM?autoplay=0&mute=1&controls=1&modestbranding=1&rel=0" 
                  title="CSSG Tactical Operations"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
                
                <div className="absolute inset-0 pointer-events-none border-[15px] border-black" />
                <div className="absolute top-4 left-6 flex items-center gap-2 opacity-50">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                  <span className="text-[9px] font-mono text-white tracking-widest uppercase">Operaciones Reales en Venezuela</span>
                </div>
              </div>

              {/* Social Proof Badge */}
              <div className="mt-6 flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030305] bg-gray-800 overflow-hidden shadow-xl">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Visto por 45+ Directores Hoy</span>
                </div>
                <div className="flex items-center gap-2 text-sky-500/50">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Certified Protocol</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MethodologyVSL;
