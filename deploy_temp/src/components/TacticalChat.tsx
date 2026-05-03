import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Shield, Zap, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

const TacticalChat: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lead qualification state
  const [step, setStep] = useState(0);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', need: '' });

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage(t('chat.welcome'));
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'bot',
        content,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue;
    setInputValue('');

    // Lead Qualification Logic
    if (step === 0) {
      setLeadData(prev => ({ ...prev, name: currentInput }));
      setStep(1);
      sendBotMessage(t('chat.step1', { name: currentInput }));
    } else if (step === 1) {
      setLeadData(prev => ({ ...prev, email: currentInput }));
      setStep(2);
      sendBotMessage(t('chat.step2'));
    } else if (step === 2) {
      setLeadData(prev => ({ ...prev, phone: currentInput }));
      setStep(3);
      sendBotMessage(t('chat.step3'));
    } else if (step === 3) {
      setLeadData(prev => ({ ...prev, need: currentInput }));
      setStep(4);
      sendBotMessage(t('chat.final'));
      
      // Save lead to Supabase
      try {
        await supabase.from('leads').insert([{
          nombre: leadData.name,
          correo: leadData.email,
          telefono: leadData.phone,
          empresa: 'N/A',
          mensaje: `REQUERIMIENTO IA: ${currentInput}`,
          fuente: 'Chat IA Táctico'
        }]);
      } catch (err) {
        console.error("Error saving lead:", err);
      }
    } else {
      sendBotMessage(t('chat.final'));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:bg-sky-500 transition-all"
          >
            <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 animate-ping" />
            <MessageSquare className="w-7 h-7 text-white" />
            
            {/* Humanized Greeting Bubble */}
            <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none">
              <motion.div 
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="bg-[#0D0F16]/90 backdrop-blur-xl border border-sky-500/30 p-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[200px]"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-500/30 shrink-0 shadow-lg">
                  <img src="/guard_avatar.png" alt="Oficial Rivas" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col pr-2">
                  <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest leading-none mb-1">Oficial Rivas</span>
                  <span className="text-[11px] text-white font-medium leading-tight">Hola, soy el Oficial Rivas. <br/>¿En qué puedo ayudarte hoy?</span>
                </div>
                
                {/* Speech Bubble Tail */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#0D0F16] border-r border-t border-sky-500/30 rotate-45" />
              </motion.div>
            </div>
          </motion.button>
        )}

        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-[350px] sm:w-[400px] h-[500px] bg-[#0D0F16] border border-sky-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-sky-900/20 border-b border-sky-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-sky-500/20 flex items-center justify-center overflow-hidden shrink-0">
                  <img src="/guard_avatar.png" alt="Consultor CSSG" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase tracking-widest">CSSG Global</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[9px] text-emerald-400 font-black uppercase">IA Táctica Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent to-sky-500/5"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border overflow-hidden ${msg.type === 'user' ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-sky-500/10 border-sky-500/20'}`}>
                      {msg.type === 'user' ? <User size={14} className="text-indigo-400" /> : <img src="/guard_avatar.png" alt="Agente" className="w-full h-full object-cover" />}
                    </div>
                    <div className={`flex flex-col gap-1 ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.type === 'bot' && (
                        <span className="text-[9px] text-sky-400/80 font-bold ml-1 uppercase tracking-wider">Consultor CSSG</span>
                      )}
                      <div className={`p-3 rounded-2xl text-[12px] leading-relaxed ${msg.type === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white/5 text-gray-300 border border-white/10 rounded-tl-sm'}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex gap-1">
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-sky-500/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-all shadow-lg"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-4 text-[8px] text-gray-600 font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1"><Zap size={10} /> Respuesta Instantánea</div>
                <div className="flex items-center gap-1"><Shield size={10} /> Canal Encriptado</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(14, 165, 233, 0.2); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default TacticalChat;
