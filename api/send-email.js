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

  const { type, nombre, email, empresa, telefono, fuente, templateKey, cargo, vulnerabilidad, horario, mensaje, pagina } = req.body || {};

  // Validación por tipo
  if (type === 'chat') {
    if (!mensaje) {
      return res.status(400).json({ error: 'Falta el campo requerido: mensaje.' });
    }
  } else if (!nombre || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos: nombre, email.' });
  }

  // Sanitización básica de inputs
  const safe = (str) => String(str || '').replace(/<[^>]*>/g, '').slice(0, 500);
  const safeNombre = safe(nombre);
  const safeEmail = safe(email);
  const safeEmpresa = safe(empresa);
  const safeTelefono = safe(telefono);
  const safeFuente = safe(fuente);
  const safeCargo = safe(cargo);
  const safeVulnerabilidad = safe(vulnerabilidad);
  const safeHorario = safe(horario);
  const safeMensaje = String(mensaje || '').replace(/<[^>]*>/g, '').slice(0, 1500);
  const safePagina = safe(pagina);

  try {
    // ══════ ALERTA DE CHAT (Oficial Rivas) ══════
    if (type === 'chat') {
      const now = new Date().toLocaleString('es-VE', { timeZone: 'America/Caracas', dateStyle: 'medium', timeStyle: 'short' });
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `💬 CHAT INICIADO — Oficial Rivas: "${safeMensaje.slice(0, 60)}${safeMensaje.length > 60 ? '…' : ''}"`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#111;border:1px solid #0EA5E940;border-radius:16px;padding:28px;margin-bottom:16px;">
      <p style="color:#0EA5E9;font-size:11px;font-weight:700;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.15em;">
        💬 Visitante escribiendo en el chat del sitio
      </p>
      <div style="background:#0a0a0a;border-left:3px solid #0EA5E9;border-radius:8px;padding:16px;margin-bottom:20px;">
        <p style="color:#fff;font-size:15px;line-height:1.6;margin:0;">"${safeMensaje}"</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px 0;width:36%;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Hora (Caracas)</p></td>
          <td style="padding:6px 0;"><p style="color:#fff;font-size:13px;margin:0;">${now}</p></td>
        </tr>
        ${safePagina ? `
        <tr>
          <td style="padding:6px 0;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Página</p></td>
          <td style="padding:6px 0;"><p style="color:#0EA5E9;font-size:13px;margin:0;">${safePagina}</p></td>
        </tr>` : ''}
      </table>
      <p style="color:#777;font-size:12px;margin:20px 0 0;line-height:1.5;">
        El Oficial Rivas continuará la calificación del lead. Si completa sus datos, recibirás un segundo correo con la ficha completa.
      </p>
    </div>
    <p style="color:#333;font-size:11px;text-align:center;margin:0;">Sistema B2B · CSSG · cssg-global.com</p>
  </div>
</body>
</html>`,
        }),
      });
      if (!resendRes.ok) {
        const err = await resendRes.text();
        console.error('[send-email] Error Resend (chat):', err);
        return res.status(502).json({ error: err });
      }
      return res.status(200).json({ success: true });
    }

    if (type === 'lead') {
      const isEscudo = safeFuente === 'escudo_diplomatico';
      const isUrgente = safeHorario.toLowerCase().includes('urgente');
      const accentColor = isEscudo ? '#D4AF37' : '#0EA5E9';
      const subjectEmoji = isUrgente ? '🚨' : isEscudo ? '🔒' : '🔔';
      const subjectLabel = isUrgente
        ? `URGENTE — CITA ESCUDO DIPLOMÁTICO: ${safeNombre}`
        : `NUEVO LEAD: ${safeNombre} (${safeFuente.toUpperCase()})`;

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: NOTIFY_EMAIL,
          subject: `${subjectEmoji} ${subjectLabel}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">

    ${isUrgente ? `
    <div style="background:#ef444420;border:1px solid #ef4444;border-radius:10px;padding:12px 16px;margin-bottom:20px;text-align:center;">
      <p style="color:#ef4444;font-size:13px;font-weight:700;margin:0;letter-spacing:0.1em;text-transform:uppercase;">
        ⚠ SOLICITUD URGENTE — CONTACTAR DENTRO DE 2 HORAS
      </p>
    </div>` : ''}

    <div style="background:#111;border:1px solid ${accentColor}40;border-radius:16px;padding:28px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #222;">
        <div style="width:48px;height:48px;border-radius:50%;background:${accentColor}20;border:2px solid ${accentColor}50;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">
          ${isEscudo ? '🛡' : '👤'}
        </div>
        <div>
          <p style="color:#fff;font-size:18px;font-weight:700;margin:0;">${safeNombre}</p>
          <p style="color:${accentColor};font-size:11px;font-weight:700;margin:4px 0 0;text-transform:uppercase;letter-spacing:0.15em;">${safeFuente.replace(/_/g,' ')}</p>
        </div>
      </div>

      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;width:36%;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Email</p>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <a href="mailto:${safeEmail}" style="color:#0EA5E9;font-size:13px;text-decoration:none;">${safeEmail}</a>
          </td>
        </tr>
        ${safeTelefono ? `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Teléfono</p>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <a href="tel:${safeTelefono}" style="color:#fff;font-size:13px;text-decoration:none;">${safeTelefono}</a>
          </td>
        </tr>` : ''}
        ${safeEmpresa ? `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Empresa</p>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#fff;font-size:13px;margin:0;">${safeEmpresa}</p>
          </td>
        </tr>` : ''}
        ${safeCargo ? `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Cargo</p>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#fff;font-size:13px;margin:0;">${safeCargo}</p>
          </td>
        </tr>` : ''}
        ${safeHorario ? `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Horario cita</p>
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;">
            <p style="color:${accentColor};font-size:13px;font-weight:700;margin:0;">${safeHorario}</p>
          </td>
        </tr>` : ''}
        ${safeVulnerabilidad ? `
        <tr>
          <td style="padding:8px 0;">
            <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Vulnerabilidad</p>
          </td>
          <td style="padding:8px 0;">
            <p style="color:#ef4444;font-size:13px;font-weight:600;margin:0;">${safeVulnerabilidad}</p>
          </td>
        </tr>` : ''}
      </table>

      ${safeMensaje ? `
      <div style="margin-top:20px;">
        <p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 8px;">Requerimiento</p>
        <div style="background:#0a0a0a;border-left:3px solid ${accentColor};border-radius:8px;padding:14px 16px;">
          <p style="color:#ddd;font-size:13px;line-height:1.6;margin:0;">${safeMensaje}</p>
        </div>
      </div>` : ''}
    </div>

    <div style="display:flex;gap:10px;margin-bottom:24px;">
      <a href="mailto:${safeEmail}?subject=Briefing Escudo Diplomático — CSSG"
        style="flex:1;text-align:center;background:${accentColor};color:#000;padding:12px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">
        Responder por Email
      </a>
      ${safeTelefono ? `
      <a href="https://wa.me/${safeTelefono.replace(/[^0-9]/g,'')}?text=Hola+${encodeURIComponent(safeNombre)}%2C+le+contacto+de+CSSG+por+su+solicitud+Escudo+Diplom%C3%A1tico."
        style="flex:1;text-align:center;background:#25D366;color:#fff;padding:12px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">
        WhatsApp
      </a>` : ''}
    </div>

    <p style="color:#333;font-size:11px;text-align:center;margin:0;">
      Sistema B2B · CSSG · cssg-global.com
    </p>
  </div>
</body>
</html>`,
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
