/**
 * Scraper B2B — CSSG
 * 
 * Herramienta de prospección para extraer leads potenciales
 * de directorios empresariales y fuentes públicas.
 * 
 * Se ejecuta desde el panel Admin → pestaña "Prospectar".
 * El administrador ingresa un término de búsqueda o URL
 * y el sistema extrae los datos de contacto disponibles.
 * 
 * NOTA: Este scraper solo accede a información pública
 * disponible en directorios empresariales y páginas web.
 */

import { supabase } from './supabase';

// ═══════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════

export interface ScrapedLead {
  nombre: string;
  empresa: string;
  correo: string;
  telefono: string;
  cargo: string;
  sector: string;
  ubicacion: string;
  fuente_url: string;
  confianza: 'alta' | 'media' | 'baja';
}

export interface ScrapeResult {
  leads: ScrapedLead[];
  source: string;
  timestamp: string;
  errors: string[];
}

// ═══════════════════════════════════════════════
// DIRECTORIO DE FUENTES CONOCIDAS
// ═══════════════════════════════════════════════

export const SOURCES = [
  {
    id: 'manual',
    name: 'Ingreso Manual',
    description: 'Agregar leads manualmente uno por uno',
    icon: '✏️',
  },
  {
    id: 'csv',
    name: 'Importar CSV',
    description: 'Subir archivo CSV con columnas: nombre, empresa, correo, teléfono, sector',
    icon: '📄',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn (Manual)',
    description: 'Copiar datos de perfiles de LinkedIn de prospectos',
    icon: '🔗',
  },
  {
    id: 'directorio',
    name: 'Directorio Empresarial',
    description: 'Buscar en páginas amarillas y directorios de cámaras de comercio',
    icon: '📒',
  },
];

// ═══════════════════════════════════════════════
// PARSEO DE CSV
// ═══════════════════════════════════════════════

/**
 * Parsea un string CSV y extrae los leads.
 * Espera columnas: nombre, empresa, correo, telefono, sector, ubicacion
 */
export function parseCSV(csvText: string): ScrapedLead[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return []; // Necesita header + al menos 1 dato

  const header = lines[0].toLowerCase().split(',').map(h => h.trim());
  const leads: ScrapedLead[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    const row: Record<string, string> = {};
    header.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });

    if (row.correo || row.email || row.empresa || row.company) {
      leads.push({
        nombre: row.nombre || row.name || row.contacto || '',
        empresa: row.empresa || row.company || row.organizacion || '',
        correo: row.correo || row.email || row.mail || '',
        telefono: row.telefono || row.phone || row.tel || '',
        cargo: row.cargo || row.title || row.puesto || row.position || '',
        sector: row.sector || row.industry || row.industria || '',
        ubicacion: row.ubicacion || row.location || row.ciudad || 'Venezuela',
        fuente_url: 'CSV Import',
        confianza: (row.correo || row.email) ? 'alta' : 'media',
      });
    }
  }

  return leads;
}

// ═══════════════════════════════════════════════
// VALIDACIÓN DE DATOS
// ═══════════════════════════════════════════════

/**
 * Valida un email con formato básico y filtra direcciones genéricas de bajo valor (ruido)
 */
export function isValidEmail(email: string): boolean {
  const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicRegex.test(email)) return false;

  const blacklist = [
    'noreply', 'no-reply', 'support', 'soporte', 'info', 'contacto', 
    'ventas', 'sales', 'admin', 'webmaster', 'newsletter', 'marketing',
    'privacy', 'legal', 'billing', 'facturacion', 'root', 'postmaster'
  ];

  const prefix = email.split('@')[0].toLowerCase();
  
  // Si el prefijo está en la lista negra, lo marcamos como inválido para el motor de leads
  return !blacklist.some(word => prefix === word || prefix.includes(word + '.'));
}

/**
 * Limpia y normaliza un teléfono venezolano
 */
export function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('0')) return '+58' + cleaned.slice(1);
  if (cleaned.startsWith('58')) return '+' + cleaned;
  if (cleaned.startsWith('+58')) return cleaned;
  return cleaned;
}

/**
 * Valida un lead y retorna errores
 */
export function validateLead(lead: ScrapedLead): string[] {
  const errors: string[] = [];
  if (!lead.empresa && !lead.nombre) errors.push('Necesita al menos nombre o empresa');
  if (lead.correo && !isValidEmail(lead.correo)) errors.push('Email inválido');
  return errors;
}

// ═══════════════════════════════════════════════
// GUARDAR LEADS EN SUPABASE
// ═══════════════════════════════════════════════

