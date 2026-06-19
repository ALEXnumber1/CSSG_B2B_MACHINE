import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { CheckCircle2, BarChart3, FileSearch, Shield, FileDown, ArrowRight } from 'lucide-react';

const deliverables = [
  { icon: FileSearch, title: 'Identificación de activos críticos', desc: 'Mapeo completo de personas, procesos, instalaciones y sistemas expuestos.' },
  { icon: BarChart3, title: 'Matriz FMEA de riesgos', desc: 'Probabilidad × Impacto bajo metodología ISO 31000 y ASIS ESRM. Score cuantificado.' },
  { icon: Shield, title: 'Informe de vulnerabilidades', desc: 'Reporte ejecutivo con hallazgos prioritizados y plan de mitigación accionable.' },
  { icon: CheckCircle2, title: 'Hoja de ruta 90 días', desc: 'Acciones concretas organizadas por riesgo, costo y complejidad de implementación.' },
];

const faqs = [
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
];

export default function EvaluacionRiesgos() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Evaluación de Riesgos"
      badge="Security Risk Assessment · ESRM · ISO 31000"
      title="Evaluación de Riesgos de Seguridad"
      subtitle="Security Risk Assessment — Marco ESRM + ISO 31000:2018"
      intro="Cuantificamos el perfil de riesgo real de su organización en Venezuela. Aplicamos el marco ESRM de ASIS International sobre la base metodológica de ISO 31000:2018 para convertir vulnerabilidades abstractas en decisiones concretas: qué proteger, cómo protegerlo y cuánto vale ese control frente al riesgo que mitiga."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Diagnóstico de Madurez', href: '/consultoria/diagnostico-madurez-seguridad' },
        { label: 'Site Survey Físico', href: '/consultoria/site-survey-evaluacion-fisica' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
        { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
      ]}
    >
      {/* WHAT WE DO */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">¿Qué evalúa este servicio?</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          El Security Risk Assessment cubre los cuatro pilares de seguridad corporativa bajo el modelo ESRM: <strong className="text-white">Perímetro físico</strong>, <strong className="text-white">Control de accesos</strong>, <strong className="text-white">Procedimientos y cultura</strong> e <strong className="text-white">Inteligencia operacional</strong>. Cada pilar se evalúa con métricas objetivas y se expresa en un índice de riesgo compuesto (0–100).
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {deliverables.map((d) => {
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
        <h2 className="text-2xl font-black text-white mb-6">¿Cómo trabajamos?</h2>
        <div className="space-y-4">
          {[
            { n: '01', t: 'Kickoff y recolección de información', d: 'Entrevistas con directivos, revisión de esquemas actuales, documentación operacional y técnica.' },
            { n: '02', t: 'Inspección física y técnica en sitio', d: 'Visita a instalaciones, evaluación de perímetros, accesos, CCTV, protocolos y cultura de seguridad.' },
            { n: '03', t: 'Análisis y modelado FMEA', d: 'Construcción de la matriz de riesgos con scoring cuantitativo: Probabilidad (×0.4) + Impacto (×0.6).' },
            { n: '04', t: 'Informe ejecutivo y presentación', d: 'Reporte confidencial con hallazgos, prioridades y hoja de ruta. Presentación ante comité directivo.' },
          ].map((phase) => (
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
        <h2 className="text-2xl font-black text-white mb-4">¿Cuándo solicitar este servicio?</h2>
        <div className="flex flex-col gap-2">
          {[
            'Antes de ampliar o renovar el contrato de seguridad privada',
            'Tras un incidente de seguridad o intento de intrusión',
            'Al ingresar al mercado venezolano o expandir operaciones',
            'Para cumplir con requisitos de auditoría ISO, ASIS o de casa matriz',
            'Cuando el costo de seguridad crece sin mejora aparente en la protección',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHITE PAPER CTA */}
      <div className="mb-12 p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest mb-1">White Paper Gratuito</p>
            <h3 className="text-lg font-black text-white">Guía de Evaluación de Riesgos de Seguridad en Venezuela 2026</h3>
            <p className="text-sm text-gray-500 mt-1">Metodología ESRM + ISO 31000:2018 + FMEA: la guía completa para cuantificar y gestionar riesgos en el entorno venezolano.</p>
          </div>
        </div>
        <Link to="/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all">
          Descargar Gratis <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
