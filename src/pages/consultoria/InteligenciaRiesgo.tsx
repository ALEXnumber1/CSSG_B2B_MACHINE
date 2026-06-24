import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { Brain, Globe, TrendingUp, CheckCircle2, BarChart3, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Inteligencia y Análisis',
    badge: 'OSINT · Geopolítica · Análisis Operacional',
    title: 'Inteligencia y Análisis de Riesgo en Venezuela',
    subtitle: 'Prospectiva estratégica para decisiones de alto impacto',
    intro: 'Convertimos el entorno venezolano — político, delictivo, geopolítico — en inteligencia accionable para su organización. Aplicamos OSINT estructurado, análisis de señales tempranas y modelado de escenarios para anticipar riesgos antes de que se materialicen. El resultado no es un informe de lo que ya ocurrió; es una guía de lo que puede ocurrir y cómo prepararse.',
    faqs: [
      {
        q: '¿Qué cubre el análisis de inteligencia de riesgo en Venezuela?',
        a: 'Cubre tres dimensiones: entorno político-operacional (estabilidad institucional, riesgos regulatorios, conflictividad social), entorno delictivo (patrones geográficos, modus operandi, tendencias), y entorno geopolítico (sanciones internacionales, relaciones con socios estratégicos, impacto en operaciones). El análisis se calibra al sector y tipo de activo del cliente.',
      },
      {
        q: '¿Con qué frecuencia se actualiza el análisis de entorno?',
        a: 'Depende del nivel de servicio contratado. Ofrecemos análisis puntuales (one-shot para decisiones de inversión o entrada al mercado), análisis trimestrales (actualizaciones periódicas del perfil de riesgo) y briefings ejecutivos mensuales para organizaciones con exposición continua en Venezuela.',
      },
      {
        q: '¿En qué se diferencia la inteligencia de riesgo del análisis de riesgo tradicional?',
        a: 'El análisis de riesgo tradicional examina el estado actual de las vulnerabilidades. La inteligencia de riesgo es prospectiva: identifica señales tempranas de deterioro, anticipa escenarios y recomienda acciones preventivas antes de que los riesgos se materialicen. La diferencia es la anticipación.',
      },
      {
        q: '¿Pueden hacer análisis para decisiones de inversión o entrada al mercado venezolano?',
        a: 'Sí. Es uno de los usos más frecuentes de este servicio. Inversores, fondos y empresas que evalúan Venezuela como destino de capital contratan análisis específicos que responden: ¿Es el momento adecuado? ¿Cuál es el perfil real de riesgo? ¿Qué sectores presentan mejor relación riesgo-oportunidad?',
      },
    ],
    dimensionsTitle: 'Dimensiones del análisis',
    dimensions: [
      { icon: Globe, t: 'Entorno político-operacional', d: 'Estabilidad institucional, riesgos regulatorios, conflictividad social, impacto en operaciones.' },
      { icon: Brain, t: 'Entorno delictivo y de seguridad', d: 'Patrones geográficos de criminalidad, modus operandi, tendencias y zonas de exposición.' },
      { icon: TrendingUp, t: 'Entorno geopolítico', d: 'Sanciones internacionales, relaciones bilaterales, impacto en cadenas de suministro y acceso a divisas.' },
    ],
    formatsTitle: 'Formatos de entrega',
    formats: [
      { t: 'Análisis puntual (one-shot)', d: 'Informe completo para una decisión específica: entrada al mercado, inversión, relocalización.' },
      { t: 'Briefing ejecutivo trimestral', d: 'Actualización periódica del perfil de riesgo Venezuela con foco en cambios relevantes para su sector.' },
      { t: 'Alerta temprana', d: 'Notificación inmediata ante eventos que pueden impactar la seguridad operacional de su organización.' },
      { t: 'Informe sectorial', d: 'Análisis de riesgo específico por industria: salud, energía, financiero, diplomático, retail, manufactura.' },
    ],
    ctaFreeToolLabel: 'Herramienta Gratuita',
    ctaFreeToolTitle: 'Evalúe el Riesgo Interno de su Organización',
    ctaFreeToolDesc: 'El análisis de inteligencia del entorno se complementa con la evaluación de su vulnerabilidad interna. Scoring FMEA por 4 pilares + informe PDF en 5 minutos — el punto de partida para una visión completa del riesgo.',
    ctaFreeToolBtn: 'Iniciar Diagnóstico Gratuito',
    related: [
      { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
  en: {
    breadcrumb: 'Intelligence & Analysis',
    badge: 'OSINT · Geopolitics · Operational Analysis',
    title: 'Risk Intelligence and Analysis in Venezuela',
    subtitle: 'Strategic foresight for high-impact decisions',
    intro: 'We turn the Venezuelan environment — political, criminal, geopolitical — into actionable intelligence for your organization. We apply structured OSINT, early warning signal analysis and scenario modeling to anticipate risks before they materialize. The result is not a report on what has already happened; it is a guide to what may happen and how to prepare.',
    faqs: [
      {
        q: 'What does risk intelligence analysis in Venezuela cover?',
        a: 'It covers three dimensions: political-operational environment (institutional stability, regulatory risks, social unrest), criminal environment (geographic patterns, modus operandi, trends), and geopolitical environment (international sanctions, relations with strategic partners, impact on operations). The analysis is calibrated to the client\'s sector and asset type.',
      },
      {
        q: 'How frequently is the environmental analysis updated?',
        a: 'It depends on the service level contracted. We offer one-shot analyses (for investment or market entry decisions), quarterly analyses (periodic risk profile updates) and monthly executive briefings for organizations with continuous exposure in Venezuela.',
      },
      {
        q: 'How does risk intelligence differ from traditional risk analysis?',
        a: 'Traditional risk analysis examines the current state of vulnerabilities. Risk intelligence is prospective: it identifies early signals of deterioration, anticipates scenarios and recommends preventive actions before risks materialize. The difference is anticipation.',
      },
      {
        q: 'Can you produce analysis for investment or market entry decisions in Venezuela?',
        a: 'Yes. It is one of the most frequent uses of this service. Investors, funds and companies evaluating Venezuela as a capital destination commission specific analyses that answer: Is this the right time? What is the real risk profile? Which sectors offer the best risk-opportunity ratio?',
      },
    ],
    dimensionsTitle: 'Analysis dimensions',
    dimensions: [
      { icon: Globe, t: 'Political-operational environment', d: 'Institutional stability, regulatory risks, social unrest, operational impact.' },
      { icon: Brain, t: 'Criminal and security environment', d: 'Geographic crime patterns, modus operandi, trends and exposure zones.' },
      { icon: TrendingUp, t: 'Geopolitical environment', d: 'International sanctions, bilateral relations, impact on supply chains and currency access.' },
    ],
    formatsTitle: 'Delivery formats',
    formats: [
      { t: 'One-shot analysis', d: 'Complete report for a specific decision: market entry, investment, relocation.' },
      { t: 'Quarterly executive briefing', d: 'Periodic update of the Venezuela risk profile focusing on changes relevant to your sector.' },
      { t: 'Early warning alert', d: 'Immediate notification of events that may impact your organization\'s operational security.' },
      { t: 'Sector-specific report', d: 'Industry-specific risk analysis: healthcare, energy, financial, diplomatic, retail, manufacturing.' },
    ],
    ctaFreeToolLabel: 'Free Tool',
    ctaFreeToolTitle: 'Assess Your Organization\'s Internal Risk',
    ctaFreeToolDesc: 'Environmental intelligence analysis is complemented by an assessment of your internal vulnerability. FMEA scoring across 4 pillars + PDF report in 5 minutes — the starting point for a complete risk picture.',
    ctaFreeToolBtn: 'Start Free Assessment',
    related: [
      { label: 'Corporate Due Diligence', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Crisis Management', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Business Continuity', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
};

export default function InteligenciaRiesgo() {
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
      accentColor="violet"
      related={c.related}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.dimensionsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.dimensions.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.formatsTitle}</h2>
        <div className="space-y-3">
          {c.formats.map((item) => (
            <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
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
