import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SearchCheck, ClipboardList, ShieldCheck, ArrowRight, Lock, Check, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendLeadNotification } from '../lib/email';
import { startSequence } from '../lib/sequences';

const NAVY = '#0A1628';
const SLATE = '#16233A';
const BORDER = '#233754';
const WHITE = '#F5F7FA';
const MUTED = '#93A4BE';
const GOLD = '#C9A24B';
const GOLD_H = '#DDB65F';
const ICE = '#7FB3D5';

// Fina retícula tipo plano técnico — textura sin fotografía, refuerza el posicionamiento "ingeniería de compliance"
const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%237FB3D5' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E")`;

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const painCards = [
  {
    Icon: SearchCheck,
    title: 'Confiable no significa auditable',
    body: 'Un guardia puede cumplir. Un supervisor puede responder. Una operación puede funcionar. Pero si no hay procedimiento, registro y evidencia, ante HQ todo depende de una explicación verbal. Y una explicación verbal no pasa una revisión DSS, OSAC o ISO.',
  },
  {
    Icon: ClipboardList,
    title: 'El riesgo aparece cuando piden evidencia',
    body: 'Cuando el proveedor no opera bajo un marco normado —ISO 18788, ISO 31000, PSC.1— cada respuesta se arma a mano: rondas, incidentes, planes, KPIs, escalamiento y trazabilidad. Ahí es donde la operación deja de ser defendible.',
  },
];

const services = [
  {
    badge: 'SC1',
    title: 'Gestión de guardias con procedimiento',
    tag: 'Alineado a ISO 18788',
    body: 'Guardias con control de ronda digital, supervisor dedicado por sitio y centro de control con PSIM, cámaras y drones — bajo un Sistema de Gestión de Operaciones de Seguridad (SOMS) alineado a ISO 18788. Cada novedad crítica escala en máximo 5 minutos. Lo que ocurre en sitio queda documentado antes de que HQ lo pregunte.',
  },
  {
    badge: 'SC2',
    title: 'Gestión de riesgo y compliance entregable',
    tag: 'ISO 31000 · PSC.1',
    body: 'Matriz de riesgos ISO 31000, registro de incidentes, gap analysis, protocolos de escalamiento y reporting mensual — alineado a PSC.1, listo para revisiones DSS y consultas OSAC. Nada que compilar ni traducir bajo presión. El paquete está listo para su comité.',
  },
  {
    badge: 'S7',
    title: 'KPIs que sostienen decisiones',
    tag: 'Framework ESRM',
    body: 'Cobertura, cumplimiento de rondas, tiempos de respuesta, tendencias de incidentes y madurez por sitio, consolidados bajo lógica ESRM. Si se puede medir, se puede defender.',
  },
];

const diferenciadores = [
  'ISO 9001 — certificado y vigente',
  'Cyber Essentials — ciberhigiene operativa certificada',
  'Operación alineada a ISO 18788 (operaciones de seguridad privada)',
  'Gestión de riesgo bajo ISO 31000',
  'Seguridad de cadena de suministro bajo ISO 28000',
  'Alineación a ANSI/ASIS PSC.1, OSAC y DSS',
  '17 años sin incidentes en embajadas y misiones diplomáticas',
  'Centro de control operativo con PSIM',
  'Novedades críticas con primer escalamiento en máximo 5 minutos',
  'Supervisor dedicado por sitio',
  'TVRA y gap analysis entregables',
];

const trustOperamos = ['ISO 18788', 'ISO 31000', 'ISO 28000'];
const trustAlineacion = ['ESRM', 'OSAC', 'DSS'];

interface FormData {
  nombre: string;
  cargo: string;
  organizacion: string;
  correo: string;
  linkedin: string;
}

