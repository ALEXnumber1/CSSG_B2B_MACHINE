import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { AlertTriangle, Users, MessageSquare, BarChart3, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Gestión de Crisis',
    badge: 'Crisis Management · Protocolos · Simulacros',
    title: 'Gestión de Crisis y Respuesta',
    subtitle: 'Protocolos, cadena de mando y simulacros para entornos de alto riesgo',
    intro: 'Diseñamos el sistema de gestión de crisis de su organización: la cadena de mando, los protocolos de respuesta para cada escenario probable, los mensajes pre-aprobados para cada audiencia y el plan de simulacros que garantiza que el equipo sepa exactamente qué hacer cuando el tiempo corre.',
    faqs: [
      {
        q: '¿Cuál es la diferencia entre gestión de crisis y continuidad de negocio?',
        a: 'La gestión de crisis se enfoca en la respuesta humana y comunicacional durante un evento de alto impacto: quién decide qué, quién comunica qué y cómo se controla la narrativa. La continuidad de negocio se enfoca en mantener las operaciones. Ambos deben estar integrados: la crisis activa el BCP.',
      },
      {
        q: '¿Qué tipos de crisis cubre este servicio en el contexto venezolano?',
        a: 'Secuestros y extorsiones corporativas, incidentes de violencia en instalaciones, disturbios sociales que afectan la operación, accidentes laborales de alta visibilidad, crisis reputacionales con impacto mediático y situaciones de evacuación de personal.',
      },
      {
        q: '¿Los simulacros de crisis realmente preparan al equipo o son ejercicios teóricos?',
        a: 'Nuestros simulacros están diseñados para estresar los protocolos: escenarios realistas, tiempos límite, comunicaciones bajo presión, decisiones con información incompleta. No son ejercicios teóricos. Después del simulacro, el equipo habrá tomado decisiones difíciles — eso es lo que marca la diferencia cuando ocurre la crisis real.',
      },
      {
        q: '¿Qué rol juega el Centro de Mando en la gestión de crisis?',
        a: 'El Centro de Mando CECOM opera las 24 horas y puede activarse como punto de coordinación durante una crisis. Provee visibilidad consolidada en tiempo real, facilita la comunicación entre equipos y garantiza que la cadena de mando de crisis tenga información actualizada para tomar decisiones.',
      },
    ],
    componentsTitle: 'Componentes del sistema de gestión de crisis',
    components: [
      { icon: AlertTriangle, t: 'Protocolos por escenario', d: 'Un protocolo específico para cada tipo de crisis probable: secuestro, disturbio, accidente, incendio, evacuación.' },
      { icon: Users, t: 'Cadena de mando', d: 'Roles y responsabilidades definidos, líneas de autoridad claras y árbol de comunicación validado.' },
      { icon: MessageSquare, t: 'Comunicación de crisis', d: 'Mensajes pre-aprobados para empleados, clientes, medios y reguladores. Sin improvisar bajo presión.' },
    ],
    phasesTitle: 'Fases del programa',
    phases: [
      { n: '01', t: 'Evaluación de escenarios de riesgo', d: 'Identificación de los tipos de crisis más probables para su organización en Venezuela.' },
      { n: '02', t: 'Diseño del sistema de gestión', d: 'Protocolos, cadena de mando, roles y materiales de comunicación.' },
      { n: '03', t: 'Capacitación del equipo de crisis', d: 'Formación del Crisis Management Team con roles, herramientas y procedimientos.' },
      { n: '04', t: 'Simulacro tabletop', d: 'Ejercicio de escritorio con escenario real para validar el sistema bajo presión controlada.' },
      { n: '05', t: 'Revisión y actualización anual', d: 'Actualización del plan ante cambios en el entorno, la organización o las lecciones del simulacro.' },
    ],
    ctaFreeToolLabel: 'Herramienta Gratuita',
    ctaFreeToolTitle: '¿Qué Riesgos Podrían Desencadenar una Crisis en su Organización?',
    ctaFreeToolDesc: 'Evalúe las vulnerabilidades de seguridad que con mayor probabilidad activan una crisis. Scoring FMEA cuantitativo + informe PDF en 5 minutos — el diagnóstico previo que todo plan de crisis necesita.',
    ctaFreeToolBtn: 'Iniciar Diagnóstico Gratuito',
    related: [
      { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
      { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'Centro de Mando CECOM', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
    ],
  },
  en: {
    breadcrumb: 'Crisis Management',
    badge: 'Crisis Management · Protocols · Drills',
    title: 'Crisis Management and Response',
    subtitle: 'Protocols, chain of command and drills for high-risk environments',
    intro: 'We design your organization\'s crisis management system: the chain of command, response protocols for each likely scenario, pre-approved messages for each audience and the drill plan that ensures the team knows exactly what to do when time is running out.',
    faqs: [
      {
        q: 'What is the difference between crisis management and business continuity?',
        a: 'Crisis management focuses on the human and communication response during a high-impact event: who decides what, who communicates what and how the narrative is controlled. Business continuity focuses on maintaining operations. Both must be integrated: the crisis activates the BCP.',
      },
      {
        q: 'What types of crises does this service cover in the Venezuelan context?',
        a: 'Corporate kidnappings and extortion, violent incidents at facilities, social unrest affecting operations, high-visibility workplace accidents, reputational crises with media impact and personnel evacuation situations.',
      },
      {
        q: 'Do crisis drills actually prepare the team or are they just theoretical exercises?',
        a: 'Our drills are designed to stress-test the protocols: realistic scenarios, time limits, communications under pressure, decisions with incomplete information. They are not theoretical exercises. After the drill, the team will have made difficult decisions — that is what makes the difference when a real crisis occurs.',
      },
      {
        q: 'What role does the Command Center play in crisis management?',
        a: 'The CECOM Command Center operates 24 hours and can be activated as a coordination point during a crisis. It provides consolidated real-time visibility, facilitates communication between teams and ensures that the crisis chain of command has up-to-date information to make decisions.',
      },
    ],
    componentsTitle: 'Crisis management system components',
    components: [
      { icon: AlertTriangle, t: 'Scenario-specific protocols', d: 'A specific protocol for each likely crisis type: kidnapping, unrest, accident, fire, evacuation.' },
      { icon: Users, t: 'Chain of command', d: 'Defined roles and responsibilities, clear lines of authority and a validated communication tree.' },
      { icon: MessageSquare, t: 'Crisis communications', d: 'Pre-approved messages for employees, clients, media and regulators. No improvising under pressure.' },
    ],
    phasesTitle: 'Program phases',
    phases: [
      { n: '01', t: 'Risk scenario assessment', d: 'Identification of the most likely types of crisis for your organization in Venezuela.' },
      { n: '02', t: 'Management system design', d: 'Protocols, chain of command, roles and communication materials.' },
      { n: '03', t: 'Crisis team training', d: 'Formation of the Crisis Management Team with roles, tools and procedures.' },
      { n: '04', t: 'Tabletop drill', d: 'Desktop exercise with a real scenario to validate the system under controlled pressure.' },
      { n: '05', t: 'Annual review and update', d: 'Plan update in response to changes in the environment, the organization or lessons from the drill.' },
    ],
    ctaFreeToolLabel: 'Free Tool',
    ctaFreeToolTitle: 'What Risks Could Trigger a Crisis in Your Organization?',
    ctaFreeToolDesc: 'Assess the security vulnerabilities most likely to activate a crisis. Quantitative FMEA scoring + PDF report in 5 minutes — the prior assessment every crisis plan needs.',
    ctaFreeToolBtn: 'Start Free Assessment',
    related: [
      { label: 'Business Continuity', href: '/consultoria/continuidad-de-negocio' },
      { label: 'Crisis Response for Teams', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
      { label: 'CECOM Command Center', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
    ],
  },
};

export default function GestionCrisis() {
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
      accentColor="emerald"
      related={c.related}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.componentsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.components.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.phasesTitle}</h2>
        <div className="space-y-3">
          {c.phases.map((phase) => (
            <div key={phase.n} className="flex gap-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="text-2xl font-black text-emerald-500/30 leading-none shrink-0 w-8">{phase.n}</div>
              <div>
                <h4 className="text-sm font-black text-white mb-0.5">{phase.t}</h4>
                <p className="text-xs text-gray-500">{phase.d}</p>
              </div>
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
