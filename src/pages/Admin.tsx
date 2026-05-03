import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { jsPDF } from 'jspdf';
import { 
  Lock, X, Search, Filter, RefreshCw, User, 
  Calendar, ChevronRight, Save,
  BarChart3, Users, Zap, Upload, Plus, Trash2, Database, FileSpreadsheet, PenTool, UserPlus, Download, Send
} from 'lucide-react';
import { parseCSV, generateSampleCSV, saveScrapedLeads, type ScrapedLead } from '../lib/scraper';
import { processSequences } from '../lib/sequences';

const ADMIN_PASS = 'cssg2026';

type Lead = {
  id: string;
  created_at: string;
  nombre: string;
  correo: string;
  empresa: string;
  telefono: string;
  mensaje: string;
  fuente: string;
  score: number;
  estado: string;
  notas: string;
  asignado_a: string;
  ultimo_contacto: string;
  emails_enviados: number;
  secuencia_activa: boolean;
};

export default function Admin() {
  const { t } = useTranslation();
  
  // Auth state
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState('');
  
  // Tabs state
  const [activeTab, setActiveTab] = useState<'crm' | 'prospectar' | 'contenido' | 'talento'>('crm');

  // CRM state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [isProcessingSequences, setIsProcessingSequences] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterFuente, setFilterFuente] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editNotas, setEditNotas] = useState('');

  // Scraper state
  const [scrapedLeads, setScrapedLeads] = useState<ScrapedLead[]>([]);
  const [csvText, setCsvText] = useState('');
  const [manualLead, setManualLead] = useState<ScrapedLead>({
    nombre: '', empresa: '', correo: '', telefono: '', sector: '', ubicacion: 'Caracas', fuente_url: 'Manual', confianza: 'alta'
  });
  const [savingScraped, setSavingScraped] = useState(false);
  
  // Blog state
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('leads').select('*');
      if (error) {
        console.error("Supabase Select Error:", error);
      }
      if (data) setLeads(data);
    } catch (e) { 
      console.error("Fetch Leads Exception:", e); 
    }
    setLoading(false);
  }, []);

  const runSequences = async () => {
    setIsProcessingSequences(true);
    try {
      await processSequences();
      alert("Secuencias procesadas con éxito");
    } catch (e) {
      console.error(e);
      alert("Error al procesar secuencias");
    }
    setIsProcessingSequences(false);
  };

  const fetchPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setPosts(data);
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => {
    if (auth) {
      fetchLeads();
      fetchPosts();
    }
  }, [auth, fetchLeads, fetchPosts]);

