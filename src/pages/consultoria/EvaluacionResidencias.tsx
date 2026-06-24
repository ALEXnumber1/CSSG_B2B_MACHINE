import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Home, Shield, Eye, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Evaluación de Residencias',
    badge: 'Residencias Oficiales · Cancillerías · BP1',
    title: 'Evaluación de Residencias y Cancillerías',
    subtitle: 'Inspección de sedes residenciales y cancillerías diplomáticas',
    intro: 'Evaluamos la seguridad física de residencias oficiales, cancillerías y sedes de representación diplomática en Venezuela. La metodología es descriptiva y exhaustiva; la fotografía de las instalaciones es prerrogativa exclusiva del cliente. Sin excepciones.',
    faqs: [
      {
        q: '¿Qué incluye la evaluación de una residencia oficial o cancillería?',
        a: 'Inspección física del perímetro, accesos, sistemas de vigilancia, iluminación y puntos de vulnerabilidad. Revisión de protocolos de acceso para personal doméstico, visitas y proveedores. Análisis del entorno inmediato: vecindario, vías de escape, distancia a puntos de apoyo.',
      },
      {
        q: '¿Qué es la "regla de fotografía" que mencionan para estos proyectos?',
        a: 'En evaluaciones de residencias y cancillerías, la fotografía de las instalaciones es prerrogativa exclusiva del cliente. CSSG no retiene imágenes de las sedes evaluadas. El registro documental queda bajo custodia exclusiva de la misión.',
      },
      {
        q: '¿Pueden evaluar la seguridad de una residencia antes de que el titular se mude?',
        a: 'Sí, y es el momento ideal. Una evaluación preventiva permite identificar vulnerabilidades antes de la ocupación y definir las mejoras necesarias con tiempo para implementarlas. El costo de las mejoras preventivas es siempre menor al de una respuesta reactiva.',
      },
      {
        q: '¿Este servicio aplica solo a residencias diplomáticas o también a ejecutivos corporativos?',
        a: 'Aplica a ambos. Evaluamos residencias de jefes de misión, consejeros y personal prioritario de embajadas, así como residencias de CEO, directores regionales y ejecutivos de alto perfil de corporaciones internacionales con operaciones en Venezuela.',
      },
    ],
    areasTitle: 'Áreas evaluadas',
    areas: [
      { icon: Home, t: 'Perímetro y accesos de la residencia', d: 'Muros, rejas, iluminación, cámaras, intercomunicadores, garaje y puntos de entrada secundarios.' },
      { icon: Eye, t: 'Vigilancia y cobertura CCTV', d: 'Ángulos ciegos, calidad de imagen, integración con centro de monitoreo.' },
      { icon: Shield, t: 'Protocolos de personal doméstico y visitas', d: 'Verificación de antecedentes, gestión de accesos, procedimientos ante incidentes.' },
      { icon: CheckCircle2, t: 'Análisis del entorno inmediato', d: 'Vecindario, vías de escape, tiempo de respuesta de apoyo, riesgos colindantes.' },
    ],
    confidentialityLabel: 'Protocolo de confidencialidad',
    confidentialityText: 'Toda la documentación generada durante la evaluación — planos, notas, observaciones — se entrega exclusivamente al cliente y no se retiene en los archivos de CSSG. La fotografía de las instalaciones es prerrogativa del cliente; CSSG no documenta imágenes sin autorización expresa.',
    profilesTitle: 'Perfiles de cliente',
    profiles: [
      'Jefe de misión diplomática que llega a Venezuela o cambia de residencia',
      'Responsable de seguridad de embajada que evalúa nuevas opciones de alojamiento para el titular',
      'Director regional de corporación multinacional con traslado a Venezuela',
      'Director de seguridad corporativa que verifica estándares de las residencias del equipo directivo',
    ],
    related: [
      { label: 'Seguridad Diplomática', href: '/consultoria/seguridad-misiones-diplomaticas' },
      { label: 'Site Survey Físico', href: '/consultoria/site-survey-evaluacion-fisica' },
      { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
    ],
  },
  en: {
    breadcrumb: 'Residence Assessment',
    badge: 'Official Residences · Chanceries · BP1',
    title: 'Residence and Chancery Assessment',
    subtitle: 'Inspection of residential premises and diplomatic chanceries',
    intro: 'We assess the physical security of official residences, chanceries and diplomatic representation premises in Venezuela. The methodology is descriptive and exhaustive; photography of the facilities is the exclusive prerogative of the client. No exceptions.',
    faqs: [
      {
        q: 'What does the assessment of an official residence or chancery include?',
        a: 'Physical inspection of the perimeter, access points, surveillance systems, lighting and vulnerability points. Review of access protocols for domestic staff, visitors and contractors. Analysis of the immediate surroundings: neighborhood, escape routes, distance to support points.',
      },
      {
        q: 'What is the "photography rule" you mention for these projects?',
        a: 'In residence and chancery assessments, photography of the facilities is the exclusive prerogative of the client. CSSG does not retain images of assessed premises. Documentary records remain in the exclusive custody of the mission.',
      },
      {
        q: 'Can you assess a residence\'s security before the principal moves in?',
        a: 'Yes, and it is the ideal time. A preventive assessment identifies vulnerabilities before occupancy and defines the necessary improvements with time to implement them. The cost of preventive improvements is always lower than a reactive response.',
      },
      {
        q: 'Does this service apply only to diplomatic residences or also to corporate executives?',
        a: 'It applies to both. We assess residences of heads of mission, counselors and priority embassy staff, as well as residences of CEOs, regional directors and high-profile executives of international corporations operating in Venezuela.',
      },
    ],
    areasTitle: 'Areas assessed',
    areas: [
      { icon: Home, t: 'Residence perimeter and access points', d: 'Walls, fencing, lighting, cameras, intercoms, garage and secondary entry points.' },
      { icon: Eye, t: 'Surveillance and CCTV coverage', d: 'Blind spots, image quality, integration with monitoring center.' },
      { icon: Shield, t: 'Domestic staff and visitor protocols', d: 'Background verification, access management, incident procedures.' },
      { icon: CheckCircle2, t: 'Immediate surroundings analysis', d: 'Neighborhood, escape routes, support response time, adjacent risks.' },
    ],
    confidentialityLabel: 'Confidentiality protocol',
    confidentialityText: 'All documentation generated during the assessment — floor plans, notes, observations — is delivered exclusively to the client and is not retained in CSSG\'s files. Photography of the facilities is the client\'s prerogative; CSSG does not document images without express authorization.',
    profilesTitle: 'Client profiles',
    profiles: [
      'Head of diplomatic mission arriving in Venezuela or changing residence',
      'Embassy security officer evaluating new accommodation options for the principal',
      'Regional director of a multinational corporation relocating to Venezuela',
      'Corporate security director verifying standards of management team residences',
    ],
    related: [
      { label: 'Diplomatic Security', href: '/consultoria/seguridad-misiones-diplomaticas' },
      { label: 'Physical Site Survey', href: '/consultoria/site-survey-evaluacion-fisica' },
      { label: 'Executive Protection', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
    ],
  },
};

export default function EvaluacionResidencias() {
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
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.areasTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.areas.map((item) => {
            const Icon = item.icon;
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

      <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-indigo-500/20">
        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">{c.confidentialityLabel}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{c.confidentialityText}</p>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-4">{c.profilesTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.profiles.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
