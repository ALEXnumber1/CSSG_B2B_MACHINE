import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, X, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const reset = () => {
    setRating(0);
    setHovered(0);
    setMessage('');
    setStatus('idle');
  };

  const close = () => {
    setOpen(false);
    setTimeout(reset, 300);
  };

  const submit = async () => {
    if (!rating) return;
    setStatus('submitting');
    const { error } = await supabase.from('leads').insert([{
      nombre: 'Feedback anónimo',
      mensaje: `⭐ ${rating}/5 — ${message || '(sin comentario)'}`,
      fuente: 'feedback',
      score: rating * 20,
      estado: 'nuevo',
    }]);
    setStatus(error ? 'error' : 'success');
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Enviar feedback"
        className="fixed bottom-24 right-5 z-[90] lg:bottom-8 lg:right-6 w-12 h-12 rounded-full bg-[#111218] border border-white/10 shadow-lg flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-500/40 transition-all"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Formulario de feedback"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative bg-[#111218] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            >
              <button
                onClick={close}
                aria-label="Cerrar"
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {status === 'success' ? (
                <div className="text-center py-4" role="status">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">¡Gracias por tu opinión!</h3>
                  <p className="text-gray-400 text-sm mb-6">Tu feedback nos ayuda a mejorar la plataforma.</p>
                  <button onClick={close} className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-sm font-bold transition-all">
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white mb-1">¿Cómo fue tu experiencia?</h3>
                  <p className="text-gray-400 text-sm mb-6">Tu opinión nos ayuda a mejorar CSSG.</p>

                  <div className="flex gap-2 mb-6" role="group" aria-label="Calificación con estrellas">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
                        aria-pressed={rating === n}
                        onClick={() => setRating(n)}
                        onMouseEnter={() => setHovered(n)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className="w-8 h-8"
                          fill={(hovered || rating) >= n ? '#EAB308' : 'transparent'}
                          stroke={(hovered || rating) >= n ? '#EAB308' : '#4B5563'}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Cuéntanos tu experiencia (opcional)..."
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-sky-500/50 transition-all resize-none text-sm mb-4"
                  />

                  {status === 'error' && (
                    <p role="alert" className="text-red-400 text-xs mb-3">
                      Hubo un error al enviar. Intenta de nuevo.
                    </p>
                  )}

                  <button
                    onClick={submit}
                    disabled={!rating || status === 'submitting'}
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
                  >
                    {status === 'submitting' ? 'Enviando...' : 'Enviar feedback'}
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
