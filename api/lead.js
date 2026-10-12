/**
 * API Route: /api/lead — the only way the public site writes leads and email sequences.
 *
 * The browser used to write `leads` / `email_sequences` directly with the anon key, which forced
 * those tables to be readable and editable by anyone. This endpoint does it with the service role,
 * so RLS can keep both tables admin-only (supabase/migrations/007_rls_phase_b.sql).
 *
 * POST { action: 'save', lead: { nombre, correo, empresa, telefono, mensaje, fuente, score } }
 *   → { id }
 *   New email: inserts the lead. Known email (case-insensitive): keeps the CRM state (estado,
 *   notas, fuente of first touch), refreshes contact data, appends the new message with a date
 *   and keeps the higher score. Before, repeat visitors either failed (insert on the unique
 *   `correo`) or reset the lead to "nuevo" (upsert).
 *
 * POST { action: 'sequence', lead_id, secuencia, next_send_at, completed }
 *   → { ok: true }   Registers email #0 of a nurturing sequence (src/lib/sequences.ts).
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && serviceKey ? createClient(supabaseUrl, serviceKey) : null;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SEQUENCE_DAYS = 120;

const text = (value, max) => {
  if (value === undefined || value === null) return undefined;
  const s = String(value).trim().slice(0, max);
  return s || undefined;
};

function cleanLead(input = {}) {
  const correo = text(input.correo, 254);
  const score = Number(input.score);
  return {
    nombre: text(input.nombre, 200),
    correo: correo && EMAIL.test(correo) ? correo : undefined,
    empresa: text(input.empresa, 200),
    telefono: text(input.telefono, 60),
    mensaje: text(input.mensaje, 5000),
    fuente: text(input.fuente, 80),
    score: Number.isFinite(score) ? Math.max(0, Math.min(100, Math.round(score))) : undefined,
  };
}

const withoutEmpty = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

async function saveLead(input) {
  const lead = cleanLead(input);
  if (!lead.nombre && !lead.correo && !lead.mensaje) {
    return { status: 400, body: { error: 'Datos insuficientes' } };
  }

  if (lead.correo) {
    // Exact, case-insensitive match (escape LIKE wildcards).
    const pattern = lead.correo.replace(/[\\%_]/g, (c) => `\\${c}`);
    const { data: existing, error } = await supabase
      .from('leads')
      .select('id, mensaje, score')
      .ilike('correo', pattern)
      .order('created_at', { ascending: true })
      .limit(1);
    if (error) throw error;

    if (existing?.length) {
      const prev = existing[0];
      const stamp = new Date().toISOString().slice(0, 10);
      const update = withoutEmpty({
        nombre: lead.nombre,
        empresa: lead.empresa,
        telefono: lead.telefono,
        mensaje: lead.mensaje
          ? [prev.mensaje, `[${stamp} · ${lead.fuente || 'web'}] ${lead.mensaje}`].filter(Boolean).join('\n\n')
          : undefined,
        score: lead.score !== undefined ? Math.max(prev.score || 0, lead.score) : undefined,
      });
      if (Object.keys(update).length) {
        const { error: updateError } = await supabase.from('leads').update(update).eq('id', prev.id);
        if (updateError) throw updateError;
      }
      return { status: 200, body: { id: prev.id, existing: true } };
    }
  }

  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...withoutEmpty(lead), estado: 'nuevo' }])
    .select('id')
    .single();
  if (error) throw error;
  return { status: 200, body: { id: data.id } };
}

async function registerSequence(input) {
  const leadId = String(input.lead_id || '');
  const secuencia = text(input.secuencia, 64);
  if (!UUID.test(leadId) || !secuencia) return { status: 400, body: { error: 'Datos inválidos' } };

  let nextSendAt = null;
  if (input.next_send_at) {
    const when = new Date(input.next_send_at);
    const maxAhead = Date.now() + MAX_SEQUENCE_DAYS * 24 * 60 * 60 * 1000;
    if (Number.isNaN(when.getTime()) || when.getTime() > maxAhead) {
      return { status: 400, body: { error: 'Fecha inválida' } };
    }
    nextSendAt = when.toISOString();
  }

  const { data: lead, error: leadError } = await supabase.from('leads').select('id').eq('id', leadId).maybeSingle();
  if (leadError) throw leadError;
  if (!lead) return { status: 404, body: { error: 'Lead no encontrado' } };

  // One active run per sequence: a resubmitted form must not restart or duplicate it.
  const { data: active, error: activeError } = await supabase
    .from('email_sequences')
    .select('id')
    .eq('lead_id', leadId)
    .eq('secuencia', secuencia)
    .eq('completed', false)
    .limit(1);
  if (activeError) throw activeError;
  if (active?.length) return { status: 200, body: { ok: true, existing: true } };

  const { error } = await supabase.from('email_sequences').insert([{
    lead_id: leadId,
    secuencia,
    email_num: 0,
    next_send_at: nextSendAt,
    completed: Boolean(input.completed),
  }]);
  if (error) throw error;
  return { status: 200, body: { ok: true } };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!supabase) {
    console.error('[lead] SUPABASE_SERVICE_ROLE_KEY no configurada');
    return res.status(500).json({ error: 'Servidor no configurado' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  try {
    const result = body.action === 'sequence'
      ? await registerSequence(body)
      : body.action === 'save'
        ? await saveLead(body.lead)
        : { status: 400, body: { error: 'Acción desconocida' } };
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error('[lead] Error:', err?.message || err);
    return res.status(500).json({ error: 'No se pudo guardar' });
  }
}
