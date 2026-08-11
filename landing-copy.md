# Sajtoskop — kopi landing stranice

Ovo je tekst koji stoji na sajtu, izvučen radi čitanja i prepravki.
**Izvor istine je `lib/content.ts`** — kad promeniš rečenicu ovde, promeni je i tamo (ili obrnuto).
Nijedna rečenica se ne piše direktno u komponentama.

Jezik: srpski, latinica, sa dijakritikom. Obraćanje na „ti“.
Jedan CTA kroz celu stranicu: **Uđi u besplatnu betu**.

---

## Navigacija

Problem · Dokaz · Kako radi · Za koga · Pitanja  →  `[Uđi u betu]`

---

## Hero

> **BETA** · Besplatna beta · Srbija
>
> # U Šapcu **58%** PVC stolarija nema sajt koji radi.
>
> Sajtoskop zna njihova imena, telefone i tačan problem. Izabereš grad i nišu, alat skenira
> Google Maps, oceni svaki sajt od 0 do 100 i da ti kontakt, screenshot i listu konkretnih
> problema — spremno za slanje.
>
> `[tvoj@mejl.com]` `[Uđi u betu →]`
> Bez kartice. 30 kredita mesečno. Beta je besplatna dok traje.
>
> ✓ Podaci sa Google Maps-a  ✓ Zvanični Places API  ✓ Napravljeno za Srbiju

> ⚠️ **Broj 58% mora biti tvoj stvaran podatak iz scana.** PRD to izričito traži. Ako se
> promenio posle novih skeniranja, menjaš ga na jednom mestu: `hero.titleAccent`,
> `hero.titleLine1` i `proof.rows` u `lib/content.ts`.

### Mock aplikacije ispod hero-a

Animirani prikaz skeniranja: redovi izlaze jedan po jedan, sa Ugly Score bedževima.
Imena firmi su **izmišljena namerno** — ne prikazujem stvarne prospekte javno.

| Firma | Ugly Score | Problem |
|---|---|---|
| PVC Mont Šabac | Nema sajt | nema sajt · samo Instagram |
| Alu-Plast Sistem | Nema sajt | nema sajt · samo Maps profil |
| Stolarija Mićić | 94 Katastrofa | mrtav domen · greška 522 |
| Termo Prozor d.o.o. | 81 Katastrofa | nije mobilni · bez SSL-a |
| Vekaplast Mačva | 63 Ružan | učitava se 8,4 s · nema kontakt |
| Prozori Plus | 41 Osrednji | stara galerija · nema CTA |
| Fenester Group | 12 Solidan | solidan sajt — nije lead |

Legenda: *Zeleno = firma uopšte nema sajt. To je najbolji lead.*

> ⚠️ **Proveri skalu Ugly Score-a.** Ovde je pretpostavka: **viši broj = ružniji sajt**
> (0–24 Solidan, 25–49 Osrednji, 50–74 Ružan, 75–100 Katastrofa). Ako je u
> `packages/shared/src/ugly-score.ts` obrnuto, obrni brojeve u `scanDemo.rows`.

---

## 1. Problem — „Cena čekanja“

> ## Dok ti guglaš, neko drugi već zove.
>
> Nije problem u tome što nema posla. Problem je što je posao zakopan ispod četiri sata
> ručnog traženja, a ti to radiš neplaćeno, pre nego što uopšte dođeš do prve poruke.

**VREME — 4h** *(po jednoj niši, ručno)*
### Sati odlaze na guglanje firmi
Otvoriš Maps, pa četrdeset tabova, pa ručno proveravaš ko od njih uopšte ima sajt i da li taj
sajt radi. Pola dana za deset firmi, od kojih je osam već nečiji klijent.

**PORUKA — 0** *(odgovora na „Zdravo, bavim se izradom sajtova“)*
### Ne znaš šta da napišeš
Kad konačno nađeš nekoga, poruka ispadne generična jer ne znaš šta tačno ne valja na njegovom
sajtu. Generična poruka je spam. Spam se ne otvara.

