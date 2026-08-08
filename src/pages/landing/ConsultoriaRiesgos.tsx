import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ShieldCheck, ScanSearch, ClipboardList, Award, ArrowRight, Check, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

// ─────────────────────────────────────────────────────────────
// LP2 — CONSULTORÍA Y ANÁLISIS DE RIESGOS (ES)
// Tratamiento editorial "Estratega" — mismo lenguaje visual que
// EsrmReadiness.tsx: navy profundo, dorado, serif, marcos tipo dossier.
// Keywords: consultoría de seguridad, evaluación de riesgos de seguridad,
// análisis de riesgos de seguridad, auditoría de seguridad física,
// diagnóstico de seguridad, gestión de riesgos.
// Lead magnet: "Diagnóstico de Vulnerabilidades de Seguridad" —
// autoevaluación FMEA / ISO 31000 en 4 pilares.
// ─────────────────────────────────────────────────────────────

const NAVY = '#0A1628';
const SLATE = '#16233A';
const BORDER = '#233754';
const WHITE = '#F5F7FA';
const MUTED = '#93A4BE';
const GOLD = '#C9A24B';
const GOLD_H = '#DDB65F';
const ICE = '#7FB3D5';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%237FB3D5' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E")`;

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/** Marco de esquinas tipo dossier técnico */
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

function SectionNumeral({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="hidden md:block select-none" style={{
      fontFamily: "'Playfair Display', serif", fontSize: '7.5rem', lineHeight: 1, fontWeight: 600,
      color: 'transparent', WebkitTextStroke: `1px ${BORDER}`, position: 'absolute', top: '-1.2rem', right: '1.5rem', zIndex: 0,
    }}>{n}</span>
  );
}

const painCards = [
  {
    Icon: ScanSearch,
    title: 'Una opinión no es un diagnóstico',
    body: 'Puede sentir que su esquema de seguridad es sólido. Pero "se siente sólido" no es una métrica que su junta directiva o su casa matriz pueda auditar. Sin un índice numérico, ponderado y referenciado a un estándar, cualquier decisión de presupuesto se defiende con intuición — y la intuición no resiste una revisión de compliance.',
  },
  {
    Icon: ClipboardList,
    title: 'El riesgo aparece cuando piden evidencia',
    body: 'Cuando un evaluador externo no trabaja bajo un marco normado — ISO 31000, ASIS ORM.1 — cada hallazgo se redacta a mano, sin ponderación real entre probabilidad e impacto. El resultado es un informe que se lee una vez y no vuelve a abrirse, porque nadie puede comparar una sede con otra ni justificar por qué una vulnerabilidad es más urgente que otra.',
  },
];

const services = [
  {
    badge: '01',
    title: 'Mapeo de activos y los 4 pilares de riesgo',
    tag: 'Perímetro · Accesos · Procedimientos · Inteligencia',
    body: 'Antes de asignar cualquier recurso, identifique qué está protegiendo realmente. La autoevaluación recorre los cuatro pilares que determinan la resiliencia operativa de cualquier organización — con 20 preguntas concretas, puntuadas de 0 a 3.',
  },
  {
    badge: '02',
    title: 'La fórmula FMEA para su Índice de Riesgo',
    tag: 'ISO 31000:2018 · ASIS ORM.1:2017',
    body: 'Cada vulnerabilidad se pondera con Riesgo = (Probabilidad × 0,4) + (Impacto × 0,6) — el mismo cálculo que usamos en auditorías privadas. El resultado es un índice de madurez comparable entre sedes, no una impresión subjetiva.',
  },
  {
    badge: '03',
    title: 'Matriz de riesgo y hoja de resultados',
    tag: 'Semáforo de madurez en 4 niveles',
    body: 'Sus respuestas se consolidan en una matriz de probabilidad × impacto y un semáforo de madurez (Crítico, Alto, Moderado, Óptimo) que le dice, en una sola página, qué atender primero — y qué puede esperar.',
  },
];

const diferenciadores = [
  'Metodología FMEA aplicada a los mismos 4 pilares que usamos en auditorías privadas.',
  'Referenciada contra ISO 31000:2018 — gestión de riesgos.',
  'Alineada a ASIS ORM.1:2017 — gestión de riesgos operacionales de seguridad.',
  '+17 años de operación continua sin incidentes registrados.',
  'Certificación ISO 9001:2015 (Cert. 580181) en gestión de calidad.',
  'Proveedor de misiones diplomáticas y corporaciones bajo estándar G7.',
  'Herramienta propia de análisis de riesgo en línea, con índice automatizado.',
  'Aplicable a más de una sede, con criterio comparable entre instalaciones.',
];

