import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PARTNERS = [
  "EMBAJADA DEL REINO UNIDO",
  "EMBAJADA DE CANADÁ",
  "EMBAJADA DE BRASIL",
  "EMBAJADA DE COLOMBIA",
  "EMBAJADA DE MÉXICO",
  "PNUD",
  "OMS",
  "INSTITUTO DE HIGIENE \"RAFAEL RANGEL\"",
  "GRÁFICAS ULTRA C.A.",
  "CLÍNICA SANATRIX",
  "CLÍNICA LA FLORESTA",
  "C.C. SUPERMERCADOS",
  "C.C. LOS TEQUES",
  "ZENTINELGLOBAL C.A.",
  "SERVITIUMS C.A.",
  "BRITISH COUNCIL"
];

export default function Partners() {
  const { t } = useTranslation();
  // Duplicamos los partners para que el scroll infinito sea fluido
  const duplicatedPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS];

  return (
    <div className="relative py-14 overflow-hidden bg-black/60 border-y border-white/5 backdrop-blur-md group">
      {/* Central Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-full bg-sky-500/10 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[40%] bg-white/5 blur-[40px] rounded-full pointer-events-none z-0" />
      
      {/* Edge Fading Mask */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
      
      <div className="container mx-auto px-6 mb-10 text-center relative z-30">
        <span className="text-[10px] font-bold tracking-[0.4em] text-sky-400/80 uppercase">
          {t('partners.title')}
        </span>
      </div>

      <div className="flex relative z-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {duplicatedPartners.map((name, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-12 group"
            >
              <span className="text-[13px] font-bold text-gray-500 group-hover:text-white transition-all tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                {name}
              </span>
              <div className="w-[1px] h-4 bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
