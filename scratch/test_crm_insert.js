import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vqisebdthsowhpfpugrb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaXNlYmR0aHNvd2hwZnB1Z3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjE2MTAsImV4cCI6MjA5MjczNzYxMH0.9TZZ_6mx7vcaYoaeT5PmH02OrOzad6KMHiBwospgxOw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('Testing Supabase Insert...');
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      nombre: 'Prueba de Sistema',
      correo: 'test@system.com',
      empresa: 'CSSG',
      telefono: '0000000',
      fuente: 'test',
      score: 100,
      estado: 'nuevo'
    }]);

  if (error) {
    console.error('Insert Failed:', error);
  } else {
    console.log('Insert Success:', data);
  }
}

testInsert();
