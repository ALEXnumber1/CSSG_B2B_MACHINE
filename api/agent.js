const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `Eres el agente de inteligencia comercial de CSSG (Company Of Security And Service Global C.A.), firma venezolana de seguridad corporativa y diplomática con +12 años sin incidentes, certificación ISO 9001:2015 y estándar diplomático G7.

Metodología de riesgo: FMEA referenciada en ISO 31000:2018. Score = (Probabilidad × 0.4) + (Impacto × 0.6). Máximo 100. Lead caliente (score > 50): contactar en 12 horas.

INSTRUCCIÓN CRÍTICA: Responde SIEMPRE con JSON válido únicamente, sin texto adicional, sin markdown, sin explicaciones fuera del JSON.`;

async function callGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
        responseMimeType: 'application/json',
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(raw);
}

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
    let prompt = '';

    if (action === 'score') {
      prompt = `Evalúa este lead y devuelve JSON con exactamente estas claves: { "score": number (0-100), "category": "Hot Lead" | "Warm Lead" | "Cold Lead", "reasoning": string (máx 50 palabras en español) }

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Correo: ${lead.correo || 'N/D'}
- Mensaje: ${lead.mensaje || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;

    } else if (action === 'draft_email') {
      prompt = `Redacta un correo de seguimiento en español para este lead. Devuelve JSON con exactamente estas claves: { "subject": string, "body": string (HTML básico, máx 200 palabras, tono profesional y cálido) }

Lead:
- Nombre: ${lead.nombre || 'N/D'}
- Empresa: ${lead.empresa || 'N/D'}
- Mensaje: ${lead.mensaje || 'N/D'}
- Fuente: ${lead.fuente || 'N/D'}`;

    } else {
      return res.status(400).json({ error: `Unknown action: ${action}` });
    }

    const result = await callGemini(prompt);
    return res.status(200).json({ success: true, action, result });

  } catch (error) {
    console.error('[Agent Error]', error);
    return res.status(500).json({ error: error.message });
  }
}