// ── Tipos de clasificación BP ──────────────────────────────────────────

export interface BPClassification {
  bp: 1 | 2 | 3 | 4;
  bp_nombre: string;
  temperatura: 'frio' | 'tibio' | 'caliente';
  intent_window: boolean;
  secuencia_outbound: 'bp1' | 'bp2' | 'bp3' | 'bp4';
  nota_estrategica: string;
}

/**
 * Llama a Groq/Llama3 para calificación rápida de score (legado).
 */
export async function qualifyLeadWithAI(lead: { nombre: string, empresa: string, correo: string }): Promise<{ categoria: string, razon: string, score_ajustado: number } | null> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  if (!GROQ_API_KEY) return null;

  try {
    const prompt = `Actúa como un experto en ventas B2B para una empresa de seguridad corporativa en Venezuela.
    Analiza este lead y califica su potencial de cierre.
    Nombre: ${lead.nombre}, Empresa: ${lead.empresa}, Email: ${lead.correo}.

    Devuelve ÚNICAMENTE un JSON válido con esta estructura:
    { "categoria": "alto|medio|bajo", "razon": "máximo 15 palabras", "score_ajustado": número entre 1 y 100 }`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (err) {
    console.error('[AI Scoring Error]', err);
    return null;
  }
}

/**
 * Clasifica un lead en uno de los 4 buyer personas de CSSG usando Groq.
 * Usa el árbol de clasificación completo con miedos, servicios y secuencia outbound.
 */
