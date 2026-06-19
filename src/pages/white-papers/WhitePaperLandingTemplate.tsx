import { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import type { DocumentProps } from '@react-pdf/renderer';
import type { ReactElement } from 'react';
import { CheckCircle2, Download, ArrowRight, FileText, Award, Shield, BookOpen } from 'lucide-react';

export interface WPLandingProps {
  title: string;
  subtitle: string;
  description: string;
  coverColor: string;
  topics: string[];
  stats: Array<{ value: string; label: string }>;
  accentColor: 'sky' | 'indigo' | 'emerald';
  pdfDocument: ReactElement<DocumentProps>;
  filename: string;
  relatedServiceHref: string;
  relatedServiceLabel: string;
  breadcrumbTitle: string;
}

const accentMap = {
  sky: {
    badge: 'bg-sky-500/10 border-sky-500/30 text-sky-400',
    button: 'bg-sky-500 hover:bg-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]',
    glow: 'bg-sky-900/20',
    stat: 'text-sky-400',
    check: 'text-sky-400',
    border: 'border-sky-500/20 hover:border-sky-500/40',
  },
  indigo: {
    badge: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
    button: 'bg-indigo-500 hover:bg-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]',
    glow: 'bg-indigo-900/20',
    stat: 'text-indigo-400',
    check: 'text-indigo-400',
    border: 'border-indigo-500/20 hover:border-indigo-500/40',
  },
  emerald: {
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    button: 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)]',
    glow: 'bg-emerald-900/20',
    stat: 'text-emerald-400',
    check: 'text-emerald-400',
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
  },
};

function DownloadButton({ pdfDocument, filename, accent }: { pdfDocument: ReactElement<DocumentProps>; filename: string; accent: typeof accentMap['sky'] }) {
  return (
    <PDFDownloadLink document={pdfDocument as ReactElement<DocumentProps>} fileName={filename}>
      {({ loading }) => (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest transition-all ${accent.button}`}
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              Generando PDF...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Descargar White Paper Gratuito (PDF)
            </>
          )}
        </motion.button>
      )}
    </PDFDownloadLink>
  );
}

export default function WhitePaperLandingTemplate({
  title,
  subtitle,
  description,
  topics,
  stats,
  accentColor,
  pdfDocument,
  filename,
  relatedServiceHref,
  relatedServiceLabel,
  breadcrumbTitle,
}: WPLandingProps) {
  const accent = accentMap[accentColor];

  const heroRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-50px' });
  const topicsInView = useInView(topicsRef, { once: true, margin: '-50px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-50px' });
  const certsInView = useInView(certsRef, { once: true, margin: '-50px' });

  return (
    <div className="min-h-screen bg-[#030305] text-white">
      {/* BG glow */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className={`absolute top-0 left-1/3 w-[600px] h-[600px] ${accent.glow} rounded-full blur-[140px] mix-blend-screen opacity-40`} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-900/10 rounded-full blur-[120px] mix-blend-screen opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-8 pb-24">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-8">
          <Link to="/" className="hover:text-gray-400 transition-colors">Inicio</Link>
          <span>/</span>
          <Link to="/consultoria" className="hover:text-gray-400 transition-colors">Consultoría</Link>
          <span>/</span>
          <span className="text-gray-500">White Papers</span>
          <span>/</span>
          <span className="text-gray-400">{breadcrumbTitle}</span>
        </nav>

        {/* Hero */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 24 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          {/* Gold badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 mb-6">
            <BookOpen className="w-3 h-3 text-yellow-400" />
            <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">White Paper 2026 — Descarga Gratuita</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
            {title}
          </h1>

          <p className={`text-sm font-bold uppercase tracking-widest mb-4 ${accent.badge.split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>
            {subtitle}
          </p>

          <p className="text-base text-gray-400 leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* Hero download CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Suspense
              fallback={
                <button className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest ${accent.button} opacity-70`}>
                  <Download className="w-5 h-5" />
                  Preparando PDF...
                </button>
              }
            >
              <DownloadButton pdfDocument={pdfDocument} filename={filename} accent={accent} />
            </Suspense>
            <Link
              to={relatedServiceHref}
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest"
            >
              Ver servicio relacionado <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Topics — what's inside */}
        <motion.div
          ref={topicsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={topicsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mb-16"
        >
          <div className="p-8 rounded-3xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center">
                <FileText className="w-4 h-4 text-gray-400" />
              </div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">
                Qué encontrará en este white paper
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {topics.map((topic, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={topicsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: 'easeOut' }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${accent.check}`} />
                  <span className="text-sm text-gray-400 leading-relaxed">{topic}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: 'easeOut' }}
                className={`p-6 rounded-2xl backdrop-blur-xl bg-white/[0.02] border ${accent.border} transition-colors text-center`}
              >
                <div className={`text-2xl sm:text-3xl font-black tracking-tight mb-2 ${accent.stat}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Gold CTA box */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 24 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="p-8 sm:p-10 rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.03] text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6">
              <Download className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Sin formulario · Sin registro · Descarga directa</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              Descargue el White Paper Ahora
            </h2>
            <p className="text-sm text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed">
              Contenido elaborado por expertos con +17 años de operaciones en Venezuela. Metodología ESRM · ISO 9001:2015 · Datos actualizados 2026.
            </p>

            <div className="flex justify-center mb-6">
              <Suspense
                fallback={
                  <button className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-black text-sm uppercase tracking-widest ${accent.button} opacity-70`}>
                    <Download className="w-5 h-5" />
                    Preparando PDF...
                  </button>
                }
              >
                <DownloadButton pdfDocument={pdfDocument} filename={filename} accent={accent} />
              </Suspense>
            </div>

            <p className="text-[10px] text-gray-700 uppercase tracking-widest">
              PDF · Alta calidad · +{topics.length} secciones con contenido accionable
            </p>
          </div>
        </motion.div>

        {/* Certifications bar */}
        <motion.div
          ref={certsRef}
          initial={{ opacity: 0 }}
          animate={certsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest text-center mb-6">
            Respaldado por certificaciones internacionales
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: Award, label: 'ISO 9001:2015', sub: 'Certificado N° 580181' },
              { icon: Shield, label: 'Cyber Essentials', sub: 'NCSC — UK Gov' },
              { icon: BookOpen, label: 'ESRM Certified', sub: 'ASIS International' },
              { icon: Award, label: 'ISO 31000:2018', sub: 'Marco de referencia' },
            ].map((cert, i) => {
              const Icon = cert.icon;
              return (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{cert.label}</span>
                  <span className="text-[9px] text-gray-700 uppercase tracking-widest">{cert.sub}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Related service link */}
        <div className="text-center pt-8 border-t border-white/[0.04]">
          <p className="text-xs text-gray-600 mb-4">¿Necesita asesoría personalizada en su organización?</p>
          <Link
            to={relatedServiceHref}
            className="inline-flex items-center gap-2 text-sm font-black text-white hover:text-sky-400 transition-colors uppercase tracking-widest"
          >
            {relatedServiceLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
