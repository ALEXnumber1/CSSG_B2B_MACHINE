import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { Search, FileText, AlertTriangle, CheckCircle2, FileDown, ArrowRight } from 'lucide-react';

const levels = [
  {
    name: 'Básico',
    color: 'border-sky-500/40 bg-sky-500/5',
    badge: 'text-sky-400',
    checks: ['Antecedentes penales CICPC', 'Solvencia SENIAT', 'Verificación de identidad', 'Referencias laborales básicas'],
    time: '2–3 días hábiles',
    ideal: 'Empleados operativos y personal de confianza',
  },
  {
    name: 'Estándar',
    color: 'border-violet-500/40 bg-violet-500/5',
    badge: 'text-violet-400',
    checks: ['Todo lo del nivel Básico', 'Solvencia IVSS / INPSASEL', 'Historial de litigios y casos judiciales', 'Verificación de afiliaciones y vínculos', 'OSINT de redes sociales y medios'],
    time: '5–7 días hábiles',
    ideal: 'Cargos gerenciales, socios comerciales, proveedores críticos',
  },
  {
    name: 'Reforzado',
    color: 'border-emerald-500/40 bg-emerald-500/5',
    badge: 'text-emerald-400',
    checks: ['Todo lo del nivel Estándar', 'Investigación de conflictos de interés', 'Análisis de vínculos con funcionarios públicos', 'Verificación internacional (si aplica)', 'Entrevistas con referencias extendidas', 'Informe narrativo por inducción'],
    time: '10–15 días hábiles',
    ideal: 'Directivos, socios estratégicos, fusiones y adquisiciones, inversiones',
  },
];

const faqs = [
  {
    q: '¿Qué verifica el CICPC en una due diligence en Venezuela?',
    a: 'El CICPC (Cuerpo de Investigaciones Científicas, Penales y Criminalísticas) es la fuente autorizada de antecedentes penales en Venezuela. Verifica la existencia de causas abiertas, condenas y órdenes de aprehensión. Es el punto de partida de cualquier due diligence corporativa seria.',
  },
  {
    q: '¿Qué es la "escritura por inducción" que usan en los informes?',
    a: 'Es una metodología de redacción que presenta los hallazgos como evidencias que conducen a una conclusión, sin hacer acusaciones directas. Permite al lector llegar a la misma conclusión que el analista basándose en los hechos documentados. Es especialmente importante en contextos legalmente sensibles como Venezuela.',
  },
  {
    q: '¿Qué pasa si encuentran hallazgos sensibles durante la investigación?',
    a: 'Los hallazgos se reportan al cliente de forma confidencial y ordenada. CSSG no contacta ni alerta a la persona investigada. El cliente decide cómo actuar con la información. Nuestro rol es proveer inteligencia; el de acción es del cliente.',
  },
  {
    q: '¿La due diligence corporativa cubre también empresas, no solo personas?',
    a: 'Sí. Verificamos personas naturales (empleados, socios, directivos) y personas jurídicas (empresas proveedoras, socios comerciales, contrapartes en transacciones). Para empresas incluimos verificación de RIF, Registro Mercantil, solvencias tributarias y verificación de vinculaciones con empresas del Estado.',
  },
  {
    q: '¿Cuánto tiempo toma y qué información necesitan para iniciar?',
    a: 'Depende del nivel contratado: entre 2 y 15 días hábiles. Para iniciar necesitamos nombre completo y número de cédula (o RIF para empresas). Toda comunicación ocurre por canales seguros acordados con el cliente.',
  },
];

export default function DueDiligence() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Due Diligence Corporativa"
      badge="CICPC · SENIAT · IVSS · OSINT"
      title="Due Diligence Corporativa en Venezuela"
      subtitle="Verificación de personas y empresas — tres niveles de profundidad"
      intro="Verificamos el perfil real de personas y empresas en Venezuela — antes de contratar, asociar o invertir. Cruzamos fuentes judiciales (CICPC), tributarias (SENIAT, IVSS, INPSASEL), registrales y de inteligencia abierta para construir un cuadro de riesgo objetivo. Presentamos los hallazgos mediante escritura por inducción: evidencias que llevan al cliente a su propia conclusión."
      faqs={faqs}
      accentColor="violet"
      related={[
        { label: 'Inteligencia y Análisis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
        { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Tres niveles de investigación</h2>
        <div className="space-y-4">
          {levels.map((level) => (
            <div key={level.name} className={`p-6 rounded-2xl border ${level.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-base font-black uppercase tracking-widest ${level.badge}`}>{level.name}</h3>
                <span className="text-xs text-gray-600 font-bold">{level.time}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                {level.checks.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3 h-3 text-gray-600 shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest border-t border-white/[0.04] pt-3 mt-3">
                Ideal para: {level.ideal}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Fuentes de verificación</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Search, t: 'CICPC', d: 'Antecedentes penales, causas abiertas, órdenes de aprehensión.' },
            { icon: FileText, t: 'SENIAT · IVSS · INPSASEL', d: 'Solvencias tributarias y parafiscales. Obligatorio para proveedores del Estado.' },
            { icon: AlertTriangle, t: 'OSINT + Medios', d: 'Inteligencia de fuentes abiertas: redes sociales, medios digitales, registros públicos.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <Icon className="w-5 h-5 text-violet-400 mb-3" />
                <h4 className="text-sm font-black text-white mb-1">{item.t}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">Casos de uso frecuentes</h2>
        <div className="flex flex-col gap-2">
          {[
            'Incorporación de directivos, gerentes o personal de confianza',
            'Selección de socios comerciales o joint ventures',
            'Due diligence pre-adquisición o pre-inversión en Venezuela',
            'Verificación de proveedores para contratos de alto valor',
            'Investigación de posibles conflictos de interés en la organización',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WHITE PAPER CTA */}
      <div className="mb-12 p-8 rounded-3xl border border-yellow-500/30 bg-yellow-500/5">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
            <FileDown className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <p className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest mb-1">White Paper Gratuito</p>
            <h3 className="text-lg font-black text-white">Due Diligence Corporativa en Venezuela: Protocolo de Investigación 2026</h3>
            <p className="text-sm text-gray-500 mt-1">Protocolo completo con fuentes CICPC, SENIAT, IVSS, OSINT y metodología de escritura por inducción para el contexto venezolano.</p>
          </div>
        </div>
        <Link to="/white-papers/due-diligence-corporativa-venezuela" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all">
          Descargar Gratis <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
