import { lazy, Suspense } from 'react';

// Carga diferida del fondo 3D pesado para mejorar el rendimiento inicial (PageSpeed)
const Interactive3DBackground = lazy(() => import('./Interactive3DBackground'));

export default function HeroSpline() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 bg-[#030305]" />}>
        <Interactive3DBackground />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
    </div>
  );
}
