import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Globe, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Seguridad Diplomática',
    badge: 'Misiones Diplomáticas · Convención de Viena · G7',
    title: 'Seguridad para Misiones Diplomáticas',
    subtitle: 'El estándar que exigen los gobiernos del G7 en Venezuela',
    intro: 'Protegemos embajadas, cancillerías, consulados y misiones internacionales con los estándares operacionales que exigen los gobiernos del G7. Más de 17 años sin incidentes en entornos diplomáticos en Venezuela nos posicionan como el socio local de confianza para misiones que no pueden permitirse errores.',
    faqs: [
      {
        q: '¿Qué estándares rigen la seguridad de misiones diplomáticas?',
        a: 'La Convención de Viena sobre Relaciones Diplomáticas (1961) establece las obligaciones del Estado receptor de proteger instalaciones y personal diplomático. A nivel operativo, los países del G7 aplican sus propios protocolos de seguridad (UK FCO, Canadian GAC, US RSO). CSSG trabaja alineada con todos estos marcos.',
      },
      {
        q: '¿Por qué confían en CSSG los gobiernos del G7 en Venezuela?',
        a: 'Porque llevamos más de 17 años protegiendo misiones diplomáticas en Venezuela sin un solo incidente de seguridad. Nuestro personal está formado bajo estándares internacionales, verificado por CICPC y certificado bajo ISO 9001:2015. Hemos superado auditorías de seguridad de gobiernos de Europa y América del Norte.',
      },
      {
        q: '¿Qué implica la consultoría de seguridad vs. el servicio operativo?',
        a: 'La consultoría evalúa, diseña y recomienda — asesora al responsable de seguridad de la misión sobre protocolos, procedimientos y configuración de recursos. El servicio operativo ejecuta: personal de seguridad en sitio. Ambos se complementan; muchos clientes contratan primero la consultoría para definir exactamente qué servicio operativo necesitan.',
      },
      {
        q: '¿Cómo manejan la confidencialidad en proyectos diplomáticos?',
        a: 'Todos los proyectos diplomáticos operan bajo acuerdo de confidencialidad previo. La documentación no sale de CSSG sin autorización expresa del cliente. No divulgamos nombres de misiones, ubicaciones ni detalles operacionales. Este nivel de discreción es un requisito no negociable de nuestros clientes diplomáticos.',
      },
      {
        q: '¿Pueden evaluar seguridad en residencias de personal diplomático?',
        a: 'Sí. Ofrecemos evaluaciones específicas para residencias del jefe de misión, consejeros y personal prioritario. Ver el servicio de Evaluación de Residencias y Cancillerías.',
      },
    ],
    trustLabel: 'Credencial G7',
    trustQuote: '"Si los gobiernos del Reino Unido y Canadá confían en CSSG para proteger a su personal y sus instalaciones en Venezuela, su organización también puede."',
    trustSub: '+17 años · 0 incidentes en entornos diplomáticos',
    scopeTitle: 'Alcance de la consultoría diplomática',
    scope: [
      { t: 'Evaluación de amenaza del entorno', d: 'Análisis del riesgo político, delictivo y geopolítico del entorno venezolano para la misión.' },
      { t: 'Diseño de protocolos de seguridad', d: 'Procedimientos de acceso, respuesta a incidentes, evacuación y comunicación de crisis.' },
      { t: 'Verificación de personal local', d: 'Antecedentes penales CICPC, solvencias tributarias y verificación de referencias del personal de seguridad.' },
      { t: 'Alineación con estándares del país acreditante', d: 'Integración con los requisitos específicos del FCO (UK), GAC (Canadá), DSS (EE.UU.) u otros.' },
    ],
    whyTitle: 'Por qué no compete en precio',
    whyText: 'En seguridad diplomática, el eje de decisión no es el costo — es la confianza irreplicable. Un proveedor que no ha operado en entornos diplomáticos en Venezuela, que no conoce los protocolos del G7 y que no tiene el historial de cero incidentes, no es una opción, independientemente del precio.',
    whyItems: [
      '+17 años de historial documentado en entornos diplomáticos en Venezuela',
      'Personal verificado por CICPC con solvencias tributarias (SENIAT/IVSS/INPSASEL)',
      'Certificación ISO 9001:2015 y Cyber Essentials — ambos auditables',
      'Protocolos alineados con estándares del G7: UK FCO, Canadian GAC',
      'Confidencialidad contractual sin excepciones',
    ],
    related: [
      { label: 'Evaluación de Residencias', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      { label: 'Escudo Diplomático', href: '/consultoria/escudo-diplomatico' },
    ],
  },
  en: {
    breadcrumb: 'Diplomatic Security',
    badge: 'Diplomatic Missions · Vienna Convention · G7',
    title: 'Security for Diplomatic Missions',
    subtitle: 'The standard required by G7 governments in Venezuela',
    intro: 'We protect embassies, chancelleries, consulates and international missions to the operational standards required by G7 governments. Over 17 years without a single incident in diplomatic environments in Venezuela position us as the trusted local partner for missions that cannot afford mistakes.',
    faqs: [
      {
        q: 'What standards govern the security of diplomatic missions?',
        a: 'The Vienna Convention on Diplomatic Relations (1961) establishes the obligations of the receiving state to protect diplomatic premises and personnel. At the operational level, G7 countries apply their own security protocols (UK FCO, Canadian GAC, US RSO). CSSG operates in alignment with all these frameworks.',
      },
      {
        q: 'Why do G7 governments in Venezuela trust CSSG?',
        a: 'Because we have spent over 17 years protecting diplomatic missions in Venezuela without a single security incident. Our staff is trained to international standards, verified by CICPC and certified under ISO 9001:2015. We have passed security audits from governments in Europe and North America.',
      },
      {
        q: 'What does security consulting imply vs. the operational service?',
        a: 'Consulting evaluates, designs and recommends — it advises the mission\'s security officer on protocols, procedures and resource configuration. The operational service executes: on-site security personnel. Both complement each other; many clients engage consulting first to define exactly what operational service they need.',
      },
      {
        q: 'How do you handle confidentiality in diplomatic projects?',
        a: 'All diplomatic projects operate under a prior confidentiality agreement. Documentation does not leave CSSG without the client\'s express authorization. We do not disclose mission names, locations or operational details. This level of discretion is a non-negotiable requirement of our diplomatic clients.',
      },
      {
        q: 'Can you assess security at diplomatic staff residences?',
        a: 'Yes. We offer specific assessments for residences of the head of mission, advisors and priority staff. See the Residence and Chancery Assessment service.',
      },
    ],
    trustLabel: 'G7 Credential',
    trustQuote: '"If the governments of the United Kingdom and Canada trust CSSG to protect their personnel and facilities in Venezuela, your organization can too."',
    trustSub: '+17 years · 0 incidents in diplomatic environments',
    scopeTitle: 'Scope of diplomatic consulting',
    scope: [
      { t: 'Environment threat assessment', d: 'Analysis of the political, criminal and geopolitical risk of the Venezuelan environment for the mission.' },
      { t: 'Security protocol design', d: 'Access procedures, incident response, evacuation and crisis communication.' },
      { t: 'Local staff verification', d: 'CICPC criminal background, tax compliance and reference verification of security personnel.' },
      { t: 'Alignment with accrediting country standards', d: 'Integration with specific requirements of FCO (UK), GAC (Canada), DSS (US) or others.' },
    ],
    whyTitle: 'Why it does not compete on price',
    whyText: 'In diplomatic security, the decision axis is not cost — it is irreplicable trust. A provider that has not operated in diplomatic environments in Venezuela, does not know G7 protocols and does not have a zero-incident track record is not an option, regardless of price.',
    whyItems: [
      '+17 years of documented track record in diplomatic environments in Venezuela',
      'Staff verified by CICPC with tax compliance certificates (SENIAT/IVSS/INPSASEL)',
      'ISO 9001:2015 and Cyber Essentials certification — both auditable',
      'Protocols aligned with G7 standards: UK FCO, Canadian GAC',
      'Contractual confidentiality with no exceptions',
    ],
    related: [
      { label: 'Residence Assessment', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Executive Protection', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      { label: 'Diplomatic Shield', href: '/consultoria/escudo-diplomatico' },
    ],
  },
};

const scopeIcons = [Globe, ShieldCheck, Lock, CheckCircle2];

export default function SeguridadDiplomatica() {
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
      accentColor="indigo"
      related={c.related}
    >
      <div className="mb-12 p-8 rounded-3xl bg-indigo-900/20 border border-indigo-500/30">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
          <div>
            <p className="text-sm font-black text-indigo-300 uppercase tracking-widest mb-2">{c.trustLabel}</p>
            <p className="text-base text-white font-bold leading-relaxed">{c.trustQuote}</p>
            <p className="text-xs text-indigo-400/70 mt-3">{c.trustSub}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.scopeTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.scope.map((item, idx) => {
            const Icon = scopeIcons[idx];
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-4">{c.whyTitle}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.whyText}</p>
        <div className="flex flex-col gap-2">
          {c.whyItems.map((item) => (
            <div key={item} className="flex items-start gap-3 py-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
