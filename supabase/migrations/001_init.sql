-- Courage To Claws: initial schema
-- Run in Supabase SQL editor (or `supabase db push`).

-- ---------- quote_requests ----------
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  project_type text not null,
  location text not null,
  timeline text not null,
  description text,
  photo_urls text[] not null default '{}',   -- storage paths in the quote-photos bucket
  name text not null,
  phone text not null,
  email text not null,
  preferred_contact text not null,
  status text not null default 'new',        -- new | contacted | closed (for future admin use)
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

-- Public visitors can submit a request, nothing else.
create policy "public can insert quote requests"
  on public.quote_requests for insert
  to anon
  with check (true);

-- No select/update/delete policies for anon: leads are only readable in the
-- Supabase dashboard or by an authenticated admin (phase 2).

-- ---------- gallery_items ----------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('decks','roofs','additions','remodels')),
  image_urls text[] not null default '{}',   -- public URLs from the gallery bucket
  description text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "public can read gallery"
  on public.gallery_items for select
  to anon
  using (true);

-- No insert/update/delete for anon. Manage via dashboard (launch) or admin page (phase 2).

-- ---------- storage buckets ----------
-- Private: customer-submitted photos.
insert into storage.buckets (id, name, public)
values ('quote-photos', 'quote-photos', false)
on conflict (id) do nothing;

-- Public: finished-work photos shown in the gallery.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- Anonymous visitors may upload into quote-photos (write-only), never list or read.
create policy "anon can upload quote photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'quote-photos');

-- Anyone can read gallery images.
create policy "public can read gallery images"
  on storage.objects for select
  to anon
  using (bucket_id = 'gallery');

-- ---------- notify on new lead ----------
-- Set up a Database Webhook in the dashboard instead of a SQL trigger:
--   Database > Webhooks > Create: table quote_requests, event INSERT,
--   type "Supabase Edge Function", function "notify-quote".
-- That sends the new row to supabase/functions/notify-quote.
