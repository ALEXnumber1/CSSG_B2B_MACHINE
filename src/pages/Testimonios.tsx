import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, Shield, Users, Building2, Quote, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface TestimonialForm {
  name: string;
  role: 'cliente' | 'empleado' | 'usuario';
  company: string;
  rating: number;
  comment: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: 'cliente' | 'empleado' | 'usuario';
  company?: string;
  rating: number;
  comment: string;
  created_at: string;
}

const roleLabels = { cliente: 'Cliente', empleado: 'Colaborador CSSG', usuario: 'Usuario' };
const roleIcons = { cliente: Building2, empleado: Shield, usuario: Users };

function StarRating({ value, onChange, size = 24 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const [hover, setHover] = useState(0);
  const active = hover || value;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={`Calificación ${star} de 5`}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default pointer-events-none'}
        >
          <Star
            size={size}
            className={`transition-colors duration-150 ${star <= active ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`}
          />
        </button>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const Icon = roleIcons[t.role];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="relative backdrop-blur-xl bg-white/5 border border-white/8 rounded-3xl p-7 space-y-5 overflow-hidden group hover:border-white/15 transition-colors duration-300"
    >
      <Quote size={48} className="absolute top-5 right-6 text-white/5 group-hover:text-white/8 transition-colors" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500/20 to-emerald-500/10 border border-white/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-sky-400" />
          </div>
          <div>
            <p className="font-bold text-white text-sm">{t.name}</p>
            <p className="text-sky-400/70 text-xs">{roleLabels[t.role]}{t.company ? ` · ${t.company}` : ''}</p>
          </div>
        </div>
        <StarRating value={t.rating} size={14} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{t.comment}"</p>
      <p className="text-white/20 text-xs">{new Date(t.created_at).toLocaleDateString('es-VE', { year: 'numeric', month: 'long' })}</p>
    </motion.div>
  );
}

