import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Shield, Check, X as XIcon, Star, ChevronDown, FileText, Lock,
  Award, ArrowRight, BadgeCheck, ClipboardCheck, Download,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';

const GOLD = '#EAB308';
const BORDER = 'rgba(255,255,255,0.08)';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%230EA5E9' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E")`;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

// ─────────────────────────────────────────────────────────────
// LP1 — EMPRESA DE SEGURIDAD (ES)
// Keywords: empresas de seguridad, empresa de seguridad, guardias de
// seguridad, seguridad privada para empresas, contratar guardias de
// seguridad, contratación de seguridad privada, servicio de vigilancia
// para empresas.
// Lead magnet: "Guía: Cómo contratar seguridad privada sin sobrecostos
// — Checklist de 21 puntos"
// ─────────────────────────────────────────────────────────────

interface LeadFormProps {
  formId: string;
  status: 'idle' | 'loading' | 'error';
  errorMsg: string;
  formData: { nombre: string; correo: string; empresa: string };
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
        <Shield className="w-9 h-9 mb-4" style={{ color: GOLD }} />
        <p className="text-[10px] uppercase tracking-[0.25em] text-sky-400 font-bold mb-2">Guía CSSG · Edición 2026</p>
        <h3 className="text-white font-black text-lg leading-snug mb-3">
          Cómo contratar seguridad privada sin sobrecostos
        </h3>
        <p className="text-gray-500 text-xs mb-4">Checklist de 21 puntos para evaluar cualquier empresa de seguridad antes de firmar.</p>
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
          <span className="text-[9px] text-gray-600">ISO 9001:2015 · RIF J-29782024-8</span>
          <FileText className="w-4 h-4 text-gray-600" />
        </div>
      </div>
      <div className="absolute -top-3 -right-3 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide bg-emerald-500 text-[#0B0B0F]">
        PDF Gratis
      </div>
    </div>
  );
}

/** Numeral fantasma de sección — acento editorial premium */
function SectionNumeral({ n }: { n: string }) {
  return (
    <span aria-hidden="true" className="hidden md:block select-none absolute -top-6 right-0 z-0" style={{
      fontFamily: "'Playfair Display', serif", fontSize: '6rem', lineHeight: 1, fontWeight: 600,
      color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)',
    }}>{n}</span>
  );
}

const PAINS = [
  'Pagas facturas de vigilancia con cargos que nadie te explica y que crecen cada mes.',
  'Los guardias de seguridad llegan tarde, rotan sin aviso y cada semana ves una cara nueva.',
  'El supervisor del proveedor no responde cuando hay un incidente — y la responsabilidad cae sobre ti.',
  'Firmaste un contrato de seguridad privada sin saber qué exigir, y ahora estás atado a un servicio mediocre.',
  'Sabes que necesitas un servicio de vigilancia serio para tu empresa, pero todas las cotizaciones parecen iguales.',
];

const DELIVERABLES = [
  { icon: ClipboardCheck, range: 'Puntos 1–7', text: 'Cómo verificar la legalidad y solvencia real de una empresa de seguridad (permisos, RIF, pólizas y pasivos laborales ocultos que terminas pagando tú).' },
  { icon: FileText, range: 'Puntos 8–14', text: 'Las 7 cláusulas que un contrato de vigilancia serio debe incluir — y las 3 trampas de facturación más comunes en Venezuela.' },
  { icon: Shield, range: 'Puntos 15–21', text: 'Cómo auditar la operación: perfiles y rotación de los guardias, protocolos documentados, supervisión verificable y KPIs mensuales exigibles.' },
  { icon: Award, range: 'BONUS', text: 'Plantilla comparativa de cotizaciones lista para usar: evalúa hasta 4 proveedores lado a lado con criterios objetivos.' },
];

