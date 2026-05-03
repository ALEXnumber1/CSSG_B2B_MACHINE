import { motion } from 'framer-motion';
import { Wrench, Camera, Cpu, ArrowRight, Mail, Phone, ShieldCheck, Zap, Lock, CheckCircle2, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import TecnologiaEn from './TecnologiaEn';

export default function Tecnologia() {
  const { t, i18n } = useTranslation('tecnologia');
  const isEn = i18n.language && i18n.language.startsWith('en');

  if (isEn) {
    return <TecnologiaEn />;
  }

  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [subject, setSubject] = useState('');
  const [formData, setFormData] = useState({ nombre: '', empresa: '', correo: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const scrollToContact = (subj: string) => {
    setSubject(subj);
    document.getElementById('tech-conversion')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `Tecnología: Interés en ${subject}`,
        fuente: 'tecnologia_v5',
        score: 75
      }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  const niches = [
    {
      id: 'ingenieria',
      image: "/images/tec_ingenieria.png",
      icon: <Wrench className="w-6 h-6" />,
      title: t('niches.n1_title') || 'Drones y Robótica Táctica',
      desc: t('niches.n1_desc') || 'Vigilancia aérea y patrullaje automatizado para grandes perímetros sin depender exclusivamente de personal físico.',
      features: [
        t('niches.n1_f1') || 'Patrullaje con drones autónomos para perímetros extensos con detección térmica.',
        t('niches.n1_f2') || 'Sensores de movimiento de largo alcance integrados a redes tácticas.',
        t('niches.n1_f3') || 'Robótica de inspección perimetral para zonas de alto riesgo.',
        t('niches.n1_f4') || 'Integración con centros de mando C2 para respuesta inmediata.'
      ],
      color: 'from-sky-500/20 to-indigo-500/20',
      border: 'border-sky-500/30'
    },
    {
      id: 'cctv',
      image: "/images/tec_cecom.png",
      icon: <Camera className="w-6 h-6" />,
      title: t('niches.n2_title') || 'IA y Analítica Forense',
      desc: t('niches.n2_desc') || 'Sistemas que aprenden y detectan amenazas antes de que ocurran, eliminando el error humano en el monitoreo.',
      features: [
        t('niches.n2_f1') || 'Reconocimiento facial y de placas (LPR) con base de datos en tiempo real.',
        t('niches.n2_f2') || 'Detección de comportamiento anómalo mediante algoritmos de Deep Learning.',
        t('niches.n2_f3') || 'Búsqueda inteligente de sospechosos por filtros de vestimenta y rasgos.',
        t('niches.n2_f4') || 'Alertas críticas preventivas antes de que se consume la intrusión.'
      ],
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30'
    },
    {
      id: 'ia',
      image: "/images/tec_ia.png",
      icon: <Cpu className="w-6 h-6" />,
      title: t('niches.n3_title') || 'Ingeniería de Seguridad',
      desc: t('niches.n3_desc') || 'Diseño de infraestructura crítica con barreras físicas inteligentes y control de acceso biométrico.',
      features: [
        t('niches.n3_f1') || 'Cercos eléctricos de alta tecnología con monitoreo de voltaje remoto.',
        t('niches.n3_f2') || 'Tanqueras y bolardos automáticos con resistencia a impactos vehiculares.',
        t('niches.n3_f3') || 'Lectores multibiométricos (huella, rostro, iris) para zonas restringidas.',
        t('niches.n3_f4') || 'Sistemas de iluminación táctica con activación por movimiento e IA.'
      ],
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30'
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const }
    })
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* REDESIGNED HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-20 mb-32"
        >
          {/* Tagline & Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[10px] font-black text-sky-300 uppercase tracking-[0.3em]">Tecnología de Anticipación</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight">
              La seguridad corporativa <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">es reactiva.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-[length:200%_auto] animate-gradient-x">
                La suya será predictiva.
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Diseñamos la tecnología de anticipación que el mercado no ofrece.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => scrollToContact('Evaluación Técnica')}
                className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20"
              >
                Solicitar evaluación técnica
              </button>
              <button 
                onClick={() => document.getElementById('tech-capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
              >
                Ver capacidades técnicas
              </button>
            </div>
          </div>

          {/* DRON FLOTANTE - Enhanced Accent */}
          <motion.div 
            animate={{ 
              y: [0, -40, 0], 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-0 w-[450px] pointer-events-none hidden xl:block select-none opacity-40 mix-blend-screen z-10"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-sky-500/20 blur-[60px] rounded-full animate-pulse" />
              <img src="/images/tec_drone.png" alt="Drone" className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(14,165,233,0.3)]" />
            </div>
          </motion.div>

          {/* Detailed Content Grid (Problem, Doubts, & What We Design) */}
          <div id="tech-capabilities" className="space-y-32">
            
            {/* Section 1: El problema que usted conoce */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20">
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Diagnóstico</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  El problema que <span className="text-red-400">usted conoce.</span>
                </h2>
                <div className="text-gray-400 leading-relaxed space-y-4">
                  <p className="text-white font-bold text-lg">Cámaras que graban. Guardias que responden. Alarmas que suenan después.</p>
                  <p>
                    La industria de seguridad se especializó en reaccionar. Pero las amenazas que enfrentan instalaciones de alta criticidad — embajadas, entes estratégicos, infraestructura sensible — no esperan a que usted reaccione.
                  </p>
                  <p>
                    Son coordinadas. Estudian sus patrones. Exploran sus ciegos operativos. Y cuando actúan, el daño ya está hecho: una filtración, una compromisión de protocolo, un incidente que trasciende fronteras.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Evaluación de Riesgo Actual</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-semibold italic border-l-2 border-red-500/50 pl-4 py-1">
                    "La pregunta no es si su seguridad ha fallado. Es si sabe cuándo está a punto de fallar."
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 mt-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Embajadas</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Entes Estratégicos</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Infraestructura Sensible</span>
                </div>
              </div>
            </div>

            {/* Section 2: Las dudas que enfrenta */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Incertidumbres del mercado</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                  Las dudas que <span className="text-amber-400">enfrenta.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    q: "¿No es esto solo más tecnología genérica?",
                    a: "No. No vendemos equipos importados sin adaptar. Diseñamos soluciones propias de análisis de datos e inteligencia de seguridad, construidas para los contextos operativos reales donde nuestros clientes operan — desde entornos de alta volatilidad hasta instalaciones con protocolos diplomáticos estrictos."
                  },
                  {
                    q: "¿Funciona donde yo opero?",
                    a: "Precisamente por eso existe. Nuestra tecnología se desarrolla para las condiciones reales de operación: logísticas complejas, amenazas no convencionales, entornos donde el soporte técnico está a miles de kilómetros. No dependemos de plantillas globales. Diseñamos para su terreno."
                  },
                  {
                    q: "¿Realmente anticipa, o solo automatiza alertas?",
                    a: "Correlacionamos datos de múltiples fuentes, detectamos patrones de amenaza antes de la materialización del riesgo, y generamos inteligencia operativa — no solo notificaciones. Su centro de mando pasa de reaccionar a dirigir la seguridad."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <span className="text-4xl font-black text-amber-500/20">0{idx + 1}</span>
                    <h4 className="text-xl font-bold text-white tracking-tight">{item.q}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Lo que diseñamos */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Capacidades</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                  Lo que <span className="text-sky-400">diseñamos.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    cap: "Correlación predictiva",
                    desc: "Análisis de eventos de seguridad en tiempo real para identificar patrones antes de la materialización del riesgo"
                  },
                  {
                    cap: "Detección adaptativa",
                    desc: "Modelos de amenaza ajustados al contexto operativo específico de cada instalación"
                  },
                  {
                    cap: "Tecnología propia",
                    desc: "Desarrollo y soporte independiente, sin dependencia de terceros externos ni licencias caducas"
                  },
                  {
                    cap: "Arquitectura crítica",
                    desc: "Diseño para instalaciones de máxima criticidad: embajadas, entes estratégicos, infraestructura sensible"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex items-start gap-6">
                    <div className="w-12 h-12 bg-sky-500/20 border border-sky-500/30 rounded-2xl flex items-center justify-center text-sky-400 shrink-0 mt-1">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-tight mb-2">{item.cap}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Evaluación técnica de vulnerabilidad predictiva & Testimonials */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Left Column: Offer / Evaluation */}
              <div className="lg:col-span-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-3xl p-10 backdrop-blur-sm space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Propuesta</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">
                  Evaluación técnica de vulnerabilidad predictiva
                </h3>
                <p className="text-gray-300 font-medium text-lg leading-relaxed">
                  En 48 horas identificaremos los ciegos operativos que su infraestructura actual no está viendo — y el diseño específico que los cerraría.
                </p>
                <div className="space-y-4 border-t border-white/10 pt-6">
                  {[
                    "Sin compromiso de compra",
                    "Entregable técnico detallado",
                    "Confidencialidad absoluta"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => scrollToContact('Evaluación Técnica de Vulnerabilidad')}
                  className="w-full px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                >
                  Solicitar evaluación técnica
                </button>
              </div>

              {/* Right Column: Testimonials */}
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Testimonios</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  ¿Quiénes operan con <span className="text-indigo-400">tecnología diseñada</span>, no instalada?
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      quote: "Pasamos de recibir alertas a anticipar situaciones. La diferencia operativa es abismal.",
                      author: "— Director de Seguridad, Instalación de alta criticidad"
                    },
                    {
                      quote: "Finalmente una tecnología que entiende nuestro contexto, no una plantilla importada.",
                      author: "— Jefe de Protección Física, Embajada"
                    }
                  ].map((t, tIdx) => (
                    <div key={tIdx} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col gap-4">
                      <p className="text-gray-300 font-medium italic text-lg">"{t.quote}"</p>
                      <p className="text-indigo-400 text-sm font-bold uppercase tracking-wider">{t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA in redesigned Hero - Scroll to Services */}
            <div className="text-center bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-3xl p-12 backdrop-blur-sm space-y-6 transition-all">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter max-w-3xl mx-auto leading-tight">
                Conozca nuestras soluciones que <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">disminuyen costos y mejoran la calidad</span> del servicio.
              </h3>
              <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                Desplácese hacia abajo para explorar nuestras capacidades de ingeniería y software táctico.
              </p>
              <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 group animate-pulse mt-4 cursor-pointer"
              >
                <span>Descubrir Soluciones</span>
                <ArrowRight className="w-4 h-4 rotate-90 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

        {/* PERSUASIVE CONTENT BLOCKS (Hook-Story-Offer) */}
        <div id="servicios" className="space-y-40 mb-40">
          
          {/* Block 1: ShieldTrace PSIM */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Part 1: Headline & 8 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Tecnología de Punta: HaaS</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  ShieldTrace PSIM: <br />
                  <span className="text-sky-400">El Control Total en tu mano.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">La Innovación Predictiva</p>
                  <p>
                    Durante años, las organizaciones han invertido miles de dólares en tecnología aislada. Cámaras, sensores y oficiales de seguridad operan como silos, dejando vulnerabilidades invisibles. <strong>ShieldTrace PSIM</strong> es el cerebro central que integra todo.
                  </p>
                </div>
                <div className="pt-4 hidden md:block relative group">
                  <div className="absolute -inset-2 bg-sky-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <img src="/images/haas2.png" alt="Ecosistema de Seguridad" className="w-full rounded-2xl border border-white/10 opacity-70 hover:opacity-100 transition-all duration-500 max-h-[160px] object-cover" />
                </div>
              </div>

              {/* 8 Pillars - Grid of Cards */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">El Enfoque de los 8 Pilares</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Nuestra tecnología deconstruye la seguridad en nodos críticos interconectados para una visión de 360° en tiempo real:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { p: "Humano", d: "Gestión activa y cumplimiento de rondas." },
                    { p: "Canino (K9)", d: "Telemetría de salud y operatividad." },
                    { p: "Aéreo (Drones)", d: "Vigilancia autónoma con sensores térmicos." },
                    { p: "Físicos", d: "Integridad mecánica de muros y portones." },
                    { p: "Electrónicos (IoT)", d: "Red de sensores sísmicos y de movimiento." },
                    { p: "Ciberseguridad", d: "Integridad de red y protección Cisco-Grade." },
                    { p: "OSINT", d: "Análisis de riesgo basado en el entorno social." },
                    { p: "Factor Crítico (Moral)", d: "Supervisión de bienestar y cumplimiento." }
                  ].map((pilar, pIdx) => (
                    <div key={pIdx} className="bg-white/5 border border-white/10 hover:border-sky-500/30 transition-all rounded-2xl p-5 backdrop-blur-sm flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white tracking-tight">{pilar.p}</h4>
                        <p className="text-xs text-gray-400 leading-normal">{pilar.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 1.5: ¿Qué es ShieldTrace PSIM y cómo funciona? */}
            <div className="border-t border-white/5 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white tracking-tight">¿Qué es ShieldTrace PSIM?</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    ShieldTrace es una <strong>plataforma de gestión de seguridad integral (PSIM)</strong> diseñada para convertir datos aislados en inteligencia operativa. No es un software más; es el cerebro central que orquesta todos tus dispositivos, sensores y personal en un único panel de control intuitivo.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white tracking-tight">¿Cómo funciona?</h3>
                  <div className="space-y-3">
                    {[
                      { t: "Conexión no intrusiva", d: "La tablet ShieldTrace se vincula a tu entorno de seguridad sin necesidad de modificar tus redes internas ni servidores existentes." },
                      { t: "Procesamiento híbrido", d: "Nuestra IA recibe señales de todos tus nodos (cámaras, sensores IoT, patrullas, OSINT) y las procesa en tiempo real." },
                      { t: "Decisión accionable", d: "El sistema analiza la criticidad de los eventos y te presenta, en la pantalla de tu tablet táctica, la información exacta que necesitas para tomar una decisión inmediata, eliminando el ruido y la incertidumbre." }
                    ].map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-3">
                        <span className="text-sky-400 font-bold shrink-0">{sIdx + 1}.</span>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          <strong className="text-white">{step.t}:</strong> {step.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Added Image visual aid HS3.png */}
              <div className="lg:col-span-4 relative group hidden lg:block">
                <div className="absolute -inset-4 bg-sky-500/10 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/images/HS3.png" 
                  alt="Centro de Mando Inteligente" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Part 2: Tablet Táctica & Superiority Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-sky-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/images/HS1.jpg" 
                  alt="ShieldTrace PSIM Dashboard" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ecosistema Seguro</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  La Tablet Táctica: <span className="text-indigo-400">Tu Asistente de Seguridad</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Entregamos un <strong>asistente de seguridad de grado militar pre-configurado</strong>. No realizamos instalaciones invasivas en tu red; te entregamos un dispositivo autónomo y customizado.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "KPIs Adaptados", d: "Adaptado a los KPIs de seguridad y prevención de su organización." },
                    { num: "02", t: "Canales Encriptados", d: "Utiliza canales encriptados y no invasivos." },
                    { num: "03", t: "Inteligencia Multi-Variable", d: "Combina variables de información tecnológicas, logísticas, humanas y hasta sociales." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-indigo-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: Planes y Beneficios */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Flexibilidad Comercial</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Planes y <span className="text-emerald-400">Beneficios</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { perfil: "Cliente de Vigilancia", inv: "$0 (GRATIS)", desc: "Incluido como valor agregado en nuestros contratos de seguridad.", highlight: false },
                  { perfil: "Gerente / Encargado", inv: "Desde $40/mes", desc: "Control total de tu estructura de seguridad desde tu propia tablet.", highlight: true },
                  { perfil: "Empresas", inv: "Desde $80/mes", desc: "Solución integral con reportes avanzados y soporte multi-sede.", highlight: false }
                ].map((plan, pIdx) => (
                  <div 
                    key={pIdx} 
                    className={`bg-white/5 border ${plan.highlight ? 'border-emerald-500/40 bg-emerald-500/[0.02]' : 'border-white/10'} hover:border-emerald-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col justify-between h-full gap-6`}
                  >
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-white tracking-tight">{plan.perfil}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed min-h-[40px]">{plan.desc}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{plan.inv.split(' ')[0]}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{plan.inv.split(' ')[1] || ''}</span>
                      </div>
                      <button 
                        onClick={() => scrollToContact(`Plan de ShieldTrace PSIM: ${plan.perfil}`)}
                        className="w-full py-4 bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 hover:border-emerald-500 text-emerald-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center"
                      >
                        Solicitar Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4: FAQ (Preguntas Frecuentes) */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Información Adicional</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Preguntas <span className="text-amber-400">Frecuentes (FAQ)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "¿Qué es un PSIM?", a: "Es el 'cerebro' que unifica tus cámaras, sensores y personal. ShieldTrace lo lleva al nivel de IA predictiva, haciendo que todos tus sistemas 'hablen' entre sí." },
                  { q: "¿Funciona en Venezuela y Miami?", a: "Sí. En Caracas, garantizamos operatividad local bajo estándares ISO 9001. En Miami, competimos en el segmento de Luxury Concierge Security, ofreciendo inteligencia predictiva que las empresas convencionales no pueden replicar." },
                  { q: "¿Cómo me ayuda si no soy experto?", a: "La tablet actúa como tu consultor CSSG 24/7. Ante una alerta, no recibes código, recibes una acción clara: 'Detección de merodeo. Acción: Verificar cámara #4'." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 5: Final Call to action */}
            <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight max-w-2xl">
                ¿Listo para el control total?
              </h3>
              <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                Con <strong>4,380 días sin incidentes</strong> en entornos críticos (Embajadas y Corporaciones), nuestra metodología es tu garantía.
              </p>
              <button 
                onClick={() => scrollToContact('Auditoría de Riesgo Gratis')}
                className="px-8 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 mt-4"
              >
                Solicitar Auditoría de Riesgo Gratis
              </button>
            </div>

          </motion.div>

          {/* Block 2: Construcción de CECOM */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            {/* Background ambient glow */}
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Part 1: Headline & Core Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Ingeniería de Élite</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  Construcción de CECOM: <br />
                  <span className="text-indigo-400">El Sistema Nervioso Central.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">No es una oficina con monitores.</p>
                  <p>
                    La mayoría cree que un Centro de Comando es simplemente poner pantallas en una pared. Hemos visto centros colapsar durante una crisis porque el diseño ignoraba la ergonomía, la velocidad de procesamiento de datos y la fatiga del operador.
                  </p>
                  <p>
                    Nuestra epifanía fue clara: la ingeniería debe servir a la decisión. Diseñamos y construimos Centros de Comando y Control (CECOM) bajo estándares de grado militar, optimizando cada segundo de reacción para que su equipo tome la decisión correcta bajo presión.
                  </p>
                </div>
              </div>

              {/* Advanced Capabilities - Grid of Cards */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">Excelencia en Ingeniería de Control</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Sistemas avanzados de comando y control construidos bajo redundancia y ergonomía de punta:
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { t: "Diseño Ergonómico de Alta Disponibilidad", d: "Optimizamos el campo visual y la fatiga del operador mediante estaciones ajustables y flujos de información ergonómicos." },
                    { t: "Redundancia Térmica y Eléctrica", d: "Sistemas de enfriamiento inteligente, UPS grado militar y doble acometida para cero interrupciones." },
                    { t: "Integración de Protocolos de Crisis", d: "Automatización de respuestas tácticas que guían al personal ante cualquier incidente." }
                  ].map((pilar, pIdx) => (
                    <div key={pIdx} className="bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all rounded-2xl p-5 backdrop-blur-sm flex items-start gap-4">
                      <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white tracking-tight">{pilar.t}</h4>
                        <p className="text-xs text-gray-400 leading-normal">{pilar.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 2: Visual & Strategic Design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/cecom_control_center_1777552494604.png" 
                  alt="Centro de Comando CECOM" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Tecnología de Vanguardia</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  Diseño de Nivel Militar: <span className="text-sky-400">Eficiencia Pura</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Cada componente de nuestro CECOM está estructurado con el fin de optimizar los tiempos de respuesta y brindar claridad total ante escenarios críticos de alta complejidad.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "Estándar ISO 11064", d: "Cumplimiento absoluto con los estándares de diseño ergonómico de centros de control para mitigar errores humanos." },
                    { num: "02", t: "Muros de Video Dinámicos", d: "Sincronización total de datos para proyectar múltiples alertas y mapas en tiempo real sin latencia." },
                    { num: "03", t: "Soporte Multi-Sede", d: "Capacidad de coordinar múltiples locaciones, unificando flujos de inteligencia en un solo punto." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-sky-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: FAQ (Preguntas Frecuentes de CECOM) */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Preguntas Frecuentes</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Preguntas sobre <span className="text-amber-400">CECOM</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "¿Qué tiempo toma la construcción?", a: "Dependiendo de la escala y requerimientos específicos, el proyecto completo puede tomar entre 45 y 90 días hábiles." },
                  { q: "¿Ofrecen capacitación al personal?", a: "Sí. No solo construimos, sino que capacitamos a sus operadores en gestión de crisis, ergonomía y toma de decisiones rápidas." },
                  { q: "¿Es compatible con sistemas existentes?", a: "Sí, nuestra ingeniería está diseñada para integrarse con sus cámaras, sensores e infraestructura actual sin contratiempos." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4: Final Call to Action */}
            <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight max-w-2xl">
                ¿Construimos su Centro de Élite?
              </h3>
              <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                Optimice el tiempo de reacción táctica de su equipo con ingeniería de grado militar que garantiza el control total.
              </p>
              <button 
                onClick={() => scrollToContact('Auditoría CECOM Élite')}
                className="px-8 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 mt-4"
              >
                Solicitar Información / Agendar Reunión
              </button>
            </div>
          </motion.div>

          {/* Block 3: Infraestructura de Cámaras Inteligentes */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Part 1: Headline & Philosophy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Inteligencia Proactiva</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  Cámaras Inteligentes: <br />
                  <span className="text-emerald-400">Detecte el Futuro, no el Pasado.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">Deje de ser un espectador de sus propias tragedias.</p>
                  <p>
                    Grabar gigabytes de video que nadie revisa es un gasto operativo, no una inversión en seguridad. Descubrimos que el fallo de la vigilancia tradicional es que es reactiva: le muestra lo que perdió después de que ocurrió.
                  </p>
                  <p>
                    Nuestra tecnología de IA transforma sus cámaras en oficiales vigilantes que nunca duermen. Alertas por patrones de comportamiento sospechoso, detección perimetral automática y reconocimiento en tiempo real. La seguridad real ocurre antes del primer paso del intruso.
                  </p>
                </div>
              </div>

              {/* Grid of Analytics Features */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">Analítica de Inteligencia Visual</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Aprovechamos los algoritmos de IA más avanzados del mercado para prevención activa:
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { t: "Analítica en Tiempo Real", d: "Detección inmediata de merodeo, intrusión perimetral y objetos abandonados sin latencia." },
                    { t: "LPR & Reconocimiento Facial", d: "Control de accesos automatizado para vehículos y personas mediante listas blancas/negras." },
                    { t: "Sensores Térmicos y Nocturnos", d: "Capacidad de monitoreo absoluto incluso en condiciones de visibilidad cero o neblina densa." }
                  ].map((pilar, pIdx) => (
                    <div key={pIdx} className="bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all rounded-2xl p-5 backdrop-blur-sm flex items-start gap-4">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white tracking-tight">{pilar.t}</h4>
                        <p className="text-xs text-gray-400 leading-normal">{pilar.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 2: Visual & Technical Features */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/ai_security_camera_overlay_1777552513820.png" 
                  alt="Infraestructura de Cámaras IA" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Ecosistema Seguro</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  Integración Multipropósito: <span className="text-sky-400">Flexibilidad Absoluta</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Diseñamos proyectos de cámaras que sirven tanto para la mitigación del riesgo físico como para la optimización logística de su operación.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "Prevención de Pérdidas", d: "Alertas tempranas de anomalías y comportamientos sospechosos antes de que ocurra el incidente." },
                    { num: "02", t: "Optimización Operativa", d: "Mapas de calor y patrones de tráfico de personal para mejorar el rendimiento de sus instalaciones." },
                    { num: "03", t: "Conectividad Segura", d: "Flujo de video encriptado end-to-end accesible desde cualquier dispositivo autorizado." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-sky-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: FAQ (Preguntas Frecuentes Cámaras) */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Información Adicional</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Preguntas sobre <span className="text-amber-400">Cámaras Inteligentes</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "¿Se pueden usar mis cámaras actuales?", a: "Sí. En la mayoría de los casos, podemos integrar sus cámaras existentes a nuestra plataforma de analítica de IA sin requerir nuevo hardware." },
                  { q: "¿Cuánto tiempo toma la implementación?", a: "Nuestros proyectos se completan típicamente en un rango de 15 a 30 días, dependiendo de la cantidad de canales." },
                  { q: "¿Cómo se maneja la privacidad de datos?", a: "Nuestra tecnología cumple estrictamente con estándares de encriptación end-to-end, asegurando que solo el personal autorizado tenga acceso." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4: Final Call to Action */}
            <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight max-w-2xl">
                ¿Listo para el Control Proactivo?
              </h3>
              <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                Deje de grabar eventos pasados y comience a anticipar cada movimiento de riesgo con analítica visual en tiempo real.
              </p>
              <button 
                onClick={() => scrollToContact('Integración de Cámaras IA')}
                className="px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 mt-4"
              >
                Solicitar Información / Agendar Reunión
              </button>
            </div>
          </motion.div>

          {/* Block 4: Consultoría en Tecnología */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Estrategia Rentable</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Consultoría Técnica: <br />
                <span className="text-amber-400">¿Hardware o Tranquilidad?</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">Elimine el ruido del mercado tecnológico.</p>
                <p>
                  Hemos visto cientos de presupuestos desperdiciados en "gadgets" costosos que no resuelven el problema de raíz. Nuestra epifanía: la tecnología sin estrategia es simplemente ruido caro. 
                </p>
                <p>
                  Nuestra consultoría no vende cajas; vende resultados. Realizamos estudios de objetivo y alcance basados en un análisis coste-beneficio riguroso. Si no reduce su riesgo o su coste operativo, no debería comprarlo. Así de simple.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 italic text-amber-200/70 text-sm">
                "La seguridad más cara es la que no se planifica. Diseñamos su hoja de ruta hacia el estándar Incidentes Cero."
              </div>
              <button 
                onClick={() => scrollToContact('Security Consulting')}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Solicitar Información / Agendar Reunión Corta Explicativa
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-amber-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/tech_security_consulting_ui_1777552535684.png" 
                alt="Consultoría de Seguridad Técnica" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 5: Auditoría de Ciberseguridad */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Seguridad Híbrida</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Auditoría Digital: <br />
                <span className="text-rose-400">¿Es su Red un Punto Ciego?</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">La seguridad física ya no es suficiente.</p>
                <p>
                  Muchos directivos creen que su empresa está segura porque tienen una puerta blindada y oficiales de élite. Sin embargo, hemos visto cómo organizaciones con perímetros perfectos perdían sus activos más valiosos en minutos a través de una brecha digital que nadie auditó.
                </p>
                <p>
                  Nuestra epifanía: en el siglo XXI, el perímetro es digital. Realizamos auditorías de penetración y blindaje de redes críticas para asegurar que su información esté tan protegida como su sede física. No deje la puerta trasera de su servidor abierta.
                </p>
              </div>
              <button 
                onClick={() => scrollToContact('Cybersecurity Audit')}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Solicitar Información / Agendar Reunión Corta Explicativa
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-rose-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/cybersecurity_audit_ui_1777552982082.png" 
                alt="Auditoría de Ciberseguridad" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 6: GPS Tracker */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-teal-500/10 border border-teal-500/20">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Telemetría Avanzada</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                GPS Tracker Pro: <br />
                <span className="text-teal-400">Visibilidad Sin Sombras.</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">Un punto en el mapa no es seguridad.</p>
                <p>
                  El rastreo convencional suele fallar cuando más se necesita: en zonas de baja cobertura o ante el uso de inhibidores de señal. Entendimos que el valor no está en saber "dónde está", sino en saber "qué está pasando" en tiempo real.
                </p>
                <p>
                  Nuestra solución de GPS de alta precisión ofrece telemetría completa: sensores de apertura de puertas, corte remoto de combustible y detección de Jammers. Es inteligencia móvil que le devuelve el control absoluto sobre sus activos en tránsito, 24/7.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/20">
                  <p className="text-teal-400 font-black text-xl">Anti-Jammer</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Protección de Señal</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white font-black text-xl">Alertas SMS/Push</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Respuesta Inmediata</p>
                </div>
              </div>
              <button 
                onClick={() => scrollToContact('GPS Tracker Implementation')}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Solicitar Información / Agendar Reunión Corta Explicativa
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-teal-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/gps_tracker_high_precision_map_1777553002245.png" 
                alt="GPS Tracker de Alta Precisión" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 7: Metodología de Proyectos */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0D0F16] via-[#121620] to-[#0A0D14] rounded-[3.5rem] p-12 md:p-20 border border-white/5 relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(14,165,233,0.15)]"
          >
            {/* Ambient neon light beams */}
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-500/10 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-500/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center space-y-6 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Nuestro Estándar</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  ¿Cómo manejamos sus <span className="text-sky-400">Proyectos?</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                  La precisión es el resultado de un proceso riguroso. En CSSG, no instalamos equipos; implementamos soluciones estratégicas certificadas.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  {[
                    { step: "01", title: "Auditoría de Vulnerabilidades", desc: "Identificamos cada punto ciego en su infraestructura física y digital.", bullets: ["Análisis de riesgos perimetrales", "Pruebas de intrusión digital", "Evaluación de protocolos humanos"], offset: "lg:ml-0" },
                    { step: "02", title: "Diseño de Arquitectura", desc: "Construimos el plano técnico que soportará toda su estrategia de seguridad.", bullets: ["Planos ergonómicos de CECOM", "Configuración de redes Cisco-Grade", "Redundancia eléctrica y térmica"], offset: "lg:ml-12" },
                    { step: "03", title: "Implementación Táctica", desc: "Nuestros expertos ejecutan la instalación bajo los más altos estándares de ingeniería.", bullets: ["Integración de hardware militar", "Sincronización de analíticas IA", "Capacitación de operadores"], offset: "lg:ml-24" },
                    { step: "04", title: "Certificación y Seguimiento", desc: "Llegamos a la cima con pruebas de estrés y un monitoreo continuo de su tranquilidad.", bullets: ["Simulacros de brechas y fallos", "Validación de estándares ISO", "Auditoría de incidentes cero"], offset: "lg:ml-36" }
                  ].map((item, idx) => {
                    const isExpanded = expandedIdx === idx;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                        className={`p-6 rounded-3xl bg-[#141824]/40 border border-white/5 hover:border-sky-500/40 hover:bg-sky-500/[0.03] transition-all group flex flex-col gap-4 backdrop-blur-md shadow-2xl relative overflow-hidden cursor-pointer ${item.offset}`}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/[0.01] group-hover:bg-sky-500/[0.03] blur-xl rounded-full transition-all duration-500" />
                        
                        <div className="flex items-center justify-between w-full select-none">
                          <div className="flex items-start gap-6">
                            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity leading-none select-none">
                              {item.step}
                            </span>
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors select-none mt-1">
                              {item.title}
                            </h3>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden space-y-3"
                        >
                          <p className="text-sm text-gray-400 leading-relaxed max-w-sm select-none">
                            {item.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1 select-none">
                            {item.bullets.map((bullet, bIdx) => (
                              <span key={bIdx} className="text-[10px] text-sky-300/60 bg-sky-500/5 border border-sky-500/10 rounded-md px-2 py-0.5 font-medium tracking-wide">
                                {bullet}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="flex-1 relative group w-full">
                  <div className="absolute -inset-10 bg-sky-500/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-all duration-1000 animate-pulse pointer-events-none" />
                  <img 
                    src="/security_methodology_staircase_climb_1777554286433.png" 
                    alt="Progreso de Seguridad CSSG" 
                    className="relative z-10 w-full rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(14,165,233,0.3)] hover:scale-[1.03] hover:border-sky-500/30 transition-all duration-1000 select-none object-cover"
                  />
                  {/* Glowing dynamic badge indicating peak security */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 z-20 bg-sky-500 p-4 rounded-full shadow-[0_0_50px_rgba(14,165,233,0.6)] border border-sky-400/30 flex items-center justify-center pointer-events-none hover:scale-110 transition-transform duration-300"
                  >
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* NICHE CARDS - Glassmorphism Redesign */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          {niches.map((niche, i) => (
            <motion.div
              key={niche.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="relative group"
            >
              <div className={`absolute -inset-[1px] bg-gradient-to-b ${niche.color} rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              
              <div className="relative h-full bg-[#0D0F16]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group-hover:border-white/20 transition-all duration-500">
                <div className="h-60 overflow-hidden relative">
                  <img src={niche.image} alt={niche.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F16] via-[#0D0F16]/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 backdrop-blur-md border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-2xl">
                      {niche.icon}
                    </div>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-sky-400 transition-colors">
                    {niche.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {niche.desc}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    {niche.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/feat">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 group-hover/feat:scale-150 transition-transform" />
                        <span className="text-xs text-gray-500 group-hover/feat:text-gray-300 transition-colors leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setSubject(niche.title);
                      document.getElementById('tech-conversion')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 hover:border-sky-500 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    {t('niches.btn')}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PREMIUM CONVERSION SECTION */}
        <section id="tech-conversion" className="scroll-mt-32 mb-40">
          <div className="relative rounded-[3rem] overflow-hidden group">
            {/* Background Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 blur-[100px] rounded-full opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full opacity-50" />
            
            <div className="relative bg-[#0D0F16]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-20 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">ISO 31000 Compliant Audit</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                  ¿Listo para elevar <br />
                  su <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Blindaje?</span>
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                  Obtenga un diagnóstico técnico detallado para su requerimiento de <span className="text-white underline decoration-sky-500/50 underline-offset-8 font-black">{subject || 'Infraestructura Crítica'}</span> en menos de 24 horas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                  <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Mail className="w-6 h-6 text-sky-400 mb-2" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Canal Directo</span>
                    <span className="text-white font-bold">info@globalservices-ven.com</span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Phone className="w-6 h-6 text-sky-400 mb-2" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Línea Táctica</span>
                    <span className="text-white font-bold">+58 212 953-CSSG</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[450px]">
                <div className="relative p-10 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/20 shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-8 text-center tracking-tight">Inicio de Proyecto</h3>
                    
                    {status === 'success' ? (
                      <div className="text-center space-y-8 py-4">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/50">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-black text-white">¡Registro Exitoso!</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            Hemos recibido su interés en <span className="text-white font-bold">{subject}</span>. <br />
                            Por favor, seleccione el horario de su preferencia para nuestra reunión técnica:
                          </p>
                        </div>
                        <a 
                          href="https://calendly.com/cssg-seguridad/reunion-tecnica" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 w-full py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl"
                        >
                          Agendar en Google Meet
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Respuesta prioritaria activada</p>
                      </div>
                    ) : (
                      <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Especialidad de Interés</label>
                          <input type="text" value={subject || "Seguridad Integral"} readOnly className="w-full bg-[#030305]/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold text-sm focus:border-sky-500/50 transition-all outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Representante</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Su nombre y cargo" 
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Correo Corporativo</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="email@empresa.com" 
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Empresa / Institución</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Nombre de su organización" 
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={status === 'loading'}
                          className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all mt-6 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                          {status === 'loading' ? 'Procesando...' : 'Obtener Propuesta Técnica'}
                        </button>
                        {status === 'error' && (
                          <p className="text-red-400 text-[10px] text-center mt-4 font-bold uppercase tracking-widest">Error al conectar con el servidor. Intente nuevamente.</p>
                        )}
                        <p className="text-[9px] text-gray-500 text-center mt-6 uppercase tracking-widest font-bold">Respuesta prioritaria para corporaciones</p>
                      </form>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>




      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}} />
    </div>
  );
}
