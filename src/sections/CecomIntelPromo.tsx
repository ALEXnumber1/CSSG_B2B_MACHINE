import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CecomIntelMap, CecomIntelWordmark, CECOM_INTEL_FONTS } from '../components/cecom-intel/CecomIntelMark';
import '../styles/cecom-intel.css';

const COPY = {
  es: {
    text: 'La capa de análisis de riesgo de CSSG Global: boletín diario de riesgo a las 06:30, alertas en tiempo real y evaluaciones a la medida de ciudades, rutas y sedes en Venezuela.',
    sample: 'Solicitar boletín de muestra',
    more: 'Conocer CECOM-Intel',
    map: 'Mapa lineal de Latinoamérica con Venezuela destacada bajo una lupa',
  },
  en: {
    text: 'CSSG Global’s risk analysis layer: a daily risk bulletin at 06:30, real-time alerts and tailored assessments of cities, routes and sites in Venezuela.',
    sample: 'Request a sample bulletin',
    more: 'Discover CECOM-Intel',
    map: 'Line map of Latin America with Venezuela highlighted under a magnifying glass',
  },
};

/** Home-page "window" into the CECOM-Intel sub-brand (black and metallic gold, not the site's blue). */
export default function CecomIntelPromo() {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'es';
  const copy = COPY[lang];
  const base = lang === 'en' ? '/cecom-intel' : '/cecom-intel/es';
  const ref = useRef<HTMLElement>(null);

  // The sub-brand fonts are only fetched once this block is about to be seen.
  useEffect(() => {
    const node = ref.current;
    if (!node || document.querySelector(`link[href="${CECOM_INTEL_FONTS}"]`)) return;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CECOM_INTEL_FONTS;
      document.head.appendChild(link);
      io.disconnect();
    }, { rootMargin: '400px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="ci-promo" aria-label="CECOM-Intel">
      <motion.div
        className="ci-promo__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CecomIntelMap className="ci-promo__map" label={copy.map} />
        <div className="ci-promo__copy">
          <CecomIntelWordmark className="ci-wordmark--lg" />
          <p className="ci-promo__tagline">Know, then decide.</p>
          <p className="ci-promo__text">{copy.text}</p>
          <div className="ci-promo__ctas">
            <Link to={`${base}#muestra`} className="ci-btn ci-btn--gold">{copy.sample}</Link>
            <Link to={base} className="ci-btn ci-btn--ghost">{copy.more}</Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
