import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Activity, Bell, Shield, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Monitoreo en Tiempo Real',
    badge: 'CECOM · Visibilidad Consolidada · 24/7',
    title: 'Monitoreo en Tiempo Real',
    subtitle: 'Visibilidad consolidada del estado de seguridad — sin brechas',
    intro: 'Integramos todas las fuentes de alerta de su instalación en un único punto de visibilidad operado por analistas especializados las 24 horas. Usted no gestiona sistemas separados ni supervisa cámaras manualmente — recibe una vista consolidada y respuesta coordinada ante cualquier evento, en cualquier momento.',
    faqs: [
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
    ],
    capabilities: [
      { t: 'Visibilidad en tiempo real', d: 'Estado actualizado segundo a segundo de todos los puntos de control de su instalación.' },
      { t: 'Alertas tempranas', d: 'Detección de anomalías antes de que escalen a incidentes. El sistema alerta, el analista decide.' },
      { t: 'Coordinación de respuesta', d: 'Activación inmediata del protocolo correspondiente y coordinación del equipo de respuesta.' },
    ],
    capabilitiesTitle: 'Capacidades de monitoreo',
    redundanciesTitle: 'Redundancias para el entorno venezolano',
    redundancies: [
      'Respaldo energético ante cortes eléctricos extendidos',
      'Conectividad alternativa ante fallas de internet o cable',
      'Procedimientos de operación degradada documentados',
      'Comunicación por radio como respaldo al sistema digital',
      'Registro histórico de eventos con trazabilidad auditada',
    ],
    noteLabel: 'Nota de producto',
    noteText: 'La capacidad de monitoreo opera sobre infraestructura tecnológica especializada. CSSG no divulga detalles de arquitectura ni de producto en material público. Si desea conocer la especificación técnica completa, solicite una reunión de consultoría.',
    related: [
      { label: 'Centro de Mando CECOM', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
      { label: 'Scoring de Seguridad', href: '/consultoria/tecnologia/scoring-de-seguridad' },
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
    ],
  },
  en: {
    breadcrumb: 'Real-Time Monitoring',
    badge: 'CECOM · Consolidated Visibility · 24/7',
    title: 'Real-Time Monitoring',
    subtitle: 'Consolidated visibility of your security posture — no gaps',
    intro: 'We integrate all alert sources from your facility into a single visibility point operated by specialized analysts around the clock. You do not manage separate systems or manually supervise cameras — you receive a consolidated view and coordinated response to any event, at any time.',
    faqs: [
      {
        q: 'What does "consolidated real-time monitoring" mean for an organization?',
        a: 'It means all alert sources at your facility — cameras, access points, sensors, security rounds — feed into a single visibility point operated by specialized analysts 24 hours a day. You do not manage separate systems; you receive a consolidated view of your security status at all times.',
      },
      {
        q: 'How is monitoring integrated with on-site security personnel?',
        a: 'The Command Center receives alerts, evaluates them, and coordinates the response with on-site personnel. Coordination is immediate: radio, call, or predefined protocol according to the nature of the event. Field personnel never operate in isolation.',
      },
      {
        q: 'Does monitoring work during power outages or internet failures?',
        a: 'Yes. The monitoring capability is designed with redundancies: power backup, alternative connectivity and documented degraded operation procedures. Power outages in Venezuela are a design variable, not an exception.',
      },
      {
        q: 'Can we start with monitoring and add other capabilities later?',
        a: 'That is exactly how we recommend it. Real-time monitoring is the foundation; other capabilities (scoring, analytics, system integration) are added progressively according to the organization\'s needs.',
      },
    ],
    capabilities: [
      { t: 'Real-time visibility', d: 'Second-by-second updated status of all control points at your facility.' },
      { t: 'Early warning alerts', d: 'Detection of anomalies before they escalate to incidents. The system alerts, the analyst decides.' },
      { t: 'Response coordination', d: 'Immediate activation of the corresponding protocol and coordination of the response team.' },
    ],
    capabilitiesTitle: 'Monitoring capabilities',
    redundanciesTitle: 'Redundancies for the Venezuelan environment',
    redundancies: [
      'Power backup for extended electrical outages',
      'Alternative connectivity for internet or cable failures',
      'Documented degraded operation procedures',
      'Radio communication as backup to the digital system',
      'Audited historical event record with full traceability',
    ],
    noteLabel: 'Product Note',
    noteText: 'The monitoring capability operates on specialized technology infrastructure. CSSG does not disclose architecture or product details in public material. If you wish to know the full technical specification, please request a consulting meeting.',
    related: [
      { label: 'CECOM Command Center', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
      { label: 'Security Scoring', href: '/consultoria/tecnologia/scoring-de-seguridad' },
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
    ],
  },
};

export default function MonitoreoTiempoReal() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.capabilitiesTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.capabilities.map((item, idx) => {
            const Icon = [Activity, Bell, Shield][idx];
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
        <h2 className="text-2xl font-black text-white mb-4">{c.redundanciesTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.redundancies.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-sky-500/20">
        <p className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">{c.noteLabel}</p>
        <p className="text-sm text-gray-400 leading-relaxed">{c.noteText}</p>
      </div>
    </ConsultoriaServiceLayout>
  );
}
