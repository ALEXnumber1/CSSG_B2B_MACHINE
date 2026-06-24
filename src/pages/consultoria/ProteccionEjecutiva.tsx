import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { User, Shield, Map, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTENT = {
  es: {
    breadcrumb: 'Protección Ejecutiva',
    badge: 'Threat Assessment · Executive Protection · BP4',
    title: 'Protección Ejecutiva — Análisis de Amenazas',
    subtitle: 'Componente consultivo del servicio de protección personal',
    intro: 'Evaluamos el perfil de amenaza específico de un ejecutivo o directivo en Venezuela y diseñamos las medidas de protección proporcionales a ese riesgo. No sobreprotegemos ni subestimamos — calibramos. El análisis es el paso previo al servicio operativo de protección personal.',
    faqs: [
      {
        q: '¿Qué es el análisis de amenazas para protección ejecutiva y en qué se diferencia del servicio operativo?',
        a: 'El análisis de amenazas es el componente consultivo: evalúa el perfil de riesgo específico de un ejecutivo (visibilidad pública, patrones de movimiento, exposición familiar, nivel de amenaza) y recomienda las medidas de protección proporcionales. El servicio operativo (Escudo Diplomático) ejecuta esas medidas. Primero se analiza, luego se actúa.',
      },
      {
        q: '¿Qué información se necesita para realizar el análisis de amenazas?',
        a: 'Perfil del ejecutivo (cargo, visibilidad pública, actividades fuera del horario laboral), rutas habituales, domicilio y sede de trabajo, historial de incidentes o amenazas previas. Toda la información es tratada con máxima confidencialidad bajo acuerdo previo.',
      },
      {
        q: '¿El análisis recomienda solo escoltas o también otras medidas?',
        a: 'El análisis es integral. Las recomendaciones pueden incluir: modificación de patrones de movimiento, seguridad residencial, vehículos blindados, protocolos de comunicación segura, medidas de ciberseguridad personal y, si es necesario, personal de acompañamiento. La escolta es solo una de las herramientas disponibles.',
      },
      {
        q: '¿Realizan el análisis para familias de ejecutivos también?',
        a: 'Sí. Para ejecutivos con familia en Venezuela, el análisis incluye la evaluación del perfil de riesgo de cónyuge e hijos: colegios, rutas, actividades extracurriculares. La familia suele ser el vector de amenaza más expuesto y el menos protegido.',
      },
    ],
    dimensionsTitle: 'Dimensiones del análisis de amenazas',
    dimensions: [
      { t: 'Perfil de exposición', d: 'Visibilidad pública, actividad en redes, posición en la organización, relaciones de negocios.' },
      { t: 'Análisis de patrones y rutas', d: 'Rutas habituales, horarios, locaciones frecuentes y zonas de vulnerabilidad geográfica.' },
      { t: 'Evaluación del entorno familiar', d: 'Perfil de riesgo del cónyuge, hijos, colegios y actividades fuera del hogar.' },
    ],
    deliverablesTitle: '¿Qué recibe el ejecutivo?',
    deliverables: [
      { t: 'Informe de perfil de amenaza', d: 'Evaluación del nivel de riesgo personal (Bajo / Moderado / Elevado / Crítico) con sustento.' },
      { t: 'Mapa de vulnerabilidades', d: 'Identificación de los momentos, rutas y locaciones de mayor exposición.' },
      { t: 'Plan de medidas proporcionales', d: 'Recomendaciones específicas ordenadas por prioridad e inversión requerida.' },
      { t: 'Brief para la familia', d: 'Versión simplificada del plan de seguridad para comunicar al cónyuge e hijos mayores.' },
    ],
    upsellLabel: 'Paso siguiente',
    upsellTitle: '¿Necesita el servicio operativo de protección?',
    upsellText: 'Si el análisis determina que se requiere acompañamiento personal, nuestro servicio Escudo Diplomático provee el componente operativo: personal de seguridad acompañante, vehículos y coordinación con Centro de Mando.',
    upsellCta: 'Conocer Escudo Diplomático',
    related: [
      { label: 'Gestión de Crisis', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Inteligencia y Análisis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Evaluación de Residencias', href: '/consultoria/evaluacion-residencias-cancillerias' },
    ],
  },
  en: {
    breadcrumb: 'Executive Protection',
    badge: 'Threat Assessment · Executive Protection · BP4',
    title: 'Executive Protection — Threat Analysis',
    subtitle: 'Advisory component of the personal protection service',
    intro: 'We assess the specific threat profile of an executive or senior officer in Venezuela and design protection measures proportional to that risk. We do not over-protect or underestimate — we calibrate. The analysis is the prerequisite step before the operational protection service.',
    faqs: [
      {
        q: 'What is threat analysis for executive protection and how does it differ from the operational service?',
        a: 'Threat analysis is the advisory component: it assesses the specific risk profile of an executive (public visibility, movement patterns, family exposure, threat level) and recommends proportional protection measures. The operational service (Escudo Diplomático) executes those measures. First we analyze, then we act.',
      },
      {
        q: 'What information is needed to conduct the threat analysis?',
        a: 'Executive profile (position, public visibility, activities outside working hours), usual routes, home and workplace address, history of previous incidents or threats. All information is handled with maximum confidentiality under a prior agreement.',
      },
      {
        q: 'Does the analysis only recommend escorts or also other measures?',
        a: 'The analysis is comprehensive. Recommendations may include: modification of movement patterns, residential security, armored vehicles, secure communication protocols, personal cybersecurity measures and, if necessary, escort personnel. An escort is just one of the available tools.',
      },
      {
        q: 'Do you also conduct the analysis for executives\' families?',
        a: 'Yes. For executives with family in Venezuela, the analysis includes assessing the risk profile of spouse and children: schools, routes, extracurricular activities. The family is typically the most exposed and least protected threat vector.',
      },
    ],
    dimensionsTitle: 'Threat analysis dimensions',
    dimensions: [
      { t: 'Exposure profile', d: 'Public visibility, social media activity, position in the organization, business relationships.' },
      { t: 'Pattern and route analysis', d: 'Usual routes, schedules, frequent locations and geographical vulnerability zones.' },
      { t: 'Family environment assessment', d: 'Risk profile of spouse, children, schools and activities outside the home.' },
    ],
    deliverablesTitle: 'What does the executive receive?',
    deliverables: [
      { t: 'Threat profile report', d: 'Assessment of personal risk level (Low / Moderate / Elevated / Critical) with substantiation.' },
      { t: 'Vulnerability map', d: 'Identification of the moments, routes and locations of greatest exposure.' },
      { t: 'Proportional measures plan', d: 'Specific recommendations ordered by priority and required investment.' },
      { t: 'Family brief', d: 'Simplified version of the security plan to communicate to spouse and older children.' },
    ],
    upsellLabel: 'Next step',
    upsellTitle: 'Do you need the operational protection service?',
    upsellText: 'If the analysis determines that personal escort is required, our Escudo Diplomático service provides the operational component: escort security personnel, vehicles and Command Center coordination.',
    upsellCta: 'Learn about Escudo Diplomático',
    related: [
      { label: 'Crisis Management', href: '/consultoria/gestion-de-crisis-y-respuesta' },
      { label: 'Intelligence & Analysis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Residence Assessment', href: '/consultoria/evaluacion-residencias-cancillerias' },
    ],
  },
};

const dimensionIcons = [User, Map, Shield];

export default function ProteccionEjecutiva() {
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
      accentColor="emerald"
      related={c.related}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.dimensionsTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.dimensions.map((item, idx) => {
            const Icon = dimensionIcons[idx];
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
        <h2 className="text-2xl font-black text-white mb-6">{c.deliverablesTitle}</h2>
        <div className="space-y-3">
          {c.deliverables.map((item) => (
            <div key={item.t} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-sky-900/20 border border-sky-500/30">
        <p className="text-xs font-black text-sky-400 uppercase tracking-widest mb-2">{c.upsellLabel}</p>
        <h3 className="text-base font-black text-white mb-2">{c.upsellTitle}</h3>
        <p className="text-sm text-gray-400 mb-4">{c.upsellText}</p>
        <Link
          to="/consultoria/escudo-diplomatico"
          className="inline-flex items-center gap-2 text-xs font-black text-sky-400 uppercase tracking-widest hover:gap-3 transition-all"
        >
          {c.upsellCta} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
