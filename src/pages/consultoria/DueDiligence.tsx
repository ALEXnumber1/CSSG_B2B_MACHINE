import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Link } from 'react-router-dom';
import { Search, FileText, AlertTriangle, CheckCircle2, FileDown, ArrowRight } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Due Diligence Corporativa',
    badge: 'CICPC · SENIAT · IVSS · OSINT',
    title: 'Due Diligence Corporativa en Venezuela',
    subtitle: 'Verificación de personas y empresas — tres niveles de profundidad',
    intro: 'Verificamos el perfil real de personas y empresas en Venezuela — antes de contratar, asociar o invertir. Cruzamos fuentes judiciales (CICPC), tributarias (SENIAT, IVSS, INPSASEL), registrales y de inteligencia abierta para construir un cuadro de riesgo objetivo. Presentamos los hallazgos mediante escritura por inducción: evidencias que llevan al cliente a su propia conclusión.',
    faqs: [
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
    ],
    levelsTitle: 'Tres niveles de investigación',
    levels: [
      {
        name: 'Básico',
        color: 'border-sky-500/40 bg-sky-500/5',
        badge: 'text-sky-400',
        checks: ['Antecedentes penales CICPC', 'Solvencia SENIAT', 'Verificación de identidad', 'Referencias laborales básicas'],
        time: '2–3 días hábiles',
        idealLabel: 'Ideal para',
        ideal: 'Empleados operativos y personal de confianza',
      },
      {
        name: 'Estándar',
        color: 'border-violet-500/40 bg-violet-500/5',
        badge: 'text-violet-400',
        checks: ['Todo lo del nivel Básico', 'Solvencia IVSS / INPSASEL', 'Historial de litigios y casos judiciales', 'Verificación de afiliaciones y vínculos', 'OSINT de redes sociales y medios'],
        time: '5–7 días hábiles',
        idealLabel: 'Ideal para',
        ideal: 'Cargos gerenciales, socios comerciales, proveedores críticos',
      },
      {
        name: 'Reforzado',
        color: 'border-emerald-500/40 bg-emerald-500/5',
        badge: 'text-emerald-400',
        checks: ['Todo lo del nivel Estándar', 'Investigación de conflictos de interés', 'Análisis de vínculos con funcionarios públicos', 'Verificación internacional (si aplica)', 'Entrevistas con referencias extendidas', 'Informe narrativo por inducción'],
        time: '10–15 días hábiles',
        idealLabel: 'Ideal para',
        ideal: 'Directivos, socios estratégicos, fusiones y adquisiciones, inversiones',
      },
    ],
    sourcesTitle: 'Fuentes de verificación',
    sources: [
      { icon: Search, t: 'CICPC', d: 'Antecedentes penales, causas abiertas, órdenes de aprehensión.' },
      { icon: FileText, t: 'SENIAT · IVSS · INPSASEL', d: 'Solvencias tributarias y parafiscales. Obligatorio para proveedores del Estado.' },
      { icon: AlertTriangle, t: 'OSINT + Medios', d: 'Inteligencia de fuentes abiertas: redes sociales, medios digitales, registros públicos.' },
    ],
    useCasesTitle: 'Casos de uso frecuentes',
    useCases: [
      'Incorporación de directivos, gerentes o personal de confianza',
      'Selección de socios comerciales o joint ventures',
      'Due diligence pre-adquisición o pre-inversión en Venezuela',
      'Verificación de proveedores para contratos de alto valor',
      'Investigación de posibles conflictos de interés en la organización',
    ],
    ctaWhitePaperLabel: 'White Paper Gratuito',
    ctaWhitePaperTitle: 'Due Diligence Corporativa en Venezuela: Protocolo de Investigación 2026',
    ctaWhitePaperDesc: 'Protocolo completo con fuentes CICPC, SENIAT, IVSS, OSINT y metodología de escritura por inducción para el contexto venezolano.',
    ctaWhitePaperBtn: 'Descargar Gratis',
    related: [
      { label: 'Inteligencia y Análisis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
  en: {
    breadcrumb: 'Corporate Due Diligence',
    badge: 'CICPC · SENIAT · IVSS · OSINT',
    title: 'Corporate Due Diligence in Venezuela',
    subtitle: 'Verification of individuals and companies — three levels of depth',
    intro: 'We verify the real profile of individuals and companies in Venezuela — before hiring, partnering or investing. We cross-reference judicial (CICPC), tax (SENIAT, IVSS, INPSASEL), registral and open-source intelligence to build an objective risk picture. Findings are presented using inductive writing: evidence that leads the client to their own conclusion.',
    faqs: [
      {
        q: 'What does CICPC verify in a due diligence in Venezuela?',
        a: 'CICPC (Scientific, Criminal and Criminalistics Investigations Corps) is the authoritative source of criminal records in Venezuela. It verifies the existence of open cases, convictions and arrest warrants. It is the starting point of any serious corporate due diligence.',
      },
      {
        q: 'What is the "inductive writing" methodology used in your reports?',
        a: 'It is a writing methodology that presents findings as evidence leading to a conclusion, without making direct accusations. It allows the reader to reach the same conclusion as the analyst based on documented facts. It is especially important in legally sensitive contexts like Venezuela.',
      },
      {
        q: 'What happens if sensitive findings are discovered during the investigation?',
        a: 'Findings are reported to the client confidentially and in an organized manner. CSSG does not contact or alert the person being investigated. The client decides how to act on the information. Our role is to provide intelligence; the action role belongs to the client.',
      },
      {
        q: 'Does corporate due diligence also cover companies, not just individuals?',
        a: 'Yes. We verify natural persons (employees, partners, executives) and legal entities (supplier companies, business partners, transaction counterparties). For companies we include RIF verification, Mercantile Registry, tax clearances and verification of links to state-owned enterprises.',
      },
      {
        q: 'How long does it take and what information do you need to start?',
        a: 'Depends on the level contracted: between 2 and 15 business days. To start we need full name and ID number (or RIF for companies). All communication takes place through secure channels agreed with the client.',
      },
    ],
    levelsTitle: 'Three levels of investigation',
    levels: [
      {
        name: 'Basic',
        color: 'border-sky-500/40 bg-sky-500/5',
        badge: 'text-sky-400',
        checks: ['CICPC criminal background check', 'SENIAT tax clearance', 'Identity verification', 'Basic employment references'],
        time: '2–3 business days',
        idealLabel: 'Ideal for',
        ideal: 'Operational employees and trusted staff',
      },
      {
        name: 'Standard',
        color: 'border-violet-500/40 bg-violet-500/5',
        badge: 'text-violet-400',
        checks: ['Everything in Basic level', 'IVSS / INPSASEL clearances', 'Litigation history and court cases', 'Verification of affiliations and connections', 'OSINT on social media and press'],
        time: '5–7 business days',
        idealLabel: 'Ideal for',
        ideal: 'Managerial roles, business partners, critical suppliers',
      },
      {
        name: 'Enhanced',
        color: 'border-emerald-500/40 bg-emerald-500/5',
        badge: 'text-emerald-400',
        checks: ['Everything in Standard level', 'Conflict of interest investigation', 'Analysis of links to public officials', 'International verification (if applicable)', 'Extended reference interviews', 'Inductive narrative report'],
        time: '10–15 business days',
        idealLabel: 'Ideal for',
        ideal: 'Executives, strategic partners, mergers and acquisitions, investments',
      },
    ],
    sourcesTitle: 'Verification sources',
    sources: [
      { icon: Search, t: 'CICPC', d: 'Criminal records, open cases, arrest warrants.' },
      { icon: FileText, t: 'SENIAT · IVSS · INPSASEL', d: 'Tax and parafiscal clearances. Mandatory for government suppliers.' },
      { icon: AlertTriangle, t: 'OSINT + Media', d: 'Open-source intelligence: social media, digital press, public records.' },
    ],
    useCasesTitle: 'Frequent use cases',
    useCases: [
      'Onboarding of executives, managers or trusted staff',
      'Selection of business partners or joint ventures',
      'Pre-acquisition or pre-investment due diligence in Venezuela',
      'Supplier verification for high-value contracts',
      'Investigation of potential conflicts of interest within the organization',
    ],
    ctaWhitePaperLabel: 'Free White Paper',
    ctaWhitePaperTitle: 'Corporate Due Diligence in Venezuela: Investigation Protocol 2026',
    ctaWhitePaperDesc: 'Complete protocol covering CICPC, SENIAT, IVSS, OSINT sources and inductive writing methodology for the Venezuelan context.',
    ctaWhitePaperBtn: 'Download Free',
    related: [
      { label: 'Intelligence & Analysis', href: '/consultoria/inteligencia-y-analisis-de-riesgo' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
    ],
  },
};

export default function DueDiligence() {
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
        <h2 className="text-2xl font-black text-white mb-6">{c.levelsTitle}</h2>
        <div className="space-y-4">
          {c.levels.map((level) => (
            <div key={level.name} className={`p-6 rounded-2xl border ${level.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-base font-black uppercase tracking-widest ${level.badge}`}>{level.name}</h3>
                <span className="text-xs text-gray-600 font-bold">{level.time}</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                {level.checks.map((ch) => (
                  <div key={ch} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3 h-3 text-gray-600 shrink-0" />
                    {ch}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest border-t border-white/[0.04] pt-3 mt-3">
                {level.idealLabel}: {level.ideal}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.sourcesTitle}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {c.sources.map((item) => {
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
        <h2 className="text-2xl font-black text-white mb-4">{c.useCasesTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.useCases.map((item) => (
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
            <p className="text-[10px] font-black text-yellow-500/80 uppercase tracking-widest mb-1">{c.ctaWhitePaperLabel}</p>
            <h3 className="text-lg font-black text-white">{c.ctaWhitePaperTitle}</h3>
            <p className="text-sm text-gray-500 mt-1">{c.ctaWhitePaperDesc}</p>
          </div>
        </div>
        <Link to="/white-papers/due-diligence-corporativa-venezuela" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-black uppercase tracking-widest hover:bg-yellow-500/20 transition-all">
          {c.ctaWhitePaperBtn} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </ConsultoriaServiceLayout>
  );
}
