import { motion } from 'framer-motion';
import { Target, Award, Globe, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WhyChooseUs() {
  const { t } = useTranslation();

  const milestones = [
    {
      icon: <Target className="w-8 h-8 text-sky-400" />,
      title: t('why_choose_us.m1_t'),
      desc: t('why_choose_us.m1_d')
    },
    {
      icon: <Award className="w-8 h-8 text-[#EAB308]" />,
      title: t('why_choose_us.m2_t'),
      desc: t('why_choose_us.m2_d')
    },
    {
      icon: <Globe className="w-8 h-8 text-sky-400" />,
      title: t('why_choose_us.m3_t'),
      desc: t('why_choose_us.m3_d')
    },
    {
      icon: <ShieldAlert className="w-8 h-8 text-sky-400" />,
      title: t('why_choose_us.m4_t'),
      desc: t('why_choose_us.m4_d')
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section className="py-24 relative z-10 bg-gradient-to-b from-transparent to-[#08080B]">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t('why_choose_us.title_1')} <span className="text-sky-400">{t('why_choose_us.title_2')}</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-sky-500 mx-auto rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]"
          />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {milestones.map((m, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="glass-card hover:bg-[#1A1A24] transition-colors p-8 rounded-2xl relative overflow-hidden group cursor-default"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -inset-[100%] top-0 left-0 bg-gradient-to-r from-transparent via-sky-900/10 to-transparent group-hover:animate-shimmer" />

              <div className="mb-6 inline-flex p-4 rounded-xl bg-[#0B0B0F] border border-[#333345] shadow-inner items-center justify-center relative z-10">
                {m.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight relative z-10">
                {m.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                {m.desc}
              </p>

              {/* Decorative Index Number */}
              <div className="absolute -bottom-4 right-2 text-7xl font-black text-white/5 z-0 select-none">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
