/**
 * Motor de Secuencias de Email — CSSG
 * 
 * Gestiona secuencias automatizadas de email marketing post-captura.
 * Cada fuente de lead tiene una secuencia con múltiples emails
 * programados en días específicos.
 * 
 * Cuando Supabase esté configurado, este módulo:
 * 1. Crea una entrada en email_sequences al capturar un lead
 * 2. Determina qué email enviar según el día transcurrido
 * 3. Llama a Resend para enviarlo
 * 4. Actualiza el score del lead automáticamente
 */

import { supabase } from './supabase';
import { sendSequenceEmail } from './email';

// ═══════════════════════════════════════════════
// DEFINICIÓN DE SECUENCIAS
// ═══════════════════════════════════════════════

export interface SequenceEmail {
  day: number;         // Día desde la captura (0 = inmediato)
  templateKey: string; // Clave del template en email.ts
  scoreBonus: number;  // Puntos que suma al score del lead
}

export interface Sequence {
  id: string;
  name: string;
  emails: SequenceEmail[];
}

export const SEQUENCES: Record<string, Sequence> = {
  contacto: {
    id: 'contacto',
    name: 'Secuencia Contacto',
    emails: [
      { day: 0, templateKey: 'contacto_1', scoreBonus: 0 },   // "Recibimos su solicitud"
      { day: 2, templateKey: 'contacto_2', scoreBonus: 5 },   // "¿Sabía que el 60%...?"
      { day: 7, templateKey: 'contacto_3', scoreBonus: 10 },  // "Su consulta gratuita"
    ],
  },
  riesgo: {
    id: 'riesgo',
    name: 'Secuencia Risk Analysis',
    emails: [
      { day: 0, templateKey: 'riesgo_1', scoreBonus: 0 },     // "Su informe de vulnerabilidades"
      { day: 3, templateKey: 'riesgo_2', scoreBonus: 5 },     // "3 acciones inmediatas"
      { day: 7, templateKey: 'riesgo_3', scoreBonus: 10 },    // "Caso de éxito: embajada G7"
      { day: 14, templateKey: 'riesgo_4', scoreBonus: 15 },   // "Oferta especial: auditoría"
    ],
  },
  consultoria: {
    id: 'consultoria',
    name: 'Secuencia Consultoría',
    emails: [
      { day: 0, templateKey: 'consultoria_1', scoreBonus: 0 },  // "Pre-entrevista registrada"
      { day: 3, templateKey: 'consultoria_2', scoreBonus: 5 },  // "Tasa de éxito del 80%"
      { day: 10, templateKey: 'consultoria_3', scoreBonus: 10 },// "Recordatorio: consulta"
    ],
  },
  pestel: {
    id: 'pestel',
    name: 'Secuencia PESTEL',
    emails: [
      { day: 0, templateKey: 'pestel_1', scoreBonus: 0 },     // "Su informe PESTEL"
      { day: 3, templateKey: 'pestel_2', scoreBonus: 5 },     // "5 errores en Caracas"
      { day: 7, templateKey: 'pestel_3', scoreBonus: 10 },    // "Análisis personalizado"
    ],
  },
  escudo_diplomatico: {
    id: 'escudo_diplomatico',
    name: 'Secuencia Escudo Diplomático',
    emails: [
      { day: 0, templateKey: 'escudo_diplomatico_1', scoreBonus: 0 },
    ],
  },
  esrm_readiness: {
    id: 'esrm_readiness',
    name: 'Secuencia ESRM Readiness (landing "El Estratega")',
    emails: [
      { day: 0, templateKey: 'esrm_readiness_1', scoreBonus: 0 },
    ],
  },
  levantamiento_tecnico: {
    id: 'levantamiento_tecnico',
    name: 'Secuencia Levantamiento Técnico (landing "Ricardo")',
    emails: [
      { day: 0, templateKey: 'levantamiento_tecnico_1', scoreBonus: 0 },
    ],
  },
  reduccion_costos_seguridad: {
    id: 'reduccion_costos_seguridad',
    name: 'Secuencia Reducción de Costos de Seguridad (landing "Ana")',
    emails: [
      { day: 0, templateKey: 'reduccion_costos_seguridad_1', scoreBonus: 0 },
    ],
  },
  risk_advisory_services: {
    id: 'risk_advisory_services',
    name: 'Secuencia Risk Advisory Services (landing bilingüe ES/EN)',
    emails: [
      { day: 0, templateKey: 'risk_advisory_services_1', scoreBonus: 0 },
    ],
  },

  // ─── Secuencias OUTBOUND (leads scrapeados, no inbound) ───────────────
  // Arco: miedo → dolor → prueba social → CTA bajo fricción → urgencia pérdida → ask directo (BP1)
  // REGLA: NUNCA activar estas secuencias en leads inbound (distintas reglas de tono)

  bp1: {
    id: 'bp1',
    name: 'Outbound BP1 — Ricardo (El Guardián)',
    emails: [
      { day: 0,  templateKey: 'bp1_outbound_1', scoreBonus: 0  }, // Miedo: incidente que destruye contrato
      { day: 2,  templateKey: 'bp1_outbound_2', scoreBonus: 5  }, // Dolor: ¿cómo documenta su gestión hoy?
      { day: 6,  templateKey: 'bp1_outbound_3', scoreBonus: 10 }, // Prueba social: embajada G7 sin incidentes
      { day: 13, templateKey: 'bp1_outbound_4', scoreBonus: 15 }, // CTA: muestra Informe Ejecutivo Mensual
      { day: 20, templateKey: 'bp1_outbound_5', scoreBonus: 5  }, // Urgencia: costo de cada mes sin KPIs
      { day: 29, templateKey: 'bp1_outbound_6', scoreBonus: 10 }, // Ask directo: reunión de par a par
    ],
  },

  bp2: {
    id: 'bp2',
    name: 'Outbound BP2 — Ana (La Administradora)',
    emails: [
      { day: 0,  templateKey: 'bp2_outbound_1', scoreBonus: 0  }, // Miedo: cobro excesivo sin poder verificar
      { day: 2,  templateKey: 'bp2_outbound_2', scoreBonus: 5  }, // Dolor: la última factura con cargos sin explicar
      { day: 6,  templateKey: 'bp2_outbound_3', scoreBonus: 10 }, // Prueba social: condominio redujo factura 40%
      { day: 13, templateKey: 'bp2_outbound_4', scoreBonus: 15 }, // CTA: diagnóstico gratuito 8 preguntas
      { day: 20, templateKey: 'bp2_outbound_5', scoreBonus: 5  }, // Urgencia: ahorro acumulado que pierde cada mes
    ],
  },

  bp3: {
    id: 'bp3',
    name: 'Outbound BP3 — Julio (El Estratega)',
    emails: [
      { day: 0,  templateKey: 'bp3_outbound_1', scoreBonus: 0  }, // Miedo: vendor que falla auditoría DSS/OSAC
      { day: 4,  templateKey: 'bp3_outbound_2', scoreBonus: 5  }, // Dolor: ¿su documentación está HQ-ready?
      { day: 9,  templateKey: 'bp3_outbound_3', scoreBonus: 10 }, // Prueba social: ESRM framework post-transición
      { day: 17, templateKey: 'bp3_outbound_4', scoreBonus: 15 }, // CTA: muestra SC1 Compliance Package
      { day: 27, templateKey: 'bp3_outbound_5', scoreBonus: 10 }, // Urgencia: CPEs vencen, legado sin documentar
    ],
  },

  bp4: {
    id: 'bp4',
    name: 'Outbound BP4 — Carlos (El Venezolano Global)',
    emails: [
      { day: 0,  templateKey: 'bp4_outbound_1', scoreBonus: 0  }, // Miedo: el ejecutivo que llegó sin protocolo
      { day: 3,  templateKey: 'bp4_outbound_2', scoreBonus: 5  }, // Dolor: ¿qué pasa con su equipo si algo ocurre?
      { day: 9,  templateKey: 'bp4_outbound_3', scoreBonus: 10 }, // Prueba social: cobertura aeropuerto+estadía
      { day: 19, templateKey: 'bp4_outbound_4', scoreBonus: 15 }, // CTA: PDF Protocolo ejecutivos en Venezuela
    ],
  },
};

