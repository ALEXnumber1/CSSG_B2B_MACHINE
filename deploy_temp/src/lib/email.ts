/**
 * Módulo de Email Nurturing — CSSG
 * 
 * Usa Resend API para enviar emails automáticos post-captura.
 * Para activar: agregar VITE_RESEND_API_KEY en .env.local
 * 
 * Documentación: https://resend.com/docs
 */

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || '';
const FROM_EMAIL = 'CSSG <noreply@globalservices-ven.com>'; // Cambiar cuando se verifique el dominio en Resend

// ═══════════ TEMPLATES ═══════════

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0B0B0F;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://globalservices-ven.com/logo.png" alt="CSSG" style="width:60px;height:60px;border-radius:50%;" />
      <p style="color:#0EA5E9;font-size:8px;letter-spacing:1px;text-transform:uppercase;margin-top:8px;margin-bottom:0;">Company Of Security And Service Global C.A.</p>
      <p style="color:#6B7280;font-size:7px;letter-spacing:1px;text-transform:uppercase;margin-top:2px;">RIF: J-29782024-8</p>
    </div>
    
    <!-- Content -->
    <div style="background-color:#1A1A24;border:1px solid #333345;border-radius:16px;padding:32px;margin-bottom:24px;">
      ${content}
    </div>
    
    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid #333345;">
      <p style="color:#6B7280;font-size:12px;margin:0;">Company Of Security and Service Global</p>
      <p style="color:#4B5563;font-size:11px;margin:4px 0 0;">Caracas, Venezuela · ISO 9001 · +17 años de experiencia</p>
      <p style="color:#4B5563;font-size:10px;margin:16px 0 0;">
        <a href="https://globalservices-ven.com" style="color:#0EA5E9;text-decoration:none;">globalservices-ven.com</a> · 
        Si no desea recibir más correos, responda a este email con "CANCELAR"
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ═══════════ EMAILS POR FUENTE ═══════════

const templates: Record<string, { subject: string; html: (nombre: string, empresa?: string) => string }> = {
  contacto: {
    subject: 'Recibimos su solicitud — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido su solicitud de contacto. Un ejecutivo de nuestro equipo comercial
        se comunicará con usted en las próximas <strong style="color:#E2E8F0;">24 horas hábiles</strong>.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Mientras tanto, lo invitamos a conocer nuestra herramienta gratuita de
        análisis de vulnerabilidades, diseñada bajo estándares ISO 31000:
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Evaluar mis vulnerabilidades
        </a>
      </div>
    `),
  },

  riesgo: {
    subject: 'Su informe de vulnerabilidades está listo — CSSG',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        El informe de vulnerabilidades${empresa ? ` de <strong style="color:#E2E8F0;">${empresa}</strong>` : ''} 
        ha sido generado exitosamente. Ya debería tener el PDF descargado en su equipo.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Si los resultados indican áreas de mejora, nuestro equipo de consultores puede 
        ayudarle a diseñar un plan de acción concreto y medible.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        <strong style="color:#E2E8F0;">¿Sabía que una consultoría estratégica puede reducir hasta un 40% los costos 
        de su proyecto de seguridad?</strong>
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Agendar consulta gratuita
        </a>
      </div>
    `),
  },

  consultoria: {
    subject: 'Pre-entrevista registrada — CSSG Consultoría',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido su solicitud de pre-entrevista${empresa ? ` para <strong style="color:#E2E8F0;">${empresa}</strong>` : ''}.
        Nuestro equipo de consultoría está revisando los detalles de su proyecto.
      </p>
      <div style="background-color:#0EA5E910;border:1px solid #0EA5E930;border-radius:12px;padding:20px;margin:16px 0;">
        <p style="color:#E2E8F0;font-size:14px;margin:0 0 8px;font-weight:600;">Próximos pasos:</p>
        <ol style="color:#9CA3AF;font-size:13px;line-height:1.8;margin:0;padding-left:20px;">
          <li>Un consultor senior revisará su caso (24-48h)</li>
          <li>Le contactaremos para agendar la pre-entrevista</li>
          <li>Recibirá un informe preliminar personalizado</li>
        </ol>
      </div>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0;">
        Con una tasa de éxito del <strong style="color:#10B981;">80% en licitaciones y proyectos</strong>, 
        su proyecto está en buenas manos.
      </p>
    `),
  },

  pestel: {
    subject: 'Su Informe PESTEL de Seguridad Venezuela 2026 — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Gracias por su interés en nuestro <strong style="color:#E2E8F0;">Informe de Seguridad Venezuela 2026</strong>.
        Le enviaremos el enlace de descarga a este correo en breve.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Este informe analiza las 6 dimensiones PESTEL que impactan la seguridad 
        pública y privada en el país, con datos actualizados y recomendaciones 
        específicas por sector.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Si desea un análisis personalizado para su organización, le invitamos a 
        utilizar nuestra herramienta gratuita:
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Analizar mis vulnerabilidades
        </a>
      </div>
    `),
  },
};

