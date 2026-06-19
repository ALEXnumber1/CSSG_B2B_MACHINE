import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Scale, FileText, ShieldCheck, CheckCircle2, ArrowRight, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: '¿Por qué necesita una embajada asesoría legal en RRHH en Venezuela?',
    a: 'Las embajadas contratan personal local bajo jurisdicción venezolana. Eso significa obligaciones plenas bajo la LOTTT: beneficios sociales, utilidades, IVSS, INPSASEL, régimen de prestaciones. Un error en la gestión laboral puede derivar en litigios costosos y exposición diplomática. Nuestros abogados conocen el punto de tensión entre el derecho laboral venezolano y las políticas corporativas internacionales.',
  },
  {
    q: '¿Qué significa "riesgo legal en DDHH" para una corporación multinacional?',
    a: 'Los Principios Rectores de la ONU sobre Empresas y Derechos Humanos (UNGP) obligan a las multinacionales a realizar due diligence de DDHH en toda su cadena de valor, incluyendo Venezuela. El incumplimiento genera riesgo reputacional, acciones legales en jurisdicciones de origen y problemas con inversores ESG. Nuestros abogados identifican y documentan esos riesgos con rigor técnico.',
  },
  {
    q: '¿En qué se diferencia un abogado de RRHH convencional de su especialista en riesgos laborales de seguridad?',
    a: 'Un abogado laboral convencional conoce la LOTTT pero no entiende el entorno operacional de seguridad en Venezuela: DIGESERVISP, los riesgos reales de un conflicto laboral con personal de vigilancia armado, ni los estándares internacionales de uso de la fuerza. Nuestro especialista opera en la intersección de los dos mundos — y eso es lo que necesitan corporaciones y embajadas en Venezuela.',
  },
  {
    q: '¿Cuál es el riesgo de no tener una política de DDHH documentada para las operaciones de seguridad?',
    a: 'Ante un incidente con personal de seguridad, la ausencia de una política documentada de DDHH convierte a la organización en responsable directa. Las casas matrices de multinacionales, auditores ESG y los propios gobiernos acreditantes de embajadas exigen esta documentación. Sin ella, la organización no puede demostrar que actuó con la debida diligencia requerida por el derecho internacional.',
  },
];

const services = [
  {
    icon: Briefcase,
    title: 'Asesoría Legal en RRHH para Corporaciones y Embajadas',
    desc: 'Actuamos como asesores legales en materia laboral para su organización en Venezuela. Diseño de contratos, políticas de personal, gestión de conflictos laborales, due diligence laboral en procesos M&A y cumplimiento LOTTT para personal local.',
    tags: ['LOTTT', 'Contratos Laborales', 'Due Diligence', 'Conflictos'],
  },
  {
    icon: Globe,
    title: 'Gestión de Riesgos Legales en Derechos Humanos',
    desc: 'Identificamos y documentamos los riesgos de DDHH de sus operaciones en Venezuela conforme a los Principios Rectores ONU (UNGP), la Convención Americana y estándares ESG. Producimos los informes de debida diligencia que exigen sus casas matrices, auditores e inversores.',
    tags: ['UNGP', 'ESG', 'Debida Diligencia', 'OEA'],
  },
  {
    icon: ShieldCheck,
    title: 'Marco Legal del Personal de Seguridad',
    desc: 'Estructuramos el marco legal del equipo de seguridad privada de su organización: contratos conformes a LOTTT y DIGESERVISP, protocolos de uso proporcional de la fuerza jurídicamente respaldados, afiliaciones IVSS/INPSASEL y habilitaciones operacionales.',
    tags: ['DIGESERVISP', 'INPSASEL', 'Uso de Fuerza'],
  },
  {
    icon: FileText,
    title: 'Compliance Legal y Auditoría Laboral',
    desc: 'Auditoría del estado de cumplimiento laboral de su organización en Venezuela: brechas regulatorias, riesgos de pasivo laboral contingente, revisión de contratos de prestación de servicios de seguridad y acompañamiento ante inspectorías del trabajo y organismos de control.',
    tags: ['Auditoría Laboral', 'SENIAT', 'Inspectoría', 'Pasivo Laboral'],
  },
];

