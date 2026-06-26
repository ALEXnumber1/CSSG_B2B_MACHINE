import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Award, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Certificaciones',
    badge: 'ISO 9001:2015 · Cyber Essentials · ESRM',
    title: 'Certificaciones y Estándares',
    subtitle: 'El respaldo auditable detrás de cada servicio',
    intro: 'CSSG no declara estándares — los certifica. Nuestras certificaciones son emitidas por organismos de tercera parte independientes y están sujetas a auditorías periódicas. Son la evidencia objetiva de que los procesos que responden por la seguridad de su organización están diseñados, documentados y mejorados bajo normas internacionales.',
    faqs: [
      {
        q: '¿Cómo puedo verificar la vigencia del certificado ISO 9001 de CSSG?',
        a: 'El Certificado N° 580181 puede verificarse directamente con el organismo emisor LL-C. En reuniones de licitación o auditoría, CSSG presenta el certificado original y el último informe de auditoría de vigilancia. La validez y el alcance son verificables de forma independiente.',
      },
      {
        q: '¿Por qué Cyber Essentials es relevante para clientes latinoamericanos?',
        a: 'Porque es emitido por el National Cyber Security Centre (NCSC) del gobierno del Reino Unido y es reconocido por los países del G7. Para misiones diplomáticas europeas y organizaciones con casa matriz en el Reino Unido, es un requisito o señal de confianza relevante. La recertificación vigente cubre hasta mayo de 2027.',
      },
      {
        q: '¿ISO 31000 se puede certificar? ¿CSSG tiene certificación ISO 31000?',
        a: 'No. ISO 31000:2018 es una norma de directrices, no de requisitos auditables; ninguna organización en el mundo puede certificarse en ella. CSSG aplica ISO 31000 como metodología base de sus análisis FMEA y modelos de scoring de riesgo. El estándar certificable que cubre la calidad de esos procesos es el ISO 9001:2015 N° 580181.',
      },
      {
        q: '¿Qué ventaja concreta tiene contratar una empresa de seguridad con ISO 9001 en Venezuela?',
        a: 'Una empresa certificada ISO 9001 tiene cada proceso documentado y auditado por un tercero independiente: selección de personal, respuesta a incidentes, supervisión de campo y reporte al cliente. El servicio funciona de forma sistemática, no depende de decisiones individuales. En licitaciones con embajadas, organismos internacionales o corporaciones del G7, el ISO 9001 suele ser un requisito excluyente.',
      },
      {
        q: '¿Cumple CSSG con la regulación DIGESERVISP?',
        a: 'Sí. CSSG mantiene la credencial vigente de la Dirección General de los Servicios de Seguridad Privada (DIGESERVISP), el organismo gubernamental venezolano que habilita legalmente a las empresas de vigilancia privada. Operar sin esta credencial es ilegal en Venezuela; verificar su vigencia es el primer paso en cualquier proceso de selección de proveedor.',
      },
    ],
    activeCertsTitle: 'Certificaciones activas',
    certs: [
      {
        name: 'ISO 9001:2015',
        cert: 'Certificado N° 580181',
        issuer: 'LL-C / Sistema Internacional de Certificación',
        scopeLabel: 'Alcance',
        scope: 'Diseño, suministro y operación de servicios de seguridad corporativa y diplomática.',
        what: 'El ISO 9001 certifica que CSSG opera bajo un Sistema de Gestión de Calidad auditado externamente. Cada proceso — desde la selección de personal hasta la respuesta a incidentes — sigue procedimientos documentados y es mejorado continuamente.',
        color: 'border-sky-500/30 bg-sky-500/5',
        badge: 'text-sky-400',
      },
      {
        name: 'Cyber Essentials',
        cert: 'Recertificación: Mayo 2027',
        issuer: 'National Cyber Security Centre — Gobierno del Reino Unido',
        scopeLabel: 'Alcance',
        scope: 'Controles de ciberseguridad esenciales para la protección de información de clientes.',
        what: 'Cyber Essentials es la certificación de ciberseguridad del gobierno del Reino Unido. Verifica que CSSG implementa los cinco controles esenciales: firewall, configuración segura, control de acceso, protección contra malware y actualizaciones de seguridad.',
        color: 'border-emerald-500/30 bg-emerald-500/5',
        badge: 'text-emerald-400',
      },
    ],
    frameworksTitle: 'Marcos aplicados',
    frameworks: [
      { name: 'ESRM', full: 'Enterprise Security Risk Management', issuer: 'ASIS International', use: 'Marco metodológico para evaluaciones de riesgo y diseño de programas de seguridad.' },
      { name: 'ISO 31000:2018', full: 'Risk Management — Guidelines', issuer: 'ISO', use: 'Estándar internacional para la gestión del riesgo. Base de nuestro scoring y análisis FMEA.' },
      { name: 'ISO 22301:2019', full: 'Business Continuity Management Systems', issuer: 'ISO', use: 'Marco para planes de continuidad de negocio. Referencia para todos los BCP que diseñamos.' },
      { name: 'CPTED', full: 'Crime Prevention Through Environmental Design', issuer: 'CPTED Network', use: 'Marco para evaluaciones físicas de instalaciones y diseño de espacios seguros.' },
      { name: 'ASIS ORM.1:2017', full: 'Organizational Resilience Management', issuer: 'ASIS International', use: 'Estándar para gestión de resiliencia. Complementa el BCP con perspectiva de continuidad integral.' },
    ],
    whatMeanTitle: '¿Qué significan estas certificaciones para usted?',
    whatMean: [
      'Evidencia auditable de calidad — no solo una declaración',
      'Requisito para licitaciones con embajadas, organismos internacionales y corporaciones del G7',
      'Garantía de que sus datos son tratados bajo controles de ciberseguridad verificados',
      'Base para la confianza en entornos donde la verificación independiente es escasa',
      'Diferenciador frente a competidores sin certificación en el mercado venezolano',
    ],
    related: [
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
  en: {
    breadcrumb: 'Certifications',
    badge: 'ISO 9001:2015 · Cyber Essentials · ESRM',
    title: 'Certifications and Standards',
    subtitle: 'The auditable backing behind every service',
    intro: 'CSSG does not declare standards — it certifies them. Our certifications are issued by independent third-party bodies and are subject to periodic audits. They are the objective evidence that the processes safeguarding your organization\'s security are designed, documented and continuously improved under international standards.',
    faqs: [
      {
        q: 'How can I verify the validity of CSSG\'s ISO 9001 certificate?',
        a: 'Certificate No. 580181 can be verified directly with the issuing body, LL-C (International Certification System). At tender or audit meetings, CSSG presents the original certificate and the most recent surveillance audit report. Validity and scope are independently verifiable.',
      },
      {
        q: 'Why is Cyber Essentials relevant for Latin American clients?',
        a: 'Because it is issued by the National Cyber Security Centre (NCSC) of the UK Government and is recognized by G7 countries. For European diplomatic missions and organizations headquartered in the United Kingdom, it is a requirement or a relevant trust signal. The current recertification is valid through May 2027.',
      },
      {
        q: 'Can ISO 31000 be certified? Does CSSG hold an ISO 31000 certification?',
        a: 'No. ISO 31000:2018 is a guidelines standard, not an auditable requirements standard; no organization in the world can be certified against it. CSSG applies ISO 31000 as the methodological foundation of its FMEA risk analyses and scoring models. The certifiable standard covering the quality of those processes is ISO 9001:2015 Certificate No. 580181.',
      },
      {
        q: 'What concrete advantage does hiring an ISO 9001-certified security company in Venezuela offer?',
        a: 'An ISO 9001-certified company has every process documented and audited by an independent third party: personnel selection, incident response, field supervision, and client reporting. The service operates systematically, not depending on individual decisions. In tenders with embassies, international organizations, or G7 corporations, ISO 9001 is often an excluding requirement.',
      },
      {
        q: 'Does CSSG comply with DIGESERVISP regulations?',
        a: 'Yes. CSSG maintains a current credential from the Dirección General de los Servicios de Seguridad Privada (DIGESERVISP), the Venezuelan government body that legally authorizes private security companies to operate. Operating without this credential is illegal in Venezuela; verifying its validity is the first step in any provider selection process.',
      },
    ],
    activeCertsTitle: 'Active certifications',
    certs: [
      {
        name: 'ISO 9001:2015',
        cert: 'Certificate No. 580181',
        issuer: 'LL-C / International Certification System',
        scopeLabel: 'Scope',
        scope: 'Design, supply and operation of corporate and diplomatic security services.',
        what: 'ISO 9001 certifies that CSSG operates under an externally audited Quality Management System. Every process — from personnel selection to incident response — follows documented procedures and is continuously improved.',
        color: 'border-sky-500/30 bg-sky-500/5',
        badge: 'text-sky-400',
      },
      {
        name: 'Cyber Essentials',
        cert: 'Recertification: May 2027',
        issuer: 'National Cyber Security Centre — UK Government',
        scopeLabel: 'Scope',
        scope: 'Essential cybersecurity controls for the protection of client information.',
        what: 'Cyber Essentials is the UK government\'s cybersecurity certification. It verifies that CSSG implements the five essential controls: firewall, secure configuration, access control, malware protection and security updates.',
        color: 'border-emerald-500/30 bg-emerald-500/5',
        badge: 'text-emerald-400',
      },
    ],
    frameworksTitle: 'Applied frameworks',
    frameworks: [
      { name: 'ESRM', full: 'Enterprise Security Risk Management', issuer: 'ASIS International', use: 'Methodological framework for risk assessments and security program design.' },
      { name: 'ISO 31000:2018', full: 'Risk Management — Guidelines', issuer: 'ISO', use: 'International standard for risk management. Basis of our scoring and FMEA analysis.' },
      { name: 'ISO 22301:2019', full: 'Business Continuity Management Systems', issuer: 'ISO', use: 'Framework for business continuity plans. Reference for all BCPs we design.' },
      { name: 'CPTED', full: 'Crime Prevention Through Environmental Design', issuer: 'CPTED Network', use: 'Framework for physical facility assessments and secure space design.' },
      { name: 'ASIS ORM.1:2017', full: 'Organizational Resilience Management', issuer: 'ASIS International', use: 'Standard for resilience management. Complements the BCP with an integral continuity perspective.' },
    ],
    whatMeanTitle: 'What do these certifications mean for you?',
    whatMean: [
      'Auditable evidence of quality — not just a declaration',
      'Requirement for tenders with embassies, international organizations and G7 corporations',
      'Assurance that your data is handled under verified cybersecurity controls',
      'Basis for trust in environments where independent verification is scarce',
      'Differentiator against uncertified competitors in the Venezuelan market',
    ],
    related: [
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
};

export default function Certificaciones() {
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
      {/* CERTIFICATIONS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.activeCertsTitle}</h2>
        <div className="space-y-5">
          {c.certs.map((cert) => (
            <div key={cert.name} className={`p-7 rounded-3xl border ${cert.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-xl font-black ${cert.badge} mb-1`}>{cert.name}</h3>
                  <p className="text-xs font-bold text-gray-500">{cert.cert} · {cert.issuer}</p>
                </div>
                <Award className={`w-8 h-8 ${cert.badge} opacity-60 shrink-0`} />
              </div>
              <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-3">{cert.scopeLabel}: {cert.scope}</p>
              <p className="text-sm text-gray-400 leading-relaxed">{cert.what}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FRAMEWORKS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.frameworksTitle}</h2>
        <div className="space-y-3">
          {c.frameworks.map((f) => (
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
        <h2 className="text-2xl font-black text-white mb-4">{c.whatMeanTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.whatMean.map((item) => (
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
