import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';



const navLinks = [
  { to: '/', tKey: 'nav.inicio', external: false },
  { to: '/quienes-somos', tKey: 'nav.quienes_somos', external: false },
  { to: '/consultoria', tKey: 'nav.consultoria', external: false },
  { to: '/tecnologia', tKey: 'nav.tecnologia', external: false },
  { to: '/blog', tKey: 'nav.blog', external: false },
];

const resourceLinks = [
  { to: '/analisis-riesgo', tKey: 'nav.riesgos', external: false },
  { to: '/informes', tKey: 'nav.informes', external: false },
  { to: '/licitaciones', tKey: 'nav.licitaciones', external: false },
  { to: '/partners', tKey: 'nav.partners', external: false },
  { to: '/portal-rrhh', tKey: 'nav.portal', external: false },
  { to: '/quejas', tKey: 'nav.quejas', external: false },
  { to: '/admin', tKey: 'footer.admin', external: false },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-[#0B0B0F]/80 backdrop-blur-md border-b border-[#333345]"
      >
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 cursor-pointer" onClick={() => setMobileOpen(false)}>
            <img 
              src="/logo.png" 
              alt="CSSG Logo" 
              className="h-20 w-20 object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-transform hover:scale-110"
            />
            <div className="hidden sm:block">
              <h1 className="text-white font-black leading-none tracking-tight text-2xl">CSSG</h1>
              <div className="flex flex-col mt-1">
                <p className="text-[11px] text-sky-400 font-mono tracking-[0.1em] uppercase whitespace-nowrap font-bold">Company Of Security And Service Global C.A.</p>
                <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">RIF: J-29782024-8</p>
              </div>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-1 text-sm font-medium text-gray-300 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === link.to 
                    ? 'text-sky-400 bg-sky-500/10' 
                    : 'hover:text-sky-400 hover:bg-white/5'
                }`}
              >
                {t(link.tKey)}
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button 
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                  resourceLinks.some(l => l.to === location.pathname)
                    ? 'text-sky-400 bg-sky-500/10'
                    : 'hover:text-sky-400 hover:bg-white/5'
                }`}
              >
                {t('nav.recursos')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-[#0D0F16] border border-white/10 rounded-xl shadow-2xl p-2 overflow-hidden z-[60]"
                  >
                    {resourceLinks.map((link) => (
                      link.external ? (
                        <a
                          key={link.to}
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 rounded-lg text-sm transition-all text-gray-400 hover:text-white hover:bg-white/5"
                        >
                          {t(link.tKey)}
                        </a>
                      ) : (
                        <Link
                          key={link.to}
                          to={link.to!}
                          onClick={() => setResourcesOpen(false)}
                          className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                            location.pathname === link.to 
                              ? 'text-sky-400 bg-sky-500/5' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {t(link.tKey)}
                        </Link>
                      )
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1 ml-4">
              <button 
                onClick={() => changeLanguage('en')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-medium ${i18n.language.startsWith('en') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:text-white'}`}
              >
                <img src="https://flagcdn.com/us.svg" alt="Miami" className="w-4 h-3 object-cover rounded-[2px]" /> <span className="hidden xl:inline">Miami</span>
              </button>
              <button 
                onClick={() => changeLanguage('es')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-xs font-medium ${i18n.language.startsWith('es') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400 hover:text-white'}`}
              >
                <img src="https://flagcdn.com/ve.svg" alt="Venezuela" className="w-4 h-3 object-cover rounded-[2px]" /> <span className="hidden xl:inline">Venezuela</span>
              </button>
            </div>

            <a 
              href="/#contacto"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="ml-4 px-6 py-2.5 bg-sky-500 text-white rounded-lg hover:bg-sky-400 transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] text-sm font-semibold whitespace-nowrap"
            >
              {t('nav.contactar')}
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-[#0B0B0F]/98 backdrop-blur-xl pt-24 px-8 flex flex-col lg:hidden"
            >
              <div className="flex flex-col gap-2">
                {[...navLinks, ...resourceLinks].map((link) => (
                  link.external ? (
                    <a
                      key={(link as any).to}
                      href={(link as any).to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl text-lg font-medium transition-colors text-gray-400"
                    >
                      {t(link.tKey)}
                    </a>
                  ) : (
                    <Link
                      key={link.to}
                      to={link.to!}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                        location.pathname === link.to ? 'bg-sky-500/10 text-sky-400' : 'text-gray-400'
                      }`}
                    >
                      {t(link.tKey)}
                    </Link>
                  )
                ))}
              </div>

              <div className="mt-auto mb-10 space-y-6">
                <div className="grid grid-cols-2 gap-3 p-1 bg-black/40 border border-white/10 rounded-xl">
                  <button onClick={() => { changeLanguage('en'); setMobileOpen(false); }} className={`flex items-center justify-center gap-2 py-3 rounded-lg ${i18n.language.startsWith('en') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400'}`}>
                    <img src="https://flagcdn.com/us.svg" alt="Miami" className="w-5 h-3.5 object-cover rounded-sm" /> Miami
                  </button>
                  <button onClick={() => { changeLanguage('es'); setMobileOpen(false); }} className={`flex items-center justify-center gap-2 py-3 rounded-lg ${i18n.language.startsWith('es') ? 'bg-sky-500/20 text-sky-400' : 'text-gray-400'}`}>
                    <img src="https://flagcdn.com/ve.svg" alt="Venezuela" className="w-5 h-3.5 object-cover rounded-sm" /> Venezuela
                  </button>
                </div>
                <a 
                  href="/#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full py-4 bg-sky-500 text-white rounded-xl text-center font-bold"
                >
                  {t('nav.contactar')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