// ═══════════════════════════════════════════════
// FUNCIONES DEL MOTOR
// ═══════════════════════════════════════════════

/**
 * Inicia una secuencia de emails para un lead recién capturado.
 * Envía el email #0 (día 0) inmediatamente y programa los siguientes.
 */
export async function startSequence(
  leadId: string,
  leadEmail: string,
  leadName: string,
  fuente: string,
  empresa?: string
): Promise<void> {
  const sequence = SEQUENCES[fuente];
  if (!sequence) {
    console.warn(`[Sequences] No hay secuencia definida para fuente: ${fuente}`);
    return;
  }

  // Calcular cuándo enviar el siguiente email
  const nextEmail = sequence.emails[1]; // Email #1 (el #0 se envía ahora)
  const nextSendAt = nextEmail
    ? new Date(Date.now() + nextEmail.day * 24 * 60 * 60 * 1000).toISOString()
    : null;

  // Registrar la secuencia en Supabase
  try {
    await supabase.from('email_sequences').insert([{
      lead_id: leadId,
      secuencia: fuente,
      email_num: 0,
      next_send_at: nextSendAt,
      completed: sequence.emails.length <= 1,
    }]);
  } catch (err) {
    console.warn('[Sequences] No se pudo registrar secuencia (Supabase no configurado):', err);
  }

  // Enviar email #0 inmediatamente
  const firstEmail = sequence.emails[0];
  if (firstEmail) {
    await sendSequenceEmail(leadEmail, leadName, firstEmail.templateKey, empresa);
  }
}

