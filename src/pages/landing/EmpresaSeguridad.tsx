import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Shield, X as XIcon, ChevronDown, FileText, Lock,
  Award, ArrowRight, BadgeCheck, ClipboardCheck, Loader2, Clock,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { sendLeadNotification } from '../../lib/email';
import { startSequence } from '../../lib/sequences';
import CookieConsent from '../../components/CookieConsent';

const GOLD = '#EAB308';
const BORDER = 'rgba(255,255,255,0.08)';
const CALENDAR_URL = 'https://calendar.app.google/ZCLbjCCsbmYwMnEc6';

const GRID_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M64 0H0V64' fill='none' stroke='%230EA5E9' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E")`;

const FREE_EMAIL_DOMAINS = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'live.com', 'icloud.com'];

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
// Service-presentation page, no downloadable lead magnet — captures
// the lead directly into a consultative flow with a direct
// calendar-booking option, same pattern as CorporateSecurity.tsx /
// DiplomaticSecurity.tsx.
// Primary persona: Ricardo ("El Guardián" — administrador/gerente de
// operaciones que necesita contratar o auditar seguridad privada).
// ─────────────────────────────────────────────────────────────

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
  'Sabes que necesitas un servicio de vigilancia para empresas serio, pero todas las cotizaciones parecen iguales.',
];

const DELIVERABLES = [
  { icon: ClipboardCheck, range: 'Puntos 1–7', text: 'Verificamos la legalidad y solvencia real de su empresa de seguridad actual o candidata (permisos, RIF, pólizas y pasivos laborales ocultos que termina pagando usted).' },
  { icon: FileText, range: 'Puntos 8–14', text: 'Revisamos las 7 cláusulas que un contrato de vigilancia serio debe incluir — y detectamos las 3 trampas de facturación más comunes en Venezuela.' },
  { icon: Shield, range: 'Puntos 15–21', text: 'Auditamos la operación en sitio: perfiles y rotación de los guardias, protocolos documentados, supervisión verificable y KPIs mensuales exigibles.' },
  { icon: Award, range: 'BONUS', text: 'Plantilla comparativa de cotizaciones: la aplicamos junto a usted en la primera sesión para evaluar hasta 4 proveedores lado a lado, con criterios objetivos.' },
];

const TESTIMONIALS = [
  {
    headline: 'Redujimos la factura 32% después de la auditoría de CSSG',
    body: 'El consultor identificó cargos duplicados de supervisión que veníamos pagando hacía dos años, directamente en la revisión de nuestro contrato. Migramos el servicio completo a un esquema optimizado.',
    author: 'Gerente de Administración',
    org: 'Centro comercial, Caracas',
  },
  {
    headline: 'En la primera reunión supimos qué proveedor nos estaba mintiendo',
    body: 'El equipo de CSSG pidió documentos que ningún otro proveedor esperaba que pidiéramos. Dos no pudieron mostrarlos. Contratamos al que sí pudo, y llevamos 14 meses sin un solo incidente.',
    author: 'Director de Operaciones',
    org: 'Empresa industrial, Valencia',
  },
  {
    headline: 'La comparación de propuestas que hicieron con nosotros nos ahorró semanas',
    body: 'Teníamos 4 cotizaciones de empresas de seguridad imposibles de comparar entre sí. En la sesión con CSSG las pusimos en una sola tabla con criterios objetivos. La decisión que antes tomábamos por precio, ahora la tomamos por riesgo.',
    author: 'Administradora',
    org: 'Torre corporativa, Caracas',
  },
];

const FAQS = [
  {
    q: '¿La evaluación inicial implica algún compromiso de contratación?',
    a: 'No. Un consultor senior revisa su esquema actual o su necesidad bajo protocolo de confidencialidad, sin obligación de contratar servicios adicionales.',
  },
  {
    q: '¿Qué diferencia esta auditoría de una cotización genérica?',
    a: 'Aplicamos los mismos 21 criterios que usamos en nuestras auditorías privadas — legalidad y solvencia del proveedor, cláusulas contractuales defendibles y verificación operativa en sitio — no una revisión superficial ni una checklist de sentido común.',
  },
  {
    q: '¿Pueden auditar a mi proveedor actual en vez de proponer uno nuevo?',
    a: 'Sí, es el caso más común. La mayoría de nuestros clientes empieza justo ahí: auditamos su operación actual antes de plantear cualquier cambio de proveedor.',
  },
  {
    q: '¿Aplica si administro un condominio, comercio o una industria?',
    a: 'Sí. Trabajamos con cualquier organización que contrate guardias de seguridad o servicios de vigilancia: torres corporativas, centros comerciales, industrias, clínicas y condominios.',
  },
  {
    q: '¿CSSG puede participar en nuestro proceso de licitación?',
    a: 'Sí. Participamos regularmente en licitaciones corporativas. Seleccione "¿Nos invita a una licitación?" en el formulario y compártanos su fecha límite — le enviamos la documentación requerida, incluyendo certificación ISO 9001:2015 y autorización DIGESERVISP.',
  },
  {
    q: '¿Qué pasa con mis datos?',
    a: 'No compartimos su información con terceros. Sus datos se almacenan de forma segura y puede solicitar su eliminación cuando quiera escribiendo a gerencia@globalservices-ven.com.',
  },
];

