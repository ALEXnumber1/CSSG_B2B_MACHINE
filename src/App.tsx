import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import FloatingCTA from './components/FloatingCTA'
import TacticalChat from './components/TacticalChat'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import FeedbackButton from './components/FeedbackButton'
import { EXTERNAL_LINKS } from './lib/externalLinks'

const Home = lazy(() => import('./pages/Home'))
const Intranet = lazy(() => import('./pages/Intranet'))
const Quejas = lazy(() => import('./pages/Quejas'))
const RiskAnalysis = lazy(() => import('./pages/RiskAnalysis'))
const QuienesSomos = lazy(() => import('./pages/QuienesSomos'))
const Consultoria = lazy(() => import('./pages/Consultoria'))
const EscudoDiplomatico = lazy(() => import('./pages/EscudoDiplomatico'))
const EsrmReadiness = lazy(() => import('./pages/EsrmReadiness'))
const Tecnologia = lazy(() => import('./pages/Tecnologia'))
const TecnologiaEn = lazy(() => import('./pages/TecnologiaEn'))
const StreamingMeeting = lazy(() => import('./pages/StreamingMeeting'))
const NotFound = lazy(() => import('./pages/notfound'))
const Informes = lazy(() => import('./pages/Informes'))
const Admin = lazy(() => import('./pages/Admin'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Licitaciones = lazy(() => import('./pages/Licitaciones'))
const Partners = lazy(() => import('./pages/Partners'))
const PortalRRHH = lazy(() => import('./pages/PortalRRHH'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Testimonios = lazy(() => import('./pages/Testimonios'))

// Risk Advisory Services — sub-pages
const EvaluacionRiesgos = lazy(() => import('./pages/consultoria/EvaluacionRiesgos'))
const DiagnosticoMadurez = lazy(() => import('./pages/consultoria/DiagnosticoMadurez'))
const SiteSurvey = lazy(() => import('./pages/consultoria/SiteSurvey'))
const AuditoriaCumplimiento = lazy(() => import('./pages/consultoria/AuditoriaCumplimiento'))
const SeguridadDiplomatica = lazy(() => import('./pages/consultoria/SeguridadDiplomatica'))
const EvaluacionResidencias = lazy(() => import('./pages/consultoria/EvaluacionResidencias'))
const DueDiligence = lazy(() => import('./pages/consultoria/DueDiligence'))
const InteligenciaRiesgo = lazy(() => import('./pages/consultoria/InteligenciaRiesgo'))
const InsiderThreat = lazy(() => import('./pages/consultoria/InsiderThreat'))
const ContinuidadNegocio = lazy(() => import('./pages/consultoria/ContinuidadNegocio'))
const GestionCrisis = lazy(() => import('./pages/consultoria/GestionCrisis'))
const ProteccionEjecutiva = lazy(() => import('./pages/consultoria/ProteccionEjecutiva'))
const MonitoreoTiempoReal = lazy(() => import('./pages/consultoria/MonitoreoTiempoReal'))
const CentroMandoCECOM = lazy(() => import('./pages/consultoria/CentroMandoCECOM'))
const ScoringSeguridad = lazy(() => import('./pages/consultoria/ScoringSeguridad'))
const FormacionPersonal = lazy(() => import('./pages/consultoria/FormacionPersonal'))
const RespuestaCrisisEquipos = lazy(() => import('./pages/consultoria/RespuestaCrisisEquipos'))
const ConcienciacionEjecutiva = lazy(() => import('./pages/consultoria/ConcienciacionEjecutiva'))
const CasosExito = lazy(() => import('./pages/consultoria/CasosExito'))
const CertificacionesConsultoria = lazy(() => import('./pages/consultoria/Certificaciones'))
const AsesoriaLegal = lazy(() => import('./pages/consultoria/AsesoriaLegal'))
const SecureLanding = lazy(() => import('./pages/consultoria/SecureLanding'))

// White Papers
const WPRiesgos = lazy(() => import('./pages/white-papers/WPRiesgos'))
const WPDueDiligence = lazy(() => import('./pages/white-papers/WPDueDiligence'))
const WPBCPPage = lazy(() => import('./pages/white-papers/WPBCPPage'))

function AppContent() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();
  const location = useLocation();
  const isStandaloneLanding = location.pathname === '/consultoria/escudo-diplomatico' || location.pathname === '/esrm-readiness';

  if (isStandaloneLanding) {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/consultoria/escudo-diplomatico" element={<EscudoDiplomatico />} />
            <Route path="/esrm-readiness" element={<EsrmReadiness />} />
          </Routes>
        </Suspense>
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen font-sans flex flex-col relative overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-800/10 rounded-full blur-[150px] mix-blend-screen opacity-30" />
        </div>

        <Navbar />

        <AnimatePresence mode="wait">
          <motion.div
            key={i18n.language}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col">
              <Suspense fallback={<div className="min-h-screen bg-[#0B0B0F]" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quienes-somos" element={<QuienesSomos />} />
                  <Route path="/consultoria" element={<Consultoria />} />
                  <Route path="/consultoria-seguridad-caracas" element={<Consultoria />} />
                  <Route path="/auditoria-seguridad-iso-31000" element={<Consultoria />} />
                  <Route path="/analisis-riesgos-corporativos-venezuela" element={<Consultoria />} />
                  <Route path="/optimizacion-costos-seguridad" element={<Consultoria />} />
                  <Route path="/consultoria/escudo-diplomatico" element={<EscudoDiplomatico />} />
                  <Route path="/tecnologia" element={<Tecnologia />} />
                  <Route path="/en/technology" element={<TecnologiaEn />} />
                  <Route path="/streaming" element={<StreamingMeeting />} />
                  <Route path="/informes" element={<Informes />} />
                  <Route path="/intranet" element={<Intranet />} />
                  <Route path="/quejas" element={<Quejas />} />
                  <Route path="/analisis-riesgo" element={<RiskAnalysis />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/licitaciones" element={<Licitaciones />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/portal-rrhh" element={<PortalRRHH />} />
                  <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
                  <Route path="/terminos-condiciones" element={<TermsAndConditions />} />
                  <Route path="/preguntas-frecuentes" element={<FAQ />} />
                  <Route path="/testimonios" element={<Testimonios />} />
                  {/* Risk Advisory Services — sub-pages */}
                  <Route path="/consultoria/evaluacion-de-riesgos-de-seguridad" element={<EvaluacionRiesgos />} />
                  <Route path="/consultoria/diagnostico-madurez-seguridad" element={<DiagnosticoMadurez />} />
                  <Route path="/consultoria/site-survey-evaluacion-fisica" element={<SiteSurvey />} />
                  <Route path="/consultoria/auditoria-de-cumplimiento" element={<AuditoriaCumplimiento />} />
                  <Route path="/consultoria/seguridad-misiones-diplomaticas" element={<SeguridadDiplomatica />} />
                  <Route path="/consultoria/evaluacion-residencias-cancillerias" element={<EvaluacionResidencias />} />
                  <Route path="/consultoria/due-diligence-corporativa" element={<DueDiligence />} />
                  <Route path="/consultoria/inteligencia-y-analisis-de-riesgo" element={<InteligenciaRiesgo />} />
                  <Route path="/consultoria/amenaza-interna-insider-threat" element={<InsiderThreat />} />
                  <Route path="/consultoria/continuidad-de-negocio" element={<ContinuidadNegocio />} />
                  <Route path="/consultoria/gestion-de-crisis-y-respuesta" element={<GestionCrisis />} />
                  <Route path="/consultoria/proteccion-ejecutiva-analisis-amenazas" element={<ProteccionEjecutiva />} />
                  <Route path="/consultoria/tecnologia/monitoreo-tiempo-real" element={<MonitoreoTiempoReal />} />
                  <Route path="/consultoria/tecnologia/centro-de-mando-cecom" element={<CentroMandoCECOM />} />
                  <Route path="/consultoria/tecnologia/scoring-de-seguridad" element={<ScoringSeguridad />} />
                  <Route path="/consultoria/capacitacion/formacion-personal-seguridad" element={<FormacionPersonal />} />
                  <Route path="/consultoria/capacitacion/respuesta-crisis-equipos" element={<RespuestaCrisisEquipos />} />
                  <Route path="/consultoria/capacitacion/concienciacion-ejecutiva" element={<ConcienciacionEjecutiva />} />
                  <Route path="/consultoria/casos-de-exito" element={<CasosExito />} />
                  <Route path="/consultoria/certificaciones" element={<CertificacionesConsultoria />} />
                  <Route path="/iso-9001-empresa-seguridad-venezuela" element={<CertificacionesConsultoria />} />
                  <Route path="/certificaciones-seguridad-corporativa-venezuela" element={<CertificacionesConsultoria />} />
                  <Route path="/consultoria/asesoria-legal-rrhh-seguridad" element={<AsesoriaLegal />} />
                  <Route path="/consultoria/secure-landing" element={<SecureLanding />} />
                  {/* White Papers */}
                  <Route path="/white-papers/guia-evaluacion-riesgos-seguridad-venezuela" element={<WPRiesgos />} />
                  <Route path="/white-papers/due-diligence-corporativa-venezuela" element={<WPDueDiligence />} />
                  <Route path="/white-papers/plan-continuidad-negocio-venezuela" element={<WPBCPPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>

            <footer className="border-t border-[#333345] py-16 text-sm text-gray-400 bg-[#030305] relative z-20">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-4 mb-8">
                      <img src="/logo.webp" alt="CSSG Logo" className="h-20 w-20 object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]" />
                      <div>
                        <h4 className="text-white font-black leading-none uppercase tracking-tighter text-2xl">CSSG</h4>
                        <div className="flex flex-col mt-1">
                          <p className="text-[10px] text-sky-400 font-mono tracking-wider uppercase leading-none mb-1 font-bold">Company Of Security And Service Global C.A.</p>
                          <p className="text-[9px] text-gray-600 font-mono tracking-widest uppercase leading-none">RIF: J-29782024-8</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">
                      {t('footer.about')}
                    </p>
                    <div className="flex gap-4">
                      <a href="https://linkedin.com/company/cssg-global" target="_blank" rel="noopener noreferrer" aria-label="CSSG en LinkedIn" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </a>
                      <a href="https://instagram.com/cssg_global" target="_blank" rel="noopener noreferrer" aria-label="CSSG en Instagram" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      </a>
                      <a href="https://youtube.com/@cssgglobal" target="_blank" rel="noopener noreferrer" aria-label="CSSG en YouTube" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.612 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                      </a>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.col_company')}</h5>
                    <ul className="space-y-4">
                      <li><Link to="/quienes-somos" className="hover:text-sky-400 transition-colors">{t('nav.quienes_somos')}</Link></li>
                      <li><Link to="/licitaciones" className="hover:text-sky-400 transition-colors">{t('nav.licitaciones')}</Link></li>
                      <li><Link to="/partners" className="hover:text-sky-400 transition-colors">{t('nav.partners')}</Link></li>
                      <li><Link to="/#ubicacion" className="hover:text-sky-400 transition-colors">{t('footer.contact')}</Link></li>
                      <li><Link to="/blog" className="hover:text-sky-400 transition-colors">{t('footer.news')}</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.col_services')}</h5>
                    <ul className="space-y-4">
                      <li><Link to="/consultoria" className="hover:text-sky-400 transition-colors">{t('footer.tactical')}</Link></li>
                      <li><Link to="/tecnologia" className="hover:text-sky-400 transition-colors">{t('footer.electronic')}</Link></li>
                      <li><Link to="/informes" className="hover:text-sky-400 transition-colors">{t('footer.pestel')}</Link></li>
                      <li><Link to="/quejas" className="hover:text-sky-400 transition-colors">{t('footer.customer')}</Link></li>
                      <li><Link to="/preguntas-frecuentes" className="hover:text-sky-400 transition-colors">Preguntas Frecuentes</Link></li>
                      <li><Link to="/testimonios" className="hover:text-sky-400 transition-colors">Opiniones</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.contact')}</h5>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-xs leading-relaxed">
                        <span className="text-sky-400 mt-1">📍</span>
                        <span className="text-gray-300">Calle la Joya, Edif. Cosmos, Piso 8, Ofic. 8B, Chacao, Caracas.</span>
                      </li>
                      <li className="flex items-center gap-3 text-xs">
                        <span className="text-sky-400">📞</span>
                        <a href="tel:+584241782091" className="text-gray-300 hover:text-sky-400 transition-colors font-mono font-bold">+58 424-178-2091</a>
                      </li>
                      <li><a href={EXTERNAL_LINKS.recruitmentEmail} className="hover:text-sky-400 transition-colors">{t('footer.recruitment')}</a></li>
                    </ul>
                  </div>
                </div>

                {/* Certification badges */}
                <div className="py-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-8">
                  <div className="flex flex-col items-center gap-2">
                    <img src="/iso-9001-badge.webp" alt="ISO 9001:2015 Certified Company" className="h-20 w-auto opacity-70 hover:opacity-100 transition-opacity" loading="lazy" />
                    <span className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">ISO 9001:2015</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <a
                      href="https://registry.blockmarktech.com/certificates/8310c0a4-9539-4caa-809a-4e68b3448881/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      <img
                        src="/cyber-essentials-badge.webp"
                        alt="Cyber Essentials Certified"
                        className="h-20 w-auto"
                        loading="lazy"
                        width="80"
                        height="80"
                      />
                    </a>
                    <span className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">Cyber Essentials</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <img
                      src="/ifpo-corporate-member.webp"
                      alt="IFPO Corporate Membership"
                      className="h-20 w-auto opacity-70 hover:opacity-100 transition-opacity rounded-lg"
                      loading="lazy"
                      width="152"
                      height="80"
                    />
                    <span className="text-[9px] text-sky-400 font-bold uppercase tracking-widest">IFPO Member</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                  <p className="text-[10px] text-gray-600 uppercase tracking-widest">{t('footer.rights', { year })}</p>
                  <div className="flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
                    <Link to="/politica-privacidad" className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.privacy')}</Link>
                    <Link to="/terminos-condiciones" className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.terms')}</Link>
                  </div>
                </div>
              </div>
            </footer>
          </motion.div>
        </AnimatePresence>
      </div>
      <FloatingCTA />
      <TacticalChat />
      <FeedbackButton />
      <CookieConsent />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-[#0B0B0F]/95 backdrop-blur-md border-t border-white/10 p-4 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center shrink-0">
            <span className="text-sky-400">📍</span>
          </div>
          <div>
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter leading-none mb-1">Dirección</p>
            <p className="text-[10px] text-white font-bold leading-none">Chacao, Caracas, Venezuela.</p>
          </div>
        </div>
        <a
          href="tel:+584241782091"
          className="bg-sky-500 text-white px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center gap-2"
        >
          <span>Llamar</span>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
        </a>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App