const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vqisebdthsowhpfpugrb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaXNlYmR0aHNvd2hwZnB1Z3JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxNjE2MTAsImV4cCI6MjA5MjczNzYxMH0.9TZZ_6mx7vcaYoaeT5PmH02OrOzad6KMHiBwospgxOw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function saveScrapedLeads(leads) {
  let saved = 0;
  let duplicates = 0;
  const errors = [];

  for (const lead of leads) {
    if (lead.correo) {
      const { data: existing } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', lead.correo)
        .limit(1);

      if (existing && existing.length > 0) {
        duplicates++;
        continue;
      }
    }

    // Insertar con el nuevo mapeo que corregimos
    const { error } = await supabase.from('leads').insert([{
      nombre: lead.nombre,
      empresa: lead.empresa,
      correo: lead.correo,
      mensaje: `[TELÉFONO: ${lead.telefono}] | Sector: ${lead.sector} | Ubicación: ${lead.ubicacion} | Fuente: ${lead.fuente_url}`,
      fuente: 'scraper_test_demo',
      score: 10,
      status: 'nuevo',
    }]);

    if (error) {
      errors.push(`Error: ${error.message}`);
    } else {
      saved++;
    }
  }

  return { saved, duplicates, errors };
}

async function runTest() {
  console.log('--- DEMOSTRACIÓN DE SCRAPER CSSG ---');
  
  const sampleLeads = [
    {
      nombre: 'Gerente de Seguridad Demo',
      empresa: 'Corporación Multinacional X',
      correo: `demo_scraper_${Date.now()}@test.com`,
      telefono: '+58 212 555-5555',
      sector: 'Retail / Seguridad',
      ubicacion: 'Caracas',
      fuente_url: 'Demo Scraper Console'
    }
  ];

  console.log('Simulando extracción e inserción...');
  const result = await saveScrapedLeads(sampleLeads);

  console.log('-----------------------------------');
  console.log(`Estado: ${result.saved > 0 ? 'EXITOSO' : 'FALLIDO'}`);
  console.log(`Leads Procesados: ${sampleLeads.length}`);
  console.log(`Leads Guardados: ${result.saved}`);
  console.log(`Duplicados Omitidos: ${result.duplicates}`);
  
  if (result.errors.length > 0) {
    console.log('Errores:', result.errors);
  } else {
    console.log('¡Conexión CRM verificada! Los datos ya están en Supabase.');
  }
}

runTest();
