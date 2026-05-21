import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Eres el agente de inteligencia comercial de CSSG (Company Of Security And Service Global C.A.), firma venezolana de seguridad corporativa y diplomática.

Contexto de la empresa:
- +12 años sin incidentes de seguridad
- Certificación ISO 9001:2015
- Estándar diplomático G7 (embajadas, corporaciones de alto valor)
- Alianza estratégica con Zentinel Global
- Personal de seguridad mejor remunerado de Venezuela

Metodología de riesgo: FMEA referenciada en ISO 31000:2018 y ASIS ORM.1:2017.
Fórmula de score: (Probabilidad × 0.4) + (Impacto × 0.6). Máximo 100.

Lead caliente (score > 50): contactar en 12 horas máximo.

INSTRUCCIÓN: Responde SIEMPRE en JSON válido, sin texto adicional fuera del JSON.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { action, lead } = req.body;

  if (!action || !lead) {
    return res.status(400).json({ error: 'Missing action or lead data' });
  }

  try {
    let userMessage = '';

    if (action === 'score') {
      userMessage = `Evalúa este lead y devuelve JSON con: { "score": number (0-100), "category": "Hot Lead"|"Warm Lead"|"Cold Lead", "reasoning": string (máx 50 palabras en español) }

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Correo: ${lead.correo || 'N/D'}
- Mensaje: ${lead.mensaje || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;

    } else if (action === 'draft_email') {
      userMessage = `Redacta un correo de seguimiento para este lead. Devuelve JSON con: { "subject": string, "body": string (HTML básico, máx 200 palabras) }

El tono debe ser: profesional, cálido, orientado a soluciones. Menciona brevemente la capacidad de CSSG en el área de interés del lead.

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Mensaje: ${lead.mensaje || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;

    } else {
      return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: userMessage }],
    });

    const raw = response.content[0]?.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Si el modelo devuelve texto con markdown fences, extraer el JSON
      const match = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
      parsed = match ? JSON.parse(match[1].trim()) : { raw };
    }

    return res.status(200).json({ success: true, action, result: parsed });

  } catch (error) {
    console.error('[Agent Error]', error);
    return res.status(500).json({ error: error.message });
  }
}
