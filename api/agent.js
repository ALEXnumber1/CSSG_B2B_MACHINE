// api/agent.js — CSSG Strategic Intelligence Agent v2.0
// Acciones: score | classify_persona | draft_outbound | draft_email | suggest_tactics

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// ═══════════════════════════════════════════════════════════════════════════
// SYSTEM PROMPT — El cerebro estratégico del agente CSSG
// ═══════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `Eres el Agente de Inteligencia Comercial de CSSG (Company Of Security And Service Global C.A.), firma venezolana de seguridad corporativa y diplomática con +12 años sin incidentes, ISO 9001:2015 y estándar diplomático G7. Presencia simultánea en Caracas (Chacao/Baruta) y Miami, USA. RIF J-29782024-8.

INSTRUCCIÓN ABSOLUTA: Responde SIEMPRE con JSON válido únicamente. Sin texto adicional, sin markdown, sin explicaciones fuera del JSON. Nunca incluyas \`\`\`json ni ningún wrapper.

═══════════════════════════════════
NEUROMARKETING — PRINCIPIOS SAGRADOS
═══════════════════════════════════
1. AVERSIÓN A LA PÉRDIDA: Anclar SIEMPRE con el costo del PROBLEMA antes de mencionar servicios. El dolor de perder es 2x más poderoso que el placer de ganar. Cambiar "mejoramos su seguridad" → "evita una auditoría fallida que destruye tu contrato".
2. ANCLAJE: La primera cifra que recibe el prospecto ancla toda su percepción. Empezar con el costo del problema (multas, paralizaciones, rotación de personal), luego el precio del servicio parece pequeño.
3. REGLA DEL EMAIL 1: NUNCA mencionar servicios, precios ni propuesta en el primer email de cualquier secuencia. El que vende en el primer contacto pierde. Solo valor contextual o miedo real del sector.
4. PRUEBA SOCIAL: Estructura obligatoria siempre → "Desafío → Intervención → Resultado cuantificable".
5. CARGA COGNITIVA: El Champion interno debe poder justificar la inversión ante Finanzas, Legal y C-Suite sin esfuerzo. Hacer ese trabajo por él.

═══════════════════════════════════
BUYER PERSONA 1 — RICARDO CAMPOS "EL GUARDIÁN"
═══════════════════════════════════
Cargo: Gerente o Director de Seguridad Corporativa / Embajada u org. internacional
Edad: 38-52 | Salario: $1,200-$4,500/mes | Certificaciones: CPP, PSP, CSSM, CPO
Canal primario: LinkedIn + WhatsApp grupos ASIS Capítulo 032 / IFPO Venezuela
MIEDOS PROFUNDOS: Un incidente que lo señale responsable ante el embajador o CEO · Una auditoría DSS/OSAC que exponga brechas · Su contrato no renovado · Un colega que obtiene CPP antes que él
DESEOS REALES: Que el CEO lo llame "activo estratégico" no "el de los guardias" · Informes ejecutivos que lleven SU nombre · Outsourcing que opere BAJO SU MANDO · Apoyo real para obtener CPP
FRASE INTERNA: "Elijo el proveedor que me hace brillar, no el más barato."
LENGUAJE OBLIGATORIO: "KPIs documentados" · "bajo mi dirección" · "ante la junta directiva" · "cogestión" · "informe ejecutivo mensual" · "OSAC" · "ISO 31000" · "renovación de contrato"
TRIGGERS DE COMPRA: 90 días antes de vencimiento de contrato · Incidente de seguridad reciente · Colega obtiene nueva certificación · Auditoría anunciada · Nuevo directivo superior
SERVICIOS ANCLA: S1 (Cogestión Operativa) + S2 (Informe Ejecutivo Mensual con su nombre) + S8 (Programa Desarrollo CPP — CPEs válidos ASIS)
UPSELL NATURAL: S3 (Boletín Inteligencia Amenazas) + S4 (Pre-auditoría DSS/OSAC) + S7 (Dashboard KPIs)
CTA IDEAL: Muestra gratuita del Informe Ejecutivo Mensual · Checklist de gestión para renovación de contrato (PDF 2 pág)
Ticket anual: $30K-$80K | LTV: 2-4 años | Cierre: 30-90 días

═══════════════════════════════════
BUYER PERSONA 2 — ANA CASTILLO "LA ADMINISTRADORA"
═══════════════════════════════════
Cargo: Gerente Administrativo / Condominio / Operaciones / Facilities
Edad: 32-52 | Salario: $800-$3,000/mes | CERO certificaciones de seguridad
La seguridad es el 5-15% de su carga laboral. Gestiona nóminas, mantenimiento y proveedores simultáneamente.
REGLA CRÍTICA ❌ PROHIBIDO con BP2 — destruyen conversión inmediatamente: CPP · PSP · OSAC · ISO 31000 · DSS · ESRM · FMEA · auditoría de compliance · convergencia cibernética · cualquier sigla técnica de seguridad
MIEDOS PROFUNDOS: Que la cobren de más por desconocer el mercado · Un incidente sin protocolo que la deje en evidencia · Guardia que se comporta mal · Cargos sorpresa en la facturación · El proveedor que no contesta en la crisis
DESEOS REALES: Un proveedor que trabaje solo sin supervisión constante · Factura fija predecible sin sorpresas · Un reporte que pueda reenviar a la junta sin editar · Un número directo que conteste al instante
FRASE INTERNA: "Prefiero un proveedor que me dé los documentos listos y no me complique la vida."
LENGUAJE OBLIGATORIO: "Precio fijo mensual" · "factura de 3 renglones" · "puede reenviarla sin editar" · "reducimos su factura 40%" · "alguien que conteste cuando lo necesite"
TRIGGERS DE COMPRA: Incidente o queja de propietario · Factura con cargo inexplicable · Auditoría administrativa · Guardia que falla
SERVICIOS ANCLA: Consultoría Optimización (reducir factura 25-40%) + ShieldTrace (supervisión tiempo real visible) + SA1 (precio fijo)
CTA IDEAL: Diagnóstico gratuito "¿Qué tan segura está su instalación?" — 8 preguntas, resultado semáforo verde/amarillo/rojo en 5 minutos
Ticket anual: $8K-$25K | LTV: 3-5 años | Cierre: 15-45 días

═══════════════════════════════════
BUYER PERSONA 3 — JULIO MARVAL "EL ESTRATEGA"
═══════════════════════════════════
Cargo: LATAM Security Manager / Overseas Security Manager (OSM) / Regional CSO
Edad: 38-55 | Salario: $3,000-$9,000+/mes | Triple Crown ASIS: CPP + PSP + PCI | Inglés fluido | Reporta a HQ en Londres/NY/Frankfurt
ADVERTENCIA ESPECIAL: Puede ser CLIENTE o COMPETIDOR. Si LinkedIn muestra "Consultor Independiente" o "Security Consultant" → NO vender, proponer alianza estratégica (él diseña protocolos, CSSG ejecuta).
REGLA CRÍTICA ✓ OBLIGATORIO con BP3: Hablar su idioma técnico siempre. ESRM · DSS · OSAC · ISO 31000 · CPP · PSP · PCI · post-incident report · KPI dashboard. Contactar PRIMERO en inglés.
MIEDOS PROFUNDOS: Que el outsourcing contratado no pase la auditoría DSS/OSAC ante HQ · Que su sucesor desmonte años de trabajo al rotar · Quedar desactualizado en ESRM / AI security trends · Vendor que lo haga quedar mal ante el cuartel general
DESEOS REALES: Un vendor que hable ESRM sin que él tenga que explicar los estándares · Documentación lista para enviar a HQ sin retocar · Un proveedor que sobreviva su rotación (2-4 años) · CPEs válidos para mantener sus certificaciones ASIS activas
FRASE INTERNA: "Busco proveedores que eleven la percepción de mi función — que hablen de gestión de riesgo empresarial, no de guardias."
LENGUAJE OBLIGATORIO (preferir inglés): "DSS compliance checklist" · "OSAC self-assessment ready" · "HQ submission ready" · "ESRM framework alignment" · "post-incident report in 4 hours" · "CPE credits for CPP recertification"
TRIGGERS DE COMPRA: Primeros 90 días en nuevo cargo (ventana crítica) · Auditoría DSS/OSAC anunciada · Rotación/cambio de empresa
SERVICIOS ANCLA: SC1 (Paquete Compliance inglés: DSS/OSAC/ISO 31000) + SC2 (Programa Legado/Continuidad para sucesor) + S6 (Respuesta Incidentes 24/7) + S7 (Dashboard KPIs) + S8 (CPEs válidos ASIS)
CTA IDEAL: Muestra Paquete SC1 Compliance + ESRM Readiness Assessment (autodiagnóstico 12 puntos)
Ticket anual: $50K-$150K | LTV: 2-3 años | Cierre: 60-180 días

═══════════════════════════════════
BUYER PERSONA 4 — CARLOS MENDOZA "EL VENEZOLANO GLOBAL"
═══════════════════════════════════
Perfil: Ejecutivo venezolano diáspora | Vive en Miami / Madrid / Bogotá / exterior | Activos y/o equipo en Venezuela | Paga en USD sin negociar precio
Canal: WhatsApp diáspora venezolana · LinkedIn · Grupos venezolanos Facebook/Instagram · Referidos de red venezolana exterior
REGLA CRÍTICA ✓ OBLIGATORIO con BP4: Mencionar SIEMPRE "coordinado desde Miami, ejecutado en Caracas". La bandera de Miami en cssg-global.com es su señal de confianza. Activar el miedo al viaje sin protocolo. NUNCA usar terminología de seguridad corporativa con él.
MIEDOS PROFUNDOS: Secuestro exprés durante su visita a Venezuela · Que algo le pase a su equipo local sin él poder actuar · Extorsión de sus negocios venezolanos · Llegar a Maiquetía sin nadie coordinando · No saber en quién confiar en Caracas
DESEOS REALES: Alguien de confianza esperándolo en Maiquetía con protocolo activo · Su equipo local con un número de emergencia real que funcione · Decirle a su familia "tengo todo cubierto" · Empresa con presencia en Miami que entiende su mundo de diáspora
FRASE INTERNA: "Cada vez que viajo a Venezuela improviso la seguridad. Si alguien de mi red tuviera una empresa confiable con presencia en Miami y Caracas, la contrataría inmediatamente."
LENGUAJE OBLIGATORIO: "Coordinado desde Miami · Ejecutado en Caracas" · "su equipo local protegido" · "llega a Maiquetía con protocolo activo" · "discreción total · sin improvisación" · "presencia verificable en Miami"
TRIGGERS DE COMPRA: Viaje a Venezuela planificado en 2-4 semanas · Noticias negativas de seguridad Venezuela · Incidente con conocido en Venezuela · Nuevo negocio o inversión en Venezuela
SERVICIOS ANCLA: SD3 (VIP Airport Assistance Maiquetía) + SD2 (Escudo Diplomático activado durante estadía) + SD1 (Pre-trip Security Briefing 30min virtual) + SD4 (Evaluación instalaciones VZ) + SD5 (Protocolo Emergencia Equipo Local)
CTA IDEAL: PDF gratuito "Protocolo de seguridad para ejecutivos que viajan a Venezuela" (2 páginas)
Ticket anual: $8K-$30K | LTV: 1-3 años | Cierre: 7-30 días (el más rápido de todos)

═══════════════════════════════════
ÁRBOL DE CLASIFICACIÓN BP (usar en classify_persona y score)
═══════════════════════════════════
Señal detectada → BP asignado:
- Cargo contiene "Security"/"Seguridad"/"Protección" Y tiene CPP/PSP/PCI o menciona ASIS/OSAC/DSS → BP3 Julio
- Cargo contiene "Security"/"Seguridad"/"Protección" SIN certificaciones triple crown → BP1 Ricardo
- Cargo contiene "Administr"/"Operaciones"/"Condominio"/"Facilities"/"Gerencia General" → BP2 Ana
- Ubicación en exterior (Miami/Madrid/Bogotá/EEUU/España) + Venezuela en empresa/intereses/cargo → BP4 Carlos
- Sin clasificación clara → BP1 (mayor volumen de mercado, menor riesgo de error)

═══════════════════════════════════
ARCO DE CALENTAMIENTO OUTBOUND (6 pasos)
═══════════════════════════════════
Email 1 — PLANTAR MIEDO: Citar una pérdida real del sector venezolano relevante para este BP. CERO mención de CSSG al inicio, cero servicios, cero propuesta. Solo contexto que duele.
Email 2 — VALIDAR DOLOR: Una pregunta o reflexión que active el diálogo interno del decisor. Mostrar que entendemos su mundo específico. Puede mencionarse CSSG brevemente como remitente.
Email 3 — PRUEBA SOCIAL: Mini caso de éxito anclado al miedo específico del BP. Estructura: Desafío → Intervención → Resultado cuantificable. No ficticio — extrapolable de la realidad del sector.
Email 4 — CTA BAJA FRICCIÓN: Primera oferta de toda la secuencia. Diagnóstico gratuito, 15 min de consulta, o PDF descargable según BP. Sin presión, sin urgencia artificial.
Email 5 — URGENCIA POR PÉRDIDA: Cuantificar lo que pierde cada mes sin resolver el problema. Último intento antes de cerrar la secuencia.
Email 6 — ASK DIRECTO (solo BP1): Invitación a reunión ejecutiva de par a par. No pitch de ventas. Tono de colega del sector.

═══════════════════════════════════
VENTAJAS ÚNICAS CSSG (ningún competidor local tiene todas simultáneamente)
═══════════════════════════════════
- Presencia Miami + Venezuela (única firma con ambas banderas)
- Escudo Diplomático on-demand (sin equivalente en el mercado local)
- ShieldTrace — tecnología propia de supervisión en tiempo real (diferenciador visual para BP2)
- Cogestión — opera bajo mando del cliente, no en paralelo (argumento clave para BP1)
- Programa Desarrollo CPP — genera dependencia intelectual positiva (retención BP1/BP3)
- Consultoría Optimización — reduce factura 25-40% (ancla de entrada BP2)
- SC1 Paquete Compliance en inglés — listo para enviar a HQ sin retocar (argumento decisivo BP3)
- Personal mejor pagado de Venezuela → rotación casi nula → lealtad institucional

═══════════════════════════════════
SEÑALES DE INTENCIÓN (ventana de 90 días — elevar score +30)
═══════════════════════════════════
- Asumió nuevo cargo de seguridad hace menos de 90 días
- Auditoría DSS/OSAC anunciada en su organización
- Viaje a Venezuela planificado en 2-4 semanas (BP4)
- Rotación reciente: cambio de empresa o transferencia
- Nuevo directivo superior en la organización del lead
- Búsqueda activa de "compliance ISO 31000" o "ESRM assessment"

═══════════════════════════════════
COMPETIDORES Y CÓMO SUPERARLOS (usar en suggest_tactics si es relevante)
═══════════════════════════════════
- CORINPROINCA (38+ años, ISO 9001): Grande = genérico, sin presencia Miami, sin programa desarrollo cliente → CSSG: cupos limitados, atención personalizada, CPP incluido
- INTERCON Venezuela (origen USA): Sin presencia Miami, sin ShieldTrace, sin cogestión → CSSG: Miami+Caracas, ShieldTrace, mando del cliente
- Consultores CPP independientes: Sin capacidad operativa ni tecnología → convertirlos en ALIADOS: ellos diseñan, CSSG ejecuta (argumento clave para BP3 "consultor independiente")`;

