import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  ShieldCheck, Check, X as XIcon, Star, ChevronDown, FileText, Lock,
  Award, ArrowRight, BadgeCheck, ClipboardList, Download, Radar, ScanSearch,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

const GOLD = '#EAB308';
const BORDER = 'rgba(255,255,255,0.08)';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%230EA5E9' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E")`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

// ─────────────────────────────────────────────────────────────
// LP2 — CONSULTORÍA Y ANÁLISIS DE RIESGOS (ES)
// Keywords: consultoría de seguridad, evaluación de riesgos de seguridad,
// análisis de riesgos de seguridad, auditoría de seguridad física,
// diagnóstico de seguridad, gestión de riesgos.
// Lead magnet: "Cómo hacer una Evaluación de Riesgos de Seguridad —
// Checklist ISO 31000 + Matriz de Riesgos FMEA lista para usar"
// ─────────────────────────────────────────────────────────────

interface LeadFormProps {
  formId: string;
  status: 'idle' | 'loading' | 'error';
  errorMsg: string;
  formData: { nombre: string; correo: string; empresa: string; cargo: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function LeadForm({ formId, status, errorMsg, formData, onChange, onSubmit }: LeadFormProps) {
  return (
    <form id={formId} onSubmit={onSubmit} className="backdrop-blur-xl bg-white/[0.04] border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(14,165,233,0.15)]">
      <p className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
        <Download className="w-4 h-4" /> Acceso inmediato por email
      </p>
      <div className="space-y-4">
        <input
          type="text" name="nombre" required value={formData.nombre} onChange={onChange}
          placeholder="Tu nombre"
          className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
        />
        <input
          type="email" name="correo" required value={formData.correo} onChange={onChange}
          placeholder="Tu email de trabajo"
          className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
        />
        <input
          type="text" name="empresa" required value={formData.empresa} onChange={onChange}
          placeholder="Empresa u organización"
          className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
        />
        <input
          type="text" name="cargo" value={formData.cargo} onChange={onChange}
          placeholder="Cargo (opcional)"
          className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={status === 'loading'}
          className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#0B0B0F] hover:from-emerald-400 hover:to-emerald-300 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === 'loading' ? 'Enviando…' : <>Sí, quiero la guía gratis <ArrowRight className="w-5 h-5" /></>}
        </motion.button>
      </div>
      {status === 'error' && (
        <p className="mt-3 text-sm text-red-400">Ocurrió un error: {errorMsg}. Intenta de nuevo.</p>
      )}
      <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5">
        <Lock className="w-3.5 h-3.5" /> 100% libre de spam. Tus datos están seguros. Cancela cuando quieras.
      </p>
    </form>
  );
}

function GuideMockup() {
  return (
    <div className="relative mx-auto w-64 sm:w-72" aria-hidden="true">
      <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl bg-sky-900/40 blur-sm" />
      <div className="relative rounded-xl border border-white/10 bg-gradient-to-br from-[#101018] to-[#0B0B0F] p-6 shadow-2xl">
        <Radar className="w-9 h-9 mb-4" style={{ color: GOLD }} />
        <p className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-bold mb-2">Guía CSSG · Edición 2026</p>
        <h3 className="text-white font-black text-lg leading-snug mb-3">
          Evaluación de Riesgos de Seguridad
        </h3>
        <p className="text-gray-500 text-xs mb-4">Checklist ISO 31000 + matriz de riesgos FMEA lista para usar en su empresa.</p>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded border border-emerald-500/50 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <div className="h-1.5 rounded bg-white/10" style={{ width: `${85 - i * 12}%` }} />
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] text-gray-600">ISO 31000:2018 · ASIS ORM.1:2017</span>
          <FileText className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      <div className="absolute -top-3 -right-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide bg-emerald-500 text-[#0B0B0F]">
        PDF Gratis
      </div>
    </div>
  );
}

function SectionNumeral({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="hidden md:block select-none absolute -top-6 right-0 z-0" style={{
      fontFamily: "'Playfair Display', serif", fontSize: '6rem', lineHeight: 1, fontWeight: 600,
      color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)',
    }}>{n}</span>
  );
}

const PAINS = [
  'Toma decisiones de seguridad "a ojo", sin un índice de riesgo que pueda defender ante su junta directiva.',
  'No sabe si sus recursos de seguridad están donde realmente importa, o repartidos por igual sin criterio.',
  'Un evaluador externo le entrega un informe genérico, sin metodología citable ni cifras comparables.',
  'Su directiva o casa matriz le exige evidencia bajo ISO 31000 o ASIS ORM.1, y no tiene cómo mostrarla.',
  'Sabe que necesita una auditoría de seguridad física, pero no sabe qué debe cubrir realmente un site survey serio.',
];

