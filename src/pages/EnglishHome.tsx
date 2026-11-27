import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck, Plane, Briefcase, Landmark, FileSearch, Radar, Cpu, Route as RouteIcon,
  ArrowRight, ChevronDown, Phone, Award, Clock, Users, Globe2,
} from 'lucide-react';
import EnglishPagesNav from '../components/EnglishPagesNav';

// /en — English home page for international buyers: investors, executives, corporate security and
// diplomatic missions coming to Venezuela. Positions CSSG as the direct, accountable provider.
// The Spanish home (/) is untouched; both are linked with hreflang in postbuild.js.
// Its FAQPage JSON-LD lives in postbuild.js (same questions as FAQS below — keep them in sync).
// Facts mirror the CECOM-Intel guides (src/pages/cecom-intel/guides.ts) and public/llms.txt.

const BRIEFING_URL = '/secure-ground#book';
const PHONE = '+58 414 317 4373';

const PROOF = [
  { icon: Clock, value: '17+ years', label: 'without a security incident, since 2009' },
  { icon: Landmark, value: '12+ years', label: 'protecting G7 embassies in Caracas' },
  { icon: Award, value: 'ISO 9001:2015', label: 'certificate no. 580181, audited externally' },
  { icon: ShieldCheck, value: 'DIGESERVISP', label: 'authorized private security, unarmed' },
];

const SERVICES = [
  { icon: Briefcase, title: 'Executive protection for investors', text: 'Pre-trip assessment, vetted protection teams and secured ground transport for executives and investment delegations.', href: '/en/executive-protection-venezuela-investors' },
  { icon: Plane, title: 'Secure airport transfers', text: 'Meet and greet inside Maiquetía, executive or armored vehicles with vetted drivers, and journey management from our command center.', href: '/en/secure-airport-transfers-venezuela' },
  { icon: RouteIcon, title: 'Executive travel security', text: 'Secure Ground: before, during and after every trip, with GPS-tracked vehicles followed live from Caracas.', href: '/secure-ground' },
  { icon: Radar, title: 'Daily risk bulletin and 24/7 GSOC', text: 'CECOM-Intel: a sourced risk bulletin every morning at 06:30, real-time alerts and assessments of routes, hotels and sites.', href: '/cecom-intel' },
  { icon: ShieldCheck, title: 'Corporate security consulting', text: 'Risk assessments under ISO 31000, site surveys and security programs for multinational operations.', href: '/en/corporate-security-consulting' },
  { icon: Landmark, title: 'Diplomatic security', text: 'Protection of embassies, residences and missions under the protocols G7 missions require.', href: '/en/diplomatic-security' },
  { icon: FileSearch, title: 'Due diligence', text: 'Business, third-party and integrity checks on people and companies against judicial, tax, registry and open sources.', href: '/en/due-diligence-venezuela' },
  { icon: Cpu, title: 'Security technology', text: 'ShieldTrace PSIM: CCTV analytics, access control and GPS tracking in one dashboard for your site team.', href: '/en/technology' },
];

const DIRECT = [
  { icon: Users, title: 'Our own people', text: 'Own, vetted personnel in Caracas (Capital District and Miranda state). Elsewhere in Venezuela, vetted local partners coordinated live by our command center.' },
  { icon: Radar, title: 'Our own command center', text: 'The CECOM, our in-country GSOC in Caracas, follows every movement 24/7 with defined escalation to your head office.' },
  { icon: Globe2, title: 'One contract, in English', text: 'One accountable provider, reporting in English and invoicing in U.S. dollars through Company of Security and Service Global LLC (Miami).' },
];

const STEPS = [
  { n: '01', title: 'Before the trip', text: 'Assessment of the itinerary: hotel, venues, routes, timings and alternates, with a current risk briefing.' },
  { n: '02', title: 'In country', text: 'Daylight arrival when possible, a pre-identified team inside the terminal, approved routes and live follow-up from the CECOM.' },
  { n: '03', title: 'After the trip', text: 'A written report with what was observed and recommendations for the next visit.' },
];

// Keep in sync with the FAQPage JSON-LD of the 'en' route in postbuild.js.
const EN_HOME_FAQS = [
  { q: 'Is it safe to travel to Venezuela for business in 2026?', a: 'Business travel to Caracas is possible in 2026 with planning, but Venezuela remains a high-risk environment. The U.S. rates the country Level 3, “Reconsider Travel” (27 June 2026), and the UK advises against all travel to the border and mining regions. Consular support is limited, so plan a daylight arrival, a vetted airport transfer and a 24/7 operations center that follows the trip.' },
  { q: 'Do I need a licensed security company in Venezuela?', a: 'Yes. Private security companies in Venezuela need authorization from DIGESERVISP, under the Ministry of Interior, Justice and Peace. Ask any provider for its authorization and the geographic scope it covers. CSSG holds DIGESERVISP authorization for unarmed private security.' },
  { q: 'Are CSSG’s protection teams armed?', a: 'No. All CSSG services are unarmed. Protection relies on planning, vetted personnel, low-profile movements and live follow-up from our command center.' },
  { q: 'Which areas of Venezuela do you cover?', a: 'Our own teams operate in Caracas (Capital District and Miranda state). Elsewhere in Venezuela, including Zulia, Anzoátegui, Mérida and Lara, we work with vetted local partners coordinated live by the CECOM. Risk analysis covers the whole country.' },
  { q: 'Can you invoice in U.S. dollars?', a: 'Yes. Invoicing in U.S. dollars is available through Company of Security and Service Global LLC, our Miami company.' },
  { q: 'How quickly can you respond to a request?', a: 'We reply to any request within 24 hours. A free 30-minute briefing in English with a senior specialist is the usual first step.' },
];

