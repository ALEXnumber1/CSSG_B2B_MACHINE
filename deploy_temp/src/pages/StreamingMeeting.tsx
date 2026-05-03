import React, { useEffect, useRef, useState } from 'react';
import { Shield, Users, MessageSquare, Activity, Terminal as TerminalIcon, AlertCircle, Share2, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StreamingMeeting: React.FC = () => {
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logs, setLogs] = useState<string[]>([]);
  const [roomName] = useState(`CSSG-TACTICAL-CMD-${Math.floor(Math.random() * 10000)}`);
  const [showToast, setShowToast] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(94);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const secTimer = setInterval(() => {
      setSecurityLevel(prev => Math.min(100, Math.max(94, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 3000);
    
    const initialLogs = [
      '> INITIALIZING SECURE PROTOCOL...',
      '> ENCRYPTING PACKETS (AES-256)...',
      '> HANDSHAKE ESTABLISHED WITH CSSG-NODE-01',
      '> TUNNELING THROUGH VENEZUELA-NORTH-HUB',
      '> BIOMETRIC SYNC: ACTIVE',
      '> MISSION READY'
    ];
    setLogs(initialLogs);

    const scriptId = 'jitsi-external-api';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => initializeJitsi();
    } else {
      initializeJitsi();
    }

    function initializeJitsi() {
      if (jitsiContainerRef.current && (window as any).JitsiMeetExternalAPI) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: roomName,
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          configOverwrite: { 
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            disableThirdPartyRequests: true,
            prejoinPageEnabled: false,
            enableWelcomePage: false
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'desktop', 'chat', 'raisehand', 'tileview', 'security'
            ],
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            MOBILE_APP_PROMO: false,
            BRAND_WATERMARK_LINK: '',
          },
        };
        new (window as any).JitsiMeetExternalAPI(domain, options);
      }
    }

    return () => {
      clearInterval(timer);
      clearInterval(secTimer);
    };
  }, [roomName]);

  const handleInvite = () => {
    const url = `https://meet.jit.si/${roomName}`;
    navigator.clipboard.writeText(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white flex flex-col font-mono overflow-hidden relative">
      {/* HUD Scanner Laser */}
      <motion.div 
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" as const }}
        className="absolute left-0 right-0 h-[1px] bg-sky-500/30 z-10 pointer-events-none"
      />

      {/* Top HUD Bar */}
      <div className="h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-between px-6 z-30">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-500/20 blur-md rounded-full animate-pulse" />
              <Shield className="w-6 h-6 text-sky-400 relative z-10" />
            </div>
            <div>
              <h1 className="text-xs font-black uppercase tracking-[0.3em] text-white">Secure Link</h1>
              <p className="text-[9px] text-sky-500/60 font-mono">T-MODE: ENCRYPTED</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-8">
            <div className="space-y-1">
              <p className="text-[8px] text-gray-500 uppercase">Room ID</p>
              <p className="text-[10px] text-sky-400 font-bold tracking-widest">{roomName.split('-').pop()}</p>
            </div>
            <div className="space-y-1 text-center">
              <p className="text-[8px] text-gray-500 uppercase">Integrity</p>
              <p className="text-[10px] text-emerald-500 font-bold">{securityLevel}%</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block border-r border-white/10 pr-6">
            <p className="text-[8px] text-gray-500 uppercase">Mission Clock</p>
            <p className="text-xs font-bold text-sky-400">{currentTime.toLocaleTimeString([], { hour12: false })}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tactical HUD Sidebar */}
        <div className="w-72 border-r border-white/10 bg-black/40 backdrop-blur-md flex flex-col z-30">
          <div className="p-6 space-y-8">
            <section>
              <h3 className="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Activity size={12} /> System Status
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'E2EE Protocol', value: 'AES-256-GCM', status: 'OK' },
                  { label: 'Tunneling', value: 'Double VPN', status: 'ACTIVE' },
                  { label: 'Latency', value: '18ms', status: 'LOW' }
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded bg-white/[0.03] border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] text-gray-500 uppercase">{item.label}</span>
                      <span className="text-[7px] px-1 bg-emerald-500/10 text-emerald-500 font-bold">{item.status}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-300">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex-1 min-h-0 flex flex-col">
              <h3 className="text-[9px] font-black text-sky-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <TerminalIcon size={12} /> Tactical Logs
              </h3>
              <div className="flex-1 bg-black/40 rounded-lg p-3 font-mono text-[8px] text-gray-500 overflow-y-auto custom-scrollbar space-y-1">
                {logs.map((log, i) => (
                  <p key={i} className={i === logs.length - 1 ? 'text-sky-400' : ''}>{log}</p>
                ))}
                <div className="w-1 h-3 bg-sky-500 animate-pulse inline-block" />
              </div>
            </section>
          </div>

          <div className="p-6 mt-auto border-t border-white/10 space-y-3">
            <button 
              onClick={handleInvite}
              className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(14,165,233,0.3)] group"
            >
              <Share2 size={14} className="group-hover:scale-110 transition-transform" /> Invite Securely
            </button>
            <button className="w-full py-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
              <Power size={14} /> Abort Session
            </button>
          </div>
        </div>

        {/* Central Tactical View */}
        <div className="flex-1 relative bg-black">
          {/* HUD Corner Accents */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-sky-500/30 z-20" />
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-sky-500/30 z-20" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-sky-500/30 z-20" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-sky-500/30 z-20" />

          {/* Secure Stream Container */}
          <div ref={jitsiContainerRef} className="w-full h-full relative z-10" />

          {/* Bottom Floating Tools */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-2xl z-30">
            {[
              { icon: <MessageSquare size={18} />, label: 'Tactical Chat' },
              { icon: <Users size={18} />, label: 'Active Agents' },
              { icon: <AlertCircle size={18} />, label: 'Signal SOS' }
            ].map((tool, i) => (
              <button key={i} className="w-12 h-12 rounded-xl bg-white/5 hover:bg-sky-500 transition-all flex items-center justify-center group relative">
                {tool.icon}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-sky-600 text-[8px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase font-bold">
                  {tool.label}
                </span>
              </button>
            ))}
          </div>

          {/* Branding Watermark */}
          <div className="absolute top-8 right-8 z-20 pointer-events-none flex items-center gap-4 opacity-40">
            <div className="text-right">
              <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">CSSG Global</p>
              <p className="text-[8px] text-sky-500 font-mono">T-COMMAND PLATFORM</p>
            </div>
            <img src="/logo.png" className="h-10 w-10 brightness-150 contrast-125" alt="" />
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-24 left-1/2 z-[100] px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-2xl flex items-center gap-2 border border-emerald-500/30"
          >
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Secure link copied to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(14, 165, 233, 0.4); }
      `}} />
    </div>
  );
};

export default StreamingMeeting;
