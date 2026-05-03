import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: No se encontraron las variables de entorno en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Conectando a Supabase:', supabaseUrl);
  
  const { data, error } = await supabase.from('leads').select('*').limit(5);
  
  if (error) {
    console.error('Error al conectar con la tabla leads:', error.message);
  } else {
    console.log('Conexión exitosa. Se encontraron', data.length, 'leads.');
    console.log('Primeros 5 leads:', JSON.stringify(data, null, 2));
  }
}

testConnection();
