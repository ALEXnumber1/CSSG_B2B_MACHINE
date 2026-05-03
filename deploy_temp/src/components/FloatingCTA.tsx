import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Star } from 'lucide-react';


export default function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem('cssg_cta_seen');
      if (!hasSeen) {
        setShow(true);
      }
    }, 15000); // Aparece a los 15 segundos

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setShow(false);
    localStorage.setItem('cssg_cta_seen', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-[100] w-full max-w-[320px]"
        >
          <div className="relative bg-[#111218]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
            {/* Glow effect */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-sky-500/20 blur-3xl rounded-full group-hover:bg-sky-500/30 transition-all" />
            
            <button 
              onClick={close}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 relative">
                <div className="absolute inset-0 bg-sky-500/10 rounded-full animate-ping opacity-20" />
                <ShieldAlert className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">¿Protección sin incidentes?</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
                  Soy parte del equipo estratégico de CSSG. Nuestra tasa de retención del 98% garantiza su tranquilidad. ¿Desea evaluar sus puntos ciegos hoy?
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href="/analisis-riesgo"
                    className="w-full text-center bg-sky-600 hover:bg-sky-500 text-white text-[10px] font-bold py-2 rounded-lg transition-all tracking-widest uppercase shadow-lg shadow-sky-500/20"
                  >
                    Iniciar Diagnóstico ISO
                  </a>
                  <a 
                    href="#contact"
                    onClick={() => setShow(false)}
                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    Hablar con un Consultor →
                  </a>
                </div>
              </div>
            </div>

            {/* Google Review Badge (Mini) */}
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-2.5 h-2.5 fill-[#EAB308] text-[#EAB308]" />)}
                <span className="text-[9px] text-gray-500 font-bold ml-1">5.0 GOOGLE</span>
              </div>
              <p className="text-[9px] text-sky-500/70 font-medium italic">ISO 9001 CERTIFIED</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
