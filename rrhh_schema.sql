-- 4. Tabla de Candidatos (Reclutamiento RRHH)
CREATE TABLE IF NOT EXISTS candidates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    position TEXT,
    experience INTEGER,
    cv_url TEXT,
    status TEXT DEFAULT 'nuevo'
);

ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserciones publicas candidates" ON candidates FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura privativa equipo RRHH" ON candidates FOR SELECT TO authenticated USING (true);
