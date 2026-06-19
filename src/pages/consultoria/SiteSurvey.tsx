import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Eye, MapPin, Shield, CheckCircle2 } from 'lucide-react';

const areas = [
  { icon: MapPin, title: 'Perímetro y accesos externos', desc: 'Barreras físicas, puntos de entrada, visibilidad desde la vía pública, iluminación.' },
  { icon: Eye, title: 'Vigilancia y CCTV', desc: 'Cobertura de cámaras, ángulos ciegos, calidad de imagen, retención de grabaciones.' },
  { icon: Shield, title: 'Control de acceso interno', desc: 'Torniquetes, biometría, gestión de visitantes, segregación de zonas sensibles.' },
  { icon: CheckCircle2, title: 'Evaluación CPTED', desc: 'Crime Prevention Through Environmental Design: diseño del espacio como control de riesgo.' },
];

const faqs = [
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
];

export default function SiteSurvey() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Site Survey"
      badge="Evaluación Física · CPTED"
      title="Site Survey y Evaluación Física"
      subtitle="Inspección de instalaciones bajo metodología CPTED"
      intro="Inspeccionamos físicamente sus instalaciones — sede corporativa, planta, residencia ejecutiva o embajada — y evaluamos cada vector de vulnerabilidad tangible: perímetro, accesos, CCTV, iluminación, flujos de personas y diseño del espacio. Aplicamos la metodología CPTED para convertir el entorno físico en un control de riesgo activo."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Evaluación de Residencias', href: '/consultoria/evaluacion-residencias-cancillerias' },
        { label: 'Monitoreo en Tiempo Real', href: '/consultoria/tecnologia/monitoreo-tiempo-real' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Áreas de evaluación</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {areas.map((a) => {
            const Icon = a.icon;
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
        <h2 className="text-2xl font-black text-white mb-6">Entregables</h2>
        <div className="space-y-3">
          {[
            { t: 'Plano de riesgo de la instalación', d: 'Mapa de vulnerabilidades con código de color (crítico, moderado, bajo).' },
            { t: 'Informe fotográfico confidencial', d: 'Evidencia visual de cada hallazgo con descripción técnica y recomendación.' },
            { t: 'Plan de mejoras por etapas', d: 'Acciones organizadas por urgencia, costo estimado y tiempo de implementación.' },
            { t: 'Brief ejecutivo', d: 'Resumen de 2 páginas para presentar ante la dirección general o casa matriz.' },
          ].map((item) => (
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
        <h2 className="text-2xl font-black text-white mb-4">¿Cuándo es necesario?</h2>
        <div className="flex flex-col gap-2">
          {[
            'Al renovar o diseñar una instalación corporativa',
            'Antes de trasladar a un ejecutivo de alto perfil a una residencia',
            'Cuando existen preocupaciones por vigilancia no autorizada del perímetro',
            'Para verificar el cumplimiento de estándares de seguridad de casa matriz',
            'Al iniciar operaciones en una nueva sede en Venezuela',
          ].map((item) => (
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
