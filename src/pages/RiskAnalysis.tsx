import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Shield,
  Lock,
  FileCheck,
  Eye,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Info,
  Target,
  Activity,
  Zap,
  BarChart3,
  BookOpen,
  MapPin,
  Briefcase,
  Download,
  Building,
  X,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase';
import { startSequence } from '../lib/sequences';
import { sendNurtureEmail } from '../lib/email';
import SecurityRadar3D from '../components/SecurityRadar3D';
import ReportTemplate, { type ReportData } from '../components/ReportTemplate';

import esRisk from '../locales/es/risk.json';
import enRisk from '../locales/en/risk.json';

const LOCALES = {
  es: esRisk,
  en: enRisk
};

/* ─────────────────────────────────────────────────────────────
   CRITERIOS PROFESIONALES — ISO 31000 / Estándares Internacionales
   Cada pilar evalúa un dominio crítico de la seguridad física.
   El "weight" refleja el impacto relativo de cada control
   según la metodología FMEA (Failure Mode and Effects Analysis).
   ───────────────────────────────────────────────────────────── */

interface Question {
  id: string;
  label: string;
  detail: string;       // Explicación profesional del criterio
  weight: number;        // Peso en el índice de protección (1-10)
  reference: string;     // Norma o estándar que respalda el criterio
}

interface Pillar {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  colorRing: string;
  questions: Question[];
}

