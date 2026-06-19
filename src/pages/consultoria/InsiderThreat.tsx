import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { AlertTriangle, Users, Shield, CheckCircle2 } from 'lucide-react';

const faqs = [
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
];

export default function InsiderThreat() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Insider Threat"
      badge="Amenaza Interna · Personal de Confianza"
      title="Gestión de Amenaza Interna (Insider Threat)"
      subtitle="Detección y control del riesgo proveniente del interior"
      intro="El riesgo más difícil de mitigar no viene de afuera — viene de personas con acceso legítimo. Diseñamos programas de detección y control de amenaza interna proporcionales al perfil de riesgo de cada organización: desde políticas y controles de acceso hasta protocolos de investigación interna y respuesta ante incidentes."
      faqs={faqs}
      accentColor="violet"
      related={[
        { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
        { label: 'Inteligencia y Análisis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
        { label: 'Concienciación Ejecutiva', href: '/consultoria/capacitacion/concienciacion-ejecutiva' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Vectores de amenaza interna</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: AlertTriangle, t: 'Empleado captado', d: 'Personal presionado o comprado por actores externos para filtrar información o facilitar acceso.' },
            { icon: Users, t: 'Empleado negligente', d: 'Errores no intencionales que exponen información o activos críticos. Tan peligroso como el acto deliberado.' },
            { icon: Shield, t: 'Ex-empleado descontento', d: 'Personal desvinculado que mantiene acceso residual o usa conocimiento interno para causar daño.' },
          ].map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-6">Componentes del programa</h2>
        <div className="space-y-3">
          {[
            { t: 'Evaluación de riesgo de personal crítico', d: 'Identificación de posiciones de alta confianza y su exposición a vectores de captación.' },
            { t: 'Políticas de control de acceso y segregación', d: 'Principio de mínimo privilegio: cada persona accede solo a lo que su función requiere.' },
            { t: 'Indicadores de alerta temprana (IOC)', d: 'Lista de comportamientos y patrones que señalan riesgo potencial de amenaza interna.' },
            { t: 'Protocolo de investigación interna', d: 'Proceso estructurado y legalmente sólido para investigar sospechas sin exponer a la organización.' },
            { t: 'Plan de offboarding seguro', d: 'Procedimiento de desvinculación que garantiza la revocación inmediata de accesos y la recuperación de activos.' },
          ].map((item) => (
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
