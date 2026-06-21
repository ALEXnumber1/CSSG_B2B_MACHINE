import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle, Shield, Users, Building2, Quote, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

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

const roleIcons = { cliente: Building2, empleado: Shield, usuario: Users };

function StarRating({ value, onChange, size = 24 }: { value: number; onChange?: (v: number) => void; size?: number }) {
  const { t } = useTranslation('testimonios');
  const [hover, setHover] = useState(0);
  const active = hover || value;
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          aria-label={t('star_aria', { star })}
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

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const { t } = useTranslation('testimonios');
  const Icon = roleIcons[item.role];
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
            <p className="font-bold text-white text-sm">{item.name}</p>
            <p className="text-sky-400/70 text-xs">{t(`roles.${item.role}`)}{item.company ? ` · ${item.company}` : ''}</p>
          </div>
        </div>
        <StarRating value={item.rating} size={14} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed italic">"{item.comment}"</p>
      <p className="text-white/20 text-xs">
        {new Date(item.created_at).toLocaleDateString(t('date_locale', { defaultValue: 'es-VE' }), { year: 'numeric', month: 'long' })}
      </p>
    </motion.div>
  );
}

export default function Testimonios() {
  const { t } = useTranslation('testimonios');
  const [form, setForm] = useState<TestimonialForm>({ name: '', role: 'cliente', company: '', rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filterRole, setFilterRole] = useState<string>('todos');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data) setTestimonials(data as Testimonial[]); });
  }, []);

  const rawFaqs = t('faqs', { returnObjects: true });
  const faqs = Array.isArray(rawFaqs) ? (rawFaqs as Array<{ q: string; a: string }>) : [];
  const rawRatings = t('form.ratings', { returnObjects: true });
  const ratings = Array.isArray(rawRatings) ? (rawRatings as string[]) : [];

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (form.rating === 0) { setError(t('form.error_rating')); return; }
    if (form.comment.trim().length < 20) { setError(t('form.error_min_chars')); return; }
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
      setError(t('form.error_db'));
    } finally {
      setLoading(false);
    }
  };

  const filtered = filterRole === 'todos' ? testimonials : testimonials.filter(item => item.role === filterRole);

  return (
    <div className="min-h-screen bg-[#0B0B0F]">

      {/* Hero */}
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
              <span className="text-amber-300/80 text-sm font-medium">{t('hero.verified')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-5">
              {t('hero.title_1')}<br />
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                {t('hero.title_2')}
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="sticky top-28">
              <div className="backdrop-blur-xl bg-white/[0.04] border border-white/8 rounded-[2rem] p-8">
                <div className="mb-7">
                  <h2 className="text-2xl font-black text-white tracking-tight mb-2">{t('form.heading')}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{t('form.subheading')}</p>
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
                      <h3 className="text-xl font-black text-white">{t('form.success_title')}</h3>
                      <p className="text-gray-400 text-sm">{t('form.success_sub')}</p>
                      <button
                        type="button"
                        onClick={() => { setSubmitted(false); setForm({ name: '', role: 'cliente', company: '', rating: 0, comment: '' }); }}
                        className="text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors underline underline-offset-4"
                      >
                        {t('form.success_btn')}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">{t('form.label_name')}</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder={t('form.placeholder_name')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all"
                        />
                        <p className="text-white/30 text-xs mt-2 leading-relaxed">
                          {t('form.name_hint')} <span className="text-white/45 italic">{t('form.name_hint_example')}</span>.
                        </p>
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">{t('form.label_role')}</label>
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
                                {t(`roles.${r}`).split(' ')[0]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">
                          {t('form.label_company')} <span className="text-white/25 font-normal">({t('form.optional')})</span>
                        </label>
                        <input
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder={t('form.placeholder_company')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-3 block">{t('form.label_rating')}</label>
                        <StarRating value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} size={28} />
                        {form.rating > 0 && (
                          <p className="text-white/30 text-xs mt-1.5">{ratings[form.rating]}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-white/50 text-xs font-semibold mb-2 block">{t('form.label_comment')}</label>
                        <textarea
                          required
                          rows={4}
                          value={form.comment}
                          onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                          placeholder={t('form.placeholder_comment')}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-sky-500/40 focus:bg-white/[0.07] transition-all resize-none leading-relaxed"
                        />
                        <p className="text-white/20 text-xs mt-1">{t('form.char_count', { n: form.comment.length })}</p>
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
                          <span className="animate-shimmer">{t('form.btn_sending')}</span>
                        ) : (
                          <><Send size={15} /> {t('form.btn_submit')}</>
                        )}
                      </button>

                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right — Testimonials */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {(['todos', 'cliente', 'empleado', 'usuario'] as const).map(r => (
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
                  {r === 'todos' ? t('filters.all') : t(`roles.${r}`)}
                </button>
              ))}
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((item, i) => <TestimonialCard key={item.id} item={item} index={i} />)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/15 flex items-center justify-center">
                  <Star size={24} className="text-amber-400/60" />
                </div>
                <p className="text-white/60 font-semibold">{t('empty.title')}</p>
                <p className="text-white/25 text-sm max-w-xs leading-relaxed">{t('empty.sub')}</p>
              </div>
            )}

            {/* FAQ */}
            <div className="mt-8 space-y-2">
              <p className="text-white/25 text-xs font-semibold uppercase tracking-widest mb-4">{t('faq_section')}</p>
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

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-[2rem] p-10 text-center bg-gradient-to-br from-sky-500/[0.08] to-emerald-500/[0.05] border border-white/[0.06]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.06)_0%,transparent_70%)]" />
          <div className="relative z-10 space-y-4">
            <p className="text-sky-400/70 text-sm font-medium">{t('cta.pre')}</p>
            <h2 className="text-3xl font-black text-white tracking-tight">{t('cta.title')}</h2>
            <p className="text-gray-400 text-sm">{t('cta.stats')}</p>
            <Link
              to="/consultoria"
              className="inline-flex items-center gap-2 mt-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-500/25"
            >
              <Shield size={15} /> {t('cta.btn')}
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
