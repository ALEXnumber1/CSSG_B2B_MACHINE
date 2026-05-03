import Interactive3DBackground from './Interactive3DBackground';

export default function HeroSpline() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Interactive3DBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent z-10 pointer-events-none" />
    </div>
  );
}
