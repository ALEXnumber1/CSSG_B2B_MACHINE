-- Columna FAQ (JSONB) para generar FAQPage schema en artículos del blog
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS faq JSONB DEFAULT '[]'::jsonb;
