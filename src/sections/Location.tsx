import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function Location() {
  const { t } = useTranslation();

  const offices = [
    {
      city: 'Caracas',
      name: 'Headquarters - Torre de Control',
      address: 'Calle la Joya, entre Av. Francisco de Miranda y Libertador, Edificio Cosmos, Piso 8, Oficina 8B, Chacao, Caracas 1060.',
      phone: '+58 414-3174373',
      mobile: '+58 414-3174373',
      email: 'operaciones@cssg-global.com',
      hours: '24/7 Monitoring & Response',
      mapsUrl: 'https://maps.google.com/?q=Edificio+Cosmos+Chacao+Caracas'
    }

  ];

  return (
    <section className="py-24 bg-[#030305] relative overflow-hidden" id="ubicacion">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-900/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sky-400 font-mono text-xs uppercase tracking-[0.3em] font-bold mb-4 block">
                {t('location.badge') || 'Presencia Nacional'}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
                {t('location.title_1') || 'Donde la Estrategia'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">
                  {t('location.title_2') || 'Encuentra el Terreno'}
                </span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                {t('location.desc') || 'Nuestra base de operaciones principal se encuentra en el corazón financiero de Caracas, permitiendo una respuesta táctica inmediata en todo el territorio nacional.'}
              </p>
            </motion.div>

            <div className="space-y-6">
              {offices.map((office, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:border-sky-500/30 transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center shrink-0 border border-sky-500/20 group-hover:bg-sky-500/20 transition-colors">
                      <MapPin className="w-6 h-6 text-sky-400" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">{office.name}</h3>
                        <p className="text-sky-300 text-lg font-bold leading-relaxed">{office.address}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <a href={`tel:${office.phone}`} className="flex items-center gap-3 text-white hover:text-sky-400 transition-colors text-base font-bold">
                          <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-sky-400" />
                          </div>
                          {office.phone}
                        </a>
                        <a href={`mailto:${office.email}`} className="flex items-center gap-3 text-white hover:text-sky-400 transition-colors text-base font-bold">
                          <div className="w-8 h-8 bg-sky-500/20 rounded-lg flex items-center justify-center">
                            <Mail className="w-4 h-4 text-sky-400" />
                          </div>
                          {office.email}
                        </a>
                      </div>

                      <a 
                        href={office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest hover:text-sky-300 transition-colors pt-4"
                      >
                        {t('location.view_maps') || 'Ver en Google Maps'} <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map Visual Component */}
          <div className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden relative group"
            >
              {/* Google Maps Iframe */}
              <div className="absolute inset-0 bg-[#0A0C12]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.18123456789!2d-66.853123456789!3d10.490123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a588b5e67909b%3A0x8849b6b772096781!2sEdificio+Cosmos!5e0!3m2!1ses!2sve!4v1714360000000!5m2!1ses!2sve"
                  className="w-full h-full border-0 grayscale invert opacity-50 contrast-125 group-hover:opacity-80 transition-opacity duration-700"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Tactical Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0C12] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 pointer-events-none border-[20px] border-[#0A0C12]" />
                
                {/* RED TACTICAL MARKER - Calle La Joya */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-20 flex flex-col items-center pointer-events-none">
                  {/* Pulse Effect */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut"
                    }}
                    className="absolute w-12 h-12 bg-red-500 rounded-full"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.4, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <MapPin className="w-10 h-10 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]" fill="currentColor" fillOpacity={0.3} />
                  </motion.div>
                  
                  {/* Callout Label */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-2 px-3 py-1 bg-red-600 rounded border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                  >
                    <span className="text-[9px] text-white font-black uppercase tracking-[0.2em] whitespace-nowrap">Calle La Joya - CSSG HQ</span>
                  </motion.div>
                </div>

                {/* Overlay Card on Map */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md border border-sky-500/30 rounded-2xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-1">{t('location.badge') || 'Centro de Operaciones'}</div>
                      <div className="text-white font-bold text-sm">Caracas, Distrito Capital</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-black animate-pulse uppercase tracking-widest">
                        Online
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-sky-500/5 to-transparent h-20 w-full animate-scan" style={{ top: '-100%' }} />
            </motion.div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -100%; }
          100% { top: 200%; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}} />
    </section>
  );
}
