import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Eye, MapPin, Shield, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Site Survey',
    badge: 'Evaluación Física · CPTED',
    title: 'Site Survey y Evaluación Física',
    subtitle: 'Inspección de instalaciones bajo metodología CPTED',
    intro: 'Inspeccionamos físicamente sus instalaciones — sede corporativa, planta, residencia ejecutiva o embajada — y evaluamos cada vector de vulnerabilidad tangible: perímetro, accesos, CCTV, iluminación, flujos de personas y diseño del espacio. Aplicamos la metodología CPTED para convertir el entorno físico en un control de riesgo activo.',
    faqs: [
      {
        q: '¿Qué es un Site Survey de seguridad física?',
        a: 'Es una inspección estructurada de las instalaciones físicas de una organización para identificar vulnerabilidades en perímetros, accesos, iluminación, CCTV y procedimientos operacionales. El resultado es un informe con hallazgos y recomendaciones de mejora.',
      },
      {
        q: '¿Qué es CPTED y cómo se aplica en Venezuela?',
        a: 'CPTED (Crime Prevention Through Environmental Design) es un enfoque que usa el diseño del espacio físico para reducir oportunidades delictivas: iluminación, visibilidad natural, control de accesos y mantenimiento. En Venezuela se aplica con especial énfasis en barreras perimetrales y puntos de vulnerabilidad externos.',
      },
      {
        q: '¿Cuánto tiempo toma el site survey y requiere interrumpir operaciones?',
        a: 'Entre 1 y 3 días hábiles según el tamaño de las instalaciones. No interrumpe las operaciones normales. Se realizan en horario de trabajo para evaluar las condiciones reales de funcionamiento, no en condiciones artificiales.',
      },
      {
        q: '¿El site survey es previo o independiente al Security Risk Assessment?',
        a: 'Puede ser independiente o parte del Security Risk Assessment completo. Para organizaciones con múltiples sedes o inquietudes específicas sobre infraestructura física, realizamos el site survey de forma autónoma y luego integramos los hallazgos al assessment general si se requiere.',
      },
    ],
    areasTitle: 'Áreas de evaluación',
    areas: [
      { title: 'Perímetro y accesos externos', desc: 'Barreras físicas, puntos de entrada, visibilidad desde la vía pública, iluminación.' },
      { title: 'Vigilancia y CCTV', desc: 'Cobertura de cámaras, ángulos ciegos, calidad de imagen, retención de grabaciones.' },
      { title: 'Control de acceso interno', desc: 'Torniquetes, biometría, gestión de visitantes, segregación de zonas sensibles.' },
      { title: 'Evaluación CPTED', desc: 'Crime Prevention Through Environmental Design: diseño del espacio como control de riesgo.' },
    ],
    deliverablesTitle: 'Entregables',
    deliverables: [
      { t: 'Plano de riesgo de la instalación', d: 'Mapa de vulnerabilidades con código de color (crítico, moderado, bajo).' },
      { t: 'Informe fotográfico confidencial', d: 'Evidencia visual de cada hallazgo con descripción técnica y recomendación.' },
      { t: 'Plan de mejoras por etapas', d: 'Acciones organizadas por urgencia, costo estimado y tiempo de implementación.' },
      { t: 'Brief ejecutivo', d: 'Resumen de 2 páginas para presentar ante la dirección general o casa matriz.' },
    ],
    whenTitle: '¿Cuándo es necesario?',
    whenItems: [
      'Al renovar o diseñar una instalación corporativa',
      'Antes de trasladar a un ejecutivo de alto perfil a una residencia',
      'Cuando existen preocupaciones por vigilancia no autorizada del perímetro',
      'Para verificar el cumplimiento de estándares de seguridad de casa matriz',
      'Al iniciar operaciones en una nueva sede en Venezuela',
    ],
    related: [
      { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Evaluación de Residencias', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Monitoreo en Tiempo Real', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
    ],
  },
  en: {
    breadcrumb: 'Site Survey',
    badge: 'Physical Assessment · CPTED',
    title: 'Site Survey and Physical Assessment',
    subtitle: 'Facility inspection under CPTED methodology',
    intro: 'We physically inspect your facilities — corporate headquarters, plant, executive residence or embassy — and evaluate every tangible vulnerability vector: perimeter, access points, CCTV, lighting, people flows and space design. We apply CPTED methodology to turn the physical environment into an active risk control.',
    faqs: [
      {
        q: 'What is a physical security site survey?',
        a: 'It is a structured inspection of an organization\'s physical facilities to identify vulnerabilities in perimeters, access points, lighting, CCTV and operational procedures. The result is a report with findings and improvement recommendations.',
      },
      {
        q: 'What is CPTED and how is it applied in Venezuela?',
        a: 'CPTED (Crime Prevention Through Environmental Design) is an approach that uses physical space design to reduce criminal opportunities: lighting, natural visibility, access control and maintenance. In Venezuela it is applied with special emphasis on perimeter barriers and external vulnerability points.',
      },
      {
        q: 'How long does the site survey take and does it require interrupting operations?',
        a: 'Between 1 and 3 business days depending on the size of the facilities. It does not interrupt normal operations. Surveys are conducted during working hours to evaluate real operating conditions, not artificial ones.',
      },
      {
        q: 'Is the site survey prior to or independent of the Security Risk Assessment?',
        a: 'It can be independent or part of the full Security Risk Assessment. For organizations with multiple locations or specific concerns about physical infrastructure, we conduct the site survey autonomously and then integrate the findings into the general assessment if required.',
      },
    ],
    areasTitle: 'Assessment areas',
    areas: [
      { title: 'Perimeter and external access', desc: 'Physical barriers, entry points, visibility from public roads, lighting.' },
      { title: 'Surveillance and CCTV', desc: 'Camera coverage, blind spots, image quality, recording retention.' },
      { title: 'Internal access control', desc: 'Turnstiles, biometrics, visitor management, sensitive zone segregation.' },
      { title: 'CPTED assessment', desc: 'Crime Prevention Through Environmental Design: space design as risk control.' },
    ],
    deliverablesTitle: 'Deliverables',
    deliverables: [
      { t: 'Facility risk map', d: 'Vulnerability map with color coding (critical, moderate, low).' },
      { t: 'Confidential photographic report', d: 'Visual evidence of each finding with technical description and recommendation.' },
      { t: 'Phased improvement plan', d: 'Actions organized by urgency, estimated cost and implementation time.' },
      { t: 'Executive brief', d: '2-page summary for presentation to senior management or headquarters.' },
    ],
    whenTitle: 'When is it necessary?',
    whenItems: [
      'When renovating or designing a corporate facility',
      'Before relocating a high-profile executive to a residence',
      'When there are concerns about unauthorized perimeter surveillance',
      'To verify compliance with headquarters security standards',
      'When starting operations at a new location in Venezuela',
    ],
    related: [
      { label: 'Risk Assessment', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
      { label: 'Residence Assessment', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Real-Time Monitoring', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
    ],
  },
};

const areaIcons = [MapPin, Eye, Shield, CheckCircle2];

export default function SiteSurvey() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.areasTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.areas.map((a, idx) => {
            const Icon = areaIcons[idx];
            return (
              <div key={a.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{a.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
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
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-white">{item.t}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-4">{c.whenTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.whenItems.map((item) => (
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