const FAQS = [
  {
    q: '¿Es realmente gratuito o tiene algún costo oculto?',
    a: 'Es gratuito, sin tarjeta de crédito ni compromiso. Solo pedimos su correo para enviarle el documento y, si lo desea, contenido de inteligencia de seguridad corporativa.',
  },
  {
    q: '¿Qué diferencia esta autoevaluación de un análisis de riesgos de seguridad genérico?',
    a: 'Está construida sobre la misma metodología FMEA que usamos en nuestras auditorías privadas — no es una checklist de sentido común, es el sistema de gestión de riesgos exacto que aplicamos con clientes corporativos, referenciado a ISO 31000:2018 y ASIS ORM.1:2017.',
  },
  {
    q: '¿Esto reemplaza una consultoría de seguridad completa?',
    a: 'No, la complementa. Le permite hacer un primer diagnóstico de seguridad serio con su propio equipo. Cuando necesite verificación en sitio o un informe con validez ante su directiva, ahí es donde entra una consultoría con un especialista de CSSG.',
  },
  {
    q: '¿Necesito ser experto en seguridad para aplicarla?',
    a: 'No. Está escrita para directores de operaciones, gerentes administrativos y responsables de compliance que necesitan evaluar riesgo sin ser especialistas en seguridad física.',
  },
  {
    q: '¿Sirve para más de una sede o instalación?',
    a: 'Sí. El índice está diseñado para replicarse por sede, lo que le permite comparar el resultado entre instalaciones con el mismo criterio y priorizar inversión donde realmente se necesita.',
  },
  {
    q: '¿Qué pasa con mis datos?',
    a: 'No compartimos su información con terceros. Se almacena de forma segura y puede solicitar su eliminación cuando quiera escribiendo a gerencia@globalservices-ven.com.',
  },
];

interface FormData {
  nombre: string;
  cargo: string;
  empresa: string;
  correo: string;
}

