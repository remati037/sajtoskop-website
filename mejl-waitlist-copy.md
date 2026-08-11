# Sajtoskop · kopi mejla za waitlistu

Tekst koji stiže čoveku čim ostavi adresu na landingu.
**Izvor istine je `lib/emails/waitlist.ts`** — kad promeniš rečenicu ovde, promeni je i tamo
(ili obrnuto). Ništa se ne piše direktno u `app/api/waitlist/route.ts`.

Jezik: srpski, latinica, sa dijakritikom. Obraćanje na „ti“.
Ton: kao da si ga otkucao iz svog inboxa, ne kao sistemska poruka.
Potpis: **Marko**, bez firme i bez titule.

Pravila kojih se držim u ovom tekstu:

- nema crtica kao znaka interpunkcije, rečenice se lome zarezom ili tačkom
- nema roka za pristup, jer rok koji probiješ košta više nego rok koji nisi dao
- nema pitanja na kraju, ovo je potvrda a ne razgovor
- nema reči „automatski“, „sistem“, „obaveštenje“

---

## Zaglavlje poruke

| Polje | Vrednost |
|---|---|
| Pošiljalac | `RESEND_FROM`, trenutno `Sajtoskop <zdravo@sajtoskop.com>` |
| Naslov | Uspešno si se prijavio na listu čekanja za Sajtoskop Beta fazu |
| Pretpregled u inboxu | Lično ću ti poslati email sa ove adrese kada Beta faza bude puštena. |

Pretpregled je onaj sivi tekst koji Gmail prikazuje pored naslova. Ako se ne postavi, Gmail
pokupi prvu rečenicu iz tela, pa dva puta piše isto.

---

## Telo

> Zdravo,
>
> Dodat si na listu čekanja za Sajtoskop Beta fazu. Ovaj mejl je samo potvrda da je prijava
> stigla, ništa ne treba da radiš.
>
> Puštam ljude u malim grupama, da stignem da ispratim gde se ko zaglavi i da odgovorim
> svakome. Kad dođe red na tebe, javim ti se lično sa pristupom, sa ove iste adrese.
>
> Beta faza je besplatna. Bez kartice, sa 30 kredita mesečno.
>
> Ako te zanima šta te čeka unutra, na sajtu je objašnjeno kako alat radi.
>
> `[ Pogledaj kako radi ]` → `sajtoskop.com/#kako-radi`
>
> Ako imaš pitanje, samo odgovori na ovaj mejl, čitam sve.
> Ako si se predomislio, odgovori isto tako i skidam te sa liste.
>
> Marko

---

## Podnožje

> Dobijaš ovaj mejl jer si ostavio adresu na sajtoskop.com.
>
> sajtoskop.com · Instagram

Instagram link se prikazuje samo ako je `NEXT_PUBLIC_INSTAGRAM_URL` popunjen. Prazna
varijabla znači da tog linka nema, ne da stoji mrtav.

---

## Verzija u čistom tekstu

Svaki mejl ide u dve verzije, HTML i čist tekst. Klijenti koji ne prikazuju HTML dobijaju
ovo, a i sami filteri za spam gledaju da li obe verzije postoje i da li se poklapaju.

```
Zdravo,

Dodat si na listu čekanja za Sajtoskop Beta fazu. Ovaj mejl je samo potvrda da je prijava stigla,
ništa ne treba da radiš.

Puštam ljude u malim grupama, da stignem da ispratim gde se ko zaglavi i da odgovorim
svakome. Kad dođe red na tebe, javim ti se lično sa pristupom, sa ove iste adrese.

Beta faza je besplatna. Bez kartice, sa 30 kredita mesečno.

Ako te zanima šta te čeka unutra, na sajtu je objašnjeno kako alat radi:
https://sajtoskop.com/#kako-radi

Ako imaš pitanje, samo odgovori na ovaj mejl, čitam sve.
Ako si se predomislio, odgovori isto tako i skidam te sa liste.

Marko
https://sajtoskop.com

Dobijaš ovaj mejl jer si ostavio adresu na sajtoskop.com.
```

---

## Dizajn

Svetla podloga, ista paleta kao svetla tema sajta. Tamna verzija nije uzeta namerno: dobar
deo klijenata sam invertuje boje u tamnom režimu, pa taman mejl ume da se raspadne u nečitko.

| Uloga | Boja | Odakle |
|---|---|---|
| Pozadina strane | `#f7f8f7` | `--bg-subtle` |
| Kartica poruke | `#ffffff` | `--bg` |
| Osnovni tekst | `#0a0b0c` | `--fg` |
| Blaži tekst | `#575e66` | `--fg-muted` |
| Sitan tekst u podnožju | `#868d95` | `--fg-faint` |
| Linije i okviri | `#e5e7e6` | `--border` |
| Dugme | `#8fd413` na `#0a0b0c` slovima | `--accent`, `--accent-ink` |
| Zelena na tekstu | `#4e7c0a` | `--accent-text` |

