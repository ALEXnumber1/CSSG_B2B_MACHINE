/**
 * classify-lead.js — Receptor de webhook de Supabase
 *
 * Se invoca automáticamente cuando se inserta un lead en Supabase.
 * Clasifica el lead en un Buyer Persona (BP1-BP4) usando Groq/Llama3
 * y actualiza los campos bp, bp_nombre, temperatura, nota_estrategica, score.
 *
 * NO inicia secuencias — eso lo hace /api/launch-sequence.js
 * de forma manual desde el tab Outbound del panel Admin.
 *
 * Configuración del webhook en Supabase:
 *   Dashboard → Database → Webhooks → New Webhook
 *   Table: leads | Event: INSERT
 *   URL: https://globalservices-ven.com/api/classify-lead
 *   HTTP Header: Authorization: Bearer <CRON_SECRET>
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

async function callGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    }),
  });
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function classifyBP(lead) {
  if (!GROQ_API_KEY) return null;
  try {
    const result = await callGroq(`Eres el clasificador de buyer personas de CSSG, empresa venezolana de seguridad corporativa con presencia en Caracas y Miami.

ÁRBOL DE CLASIFICACIÓN (aplicar en orden):
1. Cargo contiene "Security"/"Seguridad"/"Protección" Y tiene CPP/PSP/PCI o menciona ASIS/OSAC/DSS → BP3 (Julio — El Estratega)
2. Cargo contiene "Security"/"Seguridad"/"Protección" SIN triple certificación → BP1 (Ricardo — El Guardián)
3. Cargo contiene "Administr"/"Operaciones"/"Condominio"/"Facilities"/"Gerencia General" → BP2 (Ana — La Administradora)
4. Ubicación en exterior (Miami/EEUU/España/Madrid/Bogotá) + Venezuela en empresa o intereses → BP4 (Carlos — El Venezolano Global)
5. Sin clasificación clara → BP1

SEÑALES DE INTENCIÓN (marcar intent_window:true si alguna aplica):
- Cargo/perfil sugiere que asumió el puesto recientemente
- Email de dominio diplomático o internacional (.gov, .un.org, embajada)
- Ubicación en exterior con empresa o contexto venezolano
- Sector diplomático, ONG internacional, multinacional

Devuelve ÚNICAMENTE un JSON con esta estructura exacta:
{
  "bp": número entre 1 y 4,
  "bp_nombre": "Ricardo Campos (El Guardián)" | "Ana Castillo (La Administradora)" | "Julio Marval (El Estratega)" | "Carlos Mendoza (El Venezolano Global)",
  "temperatura": "frio" | "tibio" | "caliente",
  "intent_window": true | false,
  "nota_estrategica": "máximo 40 palabras sobre cómo abordar a este lead específico"
}

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Cargo: ${lead.cargo || (lead.mensaje || '').match(/\[TEL:.*?\]\s*\|/)?.[0] ? '' : 'N/D'}
- Sector: ${(lead.mensaje || '').match(/Sector:\s*(.*?)\s*\|/)?.[1] || 'N/D'}
- Ubicación: ${(lead.mensaje || '').match(/Ubicación:\s*(.*?)\s*\|/)?.[1] || 'N/D'}
- Correo: ${lead.correo || 'N/D'}`);

    const bp = Number(result.bp);
    if (bp < 1 || bp > 4) return null;
    return {
      bp,
      bp_nombre: result.bp_nombre || '',
      temperatura: result.temperatura || 'frio',
      intent_window: Boolean(result.intent_window),
      nota_estrategica: result.nota_estrategica || '',
    };
  } catch (err) {
    console.error('[classify-lead] BP error:', err);
    return null;
  }
}

async function scoreWithGroq(lead) {
  if (!GROQ_API_KEY) return null;
  try {
    const result = await callGroq(`Actúa como experto en ventas B2B para una empresa de seguridad corporativa en Venezuela.
Analiza este lead y califica su potencial de cierre.
Nombre: ${lead.nombre || 'N/D'}, Empresa: ${lead.empresa || 'N/D'}, Email: ${lead.correo || 'N/D'}.
Devuelve ÚNICAMENTE un JSON válido: { "categoria": "alto|medio|bajo", "razon": "máximo 15 palabras", "score_ajustado": número entre 1 y 100 }`);
    return result;
  } catch (err) {
    console.error('[classify-lead] Score error:', err);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth — acepta CRON_SECRET o WEBHOOK_SECRET (para webhook de Supabase)
  const CRON_SECRET = process.env.CRON_SECRET || process.env.VITE_CRON_SECRET;
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const validToken =
    (CRON_SECRET && token === CRON_SECRET) ||
    (WEBHOOK_SECRET && token === WEBHOOK_SECRET);

  if (!validToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const body = req.body || {};

  // Supabase webhook envía { type, table, record } — también acepta llamada directa
  const { type, record } = body;
  const lead = record || body;

  if (!lead || !lead.id) {
    return res.status(400).json({ error: 'Missing lead id' });
  }

  // Ignorar eventos que no sean INSERT
  if (type && type !== 'INSERT') {
    return res.status(200).json({ message: 'Event ignored' });
  }

  // Saltar si ya está clasificado
  if (lead.bp) {
    return res.status(200).json({ message: 'Already classified', bp: lead.bp });
  }

  console.log(`[classify-lead] Clasificando: ${lead.correo || lead.id}`);

  try {
    const [bpResult, scoreResult] = await Promise.all([
      classifyBP(lead),
      scoreWithGroq(lead),
    ]);

    const updates = {};
    const notaParts = [];

    if (bpResult) {
      updates.bp = bpResult.bp;
      updates.bp_nombre = bpResult.bp_nombre;
      updates.temperatura = bpResult.temperatura;
      updates.nota_estrategica = bpResult.nota_estrategica;
      updates.intent_window = bpResult.intent_window;
      notaParts.push(`[BP] ${bpResult.bp_nombre} · ${bpResult.temperatura}${bpResult.intent_window ? ' · ⚡ ventana de intención activa' : ''}`);
      notaParts.push(`[Estrategia] ${bpResult.nota_estrategica}`);
    }

    if (scoreResult) {
      updates.score = scoreResult.score_ajustado ?? 10;
      notaParts.push(`[Score IA] ${scoreResult.categoria.toUpperCase()} · ${scoreResult.razon}`);
    }

    if (notaParts.length > 0) {
      updates.notas = notaParts.join('\n');
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.from('leads').update(updates).eq('id', lead.id);
      if (error) throw error;
    }

    console.log(`[classify-lead] OK: ${lead.correo} → BP${bpResult?.bp || '?'} (${bpResult?.temperatura})`);
    return res.status(200).json({
      success: true,
      bp: bpResult?.bp,
      bp_nombre: bpResult?.bp_nombre,
      temperatura: bpResult?.temperatura,
      score: scoreResult?.score_ajustado,
    });

  } catch (err) {
    console.error('[classify-lead] Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
