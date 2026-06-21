import { motion } from 'framer-motion';

// Simplified decorative continent paths (visual/illustrative, not GIS-precise)
// ViewBox: 1000 × 500  — standard Mercator-like proportions
const LAND = [
  // Greenland
  'M278,24 L338,22 L350,52 L340,84 L310,100 L280,88 L264,62 Z',
  // Iceland
  'M390,46 L410,42 L418,54 L406,64 L390,62 Z',
  // North America
  'M52,50 L92,34 L155,28 L198,33 L242,42 L270,60 L278,92 L268,132 L250,172 L218,207 L188,237 L158,256 L124,250 L88,226 L62,192 L44,148 L48,102 Z',
  // Central America / Caribbean coast
  'M180,258 L238,253 L264,280 L230,285 L180,272 Z',
  // South America
  'M175,268 L238,253 L265,282 L275,328 L270,388 L250,437 L226,470 L202,464 L177,440 L160,390 L152,332 L156,282 Z',
  // Scandinavia
  'M464,36 L490,28 L510,40 L514,66 L497,74 L474,70 L460,56 Z',
  // UK / Ireland
  'M430,64 L446,60 L450,76 L440,82 L428,74 Z',
  // Europe
  'M434,70 L480,62 L514,70 L526,90 L522,118 L502,136 L480,140 L460,124 L442,114 L428,92 Z',
  // Russia / Siberia (top band)
  'M528,28 L864,24 L874,44 L842,56 L788,53 L724,59 L668,49 L618,53 L560,49 L536,43 Z',
  // Asia (main body + Caspian/Middle East)
  'M536,46 L618,46 L662,56 L722,53 L788,49 L842,53 L874,40 L910,64 L914,110 L896,160 L864,207 L830,240 L792,250 L752,230 L712,254 L668,254 L610,224 L570,190 L542,160 L530,117 L527,84 Z',
  // Arabian peninsula
  'M540,150 L574,140 L600,150 L614,180 L602,217 L574,227 L550,207 L540,180 Z',
  // India
  'M604,224 L650,220 L670,260 L674,300 L647,330 L624,314 L604,270 Z',
  // Southeast Asia
  'M720,230 L770,220 L790,246 L774,270 L744,274 L722,257 Z',
  // Japan
  'M874,93 L894,89 L904,104 L900,129 L884,136 L874,120 Z',
  // Philippines (dot-cluster)
  'M820,193 L833,187 L840,196 L836,217 L821,220 L814,206 Z',
  // Africa
  'M432,152 L544,150 L568,194 L578,277 L562,360 L530,432 L506,449 L481,446 L458,422 L433,352 L422,262 L422,200 Z',
  // Madagascar
  'M584,318 L594,310 L602,328 L598,358 L582,362 L576,342 Z',
  // Australia
  'M764,314 L870,300 L910,344 L907,400 L870,440 L827,454 L780,440 L752,404 L747,354 L754,324 Z',
  // New Zealand
  'M944,387 L954,380 L960,397 L952,410 L942,407 Z',
  // Taiwan
  'M842,160 L850,155 L856,165 L851,175 L842,173 Z',
];

// Approximate Mercator position for Caracas, Venezuela (10.5°N, 66.9°W)
const CARACAS = { x: 218, y: 261 };

const SCAN_RINGS = [80, 140, 200];
const GRID_COUNT = 20;