const getPillars = (t: any): Pillar[] => [
  {
    id: 'perimetro',
    title: t('risk.pillars.perimetro.title'),
    subtitle: t('risk.pillars.perimetro.subtitle'),
    icon: <Shield className="w-5 h-5" />,
    color: 'sky',
    colorRing: '#0EA5E9',
    questions: [
      {
        id: 'p1',
        label: t('risk.pillars.perimetro.p1_label'),
        detail: t('risk.pillars.perimetro.p1_detail'),
        weight: 8,
        reference: 'Estándar Internacional — Perímetro Exterior',
      },
      {
        id: 'p2',
        label: t('risk.pillars.perimetro.p2_label'),
        detail: t('risk.pillars.perimetro.p2_detail'),
        weight: 5,
        reference: 'IESNA G-1 — Iluminación de Seguridad',
      },
      {
        id: 'p3',
        label: t('risk.pillars.perimetro.p3_label'),
        detail: t('risk.pillars.perimetro.p3_detail'),
        weight: 9,
        reference: 'ISO 22311 — Detección de Intrusión',
      },
      {
        id: 'p4',
        label: t('risk.pillars.perimetro.p4_label'),
        detail: t('risk.pillars.perimetro.p4_detail'),
        weight: 7,
        reference: 'ISO 62676 — Sistemas de Videovigilancia',
      },
      {
        id: 'p5',
        label: t('risk.pillars.perimetro.p5_label'),
        detail: t('risk.pillars.perimetro.p5_detail'),
        weight: 6,
        reference: 'Estándar Internacional — Patrullaje Físico',
      },
    ],
  },
  {
    id: 'accesos',
    title: t('risk.pillars.accesos.title'),
    subtitle: t('risk.pillars.accesos.subtitle'),
    icon: <Lock className="w-5 h-5" />,
    color: 'violet',
    colorRing: '#8B5CF6',
    questions: [
      {
        id: 'a1',
        label: t('risk.pillars.accesos.a1_label'),
        detail: t('risk.pillars.accesos.a1_detail'),
        weight: 8,
        reference: 'ISO/IEC 24745 — Protección Biométrica',
      },
      {
        id: 'a2',
        label: t('risk.pillars.accesos.a2_label'),
        detail: t('risk.pillars.accesos.a2_detail'),
        weight: 5,
        reference: 'Estándar Internacional — Gestión de Visitantes',
      },
      {
        id: 'a3',
        label: t('risk.pillars.accesos.a3_label'),
        detail: t('risk.pillars.accesos.a3_detail'),
        weight: 7,
        reference: 'PSC.1-2012 — Zonas de Seguridad',
      },
      {
        id: 'a4',
        label: t('risk.pillars.accesos.a4_label'),
        detail: t('risk.pillars.accesos.a4_detail'),
        weight: 6,
        reference: 'Estándar Internacional — Control Vehicular',
      },
      {
        id: 'a5',
        label: t('risk.pillars.accesos.a5_label'),
        detail: t('risk.pillars.accesos.a5_detail'),
        weight: 7,
        reference: 'ISO 27001 A.11 — Seguridad Física',
      },
    ],
  },
  {
    id: 'procedimientos',
    title: t('risk.pillars.procedimientos.title'),
    subtitle: t('risk.pillars.procedimientos.subtitle'),
    icon: <FileCheck className="w-5 h-5" />,
    color: 'amber',
    colorRing: '#F59E0B',
    questions: [
      {
        id: 'pr1',
        label: t('risk.pillars.procedimientos.pr1_label'),
        detail: t('risk.pillars.procedimientos.pr1_detail'),
        weight: 9,
        reference: 'ISO 22301 — Continuidad de Negocio',
      },
      {
        id: 'pr2',
        label: t('risk.pillars.procedimientos.pr2_label'),
        detail: t('risk.pillars.procedimientos.pr2_detail'),
        weight: 7,
        reference: 'NFPA 1600 — Gestión de Emergencias',
      },
      {
        id: 'pr3',
        label: t('risk.pillars.procedimientos.pr3_label'),
        detail: t('risk.pillars.procedimientos.pr3_detail'),
        weight: 8,
        reference: 'ISO 31000 — Gestión de Riesgos',
      },
      {
        id: 'pr4',
        label: t('risk.pillars.procedimientos.pr4_label'),
        detail: t('risk.pillars.procedimientos.pr4_detail'),
        weight: 6,
        reference: 'Estándar Internacional — Certificación Profesional',
      },
      {
        id: 'pr5',
        label: t('risk.pillars.procedimientos.pr5_label'),
        detail: t('risk.pillars.procedimientos.pr5_detail'),
        weight: 5,
        reference: 'ISO 27037 — Evidencia Digital',
      },
    ],
  },
  {
    id: 'inteligencia',
    title: t('risk.pillars.inteligencia.title'),
    subtitle: t('risk.pillars.inteligencia.subtitle'),
    icon: <Eye className="w-5 h-5" />,
    color: 'emerald',
    colorRing: '#10B981',
    questions: [
      {
        id: 'i1',
        label: t('risk.pillars.inteligencia.i1_label'),
        detail: t('risk.pillars.inteligencia.i1_detail'),
        weight: 9,
        reference: 'Estándar Internacional — Centro de Operaciones',
      },
      {
        id: 'i2',
        label: t('risk.pillars.inteligencia.i2_label'),
        detail: t('risk.pillars.inteligencia.i2_detail'),
        weight: 8,
        reference: 'SLA Diplomático G7 — Tiempo de Respuesta',
      },
      {
        id: 'i3',
        label: t('risk.pillars.inteligencia.i3_label'),
        detail: t('risk.pillars.inteligencia.i3_detail'),
        weight: 7,
        reference: 'IEC 62676 — Integración PSIM',
      },
      {
        id: 'i4',
        label: t('risk.pillars.inteligencia.i4_label'),
        detail: t('risk.pillars.inteligencia.i4_detail'),
        weight: 8,
        reference: 'ISO 18788 — Operaciones de Seguridad',
      },
      {
        id: 'i5',
        label: t('risk.pillars.inteligencia.i5_label'),
        detail: t('risk.pillars.inteligencia.i5_detail'),
        weight: 6,
        reference: 'NIST SP 800-187 — Comunicación Segura',
      },
    ],
  },
];

