/**
 * launch-sequence.js — Lanzador manual de secuencias outbound
 *
 * Invocado desde el tab "Outbound" del panel Admin.
 * Envía el email día-0 al lead y registra la secuencia en Supabase
 * para que el cron /api/process-sequences continúe con los siguientes emails.
 *
 * Body:
 *   { lead_ids: ["uuid", ...] }                 — lanzar leads específicos
 *   { bp: 1|2|3|4, launch_all: true }           — lanzar todo un grupo BP
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';

// Días hasta el siguiente email por BP (day-0 → day-N del siguiente email)
const BP_NEXT_DAY = { 1: 2, 2: 2, 3: 4, 4: 3 };

// ═══════════════════════════════════════════════════════════════
// TEMPLATE BASE
// ═══════════════════════════════════════════════════════════════

function baseTemplate(content) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://globalservices-ven.com/logo.png" alt="CSSG" style="width:120px;height:auto;" />
      <p style="color:#64748B;font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-top:4px;">RIF: J-29782024-8</p>
    </div>
    <div style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;padding:32px;margin-bottom:24px;">
      ${content}
    </div>
    <div style="text-align:center;padding-top:24px;border-top:1px solid #E2E8F0;">
      <p style="color:#475569;font-size:12px;margin:0;font-weight:600;">Company Of Security and Service Global</p>
      <p style="color:#64748B;font-size:11px;margin:4px 0 0;">Caracas, Venezuela · ISO 9001 · +17 años de experiencia</p>
      <p style="color:#64748B;font-size:10px;margin:16px 0 0;">
        <a href="https://globalservices-ven.com" style="color:#0284C7;text-decoration:none;font-weight:600;">globalservices-ven.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════════
// EMAILS DÍA-0 POR BUYER PERSONA
// ═══════════════════════════════════════════════════════════════

const BP_DAY0 = {
  1: {
    subject: 'Un gerente de seguridad sin informe ejecutivo puede perder su contrato',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En Venezuela, el principal motivo de no renovación de contratos de gerentes de seguridad no es un incidente operativo. Es la <strong>incapacidad de demostrar su gestión</strong> ante quienes toman la decisión.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Cuando llega la auditoría o la reunión de renovación, la pregunta no es "¿hubo algún problema?" sino "¿puede mostrarme los KPIs del último trimestre?" — y la mayoría no tiene respuesta documentada.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        El 2026 trajo nuevas exigencias de cumplimiento DSS y OSAC para organizaciones con presencia diplomática en Venezuela. Los gerentes sin documentación lista en los próximos 90 días enfrentan una conversación muy difícil.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },
  2: {
    subject: '¿Alguien puede explicarle ese cargo extra de la última factura de seguridad?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        El 70% de las empresas y edificios paga un promedio de 30% más de lo que debería en servicios de vigilancia. Y la mayoría no lo sabe — porque nadie se lo explica claramente.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Las facturas llegan con cargos de "supervisión adicional" o "mantenimiento de equipos" sin que nadie haya aprobado esos servicios previamente. Una empresa seria le entrega una factura de 3 renglones, precio fijo mensual sin sorpresas.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },
  3: {
    subject: "When your Venezuelan vendor fails the DSS audit — and you weren't warned",
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The most common compliance gap we see in LATAM security operations is not an operational failure — it's a <strong>documentation gap that surfaces during the DSS or OSAC review cycle.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Local vendors in Venezuela can operate competently on the ground. But when HQ requests the post-incident report in English, the OSAC self-assessment, or the ISO 31000-aligned risk register, the gap becomes visible — and it's the Security Manager who answers for it.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },
  4: {
    subject: 'El ejecutivo venezolano que llegó a Maiquetía sin que nadie lo esperara',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En 2024, un ejecutivo venezolano radicado en Miami llegó a Maiquetía a las 10 PM en un taxi sin verificar. Entre el aeropuerto y el hotel, fue víctima de un secuestro exprés que le costó $4,200 y tres horas de su vida.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No era la primera vez que viajaba a Venezuela. Conocía los riesgos. Pero esa noche "lo manejó como siempre" — improvisando. Cada año decenas de ejecutivos venezolanos de la diáspora pasan por Venezuela sin saber que existe una opción coordinada desde Miami.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com · Miami, FL</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },
};

// ═══════════════════════════════════════════════════════════════
// SEND EMAIL
// ═══════════════════════════════════════════════════════════════

async function sendDay0Email(to, nombre, bp) {
  if (!RESEND_API_KEY) {
    console.warn('[launch-sequence] RESEND_API_KEY no configurada — email no enviado');
    return { success: false };
  }
  const template = BP_DAY0[bp];
  if (!template) return { success: false };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject: template.subject,
        html: template.html(nombre || 'Estimado/a'),
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error(`[launch-sequence] Resend error BP${bp}:`, errText);
    }
    return { success: res.ok };
  } catch (err) {
    console.error('[launch-sequence] Network error:', err);
    return { success: false };
  }
}

// ═══════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const CRON_SECRET = process.env.CRON_SECRET || process.env.VITE_CRON_SECRET;
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (CRON_SECRET && token !== CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { lead_ids, bp: bpGroup, launch_all } = req.body || {};

  // Determinar lista de leads a procesar
  let targetLeads = [];

  if (lead_ids?.length) {
    const { data } = await supabase
      .from('leads')
      .select('id, nombre, correo, empresa, bp, secuencia_activa')
      .in('id', lead_ids)
      .not('correo', 'is', null);
    targetLeads = (data || []).filter(l => !l.secuencia_activa);
  } else if (bpGroup && launch_all) {
    const { data } = await supabase
      .from('leads')
      .select('id, nombre, correo, empresa, bp, secuencia_activa')
      .eq('bp', bpGroup)
      .not('correo', 'is', null);
    targetLeads = (data || []).filter(l => !l.secuencia_activa);
  }

  if (!targetLeads.length) {
    return res.status(200).json({ launched: 0, errors: [] });
  }

  let launched = 0;
  const errors = [];

  for (const lead of targetLeads) {
    const bp = lead.bp;
    if (!bp || !BP_DAY0[bp]) {
      errors.push(`${lead.nombre || lead.id}: BP${bp || '?'} no reconocido`);
      continue;
    }

    // Enviar email día-0
    const emailResult = await sendDay0Email(lead.correo, lead.nombre, bp);

    // Registrar secuencia en Supabase (el cron procesa emails 1, 2, 3…)
    const nextDayOffset = BP_NEXT_DAY[bp] || 2;
    const nextSendAt = new Date(Date.now() + nextDayOffset * 24 * 60 * 60 * 1000).toISOString();

    const { error: seqError } = await supabase.from('email_sequences').insert([{
      lead_id: lead.id,
      secuencia: `bp${bp}`,
      email_num: 0,
      next_send_at: nextSendAt,
      completed: false,
    }]);

    if (seqError) {
      errors.push(`${lead.nombre || lead.id}: error creando secuencia (${seqError.message})`);
      continue;
    }

    // Marcar lead como activo
    await supabase.from('leads').update({
      secuencia_activa: true,
      emails_enviados: 1,
      ultimo_contacto: new Date().toISOString(),
    }).eq('id', lead.id);

    if (emailResult.success) {
      launched++;
      console.log(`[launch-sequence] ✅ BP${bp} → ${lead.correo}`);
    } else {
      // Secuencia creada aunque el primer email falló — el cron retomará desde email_num=1
      launched++;
      errors.push(`${lead.nombre || lead.id}: secuencia creada pero email día-0 no enviado (revisar RESEND_API_KEY)`);
      console.warn(`[launch-sequence] ⚠️ BP${bp} secuencia OK, email falló → ${lead.correo}`);
    }
  }

  return res.status(200).json({ launched, errors });
}
