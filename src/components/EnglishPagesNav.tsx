import { Link } from 'react-router-dom';

// Footer links between the English pages (the /en/ landings and CECOM-Intel), so each one passes
// visitors and search engines on to the rest instead of being a dead end. Each landing hides itself.

const PAGES = [
  { href: '/en/corporate-security-consulting', label: 'Corporate security consulting' },
  { href: '/en/executive-protection-venezuela-investors', label: 'Executive protection for investors' },
  { href: '/en/diplomatic-security', label: 'Diplomatic security' },
  { href: '/cecom-intel', label: 'CECOM-Intel: in-country GSOC' },
  { href: '/cecom-intel/partners', label: 'In-country partner program' },
];

// Guides for travel risk and duty-of-care managers.
const GUIDES = [
  { href: '/cecom-intel/venezuela-security-outlook-2026', label: 'Is it safe to travel to Venezuela in 2026?' },
  { href: '/cecom-intel/doing-business-in-venezuela-security-guide', label: 'Doing business in Venezuela: security guide' },
  { href: '/cecom-intel/executive-travel-venezuela-journey-management', label: 'Executive travel & journey management' },
];

export default function EnglishPagesNav({ current, accent }: { current: string; accent: string }) {
  return (
    <nav aria-label="More from CSSG" className="max-w-3xl mx-auto mb-8 grid gap-6 sm:grid-cols-2 text-left text-xs">
      <div>
        <p className="uppercase font-semibold mb-3" style={{ color: accent, letterSpacing: '.18em' }}>Services</p>
        <ul className="space-y-2">
          {PAGES.filter(p => p.href !== current).map(p => (
            <li key={p.href}><Link to={p.href} className="text-gray-400 hover:text-white transition-colors">{p.label}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <p className="uppercase font-semibold mb-3" style={{ color: accent, letterSpacing: '.18em' }}>Travel risk & duty of care</p>
        <ul className="space-y-2">
          {GUIDES.map(g => (
            <li key={g.href}><Link to={g.href} className="text-gray-400 hover:text-white transition-colors">{g.label}</Link></li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
