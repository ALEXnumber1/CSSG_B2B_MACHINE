/**
 * Helper compartido: llamada a Gemini que devuelve JSON.
 * (El prefijo "_" evita que Vercel lo publique como endpoint; el Worker tampoco lo enruta.)
 *
 * Reemplaza a Groq, que bloquea el acceso desde Venezuela.
 */

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

export const hasGeminiKey = () => Boolean(process.env.GEMINI_API_KEY);

export async function geminiJSON(prompt, { temperature = 0.2, maxOutputTokens = 1024 } = {}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature,
          maxOutputTokens,
          responseMimeType: 'application/json',
          // Clasificación corta: sin "thinking", más rápido y barato.
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini error ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(raw);
}
