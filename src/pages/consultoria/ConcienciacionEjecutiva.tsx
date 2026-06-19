import ConsultoriaServiceLayout from '../../components/ConsultoriaServiceLayout';
import { User, Shield, Smartphone, CheckCircle2 } from 'lucide-react';

const faqs = [
  {
    q: '¿Por qué los directivos necesitan formación de seguridad específica?',
    a: 'Porque son el objetivo prioritario. Un CEO o director regional es más valioso para un actor malicioso que toda la infraestructura de seguridad de la empresa. Su visibilidad pública, sus patrones de movimiento y el acceso que tienen a información crítica los convierte en el vector de ataque más rentable. Su formación no puede ser la misma que la del personal operativo.',
  },
  {
    q: '¿Qué es duty of care en el contexto de la seguridad ejecutiva?',
    a: 'Duty of care es la obligación legal y ética de la organización de proteger a sus empleados, incluyendo a sus ejecutivos, frente a riesgos previsibles. En Venezuela, donde los riesgos de seguridad son documentados y previsibles, una empresa que no forma a sus directivos en autoprotección incumple su deber de cuidado.',
  },
  {
    q: '¿El programa incluye seguridad digital y ciberseguridad personal?',
    a: 'Sí. La concienciación ejecutiva cubre tanto la seguridad física personal (desplazamientos, residencia, rutinas) como la seguridad digital del ejecutivo: dispositivos personales, cuentas en redes sociales, comunicaciones seguras y prevención de phishing y spear phishing dirigido.',
  },
  {
    q: '¿Cuánto tiempo requiere el programa y puede adaptarse a la agenda de un directivo?',
    a: 'El programa estándar se entrega en un taller intensivo de medio día (4 horas) más seguimiento opcional. Puede realizarse in-company, en formatos individuales o para el equipo directivo completo. No requiere preparación previa por parte del participante.',
  },
];

export default function ConcienciacionEjecutiva() {
  return (
    <ConsultoriaServiceLayout
      breadcrumb="Concienciación Ejecutiva"
      badge="Cultura de Seguridad · Duty of Care · BP1"
      title="Concienciación Ejecutiva en Seguridad"
      subtitle="Cultura de seguridad, autoprotección y duty of care para directivos"
      intro="Los directivos son el objetivo prioritario de los actores maliciosos en Venezuela. Este programa les provee el conocimiento y los hábitos necesarios para reducir su exposición personal — en sus desplazamientos, su residencia, sus comunicaciones y su comportamiento digital — sin afectar su operatividad."
      faqs={faqs}
      accentColor="sky"
      related={[
        { label: 'Protección Ejecutiva', href: '/consultoria/proteccion-ejecutiva-analisis-amenazas' },
        { label: 'Respuesta a Crisis para Equipos', href: '/consultoria/capacitacion/respuesta-crisis-equipos' },
        { label: 'Insider Threat', href: '/consultoria/amenaza-interna-insider-threat' },
      ]}
    >
      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Áreas de la concienciación</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: User, t: 'Seguridad personal y de desplazamiento', d: 'Rutinas seguras, variación de rutas, identificación de seguimientos, comportamiento ante extorsión.' },
            { icon: Shield, t: 'Seguridad residencial', d: 'Evaluación básica de la residencia, personal doméstico, acceso de visitas y proveedores.' },
            { icon: Smartphone, t: 'Seguridad digital personal', d: 'Dispositivos, contraseñas, redes sociales, comunicaciones seguras y phishing dirigido.' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-sky-500/30 transition-all">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-sm font-black text-white mb-2">{item.t}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.d}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-black text-white mb-6">Entregables del programa</h2>
        <div className="space-y-3">
          {[
            { t: 'Guía personal de autoprotección', d: 'Documento de referencia rápida adaptado al perfil de riesgo de cada participante.' },
            { t: 'Checklist de seguridad residencial', d: 'Lista de verificación para evaluar y mejorar la seguridad del domicilio.' },
            { t: 'Protocolo de respuesta ante incidentes personales', d: 'Qué hacer, a quién llamar y qué no hacer ante diferentes tipos de incidentes.' },
            { t: 'Brief para la familia', d: 'Versión simplificada para comunicar a cónyuge e hijos mayores.' },
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
    </ConsultoriaServiceLayout>
  );
}
