import { lazy, Suspense, useState, useEffect } from 'react';

const Interactive3DBackground = lazy(() => import('./Interactive3DBackground'));

const gradients = (
  <>
    <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
  </>
);

export default function HeroSpline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Defer Three.js until browser is idle — protects LCP and TBT
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(() => setMounted(true), { timeout: 2500 });
      return () => (window as any).cancelIdleCallback(id);
    }
    const id = setTimeout(() => setMounted(true), 1800);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {mounted && (
        <Suspense fallback={null}>
          <Interactive3DBackground />
        </Suspense>
      )}
      {gradients}
    </div>
  );
}
