-- Columnas de clasificación de Buyer Persona para la tabla leads
-- Requiere ejecución en Supabase Dashboard → SQL Editor

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS bp INTEGER,
  ADD COLUMN IF NOT EXISTS bp_nombre TEXT,
  ADD COLUMN IF NOT EXISTS temperatura TEXT CHECK (temperatura IN ('frio', 'tibio', 'caliente')),
  ADD COLUMN IF NOT EXISTS nota_estrategica TEXT,
  ADD COLUMN IF NOT EXISTS intent_window BOOLEAN DEFAULT FALSE;

-- Índice para consultas rápidas por BP en el tab Outbound
CREATE INDEX IF NOT EXISTS idx_leads_bp ON leads (bp) WHERE bp IS NOT NULL;

-- Política RLS: el equipo autenticado puede actualizar bp/temperatura (classify-lead.js usa service role)
CREATE POLICY IF NOT EXISTS "Equipo puede actualizar leads" ON leads
  FOR UPDATE TO authenticated USING (true);
