import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RESEND_API_KEY = process.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = 'CSSG <operaciones@cssg-global.com>';

// ═══════════════════════════════════════════════
// SEQUENCES — mirror of src/lib/sequences.ts
// ═══════════════════════════════════════════════

const SEQUENCES = {
  contacto:   { emails: [{ day: 0, templateKey: 'contacto_1', scoreBonus: 0 }, { day: 2, templateKey: 'contacto_2', scoreBonus: 5 }, { day: 7, templateKey: 'contacto_3', scoreBonus: 10 }] },
  riesgo:     { emails: [{ day: 0, templateKey: 'riesgo_1', scoreBonus: 0 }, { day: 3, templateKey: 'riesgo_2', scoreBonus: 5 }, { day: 7, templateKey: 'riesgo_3', scoreBonus: 10 }, { day: 14, templateKey: 'riesgo_4', scoreBonus: 15 }] },
  consultoria:{ emails: [{ day: 0, templateKey: 'consultoria_1', scoreBonus: 0 }, { day: 3, templateKey: 'consultoria_2', scoreBonus: 5 }, { day: 10, templateKey: 'consultoria_3', scoreBonus: 10 }] },
  pestel:     { emails: [{ day: 0, templateKey: 'pestel_1', scoreBonus: 0 }, { day: 3, templateKey: 'pestel_2', scoreBonus: 5 }, { day: 7, templateKey: 'pestel_3', scoreBonus: 10 }] },
  escudo_diplomatico: { emails: [{ day: 0, templateKey: 'escudo_diplomatico_1', scoreBonus: 0 }] },
  // ─── Outbound BP sequences ───────────────────────────────────────────────
  bp1: { emails: [
    { day: 0,  templateKey: 'bp1_outbound_1', scoreBonus: 0  },
    { day: 2,  templateKey: 'bp1_outbound_2', scoreBonus: 5  },
    { day: 6,  templateKey: 'bp1_outbound_3', scoreBonus: 10 },
    { day: 13, templateKey: 'bp1_outbound_4', scoreBonus: 15 },
    { day: 20, templateKey: 'bp1_outbound_5', scoreBonus: 5  },
    { day: 29, templateKey: 'bp1_outbound_6', scoreBonus: 10 },
  ]},
  bp2: { emails: [
    { day: 0,  templateKey: 'bp2_outbound_1', scoreBonus: 0  },
    { day: 2,  templateKey: 'bp2_outbound_2', scoreBonus: 5  },
    { day: 6,  templateKey: 'bp2_outbound_3', scoreBonus: 10 },
    { day: 13, templateKey: 'bp2_outbound_4', scoreBonus: 15 },
    { day: 20, templateKey: 'bp2_outbound_5', scoreBonus: 5  },
  ]},
  bp3: { emails: [
    { day: 0,  templateKey: 'bp3_outbound_1', scoreBonus: 0  },
    { day: 4,  templateKey: 'bp3_outbound_2', scoreBonus: 5  },
    { day: 9,  templateKey: 'bp3_outbound_3', scoreBonus: 10 },
    { day: 17, templateKey: 'bp3_outbound_4', scoreBonus: 15 },
    { day: 27, templateKey: 'bp3_outbound_5', scoreBonus: 10 },
  ]},
  bp4: { emails: [
    { day: 0,  templateKey: 'bp4_outbound_1', scoreBonus: 0  },
    { day: 3,  templateKey: 'bp4_outbound_2', scoreBonus: 5  },
    { day: 9,  templateKey: 'bp4_outbound_3', scoreBonus: 10 },
    { day: 19, templateKey: 'bp4_outbound_4', scoreBonus: 15 },
  ]},
};

// ═══════════════════════════════════════════════
// HTML BASE TEMPLATE
// ═══════════════════════════════════════════════

function baseTemplate(content) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
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

// ═══════════════════════════════════════════════
// EMAIL TEMPLATES — mirror of src/lib/email.ts
// ═══════════════════════════════════════════════

