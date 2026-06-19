import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

const faqs = [
  {
    q: '¿Cómo se calcula el Índice de Seguridad Corporativa?',
    a: 'El índice agrega las puntuaciones de cuatro pilares: Perímetro Físico, Control de Accesos, Procedimientos y Cultura, e Inteligencia Operacional. Cada pilar se evalúa con métricas objetivas. La fórmula de riesgo aplica: (Probabilidad × 0.4) + (Impacto × 0.6). El resultado es un número entre 0 y 100 con interpretación directa.',
  },
  {
    q: '¿El scoring es una herramienta puntual o un sistema continuo?',
    a: 'Puede ser ambas cosas. Para una evaluación inicial, el scoring produce la línea base. Para organizaciones con programa de seguridad activo, el scoring se actualiza periódicamente (trimestral o semestralmente) para medir la evolución y detectar deterioros. El número importa menos que la tendencia.',
  },
  {
    q: '¿Se puede comparar el score con otras organizaciones del mismo sector?',
    a: 'Sí. Mantenemos un benchmark sectorial anónimo del Índice de Seguridad Corporativa de Venezuela, que permite comparar su puntuación frente al promedio de su industria y frente al estándar de referencia que exigen organizaciones del G7.',
  },
  {
    q: '¿El scoring sustituye al Security Risk Assessment completo?',
    a: 'No. El scoring produce el número; el Security Risk Assessment explica el número. Para decisiones de inversión en seguridad o presentaciones ante dirección general, se necesita el análisis completo. El scoring es la puerta de entrada; el assessment es la consultoría.',
  },
];

export default function ScoringSeguridad() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Scoring de Seguridad"
      badge="Índice de Seguridad Corporativa · Métricas"
      title="Scoring de Seguridad Corporativa"
      subtitle="Convierte la seguridad en un número accionable con benchmark sectorial"
      intro="El Scoring de Seguridad convierte el estado de protección de su organización en un índice numérico comparable y accionable (0–100). Elimina la ambigüedad de las evaluaciones subjetivas y permite a la dirección general tomar decisiones de inversión con el mismo rigor que aplica a cualquier otro indicador de gestión."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Diagnóstico de Madurez', href: '/consultoria/diagnostico-madurez-seguridad' },
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Monitoreo en Tiempo Real', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Los cuatro pilares del scoring</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { n: '01', label: 'Perímetro Físico', pct: 25, desc: 'Barreras, iluminación, CCTV, puntos de acceso y vulnerabilidades externas.' },
            { n: '02', label: 'Control de Accesos', pct: 25, desc: 'Gestión de identidades, segregación de zonas, registro de visitantes y contratistas.' },
            { n: '03', label: 'Procedimientos y Cultura', pct: 25, desc: 'Protocolos documentados, capacitación del personal, cultura de reporte de incidentes.' },
            { n: '04', label: 'Inteligencia Operacional', pct: 25, desc: 'Monitoreo del entorno, sistema de alertas tempranas y análisis de tendencias.' },
          ].map((item) => (
            <div key={item.n} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-black text-sky-500/40">{item.n}</span>
                <span className="text-xs font-black text-sky-400">{item.pct}%</span>
              </div>
              <h3 className="text-sm font-black text-white mb-2">{item.label}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">¿Qué hace el scoring por su organización?</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: BarChart3, t: 'Objetiva la conversación', d: 'Un número reemplaza las percepciones subjetivas. La dirección general puede evaluar la seguridad con el mismo criterio que cualquier otro KPI.' },
            { icon: TrendingUp, t: 'Mide la evolución', d: 'Antes y después de cada intervención. El ROI de la inversión en seguridad se hace visible.' },
            { icon: Target, t: 'Prioriza la inversión', d: 'El pilar con menor puntuación indica dónde invertir primero. Sin ambigüedad.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                <Icon className="w-5 h-5 text-sky-400 mb-3" />
                <h4 className="text-sm font-black text-white mb-1">{item.t}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