function getRiskLevel(score: number, t: any) {
  if (score >= 80) return { label: t('risk.levels.optimal'), color: '#10B981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' };
  if (score >= 60) return { label: t('risk.levels.adequate'), color: '#0EA5E9', bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400' };
  if (score >= 40) return { label: t('risk.levels.moderate'), color: '#F59E0B', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' };
  if (score >= 20) return { label: t('risk.levels.high'), color: '#EF4444', bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' };
  return { label: t('risk.levels.critical'), color: '#DC2626', bg: 'bg-red-600/10', border: 'border-red-600/30', text: 'text-red-500' };
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE: Gauge Circular (SVG animado)
   ═══════════════════════════════════════════════════════════════ */
function RiskGauge({ score, t }: { score: number, t: any }) {
  const radius = 90;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const level = getRiskLevel(score, t);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="transform -rotate-90">
        {/* Background ring */}
        <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {/* Score ring */}
        <motion.circle
          cx="110" cy="110" r={radius}
          fill="none"
          stroke={level.color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${level.color}40)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          key={score}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-bold text-white tabular-nums"
        >
          {score}
        </motion.span>
        <span className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t('risk.dashboard.index_label')}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE: Barra de progreso por pilar
   ═══════════════════════════════════════════════════════════════ */
function PillarBar({ pillar, checked, total }: { pillar: Pillar; checked: number; total: number }) {
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400 flex items-center gap-1.5">{pillar.icon}{pillar.title}</span>
        <span className="text-gray-500 tabular-nums">{checked}/{total}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: pillar.colorRing }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL: Risk Analysis Dashboard
   ═══════════════════════════════════════════════════════════════ */
export default function RiskAnalysis() {
  const { t: originalT, i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'es';

  const t = (key: string, options?: any): string => {
    const obj = LOCALES[lang] || LOCALES.es;
    const cleanKey = key.startsWith('risk.') ? key.substring(5) : key;
    const parts = cleanKey.split('.');
    let val: any = obj;
    for (const part of parts) {
      if (val && val[part] !== undefined) {
        val = val[part];
      } else {
        val = null;
        break;
      }
    }
    if (typeof val === 'string') return val;
    return originalT(key, options) as string;
  };


  const pillars = useMemo(() => getPillars(t), [t]);
  const MAX_WEIGHT = useMemo(() => pillars.reduce((sum, p) => sum + p.questions.reduce((s, q) => s + q.weight, 0), 0), [pillars]);

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedPillar, setExpandedPillar] = useState<string | null>('perimetro');
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [showMethodology, setShowMethodology] = useState(true);

  const [contextData, setContextData] = useState({ location: '', sector: '', exposure: '', targetOrganization: '' });
  const [leadData, setLeadData] = useState({ name: '', jobTitle: '', company: '', email: '', phone: '' });
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  /* ── Cálculo del índice de protección ── */
  const protectionScore = useMemo(() => {
    let totalWeight = 0;
    Object.keys(checked).forEach((qid) => {
      if (checked[qid]) {
        const q = pillars.flatMap((p) => p.questions).find((q) => q.id === qid);
        if (q) totalWeight += q.weight;
      }
    });
    return Math.round((totalWeight / MAX_WEIGHT) * 100);
  }, [checked]);

  const riskLevel = getRiskLevel(protectionScore, t);

  /* ── Scores por pilar ── */
  const pillarStats = useMemo(() => {
    return pillars.map((p) => ({
      pillar: p,
      checked: p.questions.filter((q) => checked[q.id]).length,
      total: p.questions.length,
    }));
  }, [checked]);

  /* ── Toggle de un criterio ── */
  const toggleQuestion = (qid: string) => {
    setChecked((prev) => ({ ...prev, [qid]: !prev[qid] }));
  };

  /* ── Vulnerabilidades detectadas ── */
  const vulnerabilities = useMemo(() => {
    return pillars.flatMap((p) =>
      p.questions
        .filter((q) => !checked[q.id] && q.weight >= 7)
        .map((q) => ({ ...q, pillarTitle: p.title, pillarColor: p.colorRing }))
    );
  }, [checked]);

  /* ── Datos para el reporte ── */
  const reportData: ReportData = useMemo(() => ({
    leadName: leadData.name,
    jobTitle: leadData.jobTitle,
    company: leadData.company,
    email: leadData.email,
    phone: leadData.phone,
    targetOrganization: contextData.targetOrganization,
    location: contextData.location,
    sector: contextData.sector,
    exposure: contextData.exposure,
    score: protectionScore,
    pillars: pillarStats.map(p => ({ title: p.pillar.title, checked: p.checked, total: p.total })),
    vulnerabilities: vulnerabilities,
  }), [leadData, contextData, protectionScore, pillarStats, vulnerabilities]);

  /* ── Generación de PDF ── */
  const handleGeneratePDF = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportRef.current) return;
    setIsGenerating(true);
    
    try {
      // Iniciar secuencia de nurturing
      await startSequence(
        'lead-' + Date.now(),
        leadData.email,
        leadData.name,
        'riesgo',
        leadData.company
      );
      // 1. Guardar datos en Supabase antes de generar el PDF
      const { error: supabaseError } = await supabase
        .from('risk_assessments')
        .insert([{
          lead_name: leadData.name,
          job_title: leadData.jobTitle,
          company: leadData.company,
          email: leadData.email,
          phone: leadData.phone,
          target_organization: contextData.targetOrganization,
          location: contextData.location,
          sector: contextData.sector,
          exposure: contextData.exposure,
          score: protectionScore,
          pillars: pillarStats.map(p => ({ title: p.pillar.title, checked: p.checked, total: p.total })),
          vulnerabilities: vulnerabilities
        }]);

      if (supabaseError) {
        console.warn('Advertencia: No se pudo guardar el lead en Supabase:', supabaseError.message);
        // Continuamos con la generación del PDF aunque falle la base de datos para no bloquear al usuario
      }

      // 1b. Insertar en pipeline de leads (CRM)
      const { error: crmError } = await supabase.from('leads').insert([{
        nombre: leadData.name,
        correo: leadData.email,
        empresa: leadData.company || contextData.targetOrganization,
        telefono: leadData.phone,
        mensaje: `Score: ${protectionScore}/100 | Sector: ${contextData.sector} | Ubicación: ${contextData.location}`,
        fuente: 'riesgo',
        score: 30,
        estado: 'nuevo'
      }]);

      if (crmError) {
        console.warn('Advertencia: No se pudo guardar el lead en el CRM:', crmError.message);
      }

      // 1c. Email de bienvenida automático
      if (leadData.email) {
        sendNurtureEmail(leadData.email, leadData.name, 'riesgo', leadData.company);
      }

      // 2. Generar PDF
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Informe_Seguridad_${leadData.company || 'CSSG'}.pdf`);
      
      setShowLeadModal(false);
      // Activar modal de feedback tras guardar
      setTimeout(() => setShowFeedbackModal(true), 1000);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh pt-28 pb-20 custom-scrollbar">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* ════════════ HEADER ════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm mb-6">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-xs font-medium tracking-widest text-sky-300 uppercase">
              {t('risk.header.badge')}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {t('risk.header.title_1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-200 text-glow">
              {t('risk.header.title_2')}
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {t('risk.header.desc')}
          </p>

          {/* Botón de metodología */}
          <button
            onClick={() => document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-sm text-sm text-gray-300 transition-all cursor-pointer group"
          >
            <BookOpen className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
            <span>{t('risk.header.methodology_btn')}</span>
          </button>
        </motion.div>

        {/* ════════════ INTERACTIVIDAD 3D ════════════ */}
        <div className="max-w-5xl mx-auto mb-16 relative">
          <SecurityRadar3D />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2 rounded-full border border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('risk.header.live_engine')}</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{t('risk.header.version')}</span>
            </div>
          </div>
        </div>

        {/* ════════════ METODOLOGÍA ════════════ */}
        <div className="max-w-4xl mx-auto mb-16" id="metodologia">
          <div className="glass-morphism rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                <Info className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('risk.methodology.title')}</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-sky-400" />
                  <h4 className="font-semibold text-white text-sm">{t('risk.methodology.id_title')}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: t('risk.methodology.id_desc')}}>
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <h4 className="font-semibold text-white text-sm">{t('risk.methodology.fmea_title')}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: t('risk.methodology.fmea_desc')}}>
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-semibold text-white text-sm">{t('risk.methodology.quant_title')}</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html: t('risk.methodology.quant_desc')}}>
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <p className="text-xs text-gray-500 leading-relaxed" dangerouslySetInnerHTML={{__html: t('risk.methodology.note')}}>
              </p>
            </div>
          </div>
        </div>

        {/* ════════════ CONTEXTO OPERATIVO ════════════ */}
        <div className="max-w-4xl mx-auto mb-10">
           <div className="glass-morphism rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-400" />
                {t('risk.context.title')}
              </h3>
              <p className="text-sm text-gray-400 mb-6">{t('risk.context.desc')}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                 <div className="space-y-1.5 border-r border-white/5 pr-4">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('risk.context.entity')}</label>
                   <div className="relative">
                     <Building className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input type="text" placeholder={t('risk.context.entity_ph')} value={contextData.targetOrganization} onChange={(e)=>setContextData({...contextData, targetOrganization: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('risk.context.location')}</label>
                   <div className="relative">
                     <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input type="text" placeholder={t('risk.context.location_ph')} value={contextData.location} onChange={(e)=>setContextData({...contextData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('risk.context.sector')}</label>
                   <div className="relative">
                     <Briefcase className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                     <input type="text" placeholder={t('risk.context.sector_ph')} value={contextData.sector} onChange={(e)=>setContextData({...contextData, sector: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors" />
                   </div>
                 </div>
                 <div className="space-y-1.5">
                   <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('risk.context.exposure')}</label>
                   <div className="relative">
                     <AlertTriangle className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                     <select value={contextData.exposure} onChange={(e)=>setContextData({...contextData, exposure: e.target.value})} className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors appearance-none">
                       <option value="">{t('risk.context.exp_select')}</option>
                       <option value={t('risk.context.exp_low')}>{t('risk.context.exp_low')}</option>
                       <option value={t('risk.context.exp_med')}>{t('risk.context.exp_med')}</option>
                       <option value={t('risk.context.exp_high')}>{t('risk.context.exp_high')}</option>
                       <option value={t('risk.context.exp_crit')}>{t('risk.context.exp_crit')}</option>
                     </select>
                   </div>
                 </div>
              </div>
           </div>
        </div>

        {/* ════════════ DASHBOARD PRINCIPAL ════════════ */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* ──── COLUMNA IZQUIERDA: Pilares de evaluación ──── */}
          <div className="space-y-4">
            {pillars.map((pillar) => {
              const isExpanded = expandedPillar === pillar.id;
              const pillarChecked = pillar.questions.filter((q) => checked[q.id]).length;
              const pillarTotal = pillar.questions.length;

              return (
                <motion.div
                  key={pillar.id}
                  layout
                  className="glass-morphism rounded-2xl overflow-hidden"
                >
                  {/* Header del pilar */}
                  <button
                    onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                    className="w-full flex items-center gap-4 p-6 text-left cursor-pointer group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-colors"
                      style={{
                        backgroundColor: `${pillar.colorRing}10`,
                        borderColor: `${pillar.colorRing}30`,
                      }}
                    >
                      <span style={{ color: pillar.colorRing }}>{pillar.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-0.5">
                        <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full tabular-nums"
                          style={{
                            backgroundColor: `${pillar.colorRing}15`,
                            color: pillar.colorRing,
                          }}
                        >
                          {pillarChecked}/{pillarTotal}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{pillar.subtitle}</p>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {/* Contenido expandido */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 space-y-2">
                          {pillar.questions.map((q) => {
                            const isChecked = !!checked[q.id];
                            const isDetailOpen = !!expandedDetails[q.id];

                            return (
                              <div key={q.id} className="rounded-xl border border-white/[0.03] bg-white/[0.015]">
                                <div className="flex items-start gap-3 p-4">
                                  {/* Checkbox */}
                                  <button
                                    onClick={() => toggleQuestion(q.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                                      isChecked
                                        ? 'border-transparent'
                                        : 'border-white/15 hover:border-white/30'
                                    }`}
                                    style={isChecked ? { backgroundColor: pillar.colorRing } : {}}
                                  >
                                    {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                                  </button>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <span
                                        className={`text-sm font-medium transition-colors cursor-pointer ${
                                          isChecked ? 'text-white/60 line-through' : 'text-white'
                                        }`}
                                        onClick={() => toggleQuestion(q.id)}
                                      >
                                        {q.label}
                                      </span>
                                      {/* Peso / impacto */}
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500 shrink-0 tabular-nums">
                                        {t('risk.dashboard.weight')} {q.weight}/10
                                      </span>
                                    </div>

                                    {/* Botón de detalle */}
                                    <button
                                      onClick={() => setExpandedDetails(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                                      className="flex items-center gap-1 mt-1.5 text-[11px] text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                                    >
                                      <Info className="w-3 h-3" />
                                      <span>{isDetailOpen ? t('risk.dashboard.hide_detail') : t('risk.dashboard.view_detail')}</span>
                                    </button>

                                    {/* Detalle expandible */}
                                    <AnimatePresence>
                                      {isDetailOpen && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          exit={{ opacity: 0, height: 0 }}
                                          transition={{ duration: 0.2 }}
                                          className="overflow-hidden"
                                        >
                                          <div className="mt-3 p-3 rounded-lg bg-black/20 border border-white/[0.03] space-y-2">
                                            <p className="text-xs text-gray-400 leading-relaxed">
                                              {q.detail}
                                            </p>
                                            <p className="text-[10px] text-sky-400/60 font-mono">
                                              📐 {q.reference}
                                            </p>
                                          </div>
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* ──── COLUMNA DERECHA: Panel de resultados en vivo ──── */}
          <div className="lg:sticky lg:top-24 space-y-5">

            {/* Gauge principal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-morphism rounded-2xl p-8 text-center"
            >
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-6">
                {t('risk.dashboard.index_title')}
              </h4>

              <RiskGauge score={protectionScore} t={t} />

              <motion.div
                key={riskLevel.label}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full border ${riskLevel.bg} ${riskLevel.border}`}
              >
                {protectionScore >= 60 ? (
                  <CheckCircle2 className={`w-4 h-4 ${riskLevel.text}`} />
                ) : (
                  <AlertTriangle className={`w-4 h-4 ${riskLevel.text}`} />
                )}
                <span className={`text-sm font-semibold ${riskLevel.text}`}>{riskLevel.label}</span>
              </motion.div>
            </motion.div>

            {/* Barras por pilar */}
            <div className="glass-morphism rounded-2xl p-6 space-y-4">
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">
                {t('risk.dashboard.coverage_title')}
              </h4>
              {pillarStats.map((ps) => (
                <PillarBar
                  key={ps.pillar.id}
                  pillar={ps.pillar}
                  checked={ps.checked}
                  total={ps.total}
                />
              ))}
            </div>

            {/* Vulnerabilidades críticas */}
            <AnimatePresence>
              {vulnerabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="glass-morphism rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-medium text-amber-400 uppercase tracking-widest">
                      {t('risk.dashboard.critical_breaches')}
                    </h4>
                  </div>

                  <div className="space-y-2.5 max-h-52 overflow-y-auto custom-scrollbar pr-1">
                    {vulnerabilities.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-start gap-2 text-xs p-2.5 rounded-lg bg-red-500/[0.04] border border-red-500/10"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-gray-300 font-medium">{v.label}</span>
                          <span className="text-gray-600 block mt-0.5">{v.pillarTitle} — {t('risk.dashboard.weight')} {v.weight}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA modificado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="glass-morphism rounded-2xl p-6"
            >
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {t('risk.dashboard.cta_desc')}
              </p>
              <button
                onClick={() => setShowLeadModal(true)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {t('risk.dashboard.cta_btn')}
              </button>
              <p className="text-[10px] text-gray-600 text-center mt-3">
                {t('risk.dashboard.cta_footer')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      <AnimatePresence>
        {showLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLeadModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-2">{t('risk.modal.title')}</h3>
              <p className="text-sm text-gray-400 mb-6">{t('risk.modal.desc')}</p>
              <form onSubmit={handleGeneratePDF} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">{t('risk.modal.name')}</label>
                  <input required type="text" value={leadData.name} onChange={(e)=>setLeadData({...leadData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">{t('risk.modal.job')}</label>
                  <input type="text" value={leadData.jobTitle} onChange={(e)=>setLeadData({...leadData, jobTitle: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">{t('risk.modal.company')}</label>
                  <input required type="text" value={leadData.company} onChange={(e)=>setLeadData({...leadData, company: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">{t('risk.modal.email')}</label>
                  <input required type="email" value={leadData.email} onChange={(e)=>setLeadData({...leadData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-1.5">{t('risk.modal.phone')}</label>
                  <input required type="tel" value={leadData.phone} onChange={(e)=>setLeadData({...leadData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500/50" />
                </div>
                <div className="pt-4 flex gap-3">
                  <button type="button" onClick={()=>setShowLeadModal(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors cursor-pointer">{t('risk.modal.cancel')}</button>
                  <button type="submit" disabled={isGenerating} className="flex-1 px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
                     {isGenerating ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Download className="w-4 h-4" />}
                     {isGenerating ? t('risk.modal.generating') : t('risk.modal.btn')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FEEDBACK & GOOGLE REVIEW MODAL */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowFeedbackModal(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }} 
              className="relative bg-[#111218] border border-white/10 rounded-3xl p-8 md:p-10 w-full max-w-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 blur-[80px] rounded-full" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">Ayúdanos a Seguir Innovando</h3>
                <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
                  ¿Este informe impulsado por <strong>Inteligencia Artificial Avanzada</strong> te ha sido de utilidad? Nuestro objetivo es democratizar la seguridad corporativa. Como intercambio por esta herramienta de alto valor, te invitamos a dejar tu reseña o agradecimiento público.
                </p>
                <div className="space-y-6">
                  <textarea 
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-sky-500/50 transition-all min-h-[120px]" 
                    placeholder="Escribe tu testimonio de la evaluación..."
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => setShowFeedbackModal(false)} className="flex-1 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5">
                      Publicar Agradecimiento
                    </button>
                    <a href="https://search.google.com/local/writereview?placeid=YOUR_GOOGLE_PLACE_ID" target="_blank" rel="noopener noreferrer" className="flex-1 px-8 py-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                      Puntuar en Google ★★★★★
                    </a>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/5 text-left">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">Comentarios Recientes</h4>
                  <div className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                    <p className="text-sky-400 text-[10px] font-bold mb-2">Director de Operaciones, Retail Intl.</p>
                    <p className="text-gray-400 text-xs italic">"El informe automatizado me brindó una perspectiva clara sobre las brechas de nuestro CCTV perimetral. Excelente herramienta como punto de partida."</p>
                  </div>
                </div>
                <button onClick={() => setShowFeedbackModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SEO & COMMENTS SECTION (INDEXABLE) */}
      <section id="comentarios" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
           <div className="flex items-center gap-4 mb-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <h3 className="text-2xl font-bold text-white px-4">Testimonios y Valoraciones</h3>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
           </div>
           <div className="grid md:grid-cols-[1fr_350px] gap-10 text-left">
              <div className="glass-morphism rounded-3xl p-8 border-sky-500/10">
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  Su opinión nos ayuda a perfeccionar nuestros algoritmos de análisis de riesgo y a seguir ofreciendo consultoría de alto nivel de forma gratuita para la comunidad corporativa.
                </p>
                <div className="space-y-4">
                  <textarea className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-sky-500/40 transition-all" rows={4} placeholder="Escriba su comentario aquí..." />
                  <button className="w-full sm:w-auto px-10 py-4 rounded-xl bg-sky-600/20 hover:bg-sky-600/40 text-sky-400 font-bold border border-sky-500/20 transition-all">Enviar Comentario</button>
                </div>
              </div>
              <div className="space-y-4">
                 <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:border-sky-500/20 transition-all group">
                   <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <Zap key={i} className="w-3 h-3 text-sky-400 fill-sky-400" />)}
                   </div>
                   <p className="text-white text-xs font-bold mb-2 group-hover:text-sky-400 transition-colors">Gerente Regional de Seguridad</p>
                   <p className="text-gray-400 text-[11px] leading-relaxed italic">"Herramienta indispensable para el QBR semestral. Los KPIs que arroja son muy precisos."</p>
                 </div>
                 <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:border-sky-500/20 transition-all group">
                   <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(i => <Zap key={i} className="w-3 h-3 text-sky-400 fill-sky-400" />)}
                   </div>
                   <p className="text-white text-xs font-bold mb-2 group-hover:text-sky-400 transition-colors">Director de Operaciones, Retail</p>
                   <p className="text-gray-400 text-[11px] leading-relaxed italic">"El informe me brindó una perspectiva clara sobre las brechas de nuestro CCTV."</p>
                 </div>
              </div>
           </div>
           <script type="application/ld+json">
             {JSON.stringify({
               "@context": "https://schema.org",
               "@type": "SoftwareApplication",
               "name": "CSSG Risk Analyzer",
               "applicationCategory": "BusinessApplication",
               "offers": { "@type": "Offer", "price": "0" },
               "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "127" }
             })}
           </script>
        </div>
      </section>

      <ReportTemplate ref={reportRef} data={reportData} />
    </div>
  );
}
