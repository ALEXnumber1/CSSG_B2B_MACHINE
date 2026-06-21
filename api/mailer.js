/**
 * API Route: /api/mailer
 *
 * Proxy seguro para envío de emails via Resend.
 * Reemplaza /api/send-email (mismo endpoint renombrado para evitar
 * bloqueos de WAF de Cloudflare sobre rutas con "send-email").
 *
 * type: 'lead'     → notifica al admin + envía bienvenida al lead
 * type: 'nurture'  → envía email de nurturing al lead
 * type: 'sequence' → envía email de secuencia al lead
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';
const NOTIFY_EMAIL = 'globalservices.ven@gmail.com';

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + RATE_LIMIT_WINDOW_MS; }
  entry.count++;
  rateLimitMap.set(ip, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

async function callResend(payload, apiKey) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(payload),
  });
}

function fuente_label(fuente) {
  const map = {
    contacto: 'Formulario de Contacto',
    consultoria_hub: 'Hub de Consultoría',
    consultoria_servicio: 'Servicio de Consultoría',
    riesgo: 'Análisis de Riesgo',
    pestel: 'Informe PESTEL',
    escudo_diplomatico: 'Escudo Diplomático',
    portfolio_download: 'Descarga de Portafolio',
    tecnologia_v5: 'Tecnología de Seguridad',
    tecnologia_v5_en: 'Security Technology',
    licitaciones: 'Licitaciones',
    partners: 'Alianzas Estratégicas',
    'Agendamiento Auditoria': 'Agendamiento de Auditoría',
    'Chat IA Táctico': 'Chat Táctico IA',
  };
  return map[fuente] || fuente.replace(/_/g, ' ');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests. Intenta en un minuto.' });

  if (!RESEND_API_KEY) {
    console.error('[mailer] RESEND_API_KEY no configurada.');
    return res.status(503).json({ error: 'Servicio de email no configurado.' });
  }

  const { type, nombre, email, empresa, telefono, fuente, subject, html, cargo, vulnerabilidad, horario } = req.body || {};

  if (!nombre || !email) return res.status(400).json({ error: 'Faltan campos requeridos: nombre, email.' });

  const safe = (str) => String(str || '').replace(/<[^>]*>/g, '').slice(0, 500);
  const safeNombre = safe(nombre);
  const safeEmail = safe(email);
  const safeEmpresa = safe(empresa);
  const safeTelefono = safe(telefono);
  const safeFuente = safe(fuente);
  const safeCargo = safe(cargo);
  const safeVulnerabilidad = safe(vulnerabilidad);
  const safeHorario = safe(horario);

  try {
    /* ─────────────── LEAD: admin notification + welcome to lead ─────────────── */
    if (type === 'lead') {
      const isEscudo = safeFuente === 'escudo_diplomatico';
      const isUrgente = safeHorario.toLowerCase().includes('urgente');
      const accentColor = isEscudo ? '#D4AF37' : '#0EA5E9';
      const subjectEmoji = isUrgente ? '🚨' : isEscudo ? '🔒' : '🔔';
      const subjectLabel = isUrgente
        ? `URGENTE — CITA ESCUDO DIPLOMÁTICO: ${safeNombre}`
        : `NUEVO LEAD: ${safeNombre} (${safeFuente.toUpperCase()})`;

      /* 1. Notificación al admin */
      const adminRes = await callResend({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        subject: `${subjectEmoji} ${subjectLabel}`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    ${isUrgente ? `<div style="background:#ef444420;border:1px solid #ef4444;border-radius:10px;padding:12px 16px;margin-bottom:20px;text-align:center;">
      <p style="color:#ef4444;font-size:13px;font-weight:700;margin:0;letter-spacing:0.1em;text-transform:uppercase;">⚠ SOLICITUD URGENTE — CONTACTAR DENTRO DE 2 HORAS</p>
    </div>` : ''}
    <div style="background:#111;border:1px solid ${accentColor}40;border-radius:16px;padding:28px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid #222;">
        <div style="width:48px;height:48px;border-radius:50%;background:${accentColor}20;border:2px solid ${accentColor}50;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${isEscudo ? '🛡' : '👤'}</div>
        <div>
          <p style="color:#fff;font-size:18px;font-weight:700;margin:0;">${safeNombre}</p>
          <p style="color:${accentColor};font-size:11px;font-weight:700;margin:4px 0 0;text-transform:uppercase;letter-spacing:0.15em;">${fuente_label(safeFuente)}</p>
        </div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;width:36%;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Email</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><a href="mailto:${safeEmail}" style="color:#0EA5E9;font-size:13px;text-decoration:none;">${safeEmail}</a></td></tr>
        ${safeTelefono ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Teléfono</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><a href="tel:${safeTelefono}" style="color:#fff;font-size:13px;text-decoration:none;">${safeTelefono}</a></td></tr>` : ''}
        ${safeEmpresa ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Empresa</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#fff;font-size:13px;margin:0;">${safeEmpresa}</p></td></tr>` : ''}
        ${safeCargo ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Cargo</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#fff;font-size:13px;margin:0;">${safeCargo}</p></td></tr>` : ''}
        ${safeHorario ? `<tr><td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Horario cita</p></td>
            <td style="padding:8px 0;border-bottom:1px solid #1a1a1a;"><p style="color:${accentColor};font-size:13px;font-weight:700;margin:0;">${safeHorario}</p></td></tr>` : ''}
        ${safeVulnerabilidad ? `<tr><td style="padding:8px 0;"><p style="color:#555;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0;">Vulnerabilidad</p></td>
            <td style="padding:8px 0;"><p style="color:#ef4444;font-size:13px;font-weight:600;margin:0;">${safeVulnerabilidad}</p></td></tr>` : ''}
      </table>
    </div>
    <div style="display:flex;gap:10px;margin-bottom:24px;">
      <a href="mailto:${safeEmail}?subject=Re: Su solicitud — CSSG" style="flex:1;text-align:center;background:${accentColor};color:#000;padding:12px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">Responder por Email</a>
      ${safeTelefono ? `<a href="https://wa.me/${safeTelefono.replace(/[^0-9]/g,'')}?text=Hola+${encodeURIComponent(safeNombre)}%2C+le+contacto+de+CSSG." style="flex:1;text-align:center;background:#25D366;color:#fff;padding:12px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">WhatsApp</a>` : ''}
    </div>
    <p style="color:#333;font-size:11px;text-align:center;margin:0;">Sistema B2B · CSSG · cssg-global.com</p>
  </div>
</body>
</html>`,
      }, RESEND_API_KEY);

      if (!adminRes.ok) {
        const err = await adminRes.text();
        console.error('[mailer] Error admin notification:', err);
        return res.status(502).json({ error: err });
      }

      /* 2. Bienvenida inmediata al lead */
      const fuenteLabel = fuente_label(safeFuente);
      callResend({
        from: FROM_EMAIL,
        to: safeEmail,
        subject: `Recibimos su solicitud, ${safeNombre.split(' ')[0]} — CSSG`,
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#060810;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:0 auto;padding:40px 20px;">

    <!-- Logo / Header -->
    <div style="text-align:center;margin-bottom:36px;">
      <div style="display:inline-block;background:#0EA5E910;border:1px solid #0EA5E930;border-radius:16px;padding:16px 28px;">
        <p style="color:#0EA5E9;font-size:11px;font-weight:800;letter-spacing:0.25em;text-transform:uppercase;margin:0;">COMPANY OF SECURITY AND SERVICE GLOBAL</p>
        <p style="color:#ffffff60;font-size:9px;margin:4px 0 0;letter-spacing:0.1em;">RIF J-29782024-8 · ISO 9001:2015</p>
      </div>
    </div>

    <!-- Main card -->
    <div style="background:#0d1117;border:1px solid #0EA5E920;border-radius:20px;padding:36px;margin-bottom:20px;">

      <!-- Check icon -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="display:inline-flex;width:64px;height:64px;border-radius:50%;background:#10B98115;border:2px solid #10B98140;align-items:center;justify-content:center;">
          <span style="font-size:28px;">✓</span>
        </div>
      </div>

      <h1 style="color:#ffffff;font-size:22px;font-weight:800;text-align:center;margin:0 0 8px;line-height:1.3;">
        Solicitud recibida con éxito
      </h1>
      <p style="color:#0EA5E9;font-size:12px;font-weight:700;text-align:center;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 28px;">${fuenteLabel}</p>

      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 20px;">
        Hola <strong style="color:#e2e8f0;">${safeNombre.split(' ')[0]}</strong>, hemos recibido su solicitud y nuestro equipo de consultores senior ya fue notificado.
      </p>

      <!-- Timeline box -->
      <div style="background:#0EA5E908;border:1px solid #0EA5E920;border-radius:12px;padding:20px;margin:0 0 28px;">
        <p style="color:#94a3b8;font-size:13px;margin:0 0 12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">¿Qué sigue?</p>
        <div style="display:flex;gap:12px;margin-bottom:10px;">
          <span style="color:#0EA5E9;font-size:16px;flex-shrink:0;">→</span>
          <p style="color:#cbd5e1;font-size:14px;margin:0;">Un consultor CSSG le contactará en <strong style="color:#ffffff;">menos de 12 horas</strong> hábiles.</p>
        </div>
        <div style="display:flex;gap:12px;margin-bottom:10px;">
          <span style="color:#0EA5E9;font-size:16px;flex-shrink:0;">→</span>
          <p style="color:#cbd5e1;font-size:14px;margin:0;">Realizaremos un <strong style="color:#ffffff;">diagnóstico inicial</strong> de su situación de seguridad.</p>
        </div>
        <div style="display:flex;gap:12px;">
          <span style="color:#0EA5E9;font-size:16px;flex-shrink:0;">→</span>
          <p style="color:#cbd5e1;font-size:14px;margin:0;">Le presentaremos una <strong style="color:#ffffff;">propuesta personalizada</strong> sin costo ni compromiso.</p>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="https://cssg-global.com" style="display:inline-block;background:linear-gradient(135deg,#0284C7,#0EA5E9);color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.05em;">
          Visitar cssg-global.com
        </a>
      </div>
    </div>

    <!-- Trust badges -->
    <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:28px;">
      <span style="color:#475569;font-size:11px;font-weight:600;">✓ ISO 9001:2015</span>
      <span style="color:#475569;font-size:11px;font-weight:600;">✓ +12 años sin incidentes</span>
      <span style="color:#475569;font-size:11px;font-weight:600;">✓ Estándar Diplomático G7</span>
    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #1e293b;padding-top:24px;text-align:center;">
      <p style="color:#334155;font-size:12px;margin:0 0 4px;font-weight:600;">CSSG — Company Of Security And Service Global C.A.</p>
      <p style="color:#334155;font-size:11px;margin:0 0 4px;">Calle la Joya, Edif. Cosmos, Piso 8, Ofic. 8B, Chacao, Caracas · +58 0424 178 2091</p>
      <p style="color:#1e293b;font-size:10px;margin:12px 0 0;">Si no realizó esta solicitud, puede ignorar este correo.</p>
    </div>

  </div>
</body>
</html>`,
      }, RESEND_API_KEY).catch(e => console.warn('[mailer] Welcome email error (non-blocking):', e));

      return res.status(200).json({ success: true });
    }

    /* ─────────────── NURTURE / SEQUENCE ─────────────── */
    if (type === 'nurture' || type === 'sequence') {
      if (!subject || !html) return res.status(400).json({ error: 'Faltan subject o html.' });

      const nurtureRes = await callResend({
        from: FROM_EMAIL,
        to: safeEmail,
        subject: String(subject).slice(0, 255),
        html: String(html),
      }, RESEND_API_KEY);

      if (!nurtureRes.ok) {
        const err = await nurtureRes.text();
        console.error(`[mailer] Error ${type}:`, err);
        return res.status(502).json({ error: err });
      }

      console.info(`[mailer] ✅ ${type} → ${safeEmail}`);
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: `Tipo desconocido: ${type}` });

  } catch (err) {
    console.error('[mailer] Error interno:', err);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}
