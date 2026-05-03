import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface BlogEntry {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  featured?: boolean;
  image?: string;
}

export const getBlogPosts = (t: any): BlogEntry[] => [
  {
    slug: 'como-elegir-empresa-seguridad-privada-venezuela',
    title: t('blog.posts.como-elegir-empresa-seguridad-privada-venezuela.title'),
    excerpt: t('blog.posts.como-elegir-empresa-seguridad-privada-venezuela.excerpt'),
    date: '2026-04-12',
    readTime: '8 min',
    category: t('blog.categories.Guía Práctica'),
    categoryColor: 'text-sky-400 bg-sky-500/10',
    featured: true,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: '5-errores-seguridad-corporativa',
    title: t('blog.posts.5-errores-seguridad-corporativa.title'),
    excerpt: t('blog.posts.5-errores-seguridad-corporativa.excerpt'),
    date: '2026-04-05',
    readTime: '6 min',
    category: t('blog.categories.Análisis'),
    categoryColor: 'text-orange-400 bg-orange-500/10',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'iso-9001-seguridad-privada-importancia',
    title: t('blog.posts.iso-9001-seguridad-privada-importancia.title'),
    excerpt: t('blog.posts.iso-9001-seguridad-privada-importancia.excerpt'),
    date: '2026-03-28',
    readTime: '5 min',
    category: t('blog.categories.Certificaciones'),
    categoryColor: 'text-[#EAB308] bg-[#EAB308]/10',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'seguridad-corporativa-caracas-guia-completa',
    title: t('blog.posts.seguridad-corporativa-caracas-guia-completa.title'),
    excerpt: t('blog.posts.seguridad-corporativa-caracas-guia-completa.excerpt'),
    date: '2026-03-20',
    readTime: '10 min',
    category: t('blog.categories.Guía Completa'),
    categoryColor: 'text-sky-400 bg-sky-500/10',
    image: 'https://images.unsplash.com/photo-1541888941255-658c69e490d1?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'analisis-pestel-seguridad-venezuela',
    title: t('blog.posts.analisis-pestel-seguridad-venezuela.title'),
    excerpt: t('blog.posts.analisis-pestel-seguridad-venezuela.excerpt'),
    date: '2026-03-15',
    readTime: '7 min',
    category: t('blog.categories.Metodología'),
    categoryColor: 'text-indigo-400 bg-indigo-500/10',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'rrhh-socio-critico-seguridad',
    title: t('blog.posts.rrhh-socio-critico-seguridad.title'),
    excerpt: t('blog.posts.rrhh-socio-critico-seguridad.excerpt'),
    date: '2026-04-26',
    readTime: '6 min',
    category: t('blog.categories.Análisis'),
    categoryColor: 'text-rose-400 bg-rose-500/10',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2923216?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function Blog() {
  const { t } = useTranslation();
  const [dbPosts, setDbPosts] = useState<BlogEntry[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          const formatted = data.map(p => ({
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt,
            date: p.created_at,
            readTime: p.read_time || '5 min',
            category: p.category || 'Seguridad',
            categoryColor: 'text-sky-400 bg-sky-500/10',
            featured: p.featured
          }));
          setDbPosts(formatted);
        }
      } catch (e) { console.error(e); }
    };
    fetchPosts();
  }, []);

  const hardcodedPosts = getBlogPosts(t);
  const dbSlugs = new Set(hardcodedPosts.map(p => p.slug));
  const filteredDbPosts = dbPosts.filter(p => !dbSlugs.has(p.slug));
  const allPosts = [...filteredDbPosts, ...hardcodedPosts];
  const featured = allPosts.find(p => p.featured) || allPosts[0];
  const rest = allPosts.filter(p => p.slug !== featured?.slug);

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20 min-h-screen">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-sky-500/20 bg-sky-500/5 mb-8">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[10px] font-bold text-sky-300 uppercase tracking-[0.2em]">{t('blog.header_badge')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            {t('blog.header_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">{t('blog.header_title_2')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">{t('blog.header_desc')}</p>
        </motion.div>

        {featured ? (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
              <Link to={`/blog/${featured.slug}`} className="block group">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden relative hover:border-sky-500/20 transition-all flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img 
                      src={featured.image} 
                      alt={featured.title} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${featured.categoryColor}`}>{featured.category}</span>
                      <span className="text-[10px] font-bold text-[#EAB308] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EAB308]/10">{t('blog.featured_badge')}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors leading-tight">{featured.title}</h2>
                    <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(featured.date).toLocaleDateString()}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {rest.map((post, idx) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + idx * 0.1 }}>
                  <Link to={`/blog/${post.slug}`} className="block group h-full">
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden h-full flex flex-col hover:border-sky-500/20 transition-all">
                      {post.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80';
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${post.categoryColor}`}>{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">{post.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-4 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                          <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.date).toLocaleDateString()}</div>
                        </div>
                        <div className="text-sky-400 group-hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" /></div>
                      </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl">
            <Tag className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">Próximamente más contenido</h3>
            <p className="text-gray-500 text-sm">Nuestro equipo de inteligencia está redactando nuevos análisis.</p>
          </div>
        )}
      </div>
    </div>
  );
}