Ostalo što je bitno, a ne vidi se na prvi pogled:

- **Nema slika.** Logo je otkucan kao tekst plus zelena tačka, jer Gmail i Outlook
  podrazumevano ne učitavaju slike, pa bi logo bio prazna rupa na vrhu poruke.
- **Nema Geist fonta.** Mejl klijenti ne učitavaju fontove sa weba, ide sistemski niz koji
  na Mac-u i iPhone-u daje San Francisco, na Windowsu Segoe UI.
- **Tabela, ne flexbox.** Outlook renderuje kroz Word engine i moderan CSS ignoriše.
- Širina 560px, sve ispod toga se lomi na jednu kolonu na telefonu.

### Šta je urađeno zbog Outlooka

Outlook za Windows je jedini klijent koji poruku crta kroz Word, ne kroz browser engine.
Zbog njega su u fajlu stvari koje inače ne bi imale smisla:

- **Uslovna „duh“ tabela** oko sadržaja. Outlook ne razume `max-width`, pa bi mu poruka
  bila razvučena preko celog prozora. Blok `<!--[if mso]>` mu daje fiksnih 560px, a svi
  ostali klijenti ga ne vide i koriste `max-width`.
- **Razmak na dugmetu stoji na ćeliji, ne na linku.** Outlook ignoriše `padding` na inline
  elementu, pa bi zelena površina stala tik uz slova.
- `mso-line-height-rule:exactly` na pasusima, inače Outlook razvuče prored po svom.
- `mso-table-lspace` i `mso-table-rspace` na nuli, jer Outlook sam dodaje razmak oko tabela.
- `border-radius` Outlook ignoriše, pa su tamo kartica i dugme pravougaoni. To je jedina
  namerno prihvaćena razlika, ne kvari čitljivost.

### Isporuka

- **`replyTo` je tvoja lična adresa** (`NOTIFY_EMAIL`), ne `zdravo@sajtoskop.com`. Poruka
  poziva čoveka da odgovori, pa odgovor mora da padne u inboks koji stvarno čitaš.
- **`List-Unsubscribe` zaglavlje** pokazuje na tvoj mejl sa naslovom „Odjava sa liste“.
  Gmail i Yahoo gledaju da li pošiljalac nudi odjavu, a listu ionako vodiš ručno.
- Domen u Resendu mora imati **verifikovan SPF i DKIM**, i preporučljivo je da postoji
  **DMARC** zapis. Bez toga mejl ume da završi u promocijama ili u spamu, bez obzira na to
  koliko je HTML čist.

---

## Kako da proveriš pre puštanja

Pregled u browseru, bez slanja ijedne poruke:

```bash
npm run dev
# pa otvori http://localhost:3000/api/pregled-mejla
```

Ta ruta postoji samo u razvoju, u produkciji vraća 404.

Pravi test je slanje sebi, jer izgled se lomi tek u stvarnom klijentu. Tri naloga pokrivaju
skoro sve što tvoji ljudi koriste:

1. **Gmail**, u browseru i u aplikaciji na telefonu
2. **Outlook.com**, i ako igde možeš, **Outlook za Windows** jer je on najstroži
3. **Apple Mail** na iPhone-u, jednom u svetloj i jednom u tamnoj temi

Uz to, `mail-tester.com` daje adresu na koju pošalješ poruku i vrati ocenu od 10, sa
spiskom šta fali u SPF, DKIM i DMARC zapisima. To je najbrži način da vidiš da li ćeš
uopšte stizati u inboks.

---

## Šta ovde namerno ne piše

- **Rok.** Ni „za par dana“ ni „sledeće nedelje“. Prvi probijen rok pred prvim korisnicima
  košta više nego što nedostatak roka donosi.
- **Redni broj na listi.** Deluje živo tek kad je lista velika. Na početku „ti si 6. na
  listi“ radi protiv tebe.
- **Pitanje.** Odgovor na mejl bi ti popravio isporučivost i dao materijal za prve skenove,
  ali potvrda koja odmah nešto traži deluje kao prodaja. Ako se predomisliš, to je jedna
  rečenica pred potpisom, tipa „javi mi u jednoj rečenici koji grad i koja niša te zanimaju“.
- **Odjava jednim klikom.** Ovo je transakciona potvrda na osnovu radnje koju je čovek sam
  uradio, ne bilten, pa link za odjavu nije obavezan. Kad krene serija mejlova ka listi, tada
  postaje obavezan i ide u podnožje.
