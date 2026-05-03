import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Globe, Cookie, FileText } from 'lucide-react';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 bg-[#030305] text-gray-300 relative z-10 pt-28 pb-20 overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-800/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-6 backdrop-blur-md">
            <Shield className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black text-sky-300 uppercase tracking-widest">Compromiso Legal y Transparencia</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-none">
            Políticas de Privacidad <br />
            <span className="text-sky-400">& Cookies</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Cómo recopilamos, protegemos y gestionamos la información de nuestros usuarios y clientes bajo marcos regulatorios de Estados Unidos, Venezuela y regulaciones internacionales.
          </p>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0B10] border border-white/10 rounded-3xl p-8 md:p-12 space-y-12 shadow-2xl backdrop-blur-sm select-none"
        >
          {/* Section 1: Intro / Scope */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">1. Ámbito de Aplicación y Cumplimiento</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Esta Política de Privacidad describe las prácticas de recopilación de datos de <strong>Company Of Security And Service Global C.A. (CSSG)</strong>, aplicables a nuestros portales web, herramientas tecnológicas de protección como ShieldTrace PSIM y cualquier otro servicio digital asociado.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Nuestras prácticas de privacidad están alineadas con los siguientes marcos regulatorios nacionales e internacionales:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
              <li><strong>Estados Unidos:</strong> Ley de Privacidad del Consumidor de California (CCPA), Ley de Protección de la Privacidad Infantil en Internet (COPPA) y regulaciones federales aplicables.</li>
              <li><strong>Venezuela:</strong> Artículo 28 de la Constitución de la República Bolivariana de Venezuela (Derecho de Hábeas Data), Ley sobre Mensajes de Datos y Firmas Electrónicas, y la Ley de Infogobierno.</li>
              <li><strong>Ámbito Internacional (GDPR / RGPD):</strong> En caso de accesos o procesamiento de datos de ciudadanos de la Unión Europea.</li>
            </ul>
          </section>

          {/* Section 2: Recopilación de Datos */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Eye className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">2. Datos que Recopilamos</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Dependiendo de la interacción que mantenga con el sitio web de CSSG, podemos recopilar la siguiente información:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-2 text-sm">Datos suministrados directamente</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Nombre, correo electrónico, número de teléfono, cargo, empresa y mensajes de contacto o postulaciones de talento.
                </p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-5">
                <h4 className="font-bold text-white mb-2 text-sm">Datos recopilados automáticamente</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Dirección IP, tipo de navegador, cookies, identificadores del dispositivo y patrones de uso mediante tecnologías analíticas no invasivas.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Finalidad del Procesamiento */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Lock className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">3. Uso y Finalidad de la Información</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Procesamos sus datos únicamente con las siguientes finalidades estratégicas y operativas:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
              <li>Responder a sus solicitudes de información, cotizaciones y evaluaciones de riesgo.</li>
              <li>Procesar postulaciones en nuestro Portal de Reclutamiento y RRHH.</li>
              <li>Personalizar y optimizar la experiencia de navegación del usuario en la plataforma.</li>
              <li>Garantizar la seguridad operativa e integridad de nuestros canales de comunicación digital.</li>
            </ul>
          </section>

          {/* Section 4: Políticas de Cookies */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Cookie className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">4. Política de Cookies</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Las cookies son pequeños archivos de texto que el sitio web almacena en su navegador para recordar preferencias y optimizar la visualización de la plataforma.
            </p>
            <div className="space-y-3">
              <div className="border-l-2 border-sky-500/40 pl-4 py-1">
                <h4 className="font-bold text-white text-sm mb-1">Cookies Esenciales</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Necesarias para el correcto funcionamiento del sitio, la autenticación en el panel administrativo y los portales de seguridad.</p>
              </div>
              <div className="border-l-2 border-sky-500/40 pl-4 py-1">
                <h4 className="font-bold text-white text-sm mb-1">Cookies de Rendimiento</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Nos permiten analizar de forma anónima cómo interactúan los usuarios con el sitio web para mejorar continuamente el diseño y la velocidad.</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Usted puede desactivar o eliminar el uso de cookies directamente desde la configuración de su navegador web en cualquier momento.
            </p>
          </section>

          {/* Section 5: Derechos de los Usuarios */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">5. Sus Derechos de Privacidad</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Garantizamos el pleno ejercicio de sus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
              <li><strong>Acceso y Rectificación:</strong> Puede solicitar ver la información personal que tenemos sobre usted y corregir cualquier dato inexacto.</li>
              <li><strong>Eliminación (Hábeas Data / GDPR / CCPA):</strong> Tiene derecho a solicitar la eliminación de sus datos personales de nuestras bases de datos en cualquier momento.</li>
              <li><strong>Oposición al marketing:</strong> Puede darse de baja o rechazar los correos electrónicos o llamadas de contacto comercial.</li>
            </ul>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Para ejercer cualquiera de estos derechos, por favor envíe una solicitud formal a: <a href="mailto:privacidad@globalservices-ven.com" className="text-sky-400 underline">privacidad@globalservices-ven.com</a>.
            </p>
          </section>

          {/* Contact Details Footer */}
          <div className="pt-8 border-t border-white/5 text-center sm:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 font-medium">
              Última actualización: Mayo de 2026. <br />
              CSSG Global, todos los derechos reservados.
            </div>
            <a 
              href="/"
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Volver al inicio
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
