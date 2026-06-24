import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Radio, Clock, Users, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Centro de Mando CECOM',
    badge: 'CECOM · 24h · Coordinación Centralizada',
    title: 'Centro de Mando CECOM 24h',
    subtitle: 'Coordinación centralizada de seguridad — el diferenciador de alto valor',
    intro: 'El CECOM opera las 24 horas como el cerebro coordinador de toda la operación de seguridad de su organización. No solo recibe alertas — activa protocolos, coordina equipos en campo y mantiene visibilidad consolidada en tiempo real. Ninguna consultora de seguridad local en Venezuela ofrece esta capacidad.',
    faqs: [
      {
        q: '¿Qué es el CECOM y qué lo diferencia de un simple centro de monitoreo?',
        a: 'El CECOM (Centro de Mando) no solo monitorea — coordina. Integra las alertas de múltiples fuentes, activa los protocolos correctos, coordina la respuesta del personal en campo y mantiene el registro de toda la actividad. Un centro de monitoreo ve; el CECOM actúa.',
      },
      {
        q: '¿El CECOM opera las 24 horas incluyendo feriados y emergencias nacionales?',
        a: 'Sí. El CECOM opera ininterrumpidamente, incluyendo feriados nacionales, períodos de tensión social y emergencias. La operación continua no es un beneficio adicional — es el requisito base. Si el centro no opera 24/7, no es un centro de mando.',
      },
      {
        q: '¿Pueden distintas instalaciones o sedes conectarse al mismo CECOM?',
        a: 'Sí. El CECOM puede gestionar múltiples instalaciones simultáneamente: sedes corporativas, plantas, residencias ejecutivas, sucursales. Cada instalación tiene su propio protocolo de respuesta; el CECOM los coordina desde un punto único.',
      },
      {
        q: '¿Qué tipo de reporte recibe la dirección sobre la actividad del CECOM?',
        a: 'Reportes ejecutivos periódicos con estadísticas de alertas, tiempos de respuesta, incidentes gestionados y tendencias. Para la dirección general, el CECOM es invisible cuando funciona bien y visible cuando la información que provee evita un problema.',
      },
    ],
    functionsTitle: 'Funciones del CECOM',
    functions: [
      { icon: Radio, t: 'Coordinación en campo', d: 'Comunicación directa con personal de seguridad en todas las instalaciones. Respuesta coordinada, no aislada.' },
      { icon: Clock, t: 'Operación 24/7', d: 'Sin interrupciones. Feriados, emergencias nacionales, cortes eléctricos — el CECOM no se apaga.' },
      { icon: Users, t: 'Escalamiento de crisis', d: 'Activación inmediata de la cadena de mando ante eventos que superan la respuesta operativa estándar.' },
    ],
    differentiatorTitle: 'El diferenciador de mercado',
    differentiatorText: 'En Venezuela, la mayoría de los esquemas de seguridad privada se gestionan de forma reactiva: el guardia ve algo y llama. El CECOM invierte esa ecuación — el analista monitorea de forma continua y activa la respuesta antes de que el guardia necesite reaccionar.',
    differentiatorItems: [
      'Única consultora local con capacidad de Centro de Mando operativo 24/7',
      'Integración con múltiples instalaciones desde un punto único',
      'Respaldo energético y de conectividad ante interrupciones venezolanas',
      'Registro auditado de toda la actividad operacional',
      'Reportes ejecutivos periódicos para la dirección',
    ],
    related: [
      { label: 'Monitoreo en Tiempo Real', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
      { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Scoring de Seguridad', href: '/consultoria/tecnologia/scoring-de-seguridad' },
    ],
  },
  en: {
    breadcrumb: 'CECOM Command Center',
    badge: 'CECOM · 24h · Centralized Coordination',
    title: 'CECOM Command Center 24h',
    subtitle: 'Centralized security coordination — the high-value differentiator',
    intro: 'The CECOM operates 24 hours as the coordinating brain of your organization\'s entire security operation. It does not just receive alerts — it activates protocols, coordinates field teams and maintains consolidated real-time visibility. No local security consultancy in Venezuela offers this capability.',
    faqs: [
      {
        q: 'What is the CECOM and what sets it apart from a simple monitoring center?',
        a: 'The CECOM (Command Center) does not just monitor — it coordinates. It integrates alerts from multiple sources, activates the correct protocols, coordinates the response of field personnel and maintains a record of all activity. A monitoring center sees; the CECOM acts.',
      },
      {
        q: 'Does the CECOM operate 24 hours including national holidays and emergencies?',
        a: 'Yes. The CECOM operates continuously, including national holidays, periods of social tension and emergencies. Continuous operation is not an added benefit — it is the baseline requirement. If the center does not operate 24/7, it is not a command center.',
      },
      {
        q: 'Can different facilities or offices connect to the same CECOM?',
        a: 'Yes. The CECOM can manage multiple facilities simultaneously: corporate offices, plants, executive residences, branches. Each facility has its own response protocol; the CECOM coordinates them from a single point.',
      },
      {
        q: 'What kind of reporting does management receive on CECOM activity?',
        a: 'Periodic executive reports with alert statistics, response times, incidents managed and trends. For senior management, the CECOM is invisible when it works well and visible when the information it provides prevents a problem.',
      },
    ],
    functionsTitle: 'CECOM functions',
    functions: [
      { icon: Radio, t: 'Field coordination', d: 'Direct communication with security personnel at all facilities. Coordinated response, not isolated.' },
      { icon: Clock, t: '24/7 operation', d: 'No interruptions. Holidays, national emergencies, power outages — the CECOM never shuts down.' },
      { icon: Users, t: 'Crisis escalation', d: 'Immediate activation of the chain of command for events that exceed standard operational response.' },
    ],
    differentiatorTitle: 'The market differentiator',
    differentiatorText: 'In Venezuela, most private security schemes are managed reactively: the guard sees something and calls in. The CECOM reverses that equation — the analyst monitors continuously and activates the response before the guard needs to react.',
    differentiatorItems: [
      'The only local consultancy with a fully operational 24/7 Command Center capability',
      'Integration with multiple facilities from a single point',
      'Energy and connectivity redundancy for Venezuelan power and internet outages',
      'Audited log of all operational activity',
      'Periodic executive reports for management',
    ],
    related: [
      { label: 'Real-Time Monitoring', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
      { label: 'Crisis Management', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Security Scoring', href: '/consultoria/tecnologia/scoring-de-seguridad' },
    ],
  },
};

export default function CentroMandoCECOM() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.functionsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.functions.map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-4">{c.differentiatorTitle}</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{c.differentiatorText}</p>
        <div className="flex flex-col gap-2">
          {c.differentiatorItems.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
