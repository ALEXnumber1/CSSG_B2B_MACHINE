-- 007 — RLS fase B (2026-10-12)
-- Aplicar SOLO después de desplegar el código que guarda leads vía /api/lead (api/lead.js).
-- Desde entonces el navegador ya no lee ni escribe `leads` / `email_sequences`: lo hace el servidor
-- con la service role (que ignora RLS). Aquí esas tablas pasan a ser solo-admin.
-- Admin = public.is_admin() (creada en 006).

begin;

-- leads: fuera la lectura/edición/inserción pública; solo el admin (panel /admin, importador).
drop policy if exists leads_public_select on public.leads;
drop policy if exists leads_public_update on public.leads;
drop policy if exists leads_public_insert on public.leads;
drop policy if exists leads_insert_anon on public.leads;
drop policy if exists leads_admin_delete on public.leads;
create policy leads_admin_all on public.leads
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- email_sequences: igual.
drop policy if exists sequences_public_select on public.email_sequences;
drop policy if exists sequences_public_insert on public.email_sequences;
drop policy if exists sequences_public_update on public.email_sequences;
drop policy if exists sequences_admin_delete on public.email_sequences;
create policy sequences_admin_all on public.email_sequences
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- increment_lead_score es SECURITY DEFINER y la podía ejecutar cualquiera (subir el score de
-- cualquier lead). Solo la usa el servidor.
revoke execute on function public.increment_lead_score(uuid, integer) from public, anon, authenticated;

-- El trigger que clasifica cada lead nuevo llamaba a Vercel (globalservices-ven.com). Ahora al
-- Worker de Cloudflare, que ya tiene el mismo token como WEBHOOK_SECRET. Se reemplaza solo la URL
-- para no copiar el token al repositorio.
do $$
declare def text;
begin
  select pg_get_functiondef('public.notify_classify_lead'::regproc) into def;
  if position('https://globalservices-ven.com/api/classify-lead' in def) > 0 then
    execute replace(def, 'https://globalservices-ven.com/api/classify-lead', 'https://cssg-global.com/api/classify-lead');
  end if;
end $$;

commit;
