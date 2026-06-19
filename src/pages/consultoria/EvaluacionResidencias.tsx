import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Home, Shield, Eye, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué incluye la evaluación de una residencia oficial o cancillería?',
    a: 'Inspección física del perímetro, accesos, sistemas de vigilancia, iluminación y puntos de vulnerabilidad. Revisión de protocolos de acceso para personal doméstico, visitas y proveedores. Análisis del entorno inmediato: vecindario, vías de escape, distancia a puntos de apoyo.',
  },
  {
    q: '¿Qué es la "regla de fotografía" que mencionan para estos proyectos?',
    a: 'En evaluaciones de residencias y cancillerías, la fotografía de las instalaciones es prerrogativa exclusiva del cliente. CSSG no retiene imágenes de las sedes evaluadas. El registro documental queda bajo custodia exclusiva de la misión.',
  },
  {
    q: '¿Pueden evaluar la seguridad de una residencia antes de que el titular se mude?',
    a: 'Sí, y es el momento ideal. Una evaluación preventiva permite identificar vulnerabilidades antes de la ocupación y definir las mejoras necesarias con tiempo para implementarlas. El costo de las mejoras preventivas es siempre menor al de una respuesta reactiva.',
  },
  {
    q: '¿Este servicio aplica solo a residencias diplomáticas o también a ejecutivos corporativos?',
    a: 'Aplica a ambos. Evaluamos residencias de jefes de misión, consejeros y personal prioritario de embajadas, así como residencias de CEO, directores regionales y ejecutivos de alto perfil de corporaciones internacionales con operaciones en Venezuela.',
  },
];

export default function EvaluacionResidencias() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Evaluación de Residencias"
      badge="Residencias Oficiales · Cancillerías · BP1"
      title="Evaluación de Residencias y Cancillerías"
      subtitle="Inspección de sedes residenciales y cancillerías diplomáticas"
      intro="Evaluamos la seguridad física de residencias oficiales, cancillerías y sedes de representación diplomática en Venezuela. La metodología es descriptiva y exhaustiva; la fotografía de las instalaciones es prerrogativa exclusiva del cliente. Sin excepciones."
      faqs={faqs}
      accentColor="indigo"
      related={[
        { label: 'Seguridad Diplomática', href: '/consultoria/seguridad-misiones-diplomaticas' },
        { label: 'Site Survey Físico', href: '/consultoria/site-survey-evaluacion-fisica' },
        { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Áreas evaluadas</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Home, t: 'Perímetro y accesos de la residencia', d: 'Muros, rejas, iluminación, cámaras, intercomunicadores, garaje y puntos de entrada secundarios.' },
            { icon: Eye, t: 'Vigilancia y cobertura CCTV', d: 'Ángulos ciegos, calidad de imagen, integración con centro de monitoreo.' },
            { icon: Shield, t: 'Protocolos de personal doméstico y visitas', d: 'Verificación de antecedentes, gestión de accesos, procedimientos ante incidentes.' },
            { icon: CheckCircle2, t: 'Análisis del entorno inmediato', d: 'Vecindario, vías de escape, tiempo de respuesta de apoyo, riesgos colindantes.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-indigo-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-indigo-500/20">
        <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Protocolo de confidencialidad</p>
        <p className="text-sm text-gray-400 leading-relaxed">
          Toda la documentación generada durante la evaluación — planos, notas, observaciones — se entrega exclusivamente al cliente y no se retiene en los archivos de CSSG. La fotografía de las instalaciones es prerrogativa del cliente; CSSG no documenta imágenes sin autorización expresa.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-black text-white mb-4">Perfiles de cliente</h2>
        <div className="flex flex-col gap-2">
          {[
            'Jefe de misión diplomática que llega a Venezuela o cambia de residencia',
            'Responsable de seguridad de embajada que evalúa nuevas opciones de alojamiento para el titular',
            'Director regional de corporación multinacional con traslado a Venezuela',
            'Director de seguridad corporativa que verifica estándares de las residencias del equipo directivo',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
