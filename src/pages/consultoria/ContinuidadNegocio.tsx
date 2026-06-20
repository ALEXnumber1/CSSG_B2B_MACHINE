import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { RefreshCw, Zap, Building, CheckCircle2, FileDown, ArrowRight, BarChart3 } from 'lucide-react';

const scenarios = [
  { icon: Zap, t: 'Cortes eléctricos extendidos', d: 'Planes de contingencia energética: generación propia, priorización de sistemas críticos, protocolos de operación degradada.' },
  { icon: Building, t: 'Disturbios sociales o cierres viales', d: 'Rutas alternas, acceso remoto, procedimientos de trabajo desde casa y comunicación de emergencia.' },
  { icon: RefreshCw, t: 'Escasez de suministros o divisas', d: 'Inventarios de contingencia, proveedores alternativos, conversión de moneda y estrategias de precio.' },
  { icon: CheckCircle2, t: 'Incidentes de seguridad', d: 'Activación del BCP ante secuestros, hurtos mayores, daños a instalaciones o incidentes de violencia.' },
];

const faqs = [
  {
    q: '¿Qué es un BCP y por qué es especialmente crítico en Venezuela?',
    a: 'Un Business Continuity Plan (Plan de Continuidad de Negocio) define cómo su organización mantiene operaciones críticas ante interrupciones. En Venezuela, las interrupciones son frecuentes y de naturaleza diversa: cortes eléctricos, disturbios, escasez, problemas cambiarios. Sin BCP, cada interrupción se convierte en una crisis improvisada.',
  },
  {
    q: '¿En qué se diferencia el BCP del plan de respuesta a emergencias?',
    a: 'El plan de emergencias cubre la respuesta inmediata a un incidente (primeras horas). El BCP cubre la continuidad operacional durante la interrupción y la recuperación hacia la normalidad. Son complementarios: el plan de emergencias activa el BCP.',
  },
  {
    q: '¿Cuánto tiempo toma diseñar e implementar un BCP?',
    a: 'El diseño inicial, con análisis de impacto al negocio (BIA) e identificación de funciones críticas, toma entre 3 y 6 semanas. La implementación y el primer simulacro toman entre 2 y 4 meses adicionales. CSSG entrega un BCP operativo, no un documento teórico.',
  },
  {
    q: '¿El BCP cumple con los requisitos de ISO 22301?',
    a: 'Sí. Nuestra metodología sigue el marco de ISO 22301:2019 (Business Continuity Management Systems). Para organizaciones que buscan certificación bajo esta norma, podemos diseñar el BCP de forma que sirva de base para el proceso de certificación.',
  },
  {
    q: '¿Pueden hacer BCP para organizaciones con sedes en múltiples países, no solo Venezuela?',
    a: 'Sí. Tenemos experiencia con organizaciones que operan en Venezuela como parte de una operación regional. Coordinamos el BCP local con el marco global de continuidad de la casa matriz, asegurando coherencia sin ignorar las particularidades del entorno venezolano.',
  },
];

export default function ContinuidadNegocio() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Continuidad de Negocio"
      badge="BCP · ISO 22301 · Venezuela"
      title="Continuidad de Negocio (BCP) en Venezuela"
      subtitle="Planes calibrados a los escenarios reales del entorno venezolano"
      intro="Diseñamos Planes de Continuidad de Negocio (BCP) calibrados a los escenarios de interrupción que caracterizan a Venezuela: cortes eléctricos extendidos, disturbios, escasez de suministros, problemas cambiarios. Seguimos el marco de ISO 22301:2019 y entregamos un BCP operativo — no un documento teórico — con simulacros incluidos."
      faqs={faqs}
      accentColor="emerald"
      related={[
        { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Escenarios Venezuela que cubre el BCP</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{s.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Componentes del BCP</h2>
        <div className="space-y-3">
          {[
            { t: 'Business Impact Analysis (BIA)', d: 'Identificación de funciones críticas, RTO y RPO por proceso. Base de toda la planificación de continuidad.' },
            { t: 'Plan de activación y cadena de mando', d: 'Criterios de activación del BCP, roles, responsabilidades y árbol de comunicación de emergencia.' },
            { t: 'Estrategias de continuidad por proceso', d: 'Soluciones específicas para cada función crítica: trabajo remoto, sitios alternativos, proveedores de respaldo.' },
            { t: 'Plan de comunicación de crisis', d: 'Mensajes pre-aprobados para empleados, clientes, proveedores y medios ante diferentes escenarios.' },
            { t: 'Simulacro y validación', d: 'Ejercicio tabletop o simulacro operacional para validar el plan antes de que sea necesario activarlo.' },
          ].map((item) => (
            <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ANALISIS DE RIESGO TOOL CTA */}
      <div className="mb-6 p-8 rounded-3xl border border-sky-500/30 bg-sky-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-sky-500/80 uppercase tracking-widest mb-1">Herramienta Gratuita</p>
            <h3 className="text-lg font-black text-white">Todo BCP Comienza con la Evaluación de Riesgos</h3>
            <p className="text-sm text-gray-500 mt-1">Identifique las vulnerabilidades de seguridad que podrían interrumpir sus operaciones antes de diseñar el plan de continuidad. Scoring FMEA cuantitativo + informe PDF en 5 minutos.</p>
          </div>
        </div>
        <Link to="/analisis-riesgo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/20 transition-all">
          Iniciar Diagnóstico Gratuito <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* WHITE PAPER CTA */}
      <div className="mb-12 p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest mb-1">White Paper Gratuito</p>
            <h3 className="text-lg font-black text-white">Plan de Continuidad de Negocio en Venezuela: Guía ISO 22301:2019</h3>
            <p className="text-sm text-gray-500 mt-1">Guía completa para diseñar e implementar un BCP adaptado a los escenarios reales venezolanos: cortes eléctricos, disturbios y escasez.</p>
          </div>
        </div>
        <Link to="/white-papers/plan-continuidad-negocio-venezuela" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all">
          Descargar Gratis <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