export default function TacticalWorldMap() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl overflow-hidden border border-sky-500/15"
      style={{ background: 'linear-gradient(160deg, #020c18 0%, #030f22 40%, #020a14 100%)' }}
    >
      {/* ── OCEAN SHIMMER ── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #0c2d4a 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, #0a2035 0%, transparent 60%)',
        }}
      />

      {/* ── ANIMATED GRID LINES ── */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: GRID_COUNT + 1 }).map((_, i) => (
          <line key={`v${i}`} x1={i * (1000 / GRID_COUNT)} y1="0" x2={i * (1000 / GRID_COUNT)} y2="500" stroke="#38bdf8" strokeWidth="0.6" />
        ))}
        {Array.from({ length: Math.ceil(GRID_COUNT / 2) + 1 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * (500 / (GRID_COUNT / 2))} x2="1000" y2={i * (500 / (GRID_COUNT / 2))} stroke="#38bdf8" strokeWidth="0.6" />
        ))}
        {/* Equator & Prime Meridian */}
        <line x1="0" y1="250" x2="1000" y2="250" stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.5" />
        <line x1="500" y1="0" x2="500" y2="500" stroke="#0ea5e9" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.5" />
      </svg>

      {/* ── WORLD MAP SVG ── */}
      <svg
        viewBox="0 0 1000 500"
        className="relative w-full"
        style={{ display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a52" />
            <stop offset="100%" stopColor="#102030" />
          </linearGradient>
          <filter id="landGlow" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="scanGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pingGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Continent fills */}
        {LAND.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="url(#landGrad)"
            stroke="#1d4e6e"
            strokeWidth="0.8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 + i * 0.025 }}
            filter="url(#landGlow)"
          />
        ))}

        {/* Scan rings around Caracas */}
        {SCAN_RINGS.map((r, i) => (
          <motion.circle
            key={r}
            cx={CARACAS.x}
            cy={CARACAS.y}
            r={r}
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="0.6"
            strokeDasharray="4 6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.25, 0.08], scale: [0.5, 1, 1.05] }}
            transition={{ duration: 3.5, delay: 0.5 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}

        {/* Scan sweep */}
        <motion.circle
          cx={CARACAS.x}
          cy={CARACAS.y}
          r="220"
          fill="url(#scanGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        {/* Venezuela / Caracas marker */}
        {/* Outer ping */}
        <motion.circle
          cx={CARACAS.x}
          cy={CARACAS.y}
          r="14"
          fill="url(#pingGrad)"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 2.2, 2.2], opacity: [0.8, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 1 }}
        />
        {/* Inner dot */}
        <circle cx={CARACAS.x} cy={CARACAS.y} r="4" fill="#38bdf8" />
        <circle cx={CARACAS.x} cy={CARACAS.y} r="2" fill="#fff" />

        {/* Crosshair lines */}
        <line x1={CARACAS.x - 16} y1={CARACAS.y} x2={CARACAS.x - 8} y2={CARACAS.y} stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
        <line x1={CARACAS.x + 8} y1={CARACAS.y} x2={CARACAS.x + 16} y2={CARACAS.y} stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
        <line x1={CARACAS.x} y1={CARACAS.y - 16} x2={CARACAS.x} y2={CARACAS.y - 8} stroke="#38bdf8" strokeWidth="1" opacity="0.7" />
        <line x1={CARACAS.x} y1={CARACAS.y + 8} x2={CARACAS.x} y2={CARACAS.y + 16} stroke="#38bdf8" strokeWidth="1" opacity="0.7" />

        {/* Label */}
        <text x={CARACAS.x + 18} y={CARACAS.y - 6} fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="700" opacity="0.9">CARACAS</text>
        <text x={CARACAS.x + 18} y={CARACAS.y + 6} fill="#38bdf8" fontSize="7.5" fontFamily="monospace" opacity="0.65">10.48°N  66.90°O</text>

        {/* Corner HUD brackets */}
        {[
          [[8, 8], [8, 24], [24, 8]],
          [[992, 8], [992, 24], [976, 8]],
          [[8, 492], [8, 476], [24, 492]],
          [[992, 492], [992, 476], [976, 492]],
        ].map(([corner, p1, p2], ci) => (
          <g key={ci} stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" opacity="0.5">
            <line x1={corner[0]} y1={corner[1]} x2={p1[0]} y2={p1[1]} />
            <line x1={corner[0]} y1={corner[1]} x2={p2[0]} y2={p2[1]} />
          </g>
        ))}
      </svg>

      {/* ── HUD OVERLAY ── */}
      <div className="absolute top-3 left-4 flex flex-col gap-0.5 font-mono text-[9px] text-sky-400/60 pointer-events-none">
        <span>SYS · THREAT MAPPING v3.1</span>
        <span className="text-sky-400/40">REGIÓN: LATAM / CARIBE</span>
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-sky-400"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] text-sky-400/60 uppercase tracking-widest">LIVE SCAN</span>
      </div>

      <div className="absolute bottom-3 left-4 font-mono text-[8px] text-sky-400/35 pointer-events-none leading-4">
        <div>ISO 31000:2018 · ASIS ORM.1:2017 · FMEA</div>
        <div>COBERTURA: VENEZUELA / REGIÓN ANDINA</div>
      </div>

      <div className="absolute bottom-3 right-4 font-mono text-[9px] text-sky-400/45 pointer-events-none text-right">
        <motion.span
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          ◉ ZONA OPERATIVA ACTIVA
        </motion.span>
      </div>
    </motion.div>
  );
}
