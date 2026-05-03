import { motion } from 'framer-motion';
import { Wrench, Camera, Cpu, FolderKanban, ArrowRight, Building2, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Tecnologia() {
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');

  const niches = [
    {
      id: 'ingenieria',
      image: "/images/tec_ingenieria.png",
      icon: <Wrench className="w-6 h-6" />,
      title: t('tecnologia.niches.n1_title'),
      desc: t('tecnologia.niches.n1_desc'),
      features: [t('tecnologia.niches.n1_f1'), t('tecnologia.niches.n1_f2'), t('tecnologia.niches.n1_f3'), t('tecnologia.niches.n1_f4')]
    },
    {
      id: 'cctv',
      image: "/images/tec_cecom.png",
      icon: <Camera className="w-6 h-6" />,
      title: t('tecnologia.niches.n2_title'),
      desc: t('tecnologia.niches.n2_desc'),
      features: [t('tecnologia.niches.n2_f1'), t('tecnologia.niches.n2_f2'), t('tecnologia.niches.n2_f3'), t('tecnologia.niches.n2_f4')]
    },
    {
      id: 'ia',
      image: "/images/tec_ia.png",
      icon: <Cpu className="w-6 h-6" />,
      title: t('tecnologia.niches.n3_title'),
      desc: t('tecnologia.niches.n3_desc'),
      features: [t('tecnologia.niches.n3_f1'), t('tecnologia.niches.n3_f2'), t('tecnologia.niches.n3_f3'), t('tecnologia.niches.n3_f4')]
    }
  ];

  const projects = [
    { title: t('tecnologia.portfolio.p1_title'), type: t('tecnologia.portfolio.p1_type'), status: t('tecnologia.portfolio.status_done'), desc: t('tecnologia.portfolio.p1_desc') },
    { title: t('tecnologia.portfolio.p2_title'), type: t('tecnologia.portfolio.p2_type'), status: t('tecnologia.portfolio.status_done'), desc: t('tecnologia.portfolio.p2_desc') },
    { title: t('tecnologia.portfolio.p3_title'), type: t('tecnologia.portfolio.p3_type'), status: t('tecnologia.portfolio.status_prog'), desc: t('tecnologia.portfolio.p3_desc') },
    { title: t('tecnologia.portfolio.p4_title'), type: t('tecnologia.portfolio.p4_type'), status: t('tecnologia.portfolio.status_done'), desc: t('tecnologia.portfolio.p4_desc') },
    { title: t('tecnologia.portfolio.p5_title'), type: t('tecnologia.portfolio.p5_type'), status: t('tecnologia.portfolio.status_done'), desc: t('tecnologia.portfolio.p5_desc') },
    { title: t('tecnologia.portfolio.p6_title'), type: t('tecnologia.portfolio.p6_type'), status: t('tecnologia.portfolio.status_done'), desc: t('tecnologia.portfolio.p6_desc') },
  ];

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Gemelo Digital Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <img src="/images/digital_twin_bg.png" alt="" className="w-full h-full object-cover mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* HERO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{t('tecnologia.hero.badge')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
            {t('tecnologia.hero.title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{t('tecnologia.hero.title_2')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">{t('tecnologia.hero.desc')}</p>
        </motion.div>

        {/* DRON FLOTANTE */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-10 w-80 h-80 pointer-events-none hidden xl:block select-none mix-blend-screen opacity-40 drop-shadow-[0_0_40px_rgba(14,165,233,0.2)]"
        >
          <img src="/images/tec_drone.png" alt="Drone" className="w-full h-auto" />
        </motion.div>

        {/* GRID DE SERVICIOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {niches.map((niche, i) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0D0F16] border border-white/10 rounded-2xl overflow-hidden group hover:border-sky-500/30 transition-all flex flex-col shadow-2xl"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={niche.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F16] to-transparent opacity-60" />
                <div className="absolute bottom-4 left-6 p-2 rounded-lg bg-sky-500/10 backdrop-blur-md border border-white/10 text-sky-400">
                  {niche.icon}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-sky-400 transition-colors">{niche.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">{niche.desc}</p>
                <div className="space-y-3 mb-8">
                  {niche.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    setSubject(niche.title);
                    document.getElementById('tech-conversion')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-sky-600/10 border border-sky-500/20 text-sky-400 rounded-xl font-bold text-sm hover:bg-sky-600 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {t('tecnologia.niches.btn')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SECCIÓN DE CONVERSIÓN */}
        <section id="tech-conversion" className="scroll-mt-32 mb-32">
          <div className="bg-gradient-to-br from-[#0D0F16] to-[#050507] border border-white/10 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Evaluación Técnica</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter leading-tight">
                  ¿Listo para elevar su <span className="text-sky-400">Seguridad?</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Solicite una evaluación para su requerimiento de {subject || 'Tecnología'} y reciba una propuesta en 24h.
                </p>
                <div className="flex flex-col gap-4 text-white font-medium">
                  <div className="flex items-center gap-4"><Mail className="w-5 h-5 text-sky-400" /> info@globalservices-ven.com</div>
                  <div className="flex items-center gap-4"><Phone className="w-5 h-5 text-sky-400" /> +58 212 953-CSSG</div>
                </div>
              </div>

              <div className="w-full lg:w-[400px] bg-white/[0.03] border border-white/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-6 text-center">Inicie su Proyecto</h3>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Enviado.'); }}>
                  <input type="text" value={subject || "Seguridad Integral"} readOnly className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" />
                  <input type="text" placeholder="Nombre y Cargo" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" required />
                  <input type="email" placeholder="Correo Corporativo" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm" required />
                  <button type="submit" className="w-full py-4 bg-sky-600 text-white rounded-xl font-bold text-sm hover:bg-sky-500 transition-all mt-4">
                    Obtener Propuesta Técnica
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO PROYECTOS */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-sky-500/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold text-sky-400/60 uppercase tracking-widest block">{project.type}</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-500/5 flex items-center justify-center text-sky-500/40 group-hover:text-sky-400 transition-colors">
                    <FolderKanban className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
