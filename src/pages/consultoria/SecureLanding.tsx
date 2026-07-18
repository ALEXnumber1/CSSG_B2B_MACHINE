import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Eye, MapPin, Home, ShieldCheck, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Secure Landing',
    badge: 'Nuevo Programa · CSSG Secure Landing™',
    title: 'Llegue. Establézcase. Opere — con seguridad.',
    intro: 'Programa estructurado de seguridad para ejecutivos e inversores extranjeros que llegan a Venezuela: desde la inteligencia previa al viaje hasta una residencia completamente protegida, con un solo responsable y 17 años de presencia en el país.',
    problemTitle: 'Hacer negocios en Venezuela es una oportunidad. Llegar sin preparación es un riesgo.',
    problemBody: 'Venezuela se reabre al capital extranjero, y los ejecutivos regresan a explorarla. Pero llegar, moverse, elegir dónde alojarse y establecer una residencia exige criterio de seguridad local que no se improvisa — y que ningún proveedor internacional puede entregar a distancia. Hoy, un ejecutivo extranjero debe coordinar cuatro proveedores desconectados que no se responden entre sí, y ninguno le responde a usted. Secure Landing reemplaza esa fragmentación con un solo programa, un solo estándar y un solo responsable.',
    ladderTitle: 'Su postura de seguridad, del Nivel 1 al 4',
    ladderSub: 'Cuatro niveles acumulativos. Cada nivel incluye todo lo anterior. Usted asciende a medida que su presencia en el país se profundiza.',
    levels: [
      {
        code: 'L1',
        name: 'INSIGHT',
        tag: 'Sepa antes de viajar',
        body: 'Briefing de riesgo previo al viaje, personalizado: perfil de amenaza según su cargo y sector, planificación de itinerario, protocolo de comunicaciones y requisitos de entrada. Informe escrito más sesión ejecutiva privada.',
      },
      {
        code: 'L2',
        name: 'ASSESS',
        tag: 'Llegue y muévase con criterio verificado',
        body: 'Recepción en aeropuerto, conductores ejecutivos evaluados, acompañamiento no armado, estudios de seguridad de hoteles y establecimientos con matriz de riesgo formal, estudio de rutas primarias y alternas — coordinado en vivo con nuestro centro de comando 24/7.',
      },
      {
        code: 'L3',
        name: 'FORTIFY',
        tag: 'Una residencia con estándar corporativo',
        body: 'Veto de seguridad sobre su lista de inmuebles, site survey completo, rutas residencia-oficina, apoyo en mudanza y adecuación residencial: cerraduras de alta seguridad, vidrios de protección, cajas fuertes, CCTV, control de acceso y vigilantes evaluados — bajo supervisión CSSG y entrega contra checklist.',
      },
      {
        code: 'L4',
        name: 'SHIELD',
        tag: 'Opere protegido, 24/7',
        body: 'Botón de pánico monitoreado por nuestro centro de comando (CECOM), inteligencia trimestral de su zona y rutas, simulacros, respuesta prioritaria a incidentes y journey management preferente dentro del país. SLA firmado y reporte mensual.',
      },
    ],
    howTitle: 'Cómo funciona',
    how: [
      { t: 'Solicitud de briefing', d: 'Nos indica quién viaja, cuándo y con qué propósito.' },
      { t: 'Aceptación y alcance', d: 'Aplicamos nuestro proceso de aceptación de clientes y definimos el alcance exacto por escrito: qué entrega CSSG directamente y qué ejecutan especialistas locales evaluados bajo nuestra supervisión.' },
      { t: 'Ejecución por fases', d: 'Cada fase cierra con un entregable documentado que usted aprueba antes de abrir la siguiente.' },
      { t: 'Protección continua', d: 'Cuando usted se establece, el programa se convierte en un servicio permanente bajo SLA.' },
    ],
    whyTitle: 'Un solo socio. Un solo estándar. En el terreno.',
    why: [
      '17 años operando en Venezuela — presencia permanente, no visitas subcontratadas.',
      'Confianza de misiones diplomáticas del G7 y corporaciones multinacionales.',
      'Sistema de gestión certificado ISO 9001:2015 — cada procedimiento documentado y auditado.',
      'Centro de comando propio (CECOM) 24/7 — no un servicio de contestación.',
      'Transparencia total: por escrito, qué entregan nuestros equipos y qué ejecutan especialistas evaluados bajo nuestra supervisión. Un contrato, un responsable: CSSG.',
      'No armados por doctrina, perfil bajo por diseño — con opciones armadas licenciadas mediante partners evaluados cuando su perfil lo requiera.',
    ],
    notTitle: 'Lo que no hacemos',
    notBody: 'La claridad es una función de seguridad. Secure Landing no actúa como intermediario inmobiliario: realizamos el veto de seguridad de los inmuebles que usted o su agente de relocation seleccionen. No prometemos eliminar el riesgo: lo reducimos, lo gestionamos y respondemos ante él con procedimientos documentados. Y declinamos contrataciones que no superen nuestro proceso de aceptación de clientes.',
    faqs: [
      { q: '¿Es seguro viajar a Venezuela por negocios?', a: 'El riesgo es real, pero gestionable con criterio local, planificación y ejecución disciplinada. Eso es lo que el programa estructura, nivel por nivel.' },
      { q: '¿Necesito el programa completo?', a: 'No. La mayoría inicia en el Nivel 1 o 2 para un primer viaje exploratorio. El programa crece solo cuando crece su presencia en el país.' },
      { q: '¿Sus equipos están armados?', a: 'El acompañamiento CSSG es no armado y de perfil bajo por doctrina. Cuando un perfil de riesgo requiere protección armada, integramos partners licenciados y evaluados bajo nuestra supervisión, y le decimos exactamente quién hace qué.' },
      { q: '¿Pueden trabajar con nuestro equipo corporativo de seguridad?', a: 'Sí. Alineamos alcances, reportes y requisitos de duty of care, y nuestros entregables se integran a su programa de gestión de riesgo de viajes.' },
      { q: '¿Qué tan rápido pueden desplegar?', a: 'Un briefing de Nivel 1 se entrega normalmente en días. El apoyo a la llegada depende del itinerario y la ciudad; confirmamos plazos por escrito.' },
      { q: '¿Con quién trataré?', a: 'Con un líder de programa CSSG de principio a fin, respaldado por nuestro centro de comando. Nunca será transferido a un subcontratista anónimo.' },
    ],
    related: [
      { label: 'Seguridad para Misiones Diplomáticas', href: '/consultoria/seguridad-misiones-diplomaticas' },
      { label: 'Evaluación de Residencias y Cancillerías', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
    ],
  },
  en: {
    breadcrumb: 'Secure Landing',
    badge: 'New Program · CSSG Secure Landing™',
    title: 'Arrive. Settle. Operate — securely.',
    intro: 'A structured security program for foreign executives and investors entering Venezuela — from pre-travel intelligence to a fully protected residence, delivered by one accountable partner with 17 years on the ground.',
    problemTitle: 'Doing business in Venezuela is an opportunity. Arriving unprepared is a risk.',
    problemBody: 'Venezuela is reopening to foreign capital, and executives are returning to explore it. But arriving, moving, choosing where to stay and setting up a residence demand local security judgment that cannot be improvised, and that no international provider can deliver remotely. Today, a foreign executive must assemble four disconnected vendors — none of whom answer to each other, and none of whom answer to you. Secure Landing replaces that fragmentation with a single program, a single standard and a single point of accountability.',
    ladderTitle: 'Your Security Posture, Level 1 to 4',
    ladderSub: 'Four cumulative levels. Each includes everything below it. You advance as your presence in the country deepens.',
    levels: [
      { code: 'L1', name: 'INSIGHT', tag: 'Know before you go', body: 'A personalized pre-travel risk briefing: threat profile for your role and sector, itinerary planning, communications protocol and entry requirements. Written report plus a private executive session.' },
      { code: 'L2', name: 'ASSESS', tag: 'Arrive and move with verified judgment', body: 'Airport reception, vetted executive drivers, unarmed accompaniment, security assessments of hotels and venues with a formal risk matrix, primary and alternate route studies — coordinated live with our 24/7 command center.' },
      { code: 'L3', name: 'FORTIFY', tag: 'A residence to corporate standards', body: 'Security vetting of your housing shortlist, full site survey, residence-office route studies, relocation support and residential hardening: high-security locks, protective glazing, safes, CCTV, access control and vetted guards — implemented under CSSG supervision, delivered against a documented checklist.' },
      { code: 'L4', name: 'SHIELD', tag: 'Operate protected, 24/7', body: 'Panic button monitored by our own command center (CECOM), quarterly intelligence updates for your zone and routes, emergency drills, priority incident response and preferential journey management in-country. Signed SLA, monthly reporting.' },
    ],
    howTitle: 'How it works',
    how: [
      { t: 'Briefing request', d: 'You tell us who is traveling, when and why.' },
      { t: 'Acceptance & scoping', d: 'We run our client acceptance process and define the exact scope in writing: what CSSG delivers directly and what vetted local specialists execute under our supervision.' },
      { t: 'Execution by phases', d: 'Every phase closes with a documented deliverable you sign off before the next begins.' },
      { t: 'Ongoing protection', d: 'When you settle, the program becomes a continuous protection service under SLA.' },
    ],
    whyTitle: 'One partner. One standard. On the ground.',
    why: [
      '17 years operating in Venezuela — permanently, not through subcontracted visits.',
      'Trusted by G7 diplomatic missions and multinational corporations.',
      'ISO 9001:2015 certified quality management system — every procedure documented and audited.',
      'Our own 24/7 command center (CECOM) — not an answering service.',
      'Full transparency: in writing, what our own teams deliver and what vetted specialists execute under our supervision. One contract, one responsible party: CSSG.',
      'Unarmed by doctrine, low-profile by design — with licensed armed options through vetted partners when your risk profile requires it.',
    ],
    notTitle: 'What we do not do',
    notBody: 'We believe clarity is a security feature. Secure Landing does not act as a real-estate broker — we provide security vetting of properties you or your relocation agent select. We do not promise the elimination of risk — we reduce it, manage it and respond to it, with documented procedures. And we decline engagements that do not pass our client acceptance process.',
    faqs: [
      { q: 'Is Venezuela safe for business travel?', a: 'Risk is real but manageable with local judgment, planning and disciplined execution. That is precisely what the program structures — level by level.' },
      { q: 'Do I need the full program?', a: 'No. Most clients start at Level 1 or 2 for a first exploratory trip. The program grows only when your presence in the country grows.' },
      { q: 'Are your teams armed?', a: 'CSSG accompaniment is unarmed and low-profile by doctrine. Where a risk profile requires armed protection, we integrate licensed, vetted specialist partners under our supervision — and we tell you exactly who does what.' },
      { q: 'Can you work with our corporate security team?', a: 'Yes. We align scopes, reporting and duty-of-care requirements, and our deliverables plug into your travel risk management program.' },
      { q: 'How fast can you deploy?', a: 'A Level 1 briefing is typically delivered within days. Arrival support depends on itinerary and city; we confirm timelines in writing.' },
      { q: 'Who will I be dealing with?', a: 'One CSSG program lead, end to end, backed by our command center. You will never be handed off to an anonymous subcontractor.' },
    ],
    related: [
      { label: 'Security for Diplomatic Missions', href: '/consultoria/seguridad-misiones-diplomaticas' },
      { label: 'Residences & Chancery Assessment', href: '/consultoria/evaluacion-residencias-cancillerias' },
      { label: 'Executive Protection', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
    ],
  },
};

