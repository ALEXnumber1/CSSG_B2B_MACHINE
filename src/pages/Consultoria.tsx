import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Search, Globe, Brain, RefreshCw, Scale,
  Server, BookOpen, Award, ArrowRight, ChevronRight, Plus,
  ShieldCheck, Target, Users, CheckCircle2, Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startSequence } from '../lib/sequences';
import { useTranslation } from 'react-i18next';

const familyIcons = [Search, Globe, Brain, RefreshCw, Scale];
const familyColors = ['sky', 'indigo', 'violet', 'emerald', 'amber'];
const familyImages = [
  '/images/consultoria-hero-premium.png',
  '/diplomatic_security.png',
  '/strategic_security.png',
  '/security_methodology_staircase_climb_1777554286433.png',
  '/consulting_b2b.png',
];
const familyLinks = [
  '/consultoria/evaluacion-de-riesgos-de-seguridad',
  '/consultoria/seguridad-misiones-diplomaticas',
  '/consultoria/due-diligence-corporativa',
  '/consultoria/continuidad-de-negocio',
  '/consultoria/asesoria-legal-rrhh-seguridad',
];
const familyServiceHrefs = [
  [
    '/consultoria/evaluacion-de-riesgos-de-seguridad',
    '/consultoria/diagnostico-madurez-seguridad',
    '/consultoria/site-survey-evaluacion-fisica',
    '/consultoria/auditoria-de-cumplimiento',
  ],
  [
    '/consultoria/seguridad-misiones-diplomaticas',
    '/consultoria/evaluacion-residencias-cancillerias',
  ],
  [
    '/consultoria/due-diligence-corporativa',
    '/consultoria/inteligencia-y-analisis-de-riesgo',
    '/consultoria/amenaza-interna-insider-threat',
  ],
  [
    '/consultoria/continuidad-de-negocio',
    '/consultoria/gestion-de-crisis-y-respuesta',
    '/consultoria/proteccion-ejecutiva-analisis-amenazas',
  ],
  [
    '/consultoria/asesoria-legal-rrhh-seguridad',
  ],
];

const layerIcons = [Server, BookOpen];
const layerImages = [
  '/images/tec_cecom.png',
  '/professional_security_team_consulting_1777553900162.png',
];
const layerServiceHrefs = [
  [
    '/consultoria/tecnologia/monitoreo-tiempo-real',
    '/consultoria/tecnologia/centro-de-mando-cecom',
    '/consultoria/tecnologia/scoring-de-seguridad',
  ],
  [
    '/consultoria/capacitacion/formacion-personal-seguridad',
    '/consultoria/capacitacion/respuesta-crisis-equipos',
    '/consultoria/capacitacion/concienciacion-ejecutiva',
  ],
];

const colorAccent: Record<string, { border: string; glow: string; text: string; bg: string; gradient: string }> = {
  sky:     { border: 'border-sky-500/40',     glow: 'shadow-sky-500/20',    text: 'text-sky-400',     bg: 'bg-sky-500/10',     gradient: 'from-sky-900/60 to-transparent' },
  indigo:  { border: 'border-indigo-500/40',  glow: 'shadow-indigo-500/20', text: 'text-indigo-400',  bg: 'bg-indigo-500/10',  gradient: 'from-indigo-900/60 to-transparent' },
  violet:  { border: 'border-violet-500/40',  glow: 'shadow-violet-500/20', text: 'text-violet-400',  bg: 'bg-violet-500/10',  gradient: 'from-violet-900/60 to-transparent' },
  emerald: { border: 'border-emerald-500/40', glow: 'shadow-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-500/10', gradient: 'from-emerald-900/60 to-transparent' },
  amber:   { border: 'border-amber-500/40',   glow: 'shadow-amber-500/20',  text: 'text-amber-400',   bg: 'bg-amber-500/10',   gradient: 'from-amber-900/60 to-transparent' },
};

