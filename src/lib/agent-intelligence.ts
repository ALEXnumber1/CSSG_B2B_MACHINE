/**
 * CSSG AGENTIC INTELLIGENCE
 * 
 * Este módulo actúa como el "cerebro" del agente autónomo.
 * Su función es procesar los leads que entran (vía formulario o scraper)
 * y decidir qué acciones tomar usando LLMs.
 */

import { supabase } from './supabase';

interface AgentSkill {
  name: string;
  description: string;
  execute: (data: any) => Promise<any>;
}

/**
 * SKILL: Lead Scoring (Clasificación de Leads)
 * Usa IA para leer el mensaje del lead y determinar su potencial de negocio.
 */
export const LeadScoringSkill: AgentSkill = {
  name: 'lead_scoring',
  description: 'Evalúa el potencial de un lead basado en su empresa y mensaje',
  execute: async (lead: any) => {
    // Aquí se conectaría con la API de Gemini o OpenAI
    // Por ahora simulamos la lógica:
    console.log(`[AGENT] Analizando lead: ${lead.nombre} de ${lead.empresa}`);
    
    let score = 10; // Base
    
    // Lógica simple (reemplazar por llamada a LLM)
    if (lead.mensaje.toLowerCase().includes('presupuesto')) score += 40;
    if (lead.mensaje.toLowerCase().includes('urgente')) score += 30;
    if (lead.correo.includes('.gov') || lead.correo.includes('.com')) score += 10;

    return { score, category: score > 50 ? 'Hot Lead' : 'Cold Lead' };
  }
};

/**
 * SKILL: Auto-Responder
 * Prepara una respuesta personalizada basada en los servicios de CSSG.
 */
export const AutoResponderSkill: AgentSkill = {
  name: 'auto_responder',
  description: 'Genera un borrador de correo personalizado',
  execute: async (lead: any) => {
    // PROMPT PARA LLM:
    // "Eres un consultor de seguridad en CSSG. Escribe un correo breve para ${lead.nombre} 
    // de la empresa ${lead.empresa} que nos contactó por ${lead.mensaje}..."
    
    return `Hola ${lead.nombre}, gracias por contactar a CSSG. He analizado tu requerimiento sobre ${lead.mensaje} y...`;
  }
};

/**
 * FUNCIÓN PRINCIPAL DEL AGENTE
 * Se llama cada vez que entra un nuevo lead.
 */
export async function processNewLeadWithAgent(leadId: string) {
  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .single();

  if (error || !lead) return;

  // 1. Clasificar con IA
  const evaluation = await LeadScoringSkill.execute(lead);
  
  // 2. Actualizar lead en la DB con el nuevo score de la IA
  await supabase
    .from('leads')
    .update({ 
      score: evaluation.score,
      notas: `[IA AGENT]: Clasificado como ${evaluation.category}.` 
    })
    .eq('id', leadId);

  console.log(`[AGENT] Lead ${leadId} procesado con éxito.`);
}
