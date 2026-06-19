import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { ClipboardCheck, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

const frameworks = [
  { label: 'DIGESERVISP', desc: 'Dirección General de Servicios de Seguridad Privada del MININT. Marco regulatorio venezolano obligatorio.' },
  { label: 'ISO 9001:2015', desc: 'Sistema de Gestión de Calidad. CSSG está certificada bajo este estándar (Cert. 580181).' },
  { label: 'ISO 31000:2018', desc: 'Gestión del riesgo. Marco de principios, marco de referencia y proceso de gestión.' },
  { label: 'ASIS ORM.1:2017', desc: 'Organizational Resilience Management. Estándar para gestión de resiliencia empresarial.' },
];

const faqs = [
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
];

export default function AuditoriaCumplimiento() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Auditoría de Cumplimiento"
      badge="DIGESERVISP · ISO 9001 · Gap Analysis"
      title="Auditoría de Cumplimiento en Seguridad"
      subtitle="Gap analysis frente a DIGESERVISP e ISO 9001:2015"
      intro="Verificamos que su esquema de seguridad — propio o contratado — cumple con todos los marcos normativos aplicables: regulación venezolana DIGESERVISP, ISO 9001:2015, ISO 31000 y ASIS ORM.1. Identificamos brechas, documentamos no conformidades y diseñamos un plan de remediación que protege su operación frente a sanciones regulatorias y pérdida de contratos."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Formación de Personal', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
        { label: 'Certificaciones CSSG', href: '/consultoria/certificaciones' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Marcos regulatorios que auditamos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {frameworks.map((f) => (
            <div key={f.label} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-sm font-black text-sky-400 mb-2 uppercase tracking-widest">{f.label}</div>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">¿Qué entrega la auditoría?</h2>
        <div className="space-y-3">
          {[
            { icon: ClipboardCheck, t: 'Informe de no conformidades', d: 'Lista detallada de brechas, clasificadas por criticidad (mayor, menor, observación).' },
            { icon: FileText, t: 'Plan de remediación', d: 'Acciones correctivas con responsable, plazo y criterio de aceptación.' },
            { icon: ShieldCheck, t: 'Declaración de cumplimiento', d: 'Documento formal para presentar ante clientes, licitaciones o auditorías de casa matriz.' },
            { icon: CheckCircle2, t: 'Seguimiento post-auditoría', d: 'Verificación del cierre de no conformidades en plazo acordado.' },
          ].map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-4">Casos de uso frecuentes</h2>
        <div className="flex flex-col gap-2">
          {[
            'Licitaciones con embajadas o corporaciones internacionales que exigen evidencia de cumplimiento',
            'Renovación de contrato de seguridad con verificación de proveedor',
            'Preparación para auditoría de casa matriz o aseguradora',
            'Regularización ante DIGESERVISP tras observaciones de inspección',
            'Certificación ISO 9001 inicial o de renovación',
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
