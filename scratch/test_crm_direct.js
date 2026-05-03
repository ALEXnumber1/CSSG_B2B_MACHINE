import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqisebdthsowhpfpugrb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaXNlYmR0aHNvd2hwZnB1Z3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjE2MTAsImV4cCI6MjA5MjczNzYxMH0.9TZZ_6mx7vcaYoaeT5PmH02OrOzad6KMHiBwospgxOw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Conectando a Supabase...');
  
  const { data, error } = await supabase.from('leads').select('*').limit(5);
  
  if (error) {
    console.error('Error al conectar con la tabla leads:', error.message);
  } else {
    console.log('Conexión exitosa.');
    console.log('Número de registros encontrados:', data.length);
    if (data.length > 0) {
      console.log('Nombres de los leads encontrados:');
      data.forEach(l => console.log(`- ${l.nombre} (${l.status})`));
    } else {
      console.log('La tabla está vacía.');
    }
  }
}

testConnection();
