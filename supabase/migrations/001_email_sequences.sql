-- Tabla para gestionar las secuencias de email automatizadas por lead
CREATE TABLE IF NOT EXISTS email_sequences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    secuencia TEXT NOT NULL,
    email_num INTEGER DEFAULT 0,
    next_send_at TIMESTAMPTZ,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para el procesador de secuencias (cron)
CREATE INDEX IF NOT EXISTS idx_email_sequences_pending
    ON email_sequences (completed, next_send_at)
    WHERE completed = FALSE;

CREATE INDEX IF NOT EXISTS idx_email_sequences_lead
    ON email_sequences (lead_id);

-- RLS
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "email_sequences_insert_anon"
    ON email_sequences FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "email_sequences_select_auth"
    ON email_sequences FOR SELECT TO authenticated USING (true);

CREATE POLICY "email_sequences_update_auth"
    ON email_sequences FOR UPDATE TO authenticated USING (true);

-- RPC para incrementar el score de un lead de forma segura
CREATE OR REPLACE FUNCTION increment_lead_score(lead_id UUID, bonus INTEGER)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
    UPDATE leads
    SET score = COALESCE(score, 0) + bonus
    WHERE id = lead_id;
$$;
