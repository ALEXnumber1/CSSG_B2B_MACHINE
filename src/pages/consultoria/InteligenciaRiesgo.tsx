import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Brain, Globe, TrendingUp, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué cubre el análisis de inteligencia de riesgo en Venezuela?',
    a: 'Cubre tres dimensiones: entorno político-operacional (estabilidad institucional, riesgos regulatorios, conflictividad social), entorno delictivo (patrones geográficos, modus operandi, tendencias), y entorno geopolítico (sanciones internacionales, relaciones con socios estratégicos, impacto en operaciones). El análisis se calibra al sector y tipo de activo del cliente.',
  },
  {
    q: '¿Con qué frecuencia se actualiza el análisis de entorno?',
    a: 'Depende del nivel de servicio contratado. Ofrecemos análisis puntuales (one-shot para decisiones de inversión o entrada al mercado), análisis trimestrales (actualizaciones periódicas del perfil de riesgo) y briefings ejecutivos mensuales para organizaciones con exposición continua en Venezuela.',
  },
  {
    q: '¿En qué se diferencia la inteligencia de riesgo del análisis de riesgo tradicional?',
    a: 'El análisis de riesgo tradicional examina el estado actual de las vulnerabilidades. La inteligencia de riesgo es prospectiva: identifica señales tempranas de deterioro, anticipa escenarios y recomienda acciones preventivas antes de que los riesgos se materialicen. La diferencia es la anticipación.',
  },
  {
    q: '¿Pueden hacer análisis para decisiones de inversión o entrada al mercado venezolano?',
    a: 'Sí. Es uno de los usos más frecuentes de este servicio. Inversores, fondos y empresas que evalúan Venezuela como destino de capital contratan análisis específicos que responden: ¿Es el momento adecuado? ¿Cuál es el perfil real de riesgo? ¿Qué sectores presentan mejor relación riesgo-oportunidad?',
  },
];

export default function InteligenciaRiesgo() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Inteligencia y Análisis"
      badge="OSINT · Geopolítica · Análisis Operacional"
      title="Inteligencia y Análisis de Riesgo en Venezuela"
      subtitle="Prospectiva estratégica para decisiones de alto impacto"
      intro="Convertimos el entorno venezolano — político, delictivo, geopolítico — en inteligencia accionable para su organización. Aplicamos OSINT estructurado, análisis de señales tempranas y modelado de escenarios para anticipar riesgos antes de que se materialicen. El resultado no es un informe de lo que ya ocurrió; es una guía de lo que puede ocurrir y cómo prepararse."
      faqs={faqs}
      accentColor="violet"
      related={[
        { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
        { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
        { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Dimensiones del análisis</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Globe, t: 'Entorno político-operacional', d: 'Estabilidad institucional, riesgos regulatorios, conflictividad social, impacto en operaciones.' },
            { icon: Brain, t: 'Entorno delictivo y de seguridad', d: 'Patrones geográficos de criminalidad, modus operandi, tendencias y zonas de exposición.' },
            { icon: TrendingUp, t: 'Entorno geopolítico', d: 'Sanciones internacionales, relaciones bilaterales, impacto en cadenas de suministro y acceso a divisas.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 transition-all">
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
        <h2 className="text-2xl font-black text-white mb-6">Formatos de entrega</h2>
        <div className="space-y-3">
          {[
            { t: 'Análisis puntual (one-shot)', d: 'Informe completo para una decisión específica: entrada al mercado, inversión, relocalización.' },
            { t: 'Briefing ejecutivo trimestral', d: 'Actualización periódica del perfil de riesgo Venezuela con foco en cambios relevantes para su sector.' },
            { t: 'Alerta temprana', d: 'Notificación inmediata ante eventos que pueden impactar la seguridad operacional de su organización.' },
            { t: 'Informe sectorial', d: 'Análisis de riesgo específico por industria: salud, energía, financiero, diplomático, retail, manufactura.' },
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
