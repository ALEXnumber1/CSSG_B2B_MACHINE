import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, FileText, Globe, TrendingUp, Users, Cpu, Leaf, Scale, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sendNurtureEmail } from '../lib/email';
import { jsPDF } from 'jspdf';
import IntelligenceCenter from '../sections/IntelligenceCenter';

const LOCALES = {
  es: {
    hero: {
      badge: "Consulta Pública · Descarga Gratuita",
      title_1: "Informe de",
      title_2: "Seguridad 2026",
      desc: "Análisis PESTEL exhaustivo del panorama de seguridad en Venezuela. Validado por especialistas humanos y optimizado mediante IA de alta fidelidad."
    },
    pestel: {
      title: "Metodología de Análisis PESTEL",
      desc: "El análisis PESTEL evalúa seis dimensiones del entorno externo que impactan directamente en las estrategias de seguridad de cualquier organización que opere en Venezuela.",
      p_title: "Político",
      p_desc: "Institucionalización del control territorial: Se observa una transición desde estructuras informales hacia canales de supervisión estatal, minimizando la visibilidad de comandos operacionales autónomos y consolidando un entorno de mando unificado en zonas críticas.",
      e_title: "Económico",
      e_desc: "Correlación entre liquidez y riesgo patrimonial: La volatilidad económica y la restricción de flujo de caja corporativo actúan como disparadores de delitos oportunistas, incrementando la necesidad de auditorías de vulnerabilidad en la cadena de suministros.",
      s_title: "Social",
      s_desc: "Dinámicas de migración circular (Reportes OIM): La inestabilidad en la permanencia de retornados impacta la rotación de personal básico de vigilancia, exigiendo una mayor inversión en procesos de selección y fidelización de oficiales de élite.",
      t_title: "Tecnológico",
      t_desc: "Inteligencia de Video y Analítica Predictiva: Sustitución de la vigilancia pasiva por sistemas IP con detección de patrones AI, permitiendo tiempos de respuesta táctica < 30 segundos ante brechas perimetrales detectadas.",
      ec_title: "Ecológico",
      ec_desc: "Resiliencia de Infraestructuras Críticas: Incremento de planes de contingencia ante la inestabilidad de servicios básicos, priorizando sistemas de seguridad con autonomía energética y alta resistencia a factores ambientales extremos.",
      l_title: "Legal",
      l_desc: "Adaptabilidad Normativa: Evolución del marco regulatorio Digesservisp para la integración de tecnologías de seguridad privada, exigiendo a las corporaciones un cumplimiento riguroso de certificaciones tácticas y laborales."
    },
    summary: {
      title: "Resumen Ejecutivo",
      p1: "El panorama de seguridad en Venezuela presenta una reconfiguración estructural en 2026. La <strong class='text-gray-200'>desactivación de estructuras de control informal</strong> y su transición hacia canales institucionales marca un cambio en los protocolos de patrullaje y vigilancia en centros urbanos.",
      p2: "A nivel socio-económico, el <strong class='text-gray-200'>descontento latente e impulsado por la restricción económica</strong> actúa como un catalizador de riesgos operativos. Las organizaciones deben considerar factores demográficos atípicos, como la migración circular reportada por la <strong class='text-gray-200'>OIM</strong>, donde el reingreso de ciudadanos al territorio nacional es transitorio, afectando la estabilidad del talento humano y la planificación de largo plazo.",
      p3: "Este análisis PESTEL no pretende emitir juicios de valor, sino proporcionar una <strong class='text-gray-200'>matriz analítica imparcial</strong> para la protección de infraestructuras críticas y misiones diplomáticas, asegurando que la continuidad del negocio se base en realidades de entorno verificables y no en percepciones mediáticas.",
      stat1_value: "+17 años",
      stat1_desc: "de datos y experiencia operativa analizados",
      stat2_value: "6 dimensiones",
      stat2_desc: "de análisis PESTEL aplicado a seguridad",
      stat3_value: "Gratuito",
      stat3_desc: "disponible para descarga pública"
    },
    cta: {
      badge: "Descarga Gratuita",
      title: "Descargar Informe Completo",
      desc: "Acceda al informe PESTEL completo en formato PDF. Solo necesitamos sus datos para enviarle el enlace de descarga.",
      success_title: "¡Informe Redactado Exitosamente!",
      success_desc: "El análisis PESTEL ya está disponible para su revisión. Si la descarga automática no se inició, use el botón a continuación.",
      btn_download: "Descargar PDF Certificado",
      btn_new: "Nuevo Análisis",
      preview: "Vista Previa del Informe",
      name: "Nombre",
      name_ph: "Su nombre",
      org: "Organización",
      org_ph: "Empresa o institución",
      email: "Correo Electrónico",
      email_ph: "correo@ejemplo.com",
      error: "Error al enviar. Intente nuevamente.",
      btn_submit: "Descargar Informe PESTEL (PDF)",
      processing: "Procesando..."
    },
    seo: {
      title: "CSSG: Autoridad en Seguridad Pública y Privada en Venezuela",
      p1: "Con más de 17 años de operación continua sin incidentes, <strong class='text-gray-300'>Company Of Security and Service Global (CSSG)</strong> se ha posicionado como referente en <strong class='text-gray-300'>seguridad corporativa en Caracas</strong> y toda Venezuela. Nuestros servicios de vigilancia privada, consultoría en seguridad integral y tecnología de protección atienden a embajadas, corporaciones internacionales y organizaciones de alto nivel.",
      p2: "Este <strong class='text-gray-300'>informe de seguridad Venezuela 2026</strong> es parte de nuestro compromiso con la transparencia y la educación del sector. Mediante el <strong class='text-gray-300'>análisis PESTEL aplicado a seguridad</strong>, proporcionamos una visión completa de los factores políticos, económicos, sociales, tecnológicos, ecológicos y legales que afectan la industria de la <strong class='text-gray-300'>seguridad privada en Venezuela</strong>.",
      p3: "Ya sea que busque un <strong class='text-gray-300'>análisis de riesgo en Caracas</strong>, necesite <strong class='text-gray-300'>consultoría de seguridad integral</strong> para su organización, o desee entender el <strong class='text-gray-300'>riesgo operativo en Venezuela</strong>, este informe es su punto de partida. Para una evaluación personalizada, le invitamos a utilizar nuestra herramienta gratuita de análisis de riesgos o agendar una consulta con nuestro equipo."
    }
  },
  en: {
    hero: {
      badge: "Public Consultation · Free Download",
      title_1: "Security",
      title_2: "Report 2026",
      desc: "Exhaustive PESTEL analysis of the security landscape in Venezuela. Validated by human specialists and optimized through high-fidelity AI."
    },
    pestel: {
      title: "PESTEL Analysis Methodology",
      desc: "The PESTEL analysis evaluates six external environment dimensions that directly impact the security strategies of any organization operating in Venezuela.",
      p_title: "Political",
      p_desc: "Institutionalization of territorial control: A transition from informal structures to state supervision channels is observed, minimizing the visibility of autonomous operational commands and consolidating a unified command environment in critical areas.",
      e_title: "Economic",
      e_desc: "Correlation between liquidity and asset risk: Economic volatility and corporate cash flow restrictions act as triggers for opportunistic crimes, increasing the need for vulnerability audits in the supply chain.",
      s_title: "Social",
      s_desc: "Circular migration dynamics (IOM Reports): Instability in the permanence of returnees impacts the turnover of basic security personnel, requiring greater investment in elite officer selection and loyalty processes.",
      t_title: "Technological",
      t_desc: "Video Intelligence and Predictive Analytics: Replacement of passive surveillance with IP systems featuring AI pattern detection, allowing tactical response times < 30 seconds to detected perimeter breaches.",
      ec_title: "Ecological",
      ec_desc: "Critical Infrastructure Resilience: Increase in contingency plans due to the instability of basic services, prioritizing security systems with energy autonomy and high resistance to extreme environmental factors.",
      l_title: "Legal",
      l_desc: "Regulatory Adaptability: Evolution of the Digesservisp regulatory framework for the integration of private security technologies, requiring corporations to strictly comply with tactical and labor certifications."
    },
    summary: {
      title: "Executive Summary",
      p1: "The security landscape in Venezuela presents a structural reconfiguration in 2026. The <strong class='text-gray-200'>deactivation of informal control structures</strong> and their transition to institutional channels marks a shift in patrol and surveillance protocols in urban centers.",
      p2: "At the socio-economic level, <strong class='text-gray-200'>latent discontent driven by economic restriction</strong> acts as a catalyst for operational risks. Organizations must consider atypical demographic factors, such as the circular migration reported by the <strong class='text-gray-200'>IOM</strong>, where the reentry of citizens into national territory is transient, affecting human talent stability and long-term planning.",
      p3: "This PESTEL analysis is not intended to pass value judgments, but to provide an <strong class='text-gray-200'>impartial analytical matrix</strong> for the protection of critical infrastructures and diplomatic missions, ensuring that business continuity is based on verifiable environmental realities rather than media perceptions.",
      stat1_value: "+17 years",
      stat1_desc: "of data and operational experience analyzed",
      stat2_value: "6 dimensions",
      stat2_desc: "of PESTEL analysis applied to security",
      stat3_value: "Free",
      stat3_desc: "available for public download"
    },
    cta: {
      badge: "Free Download",
      title: "Download Full Report",
      desc: "Access the full PESTEL report in PDF format. We only need your details to send you the download link.",
      success_title: "Report Successfully Drafted!",
      success_desc: "The PESTEL analysis is now available for your review. If the automatic download did not start, use the button below.",
      btn_download: "Download Certified PDF",
      btn_new: "New Analysis",
      preview: "Report Preview",
      name: "Name",
      name_ph: "Your name",
      org: "Organization",
      org_ph: "Company or institution",
      email: "Email",
      email_ph: "email@example.com",
      error: "Error sending. Please try again.",
      btn_submit: "Download PESTEL Report (PDF)",
      processing: "Processing..."
    },
    seo: {
      title: "CSSG: Authority in Public and Private Security in Venezuela",
      p1: "With over 17 years of continuous operation without incidents, <strong class='text-gray-300'>Company Of Security and Service Global (CSSG)</strong> has positioned itself as a benchmark in <strong class='text-gray-300'>corporate security in Caracas</strong> and throughout Venezuela. Our private surveillance services, comprehensive security consulting, and protection technology serve embassies, international corporations, and high-level organizations.",
      p2: "This <strong class='text-gray-300'>Venezuela 2026 security report</strong> is part of our commitment to transparency and industry education. Through <strong class='text-gray-300'>PESTEL analysis applied to security</strong>, we provide a complete view of the political, economic, social, technological, ecological, and legal factors affecting the <strong class='text-gray-300'>private security industry in Venezuela</strong>.",
      p3: "Whether you are looking for a <strong class='text-gray-300'>risk analysis in Caracas</strong>, need <strong class='text-gray-300'>comprehensive security consulting</strong> for your organization, or wish to understand the <strong class='text-gray-300'>operational risk in Venezuela</strong>, this report is your starting point. For a personalized assessment, we invite you to use our free risk analysis tool or schedule a consultation with our team."
    }
  }
};