**ALATI — ≈0** *(srpskih mikro-firmi u njihovim bazama)*
### Zapadni alati ne vide Srbiju
Apollo, Clay i slični traže firme sa „lošim sajtom“. Kod nas je najbolji lead firma koja sajt
uopšte nema — a to nijedan strani alat ne ume da filtrira, jer u njihovim bazama takvih firmi
skoro i nema.

---

## 2. Dokaz

> ## Ovo nisu procene. **Ovo su brojevi iz stvarnih skeniranja.**
>
> Tri niše koje sam skenirao pre nego što sam napisao ijednu liniju landing stranice. Svaki
> procenat je udeo firmi koje nemaju sajt, imaju mrtav domen ili imaju samo društvenu mrežu.

| Niša | Grad | Bez sajta koji radi |
|---|---|---|
| PVC stolarija | Šabac | **58%** |
| Advokat | Kragujevac | **57%** |
| Autoplac | Čačak | **48%** |

*Skenirano preko zvaničnog Google Places API-ja. Brojke se menjaju kako se baza osvežava u
30-dnevnom ciklusu.*

---

## 3. Kako radi

> ## Od praznog ekrana do prve poruke, za par minuta.
>
> Bez podešavanja, bez učenja alata, bez uvoza ičega. Otvoriš, izabereš dve stvari i gledaš
> rezultat.

**01 · Izabereš grad i nišu**
Šabac i PVC stolarija. Ili Kragujevac i stomatolog. Dva padajuća menija, bez upita i bez
filtera koje treba naučiti.
→ *Ćirilica i latinica se normalizuju — „Столарија“ i „Stolarija“ su ista firma.*

**02 · Sajtoskop skenira i oceni**
Povlači firme sa Google Maps-a, otvara svaki sajt i daje mu Ugly Score od 0 do 100, sa listom
konkretnih problema: mrtav domen, nije mobilni, sporo se učitava, nema kontakt.
→ *Firme koje sajt uopšte nemaju idu na vrh liste, obeležene zeleno.*

**03 · Otključaš i pišeš**
Jedan kredit otvara telefon, mejl, screenshot sajta i predlog poruke na srpskom, prilagođen
kanalu. Kopiraš i šalješ. Ceo pipeline pratiš u kanban tabli.
→ *Isti prospekt nikad ne plaćaš dvaput — otključan je zauvek tvoj.*

---

## 4. Anatomija leada

> ## Šta tačno dobiješ kad otključaš prospekta.
>
> Ne dobijaš red u tabeli. Dobijaš sve što ti treba da pošalješ poruku koja ima razlog da
> postoji.

Vizuelno: kartica prospekta (ime, kategorija, ocena, telefon sa tipom, mejl, sajt, lista
problema, predlog poruke) i pored nje numerisana lista od osam stavki.

1. **Ime i kategorija** — Tačan naziv firme sa Google Maps-a, kategorija i broj recenzija.
2. **Telefon sa tipom** — Iz prefiksa znaš da li ide Viber poruka ili poziv. Ne gubiš pokušaj.
3. **Mejl adresa** — Kad postoji na sajtu ili u Maps profilu, izvučena i proverena.
4. **Screenshot sajta** — Vidiš svojim očima kako izgleda pre nego što napišeš rečenicu o tome.
5. **Ugly Score i bend** — Ocena od 0 do 100 i bend: Solidan, Osrednji, Ružan ili Katastrofa.
6. **Lista konkretnih problema** — „Nije prilagođen mobilnom“, „Učitava se 8,4 sekunde“, „Nema kontakt formu“.
7. **Predlog poruke** — Na srpskom, po kanalu, sa konkretnim problemom u prvoj rečenici.
8. **Status u pipeline-u** — Nekontaktiran, Kontaktiran, Odgovorio, Potpisan, Nezainteresovan.

**Predlog poruke (Viber), primer u kartici:**
> Dobar dan, video sam da PVC Mont ima odlične ocene na Google-u, ali da firma trenutno nema
> sajt. Ljudi koji vas nađu na Maps-u nemaju gde da vide radove i cene. Napravio bih vam
> jednostavan sajt sa galerijom i formom za upit — mogu da pošaljem predlog, bez obaveze.

---

## 5. Srpske specifičnosti