const levelIcons = [Eye, MapPin, Home, ShieldCheck];

export default function SecureLanding() {
  const { i18n } = useTranslation();
  const c = i18n.language.startsWith('en') ? CONTENT.en : CONTENT.es;
  const [active, setActive] = useState(0);
  const isShield = active === 3;

  return (
    <ConsultoriaServiceLayout
      breadcrumb={c.breadcrumb}
      badge={c.badge}
      title={c.title}
      intro={c.intro}
      faqs={c.faqs}
      related={c.related}
      accentColor="amber"
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">{c.problemTitle}</h2>
        <p className="text-sm text-gray-400 leading-relaxed max-w-[70ch]">{c.problemBody}</p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-2">{c.ladderTitle}</h2>
        <p className="text-sm text-gray-500 mb-8">{c.ladderSub}</p>

        <div className="flex items-end gap-2 sm:gap-3 mb-8" role="tablist" aria-label={c.ladderTitle}>
          {c.levels.map((lv, i) => {
            const Icon = levelIcons[i];
            const isActive = active === i;
            const last = i === 3;
            return (
              <button
                key={lv.code}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                style={{ height: `${72 + i * 26}px` }}
                className={`flex-1 rounded-xl border flex flex-col justify-end items-center gap-1.5 py-3 px-1 transition-all ${
                  isActive
                    ? last ? 'border-amber-500/50 bg-amber-500/10' : 'border-sky-500/50 bg-sky-500/10'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.15]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? (last ? 'text-amber-400' : 'text-sky-400') : 'text-gray-600'}`} />
                <span className={`text-[10px] font-black tracking-widest ${isActive ? 'text-white' : 'text-gray-600'}`}>{lv.code}</span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" className={`rounded-2xl border p-6 transition-colors ${isShield ? 'border-amber-500/30 bg-amber-500/[0.04]' : 'border-sky-500/20 bg-white/[0.02]'}`}>
          <p className={`text-xs font-black uppercase tracking-widest mb-2 ${isShield ? 'text-amber-400' : 'text-sky-400'}`}>
            {c.levels[active].code} · {c.levels[active].name} — {c.levels[active].tag}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">{c.levels[active].body}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.howTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.how.map((step, i) => (
            <div key={step.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 transition-all">
              <span className="text-[11px] font-black text-amber-400 tracking-widest">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-sm font-black text-white mt-2 mb-2">{step.t}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">{c.whyTitle}</h2>
        <div className="flex flex-col gap-2">
          {c.why.map((item) => (
            <div key={item} className="flex items-start gap-3 py-2 border-b border-white/[0.05]">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
        <h2 className="text-lg font-black text-white mb-3">{c.notTitle}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{c.notBody}</p>
      </div>
    </ConsultoriaServiceLayout>
  );
}
