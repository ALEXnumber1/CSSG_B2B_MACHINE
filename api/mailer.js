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

      /* 2. Bienvenida inmediata al lead — copy corporativo/neuromarketing */
      const fuenteLabel = fuente_label(safeFuente);
      const primerNombre = safeNombre.split(' ')[0];

      // Asunto dinámico según la fuente — desencadena autoridad + próximo paso, no spam
      const welcomeSubjects = {
        escudo_diplomatico: `Su expediente Escudo Diplomático fue asignado — CSSG Global`,
        riesgo:             `Análisis de riesgo en proceso — Consultor Senior asignado | CSSG`,
        pestel:             `Su Informe PESTEL está siendo procesado — CSSG Global`,
        default:            `Su expediente fue asignado a Consultoría Senior | CSSG Global`,
      };
      const welcomeSubject = welcomeSubjects[safeFuente] || welcomeSubjects.default;

      callResend({
        from: FROM_EMAIL,
        to: safeEmail,
        subject: welcomeSubject,
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <title>Confirmación de solicitud — CSSG Global</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Preheader (invisible, aparece en la vista previa del correo) -->
  <span style="display:none;font-size:1px;color:#f1f5f9;max-height:0;overflow:hidden;">
    En las próximas 12 horas hábiles, un especialista de nuestra División de Seguridad Corporativa se pondrá en contacto con usted directamente.
  </span>

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f1f5f9;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;">

          <!-- ── CABECERA CORPORATIVA ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#0c1a2e 0%,#0f2847 50%,#0c1a2e 100%);border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <p style="color:#0EA5E9;font-size:10px;font-weight:800;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 6px;">COMPANY OF SECURITY AND SERVICE GLOBAL</p>
              <p style="color:#94a3b8;font-size:9px;letter-spacing:0.15em;margin:0;">C.A. · RIF J-29782024-8 · Fundada 2009 · ISO 9001:2015</p>
              <!-- Línea divisoria de acento -->
              <div style="width:48px;height:2px;background:linear-gradient(90deg,#0284C7,#38bdf8);margin:18px auto 0;border-radius:1px;"></div>
            </td>
          </tr>

          <!-- ── CUERPO PRINCIPAL ── -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;">

              <!-- Confirmación -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-bottom:28px;border-bottom:1px solid #e2e8f0;">
                    <p style="color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;margin:0 0 10px;">${fuenteLabel}</p>
                    <h1 style="color:#0f172a;font-size:24px;font-weight:800;margin:0 0 16px;line-height:1.3;">
                      Su solicitud fue recibida y registrada, ${primerNombre}.
                    </h1>
                    <p style="color:#475569;font-size:15px;line-height:1.75;margin:0;">
                      Hemos tomado nota de su requerimiento y un consultor senior de nuestra División de Seguridad Corporativa ya fue notificado. No es necesaria ninguna acción adicional de su parte en este momento.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Quiénes somos -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:28px 0;border-bottom:1px solid #e2e8f0;">
                    <p style="color:#0284C7;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 12px;">SOBRE CSSG GLOBAL</p>
                    <p style="color:#334155;font-size:14px;line-height:1.8;margin:0;">
                      CSSG es una empresa de <strong>seguridad privada</strong> y <strong>seguridad física</strong> de alcance internacional, fundada en Venezuela en <strong>2009</strong>. Proveemos servicios especializados de <strong>vigilancia corporativa</strong> y gestión de riesgos para <strong>corporaciones multinacionales, sedes diplomáticas y organizaciones de alto perfil estratégico</strong>, con presencia activa en los estándares internacionales más exigentes del sector.
                    </p>
                    <p style="color:#334155;font-size:14px;line-height:1.8;margin:14px 0 0;">
                      Operamos bajo la certificación <strong>ISO 9001:2015 (N° 580181)</strong>, que garantiza la calidad, trazabilidad y consistencia operacional en cada compromiso que asumimos con nuestros clientes.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Próximos pasos -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:28px 0 24px;">
                    <p style="color:#0284C7;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.18em;margin:0 0 18px;">¿QUÉ OCURRE AHORA?</p>

                    <!-- Paso 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:14px;">
                      <tr>
                        <td width="32" valign="top" style="padding-top:1px;">
                          <div style="width:24px;height:24px;background:#0EA5E9;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">1</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="color:#0f172a;font-size:14px;font-weight:700;margin:0 0 2px;">Contacto en menos de 12 horas hábiles</p>
                          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">Un especialista se comunicará con usted para entender en detalle su requerimiento operativo o estratégico.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Paso 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:14px;">
                      <tr>
                        <td width="32" valign="top" style="padding-top:1px;">
                          <div style="width:24px;height:24px;background:#0EA5E9;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">2</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="color:#0f172a;font-size:14px;font-weight:700;margin:0 0 2px;">Diagnóstico consultivo inicial</p>
                          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">Evaluaremos confidencialmente el contexto operativo y los activos que su organización necesita proteger, sin costo ni compromiso.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Paso 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td width="32" valign="top" style="padding-top:1px;">
                          <div style="width:24px;height:24px;background:#0EA5E9;border-radius:50%;text-align:center;line-height:24px;font-size:11px;font-weight:800;color:#fff;">3</div>
                        </td>
                        <td style="padding-left:12px;">
                          <p style="color:#0f172a;font-size:14px;font-weight:700;margin:0 0 2px;">Propuesta estratégica a medida</p>
                          <p style="color:#64748b;font-size:13px;line-height:1.6;margin:0;">Le presentaremos un plan de seguridad física y vigilancia adaptado a la naturaleza, escala y riesgos específicos de su organización.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:#f8fafc;border-left:3px solid #0EA5E9;border-radius:0 8px 8px 0;padding:16px 20px;margin-bottom:28px;">
                    <p style="color:#334155;font-size:13px;line-height:1.65;margin:0;">
                      Nuestro modelo de trabajo es <strong>estrictamente consultivo</strong>: antes de proponer cualquier solución de seguridad privada, comprendemos a profundidad el entorno de riesgo de su organización. La discreción y la confidencialidad son parte de nuestro protocolo desde el primer contacto.
                    </p>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="https://cssg-global.com/consultoria" style="display:inline-block;background:#0284C7;color:#ffffff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.04em;">
                      Explorar nuestros servicios
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── BADGES DE CONFIANZA ── -->
          <tr>
            <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center">
                    <span style="display:inline-block;color:#64748b;font-size:11px;font-weight:700;margin:0 12px;">✓ Fundada 2009</span>
                    <span style="display:inline-block;color:#64748b;font-size:11px;font-weight:700;margin:0 12px;">✓ ISO 9001:2015 Cert. 580181</span>
                    <span style="display:inline-block;color:#64748b;font-size:11px;font-weight:700;margin:0 12px;">✓ Estándar Diplomático G7</span>
                    <span style="display:inline-block;color:#64748b;font-size:11px;font-weight:700;margin:0 12px;">✓ +15 años sin incidentes</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── PIE DE PÁGINA ── -->
          <tr>
            <td style="background:#0f172a;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
              <p style="color:#94a3b8;font-size:12px;font-weight:700;margin:0 0 4px;letter-spacing:0.05em;">CSSG — Company Of Security And Service Global C.A.</p>
              <p style="color:#64748b;font-size:11px;margin:0 0 4px;">Calle la Joya, Edif. Cosmos, Piso 8, Ofic. 8B · Chacao, Caracas, Venezuela</p>
              <p style="color:#64748b;font-size:11px;margin:0 0 16px;">
                <a href="tel:+584241782091" style="color:#0EA5E9;text-decoration:none;">+58 0424 178 2091</a>
                &nbsp;·&nbsp;
                <a href="mailto:operaciones@cssg-global.com" style="color:#0EA5E9;text-decoration:none;">operaciones@cssg-global.com</a>
                &nbsp;·&nbsp;
                <a href="https://cssg-global.com" style="color:#0EA5E9;text-decoration:none;">cssg-global.com</a>
              </p>
              <p style="color:#334155;font-size:10px;margin:0;line-height:1.6;">
                Usted recibe este mensaje porque realizó una solicitud a través de nuestro portal corporativo
                (${fuenteLabel}). Si no fue usted, puede ignorar este correo con total tranquilidad.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

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
