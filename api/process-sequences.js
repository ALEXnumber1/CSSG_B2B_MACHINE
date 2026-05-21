import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';

// Mirror of SEQUENCES from src/lib/sequences.ts (Node-compatible, no Vite imports)
const SEQUENCES = {
  contacto:  { emails: [{ day: 0, templateKey: 'contacto_1', scoreBonus: 0 }, { day: 2, templateKey: 'contacto_2', scoreBonus: 5 }, { day: 7, templateKey: 'contacto_3', scoreBonus: 10 }] },
  riesgo:    { emails: [{ day: 0, templateKey: 'riesgo_1', scoreBonus: 0 }, { day: 3, templateKey: 'riesgo_2', scoreBonus: 5 }, { day: 7, templateKey: 'riesgo_3', scoreBonus: 10 }, { day: 14, templateKey: 'riesgo_4', scoreBonus: 15 }] },
  consultoria: { emails: [{ day: 0, templateKey: 'consultoria_1', scoreBonus: 0 }, { day: 3, templateKey: 'consultoria_2', scoreBonus: 5 }, { day: 10, templateKey: 'consultoria_3', scoreBonus: 10 }] },
  pestel:    { emails: [{ day: 0, templateKey: 'pestel_1', scoreBonus: 0 }, { day: 3, templateKey: 'pestel_2', scoreBonus: 5 }, { day: 7, templateKey: 'pestel_3', scoreBonus: 10 }] },
  escudo_diplomatico: { emails: [{ day: 0, templateKey: 'escudo_diplomatico_1', scoreBonus: 0 }] },
};

const SUBJECTS = {
  contacto_2: 'CSSG: ¿Sabía que el 60% de las empresas en Venezuela sufrieron una brecha de seguridad?',
  contacto_3: 'Su consulta gratuita de 15 minutos con un especialista CSSG',
  riesgo_2: '3 acciones inmediatas para reducir su índice de riesgo',
  riesgo_3: 'Caso de éxito: Embajada G7 protegida con metodología CSSG',
  riesgo_4: 'Oferta especial: Auditoría Táctica con 20% de descuento',
  consultoria_2: 'Nuestra tasa de éxito del 80% en retención de seguridad corporativa',
  consultoria_3: 'Recordatorio: Su consulta personalizada con CSSG',
  pestel_2: '5 errores críticos de seguridad que cometen las empresas en Caracas',
  pestel_3: 'Análisis personalizado disponible para su organización',
  escudo_diplomatico_1: 'Protección Diplomática G7 — Confirmación de Solicitud',
};

async function sendEmail(to, nombre, templateKey, empresa) {
  if (!RESEND_API_KEY) {
    console.warn('[process-sequences] VITE_RESEND_API_KEY no configurada');
    return { success: false };
  }

  const subject = SUBJECTS[templateKey] || `CSSG — Seguimiento para ${empresa || nombre}`;
  const html = `<p>Estimado/a <strong>${nombre}</strong>,</p><p>Continuamos el seguimiento de su interés en los servicios de CSSG.</p><p>Un especialista estará en contacto próximamente.</p><p style="color:#64748B;font-size:12px;">Company Of Security And Service Global C.A. · RIF J-29782024-8</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
    return { success: res.ok };
  } catch {
    return { success: false };
  }
}

export default async function handler(req, res) {
  // Vercel Cron envía GET; también aceptar POST manual
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Proteger el endpoint con un token secreto
  const authHeader = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  let sent = 0;
  let errors = 0;

  try {
    const now = new Date().toISOString();
    const { data: pendingSeqs, error } = await supabase
      .from('email_sequences')
      .select('*, leads!inner(correo, nombre, empresa)')
      .eq('completed', false)
      .lte('next_send_at', now);

    if (error) {
      console.error('[process-sequences] Supabase error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    for (const seq of pendingSeqs || []) {
      const sequence = SEQUENCES[seq.secuencia];
      if (!sequence) continue;

      const nextNum = seq.email_num + 1;
      const emailDef = sequence.emails[nextNum];
      if (!emailDef) continue;

      const lead = seq.leads;
      if (!lead?.correo) continue;

      const result = await sendEmail(lead.correo, lead.nombre || 'Estimado/a', emailDef.templateKey, lead.empresa);

      if (result.success) {
        sent++;
        const isLast = nextNum >= sequence.emails.length - 1;
        const nextEmailDef = sequence.emails[nextNum + 1];
        const nextSendAt = nextEmailDef
          ? new Date(Date.now() + (nextEmailDef.day - emailDef.day) * 24 * 60 * 60 * 1000).toISOString()
          : null;

        await supabase.from('email_sequences').update({
          email_num: nextNum,
          next_send_at: nextSendAt,
          completed: isLast,
        }).eq('id', seq.id);

        if (emailDef.scoreBonus > 0) {
          await supabase.rpc('increment_lead_score', { lead_id: seq.lead_id, bonus: emailDef.scoreBonus });
        }

        await supabase.from('leads').update({
          emails_enviados: (lead.emails_enviados || 0) + 1,
          ultimo_contacto: new Date().toISOString(),
        }).eq('id', seq.lead_id);
      } else {
        errors++;
      }
    }
  } catch (err) {
    console.error('[process-sequences] Unexpected error:', err);
    return res.status(500).json({ error: err.message });
  }

  console.log(`[process-sequences] Done — sent: ${sent}, errors: ${errors}`);
  return res.status(200).json({ success: true, sent, errors });
}
