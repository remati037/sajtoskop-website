/**
 * Sav kopi landing stranice na jednom mestu.
 *
 * Pravilo: nijedna rečenica koju korisnik vidi ne piše se direktno u JSX-u.
 * Menjaš tekst ovde, komponente ne diraš.
 *
 * Jezik: srpski, latinica, sa dijakritikom. Obraćanje na „ti“.
 */

/* --------------------------------------------------------------------------
   NAVIGACIJA
-------------------------------------------------------------------------- */

export const nav = [
  { label: "Problem", href: "#problem" },
  { label: "Dokaz", href: "#dokaz" },
  { label: "Kako radi", href: "#kako-radi" },
  { label: "Za koga", href: "#za-koga" },
  { label: "Pitanja", href: "#faq" },
] as const;

/* --------------------------------------------------------------------------
   GLOBALNI CTA — jedan poziv na akciju, ponovljen kroz celu stranicu
-------------------------------------------------------------------------- */

export const cta = {
  label: "Isprobaj besplatno",
  labelShort: "Isprobaj besplatno",
  sub: "Bez kartice. 30 kredita mesečno. Beta verzija je još uvek besplatna.",
  formPlaceholder: "example@email.com",
  formButton: "Isprobaj besplatno",
  formNote: "Javljam ti se lično, ne šaljem automatske mejlove.",
  successTitle: "Uspešno si se prijavio na listu čekanja.",
  successBody:
    "Šaljem ti pristup lično. Proveri i spam folder, jer mejl stiže sa adrese koju verovatno nemaš u kontaktima.",
  errorGeneric: "Nešto je puklo na mojoj strani. Probaj ponovo za koji trenutak.",
  errorEmail: "Ovo ne liči na ispravnu mejl adresu.",
  errorDuplicate: "Ova adresa je već na listi. Javljam se uskoro.",
} as const;

/* --------------------------------------------------------------------------
   HERO
   VAŽNO: broj u naslovu mora biti tvoj stvaran podatak iz scana (PRD, sekcija 1).
   Ako se promenio posle novih skeniranja, promeni ga OVDE i u `proof.rows`.
-------------------------------------------------------------------------- */

export const hero = {
  badge: "Isprobaj besplatno · Srbija",
  scanLabel: "SCAN · ŠABAC · PVC STOLARIJA",
  titleLine1: "U Šapcu 58% PVC stolarija",
  titleLine2: "nema sajt koji radi.",
  titleAccent: "58%",
  lede: "Sajtoskop zna njihova imena, telefone i tačan problem. Izabereš grad i nišu, alat skenira Google Maps, oceni svaki sajt od 0 do 100 i da ti kontakt, screenshot i listu konkretnih problema. Tvoje je samo da pošalješ pripremljenu poruku.",
  trust: [
    "Podaci sa Google Maps-a",
    // "Zvanični Places API",
    "Napravljeno za Srbiju",
  ],
} as const;

/* --------------------------------------------------------------------------
   MOCK APLIKACIJE — podaci za animirani „skener“ u herou.
   Ovo su izmišljena imena firmi, namerno: ne prikazujem stvarne prospekte
   javno pre nego što ih neko otključa.
-------------------------------------------------------------------------- */

export type Band = "nema" | "katastrofa" | "ruzan" | "osrednji" | "solidan";

export const bandLabel: Record<Band, string> = {
  nema: "Nema sajt",
  katastrofa: "Katastrofa",
  ruzan: "Ružan",
  osrednji: "Osrednji",
  solidan: "Solidan",
};

export const scanDemo = {
  query: { grad: "Šabac", nisa: "PVC stolarija" },
  statusScanning: "Skeniram Google Maps",
  statusDone: "Skeniranje završeno",
  legend: "Zeleno = firma uopšte nema sajt. To je najbolji lead.",
  columns: ["Firma", "Ugly Score", "Problem", ""] as const,
  rows: [
    { name: "PVC Mont Šabac", score: null, band: "nema" as Band, issue: "nema sajt · samo Instagram", phone: "064 3•• •••", locked: true },
    { name: "Alu-Plast Sistem", score: null, band: "nema" as Band, issue: "nema sajt · samo Maps profil", phone: "062 7•• •••", locked: true },
    { name: "Stolarija Mićić", score: 94, band: "katastrofa" as Band, issue: "mrtav domen · greška 522", phone: "015 3•• •••", locked: true },
    { name: "Termo Prozor d.o.o.", score: 81, band: "katastrofa" as Band, issue: "nije mobilni · bez SSL-a", phone: "064 1•• •••", locked: true },
    { name: "Vekaplast Mačva", score: 63, band: "ruzan" as Band, issue: "učitava se 8,4 s · nema kontakt", phone: "065 4•• •••", locked: true },
    { name: "Prozori Plus", score: 41, band: "osrednji" as Band, issue: "stara galerija · nema CTA", phone: "015 8•• •••", locked: true },
    { name: "Fenester Group", score: 12, band: "solidan" as Band, issue: "solidan sajt — nije lead", phone: "011 2•• •••", locked: false },
  ],
  footer: "7 od 12 firmi u ovoj niši nema sajt koji radi",
} as const;

