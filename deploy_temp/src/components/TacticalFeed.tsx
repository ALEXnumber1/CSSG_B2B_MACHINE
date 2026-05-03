import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Activity, Timer, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Alert {
  id: string;
  timestamp: string;
  level: 'CRITICAL' | 'WARNING' | 'INFO';
  category: string;
  content: string;
  content_en: string;
  source: string;
  rotation: number; // For realistic handwriting
}

const LOCALES = {
  es: {
    title: "Diario de Campo (OSINT)",
    status: "Vínculo Táctico Activo"
  },
  en: {
    title: "Field Diary (OSINT)",
    status: "Tactical Link Active"
  }
};

const TacticalFeed: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language && i18n.language.startsWith('en') ? 'en' : 'es';
  const content = LOCALES[lang];
  
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const alertPool = [
    { level: 'CRITICAL', category: 'suceso', content: 'URGENTE: Asciende a 9 la cifra de fallecidos por accidente en carretera Mérida-Barinas. Identificadas las víctimas.', content_en: 'URGENT: Death toll rises to 9 in Merida-Barinas highway accident. Victims identified.', source: 'EL-NACIONAL' },
    { level: 'WARNING', category: 'cyber', content: 'ALERTA: CICPC detecta incremento de estafas electrónicas ejecutadas con IA en territorio nacional.', content_en: 'ALERT: CICPC detects increase in AI-driven electronic scams nationwide.', source: 'CICPC-Vzla' },
    { level: 'WARNING', category: 'security', content: 'EXTORSIÓN: Douglas Rico (CICPC) alerta sobre nueva ola de secuestros virtuales vía redes sociales.', content_en: 'EXTORTION: Douglas Rico (CICPC) warns of new wave of virtual kidnappings via social media.', source: 'POLICIAL-V' },
    { level: 'INFO', category: 'logistics', content: 'SITREP Mérida: Lluvias continuas afectan vialidad en el páramo. Rutas logísticas operando con precaución.', content_en: 'SITREP Merida: Continuous rains affect road conditions in the paramo. Logistics routes operating with caution.', source: 'PROTECCIÓN-C' },
    { level: 'CRITICAL', category: 'incident', content: 'Reporte de explosión por bombona de gas en La Dolorita deja víctimas fatales. Equipos de rescate en el sitio.', content_en: 'Gas cylinder explosion report in La Dolorita leaves fatal victims. Rescue teams on site.', source: 'V-911' }
  ];

  useEffect(() => {
    const initialAlerts = alertPool.slice(0, 3).map((a, i) => ({
      ...a,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(Date.now() - i * 1800000).toLocaleTimeString([], { hour12: false }),
      rotation: Math.random() * 2 - 1
    })) as Alert[];
    setAlerts(initialAlerts);

    const timerInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          triggerNewAlert();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [i18n.language]);

  const triggerNewAlert = () => {
    setIsScanning(true);
    setTimeout(() => {
      const randomAlert = alertPool[Math.floor(Math.random() * alertPool.length)];
      const newAlert: Alert = {
        ...randomAlert,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        rotation: Math.random() * 2 - 1
      } as Alert;
      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="bg-[#030305] border border-sky-500/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.15)] flex flex-col h-[500px] relative group">
      
      {/* Header: Cyber Display */}
      <div className="p-5 border-b border-white/5 bg-black/80 backdrop-blur-xl flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <BookOpen className="w-4 h-4 text-sky-400" />
          <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">{content.title}</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full">
            <Timer className="w-3 h-3 text-sky-400" />
            <span className="text-[9px] font-mono font-bold text-sky-400">
              00:{countdown.toString().padStart(2, '0')}
            </span>
          </div>
          <Activity className={`w-3.5 h-3.5 ${isScanning ? 'text-sky-400' : 'text-gray-700'}`} />
        </div>
      </div>

      {/* Field Diary Content: Notebook Paper Simulation */}
      <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar notebook-bg">
        {/* Notebook Lines via CSS */}
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ 
                backgroundImage: `linear-gradient(#4a90e2 1px, transparent 1px), linear-gradient(90deg, transparent 59px, #ff4d4d 1px, #ff4d4d 2px, transparent 61px)`,
                backgroundSize: '100% 24px, 100% 100%',
                backgroundColor: '#fdfbf7'
             }} 
        />

        <AnimatePresence initial={false}>
          {alerts.map((alert: Alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10, rotate: alert.rotation - 2 }}
              animate={{ opacity: 1, x: 0, rotate: alert.rotation }}
              className="mb-8 relative pl-12"
            >
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-[9px] font-black font-mono tracking-tighter ${alert.level === 'CRITICAL' ? 'text-red-600' : 'text-blue-800'} opacity-60`}>
                  [{alert.timestamp}] - {alert.category.toUpperCase()}
                </span>
              </div>
              <p className="text-xl md:text-2xl text-[#1a2a4a] leading-tight font-handwriting tracking-tight"
                 style={{ fontFamily: "'Caveat', cursive" }}>
                {i18n.language.startsWith('en') ? alert.content_en : alert.content}
              </p>
              
              {/* Subtle ink blotch effect on critical */}
              {alert.level === 'CRITICAL' && (
                <div className="absolute -left-2 top-2 w-8 h-8 bg-red-500/5 blur-xl rounded-full" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer: Tech Status */}
      <div className="p-4 bg-black/80 border-t border-white/5 flex items-center justify-between z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
            <span className="text-[8px] text-emerald-500/80 font-bold uppercase tracking-widest">{content.status}</span>
          </div>
          <span className="text-[8px] text-gray-600 font-mono">ENCRYPTED ANALOG SYNC</span>
        </div>
        <Radio className="w-3.5 h-3.5 text-sky-500/30" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .notebook-bg {
          background-color: #fdfbf7;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #fdfbf7; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(74, 144, 226, 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default TacticalFeed;
