import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { ChevronRight, ArrowLeft, ShieldCheck, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { startSequence } from '../lib/sequences';
import { useTranslation } from 'react-i18next';

interface FAQ { q: string; a: string }
interface RelatedService { label: string; href: string }

interface Props {
  breadcrumb: string;
  badge: string;
  title: string;
  subtitle?: string;
  intro: string;
  children: React.ReactNode;
  faqs: FAQ[];
  related?: RelatedService[];
  accentColor?: 'sky' | 'indigo' | 'violet' | 'emerald' | 'amber';
}

const accent = {
  sky:     { border: 'border-sky-500/30',     bg: 'bg-sky-500/10',     text: 'text-sky-400',     bar: 'bg-sky-500',     hover: 'hover:border-sky-500/50',     glow: 'shadow-sky-500/20',  gradient: 'from-sky-900/70 to-indigo-900/40',    orb: 'bg-sky-600/15' },
  indigo:  { border: 'border-indigo-500/30',  bg: 'bg-indigo-500/10',  text: 'text-indigo-400',  bar: 'bg-indigo-500',  hover: 'hover:border-indigo-500/50',  glow: 'shadow-indigo-500/20', gradient: 'from-indigo-900/70 to-violet-900/40', orb: 'bg-indigo-600/15' },
  violet:  { border: 'border-violet-500/30',  bg: 'bg-violet-500/10',  text: 'text-violet-400',  bar: 'bg-violet-500',  hover: 'hover:border-violet-500/50',  glow: 'shadow-violet-500/20', gradient: 'from-violet-900/70 to-purple-900/40', orb: 'bg-violet-600/15' },
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', text: 'text-emerald-400', bar: 'bg-emerald-500', hover: 'hover:border-emerald-500/50', glow: 'shadow-emerald-500/20', gradient: 'from-emerald-900/70 to-teal-900/40',  orb: 'bg-emerald-600/15' },
  amber:   { border: 'border-amber-500/30',   bg: 'bg-amber-500/10',   text: 'text-amber-400',   bar: 'bg-amber-500',   hover: 'hover:border-amber-500/50',   glow: 'shadow-amber-500/20',  gradient: 'from-amber-900/70 to-orange-900/40',  orb: 'bg-amber-600/15' },
};

const heroImages: Record<string, string> = {
  sky:     '/images/consultoria-hero-premium.png',
  indigo:  '/diplomatic_security.png',
  violet:  '/strategic_security.png',
  emerald: '/security_methodology_staircase_climb_1777554286433.png',
  amber:   '/consulting_b2b.png',
};

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ConsultoriaServiceLayout({
  breadcrumb, badge, title, subtitle, intro, children, faqs, related = [], accentColor = 'sky',
}: Props) {
  const { t } = useTranslation('consultoria_hub');
  const [activeQ, setActiveQ] = useState<number | null>(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const col = accent[accentColor];
  const heroImg = heroImages[accentColor];

  const firstPeriod = intro.indexOf('. ');
  const introLead    = firstPeriod !== -1 ? intro.slice(0, firstPeriod + 1) : intro;
  const introSupport = firstPeriod !== -1 ? intro.slice(firstPeriod + 2)    : '';
  const colonIdx            = introSupport.lastIndexOf(': ');
  const introSupportBefore  = colonIdx !== -1 ? introSupport.slice(0, colonIdx + 2) : introSupport;
  const introSupportEmphasis = colonIdx !== -1 ? introSupport.slice(colonIdx + 2)   : '';

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        nombre, correo, empresa,
        mensaje: `Consulta: ${title}`,
        fuente: 'consultoria_servicio',
        score: 60,
      }]);
      if (error) throw error;
      if (correo) await startSequence('lead-' + Date.now(), correo, nombre, 'consultoria', empresa);
      setStatus('success');
      setNombre(''); setCorreo(''); setEmpresa('');
    } catch {
      setStatus('error');
    }
  };

  const certs = t('layout.certs', { returnObjects: true }) as string[];

  return (
    <div className="flex-1 bg-[#030305] relative z-10 overflow-hidden">

      {/* ── HERO BANNER ───────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] flex items-end overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] hover:scale-105"
          style={{ backgroundImage: `url('${heroImg}')` }}
        />
        {/* Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#030305]/40 to-transparent" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Animated orb */}
        <motion.div
          className={`absolute top-1/4 right-1/4 w-80 h-80 rounded-full ${col.orb} blur-[80px]`}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-5xl pb-12 pt-32">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-[11px] text-white/40 mb-6 uppercase tracking-widest font-bold"
          >
            <Link to="/" className="hover:text-white/70 transition-colors">{t('layout.breadcrumb_home')}</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/consultoria" className="hover:text-white/70 transition-colors">{t('layout.breadcrumb_hub')}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className={col.text}>{breadcrumb}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${col.border} ${col.bg} backdrop-blur-sm mb-5`}>
              <ShieldCheck className={`w-3.5 h-3.5 ${col.text}`} />
              <span className={`text-[10px] font-black ${col.text} uppercase tracking-widest`}>{badge}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[1.0] mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className={`text-sm font-black ${col.text} uppercase tracking-widest`}>{subtitle}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── INTRO CALLOUT ─────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl relative">
        <FadeIn className="py-12">
          <div
            className="max-w-[60ch] border-l-4 border-[#C9A227] rounded-r-lg px-6 py-6 md:px-7 md:py-7 bg-[#13294A] shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-[#C9A227]">
              El Método
            </p>
            <p className="text-base md:text-[1.0625rem] font-medium leading-snug mb-4 text-[#F4F7FB]">
              {introLead}
            </p>
            {introSupport && (
              <p className="text-sm leading-[1.7] text-[#B9C4D4]">
                {introSupportBefore}
                {introSupportEmphasis && (
                  <span className="text-[#E8EDF4]">{introSupportEmphasis}</span>
                )}
              </p>
            )}
          </div>
        </FadeIn>

        {/* ── PAGE CONTENT ──────────────────────────────── */}
        <FadeIn className="mb-16">
          {children}
        </FadeIn>

        {/* ── FAQ ───────────────────────────────────────── */}
        {faqs.length > 0 && (
          <FadeIn className="mb-16">
            <h2 className="text-2xl font-black text-white mb-8 tracking-tight">{t('layout.faq_title')}</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className={`rounded-2xl border transition-all duration-300 ${activeQ === i ? `${col.border} bg-white/[0.04] shadow-lg ${col.glow}` : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10]'}`}
                >
                  <button type="button" onClick={() => setActiveQ(activeQ === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4">
                    <span className="font-bold text-white text-sm md:text-base leading-snug">{faq.q}</span>
                    <motion.div animate={{ rotate: activeQ === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className={`w-4 h-4 ${col.text} shrink-0`} />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeQ === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* ── RELATED SERVICES ──────────────────────────── */}
        {related.length > 0 && (
          <FadeIn className="mb-16">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-5">{t('layout.related_title')}</h3>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <motion.div key={r.href} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to={r.href}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border ${col.border} ${col.bg} ${col.text} text-xs font-black uppercase tracking-widest hover:brightness-125 transition-all`}
                  >
                    {r.label} <ChevronRight className="w-3 h-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* ── CERTIFICATIONS BAR ────────────────────────── */}
        <FadeIn className="mb-16">
          <div className="flex flex-wrap items-center gap-5 py-5 px-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{t('layout.cert_label')}</span>
            {certs.map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-gray-500 font-bold">{cert}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── LEAD CTA ──────────────────────────────────── */}
        <FadeIn className="mb-20">
          <div className="grid md:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-white/[0.08]">
            {/* Left panel with image */}
            <div className="relative min-h-[340px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/consulting_b2b.png')` }}
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${col.gradient}`} />
              <div className="absolute inset-0 bg-[#030305]/40" />
              <div className="relative z-10 p-10 h-full flex flex-col justify-center">
                <ShieldCheck className="w-8 h-8 text-white/70 mb-5" />
                <h2 className="text-2xl font-black text-white mb-3 leading-tight">
                  {t('layout.cta_title')}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {t('layout.cta_desc')}
                </p>
                <div className="space-y-3">
                  {(t('layout.cta_points', { returnObjects: true }) as string[]).map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="p-10 bg-[#0A0B10]">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </motion.div>
                  <p className="font-black text-white text-lg">{t('layout.form_success')}</p>
                  <p className="text-gray-400 text-sm">{t('layout.form_success_sub')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">{t('layout.form_title')}</h3>
                  {[
                    { val: nombre, set: setNombre, ph: t('layout.form_name'), type: 'text', req: true },
                    { val: empresa, set: setEmpresa, ph: t('layout.form_company'), type: 'text', req: false },
                    { val: correo, set: setCorreo, ph: t('layout.form_email'), type: 'email', req: true },
                  ].map((f) => (
                    <input key={f.ph} type={f.type} required={f.req} value={f.val}
                      onChange={e => f.set(e.target.value)} placeholder={f.ph}
                      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:${col.border} transition-all placeholder:text-gray-600`}
                    />
                  ))}
                  <motion.button type="submit" disabled={status === 'loading'}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`w-full ${accentColor === 'sky' ? 'bg-sky-600 hover:bg-sky-500' : accentColor === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-500' : accentColor === 'violet' ? 'bg-violet-600 hover:bg-violet-500' : accentColor === 'amber' ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'} text-white font-black py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-sm uppercase tracking-widest shadow-lg`}
                  >
                    {status === 'loading' ? t('layout.form_sending') : (<>{t('layout.form_cta')} <ArrowRight className="w-4 h-4" /></>)}
                  </motion.button>
                  {status === 'error' && <p className="text-red-400 text-xs text-center">{t('layout.error_msg')}</p>}
                </form>
              )}
            </div>
          </div>
        </FadeIn>

        {/* ── BACK TO HUB ───────────────────────────────── */}
        <div className="mb-12">
          <Link to="/consultoria"
            className="inline-flex items-center gap-2 text-xs text-gray-600 hover:text-sky-400 transition-colors font-bold uppercase tracking-widest group">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {t('layout.back')}
          </Link>
        </div>

      </div>
    </div>
  );
}
