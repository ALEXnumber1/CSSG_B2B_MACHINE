import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Target, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Scoring de Seguridad',
    badge: 'Índice de Seguridad Corporativa · Métricas',
    title: 'Scoring de Seguridad Corporativa',
    subtitle: 'Convierte la seguridad en un número accionable con benchmark sectorial',
    intro: 'El Scoring de Seguridad convierte el estado de protección de su organización en un índice numérico comparable y accionable (0–100). Elimina la ambigüedad de las evaluaciones subjetivas y permite a la dirección general tomar decisiones de inversión con el mismo rigor que aplica a cualquier otro indicador de gestión.',
    faqs: [
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
    ],
    pillarsTitle: 'Los cuatro pilares del scoring',
    pillars: [
      { n: '01', label: 'Perímetro Físico', pct: 25, desc: 'Barreras, iluminación, CCTV, puntos de acceso y vulnerabilidades externas.' },
      { n: '02', label: 'Control de Accesos', pct: 25, desc: 'Gestión de identidades, segregación de zonas, registro de visitantes y contratistas.' },
      { n: '03', label: 'Procedimientos y Cultura', pct: 25, desc: 'Protocolos documentados, capacitación del personal, cultura de reporte de incidentes.' },
      { n: '04', label: 'Inteligencia Operacional', pct: 25, desc: 'Monitoreo del entorno, sistema de alertas tempranas y análisis de tendencias.' },
    ],
    benefitsTitle: '¿Qué hace el scoring por su organización?',
    benefits: [
      { t: 'Objetiva la conversación', d: 'Un número reemplaza las percepciones subjetivas. La dirección general puede evaluar la seguridad con el mismo criterio que cualquier otro KPI.' },
      { t: 'Mide la evolución', d: 'Antes y después de cada intervención. El ROI de la inversión en seguridad se hace visible.' },
      { t: 'Prioriza la inversión', d: 'El pilar con menor puntuación indica dónde invertir primero. Sin ambigüedad.' },
    ],
    ctaLabel: 'Herramienta Gratuita',
    ctaTitle: 'Calcule su Índice de Seguridad Corporativa en 5 Minutos',
    ctaDesc: 'Scoring cuantitativo FMEA en los 4 pilares: Perímetro Físico, Control de Accesos, Procedimientos e Inteligencia Operacional. Informe PDF descargable al instante. El primer número objetivo para su dirección general.',
    ctaBtn: 'Calcular mi Índice de Seguridad',
    related: [
      { label: 'Diagnóstico de Madurez', href: '/consultoria/diagnostico-madurez-seguridad' },
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Monitoreo en Tiempo Real', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
    ],
  },
  en: {
    breadcrumb: 'Security Scoring',
    badge: 'Corporate Security Index · Metrics',
    title: 'Corporate Security Scoring',
    subtitle: 'Turns security into an actionable number with sector benchmarking',
    intro: 'The Security Scoring converts your organization\'s protection status into a comparable and actionable numerical index (0–100). It eliminates the ambiguity of subjective evaluations and enables senior management to make investment decisions with the same rigor applied to any other management indicator.',
    faqs: [
      {
        q: 'How is the Corporate Security Index calculated?',
        a: 'The index aggregates scores from four pillars: Physical Perimeter, Access Control, Procedures and Culture, and Operational Intelligence. Each pillar is assessed with objective metrics. The risk formula applies: (Probability × 0.4) + (Impact × 0.6). The result is a number between 0 and 100 with direct interpretation.',
      },
      {
        q: 'Is scoring a one-time tool or a continuous system?',
        a: 'It can be both. For an initial assessment, scoring produces the baseline. For organizations with an active security program, the score is updated periodically (quarterly or semi-annually) to measure evolution and detect deterioration. The number matters less than the trend.',
      },
      {
        q: 'Can the score be compared with other organizations in the same sector?',
        a: 'Yes. We maintain an anonymous sector benchmark of the Corporate Security Index in Venezuela, which allows you to compare your score against your industry average and against the reference standard required by G7 organizations.',
      },
      {
        q: 'Does scoring replace the full Security Risk Assessment?',
        a: 'No. Scoring produces the number; the Security Risk Assessment explains the number. For security investment decisions or presentations to senior management, the complete analysis is needed. Scoring is the entry point; the assessment is the consulting engagement.',
      },
    ],
    pillarsTitle: 'The four scoring pillars',
    pillars: [
      { n: '01', label: 'Physical Perimeter', pct: 25, desc: 'Barriers, lighting, CCTV, access points and external vulnerabilities.' },
      { n: '02', label: 'Access Control', pct: 25, desc: 'Identity management, zone segregation, visitor and contractor logging.' },
      { n: '03', label: 'Procedures and Culture', pct: 25, desc: 'Documented protocols, staff training, incident reporting culture.' },
      { n: '04', label: 'Operational Intelligence', pct: 25, desc: 'Environment monitoring, early warning system and trend analysis.' },
    ],
    benefitsTitle: 'What does scoring do for your organization?',
    benefits: [
      { t: 'Objectifies the conversation', d: 'A number replaces subjective perceptions. Senior management can evaluate security with the same criteria as any other KPI.' },
      { t: 'Measures evolution', d: 'Before and after each intervention. The ROI on security investment becomes visible.' },
      { t: 'Prioritizes investment', d: 'The lowest-scoring pillar indicates where to invest first. No ambiguity.' },
    ],
    ctaLabel: 'Free Tool',
    ctaTitle: 'Calculate your Corporate Security Index in 5 Minutes',
    ctaDesc: 'Quantitative FMEA scoring across 4 pillars: Physical Perimeter, Access Control, Procedures and Operational Intelligence. Instantly downloadable PDF report. The first objective number for your senior management.',
    ctaBtn: 'Calculate my Security Index',
    related: [
      { label: 'Maturity Diagnostic', href: '/consultoria/diagnostico-madurez-seguridad' },
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Real-Time Monitoring', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
    ],
  },
};

export default function ScoringSeguridad() {
  const { i18n } = useTranslation();
  const c = i18n.language.startsWith('en') ? CONTENT.en : CONTENT.es;
  const icons = [BarChart3, TrendingUp, Target];

  return (
    <ConsultoriaServiceLayout
      breadcrumb={c.breadcrumb}
      badge={c.badge}
      title={c.title}
      subtitle={c.subtitle}
      intro={c.intro}
      faqs={c.faqs}
      accentColor="sky"
      related={c.related}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.pillarsTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.pillars.map((item) => (
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
        <h2 className="text-2xl font-black text-white mb-6">{c.benefitsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.benefits.map((item, idx) => {
            const Icon = icons[idx];
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

      <div className="mt-12 p-8 rounded-3xl border border-sky-500/30 bg-sky-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-sky-500/80 uppercase tracking-widest mb-1">{c.ctaLabel}</p>
            <h3 className="text-lg font-black text-white">{c.ctaTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.ctaDesc}</p>
          </div>
        </div>
        <Link to="/analisis-riesgo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/20 transition-all">
          {c.ctaBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
