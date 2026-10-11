/**
 * Autorización de los endpoints internos (agente IA, secuencias de email).
 *
 * Acepta dos credenciales en `Authorization: Bearer <token>`:
 *   - CRON_SECRET: llamadas máquina a máquina (cron del Worker, webhooks).
 *   - El access token de Supabase Auth del panel Admin, si el email está en ADMIN_EMAILS
 *     (lista separada por comas). Sin ADMIN_EMAILS no se acepta ninguna sesión: el registro
 *     público de Supabase está abierto, así que "tener cuenta" no basta.
 *
 * Reemplaza a VITE_CRON_SECRET, que viajaba dentro del bundle público.
 */

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

export async function isAuthorized(req) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return false;

  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && token === cronSecret) return true;

  const admins = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!admins.length || !SUPABASE_URL || !SUPABASE_ANON_KEY) return false;

  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const user = await res.json();
    return Boolean(user?.email_confirmed_at) && admins.includes(String(user.email).toLowerCase());
  } catch (err) {
    console.error('[auth] Supabase user check failed:', err);
    return false;
  }
}