> ## Napravljen za Srbiju, ne preveden na srpski.
>
> Ovo su četiri stvari koje strani alati ne rade, a bez kojih na našem tržištu nemaš
> upotrebljivu listu.

**Filter „nema sajt“, „samo Instagram“, „mrtav domen“**
Najbolji lead kod nas nije firma sa ružnim sajtom. To je firma koja sajt uopšte nema, a ima 40
recenzija i posao koji radi. Takve idu na vrh liste.

**Tip telefona iz prefiksa**
06x je mobilni — ide Viber. Fiksni prefiks znači poziv u radno vreme. Alat ti kaže koji je
koji, pa ne trošiš pokušaj na pogrešan kanal.

**Poruke na srpskom, po kanalima**
Mejl, Viber i telefonski poziv nisu isti tekst. Dobijaš predlog za svaki, sa konkretnim
problemom sa njihovog sajta u prvoj rečenici.

**Ćirilica i latinica normalizovane**
„Столарија Мићић“ i „Stolarija Micic“ su ista firma. Bez toga ti se ista firma pojavi tri puta
u listi, a jednu propustiš.

---

## 6. Poređenje

> ## Tri načina da nađeš iste firme.
> Dva od njih si već probao.

| | Ručno guglanje | Zapadni lead alati | **Sajtoskop** |
|---|---|---|---|
| Pokrivenost srpskih mikro-firmi | Potpuna, ali ručno | Skoro nikakva | **Potpuna, automatski** |
| Filter „firma nema sajt“ | Otvaraš jednu po jednu | Ne postoji | **Jedan klik** |
| Ocena sajta i konkretni problemi | Procenjuješ napamet | Retko, površno | **Ugly Score 0–100 + lista** |
| Telefon sa tipom (Viber ili poziv) | Sam gataš iz prefiksa | Ne | **Automatski** |
| Predlog poruke na srpskom | Pišeš sam, svaki put | Engleski šabloni | **Po kanalu, sa problemom** |
| Vreme do liste od 50 firmi | Ceo radni dan | Sat, pa prazno | **Par minuta** |
| Mesečni trošak | Tvoje neplaćeno vreme | 60–300 € | **0 € tokom bete** |

---

## 7. Za koga je

> ## Ako ti prihod zavisi od toga koga si kontaktirao ove nedelje.
>
> Tri profila koji od prvog dana imaju konkretnu korist. Ako se ne prepoznaješ ni u jednom —
> alat verovatno nije za tebe, i to je u redu.

**Frilenser web dizajner**
*„Radiš preko preporuke i onda dođe mesec bez preporuke.“*
→ Skeniraš tri niše u svom gradu i imaš dvadeset firmi bez sajta koje niko još nije zvao. Prva
poruka nije hladna — ima screenshot i razlog.

**Mala agencija (2–5 ljudi)**
*„Neko mora da puni pipeline, a svi su na projektima.“*
→ Jedna osoba za jedno popodne napuni kanban za ceo mesec. Statusi su zajednički, ne dupliraš
kontakt koji je kolega već poslao.

**Marketar i prodavac**
*„Baze koje kupuješ su stare, a odziv je ispod jedan posto.“*
→ Podatak je svež iz Google-a, sa razlogom za kontakt koji je vidljiv i firmi. Poruka koja
počinje konkretnim problemom se otvara.

---

## 8. Beta ponuda

> ## Beta je besplatna dok traje.
>
> 30 kredita mesečno. Bez kartice, bez obaveze, bez ugovora i bez broja mesta koji otkucava.

**Šta ulazi u besplatnu betu**
- 30 kredita mesečno — jedan kredit otključava jednog prospekta
- Neograničeno skeniranje gradova i niša
- Ugly Score, screenshot i lista problema za svaki otključan sajt
- Predlozi poruka na srpskom, po kanalima
- Kanban tabla za praćenje pipeline-a
- Izvoz otključanih prospekata u CSV

**Šta se dešava kad beta prestane**
Kad uvedem planove, javljam unapred — mejlom, a ne tako što ti se jednog jutra pojavi paywall.
Ljudi iz bete dobijaju cenu koja se ne ponavlja. Ako ti tada ne odgovara, izvezeš svoje
prospekte i odeš bez pitanja.