export default function Testimonios() {
  const [form, setForm] = useState<TestimonialForm>({ name: '', role: 'cliente', company: '', rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testimonials] = useState<Testimonial[]>([]);
  const [filterRole, setFilterRole] = useState<string>('todos');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: '¿Quién puede dejar una opinión?', a: 'Cualquier persona: clientes actuales o anteriores, colaboradores de CSSG y usuarios que hayan interactuado con nuestros servicios o plataforma digital.' },
    { q: '¿Las opiniones son verificadas?', a: 'Sí. Cada opinión pasa por moderación antes de publicarse para garantizar autenticidad y valor real.' },
    { q: '¿Puedo enviar mi opinión de forma anónima?', a: 'El nombre es requerido, pero puedes omitir la empresa. Para total anonimato, usa nuestro canal de quejas en /quejas.' },
    { q: '¿Cuánto tarda en publicarse?', a: 'Nuestro equipo revisa las opiniones dentro de 24-48 horas hábiles.' },
  ];

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (form.rating === 0) { setError('Selecciona una calificación de 1 a 5 estrellas.'); return; }
    if (form.comment.trim().length < 20) { setError('El comentario debe tener al menos 20 caracteres.'); return; }
    setError('');
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('testimonials').insert({
        name: form.name.trim(),
        role: form.role,
        company: form.company.trim() || null,
        rating: form.rating,
        comment: form.comment.trim(),
      });
      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError('Hubo un problema al enviar tu opinión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  const filtered = filterRole === 'todos' ? testimonials : testimonials.filter(t => t.role === filterRole);

  return (
    <div className="min-h-screen bg-[#0B0B0F]">

      {/* Hero con imagen */}
      <section className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden">
        <img
          src="/testimonios_hero.webp"
          alt="Vigilantes CSSG con cliente en ambiente corporativo"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradiente sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F]/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-300/80 text-sm font-medium">Opiniones verificadas</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-5">
              Lo que dicen<br />
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                quienes nos conocen
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
              Clientes, colaboradores y usuarios comparten su experiencia real con CSSG.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Columna izquierda — Formulario */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-28">
              <div className="backdrop-blur-xl bg-white/[0.04] border border-white/8 rounded-[2rem] p-8">
                <div className="mb-7">
                  <h2 className="text-2xl font-black text-white tracking-tight mb-2">Comparte tu experiencia</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tu opinión honesta ayuda a otros a tomar mejores decisiones de seguridad.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={30} className="text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-black text-white">¡Gracias por compartir!</h3>
                      <p className="text-gray-400 text-sm">Tu opinión será revisada y publicada en 24-48h.</p>
                      <button
                        type="button"
                        onClick={() => { setSubmitted(false); setForm({ name: '', role: 'cliente', company: '', rating: 0, comment: '' }); }}
                        className="text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors underline underline-offset-4"
                      >
                        Enviar otra opinión
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">Nombre completo</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="¿Cómo te llamas?"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all"
                        />
                        <p className="text-white/30 text-xs mt-2 leading-relaxed">
                          Por razones de seguridad y confidencialidad, puedes usar tus iniciales o simplemente indicar tu cargo — Ej: <span className="text-white/45 italic">Director de Seguridad</span>.
                        </p>
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">Eres</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['cliente', 'empleado', 'usuario'] as const).map(r => {
                            const Icon = roleIcons[r];
                            return (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setForm(f => ({ ...f, role: r }))}
                                className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                                  form.role === r
                                    ? 'bg-sky-500/15 border-sky-500/40 text-sky-300'
                                    : 'bg-white/3 border-white/8 text-white/35 hover:text-white/60 hover:border-white/15'
                                }`}
                              >
                                <Icon size={15} />
                                {roleLabels[r].split(' ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">
                          Empresa <span className="text-white/25 font-normal">(opcional)</span>
                        </label>
                        <input
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder="Tu organización"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-3 block">Calificación</label>
                        <StarRating value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} size={28} />
                        {form.rating > 0 && (
                          <p className="text-white/30 text-xs mt-1.5">
                            {['', 'Muy deficiente', 'Deficiente', 'Regular', 'Bueno', 'Excelente'][form.rating]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">Tu opinión</label>
                        <textarea
                          required
                          rows={4}
                          value={form.comment}
                          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                          placeholder="Cuéntanos cómo ha sido tu experiencia con CSSG..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all resize-none leading-relaxed"
                        />
                        <p className="text-white/20 text-xs mt-1">{form.comment.length} caracteres</p>
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm bg-red-500/8 border border-red-500/15 rounded-xl px-4 py-3">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                      >
                        {loading ? (
                          <span className="animate-pulse">Enviando...</span>
                        ) : (
                          <><Send size={15} /> Enviar opinión</>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha — Testimonios */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Filtros */}
            <div className="flex gap-2 flex-wrap">
              {['todos', 'cliente', 'empleado', 'usuario'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFilterRole(r)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    filterRole === r
                      ? 'bg-white/10 border-white/20 text-white'
                      : 'bg-transparent border-white/8 text-white/35 hover:text-white/60 hover:border-white/15'
                  }`}
                >
                  {r === 'todos' ? 'Todos' : roleLabels[r as keyof typeof roleLabels]}
                </button>
              ))}
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((t, i) => <TestimonialCard key={t.id} t={t} index={i} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 flex items-center justify-center">
                  <Star size={24} className="text-amber-400/60" />
                </div>
                <p className="text-white/60 font-semibold">Las primeras opiniones están en camino</p>
                <p className="text-white/25 text-sm max-w-xs leading-relaxed">
                  Sé parte de la historia. Tu experiencia con CSSG puede ayudar a otras empresas a protegerse mejor.
                </p>
              </div>
            )}

            {/* FAQ */}
            <div className="mt-8 space-y-2">
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">Sobre este espacio</p>
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-white/6 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-white/70 text-sm font-medium">{faq.q}</span>
                    <ChevronDown
                      size={15}
                      className={`text-white/30 flex-shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-400 text-sm px-5 pb-5 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] p-10 text-center bg-gradient-to-br from-sky-500/[0.08] to-emerald-500/[0.05] border border-white/[0.06]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
          <div className="relative z-10 space-y-4">
            <p className="text-sky-400/70 text-sm font-medium">¿Listo para proteger lo que más importa?</p>
            <h2 className="text-3xl font-black text-white tracking-tight">Agenda una consulta sin costo</h2>
            <p className="text-gray-400 text-sm">+17 años · ISO 9001:2015 · Estándar Diplomático G7</p>
            <Link
              to="/consultoria"
              className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/25"
            >
              <Shield size={15} /> Hablar con un especialista
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
