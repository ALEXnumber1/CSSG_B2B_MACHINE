import { forwardRef } from 'react';
import { Activity, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export interface ReportData {
  leadName: string;
  jobTitle?: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  sector: string;
  exposure: string;
  targetOrganization?: string;
  score: number;
  pillars: {
    title: string;
    checked: number;
    total: number;
  }[];
  vulnerabilities: {
    id: string;
    label: string;
    pillarTitle: string;
    weight: number;
    detail: string;
  }[];
}

interface ReportTemplateProps {
  data: ReportData | null;
}

const ReportTemplate = forwardRef<HTMLDivElement, ReportTemplateProps>(({ data }, ref) => {
  if (!data) return null;

  return (
    <div
      ref={ref}
      className="bg-white text-gray-900 p-12"
      style={{
        width: '800px', // A4 approximate width for html2canvas
        minHeight: '1120px',
        position: 'absolute',
        top: '-10000px',
        left: '-10000px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <div className="border-b-4 border-slate-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <img src="/logo.png" alt="CSSG Logo" className="h-16 mb-4 object-contain" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Informe Estratégico de Vulnerabilidad</h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">REALIZADO POR CSSG GESTIÓN DE RIESGOS</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400">FECHA</p>
          <p className="text-base font-semibold">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Context info */}
      <div className="grid grid-cols-2 gap-6 mb-10 bg-slate-50 p-6 rounded-lg border border-slate-100">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Para</p>
          <p className="text-lg font-bold text-slate-800">{data.leadName}</p>
          {data.jobTitle && <p className="text-xs font-bold text-sky-700 uppercase tracking-widest mt-0.5 mb-1">{data.jobTitle}</p>}
          <p className="text-sm font-medium text-slate-600">{data.company}</p>
          <p className="text-xs text-slate-500 mt-1">{data.email} | {data.phone}</p>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Contexto Operativo</p>
          <div className="mt-1 space-y-1 text-sm font-medium text-slate-700">
            {data.targetOrganization && (
              <p><span className="text-slate-500 mr-2">🏢 Entidad Evaluada:</span> {data.targetOrganization}</p>
            )}
            <p><span className="text-slate-500 mr-2">📍 Ubicación:</span> {data.location || 'No especificada'}</p>
            <p><span className="text-slate-500 mr-2">💼 Sector:</span> {data.sector || 'No especificado'}</p>
            <p><span className="text-slate-500 mr-2">⚠️ Exposición:</span> {data.exposure || 'No especificada'}</p>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="mb-10 text-center py-12 bg-slate-900 rounded-xl text-white">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Índice de Protección Global</h2>
        <div className="text-8xl font-black tabular-nums leading-none tracking-tight pb-4">
          {data.score}%
        </div>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 text-slate-300 text-sm font-semibold border border-slate-700">
          <Activity className="w-4 h-4 text-sky-400" />
          Análisis Cuantitativo FMEA
        </div>
      </div>

      {/* Pillars Summary */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-slate-400" />
          Cobertura por Pilar
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {data.pillars.map((p) => {
            const pct = p.total > 0 ? Math.round((p.checked / p.total) * 100) : 0;
            return (
              <div key={p.title} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-sm text-slate-700">{p.title}</span>
                  <span className="text-xs font-bold text-slate-500">{p.checked}/{p.total}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`} 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Vulnerabilities */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Brechas Críticas Detectadas
        </h3>
        {data.vulnerabilities.length > 0 ? (
          <div className="space-y-4">
            {data.vulnerabilities.map((v) => (
              <div key={v.id} className="p-4 border-l-4 border-red-500 bg-red-50/50 rounded-r-lg">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">{v.label}</h4>
                  <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded">Peso: {v.weight}/10</span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-2">{v.pillarTitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{v.detail}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-emerald-50 rounded-lg text-emerald-800 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <p className="font-medium text-sm">No se detectaron brechas críticas (peso ≥ 7). Su nivel de cumplimiento es óptimo.</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="mt-16 pt-6 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto mb-2">
          Este informe ha sido procesado por <strong>Inteligencia Artificial Avanzada</strong>, utilizando variables apoyadas en métodos de altos estándares internacionales. Sin embargo, se recomienda revisar sus resultados con un consultor especializado de CSSG.
        </p>
        <p className="text-[10px] text-slate-400">
          Documento confidencial exclusivo de la organización evaluada.
        </p>
      </div>
    </div>
  );
});

ReportTemplate.displayName = 'ReportTemplate';

export default ReportTemplate;
