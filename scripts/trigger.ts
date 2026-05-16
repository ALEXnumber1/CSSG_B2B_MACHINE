import { startSequence } from '../src/lib/sequences';
import { supabase } from '../src/lib/supabase';

async function main() {
  const leadId = 'lead-' + Date.now();
  const email = 'nickysebas@gmail.com';
  const name = 'Nicky Rujano';
  const empresa = 'Prueba';
  const fuente = 'riesgo';

  console.log(`Iniciando secuencia para ${name} (${email})...`);

  try {
    // Primero, crear el lead en CRM para que exista la referencia
    await supabase.from('leads').insert([{
      id: leadId,
      nombre: name,
      correo: email,
      empresa: empresa,
      telefono: 'N/A',
      mensaje: 'Prueba de secuencia nocturna',
      fuente: fuente,
      score: 10,
      estado: 'nuevo'
    }]);
    
    console.log('Lead creado en Supabase.');

    await startSequence(leadId, email, name, fuente, empresa);
    console.log('Secuencia iniciada correctamente. Revisa la base de datos y Resend.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
