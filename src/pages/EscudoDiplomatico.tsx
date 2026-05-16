import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Lock, Eye, EyeOff, Radio, ChevronRight, X as XIcon, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendLeadNotification } from '../lib/email';

const GOLD = '#D4AF37';
const RED = '#ef4444';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function EscudoDiplomatico() {
  const year = new Date().getFullYear();
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    empresa: '',
    vulnerabilidad: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.title = "SERVICIO DE PROTECCION A PERSONALIDADES DE ELITE | CSSG";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Servicio exclusivo de protección a personalidades de élite. Conformamos esquemas de seguridad a un nivel diplomático.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Servicio exclusivo de protección a personalidades de élite. Conformamos esquemas de seguridad a un nivel diplomático.";
      document.head.appendChild(meta);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: `escudo-${Date.now()}@pendiente.com`,
        empresa: formData.empresa,
        telefono: 'N/A',
        mensaje: `[ESCUDO DIPLOMÁTICO] Cargo: ${formData.cargo} | Vulnerabilidad: ${formData.vulnerabilidad}`,
        fuente: 'escudo_diplomatico',
        score: 50,
        estado: 'nuevo',
      }]);
      await sendLeadNotification({
        nombre: formData.nombre,
        email: 'escudo-diplomatico@cssg-global.com',
        empresa: formData.empresa,
        fuente: 'escudo_diplomatico',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('formulario-escudo')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scarcity bar
  const occupied = 11;
  const total = 20;
  const remaining = total - occupied;
  const pct = (occupied / total) * 100;

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: "'Inter', sans-serif" }}>

      {/* ═══ MINI NAV ═══ */}
      <nav className="fixed top-0 w-full z-50 border-b" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', borderColor: 'rgba(212,175,55,0.15)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CSSG" className="h-10 w-10 object-contain" />
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm tracking-tight">CSSG</p>
              <p className="text-[9px] tracking-wider uppercase" style={{ color: GOLD }}>Consultoría en Seguridad y Servicios Generales</p>
            </div>
          </div>
          <button onClick={scrollToForm} className="px-5 py-2 text-xs font-black uppercase tracking-widest rounded border transition-all hover:scale-105" style={{ color: '#0a0a0a', background: GOLD, borderColor: GOLD }}>
            Solicitar Acceso
          </button>
        </div>
      </nav>

      {/* ═══ SECTION 1: HERO ═══ */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden" style={{
        backgroundImage: "url('/secuestro.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(10, 10, 10, 0.85)' }} />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap');
        `}</style>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10" style={{ background: GOLD }} />
        </div>
        <motion.div className="max-w-4xl mx-auto text-center relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border" style={{ color: GOLD, borderColor: `${GOLD}40`, background: `${GOLD}08` }}>
            Protocolo de Inmunidad Ejecutiva
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
            CONFORMA TU ESQUEMA DE SEGURIDAD A UN NIVEL{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(135deg, ${GOLD}, #f5e6a3, ${GOLD})` }}>
              DIPLOMÁTICO.
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold mb-10" style={{ color: '#a0a0a0' }}>
            Descubre el <span className="text-white font-black">ESCUDO DIPLOMÁTICO</span>
          </h2>
          <button onClick={scrollToForm} className="group px-8 py-4 rounded-lg text-sm font-black uppercase tracking-widest transition-all hover:scale-105 shadow-lg" style={{ color: '#0a0a0a', background: `linear-gradient(135deg, ${GOLD}, #f5e6a3)`, boxShadow: `0 0 40px ${GOLD}30` }}>
            Pida una Cita Ya <span className="text-[10px] opacity-70">(Briefing de 10 Min)</span>
            <ChevronRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-[11px] tracking-widest uppercase" style={{ color: '#666' }}>
            <Lock className="inline w-3 h-3 mr-1 -mt-0.5" /> Estricta confidencialidad garantizada.
          </p>
        </motion.div>
      </section>

      {/* ═══ SECTION 2: ALERTA DE INTELIGENCIA ═══ */}
      <section className="py-20 px-6 relative" style={{ background: 'linear-gradient(180deg, rgba(239,68,68,0.03) 0%, rgba(10,10,10,1) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none border-t border-b" style={{ borderColor: `${RED}15` }} />
        <motion.div className="max-w-3xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${RED}15`, border: `1px solid ${RED}30` }}>
              <AlertTriangle className="w-5 h-5" style={{ color: RED }} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
              <span style={{ color: RED }}>Alerta de Inteligencia:</span>{' '}
              <span style={{ color: GOLD }}>El Riesgo es Real</span>
            </h3>
          </div>
          <p className="text-[15px] leading-[1.8] mb-6" style={{ color: '#b0b0b0' }}>
            Hace varios años, Caracas fue diezmada por secuestros que destruyeron vidas, patrimonios y familias enteras. Nuestros estudios de inteligencia más recientes advierten que este modus operandi puede volver a azotar al sector corporativo de alto nivel.
          </p>
          <blockquote className="my-8 p-6 rounded-xl border-l-4" style={{ borderColor: GOLD, background: `${GOLD}08` }}>
            <p className="text-lg font-bold italic text-white leading-relaxed">
              "Si esto es así... ¿Cuál es la estrategia de seguridad preventiva exacta de usted y su familia? ¿Está realmente preparado?"
            </p>
          </blockquote>
          <p className="text-[15px] leading-[1.8]" style={{ color: '#b0b0b0' }}>
            <strong className="text-white">NO SE PREOCUPE.</strong> En CSSG tenemos 17 años operando en las sombras con embajadas y clientes de altísima criticidad. Para contrarrestar esta amenaza de frente, hemos diseñado y abierto al sector privado nuestro protocolo definitivo.
          </p>
        </motion.div>
      </section>

      {/* ═══ SECTION 3: EL PARADIGMA ═══ */}
      <section className="py-20 px-6">
        <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-6 tracking-tight">
            ¿QUÉ ES EL <span style={{ color: GOLD }}>ESCUDO DIPLOMÁTICO</span>?
          </h2>
          <p className="text-center text-[15px] leading-[1.8] max-w-3xl mx-auto mb-14" style={{ color: '#a0a0a0' }}>
            No es un servicio de escoltas tradicionales. Es una cápsula de inteligencia preventiva e inmunidad ejecutiva. El 95% de los CEO cometen el error de contratar personal armado visible que no disuade a las amenazas, sino que les indica dónde está el objetivo de alto valor. Nosotros neutralizamos la amenaza días antes de que usted salga de su casa.
          </p>

          {/* Comparison boxes */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            {/* Traditional - Failed */}
            <div className="p-8 rounded-2xl border" style={{ background: '#141414', borderColor: `${RED}20` }}>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6" style={{ color: RED }}>
                El Modelo Tradicional (Fallido)
              </h4>
              <ul className="space-y-4">
                {[
                  'Reacciona cuando la contingencia ya está ocurriendo.',
                  'Escoltas y vehículos que atraen atención no deseada.',
                  'Conexiones policiales locales de bajo nivel.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XIcon className="w-5 h-5 shrink-0 mt-0.5" style={{ color: RED }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#999' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Escudo Diplomático */}
            <div className="p-8 rounded-2xl border" style={{ background: '#141414', borderColor: `${GOLD}25` }}>
              <h4 className="text-sm font-black uppercase tracking-widest mb-6" style={{ color: GOLD }}>
                El Escudo Diplomático
              </h4>
              <ul className="space-y-4">
                {[
                  'Mitiga el riesgo con inteligencia predictiva.',
                  'Cápsula de prevención invisible y discreta.',
                  'Enlace táctico directo a nivel gubernamental.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#ccc' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-2xl border text-center" style={{ background: '#0f0f0f', borderColor: '#222' }}>
            <p className="text-[15px] leading-[1.9] max-w-3xl mx-auto" style={{ color: '#b0b0b0' }}>
              No compres <span className="line-through opacity-50">"seguridad"</span>. Compra <strong className="text-white">Inmunidad</strong>. Mapeamos sus rutas, auditamos su entorno y aplicamos protocolos indetectables que mantienen a su familia fuera del radar criminal. Dejamos de reaccionar ante el problema para empezar a <strong style={{ color: GOLD }}>dictar las reglas del entorno</strong>.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ═══ SECTION 4: LOS 3 NIVELES ═══ */}
      <section className="py-20 px-6 relative" style={{
        backgroundImage: "url('/ESCOLTA.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(10, 10, 10, 0.85)' }} />
        <motion.div className="max-w-5xl mx-auto relative z-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-4 tracking-tight">
            ¿CÓMO <span style={{ color: GOLD }}>OPERAMOS</span>?
          </h2>
          <p className="text-center text-sm max-w-2xl mx-auto mb-16" style={{ color: '#888' }}>
            Una arquitectura de seguridad que opera en tres niveles indetectables para mantener su estilo de vida intacto mientras vigilamos desde las sombras.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Eye className="w-6 h-6" />,
                level: 'Nivel 1',
                title: 'Inteligencia Preventiva',
                subtitle: 'El 90% de la operación',
                desc: 'Mapeo diario de rutas, análisis de entorno y reportes exclusivos de inteligencia en tiempo real desde nuestro Centro de Operaciones. Identificamos y exponemos la amenaza antes de que usted pise la calle.',
              },
              {
                icon: <EyeOff className="w-6 h-6" />,
                level: 'Nivel 2',
                title: 'Anillo Disuasivo',
                subtitle: 'La Sombra Invisible',
                desc: 'Unidades de avanzada encubiertas en sus zonas de tránsito. Actúan como una red de alerta temprana indetectable, en comunicación encriptada directa con sus choferes. Nadie sabe que están ahí.',
              },
              {
                icon: <Radio className="w-6 h-6" />,
                level: 'Nivel 3',
                title: 'Unidad Táctica',
                subtitle: 'El Botón Nuclear',
                desc: 'Si el entorno colapsa inexplicablemente, ejecutamos extracciones seguras en minutos. Contamos con fuerza de reacción de élite y enlace gubernamental directo. Su póliza de vida absoluta.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 rounded-2xl border group hover:border-opacity-60 transition-all"
                style={{ background: '#141414', borderColor: `${GOLD}15` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: `${GOLD}10`, border: `1px solid ${GOLD}25`, color: GOLD }}>
                  {item.icon}
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] mb-1" style={{ color: GOLD }}>{item.level}</p>
                <h3 className="text-lg font-black text-white mb-1">{item.title}</h3>
                <p className="text-xs font-bold mb-4" style={{ color: '#666' }}>{item.subtitle}</p>
                <p className="text-sm leading-[1.8]" style={{ color: '#999' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══ SECTION 5: FILTRO Y FORMULARIO ═══ */}
      <section className="py-20 px-6 relative" id="formulario-escudo">
        <div className="absolute top-0 left-0 right-0">
          <div className="max-w-5xl mx-auto px-6">
            <div className="inline-block px-4 py-1.5 rounded-b-lg text-[10px] font-black uppercase tracking-[0.2em]" style={{ background: RED, color: 'white' }}>
              Solo por invitación o calificación
            </div>
          </div>
        </div>

        <motion.div className="max-w-4xl mx-auto pt-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="text-3xl sm:text-4xl font-black text-white text-center mb-6 tracking-tight">
            ¿PARA QUIÉN ESTÁ DESTINADO <span style={{ color: GOLD }}>ESTE SERVICIO</span>?
          </h2>
          <p className="text-center text-[15px] leading-[1.8] max-w-2xl mx-auto mb-10" style={{ color: '#a0a0a0' }}>
            Clientes de altísima criticidad, ejecutivos transnacionales y directores patrimoniales. Debido a la inmensa carga operativa de mantener inteligencia de nivel gubernamental, este programa admite a un máximo de <strong className="text-white">20 ejecutivos</strong> en la capital simultáneamente.
          </p>

          {/* Scarcity bar */}
          <div className="max-w-md mx-auto mb-14 p-6 rounded-2xl border" style={{ background: '#111', borderColor: '#222' }}>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: GOLD }}>Ocupación Actual</span>
              <span className="text-sm font-black text-white">{occupied} de {total} Cupos</span>
            </div>
            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#1f1f1f' }}>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${GOLD}, #f5e6a3)` }}
              />
            </div>
            <p className="mt-3 text-center text-xs font-bold" style={{ color: RED }}>
              ⚠ {remaining} Restantes
            </p>
          </div>

          {/* Form */}
          <div className="max-w-lg mx-auto p-8 sm:p-10 rounded-2xl border" style={{ background: '#111', borderColor: `${GOLD}15` }}>
            <div className="flex items-center gap-3 mb-8">
              <Shield className="w-6 h-6" style={{ color: GOLD }} />
              <div>
                <h3 className="text-white font-black text-lg">Pida una cita ya</h3>
                <p className="text-xs" style={{ color: '#666' }}>Briefing de 10 min</p>
              </div>
            </div>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}30` }}>
                  <Check className="w-8 h-8" style={{ color: GOLD }} />
                </div>
                <h4 className="text-white font-black text-xl mb-2">Solicitud Recibida</h4>
                <p className="text-sm" style={{ color: '#888' }}>Un oficial de inteligencia revisará su perfil y le contactará en las próximas 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Nombre Completo</label>
                  <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-colors"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    onFocus={e => e.target.style.borderColor = `${GOLD}50`}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Cargo / Posición</label>
                  <input type="text" name="cargo" required value={formData.cargo} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-colors"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    onFocus={e => e.target.style.borderColor = `${GOLD}50`}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#666' }}>Empresa Transnacional / Corporación</label>
                  <input type="text" name="empresa" required value={formData.empresa} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm focus:outline-none transition-colors"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                    onFocus={e => e.target.style.borderColor = `${GOLD}50`}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#666' }}>¿Cuál es su mayor vulnerabilidad?</label>
                  <select name="vulnerabilidad" required value={formData.vulnerabilidad} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
                    style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: formData.vulnerabilidad ? 'white' : '#666' }}
                    onFocus={e => e.target.style.borderColor = `${GOLD}50`}
                    onBlur={e => e.target.style.borderColor = '#2a2a2a'}
                  >
                    <option value="" disabled>Seleccione una opción</option>
                    <option value="Riesgo de secuestro / Extorsión">Riesgo de secuestro / Extorsión</option>
                    <option value="Rutinas predecibles en trayectos diarios">Rutinas predecibles en trayectos diarios</option>
                    <option value="Espionaje corporativo / Fuga de info">Espionaje corporativo / Fuga de info</option>
                    <option value="Mis escoltas actuales son ineficientes/visibles">Mis escoltas actuales son ineficientes/visibles</option>
                    <option value="Otra (Se discutirá en privado)">Otra (Se discutirá en privado)</option>
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-xs text-center p-3 rounded-lg" style={{ color: RED, background: `${RED}10` }}>
                    Error al enviar. Intente de nuevo o contacte directamente.
                  </p>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full py-4 rounded-lg text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ color: '#0a0a0a', background: `linear-gradient(135deg, ${GOLD}, #f5e6a3)`, boxShadow: `0 0 30px ${GOLD}25` }}
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: `${GOLD}30`, borderTopColor: '#0a0a0a' }} />
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Solicitar Evaluación de Calificación
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* ═══ SECTION 6: FOOTER ═══ */}
      <footer className="py-12 px-6 border-t" style={{ background: '#080808', borderColor: '#1a1a1a' }}>
        <div className="max-w-4xl mx-auto text-center">
          <img src="/logo.png" alt="CSSG" className="h-16 w-16 object-contain mx-auto mb-4 opacity-60" />
          <p className="text-xs mb-3" style={{ color: '#555' }}>
            Servicio exclusivo de protección diplomática para el sector corporativo privado.
          </p>
          <p className="text-xs mb-6" style={{ color: '#444' }}>
            globalservices.ven@gmail.com | Asistencia 24/7: 0424-1782091
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: '#333' }}>
            © {year} Consultoría en Seguridad y Servicios Generales C.A. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
