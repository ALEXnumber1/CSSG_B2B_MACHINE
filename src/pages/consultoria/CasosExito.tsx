import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Shield, Globe, Brain, RefreshCw } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Casos de Éxito',
    badge: 'Resultados Reales · Clientes Reales',
    title: 'Casos de Éxito',
    subtitle: 'Reto → Enfoque → Resultado',
    intro: 'Estos son ejemplos representativos de proyectos completados. Los nombres y detalles identificatorios no se divulgan por acuerdo de confidencialidad con cada cliente. La identidad es lo único que protegemos — los resultados son reales.',
    faqs: [
      {
        q: '¿Por qué no identifican a los clientes por nombre?',
        a: 'Porque la confidencialidad es una condición del servicio, no un beneficio adicional. Nuestros clientes confían en nosotros precisamente porque saben que sus operaciones de seguridad no aparecerán en ningún material de marketing. Los resultados son verificables bajo acuerdo de confidencialidad para clientes prospecto calificados.',
      },
      {
        q: '¿Pueden compartir referencias directas con clientes prospecto?',
        a: 'Sí, con autorización previa del cliente y bajo protocolo de confidencialidad. Para proyectos de alto valor, coordinamos referencias directas entre clientes actuales y prospectos calificados.',
      },
    ],
    confidential: 'Confidencial',
    retoLabel: 'Reto',
    enfoqueLabel: 'Enfoque',
    resultadoLabel: 'Resultado',
    cases: [
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
    ],
    related: [
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Continuidad de Negocio', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
  en: {
    breadcrumb: 'Success Stories',
    badge: 'Real Results · Real Clients',
    title: 'Success Stories',
    subtitle: 'Challenge → Approach → Result',
    intro: 'These are representative examples of completed projects. Names and identifying details are not disclosed under confidentiality agreements with each client. Identity is the only thing we protect — the results are real.',
    faqs: [
      {
        q: 'Why don\'t you identify clients by name?',
        a: 'Because confidentiality is a condition of the service, not an added benefit. Our clients trust us precisely because they know that their security operations will not appear in any marketing material. Results are verifiable under a confidentiality agreement for qualified prospective clients.',
      },
      {
        q: 'Can you share direct references with prospective clients?',
        a: 'Yes, with prior client authorization and under a confidentiality protocol. For high-value projects, we coordinate direct references between current clients and qualified prospects.',
      },
    ],
    confidential: 'Confidential',
    retoLabel: 'Challenge',
    enfoqueLabel: 'Approach',
    resultadoLabel: 'Result',
    cases: [
      {
        sector: 'Diplomatic',
        icon: Globe,
        color: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-400',
        reto: 'G7 mission required a complete restructuring of its security scheme in Venezuela following a change of premises.',
        enfoque: 'Security Risk Assessment of the new premises + design of FCO-aligned protocols + selection and verification of local personnel.',
        resultado: '+17 months of operation without incidents. Mission passed internal security audit with maximum rating.',
        confidencial: true,
      },
      {
        sector: 'Corporate — Manufacturing',
        icon: Shield,
        color: 'border-sky-500/30 bg-sky-500/5 text-sky-400',
        reto: 'Company with a plant in a high-risk industrial zone was reporting 3–4 minor incidents per month and rising security costs.',
        enfoque: 'Maturity assessment + CPTED site survey + operational scheme redesign + implementation of centralized monitoring.',
        resultado: '78% reduction in incidents over 6 months. 30% optimization in security costs without reducing coverage.',
        confidencial: true,
      },
      {
        sector: 'Due Diligence — Merger',
        icon: Brain,
        color: 'border-violet-500/30 bg-violet-500/5 text-violet-400',
        reto: 'Investment fund was evaluating the acquisition of a Venezuelan company with 3 local partners. Background verification was needed before closing.',
        enfoque: 'Enhanced due diligence on all 3 partners: CICPC, SENIAT, IVSS, OSINT, investigation of links to public officials.',
        resultado: 'Irregular links were identified with one of the partners. The fund restructured the acquisition terms, protecting $4.2M.',
        confidencial: true,
      },
      {
        sector: 'Business Continuity — Healthcare',
        icon: RefreshCw,
        color: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
        reto: 'Private clinic with no continuity plan in the face of frequent power outages affecting operating theaters and intensive care units.',
        enfoque: 'BIA + design of a BCP specific to critical healthcare operations + energy plan + activation drill.',
        resultado: 'Plan activated 3 times during the following year. Critical operations uninterrupted across all three events.',
        confidencial: true,
      },
    ],
    related: [
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Corporate Due Diligence', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Business Continuity', href: '/consultoria/continuidad-de-negocio' },
    ],
  },
};

export default function CasosExito() {
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
      <div className="space-y-6">
        {c.cases.map((cs, i) => {
          const Icon = cs.icon;
          return (
            <div key={i} className={`p-7 rounded-3xl border ${cs.color}`}>
              <div className="flex items-center gap-3 mb-5">
                <Icon className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">{cs.sector}</span>
                <span className="ml-auto text-[10px] text-gray-600 font-bold uppercase tracking-widest">{c.confidential}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{c.retoLabel}</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{cs.reto}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{c.enfoqueLabel}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{cs.enfoque}</p>
                </div>
                <div className="pt-3 border-t border-white/[0.05]">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">{c.resultadoLabel}</p>
                  <p className="text-sm font-bold text-white leading-relaxed">{cs.resultado}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ConsultoriaServiceLayout>
  );
}