const getPestelFactors = (content: any) => [
  {
    letter: 'P',
    title: content.pestel.p_title,
    icon: <Globe className="w-6 h-6" />,
    desc: content.pestel.p_desc,
    color: 'sky',
  },
  {
    letter: 'E',
    title: content.pestel.e_title,
    icon: <TrendingUp className="w-6 h-6" />,
    desc: content.pestel.e_desc,
    color: 'emerald',
  },
  {
    letter: 'S',
    title: content.pestel.s_title,
    icon: <Users className="w-6 h-6" />,
    desc: content.pestel.s_desc,
    color: 'indigo',
  },
  {
    letter: 'T',
    title: content.pestel.t_title,
    icon: <Cpu className="w-6 h-6" />,
    desc: content.pestel.t_desc,
    color: 'violet',
  },
  {
    letter: 'E',
    title: content.pestel.ec_title,
    icon: <Leaf className="w-6 h-6" />,
    desc: content.pestel.ec_desc,
    color: 'green',
  },
  {
    letter: 'L',
    title: content.pestel.l_title,
    icon: <Scale className="w-6 h-6" />,
    desc: content.pestel.l_desc,
    color: 'rose',
  },
];

const colorMap: Record<string, string> = {
  sky: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
  emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
  indigo: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10',
  violet: 'text-violet-400 border-violet-500/20 bg-violet-500/10',
  green: 'text-green-400 border-green-500/20 bg-green-500/10',
  rose: 'text-rose-400 border-rose-500/20 bg-rose-500/10',
};

