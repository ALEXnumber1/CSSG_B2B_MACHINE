import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { BarChart3, TrendingUp, Target, CheckCircle2 } from 'lucide-react';

const levels = [
  { n: 1, label: 'Inicial', color: 'bg-red-500', desc: 'Sin procesos formales. Alta exposición.' },
  { n: 2, label: 'Repetible', color: 'bg-orange-500', desc: 'Prácticas informales. Dependencia de personas.' },
  { n: 3, label: 'Definido', color: 'bg-yellow-500', desc: 'Procesos documentados. Cumplimiento básico.' },
  { n: 4, label: 'Gestionado', color: 'bg-sky-500', desc: 'Métricas activas. Mejora continua.' },
  { n: 5, label: 'Optimizado', color: 'bg-emerald-500', desc: 'Inteligencia predictiva. Estándar G7.' },
];

const faqs = [
  {
    q: '¿Qué es el Diagnóstico de Madurez en Seguridad y para qué sirve?',
    a: 'Es una evaluación estructurada que mide el nivel de evolución de su programa de seguridad corporativa en una escala de 1 a 5. Identifica brechas específicas frente a estándares internacionales (ISO 31000, ESRM) y genera un plan de desarrollo priorizado.',
  },
  {
    q: '¿Cuál es el Índice de Seguridad Corporativa de Venezuela que mencionan?',
    a: 'Es un benchmark sectorial desarrollado por CSSG que permite comparar la madurez de su organización frente a pares en el mercado venezolano. Le indica si está por encima o por debajo del promedio de su industria y qué brecha debe cerrar para alcanzar el estándar del G7.',
  },
  {
    q: '¿En cuánto tiempo se realiza el diagnóstico y qué entrego de mi parte?',
    a: 'El diagnóstico toma entre 3 y 5 días hábiles. Requiere acceso a documentación de procesos, entrevistas con el responsable de seguridad y una visita breve a las instalaciones. No interrumpe las operaciones.',
  },
  {
    q: '¿Por qué es el punto de entrada ideal al programa de consultoría?',
    a: 'Porque establece una línea base objetiva. Sin ese dato, cualquier recomendación es especulativa. El diagnóstico convierte la seguridad en un número medible, lo que facilita la conversación con la dirección general y la justificación de presupuesto.',
  },
];

export default function DiagnosticoMadurez() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Diagnóstico de Madurez"
      badge="Lead Magnet Ancla · Diagnóstico Gratuito"
      title="Diagnóstico de Madurez en Seguridad"
      subtitle="Índice de Seguridad Corporativa de Venezuela"
      intro="Medimos en qué nivel de madurez se encuentra su programa de seguridad corporativa — de Inicial (1) a Optimizado (5) — y le mostramos exactamente qué brecha existe frente al estándar de su industria en Venezuela. Es la puerta de entrada a cualquier programa de consultoría: sin línea base, no hay hoja de ruta."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Scoring de Seguridad', href: '/consultoria/tecnologia/scoring-de-seguridad' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      ]}
    >
      {/* MATURITY LEVELS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Modelo de madurez CSSG — 5 niveles</h2>
        <div className="flex gap-2 mb-6">
          {levels.map((l) => (
            <div key={l.n} className="flex-1 text-center">
              <div className={`h-2 rounded-full ${l.color} mb-3`} />
              <div className="text-[9px] font-black text-white uppercase tracking-widest mb-1">Nivel {l.n}</div>
              <div className={`text-[10px] font-black mb-1 ${l.color.replace('bg-', 'text-').replace('-500', '-400')}`}>{l.label}</div>
              <p className="text-[9px] text-gray-600 leading-tight hidden md:block">{l.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">
          La mayoría de las organizaciones venezolanas operan entre los niveles 2 y 3. El estándar G7 exige nivel 4+.
        </p>
      </div>

      {/* WHAT YOU RECEIVE */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">¿Qué recibe al completar el diagnóstico?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: BarChart3, title: 'Scorecard de madurez', desc: 'Puntuación por dimensión: Físico, Tecnología, Procesos, Personas, Inteligencia.' },
            { icon: TrendingUp, title: 'Benchmark sectorial', desc: 'Comparativo anónimo frente a empresas del mismo sector en Venezuela.' },
            { icon: Target, title: 'Plan de desarrollo', desc: 'Tres recomendaciones prioritarias con impacto y complejidad estimados.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <Icon className="w-6 h-6 text-sky-400 mb-3" />
                <h3 className="text-sm font-black text-white mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* IDEAL FOR */}
      <div>
        <h2 className="text-2xl font-black text-white mb-4">Diseñado para</h2>
        <div className="flex flex-col gap-2">
          {[
            'Directores de Seguridad que necesitan justificar presupuesto ante la dirección general',
            'Gerentes Generales que quieren una visión ejecutiva del riesgo de seguridad',
            'Organizaciones nuevas en Venezuela que necesitan una línea base objetiva',
            'Empresas que desean benchmarkear su madurez frente a pares del sector',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