export async function classifyBuyerPersona(lead: {
  nombre: string;
  empresa: string;
  correo: string;
  sector?: string;
  ubicacion?: string;
  cargo?: string;
}): Promise<BPClassification | null> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  if (!GROQ_API_KEY) return null;

  try {
    const prompt = `Eres el clasificador de buyer personas de CSSG, empresa venezolana de seguridad corporativa con presencia en Caracas y Miami.

ÁRBOL DE CLASIFICACIÓN (aplicar en orden):
1. Cargo contiene "Security"/"Seguridad"/"Protección" Y tiene CPP/PSP/PCI o menciona ASIS/OSAC/DSS → BP3 (Julio — El Estratega)
2. Cargo contiene "Security"/"Seguridad"/"Protección" SIN triple certificación → BP1 (Ricardo — El Guardián)
3. Cargo contiene "Administr"/"Operaciones"/"Condominio"/"Facilities"/"Gerencia General" → BP2 (Ana — La Administradora)
4. Ubicación en exterior (Miami/EEUU/España/Madrid/Bogotá) + Venezuela en empresa o intereses → BP4 (Carlos — El Venezolano Global)
5. Sin clasificación clara → BP1

SEÑALES DE INTENCIÓN (marcar intent_window:true si alguna aplica):
- Cargo/perfil sugiere que asumió el puesto recientemente
- Email de dominio diplomático o internacional (.gov, .un.org, embajada, etc.)
- Ubicación en exterior con empresa o contexto venezolano
- Sector diplomático, ONG internacional, multinacional

Clasifica este lead y devuelve ÚNICAMENTE un JSON con esta estructura exacta:
{
  "bp": número entre 1 y 4,
  "bp_nombre": "Ricardo Campos (El Guardián)" | "Ana Castillo (La Administradora)" | "Julio Marval (El Estratega)" | "Carlos Mendoza (El Venezolano Global)",
  "temperatura": "frio" | "tibio" | "caliente",
  "intent_window": true | false,
  "secuencia_outbound": "bp1" | "bp2" | "bp3" | "bp4",
  "nota_estrategica": "máximo 40 palabras sobre cómo abordar a este lead específico"
}

Lead a clasificar:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Cargo: ${lead.cargo || 'N/D'}
- Sector: ${lead.sector || 'N/D'}
- Ubicación: ${lead.ubicacion || 'N/D'}
- Correo: ${lead.correo || 'N/D'}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.1, // Muy bajo — clasificación determinista
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    // Validar y normalizar el resultado
    const bp = Number(result.bp);
    if (bp < 1 || bp > 4) return null;

    return {
      bp: bp as 1 | 2 | 3 | 4,
      bp_nombre: result.bp_nombre || '',
      temperatura: result.temperatura || 'frio',
      intent_window: Boolean(result.intent_window),
      secuencia_outbound: (`bp${bp}` as 'bp1' | 'bp2' | 'bp3' | 'bp4'),
      nota_estrategica: result.nota_estrategica || '',
    };
  } catch (err) {
    console.error('[BP Classification Error]', err);
    return null;
  }
}

/**
 * Guarda una lista de leads scrapeados en Supabase.
 * Flujo automático: insert → clasificar BP con IA → score Groq → activar secuencia outbound.
 */
export async function saveScrapedLeads(
  leads: ScrapedLead[]
): Promise<{ saved: number; duplicates: number; errors: string[] }> {
  // Importación dinámica para evitar dependencia circular en el build
  const { startOutboundSequence } = await import('./sequences');

  let saved = 0;
  let duplicates = 0;
  const errors: string[] = [];

  for (const lead of leads) {
    // Verificar duplicado por correo
    if (lead.correo) {
      const { data: existing } = await supabase
        .from('leads')
        .select('id')
        .eq('correo', lead.correo)
        .limit(1);

      if (existing && existing.length > 0) {
        duplicates++;
        continue;
      }
    }

    // Insertar lead con score inicial
    const { data: newLead, error } = await supabase.from('leads').insert([{
      nombre: lead.nombre,
      empresa: lead.empresa,
      correo: lead.correo,
      mensaje: `[TEL: ${lead.telefono || 'N/D'}] | Sector: ${lead.sector} | Ubicación: ${lead.ubicacion} | Fuente: ${lead.fuente_url}`,
      fuente: 'scraper',
      score: 10,
      estado: 'nuevo',
    }]).select('id').single();

    if (error) {
      errors.push(`Error guardando ${lead.empresa || lead.nombre}: ${error.message}`);
      continue;
    }

    saved++;
    const leadId = newLead.id as string;

    // Pipeline de IA asíncrono (no bloquea el guardado)
    Promise.all([
      // 1. Calificación de score con Groq
      qualifyLeadWithAI(lead),
      // 2. Clasificación de buyer persona con Groq
      classifyBuyerPersona({
        nombre: lead.nombre,
        empresa: lead.empresa,
        correo: lead.correo,
        cargo: lead.cargo,
        sector: lead.sector,
        ubicacion: lead.ubicacion,
      }),
    ]).then(async ([scoreResult, bpResult]) => {
      // Construir nota enriquecida
      const notaParts: string[] = [];
      if (scoreResult) {
        notaParts.push(`[Score IA] ${scoreResult.categoria.toUpperCase()} · ${scoreResult.razon}`);
      }
      if (bpResult) {
        notaParts.push(`[BP] ${bpResult.bp_nombre} · ${bpResult.temperatura}${bpResult.intent_window ? ' · ⚡ ventana de intención activa' : ''}`);
        notaParts.push(`[Estrategia] ${bpResult.nota_estrategica}`);
      }

      // Actualizar lead con score y notas enriquecidas
      await supabase.from('leads').update({
        score: scoreResult?.score_ajustado ?? 10,
        notas: notaParts.join('\n') || undefined,
      }).eq('id', leadId);

      // Activar la secuencia outbound correcta según el BP
      if (bpResult && lead.correo) {
        const { started, reason } = await startOutboundSequence(
          leadId,
          lead.correo,
          lead.nombre,
          bpResult.bp,
          lead.empresa,
        );
        if (started) {
          console.info(`[Sequence] ✅ BP${bpResult.bp} activada → ${lead.correo}`);
        } else {
          console.warn(`[Sequence] ⚠️ No activada (${reason}) → ${lead.correo}`);
        }
      }
    }).catch(err => {
      console.error(`[AI Pipeline Error] ${lead.correo}:`, err);
    });
  }

  return { saved, duplicates, errors };
}

// ═══════════════════════════════════════════════
// GENERADOR DE LEADS DE MUESTRA (para testing)
// ═══════════════════════════════════════════════

export function generateSampleCSV(): string {
  return `nombre,empresa,correo,telefono,cargo,sector,ubicacion
Carlos Mendoza,Grupo Empresarial ABC,cmendoza@grupoabc.com,04141234567,Gerente de Seguridad,Manufactura,Caracas
María González,Inversiones Delta,mgonzalez@invdelta.com,04242345678,Administradora General,Finanzas,Valencia
José Rodríguez,Constructora Norte,jrodriguez@connorte.com,04163456789,LATAM Security Manager,Construcción,Maracaibo
Ana Martínez,Distribuidora Sur,amartinez@distsur.com,04124567890,Gerente de Administración,Distribución,Barquisimeto
Pedro López,TechVen Solutions,plopez@techven.com,04265678901,Director de Operaciones,Tecnología,Miami`;
}
