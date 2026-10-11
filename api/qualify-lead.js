/**
 * API Route: /api/qualify-lead
 *
 * Proxy seguro para calificación de leads con IA (Gemini).
 * La GEMINI_API_KEY nunca sale al bundle del navegador.
 *
 * Body: { nombre, empresa, correo, cargo?, sector?, ubicacion?, tipo? }
 *   tipo = 'score' (por defecto) → { categoria, razon, score_ajustado }
 *   tipo = 'persona'             → { bp, bp_nombre, temperatura, intent_window, nota_estrategica }
 */

import { hasGeminiKey } from './_gemini.js';
import { classifyPersona, scoreLead } from './_lead-ai.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!hasGeminiKey()) {
    // Si no hay clave configurada, devolvemos null (el frontend lo maneja con gracia)
    return res.status(200).json({ result: null, reason: 'GEMINI_API_KEY not configured' });
  }

  const { nombre, empresa, correo, cargo, sector, ubicacion, tipo } = req.body || {};

  if (!empresa && !nombre) {
    return res.status(400).json({ error: 'Faltan nombre o empresa.' });
  }

  try {
    const lead = { nombre, empresa, correo, cargo, sector, ubicacion };
    const result = tipo === 'persona' ? await classifyPersona(lead) : await scoreLead(lead);
    return res.status(200).json({ result });
  } catch (err) {
    console.error('[qualify-lead] Error:', err);
    return res.status(500).json({ result: null, error: err.message });
  }
}
