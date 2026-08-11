-- 0001_waitlist.sql
-- Beta lista sa landing stranice.
--
-- RLS je uključen, politika ne postoji → anon i authenticated ne mogu ništa.
-- Upis ide isključivo kroz service role ključ iz Next.js route handlera.

create table if not exists public.waitlist (
  id            uuid primary key default gen_random_uuid(),
  email         text not null,
  source        text not null default 'unknown',
  country_code  text not null default 'RS',
  user_agent    text,
  referrer      text,
  invited_at    timestamptz,
  created_at    timestamptz not null default now()
);

-- Jedan mejl = jedna prijava. Ovo je ono što u route handleru vraća kod 23505.
create unique index if not exists waitlist_email_key
  on public.waitlist (lower(email));

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

comment on table public.waitlist is
  'Prijave za besplatnu betu sa landing stranice. Čita se samo kroz service role.';
comment on column public.waitlist.source is
  'Koja sekcija landinga je poslala prijavu: hero, beta, final.';
comment on column public.waitlist.invited_at is
  'Popuni se ručno kad čoveku pošalješ pristup. Null = još nije pozvan.';
