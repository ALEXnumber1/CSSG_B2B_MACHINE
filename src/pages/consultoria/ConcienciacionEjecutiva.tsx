import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { User, Shield, Smartphone, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Concienciación Ejecutiva',
    badge: 'Cultura de Seguridad · Duty of Care · BP1',
    title: 'Concienciación Ejecutiva en Seguridad',
    subtitle: 'Cultura de seguridad, autoprotección y duty of care para directivos',
    intro: 'Los directivos son el objetivo prioritario de los actores maliciosos en Venezuela. Este programa les provee el conocimiento y los hábitos necesarios para reducir su exposición personal — en sus desplazamientos, su residencia, sus comunicaciones y su comportamiento digital — sin afectar su operatividad.',
    faqs: [
      {
        q: '¿Por qué los directivos necesitan formación de seguridad específica?',
        a: 'Porque son el objetivo prioritario. Un CEO o director regional es más valioso para un actor malicioso que toda la infraestructura de seguridad de la empresa. Su visibilidad pública, sus patrones de movimiento y el acceso que tienen a información crítica los convierte en el vector de ataque más rentable. Su formación no puede ser la misma que la del personal operativo.',
      },
      {
        q: '¿Qué es duty of care en el contexto de la seguridad ejecutiva?',
        a: 'Duty of care es la obligación legal y ética de la organización de proteger a sus empleados, incluyendo a sus ejecutivos, frente a riesgos previsibles. En Venezuela, donde los riesgos de seguridad son documentados y previsibles, una empresa que no forma a sus directivos en autoprotección incumple su deber de cuidado.',
      },
      {
        q: '¿El programa incluye seguridad digital y ciberseguridad personal?',
        a: 'Sí. La concienciación ejecutiva cubre tanto la seguridad física personal (desplazamientos, residencia, rutinas) como la seguridad digital del ejecutivo: dispositivos personales, cuentas en redes sociales, comunicaciones seguras y prevención de phishing y spear phishing dirigido.',
      },
      {
        q: '¿Cuánto tiempo requiere el programa y puede adaptarse a la agenda de un directivo?',
        a: 'El programa estándar se entrega en un taller intensivo de medio día (4 horas) más seguimiento opcional. Puede realizarse in-company, en formatos individuales o para el equipo directivo completo. No requiere preparación previa por parte del participante.',
      },
    ],
    areasTitle: 'Áreas de la concienciación',
    areas: [
      { icon: User, t: 'Seguridad personal y de desplazamiento', d: 'Rutinas seguras, variación de rutas, identificación de seguimientos, comportamiento ante extorsión.' },
      { icon: Shield, t: 'Seguridad residencial', d: 'Evaluación básica de la residencia, personal doméstico, acceso de visitas y proveedores.' },
      { icon: Smartphone, t: 'Seguridad digital personal', d: 'Dispositivos, contraseñas, redes sociales, comunicaciones seguras y phishing dirigido.' },
    ],
    deliverablesTitle: 'Entregables del programa',
    deliverables: [
      { t: 'Guía personal de autoprotección', d: 'Documento de referencia rápida adaptado al perfil de riesgo de cada participante.' },
      { t: 'Checklist de seguridad residencial', d: 'Lista de verificación para evaluar y mejorar la seguridad del domicilio.' },
      { t: 'Protocolo de respuesta ante incidentes personales', d: 'Qué hacer, a quién llamar y qué no hacer ante diferentes tipos de incidentes.' },
      { t: 'Brief para la familia', d: 'Versión simplificada para comunicar a cónyuge e hijos mayores.' },
    ],
    related: [
      { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
    ],
  },
  en: {
    breadcrumb: 'Executive Awareness',
    badge: 'Security Culture · Duty of Care · BP1',
    title: 'Executive Security Awareness',
    subtitle: 'Security culture, self-protection and duty of care for senior management',
    intro: 'Executives are the priority target of malicious actors in Venezuela. This program provides them with the knowledge and habits needed to reduce their personal exposure — in their movements, their residence, their communications and their digital behavior — without affecting their operational effectiveness.',
    faqs: [
      {
        q: 'Why do executives need specific security training?',
        a: 'Because they are the primary target. A CEO or regional director is more valuable to a malicious actor than the company\'s entire security infrastructure. Their public visibility, movement patterns and access to critical information make them the most profitable attack vector. Their training cannot be the same as that of operational staff.',
      },
      {
        q: 'What is duty of care in the context of executive security?',
        a: 'Duty of care is the legal and ethical obligation of the organization to protect its employees, including its executives, from foreseeable risks. In Venezuela, where security risks are documented and foreseeable, a company that does not train its executives in self-protection is breaching its duty of care.',
      },
      {
        q: 'Does the program include digital security and personal cybersecurity?',
        a: 'Yes. Executive awareness covers both personal physical security (movements, residence, routines) and the executive\'s digital security: personal devices, social media accounts, secure communications and prevention of targeted phishing and spear phishing.',
      },
      {
        q: 'How much time does the program require and can it adapt to an executive\'s schedule?',
        a: 'The standard program is delivered in an intensive half-day workshop (4 hours) plus optional follow-up. It can be held in-company, in individual formats or for the entire management team. No prior preparation is required from participants.',
      },
    ],
    areasTitle: 'Awareness areas',
    areas: [
      { icon: User, t: 'Personal and travel security', d: 'Safe routines, route variation, identification of surveillance, behavior during extortion.' },
      { icon: Shield, t: 'Residential security', d: 'Basic residence assessment, domestic staff, visitor and contractor access management.' },
      { icon: Smartphone, t: 'Personal digital security', d: 'Devices, passwords, social media, secure communications and targeted phishing.' },
    ],
    deliverablesTitle: 'Program deliverables',
    deliverables: [
      { t: 'Personal self-protection guide', d: 'Quick-reference document adapted to each participant\'s risk profile.' },
      { t: 'Residential security checklist', d: 'Verification list to assess and improve home security.' },
      { t: 'Personal incident response protocol', d: 'What to do, who to call and what not to do in different types of incidents.' },
      { t: 'Family brief', d: 'Simplified version to share with spouse and older children.' },
    ],
    related: [
      { label: 'Executive Protection', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      { label: 'Crisis Response for Teams', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
    ],
  },
};

export default function ConcienciacionEjecutiva() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.areasTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.areas.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/30 transition-all">
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

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.deliverablesTitle}</h2>
        <div className="space-y-3">
          {c.deliverables.map((item) => (
            <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
