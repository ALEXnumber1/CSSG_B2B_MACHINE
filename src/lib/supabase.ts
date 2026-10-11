import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[CSSG] Variables de entorno de Supabase no configuradas. Las funciones de CRM estarán deshabilitadas.');
}

export const supabase = createClient(
  supabaseUrl ?? 'https://vqisebdthsowhpfpugrb.supabase.co',
  supabaseAnonKey ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaXNlYmR0aHNvd2hwZnB1Z3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjE2MTAsImV4cCI6MjA5MjczNzYxMH0.9TZZ_6mx7vcaYoaeT5PmH02OrOzad6KMHiBwospgxOw'
);

/**
 * Authorization header for the internal APIs (/api/agent, /api/launch-sequence,
 * /api/process-sequences): the signed-in admin's Supabase access token, checked server-side
 * against ADMIN_EMAILS (api/_auth.js). Empty when nobody is signed in.
 */
export async function adminAuthHeader(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  return session ? { Authorization: `Bearer ${session.access_token}` } : {};
}
