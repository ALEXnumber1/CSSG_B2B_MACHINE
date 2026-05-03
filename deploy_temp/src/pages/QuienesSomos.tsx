import { motion } from 'framer-motion';
import { Target, Eye, BookOpen, Award, ShieldCheck, Users, User, Crown, Star, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuienesSomos() {
  const { t } = useTranslation();

  const codeOfConduct = [
    { icon: <ShieldCheck className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.integ_title'), desc: t('quienes.conduct.integ_desc') },
    { icon: <Users className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.resp_title'), desc: t('quienes.conduct.resp_desc') },
    { icon: <Eye className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.conf_title'), desc: t('quienes.conduct.conf_desc') },
    { icon: <BookOpen className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.prof_title'), desc: t('quienes.conduct.prof_desc') },
    { icon: <Award className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.exc_title'), desc: t('quienes.conduct.exc_desc') },
    { icon: <Target className="w-5 h-5 text-sky-400" />, title: t('quienes.conduct.comp_title'), desc: t('quienes.conduct.comp_desc') },
  ];

  const teamMembers = [
    { 
      name: "Alexander Briceño",
      role: "CEO", 
      department: "Dirección General",
      bio: "Experto en Seguridad y Negocios (MBA), administrador y Expolicía Condecorado. Formado militarmente y con 16 años de trayectoria policial en áreas preventivas e investigativas. Fundó CSSG con la visión de que oficiales bien remunerados elevan la cadena de valor y protección al cliente en Venezuela."
    },
    { 
      name: "Juan Carlos Silva",
      role: t('quienes.team.ops'), 
      department: "Operaciones",
      bio: "Experto en logística táctica y despliegue de fuerza de reacción motorizada, garantizando respuestas inmediatas y eficiencia en misiones críticas."
    },
    { 
      name: "Mariana Castillo",
      role: t('quienes.team.adj'), 
      department: "Dirección Ejecutiva",
      bio: "Coordinación ejecutiva y enlace estratégico de alto nivel, optimizando procesos administrativos y la sinergia entre departamentos clave."
    },
    { 
      name: "Andrés Mendoza",
      role: t('quienes.team.com'), 
      department: "Comercialización",
      bio: "Especialista en desarrollo de negocios y relaciones institucionales, diseñando soluciones de seguridad a medida para clientes corporativos de élite."
    },
    { 
      name: "Ricardo Vargas",
      role: t('quienes.team.it'), 
      department: "Tecnología e Innovación",
      bio: "Arquitecto de soluciones tecnológicas y ciberseguridad, integrando inteligencia artificial y monitoreo avanzado en la protección física."
    },
    { 
      name: "Dra. Elena Rivas",
      role: t('quienes.team.legal'), 
      department: "Legal y Cumplimiento",
      bio: "Asesoría legal integral especializada en derecho corporativo y regulaciones nacionales e internacionales de seguridad privada."
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
    }),
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">

        {/* Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center mb-16 py-20 px-6 rounded-3xl overflow-hidden group"
        >
          {/* Panoramic Team Background */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1590272453882-f3a1d397f021?auto=format&fit=crop&w=2000&q=80" 
              alt="CSSG Team" 
              className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/60 to-[#030305]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{t('quienes.history_badge')}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
              {t('quienes.history_title')}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {t('quienes.history_desc')}
            </p>
          </div>
        </motion.div>

        {/* Zentinel Global Alianza */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-24 p-8 rounded-2xl bg-gradient-to-r from-sky-900/20 to-indigo-900/20 border border-sky-500/30 overflow-hidden flex flex-col md:flex-row items-center gap-8 group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <ShieldCheck className="w-32 h-32 text-sky-400" />
          </div>
          <div className="w-24 h-24 shrink-0 rounded-full bg-white flex items-center justify-center p-2 shadow-[0_0_30px_rgba(14,165,233,0.3)]">
            <img src="/zentinel_logo.jpg" alt="Zentinel Global" className="w-full h-full object-contain" />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">{t('quienes.zentinel_title')}</h3>
            <p className="text-sky-200/80 text-sm max-w-2xl leading-relaxed">
              {t('quienes.zentinel_desc')}
            </p>
          </div>
        </motion.div>

        {/* Misión, Visión y Factor Humano */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-4">{t('quienes.mission_title')}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('quienes.mission_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-4">{t('quienes.vision_title')}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('quienes.vision_desc')}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-sky-500/5 backdrop-blur-xl border border-sky-500/20 rounded-2xl p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Crown className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-4">{t('quienes.philosophy_title')}</h2>
            <p className="text-sky-100/70 text-sm leading-relaxed">
              {t('quienes.philosophy_desc')}
            </p>
          </motion.div>
        </div>

        {/* Código de Conducta */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('quienes.conduct_title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('quienes.conduct_subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {codeOfConduct.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex gap-4 p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('quienes.cert_title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('quienes.cert_subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ISO 9001 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white/[0.04] border border-[#EAB308]/20 rounded-2xl p-10 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#EAB308] to-[#EAB308]/30" />
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 rounded-full border-2 border-[#EAB308]/30 bg-[#EAB308]/5 flex items-center justify-center">
                  <span className="font-bold text-[#EAB308] text-xs">ISO</span>
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">ISO 9001:2015</h3>
              <p className="text-[#EAB308] text-sm font-semibold mb-4">{t('quienes.cert.iso_badge')}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('quienes.cert.iso_desc')}
              </p>
            </motion.div>

            {/* Digesservisp */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-white/[0.04] border border-sky-500/20 rounded-2xl p-10 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-sky-500/30" />
              <div className="absolute top-6 right-6">
                <div className="w-16 h-16 rounded-full border-2 border-sky-500/30 bg-sky-500/5 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-sky-400" />
                </div>
              </div>
              <h3 className="text-3xl font-black text-white mb-2 tracking-tighter">Digesservisp</h3>
              <p className="text-sky-400 text-sm font-semibold mb-4">{t('quienes.cert.dig_badge')}</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('quienes.cert.dig_desc')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Equipo Directivo */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('quienes.team_title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('quienes.team_subtitle')}</p>
          </motion.div>

          <div className="relative w-full max-w-5xl mx-auto aspect-[1/1] sm:aspect-[4/3] mt-24 mb-40 group">
            {/* Hexagon Path - Responsive & Symmetrical */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M 50 12 L 88 32 L 88 72 L 50 92 L 12 72 L 12 32 Z" 
                fill="none" 
                stroke="#0ea5e9" 
                strokeWidth="1"
                className="opacity-30"
                vectorEffect="non-scaling-stroke"
              />
              {/* Scanning Dot */}
              <motion.circle
                r="1"
                fill="#0ea5e9"
                animate={{
                  cx: [50, 88, 88, 50, 12, 12, 50],
                  cy: [12, 32, 72, 92, 72, 32, 12],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>

            {/* Vertices / Cards with Photo Placeholders */}
            
            {/* 1. Director General (TOP) */}
            <motion.div
              style={{ top: '12%', left: '50%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-[200px] sm:max-w-[280px]"
            >
              <div className="relative bg-[#030305] border-2 border-sky-500/60 rounded-[2rem] p-5 sm:p-8 text-center shadow-[0_0_50px_rgba(14,165,233,0.2)] transition-all hover:border-sky-400 group/dg overflow-hidden">
                <div className="relative w-16 h-20 sm:w-24 sm:h-30 mx-auto mb-4">
                  <div className="absolute inset-0 bg-sky-500/15 blur-xl rounded-[2rem] group-hover/dg:bg-sky-500/30 transition-colors" />
                  <div className="relative w-full h-full rounded-[2rem] bg-gradient-to-b from-sky-900/40 to-black border-2 border-sky-500/20 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/alexander-briceno.png" 
                      alt="Alexander Briceño CEO" 
                      className="w-full h-full object-cover scale-[1.3] brightness-[1.12] contrast-[1.10]"
                    />
                  </div>
                </div>
                <h4 className="text-sky-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-1">{teamMembers[0].name}</h4>
                <h3 className="text-white font-black text-sm sm:text-lg mb-1 tracking-tight">CEO</h3>
                <p className="text-gray-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em]">{teamMembers[0].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover/dg:opacity-100 transition-all duration-300 flex items-center justify-center p-6 sm:p-8">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-xs uppercase mb-2">{teamMembers[0].name}</h4>
                    <p className="text-white italic text-[10px] sm:text-[12px] leading-relaxed mb-4">"{teamMembers[0].bio}"</p>
                    <div className="w-8 h-0.5 bg-sky-500 mx-auto" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. Gerente de Operaciones (Right-Top) */}
            <motion.div
              style={{ top: '32%', left: '88%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[150px] sm:max-w-[220px]"
            >
              <div className="relative bg-[#030305]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-sky-500/40 transition-colors group overflow-hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h4 className="text-sky-400 font-bold text-[8px] uppercase mb-0.5">{teamMembers[1].name}</h4>
                <h3 className="text-white font-bold text-[10px] sm:text-xs mb-1 leading-tight">{teamMembers[1].role}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{teamMembers[1].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-[9px] uppercase mb-1">{teamMembers[1].name}</h4>
                    <p className="text-white italic text-[9px] sm:text-[11px] leading-snug">"{teamMembers[1].bio}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Adjunta a la Dirección (Right-Bottom) */}
            <motion.div
              style={{ top: '72%', left: '88%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[150px] sm:max-w-[220px]"
            >
              <div className="relative bg-[#030305]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-sky-500/40 transition-colors group overflow-hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h4 className="text-sky-400 font-bold text-[8px] uppercase mb-0.5">{teamMembers[2].name}</h4>
                <h3 className="text-white font-bold text-[10px] sm:text-xs mb-1 leading-tight">{teamMembers[2].role}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{teamMembers[2].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-[9px] uppercase mb-1">{teamMembers[2].name}</h4>
                    <p className="text-white italic text-[9px] sm:text-[11px] leading-snug">"{teamMembers[2].bio}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Gerente Comercialización (Bottom) */}
            <motion.div
              style={{ top: '92%', left: '50%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[150px] sm:max-w-[220px]"
            >
              <div className="relative bg-[#030305]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-sky-500/40 transition-colors group overflow-hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h4 className="text-sky-400 font-bold text-[8px] uppercase mb-0.5">{teamMembers[3].name}</h4>
                <h3 className="text-white font-bold text-[10px] sm:text-xs mb-1 leading-tight">{teamMembers[3].role}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{teamMembers[3].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-[9px] uppercase mb-1">{teamMembers[3].name}</h4>
                    <p className="text-white italic text-[9px] sm:text-[11px] leading-snug">"{teamMembers[3].bio}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. Gerente de IT (Left-Bottom) */}
            <motion.div
              style={{ top: '72%', left: '12%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[150px] sm:max-w-[220px]"
            >
              <div className="relative bg-[#030305]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-sky-500/40 transition-colors group overflow-hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h4 className="text-sky-400 font-bold text-[8px] uppercase mb-0.5">{teamMembers[4].name}</h4>
                <h3 className="text-white font-bold text-[10px] sm:text-xs mb-1 leading-tight">{teamMembers[4].role}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{teamMembers[4].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-[9px] uppercase mb-1">{teamMembers[4].name}</h4>
                    <p className="text-white italic text-[9px] sm:text-[11px] leading-snug">"{teamMembers[4].bio}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 6. Consultoría Jurídica (Left-Top) */}
            <motion.div
              style={{ top: '32%', left: '12%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[150px] sm:max-w-[220px]"
            >
              <div className="relative bg-[#030305]/90 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center hover:border-sky-500/40 transition-colors group overflow-hidden">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <h4 className="text-sky-400 font-bold text-[8px] uppercase mb-0.5">{teamMembers[5].name}</h4>
                <h3 className="text-white font-bold text-[10px] sm:text-xs mb-1 leading-tight">{teamMembers[5].role}</h3>
                <p className="text-gray-500 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest">{teamMembers[5].department}</p>
                
                {/* Hover Bio Overlay */}
                <div className="absolute inset-0 bg-[#030305]/95 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                  <div className="text-center">
                    <h4 className="text-sky-400 font-black text-[9px] uppercase mb-1">{teamMembers[5].name}</h4>
                    <p className="text-white italic text-[9px] sm:text-[11px] leading-snug">"{teamMembers[5].bio}"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Central Quote Card - Refined to not cover photos */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-[260px] sm:max-w-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-6 text-center shadow-2xl"
              >
                <div className="text-sky-500/30 text-4xl font-serif mb-2 leading-none">“</div>
                <p className="text-gray-300 italic text-[11px] sm:text-[13px] leading-relaxed mb-4">
                  "La Columna Vertebral de CSSG son los oficiales de Seguridad, ellos son quienes defenderán a nuestra distinguida clientela y en ellos nos enfocamos para ser mejores"
                </p>
                <div className="pt-3 border-t border-white/5">
                  <p className="text-white font-bold text-xs uppercase tracking-tight">Alexander Briceño</p>
                  <p className="text-sky-400 font-bold text-[7px] uppercase tracking-[0.3em] mt-0.5">CEO CSSG Global</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Oficiales Destacados */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#EAB308]/20 bg-[#EAB308]/5 mb-6">
              <Crown className="w-3.5 h-3.5 text-[#EAB308]" />
              <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-[0.2em]">{t('quienes.officers_badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t('quienes.officers_title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('quienes.officers_subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {/* Oficial del Mes - MARZO (LEFT) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-[#0a0a0f] border border-white/10 rounded-3xl p-8 h-full flex flex-col items-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
                  <Star className="w-3 h-3 text-sky-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{t('quienes.officers.month')}</span>
                </div>

                <div className="flex gap-4 mb-8">
                  {/* Officer 1 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 group/img">
                      <div className="absolute inset-0 bg-sky-500/10 blur-xl rounded-full" />
                      <div className="relative w-full h-full rounded-full border-2 border-sky-500/30 overflow-hidden">
                        <img 
                          src="/PHOTO-2026-04-27-19-11-37.jpg" 
                          alt="Ana Tovar" 
                          className="w-full h-full object-cover scale-[1.3] object-[50%_15%]"
                        />
                      </div>
                    </div>
                    <p className="text-white font-bold text-[10px] uppercase tracking-wider">Ana Tovar</p>
                  </div>
                  {/* Officer 2 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-3 group/img">
                      <div className="absolute inset-0 bg-sky-500/10 blur-xl rounded-full" />
                      <div className="relative w-full h-full rounded-full border-2 border-sky-500/30 overflow-hidden">
                        <img 
                          src="/PHOTO-2026-04-27-19-42-21.jpg" 
                          alt="César Villarroel" 
                          className="w-full h-full object-cover scale-[1.0] object-top"
                        />
                      </div>
                    </div>
                    <p className="text-white font-bold text-[10px] uppercase tracking-wider">César Villarroel</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sky-500 font-black text-sm uppercase tracking-[0.2em]">Dúo de Excelencia Operativa</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/5 w-full text-center">
                  <p className="text-gray-500 text-[10px] italic leading-relaxed">"Compromiso excepcional y vigilancia estratégica demostrada durante el mes de Marzo."</p>
                </div>
              </div>
            </motion.div>

            {/* Oficial del Año 2025 (RIGHT) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
              <div className="relative bg-[#0a0a0f] border border-amber-500/30 rounded-3xl p-8 h-full flex flex-col items-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 mb-8">
                  <Crown className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">{t('quienes.officers.year')}</span>
                </div>

                <div className="flex gap-4 mb-8">
                  {/* Officer 1 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 group/img">
                      <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
                      <div className="relative w-full h-full rounded-full border-4 border-amber-500 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                        <img 
                          src="/PHOTO-2026-04-27-19-11-37.jpg" 
                          alt="Ana Tovar" 
                          className="w-full h-full object-cover scale-[1.3] object-[50%_15%] brightness-[1.1]"
                        />
                      </div>
                    </div>
                    <p className="text-white font-black text-[11px] uppercase tracking-widest">Ana Tovar</p>
                  </div>
                  {/* Officer 2 */}
                  <div className="text-center">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 group/img">
                      <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full animate-pulse" />
                      <div className="relative w-full h-full rounded-full border-4 border-amber-500 overflow-hidden shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                        <img 
                          src="/PHOTO-2026-04-27-19-42-21.jpg" 
                          alt="César Villarroel" 
                          className="w-full h-full object-cover scale-[1.0] object-top brightness-[1.1]"
                        />
                      </div>
                    </div>
                    <p className="text-white font-black text-[11px] uppercase tracking-widest">César Villarroel</p>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-amber-500 font-black text-sm uppercase tracking-[0.3em]">Liderazgo y Estándar de Oro</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-amber-500/10 w-full text-center">
                  <p className="text-amber-500/60 text-[10px] italic leading-relaxed">"Reconocimiento a la trayectoria impecable y el impacto estratégico durante el año 2025."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 relative rounded-[3rem] overflow-hidden p-12 text-center border border-sky-500/30"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[#0ea5e9]/10 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/80 via-transparent to-[#030305]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <ShieldCheck className="w-16 h-16 text-sky-500 mx-auto mb-8 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              {t('quienes.cta_title')}
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {t('quienes.cta_desc')}
            </p>
            <a 
              href="/analisis-riesgo"
              className="inline-flex items-center gap-3 px-10 py-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-full transition-all hover:scale-105 shadow-[0_0_40px_rgba(14,165,233,0.4)] uppercase tracking-widest text-sm"
            >
              {t('quienes.cta_btn')} <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