interface FormData {
  nombre: string;
  cargo: string;
  empresa: string;
  correo: string;
  motivo: string;
}

export default function EmpresaSeguridad() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const [formData, setFormData] = useState<FormData>({ nombre: '', cargo: '', empresa: '', correo: '', motivo: 'auditoria' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = 'Empresa de Seguridad Privada para Empresas | Auditoría de Contratación | CSSG';
    const desc = 'Solicite una auditoría de su esquema de seguridad privada o de su proveedor actual de guardias de seguridad. 21 criterios de contratación aplicados por un consultor senior de CSSG, ISO 9001:2015.';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFreeEmail = (() => {
    const domain = formData.correo.split('@')[1]?.toLowerCase();
    return !!domain && FREE_EMAIL_DOMAINS.includes(domain);
  })();

  const purposeLabel = formData.motivo === 'licitacion'
    ? 'Invitación a proceso de licitación'
    : 'Auditoría de esquema de seguridad actual';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const { data: newLead, error: insertError } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `[LP EMPRESA DE SEGURIDAD] Solicitó: ${purposeLabel}${formData.cargo ? ` | Cargo: ${formData.cargo}` : ''}`,
        fuente: 'lp_empresa_seguridad',
        score: formData.motivo === 'licitacion' ? 55 : 45,
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
              cargo: formData.cargo,
              mensaje: `[SOLICITUD REPETIDA] ${purposeLabel}`,
            });
          } catch (emailErr) {
            console.warn('Email Send Exception on duplicate (Non-blocking):', emailErr);
          }
          navigate('/empresa-de-seguridad/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: true, motivo: formData.motivo } });
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
          cargo: formData.cargo,
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

      navigate('/empresa-de-seguridad/gracias', { state: { nombre: formData.nombre, correo: formData.correo, duplicate: false, motivo: formData.motivo } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de conexión o de base de datos.';
      console.error('Error submitting LP Empresa Seguridad form:', err);
      setErrorMsg(message);
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600;700;900&display=swap" media="print" onLoad={(e) => { e.currentTarget.media = 'all'; }} />

      {/* ── MINI NAV ── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-3.5" style={{ background: 'rgba(11,11,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex items-center gap-2.5">
          <img src="/logo.webp" alt="CSSG" className="h-8 w-8 object-contain" />
          <span className="font-black tracking-widest text-sm text-white">
            CSSG <span style={{ color: GOLD }}>GLOBAL</span>
          </span>
        </div>
        <button onClick={scrollToForm} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[#0B0B0F] transition-colors">
          Solicitar auditoría <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* ── SECCIÓN 1: HERO FOTOGRÁFICO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/ana-hero-premium.webp')",
          backgroundSize: 'cover', backgroundPosition: 'center 20%', filter: 'saturate(0.85)',
        }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(100deg, rgba(11,11,15,.95) 0%, rgba(11,11,15,.9) 45%, rgba(11,11,15,.5) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,11,15,.5) 0%, transparent 35%, rgba(11,11,15,.94) 100%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.5 }} />

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-4 h-4" style={{ color: GOLD }} />
            <p className="uppercase font-black text-xs" style={{ color: GOLD, letterSpacing: '.2em' }}>
              ISO 9001:2015 · Uno de los pocos operadores certificados en Venezuela
            </p>
          </div>
          <h1 className="tracking-tight leading-[1.15] max-w-2xl" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4.6vw, 3.4rem)', fontWeight: 700, textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}>
            La mayoría de las empresas de seguridad le venden un guardia.
            <br /><span className="text-sky-400">CSSG le entrega un esquema que puede auditar.</span>
          </h1>
          <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-xl">
            Evaluamos su esquema actual de seguridad privada — o diseñamos uno nuevo — con criterios que
            puede defender ante su junta o su casa matriz. Sin sobrecostos ocultos, sin rotación de
            personal cada mes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-8 py-4 font-black text-base text-[#0B0B0F] transition-all hover:-translate-y-0.5">
              Solicitar auditoría de mi esquema <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={scrollToForm} className="text-xs uppercase tracking-widest text-gray-300 font-black hover:text-white transition-colors underline underline-offset-4 decoration-gray-600">
              ¿Prepara una licitación? Invítenos →
            </button>
          </div>
          <p className="text-xs mt-4 uppercase tracking-widest text-gray-500 font-bold">
            +17 años sin incidentes · Confidencial · Sin compromiso
          </p>
        </motion.div>
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
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-400" />
            <span className="text-sm text-gray-300 font-bold">Respuesta en menos de 12 horas</span>
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
              Si te identificaste con al menos una, es momento de auditar su esquema actual —
              <span className="text-white font-bold"> no de esperar al próximo incidente de facturación.</span>
            </p>
            <div className="mt-6 text-center">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors">
                Solicitar mi auditoría ahora <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECCIÓN 4: QUÉ EVALUAMOS ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative">
            <SectionNumeral n="02" />
            <h2 className="relative text-2xl sm:text-4xl font-black tracking-tight text-center mb-3">
              Esto es exactamente lo que evaluamos en su auditoría
            </h2>
            <p className="text-center text-gray-400 mb-12">
              El mismo protocolo de 21 puntos que aplicamos en auditorías privadas con clientes corporativos.
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
            <div className="mt-10 text-center">
              <button onClick={scrollToForm} className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 font-black text-[#0B0B0F] transition-colors">
                Solicitar mi auditoría <ArrowRight className="w-4 h-4" />
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
              ¿Quién audita su esquema de seguridad?
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
                sin registrar un solo incidente de seguridad. Estos son los criterios exactos que
                aplicamos en cada auditoría de contratación.
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
              Lo que dicen quienes ya fueron auditados
            </h2>
            <p className="text-center text-gray-500 text-sm mb-12 max-w-xl mx-auto">
              Por política de confidencialidad de seguridad, nuestros clientes se citan
              por cargo y tipo de instalación, nunca por nombre. Esa discreción también le protegerá a usted.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((tst, i) => (
                <div key={i} className="backdrop-blur-xl bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col">
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
              Así de simple es agendar su auditoría
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { n: '01', t: 'Complete el formulario', d: 'Cuéntenos sobre su esquema actual — o su necesidad — en menos de 2 minutos.' },
                { n: '02', t: 'Un consultor confirma en <12h', d: 'Revisamos su caso y coordinamos fecha y alcance, en su sede o por videollamada.' },
                { n: '03', t: 'Realizamos la auditoría', d: 'Aplicamos el protocolo de 21 puntos que usamos en auditorías corporativas reales y le entregamos hallazgos accionables.' },
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

      {/* ── SECCIÓN 9: CTA + FORMULARIO ── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/5 overflow-hidden" id="assessment">
        <div className="absolute inset-0" style={{ backgroundImage: GRID_BG, opacity: 0.4 }} />
        <div className="relative max-w-lg mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="backdrop-blur-xl bg-white/[0.04] border border-sky-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_60px_rgba(14,165,233,0.15)]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5 border border-sky-500/30 text-sky-400">
                <Award className="w-3 h-3" /> Auditoría corporativa confidencial
              </span>
              <h2 className="tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 1.7rem)' }}>
                Solicitar auditoría de mi esquema de seguridad
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                Un consultor senior revisa su caso y responde en menos de 12 horas hábiles.
              </p>
              <div className="mb-6">
                <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-sky-400 hover:underline">
                  ¿Prefiere adelantarse? Agende directamente →
                </a>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <select
                  name="motivo" required value={formData.motivo} onChange={handleChange}
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:border-sky-500 focus:outline-none transition-colors"
                >
                  <option value="auditoria">Solicitar auditoría de mi esquema actual</option>
                  <option value="licitacion">Invitar a CSSG a una licitación</option>
                </select>
                <input
                  type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
                />
                <input
                  type="text" name="cargo" value={formData.cargo} onChange={handleChange}
                  placeholder="Cargo (opcional)"
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
                />
                <input
                  type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                  placeholder="Empresa u organización"
                  className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
                />
                <div>
                  <input
                    type="email" name="correo" required value={formData.correo} onChange={handleChange}
                    placeholder="Tu email de trabajo"
                    className="w-full bg-[#0B0B0F] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  {isFreeEmail && (
                    <p className="mt-1.5 text-xs text-sky-400">Por la naturaleza confidencial de la auditoría, le recomendamos usar su correo corporativo.</p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl font-black text-base bg-gradient-to-r from-sky-500 to-sky-400 text-[#0B0B0F] hover:from-sky-400 hover:to-sky-300 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando…</>
                  ) : (
                    <>{formData.motivo === 'licitacion' ? 'Enviar invitación a licitación' : 'Solicitar auditoría'} <ArrowRight className="w-5 h-5" /></>
                  )}
                </motion.button>
              </form>
              {status === 'error' && (
                <p className="mt-3 text-sm text-red-400">Ocurrió un error: {errorMsg}. Intenta de nuevo.</p>
              )}
              <p className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Sin compromiso de contratación. Manejado bajo estricto protocolo de confidencialidad.
              </p>
            </div>
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
