import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { BookOpen, Award, Users, CheckCircle2 } from 'lucide-react';

const faqs = [
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
];

export default function FormacionPersonal() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Formación de Personal"
      badge="DIGESERVISP · 120h · Certificación"
      title="Formación de Personal de Seguridad"
      subtitle="Programa acreditado DIGESERVISP — 120 horas de formación"
      intro="Formamos al personal de seguridad privada bajo la norma DIGESERVISP (mínimo 120 horas), con certificación válida para la habilitación ante el MININT. La formación puede realizarse presencialmente, en modalidad e-learning (Zentinel) o mixta — adaptada a la operación del cliente."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
        { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Módulos del programa 120h</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { t: 'Marco legal y normativo', d: 'Ley de Policía Nacional, DIGESERVISP, derechos humanos, uso proporcional de la fuerza.' },
            { t: 'Seguridad física y perímetral', d: 'Rondas, control de accesos, inspección de vehículos, gestión de visitantes.' },
            { t: 'Primeros auxilios básicos', d: 'Respuesta a emergencias médicas, RCP básico, manejo de traumas menores.' },
            { t: 'Comunicaciones operativas', d: 'Uso de radio, lenguaje operacional, reportes de incidentes, cadena de mando.' },
            { t: 'Manejo de situaciones críticas', d: 'Desescalada verbal, respuesta ante amenazas, protocolos de evacuación.' },
            { t: 'Ética y conducta profesional', d: 'Código de conducta, relación con el público, confidencialidad y profesionalismo.' },
          ].map((item) => (
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
        <h2 className="text-2xl font-black text-white mb-6">Modalidades</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Users, t: 'Presencial', d: 'En nuestras aulas o in-company. Grupos de hasta 20 participantes con instructor certificado.' },
            { icon: BookOpen, t: 'E-learning (Zentinel)', d: 'Plataforma digital con contenido interactivo, evaluaciones y certificación. Acceso flexible 24/7.' },
            { icon: Award, t: 'Mixta', d: 'Contenido teórico en línea + práctica presencial. Ideal para organizaciones con personal distribuido.' },
          ].map((item) => {
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
