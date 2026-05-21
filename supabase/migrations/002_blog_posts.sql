-- Tabla para gestionar artículos del blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT DEFAULT 'Seguridad',
    read_time TEXT DEFAULT '5 min',
    image TEXT,
    image_url TEXT,
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_blog_posts_updated_at();

-- Índices
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts (published, created_at DESC) WHERE published = TRUE;

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Lectura pública para posts publicados
CREATE POLICY "blog_posts_select_published"
    ON blog_posts FOR SELECT TO anon
    USING (published = TRUE);

-- CRUD completo para usuarios autenticados (Admin)
CREATE POLICY "blog_posts_all_auth"
    ON blog_posts FOR ALL TO authenticated
    USING (true)
    WITH CHECK (true);
