/**
 * API Route: /api/send-email
 * 
 * Proxy seguro para envío de emails via Resend.
 * La RESEND_API_KEY nunca sale al bundle del navegador.
 * 
 * Acepta POST con body JSON:
 *   { type: 'lead' | 'nurture' | 'sequence', ...leadData }
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';
const NOTIFY_EMAIL = 'globalservices.ven@gmail.com';

// Rate limiting básico por IP (en memoria, se resetea al redeploy)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minuto
const RATE_LIMIT_MAX = 5; // máximo 5 emails por minuto por IP

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }
  entry.count++;
  rateLimitMap.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Intenta en un minuto.' });
  }

  if (!RESEND_API_KEY) {
    console.error('[send-email] RESEND_API_KEY no configurada en variables de entorno del servidor.');
    return res.status(503).json({ error: 'Servicio de email no configurado.' });
  }

  const { type, nombre, email, empresa, telefono, fuente, templateKey } = req.body || {};

  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, email.' });
  }

  // Sanitización básica de inputs
  const safe = (str) => String(str || '').replace(/<[^>]*>/g, '').slice(0, 500);
  const safeNombre = safe(nombre);
  const safeEmail = safe(email);
  const safeEmpresa = safe(empresa);
  const safeTelefono = safe(telefono);
  const safeFuente = safe(fuente);

  try {
    if (type === 'lead') {
      // Notificación interna de nuevo lead
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `🔔 NUEVO LEAD: ${safeNombre} (${safeFuente.toUpperCase()})`,
          html: `
            <h2 style="color:#0EA5E9">¡Nuevo Lead Registrado!</h2>
            <p><strong>Nombre:</strong> ${safeNombre}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            ${safeTelefono ? `<p><strong>Teléfono:</strong> ${safeTelefono}</p>` : ''}
            <p><strong>Empresa:</strong> ${safeEmpresa || 'No especificada'}</p>
            <p><strong>Fuente:</strong> ${safeFuente.toUpperCase()}</p>
            <p style="color:#6B7280;font-size:12px;border-top:1px solid #333;padding-top:8px;margin-top:16px;">
              Enviado automáticamente por el Sistema B2B de CSSG.
            </p>
          `,
        }),
      });
      if (!resendRes.ok) {
        const err = await resendRes.text();
        return res.status(502).json({ error: err });
      }
      return res.status(200).json({ success: true });
    }

    if (type === 'nurture' || type === 'sequence') {
      // El HTML y subject vienen pre-construidos desde el frontend (los templates están en email.ts)
      const { subject, html } = req.body || {};
      if (!subject || !html) {
        return res.status(400).json({ error: 'Faltan subject o html para el email de nurture/sequence.' });
      }

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: safeEmail,
          subject: String(subject).slice(0, 255),
          html: String(html),
        }),
      });

      if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error(`[send-email] Error Resend (${type}):`, err);
        return res.status(502).json({ error: err });
      }

      console.info(`[send-email] ✅ ${type} → ${safeEmail}`);
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: `Tipo de email desconocido: ${type}` });


  } catch (err) {
    console.error('[send-email] Error:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