const savePost = async () => {
    if (!editingPost || !editingPost.title || !editingPost.slug) return;
    setSavingPost(true);
    try {
      // Preparamos el objeto para guardar. 
      // Si no hay ID, NO lo enviamos para que Supabase lo genere automáticamente.
      const postToSave: any = {
        title: editingPost.title,
        slug: editingPost.slug,
        excerpt: editingPost.excerpt,
        content: editingPost.content,
        category: editingPost.category,
        published: editingPost.published,
        featured: editingPost.featured,
        read_time: editingPost.read_time,
        image: editingPost.image || editingPost.image_url || '',
        image_url: editingPost.image || editingPost.image_url || '',
        created_at: editingPost.id ? editingPost.created_at : new Date().toISOString()
      };

      if (editingPost.id) {
        postToSave.id = editingPost.id;
      }

      const { error } = await supabase
        .from('blog_posts')
        .upsert([postToSave]);
      
      if (error) {
        console.error("Error saving post:", error);
        alert("Error de Base de Datos: " + error.message);
      } else {
        setShowPostModal(false);
        fetchPosts();
      }
    } catch (e: any) { 
      console.error(e); 
      alert("Error inesperado: " + e.message);
    }
    setSavingPost(false);
  };

  const generateCV = (lead: Lead) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('PERFIL DEL CANDIDATO', 20, 25);
    doc.setFontSize(10);
    doc.text('CSSG RECRUITMENT CENTER - EVALUACIÓN TÁCTICA', 20, 32);

    // Body
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.text(lead.nombre.toUpperCase(), 20, 55);
    
    doc.setDrawColor(14, 165, 233);
    doc.line(20, 58, 60, 58);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DE CONTACTO', 20, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(`Correo: ${lead.correo}`, 20, 82);
    doc.text(`Teléfono: ${lead.telefono || 'No especificado'}`, 20, 89);
    
    doc.setFont('helvetica', 'bold');
    doc.text('POSTULACIÓN Y EXPERIENCIA', 20, 105);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cargo de Interés: ${lead.empresa.replace('CANDIDATO: ', '')}`, 20, 112);
    doc.text(`Fecha de Registro: ${new Date(lead.created_at).toLocaleDateString()}`, 20, 119);
    
    doc.setFont('helvetica', 'bold');
    doc.text('METADATOS DEL SISTEMA', 20, 135);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fuente: ${lead.fuente}`, 20, 142);
    doc.text(`Puntuación de Reclutamiento: ${lead.score || 0}/100`, 20, 149);
    
    doc.setFont('helvetica', 'bold');
    doc.text('NOTAS ADICIONALES', 20, 165);
    doc.setFont('helvetica', 'italic');
    const notas = lead.mensaje || 'Sin comentarios adicionales.';
    doc.text(doc.splitTextToSize(notas, pageWidth - 40), 20, 172);

    // Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Este documento es una exportación oficial del CRM de CSSG.', pageWidth / 2, 285, { align: 'center' });

    doc.save(`CV_${lead.nombre.replace(/ /g, '_')}.pdf`);
  };

  const generateWithAI = () => {
    const templates = [
      {
        title: "5 Tendencias de Seguridad Física que Dominarán 2026",
        category: "Tecnología",
        excerpt: "Desde la IA Agéntica hasta la arquitectura Zero Trust, el 2026 marca el fin de la seguridad reactiva.",
        content: `
          <p>El año 2026 marca un punto de inflexión histórico en la seguridad corporativa. Lo que antes era una función aislada y reactiva, se ha transformado en un activo estratégico impulsado por datos.</p>
          <h2>1. La IA como Socio Activo (IA Agéntica)</h2>
          <p>Ya no hablamos solo de cámaras que detectan movimiento. En 2026, la IA Agéntica sirve como un colaborador activo que automatiza flujos de trabajo completos.</p>
          <h2>2. Arquitectura Zero Trust</h2>
          <p>La convergencia entre ciberseguridad y seguridad física ha traído el concepto de Zero Trust al acceso físico.</p>
          <p>En CSSG ayudamos a las organizaciones a transitar hacia este nuevo paradigma de protección inteligente.</p>
        `
      },
      {
        title: "RRHH: El socio crítico del Gerente de Seguridad",
        category: "Estrategia",
        excerpt: "Por qué el departamento de Recursos Humanos es la primera línea de defensa de una organización en Venezuela.",
        content: `
          <p>En el mundo de la seguridad corporativa, solemos invertir en tecnología, pero el factor humano sigue siendo el eslabón más crítico.</p>
          <h2>La vulnerabilidad que las cámaras no ven</h2>
          <p>Un proceso de selección apresurado o un oficial mal remunerado son riesgos que ningún software puede mitigar por sí solo.</p>
          <h2>Estabilidad y Lealtad</h2>
          <p>En CSSG hemos comprobado que liderar la tabla salarial no es un gasto, es una estrategia de seguridad.</p>
        `
      },
      {
        title: "Protección Diplomática: Protocolos de Alto Nivel",
        category: "Diplomacia",
        excerpt: "Estándares internacionales de seguridad para misiones internacionales e infraestructura crítica.",
        content: `
          <p>La seguridad diplomática exige una discreción absoluta y una eficiencia impecable. No se trata solo de vigilancia, sino de gestión de riesgos geopolíticos.</p>
          <h2>Estándares G7</h2>
          <p>Nuestros protocolos están diseñados bajo las exigencias de embajadas internacionales, priorizando la prevención y la inteligencia operativa.</p>
        `
      }
    ];

    const random = templates[Math.floor(Math.random() * templates.length)];
    setEditingPost({
      ...random,
      slug: random.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      published: false,
      featured: false,
      read_time: '6 min'
    });
    setShowPostModal(true);
  };

  const updateLeadEstado = async (id: string, newEstado: string) => {
    await supabase.from('leads').update({ estado: newEstado }).eq('id', id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, estado: newEstado } : l));
    if (selectedLead?.id === id) setSelectedLead(prev => prev ? { ...prev, estado: newEstado } : null);
  };

  const handleDeleteLead = async (id: string) => {
    if(confirm('¿Seguro que desea eliminar esta postulación?')) {
      await supabase.from('leads').delete().eq('id', id);
      fetchLeads();
    }
  };

  const saveNotas = async () => {
    if (!selectedLead) return;
    await supabase.from('leads').update({ notas: editNotas }).eq('id', selectedLead.id);
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, notas: editNotas } : l));
    setSelectedLead(prev => prev ? { ...prev, notas: editNotas } : null);
  };

  // Helper functions
  const scoreColor = (score: number) => {
    if (score >= 50) return 'text-red-400 bg-red-500/15 border-red-500/30';
    if (score >= 30) return 'text-orange-400 bg-orange-500/15 border-orange-500/30';
    if (score >= 20) return 'text-yellow-400 bg-yellow-500/15 border-yellow-500/30';
    return 'text-gray-400 bg-white/5 border-white/10';
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return t('admin.time.m', { count: mins });
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return t('admin.time.h', { count: hrs });
    const days = Math.floor(hrs / 24);
    if (days < 30) return t('admin.time.d', { count: days });
    return t('admin.time.mo', { count: Math.floor(days / 30) });
  };

  const fuenteLabels: Record<string, { label: string; color: string }> = {
    contacto: { label: t('admin.fuentes.contacto'), color: 'text-sky-400 bg-sky-500/10' },
    riesgo: { label: t('admin.fuentes.riesgo'), color: 'text-orange-400 bg-orange-500/10' },
    consultoria: { label: t('admin.fuentes.consultoria'), color: 'text-indigo-400 bg-indigo-500/10' },
    pestel: { label: t('admin.fuentes.pestel'), color: 'text-emerald-400 bg-emerald-500/10' },
    scraper: { label: t('admin.fuentes.scraper'), color: 'text-violet-400 bg-violet-500/10' },
  };

  const estadoColumns = [
    { key: 'nuevo', label: t('admin.estados.nuevo'), icon: '🟡' },
    { key: 'contactado', label: t('admin.estados.contactado'), icon: '🔵' },
    { key: 'negociacion', label: t('admin.estados.negociacion'), icon: '🟣' },
    { key: 'cerrado_ganado', label: t('admin.estados.cerrado_ganado'), icon: '🟢' },
    { key: 'cerrado_perdido', label: t('admin.estados.cerrado_perdido'), icon: '🔴' },
  ];

  const filtered = leads.filter(l => {
    if (filterFuente !== 'all' && l.fuente !== filterFuente) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (l.nombre?.toLowerCase().includes(term) || l.empresa?.toLowerCase().includes(term) || l.correo?.toLowerCase().includes(term));
    }
    return true;
  });

  if (!auth) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#030305] py-24 px-6 min-h-screen">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm bg-[#0D0F16] border border-white/5 rounded-2xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-transparent" />
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-sky-400" />
            </div>
            <h1 className="text-xl font-bold text-white">{t('admin.login.title')}</h1>
            <p className="text-gray-500 text-xs mt-1">{t('admin.login.subtitle')}</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); if (pass === ADMIN_PASS) setAuth(true); }}>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder={t('admin.login.pwd_ph')} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-sky-500 transition-colors" autoFocus />
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-lg transition-all cursor-pointer">
              {t('admin.login.btn')}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#030305] pt-24 pb-10 px-4 md:px-8 min-h-screen text-white">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{t('admin.header.title')}</h1>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              {t('admin.header.subtitle')}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px]">
                <Database className="w-3 h-3 text-sky-400" />
                {import.meta.env.VITE_SUPABASE_URL?.replace(/https:\/\/(\w{5}).*/, '$1***.supabase.co')}
              </span>
            </p>
          </div>
          <div className="flex gap-4">
              <button 
                onClick={runSequences} 
                disabled={isProcessingSequences}
                className="flex items-center gap-2 px-6 py-2.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-600/30 rounded-xl font-bold transition-all disabled:opacity-50"
              >
                {isProcessingSequences ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {t('admin.btn_nurturing') || 'Procesar Secuencias'}
              </button>
              <button onClick={fetchLeads} className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-900/20">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {t('admin.header.btn_refresh')}
              </button>
            </div>
        </div>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setActiveTab('crm')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'crm' ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'}`}>
            <Database className="w-4 h-4" /> {t('admin.tabs.crm')}
          </button>
          <button onClick={() => setActiveTab('prospectar')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'prospectar' ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'}`}>
            <FileSpreadsheet className="w-4 h-4" /> {t('admin.tabs.prospectar')}
          </button>
          <button onClick={() => setActiveTab('contenido')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'contenido' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'}`}>
            <PenTool className="w-4 h-4" /> {t('admin.tabs.contenido')}
          </button>
          <button onClick={() => setActiveTab('talento')} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeTab === 'talento' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:bg-white/[0.06]'}`}>
            <UserPlus className="w-4 h-4" /> Talento / RRHH
          </button>
        </div>

        {activeTab === 'crm' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: <Users className="w-5 h-5 text-sky-400" />, value: leads.length, label: t('admin.stats.total') },
                { icon: <Calendar className="w-5 h-5 text-emerald-400" />, value: leads.filter(l => Date.now() - new Date(l.created_at).getTime() < 7 * 86400000).length, label: t('admin.stats.week') },
                { icon: <BarChart3 className="w-5 h-5 text-indigo-400" />, value: leads.length ? Math.round(leads.reduce((a, l) => a + (l.score || 0), 0) / leads.length) : 0, label: t('admin.stats.score') },
                { icon: <Zap className="w-5 h-5 text-orange-400" />, value: leads.filter(l => (l.score || 0) >= 40).length, label: t('admin.stats.hot') },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">{s.icon}<span className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</span></div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg flex-1 max-w-sm">
                <Search className="w-4 h-4 text-gray-500" />
                <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={t('admin.filters.search_ph')} className="bg-transparent text-white text-sm w-full focus:outline-none" />
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <Filter className="w-4 h-4 text-gray-500" />
                <select value={filterFuente} onChange={(e) => setFilterFuente(e.target.value)} className="bg-transparent text-white text-sm focus:outline-none appearance-none">
                  <option value="all" className="bg-[#0D0F16]">{t('admin.filters.all_sources')}</option>
                  {Object.entries(fuenteLabels).map(([k, v]) => <option key={k} value={k} className="bg-[#0D0F16]">{v.label}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto">
              {estadoColumns.map((col) => {
                const colLeads = filtered.filter(l => l.estado === col.key);
                return (
                  <div key={col.key} className="min-w-[240px]">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <span className="text-sm">{col.icon}</span>
                      <span className="text-sm font-semibold text-gray-300">{col.label}</span>
                      <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full ml-auto">{colLeads.length}</span>
                    </div>
                    <div className="space-y-3 min-h-[200px]">
                      {colLeads.map((lead) => {
                        const src = fuenteLabels[lead.fuente] || { label: lead.fuente, color: 'text-gray-400 bg-white/5' };
                        return (
                          <div key={lead.id} onClick={() => { setSelectedLead(lead); setEditNotas(lead.notas || ''); }} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 cursor-pointer hover:border-sky-500/20 transition-all group">
                            <div className="flex items-start justify-between mb-2">
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${src.color}`}>{src.label}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreColor(lead.score || 0)}`}>{lead.score || 0}pts</span>
                            </div>
                            <h3 className="text-white font-semibold text-sm truncate">{lead.nombre || 'N/A'}</h3>
                            <p className="text-gray-500 text-xs truncate">{lead.empresa}</p>
                            <div className="flex items-center justify-between mt-3">
                              <span className="text-[10px] text-gray-600">{timeAgo(lead.created_at)}</span>
                              <ChevronRight className="w-3 h-3 text-gray-600 opacity-0 group-hover:opacity-100" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'prospectar' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">{t('admin.prospectar.title')}</h2>
              <p className="text-gray-400 text-sm">{t('admin.prospectar.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Upload className="w-4 h-4" /> {t('admin.prospectar.import_csv')}</h3>
                <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder={t('admin.prospectar.csv_ph')} className="w-full h-40 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white text-xs font-mono focus:outline-none mb-3" />
                <div className="flex justify-between items-center">
                  <button onClick={() => { setScrapedLeads(prev => [...prev, ...parseCSV(csvText)]); setCsvText(''); }} className="px-6 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all cursor-pointer">{t('admin.prospectar.process_csv')}</button>
                  <button onClick={() => setCsvText(generateSampleCSV())} className="text-gray-500 text-xs hover:text-white transition-colors cursor-pointer underline">{t('admin.prospectar.example')}</button>
                </div>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4" /> {t('admin.prospectar.add_manual')}</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.keys(manualLead).filter(k => k !== 'fuente_url' && k !== 'confianza').map(k => (
                    <input key={k} type="text" placeholder={t(`admin.prospectar.ph.${k}`)} value={(manualLead as any)[k]} onChange={(e) => setManualLead({...manualLead, [k]: e.target.value})} className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-orange-500" />
                  ))}
                </div>
                <button onClick={() => { setScrapedLeads(prev => [...prev, manualLead]); setManualLead({nombre:'', empresa:'', correo:'', telefono:'', sector:'', ubicacion:'Caracas', fuente_url:'Manual', confianza:'alta'}); }} className="w-full py-2 bg-white/5 border border-white/10 text-white text-xs font-semibold rounded-lg hover:bg-white/10 transition-all cursor-pointer">{t('admin.prospectar.btn_add')}</button>
              </div>
            </div>

            {scrapedLeads.length > 0 && (
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
                <div className="p-4 border-b border-white/[0.06] flex items-center justify-between bg-white/[0.02]">
                  <h3 className="text-white font-semibold text-sm">{t('admin.prospectar.preview_title', { count: scrapedLeads.length })}</h3>
                  <div className="flex gap-3">
                    <button onClick={() => setScrapedLeads([])} className="px-3 py-1 text-xs text-gray-500 hover:text-red-400 transition-colors cursor-pointer">{t('admin.prospectar.btn_clean')}</button>
                    <button onClick={async () => { setSavingScraped(true); await saveScrapedLeads(scrapedLeads); setScrapedLeads([]); setSavingScraped(false); fetchLeads(); }} disabled={savingScraped} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-2">
                      {savingScraped ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} {savingScraped ? t('admin.prospectar.btn_saving') : t('admin.prospectar.btn_save')}
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-black/20 text-gray-500 uppercase tracking-wider border-b border-white/[0.06]">
                      <tr><th className="p-3">{t('admin.prospectar.table.name')}</th><th className="p-3">{t('admin.prospectar.table.company')}</th><th className="p-3">{t('admin.prospectar.table.email')}</th><th className="p-3">{t('admin.prospectar.table.status')}</th><th className="p-3"></th></tr>
                    </thead>
                    <tbody>
                      {scrapedLeads.map((lead, idx) => (
                        <tr key={idx} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                          <td className="p-3 font-medium">{lead.nombre}</td>
                          <td className="p-3">{lead.empresa}</td>
                          <td className="p-3 text-sky-400">{lead.correo}</td>
                          <td className="p-3"><span className="text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">{t('admin.prospectar.table.valid')}</span></td>
                          <td className="p-3"><button onClick={() => setScrapedLeads(prev => prev.filter((_, i) => i !== idx))} className="text-gray-600 hover:text-red-400 cursor-pointer"><X className="w-4 h-4" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contenido' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{t('admin.contenido.title')}</h2>
                <p className="text-gray-400 text-sm">{t('admin.contenido.subtitle')}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setEditingPost({ title: '', slug: '', category: 'Seguridad', excerpt: '', content: '', published: false, featured: false, read_time: '5 min' }); setShowPostModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all cursor-pointer"><Plus className="w-4 h-4" /> {t('admin.contenido.btn_new')}</button>
                <button onClick={generateWithAI} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all cursor-pointer"><Zap className="w-4 h-4 text-amber-400" /> {t('admin.contenido.btn_ai')}</button>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
               <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
                 <h3 className="text-white font-semibold text-sm">{t('admin.contenido.table_title')}</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider border-b border-white/[0.06]">
                     <tr><th className="p-4">{t('admin.contenido.table.title')}</th><th className="p-4">{t('admin.contenido.table.category')}</th><th className="p-4">{t('admin.contenido.table.date')}</th><th className="p-4">{t('admin.contenido.table.status')}</th><th className="p-4 text-right">{t('admin.contenido.table.actions')}</th></tr>
                   </thead>
                   <tbody>
                     {posts.map(post => (
                       <tr key={post.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                         <td className="p-4">
                           <div className="font-semibold text-white">{post.title}</div>
                           <div className="text-xs text-gray-500 font-mono">/blog/{post.slug}</div>
                         </td>
                         <td className="p-4"><span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full border border-indigo-500/20">{post.category}</span></td>
                         <td className="p-4 text-xs text-gray-500">{new Date(post.created_at).toLocaleDateString()}</td>
                         <td className="p-4">{post.published ? <span className="text-emerald-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {t('admin.contenido.status_published')}</span> : <span className="text-amber-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {t('admin.contenido.status_draft')}</span>}</td>
                         <td className="p-4 text-right">
                           <button onClick={() => { setEditingPost(post); setShowPostModal(true); }} className="p-2 hover:text-white transition-colors cursor-pointer"><PenTool className="w-4 h-4" /></button>
                           <button onClick={async () => { if(confirm('¿Seguro?')) { await supabase.from('blog_posts').delete().eq('id', post.id); fetchPosts(); } }} className="p-2 hover:text-red-400 transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                         </td>
                       </tr>
                     ))}
                     {posts.length === 0 && (
                       <tr><td colSpan={5} className="p-10 text-center text-gray-500">{t('admin.contenido.no_posts')}</td></tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'talento' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-1">Gestión de Talento</h2>
              <p className="text-gray-400 text-sm">Candidatos y postulaciones recibidas a través del nuevo Portal RRHH.</p>
            </div>
            
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-black/20 text-gray-500 text-xs uppercase tracking-wider border-b border-white/[0.06]">
                    <tr><th className="p-4">Candidato</th><th className="p-4">Interés / Exp</th><th className="p-4">Contacto</th><th className="p-4">Fecha</th><th className="p-4">Estado</th><th className="p-4 text-right">Acciones</th></tr>
                  </thead>
                  <tbody>
                    {leads.filter(l => l.fuente === 'Portal RRHH').map(lead => (
                      <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4">
                          <div className="font-semibold text-white">{lead.nombre}</div>
                          <div className="text-xs text-gray-500">ID: {lead.id.slice(0,8)}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-white text-xs">{lead.empresa.replace('CANDIDATO: ', '')}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sky-400 text-xs">{lead.correo}</div>
                          <div className="text-gray-500 text-[10px]">{lead.mensaje}</div>
                        </td>
                        <td className="p-4 text-xs text-gray-500">{new Date(lead.created_at).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            lead.estado === 'nuevo' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {lead.estado}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button 
                              onClick={() => setSelectedLead(lead)} 
                              className="p-2 hover:text-sky-400 transition-colors cursor-pointer"
                              title="Ver detalles"
                            >
                              <Search className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => generateCV(lead)} 
                              className="p-2 hover:text-emerald-400 transition-colors cursor-pointer"
                              title="Exportar CV (PDF)"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteLead(lead.id)} 
                              className="p-2 hover:text-red-400 transition-colors cursor-pointer"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {leads.filter(l => l.fuente === 'Portal RRHH').length === 0 && (
                      <tr><td colSpan={6} className="p-10 text-center text-gray-500">No hay postulaciones nuevas.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedLead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedLead(null)}>
            <motion.div onClick={e => e.stopPropagation()} className="bg-[#0D0F16] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                 <h2 className="text-xl font-bold text-white">{selectedLead.nombre}</h2>
                 <button onClick={() => setSelectedLead(null)} className="text-gray-500 hover:text-white transition-colors cursor-pointer"><X/></button>
               </div>
               <div className="p-8 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                   <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Email</label><div className="text-sky-400">{selectedLead.correo}</div></div>
                   <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Empresa</label><div className="text-white">{selectedLead.empresa}</div></div>
                 </div>
                 <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Mensaje</label><div className="text-gray-300 text-sm bg-black/20 p-4 rounded-lg border border-white/5 italic">\"{selectedLead.mensaje}\"</div></div>
                 <div>
                   <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Notas del Administrador</label>
                   <textarea value={editNotas} onChange={e => setEditNotas(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-sky-500" rows={4} placeholder="Escriba notas de seguimiento..." />
                 </div>
                 <div className="flex justify-between items-center pt-4">
                    <select value={selectedLead.estado} onChange={(e) => updateLeadEstado(selectedLead.id, e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none">
                     {estadoColumns.map(c => <option key={c.key} value={c.key} className="bg-[#0D0F16]">{c.label}</option>)}
                   </select>
                   <button onClick={saveNotas} className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg transition-all cursor-pointer">Guardar Notas</button>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}

        {showPostModal && editingPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div className="bg-[#0D0F16] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden flex flex-col shadow-2xl">
               <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                 <h2 className="text-xl font-bold text-white flex items-center gap-2"><PenTool className="w-5 h-5 text-indigo-400" /> Editor de Artículo</h2>
                 <button onClick={() => setShowPostModal(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer"><X className="w-6 h-6"/></button>
               </div>
               <div className="flex-1 overflow-y-auto p-8 space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                     <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Título</label><input type="text" value={editingPost.title} onChange={e => setEditingPost({...editingPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none" /></div>
                     <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Slug (URL)</label><div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-lg px-4 py-3 text-gray-500 text-xs font-mono">/blog/<span>{editingPost.slug}</span></div></div>
                     <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Extracto (Resumen)</label><textarea value={editingPost.excerpt} onChange={e => setEditingPost({...editingPost, excerpt: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm outline-none focus:border-indigo-500" rows={3} /></div>
                   </div>
                   <div className="space-y-4">
                     <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Imagen Destacada (URL)</label><input type="text" value={editingPost.image || editingPost.image_url || ''} onChange={e => setEditingPost({...editingPost, image: e.target.value, image_url: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 outline-none text-sm mb-4" placeholder="https://images.unsplash.com/..." /></div><div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Categoría</label><select value={editingPost.category} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-indigo-500"><option value="Seguridad" className="bg-[#0D0F16]">Seguridad</option><option value="Estrategia" className="bg-[#0D0F16]">Estrategia</option><option value="Tecnología" className="bg-[#0D0F16]">Tecnología</option><option value="Diplomacia" className="bg-[#0D0F16]">Diplomacia</option></select></div>
                     <div className="flex gap-4">
                       <div className="flex-1"><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Tiempo de Lectura</label><input type="text" value={editingPost.read_time} onChange={e => setEditingPost({...editingPost, read_time: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white outline-none" /></div>
                       <div className="flex-1 flex flex-col justify-end">
                         <button onClick={() => setEditingPost({...editingPost, published: !editingPost.published})} className={`w-full py-3 rounded-lg font-bold transition-all ${editingPost.published ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-gray-800 text-gray-400 border border-white/5'}`}>{editingPost.published ? 'Publicado' : 'Borrador'}</button>
                       </div>
                     </div>
                     <div className="flex items-center gap-3 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl"><Zap className="w-5 h-5 text-indigo-400" /><div className="text-xs text-indigo-300">¿Quieres que la IA genere el contenido por ti?</div><button className="ml-auto px-3 py-1 bg-indigo-600 text-[10px] font-bold rounded">GENERAR</button></div>
                   </div>
                 </div>
                 <div><label className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 block">Contenido (HTML)</label><textarea value={editingPost.content} onChange={e => setEditingPost({...editingPost, content: e.target.value})} className="w-full h-80 bg-white/5 border border-white/10 rounded-lg p-4 text-white font-serif text-lg focus:border-indigo-500 outline-none custom-scrollbar" /></div>
               </div>
               <div className="p-6 border-t border-white/5 flex justify-end gap-4 bg-white/[0.01]">
                 <button onClick={() => setShowPostModal(false)} className="px-6 py-2 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer">Cancelar</button>
                 <button onClick={savePost} disabled={savingPost} className="px-8 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50">
                   {savingPost ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {savingPost ? 'Guardando...' : 'Guardar y Publicar'}
                 </button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