/* --------------------------------------------------------------------------
   1. PROBLEM
-------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "Cena čekanja",
  title: "Dok ti guglaš, neko drugi već zove.",
  lede: "Nije problem u tome što nema posla. Problem je što je posao zakopan ispod četiri sata ručnog traženja, a ti to radiš neplaćeno, pre nego što uopšte dođeš do prve poruke.",
  items: [
    {
      tag: "Vreme",
      title: "Sati odlaze na guglanje firmi",
      body: "Otvoriš Maps, pa četrdeset tabova, pa ručno proveravaš ko od njih uopšte ima sajt i da li taj sajt radi. Pola dana za deset firmi, od kojih je osam već nečiji klijent.",
      stat: "4h",
      statLabel: "po jednoj niši, ručno",
    },
    {
      tag: "Poruka",
      title: "Ne znaš šta da napišeš",
      body: "Kad konačno nađeš nekoga, poruka ispadne generička jer ne znaš šta tačno ne valja na njegovom sajtu. Generička poruka je spam, a spam se ne otvara.",
      stat: "0",
      statLabel: "odgovora na „Zdravo, bavim se izradom sajtova“",
    },
    {
      tag: "Alati",
      title: "Zapadni alati ne vide Srbiju",
      body: "Apollo, Clay i slični traže firme sa „lošim sajtom“. Kod nas je najbolji lead firma koja sajt uopšte nema, a to nijedan strani alat ne ume da filtrira, jer u njihovim bazama takvih firmi skoro i nema.",
      stat: "≈0",
      statLabel: "srpskih mikro-firmi u njihovim bazama",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   2. DOKAZ — stvarne brojke iz tvojih scanova
   PRD: „Ovo nisu procene. To su brojevi iz stvarnih skeniranja.“
-------------------------------------------------------------------------- */

export const proof = {
  eyebrow: "Podaci, ne obećanja",
  title: "Ovo nisu procene.",
  titleAccent: "Ovo su brojevi iz stvarnih skeniranja.",
  lede: "Tri niše koje sam skenirao pre nego što sam napisao ijednu liniju landing stranice. Svaki procenat je udeo firmi koje nemaju sajt, imaju mrtav domen ili imaju samo društvenu mrežu.",
  columns: ["Niša", "Grad", "Bez sajta koji radi"] as const,
  rows: [
    { nisa: "PVC stolarija", grad: "Šabac", pct: 58 },
    { nisa: "Advokat", grad: "Kragujevac", pct: 57 },
    { nisa: "Autoplac", grad: "Čačak", pct: 48 },
  ],
  footnote:
    "Skenirano preko zvaničnog Google Places API-ja.",
} as const;

/* --------------------------------------------------------------------------
   3. KAKO RADI
-------------------------------------------------------------------------- */