/** Marco de esquinas tipo dossier técnico — sustituye el borde uniforme por 4 marcas en L */
function CornerFrame({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const mark = 'absolute w-3 h-3';
  return (
    <div className={`relative ${className}`}>
      <span className={`${mark} -top-px -left-px border-t border-l`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -top-px -right-px border-t border-r`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -bottom-px -left-px border-b border-l`} style={{ borderColor: GOLD }} />
      <span className={`${mark} -bottom-px -right-px border-b border-r`} style={{ borderColor: GOLD }} />
      {children}
    </div>
  );
}

/** Numeral fantasma de sección — numeración editorial, sin fotografía */
function SectionNumeral({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="hidden md:block select-none" style={{
      fontFamily: "'Playfair Display', serif", fontSize: '7.5rem', lineHeight: 1, fontWeight: 600,
      color: 'transparent', WebkitTextStroke: `1px ${BORDER}`, position: 'absolute', top: '-1.2rem', right: '1.5rem', zIndex: 0,
    }}>{n}</span>
  );
}

export default function EsrmReadiness() {
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', organizacion: '', correo: '', linkedin: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Empresa de Seguridad Certificada ISO 9001 — Registro de Proveedores | CSSG Global';
    const metaDescription = document.querySelector('meta[name="description"]');
    const content = 'Empresa de seguridad certificada ISO 9001 y Cyber Essentials, alineada a ISO 18788, ISO 31000, ISO 28000 y ANSI/ASIS PSC.1. Auditoría, gestión de riesgos y evidencia operativa listas para su registro de proveedores.';
    if (metaDescription) {
      metaDescription.setAttribute('content', content);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = content;
      document.head.appendChild(meta);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFreeEmail = (() => {
    const domain = formData.correo.split('@')[1]?.toLowerCase();
    return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.organizacion,
        mensaje: `[INVITACIÓN REGISTRO DE PROVEEDORES] Cargo: ${formData.cargo}${formData.linkedin ? ` | LinkedIn: ${formData.linkedin}` : ''}`,
        fuente: 'esrm_readiness',
        score: 65,
        estado: 'nuevo',
      }]).select('id').single();

      if (insertError) {
        console.error('Supabase Insert Error:', insertError);
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.organizacion,
          fuente: 'esrm_readiness',
          cargo: formData.cargo,
          mensaje: formData.linkedin ? `LinkedIn: ${formData.linkedin}` : undefined,
        });
        if (!emailRes.success) {
          console.warn('Email Notification Warning:', emailRes.error);
        }
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'esrm_readiness', formData.organizacion);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      setStatus('success');
    } catch (err: any) {
      console.error('Error submitting ESRM Readiness form:', err);
      setErrorMsg(err.message || 'Error de conexión o de base de datos.');
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: NAVY, color: WHITE, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');
      `}</style>

      {/* ═══ MINI NAV — cero fugas, sin menú de navegación ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: `${NAVY}E6`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-semibold tracking-widest text-sm" style={{ color: WHITE }}>
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all hover:-translate-y-0.5"
          style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}>
          Solicitar expediente
        </button>
      </header>

      {/* ═══ 1. HERO — fotografía de centro de operaciones, tratada en oscuro ═══ */}
      <header className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/cecom_control_center_1777552494604.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(1px) saturate(0.75)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(10,22,40,.97) 0%, rgba(10,22,40,.94) 42%, rgba(10,22,40,.72) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,22,40,.4) 0%, transparent 30%, rgba(10,22,40,.85) 100%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />

        <motion.div className="relative max-w-4xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-5">
            <span style={{ width: '28px', height: '1px', background: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: ICE, letterSpacing: '.22em' }}>
              Para Overseas &amp; Regional Security Managers en Venezuela y LATAM
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.6vw, 3.3rem)', lineHeight: 1.15, maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,.35)' }}>
            ¿Su proveedor de Seguridad Corporativa es auditable o improvisa?
          </h1>
          <p className="mb-6" style={{ color: MUTED, fontSize: '1.12rem', maxWidth: '640px' }}>
            Pídale evidencia a un proveedor sin certificaciones vigentes y verá improvisar la respuesta — la misma que terminará en su HQ.
          </p>
          <p className="text-sm font-semibold mb-8 pl-4" style={{ borderLeft: `2px solid ${GOLD}`, color: GOLD }}>
            Le entregamos planes y evidencia. No solo personal en sitio.
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center font-semibold px-9 py-4 text-base transition-all hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY, borderRadius: '2px', boxShadow: `inset 0 0 0 1px rgba(10,22,40,.35)` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Solicitar expediente de cumplimiento <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <p className="text-xs mt-3 uppercase" style={{ color: MUTED, letterSpacing: '.08em' }}>
            17 años sin incidentes · Confidencial · Sin compromiso
          </p>
        </motion.div>
      </header>

      {/* ═══ 2. AUTORIDAD ═══ */}
      <div className="relative py-12 px-6 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase font-semibold mb-8" style={{ color: MUTED, letterSpacing: '.18em' }}>Certificaciones verificables por terceros</p>
          <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-8 mb-10">
            {[
              { src: '/iso-9001-badge.webp', alt: 'ISO 9001:2015 Certified Company' },
              { src: '/cyber-essentials-badge.webp', alt: 'Cyber Essentials Certified' },
              { src: '/ifpo-corporate-member.webp', alt: 'IFPO Corporate Membership' },
            ].map((badge) => (
              <img key={badge.src} src={badge.src} alt={badge.alt}
                className="h-16 w-auto transition-all duration-300 hover:-translate-y-0.5"
                style={{ filter: 'grayscale(1) brightness(1.5) contrast(0.9)', opacity: 0.7 }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = 'none'; e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1) brightness(1.5) contrast(0.9)'; e.currentTarget.style.opacity = '0.7'; }}
                loading="lazy" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-14 gap-y-4 text-center">
            <p className="text-sm" style={{ color: MUTED }}>
              <span className="font-semibold" style={{ color: WHITE }}>Operamos bajo:</span>{' '}
              {trustOperamos.map((s, i) => <span key={s} style={{ color: ICE }}>{s}{i < trustOperamos.length - 1 ? ' · ' : ''}</span>)}
            </p>
            <p className="text-sm" style={{ color: MUTED }}>
              <span className="font-semibold" style={{ color: WHITE }}>Alineación:</span>{' '}
              {trustAlineacion.map((s, i) => <span key={s} style={{ color: ICE }}>{s}{i < trustAlineacion.length - 1 ? ' · ' : ''}</span>)}
            </p>
          </div>
        </div>
      </div>

      {/* ═══ 3. EL PROBLEMA ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="01" />
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>El problema real</p>
            <h2 className="mb-12" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', maxWidth: '780px' }}>
              Lo que no está certificado, documentado y medido no se puede defender ante HQ.
            </h2>
          </motion.div>
          <div className="relative grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {painCards.map(({ Icon, title, body }, i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                <CornerFrame className="p-8 h-full">
                  <div style={{ background: SLATE, borderTop: `2px solid ${GOLD}`, borderRadius: '2px' }} className="absolute inset-0 -z-10" />
                  <Icon className="w-6 h-6 mb-4" style={{ color: ICE }} />
                  <h3 className="text-base font-semibold mb-3" style={{ color: WHITE }}>{title}</h3>
                  <p className="text-sm" style={{ color: MUTED }}>{body}</p>
                </CornerFrame>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. LA SOLUCIÓN — línea de tiempo técnica, no grilla de tarjetas ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="02" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>La solución</p>
            <h2 className="mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', maxWidth: '760px' }}>
              Seguridad operativa con estructura auditable.
            </h2>
          </motion.div>
          <div className="relative flex flex-col gap-12 pl-1" style={{ borderLeft: `1px solid ${BORDER}` }}>
            {services.map(({ badge, title, tag, body }, i) => (
              <motion.div key={badge} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
                className="relative flex flex-col sm:flex-row gap-4 sm:gap-10 items-start pl-8">
                <span className="absolute left-0 top-1.5 w-2.5 h-2.5 -translate-x-1/2" style={{ background: GOLD, transform: 'translateX(-50%) rotate(45deg)' }} />
                <span className="shrink-0 mt-1 font-semibold text-sm px-4 py-2" style={{ border: `1px solid ${GOLD}`, color: GOLD, letterSpacing: '.1em', borderRadius: '2px' }}>
                  {badge}
                </span>
                <div>
                  <h3 className="text-lg font-semibold mb-1" style={{ color: WHITE }}>{title}</h3>
                  <p className="text-xs font-semibold uppercase mb-2" style={{ color: ICE, letterSpacing: '.08em' }}>{tag}</p>
                  <p style={{ color: MUTED, maxWidth: '640px' }}>{body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. DIFERENCIADORES ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="03" />
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>Diferenciadores</p>
            <p className="italic mb-10 pl-4" style={{ borderLeft: `3px solid ${GOLD}`, color: WHITE, fontSize: '1.1rem', maxWidth: '640px' }}>
              Lo que decimos que hacemos, queda registrado.
            </p>
          </motion.div>
          <div className="relative grid sm:grid-cols-2 gap-x-10 gap-y-1">
            {diferenciadores.map((item, i) => (
              <motion.div key={item} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 py-2.5" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                <span className="text-sm" style={{ color: MUTED }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 6. CTA FINAL — invitación cordial ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #101f36 0%, ${NAVY} 70%)`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <SectionNumeral n="04" />
        <motion.div className="relative max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <CornerFrame className="p-10 sm:p-12">
            <div className="absolute inset-0 -z-10" style={{ background: SLATE, border: `1px solid ${GOLD}`, borderRadius: '2px' }} />
            <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)' }}>
              Añada un proveedor que ya pasa la auditoría.
            </h2>
            <p style={{ color: MUTED }}>
              Reciba el expediente de cumplimiento completo — certificaciones, matrices de riesgo y evidencia operativa — listo para su comité de compras.
            </p>
            <button onClick={scrollToForm} className="inline-flex items-center font-semibold px-9 py-4 text-base transition-all hover:-translate-y-0.5 mt-7"
              style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
            >
              Solicitar expediente de cumplimiento <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <p className="text-xs italic mt-4" style={{ color: MUTED }}>
              También disponible: NDA, RFI, RFP y due diligence de vendor bajo estándar.
            </p>
          </CornerFrame>
        </motion.div>
      </section>

      {/* ═══ 7. FORMULARIO ═══ */}
      <section className="relative px-6" id="assessment" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-lg mx-auto relative">
          <SectionNumeral n="05" />
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <CornerFrame className="p-9 sm:p-11">
              <div className="absolute inset-0 -z-10" style={{ background: SLATE, border: `1px solid ${BORDER}`, borderRadius: '2px' }} />
              {status !== 'success' && (
                <span className="absolute top-4 right-4 text-[9px] font-bold uppercase px-2 py-1" style={{ color: GOLD, border: `1px solid ${GOLD}66`, letterSpacing: '.12em', borderRadius: '2px', transform: 'rotate(2deg)' }}>
                  Confidencial
                </span>
              )}
              {status === 'success' ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-5" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30`, borderRadius: '50%' }}>
                    <Check className="w-8 h-8" style={{ color: GOLD }} />
                  </div>
                  <h2 className="mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>Solicitud recibida</h2>
                  <p style={{ color: MUTED }}>
                    Nuestro equipo de compliance le enviará el expediente completo — certificaciones, matrices ISO 31000 y evidencia operativa — en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-center mb-7 mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                    Solicitar expediente de cumplimiento
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Nombre completo *</label>
                      <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                        className="w-full px-3.5 py-3 text-sm focus:outline-none"
                        style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Cargo *</label>
                      <input type="text" name="cargo" required placeholder="Regional Security Manager LATAM" value={formData.cargo} onChange={handleChange}
                        className="w-full px-3.5 py-3 text-sm focus:outline-none"
                        style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Organización *</label>
                      <input type="text" name="organizacion" required value={formData.organizacion} onChange={handleChange}
                        className="w-full px-3.5 py-3 text-sm focus:outline-none"
                        style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Email corporativo *</label>
                      <input type="email" name="correo" required value={formData.correo} onChange={handleChange}
                        className="w-full px-3.5 py-3 text-sm focus:outline-none"
                        style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                      {isFreeEmail && (
                        <p className="text-xs mt-1.5" style={{ color: ICE }}>Por la naturaleza confidencial del expediente, le recomendamos usar su correo corporativo.</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Enlace de LinkedIn (opcional)</label>
                      <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange}
                        className="w-full px-3.5 py-3 text-sm focus:outline-none"
                        style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-center p-3" style={{ color: '#ef4444', background: '#ef444410', borderRadius: '2px' }}>
                        Error: {errorMsg || 'Intente de nuevo o contacte directamente.'}
                      </p>
                    )}

                    <button type="submit" disabled={status === 'loading'}
                      className="w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                      ) : (
                        <>Solicitar expediente <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-center mt-4" style={{ color: MUTED }}>
                    Se lo enviaremos a su correo, con copia a gerencia@globalservices-ven.com para coordinar los siguientes pasos.
                  </p>
                </>
              )}
            </CornerFrame>
          </motion.div>
        </div>
      </section>

      {/* ═══ 8. TESTIMONIO ═══ */}
      <section className="relative px-6 py-20 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <motion.div className="relative max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontSize: '3rem', lineHeight: 0, verticalAlign: '-0.4rem' }}>&ldquo;</span>
