import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { Globe, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    q: '¿Qué estándares rigen la seguridad de misiones diplomáticas?',
    a: 'La Convención de Viena sobre Relaciones Diplomáticas (1961) establece las obligaciones del Estado receptor de proteger instalaciones y personal diplomático. A nivel operativo, los países del G7 aplican sus propios protocolos de seguridad (UK FCO, Canadian GAC, US RSO). CSSG trabaja alineada con todos estos marcos.',
  },
  {
    q: '¿Por qué confían en CSSG los gobiernos del G7 en Venezuela?',
    a: 'Porque llevamos más de 17 años protegiendo misiones diplomáticas en Venezuela sin un solo incidente de seguridad. Nuestro personal está formado bajo estándares internacionales, verificado por CICPC y certificado bajo ISO 9001:2015. Hemos superado auditorías de seguridad de gobiernos de Europa y América del Norte.',
  },
  {
    q: '¿Qué implica la consultoría de seguridad vs. el servicio operativo?',
    a: 'La consultoría evalúa, diseña y recomienda — asesora al responsable de seguridad de la misión sobre protocolos, procedimientos y configuración de recursos. El servicio operativo ejecuta: personal de seguridad en sitio. Ambos se complementan; muchos clientes contratan primero la consultoría para definir exactamente qué servicio operativo necesitan.',
  },
  {
    q: '¿Cómo manejan la confidencialidad en proyectos diplomáticos?',
    a: 'Todos los proyectos diplomáticos operan bajo acuerdo de confidencialidad previo. La documentación no sale de CSSG sin autorización expresa del cliente. No divulgamos nombres de misiones, ubicaciones ni detalles operacionales. Este nivel de discreción es un requisito no negociable de nuestros clientes diplomáticos.',
  },
  {
    q: '¿Pueden evaluar seguridad en residencias de personal diplomático?',
    a: 'Sí. Ofrecemos evaluaciones específicas para residencias del jefe de misión, consejeros y personal prioritario. Ver el servicio de Evaluación de Residencias y Cancillerías.',
  },
];

export default function SeguridadDiplomatica() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Seguridad Diplomática"
      badge="Misiones Diplomáticas · Convención de Viena · G7"
      title="Seguridad para Misiones Diplomáticas"
      subtitle="El estándar que exigen los gobiernos del G7 en Venezuela"
      intro="Protegemos embajadas, cancillerías, consulados y misiones internacionales con los estándares operacionales que exigen los gobiernos del G7. Más de 17 años sin incidentes en entornos diplomáticos en Venezuela nos posicionan como el socio local de confianza para misiones que no pueden permitirse errores."
      faqs={faqs}
      accentColor="indigo"
      related={[
        { label: 'Evaluación de Residencias', href: '/consultoria/evaluacion-residencias-cancillerias' },
        { label: 'Evaluación de Riesgos', href: '/consultoria/evaluacion-de-riesgos-de-seguridad' },
        { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
        { label: 'Escudo Diplomático', href: '/consultoria/escudo-diplomatico' },
      ]}
    >
      {/* TRUST ANCHOR */}
      <div className="mb-12 p-8 rounded-3xl bg-indigo-900/20 border border-indigo-500/30">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-indigo-400 shrink-0 mt-1" />
          <div>
            <p className="text-sm font-black text-indigo-300 uppercase tracking-widest mb-2">Credencial G7</p>
            <p className="text-base text-white font-bold leading-relaxed">
              "Si los gobiernos del Reino Unido y Canadá confían en CSSG para proteger a su personal y sus instalaciones en Venezuela, su organización también puede."
            </p>
            <p className="text-xs text-indigo-400/70 mt-3">+17 años · 0 incidentes en entornos diplomáticos</p>
          </div>
        </div>
      </div>

      {/* SCOPE */}
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Alcance de la consultoría diplomática</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Globe, t: 'Evaluación de amenaza del entorno', d: 'Análisis del riesgo político, delictivo y geopolítico del entorno venezolano para la misión.' },
            { icon: ShieldCheck, t: 'Diseño de protocolos de seguridad', d: 'Procedimientos de acceso, respuesta a incidentes, evacuación y comunicación de crisis.' },
            { icon: Lock, t: 'Verificación de personal local', d: 'Antecedentes penales CICPC, solvencias tributarias y verificación de referencias del personal de seguridad.' },
            { icon: CheckCircle2, t: 'Alineación con estándares del país acreditante', d: 'Integración con los requisitos específicos del FCO (UK), GAC (Canadá), DSS (EE.UU.) u otros.' },
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

      {/* DIFFERENTIATOR */}
      <div>
        <h2 className="text-2xl font-black text-white mb-4">Por qué no compete en precio</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          En seguridad diplomática, el eje de decisión no es el costo — es la confianza irreplicable. Un proveedor que no ha operado en entornos diplomáticos en Venezuela, que no conoce los protocolos del G7 y que no tiene el historial de cero incidentes, no es una opción, independientemente del precio.
        </p>
        <div className="flex flex-col gap-2">
          {[
            '+17 años de historial documentado en entornos diplomáticos en Venezuela',
            'Personal verificado por CICPC con solvencias tributarias (SENIAT/IVSS/INPSASEL)',
            'Certificación ISO 9001:2015 y Cyber Essentials — ambos auditables',
            'Protocolos alineados con estándares del G7: UK FCO, Canadian GAC',
            'Confidencialidad contractual sin excepciones',
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 py-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ConsultoriaServiceLayout>
  );
}
