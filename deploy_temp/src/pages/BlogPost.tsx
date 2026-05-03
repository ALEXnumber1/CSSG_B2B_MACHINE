import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import { getBlogPosts, type BlogEntry } from './Blog';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import DOMPurify from 'dompurify';

import esBlog from '../locales/es/blog.json';
import enBlog from '../locales/en/blog.json';

const LOCALES = {
  es: esBlog.blog,
  en: enBlog.blog
};

export default function BlogPost() {
  const { i18n } = useTranslation();
  const { slug } = useParams();
  const [post, setPost] = useState<BlogEntry | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const currentLang = (i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const t = (key: string, options?: any): any => {
    const cleanKey = key.replace('blog.', '');
    const parts = cleanKey.split('.');
    let val: any = LOCALES[currentLang];
    for (const part of parts) {
      if (val && typeof val === 'object' && part in val) {
        val = val[part];
      } else {
        val = undefined;
        break;
      }
    }

    if (val !== undefined) {
      if (typeof val === 'string' && options?.time) {
        return val.replace('{{time}}', options.time);
      }
      return val;
    }

    return key;
  };

  useEffect(() => {
    const fetchPost = async () => {
      // Intentar buscar en DB primero
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      const blogPosts = getBlogPosts(t);
      const hcPost = blogPosts.find(p => p.slug === slug);

      if (!error && data) {
        setPost({
          ...data,
          date: data.created_at,
          readTime: data.read_time,
          categoryColor: 'text-sky-400 bg-sky-500/10',
          image: hcPost?.image || data.image || data.image_url || 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80'
        });
        setContent(data.content);
      } else if (hcPost) {
        setPost(hcPost);
        setContent(t(`blog.articles.${slug}`));
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug, currentLang]);

  if (loading) return <div className="min-h-screen bg-[#030305]" />;

  if (!post || !content) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#030305] pt-28 pb-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{t('blog.post_not_found')}</h1>
          <Link to="/blog" className="text-sky-400 hover:text-sky-300 transition-colors">{t('blog.back_to_blog_arrow')}</Link>
        </div>
      </div>
    );
  }

  const blogPosts = getBlogPosts(t);
  const currentIndex = blogPosts.findIndex(p => p.slug === post.slug);
  const nextPost = blogPosts[currentIndex + 1] || blogPosts[0];

  return (
    <div className="flex-1 bg-[#030305] relative z-10 pt-28 pb-20">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear_gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <article className="container mx-auto px-6 max-w-3xl relative">
        {/* Back */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sky-400 transition-colors mb-10">
            <ArrowLeft className="w-4 h-4" /> {t('blog.back_to_blog')}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${post.categoryColor}`}>
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-tight">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{t('blog.read_time', { time: post.readTime })}</span>
          </div>
        </motion.div>

        {/* Featured Image */}
        {post.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-violet-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <img 
              src={post.image} 
              alt={post.title}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80';
              }}
              className="relative w-full h-[300px] md:h-[450px] object-cover rounded-2xl border border-white/10 shadow-2xl"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose-cssg"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-white/[0.04] border border-sky-500/20 rounded-2xl p-8 md:p-10 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-3">{t('blog.cta_title')}</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            {t('blog.cta_desc')}
          </p>
          <Link
            to="/analisis-riesgo"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all"
          >
            {t('blog.cta_btn')} <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Next */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-4">{t('blog.next_post')}</p>
          <Link to={`/blog/${nextPost.slug}`} className="group flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-sky-500/20 transition-all">
            <div>
              <h4 className="text-white font-semibold group-hover:text-sky-300 transition-colors">{nextPost.title}</h4>
              <span className="text-xs text-gray-500">{t('blog.read_time', { time: nextPost.readTime })}</span>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-sky-400 transition-colors shrink-0" />
          </Link>
        </div>

        {/* Tags SEO */}
        <div className="mt-8 flex flex-wrap gap-2">
          {Array.isArray(t('blog.post_tags')) && (t('blog.post_tags') as string[]).map((tag: string, i: number) => (
            <span key={i} className="flex items-center gap-1 px-2.5 py-1 text-[10px] text-gray-600 bg-white/[0.02] border border-white/5 rounded-full">
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
