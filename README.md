# sajtoskop-website

Landing stranica za **Sajtoskop** — lead-gen alat koji pronalazi biznise u Srbiji sa lošim ili
nepostojećim sajtovima. Odgovara fazi `F8` iz `landing.md`.

Next.js 16 (App Router) · React 19 · Tailwind v4 · Motion · Geist · Vercel

---

## Pokretanje

```bash
npm install
cp .env.example .env.local     # popuni ključeve
npm run dev                    # http://localhost:3000
```

Landing radi i bez ijednog ključa — forma prihvata mejl, loguje ga u konzolu i prikazuje
success stanje. Ključevi su potrebni tek kad hoćeš da se prijave stvarno negde upisuju.

---

## Šta gde stoji

```
lib/content.ts            SAV kopi. Nijedna rečenica se ne piše u JSX-u.
lib/site.ts               domen, mejl, CTA prekidač, URL aplikacije
landing-copy.md           isti kopi kao markdown, za čitanje i prepravke
app/globals.css           dizajn sistem: tokeni za svetlu i tamnu temu, tipografija, animacije
components/sections/      po jedna komponenta za svaku sekciju landinga
components/scan-demo.tsx  animirani mock aplikacije u herou
app/api/waitlist/         upis prijave u Supabase + mejl preko Resend-a
app/api/kontakt/          kontakt forma → mejl
supabase/migrations/      SQL za tabelu waitlist
assets/*.ttf              Geist fontovi za OG sliku (satori ne čita woff2)
```

---

## CTA prekidač

Dok aplikacija ne postoji, sva CTA dugmad vode na waitlist formu. Kad F4 bude gotov:

```bash
NEXT_PUBLIC_CTA_MODE=signup
NEXT_PUBLIC_APP_URL=https://app.sajtoskop.com
```

Time se **svako** dugme i **svaka** forma na stranici prebacuje na `…/sign-up`. Nema drugih
izmena u kodu.

---

## Baza

```bash
# u Supabase SQL editoru ili kroz supabase CLI
supabase/migrations/0001_waitlist.sql
```

Tabela ima RLS uključen i **nijednu politiku** — znači anon i authenticated ne mogu ništa.
Upis ide isključivo kroz `SUPABASE_SERVICE_ROLE_KEY` iz route handlera. Taj ključ nikad ne sme
da dobije `NEXT_PUBLIC_` prefiks.

Ko je na listi, a nije još pozvan:

```sql
select email, source, created_at
from waitlist
where invited_at is null
order by created_at;
```

---

## Tema

Tri stanja: svetla, tamna, po sistemu (podrazumevano). Izbor se pamti u `localStorage` pod
ključem `sajtoskop-theme`, a inline skripta u `<head>`-u ga primenjuje pre prvog paint-a, pa
nema belog bleska na tamnoj temi.

Sve boje idu kroz CSS varijable iz `app/globals.css`. **Ne hardkoduj hex u komponentama** —
obe teme se raspadnu.

---

## Pre lansiranja

- [ ] Zameni `58 / 57 / 48` aktuelnim brojkama iz baze (`lib/content.ts` → `hero`, `proof`)
- [ ] Proveri smer Ugly Score skale u `packages/shared/src/ugly-score.ts` i uskladi `scanDemo.rows`
- [ ] Pusti migraciju `0001_waitlist.sql`
- [ ] Podesi Supabase i Resend ključeve u Vercel-u
- [ ] Verifikuj domen u Resend-u i podesi `RESEND_FROM`
- [ ] Popuni `NEXT_PUBLIC_INSTAGRAM_URL` / `NEXT_PUBLIC_LINKEDIN_URL` (prazno = ikonica se ne prikazuje)
- [ ] Pročitaj `/uslovi` i `/privatnost` do kraja — to su šabloni, ne pravni savet
- [ ] Pošalji link samom sebi na Viber i proveri kako izgleda OG slika
```bash
npm run build && npm start   # pa otvori /opengraph-image
```

---

## Komande

```bash
npm run dev
npm run build
npm start
npx tsc --noEmit
```