const accentHex: Record<string, string> = {
  sky: '#0EA5E9', indigo: '#6366F1', violet: '#8B5CF6', emerald: '#10B981', amber: '#F59E0B',
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Consultoria() {
  const { t } = useTranslation('consultoria_hub');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedFamily, setSelectedFamily] = useState(-1);
  const heroRef = useRef(null);

  const stats = t('hub.stats', { returnObjects: true }) as Array<{ value: string; unit: string; label: string }>;
  const families = t('hub.families', { returnObjects: true }) as Array<{ badge: string; title: string; desc: string; explore: string; services: string[] }>;
  const layers = t('hub.layers', { returnObjects: true }) as Array<{ badge: string; title: string; desc: string; services: string[] }>;
  const diagPoints = t('hub.diag_points', { returnObjects: true }) as string[];

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        nombre, correo, empresa,
        mensaje: 'Solicitud desde hub Risk Advisory Services',
        fuente: 'consultoria_hub',
        score: 55,
      }]);
      if (error) throw error;
      if (correo) startSequence('lead-' + Date.now(), correo, nombre, 'consultoria', empresa).catch(console.warn);
      setStatus('success');
      setNombre(''); setCorreo(''); setEmpresa('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 overflow-hidden">

      {/* ─── HERO ──────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/professional_security_team_consulting_1777553900162.png')` }}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/70 via-[#030305]/60 to-[#030305]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/80 via-transparent to-[#030305]/40" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(14,165,233,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-600/10 blur-[100px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-sm mb-8"
            >
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-black text-sky-300 uppercase tracking-widest">{t('hub.badge')}</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.95]">
              {t('hub.title_line1')}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400">
                {t('hub.title_line2')}
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-300/80 leading-relaxed max-w-2xl mb-10 border-l-4 border-sky-500/50 pl-6"
            >
              {t('hub.intro')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#diagnostico"
                className="group inline-flex items-center gap-3 bg-sky-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-sky-500 transition-all shadow-2xl shadow-sky-900/50 w-fit">
                {t('hub.cta_primary')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link to="/consultoria/certificaciones"
                className="inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/[0.12] transition-all w-fit">
                {t('hub.cta_secondary')}
                <Award className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* BENTO STATS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-12 gap-3"
          >
            {/* Primary featured stat */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="col-span-2 md:col-span-4 relative overflow-hidden p-7 rounded-2xl bg-sky-500/[0.12] border border-sky-500/40 backdrop-blur-md flex flex-col justify-between min-h-[120px]"
            >
              <div className="absolute -right-4 -top-4 text-[7rem] font-black text-sky-500/[0.08] leading-none select-none pointer-events-none">+17</div>
              <div className="text-[9px] font-black text-sky-400/80 uppercase tracking-[0.2em] mb-3">{stats[0].label}</div>
              <div>
                <span className="text-5xl md:text-6xl font-black text-white leading-none">{stats[0].value}</span>
                <span className="text-2xl font-black text-sky-400 ml-1">{stats[0].unit}</span>
                <p className="text-[10px] text-sky-300/50 mt-1.5 font-bold uppercase tracking-wider">sin un solo incidente de seguridad</p>
              </div>
            </motion.div>

            {/* Three secondary stats */}
            {stats.slice(1).map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.09, duration: 0.5 }}
                className="col-span-1 md:col-span-2 p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.07] flex flex-col justify-center text-center hover:border-white/[0.14] transition-all group"
              >
                <div className="text-2xl md:text-3xl font-black text-white group-hover:text-sky-300 transition-colors">
                  {s.value}<span className="text-sky-400 text-lg">{s.unit}</span>
                </div>
                <div className="text-[9px] text-gray-600 uppercase tracking-widest font-bold mt-1.5 leading-tight">{s.label}</div>
              </motion.div>
            ))}

            {/* Certifications strip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="col-span-2 md:col-span-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md flex items-center gap-4 flex-wrap"
            >
              {['ISO 9001:2015', 'Cyber Essentials', 'ESRM · ASIS', 'ISO 31000'].map((cert) => (
                <div key={cert} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[10px] text-gray-400 font-bold">{cert}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-sky-400/60" />
          </div>
        </motion.div>
      </section>

      {/* ─── MAIN CONTENT ──────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative pb-24">

        {/* ─── 5 SERVICE FAMILIES — MINIMAL ACCORDION ─── */}
        <section className="py-24" id="familias">

          {/* Section header */}
          <FadeIn className="mb-14">
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 w-fit">
                <Target className="w-3 h-3 text-sky-400" />
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{t('hub.families_label')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none">
                {t('hub.families_title')}
              </h2>
            </div>
          </FadeIn>

          {/* Accordion */}
          <div className="border-t border-white/[0.07]">
            {families.map((f, i) => {
              const Icon = familyIcons[i];
              const color = familyColors[i];
              const ac = colorAccent[color];
              const img = familyImages[i];
              const link = familyLinks[i];
              const serviceHrefs = familyServiceHrefs[i];
              const isOpen = selectedFamily === i;

              return (
                <FadeIn key={i} delay={i * 0.05}>
                  <div id={`f${i}`} className="border-b border-white/[0.07]">

                    {/* ── Header row ── */}
                    <button
                      type="button"
                      onClick={() => setSelectedFamily(isOpen ? -1 : i)}
                      className="w-full text-left py-6 md:py-7 flex items-center gap-5 md:gap-8 group"
                    >
                      {/* Counter */}
                      <span className={`text-[11px] font-black tabular-nums shrink-0 transition-colors ${isOpen ? ac.text : 'text-gray-700 group-hover:text-gray-500'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      {/* Title */}
                      <span className={`text-lg md:text-2xl lg:text-[1.75rem] font-black tracking-tight transition-colors ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                        {f.title}
                      </span>

                      {/* Badge — md+ only */}
                      <span className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${isOpen ? `${ac.border} ${ac.bg} ${ac.text}` : 'border-white/[0.07] text-gray-700'}`}>
                        <Icon className="w-2.5 h-2.5" />
                        {f.badge}
                      </span>

                      <div className="flex-1" />

                      {/* Toggle */}
                      <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all ${isOpen ? `${ac.border} ${ac.bg}` : 'border-white/[0.08] group-hover:border-white/20'}`}>
                        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.22 }}>
                          <Plus className={`w-3.5 h-3.5 transition-colors ${isOpen ? ac.text : 'text-gray-600'}`} />
                        </motion.div>
                      </div>
                    </button>

                    {/* ── Expanded panel — always in DOM for SEO ── */}
                    <motion.div
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                      aria-hidden={!isOpen}
                    >
                          <div className="pb-12 grid md:grid-cols-[1fr_38%] gap-8 md:gap-14">

                            {/* Content */}
                            <div>
                              <p className="text-gray-400 text-sm leading-relaxed mb-8 border-l-2 pl-5"
                                style={{ borderColor: accentHex[color] }}>
                                {f.desc}
                              </p>

                              {/* Service list */}
                              <div className="mb-8">
                                {f.services.map((label, si) => (
                                  <Link
                                    key={serviceHrefs[si] ?? si}
                                    to={serviceHrefs[si] ?? '#'}
                                    className="flex items-center gap-3 py-3 border-b border-white/[0.05] text-gray-500 hover:border-white/[0.12] transition-all"
                                    onMouseEnter={e => (e.currentTarget.style.color = accentHex[color])}
                                    onMouseLeave={e => (e.currentTarget.style.color = '')}
                                  >
                                    <ArrowRight className="w-3 h-3 shrink-0" style={{ color: 'inherit' }} />
                                    <span className="text-xs">{label}</span>
                                  </Link>
                                ))}
                              </div>

                              {/* Explore CTA */}
                              <Link to={link}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] hover:gap-3 transition-all"
                                style={{ color: accentHex[color] }}>
                                {f.explore} <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>

                            {/* Image — hidden on mobile */}
                            <div className="hidden md:block relative rounded-2xl overflow-hidden min-h-[240px]">
                              <div className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url('${img}')` }} />
                              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #030305 0%, transparent 55%)' }} />
                              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #030305 0%, transparent 35%)' }} />
                              <div className="absolute bottom-3 right-3 text-[5rem] font-black leading-none select-none pointer-events-none"
                                style={{ color: accentHex[color], opacity: 0.15 }}>
                                {String(i + 1).padStart(2, '0')}
                              </div>
                            </div>

                          </div>
                    </motion.div>

                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* CECOM FULL-WIDTH BANNER */}
        <FadeIn>
          <section className="mb-20 rounded-3xl overflow-hidden relative h-72">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/cecom_control_center_1777552494604.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/95 via-[#030305]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030305]/80 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-16 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-sm mb-4 w-fit">
                <Zap className="w-3 h-3 text-sky-400" />
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">{t('hub.cecom_badge')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">
                {t('hub.cecom_title')}
              </h2>
              <Link to="/consultoria/tecnologia/centro-de-mando-cecom"
                className="inline-flex items-center gap-2 text-sky-400 text-sm font-black uppercase tracking-widest hover:gap-3 transition-all w-fit">
                {t('hub.cecom_link')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* SUPPORT LAYERS */}
        <section className="mb-24">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">{t('hub.layers_title')}</h2>
            <p className="text-sm text-gray-600 mb-10">{t('hub.layers_sub')}</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            {layers.map((layer, i) => {
              const Icon = layerIcons[i];
              const img = layerImages[i];
              const serviceHrefs = layerServiceHrefs[i];
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-sky-500/30 transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url('${img}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0B10]/60 to-[#0A0B10]" />
                    </div>
                    <div className="p-6 bg-[#0A0B10]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-9 h-9 rounded-xl bg-sky-500/5 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-sky-400/70" />
                        </div>
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{layer.badge}</span>
                      </div>
                      <h3 className="text-base font-black text-white mb-2 group-hover:text-sky-300 transition-colors">{layer.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-4">{layer.desc}</p>
                      <div className="space-y-1.5">
                        {layer.services.map((label, si) => (
                          <Link key={serviceHrefs[si] ?? si} to={serviceHrefs[si] ?? '#'}
                            className="flex items-center gap-2 text-xs text-gray-600 hover:text-sky-400 transition-colors py-0.5 group/link">
                            <ChevronRight className="w-3 h-3 text-gray-700 group-hover/link:text-sky-500 transition-colors" />
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { to: '/consultoria/casos-de-exito', icon: Users, titleKey: 'hub.cases_title', subKey: 'hub.cases_sub' },
              { to: '/consultoria/certificaciones', icon: Award, titleKey: 'hub.certifications_title', subKey: 'hub.certifications_sub' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.to}>
                  <Link to={item.to}
                    className="group p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-sky-500/25 transition-all flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/5 flex items-center justify-center shrink-0 group-hover:bg-sky-500/10 transition-all">
                      <Icon className="w-4 h-4 text-sky-400/60 group-hover:text-sky-400 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-white group-hover:text-sky-400 transition-colors">{t(item.titleKey)}</h4>
                      <p className="text-xs text-gray-600">{t(item.subKey)}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-sky-400 transition-colors" />
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* SHIELDTRACE TECHNOLOGY STRIP */}
        <FadeIn>
          <section className="mb-20 relative rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/shieldtrace_tablet_dashboard_1777552473752.png')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030305]/90 via-[#030305]/75 to-[#030305]/40" />
            <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <img src="/shieldtrace1.png" alt="ShieldTrace" className="h-10 object-contain opacity-90" />
              <div className="flex-1">
                <p className="text-white font-black text-lg md:text-xl mb-1">{t('hub.tech_title')}</p>
                <p className="text-gray-400 text-sm">{t('hub.tech_desc')}</p>
              </div>
              <Link to="/consultoria/tecnologia/monitoreo-tiempo-real"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/20 transition-all shrink-0">
                {t('hub.tech_link')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </FadeIn>

        {/* CERTIFICATIONS BAR */}
        <FadeIn>
          <section className="mb-20">
            <div className="flex flex-wrap items-center gap-6 py-5 px-7 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('hub.certs_label')}</span>
              {['ISO 9001:2015 — Cert. 580181', 'Cyber Essentials — Recert. May 2027', 'Marco ESRM · ASIS', 'ISO 31000 · ISO 22301', 'CPTED'].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="text-xs text-gray-400 font-bold">{cert}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* CTA SECTION */}
        <FadeIn>
          <section id="diagnostico">
            <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-white/[0.08]">
              {/* Left: image + copy */}
              <div className="relative min-h-[420px] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/consultoria_card.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 to-indigo-900/80" />
                <div className="absolute inset-0 bg-[#030305]/30" />
                <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-center">
                  <ShieldCheck className="w-10 h-10 text-white/70 mb-6" />
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    {t('hub.diag_title')}
                  </h2>
                  <p className="text-white/70 text-sm leading-relaxed mb-8">
                    {t('hub.diag_desc')}
                  </p>
                  <div className="space-y-3">
                    {diagPoints.map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-sm text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="p-10 md:p-14 bg-[#0A0B10]">
                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                    <h3 className="text-xl font-black text-white">{t('hub.success_title')}</h3>
                    <p className="text-sm text-gray-400">{t('hub.success_sub')}</p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-black text-white mb-2">{t('hub.form_title')}</h3>
                    <p className="text-sm text-gray-500 mb-8">{t('hub.form_sub')}</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" required value={nombre} onChange={e => setNombre(e.target.value)}
                        placeholder={t('layout.form_name')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-gray-600" />
                      <input type="text" value={empresa} onChange={e => setEmpresa(e.target.value)}
                        placeholder={t('layout.form_company')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-gray-600" />
                      <input type="email" required value={correo} onChange={e => setCorreo(e.target.value)}
                        placeholder={t('layout.form_email')}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-sky-500 transition-all placeholder:text-gray-600" />
                      <motion.button type="submit" disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full bg-sky-600 text-white font-black py-4 rounded-xl hover:bg-sky-500 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-lg shadow-sky-900/30">
                        {status === 'loading' ? t('layout.form_sending') : (<>{t('hub.form_submit')} <ArrowRight className="w-4 h-4" /></>)}
                      </motion.button>
                      {status === 'error' && <p className="text-red-400 text-xs text-center">{t('layout.error_msg')}</p>}
                    </form>
                    <p className="text-[10px] text-gray-700 uppercase tracking-widest mt-6 text-center font-bold">
                      ISO 9001:2015 · Cyber Essentials · 17 años sin incidentes
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
        </FadeIn>

      </div>
    </div>
  );
}
