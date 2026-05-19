import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Cargar .env.local de forma manual
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[key] = value.trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL || 'https://vqisebdthsowhpfpugrb.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRecentLeads() {
  console.log("=== Buscando los 10 leads más recientes ===");
  const { data: leads, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (leadError) {
    console.error("Error al buscar leads:", leadError);
    return;
  }

  leads.forEach(l => {
    console.log(`ID: ${l.id} | Fecha: ${l.created_at} | Nombre: ${l.nombre} | Correo: ${l.correo} | Fuente: ${l.fuente} | Estado: ${l.estado}`);
  });
}

checkRecentLeads();
