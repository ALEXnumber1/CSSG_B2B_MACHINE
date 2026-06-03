import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, FileImage, AlertTriangle, Cpu, Shield, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ShieldTraceAuditProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RiskResult {
  indiceHumano: number;
  indiceTecnico: number;
  indiceEntorno: number;
  riesgoGeneral: number;
}

export default function ShieldTraceAudit({ isOpen, onClose }: ShieldTraceAuditProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [], 'application/pdf': [] },
    maxFiles: 1,
  });

  const handleAnalyze = () => {
    if (!uploadedFile && !context.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const mock: RiskResult = {
        indiceHumano: 40,
        indiceTecnico: 30,
        indiceEntorno: 60,
        riesgoGeneral: 43.3,
      };
      console.log('[ShieldTrace AI Mock]', mock);
      setResult(mock);
      setLoading(false);
    }, 1800);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setUploadedFile(null);
      setContext('');
      setResult(null);
    }, 300);
  };

  const getRiskColor = (score: number) => {
    if (score >= 60) return 'text-red-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-emerald-400';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 60) return 'CRÍTICO';
    if (score >= 40) return 'MODERADO';
    return 'CONTROLADO';
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-6xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500/10 border border-sky-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-[0.25em]">ShieldTrace PSIM</p>
                  <h2 className="text-sm font-bold text-white leading-none">Inicialización de Entorno</h2>
                </div>
                <span className="ml-3 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[9px] font-black text-orange-400 uppercase tracking-widest">
                  Auditoría Inicial
                </span>
              </div>
              <button onClick={handleClose} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body — 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

              {/* LEFT — Drag & Drop */}
              <div className="p-6 border-r border-zinc-800 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Topología Estructural</p>
                  <p className="text-xs text-zinc-400">Cargue el croquis o plano de la instalación del cliente</p>
                </div>

                <div
                  {...getRootProps()}
                  className={`flex-1 min-h-[280px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all
                    ${isDragActive
                      ? 'border-sky-500/60 bg-sky-500/5'
                      : uploadedFile
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/50'
                    }`}
                >
                  <input {...getInputProps()} />

                  {uploadedFile ? (
                    <>
                      <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <FileImage className="w-7 h-7 text-emerald-400" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-white">{uploadedFile.name}</p>
                        <p className="text-xs text-zinc-500 mt-1">{(uploadedFile.size / 1024).toFixed(1)} KB — haz clic para cambiar</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center">
                        <Upload className={`w-7 h-7 ${isDragActive ? 'text-sky-400' : 'text-zinc-500'}`} />
                      </div>
                      <div className="text-center px-6">
                        <p className="text-sm font-semibold text-zinc-300">
                          {isDragActive ? 'Suelta el archivo aquí' : 'Arrastra el plano o croquis'}
                        </p>
                        <p className="text-xs text-zinc-600 mt-1">PNG, JPG, PDF — máx. 10 MB</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/15">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <p className="text-[11px] text-amber-400/80">
                    El personal de vigilancia desplegado <strong>no es armado</strong>. Los esquemas son preventivos y tácticos.
                  </p>
                </div>
              </div>

              {/* RIGHT — Context + Result */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1">Contexto Operativo</p>
                  <p className="text-xs text-zinc-400">Describe la situación actual de seguridad de la instalación</p>
                </div>

                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={8}
                  className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-200 text-sm resize-none focus:outline-none focus:border-zinc-600 transition-colors placeholder:text-zinc-600"
                  placeholder="Describe la situación actual de las instalaciones... Ej: Tenemos 3 vigilantes (no armados) en turnos de 12 horas. El sistema CCTV perimetral no recibe mantenimiento desde hace 6 meses..."
                />

                {/* Risk Result */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-4 gap-2 p-4 bg-zinc-950 border border-zinc-800 rounded-xl"
                    >
                      {[
                        { label: 'Humano', value: result.indiceHumano, icon: <Shield className="w-3 h-3" /> },
                        { label: 'Técnico', value: result.indiceTecnico, icon: <Cpu className="w-3 h-3" /> },
                        { label: 'Entorno', value: result.indiceEntorno, icon: <MapPin className="w-3 h-3" /> },
                        { label: 'General', value: result.riesgoGeneral, icon: <AlertTriangle className="w-3 h-3" /> },
                      ].map((item) => (
                        <div key={item.label} className="text-center">
                          <div className={`flex items-center justify-center gap-1 mb-1 ${getRiskColor(item.value)}`}>
                            {item.icon}
                          </div>
                          <p className={`text-xl font-black ${getRiskColor(item.value)}`}>{item.value}</p>
                          <p className="text-[9px] text-zinc-600 uppercase tracking-wider mt-0.5">{item.label}</p>
                        </div>
                      ))}
                      <div className="col-span-4 mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between">
                        <p className="text-[10px] text-zinc-500">Nivel de riesgo calculado</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${getRiskColor(result.riesgoGeneral)} bg-current/10 border border-current/20`}>
                          {getRiskLabel(result.riesgoGeneral)}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || (!uploadedFile && !context.trim())}
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-sky-600 hover:bg-sky-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-sky-900/20"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Procesando análisis...
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      Generar Análisis de Riesgo AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') return createPortal(content, document.body);
  return null;
}