const TESTIMONIALS = [
  {
    headline: 'Redujimos la factura 32% y por primera vez sé qué estoy pagando',
    body: 'Usé el checklist para renegociar con nuestro proveedor. Descubrimos cargos duplicados de supervisión que veníamos pagando hacía dos años. Al final migramos el servicio completo a un esquema optimizado.',
    author: 'Gerente de Administración',
    org: 'Centro comercial, Caracas',
  },
  {
    headline: 'Detecté en la primera reunión qué proveedor me estaba mintiendo',
    body: 'Con los puntos 1 al 7 pedí documentos que ningún proveedor esperaba que pidiera. Dos no pudieron mostrarlos. El que sí pudo es el que contratamos, y llevamos 14 meses sin un solo incidente.',
    author: 'Director de Operaciones',
    org: 'Empresa industrial, Valencia',
  },
  {
    headline: 'El bono de la plantilla comparativa me ahorró semanas de análisis',
    body: 'Tenía 4 cotizaciones de empresas de seguridad imposibles de comparar entre sí. La plantilla las puso en una sola tabla con criterios objetivos. La decisión que antes tomaba por precio, ahora la tomo por riesgo.',
    author: 'Administradora',
    org: 'Torre corporativa, Caracas',
  },
];

const FAQS = [
  {
    q: '¿Es realmente gratis o tiene algún costo oculto?',
    a: 'Es 100% gratis. No hay tarjeta de crédito ni periodo de prueba. Solo pedimos tu email para enviarte la guía y, si lo deseas, contenido de inteligencia de seguridad corporativa.',
  },
  {
    q: '¿Por qué una empresa de seguridad regala esta información?',
    a: 'Porque un cliente informado es nuestro mejor cliente. Queremos que conozcas nuestro estándar de operación antes de plantearte trabajar con nosotros. Si la guía te ayuda a exigir más, cualquier comparación nos favorece.',
  },
  {
    q: '¿Me van a llenar el correo de spam?',
    a: 'No. Recibirás la guía y una breve serie de correos con criterios técnicos de contratación. Puedes darte de baja en cualquier momento con un clic.',
  },
  {
    q: '¿Aplica si administro un condominio, comercio o una industria?',
    a: 'Sí. El checklist está diseñado para cualquier organización que contrate guardias de seguridad o servicios de vigilancia: torres corporativas, centros comerciales, industrias, clínicas y condominios.',
  },
  {
    q: '¿Sirve aunque ya tenga un proveedor de seguridad contratado?',
    a: 'Especialmente en ese caso. La mayoría de nuestros lectores la usa primero para auditar a su proveedor actual y renegociar condiciones. Los puntos 15 al 21 son una auditoría exprés de la operación existente.',
  },
  {
    q: '¿Qué pasa con mis datos?',
    a: 'No compartimos tu información con terceros. Tus datos se almacenan de forma segura y puedes solicitar su eliminación cuando quieras escribiendo a operaciones@cssg-global.com.',
  },
];

