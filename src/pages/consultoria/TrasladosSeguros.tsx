import { useTranslation } from 'react-i18next';
import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Plane, Car, Route, Radio, Building2, MapPin, CheckCircle2 } from 'lucide-react';

const CONTENT = {
  es: {
    breadcrumb: 'Traslados Seguros',
    badge: 'Maiquetía · Journey Management · Cobertura Nacional',
    title: 'Traslados Seguros y Recepción en Maiquetía',
    subtitle: 'Meet and greet, traslados ejecutivos y gestión de desplazamientos en toda Venezuela',
    intro: 'CSSG organiza la llegada y los desplazamientos de ejecutivos, delegaciones y visitantes de negocios en Venezuela. Le recibimos en el Aeropuerto Internacional de Maiquetía, le trasladamos a Caracas en vehículos ejecutivos o blindados con conductores evaluados, y nuestro centro de comando (CECOM) sigue cada trayecto 24/7. Cubrimos Caracas y el resto del país, para empresas, misiones diplomáticas y viajeros que necesitan llegar y moverse con un plan.',
    scopeTitle: 'Qué incluye el servicio',
    scope: [
      { icon: Plane, t: 'Recepción en Maiquetía (meet and greet)', d: 'Un equipo de CSSG le recibe a su llegada. Usted sabe de antemano quién le recoge y cómo identificarle.' },
      { icon: Car, t: 'Traslado aeropuerto–Caracas', d: 'Vehículo ejecutivo o blindado según su perfil de riesgo, con conductor evaluado y ruta definida antes del vuelo.' },
      { icon: Route, t: 'Estudio de rutas', d: 'Rutas primarias y alternas, horarios y puntos de exposición evaluados antes de cada desplazamiento.' },
      { icon: Radio, t: 'Journey management 24/7', d: 'El CECOM sigue el trayecto en vivo y activa el protocolo de respuesta ante cualquier desvío o incidente.' },
      { icon: Building2, t: 'Hoteles y lugares de reunión', d: 'Estudios de seguridad de hoteles y sedes con matriz de riesgo formal, antes de que usted llegue.' },
      { icon: MapPin, t: 'Cobertura en todo el país', d: 'Traslados entre ciudades y hacia sedes, plantas u oficinas en todo el territorio venezolano, coordinados por el CECOM.' },
    ],
    howTitle: 'Cómo funciona',
    how: [
      { t: 'Solicitud', d: 'Nos indica quién viaja, su vuelo, su destino y el propósito del viaje.' },
      { t: 'Planificación', d: 'Evaluamos el itinerario (hotel, lugares de reunión, rutas y horarios) y definimos vehículo, equipo y ruta. Confirmamos alcance y plazos por escrito.' },
      { t: 'Llegada y traslados', d: 'Recepción en el aeropuerto y desplazamientos con seguimiento del CECOM en cada trayecto.' },
      { t: 'Continuidad', d: 'Si su presencia en el país se prolonga, el servicio se integra en el programa Secure Landing o en un esquema de journey management permanente.' },
    ],
    forTitle: 'Para quién es',
    for: [
      'Ejecutivos e inversores que llegan a Venezuela por negocios',
      'Delegaciones y visitantes de misiones diplomáticas',
      'Equipos corporativos que se desplazan entre ciudades o hacia operaciones en el interior',
      'Departamentos de seguridad y viajes que necesitan un socio local con duty of care',
    ],
    faqs: [
      { q: '¿Qué recomiendan para la llegada a Maiquetía?', a: 'Llegar de día cuando sea posible y usar un traslado concertado de antemano con un equipo verificado; nunca un taxi sin reserva. Se han reportado incidentes contra viajeros en las terminales, el estacionamiento y la vía a Caracas, sobre todo de noche.' },
      { q: '¿Cubren traslados fuera de Caracas?', a: 'Sí. Cubrimos traslados y desplazamientos en todo el territorio venezolano, incluidos los trayectos entre ciudades. En el Distrito Capital y Miranda los realiza nuestro personal; en el resto del país, aliados autorizados y verificados, coordinados y seguidos por el CECOM. Antes de cada servicio le indicamos quién presta cada parte.' },
      { q: '¿Usan vehículos blindados?', a: 'Sí, cuando el perfil de riesgo del viajero o del trayecto lo justifica. En los demás casos usamos vehículos ejecutivos con conductores evaluados. Lo definimos con usted antes del viaje.' },
      { q: '¿Con cuánta antelación debo solicitarlo?', a: 'Depende del itinerario y de la ciudad de destino. Cuanto antes conozcamos el vuelo y la agenda, más completa es la planificación; confirmamos los plazos por escrito.' },
      { q: '¿Pueden coordinarse con el equipo de seguridad de mi empresa o embajada?', a: 'Sí. Alineamos alcances, reportes y requisitos de duty of care, y nuestros entregables se integran a su programa de gestión de riesgo de viajes.' },
    ],
    related: [
      { label: 'Secure Landing: programa para ejecutivos', href: '/consultoria/secure-landing' },
      { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
      { label: 'Centro de Mando CECOM', href: '/consultoria/tecnologia/centro-de-mando-cecom' },
      { label: 'CECOM-Intel: análisis de riesgo', href: '/cecom-intel/es' },
    ],
  },
  en: {
    breadcrumb: 'Secure Transfers',
    badge: 'Maiquetía · Journey Management · Nationwide Coverage',
    title: 'Secure Airport Transfers and Meet and Greet in Venezuela',
    subtitle: 'Airport reception, executive transportation and journey management across Venezuela',
    intro: 'CSSG manages the arrival and movements of executives, delegations and business visitors in Venezuela. We meet you on arrival at Maiquetía International Airport, drive you to Caracas in an executive or armored vehicle with a vetted driver, and our command center (CECOM) follows every journey 24/7. We cover Caracas and the rest of the country, for companies, diplomatic missions and travelers who need to arrive and move with a plan.',
    scopeTitle: 'What the service includes',
    scope: [
      { icon: Plane, t: 'Meet and greet at Maiquetía', d: 'A CSSG team meets you on arrival. You know in advance who will collect you and how to identify them.' },
      { icon: Car, t: 'Airport to Caracas transfer', d: 'Executive or armored vehicle according to your risk profile, with a vetted driver and a route set before your flight.' },
      { icon: Route, t: 'Route assessment', d: 'Primary and alternate routes, timings and exposure points assessed before every movement.' },
      { icon: Radio, t: '24/7 journey management', d: 'CECOM follows the journey live and triggers the response protocol on any deviation or incident.' },
      { icon: Building2, t: 'Hotels and meeting venues', d: 'Security assessments of hotels and venues with a formal risk matrix, before you arrive.' },
      { icon: MapPin, t: 'Nationwide coverage', d: 'Intercity transfers and movements to sites, plants or offices anywhere in Venezuela, coordinated by CECOM.' },
    ],
    howTitle: 'How it works',
    how: [
      { t: 'Request', d: 'Tell us who is traveling, their flight, destination and the purpose of the trip.' },
      { t: 'Planning', d: 'We assess the itinerary (hotel, meeting venues, routes and timings) and set the vehicle, team and route. Scope and lead times are confirmed in writing.' },
      { t: 'Arrival and transfers', d: 'Airport reception and movements, with CECOM following every journey.' },
      { t: 'Continuity', d: 'If your presence in the country grows, the service becomes part of the Secure Landing program or an ongoing journey management scheme.' },
    ],
    forTitle: 'Who it is for',
    for: [
      'Executives and investors traveling to Venezuela on business',
      'Delegations and visitors of diplomatic missions',
      'Corporate teams moving between cities or to operations outside Caracas',
      'Security and travel departments that need a local partner with duty of care',
    ],
    faqs: [
      { q: 'What do you recommend for arriving at Maiquetía?', a: 'Arrive in daylight when possible and use a pre-arranged transfer with a vetted team; never an unbooked taxi. Travelers have been targeted in the terminals, the car park and on the road to Caracas, particularly at night.' },
      { q: 'Do you cover transfers outside Caracas?', a: 'Yes. We cover transfers and movements anywhere in Venezuela, including intercity journeys. In the Capital District and Miranda they are run by our own personnel; elsewhere, by authorized and vetted partners coordinated and followed by CECOM. Before each engagement we tell you who delivers each part.' },
      { q: 'Do you use armored vehicles?', a: 'Yes, when the risk profile of the traveler or the route calls for it. Otherwise we use executive vehicles with vetted drivers. We agree on this with you before the trip.' },
      { q: 'How far in advance should I book?', a: 'It depends on the itinerary and the destination city. The sooner we know the flight and the agenda, the more complete the planning; we confirm lead times in writing.' },
      { q: 'Can you work with our corporate or embassy security team?', a: 'Yes. We align scope, reporting and duty-of-care requirements, and our deliverables plug into your travel risk management program.' },
    ],
    related: [
      { label: 'Executive protection for investors', href: '/en/executive-protection-venezuela-investors' },
      { label: 'Executive travel guide', href: '/cecom-intel/executive-travel-venezuela-journey-management' },
      { label: 'CECOM-Intel risk analysis', href: '/cecom-intel' },
      { label: 'Due diligence in Venezuela', href: '/en/due-diligence-venezuela' },
    ],
  },
};

// lang is set on /en/secure-airport-transfers-venezuela; the Spanish URL follows the visitor's language.
export default function TrasladosSeguros({ lang }: { lang?: 'es' | 'en' }) {
  const { i18n } = useTranslation();
  const c = (lang ?? (i18n.language.startsWith('en') ? 'en' : 'es')) === 'en' ? CONTENT.en : CONTENT.es;

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
      lang={lang}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.scopeTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.scope.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <Icon className="w-5 h-5 text-sky-400 mb-3" />
                <h3 className="text-sm font-black text-white mb-1">{item.t}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">{c.howTitle}</h2>
        <ol className="space-y-4">
          {c.how.map((step, i) => (
            <li key={step.t} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-sky-400 font-black text-sm shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-sm font-black text-white mb-1">{step.t}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-4">{c.forTitle}</h2>
        <ul className="flex flex-col gap-2">
          {c.for.map((item) => (
            <li key={item} className="flex items-start gap-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ConsultoriaServiceLayout>
  );
}