export const how = {
  eyebrow: "Tri koraka",
  title: "Od praznog ekrana do prve poruke, za par minuta.",
  lede: "Bez podešavanja, bez učenja alata, bez uvoza ičega. Otvoriš, izabereš dve stvari i gledaš rezultat.",
  steps: [
    {
      n: "01",
      title: "Izabereš grad i nišu",
      body: "Šabac i PVC stolarija. Ili Kragujevac i stomatolog. Dva padajuća menija, bez upita i bez filtera koje treba naučiti.",
      detail: "Ćirilica i latinica se normalizuju — „Столарија“ i „Stolarija“ su ista firma.",
    },
    {
      n: "02",
      title: "Sajtoskop skenira i oceni",
      body: "Povlači firme sa Google Maps-a, otvara svaki sajt i daje mu Ugly Score od 0 do 100, sa listom konkretnih problema: mrtav domen, nije optimizovan za mobilni, sporo se učitava, nema kontakt.",
      detail: "Firme koje sajt uopšte nemaju idu na vrh liste, obeležene zeleno.",
    },
    {
      n: "03",
      title: "Otključaš i pišeš",
      body: "Jedan kredit otvara telefon, mejl, screenshot sajta i predlog poruke na srpskom, prilagođen kanalu. Kopiraš i šalješ. Ceo pipeline pratiš u kanban tabli.",
      detail: "Isti lead nikad ne plaćaš dvaput. Otključan jednom i zauvek je tvoj.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   4. ANATOMIJA LEADA — šta dobiješ za jedan kredit
-------------------------------------------------------------------------- */

export const anatomy = {
  eyebrow: "Jedan kredit",
  title: "Šta tačno dobiješ kad otključaš lead.",
  lede: "Ne dobijaš red u tabeli. Dobijaš sve što ti treba da pošalješ poruku koja ima razlog da postoji.",
  business: {
    name: "PVC Mont Šabac",
    category: "PVC stolarija · Šabac",
    rating: "4,6 ★ · 38 recenzija",
    scoreLabel: "Nema sajt",
    phone: "064 312 8890",
    phoneType: "Mobilni · Viber",
    email: "pvcmont.sabac@gmail.com",
    website: "— nema domen —",
  },
  items: [
    { title: "Ime i kategorija", body: "Tačan naziv firme sa Google Maps-a, kategorija i broj recenzija." },
    { title: "Telefon sa tipom", body: "Iz prefiksa znaš da li ide Viber poruka ili poziv. Ne gubiš pokušaj." },
    { title: "Mejl adresa", body: "Kad postoji na sajtu ili u Maps profilu, izvučena i proverena." },
    { title: "Screenshot sajta", body: "Vidiš svojim očima kako izgleda pre nego što napišeš rečenicu o tome." },
    { title: "Ugly Score i bend", body: "Ocena od 0 do 100 i bend: Solidan, Osrednji, Ružan ili Katastrofa." },
    { title: "Lista konkretnih problema", body: "„Nije prilagođen mobilnom“, „Učitava se 8 sekundi“, „Nema kontakt formu“." },
    { title: "Predlog poruke", body: "Na srpskom, po kanalu, sa konkretnim problemom u prvoj rečenici." },
    { title: "Status u pipeline-u", body: "Nekontaktiran, Kontaktiran, Odgovorio, Potpisan, Nezainteresovan." },
  ],
  issues: [
    "Domen ne odgovara - greška 522",
    "Nije prilagođen mobilnom telefonu",
    "Nema kontakt formu ni broj telefona",
    "Poslednja izmena sadržaja: 2019.",
  ],
  messageLabel: "Predlog poruke · Viber",
  message:
    "Dobar dan, video sam da imate odlične ocene na Google-u, ali da firma trenutno nema sajt. Ljudi koji vas nađu na Google Maps-u nemaju gde da vide radove i cene. Napravio bih vam jednostavan sajt sa galerijom i formom za upit. Mogu da Vam pošaljem predlog, bez obaveze.",
} as const;

/* --------------------------------------------------------------------------
   5. SRPSKE SPECIFIČNOSTI — diferencijator, ne krije se
-------------------------------------------------------------------------- */

export const local = {
  eyebrow: "Zašto baš ovaj alat",
  title: "Napravljen za Srbiju, a ne preveden na srpski.",
  lede: "Ovo su četiri stvari koje strani alati ne rade, a bez kojih na našem tržištu nemaš upotrebljivu listu.",
  items: [
    {
      title: "Filter „nema sajt“, „samo Instagram“, „mrtav domen“",
      body: "Najbolji lead kod nas nije firma sa ružnim sajtom. To je firma koja sajt uopšte nema, a ima 40 recenzija i posao koji radi. Takve idu na vrh liste.",
    },
    {
      title: "Tip telefona iz prefiksa",
      body: "06x je mobilni, ide Viber. Fiksni prefiks znači poziv u radno vreme. Alat ti kaže koji je koji, pa ne trošiš pokušaj na pogrešan kanal.",
    },
    {
      title: "Poruke na srpskom, po kanalima",
      body: "Mejl, Viber i telefonski poziv nisu isti tekst. Dobijaš predlog za svaki, sa konkretnim problemom sa njihovog sajta u prvoj rečenici.",
    },
    {
      title: "Ćirilica i latinica normalizovane",
      body: "„Столарија Мићић“ i „Stolarija Micic“ su ista firma. Bez toga ti se ista firma pojavi tri puta u listi, a jednu propustiš.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   6. POREĐENJE
-------------------------------------------------------------------------- */

export const compare = {
  eyebrow: "Alternative",
  title: "Tri načina da nađeš iste firme.",
  lede: "Dva od njih si verovatno već probao.",
  columns: ["Ručno guglanje", "Zapadni lead alati", "Sajtoskop"] as const,
  highlight: 2,
  rows: [
    {
      label: "Pokrivenost srpskih mikro-firmi",
      values: ["Potpuna, ali ručno", "Skoro nikakva", "Potpuna, automatski"],
      marks: ["warn", "no", "yes"],
    },
    {
      label: "Filter „firma nema sajt“",
      values: ["Otvaraš jednu po jednu", "Ne postoji", "Jedan klik"],
      marks: ["warn", "no", "yes"],
    },
    {
      label: "Ocena sajta i konkretni problemi",
      values: ["Procenjuješ napamet", "Retko, površno", "Ugly Score 0-100 + lista"],
      marks: ["no", "warn", "yes"],
    },
    {
      label: "Telefon sa tipom (Viber ili poziv)",
      values: ["Sam zaključuješ iz prefiksa", "Ne", "Automatski"],
      marks: ["warn", "no", "yes"],
    },
    {
      label: "Predlog poruke na srpskom",
      values: ["Pišeš sam, svaki put", "Engleski šabloni", "Po kanalu, sa problemom"],
      marks: ["no", "no", "yes"],
    },
    {
      label: "Vreme do liste od 50 firmi",
      values: ["Ceo radni dan", "Sat, pa prazno", "Par minuta"],
      marks: ["no", "warn", "yes"],
    },
    {
      label: "Mesečni trošak",
      values: ["Tvoje neplaćeno vreme", "60–300 €", "0€ tokom Beta faze"],
      marks: ["warn", "no", "yes"],
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   7. ZA KOGA JE
-------------------------------------------------------------------------- */

export const audience = {
  eyebrow: "Za koga je",
  title: "Ako ti prihod zavisi od toga koga si kontaktirao ove nedelje.",
  lede: "Tri profila koji od prvog dana imaju konkretnu korist. Ako se ne prepoznaješ ni u jednom, alat verovatno nije za tebe, i to je u redu.",
  items: [
    {
      role: "Freelencer web dizajner",
      pain: "Radiš preko preporuke i onda dođe mesec bez preporuke.",
      win: "Skeniraš tri niše u svom gradu i imaš dvadeset firmi bez sajta koje niko još nije zvao. Prva poruka nije hladna, ima screenshot i razlog.",
    },
    {
      role: "Mala agencija (2-5 ljudi)",
      pain: "Neko mora da puni pipeline, a svi su na projektima.",
      win: "Jedna osoba za jedno popodne napuni kanban za ceo mesec. Statusi su zajednički, ne dupliraš kontakt koji je kolega već poslao.",
    },
    {
      role: "Marketar i prodavac",
      pain: "Baze koje kupuješ su stare, a odziv je ispod jedan posto.",
      win: "Podatak je svež iz Google-a, sa razlogom za kontakt koji je vidljiv i firmi. Dobijaš poruku koja počinje konkretnim problemom.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   8. BETA PONUDA
-------------------------------------------------------------------------- */

export const beta = {
  eyebrow: "Ponuda, bez sitnih slova",
  title: "Beta faza je besplatna.",
  lede: "30 kredita mesečno. Bez kartice, bez obaveze, bez ugovora i bez broja mesta koji otkucava.",
  includes: [
    "30 kredita mesečno - jedan kredit otključava jedan lead",
    "Neograničeno skeniranje gradova i niša",
    "Ugly Score, screenshot i lista problema za svaki otključan sajt",
    "Predlozi poruka na srpskom, po kanalima",
    "Kanban tabla za praćenje pipeline-a",
    "Izvoz otključanih prospekata u CSV",
  ],
  promise: {
    title: "Šta se dešava kada izađemo iz Beta faze?",
    body: "Kad uvedem planove, javljam unapred mejlom, a ne tako što ti se jednog jutra pojavi paywall. Ljudi iz Beta faze dobijaju cenu koja se ne ponavlja. Ako ti tada ne odgovara, izvezeš svoje prospekte (leadove) i odeš bez pitanja.",
  },
  finePrint:
    "Beta znači da se alat menja, da povremeno nešto ne radi i da nema garancije dostupnosti. Zauzvrat ne plaćaš ništa i tvoja reč utiče na to šta se pravi sledeće.",
} as const;

/* --------------------------------------------------------------------------
   9. FAQ
-------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "Pitanja",
  title: "Ono što bih i ja pitao.",
  items: [
    {
      q: "Da li je ovo legalno?",
      a: "Jeste. Podaci su javni, dolaze sa Google Maps-a preko zvaničnog Places API-ja, uz poštovanje njihovih uslova korišćenja. Sajtovi se čitaju uz poštovanje robots.txt fajla, sa identifikujućim User-Agent-om i najviše jednim zahtevom u sekundi po domenu. Za način na koji šalješ poruke odgovoran si ti. U alatu stoji kratko uputstvo i šablon za opt-out, iskoristi ih.",
    },
    {
      q: "Radi li za Hrvatsku i Bosnu?",
      a: "Ne još. Trenutno se fokusiramo na Srbiju. Baza je od prvog dana pripremljena za više zemalja, ali dok Srbija ne radi kako treba, ne širimo se na ostale zemlje. Ako ti treba neki drugi region, javi mi, to menja redosled funkcionalnosti.",
    },
    {
      q: "Šta ako podaci nisu tačni?",
      a: "Podaci sa Google-a se osvežavaju u 30-dnevnom ciklusu, tako da nikad ne dobiješ podatak stariji od trideset dana. Ocena sajta se radi u trenutku kad otključaš lead, ne unapred. Znači vidiš kako sajt izgleda danas, a ne kako je izgledao kad sam ja skenirao nišu.",
    },
    {
      q: "Koliko traje Beta faza?",
      a: "Dok ne skupim dovoljno povratnih informacija da znam šta da naplatim i za koliko. Realno mesec do dva. Javljam unapred pre bilo kakve promene. Nema tihog gašenja i nema iznenadnog paywalla.",
    },
    {
      q: "Ko stoji iza Sajtoskopa?",
      a: "Marko Milenković, radim pod imenom Remati. Pravim sajtove i alate, i Sajtoskop sam napravio zato što mi je trebao za sopstveni pipeline. Prvo je bio skripta u terminalu za mene, pa sam shvatio da isti problem ima svako ko prodaje izradu sajtova u Srbiji. Koristim ga sam, svaki dan. Nisam tim, nisam startap i nemam investitore, pa ti na mejl odgovaram lično.",
    },
    {
      q: "Šta se dešava sa mojim prospektima (leadovima) ako odustanem?",
      a: "Izvezeš ih u CSV i to je to. Nalog i sve što je uz njega brišem na zahtev, i ta procedura stvarno postoji, nije samo rečenica u politici privatnosti.",
    },
    {
      q: "Da li ću dobiti iste firme kao svi ostali korisnici?",
      a: "Firme dolaze iz istog javnog izvora, pa se preklapanje dešava ako dvoje ljudi skenira istu nišu u istom gradu. Zato je alat najkorisniji za gradove i niše koje niko sistematski ne obrađuje, a takvih je u Srbiji mnogo više nego što izgleda. Statuse i istoriju kontakta vidiš samo ti.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   10. ZAVRŠNI CTA
-------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: "Poslednja stvar",
  title: "Izaberi grad. Vidi ko nema sajt.",
  titleAccent: "Danas.",
  lede: "Za pet minuta imaš listu firmi u svom gradu koje plaćaju Google oglase, imaju recenzije i posao, a nemaju gde da pošalju čoveka koji hoće da kupi.",
} as const;

/* --------------------------------------------------------------------------
   FUTER
-------------------------------------------------------------------------- */

export const footer = {
  tagline:
    "Lead-gen alat za web dizajnere, freelencere i agencije u Srbiji. Nađi firme sa lošim ili nepostojećim sajtovima i pošalji im poruku danas.",
  columns: [
    {
      title: "Proizvod",
      links: [
        { label: "Kako radi", href: "#kako-radi" },
        { label: "Za koga je", href: "#za-koga" },
        { label: "Beta ponuda", href: "#beta" },
        { label: "Pitanja", href: "#faq" },
      ],
    },
    {
      title: "Pravno",
      links: [
        { label: "Uslovi korišćenja", href: "/uslovi" },
        { label: "Politika privatnosti", href: "/privatnost" },
      ],
    },
    {
      title: "Kontakt",
      links: [{ label: "Piši mi", href: "/kontakt" }],
    },
  ],
  legalNote:
    "Sajtoskop nije povezan sa kompanijom Google. Google i Google Maps su zaštićeni znaci kompanije Google LLC.",
} as const;
