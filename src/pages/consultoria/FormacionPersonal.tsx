import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { BookOpen, Award, Users, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Formación de Personal',
    badge: 'DIGESERVISP · 120h · Certificación',
    title: 'Formación de Personal de Seguridad',
    subtitle: 'Programa acreditado DIGESERVISP — 120 horas de formación',
    intro: 'Formamos al personal de seguridad privada bajo la norma DIGESERVISP (mínimo 120 horas), con certificación válida para la habilitación ante el MININT. La formación puede realizarse presencialmente, en modalidad e-learning (Zentinel) o mixta — adaptada a la operación del cliente.',
    faqs: [
      {
        q: '¿Cuántas horas de formación exige DIGESERVISP para el personal de seguridad privada en Venezuela?',
        a: 'La normativa DIGESERVISP establece un mínimo de 120 horas de formación para personal de vigilancia y seguridad privada en Venezuela. Este requisito es obligatorio para la habilitación del personal y de la empresa prestadora del servicio. CSSG ofrece el programa completo de 120 horas con certificación.',
      },
      {
        q: '¿Quién puede impartir formación de seguridad privada habilitada?',
        a: 'Solo empresas e instructores autorizados por DIGESERVISP. CSSG cuenta con la autorización correspondiente y personal formador certificado. La formación impartida por instructores no autorizados no tiene validez legal para la habilitación del personal.',
      },
      {
        q: '¿Puede la formación realizarse en las instalaciones del cliente?',
        a: 'Sí. Ofrecemos formación in-company (en las instalaciones del cliente), en nuestras aulas y en modalidad e-learning a través de la línea Zentinel. Para organizaciones con múltiples sedes o personal geográficamente distribuido, la modalidad mixta es la más eficiente.',
      },
      {
        q: '¿La formación cubre solo personal de vigilancia o también supervisores y directivos de seguridad?',
        a: 'Cubrimos todos los niveles. Personal operativo (120h DIGESERVISP), supervisores y jefes de seguridad (programa extendido con gestión y liderazgo), y directivos de seguridad (concienciación estratégica). Cada nivel tiene su programa específico.',
      },
    ],
    modulesTitle: 'Módulos del programa 120h',
    modules: [
      { t: 'Marco legal y normativo', d: 'Ley de Policía Nacional, DIGESERVISP, derechos humanos, uso proporcional de la fuerza.' },
      { t: 'Seguridad física y perímetral', d: 'Rondas, control de accesos, inspección de vehículos, gestión de visitantes.' },
      { t: 'Primeros auxilios básicos', d: 'Respuesta a emergencias médicas, RCP básico, manejo de traumas menores.' },
      { t: 'Comunicaciones operativas', d: 'Uso de radio, lenguaje operacional, reportes de incidentes, cadena de mando.' },
      { t: 'Manejo de situaciones críticas', d: 'Desescalada verbal, respuesta ante amenazas, protocolos de evacuación.' },
      { t: 'Ética y conducta profesional', d: 'Código de conducta, relación con el público, confidencialidad y profesionalismo.' },
    ],
    modalitiesTitle: 'Modalidades',
    modalities: [
      { icon: Users, t: 'Presencial', d: 'En nuestras aulas o in-company. Grupos de hasta 20 participantes con instructor certificado.' },
      { icon: BookOpen, t: 'E-learning (Zentinel)', d: 'Plataforma digital con contenido interactivo, evaluaciones y certificación. Acceso flexible 24/7.' },
      { icon: Award, t: 'Mixta', d: 'Contenido teórico en línea + práctica presencial. Ideal para organizaciones con personal distribuido.' },
    ],
    related: [
      { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
  en: {
    breadcrumb: 'Staff Training',
    badge: 'DIGESERVISP · 120h · Certification',
    title: 'Security Staff Training',
    subtitle: 'DIGESERVISP-accredited program — 120 hours of training',
    intro: 'We train private security personnel under the DIGESERVISP standard (minimum 120 hours), with certification valid for licensing before MININT. Training can be delivered in-person, via e-learning (Zentinel) or in a blended format — adapted to the client\'s operations.',
    faqs: [
      {
        q: 'How many training hours does DIGESERVISP require for private security personnel in Venezuela?',
        a: 'The DIGESERVISP regulation establishes a minimum of 120 training hours for security and surveillance personnel in Venezuela. This requirement is mandatory for the licensing of both personnel and the service provider company. CSSG offers the complete 120-hour program with certification.',
      },
      {
        q: 'Who can deliver authorized private security training?',
        a: 'Only companies and instructors authorized by DIGESERVISP. CSSG holds the corresponding authorization and certified training staff. Training delivered by unauthorized instructors has no legal validity for personnel licensing.',
      },
      {
        q: 'Can training be delivered at the client\'s premises?',
        a: 'Yes. We offer in-company training (at client premises), in our classrooms and via e-learning through the Zentinel platform. For organizations with multiple sites or geographically distributed staff, the blended format is most efficient.',
      },
      {
        q: 'Does the training cover only security guards or also supervisors and security managers?',
        a: 'We cover all levels. Operational staff (120h DIGESERVISP), supervisors and security chiefs (extended program with management and leadership content), and security directors (strategic awareness). Each level has its own specific program.',
      },
    ],
    modulesTitle: '120h program modules',
    modules: [
      { t: 'Legal and regulatory framework', d: 'National Police Law, DIGESERVISP, human rights, proportional use of force.' },
      { t: 'Physical and perimeter security', d: 'Patrols, access control, vehicle inspection, visitor management.' },
      { t: 'Basic first aid', d: 'Medical emergency response, basic CPR, minor trauma management.' },
      { t: 'Operational communications', d: 'Radio use, operational language, incident reporting, chain of command.' },
      { t: 'Critical situation management', d: 'Verbal de-escalation, threat response, evacuation protocols.' },
      { t: 'Ethics and professional conduct', d: 'Code of conduct, public relations, confidentiality and professionalism.' },
    ],
    modalitiesTitle: 'Delivery formats',
    modalities: [
      { icon: Users, t: 'In-person', d: 'In our classrooms or in-company. Groups of up to 20 participants with a certified instructor.' },
      { icon: BookOpen, t: 'E-learning (Zentinel)', d: 'Digital platform with interactive content, assessments and certification. Flexible 24/7 access.' },
      { icon: Award, t: 'Blended', d: 'Online theory + in-person practice. Ideal for organizations with distributed staff.' },
    ],
    related: [
      { label: 'Crisis Response for Teams', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'Executive Awareness', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
};

export default function FormacionPersonal() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.modulesTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.modules.map((item) => (
            <div key={item.t} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.modalitiesTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.modalities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
