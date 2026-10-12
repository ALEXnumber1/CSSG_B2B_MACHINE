-- 006 — RLS fase A (2026-10-12)
-- Cierra lo que el sitio público nunca necesita, sin tocar la captación de leads.
-- Antes: leads, email_sequences y blog_posts tenían una política ALL `using (true)` para todos,
-- así que con la clave anon (pública en el bundle) cualquiera podía leer, editar y BORRAR.
-- Admin = usuario de Supabase Auth con email en la lista (misma lista que ADMIN_EMAILS del Worker).
-- Pendiente (fase B): mover la escritura de leads/secuencias al servidor y cerrar también
-- SELECT/UPDATE públicos de leads y email_sequences.

begin;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(lower(auth.jwt() ->> 'email'), '') = any (array['globalservices.ven@gmail.com'])
$$;

-- blog_posts: solo el admin gestiona; el público sigue leyendo lo publicado
-- (política existente "Lectura pública de artículos").
drop policy if exists "Gestión total para el dueño" on public.blog_posts;
create policy blog_admin_all on public.blog_posts
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

-- leads: SELECT/INSERT/UPDATE siguen abiertos (los formularios hacen upsert y buscan por correo);
-- DELETE solo admin.
drop policy if exists "Acceso público total" on public.leads;
drop policy if exists leads_delete_auth on public.leads;
create policy leads_public_select on public.leads for select to anon, authenticated using (true);
create policy leads_public_insert on public.leads for insert to anon, authenticated with check (true);
create policy leads_public_update on public.leads for update to anon, authenticated using (true) with check (true);
create policy leads_admin_delete on public.leads for delete to authenticated using ((select public.is_admin()));

-- email_sequences: igual (src/lib/sequences.ts las escribe desde el navegador).
drop policy if exists "Acceso público total sequences" on public.email_sequences;
create policy sequences_public_select on public.email_sequences for select to anon, authenticated using (true);
create policy sequences_public_insert on public.email_sequences for insert to anon, authenticated with check (true);
create policy sequences_public_update on public.email_sequences for update to anon, authenticated using (true) with check (true);
create policy sequences_admin_delete on public.email_sequences for delete to authenticated using ((select public.is_admin()));

-- Lecturas que cualquier cuenta registrada podía hacer: solo admin.
drop policy if exists auth_select_complaint on public.complaints;
create policy complaints_admin_select on public.complaints for select to authenticated using ((select public.is_admin()));

drop policy if exists auth_select_risk on public.risk_assessments;
create policy risk_admin_select on public.risk_assessments for select to authenticated using ((select public.is_admin()));

drop policy if exists authenticated_can_select_all_testimonials on public.testimonials;
create policy testimonials_admin_select on public.testimonials for select to authenticated using ((select public.is_admin()));

commit;