const GUIDES = [
  { href: '/cecom-intel/venezuela-security-outlook-2026', label: 'Is it safe to travel to Venezuela in 2026?' },
  { href: '/cecom-intel/venezuela-business-travel-from-uk', label: 'Business travel to Venezuela from the UK' },
  { href: '/cecom-intel/venezuela-business-travel-from-us', label: 'Business travel to Venezuela from the U.S.' },
  { href: '/cecom-intel/doing-business-in-venezuela-security-guide', label: 'Doing business in Venezuela: security guide' },
  { href: '/cecom-intel/executive-travel-venezuela-journey-management', label: 'Executive travel and journey management' },
  { href: '/cecom-intel/venezuela-travel-advisory-by-state', label: 'Venezuela travel advisory by state' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 bg-white/5 backdrop-blur-xl rounded-2xl">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5">
        <h3 className="text-white font-bold">{q}</h3>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-sky-400">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      {/* The answer stays in the DOM (prerendered for crawlers); only its height animates. */}
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-5 text-gray-400 leading-relaxed">{a}</p>
        </motion.div>
    </div>
  );
}

export default function EnglishHome() {
  useEffect(() => {
    document.title = 'Security Company in Venezuela for International Firms | CSSG';
    document.documentElement.lang = 'en';
  }, []);

  return (
    <div className="bg-[#0B0B0F] text-white">
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="inline-block px-4 py-1.5 mb-8 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] text-sky-400 border border-sky-500/30 bg-sky-500/5">
            Caracas · Miami · Since 2009
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] mb-6">
            Security company in Venezuela for <span className="text-sky-400">international companies and investors</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp}
            className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            CSSG Global protects executives, investors, diplomatic missions and multinational operations in Venezuela,
            directly and in English, with our own people and our own command center in Caracas.
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={BRIEFING_URL}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-colors">
              Book a free 30-minute briefing <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-bold transition-colors">
              <Phone className="w-5 h-5 text-sky-400" /> {PHONE} · 24/7
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 pb-20" aria-label="Track record">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PROOF.map(p => (
            <motion.div key={p.value} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/5">
              <p.icon className="w-6 h-6 text-[#EAB308] mb-3" aria-hidden="true" />
              <p className="text-lg sm:text-2xl font-black tracking-tight break-words">{p.value}</p>
              <p className="text-sm text-gray-400 mt-1">{p.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Direct, accountable provider */}
      <section className="px-6 py-20 border-y border-white/5 bg-[#030305]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">One accountable provider on the ground</h2>
            <p className="text-gray-400 leading-relaxed">
              Your security in Venezuela should not pass through layers of subcontractors you never meet.
              With CSSG you deal directly with the company that plans, staffs and follows every movement.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DIRECT.map(d => (
              <motion.div key={d.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/5">
                <d.icon className="w-7 h-7 text-sky-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                <p className="text-gray-400 leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">Security services in Venezuela</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(s => (
              <motion.div key={s.href} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link to={s.href} className="group flex flex-col h-full p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/5 hover:border-sky-500/40 transition-colors">
                  <s.icon className="w-6 h-6 text-sky-400 mb-4" aria-hidden="true" />
                  <h3 className="font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed flex-grow">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-400">
                    Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How a trip works */}
      <section className="px-6 py-20 border-y border-white/5 bg-[#030305]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-12">How we protect a trip to Venezuela</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map(s => (
              <motion.div key={s.n} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/5">
                <p className="text-sm font-black text-[#EAB308] tracking-widest mb-3">{s.n}</p>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">Questions international clients ask us</h2>
          <div className="space-y-3">
            {EN_HOME_FAQS.map(f => <Faq key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/5">
          <h2 className="text-2xl font-black tracking-tight mb-2">Field guides from CECOM-Intel</h2>
          <p className="text-gray-400 mb-6">Sourced, dated guides from our risk analysis unit in Caracas.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {GUIDES.map(g => (
              <Link key={g.href} to={g.href} className="group flex items-center justify-between gap-3 p-4 rounded-xl border border-white/5 hover:border-sky-500/40 transition-colors">
                <span className="font-semibold">{g.label}</span>
                <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center border-t border-white/5 bg-[#030305]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Planning a trip or an operation in Venezuela?</h2>
          <p className="text-gray-400 mb-8">Book a free 30-minute briefing in English with a senior CSSG specialist. We reply to every request within 24 hours.</p>
          <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} href={BRIEFING_URL}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold transition-colors">
            Book a free briefing <ArrowRight className="w-5 h-5" />
          </motion.a>
          <p className="text-sm text-gray-500 mt-6">
            Versión en español: <Link to="/" className="text-sky-400 hover:underline" hrefLang="es" lang="es">cssg-global.com</Link>
          </p>
        </div>
      </section>

      <div className="px-6 pb-16">
        <EnglishPagesNav current="/en" accent="#0EA5E9" />
      </div>
    </div>
  );
}