*Beta znači da se alat menja, da povremeno nešto ne radi i da nema garancije dostupnosti.
Zauzvrat ne plaćaš ništa i tvoja reč utiče na to šta se pravi sledeće.*

---

## 9. Pitanja

**Da li je ovo legalno?**
Jeste. Podaci su javni, dolaze sa Google Maps-a preko zvaničnog Places API-ja, uz poštovanje
njihovih uslova korišćenja. Sajtovi se čitaju uz poštovanje robots.txt fajla, sa
identifikujućim User-Agent-om i najviše jednim zahtevom u sekundi po domenu. Za način na koji
šalješ poruke odgovoran si ti — u alatu stoji kratko uputstvo i šablon za opt-out, iskoristi ih.

**Radi li za Hrvatsku i Bosnu?**
Ne još. Srbija prvo. Baza je od prvog dana pripremljena za više zemalja, ali dok Srbija ne radi
kako treba, ne širim se. Ako ti treba region, javi mi — to menja redosled.

**Šta ako podaci nisu tačni?**
Podaci sa Google-a se osvežavaju u 30-dnevnom ciklusu, tako da nikad ne dobiješ podatak stariji
od trideset dana. Ocena sajta se radi u trenutku kad otključaš prospekta, ne unapred — znači
vidiš kako sajt izgleda danas, a ne kako je izgledao kad sam ja skenirao nišu.

**Koliko traje beta?**
Dok ne skupim dovoljno povratnih informacija da znam šta da naplatim i za koliko. Realno mesec
do dva. Javljam unapred pre bilo kakve promene — nema tihog gašenja i nema iznenadnog paywalla.

**Ko si ti?**
Marko Milenković, radim pod imenom Remati. Pravim sajtove i alate, i Sajtoskop sam napravio
zato što mi je trebao za sopstveni pipeline — prvo je bio skripta u terminalu za mene, pa sam
shvatio da isti problem ima svako ko prodaje izradu sajtova u Srbiji. Koristim ga sam, svaki
dan. Nisam tim, nisam startap i nemam investitore, pa ti na mejl odgovaram lično.

**Šta se dešava sa mojim prospektima ako odustanem?**
Izvezeš ih u CSV i to je to. Ne držim ti podatke kao talca. Nalog i sve što je uz njega brišem
na zahtev, i ta procedura stvarno postoji, nije samo rečenica u politici privatnosti.

**Da li ću dobiti iste firme kao svi ostali korisnici?**
Firme dolaze iz istog javnog izvora, pa se preklapanje dešava ako dvoje ljudi skenira istu nišu
u istom gradu. Zato je alat najkorisniji za gradove i niše koje niko sistematski ne obrađuje, a
takvih je u Srbiji mnogo više nego što izgleda. Statuse i istoriju kontakta vidiš samo ti.

---

## 10. Završni CTA

> ## Izaberi grad. Vidi ko nema sajt. **Danas.**
>
> Za pet minuta imaš listu firmi u svom gradu koje plaćaju Google oglase, imaju recenzije i
> posao — a nemaju gde da pošalju čoveka koji hoće da kupi.
>
> `[tvoj@mejl.com]` `[Uđi u betu →]`
>
> 58% PVC stolarija, Šabac · 57% Advokat, Kragujevac · 48% Autoplac, Čačak

---

## Futer

Lead-gen alat za web dizajnere, frilensere i agencije u Srbiji. Nađi firme sa lošim ili
nepostojećim sajtovima i pošalji poruku koja ima razlog.

**Proizvod:** Kako radi · Za koga je · Beta ponuda · Pitanja
**Pravno:** Uslovi korišćenja · Politika privatnosti
**Kontakt:** Piši mi

© 2026 Sajtoskop · Marko Milenković / Remati. Sva prava zadržana.
*Sajtoskop nije povezan sa kompanijom Google. Google i Google Maps su zaštićeni znaci kompanije
Google LLC.*

---

## Šta NIJE na stranici (po PRD-u, namerno)

- cenovnik
- roadmap
- tehnički stack
- lifetime ponuda
- brojač preostalih mesta
- lažni testimonijali i logotipi „klijenata“
- izmišljene brojke bilo koje vrste
