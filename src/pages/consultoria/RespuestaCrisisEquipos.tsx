import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Users, AlertTriangle, CheckCircle2 } from 'lucide-react';

const faqs = [
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
];

export default function RespuestaCrisisEquipos() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Respuesta a Crisis"
      badge="Training Corporativo · Simulacros · Tabletop"
      title="Respuesta a Crisis para Equipos"
      subtitle="Formación corporativa para actuar con decisión bajo presión"
      intro="Formamos a equipos corporativos — no solo al personal de seguridad — en cómo responder ante crisis de seguridad. Cada persona aprende su rol específico antes de que sea necesario ejercerlo. Incluye simulacros tabletop, talleres de toma de decisiones bajo presión y validación del plan de crisis."
      faqs={faqs}
      accentColor="emerald"
      related={[
        { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
        { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
        { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Componentes del programa</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: AlertTriangle, t: 'Taller de roles en crisis', d: 'Cada participante aprende exactamente qué debe hacer, qué no debe hacer y a quién reportar en cada tipo de crisis.' },
            { icon: Users, t: 'Simulacro tabletop', d: 'Escenario real con información fragmentada: el equipo de crisis toma decisiones en tiempo limitado bajo presión controlada.' },
            { icon: CheckCircle2, t: 'Revisión de lecciones aprendidas', d: 'Debriefing post-simulacro: qué funcionó, qué falló y qué cambiar en el plan.' },
            { icon: AlertTriangle, t: 'Comunicación bajo presión', d: 'Cómo comunicar con claridad cuando la información es incompleta y el tiempo es limitado.' },
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
        <h2 className="text-2xl font-black text-white mb-4">¿Por qué el entrenamiento salva vidas (y operaciones)?</h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          En una crisis real, el cerebro humano bajo estrés extremo revierte al comportamiento entrenado — no al comportamiento lógico. Los equipos que han practicado actúan; los que no han practicado se paralizan. El entrenamiento no es un costo: es la única forma de garantizar que el plan de crisis funcione cuando más importa.
        </p>
      </div>
    </ConsultoriaServiceLayout>
  );
}
