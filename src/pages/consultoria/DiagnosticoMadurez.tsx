import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Target, CheckCircle2, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Diagnóstico de Madurez',
    badge: 'Lead Magnet Ancla · Diagnóstico Gratuito',
    title: 'Diagnóstico de Madurez en Seguridad',
    subtitle: 'Índice de Seguridad Corporativa de Venezuela',
    intro: 'Medimos en qué nivel de madurez se encuentra su programa de seguridad corporativa — de Inicial (1) a Optimizado (5) — y le mostramos exactamente qué brecha existe frente al estándar de su industria en Venezuela. Es la puerta de entrada a cualquier programa de consultoría: sin línea base, no hay hoja de ruta.',
    faqs: [
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
    ],
    levelsTitle: 'Modelo de madurez CSSG — 5 niveles',
    levels: [
      { n: 1, label: 'Inicial', color: 'bg-red-500', textColor: 'text-red-400', desc: 'Sin procesos formales. Alta exposición.' },
      { n: 2, label: 'Repetible', color: 'bg-orange-500', textColor: 'text-orange-400', desc: 'Prácticas informales. Dependencia de personas.' },
      { n: 3, label: 'Definido', color: 'bg-yellow-500', textColor: 'text-yellow-400', desc: 'Procesos documentados. Cumplimiento básico.' },
      { n: 4, label: 'Gestionado', color: 'bg-sky-500', textColor: 'text-sky-400', desc: 'Métricas activas. Mejora continua.' },
      { n: 5, label: 'Optimizado', color: 'bg-emerald-500', textColor: 'text-emerald-400', desc: 'Inteligencia predictiva. Estándar G7.' },
    ],
    levelLabel: 'Nivel',
    levelNote: 'La mayoría de las organizaciones venezolanas operan entre los niveles 2 y 3. El estándar G7 exige nivel 4+.',
    receivesTitle: '¿Qué recibe al completar el diagnóstico?',
    receives: [
      { icon: BarChart3, title: 'Scorecard de madurez', desc: 'Puntuación por dimensión: Físico, Tecnología, Procesos, Personas, Inteligencia.' },
      { icon: TrendingUp, title: 'Benchmark sectorial', desc: 'Comparativo anónimo frente a empresas del mismo sector en Venezuela.' },
      { icon: Target, title: 'Plan de desarrollo', desc: 'Tres recomendaciones prioritarias con impacto y complejidad estimados.' },
    ],
    designedForTitle: 'Diseñado para',
    designedFor: [
      'Directores de Seguridad que necesitan justificar presupuesto ante la dirección general',
      'Gerentes Generales que quieren una visión ejecutiva del riesgo de seguridad',
      'Organizaciones nuevas en Venezuela que necesitan una línea base objetiva',
      'Empresas que desean benchmarkear su madurez frente a pares del sector',
    ],
    ctaFreeToolLabel: 'Herramienta Gratuita',
    ctaFreeToolTitle: 'Obtenga su Índice de Seguridad Corporativa Ahora',
    ctaFreeToolDesc: 'Antes del diagnóstico formal, mida su perfil de riesgo en 5 minutos. Scoring FMEA por 4 pilares con informe PDF descargable — la línea base objetiva que su dirección necesita ver.',
    ctaFreeToolBtn: 'Iniciar Diagnóstico Gratuito',
    related: [
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Scoring de Seguridad', href: '/consultoria/tecnologia/scoring-de-seguridad' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
  en: {
    breadcrumb: 'Maturity Assessment',
    badge: 'Lead Magnet · Free Assessment',
    title: 'Security Maturity Assessment',
    subtitle: 'Corporate Security Index for Venezuela',
    intro: 'We measure the maturity level of your corporate security program — from Initial (1) to Optimized (5) — and show you exactly what gap exists against your industry standard in Venezuela. It is the entry point to any consulting program: without a baseline, there is no roadmap.',
    faqs: [
      {
        q: 'What is the Security Maturity Assessment and what is it for?',
        a: 'It is a structured evaluation that measures the evolution level of your corporate security program on a scale of 1 to 5. It identifies specific gaps against international standards (ISO 31000, ESRM) and generates a prioritized development plan.',
      },
      {
        q: 'What is the Corporate Security Index for Venezuela you mention?',
        a: 'It is a sectoral benchmark developed by CSSG that allows you to compare your organization\'s maturity against peers in the Venezuelan market. It tells you whether you are above or below your industry average and what gap you need to close to reach the G7 standard.',
      },
      {
        q: 'How long does the assessment take and what do I need to provide?',
        a: 'The assessment takes 3 to 5 business days. It requires access to process documentation, interviews with the security manager and a brief site visit. It does not interrupt operations.',
      },
      {
        q: 'Why is it the ideal entry point to the consulting program?',
        a: 'Because it establishes an objective baseline. Without that data, any recommendation is speculative. The assessment turns security into a measurable number, which facilitates the conversation with senior management and budget justification.',
      },
    ],
    levelsTitle: 'CSSG maturity model — 5 levels',
    levels: [
      { n: 1, label: 'Initial', color: 'bg-red-500', textColor: 'text-red-400', desc: 'No formal processes. High exposure.' },
      { n: 2, label: 'Repeatable', color: 'bg-orange-500', textColor: 'text-orange-400', desc: 'Informal practices. People dependency.' },
      { n: 3, label: 'Defined', color: 'bg-yellow-500', textColor: 'text-yellow-400', desc: 'Documented processes. Basic compliance.' },
      { n: 4, label: 'Managed', color: 'bg-sky-500', textColor: 'text-sky-400', desc: 'Active metrics. Continuous improvement.' },
      { n: 5, label: 'Optimized', color: 'bg-emerald-500', textColor: 'text-emerald-400', desc: 'Predictive intelligence. G7 standard.' },
    ],
    levelLabel: 'Level',
    levelNote: 'Most Venezuelan organizations operate between levels 2 and 3. The G7 standard requires level 4+.',
    receivesTitle: 'What do you receive upon completing the assessment?',
    receives: [
      { icon: BarChart3, title: 'Maturity scorecard', desc: 'Score by dimension: Physical, Technology, Processes, People, Intelligence.' },
      { icon: TrendingUp, title: 'Sectoral benchmark', desc: 'Anonymous comparison against companies in the same sector in Venezuela.' },
      { icon: Target, title: 'Development plan', desc: 'Three priority recommendations with estimated impact and complexity.' },
    ],
    designedForTitle: 'Designed for',
    designedFor: [
      'Security Directors who need to justify budgets to senior management',
      'General Managers who want an executive view of security risk',
      'Organizations new to Venezuela that need an objective baseline',
      'Companies that want to benchmark their maturity against sector peers',
    ],
    ctaFreeToolLabel: 'Free Tool',
    ctaFreeToolTitle: 'Get Your Corporate Security Index Now',
    ctaFreeToolDesc: 'Before the formal assessment, measure your risk profile in 5 minutes. FMEA scoring across 4 pillars with a downloadable PDF report — the objective baseline your management needs to see.',
    ctaFreeToolBtn: 'Start Free Assessment',
    related: [
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Security Scoring', href: '/consultoria/tecnologia/scoring-de-seguridad' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
};

export default function DiagnosticoMadurez() {
  const { i18n } = useTranslation();
  const c = i18n.language.startsWith('en') ? CONTENT.en : CONTENT.es;

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
      {/* MATURITY LEVELS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.levelsTitle}</h2>
        <div className="flex gap-2 mb-6">
          {c.levels.map((l) => (
            <div key={l.n} className="flex-1 text-center">
              <div className={`h-2 rounded-full ${l.color} mb-3`} />
              <div className="text-[9px] font-black text-white uppercase tracking-widest mb-1">{c.levelLabel} {l.n}</div>
              <div className={`text-[10px] font-black mb-1 ${l.textColor}`}>{l.label}</div>
              <p className="text-[9px] text-gray-600 leading-tight hidden md:block">{l.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 text-center">{c.levelNote}</p>
      </div>

      {/* WHAT YOU RECEIVE */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.receivesTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.receives.map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-4">{c.designedForTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.designedFor.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANALISIS DE RIESGO TOOL CTA */}
      <div className="mt-12 p-8 rounded-3xl border border-sky-500/30 bg-sky-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-sky-500/80 uppercase tracking-widest mb-1">{c.ctaFreeToolLabel}</p>
            <h3 className="text-lg font-black text-white">{c.ctaFreeToolTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.ctaFreeToolDesc}</p>
          </div>
        </div>
        <Link to="/analisis-riesgo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/20 transition-all">
          {c.ctaFreeToolBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