const clientProfiles = [
  {
    t: 'Embajadas y Misiones Diplomáticas',
    d: 'Gestión legal del personal local contratado bajo ley venezolana. Protocolos DDHH exigidos por el gobierno acreditante. Contratos del equipo de seguridad privada contratado localmente.',
  },
  {
    t: 'Corporaciones Multinacionales',
    d: 'Due diligence laboral y DDHH para reportes ESG y requerimientos de casas matrices. Gestión de riesgos laborales durante procesos de M&A o restructuración en Venezuela.',
  },
  {
    t: 'Empresas con Personal de Seguridad Propio',
    d: 'Marco legal completo del equipo de seguridad interna: contratos, habilitaciones DIGESERVISP, protocolos de uso de la fuerza y gestión de incidentes desde la perspectiva jurídica.',
  },
  {
    t: 'Fondos de Inversión con Activos en Venezuela',
    d: 'Due diligence laboral previo a la adquisición: identificación de pasivos contingentes, cumplimiento LOTTT del target y evaluación de riesgos DDHH de las operaciones.',
  },
];

const differentiator = [
  'Una firma de abogados convencional conoce la ley, pero no entiende el entorno operacional de seguridad en Venezuela.',
  'Un consultor de seguridad entiende el riesgo, pero no puede traducirlo en obligaciones jurídicas defendibles.',
  'Nuestros abogados operan en la intersección: conocen la LOTTT, los UNGP, el marco DIGESERVISP y los estándares internacionales de uso de la fuerza — y los aplican al contexto real de Venezuela.',
];

export default function AsesoriaLegal() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Marco Legal y Compliance"
      badge="RRHH · DDHH · LOTTT · UNGP · DIGESERVISP"
      title="Consultoría Legal en Riesgos de RRHH y Derechos Humanos"
      subtitle="Asesores legales especializados para corporaciones y embajadas en Venezuela"
      intro="Nuestros abogados especializados actúan como asesores legales de corporaciones multinacionales y misiones diplomáticas en Venezuela para todo lo relativo a riesgos laborales y de derechos humanos. Identificamos pasivos, estructuramos marcos jurídicos defensibles y producimos los informes de debida diligencia que exigen las casas matrices, los auditores ESG y los gobiernos acreditantes."
      faqs={faqs}
      accentColor="amber"
      related={[
        { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
        { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
        { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
        { label: 'Formación de Personal de Seguridad', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
      ]}
    >
      {/* DIFFERENTIATOR */}
      <div className="mb-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest mb-3">Por qué esto es diferente</p>
        <div className="space-y-2">
          {differentiator.map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-amber-400 font-black text-xs shrink-0 mt-0.5">{i === 2 ? '→' : '×'}</span>
              <p className={`text-sm leading-relaxed ${i === 2 ? 'text-amber-200/90 font-medium' : 'text-gray-500'}`}>{line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 SERVICES */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Áreas de asesoría legal</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2 group-hover:text-amber-300 transition-colors">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-black text-amber-500/70 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WHO NEEDS THIS */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">¿A quién servimos?</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">Organizaciones que operan en Venezuela y necesitan un asesor legal que entienda tanto el marco jurídico como el entorno de riesgo real del país.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {clientProfiles.map((item) => (
            <div key={item.t} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/25 transition-all">
              <p className="text-sm font-black text-amber-300 mb-2">{item.t}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DELIVERABLES */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Entregables</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            'Diagnóstico de riesgos laborales y DDHH con priorización',
            'Contratos laborales revisados o redactados para Venezuela',
            'Protocolo de uso proporcional de la fuerza jurídicamente respaldado',
            'Informe de debida diligencia DDHH (estándar UNGP/ESG)',
            'Política de RRHH conforme a LOTTT para personal local',
            'Auditoría de cumplimiento laboral con plan correctivo',
            'Revisión legal de contratos de prestación de servicios de seguridad',
            'Acompañamiento en Inspectoría del Trabajo y organismos regulatorios',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-xs text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mb-6 p-7 rounded-3xl border border-amber-500/25 bg-amber-500/5">
        <div className="flex items-start gap-4">
          <Scale className="w-8 h-8 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-black text-white mb-2">¿Cuál es su exposición legal en Venezuela?</h3>
            <p className="text-sm text-gray-400 mb-5">En menos de 48 horas nuestro especialista evalúa los riesgos laborales y de DDHH de su organización y le indica exactamente dónde están las brechas.</p>
            <Link to="/consultoria/auditoria-de-cumplimiento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all">
              Solicitar diagnóstico legal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