El primer paquete de compliance de CSSG pasó la revisión de casa matriz sin una sola observación. Por primera vez, la conversación con HQ no fue sobre mis guardias — fue sobre mi estrategia de riesgo.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm" style={{ color: ICE }}>
            — Overseas Security Manager, multinacional del sector energético
            <span className="block text-xs mt-1" style={{ color: MUTED }}>(identidad reservada por protocolo de confidencialidad)</span>
          </cite>
          <p className="text-xs mt-4 max-w-md mx-auto" style={{ color: MUTED }}>
            Por política de confidencialidad, no publicamos nombres de clientes ni instalaciones. En su call técnico podemos compartir referencias verificables bajo acuerdo de reserva.
          </p>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-9 px-6 text-center text-sm" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <img src="/logo.webp" alt="CSSG" className="h-12 w-12 object-contain mx-auto mb-3" />
        <div className="font-semibold mb-2" style={{ color: GOLD }}>CSSG GLOBAL</div>
        <p>Seguridad Corporativa y Diplomática · Más de 17 años sirviendo sin incidentes</p>
        <p className="mt-2 flex items-center justify-center gap-1.5">
          <Lock className="w-3 h-3" /> Seguridad física preventiva · Vigilancia desarmada · Gestión de riesgos corporativos
        </p>
        <p className="mt-4 text-xs" style={{ color: `${MUTED}99` }}>
          <ShieldCheck className="inline w-3 h-3 mr-1 -mt-0.5" /> CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
      </footer>
    </div>
  );
}
