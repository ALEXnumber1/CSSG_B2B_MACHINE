-- 1. Tabla de Leads (CRM Principal)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nombre TEXT,
    correo TEXT,
    empresa TEXT,
    mensaje TEXT,
    fuente TEXT, 
    score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'nuevo'
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserciones publicas leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura solo equipo autenticado leads" ON leads FOR SELECT TO authenticated USING (true);

-- 2. Tabla de Denuncias (Canal de Integridad)
CREATE TABLE IF NOT EXISTS complaints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    identity TEXT DEFAULT 'Anónimo',
    subject TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT DEFAULT 'pendiente'
);

ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserciones publicas complaints" ON complaints FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura privativa equipo seguridad" ON complaints FOR SELECT TO authenticated USING (true);

-- 3. Tabla de Evaluaciones de Riesgo (Risk Analysis)
CREATE TABLE IF NOT EXISTS risk_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    lead_name TEXT,
    job_title TEXT,
    company TEXT,
    email TEXT,
    phone TEXT,
    target_organization TEXT,
    location TEXT,
    sector TEXT,
    exposure TEXT,
    score INTEGER,
    pillars JSONB,
    vulnerabilities JSONB
);

ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir inserciones publicas risk" ON risk_assessments FOR INSERT WITH CHECK (true);
CREATE POLICY "Lectura equipo tecnico risk" ON risk_assessments FOR SELECT TO authenticated USING (true);