// ═══════════ FUNCIÓN DE ENVÍO ORIGINAL ═══════════

export async function sendNurtureEmail(
  to: string,
  nombre: string,
  fuente: string,
  empresa?: string
): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.info('[Email Nurturing] API key no configurada. Email no enviado a:', to);
    return { success: false, error: 'API key no configurada' };
  }

  const template = templates[fuente];
  if (!template) {
    console.warn('[Email Nurturing] Fuente desconocida:', fuente);
    return { success: false, error: 'Fuente desconocida' };
  }

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
        html: template.html(nombre, empresa),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Email Nurturing] Error de Resend:', err);
      return { success: false, error: err };
    }

    return { success: true };
  } catch (err) {
    console.error('[Email Nurturing] Error de red:', err);
    return { success: false, error: 'Error de red' };
  }
}

// ═══════════ TEMPLATES DE SECUENCIAS (MULTI-EMAIL) ═══════════

const sequenceTemplates: Record<string, { subject: string; html: (nombre: string, empresa?: string) => string }> = {
  // ── CONTACTO: 3 emails ──
  contacto_1: templates.contacto, // Reusar el email original como #1
  contacto_2: {
    subject: '¿Sabía que el 60% cambia de proveedor? — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        El <strong style="color:#E2E8F0;">60% de las empresas en Venezuela</strong> cambia de proveedor 
        de seguridad en los primeros 12 meses. ¿La razón? Rotación de personal, falta de supervisión 
        y reportes que nunca llegan.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Hemos publicado una guía con los <strong style="color:#E2E8F0;">7 criterios reales</strong> 
        que debe evaluar antes de contratar o cambiar de empresa de seguridad:
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/blog/como-elegir-empresa-seguridad-privada-venezuela" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Leer la guía completa
        </a>
      </div>
    `),
  },
  contacto_3: {
    subject: 'Su consulta gratuita con un experto le espera — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">${nombre}, un último paso.</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Nuestro equipo de consultores está disponible para una sesión gratuita donde evaluamos 
        las necesidades específicas de su organización.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Con <strong style="color:#10B981;">+17 años protegiendo embajadas del G7</strong> sin un solo incidente, 
        su seguridad está en las mejores manos.
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Agendar consulta gratuita
        </a>
      </div>
    `),
  },

  // ── RIESGO: 4 emails ──
  riesgo_1: templates.riesgo,
  riesgo_2: {
    subject: '3 acciones inmediatas para mejorar su score de seguridad — CSSG',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Después de analizar su evaluación de riesgos${empresa ? ` para <strong style="color:#E2E8F0;">${empresa}</strong>` : ''}, 
        estas son las 3 acciones que mayor impacto tienen en su puntuación:
      </p>
      <div style="background-color:#0EA5E910;border:1px solid #0EA5E930;border-radius:12px;padding:20px;margin:16px 0;">
        <ol style="color:#9CA3AF;font-size:13px;line-height:2;margin:0;padding-left:20px;">
          <li><strong style="color:#E2E8F0;">Verificar el perímetro:</strong> Cercos, iluminación y sensores</li>
          <li><strong style="color:#E2E8F0;">Auditar la supervisión:</strong> GPS de rondas y reportes diarios</li>
          <li><strong style="color:#E2E8F0;">Actualizar protocolos:</strong> Plan de emergencia con simulacros</li>
        </ol>
      </div>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        ¿Necesita ayuda implementando estas mejoras? Nuestro equipo puede guiarle.
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Solicitar consultoría gratuita
        </a>
      </div>
    `),
  },
  riesgo_3: {
    subject: 'Caso de éxito: cómo protegemos embajadas del G7 — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#10B981;">+17 años. Cero incidentes.</strong> Esa es nuestra hoja de ruta 
        protegiendo delegaciones diplomáticas del G7 en Venezuela.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        ¿Nuestro secreto? <strong style="color:#E2E8F0;">Cero rotación de personal.</strong> 
        Pagamos los mejores salarios del sector, lo que significa que los mismos oficiales 
        protegen la misma instalación durante años — conocen cada rincón, cada protocolo.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        ¿Le gustaría saber cómo podemos aplicar este nivel de protección a su organización?
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/quienes-somos" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Conocer nuestra historia
        </a>
      </div>
    `),
  },
  riesgo_4: {
    subject: 'Oferta exclusiva: auditoría de seguridad completa — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">${nombre}, última oportunidad.</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Hemos visto su evaluación de riesgos y creemos que una 
        <strong style="color:#E2E8F0;">auditoría completa presencial</strong> podría revelar 
        oportunidades de mejora que el análisis online no alcanza.
      </p>
      <div style="background-color:#10B98115;border:1px solid #10B98130;border-radius:12px;padding:20px;margin:16px 0;text-align:center;">
        <p style="color:#10B981;font-size:18px;font-weight:700;margin:0 0 8px;">Consulta inicial sin costo</p>
        <p style="color:#9CA3AF;font-size:13px;margin:0;">Válida por 30 días desde este correo</p>
      </div>
      <div style="text-align:center;margin-top:20px;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#10B981;color:#FFFFFF;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
          Agendar mi auditoría
        </a>
      </div>
    `),
  },

  // ── CONSULTORÍA: 3 emails ──
  consultoria_1: templates.consultoria,
  consultoria_2: {
    subject: '80% de éxito en proyectos de seguridad — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        ¿Sabía que en CSSG tenemos una tasa de éxito del 
        <strong style="color:#10B981;">80% en licitaciones y proyectos</strong> de seguridad? 
        Eso se debe a que cada propuesta está respaldada por nuestra certificación ISO 9001:2015.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Le invitamos a leer nuestro artículo sobre por qué importa la ISO 9001 
        en la seguridad privada:
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/blog/iso-9001-seguridad-privada-importancia" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Leer artículo
        </a>
      </div>
    `),
  },
  consultoria_3: {
    subject: 'Recordatorio: su consulta personalizada — CSSG',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">${nombre}, no queremos que pierda esta oportunidad.</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Su solicitud de pre-entrevista${empresa ? ` para <strong style="color:#E2E8F0;">${empresa}</strong>` : ''} 
        sigue abierta. Un consultor senior de CSSG está disponible para diseñar una 
        solución a la medida de su operación.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Responda a este correo o contáctenos directamente para agendar.
      </p>
      <div style="text-align:center;">
        <a href="mailto:info@globalservices-ven.com?subject=Consulta%20personalizada%20-%20${nombre}" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Responder ahora
        </a>
      </div>
    `),
  },

  // ── PESTEL: 3 emails ──
  pestel_1: templates.pestel,
  pestel_2: {
    subject: '5 errores de seguridad que cometen las empresas en Caracas — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        Ya que descargó nuestro Informe PESTEL, sabemos que le interesa la seguridad 
        de su organización. Este artículo le será muy útil:
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        <strong style="color:#E2E8F0;">5 errores que vemos en el 70% de las empresas que auditamos 
        en Caracas</strong> — y las soluciones concretas para cada uno.
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/blog/5-errores-seguridad-corporativa" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Leer los 5 errores
        </a>
      </div>
    `),
  },
  pestel_3: {
    subject: 'Análisis personalizado para su empresa — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#FFFFFF;font-size:22px;margin:0 0 16px;">${nombre}, dé el siguiente paso.</h2>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 16px;">
        El Informe PESTEL le dio una visión macro del entorno de seguridad en Venezuela. 
        Ahora le invitamos a hacer un <strong style="color:#E2E8F0;">análisis micro</strong> 
        — enfocado específicamente en su organización.
      </p>
      <p style="color:#9CA3AF;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Nuestra herramienta gratuita evalúa 8 vectores críticos de seguridad y genera 
        un informe PDF profesional en minutos:
      </p>
      <div style="text-align:center;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Iniciar análisis gratuito
        </a>
      </div>
    `),
  },
};

// ═══════════ FUNCIÓN DE ENVÍO PARA SECUENCIAS ═══════════

export async function sendSequenceEmail(
  to: string,
  nombre: string,
  templateKey: string,
  empresa?: string
): Promise<{ success: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.info(`[Sequence Email] API key no configurada. Template: ${templateKey}, To: ${to}`);
    return { success: false, error: 'API key no configurada' };
  }

  const template = sequenceTemplates[templateKey];
  if (!template) {
    console.warn(`[Sequence Email] Template no encontrado: ${templateKey}`);
    return { success: false, error: 'Template no encontrado' };
  }

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
        html: template.html(nombre, empresa),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Sequence Email] Error de Resend:', err);
      return { success: false, error: err };
    }

    console.info(`[Sequence Email] ✅ Enviado: ${templateKey} → ${to}`);
    return { success: true };
  } catch (err) {
    console.error('[Sequence Email] Error de red:', err);
    return { success: false, error: 'Error de red' };
  }
}

