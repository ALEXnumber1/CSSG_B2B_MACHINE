import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Inicializamos el cliente principal de Supabase
// Se requiere fallback para evitar que el sitio no cargue si no hay variables de entorno (.env)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
