import { motion } from 'framer-motion';
import { Wrench, Camera, Cpu, ArrowRight, Mail, Phone, ShieldCheck, Zap, Lock, CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function TecnologiaEn() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [subject, setSubject] = useState('');
  const [formData, setFormData] = useState({ nombre: '', empresa: '', correo: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const scrollToContact = (subj: string) => {
    setSubject(subj);
    document.getElementById('tech-conversion')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.empresa,
        mensaje: `Technology: Interest in ${subject}`,
        fuente: 'tecnologia_v5_en',
        score: 75
      }]);

      if (error) throw error;
      setStatus('success');
    } catch (err) {
      console.error('Error submitting form:', err);
      setStatus('error');
    }
  };

  const niches = [
    {
      id: 'ingenieria',
      image: "/images/tec_ingenieria.png",
      icon: <Wrench className="w-6 h-6" />,
      title: "Tactical Drones and Robotics",
      desc: "Aerial surveillance and automated patrolling for large perimeters without relying solely on physical guards.",
      features: [
        "Autonomous drone patrols with thermal detection",
        "Long-range motion sensors integrated into tactical networks",
        "Perimeter inspection robotics for high-risk zones",
        "Integration with C2 command centers for immediate response"
      ],
      color: 'from-sky-500/20 to-indigo-500/20',
      border: 'border-sky-500/30'
    },
    {
      id: 'cctv',
      image: "/images/tec_cecom.png",
      icon: <Camera className="w-6 h-6" />,
      title: "AI & Forensic Analytics",
      desc: "Systems that learn and detect threats before they occur, eliminating human error in monitoring.",
      features: [
        "Facial and License Plate Recognition (LPR) with real-time DB",
        "Anomalous behavior detection via Deep Learning algorithms",
        "Smart suspect search by clothing filters and traits",
        "Preventive critical alerts before the intrusion is completed"
      ],
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30'
    },
    {
      id: 'ia',
      image: "/images/tec_ia.png",
      icon: <Cpu className="w-6 h-6" />,
      title: "Security Engineering",
      desc: "Design of critical infrastructure with intelligent physical barriers and biometric access control.",
      features: [
        "High-tech electric fences with remote voltage monitoring",
        "Automatic barriers and bollards with vehicle impact resistance",
        "Multi-biometric readers (fingerprint, face, iris) for restricted zones",
        "Tactical lighting systems activated by movement and AI"
      ],
      color: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30'
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const }
    })
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20 overflow-hidden min-h-screen">
      {/* Immersive Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">
        {/* REDESIGNED HERO SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-20 mb-32"
        >
          {/* Tagline & Main Headline */}
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[10px] font-black text-sky-300 uppercase tracking-[0.3em]">Anticipation Technology</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-tight">
              Corporate security <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-400">is still reactive.</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-sky-400 bg-[length:200%_auto] animate-gradient-x">
                That is no longer enough.
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              We design the anticipation technology that the market does not offer.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => scrollToContact('Technical Evaluation')}
                className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20"
              >
                Request Technical Evaluation
              </button>
              <button 
                onClick={() => document.getElementById('tech-capabilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
              >
                See Technical Capabilities
              </button>
            </div>
          </div>

          {/* DRON FLOTANTE */}
          <motion.div 
            animate={{ 
              y: [0, -40, 0], 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-0 w-[450px] pointer-events-none hidden xl:block select-none opacity-40 mix-blend-screen z-10"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-sky-500/20 blur-[60px] rounded-full animate-pulse" />
              <img src="/images/tec_drone.png" alt="Drone" className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(14,165,233,0.3)]" />
            </div>
          </motion.div>

          {/* Detailed Content Grid */}
          <div id="tech-capabilities" className="space-y-32">
            
            {/* Section 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-500/10 border border-red-500/20">
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Diagnosis</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  The problem you <span className="text-red-400">already know.</span>
                </h2>
                <div className="text-gray-400 leading-relaxed space-y-4">
                  <p className="text-white font-bold text-lg">Cameras that record. Guards that respond. Alarms that sound later.</p>
                  <p>
                    The security industry specialized in reacting. But the threats faced by high-criticality facilities do not wait for you to react.
                  </p>
                  <p>
                    They are coordinated. They study your patterns. They explore your operational blind spots. And when they act, the damage is already done.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center text-red-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Current Risk Assessment</h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-semibold italic border-l-2 border-red-500/50 pl-4 py-1">
                    "The question is not if your security has failed. It's whether you know when it is about to fail."
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-4 mt-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Embassies</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Strategic Entities</span>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-xl text-[10px] text-gray-400 font-bold uppercase tracking-widest">Sensitive Infrastructure</span>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Market Uncertainties</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                  The doubts you <span className="text-amber-400">face.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    q: "Isn't this just more generic technology?",
                    a: "No. We don't sell imported, unadapted equipment. We design our own data analysis and security intelligence solutions, built for actual operational contexts."
                  },
                  {
                    q: "Does it work where I operate?",
                    a: "That is precisely why it exists. Our technology is developed for real operational conditions: complex logistics and non-conventional threats."
                  },
                  {
                    q: "Does it really anticipate, or just automate alerts?",
                    a: "We correlate data from multiple sources, detect threat patterns before risks materialize, and generate actionable operational intelligence."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <span className="text-4xl font-black text-amber-500/20">0{idx + 1}</span>
                    <h4 className="text-xl font-bold text-white tracking-tight">{item.q}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Capabilities</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                  What we <span className="text-sky-400">design.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    cap: "Predictive Correlation",
                    desc: "Real-time security event analysis to identify patterns before threat materialization."
                  },
                  {
                    cap: "Adaptive Detection",
                    desc: "Threat models adjusted to the specific operational context of each facility."
                  },
                  {
                    cap: "Proprietary Technology",
                    desc: "Independent development and support, with zero reliance on third-party global templates."
                  },
                  {
                    cap: "Critical Architecture",
                    desc: "Designed for high-criticality facilities: embassies, strategic entities, and sensitive infrastructure."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex items-start gap-6">
                    <div className="w-12 h-12 bg-sky-500/20 border border-sky-500/30 rounded-2xl flex items-center justify-center text-sky-400 shrink-0 mt-1">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-tight mb-2">{item.cap}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-3xl p-10 backdrop-blur-sm space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Proposal</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-tight">
                  Predictive technical vulnerability assessment
                </h3>
                <p className="text-gray-300 font-medium text-lg leading-relaxed">
                  Within 48 hours, we will identify operational blind spots that your current infrastructure does not see — and provide the specific design to close them.
                </p>
                <div className="space-y-4 border-t border-white/10 pt-6">
                  {[
                    "No purchase obligation",
                    "Detailed technical deliverable",
                    "Absolute confidentiality"
                  ].map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 font-medium">{bullet}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => scrollToContact('Technical Vulnerability Evaluation')}
                  className="w-full px-8 py-5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20"
                >
                  Request Technical Evaluation
                </button>
              </div>

              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Testimonials</span>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter">
                  Who operates with <span className="text-indigo-400">designed technology</span>, not installed?
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      quote: "We went from receiving alerts to anticipating situations. The operational difference is massive.",
                      author: "— Security Director, High-Criticality Facility"
                    },
                    {
                      quote: "Finally a technology that understands our context, not just an imported template.",
                      author: "— Chief of Physical Protection, Embassy"
                    }
                  ].map((t, tIdx) => (
                    <div key={tIdx} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm flex flex-col gap-4">
                      <p className="text-gray-300 font-medium italic text-lg">"{t.quote}"</p>
                      <p className="text-indigo-400 text-sm font-bold uppercase tracking-wider">{t.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Final CTA in redesigned Hero */}
            <div className="text-center bg-white/5 border border-white/10 hover:border-sky-500/30 rounded-3xl p-12 backdrop-blur-sm space-y-6 transition-all">
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter max-w-3xl mx-auto leading-tight">
                Discover our solutions that <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">reduce costs and improve quality</span> of service.
              </h3>
              <p className="text-gray-400 text-sm md:text-base font-medium max-w-xl mx-auto">
                Scroll down to explore our engineering and tactical software capabilities.
              </p>
              <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-3 px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 group animate-pulse mt-4 cursor-pointer"
              >
                <span>Discover Solutions</span>
                <ArrowRight className="w-4 h-4 rotate-90 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>

        {/* PERSUASIVE CONTENT BLOCKS */}
        <div id="servicios" className="space-y-40 mb-40">
          
          {/* Block 1: ShieldTrace PSIM */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Part 1: Headline & 8 Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">State-of-the-Art: HaaS</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  ShieldTrace PSIM: <br />
                  <span className="text-sky-400">Total Control in your hands.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">Predictive Innovation</p>
                  <p>
                    For years, organizations have invested thousands in isolated technology. Cameras, sensors, and security officers operate as silos, leaving invisible vulnerabilities. <strong>ShieldTrace PSIM</strong> is the central brain that integrates everything.
                  </p>
                </div>
                <div className="pt-4 hidden md:block relative group">
                  <div className="absolute -inset-2 bg-sky-500/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <img src="/images/haas2.png" alt="Security Ecosystem" className="w-full rounded-2xl border border-white/10 opacity-70 hover:opacity-100 transition-all duration-500 max-h-[160px] object-cover" />
                </div>
              </div>

              {/* 8 Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white tracking-tight">The 8 Pillars Approach</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our technology deconstructs security into critical interconnected nodes for a 360° real-time view:
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { p: "Human", d: "Active management and guard tour compliance." },
                    { p: "Canine (K9)", d: "Health and operational telemetry." },
                    { p: "Airborne (Drones)", d: "Autonomous surveillance with thermal sensors." },
                    { p: "Physical", d: "Mechanical integrity of walls and gates." },
                    { p: "Electronics (IoT)", d: "Seismic and motion sensor network." },
                    { p: "Cybersecurity", d: "Network integrity and Cisco-Grade protection." },
                    { p: "OSINT", d: "Social environment risk analysis." },
                    { p: "Critical Factor (Moral)", d: "Wellness and compliance supervision." }
                  ].map((pilar, pIdx) => (
                    <div key={pIdx} className="bg-white/5 border border-white/10 hover:border-sky-500/30 transition-all rounded-2xl p-5 backdrop-blur-sm flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-2" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-white tracking-tight">{pilar.p}</h4>
                        <p className="text-xs text-gray-400 leading-normal">{pilar.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 1.5 */}
            <div className="border-t border-white/5 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white tracking-tight">What is ShieldTrace PSIM?</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    ShieldTrace is a <strong>comprehensive security management platform (PSIM)</strong> designed to convert isolated data into operational intelligence. It's not just another software; it's the central brain that orchestrates all your devices, sensors, and personnel in a single intuitive panel.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-white tracking-tight">How does it work?</h3>
                  <div className="space-y-3">
                    {[
                      { t: "Non-intrusive connection", d: "The ShieldTrace tablet securely links to your security environment without requiring changes to internal networks or servers." },
                      { t: "Hybrid processing", d: "Our AI receives telemetry from all nodes (cameras, sensors, patrols, OSINT) and processes it in real time." },
                      { t: "Actionable decisions", d: "The system analyzes critical events and presents exactly the data needed to make decisions, eliminating operational noise." }
                    ].map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-3">
                        <span className="text-sky-400 font-bold shrink-0">{sIdx + 1}.</span>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          <strong className="text-white">{step.t}:</strong> {step.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-4 relative group hidden lg:block">
                <div className="absolute -inset-4 bg-sky-500/10 blur-2xl rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/images/HS3.png" 
                  alt="Command Center" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Part 2: Tablet Táctica */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-sky-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/images/HS1.jpg" 
                  alt="ShieldTrace PSIM Dashboard" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Secure Ecosystem</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  The Tactical Tablet: <span className="text-indigo-400">Your Security Assistant</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  We deliver a <strong>pre-configured military-grade security assistant</strong>. We don't perform intrusive installations; we provide you with an autonomous and customized device.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "Adapted KPIs", d: "Tailored to your organization's security and prevention KPIs." },
                    { num: "02", t: "Encrypted Channels", d: "Utilizes encrypted and non-intrusive communication channels." },
                    { num: "03", t: "Multi-Variable Intel", d: "Combines technological, logistical, human, and social data variables." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-indigo-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Part 3: Planes y Beneficios */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Commercial Flexibility</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Plans & <span className="text-emerald-400">Benefits</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { perfil: "Security Client", inv: "$0 (FREE)", desc: "Included as value-add in our guarding and physical protection contracts.", highlight: false },
                  { perfil: "Managers / Leads", inv: "From $40/mo", desc: "Total control of your security structure from your customized tablet.", highlight: true },
                  { perfil: "Enterprise", inv: "From $80/mo", desc: "Comprehensive solution with advanced reporting and multi-site support.", highlight: false }
                ].map((plan, pIdx) => (
                  <div 
                    key={pIdx} 
                    className={`bg-white/5 border ${plan.highlight ? 'border-emerald-500/40 bg-emerald-500/[0.02]' : 'border-white/10'} hover:border-emerald-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col justify-between h-full gap-6`}
                  >
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-white tracking-tight">{plan.perfil}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed min-h-[40px]">{plan.desc}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{plan.inv.split(' ')[0]}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{plan.inv.split(' ')[1] || ''}</span>
                      </div>
                      <button 
                        onClick={() => scrollToContact(`ShieldTrace PSIM Plan: ${plan.perfil}`)}
                        className="w-full py-4 bg-white/5 hover:bg-emerald-600 hover:text-white border border-white/10 hover:border-emerald-500 text-emerald-400 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center"
                      >
                        Request Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 4: FAQ */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Additional Info</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Frequently <span className="text-amber-400">Asked Questions</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "What is a PSIM?", a: "It is the 'brain' that unifies your cameras, sensors, and personnel. ShieldTrace elevates it with predictive AI, making all systems talk to each other." },
                  { q: "Does it work in Caracas and Miami?", a: "Yes. In Caracas, we guarantee operational readiness under ISO 9001. In Miami, we deliver Luxury Concierge Security intelligence." },
                  { q: "How does it help me if I am not a tech expert?", a: "The tactical tablet acts as your CSSG consultant 24/7. When an alert rings, it gives you actionable instructions instantly." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 5: Final Call to Action */}
            <div className="border-t border-white/5 pt-16 flex flex-col items-center text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight max-w-2xl">
                Ready for total control?
              </h3>
              <p className="text-gray-400 max-w-xl text-sm md:text-base leading-relaxed font-medium">
                With <strong>4,380 days without incidents</strong> in high-criticality environments, our methodology is your ultimate guarantee.
              </p>
              <button 
                onClick={() => scrollToContact('Free Risk Audit')}
                className="px-8 py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-sky-500/20 mt-4"
              >
                Request Free Risk Audit
              </button>
            </div>

          </motion.div>

          {/* Block 2: Construcción de CECOM */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Elite Engineering</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  CECOM Construction: <br />
                  <span className="text-indigo-400">The Central Nervous System.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">Absolute Operational Clarity</p>
                  <p>
                    A monitoring room is not just a collection of screens. It is a tactical decision center where every second counts. At <strong>CSSG</strong>, we design and build monitoring centers (CECOM) that maximize situational awareness.
                  </p>
                </div>
              </div>

              {/* CECOM features */}
              <div className="lg:col-span-6 space-y-4">
                {[
                  { t: "Ergonomic & Thermal Design", d: "Operators perform up to 40% more effectively in environments designed for continuous attention." },
                  { t: "Redundant Power Architecture", d: "Zero downtime. CECOM remains online even during complete electrical grid failures." },
                  { t: "Cisco-Grade Cyber Integrity", d: "Segregated networks and military-grade encryption to prevent external compromise." }
                ].map((feat, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-indigo-500/30 transition-all rounded-2xl p-6 backdrop-blur-sm flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white tracking-tight">{feat.t}</h4>
                      <p className="text-xs text-gray-400 leading-normal">{feat.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Part 2: Visual & Strategic Design */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-indigo-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/cecom_control_center_1777552494604.png" 
                  alt="CECOM Center" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Tactical Tech</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  Military Standard Design: <span className="text-sky-400">Pure Efficiency</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  Every CECOM component is carefully designed to reduce response times and deliver total situational awareness.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "ISO 11064 Standard", d: "Ergonomic standards compliance to prevent operator fatigue and errors." },
                    { num: "02", t: "Dynamic Video Walls", d: "Data synchronization to cast multiple alerts without latency." },
                    { num: "03", t: "Multi-Site Management", d: "Unified command over distributed facilities via secure networks." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-sky-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ CECOM */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Questions</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  CECOM <span className="text-amber-400">FAQ</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "How long does construction take?", a: "Depending on scope, complete construction takes 45 to 90 business days." },
                  { q: "Is training included?", a: "Yes. We train your operators on situational awareness, crisis protocols, and quick response." },
                  { q: "Is it compatible with my cameras?", a: "Yes. Our systems are engineered to securely bridge existing infrastructure." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-16 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Want to build or upgrade your CECOM?
              </h3>
              <button 
                onClick={() => scrollToContact('CECOM Audit')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20 cursor-pointer animate-pulse"
              >
                Request Specialized Consultation
              </button>
            </div>
          </motion.div>

          {/* Block 3: Smart Cameras */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-24 bg-[#0D0F16]/50 backdrop-blur-3xl border border-white/5 p-8 md:p-16 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Multi-Purpose Vision</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                  Smart Cameras: <br />
                  <span className="text-emerald-400">Intelligent Eyes Everywhere.</span>
                </h2>
                <div className="space-y-4 text-gray-400 leading-relaxed">
                  <p className="font-bold text-white text-lg">Beyond Mere Surveillance</p>
                  <p>
                    Our smart camera infrastructure provides real-time multi-purpose computer vision. It is no longer just a recording of events; it's a proactive analytical asset.
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              <div className="lg:col-span-6 space-y-4">
                {[
                  { t: "Logistics Optimization", d: "Track delivery fleets and analyze transit times automatically." },
                  { t: "Industrial Operations", d: "Real-time safety compliance and PPE detection for risk reduction." },
                  { t: "Facial and Asset ID", d: "Instant verification of restricted access and high-value equipment tracking." }
                ].map((feat, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all rounded-2xl p-6 backdrop-blur-sm flex items-start gap-4">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white tracking-tight">{feat.t}</h4>
                      <p className="text-xs text-gray-400 leading-normal">{feat.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center border-t border-white/5 pt-16">
              <div className="lg:col-span-6 relative group">
                <div className="absolute -inset-4 bg-emerald-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/ai_security_camera_overlay_1777552513820.png" 
                  alt="AI Camera Ecosystem" 
                  className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Solutions</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight">
                  Proactive Vision: <span className="text-sky-400">Total Adaptability</span>
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  We integrate and deploy algorithms focused on high operational efficiency and risk prevention.
                </p>

                <div className="space-y-6">
                  {[
                    { num: "01", t: "Loss Prevention", d: "Real-time alerts for suspect behavior before perimeter breaches occur." },
                    { num: "02", t: "Operational Clarity", d: "Heatmaps and foot traffic flow monitoring." },
                    { num: "03", t: "Encrypted Streams", d: "Zero exposure, end-to-end encrypted streams accessible on any authorized device." }
                  ].map((feat, fIdx) => (
                    <div key={fIdx} className="flex gap-4">
                      <span className="text-2xl font-black text-sky-500/40 mt-1">{feat.num}</span>
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white tracking-tight">{feat.t}</h4>
                        <p className="text-gray-400 text-xs leading-relaxed">{feat.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Cameras */}
            <div className="space-y-8 border-t border-white/5 pt-16">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Answers</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                  Smart Cameras <span className="text-amber-400">FAQ</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { q: "Can we use existing cameras?", a: "Yes. Our cloud/edge platform seamlessly bridges existing infrastructure." },
                  { q: "How long is deployment?", a: "Deployment usually takes between 15 and 30 business days." },
                  { q: "Is data privacy guaranteed?", a: "Absolutely. We enforce end-to-end military encryption." }
                ].map((faq, fIdx) => (
                  <div key={fIdx} className="bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-3xl p-8 backdrop-blur-sm transition-all flex flex-col gap-4">
                    <div className="flex gap-4">
                      <span className="text-amber-400 font-bold shrink-0">Q.</span>
                      <h4 className="text-lg font-bold text-white tracking-tight">{faq.q}</h4>
                    </div>
                    <div className="flex gap-4 border-t border-white/5 pt-4">
                      <span className="text-emerald-400 font-bold shrink-0">A.</span>
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-16 text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Upgrade your visual security intelligence
              </h3>
              <button 
                onClick={() => scrollToContact('Smart Cameras Consultation')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 cursor-pointer animate-pulse"
              >
                Request Specialized Consultation
              </button>
            </div>
          </motion.div>

          {/* Block 4: Consulting */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Strategy</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Technical Consulting: <br />
                <span className="text-amber-400">Hardware or Peace of Mind?</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">Eliminate market noise.</p>
                <p>
                  Security without strategy is just expensive noise. Our engineering team conducts target and scope audits to justify every investment.
                </p>
              </div>
              <button 
                onClick={() => scrollToContact('Security Consulting')}
                className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Request Consultation
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-amber-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/tech_security_consulting_ui_1777552535684.png" 
                alt="Tech Consulting" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 5: Cyber Audit */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Digital Perimeter</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Cybersecurity Audit: <br />
                <span className="text-rose-400">Is Your Network a Blind Spot?</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">Physical security is no longer enough.</p>
                <p>
                  In the 21st century, the real perimeter is digital. We conduct penetration tests and digital footprint analysis to keep networks shielded against intrusions.
                </p>
              </div>
              <button 
                onClick={() => scrollToContact('Cybersecurity Audit')}
                className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Request Audit
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-rose-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/cybersecurity_audit_ui_1777552982082.png" 
                alt="Cyber Audit" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 6: GPS */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row-reverse items-center gap-16"
          >
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-teal-500/10 border border-teal-500/20">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Telemetry</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                GPS Tracker Pro: <br />
                <span className="text-teal-400">Zero Signal Shadows.</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                <p className="font-bold text-white">A dot on a map is not security.</p>
                <p>
                  Real tracking requires instant action. We offer anti-jamming protection and door trigger alerts, keeping fleets safely monitored 24/7.
                </p>
              </div>
              <button 
                onClick={() => scrollToContact('GPS Tracker Implementation')}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Request Implementation
              </button>
            </div>
            <div className="flex-1 relative group">
              <div className="absolute -inset-4 bg-teal-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/gps_tracker_high_precision_map_1777553002245.png" 
                alt="GPS Maps" 
                className="w-full rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Block 7: Metodología */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0D0F16] via-[#121620] to-[#0A0D14] rounded-[3.5rem] p-12 md:p-20 border border-white/5 relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(14,165,233,0.15)]"
          >
            <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-sky-500/10 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-500/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center space-y-6 mb-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-500/10 border border-sky-500/20">
                  <span className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Our Standard</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                  How we manage your <span className="text-sky-400">Projects?</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
                  Precision is the direct result of a meticulous, certified process. We do not just install equipment; we construct full strategies.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                  {[
                    { step: "01", title: "Vulnerability Audit", desc: "We identify operational blind spots in physical and digital perimeters.", bullets: ["Perimeter Threat Assessment", "Penetration Tests", "Personnel protocol checks"], offset: "lg:ml-0" },
                    { step: "02", title: "Architecture Design", desc: "Technical blueprints crafted to support your exact requirements.", bullets: ["Ergonomic CECOM layout", "Cisco-Grade networks", "Power & thermal redundancy"], offset: "lg:ml-12" },
                    { step: "03", title: "Tactical Deployment", desc: "Installation completed under maximum rigorous engineering standards.", bullets: ["Military hardware integration", "AI Video analytics sync", "Personnel training"], offset: "lg:ml-24" },
                    { step: "04", title: "Certification", desc: "We test everything through stress simulations to achieve total readiness.", bullets: ["Breach and failover drills", "ISO standard validation", "Zero incidents tracking"], offset: "lg:ml-36" }
                  ].map((item, idx) => {
                    const isExpanded = expandedIdx === idx;
                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                        className={`p-6 rounded-3xl bg-[#141824]/40 border border-white/5 hover:border-sky-500/40 hover:bg-sky-500/[0.03] transition-all group flex flex-col gap-4 backdrop-blur-md shadow-2xl relative overflow-hidden cursor-pointer ${item.offset}`}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/[0.01] group-hover:bg-sky-500/[0.03] blur-xl rounded-full transition-all duration-500" />
                        
                        <div className="flex items-center justify-between w-full select-none">
                          <div className="flex items-start gap-6">
                            <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400 opacity-60 group-hover:opacity-100 transition-opacity leading-none select-none">
                              {item.step}
                            </span>
                            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-400 transition-colors select-none mt-1">
                              {item.title}
                            </h3>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-sky-400 group-hover:text-sky-300 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>

                        <motion.div
                          initial={false}
                          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden space-y-3"
                        >
                          <p className="text-sm text-gray-400 leading-relaxed max-w-sm select-none">
                            {item.desc}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1 select-none">
                            {item.bullets.map((bullet, bIdx) => (
                              <span key={bIdx} className="text-[10px] text-sky-300/60 bg-sky-500/5 border border-sky-500/10 rounded-md px-2 py-0.5 font-medium tracking-wide">
                                {bullet}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="flex-1 relative group w-full">
                  <div className="absolute -inset-10 bg-sky-500/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-all duration-1000 animate-pulse pointer-events-none" />
                  <img 
                    src="/security_methodology_staircase_climb_1777554286433.png" 
                    alt="Process" 
                    className="relative z-10 w-full rounded-[2.5rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(14,165,233,0.3)] hover:scale-[1.03] hover:border-sky-500/30 transition-all duration-1000 select-none object-cover"
                  />
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 z-20 bg-sky-500 p-4 rounded-full shadow-[0_0_50px_rgba(14,165,233,0.6)] border border-sky-400/30 flex items-center justify-center pointer-events-none hover:scale-110 transition-transform duration-300"
                  >
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* NICHE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
          {niches.map((niche, i) => (
            <motion.div
              key={niche.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="relative group"
            >
              <div className={`absolute -inset-[1px] bg-gradient-to-b ${niche.color} rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              
              <div className="relative h-full bg-[#0D0F16]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col group-hover:border-white/20 transition-all duration-500">
                <div className="h-60 overflow-hidden relative">
                  <img src={niche.image} alt={niche.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F16] via-[#0D0F16]/20 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 backdrop-blur-md border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-2xl">
                      {niche.icon}
                    </div>
                    <div className="h-[2px] w-12 bg-gradient-to-r from-sky-500 to-transparent" />
                  </div>
                </div>

                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter group-hover:text-sky-400 transition-colors">
                    {niche.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                    {niche.desc}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    {niche.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/feat">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 group-hover/feat:scale-150 transition-transform" />
                        <span className="text-xs text-gray-500 group-hover/feat:text-gray-300 transition-colors leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => {
                      setSubject(niche.title);
                      document.getElementById('tech-conversion')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 hover:border-sky-500 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    Request Evaluation
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PREMIUM CONVERSION */}
        <section id="tech-conversion" className="scroll-mt-32 mb-40">
          <div className="relative rounded-[3rem] overflow-hidden group">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/20 blur-[100px] rounded-full opacity-50" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full opacity-50" />
            
            <div className="relative bg-[#0D0F16]/60 backdrop-blur-3xl border border-white/10 p-8 md:p-20 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">ISO 31000 Compliant Audit</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                  Ready to elevate <br />
                  your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Security?</span>
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl font-medium">
                  Request a specific proposal for <span className="text-white underline decoration-sky-500/50 underline-offset-8 font-black">{subject || 'Critical Infrastructure'}</span> in less than 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                  <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Mail className="w-6 h-6 text-sky-400 mb-2" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Direct channel</span>
                    <span className="text-white font-bold">info@globalservices-ven.com</span>
                  </div>
                  <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Phone className="w-6 h-6 text-sky-400 mb-2" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Line</span>
                    <span className="text-white font-bold">+58 212 953-CSSG</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[450px]">
                <div className="relative p-10 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 border border-white/20 shadow-2xl">
                    <h3 className="text-2xl font-black text-white mb-8 text-center tracking-tight">Project Start</h3>
                    
                    {status === 'success' ? (
                      <div className="text-center space-y-8 py-4">
                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/50">
                          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-black text-white">Success!</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                            We have received your interest in <span className="text-white font-bold">{subject}</span>. <br />
                            Select your preferred time for our meeting:
                          </p>
                        </div>
                        <a 
                          href="https://calendly.com/cssg-seguridad/reunion-tecnica" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-3 w-full py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl"
                        >
                          Book Meeting
                          <ArrowRight className="w-4 h-4" />
                        </a>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Priority activated</p>
                      </div>
                    ) : (
                      <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Specialty</label>
                          <input type="text" value={subject || "Comprehensive Security"} readOnly className="w-full bg-[#030305]/50 border border-white/10 rounded-2xl px-5 py-4 text-white font-bold text-sm focus:border-sky-500/50 transition-all outline-none" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="John Doe" 
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Corporate Email</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="email@company.com" 
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Company / Institution</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="Enterprise Inc." 
                            value={formData.empresa}
                            onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all outline-none" 
                          />
                        </div>
                        
                        <button 
                          type="submit" 
                          disabled={status === 'loading'}
                          className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all mt-6 shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        >
                          {status === 'loading' ? 'Processing...' : 'Request Proposal'}
                        </button>
                        {status === 'error' && (
                          <p className="text-red-400 text-[10px] text-center mt-4 font-bold uppercase tracking-widest">Server connection error. Try again.</p>
                        )}
                        <p className="text-[9px] text-gray-500 text-center mt-6 uppercase tracking-widest font-bold">Priority for corporate accounts</p>
                      </form>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}} />
    </div>
  );
}
