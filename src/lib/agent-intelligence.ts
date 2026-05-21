/**
 * CSSG AGENTIC INTELLIGENCE
 *
 * Llama a /api/agent (Claude Haiku) para scoring y redacción de emails.
 * Fallback heurístico si el endpoint no está disponible.
 */

import { supabase } from './supabase';

interface LeadEvaluation {
  score: number;
  category: 'Hot Lead' | 'Warm Lead' | 'Cold Lead';
  reasoning?: string;
}

interface EmailDraft {
  subject: string;
  body: string;
}

// Heurística de fallback (sin LLM)
function heuristicScore(lead: Record<string, string>): LeadEvaluation {
  let score = 10;
  const msg = (lead.mensaje || '').toLowerCase();
  if (msg.includes('presupuesto')) score += 40;
  if (msg.includes('urgente')) score += 30;
  if ((lead.correo || '').includes('.gov')) score += 15;
  if ((lead.correo || '').includes('.com')) score += 10;
  const category = score > 60 ? 'Hot Lead' : score > 30 ? 'Warm Lead' : 'Cold Lead';
  return { score: Math.min(score, 100), category };
}

async function callAgent<T>(action: string, lead: Record<string, unknown>): Promise<T | null> {
  try {
    const res = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // CRON_SECRET no está disponible en el browser; el endpoint es interno
        // En producción se llama desde api/trigger-sequence.js con la clave correcta
        Authorization: `Bearer ${import.meta.env.VITE_CRON_SECRET || ''}`,
      },
      body: JSON.stringify({ action, lead }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.result ?? null;
  } catch {
    return null;
  }
}

export const LeadScoringSkill = {
  name: 'lead_scoring',
  description: 'Evalúa el potencial de un lead con IA (Claude Haiku)',
  execute: async (lead: Record<string, string>): Promise<LeadEvaluation> => {
    console.log(`[AGENT] Analizando lead: ${lead.nombre} de ${lead.empresa}`);
    const result = await callAgent<LeadEvaluation>('score', lead);
    return result ?? heuristicScore(lead);
  },
};

export const AutoResponderSkill = {
  name: 'auto_responder',
  description: 'Genera un borrador de correo personalizado con IA',
  execute: async (lead: Record<string, string>): Promise<string> => {
    const result = await callAgent<EmailDraft>('draft_email', lead);
    if (result?.body) return result.body;
    return `Hola ${lead.nombre}, gracias por contactar a CSSG. Hemos recibido tu solicitud sobre "${lead.mensaje}" y un consultor se comunicará contigo en las próximas horas.`;
  },
};

export async function processNewLeadWithAgent(leadId: string) {
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (error || !lead) return;

  const evaluation = await LeadScoringSkill.execute(lead);

  await supabase
    .from('leads')
    .update({
      score: evaluation.score,
      notas: `[IA AGENT]: Clasificado como ${evaluation.category}.${evaluation.reasoning ? ' ' + evaluation.reasoning : ''}`,
    })
    .eq('id', leadId);

  console.log(`[AGENT] Lead ${leadId} procesado. Score: ${evaluation.score} (${evaluation.category})`);
}