const DELIVERABLES = [
  { icon: ScanSearch, range: 'Bloque 1', text: 'Cómo mapear sus activos críticos y vectores de amenaza en los 4 pilares: Perímetro Físico, Control de Accesos, Procedimientos Operativos e Inteligencia.' },
  { icon: ClipboardList, range: 'Bloque 2', text: 'La fórmula FMEA exacta — (Probabilidad × 0.4) + (Impacto × 0.6) — para convertir observaciones en un Índice de Riesgo numérico y comparable.' },
  { icon: Radar, range: 'Bloque 3', text: 'Checklist de auditoría de seguridad física (CPTED): perímetro, iluminación, control de accesos y flujo de personas, listo para aplicar en sitio.' },
  { icon: Award, range: 'BONUS', text: 'Plantilla de matriz de riesgos en formato editable, con las columnas y ponderaciones ya configuradas — solo debe llenarla con sus datos.' },
];

const TESTIMONIALS = [
  {
    headline: 'Por fin pude mostrarle a mi junta directiva un número, no una opinión',
    body: 'Usamos la matriz para cuantificar el riesgo de nuestras 3 sedes. La presentación con el Índice de Riesgo bajo metodología ASIS cambió por completo la conversación con la directiva regional.',
    author: 'Gerente de Seguridad Corporativa',
    org: 'Multinacional industrial, Valencia',
  },
  {
    headline: 'El checklist de auditoría física detectó lo que 2 consultores anteriores no vieron',
    body: 'Aplicamos el bloque 3 en nuestra sede principal y encontramos puntos ciegos en control de accesos que llevaban años sin corregirse. La inversión en corregirlos fue mínima frente al riesgo real.',
    author: 'Director de Operaciones',
    org: 'Torre corporativa, Caracas',
  },
  {
    headline: 'La plantilla de matriz nos ahorró semanas de trabajo con nuestro equipo de compliance',
    body: 'Ya teníamos la intención de auditar, pero no el formato. La matriz FMEA lista para usar nos permitió estandarizar la evaluación de riesgos en las 4 sedes que administramos, con el mismo criterio en todas.',
    author: 'Directora de Riesgo y Compliance',
    org: 'Grupo financiero, Caracas',
  },
];

const FAQS = [
  {
    q: '¿Es realmente gratis o tiene algún costo oculto?',
    a: 'Es 100% gratis. No hay tarjeta de crédito ni periodo de prueba. Solo pedimos su email para enviarle la guía y, si lo desea, contenido de inteligencia de seguridad corporativa.',
  },
  {
    q: '¿Qué diferencia esta guía de un análisis de riesgos de seguridad genérico?',
    a: 'Está construida sobre la misma metodología FMEA que usamos en nuestras auditorías privadas — referenciada contra ISO 31000:2018 y ASIS ORM.1:2017 — no es una checklist de sentido común, es el sistema de gestión de riesgos exacto que aplicamos con clientes corporativos.',
  },
  {
    q: '¿Esto reemplaza una consultoría de seguridad completa?',
    a: 'No, la complementa. La guía le permite hacer un primer diagnóstico de seguridad serio con su propio equipo. Cuando necesite implementación, verificación en sitio o un informe con validez ante su directiva, ahí es donde entra una consultoría de seguridad con un especialista de CSSG.',
  },
  {
    q: '¿Necesito ser experto en seguridad para aplicarla?',
    a: 'No. Está escrita para directores de operaciones, gerentes administrativos y responsables de compliance que necesitan evaluar riesgo sin ser especialistas en seguridad física.',
  },
  {
    q: '¿Sirve para más de una sede o instalación?',
    a: 'Sí. La matriz de riesgos está diseñada para replicarse por sede, lo que le permite comparar el Índice de Riesgo entre instalaciones con el mismo criterio y priorizar inversión donde realmente se necesita.',
  },
  {
    q: '¿Puedo usarla junto con la herramienta de análisis de riesgo online de CSSG?',
    a: 'Sí, se complementan. La guía le enseña la metodología a fondo para aplicarla usted mismo o con su equipo; la herramienta online en cssg-global.com/analisis-riesgo genera un índice preliminar automatizado en minutos.',
  },
  {
    q: '¿Qué pasa con mis datos?',
    a: 'No compartimos su información con terceros. Sus datos se almacenan de forma segura y puede solicitar su eliminación cuando quiera escribiendo a gerencia@globalservices-ven.com.',
  },
];

