import { saveScrapedLeads } from '../lib/scraper';
import type { ScrapedLead } from '../lib/scraper';

async function runTest() {
  console.log('--- INICIANDO PRUEBA DE SCRAPER ---');
  
  const sampleLeads: ScrapedLead[] = [
    {
      nombre: 'Prueba Scraper Agent',
      empresa: 'Corporación de Prueba S.A.',
      correo: `test_scraper_${Date.now()}@cssg-global.com`,
      telefono: '+58 412 0000000',
      sector: 'Seguridad Industrial',
      ubicacion: 'Caracas, Venezuela',
      fuente_url: 'https://ejemplo-directorio.com/cssg-test',
      confianza: 'alta'
    }
  ];

  console.log('Insertando lead de prueba...');
  const result = await saveScrapedLeads(sampleLeads);

  console.log('--- RESULTADOS ---');
  console.log(`Leads Guardados: ${result.saved}`);
  console.log(`Duplicados: ${result.duplicates}`);
  
  if (result.errors.length > 0) {
    console.log('Errores encontrados:');
    result.errors.forEach(err => console.error(` - ${err}`));
  } else {
    console.log('¡Prueba exitosa! El lead debería estar ahora en Supabase.');
  }
}

runTest().catch(err => {
  console.error('Error fatal en la prueba:', err);
});
