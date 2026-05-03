import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Intranet from './pages/Intranet'
import Quejas from './pages/Quejas'
import RiskAnalysis from './pages/RiskAnalysis'
import QuienesSomos from './pages/QuienesSomos'
import Consultoria from './pages/Consultoria'
import Tecnologia from './pages/Tecnologia'
import Informes from './pages/Informes'
import Admin from './pages/Admin'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import FloatingCTA from './components/FloatingCTA'
import Licitaciones from './pages/Licitaciones'
import Partners from './pages/Partners'
import { EXTERNAL_LINKS } from './lib/externalLinks'
import PortalRRHH from './pages/PortalRRHH'
import TacticalChat from './components/TacticalChat'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen font-sans flex flex-col relative overflow-x-hidden">
        {/* Background ambient glow */}
        <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-900/20 rounded-full blur-[120px] mix-blend-screen mix-blend-screen opacity-50" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-800/10 rounded-full blur-[150px] mix-blend-screen mix-blend-screen opacity-30" />
        </div>

        <Navbar />

        <AnimatePresence mode="wait">
          <motion.div
            key={i18n.language}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col">
              <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/consultoria" element={<Consultoria />} />
            <Route path="/tecnologia" element={<Tecnologia />} />
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
          </Routes>
        </div>

        <footer className="border-t border-[#333345] py-16 text-sm text-gray-400 bg-[#030305] relative z-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Col */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-4 mb-8">
                  <img src="/logo.png" alt="CSSG Logo" className="h-20 w-20 object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.2)]" />
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
                  <a href="https://linkedin.com/company/cssg-global" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  <a href="https://instagram.com/cssg_global" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a href="https://youtube.com/@cssgglobal" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center hover:border-sky-500/50 hover:text-sky-400 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.612 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </a>
                </div>
              </div>

              {/* Navigation Col */}
              <div>
                <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.col_company')}</h5>
                <ul className="space-y-4">
                  <li><Link to="/quienes-somos" className="hover:text-sky-400 transition-colors">{t('nav.quienes_somos')}</Link></li>
                  <li><Link to="/licitaciones" className="hover:text-sky-400 transition-colors">{t('nav.licitaciones')}</Link></li>
                  <li><Link to="/partners" className="hover:text-sky-400 transition-colors">{t('nav.partners')}</Link></li>
                  <li><Link to="/blog" className="hover:text-sky-400 transition-colors">{t('footer.news')}</Link></li>
                </ul>
              </div>

              {/* Services Col */}
              <div>
                <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.col_services')}</h5>
                <ul className="space-y-4">
                  <li><Link to="/consultoria" className="hover:text-sky-400 transition-colors">{t('footer.tactical')}</Link></li>
                  <li><Link to="/tecnologia" className="hover:text-sky-400 transition-colors">{t('footer.electronic')}</Link></li>
                  <li><Link to="/informes" className="hover:text-sky-400 transition-colors">{t('footer.pestel')}</Link></li>
                  <li><Link to="/quejas" className="hover:text-sky-400 transition-colors">{t('footer.customer')}</Link></li>
                </ul>
              </div>

              {/* Legal/Portals Col */}
              <div>
                <h5 className="text-white font-bold text-xs uppercase tracking-widest mb-6">{t('footer.col_access')}</h5>
                <ul className="space-y-4">
                  <li><Link to="/portal-rrhh" className="hover:text-sky-400 transition-colors">{t('footer.officer')}</Link></li>
                  <li><Link to="/admin" className="hover:text-sky-400 transition-colors">{t('footer.admin')}</Link></li>
                  <li><a href={EXTERNAL_LINKS.recruitmentEmail} className="hover:text-sky-400 transition-colors">{t('footer.recruitment')}</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[10px] text-gray-600 uppercase tracking-widest">{t('footer.rights', { year })}</p>
              <div className="flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
                <span className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.privacy')}</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">{t('footer.terms')}</span>
                <span className="hover:text-gray-300 transition-colors cursor-pointer">ISO 9001:2015</span>
              </div>
            </div>
          </div>
        </footer>
      </motion.div>
      </AnimatePresence>
    </div>
      <FloatingCTA />
      <TacticalChat />
    </BrowserRouter>
  )
}

export default App