export default function ConsultoriaRiesgos() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [formData, setFormData] = useState({ nombre: '', correo: '', empresa: '', cargo: '' });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `[LP CONSULTORÍA Y ANÁLISIS DE RIESGOS] Solicitó: Guía Evaluación de Riesgos de Seguridad ISO 31000 + matriz FMEA${formData.cargo ? ` | Cargo: ${formData.cargo}` : ''}`,
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
              mensaje: '[SOLICITUD REPETIDA] Guía Evaluación de Riesgos ISO 31000',
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
    document.getElementById('form-hero')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700;900&display=swap');
      `}</style>

      {/* ── MINI NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5" style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-8 w-8 object-contain" />
          <span className="font-black tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0B0B0F] transition-colors">
          Descargar guía <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ── SECCIÓN 1: HERO FOTOGRÁFICO + FORMULARIO ── */}
      <section className="relative pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/svc_auditoria.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 25%', filter: 'saturate(0.85)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,0.88) 0%, rgba(11,11,15,0.94) 45%, #0B0B0F 92%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px] opacity-50" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-10">
            <span className="inline-block rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">
              100% Gratis · Descarga inmediata
            </span>
            <h1 className="tracking-tight leading-[1.1] max-w-4xl mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.6vw, 3.4rem)', fontWeight: 700, textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
              La guía para hacer una <span className="text-sky-400">evaluación de riesgos de seguridad</span> que
              su junta directiva pueda <span className="text-sky-400">tomar en serio</span>
            </h1>
            <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Checklist ISO 31000 + matriz de riesgos FMEA lista para usar. Para directores de operaciones,
              gerentes de seguridad y responsables de compliance que necesitan un diagnóstico de seguridad
              defendible — no una opinión, ni una consultoría de seguridad genérica.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <GuideMockup />
              <div className="mt-8 space-y-3 max-w-md mx-auto">
                <p className="text-sm font-bold text-gray-300">Dentro de esta guía vas a descubrir:</p>
                {[
                  'Los 4 pilares de riesgo que evaluamos en cada auditoría: Perímetro, Accesos, Procedimientos e Inteligencia.',
                  'La fórmula FMEA exacta para convertir observaciones en un Índice de Riesgo numérico y comparable.',
                  'El checklist de auditoría física (CPTED) que aplicamos en sitio antes de cualquier recomendación.',
                  'BONUS: matriz de riesgos editable, lista para llenar con los datos de su organización.',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-400">{b}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <LeadForm
                formId="form-hero" status={status} errorMsg={errorMsg}
                formData={formData} onChange={handleChange} onSubmit={handleSubmit}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: BARRA DE PRUEBA SOCIAL ── */}
      <section className="relative z-10 border-y border-white/5 bg-white/[0.02] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-sky-400" />
            <span className="text-sm text-gray-300 font-bold">ISO 9001:2015 certificados</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" style={{ color: GOLD }} />
            <span className="text-sm text-gray-300 font-bold">+17 años sin un solo incidente</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-gray-300 font-bold">Metodología ISO 31000 · ASIS ORM.1</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            <span className="text-sm text-gray-400 ml-1">4.9/5 entre lectores corporativos</span>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: PAIN AGITATION ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <SectionNumeral n="01" />
            <h2 className="relative text-2xl sm:text-4xl font-black tracking-tight text-center mb-10">
              ¿Te suena familiar alguna de estas situaciones?
            </h2>
            <div className="space-y-4">
              {PAINS.map((p, i) => (
                <div key={i} className="flex items-start gap-3 backdrop-blur-xl bg-white/5 border border-white/5 rounded-xl p-4">
                  <XIcon className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <p className="text-gray-300 text-sm sm:text-base">{p}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-gray-400">
              Si te identificaste con al menos una, esta guía fue creada exactamente para ti.
              Y lo mejor: <span className="text-white font-bold">es 100% gratis.</span>
            </p>
            <div className="mt-6 text-center">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors">
                Quiero descargar la guía ahora <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 4: QUÉ VAS A RECIBIR ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <SectionNumeral n="02" />
            <h2 className="relative text-2xl sm:text-4xl font-black tracking-tight text-center mb-3">
              Esto es exactamente lo que vas a recibir
            </h2>
            <p className="text-center text-gray-400 mb-12">
              La guía «Evaluación de Riesgos de Seguridad», en PDF, directo a tu email.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {DELIVERABLES.map((d, i) => (
                <div key={i} className="relative backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-sky-500/30 transition-colors overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: i === 3 ? GOLD : '#0EA5E9' }} />
                  <d.icon className="w-7 h-7 text-sky-400 mb-3" />
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: i === 3 ? GOLD : undefined }}>
                    {d.range}
                  </p>
                  <p className="text-sm text-gray-300">{d.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-gray-500 text-sm line-through">Valor real de este recurso: $247</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">Tu precio hoy: $0</p>
              <p className="text-xs text-gray-500 mt-1">Es la misma metodología que usamos en auditorías privadas con clientes corporativos.</p>
              <button onClick={scrollToForm} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 font-black text-[#0B0B0F] transition-colors">
                Descargar gratis ahora <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 5: AUTORIDAD ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <SectionNumeral n="03" />
            <h2 className="relative text-2xl sm:text-4xl font-black tracking-tight text-center mb-10">
              ¿Quién está detrás de esta metodología?
            </h2>
            <div className="backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-7 h-7 text-sky-400" />
                </div>
                <div>
                  <p className="font-black text-lg">CSSG — Company Of Security And Service Global C.A.</p>
                  <p className="text-sm text-gray-500">Empresa de seguridad corporativa y diplomática · Caracas · RIF J-29782024-8</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-6">
                Durante más de 17 años hemos evaluado y diseñado esquemas de seguridad para corporaciones,
                torres empresariales y misiones diplomáticas bajo estándar G7 — sin registrar un solo
                incidente de seguridad. Esta guía condensa la metodología FMEA que aplicamos en nuestras
                propias auditorías, referenciada contra ISO 31000:2018 y ASIS ORM.1:2017.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  '+17 años de operación continua sin incidentes registrados.',
                  'Certificación ISO 9001:2015 en gestión de calidad de seguridad.',
                  'Proveedor de misiones diplomáticas y corporaciones de alto valor.',
                  'Herramienta propia de análisis de riesgo con metodología FMEA en línea.',
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-400">{c}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 6: TESTIMONIOS ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-center mb-3">
              Lo que dicen quienes ya la aplicaron
            </h2>
            <p className="text-center text-gray-500 text-sm mb-12 max-w-xl mx-auto">
              Por política de confidencialidad de seguridad, nuestros clientes y lectores se citan
              por cargo y tipo de instalación, nunca por nombre. Esa discreción también le protegerá a usted.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((tst, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="font-black text-sm mb-3">"{tst.headline}"</p>
                  <p className="text-xs text-gray-400 flex-1">{tst.body}</p>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs font-bold text-gray-300">{tst.author}</p>
                    <p className="text-[11px] text-gray-500">{tst.org}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors">
                Quiero los mismos resultados <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 7: CÓMO FUNCIONA ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-center mb-12">
              Recíbela en tu email en menos de 60 segundos
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { n: '01', t: 'Déjanos tus datos', d: 'Completa el formulario con el email donde realmente lees tus mensajes de trabajo.' },
                { n: '02', t: 'Revisa tu bandeja', d: 'Recibirás un correo de CSSG con el acceso a la guía. Si no aparece, revisa spam o promociones.' },
                { n: '03', t: 'Aplica la metodología', d: 'Usa el checklist y la matriz para evaluar su primera sede o auditar la existente.' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl font-black text-sky-500/20 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
                  <p className="font-black mb-2">{s.t}</p>
                  <p className="text-sm text-gray-400">{s.d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 8: FAQ ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-center mb-10">
              Preguntas frecuentes
            </h2>
            <div className="space-y-3">
              {FAQS.map((f, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-bold text-sm sm:text-base">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-sky-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-gray-400">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 9: CTA FINAL ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <ShieldCheck className="w-8 h-8 mx-auto mb-4" style={{ color: GOLD }} />
            <h2 className="tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)' }}>
              Su próximo informe de riesgo empieza con este email
            </h2>
            <p className="text-gray-400 mb-8">
              Cada mes que gestiona seguridad sin un índice de riesgo cuantificado es una decisión
              que no puede defender ante su directiva. Aplicar esta guía le toma menos de una tarde.
            </p>
            <div className="space-y-2.5 text-left max-w-sm mx-auto mb-8">
              {[
                'Checklist ISO 31000 para evaluación de riesgos de seguridad',
                'Matriz de riesgos FMEA editable (bonus)',
                'Metodología usada en auditorías corporativas reales',
                '100% gratis, sin tarjeta de crédito',
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-300">{b}</p>
                </div>
              ))}
            </div>
            <LeadForm
              formId="form-final" status={status} errorMsg={errorMsg}
              formData={formData} onChange={handleChange} onSubmit={handleSubmit}
            />
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 10: FOOTER MINIMALISTA ── */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4 text-center">
        <p className="text-xs text-gray-600">
          © {year} Company Of Security And Service Global C.A. · RIF J-29782024-8 · ISO 9001:2015
        </p>
        <p className="text-xs text-gray-600 mt-2">
          <a href="/politica-privacidad" className="hover:text-gray-400 transition-colors">Política de privacidad</a>
          <span className="mx-2">·</span>
          <a href="/terminos-condiciones" className="hover:text-gray-400 transition-colors">Términos y condiciones</a>
          <span className="mx-2">·</span>
          <a href="mailto:gerencia@globalservices-ven.com" className="hover:text-gray-400 transition-colors">gerencia@globalservices-ven.com</a>
        </p>
      </footer>

      <CookieConsent />
    </div>
  );
}
