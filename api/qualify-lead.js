/**
 * API Route: /api/qualify-lead
 * 
 * Proxy seguro para calificación de leads con IA (Groq / Llama 3).
 * La GROQ_API_KEY nunca sale al bundle del navegador.
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GROQ_API_KEY) {
    // Si no hay clave configurada, devolvemos null (el frontend lo maneja con gracia)
    return res.status(200).json({ result: null, reason: 'GROQ_API_KEY not configured' });
  }

  const { nombre, empresa, correo } = req.body || {};

  if (!empresa && !nombre) {
    return res.status(400).json({ error: 'Faltan nombre o empresa.' });
  }

  const safe = (str) => String(str || '').replace(/<[^>]*>/g, '').slice(0, 200);

  const prompt = `Actúa como un experto en ventas B2B para una empresa de seguridad corporativa en Venezuela. 
  Analiza este lead y califica su potencial de cierre. 
  Nombre: ${safe(nombre)}, Empresa: ${safe(empresa)}, Email: ${safe(correo)}.
  
  Devuelve ÚNICAMENTE un JSON válido con esta estructura:
  { "categoria": "alto|medio|bajo", "razon": "máximo 15 palabras", "score_ajustado": número entre 1 y 100 }`;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error('[qualify-lead] Error Groq:', err);
      return res.status(502).json({ result: null, error: err });
    }

    const data = await groqRes.json();
    const result = JSON.parse(data.choices[0].message.content);
    return res.status(200).json({ result });
  } catch (err) {
    console.error('[qualify-lead] Error:', err);
    return res.status(500).json({ result: null, error: err.message });
  }
}
