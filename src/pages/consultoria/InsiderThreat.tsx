import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { AlertTriangle, Users, Shield, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Insider Threat',
    badge: 'Amenaza Interna · Personal de Confianza',
    title: 'Gestión de Amenaza Interna (Insider Threat)',
    subtitle: 'Detección y control del riesgo proveniente del interior',
    intro: 'El riesgo más difícil de mitigar no viene de afuera — viene de personas con acceso legítimo. Diseñamos programas de detección y control de amenaza interna proporcionales al perfil de riesgo de cada organización: desde políticas y controles de acceso hasta protocolos de investigación interna y respuesta ante incidentes.',
    faqs: [
      {
        q: '¿Qué es la amenaza interna (insider threat) y por qué es crítica en Venezuela?',
        a: 'La amenaza interna proviene de personas con acceso legítimo a la organización — empleados, contratistas, ex-empleados — que aprovechan ese acceso para causar daño. En Venezuela, la presión económica amplifica el riesgo de captación de personal interno por parte de actores externos, haciendo que el insider threat sea uno de los vectores de riesgo más subestimados.',
      },
      {
        q: '¿Cómo se detecta una amenaza interna sin afectar la confianza del equipo?',
        a: 'Mediante controles que operan en segundo plano: auditorías de acceso, análisis de comportamiento en sistemas, revisión de registros de salida de información y verificaciones periódicas de personal de confianza. El objetivo es la detección temprana, no la vigilancia invasiva. CSSG diseña el programa para ser proporcional al riesgo.',
      },
      {
        q: '¿Cuál es la diferencia entre insider threat y due diligence de empleados?',
        a: 'La due diligence es preventiva (evalúa a alguien antes de contratarlo o promoverlo). El programa de insider threat es continuo (monitorea señales de alerta en personal ya incorporado). Ambos se complementan: la due diligence establece la línea base; el programa de insider threat detecta cambios de comportamiento o riesgo en el tiempo.',
      },
      {
        q: '¿Qué tamaño de organización necesita un programa de insider threat?',
        a: 'Cualquiera que tenga activos críticos que proteger: información confidencial, cuentas bancarias, acceso a instalaciones de alto valor o datos de clientes. No es un servicio solo para grandes corporaciones. Una empresa mediana con un solo empleado en posición de confianza puede necesitar controles proporcionales.',
      },
    ],
    vectorsTitle: 'Vectores de amenaza interna',
    vectors: [
      { icon: AlertTriangle, t: 'Empleado captado', d: 'Personal presionado o comprado por actores externos para filtrar información o facilitar acceso.' },
      { icon: Users, t: 'Empleado negligente', d: 'Errores no intencionales que exponen información o activos críticos. Tan peligroso como el acto deliberado.' },
      { icon: Shield, t: 'Ex-empleado descontento', d: 'Personal desvinculado que mantiene acceso residual o usa conocimiento interno para causar daño.' },
    ],
    componentsTitle: 'Componentes del programa',
    components: [
      { t: 'Evaluación de riesgo de personal crítico', d: 'Identificación de posiciones de alta confianza y su exposición a vectores de captación.' },
      { t: 'Políticas de control de acceso y segregación', d: 'Principio de mínimo privilegio: cada persona accede solo a lo que su función requiere.' },
      { t: 'Indicadores de alerta temprana (IOC)', d: 'Lista de comportamientos y patrones que señalan riesgo potencial de amenaza interna.' },
      { t: 'Protocolo de investigación interna', d: 'Proceso estructurado y legalmente sólido para investigar sospechas sin exponer a la organización.' },
      { t: 'Plan de offboarding seguro', d: 'Procedimiento de desvinculación que garantiza la revocación inmediata de accesos y la recuperación de activos.' },
    ],
    related: [
      { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Inteligencia y Análisis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
    ],
  },
  en: {
    breadcrumb: 'Insider Threat',
    badge: 'Insider Threat · Trusted Personnel',
    title: 'Insider Threat Management',
    subtitle: 'Detection and control of risk from within',
    intro: 'The hardest risk to mitigate does not come from outside — it comes from people with legitimate access. We design insider threat detection and control programs proportional to each organization\'s risk profile: from policies and access controls to internal investigation protocols and incident response.',
    faqs: [
      {
        q: 'What is insider threat and why is it critical in Venezuela?',
        a: 'Insider threat comes from people with legitimate access to the organization — employees, contractors, former employees — who exploit that access to cause harm. In Venezuela, economic pressure amplifies the risk of internal staff being recruited by external actors, making insider threat one of the most underestimated risk vectors.',
      },
      {
        q: 'How do you detect an insider threat without damaging team trust?',
        a: 'Through controls that operate in the background: access audits, behavioral analysis in systems, review of information export logs and periodic checks of trusted personnel. The goal is early detection, not invasive surveillance. CSSG designs the program to be proportional to the risk.',
      },
      {
        q: 'What is the difference between insider threat and employee due diligence?',
        a: 'Due diligence is preventive (assesses someone before hiring or promoting them). The insider threat program is continuous (monitors warning signals in already-onboarded staff). Both are complementary: due diligence establishes the baseline; the insider threat program detects behavioral changes or risk over time.',
      },
      {
        q: 'What size of organization needs an insider threat program?',
        a: 'Any organization that has critical assets to protect: confidential information, bank accounts, access to high-value facilities or client data. It is not a service only for large corporations. A mid-sized company with a single employee in a position of trust may need proportional controls.',
      },
    ],
    vectorsTitle: 'Insider threat vectors',
    vectors: [
      { icon: AlertTriangle, t: 'Recruited employee', d: 'Staff pressured or bought by external actors to leak information or facilitate access.' },
      { icon: Users, t: 'Negligent employee', d: 'Unintentional errors that expose critical information or assets. As dangerous as the deliberate act.' },
      { icon: Shield, t: 'Disgruntled former employee', d: 'Departed staff who retain residual access or use insider knowledge to cause harm.' },
    ],
    componentsTitle: 'Program components',
    components: [
      { t: 'Critical personnel risk assessment', d: 'Identification of high-trust positions and their exposure to recruitment vectors.' },
      { t: 'Access control and segregation policies', d: 'Principle of least privilege: each person accesses only what their role requires.' },
      { t: 'Early warning indicators (IOC)', d: 'List of behaviors and patterns that signal potential insider threat risk.' },
      { t: 'Internal investigation protocol', d: 'Structured, legally sound process for investigating suspicions without exposing the organization.' },
      { t: 'Secure offboarding plan', d: 'Departure procedure that guarantees immediate access revocation and asset recovery.' },
    ],
    related: [
      { label: 'Corporate Due Diligence', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Intelligence & Analysis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Executive Awareness', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
    ],
  },
};

export default function InsiderThreat() {
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
      accentColor="violet"
      related={c.related}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.vectorsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.vectors.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.componentsTitle}</h2>
        <div className="space-y-3">
          {c.components.map((item) => (
            <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
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