export default function EmpresaSeguridad() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [formData, setFormData] = useState({ nombre: '', correo: '', empresa: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Empresa de Seguridad Privada para Empresas | Guía Gratuita de Contratación | CSSG';
    const desc = 'Descarga gratis el checklist de 21 puntos para contratar guardias de seguridad y servicios de vigilancia para empresas sin sobrecostos. Por CSSG, ISO 9001:2015.';
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
        mensaje: '[LP EMPRESA DE SEGURIDAD] Solicitó: Guía Cómo contratar seguridad privada sin sobrecostos (checklist 21 puntos)',
        fuente: 'lp_empresa_seguridad',
        score: 40,
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
              fuente: 'lp_empresa_seguridad',
              mensaje: '[SOLICITUD REPETIDA] Guía checklist 21 puntos',
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/empresa-de-seguridad/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true } });
          return;
        }
        throw new Error(insertError.message || JSON.stringify(insertError));
      }

      try {
        const emailRes = await sendLeadNotification({
          nombre: formData.nombre,
          email: formData.correo,
          empresa: formData.empresa,
          fuente: 'lp_empresa_seguridad',
        });
        if (!emailRes.success) console.warn('Email Notification Warning:', emailRes.error);
      } catch (emailErr) {
        console.warn('Email Send Exception (Non-blocking):', emailErr);
      }

      try {
        if (newLead) {
          await startSequence(newLead.id, formData.correo, formData.nombre, 'empresa_seguridad', formData.empresa);
        }
      } catch (seqErr) {
        console.warn('Sequence Start Exception (Non-blocking):', seqErr);
      }

      navigate('/empresa-de-seguridad/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de conexión o de base de datos.';
      console.error('Error submitting LP Empresa Seguridad form:', err);
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
          backgroundImage: "url('/ana-hero-premium.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 20%', filter: 'saturate(0.85)',
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
              Descarga gratis el checklist de <span className="text-sky-400">21 puntos</span> para contratar
              guardias de seguridad <span className="text-sky-400">sin sobrecostos</span> ni sorpresas en la factura
            </h1>
            <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Ideal para administradores, gerentes de operaciones y directores que necesitan contratar
              seguridad privada para su empresa — o auditar a su proveedor actual — sin ser expertos en el sector.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <GuideMockup />
              <div className="mt-8 space-y-3 max-w-md mx-auto">
                <p className="text-sm font-bold text-gray-300">Dentro de esta guía vas a descubrir:</p>
                {[
                  'Los 21 criterios exactos para evaluar cualquier empresa de seguridad antes de firmar.',
                  'Las 3 trampas de facturación más comunes en contratos de vigilancia (y cómo bloquearlas).',
                  'Cómo detectar pasivos laborales ocultos del proveedor que terminas pagando tú.',
                  'BONUS: plantilla comparativa para evaluar hasta 4 cotizaciones lado a lado.',
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-400">{b}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} id="form-hero-wrap">
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
            <Shield className="w-5 h-5" style={{ color: GOLD }} />
            <span className="text-sm text-gray-300 font-bold">+17 años sin un solo incidente</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="text-sm text-gray-300 font-bold">Estándar diplomático G7</span>
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
              Si te identificaste con al menos una, este checklist fue creado exactamente para ti.
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
              La guía «Cómo contratar seguridad privada sin sobrecostos», directo a tu email.
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
              <p className="text-gray-500 text-sm line-through">Valor real de este recurso: $197</p>
              <p className="text-2xl font-black text-emerald-400 mt-1">Tu precio hoy: $0</p>
              <p className="text-xs text-gray-500 mt-1">Es el mismo material que usamos en auditorías privadas con clientes corporativos.</p>
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
              ¿Quién está detrás de esta guía?
            </h2>
            <div className="backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-7 h-7 text-sky-400" />
                </div>
                <div>
                  <p className="font-black text-lg">CSSG — Company Of Security And Service Global C.A.</p>
                  <p className="text-sm text-gray-500">Empresa de seguridad corporativa y diplomática · Caracas · RIF J-29782024-8</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm sm:text-base mb-6">
                Durante más de 17 años hemos operado esquemas de vigilancia y seguridad privada para
                corporaciones, torres empresariales y misiones diplomáticas bajo estándar G7 —
                sin registrar un solo incidente de seguridad. Este checklist condensa los criterios
                que aplicamos en nuestras propias auditorías de contratación.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  '+17 años de operación continua sin incidentes registrados.',
                  'Certificación ISO 9001:2015 en gestión de calidad de seguridad.',
                  'Proveedor de misiones diplomáticas y corporaciones de alto valor.',
                  'El personal mejor remunerado del sector: rotación cercana a cero.',
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
              por cargo y tipo de instalación, nunca por nombre. Esa discreción también te protegerá a ti.
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
                { n: '03', t: 'Aplica el checklist', d: 'Usa la guía hoy mismo para auditar a tu proveedor o evaluar nuevas cotizaciones.' },
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
            <Shield className="w-8 h-8 mx-auto mb-4" style={{ color: GOLD }} />
            <h2 className="tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3.4vw, 2.4rem)' }}>
              Tu próximo contrato de seguridad empieza con este email
            </h2>
            <p className="text-gray-400 mb-8">
              Cada mes que pagas un servicio de vigilancia sin auditarlo es dinero que no recuperas.
              El checklist te toma 20 minutos aplicarlo.
            </p>
            <div className="space-y-2.5 text-left max-w-sm mx-auto mb-8">
              {[
                'Checklist de 21 puntos para contratar sin sobrecostos',
                'Plantilla comparativa de cotizaciones (bonus)',
                'Criterios usados en auditorías corporativas reales',
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
          <a href="mailto:operaciones@cssg-global.com" className="hover:text-gray-400 transition-colors">operaciones@cssg-global.com</a>
        </p>
      </footer>
    </div>
  );
}
