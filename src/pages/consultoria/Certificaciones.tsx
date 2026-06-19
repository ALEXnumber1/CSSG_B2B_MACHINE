import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Award, CheckCircle2 } from 'lucide-react';

const certs = [
  {
    name: 'ISO 9001:2015',
    cert: 'Certificado N° 580181',
    issuer: 'Bureau Veritas / Sistema Internacional de Certificación',
    scope: 'Diseño, suministro y operación de servicios de seguridad corporativa y diplomática.',
    what: 'El ISO 9001 certifica que CSSG opera bajo un Sistema de Gestión de Calidad auditado externamente. Cada proceso — desde la selección de personal hasta la respuesta a incidentes — sigue procedimientos documentados y es mejorado continuamente.',
    color: 'border-sky-500/30 bg-sky-500/5',
    badge: 'text-sky-400',
  },
  {
    name: 'Cyber Essentials',
    cert: 'Recertificación: Mayo 2027',
    issuer: 'National Cyber Security Centre — Gobierno del Reino Unido',
    scope: 'Controles de ciberseguridad esenciales para la protección de información de clientes.',
    what: 'Cyber Essentials es la certificación de ciberseguridad del gobierno del Reino Unido. Verifica que CSSG implementa los cinco controles esenciales: firewall, configuración segura, control de acceso, protección contra malware y actualizaciones de seguridad.',
    color: 'border-emerald-500/30 bg-emerald-500/5',
    badge: 'text-emerald-400',
  },
];

const frameworks = [
  { name: 'ESRM', full: 'Enterprise Security Risk Management', issuer: 'ASIS International', use: 'Marco metodológico para evaluaciones de riesgo y diseño de programas de seguridad.' },
  { name: 'ISO 31000:2018', full: 'Risk Management — Guidelines', issuer: 'ISO', use: 'Estándar internacional para la gestión del riesgo. Base de nuestro scoring y análisis FMEA.' },
  { name: 'ISO 22301:2019', full: 'Business Continuity Management Systems', issuer: 'ISO', use: 'Marco para planes de continuidad de negocio. Referencia para todos los BCP que diseñamos.' },
  { name: 'CPTED', full: 'Crime Prevention Through Environmental Design', issuer: 'CPTED Network', use: 'Marco para evaluaciones físicas de instalaciones y diseño de espacios seguros.' },
  { name: 'ASIS ORM.1:2017', full: 'Organizational Resilience Management', issuer: 'ASIS International', use: 'Estándar para gestión de resiliencia. Complementa el BCP con perspectiva de continuidad integral.' },
];

export default function Certificaciones() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Certificaciones"
      badge="ISO 9001:2015 · Cyber Essentials · ESRM"
      title="Certificaciones y Estándares"
      subtitle="El respaldo auditable detrás de cada servicio"
      intro="CSSG no declara estándares — los certifica. Nuestras certificaciones son emitidas por organismos de tercera parte independientes y están sujetas a auditorías periódicas. Son la evidencia objetiva de que los procesos que responden por la seguridad de su organización están diseñados, documentados y mejorados bajo normas internacionales."
      faqs={[
        {
          q: '¿Cómo puedo verificar la vigencia del certificado ISO 9001 de CSSG?',
          a: 'El Certificado N° 580181 puede verificarse directamente con el organismo emisor. En reuniones de licitación o auditoría, CSSG presenta el certificado original y el último informe de auditoría de vigilancia. La validez y el alcance son verificables de forma independiente.',
        },
        {
          q: '¿Por qué Cyber Essentials es relevante para clientes latinoamericanos?',
          a: 'Porque es emitido por el gobierno del Reino Unido y es reconocido por los países del G7. Para misiones diplomáticas europeas y organizaciones con casa matriz en el Reino Unido, es un requisito o señal de confianza relevante. Para cualquier cliente, es evidencia de que CSSG protege su información bajo estándares de seguridad verificados.',
        },
      ]}
      accentColor="sky"
      related={[
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      ]}
    >
      {/* CERTIFICATIONS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Certificaciones activas</h2>
        <div className="space-y-5">
          {certs.map((cert) => (
            <div key={cert.name} className={`p-7 rounded-3xl border ${cert.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-black ${cert.badge} mb-1`}>{cert.name}</h3>
                  <p className="text-xs font-bold text-gray-500">{cert.cert} · {cert.issuer}</p>
                </div>
                <Award className={`w-8 h-8 ${cert.badge} opacity-60 shrink-0`} />
              </div>
              <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-3">Alcance: {cert.scope}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{cert.what}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FRAMEWORKS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Marcos aplicados</h2>
        <div className="space-y-3">
          {frameworks.map((f) => (
            <div key={f.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="shrink-0 w-20">
                <p className="text-xs font-black text-sky-400 uppercase">{f.name}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white mb-0.5">{f.full}</p>
                <p className="text-[11px] text-gray-500">{f.issuer} · {f.use}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT CERTS MEAN */}
      <div>
        <h2 className="text-2xl font-black text-white mb-4">¿Qué significan estas certificaciones para usted?</h2>
        <div className="flex flex-col gap-2">
          {[
            'Evidencia auditable de calidad — no solo una declaración',
            'Requisito para licitaciones con embajadas, organismos internacionales y corporaciones del G7',
            'Garantía de que sus datos son tratados bajo controles de ciberseguridad verificados',
            'Base para la confianza en entornos donde la verificación independiente es escasa',
            'Diferenciador frente a competidores sin certificación en el mercado venezolano',
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