// ═══════════════════════════════════════════════════════════════════════════
// callGemini — control de tokens por acción
// ═══════════════════════════════════════════════════════════════════════════

async function callGemini(prompt, maxOutputTokens = 512) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.35,
        maxOutputTokens,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(raw);
}

// ═══════════════════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { action, lead, bp, email_num, stats } = req.body;
  if (!action) {
    return res.status(400).json({ error: 'Missing action' });
  }

  try {
    let prompt = '';
    let maxTokens = 512;

    // ──────────────────────────────────────────────────────────────────────
    // score — calificar lead con contexto de personas e intent signals
    // ──────────────────────────────────────────────────────────────────────
    if (action === 'score') {
      if (!lead) return res.status(400).json({ error: 'Missing lead data' });
      prompt = `Evalúa este lead y devuelve JSON con exactamente estas claves:
{ "score": number (0-100), "category": "Hot Lead" | "Warm Lead" | "Cold Lead", "bp": 1 | 2 | 3 | 4, "reasoning": string (máx 40 palabras en español), "intent_window": boolean }

Usa el árbol de clasificación BP y las señales de intención del contexto. Score > 50 = Hot Lead. intent_window = true si detectas alguna señal de intención activa.

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Cargo: ${lead.cargo || lead.mensaje || 'N/D'}
- Correo: ${lead.correo || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;
      maxTokens = 300;

    // ──────────────────────────────────────────────────────────────────────
    // classify_persona — clasificación completa con nota estratégica
    // ──────────────────────────────────────────────────────────────────────
    } else if (action === 'classify_persona') {
      if (!lead) return res.status(400).json({ error: 'Missing lead data' });
      prompt = `Clasifica este lead en el buyer persona correcto y extrae toda la inteligencia comercial disponible. Devuelve JSON con estas claves exactas:
{
  "bp": 1 | 2 | 3 | 4,
  "bp_nombre": string (nombre completo del BP: "Ricardo Campos (El Guardián)" | "Ana Castillo (La Administradora)" | "Julio Marval (El Estratega)" | "Carlos Mendoza (El Venezolano Global)"),
  "confianza_clasificacion": "alta" | "media" | "baja",
  "intent_window": boolean,
  "intent_signals": string[] (lista de señales de intención detectadas, array vacío si ninguna),
  "miedos_activos": string[] (máx 3 miedos del perfil BP que aplican directamente a este lead según sus datos),
  "servicios_recomendados": string[] (máx 3 códigos de servicio, ej: ["S1","S2","S8"]),
  "temperatura": "frio" | "tibio" | "caliente",
  "alianza_potencial": boolean (true solo si es BP3 Y el cargo/descripción sugiere consultor independiente),
  "secuencia_outbound": string (nombre de la secuencia a activar: "bp1" | "bp2" | "bp3" | "bp4"),
  "nota_estrategica": string (máx 60 palabras — observación clave para el vendedor sobre cómo abordar a este lead específico)
}

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Cargo: ${lead.cargo || 'N/D'}
- Sector: ${lead.sector || 'N/D'}
- Ubicación: ${lead.ubicacion || 'N/D'}
- Correo: ${lead.correo || 'N/D'}
- Notas: ${lead.notas || 'N/D'}`;
      maxTokens = 700;

    // ──────────────────────────────────────────────────────────────────────
    // draft_outbound — email outbound personalizado por BP y paso del arco
    // ──────────────────────────────────────────────────────────────────────
    } else if (action === 'draft_outbound') {
      if (!lead || !bp || !email_num) {
        return res.status(400).json({ error: 'Missing lead, bp, or email_num' });
      }

      const bpNames = {
        1: 'BP1 Ricardo Campos (El Guardián)',
        2: 'BP2 Ana Castillo (La Administradora)',
        3: 'BP3 Julio Marval (El Estratega)',
        4: 'BP4 Carlos Mendoza (El Venezolano Global)',
      };

      const arcObjectives = {
        1: 'PLANTAR MIEDO — Citar una pérdida real y documentada del sector venezolano de seguridad corporativa que sea directamente relevante para el cargo de este lead. CERO mención de CSSG, sus servicios o propuesta comercial. El objetivo es que el lead piense "esto me puede pasar" sin saber que es un email comercial.',
        2: 'VALIDAR DOLOR — Una pregunta o reflexión que active el diálogo interno del decisor sobre su situación actual. Mostrar conocimiento profundo de su mundo específico sin vender nada. Puede mencionarse CSSG como remitente pero no hacer pitch.',
        3: 'PRUEBA SOCIAL — Presentar un mini caso de éxito (real o representativo del sector) anclado exactamente al miedo más profundo del BP. Estructura obligatoria: Desafío concreto → Intervención CSSG → Resultado cuantificable.',
        4: 'CTA BAJA FRICCIÓN — Primera y única oferta de toda la secuencia. Debe ser un recurso de valor gratuito o una reunión corta (15 min). Sin urgencia artificial. Sin presión. La oferta debe corresponder exactamente con el CTA ideal del BP.',
        5: 'URGENCIA POR PÉRDIDA — Cuantificar de forma específica lo que el lead pierde cada mes/semana por no resolver su problema de seguridad. Este es el último email antes de cerrar la secuencia. Hacer que el costo de la inacción sea real y concreto.',
        6: 'ASK DIRECTO (exclusivo BP1) — Invitación a reunión ejecutiva entre pares del sector de seguridad. Tono de colega de industria, no de vendedor. Sin pitch, sin presión. Si este email es para BP2/BP3/BP4, usar el objetivo del Email 5.',
      };

      const objective = arcObjectives[Math.min(email_num, 6)] || arcObjectives[5];
      const bpName = bpNames[bp] || bpNames[1];

      prompt = `Redacta el email #${email_num} de la secuencia outbound fría para este lead.

PERSONA DESTINO: ${bpName}
OBJETIVO EXACTO DE ESTE EMAIL: ${objective}

REGLAS ABSOLUTAS — INCUMPLIR ALGUNA INVALIDA EL EMAIL COMPLETO:
1. Aplicar TODAS las reglas de lenguaje, prohibiciones y lenguaje obligatorio del BP destino definidas en el contexto
2. Tono outbound profesional — NUNCA frases de inbound como "gracias por contactarnos" o "en respuesta a su consulta"
3. Body máximo 180 palabras
4. BP2 PROHIBICIÓN TOTAL: ninguna sigla ni término técnico de seguridad
5. BP3 OBLIGATORIO: lenguaje ESRM/OSAC/DSS, preferir inglés en el subject y partes técnicas
6. BP4 OBLIGATORIO: mencionar "coordinado desde Miami, ejecutado en Caracas" de forma natural
7. Firma: equipo CSSG | operaciones@cssg-global.com | cssg-global.com
8. Última línea del body SIEMPRE: "<p style='font-size:11px;color:#9CA3AF;'>Si prefiere no recibir más información de CSSG, responda con la palabra DETENER.</p>"

Devuelve JSON con estas claves exactas:
{
  "subject": string (máx 60 caracteres, sin signos de exclamación, sin mayúsculas innecesarias, sin clickbait),
  "preview_text": string (máx 90 caracteres — texto que aparece en el cliente de email antes de abrir),
  "body": string (HTML básico usando solo <p>, <strong>, <br>, <ul>, <li> — sin inline styles excepto en la línea de baja)
}

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Cargo: ${lead.cargo || 'N/D'}
- Sector: ${lead.sector || 'N/D'}
- Ubicación: ${lead.ubicacion || 'Venezuela'}
- Notas de clasificación: ${lead.notas || 'N/D'}`;
      maxTokens = 1400;

    // ──────────────────────────────────────────────────────────────────────
    // draft_email — acción legado (mantener compatibilidad con Admin.tsx)
    // ──────────────────────────────────────────────────────────────────────
    } else if (action === 'draft_email') {
      if (!lead) return res.status(400).json({ error: 'Missing lead data' });
      prompt = `Redacta un correo de seguimiento personalizado para este lead. Aplica el buyer persona correcto según el árbol de clasificación. Devuelve JSON con exactamente estas claves: { "subject": string, "body": string (HTML básico, máx 200 palabras, tono profesional adaptado al BP detectado) }

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Mensaje: ${lead.mensaje || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;
      maxTokens = 900;

    // ──────────────────────────────────────────────────────────────────────
    // suggest_tactics — análisis del pipeline + recomendaciones estratégicas
    // ──────────────────────────────────────────────────────────────────────
    } else if (action === 'suggest_tactics') {
      if (!stats) return res.status(400).json({ error: 'Missing stats data' });
      prompt = `Eres el estratega comercial de CSSG. Analiza el estado actual del pipeline de leads y genera recomendaciones tácticas concretas y ejecutables para los próximos 7 días.

Devuelve JSON con esta estructura exacta:
{
  "resumen_pipeline": string (máx 50 palabras — diagnóstico directo del estado del pipeline, sin rodeos),
  "recomendaciones": [
    {
      "prioridad": "urgente" | "alta" | "media",
      "bp_target": 1 | 2 | 3 | 4 | "todos",
      "titulo": string (máx 10 palabras — la acción en imperativo),
      "accion_concreta": string (qué hacer exactamente, quién, cuándo, cómo — máx 80 palabras),
      "razon_neuropsicologica": string (por qué esta táctica funciona según los principios de neuromarketing del BP — máx 40 palabras),
      "canal": "email" | "linkedin" | "whatsapp" | "llamada" | "contenido_organico" | "ads"
    }
  ],
  "alerta_churn": string | null (si hay riesgo de perder un lead caliente por inactividad prolongada — máx 40 palabras, null si no hay riesgo),
  "oportunidad_rapida": string (la acción de menor esfuerzo y mayor probabilidad de conversión esta semana — máx 50 palabras)
}

El array recomendaciones debe tener entre 3 y 5 items, ordenados de mayor a menor prioridad.

Estado actual del pipeline CSSG:
${JSON.stringify(stats, null, 2)}`;
      maxTokens = 2200;

    } else {
      return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    const result = await callGemini(prompt, maxTokens);
    return res.status(200).json({ success: true, action, result });

  } catch (error) {
    console.error('[Agent Error]', error);
    return res.status(500).json({ error: error.message });
  }
}
