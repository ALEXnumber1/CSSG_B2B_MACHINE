import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Respuesta a Crisis',
    badge: 'Training Corporativo · Simulacros · Tabletop',
    title: 'Respuesta a Crisis para Equipos',
    subtitle: 'Formación corporativa para actuar con decisión bajo presión',
    intro: 'Formamos a equipos corporativos — no solo al personal de seguridad — en cómo responder ante crisis de seguridad. Cada persona aprende su rol específico antes de que sea necesario ejercerlo. Incluye simulacros tabletop, talleres de toma de decisiones bajo presión y validación del plan de crisis.',
    faqs: [
      {
        q: '¿Este programa es solo para el equipo de seguridad o para toda la organización?',
        a: 'Para toda la organización. La mayoría de los incidentes de seguridad involucran a personas que no son del área de seguridad: recepcionistas, gerentes, personal administrativo. El programa forma a cada persona en su rol específico durante una crisis, no solo al equipo de seguridad.',
      },
      {
        q: '¿Qué es un simulacro tabletop y cuándo se usa?',
        a: 'Un simulacro tabletop es un ejercicio de mesa donde el equipo directivo enfrenta un escenario de crisis simulado en tiempo real: reciben información fragmentada, toman decisiones bajo presión y gestionan la comunicación. No requiere despliegue físico y es ideal para validar el plan de crisis y capacitar al equipo directivo.',
      },
      {
        q: '¿Cuántas personas puede incluir el programa de formación en respuesta a crisis?',
        a: 'Los simulacros tabletop son más efectivos con grupos de 8 a 15 personas (el equipo de crisis). Los talleres de concienciación pueden escalar a grupos de 50 o más. Para organizaciones grandes, formamos primero al equipo de crisis y después a líderes de área.',
      },
      {
        q: '¿Con qué frecuencia debe repetirse el entrenamiento?',
        a: 'Recomendamos un simulacro tabletop anual para el equipo de crisis y talleres de actualización semestrales para supervisores. Cada vez que haya cambios relevantes en el plan de crisis, el equipo o el entorno, se justifica una sesión adicional.',
      },
    ],
    componentsTitle: 'Componentes del programa',
    components: [
      { t: 'Taller de roles en crisis', d: 'Cada participante aprende exactamente qué debe hacer, qué no debe hacer y a quién reportar en cada tipo de crisis.' },
      { t: 'Simulacro tabletop', d: 'Escenario real con información fragmentada: el equipo de crisis toma decisiones en tiempo limitado bajo presión controlada.' },
      { t: 'Revisión de lecciones aprendidas', d: 'Debriefing post-simulacro: qué funcionó, qué falló y qué cambiar en el plan.' },
      { t: 'Comunicación bajo presión', d: 'Cómo comunicar con claridad cuando la información es incompleta y el tiempo es limitado.' },
    ],
    whyTitle: '¿Por qué el entrenamiento salva vidas (y operaciones)?',
    whyText: 'En una crisis real, el cerebro humano bajo estrés extremo revierte al comportamiento entrenado — no al comportamiento lógico. Los equipos que han practicado actúan; los que no han practicado se paralizan. El entrenamiento no es un costo: es la única forma de garantizar que el plan de crisis funcione cuando más importa.',
    related: [
      { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
      { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
    ],
  },
  en: {
    breadcrumb: 'Crisis Response',
    badge: 'Corporate Training · Drills · Tabletop',
    title: 'Crisis Response for Teams',
    subtitle: 'Corporate training to act decisively under pressure',
    intro: 'We train corporate teams — not only security staff — in how to respond to security crises. Each person learns their specific role before it needs to be performed. Includes tabletop drills, decision-making workshops under pressure and crisis plan validation.',
    faqs: [
      {
        q: 'Is this program only for the security team or for the entire organization?',
        a: 'For the entire organization. Most security incidents involve people who are not in the security department: receptionists, managers, administrative staff. The program trains each person in their specific role during a crisis, not just the security team.',
      },
      {
        q: 'What is a tabletop drill and when is it used?',
        a: 'A tabletop drill is a table exercise where the management team faces a simulated crisis scenario in real time: they receive fragmented information, make decisions under pressure and manage communication. It does not require physical deployment and is ideal for validating the crisis plan and training the management team.',
      },
      {
        q: 'How many people can the crisis response training program include?',
        a: 'Tabletop drills are most effective with groups of 8 to 15 people (the crisis team). Awareness workshops can scale to groups of 50 or more. For large organizations, we train the crisis team first and then area leaders.',
      },
      {
        q: 'How often should training be repeated?',
        a: 'We recommend an annual tabletop drill for the crisis team and semi-annual refresher workshops for supervisors. Each time there are relevant changes to the crisis plan, team or environment, an additional session is warranted.',
      },
    ],
    componentsTitle: 'Program components',
    components: [
      { t: 'Crisis role workshop', d: 'Each participant learns exactly what to do, what not to do and who to report to in each type of crisis.' },
      { t: 'Tabletop drill', d: 'Real scenario with fragmented information: the crisis team makes decisions under time pressure in a controlled environment.' },
      { t: 'Lessons learned review', d: 'Post-drill debriefing: what worked, what failed and what to change in the plan.' },
      { t: 'Communication under pressure', d: 'How to communicate clearly when information is incomplete and time is limited.' },
    ],
    whyTitle: 'Why training saves lives (and operations)?',
    whyText: 'In a real crisis, the human brain under extreme stress reverts to trained behavior — not logical behavior. Teams that have practiced act; teams that have not practiced freeze. Training is not a cost: it is the only way to guarantee the crisis plan works when it matters most.',
    related: [
      { label: 'Crisis Management', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Business Continuity', href: '/consultoria/continuidad-de-negocio' },
      { label: 'Executive Awareness', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
    ],
  },
};

const componentIcons = [AlertTriangle, Users, CheckCircle2, AlertTriangle];

export default function RespuestaCrisisEquipos() {
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
        <div className="grid sm:grid-cols-2 gap-4">
          {c.components.map((item, idx) => {
            const Icon = componentIcons[idx];
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
        <h2 className="text-2xl font-black text-white mb-4">{c.whyTitle}</h2>
        <p className="text-gray-400 text-sm leading-relaxed">{c.whyText}</p>
      </div>
    </ConsultoriaServiceLayout>
  );
}