/**
 * Procesa las secuencias pendientes — envía los emails que correspondan hoy.
 * Esta función debería llamarse periódicamente (cron, Edge Function, o manual desde Admin).
 */
export async function processSequences(): Promise<{
  sent: number;
  errors: number;
}> {
  let sent = 0;
  let errors = 0;

  try {
    // Buscar secuencias pendientes cuyo next_send_at ya pasó
    const now = new Date().toISOString();
    const { data: pendingSeqs, error } = await supabase
      .from('email_sequences')
      .select('*, leads!inner(correo, nombre, empresa)')
      .eq('completed', false)
      .lte('next_send_at', now);

    if (error || !pendingSeqs) {
      console.warn('[Sequences] Error buscando secuencias pendientes:', error);
      return { sent: 0, errors: 1 };
    }

    for (const seq of pendingSeqs) {
      const sequence = SEQUENCES[seq.secuencia];
      if (!sequence) continue;

      const nextNum = seq.email_num + 1;
      const emailDef = sequence.emails[nextNum];
      if (!emailDef) continue;

      const lead = (seq as any).leads;
      if (!lead?.correo) continue;

      // Enviar el email
      const result = await sendSequenceEmail(
        lead.correo,
        lead.nombre || 'Estimado/a',
        emailDef.templateKey,
        lead.empresa
      );

      if (result.success) {
        sent++;

        // Actualizar secuencia
        const isLast = nextNum >= sequence.emails.length - 1;
        const nextEmailDef = sequence.emails[nextNum + 1];
        const nextSendAt = nextEmailDef
          ? new Date(Date.now() + (nextEmailDef.day - emailDef.day) * 24 * 60 * 60 * 1000).toISOString()
          : null;

        await supabase
          .from('email_sequences')
          .update({
            email_num: nextNum,
            next_send_at: nextSendAt,
            completed: isLast,
          })
          .eq('id', seq.id);

        // Actualizar score y emails_enviados del lead
        if (emailDef.scoreBonus > 0) {
          await supabase.rpc('increment_lead_score', {
            lead_id: seq.lead_id,
            bonus: emailDef.scoreBonus,
          });
        }

        await supabase
          .from('leads')
          .update({
            emails_enviados: (lead.emails_enviados || 0) + 1,
            ultimo_contacto: new Date().toISOString(),
          })
          .eq('id', seq.lead_id);
      } else {
        errors++;
      }
    }
  } catch (err) {
    console.error('[Sequences] Error procesando secuencias:', err);
    errors++;
  }

  return { sent, errors };
}

/**
 * Pausa la secuencia de un lead específico.
 */
export async function pauseSequence(leadId: string): Promise<void> {
  await supabase
    .from('leads')
    .update({ secuencia_activa: false })
    .eq('id', leadId);

  await supabase
    .from('email_sequences')
    .update({ completed: true })
    .eq('lead_id', leadId)
    .eq('completed', false);
}

/**
 * Inicia la secuencia outbound correcta para un lead scrapeado.
 * Valida que no tenga secuencia activa y que no esté dado de baja antes de enviar.
 */
export async function startOutboundSequence(
  leadId: string,
  leadEmail: string,
  leadName: string,
  bp: 1 | 2 | 3 | 4,
  empresa?: string,
): Promise<{ started: boolean; reason?: string }> {
  // Verificar que no tenga ya una secuencia activa
  const { data: existing } = await supabase
    .from('email_sequences')
    .select('id')
    .eq('lead_id', leadId)
    .eq('completed', false)
    .limit(1);

  if (existing && existing.length > 0) {
    return { started: false, reason: 'Lead ya tiene secuencia activa' };
  }

  // Verificar que el lead no haya dado de baja
  const { data: lead } = await supabase
    .from('leads')
    .select('unsubscribed')
    .eq('id', leadId)
    .single();

  if ((lead as any)?.unsubscribed) {
    return { started: false, reason: 'Lead dado de baja (unsubscribed)' };
  }

  const sequenceKey = `bp${bp}` as keyof typeof SEQUENCES;
  await startSequence(leadId, leadEmail, leadName, sequenceKey, empresa);
  return { started: true };
}

/**
 * Obtiene el estado de la secuencia de un lead.
 */
export async function getSequenceStatus(leadId: string): Promise<{
  secuencia: string;
  emailsSent: number;
  totalEmails: number;
  completed: boolean;
  nextSendAt: string | null;
} | null> {
  const { data } = await supabase
    .from('email_sequences')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (!data) return null;

  const sequence = SEQUENCES[data.secuencia];
  return {
    secuencia: data.secuencia,
    emailsSent: data.email_num + 1,
    totalEmails: sequence?.emails.length || 0,
    completed: data.completed,
    nextSendAt: data.next_send_at,
  };
}