const EMAIL_TEMPLATES = {

  // ── INBOUND ──────────────────────────────────

  contacto_1: {
    subject: (nombre, empresa) => `[EVALUACIÓN] Solicitud de Seguridad para ${empresa || 'su organización'} — Hola ${nombre}`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Hemos recibido la información de su solicitud${empresa ? ` en representación de <strong>${empresa}</strong>` : ''}.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Un Especialista Senior revisará sus requerimientos y le contactará en las próximas 24 horas hábiles.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">
          Diagnosticar mis vulnerabilidades (ISO 31000)
        </a>
      </div>
    `),
  },
  contacto_2: {
    subject: '¿Sabía que el 60% cambia de proveedor? — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">El <strong>60% de las empresas en Venezuela</strong> cambia de proveedor de seguridad en los primeros 12 meses. ¿La razón? Rotación de personal, falta de supervisión y reportes que nunca llegan.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/blog/como-elegir-empresa-seguridad-privada-venezuela" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Leer la guía completa</a>
      </div>
    `),
  },
  contacto_3: {
    subject: 'Su consulta gratuita con un experto le espera — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">${nombre}, un último paso.</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Con <strong>+17 años protegiendo embajadas del G7</strong> sin un solo incidente, su seguridad está en las mejores manos.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Agendar consulta gratuita</a>
      </div>
    `),
  },

  riesgo_1: {
    subject: (nombre, empresa) => `📋 Su informe de vulnerabilidades para ${empresa || 'su organización'} está listo — CSSG`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">El informe preliminar de vulnerabilidades${empresa ? ` para <strong>${empresa}</strong>` : ''} ha sido generado.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Agende una sesión gratuita de 15 minutos para interpretar los resultados y conocer cómo reducir hasta un 40% sus costos actuales en seguridad.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">Agendar Sesión Gratuita</a>
      </div>
    `),
  },
  riesgo_2: {
    subject: '3 acciones inmediatas para mejorar su score de seguridad — CSSG',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Después de analizar su evaluación${empresa ? ` para <strong>${empresa}</strong>` : ''}, estas son las 3 acciones de mayor impacto:</p>
      <ol style="color:#334155;font-size:14px;line-height:2;padding-left:20px;">
        <li><strong>Verificar el perímetro:</strong> Cercos, iluminación y sensores</li>
        <li><strong>Auditar la supervisión:</strong> GPS de rondas y reportes diarios</li>
        <li><strong>Actualizar protocolos:</strong> Plan de emergencia con simulacros</li>
      </ol>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Solicitar consultoría gratuita</a>
      </div>
    `),
  },
  riesgo_3: {
    subject: 'Caso de éxito: cómo protegemos embajadas del G7 — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;"><strong>+17 años. Cero incidentes.</strong> Protegiendo delegaciones diplomáticas del G7 en Venezuela.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;"><strong>Cero rotación de personal.</strong> Pagamos los mejores salarios del sector — los mismos oficiales protegen la misma instalación durante años.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/quienes-somos" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Conocer nuestra historia</a>
      </div>
    `),
  },
  riesgo_4: {
    subject: 'Oferta exclusiva: auditoría de seguridad completa — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">${nombre}, última oportunidad.</h2>
      <div style="background-color:#10B98115;border:1px solid #10B98130;border-radius:12px;padding:20px;margin:16px 0;text-align:center;">
        <p style="color:#10B981;font-size:18px;font-weight:700;margin:0 0 8px;">Consulta inicial sin costo</p>
        <p style="color:#64748B;font-size:13px;margin:0;">Válida por 30 días desde este correo</p>
      </div>
      <div style="text-align:center;margin-top:20px;">
        <a href="https://globalservices-ven.com/consultoria" style="display:inline-block;background-color:#10B981;color:#FFFFFF;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Agendar mi auditoría</a>
      </div>
    `),
  },

  consultoria_1: {
    subject: (nombre, empresa) => `📅 Pre-entrevista confirmada para ${empresa || 'su organización'} — CSSG`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Hemos recibido su solicitud de pre-entrevista${empresa ? ` para <strong>${empresa}</strong>` : ''}. Un Consultor Senior evaluará su contexto y le contactaremos para acordar horario.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Tasa de éxito del <strong style="color:#10B981;">80% en proyectos críticos de seguridad</strong>. Su proyecto está en manos de profesionales certificados.</p>
    `),
  },
  consultoria_2: {
    subject: '80% de éxito en proyectos de seguridad — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Nuestra tasa de éxito del <strong>80% en licitaciones y proyectos</strong> se debe a que cada propuesta está respaldada por nuestra certificación ISO 9001:2015.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/blog/iso-9001-seguridad-privada-importancia" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Leer artículo</a>
      </div>
    `),
  },
  consultoria_3: {
    subject: 'Recordatorio: su consulta personalizada — CSSG',
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">${nombre}, no queremos que pierda esta oportunidad.</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Su solicitud${empresa ? ` para <strong>${empresa}</strong>` : ''} sigue abierta. Un consultor senior está disponible para diseñar una solución a la medida de su operación.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=Consulta%20personalizada" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Responder ahora</a>
      </div>
    `),
  },

  pestel_1: {
    subject: (nombre, empresa) => `📚 Informe PESTEL 2026 listo para ${empresa || 'su organización'} — CSSG`,
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Gracias por solicitar el <strong>Informe de Seguridad Venezuela 2026</strong>. Este reporte evalúa las 6 dimensiones PESTEL que impactan el panorama corporativo de seguridad en el país.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;">Evaluar mis vulnerabilidades</a>
      </div>
    `),
  },
  pestel_2: {
    subject: '5 errores de seguridad que cometen las empresas en Caracas — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">Hola ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;"><strong>5 errores que vemos en el 70% de las empresas que auditamos en Caracas</strong> — y las soluciones concretas para cada uno.</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/blog/5-errores-seguridad-corporativa" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Leer los 5 errores</a>
      </div>
    `),
  },
  pestel_3: {
    subject: 'Análisis personalizado para su empresa — CSSG',
    html: (nombre) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:22px;margin:0 0 16px;">${nombre}, dé el siguiente paso.</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">El Informe PESTEL le dio visión macro. Ahora evalúe su organización específicamente — 8 vectores críticos, informe PDF profesional en minutos:</p>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://globalservices-ven.com/analisis-riesgo" style="display:inline-block;background-color:#0EA5E9;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Iniciar análisis gratuito</a>
      </div>
    `),
  },

  escudo_diplomatico_1: {
    subject: (nombre) => `🔒 Solicitud de Evaluación: Escudo Diplomático CSSG — Hola ${nombre}`,
    html: (nombre, empresa) => baseTemplate(`
      <h2 style="color:#0F172A;font-size:24px;margin:0 0 16px;">Estimado/a ${nombre},</h2>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Hemos recibido su solicitud para el servicio exclusivo de <strong>Escudo Diplomático</strong>${empresa ? ` en representación de <strong>${empresa}</strong>` : ''}.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;">Nuestro Comité de Evaluación revisará los datos de forma confidencial. Un Consultor Especialista Senior le contactará en 12-24 horas.</p>
      <div style="text-align:center;margin:32px 0;">
        <a href="tel:+5804241782091" style="display:inline-block;background-color:#D4AF37;color:#FFFFFF;padding:16px 36px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">Llamar a Central Operativa B2B</a>
      </div>
    `),
  },

  // ── BP1 OUTBOUND: Ricardo Campos — El Guardián ───────────────────────────

  bp1_outbound_1: {
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

  bp1_outbound_2: {
    subject: '¿Cómo documenta hoy su gestión de seguridad ante la junta directiva?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Una pregunta directa: si hoy su Director General le pidiera un reporte ejecutivo de la gestión de seguridad del último trimestre, <strong>¿cuánto tiempo le tomaría tenerlo listo?</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        La diferencia entre un gerente de seguridad que renueva su contrato año tras año y uno que no, raramente está en los incidentes. Está en la <strong>visibilidad de su gestión ante quien decide.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG trabajamos bajo un modelo de cogestión donde la documentación y los KPIs son parte del servicio — no trabajo adicional para usted.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_3: {
    subject: 'De "centro de costos" a "activo estratégico": un caso real en Caracas',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>El desafío:</strong> Un gerente de seguridad de una organización internacional en Chacao llegó a su reunión anual con el contrato en riesgo. Su directivo regional solicitó el reporte de KPIs del año, el registro de incidentes con resolución documentada y la evidencia de alineación con OSAC. No existía ninguno de los tres.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>La intervención:</strong> CSSG implementó cogestión operativa bajo su dirección durante 60 días: Informe Ejecutivo Mensual con su firma, Dashboard de KPIs en tiempo real y alineación documental con OSAC e ISO 31000.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong style="color:#10B981;">El resultado:</strong> Contrato renovado con aumento presupuestario del 15%. El directivo regional presentó el modelo como referencia para otras sedes de la región.</p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_4: {
    subject: 'Muestra gratuita: así luce el Informe Ejecutivo Mensual que usamos',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        El Informe Ejecutivo Mensual que entregamos tiene una característica que los gerentes de seguridad valoran especialmente: <strong>lleva el nombre del gerente, no el de CSSG.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Dos páginas, lenguaje ejecutivo, KPIs visuales. Es el documento que hace que quien lo firma sea percibido como el estratega — no el responsable de guardias.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Responda a este correo y le envío una muestra en menos de 24 horas. Sin compromiso.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=Muestra%20Informe%20Ejecutivo" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Solicitar muestra del Informe</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_5: {
    subject: 'Cada mes sin KPIs documentados es un mes más cerca de perder la renovación',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si su próxima reunión de renovación es en los próximos 6 meses, el tiempo para construir un historial de gestión documentada se está acabando.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Un gerente de seguridad que llega con documentación sólida bajo su nombre renueva. Uno que llega con buenas intenciones pero sin evidencia pierde — <strong>incluso si no hubo ningún incidente en el año.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">En CSSG podemos implementar el sistema de cogestión y documentación en 30 días. ¿Le interesa una conversación de 15 minutos esta semana?</p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=Conversacion%2015%20min%20-%20BP1" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Agendar 15 minutos</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp1_outbound_6: {
    subject: '¿Conversamos 15 minutos esta semana? — De colega a colega',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Le he escrito en las últimas semanas sobre documentación de gestión, KPIs y renovación de contratos. No es un pitch de ventas. Es una conversación entre dos profesionales del sector de seguridad.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG tenemos un modelo de cogestión que ha funcionado con organizaciones internacionales en Chacao y Baruta. Quiero contarle cómo funciona en 15 minutos — usted decide si tiene sentido para su contexto.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=15%20min%20-%20cogestion" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Proponer horario</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  // ── BP2 OUTBOUND: Ana Castillo — La Administradora ───────────────────────

  bp2_outbound_1: {
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

  bp2_outbound_2: {
    subject: 'El fin de semana en que la empresa de seguridad no contestó',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Son las 11 PM de un sábado. Un propietario llama para reportar que el guardia del turno nocturno no aparece desde hace dos horas. Usted llama a la empresa de seguridad. Nadie contesta. El lunes le explican que hubo "un problema de turno" — y viene reflejado en la factura del mes con un cargo adicional.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En CSSG tenemos supervisión en tiempo real — usted puede ver desde su teléfono dónde está cada guardia, cuándo hizo cada ronda. Y si llama, le contestamos.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_3: {
    subject: 'Cómo un edificio en Caracas redujo su factura de seguridad en un 38%',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>El problema:</strong> Un edificio residencial en el este de Caracas llevaba 2 años con la misma empresa. La factura subía cada trimestre con cargos que la administradora no podía explicar ante la junta de propietarios.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>Lo que hicimos:</strong> Un diagnóstico gratuito de 30 minutos reveló que el edificio pagaba por servicios que no recibía. Implementamos supervisión en tiempo real y precio fijo mensual.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong style="color:#10B981;">El resultado:</strong> 38% de reducción en la factura mensual sin reducir el personal. Reporte mensual de 1 página listo para enviar a la junta. Cero llamadas sin respuesta.</p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_4: {
    subject: 'Diagnóstico gratuito: ¿cuánto está pagando de más? (5 minutos, 8 preguntas)',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        En 8 preguntas y 5 minutos le decimos si su servicio de vigilancia está dentro del rango correcto de precio y calidad para Venezuela. El resultado llega en semáforo: verde si todo está bien, amarillo si hay mejoras, rojo si hay cobros que revisar.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">No le pedimos datos confidenciales ni nombre de empresa.</p>
      <div style="margin:24px 0;">
        <a href="https://cssg-global.com/consultoria" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Hacer el diagnóstico gratuito</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp2_outbound_5: {
    subject: 'Cada mes sin revisar su factura de seguridad es dinero que no vuelve',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado/a ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Si paga $800 al mes en vigilancia y está pagando un 30% de más, eso son <strong>$2,880 al año</strong> que salen de su presupuesto sin justificación.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Nunca es tarde para hacer una revisión. El diagnóstico gratuito no requiere cambiar de empresa ni firmar nada. Solo le muestra si lo que paga corresponde a lo que recibe.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=Revisión%20factura%20seguridad" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Solicitar revisión gratuita</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  // ── BP3 OUTBOUND: Julio Marval — El Estratega (English) ──────────────────

  bp3_outbound_1: {
    subject: "When your Venezuelan vendor fails the DSS audit — and you weren't warned",
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The most common compliance gap we see in LATAM security operations is not an operational failure — it's a <strong>documentation gap that surfaces during the DSS or OSAC review cycle.</strong>
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Local vendors in Venezuela can operate competently on the ground. But when HQ requests the post-incident report in English, the OSAC self-assessment, or the ISO 31000-aligned risk register, the gap becomes visible — and it's the Security Manager who answers for it.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        In 2026, OSAC regional priorities for Venezuela have shifted. Security operations not aligned with the updated DSS compliance checklist are running a documentation risk that won't surface until the review is already underway.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_2: {
    subject: 'Is your Venezuela security operation HQ-ready today?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#0F172A;font-size:16px;line-height:1.7;margin:0 0 16px;font-weight:600;font-style:italic;">
        "If HQ scheduled an unannounced DSS review for next week, how much of your Venezuela documentation is already in English and ready for submission?"
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        For most Security Managers in Venezuela, the honest answer involves 2-3 weeks of documentation work. That's the window where a compliance gap can damage a career.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        At CSSG, we work embedded with LATAM Security Managers as a co-managed ESRM partner. Our SC1 Compliance Package keeps your Venezuela operation continuously HQ-ready: DSS checklist, OSAC self-assessment, and ISO 31000 risk register — in English, updated monthly.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_3: {
    subject: 'How we helped a LATAM CSO pass DSS review after a failed first attempt',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>The challenge:</strong> A LATAM Security Manager for a multinational with Venezuela operations failed the first DSS compliance review due to documentation gaps — post-incident reports not in English, no OSAC self-assessment on file, and a risk register not aligned with ISO 31000.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>The intervention:</strong> CSSG deployed our SC1 Compliance Package: bilingual post-incident reporting (4-hour SLA), OSAC-aligned self-assessment, and monthly KPI dashboard formatted for HQ submission.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong style="color:#10B981;">The result:</strong> Passed DSS review in the second cycle. Regional HQ adopted the documentation model as the standard for other LATAM offices. The Security Manager earned recognition from the regional CSO.</p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_4: {
    subject: 'Sample SC1 Compliance Package: DSS/OSAC/ISO 31000 ready for HQ review',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        We'd like to show you what the SC1 Compliance Package looks like in practice — the actual document structure your HQ security audit would receive from us.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The package includes: DSS compliance checklist (Venezuela-specific), OSAC self-assessment formatted for submission, ISO 31000 risk register with monthly update cycle, and post-incident report template with 4-hour SLA.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Reply to this email and we'll send a sample within 24 hours. No forms, no sales calls required.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=SC1%20Sample%20Request" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Request SC1 Sample</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  bp3_outbound_5: {
    subject: "The 90-day window: what most Security Managers don't realize until it's gone",
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Dear ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        The first 90 days in a new security leadership role are the highest-leverage window you'll ever have. During that window, you set the compliance baseline, choose your vendors, and establish the documentation standard that your successor will inherit.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        If you're within your first year in your current role and your Venezuela operation doesn't yet have a continuously HQ-ready documentation layer, we should talk. I'd rather have a 15-minute call now than you deal with a compliance gap during your review cycle.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=15-min%20call%20-%20Venezuela%20compliance" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Schedule 15-minute call</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">If you prefer not to receive further communications from CSSG, reply with STOP.</p>
    `),
  },

  // ── BP4 OUTBOUND: Carlos Mendoza — El Venezolano Global ──────────────────

  bp4_outbound_1: {
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

  bp4_outbound_2: {
    subject: '¿Qué pasaría con su equipo en Venezuela si ocurre algo ahora?',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#0F172A;font-size:16px;line-height:1.7;margin:0 0 16px;font-weight:600;font-style:italic;">
        "Si esta noche ocurre algo que afecte a su equipo o sus activos en Venezuela, ¿a quién llama? ¿Cuánto tarda en responder?"
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        La mayoría no tiene un número de emergencia real que funcione a las 2 AM. En CSSG operamos en Caracas con respuesta 24/7 y coordinación desde Miami. Cuando algo ocurre, usted llama a un número que siempre contesta.
      </p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com · Miami, FL</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp4_outbound_3: {
    subject: 'Coordinado desde Miami, ejecutado en Caracas: así funciona',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>La situación:</strong> Un empresario venezolano en Doral tenía un viaje a Caracas con reuniones en La Castellana. Su última visita había sido improvisada — llegó en taxi de Maiquetía a las 8 PM y tardó 2 horas más de lo previsto. No quería repetirlo.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong>Lo que coordinamos:</strong> Desde Miami activamos su protocolo 48 horas antes: briefing de situación de seguridad, traslado verificado desde Maiquetía con nuestro equipo esperándolo, y cobertura discreta durante sus reuniones.</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;"><strong style="color:#10B981;">El resultado:</strong> Llegó, hizo sus reuniones, regresó. "Por primera vez en años salí de Venezuela sin la sensación de haber tenido suerte."</p>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com · Miami, FL</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },

  bp4_outbound_4: {
    subject: 'PDF gratuito: Protocolo de seguridad para ejecutivos que viajan a Venezuela',
    html: (nombre) => baseTemplate(`
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">Estimado ${nombre},</p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Tenemos un protocolo de 2 páginas que les damos a los ejecutivos antes de viajar a Venezuela. Cubre lo que debe hacer antes de salir de Miami, lo que no debe improvisar al llegar a Maiquetía, y el número que debe tener activo durante toda su estadía.
      </p>
      <p style="color:#334155;font-size:15px;line-height:1.7;margin:0 0 16px;">
        Es gratuito. Sin forma ni registro. Solo responda con la palabra "Protocolo" y se lo enviamos en minutos.
      </p>
      <div style="margin:24px 0;">
        <a href="mailto:operaciones@cssg-global.com?subject=Protocolo%20Venezuela" style="display:inline-block;background-color:#0284C7;color:#FFFFFF;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Solicitar protocolo gratuito</a>
      </div>
      <p style="color:#64748B;font-size:12px;margin:32px 0 0;">CSSG — operaciones@cssg-global.com · cssg-global.com · Miami, FL</p>
      <p style="font-size:11px;color:#9CA3AF;margin:8px 0 0;">Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>
    `),
  },
};

// ═══════════════════════════════════════════════
// SEND EMAIL
// ═══════════════════════════════════════════════

async function sendEmail(to, nombre, templateKey, empresa) {
  if (!RESEND_API_KEY) {
    console.warn('[process-sequences] VITE_RESEND_API_KEY no configurada');
    return { success: false };
  }

  const template = EMAIL_TEMPLATES[templateKey];
  if (!template) {
    console.warn(`[process-sequences] Template no encontrado: ${templateKey}`);
    return { success: false };
  }

  const subject = typeof template.subject === 'function'
    ? template.subject(nombre, empresa)
    : template.subject;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html: template.html(nombre, empresa) }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[process-sequences] Resend error (${templateKey}):`, err);
    }
    return { success: res.ok };
  } catch (err) {
    console.error(`[process-sequences] Network error (${templateKey}):`, err);
    return { success: false };
  }
}

// ═══════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
      .select('*, leads!inner(correo, nombre, empresa, emails_enviados)')
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
