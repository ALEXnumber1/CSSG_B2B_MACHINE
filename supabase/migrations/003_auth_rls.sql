-- Actualizar RLS para que el Admin autenticado pueda leer/actualizar todas las tablas

-- LEADS: agregar política SELECT y UPDATE para usuarios autenticados
CREATE POLICY "leads_select_auth"
    ON leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "leads_update_auth"
    ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- RISK_ASSESSMENTS: agregar SELECT para autenticados (si la tabla existe)
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'risk_assessments') THEN
    EXECUTE 'CREATE POLICY "risk_select_auth" ON risk_assessments FOR SELECT TO authenticated USING (true)';
    EXECUTE 'CREATE POLICY "risk_update_auth" ON risk_assessments FOR UPDATE TO authenticated USING (true) WITH CHECK (true)';
  END IF;
END $$;

-- COMPLAINTS: SELECT para autenticados
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'complaints') THEN
    EXECUTE 'CREATE POLICY "complaints_select_auth" ON complaints FOR SELECT TO authenticated USING (true)';
  END IF;
END $$;

-- RRHH_APPLICATIONS: SELECT para autenticados
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'rrhh_applications') THEN
    EXECUTE 'CREATE POLICY "rrhh_select_auth" ON rrhh_applications FOR SELECT TO authenticated USING (true)';
  END IF;
END $$;

-- Instrucciones post-migración:
-- 1. En Supabase Dashboard → Authentication → Users → Add user
--    Email: operaciones@cssg-global.com (o el email del admin)
--    Password: establecer contraseña segura
-- 2. La sesión persiste automáticamente via localStorage del cliente Supabase
