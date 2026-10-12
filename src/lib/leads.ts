/**
 * Saves leads through /api/lead (service role on the server). The browser never writes the
 * `leads` / `email_sequences` tables directly: RLS keeps them admin-only.
 */

export interface LeadInput {
  nombre?: string;
  correo?: string;
  empresa?: string;
  telefono?: string;
  mensaje?: string;
  fuente?: string;
  score?: number;
  /** Ignored by the server: new leads always start as 'nuevo', known ones keep their state. */
  estado?: string;
}

async function post<T>(body: unknown): Promise<T> {
  const res = await fetch('/api/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Error ${res.status}`);
  return data as T;
}

/**
 * Creates the lead, or merges into the existing one with the same email (keeps its CRM state,
 * appends the message). Resolves to the lead id; throws if it could not be saved.
 */
export async function saveLead(lead: LeadInput): Promise<string> {
  const { id } = await post<{ id: string }>({ action: 'save', lead });
  return id;
}

/** Registers email #0 of a nurturing sequence for a lead (no-op if one is already active). */
export async function registerSequence(
  leadId: string,
  secuencia: string,
  nextSendAt: string | null,
  completed: boolean,
): Promise<void> {
  await post({ action: 'sequence', lead_id: leadId, secuencia, next_send_at: nextSendAt, completed });
}

/**
 * Drop-in for `supabase.from('leads').insert([lead]).select('id').single()` in the landing pages,
 * same `{ data, error }` shape: a known email comes back as Postgres' unique-violation code
 * '23505', so each page's existing "solicitud repetida" handling keeps working unchanged.
 * (The server still records the new message on the existing lead.)
 */
export async function insertLead(lead: LeadInput): Promise<{
  data: { id: string } | null;
  error: { code?: string; message: string } | null;
}> {
  try {
    const result = await post<{ id: string; existing?: boolean }>({ action: 'save', lead });
    return result.existing
      ? { data: null, error: { code: '23505', message: 'El correo ya estaba registrado' } }
      : { data: { id: result.id }, error: null };
  } catch (err) {
    return { data: null, error: { message: (err as Error).message } };
  }
}
