import { useId } from 'react';

// Approved CECOM-Intel artwork: line map of Latin America with a magnifier over Venezuela.
// Path data copied verbatim from the approved design (420 × 490 viewBox). Do not redraw.
const MAP_PATH = 'M12.1 26.4H23.6M14.3 31.2H22.8M28.0 31.2H38.4M54.7 31.2H64.2M16.9 36.0H23.5M31.6 36.0H70.4M19.6 40.8H26.2M34.2 40.8H72.8M81.8 40.8H87.9M25.9 45.6H30.8M37.0 45.6H92.3M22.2 50.4H33.6M43.5 50.4H96.0M30.1 55.2H38.3M47.1 55.2H98.1M195.4 55.2H200.8M202.3 55.2H203.9M35.6 60.0H40.1M49.2 60.0H107.8M35.8 64.8H42.9M55.4 64.8H105.9M198.4 64.8H201.4M42.8 69.6H47.4M60.9 69.6H105.2M200.9 69.6H202.3M46.1 74.4H47.1M65.0 74.4H104.9M173.0 74.4H191.0M67.4 79.2H105.4M166.9 79.2H170.2M189.0 79.2H202.7M68.3 84.0H107.5M140.8 84.0H157.6M198.4 84.0H211.5M67.9 88.8H110.8M139.8 88.8H154.4M201.8 88.8H207.8M208.3 88.8H215.3M73.3 93.6H113.4M136.4 93.6H153.9M225.7 93.6H243.9M81.7 98.4H151.3M200.0 98.4H208.3M230.3 98.4H232.9M252.0 98.4H258.7M91.7 103.2H150.8M104.2 108.0H116.7M121.5 108.0H148.1M128.7 112.8H174.7M134.0 117.6H174.7M149.1 122.4H152.6M154.7 122.4H173.4M157.5 127.2H172.9M229.1 127.2H232.5M162.0 132.0H172.0M218.2 132.0H220.3M222.4 132.0H228.2M162.6 136.8H174.5M211.8 136.8H224.4M278.3 136.8H282.1M171.2 141.6H179.3M191.0 141.6H198.7M209.2 141.6H223.0M174.5 146.4H189.9M198.2 146.4H226.8M185.9 151.2H189.0M199.6 151.2H227.0M283.5 151.2H293.6M202.8 156.0H240.1M281.0 156.0H297.7M202.4 160.8H250.2M281.8 160.8H314.8M203.1 165.6H249.0M281.6 165.6H313.3M203.2 170.4H251.3M265.5 170.4H315.2M324.8 170.4H329.6M197.8 175.2H250.8M265.9 175.2H313.7M322.5 175.2H331.1M195.4 180.0H253.0M266.5 180.0H334.8M190.1 184.8H333.1M188.5 189.6H341.3M186.1 194.4H355.5M185.8 199.2H190.4M190.5 199.2H361.3M189.7 204.0H385.6M184.9 208.8H392.5M184.6 213.6H402.3M184.6 218.4H406.4M190.8 223.2H407.6M193.5 228.0H407.2M196.4 232.8H406.1M198.6 237.6H402.1M201.0 242.4H397.4M203.5 247.2H394.6M206.3 252.0H391.0M207.6 256.8H387.7M210.4 261.6H387.9M217.1 266.4H388.0M225.3 271.2H387.1M231.8 276.0H386.3M236.9 280.8H384.4M237.6 285.6H383.8M237.9 290.4H380.2M238.0 295.2H378.5M237.3 300.0H374.0M236.7 304.8H359.5M236.0 309.6H349.2M235.2 314.4H343.8M234.7 319.2H341.4M234.3 324.0H341.8M232.7 328.8H340.8M231.5 333.6H336.5M231.7 338.4H333.6M230.7 343.2H330.2M231.4 348.0H324.5M230.6 352.8H321.8M229.2 357.6H294.0M295.0 357.6H317.4M227.2 362.4H298.1M225.3 367.2H299.4M223.6 372.0H301.7M221.5 376.8H298.3M222.5 381.6H275.4M279.1 381.6H281.9M221.1 386.4H275.8M220.0 391.2H263.6M264.2 391.2H275.0M219.2 396.0H262.4M218.2 400.8H221.4M225.0 400.8H267.1M223.8 405.6H261.5M217.0 410.4H260.5M216.1 415.2H251.3M211.5 420.0H252.2M214.4 424.8H258.8M211.8 429.6H253.6M211.8 434.4H249.9M212.5 439.2H243.7M213.7 444.0H243.7M284.7 444.0H289.7M291.1 444.0H296.4M216.2 448.8H240.0M219.2 453.6H223.3M224.9 453.6H234.0M236.2 453.6H247.8M226.2 458.4H254.4M239.9 463.2H251.5';
const VENEZUELA_PATH = 'M228.2 132.0H229.7M236.1 132.0H244.9M224.4 136.8H230.1M232.0 136.8H258.8M265.0 136.8H273.8M223.0 141.6H229.7M232.7 141.6H282.6M226.8 146.4H287.7M227.0 151.2H283.5M240.1 156.0H281.0M250.2 160.8H281.8M249.0 165.6H281.6M251.3 170.4H265.5M250.8 175.2H265.9M253.0 180.0H266.5';
const CX = 256.9;
const CY = 152.4;