export default function ConsultoriaRiesgos() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', empresa: '', correo: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Evaluación de Riesgos de Seguridad y Consultoría de Seguridad | Guía ISO 31000 Gratis | CSSG';
    const desc = 'Descarga gratis la guía de evaluación y análisis de riesgos de seguridad: checklist ISO 31000, diagnóstico de seguridad, auditoría de seguridad física y matriz de gestión de riesgos FMEA. Por CSSG, +17 años sin incidentes.';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', desc);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = desc;
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
        empresa: formData.empresa,
        mensaje: `[LP CONSULTORÍA Y ANÁLISIS DE RIESGOS] Solicitó: Diagnóstico de Vulnerabilidades de Seguridad (ISO 31000 + FMEA)${formData.cargo ? ` | Cargo: ${formData.cargo}` : ''}`,
        fuente: 'lp_consultoria_riesgos',
        score: 45,
        estado: 'nuevo',
      }]).select('id').single();

      if (insertError) {
        if (insertError.code === '23505') {
          console.warn('Duplicate lead email, treating as already registered:', insertError);
          try {
            await sendLeadNotification({
              nombre: formData.nombre,
              email: formData.correo,
              empresa: formData.empresa,
              fuente: 'lp_consultoria_riesgos',
              cargo: formData.cargo,
              mensaje: '[SOLICITUD REPETIDA] Diagnóstico de Vulnerabilidades ISO 31000',
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/consultoria-y-analisis-de-riesgos/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true } });
          return;
        }
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.empresa,
          fuente: 'lp_consultoria_riesgos',
          cargo: formData.cargo,
        });
        if (!emailRes.success) console.warn('Email Notification Warning:', emailRes.error);
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'consultoria_riesgos_guia', formData.empresa);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      navigate('/consultoria-y-analisis-de-riesgos/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de conexión o de base de datos.';
      console.error('Error submitting LP Consultoria Riesgos form:', err);
      setErrorMsg(message);
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('diagnostico')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: NAVY, color: WHITE, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, minHeight: '100vh' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />

      {/* ═══ MINI NAV ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: `${NAVY}E6`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-9 w-9 object-contain" />
          <span className="font-semibold tracking-widest text-sm" style={{ color: WHITE }}>
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest px-5 py-2.5 transition-all hover:-translate-y-0.5"
          style={{ background: GOLD, color: NAVY, borderRadius: '2px' }}>
          Solicitar diagnóstico
        </button>
      </header>

      {/* ═══ 1. HERO — fotografía de auditoría en sitio, tratada en oscuro ═══ */}
      <header className="relative min-h-[92vh] flex flex-col justify-center px-6 pt-24 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/svc_auditoria.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 25%', filter: 'blur(1px) saturate(0.75)', transform: 'scale(1.03)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(10,22,40,.92) 0%, rgba(10,22,40,.8) 45%, rgba(10,22,40,.35) 100%)' }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(10,22,40,.25) 0%, transparent 30%, rgba(10,22,40,.75) 100%)` }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />

        <motion.div className="relative max-w-4xl mx-auto w-full" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-5">
            <span style={{ width: '28px', height: '1px', background: GOLD }} />
            <p className="uppercase font-semibold text-xs" style={{ color: ICE, letterSpacing: '.22em' }}>
              Para directores de operaciones y responsables de compliance en Venezuela
            </p>
          </div>
          <h1 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.6vw, 3.3rem)', lineHeight: 1.15, maxWidth: '820px', textShadow: '0 2px 24px rgba(0,0,0,.35)' }}>
            ¿Su nivel de riesgo de seguridad es un número, o una impresión?
          </h1>
          <p className="mb-6" style={{ color: MUTED, fontSize: '1.12rem', maxWidth: '640px' }}>
            La mayoría de las organizaciones no lo sabe hasta que ocurre un incidente. Esta autoevaluación
            convierte una sensación vaga de inseguridad en un índice medible, bajo metodología FMEA e ISO 31000.
          </p>
          <p className="text-sm font-semibold mb-8 pl-4" style={{ borderLeft: `2px solid ${GOLD}`, color: GOLD }}>
            Cuatro pilares. Veinte preguntas. Un índice que su junta directiva puede tomar en serio.
          </p>
          <button onClick={scrollToForm}
            className="inline-flex items-center font-semibold px-9 py-4 text-base transition-all hover:-translate-y-0.5"
            style={{ background: GOLD, color: NAVY, borderRadius: '2px', boxShadow: `inset 0 0 0 1px rgba(10,22,40,.35)` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_H)}
            onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
          >
            Solicitar el diagnóstico gratuito <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <p className="text-xs mt-3 uppercase" style={{ color: MUTED, letterSpacing: '.08em' }}>
            17 años sin incidentes · Confidencial · Sin compromiso
          </p>
        </motion.div>
      </header>

      {/* ═══ 2. AUTORIDAD / CERTIFICACIONES ═══ */}
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
              <span className="font-semibold" style={{ color: WHITE }}>Metodología referenciada a:</span>{' '}
              <span style={{ color: ICE }}>ISO 31000:2018 · ASIS ORM.1:2017 · FMEA</span>
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
              Lo que no está medido, ponderado y documentado no se puede defender ante su directiva.
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

      {/* ═══ 4. LA SOLUCIÓN — línea de tiempo técnica ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.6 }} />
        <div className="max-w-5xl mx-auto relative">
          <SectionNumeral n="02" />
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3" style={{ color: ICE, letterSpacing: '.22em' }}>Lo que recibe</p>
            <h2 className="mb-14" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.7rem, 3.4vw, 2.4rem)', maxWidth: '760px' }}>
              Un diagnóstico con estructura auditable, no una checklist genérica.
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
              La misma metodología que exigimos en esta guía es la que aplicamos en nuestra propia operación.
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

      {/* ═══ 6. CTA + FORMULARIO ═══ */}
      <section className="relative px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #101f36 0%, ${NAVY} 70%)`, paddingTop: '96px', paddingBottom: '96px' }} id="diagnostico">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <SectionNumeral n="04" />
        <div className="relative max-w-lg mx-auto">
          <motion.div className="relative" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <CornerFrame className="p-9 sm:p-11">
              <div className="absolute inset-0 -z-10" style={{ background: SLATE, border: `1px solid ${BORDER}`, borderRadius: '2px' }} />
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase px-2 py-1" style={{ color: GOLD, border: `1px solid ${GOLD}66`, letterSpacing: '.12em', borderRadius: '2px', transform: 'rotate(2deg)' }}>
                Gratuito
              </span>
              <h2 className="text-center mb-2 mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                Solicitar el diagnóstico de vulnerabilidades
              </h2>
              <p className="text-center text-sm mb-7" style={{ color: MUTED }}>
                Autoevaluación FMEA / ISO 31000 en 4 pilares, con matriz de riesgo. Directo a su correo.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Nombre completo *</label>
                  <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Cargo (opcional)</label>
                  <input type="text" name="cargo" placeholder="Director de Operaciones" value={formData.cargo} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Empresa u organización *</label>
                  <input type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5" style={{ color: MUTED, letterSpacing: '.03em' }}>Email corporativo *</label>
                  <input type="email" name="correo" required value={formData.correo} onChange={handleChange}
                    className="w-full px-3.5 py-3 text-sm focus:outline-none"
                    style={{ background: NAVY, border: `1px solid ${BORDER}`, color: WHITE, borderRadius: '2px' }} />
                  {isFreeEmail && (
                    <p className="text-xs mt-1.5" style={{ color: ICE }}>Por la naturaleza confidencial del diagnóstico, le recomendamos usar su correo corporativo.</p>
                  )}
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
                    <>Solicitar diagnóstico <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
              <p className="text-xs text-center mt-4" style={{ color: MUTED }}>
                Sin costo, sin compromiso de contratación. Se lo enviamos a su correo en menos de 60 segundos.
              </p>
            </CornerFrame>
          </motion.div>
        </div>
      </section>

      {/* ═══ 7. TESTIMONIO ═══ */}
      <section className="relative px-6 py-20 overflow-hidden" style={{ background: SLATE, borderTop: `1px solid ${BORDER}` }}>
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG }} />
        <motion.div className="relative max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.6vw, 1.6rem)', lineHeight: 1.5 }}>
            <span style={{ color: GOLD, fontSize: '3rem', lineHeight: 0, verticalAlign: '-0.4rem' }}>&ldquo;</span>
            Por fin pude mostrarle a mi junta directiva un número, no una opinión. La matriz de riesgo bajo metodología ASIS cambió por completo la conversación con la directiva regional.
          </blockquote>
          <cite className="block mt-6 not-italic text-sm" style={{ color: ICE }}>
            — Directora de Riesgo y Compliance, grupo financiero en Caracas
            <span className="block text-xs mt-1" style={{ color: MUTED }}>(identidad reservada por protocolo de confidencialidad)</span>
          </cite>
        </motion.div>
      </section>

      {/* ═══ 8. FAQ ═══ */}
      <section className="relative px-6" style={{ paddingTop: '96px', paddingBottom: '96px' }}>
        <div className="max-w-3xl mx-auto relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="uppercase font-semibold text-xs mb-3 text-center" style={{ color: ICE, letterSpacing: '.22em' }}>Preguntas frecuentes</p>
            <h2 className="mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Antes de solicitar su diagnóstico
            </h2>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-semibold text-sm sm:text-base" style={{ color: WHITE }}>{f.q}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 transition-transform" style={{ color: GOLD, transform: openFaq === i ? 'rotate(180deg)' : 'none' }} />
                  </button>
                  {openFaq === i && (
                    <p className="text-sm pb-5" style={{ color: MUTED, maxWidth: '640px' }}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-9 px-6 text-center text-sm" style={{ background: SLATE, borderTop: `1px solid ${BORDER}`, color: MUTED }}>
        <img src="/logo.webp" alt="CSSG" className="h-12 w-12 object-contain mx-auto mb-3" />
        <div className="font-semibold mb-2" style={{ color: GOLD }}>CSSG GLOBAL</div>
        <p>Seguridad Corporativa y Diplomática · Más de 17 años sirviendo sin incidentes</p>
        <p className="mt-2 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3 h-3" /> Consultoría de riesgos · Auditoría de seguridad física · Metodología ISO 31000
        </p>
        <p className="mt-4 text-xs" style={{ color: `${MUTED}99` }}>
          <Award className="inline w-3 h-3 mr-1 -mt-0.5" /> CSSG — Company Of Security And Service Global C.A. · RIF: J-29782024-8
        </p>
        <p className="mt-4 text-xs" style={{ color: `${MUTED}99` }}>
          <a href="/politica-privacidad" className="hover:underline" style={{ color: ICE }}>Política de privacidad</a>
          <span className="mx-2">·</span>
          <a href="/terminos-condiciones" className="hover:underline" style={{ color: ICE }}>Términos y condiciones</a>
          <span className="mx-2">·</span>
          <a href="mailto:gerencia@globalservices-ven.com" className="hover:underline" style={{ color: ICE }}>gerencia@globalservices-ven.com</a>
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
