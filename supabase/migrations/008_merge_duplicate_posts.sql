-- 2026-11-25 · SEO: fusión de posts duplicados del blog
-- worker/index.js redirige con 301:
--   /blog/rrhh-el-socio-critico-del-gerente-de-seguridad   -> /blog/rrhh-socio-critico-seguridad
--   /blog/como-elegir-empresa-seguridad-privada-venezuela  -> /blog/mejor-empresa-seguridad-privada-venezuela
-- Pegar en el SQL Editor de Supabase.

-- 1. El post corto de RRHH sale del listado y del sitemap (no se borra: queda como borrador)
UPDATE blog_posts
SET published = false
WHERE slug = 'rrhh-el-socio-critico-del-gerente-de-seguridad';

-- 2. El post que se queda pasa a "usted", como el resto del sitio
UPDATE blog_posts
SET title = 'Cómo elegir la mejor empresa de seguridad privada en Venezuela: 7 criterios que nadie le dice'
WHERE slug = 'mejor-empresa-seguridad-privada-venezuela';
