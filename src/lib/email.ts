/**
 * Módulo de Email Nurturing — CSSG
 * 
 * ⚠️  SEGURIDAD: La RESEND_API_KEY NO se usa en el frontend.
 * Todas las llamadas de email pasan por /api/send-email (Vercel Function).
 * La clave nunca se expone en el bundle de producción.
 * 
 * Documentación: https://resend.com/docs
 */

// La API key ahora vive únicamente en el servidor (variables de entorno de Vercel)
// El frontend llama a /api/send-email en su lugar
const EMAIL_API = '/api/mailer';

// El FROM_EMAIL se configura ahora en /api/send-email (servidor)
// Actualizar en api/send-email.js: const FROM_EMAIL = 'CSSG <info@cssg-global.com>'

// ═══════════ TEMPLATES ═══════════

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:40px 24px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <img src="https://globalservices-ven.com/logo.png" alt="CSSG - Company Of Security And Service Global" style="width:120px;height:auto;margin-bottom:8px;" />
      <p style="color:#64748B;font-size:9px;letter-spacing:1px;text-transform:uppercase;margin-top:4px;margin-bottom:0;">RIF: J-29782024-8</p>
    </div>
    
    <!-- Content -->
    <div style="background-color:#FFFFFF;border:1px solid #E2E8F0;border-radius:16px;padding:32px;margin-bottom:24px;box-shadow:0 1px 3px 0 rgba(0, 0, 0, 0.05);">
      ${content}
    </div>
    
    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid #E2E8F0;">
      <p style="color:#475569;font-size:12px;margin:0;font-weight:600;">Company Of Security and Service Global</p>
      <p style="color:#64748B;font-size:11px;margin:4px 0 0;">Caracas, Venezuela · ISO 9001 · +17 años de experiencia</p>
      <p style="color:#64748B;font-size:10px;margin:16px 0 0;">
        <a href="https://globalservices-ven.com" style="color:#0284C7;text-decoration:none;font-weight:600;">globalservices-ven.com</a> · 
        Si no desea recibir más correos, responda a este email con "CANCELAR"
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ═══════════ EMAILS POR FUENTE ═══════════

