/**
 * Prompts de IA para leads, compartidos por /api/qualify-lead (panel Admin) y
 * /api/classify-lead (webhook de Supabase). Un solo lugar para editar el árbol de buyer personas.
 */

import { geminiJSON } from './_gemini.js';

const safe = (str) => String(str || '').replace(/<[^>]*>/g, '').slice(0, 200) || 'N/D';

/** Score de cierre: { categoria, razon, score_ajustado }. */
export function scoreLead(lead) {
  return geminiJSON(`Actúa como un experto en ventas B2B para una empresa de seguridad corporativa en Venezuela.
Analiza este lead y califica su potencial de cierre.
Nombre: ${safe(lead.nombre)}, Empresa: ${safe(lead.empresa)}, Email: ${safe(lead.correo)}.

Devuelve ÚNICAMENTE un JSON válido con esta estructura:
{ "categoria": "alto|medio|bajo", "razon": "máximo 15 palabras", "score_ajustado": número entre 1 y 100 }`);
}

/** Buyer persona BP1-BP4, o null si la respuesta no es válida. */
export async function classifyPersona(lead) {
  const result = await geminiJSON(`Eres el clasificador de buyer personas de CSSG, empresa venezolana de seguridad corporativa con presencia en Caracas y Miami.

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

Devuelve ÚNICAMENTE un JSON con esta estructura exacta:
{
  "bp": número entre 1 y 4,
  "bp_nombre": "Ricardo Campos (El Guardián)" | "Ana Castillo (La Administradora)" | "Julio Marval (El Estratega)" | "Carlos Mendoza (El Venezolano Global)",
  "temperatura": "frio" | "tibio" | "caliente",
  "intent_window": true | false,
  "nota_estrategica": "máximo 40 palabras sobre cómo abordar a este lead específico"
}

Lead:
- Nombre: ${safe(lead.nombre)}
- Empresa: ${safe(lead.empresa)}
- Cargo: ${safe(lead.cargo)}
- Sector: ${safe(lead.sector)}
- Ubicación: ${safe(lead.ubicacion)}
- Correo: ${safe(lead.correo)}`, { temperature: 0.1 });

  const bp = Number(result.bp);
  if (!(bp >= 1 && bp <= 4)) return null;
  return {
    bp,
    bp_nombre: result.bp_nombre || '',
    temperatura: result.temperatura || 'frio',
    intent_window: Boolean(result.intent_window),
    nota_estrategica: result.nota_estrategica || '',
  };
}
