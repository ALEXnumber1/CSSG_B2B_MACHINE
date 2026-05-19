import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cssg_cookie_consent');
    if (!consent) {
      // Small delay to make the entrance animation smooth after load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cssg_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cssg_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[999]"
        >
          <div className="bg-[#0B0B0F]/95 backdrop-blur-xl border border-[#333345] p-5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-4 relative overflow-hidden">
            {/* Decorative ambient background glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5" role="img" aria-label="cookie">🍪</span>
              <div className="flex flex-col gap-1">
                <h5 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Cookie Consent</h5>
                <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                  {t('cookieConsent.message')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/5">
              <Link 
                to="/politica-privacidad" 
                className="text-[10px] text-sky-400 hover:text-sky-300 hover:underline transition-colors uppercase font-mono tracking-wider font-bold"
              >
                {t('cookieConsent.moreInfo')}
              </Link>
              
              <div className="flex gap-2">
                <button
                  onClick={handleDecline}
                  className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-[10px] uppercase font-mono tracking-wider font-bold transition-all border border-white/5"
                >
                  {t('cookieConsent.decline')}
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-1.5 rounded bg-yellow-500 hover:bg-yellow-400 text-black text-[10px] uppercase font-mono tracking-wider font-black transition-all shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                >
                  {t('cookieConsent.accept')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