const templates: Record<string, { subject: string | ((nombre: string, empresa?: string) => string); html: (nombre: string, empresa?: string) => string }> = {
  contacto: {
    subject: (nombre, empresa) => `[EVALUACIÓN] Solicitud de Seguridad para ${empresa || 'su organización'} — Hola ${nombre}`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido la información de su solicitud${empresa ? ` en representación de <strong style="color:#0284C7;">${empresa}</strong>` : ''}.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En un entorno empresarial complejo donde la continuidad de operaciones y el blindaje de infraestructura crítica no admiten margen de error, en CSSG tomamos su seguridad con el máximo rigor estratégico.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Lo que esto significa para usted:</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ Un <strong style="color:#0F172A;">Especialista Senior en Seguridad Corporativa</strong> está revisando sus requerimientos.</li>
          <li style="margin-bottom:8px;">✔️ Le contactaremos en las próximas <strong style="color:#0F172A;">24 horas hábiles</strong> para agendar una sesión explicativa de 15 minutos.</li>
          <li style="margin-bottom:8px;">✔️ Recibirá una <strong style="color:#0284C7;">Auditoría de Vulnerabilidad preliminar</strong> basada en los datos suministrados.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        ¿Por qué confiar en CSSG? Nuestra tasa de éxito es simple: Más de 17 años de experiencia y Cero Incidentes protegiendo embajadas del G7 y corporaciones internacionales en Venezuela.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Diagnosticar mis vulnerabilidades (ISO 31000)
        </a>
      </div>
    `),
  },

  riesgo: {
    subject: (_nombre, empresa) => `📋 Su informe de vulnerabilidades para ${empresa || 'su organización'} está listo — CSSG`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0- 16px;">
        El informe preliminar de vulnerabilidades${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''} ha sido generado exitosamente.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Nuestros analistas han procesado las variables ingresadas y el sistema ha generado su diagnóstico inicial. Si su score presenta áreas críticas, cada minuto cuenta para corregir vulnerabilidades en el perímetro, protección física o seguridad de la información.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Próximos pasos recomendados:</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ Revise el PDF generado para entender sus brechas de seguridad.</li>
          <li style="margin-bottom:8px;">✔️ Agende una sesión gratuita de 15 minutos para interpretar los resultados a profundidad.</li>
          <li style="margin-bottom:8px;">✔️ Conozca cómo nuestro plan estratégico puede reducir hasta un 40% sus costos actuales en seguridad.</li>
        </ul>
      </div>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Agendar Sesión de Consulta Gratuita
        </a>
      </div>
    `),
  },

  consultoria: {
    subject: (_nombre, empresa) => `📅 Pre-entrevista confirmada para ${empresa || 'su organización'} — CSSG Consultoría`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido su solicitud de pre-entrevista estratégica${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}.
      </p>
      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Plan de Acción en Marcha:</p>
        <ol style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">Un Consultor Senior evaluará el contexto operativo de su organización.</li>
          <li style="margin-bottom:8px;">Le contactaremos para acordar el horario exacto de la sesión (15 minutos).</li>
          <li style="margin-bottom:8px;">Le entregaremos un mapa de mitigación de riesgos de alto nivel sin costo.</li>
        </ol>
      </div>
      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0;">
        Contamos con una tasa de éxito del <strong style="color:#10B981;">80% en proyectos críticos de seguridad</strong>. Su proyecto está en manos de profesionales certificados.
      </p>
    `),
  },

  pestel: {
    subject: (_nombre, empresa) => `📚 Informe PESTEL 2026 listo para ${empresa || 'su organización'} — CSSG`,
    html: (nombre, _empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Gracias por solicitar el <strong style="color:#0F172A;">Informe de Seguridad Venezuela 2026</strong>.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Este reporte evalúa las 6 dimensiones PESTEL (Política, Económica, Social, Tecnológica, Ecológica y Legal) que impactan directamente el panorama corporativo de seguridad en el país. Conocer estos datos es el primer paso para proteger su empresa contra contingencias imprevistas.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Evaluar mis vulnerabilidades de forma gratuita
        </a>
      </div>
    `),
  },

  escudo_diplomatico: {
    subject: (nombre) => `🔒 Solicitud de Evaluación: Escudo Diplomático CSSG — Hola ${nombre}`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos recibido su solicitud de calificación para el servicio exclusivo de **Escudo Diplomático** de CSSG${empresa ? ` en representación de <strong style="color:#D4AF37;">${empresa}</strong>` : ''}.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Debido a los rigurosos estándares y al carácter confidencial de este servicio (diseñado originalmente bajo parámetros G7 para delegaciones internacionales y directivos de élite), el acceso a nuestro esquema de protección está limitado y sujeto a una evaluación de seguridad preliminar.
      </p>

      <div style="background-color:#FFFDF5;border:1px solid #F3E5AB;border-radius:12px;padding:24px;margin:24px 0;border-left:4px solid #D4AF37;">
        <p style="color:#856404;font-size:16px;margin:0 0 12px;font-weight:700;">Próximos pasos en su calificación:</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ Nuestro <strong>Comité de Evaluación Táctica</strong> revisará los datos suministrados de forma estrictamente confidencial.</li>
          <li style="margin-bottom:8px;">✔️ Un <strong>Consultor Especialista Senior</strong> se pondrá en contacto con usted a través de los canales seguros proporcionados en un plazo de <strong>12 a 24 horas</strong>.</li>
          <li style="margin-bottom:8px;">✔️ Si cumple con el perfil requerido, programaremos una entrevista presencial o virtual cifrada.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Si desea acelerar el proceso o requiere asistencia inmediata para una situación de riesgo inminente, puede contactar directamente a nuestra central de operaciones 24/7.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="tel:+584241782091" style="display:inline-block;background-color:#D4AF37;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(212, 175, 55, 0.4);">
          Llamar a Central Operativa B2B
        </a>
      </div>
    `),
  },

  esrm_readiness: {
    subject: (nombre) => `Su invitación a CSSG fue recibida — ${nombre}`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Gracias por invitar a CSSG a su proceso de registro de proveedores${empresa ? ` en representación de <strong style="color:#C9A24B;">${empresa}</strong>` : ''}. Su solicitud fue registrada y enviada a nuestro equipo de compliance.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        CSSG opera bajo ISO 18788, ISO 31000 e ISO 28000, con certificación ISO 9001 y Cyber Essentials, y alineación a ANSI/ASIS PSC.1, ESRM y estándares OSAC y DSS.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Próximos pasos:</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ Preparamos su <strong style="color:#0F172A;">expediente de cumplimiento completo</strong>: certificaciones, políticas, matrices de riesgo ISO 31000, KPIs y evidencia operativa.</li>
          <li style="margin-bottom:8px;">✔️ Le contactamos en menos de <strong style="color:#0F172A;">24 horas hábiles</strong> para coordinar los siguientes pasos de su proceso de registro o licitación.</li>
          <li style="margin-bottom:8px;">✔️ Si su programa lo requiere, disponemos de NDA, RFI, RFP y due diligence de vendor bajo estándar.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Le entregamos planes y evidencia, no solo personal en sitio.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Conocer Risk Advisory Services de CSSG
        </a>
      </div>
    `),
  },

  levantamiento_tecnico: {
    subject: (nombre) => `${nombre}, su levantamiento técnico con CSSG fue registrado`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos registrado su solicitud de levantamiento de información técnica${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}. Nuestro equipo técnico ya fue notificado.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Este relevamiento no es un formulario genérico: es un diagnóstico profesional de su esquema actual de seguridad, con hallazgos priorizados y un plan de operación propuesto.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">¿Qué sigue ahora?</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Registro y diagnóstico preliminar</strong> — ya completado con esta solicitud.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Visita técnica en sitio</strong> — coordinada por nuestro equipo, en sitio y confidencial.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0284C7;">Análisis y presentación ejecutiva</strong> — informe con membrete, presentable a su directiva.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Sus respuestas se procesan bajo protocolo de confidencialidad y los resultados se envían exclusivamente a su correo corporativo.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/levantamiento" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Ver detalle del levantamiento técnico
        </a>
      </div>
    `),
  },

  reduccion_costos_seguridad: {
    subject: (nombre) => `${nombre}, su diagnóstico de ahorro con CSSG fue registrado`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos registrado su solicitud de diagnóstico de ahorro${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}. Nuestro equipo ya fue notificado.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Nuestros clientes reducen su factura de seguridad entre un <strong>25% y 40%</strong> al sustituir el exceso de horas hombre por supervisión tecnológica ininterrumpida con nuestra plataforma <strong>ShieldTrace</strong>, sin perder cobertura ni control.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">¿Qué sigue ahora?</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Diagnóstico online</strong> — ya completado con esta solicitud.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Visita de optimización sin costo</strong> — 90 minutos, revisamos su esquema y su factura actual.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0284C7;">Presentación del ahorro</strong> — "Esquema Actual vs. Esquema CSSG", listo para su junta directiva.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        100% confidencial y sin compromiso. Un especialista revisará su caso y le contactará directamente.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/reduccion-costos-seguridad" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Ver detalle de la optimización de costos
        </a>
      </div>
    `),
  },

  risk_advisory_services: {
    subject: (nombre) => `${nombre}, su evaluación inicial de Risk Advisory Services fue registrada`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Hemos registrado su solicitud de evaluación inicial${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}. Nuestro equipo de Risk Advisory Services ya fue notificado.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Un consultor senior revisará su caso en una sesión informativa — sin costo ni compromiso — y le presentará el alcance de la consultoría bajo metodología <strong>ESRM / ISO 31000</strong> que necesita su organización.
      </p>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:24px 0;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">¿Qué sigue ahora?</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Sesión informativa inicial</strong> — sin costo, ya en proceso con esta solicitud.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0F172A;">Alcance y propuesta de consultoría</strong> — a la medida de su organización.</li>
          <li style="margin-bottom:8px;">✔️ <strong style="color:#0284C7;">Respuesta en menos de 12 horas</strong> — sin compromiso de contratación.</li>
        </ul>
      </div>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://calendar.app.google/ZCLbjCCsbmYwMnEc6" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Agendar mi sesión informativa
        </a>
      </div>
      <p style="text-align:center;color:#94A3B8;font-size:12px;margin:0 0 4px;">Elija el horario que más le convenga, sin esperar a que lo contactemos.</p>
    `),
  },

  empresa_seguridad: {
    subject: (nombre) => `${nombre}, agende su auditoría confidencial de seguridad privada`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Gracias por solicitar una auditoría de su esquema de seguridad privada${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}. Un consultor senior de nuestra división corporativa ya fue notificado — pero no tiene que esperar el ida y vuelta de correos para avanzar.
      </p>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 20px;font-weight:600;">
        Elija un horario que le convenga y hable directamente con un consultor senior:
      </p>

      <div style="text-align:center;margin:24px 0 32px;">
        <a href="https://calendar.app.google/ZCLbjCCsbmYwMnEc6" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:18px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Agendar mi auditoría confidencial →
        </a>
        <p style="color:#94A3B8;font-size:12px;margin:12px 0 0;">30 minutos · Confidencial · Sin compromiso</p>
      </div>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Qué cubrimos en su auditoría</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li><strong>Legalidad y solvencia del proveedor</strong> — permisos vigentes, pólizas y solvencia laboral de su empresa de seguridad actual o candidata.</li>
          <li><strong>Cláusulas del contrato de vigilancia</strong> — KPIs exigibles, transparencia de facturación y cláusulas de salida que realmente puede hacer cumplir.</li>
          <li><strong>Criterios operativos en sitio</strong> — perímetro, control de accesos, rotación de personal y protocolos documentados.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Si ya tiene un proveedor contratado, normalmente empezamos auditando esa relación — reemplazarlo nunca es el resultado asumido de antemano.
      </p>

      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 24px;">
        ¿Prefiere que lo contactemos nosotros directamente? No necesita hacer nada más — un consultor senior le escribirá dentro de las próximas 12 horas hábiles de todas formas.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/consultoria" style="display:inline-block;background-color:#ffffff;color:#0284C7;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;border:1.5px solid #0284C7;">
          Conozca nuestros servicios
        </a>
      </div>
    `),
  },

  consultoria_riesgos_guia: {
    subject: (nombre) => `${nombre}, agende su evaluación de riesgos de seguridad (ISO 31000)`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Gracias por solicitar una <strong>Evaluación de Riesgos de Seguridad</strong>${empresa ? ` para <strong style="color:#0284C7;">${empresa}</strong>` : ''}. Un consultor senior de nuestra división de Risk Advisory ya fue notificado — pero no tiene que esperar el ida y vuelta de correos para avanzar.
      </p>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 20px;font-weight:600;">
        Elija un horario que le convenga y hable directamente con un consultor senior:
      </p>

      <div style="text-align:center;margin:24px 0 32px;">
        <a href="https://calendar.app.google/ZCLbjCCsbmYwMnEc6" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:18px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Agendar mi evaluación de riesgos →
        </a>
        <p style="color:#94A3B8;font-size:12px;margin:12px 0 0;">30 minutos · Confidencial · Sin compromiso</p>
      </div>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">Qué cubrimos en su evaluación</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li><strong>Mapeo de activos y vectores de amenaza</strong> — los 4 pilares: Perímetro Físico, Control de Accesos, Procedimientos Operativos e Inteligencia de Amenazas.</li>
          <li><strong>Índice de Riesgo bajo metodología FMEA</strong> — (Probabilidad × 0,4) + (Impacto × 0,6) por cada vulnerabilidad, referenciado a ISO 31000:2018 y ASIS ORM.1:2017.</li>
          <li><strong>Auditoría de seguridad física (CPTED)</strong> — perímetro, iluminación, control de accesos y flujo de personas en sitio, con evidencia fotográfica.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Si ya cuenta con un diagnóstico o esquema de seguridad, normalmente empezamos por revisarlo — sustituirlo nunca es el resultado asumido de antemano.
      </p>

      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 24px;">
        ¿Prefiere que lo contactemos nosotros directamente? No necesita hacer nada más — un consultor senior le escribirá dentro de las próximas 12 horas hábiles de todas formas.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/analisis-riesgo" style="display:inline-block;background-color:#ffffff;color:#0284C7;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;border:1.5px solid #0284C7;">
          Explorar la herramienta de análisis de riesgo en línea
        </a>
      </div>
    `),
  },

  corporate_security_en: {
    subject: (nombre) => `${nombre}, schedule your confidential Corporate Security briefing`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Dear ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Thank you for requesting a confidential corporate security assessment${empresa ? ` for <strong style="color:#0284C7;">${empresa}</strong>` : ''}. A senior consultant from our Corporate Security Division has already been notified — but you don't have to wait on email back-and-forth to move forward.
      </p>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 20px;font-weight:600;">
        Choose a time that works for you, and speak directly with a senior consultant:
      </p>

      <div style="text-align:center;margin:24px 0 32px;">
        <a href="https://calendar.app.google/ZCLbjCCsbmYwMnEc6" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:18px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Schedule My Confidential Briefing →
        </a>
        <p style="color:#94A3B8;font-size:12px;margin:12px 0 0;">30 minutes · No cost · No obligation</p>
      </div>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">What we will cover in your briefing</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li><strong>Legal & financial standing</strong> — your current or prospective contractor's licensing, insurance and labor compliance.</li>
          <li><strong>Contract & service-level terms</strong> — KPIs, billing transparency and exit clauses that can actually be enforced.</li>
          <li><strong>On-site operational criteria</strong> — perimeter, access control, staff rotation and documented protocols.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        If you already have a contractor in place, we typically start by auditing that relationship — replacing them is never the assumed outcome.
      </p>

      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Prefer we reach out directly instead? No action needed — a senior consultant will contact you within 12 business hours regardless.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/en/technology" style="display:inline-block;background-color:#ffffff;color:#0284C7;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;border:1.5px solid #0284C7;">
          Explore our services
        </a>
      </div>
    `),
  },

  diplomatic_security_en: {
    subject: (nombre) => `${nombre}, schedule your Escudo Diplomático technical assessment`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;font-weight:700;">Dear ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Thank you for your request regarding <strong style="color:#0284C7;">Escudo Diplomático</strong>, CSSG's diplomatic security service${empresa ? ` for <strong style="color:#0284C7;">${empresa}</strong>` : ''}. A senior consultant from our Diplomatic Security Division has already been notified — but you don't have to wait on email back-and-forth to move forward.
      </p>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 20px;font-weight:600;">
        Choose a time that works for you, and speak directly with a senior consultant:
      </p>

      <div style="text-align:center;margin:24px 0 32px;">
        <a href="https://calendar.app.google/ZCLbjCCsbmYwMnEc6" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:18px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px 0 rgba(2, 132, 199, 0.4);">
          Schedule My Technical Site Assessment →
        </a>
        <p style="color:#94A3B8;font-size:12px;margin:12px 0 0;">30 minutes · No cost · No obligation</p>
      </div>

      <div style="background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px;">
        <p style="color:#1E293B;font-size:16px;margin:0 0 12px;font-weight:700;">What the Escudo Diplomático protocol covers</p>
        <ul style="color:#334155;font-size:14px;line-height:1.8;margin:0;padding-left:20px;">
          <li><strong>QMS-coordinated procedures</strong> — every action documented and audited under our ISO 9001:2015 Quality Management System.</li>
          <li><strong>CECOM 24/7 command center</strong> — real-time consolidated visibility and coordinated field response.</li>
          <li><strong>Preventive Intelligence Unit</strong> — continuous monitoring of the threat environment around your principal, mission or venue.</li>
          <li><strong>Perimeter patrols</strong> of the streets and zones adjacent to your focal point.</li>
        </ul>
      </div>

      <p style="color:#1E293B;font-size:15px;line-height:1.7;margin:0 0 24px;font-weight:600;">
        Preparing a tender or RFP? Reply to this email with your submission deadline and we will return our technical proposal and certifications — including ISO 9001:2015 and DIGESERVISP authorization — ahead of your cutoff.
      </p>

      <p style="color:#334155;font-size:14px;line-height:1.7;margin:0 0 24px;">
        Prefer we reach out directly instead? No action needed — a senior consultant will contact you within 12 business hours regardless.
      </p>

      <div style="text-align:center;margin:32px 0 16px;">
        <a href="https://cssg-global.com/en/technology" style="display:inline-block;background-color:#ffffff;color:#0284C7;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;border:1.5px solid #0284C7;">
          Explore our services
        </a>
      </div>
    `),
  },
};

// ═══════════ FUNCIÓN DE ENVÍO ORIGINAL ═══════════

export async function sendLeadNotification(leadData: {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  fuente: string;
  cargo?: string;
  vulnerabilidad?: string;
  horario?: string;
  mensaje?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(EMAIL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'lead',
        nombre: leadData.nombre,
        email: leadData.email,
        empresa: leadData.empresa,
        telefono: leadData.telefono,
        fuente: leadData.fuente,
        cargo: leadData.cargo,
        vulnerabilidad: leadData.vulnerabilidad,
        horario: leadData.horario,
        mensaje: leadData.mensaje,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('[Email Notification] Error del servidor:', err);
      return { success: false, error: err };
    }
    return { success: true };
  } catch (err) {
    console.error('[Email Notification] Error de red:', err);
    return { success: false, error: 'Error de red' };
  }
}

/**
 * Alerta inmediata al primer mensaje de un visitante en el chat (Oficial Rivas).
 * Fire-and-forget: nunca bloquea ni rompe la experiencia del chat.
 */
export function sendChatAlert(mensaje: string): void {
  try {
    void fetch(EMAIL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat',
        mensaje,
        pagina: typeof window !== 'undefined' ? window.location.pathname : '',
      }),
    }).catch((err) => console.error('[Chat Alert] Error de red:', err));
  } catch (err) {
    console.error('[Chat Alert] Error:', err);
  }
}


export async function sendNurtureEmail(
  to: string,
  nombre: string,
  fuente: string,
  empresa?: string
): Promise<{ success: boolean; error?: string }> {
  const template = templates[fuente];
  if (!template) {
    console.warn('[Email Nurturing] Fuente desconocida:', fuente);
    return { success: false, error: 'Fuente desconocida' };
  }

  try {
    const res = await fetch(EMAIL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'nurture',
        email: to,
        nombre,
        fuente,
        empresa,
        subject: typeof template.subject === 'function' ? template.subject(nombre, empresa) : template.subject,
        html: template.html(nombre, empresa),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Email Nurturing] Error del servidor:', err);
      return { success: false, error: err };
    }

    // También notificar internamente
    sendLeadNotification({ nombre, email: to, empresa, fuente })
      .catch(e => console.error('Error enviando notificación de lead:', e));

    return { success: true };
  } catch (err) {
    console.error('[Email Nurturing] Error de red:', err);
    return { success: false, error: 'Error de red' };
  }
}

// ═══════════ TEMPLATES DE SECUENCIAS (MULTI-EMAIL) ═══════════

const sequenceTemplates: Record<string, { subject: string | ((nombre: string, empresa?: string) => string); html: (nombre: string, empresa?: string) => string }> = {
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

  // ── ESCUDO DIPLOMATICO: 1 email ──
  escudo_diplomatico_1: templates.escudo_diplomatico,

  // ── ESRM READINESS (landing "El Estratega"): 1 email ──
  esrm_readiness_1: templates.esrm_readiness,

  // ── LEVANTAMIENTO TÉCNICO (landing "Ricardo"): 1 email ──
  levantamiento_tecnico_1: templates.levantamiento_tecnico,

  // ── REDUCCIÓN DE COSTOS DE SEGURIDAD (landing "Ana"): 1 email ──
  reduccion_costos_seguridad_1: templates.reduccion_costos_seguridad,

  // ── RISK ADVISORY SERVICES (landing bilingüe "Guardián + Estratega"): 1 email ──
  risk_advisory_services_1: templates.risk_advisory_services,

  // ── EMPRESA DE SEGURIDAD (lead magnet checklist 21 puntos): 1 email ──
  empresa_seguridad_1: templates.empresa_seguridad,

  // ── CONSULTORÍA Y ANÁLISIS DE RIESGOS (lead magnet guía ISO 31000 + matriz FMEA): 1 email ──
  consultoria_riesgos_guia_1: templates.consultoria_riesgos_guia,

  // ── CORPORATE SECURITY EN (lead magnet due diligence checklist): 1 email ──
  corporate_security_en_1: templates.corporate_security_en,

  // ── DIPLOMATIC SECURITY EN (Escudo Diplomático technical assessment / tender): 1 email ──
  diplomatic_security_en_1: templates.diplomatic_security_en,

  // ════════════════════════════════════════════════════════════════════════
  // SECUENCIAS OUTBOUND — Leads scrapeados (frío)
  // Tono: profesional outbound. NUNCA frases de inbound ("gracias por contactarnos").
  // Arco: miedo → dolor → prueba social → CTA baja fricción → urgencia → ask directo
  // ════════════════════════════════════════════════════════════════════════

  // ── BP1 OUTBOUND: Ricardo Campos — El Guardián (6 emails) ──────────────
  // Lenguaje obligatorio: KPIs, cogestión, ISO 31000, OSAC, renovación de contrato

  bp1_outbound_1: {
    subject: 'Un gerente de seguridad sin informe ejecutivo puede perder su contrato',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En Venezuela, el principal motivo de no renovación de contratos de gerentes de seguridad no
        es un incidente operativo. Es la <strong style="color:#0F172A;">incapacidad de demostrar su gestión</strong>
        ante quienes toman la decisión.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Cuando llega la auditoría o la reunión de renovación, la pregunta no es "¿hubo algún problema?"
        sino "¿puede mostrarme los KPIs del último trimestre?" — y la mayoría no tiene respuesta documentada.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        El 2026 trajo nuevas exigencias de cumplimiento DSS y OSAC para organizaciones con presencia
        diplomática en Venezuela. Los gerentes que no tengan documentación de gestión lista para su
        directivo en los próximos 90 días enfrentan una conversación muy difícil.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — Company Of Security And Service Global C.A.<br>
        gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_2: {
    subject: '¿Cómo documenta hoy su gestión de seguridad ante la junta directiva?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Una pregunta directa: si hoy su Director General o Embajador le pidiera
        un reporte ejecutivo de la gestión de seguridad del último trimestre,
        <strong style="color:#0F172A;">¿cuánto tiempo le tomaría tenerlo listo?</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Los gerentes de seguridad que responden "dos horas o menos" tienen algo en común:
        su gestión opera bajo un sistema que documenta KPIs en tiempo real, no cuando la
        auditoría ya está encima.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        La diferencia entre un gerente de seguridad que renueva su contrato año tras año y uno
        que no, raramente está en los incidentes. Está en la <strong style="color:#0F172A;">visibilidad
        de su gestión ante quien decide.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG trabajamos con gerentes de seguridad bajo un modelo de cogestión donde
        la documentación y los KPIs son parte del servicio — no trabajo adicional para usted.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_3: {
    subject: 'De "centro de costos" a "activo estratégico": un caso real en Caracas',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">El desafío:</strong> Un gerente de seguridad de una organización
        internacional en Chacao llegó a la reunión anual de renovación con un contrato en riesgo.
        Su directivo regional, recién llegado de sede central, solicitó el reporte de KPIs del año,
        el registro de incidentes con resolución documentada y la evidencia de alineación con OSAC.
        No existía ninguno de los tres.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">La intervención:</strong> CSSG implementó cogestión operativa
        bajo su dirección durante 60 días: Informe Ejecutivo Mensual con su firma, Dashboard de KPIs
        en tiempo real y alineación documental con los estándares OSAC e ISO 31000.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#10B981;">El resultado:</strong> Contrato renovado con aumento
        presupuestario del 15%. El directivo regional presentó el modelo de gestión como
        referencia para otras sedes de la región. El gerente pasó de estar en riesgo de no
        renovación a ser propuesto como modelo de buenas prácticas.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Este es exactamente el tipo de trabajo que hacemos en CSSG: operar bajo su mando,
        hacerlo brillar ante su directivo.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_4: {
    subject: 'Muestra gratuita: así luce el Informe Ejecutivo Mensual que usamos',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Queremos mostrarle algo concreto. El Informe Ejecutivo Mensual que entregamos a nuestros
        clientes tiene una característica que los gerentes de seguridad valoran especialmente:
        <strong style="color:#0F172A;">lleva el nombre del gerente, no el de CSSG.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Dos páginas, lenguaje ejecutivo, KPIs visuales y resumen de gestión listo para
        presentar ante cualquier directivo. Es el documento que hace que quien lo firma
        sea percibido como el estratega — no el responsable de guardias.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si quiere ver un ejemplo del formato, responda a este correo y le envío una muestra
        en menos de 24 horas. Sin compromiso.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        También puede solicitar una sesión de 15 minutos para ver el Dashboard de KPIs
        en tiempo real — el mismo que usamos con organizaciones internacionales en Chacao y Baruta.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=Muestra%20Informe%20Ejecutivo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Solicitar muestra del Informe
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_5: {
    subject: 'Cada mes sin KPIs documentados es un mes más cerca de perder la renovación',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si su próxima reunión de renovación de contrato es en los próximos 6 meses,
        el tiempo para construir un historial de gestión documentada se está acabando.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Los directivos y embajadores que aprueban contratos de seguridad en 2026 no solo
        preguntan "¿hubo incidentes?". Preguntan: ¿tiene alineación con OSAC?,
        ¿puede mostrarme el dashboard de KPIs?, ¿está su gestión documentada bajo ISO 31000?
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Un gerente de seguridad que llega a esa reunión con documentación sólida bajo su
        nombre renueva. Uno que llega con buenas intenciones pero sin evidencia pierde —
        <strong style="color:#0F172A;">incluso si no hubo ningún incidente en el año.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG podemos implementar el sistema de cogestión y documentación en 30 días.
        ¿Le interesa una conversación de 15 minutos esta semana?
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=Conversacion%2015%20min%20-%20BP1" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Agendar 15 minutos
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_6: {
    subject: '¿Conversamos 15 minutos esta semana? — De colega a colega',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Le he escrito en las últimas semanas sobre documentación de gestión, KPIs y
        renovación de contratos — temas que creo son relevantes para cualquier gerente
        de seguridad en Venezuela en 2026.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No es un pitch de ventas. Es una conversación entre dos profesionales del sector
        de seguridad. En CSSG tenemos un modelo de cogestión que ha funcionado con
        organizaciones internacionales en Chacao y Baruta, y quiero contarle cómo
        funciona en 15 minutos — usted decide si tiene sentido para su contexto.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si no es el momento adecuado, lo entiendo completamente. Pero si tiene
        15 minutos esta semana, le invito a que hablemos.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=15%20min%20-%20cogestión" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Proponer horario
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  // ── BP2 OUTBOUND: Ana Castillo — La Administradora (5 emails) ──────────
  // REGLA CRÍTICA: CERO términos técnicos de seguridad. Precio fijo, sencillez, rapidez.

  bp2_outbound_1: {
    subject: '¿Alguien puede explicarle ese cargo extra de la última factura de seguridad?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Según estudios del sector en Venezuela, el 70% de las empresas y edificios
        paga un promedio de 30% más de lo que debería en sus servicios de vigilancia
        y seguridad. Y la mayoría no lo sabe — porque nadie se lo explica claramente.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Las facturas llegan con cargos de "supervisión adicional", "horas extra de protocolo"
        o "mantenimiento de equipos" sin que nadie haya aprobado esos servicios previamente.
        Cuando se llama para preguntar, la respuesta es vaga o simplemente nadie contesta.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No debería funcionar así. Una empresa seria le entrega una factura de 3 renglones,
        un precio fijo mensual sin sorpresas, y contesta cuando la llaman.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_2: {
    subject: 'El fin de semana en que la empresa de seguridad no contestó',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Son las 11 PM de un sábado. Un propietario llama para reportar que el guardia del
        turno nocturno no aparece por los pasillos desde hace dos horas. Usted llama a la
        empresa de seguridad. Nadie contesta. El lunes le explican que hubo "un problema
        de turno" — y que viene reflejado en la factura del mes con un cargo adicional.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Esta situación la vivió más de la mitad de los administradores en Caracas el año pasado.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG tenemos supervisión en tiempo real — usted puede ver desde su teléfono
        dónde está cada guardia, cuándo hizo cada ronda. Y si llama, le contestamos.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_3: {
    subject: 'Cómo un edificio en Caracas redujo su factura de seguridad en un 38%',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">El problema:</strong> Un edificio residencial en el este
        de Caracas llevaba 2 años con la misma empresa de vigilancia. La factura subía cada
        trimestre con cargos que la administradora no podía explicar ante la junta de propietarios.
        Los guardias raramente completaban las rondas. Cuando había un problema, tardaban 40 minutos
        en responder.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">Lo que hicimos:</strong> Un diagnóstico gratuito de
        30 minutos reveló que el edificio pagaba por servicios que no recibía. Implementamos
        supervisión en tiempo real y precio fijo mensual con contrato de 3 renglones.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#10B981;">El resultado:</strong> 38% de reducción en la factura
        mensual sin reducir el personal. El reporte mensual de 1 página que la administradora
        puede reenviar directamente a la junta sin editar. Cero llamadas sin respuesta desde entonces.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_4: {
    subject: 'Diagnóstico gratuito: ¿cuánto está pagando de más? (5 minutos, 8 preguntas)',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Tenemos una herramienta gratuita que en 8 preguntas y 5 minutos le dice
        si su servicio de vigilancia actual está dentro del rango correcto de precio
        y calidad para Venezuela.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        El resultado llega en semáforo: <strong style="color:#10B981;">verde</strong> si
        todo está bien, <strong style="color:#EAB308;">amarillo</strong> si hay oportunidades
        de mejora, <strong style="color:#EF4444;">rojo</strong> si hay cobros que deberían
        revisarse de inmediato.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No le pedimos datos confidenciales ni nombre de su empresa. Solo 8 preguntas
        sobre cómo funciona su servicio actualmente.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="https://cssg-global.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Hacer el diagnóstico gratuito
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_5: {
    subject: 'Cada mes sin revisar su factura de seguridad es dinero que no vuelve',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si paga, por ejemplo, $800 al mes en vigilancia y está pagando un 30% de más,
        eso son <strong style="color:#0F172A;">$2,880 al año</strong> que salen de su
        presupuesto sin justificación.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No importa si lleva 1 año o 5 años con el mismo proveedor — nunca es tarde para
        hacer una revisión. El diagnóstico gratuito que le ofrecemos no requiere cambiar
        de empresa ni firmar nada. Solo le muestra si lo que paga corresponde a lo que recibe.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si quiere que un especialista lo revise directamente con usted, puede escribirnos
        a este correo o solicitar una llamada de 15 minutos.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=Revisión%20factura%20seguridad" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Solicitar revisión gratuita
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  // ── BP3 OUTBOUND: Julio Marval — El Estratega (5 emails) ───────────────
  // REGLA CRÍTICA: Inglés técnico obligatorio. ESRM, DSS, OSAC, ISO 31000, CPP.

  bp3_outbound_1: {
    subject: 'When your Venezuelan vendor fails the DSS audit — and you weren\'t warned',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The most common compliance gap we see in LATAM security operations is not an
        operational failure — it's a <strong style="color:#0F172A;">documentation gap
        that surfaces during the DSS or OSAC review cycle.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Local vendors in Venezuela can operate competently on the ground. But when HQ
        requests the post-incident report in English, the OSAC self-assessment, or the
        ISO 31000-aligned risk register, the gap becomes visible — and it's the Security
        Manager who answers for it, not the vendor.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        In 2026, OSAC regional priorities for Venezuela have shifted. Security operations
        that aren't already aligned with the updated DSS compliance checklist are running
        a documentation risk that won't surface until the review is already underway.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_2: {
    subject: 'Is your Venezuela security operation HQ-ready today?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        One question that exposes most LATAM security programs:
      </p>
      <p style="color:#0F172A;font-size:16px;line-height:1.7;margin:0 0 16px;font-weight:600;font-style:italic;">
        "If HQ scheduled an unannounced DSS review for next week, how much of your
        Venezuela documentation is already in English and ready for submission?"
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        For most Security Managers operating in Venezuela, the honest answer involves
        at least 2-3 weeks of documentation work before they'd feel confident. That's
        the window where a compliance gap can damage a career.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        At CSSG, we work embedded with LATAM Security Managers as a co-managed ESRM
        partner. Our SC1 Compliance Package keeps your Venezuela operation continuously
        HQ-ready: DSS checklist, OSAC self-assessment, and ISO 31000 risk register —
        in English, updated monthly, ready for submission.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_3: {
    subject: 'How we helped a LATAM CSO pass DSS review after a failed first attempt',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">The challenge:</strong> A LATAM Security Manager
        for a multinational with Venezuela operations failed the first DSS compliance
        review due to documentation gaps — post-incident reports not in English, no
        OSAC self-assessment on file, and a risk register that didn't align with
        ISO 31000 framework requirements.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">The intervention:</strong> CSSG deployed our SC1
        Compliance Package, rebuilding the documentation layer from the ground up:
        bilingual post-incident reporting (4-hour SLA), OSAC-aligned self-assessment,
        and monthly KPI dashboard formatted for HQ submission.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#10B981;">The result:</strong> Passed the DSS review in the
        second cycle. Regional HQ adopted the documentation model as the standard for
        other LATAM offices. The Security Manager earned recognition from the regional
        CSO — and their compliance framework survived their own rotation 18 months later.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_4: {
    subject: 'Sample SC1 Compliance Package: DSS/OSAC/ISO 31000 ready for HQ review',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        We'd like to show you exactly what the SC1 Compliance Package looks like
        in practice — not a brochure, but the actual document structure your HQ
        security audit would receive from us.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The package includes: DSS compliance checklist (Venezuela-specific), OSAC
        self-assessment formatted for submission, ISO 31000 risk register with
        monthly update cycle, and post-incident report template with 4-hour SLA.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        If you'd like to see a sample, reply to this email and we'll send it within
        24 hours. No forms, no sales calls required — just the document.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        We also have an ESRM Readiness Assessment (12-point self-diagnostic) available
        if you'd like to benchmark your current Venezuela operation before we connect.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=SC1%20Sample%20Request" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Request SC1 Sample
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_5: {
    subject: 'The 90-day window: what most Security Managers don\'t realize until it\'s gone',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The first 90 days in a new security leadership role are the highest-leverage
        window you'll ever have — and the shortest. During that window, you set the
        compliance baseline, choose your vendors, and establish the documentation
        standard that your successor will inherit.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        After 90 days, whatever isn't built is assumed to not exist when HQ asks.
        And the cost of rebuilding it during an active compliance review cycle is
        significantly higher — in time, in reputation, and in internal political capital.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        If you're within your first year in your current role and your Venezuela
        operation doesn't yet have a continuously HQ-ready documentation layer,
        we should talk. I'd rather have a 15-minute call now than you deal with
        a compliance gap during your review cycle.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=15-min%20call%20-%20Venezuela%20compliance" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Schedule 15-minute call
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  // ── BP4 OUTBOUND: Carlos Mendoza — El Venezolano Global (4 emails) ─────
  // REGLA CRÍTICA: "Coordinado desde Miami, ejecutado en Caracas". Sin terminología corporativa.

  bp4_outbound_1: {
    subject: 'El ejecutivo venezolano que llegó a Maiquetía sin que nadie lo esperara',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En 2024, un ejecutivo venezolano radicado en Miami tomó un vuelo de negocios
        a Caracas. Llegó a Maiquetía a las 10 PM, sin coordinación previa, en un taxi
        que tomó en la terminal sin verificar. Entre el aeropuerto y el hotel, fue
        víctima de un secuestro exprés que le costó $4,200 y tres horas de su vida.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        No era la primera vez que viajaba a Venezuela. Conocía los riesgos.
        Pero esa noche "lo manejó como siempre" — improvisando.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Cada año decenas de ejecutivos venezolanos de la diáspora pasan por Venezuela
        con inversiones, propiedades o equipos locales. La mayoría improvisa la
        seguridad porque no sabe que existe otra opción coordinada desde Miami.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com · Miami, FL
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp4_outbound_2: {
    subject: '¿Qué pasaría con su equipo en Venezuela si ocurre algo ahora?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Una pregunta que la mayoría de venezolanos en Miami evita hacerse:
      </p>
      <p style="color:#0F172A;font-size:16px;line-height:1.7;margin:0 0 16px;font-weight:600;font-style:italic;">
        "Si esta noche ocurre algo que afecte a su equipo o sus activos en Venezuela,
        ¿a quién llama? ¿Cuánto tarda en responder?"
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        La realidad es que la mayoría no tiene un número de emergencia real que
        funcione a las 2 AM. Tienen el celular personal de alguien de confianza
        — que quizás contesta, quizás no.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG operamos en Caracas con respuesta 24/7 y coordinación desde Miami.
        Cuando algo ocurre con su equipo o sus activos en Venezuela, usted llama
        a un número que siempre contesta — y la respuesta ya está coordinada
        desde este lado antes de que cuelgue.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com · Miami, FL
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp4_outbound_3: {
    subject: 'Coordinado desde Miami, ejecutado en Caracas: así funciona',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">La situación:</strong> Un empresario venezolano
        radicado en Doral tenía un viaje de trabajo a Caracas con reuniones en La Castellana.
        Su última visita había sido improvisada — llegó en taxi de Maiquetía a las 8 PM
        y tardó 2 horas más de lo previsto. No quería repetirlo.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#0F172A;">Lo que coordinamos:</strong> Desde Miami activamos
        su protocolo 48 horas antes del vuelo: briefing de situación de seguridad en Caracas
        esa semana, traslado verificado desde Maiquetía con nuestro equipo esperándolo,
        y cobertura discreta durante sus reuniones. Su equipo local tuvo nuestro número
        de emergencia activo durante toda la estadía.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        <strong style="color:#10B981;">El resultado:</strong> Llegó, hizo sus reuniones,
        regresó. Sin improviso, sin stress. "Por primera vez en años salí de Venezuela
        sin la sensación de haber tenido suerte."
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com · Miami, FL
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp4_outbound_4: {
    subject: 'PDF gratuito: Protocolo de seguridad para ejecutivos que viajan a Venezuela',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Tenemos un protocolo de 2 páginas que les damos a los ejecutivos antes de
        viajar a Venezuela. Cubre lo que debe hacer antes de salir de Miami,
        lo que no debe improvisar al llegar a Maiquetía, y el número que debe
        tener activo durante toda su estadía.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Es gratuito. No tiene forma ni registro. Solo responda a este correo con
        "Protocolo" y se lo enviamos de vuelta en minutos.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si además quiere conversar sobre su próximo viaje o la situación de su
        equipo en Venezuela, coordinamos una llamada de 15 minutos desde Miami
        cuando sea conveniente para usted.
      </p>
      <div style="text-align:left;margin:24px 0;">
        <a href="mailto:gerencia@globalservices-ven.com?subject=Protocolo%20Venezuela" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
          Solicitar protocolo gratuito
        </a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">
        CSSG — gerencia@globalservices-ven.com · cssg-global.com · Miami, FL
      </p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
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
  const template = sequenceTemplates[templateKey];
  if (!template) {
    console.warn(`[Sequence Email] Template no encontrado: ${templateKey}`);
    return { success: false, error: 'Template no encontrado' };
  }

  try {
    const res = await fetch(EMAIL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'sequence',
        email: to,
        nombre,
        empresa,
        templateKey,
        subject: typeof template.subject === 'function' ? template.subject(nombre, empresa) : template.subject,
        html: template.html(nombre, empresa),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Sequence Email] Error del servidor:', err);
      return { success: false, error: err };
    }

    console.info(`[Sequence Email] ✅ Enviado: ${templateKey} → ${to}`);
    return { success: true };
  } catch (err) {
    console.error('[Sequence Email] Error de red:', err);
    return { success: false, error: 'Error de red' };
  }
}

