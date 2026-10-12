/**
 * classify-lead.js — Receptor de webhook de Supabase
 *
 * Se invoca automáticamente cuando se inserta un lead en Supabase.
 * Clasifica el lead en un Buyer Persona (BP1-BP4) usando Gemini
 * y actualiza los campos bp, bp_nombre, temperatura, nota_estrategica, score.
 *
 * NO inicia secuencias — eso lo hace /api/launch-sequence.js
 * de forma manual desde el tab Outbound del panel Admin.
 *
 * Configuración del webhook en Supabase:
 *   Dashboard → Database → Webhooks → New Webhook
 *   Table: leads | Event: INSERT
 *   URL: https://cssg-global.com/api/classify-lead
 *   HTTP Header: Authorization: Bearer <CRON_SECRET>
 */

import { createClient } from '@supabase/supabase-js';
import { hasGeminiKey } from './_gemini.js';
import { classifyPersona, scoreLead } from './_lead-ai.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// El scraper guarda sector y ubicación dentro de `mensaje`: "[TEL: …] | Sector: … | Ubicación: … | Fuente: …"
const MENSAJE_FIELDS = { sector: /Sector:\s*(.*?)\s*\|/, ubicacion: /Ubicación:\s*(.*?)\s*\|/ };
const fromMensaje = (lead, field) => (lead.mensaje || '').match(MENSAJE_FIELDS[field])?.[1];

async function classifyBP(lead) {
  if (!hasGeminiKey()) return null;
  try {
    return await classifyPersona({
      ...lead,
      sector: fromMensaje(lead, 'sector'),
      ubicacion: fromMensaje(lead, 'ubicacion'),
    });
  } catch (err) {
    console.error('[classify-lead] BP error:', err);
    return null;
  }
}

async function scoreWithAI(lead) {
  if (!hasGeminiKey()) return null;
  try {
    return await scoreLead(lead);
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
      scoreWithAI(lead),
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
