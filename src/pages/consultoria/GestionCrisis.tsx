import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { AlertTriangle, Users, MessageSquare } from 'lucide-react';

const faqs = [
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
];

export default function GestionCrisis() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Gestión de Crisis"
      badge="Crisis Management · Protocolos · Simulacros"
      title="Gestión de Crisis y Respuesta"
      subtitle="Protocolos, cadena de mando y simulacros para entornos de alto riesgo"
      intro="Diseñamos el sistema de gestión de crisis de su organización: la cadena de mando, los protocolos de respuesta para cada escenario probable, los mensajes pre-aprobados para cada audiencia y el plan de simulacros que garantiza que el equipo sepa exactamente qué hacer cuando el tiempo corre."
      faqs={faqs}
      accentColor="emerald"
      related={[
        { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
        { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
        { label: 'Centro de Mando CECOM', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Componentes del sistema de gestión de crisis</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: AlertTriangle, t: 'Protocolos por escenario', d: 'Un protocolo específico para cada tipo de crisis probable: secuestro, disturbio, accidente, incendio, evacuación.' },
            { icon: Users, t: 'Cadena de mando', d: 'Roles y responsabilidades definidos, líneas de autoridad claras y árbol de comunicación validado.' },
            { icon: MessageSquare, t: 'Comunicación de crisis', d: 'Mensajes pre-aprobados para empleados, clientes, medios y reguladores. Sin improvisar bajo presión.' },
          ].map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-6">Fases del programa</h2>
        <div className="space-y-3">
          {[
            { n: '01', t: 'Evaluación de escenarios de riesgo', d: 'Identificación de los tipos de crisis más probables para su organización en Venezuela.' },
            { n: '02', t: 'Diseño del sistema de gestión', d: 'Protocolos, cadena de mando, roles y materiales de comunicación.' },
            { n: '03', t: 'Capacitación del equipo de crisis', d: 'Formación del Crisis Management Team con roles, herramientas y procedimientos.' },
            { n: '04', t: 'Simulacro tabletop', d: 'Ejercicio de escritorio con escenario real para validar el sistema bajo presión controlada.' },
            { n: '05', t: 'Revisión y actualización anual', d: 'Actualización del plan ante cambios en el entorno, la organización o las lecciones del simulacro.' },
          ].map((phase) => (
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
    </ConsultoriaServiceLayout>
  );
}
