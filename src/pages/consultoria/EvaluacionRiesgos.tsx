import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { CheckCircle2, BarChart3, FileSearch, Shield, FileDown, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Evaluación de Riesgos',
    badge: 'Security Risk Assessment · ESRM · ISO 31000',
    title: 'Evaluación de Riesgos de Seguridad',
    subtitle: 'Security Risk Assessment — Marco ESRM + ISO 31000:2018',
    intro: 'Cuantificamos el perfil de riesgo real de su organización en Venezuela. Aplicamos el marco ESRM de ASIS International sobre la base metodológica de ISO 31000:2018 para convertir vulnerabilidades abstractas en decisiones concretas: qué proteger, cómo protegerlo y cuánto vale ese control frente al riesgo que mitiga.',
    faqs: [
      {
        q: '¿Qué es una Evaluación de Riesgos de Seguridad (Security Risk Assessment)?',
        a: 'Es un análisis sistemático que identifica amenazas a sus activos críticos, cuantifica la probabilidad e impacto de cada riesgo y recomienda controles proporcionales. CSSG aplica el marco ESRM de ASIS International sobre la base metodológica de ISO 31000:2018.',
      },
      {
        q: '¿Cuánto tiempo toma realizar el assessment y qué entregables recibo?',
        a: 'Dependiendo del tamaño de la organización, entre 5 y 15 días hábiles. El entregable principal es un informe ejecutivo con matriz de riesgos FMEA, mapa de vulnerabilidades y hoja de ruta priorizada de 90 días.',
      },
      {
        q: '¿En qué se diferencia el ESRM del análisis de riesgo tradicional?',
        a: 'ESRM (Enterprise Security Risk Management) integra la seguridad en la estrategia de negocio: el riesgo se mide en términos de impacto operacional y financiero, no solo en términos técnicos. Esto permite al directivo tomar decisiones informadas sobre tolerancia al riesgo y asignación de recursos.',
      },
      {
        q: '¿Pueden realizarlo organizaciones extranjeras operando en Venezuela?',
        a: 'Sí. La mayoría de nuestros clientes en esta línea son embajadas del G7, multinacionales con operaciones en Venezuela y fondos de inversión con activos en el país. Manejamos evaluaciones confidenciales con protocolos acordes al nivel de exposición del cliente.',
      },
      {
        q: '¿El assessment cumple con los requisitos de ISO 9001 y auditorías externas?',
        a: 'Correcto. CSSG está certificada ISO 9001:2015 (Cert. 580181). Nuestros informes siguen una estructura documentada y trazable que satisface los requisitos de auditorías internas, auditores de riesgo externos y comités de cumplimiento corporativo.',
      },
    ],
    whatTitle: '¿Qué evalúa este servicio?',
    whatText: 'El Security Risk Assessment cubre los cuatro pilares de seguridad corporativa bajo el modelo ESRM:',
    pillar1: 'Perímetro físico',
    pillar2: 'Control de accesos',
    pillar3: 'Procedimientos y cultura',
    pillar4: 'Inteligencia operacional',
    whatTextEnd: '. Cada pilar se evalúa con métricas objetivas y se expresa en un índice de riesgo compuesto (0–100).',
    deliverables: [
      { icon: FileSearch, title: 'Identificación de activos críticos', desc: 'Mapeo completo de personas, procesos, instalaciones y sistemas expuestos.' },
      { icon: BarChart3, title: 'Matriz FMEA de riesgos', desc: 'Probabilidad × Impacto bajo metodología ISO 31000 y ASIS ESRM. Score cuantificado.' },
      { icon: Shield, title: 'Informe de vulnerabilidades', desc: 'Reporte ejecutivo con hallazgos prioritizados y plan de mitigación accionable.' },
      { icon: CheckCircle2, title: 'Hoja de ruta 90 días', desc: 'Acciones concretas organizadas por riesgo, costo y complejidad de implementación.' },
    ],
    methodTitle: '¿Cómo trabajamos?',
    phases: [
      { n: '01', t: 'Kickoff y recolección de información', d: 'Entrevistas con directivos, revisión de esquemas actuales, documentación operacional y técnica.' },
      { n: '02', t: 'Inspección física y técnica en sitio', d: 'Visita a instalaciones, evaluación de perímetros, accesos, CCTV, protocolos y cultura de seguridad.' },
      { n: '03', t: 'Análisis y modelado FMEA', d: 'Construcción de la matriz de riesgos con scoring cuantitativo: Probabilidad (×0.4) + Impacto (×0.6).' },
      { n: '04', t: 'Informe ejecutivo y presentación', d: 'Reporte confidencial con hallazgos, prioridades y hoja de ruta. Presentación ante comité directivo.' },
    ],
    whenTitle: '¿Cuándo solicitar este servicio?',
    whenItems: [
      'Antes de ampliar o renovar el contrato de seguridad privada',
      'Tras un incidente de seguridad o intento de intrusión',
      'Al ingresar al mercado venezolano o expandir operaciones',
      'Para cumplir con requisitos de auditoría ISO, ASIS o de casa matriz',
      'Cuando el costo de seguridad crece sin mejora aparente en la protección',
    ],
    ctaFreeToolLabel: 'Herramienta Gratuita',
    ctaFreeToolTitle: 'Diagnóstico de Riesgo — Resultado en 5 Minutos',
    ctaFreeToolDesc: 'Antes del assessment formal, obtenga una primera medición objetiva de su exposición. Scoring cuantitativo FMEA por 4 pilares con informe PDF descargable al instante.',
    ctaFreeToolBtn: 'Iniciar Diagnóstico Gratuito',
    ctaWhitePaperLabel: 'White Paper Gratuito',
    ctaWhitePaperTitle: 'Guía de Evaluación de Riesgos de Seguridad en Venezuela 2026',
    ctaWhitePaperDesc: 'Metodología ESRM + ISO 31000:2018 + FMEA: la guía completa para cuantificar y gestionar riesgos en el entorno venezolano.',
    ctaWhitePaperBtn: 'Descargar Gratis',
    related: [
      { label: 'Diagnóstico de Madurez', href: '/consultoria/diagnostico-madurez-seguridad' },
      { label: 'Site Survey Físico', href: '/consultoria/site-survey-evaluacion-fisica' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
  en: {
    breadcrumb: 'Risk Assessment',
    badge: 'Security Risk Assessment · ESRM · ISO 31000',
    title: 'Security Risk Assessment',
    subtitle: 'Security Risk Assessment — ESRM Framework + ISO 31000:2018',
    intro: 'We quantify your organization\'s real risk profile in Venezuela. We apply the ASIS International ESRM framework on the methodological basis of ISO 31000:2018 to turn abstract vulnerabilities into concrete decisions: what to protect, how to protect it and how much that control is worth against the risk it mitigates.',
    faqs: [
      {
        q: 'What is a Security Risk Assessment?',
        a: 'It is a systematic analysis that identifies threats to your critical assets, quantifies the probability and impact of each risk and recommends proportional controls. CSSG applies the ASIS International ESRM framework on the methodological basis of ISO 31000:2018.',
      },
      {
        q: 'How long does the assessment take and what deliverables will I receive?',
        a: 'Depending on the size of the organization, between 5 and 15 business days. The main deliverable is an executive report with a FMEA risk matrix, vulnerability map and a prioritized 90-day roadmap.',
      },
      {
        q: 'How does ESRM differ from traditional risk analysis?',
        a: 'ESRM (Enterprise Security Risk Management) integrates security into business strategy: risk is measured in terms of operational and financial impact, not just technical terms. This allows the executive to make informed decisions about risk tolerance and resource allocation.',
      },
      {
        q: 'Can foreign organizations operating in Venezuela use this service?',
        a: 'Yes. The majority of our clients for this service are G7 embassies, multinationals with operations in Venezuela and investment funds with assets in the country. We handle confidential assessments with protocols commensurate with the client\'s level of exposure.',
      },
      {
        q: 'Does the assessment meet ISO 9001 and external audit requirements?',
        a: 'Correct. CSSG is ISO 9001:2015 certified (Cert. 580181). Our reports follow a documented and traceable structure that satisfies the requirements of internal audits, external risk auditors and corporate compliance committees.',
      },
    ],
    whatTitle: 'What does this service assess?',
    whatText: 'The Security Risk Assessment covers the four pillars of corporate security under the ESRM model:',
    pillar1: 'Physical perimeter',
    pillar2: 'Access control',
    pillar3: 'Procedures and culture',
    pillar4: 'Operational intelligence',
    whatTextEnd: '. Each pillar is assessed with objective metrics and expressed in a composite risk index (0–100).',
    deliverables: [
      { icon: FileSearch, title: 'Critical asset identification', desc: 'Complete mapping of exposed people, processes, facilities and systems.' },
      { icon: BarChart3, title: 'FMEA risk matrix', desc: 'Probability × Impact under ISO 31000 and ASIS ESRM methodology. Quantified score.' },
      { icon: Shield, title: 'Vulnerability report', desc: 'Executive report with prioritized findings and an actionable mitigation plan.' },
      { icon: CheckCircle2, title: '90-day roadmap', desc: 'Concrete actions organized by risk, cost and implementation complexity.' },
    ],
    methodTitle: 'How do we work?',
    phases: [
      { n: '01', t: 'Kickoff and information gathering', d: 'Interviews with executives, review of current schemes, operational and technical documentation.' },
      { n: '02', t: 'On-site physical and technical inspection', d: 'Site visit, assessment of perimeters, access points, CCTV, protocols and security culture.' },
      { n: '03', t: 'FMEA analysis and modeling', d: 'Construction of the risk matrix with quantitative scoring: Probability (×0.4) + Impact (×0.6).' },
      { n: '04', t: 'Executive report and presentation', d: 'Confidential report with findings, priorities and roadmap. Presentation to the management committee.' },
    ],
    whenTitle: 'When to request this service?',
    whenItems: [
      'Before expanding or renewing a private security contract',
      'After a security incident or intrusion attempt',
      'When entering the Venezuelan market or expanding operations',
      'To meet ISO, ASIS or parent company audit requirements',
      'When security costs are rising without an apparent improvement in protection',
    ],
    ctaFreeToolLabel: 'Free Tool',
    ctaFreeToolTitle: 'Risk Assessment — Results in 5 Minutes',
    ctaFreeToolDesc: 'Before the formal assessment, get a first objective measurement of your exposure. Quantitative FMEA scoring across 4 pillars with an instantly downloadable PDF report.',
    ctaFreeToolBtn: 'Start Free Assessment',
    ctaWhitePaperLabel: 'Free White Paper',
    ctaWhitePaperTitle: 'Security Risk Assessment Guide for Venezuela 2026',
    ctaWhitePaperDesc: 'ESRM + ISO 31000:2018 + FMEA methodology: the complete guide to quantifying and managing risks in the Venezuelan environment.',
    ctaWhitePaperBtn: 'Download Free',
    related: [
      { label: 'Maturity Assessment', href: '/consultoria/diagnostico-madurez-seguridad' },
      { label: 'Physical Site Survey', href: '/consultoria/site-survey-evaluacion-fisica' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
      { label: 'Business Continuity', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
};

export default function EvaluacionRiesgos() {
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
      {/* WHAT WE DO */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">{c.whatTitle}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {c.whatText} <strong className="text-white">{c.pillar1}</strong>, <strong className="text-white">{c.pillar2}</strong>, <strong className="text-white">{c.pillar3}</strong> e <strong className="text-white">{c.pillar4}</strong>{c.whatTextEnd}
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.deliverables.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-sky-400" />
                  </div>
                  <h3 className="text-sm font-black text-white">{d.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* METHODOLOGY */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.methodTitle}</h2>
        <div className="space-y-4">
          {c.phases.map((phase) => (
            <div key={phase.n} className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
              <div className="text-3xl font-black text-sky-500/30 leading-none shrink-0 w-10">{phase.n}</div>
              <div>
                <h4 className="text-sm font-black text-white mb-1">{phase.t}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{phase.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHEN DO YOU NEED IT */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">{c.whenTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.whenItems.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
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
            <p className="text-[10px] font-black text-sky-500/80 uppercase tracking-widest mb-1">{c.ctaFreeToolLabel}</p>
            <h3 className="text-lg font-black text-white">{c.ctaFreeToolTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.ctaFreeToolDesc}</p>
          </div>
        </div>
        <Link to="/analisis-riesgo" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-black uppercase tracking-widest hover:bg-sky-500/20 transition-all">
          {c.ctaFreeToolBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* WHITE PAPER CTA */}
      <div className="mb-12 p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest mb-1">{c.ctaWhitePaperLabel}</p>
            <h3 className="text-lg font-black text-white">{c.ctaWhitePaperTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.ctaWhitePaperDesc}</p>
          </div>
        </div>
        <Link to="/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all">
          {c.ctaWhitePaperBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
