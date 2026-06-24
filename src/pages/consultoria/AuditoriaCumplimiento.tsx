import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ShieldCheck, FileText, CheckCircle2, BarChart3, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Auditoría de Cumplimiento',
    badge: 'DIGESERVISP · ISO 9001 · Gap Analysis',
    title: 'Auditoría de Cumplimiento en Seguridad',
    subtitle: 'Gap analysis frente a DIGESERVISP e ISO 9001:2015',
    intro: 'Verificamos que su esquema de seguridad — propio o contratado — cumple con todos los marcos normativos aplicables: regulación venezolana DIGESERVISP, ISO 9001:2015, ISO 31000 y ASIS ORM.1. Identificamos brechas, documentamos no conformidades y diseñamos un plan de remediación que protege su operación frente a sanciones regulatorias y pérdida de contratos.',
    faqs: [
      {
        q: '¿Qué regula DIGESERVISP y por qué es relevante para mi empresa?',
        a: 'DIGESERVISP (Dirección General de Servicios de Seguridad Privada) es el ente del MININT que autoriza la actividad de seguridad privada en Venezuela. Regula la habilitación de empresas, la formación mínima de 120 horas del personal, los requisitos de uniformes, armamento y registros. No cumplir expone a la empresa a sanciones y nulidad de contratos.',
      },
      {
        q: '¿En qué consiste el gap analysis de cumplimiento?',
        a: 'Comparamos el estado actual de sus procesos y documentación frente a los requisitos del marco regulatorio aplicable. Identificamos brechas concretas, las priorizamos por nivel de riesgo legal y operacional, y proponemos un plan de remediación con responsables y plazos.',
      },
      {
        q: '¿También auditamos empresas contratistas de seguridad, no solo las que contratan?',
        a: 'Sí. Auditamos tanto a empresas que contratan servicios de seguridad (para verificar que sus proveedores cumplen con DIGESERVISP) como a empresas que prestan el servicio y necesitan demostrar cumplimiento ante sus clientes corporativos o en procesos de licitación.',
      },
      {
        q: '¿Qué relación hay entre la auditoría de cumplimiento y la certificación ISO 9001?',
        a: 'Son complementarias. La certificación ISO 9001 acredita un Sistema de Gestión de Calidad; la auditoría de cumplimiento DIGESERVISP verifica la habilitación legal. Para participar en licitaciones de alto valor, especialmente con organismos internacionales o embajadas, se requiere evidencia de ambas.',
      },
    ],
    frameworksTitle: 'Marcos regulatorios que auditamos',
    frameworks: [
      { label: 'DIGESERVISP', desc: 'Dirección General de Servicios de Seguridad Privada del MININT. Marco regulatorio venezolano obligatorio.' },
      { label: 'ISO 9001:2015', desc: 'Sistema de Gestión de Calidad. CSSG está certificada bajo este estándar (Cert. 580181).' },
      { label: 'ISO 31000:2018', desc: 'Gestión del riesgo. Marco de principios, marco de referencia y proceso de gestión.' },
      { label: 'ASIS ORM.1:2017', desc: 'Organizational Resilience Management. Estándar para gestión de resiliencia empresarial.' },
    ],
    deliverablesTitle: '¿Qué entrega la auditoría?',
    deliverableItems: [
      { icon: ClipboardCheck, t: 'Informe de no conformidades', d: 'Lista detallada de brechas, clasificadas por criticidad (mayor, menor, observación).' },
      { icon: FileText, t: 'Plan de remediación', d: 'Acciones correctivas con responsable, plazo y criterio de aceptación.' },
      { icon: ShieldCheck, t: 'Declaración de cumplimiento', d: 'Documento formal para presentar ante clientes, licitaciones o auditorías de casa matriz.' },
      { icon: CheckCircle2, t: 'Seguimiento post-auditoría', d: 'Verificación del cierre de no conformidades en plazo acordado.' },
    ],
    useCasesTitle: 'Casos de uso frecuentes',
    useCases: [
      'Licitaciones con embajadas o corporaciones internacionales que exigen evidencia de cumplimiento',
      'Renovación de contrato de seguridad con verificación de proveedor',
      'Preparación para auditoría de casa matriz o aseguradora',
      'Regularización ante DIGESERVISP tras observaciones de inspección',
      'Certificación ISO 9001 inicial o de renovación',
    ],
    ctaFreeToolLabel: 'Herramienta Gratuita',
    ctaFreeToolTitle: 'Evalúe su Perfil de Riesgo Antes de la Auditoría',
    ctaFreeToolDesc: 'Identifique las vulnerabilidades críticas con nuestro scoring FMEA gratuito y llegue más preparado al proceso de cumplimiento formal. Resultado en 5 minutos con informe PDF descargable.',
    ctaFreeToolBtn: 'Iniciar Diagnóstico Gratuito',
    related: [
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Formación de Personal', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
      { label: 'Certificaciones CSSG', href: '/consultoria/certificaciones' },
    ],
  },
  en: {
    breadcrumb: 'Compliance Audit',
    badge: 'DIGESERVISP · ISO 9001 · Gap Analysis',
    title: 'Security Compliance Audit',
    subtitle: 'Gap analysis against DIGESERVISP and ISO 9001:2015',
    intro: 'We verify that your security scheme — in-house or contracted — complies with all applicable regulatory frameworks: Venezuelan DIGESERVISP regulation, ISO 9001:2015, ISO 31000 and ASIS ORM.1. We identify gaps, document non-conformities and design a remediation plan that protects your operation from regulatory sanctions and contract loss.',
    faqs: [
      {
        q: 'What does DIGESERVISP regulate and why is it relevant to my company?',
        a: 'DIGESERVISP (General Directorate of Private Security Services) is the MININT body that authorizes private security activity in Venezuela. It regulates company licensing, the minimum 120-hour training requirement for personnel, uniform and weapons requirements, and record-keeping. Non-compliance exposes the company to sanctions and contract nullification.',
      },
      {
        q: 'What does a compliance gap analysis involve?',
        a: 'We compare the current state of your processes and documentation against the requirements of the applicable regulatory framework. We identify specific gaps, prioritize them by legal and operational risk level, and propose a remediation plan with owners and deadlines.',
      },
      {
        q: 'Do you also audit security contractor companies, not just those that hire them?',
        a: 'Yes. We audit both companies that hire security services (to verify that their providers comply with DIGESERVISP) and companies that provide the service and need to demonstrate compliance to their corporate clients or in tendering processes.',
      },
      {
        q: 'What is the relationship between the compliance audit and ISO 9001 certification?',
        a: 'They are complementary. ISO 9001 certification accredits a Quality Management System; the DIGESERVISP compliance audit verifies legal authorization. To participate in high-value tenders, especially with international organizations or embassies, evidence of both is required.',
      },
    ],
    frameworksTitle: 'Regulatory frameworks we audit',
    frameworks: [
      { label: 'DIGESERVISP', desc: 'General Directorate of Private Security Services of the MININT. Mandatory Venezuelan regulatory framework.' },
      { label: 'ISO 9001:2015', desc: 'Quality Management System. CSSG is certified under this standard (Cert. 580181).' },
      { label: 'ISO 31000:2018', desc: 'Risk Management. Framework of principles, reference framework and management process.' },
      { label: 'ASIS ORM.1:2017', desc: 'Organizational Resilience Management. Standard for enterprise resilience management.' },
    ],
    deliverablesTitle: 'What does the audit deliver?',
    deliverableItems: [
      { icon: ClipboardCheck, t: 'Non-conformity report', d: 'Detailed list of gaps, classified by criticality (major, minor, observation).' },
      { icon: FileText, t: 'Remediation plan', d: 'Corrective actions with owner, deadline and acceptance criterion.' },
      { icon: ShieldCheck, t: 'Compliance declaration', d: 'Formal document to present to clients, tenders or parent company audits.' },
      { icon: CheckCircle2, t: 'Post-audit follow-up', d: 'Verification of non-conformity closure within the agreed timeframe.' },
    ],
    useCasesTitle: 'Frequent use cases',
    useCases: [
      'Tenders with embassies or international corporations requiring compliance evidence',
      'Security contract renewal with provider verification',
      'Preparation for parent company or insurer audit',
      'DIGESERVISP regularization after inspection observations',
      'Initial or renewal ISO 9001 certification',
    ],
    ctaFreeToolLabel: 'Free Tool',
    ctaFreeToolTitle: 'Assess Your Risk Profile Before the Audit',
    ctaFreeToolDesc: 'Identify critical vulnerabilities with our free FMEA scoring tool and arrive better prepared for the formal compliance process. Results in 5 minutes with a downloadable PDF report.',
    ctaFreeToolBtn: 'Start Free Assessment',
    related: [
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Staff Training', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
      { label: 'CSSG Certifications', href: '/consultoria/certificaciones' },
    ],
  },
};

export default function AuditoriaCumplimiento() {
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
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.frameworksTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.frameworks.map((f) => (
            <div key={f.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm font-black text-sky-400 mb-2 uppercase tracking-widest">{f.label}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.deliverablesTitle}</h2>
        <div className="space-y-3">
          {c.deliverableItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{item.t}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-4">{c.useCasesTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.useCases.map((item) => (
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
