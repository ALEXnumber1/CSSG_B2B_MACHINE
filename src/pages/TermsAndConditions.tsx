import { motion } from 'framer-motion';
import { ShieldAlert, FileText, CheckCircle, Scale, Gavel, Award } from 'lucide-react';
import { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 bg-[#030305] text-gray-300 relative z-10 pt-28 pb-20 overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-sky-800/10 rounded-full blur-[150px]" />
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
            <ShieldAlert className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-black text-sky-300 uppercase tracking-widest">Estructura Legal y Normativa</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-none">
            Términos <br />
            <span className="text-sky-400">& Condiciones</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Acuerdo legal vinculante que regula el uso de los portales web y servicios tecnológicos de CSSG Global.
          </p>
        </motion.div>

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0A0B10] border border-white/10 rounded-3xl p-8 md:p-12 space-y-12 shadow-2xl backdrop-blur-sm select-none"
        >
          {/* Section 1: Introduction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">1. Aceptación de los Términos</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Al acceder, navegar o utilizar este sitio web, usted reconoce haber leído, entendido y aceptado quedar obligado por los presentes Términos y Condiciones de Uso. Si usted no está de acuerdo con estos términos, le solicitamos abstenerse de utilizar los servicios digitales de <strong>Company Of Security And Service Global C.A. (CSSG)</strong>.
            </p>
          </section>

          {/* Section 2: Property & Copyright */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Award className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">2. Propiedad Intelectual</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Todos los contenidos que se muestran o se ponen a disposición a través de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes, código fuente, patentes de software (incluyendo la suite de software ShieldTrace PSIM) están protegidos por leyes de propiedad intelectual de los Estados Unidos de América y de la República Bolivariana de Venezuela.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              Está estrictamente prohibida la copia, reproducción, modificación o distribución no autorizada de estos materiales sin el consentimiento expreso y por escrito de CSSG.
            </p>
          </section>

          {/* Section 3: User obligations */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <CheckCircle className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">3. Uso Correcto de los Servicios</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Como usuario de este portal, usted se compromete a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
              <li>No utilizar el sitio web para fines ilegales o no autorizados por la legislación vigente de EE.UU. y Venezuela.</li>
              <li>No intentar vulnerar las medidas de seguridad perimetrales de la plataforma.</li>
              <li>Suministrar información verídica y verificable en los formularios de contacto y postulación.</li>
            </ul>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Scale className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">4. Limitación de Responsabilidad</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Aunque en CSSG aplicamos los más altos estándares de calidad (Cisco-Grade, ISO 9001:2015), no garantizamos que el sitio web esté libre de interrupciones técnicas imprevistas o variaciones temporales de rendimiento. CSSG no será responsable por ningún daño directo o indirecto resultante del uso de este sitio web.
            </p>
          </section>

          {/* Section 5: Legal jurisdiction */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-white mb-2">
              <Gavel className="w-5 h-5 text-sky-400" />
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">5. Jurisdicción y Legislación Aplicable</h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Estos Términos y Condiciones se rigen e interpretan de acuerdo con las leyes federales de los Estados Unidos de América y las leyes de la República Bolivariana de Venezuela. Cualquier controversia será resuelta en los tribunales competentes de cada jurisdicción correspondiente al domicilio operativo de CSSG.
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
