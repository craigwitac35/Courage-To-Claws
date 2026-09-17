-- Courage To Claws: iteration 2
-- Admin dashboard permissions, publish workflow, and lead-form hardening.
-- Run AFTER 001_init.sql in the Supabase SQL editor.

-- ---------- gallery: publish workflow ----------
alter table public.gallery_items
  add column if not exists published boolean not null default false;

-- Anything already in the table before this migration stays visible.
update public.gallery_items set published = true where published = false;

drop policy if exists "public can read gallery" on public.gallery_items;

create policy "public can read published gallery"
  on public.gallery_items for select
  to anon
  using (published = true);

-- Troy (any signed-in user; only invited addresses can sign in) manages everything.
create policy "admin reads all gallery"
  on public.gallery_items for select
  to authenticated
  using (true);

create policy "admin writes gallery"
  on public.gallery_items for insert
  to authenticated
  with check (true);

create policy "admin updates gallery"
  on public.gallery_items for update
  to authenticated
  using (true) with check (true);

create policy "admin deletes gallery"
  on public.gallery_items for delete
  to authenticated
  using (true);

-- Gallery bucket: admin can upload, list, and delete.
create policy "admin uploads gallery images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery');

create policy "admin reads gallery images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'gallery');

create policy "admin deletes gallery images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery');

-- ---------- leads: admin can read and update status ----------
create policy "admin reads leads"
  on public.quote_requests for select
  to authenticated
  using (true);

create policy "admin updates lead status"
  on public.quote_requests for update
  to authenticated
  using (true) with check (true);

-- Admin can read private customer photos (signed URLs in the dashboard).
create policy "admin reads quote photos"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'quote-photos');

-- ---------- lead form: rate limiting at the database ----------
-- Caps anonymous submissions from the same email or phone to 5 per hour.
create or replace function public.quote_requests_rate_limit()
returns trigger
language plpgsql
security definer
as $$
declare
  recent int;
begin
  select count(*) into recent
  from public.quote_requests
  where created_at > now() - interval '1 hour'
    and (email = new.email or phone = new.phone);
  if recent >= 5 then
    raise exception 'Too many requests. Please call us instead.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists quote_requests_rate_limit on public.quote_requests;
create trigger quote_requests_rate_limit
  before insert on public.quote_requests
  for each row execute function public.quote_requests_rate_limit();

-- ---------- auth: lock sign-ups to invited users ----------
-- In the dashboard: Authentication > Providers > Email > turn OFF "Enable email signups".
-- Then Authentication > Users > "Invite user" with Troy's email (and yours).
-- Magic-link sign-in only works for invited addresses after that.
