import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://vqisebdthsowhpfpugrb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaXNlYmR0aHNvd2hwZnB1Z3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjE2MTAsImV4cCI6MjA5MjczNzYxMH0.9TZZ_6mx7vcaYoaeT5PmH02OrOzad6KMHiBwospgxOw";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addTestLead() {
  console.log('Simulando prospección en vivo para el lead: Nicky Rujano');

  const testLead = {
    nombre: 'Nicky Rujano',
    correo: 'nickysebas@gmail.com',
    mensaje: '[TELÉFONO: +3467511433] | Sector: Testing | Ubicación: España | Fuente: Prueba de Scraper en Vivo',
    fuente: 'scraper',
    score: 10,
    estado: 'nuevo',
    empresa: 'Prueba de Scraper'
  };

  // Delete previous lead if exists to ensure a fresh extraction
  await supabase.from('leads').delete().eq('correo', testLead.correo);
  console.log('Limpieza previa completada.');

  const { data, error } = await supabase.from('leads').insert([testLead]).select();

  if (error) {
    console.error('Error insertando lead:', error.message);
  } else {
    console.log('✅ ¡Lead extraído y guardado exitosamente en el CRM (Supabase)!');
    console.log('Detalles del lead guardado:', JSON.stringify(data, null, 2));
  }
}

addTestLead();
