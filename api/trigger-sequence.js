import { createClient } from '@supabase/supabase-js';

// Inicialización de Supabase con Service Role para saltar RLS si es necesario
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;

export default async function handler(req, res) {
  // Solo permitir POST (Webhooks de Supabase)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Token de seguridad básico para evitar llamadas externas no autorizadas
  // Se debe configurar en Supabase HTTP Header: Authorization: Bearer <WEBHOOK_SECRET>
  const authHeader = req.headers.authorization;
  if (process.env.WEBHOOK_SECRET && authHeader !== `Bearer ${process.env.WEBHOOK_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { type, table, record } = req.body;

  // Validar que el evento sea una inserción en la tabla de leads
  if (type !== 'INSERT' || table !== 'leads') {
    return res.status(200).json({ message: 'Event ignored' });
  }

  const lead = record;
  const { id, correo, nombre, fuente, empresa } = lead;

  if (!correo || !fuente) {
    return res.status(400).json({ error: 'Missing lead data' });
  }

  console.log(`[Webhook] Procesando nuevo lead: ${correo} (Fuente: ${fuente})`);

  try {
    // 1. Definir la secuencia según la fuente
    const SEQUENCES = {
      contacto: { days: [0, 2, 7], templates: ['contacto_1', 'contacto_2', 'contacto_3'] },
      riesgo: { days: [0, 3, 7, 14], templates: ['riesgo_1', 'riesgo_2', 'riesgo_3', 'riesgo_4'] },
      consultoria: { days: [0, 3, 10], templates: ['consultoria_1', 'consultoria_2', 'consultoria_3'] },
      pestel: { days: [0, 3, 7], templates: ['pestel_1', 'pestel_2', 'pestel_3'] }
    };

    const sequence = SEQUENCES[fuente];
    if (!sequence) {
      return res.status(200).json({ message: `No sequence defined for source: ${fuente}` });
    }

    // 2. Enviar el Email #0 (Inmediato)
    const firstTemplate = sequence.templates[0];
    const emailPayload = {
      from: 'CSSG <onboarding@resend.dev>', // Cambiar por dominio verificado en Resend
      to: correo,
      subject: `[CSSG] Hola ${nombre}`, // El subject real se maneja en el template logic si se prefiere
      html: `<p>Hola ${nombre}, estamos procesando tu solicitud...</p>` // Aquí idealmente importarías el template de email.ts
    };

    // Nota: Como estamos en un entorno serverless aislado, llamamos a la API de Resend directamente
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CSSG <onboarding@resend.dev>',
        to: correo,
        subject: `Confirmación de solicitud - ${nombre}`,
        html: `<h2>Hola ${nombre}</h2><p>Gracias por contactar a CSSG. Hemos recibido tu solicitud desde <strong>${fuente}</strong> y un consultor la revisará en breve.</p>`
      }),
    });

    // 3. Registrar la secuencia en la tabla email_sequences para el seguimiento cron
    const nextSendDate = new Date();
    nextSendDate.setDate(nextSendDate.getDate() + sequence.days[1]);

    const { error: seqError } = await supabase.from('email_sequences').insert([{
      lead_id: id,
      secuencia: fuente,
      email_num: 0,
      next_send_at: nextSendDate.toISOString(),
      completed: sequence.days.length <= 1
    }]);

    if (seqError) throw seqError;

    // 4. Actualizar el lead para marcar secuencia activa
    await supabase.from('leads').update({ 
      secuencia_activa: true,
      emails_enviados: 1,
      ultimo_contacto: new Date().toISOString()
    }).eq('id', id);

    return res.status(200).json({ success: true, message: 'Sequence started and first email sent' });

  } catch (error) {
    console.error('[Webhook Error]', error);
    return res.status(500).json({ error: error.message });
  }
}