/** The map-and-magnifier mark. Gradient/filter ids are unique per instance (useId). */
export function CecomIntelMap({ className, label }: { className?: string; label: string }) {
  const id = useId().replace(/:/g, '');
  const g = `ci-g-${id}`, f = `ci-f-${id}`, c = `ci-c-${id}`;
  return (
    <svg viewBox="0 0 420 490" role="img" aria-label={label} className={className} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF4C4" />
          <stop offset="0.3" stopColor="#E6C45A" />
          <stop offset="0.5" stopColor="#9C7619" />
          <stop offset="0.62" stopColor="#F3D57A" />
          <stop offset="1" stopColor="#8A6614" />
        </linearGradient>
        <filter id={f} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.8" result="b" />
          <feSpecularLighting in="b" surfaceScale="2.5" specularConstant="0.9" specularExponent="20" lightingColor="#FFFFFF" result="s">
            <feDistantLight azimuth="235" elevation="42" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="si" />
          <feComposite in="SourceGraphic" in2="si" operator="arithmetic" k1="0" k2="1" k3="0.75" k4="0" result="lit" />
          <feDropShadow in="lit" dx="0" dy="2" stdDeviation="1.6" floodColor="#000000" floodOpacity="0.85" />
        </filter>
        <clipPath id={c}><circle cx={CX} cy={CY} r="34" /></clipPath>
      </defs>
      <path d={MAP_PATH} stroke="#CFCFCF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d={VENEZUELA_PATH} stroke={`url(#${g})`} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx={CX} cy={CY} r="36" fill="#050505" />
      <g clipPath={`url(#${c})`}>
        <g transform={`translate(${CX} ${CY}) scale(2.3) translate(${-CX} ${-CY})`}>
          <path d={MAP_PATH} stroke="#6E6E6E" strokeWidth="1.6" vectorEffect="non-scaling-stroke" fill="none" />
          <path d={VENEZUELA_PATH} stroke={`url(#${g})`} strokeWidth="2.4" vectorEffect="non-scaling-stroke" fill="none" />
        </g>
      </g>
      <g filter={`url(#${f})`} fill="none" stroke={`url(#${g})`} strokeLinecap="round">
        <circle cx={CX} cy={CY} r="36" strokeWidth="5" />
        <path d="M282.82 178.32L312.7 208.2" strokeWidth="9" />
      </g>
    </svg>
  );
}

/** Metallic "CECOM-intel" wordmark with the CSSG eagle and "by CSSG". Sizes come from CSS. */
export function CecomIntelWordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`ci-wordmark ${className}`} aria-label="CECOM-Intel by CSSG" role="img">
      <span className="ci-wordmark__name" aria-hidden="true">
        <span className="ci-wordmark__cecom">CECOM</span>
        <span className="ci-wordmark__intel">-intel</span>
      </span>
      <span className="ci-wordmark__by" aria-hidden="true">
        <img src="/cecom-intel/cssg-eagle.webp" alt="" width="230" height="196" />
        <span>by CSSG</span>
      </span>
    </span>
  );
}

export const CECOM_INTEL_FONTS =
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:ital,wght@0,700;1,500&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@500&display=swap';
