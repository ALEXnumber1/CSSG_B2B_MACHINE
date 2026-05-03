import { motion } from 'framer-motion';

export default function SecurityRadarVisual() {
  return (
    <div className="w-full h-[300px] md:h-[400px] relative rounded-3xl overflow-hidden bg-[#050508] border border-white/5 flex items-center justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
      
      {/* Radar Circles */}
      <div className="relative w-64 h-64 border border-sky-500/10 rounded-full flex items-center justify-center">
        <div className="absolute inset-0 border border-sky-500/5 rounded-full scale-75" />
        <div className="absolute inset-0 border border-sky-500/5 rounded-full scale-50" />
        <div className="absolute inset-0 border border-sky-500/5 rounded-full scale-25" />
        
        {/* Scanning Beam */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-r-2 border-sky-400/30 rounded-full origin-center"
          style={{ background: 'conic-gradient(from 0deg, transparent 80%, rgba(14, 165, 233, 0.1) 100%)' }}
        />

        {/* Dynamic Blips (Targets) */}
        {[
          { top: '20%', left: '30%', delay: 0 },
          { top: '60%', left: '70%', delay: 1.5 },
          { top: '40%', left: '80%', delay: 3 }
        ].map((blip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: blip.delay }}
            className="absolute w-2 h-2 bg-sky-400 rounded-full shadow-[0_0_10px_#0EA5E9]"
            style={{ top: blip.top, left: blip.left }}
          />
        ))}

        {/* Center Point */}
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white] z-10" />
      </div>

      {/* Numerical Data Overlay */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-1">
        <p className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Scanning Network Assets...</p>
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase">Detection</span>
            <span className="text-white text-[10px] font-mono">99.2% ACC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 uppercase">Latency</span>
            <span className="text-white text-[10px] font-mono">1.2ms</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050508] via-transparent to-[#050508] z-20" />
    </div>
  );
}
