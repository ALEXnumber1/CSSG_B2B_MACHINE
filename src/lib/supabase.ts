import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '[CSSG] Variables de entorno de Supabase no configuradas.\n' +
    'Asegúrate de tener VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env.local\n' +
    'y en las variables de entorno de Vercel.'
  );
}

// Cliente de Supabase — las credenciales se leen solo desde variables de entorno
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
