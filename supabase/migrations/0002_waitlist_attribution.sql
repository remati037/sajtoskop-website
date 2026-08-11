-- 0002_waitlist_attribution.sql
-- Odakle je prijava stvarno došla.
--
-- Postojeća kolona `referrer` se puni iz `referer` hedera POST zahteva, a taj
-- zahtev šalje sama landing stranica — vrednost je skoro uvek sajtoskop.com i
-- ne govori ništa o izvoru posete. Kolone ispod puni klijent: hvata se pri
-- PRVOM učitavanju u sesiji i šalje uz prijavu.
--
-- Ovo je jedini izvor atribucije koji ad-blocker ne može da obori.

alter table public.waitlist
  add column if not exists landing_referrer text,
  add column if not exists landing_path     text,
  add column if not exists utm_source       text,
  add column if not exists utm_medium       text,
  add column if not exists utm_campaign     text,
  add column if not exists utm_content      text,
  add column if not exists utm_term         text,
  add column if not exists click_id         text;

comment on column public.waitlist.landing_referrer is
  'Spoljni referrer prve posete u sesiji. Prazno = direktan dolazak ili sakriven referrer.';
comment on column public.waitlist.landing_path is
  'Putanja i query prve otvorene stranice, npr. /?utm_source=instagram.';
comment on column public.waitlist.click_id is
  'gclid ili fbclid — Google i Facebook ih lepe i kad UTM parametara nema.';

-- Za pitanje „koliko je prijava stiglo po kanalu".
create index if not exists waitlist_utm_source_idx
  on public.waitlist (utm_source)
  where utm_source is not null;
