import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Activity, Bell, Shield, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué significa "monitoreo consolidado en tiempo real" para una organización?',
    a: 'Significa que todas las fuentes de alerta de su instalación — cámaras, accesos, sensores, rondas del personal — alimentan un único punto de visibilidad operado por analistas especializados las 24 horas. Usted no gestiona sistemas separados; recibe una vista consolidada de su estado de seguridad en todo momento.',
  },
  {
    q: '¿Cómo se integra el monitoreo con el personal de seguridad en sitio?',
    a: 'El Centro de Mando recibe las alertas, las evalúa y coordina la respuesta con el personal en sitio. La coordinación es inmediata: radio, llamada o protocolo predefinido según la naturaleza del evento. El personal en campo nunca opera aislado.',
  },
  {
    q: '¿El monitoreo funciona durante cortes eléctricos o fallas de internet?',
    a: 'Sí. La capacidad de monitoreo está diseñada con redundancias: respaldo energético, conectividad alternativa y procedimientos de operación degradada documentados. Los cortes eléctricos en Venezuela son una variable de diseño, no una excepción.',
  },
  {
    q: '¿Se puede iniciar con monitoreo y agregar otras capacidades después?',
    a: 'Exactamente así es como recomendamos hacerlo. El monitoreo en tiempo real es la base; las demás capacidades (scoring, analítica, integración de sistemas) se agregan progresivamente según las necesidades de la organización.',
  },
];

export default function MonitoreoTiempoReal() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Monitoreo en Tiempo Real"
      badge="CECOM · Visibilidad Consolidada · 24/7"
      title="Monitoreo en Tiempo Real"
      subtitle="Visibilidad consolidada del estado de seguridad — sin brechas"
      intro="Integramos todas las fuentes de alerta de su instalación en un único punto de visibilidad operado por analistas especializados las 24 horas. Usted no gestiona sistemas separados ni supervisa cámaras manualmente — recibe una vista consolidada y respuesta coordinada ante cualquier evento, en cualquier momento."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Centro de Mando CECOM', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
        { label: 'Scoring de Seguridad', href: '/consultoria/tecnologia/scoring-de-seguridad' },
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Capacidades de monitoreo</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Activity, t: 'Visibilidad en tiempo real', d: 'Estado actualizado segundo a segundo de todos los puntos de control de su instalación.' },
            { icon: Bell, t: 'Alertas tempranas', d: 'Detección de anomalías antes de que escalen a incidentes. El sistema alerta, el analista decide.' },
            { icon: Shield, t: 'Coordinación de respuesta', d: 'Activación inmediata del protocolo correspondiente y coordinación del equipo de respuesta.' },
          ].map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-4">Redundancias para el entorno venezolano</h2>
        <div className="flex flex-col gap-2">
          {[
            'Respaldo energético ante cortes eléctricos extendidos',
            'Conectividad alternativa ante fallas de internet o cable',
            'Procedimientos de operación degradada documentados',
            'Comunicación por radio como respaldo al sistema digital',
            'Registro histórico de eventos con trazabilidad auditada',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-sky-500/20">
        <p className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">Nota de producto</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          La capacidad de monitoreo opera sobre infraestructura tecnológica especializada. CSSG no divulga detalles de arquitectura ni de producto en material público. Si desea conocer la especificación técnica completa, solicite una reunión de consultoría.
        </p>
      </div>
    </ConsultoriaServiceLayout>
  );
}