const keywords = [
  'seguridad pública Venezuela', 'análisis de riesgo Caracas', 'seguridad privada Venezuela 2026',
  'informe seguridad corporativa', 'consultoría seguridad integral', 'análisis PESTEL seguridad',
  'riesgo operativo Venezuela', 'protección de activos Latinoamérica', 'vigilancia privada regulaciones',
  'seguridad empresarial Caracas',
];

interface ReportFormData {
  nombre: string;
  correo: string;
  organizacion: string;
}

export default function Informes() {
  const { i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'es';
  const content = LOCALES[lang];
  const pestelFactors = getPestelFactors(content);
  
  const [formData, setFormData] = useState<ReportFormData>({ nombre: '', correo: '', organizacion: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const now = new Date();
    const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const currentMonthYear = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;
    
    // --- PÁGINA 1: PORTADA EJECUTIVA ---
    // Cabecera estilizada
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, 75, 'F');
    doc.setFillColor(14, 165, 233);
    doc.rect(0, 0, pageWidth, 2, 'F');

    const loadLogo = () => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = '/logo_full.png';
        img.onload = () => {
          doc.addImage(img, 'PNG', (pageWidth / 2) - 30, 8, 60, 60);
          resolve();
        };
        img.onerror = () => {
          console.warn('No se pudo cargar el logo oficial, usando fallback textual.');
          doc.setTextColor(14, 165, 233);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text('COMPANY OF SECURITY AND SERVICE GLOBAL', pageWidth / 2, 20, { align: 'center' });
          resolve();
        };
      });
    };

    await loadLogo();
    
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORME DE SEGURIDAD', pageWidth / 2, 80, { align: 'center' });
    doc.setFontSize(26);
    doc.text('(PESTEL) VENEZUELA', pageWidth / 2, 90, { align: 'center' });
    
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`ANÁLISIS TÁCTICO - PERIODO DE EVALUACIÓN: ${currentMonthYear}`, pageWidth / 2, 97, { align: 'center' });

    // SECCIÓN 1: CONTEXTO HISTÓRICO
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text('Contexto Histórico y Evolución', 20, 115);
    doc.setDrawColor(14, 165, 233);
    doc.line(20, 117, 40, 117);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Periodo 2022-2023: Fase de Reactivación', 20, 130);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const hist1 = 'Caracterizado por la reactivación formal de misiones diplomáticas y corporaciones multinacionales post-pandemia. El enfoque principal fue la auditoría de activos fijos y la reconfiguración de la seguridad física tradicional.';
    doc.text(doc.splitTextToSize(hist1, pageWidth - 40), 20, 135);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Periodo 2024-2025: Integración Tecnológica e ISO', 20, 160);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const hist2 = 'Marcado por la migración masiva hacia sistemas de videovigilancia asistidos por Inteligencia Artificial y la estandarización de procesos bajo las normas ISO 18788 y 9001. La seguridad electrónica consolidó la inversión corporativa.';
    doc.text(doc.splitTextToSize(hist2, pageWidth - 40), 20, 165);

    // Resumen Ejecutivo del Periodo Actual
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Resumen Ejecutivo del Periodo Actual', 20, 195);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const summaryText = 'El panorama de seguridad en Venezuela para el ciclo 2026 exige una transición de la vigilancia reactiva hacia la inteligencia operativa proactiva. Se identifica una reconfiguración de los nodos de control y una creciente dependencia de la autonomía tecnológica frente a la inestabilidad de suministros. Este informe sintetiza datos críticos para la continuidad del negocio y la protección de misiones diplomáticas de alto nivel.';
    doc.text(doc.splitTextToSize(summaryText, pageWidth - 40), 20, 201);

    // Indicaciones de Uso
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    doc.text('Este documento es una consulta técnica pública emitida por el motor de IA de CSSG y validada por nuestra dirección táctica.', 20, 275);

    // --- PÁGINA 2: ANÁLISIS PESTEL DETALLADO ---
    doc.addPage();
    let yPos = 30;
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Matriz Analítica de Entorno (PESTEL)', 20, yPos);
    yPos += 15;
    
    pestelFactors.forEach(factor => {
      if (yPos > 240) {
        doc.addPage();
        yPos = 30;
      }
      
      doc.setFillColor(241, 245, 249);
      doc.rect(18, yPos - 5, pageWidth - 36, 35, 'F');
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(14, 165, 233);
      doc.text(`${factor.letter} - Dimensión ${factor.title}`, 22, yPos + 2);
      
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      
      const extendedDesc = `${factor.desc} Análisis Validado: La Dirección Táctica de CSSG recomienda la integración de protocolos de redundancia operativa para mitigar los riesgos asociados a esta dimensión durante el periodo en curso.`;
      
      const desc = doc.splitTextToSize(extendedDesc, pageWidth - 48);
      doc.text(desc, 22, yPos + 10);
      yPos += 45;
    });
    
    // --- PÁGINA 3: REFERENCIAS, FIRMA Y DISCLAIMER ---
    doc.addPage();
    yPos = 30;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Referencias y Fuentes de Información', 20, yPos);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    const references = [
      '1. Organización Internacional para las Migraciones (OIM) - Informe 2026.',
      '2. Digesservisp - Normativa Técnica de Seguridad Privada.',
      '3. Zentinel Global - Matriz de Análisis de Riesgos en Entornos Críticos.',
      '4. World Economic Forum - Global Risks Report (LatAm Context).',
      '5. CSSG Private Intelligence - Reporte de Prevención de Pérdidas.'
    ];
    references.forEach(ref => {
      doc.text(ref, 20, yPos);
      yPos += 6;
    });
    
    // Signature
    yPos += 40;
    doc.setDrawColor(226, 232, 240);
    doc.line(70, yPos, 140, yPos);
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('Dirección General', pageWidth / 2, yPos + 8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Company Of Security and Service Global', pageWidth / 2, yPos + 14, { align: 'center' });

    // DISCLAIMER FINAL
    yPos += 40;
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(148, 163, 184);
    const disclaimerText = 'AVISO LEGAL: Este documento ha sido generado mediante un motor de Inteligencia Artificial especializada y posteriormente REVISADO Y VALIDADO por especialistas humanos de CSSG. Debido a la naturaleza dinámica de los datos, la información presentada sirve como guía estratégica y debe ser verificada en campo. CSSG garantiza la solvencia técnica de este análisis bajo los estándares de seguridad corporativa vigentes.';
    doc.text(doc.splitTextToSize(disclaimerText, pageWidth - 40), 20, yPos);

    // --- Footer General ---
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('INFORME TÉCNICO CSSG - DISTRIBUCIÓN PÚBLICA AUTORIZADA', pageWidth / 2, 285, { align: 'center' });
      doc.text(`Página ${i} de ${pageCount}`, pageWidth - 20, 285, { align: 'right' });
    }
    
    doc.save(`CSSG_Informe_Pestel_${monthNames[now.getMonth()]}_2026.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      generatePDF();
      setStatus('success');
    } catch (pdfErr) {
      console.error('PDF Generation Error:', pdfErr);
      setStatus('error');
      return;
    }

    try {
      await supabase.from('leads').insert([{
        nombre: formData.nombre,
        correo: formData.correo,
        empresa: formData.organizacion,
        mensaje: 'Descarga de Informe PESTEL Técnico',
        fuente: 'pestel',
        score: 15,
      }]);

      if (formData.correo) {
        await sendNurtureEmail(formData.correo, formData.nombre, 'pestel', formData.organizacion);
      }
    } catch (err) {
      console.warn('CRM Registration failed.');
      console.error('Detailed error:', err);
    }
  };

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative">

        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{content.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-tight">
              {content.hero.title_1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{content.hero.title_2}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto lg:mx-0">
              {content.hero.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              y: [0, -15, 0] 
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              y: { 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="w-full max-w-[500px] relative mt-12 lg:mt-0"
          >
            <div className="absolute inset-0 bg-white/5 blur-[80px] rounded-full" />
            <img 
              src="/report_mockup.png" 
              alt="Informe de Seguridad (PESTEL) Venezuela" 
              className="relative z-10 w-full h-auto drop-shadow-2xl grayscale-[0.2] brightness-105"
            />
          </motion.div>
        </div>

        {/* Qué es PESTEL */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{content.pestel.title}</h2>
            <p className="text-gray-400 max-w-2xl leading-relaxed">
              {content.pestel.desc}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pestelFactors.map((factor, i) => {
              const colors = colorMap[factor.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-white/[0.12] transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-4 right-4 text-6xl font-black text-white/[0.03] select-none">{factor.letter}</div>
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colors}`}>
                    {factor.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{factor.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{factor.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-6">{content.summary.title}</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p dangerouslySetInnerHTML={{__html: content.summary.p1}}></p>
                <p dangerouslySetInnerHTML={{__html: content.summary.p2}}></p>
                <p dangerouslySetInnerHTML={{__html: content.summary.p3}}></p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <ShieldCheck className="w-8 h-8 text-sky-400 mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">{content.summary.stat1_value}</div>
                <p className="text-gray-500 text-xs">{content.summary.stat1_desc}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <FileText className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">{content.summary.stat2_value}</div>
                <p className="text-gray-500 text-xs">{content.summary.stat2_desc}</p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
                <Download className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <div className="text-2xl font-black text-white mb-1">{content.summary.stat3_value}</div>
                <p className="text-gray-500 text-xs">{content.summary.stat3_desc}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Descarga */}
        <div className="max-w-2xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/20 bg-emerald-500/5 mb-6">
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.2em]">{content.cta.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{content.cta.title}</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              {content.cta.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0D0F16] border border-white/5 rounded-2xl p-8 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-sky-500" />

            {status === 'success' ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">{content.cta.success_title}</h3>
                <p className="text-gray-400 mb-8">{content.cta.success_desc}</p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={() => {
                        try {
                          generatePDF();
                        } catch (e) {
                          alert("Error al generar el PDF. Por favor, revise el contenido en pantalla abajo.");
                          console.error(e);
                        }
                      }}
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    >
                      <Download className="w-5 h-5" />
                      {content.cta.btn_download}
                    </button>
                    <button 
                      onClick={() => { setStatus('idle'); setFormData({ nombre: '', correo: '', organizacion: '' }); }} 
                      className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all"
                    >
                      {content.cta.btn_new}
                    </button>
                  </div>

                  <div className="mt-12 p-8 bg-white/[0.03] border border-white/[0.06] rounded-2xl text-left">
                    <h4 className="text-sky-400 font-bold mb-4 uppercase tracking-widest text-xs">{content.cta.preview}</h4>
                    <div className="space-y-6">
                      {pestelFactors.map((f, idx) => (
                        <div key={idx}>
                          <p className="text-white font-bold text-sm mb-1">{f.letter} - {f.title}</p>
                          <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{content.cta.name}</label>
                    <input type="text" name="nombre" required value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder={content.cta.name_ph} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{content.cta.org}</label>
                    <input type="text" name="organizacion" required value={formData.organizacion}
                      onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder={content.cta.org_ph} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-1">{content.cta.email}</label>
                  <input type="email" name="correo" required value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" placeholder={content.cta.email_ph} />
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">{content.cta.error}</div>
                )}

                <button type="submit" disabled={status === 'loading'}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3">
                  {status === 'loading' ? content.cta.processing : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>{content.cta.btn_submit}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Intelligence Center Integrated */}
        <div className="mb-24">
          <IntelligenceCenter />
        </div>

        {/* SEO Content Block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/5 pt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">{content.seo.title}</h2>
          <div className="text-gray-500 text-sm leading-relaxed space-y-4 max-w-4xl">
            <p dangerouslySetInnerHTML={{__html: content.seo.p1}}></p>
            <p dangerouslySetInnerHTML={{__html: content.seo.p2}}></p>
            <p dangerouslySetInnerHTML={{__html: content.seo.p3}}></p>
          </div>

          {/* Keywords as tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {keywords.map((kw, i) => (
              <span key={i} className="px-3 py-1.5 text-[10px] font-semibold text-gray-500 bg-white/[0.02] border border-white/[0.05] rounded-full uppercase tracking-wider">
                {kw}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
