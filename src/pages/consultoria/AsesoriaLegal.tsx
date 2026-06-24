import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Scale, FileText, ShieldCheck, CheckCircle2, ArrowRight, Briefcase, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const CONTENT = {
  es: {
    breadcrumb: 'Marco Legal y Compliance',
    badge: 'RRHH · DDHH · LOTTT · UNGP · DIGESERVISP',
    title: 'Consultoría Legal en Riesgos de RRHH y Derechos Humanos',
    subtitle: 'Asesores legales especializados para corporaciones y embajadas en Venezuela',
    intro: 'Nuestros abogados especializados actúan como asesores legales de corporaciones multinacionales y misiones diplomáticas en Venezuela para todo lo relativo a riesgos laborales y de derechos humanos. Identificamos pasivos, estructuramos marcos jurídicos defensibles y producimos los informes de debida diligencia que exigen las casas matrices, los auditores ESG y los gobiernos acreditantes.',
    faqs: [
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
    ],
    differentiatorLabel: 'Por qué esto es diferente',
    differentiator: [
      'Una firma de abogados convencional conoce la ley, pero no entiende el entorno operacional de seguridad en Venezuela.',
      'Un consultor de seguridad entiende el riesgo, pero no puede traducirlo en obligaciones jurídicas defendibles.',
      'Nuestros abogados operan en la intersección: conocen la LOTTT, los UNGP, el marco DIGESERVISP y los estándares internacionales de uso de la fuerza — y los aplican al contexto real de Venezuela.',
    ],
    servicesTitle: 'Áreas de asesoría legal',
    services: [
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
    ],
    whoTitle: '¿A quién servimos?',
    whoSubtitle: 'Organizaciones que operan en Venezuela y necesitan un asesor legal que entienda tanto el marco jurídico como el entorno de riesgo real del país.',
    clientProfiles: [
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
    ],
    deliverablesTitle: 'Entregables',
    deliverables: [
      'Diagnóstico de riesgos laborales y DDHH con priorización',
      'Contratos laborales revisados o redactados para Venezuela',
      'Protocolo de uso proporcional de la fuerza jurídicamente respaldado',
      'Informe de debida diligencia DDHH (estándar UNGP/ESG)',
      'Política de RRHH conforme a LOTTT para personal local',
      'Auditoría de cumplimiento laboral con plan correctivo',
      'Revisión legal de contratos de prestación de servicios de seguridad',
      'Acompañamiento en Inspectoría del Trabajo y organismos regulatorios',
    ],
    ctaTitle: '¿Cuál es su exposición legal en Venezuela?',
    ctaDesc: 'En menos de 48 horas nuestro especialista evalúa los riesgos laborales y de DDHH de su organización y le indica exactamente dónde están las brechas.',
    ctaBtn: 'Solicitar diagnóstico legal',
    related: [
      { label: 'Due Diligence Corporativa', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Auditoría de Cumplimiento', href: '/consultoria/auditoria-de-cumplimiento' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
      { label: 'Formación de Personal de Seguridad', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
    ],
  },
  en: {
    breadcrumb: 'Legal Framework & Compliance',
    badge: 'HR · Human Rights · LOTTT · UNGP · DIGESERVISP',
    title: 'Legal Consulting in HR and Human Rights Risks',
    subtitle: 'Specialized legal advisors for corporations and embassies in Venezuela',
    intro: 'Our specialized attorneys act as legal advisors to multinational corporations and diplomatic missions in Venezuela on all matters relating to labor and human rights risks. We identify liabilities, structure defensible legal frameworks and produce the due diligence reports required by parent companies, ESG auditors and accrediting governments.',
    faqs: [
      {
        q: 'Why does an embassy need HR legal counsel in Venezuela?',
        a: 'Embassies hire local staff under Venezuelan jurisdiction. That means full obligations under the LOTTT: social benefits, profit sharing, IVSS, INPSASEL, and severance regime. An error in labor management can lead to costly litigation and diplomatic exposure. Our attorneys understand the tension between Venezuelan labor law and international corporate policies.',
      },
      {
        q: 'What does "legal risk in human rights" mean for a multinational corporation?',
        a: 'The UN Guiding Principles on Business and Human Rights (UNGP) require multinationals to conduct human rights due diligence across their entire value chain, including Venezuela. Non-compliance creates reputational risk, legal action in home jurisdictions and issues with ESG investors. Our attorneys identify and document those risks with technical rigor.',
      },
      {
        q: 'How does a conventional HR attorney differ from your security labor risk specialist?',
        a: 'A conventional employment lawyer knows the LOTTT but does not understand the operational security environment in Venezuela: DIGESERVISP, the real risks of a labor dispute involving armed security personnel, or international use-of-force standards. Our specialist operates at the intersection of both worlds — and that is exactly what corporations and embassies in Venezuela need.',
      },
      {
        q: 'What is the risk of not having a documented human rights policy for security operations?',
        a: 'In the event of an incident involving security personnel, the absence of a documented HR policy makes the organization directly liable. Multinational parent companies, ESG auditors and the accrediting governments of embassies all require this documentation. Without it, the organization cannot demonstrate that it acted with the due diligence required by international law.',
      },
    ],
    differentiatorLabel: 'Why this is different',
    differentiator: [
      'A conventional law firm knows the law, but does not understand the operational security environment in Venezuela.',
      'A security consultant understands the risk, but cannot translate it into defensible legal obligations.',
      'Our attorneys operate at the intersection: they know the LOTTT, the UNGP, the DIGESERVISP framework and international use-of-force standards — and they apply them to the real context of Venezuela.',
    ],
    servicesTitle: 'Areas of legal advisory',
    services: [
      {
        icon: Briefcase,
        title: 'HR Legal Advisory for Corporations and Embassies',
        desc: 'We act as labor law advisors for your organization in Venezuela. Contract design, HR policies, labor dispute management, HR due diligence in M&A processes and LOTTT compliance for local staff.',
        tags: ['LOTTT', 'Labor Contracts', 'Due Diligence', 'Disputes'],
      },
      {
        icon: Globe,
        title: 'Human Rights Legal Risk Management',
        desc: 'We identify and document the human rights risks of your operations in Venezuela in accordance with the UN Guiding Principles (UNGP), the American Convention and ESG standards. We produce the due diligence reports required by your parent companies, auditors and investors.',
        tags: ['UNGP', 'ESG', 'Due Diligence', 'OAS'],
      },
      {
        icon: ShieldCheck,
        title: 'Legal Framework for Security Personnel',
        desc: 'We structure the legal framework for your organization\'s private security team: contracts compliant with LOTTT and DIGESERVISP, legally backed proportional use-of-force protocols, IVSS/INPSASEL affiliations and operational authorizations.',
        tags: ['DIGESERVISP', 'INPSASEL', 'Use of Force'],
      },
      {
        icon: FileText,
        title: 'Legal Compliance and Labor Audit',
        desc: 'Audit of your organization\'s labor compliance status in Venezuela: regulatory gaps, contingent labor liability risks, review of security services contracts and support before labor inspectorates and regulatory bodies.',
        tags: ['Labor Audit', 'SENIAT', 'Inspectorate', 'Labor Liability'],
      },
    ],
    whoTitle: 'Who do we serve?',
    whoSubtitle: 'Organizations operating in Venezuela that need a legal advisor who understands both the legal framework and the country\'s real risk environment.',
    clientProfiles: [
      {
        t: 'Embassies and Diplomatic Missions',
        d: 'Legal management of local staff hired under Venezuelan law. HR protocols required by the accrediting government. Contracts for locally hired private security teams.',
      },
      {
        t: 'Multinational Corporations',
        d: 'Labor and HR due diligence for ESG reports and parent company requirements. Labor risk management during M&A processes or restructuring in Venezuela.',
      },
      {
        t: 'Companies with In-House Security Staff',
        d: 'Complete legal framework for the internal security team: contracts, DIGESERVISP authorizations, use-of-force protocols and incident management from a legal perspective.',
      },
      {
        t: 'Investment Funds with Assets in Venezuela',
        d: 'Pre-acquisition labor due diligence: identification of contingent liabilities, target\'s LOTTT compliance and HR risk assessment of operations.',
      },
    ],
    deliverablesTitle: 'Deliverables',
    deliverables: [
      'Labor and human rights risk assessment with prioritization',
      'Employment contracts reviewed or drafted for Venezuela',
      'Legally backed proportional use-of-force protocol',
      'Human rights due diligence report (UNGP/ESG standard)',
      'HR policy compliant with LOTTT for local staff',
      'Labor compliance audit with corrective action plan',
      'Legal review of security services contracts',
      'Support before the Labor Inspectorate and regulatory bodies',
    ],
    ctaTitle: 'What is your legal exposure in Venezuela?',
    ctaDesc: 'In under 48 hours our specialist evaluates your organization\'s labor and human rights risks and identifies exactly where the gaps are.',
    ctaBtn: 'Request legal assessment',
    related: [
      { label: 'Corporate Due Diligence', href: '/consultoria/due-diligence-corporativa' },
      { label: 'Compliance Audit', href: '/consultoria/auditoria-de-cumplimiento' },
      { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
      { label: 'Security Staff Training', href: '/consultoria/capacitacion/formacion-personal-seguridad' },
    ],
  },
};

export default function AsesoriaLegal() {
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
      accentColor="amber"
      related={c.related}
    >
      {/* DIFFERENTIATOR */}
      <div className="mb-12 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
        <p className="text-[10px] font-black text-amber-500/80 uppercase tracking-widest mb-3">{c.differentiatorLabel}</p>
        <div className="space-y-2">
          {c.differentiator.map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-amber-400 font-black text-xs shrink-0 mt-0.5">{i === 2 ? '→' : '×'}</span>
              <p className={`text-sm leading-relaxed ${i === 2 ? 'text-amber-200/90 font-medium' : 'text-gray-500'}`}>{line}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4 SERVICES */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 tracking-tight">{c.servicesTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {c.services.map((s) => {
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
        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">{c.whoTitle}</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">{c.whoSubtitle}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.clientProfiles.map((item) => (
            <div key={item.t} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-amber-500/25 transition-all">
              <p className="text-sm font-black text-amber-300 mb-2">{item.t}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DELIVERABLES */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6 tracking-tight">{c.deliverablesTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {c.deliverables.map((item) => (
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
            <h3 className="text-lg font-black text-white mb-2">{c.ctaTitle}</h3>
            <p className="text-sm text-gray-400 mb-5">{c.ctaDesc}</p>
            <Link to="/consultoria/auditoria-de-cumplimiento"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all">
              {c.ctaBtn} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
