// CSS-only particle field — replaces Three.js on the hero.
// Zero JS execution cost; animations run on the GPU compositor thread.

const COUNT = 60;

// Deterministic distribution using golden-ratio steps
const PARTICLES = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  x: (i * 61.8) % 100,
  y: (i * 38.2) % 100,
  size: 1 + (i % 3) * 0.6,
  dur: 6 + (i % 9) * 1.2,
  del: -((i * 1.7) % 12),
  op: 0.12 + (i % 5) * 0.07,
  glow: i % 5 === 0,
}));

export default function CSSParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes cssg-pfloat {
          0%   { transform: translate(0, 0); }
          30%  { transform: translate(7px, -13px); }
          60%  { transform: translate(-5px, -7px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: '#0EA5E9',
            opacity: p.op,
            boxShadow: p.glow ? `0 0 ${p.size * 3}px rgba(14,165,233,0.7)` : undefined,
            animation: `cssg-pfloat ${p.dur}s ${p.del}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
