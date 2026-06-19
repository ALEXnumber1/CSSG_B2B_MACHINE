import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Shield, Globe, Brain, RefreshCw } from 'lucide-react';

const cases = [
  {
    sector: 'Diplomático',
    icon: Globe,
    color: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
    reto: 'Misión del G7 requería reestructuración completa de su esquema de seguridad en Venezuela tras un cambio de sede.',
    enfoque: 'Security Risk Assessment de la nueva sede + diseño de protocolos alineados con estándares FCO + selección y verificación de personal local.',
    resultado: '+17 meses de operación sin incidentes. Misión superó auditoría interna de seguridad con calificación máxima.',
    confidencial: true,
  },
  {
    sector: 'Corporativo — Manufactura',
    icon: Shield,
    color: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
    reto: 'Empresa con planta en zona industrial de alto riesgo reportaba 3-4 incidentes menores por mes y costos de seguridad crecientes.',
    enfoque: 'Diagnóstico de madurez + site survey CPTED + rediseño del esquema operativo + implementación de monitoreo centralizado.',
    resultado: 'Reducción del 78% en incidentes en 6 meses. Optimización del 30% en costo de seguridad sin reducir cobertura.',
    confidencial: true,
  },
  {
    sector: 'Due Diligence — Fusión',
    icon: Brain,
    color: 'border-violet-500/30 bg-violet-500/5 text-violet-400',
    reto: 'Fondo de inversión evaluaba adquisición de empresa venezolana con 3 socios locales. Necesitaba verificación de antecedentes antes del cierre.',
    enfoque: 'Due diligence reforzado de los 3 socios: CICPC, SENIAT, IVSS, OSINT, investigación de vínculos con funcionarios públicos.',
    resultado: 'Se identificaron vínculos irregulares en uno de los socios. El fondo reestructuró los términos de la adquisición protegiendo $4.2M.',
    confidencial: true,
  },
  {
    sector: 'Continuidad — Sector Salud',
    icon: RefreshCw,
    color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
    reto: 'Clínica privada sin plan de continuidad ante cortes eléctricos frecuentes que afectaban quirófanos y área de cuidados intensivos.',
    enfoque: 'BIA + diseño de BCP específico para operaciones críticas de salud + plan energético + simulacro de activación.',
    resultado: 'Plan activado en 3 ocasiones durante el año siguiente. Operaciones críticas sin interrupción en los tres eventos.',
    confidencial: true,
  },
];

export default function CasosExito() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Casos de Éxito"
      badge="Resultados Reales · Clientes Reales"
      title="Casos de Éxito"
      subtitle="Reto → Enfoque → Resultado"
      intro="Estos son ejemplos representativos de proyectos completados. Los nombres y detalles identificatorios no se divulgan por acuerdo de confidencialidad con cada cliente. La identidad es lo único que protegemos — los resultados son reales."
      faqs={[
        {
          q: '¿Por qué no identifican a los clientes por nombre?',
          a: 'Porque la confidencialidad es una condición del servicio, no un beneficio adicional. Nuestros clientes confían en nosotros precisamente porque saben que sus operaciones de seguridad no aparecerán en ningún material de marketing. Los resultados son verificables bajo acuerdo de confidencialidad para clientes prospecto calificados.',
        },
        {
          q: '¿Pueden compartir referencias directas con clientes prospecto?',
          a: 'Sí, con autorización previa del cliente y bajo protocolo de confidencialidad. Para proyectos de alto valor, coordinamos referencias directas entre clientes actuales y prospectos calificados.',
        },
      ]}
      accentColor="sky"
      related={[
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
        { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
      ]}
    >
      <div className="space-y-6">
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={`p-7 rounded-3xl border ${c.color}`}>
              <div className="flex items-center gap-3 mb-5">
                <Icon className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">{c.sector}</span>
                <span className="ml-auto text-[10px] text-gray-600 font-bold uppercase tracking-widest">Confidencial</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Reto</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{c.reto}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Enfoque</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{c.enfoque}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.05]">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Resultado</p>
                  <p className="text-sm font-bold text-white leading-relaxed">{c.resultado}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ConsultoriaServiceLayout>
  );
}
