-- Permitir DELETE a usuarios autenticados (para panel Admin)
CREATE POLICY "leads_delete_auth"
    ON leads FOR DELETE TO authenticated USING (true);

-- Asegurar que anon puede INSERT en leads (por si no existe)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'leads_insert_anon'
  ) THEN
    EXECUTE 'CREATE POLICY "leads_insert_anon" ON leads FOR INSERT TO anon WITH CHECK (true)';
  END IF;
END $$;

-- Permitir DELETE en risk_assessments a usuarios autenticados
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'risk_assessments') THEN
    EXECUTE 'CREATE POLICY "risk_delete_auth" ON risk_assessments FOR DELETE TO authenticated USING (true)';
    -- Asegurar INSERT anon en risk_assessments
    IF NOT EXISTS (
      SELECT 1 FROM pg_policies WHERE tablename = 'risk_assessments' AND policyname = 'risk_insert_anon'
    ) THEN
      EXECUTE 'CREATE POLICY "risk_insert_anon" ON risk_assessments FOR INSERT TO anon WITH CHECK (true)';
    END IF;
  END IF;
END $$;
