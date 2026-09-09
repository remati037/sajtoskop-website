/**
 * Sav kopi landing stranice na jednom mestu.
 *
 * Pravilo: nijedna rečenica koju korisnik vidi ne piše se direktno u JSX-u.
 * Menjaš tekst ovde, komponente ne diraš.
 *
 * Jezik: srpski, latinica, sa dijakritikom. Obraćanje na „ti“.
 *
 * Prethodna verzija (besplatna Beta faza, lista čekanja) stoji u
 * `arhiva/content-beta-2026-09.ts.bak`.
 */

/* --------------------------------------------------------------------------
   NAVIGACIJA
-------------------------------------------------------------------------- */

export const nav = [
  { label: "Problem", href: "#problem" },
  { label: "Dokaz", href: "#dokaz" },
  { label: "Kako radi", href: "#kako-radi" },
  { label: "Cene", href: "#cene" },
  { label: "Pitanja", href: "#faq" },
] as const;

/* --------------------------------------------------------------------------
   PROBNI PERIOD
   Jedno mesto za sve brojke o probi. Menjaš ovde, menja se svuda:
   hero, CTA dugmad, cenovnik, FAQ, OG slika.
-------------------------------------------------------------------------- */

export const trial = {
  days: 7,
  /** Bonus krediti koje dobiješ na registraciju, važe tokom probe. */
  credits: 10,
  label: "7 dana besplatno",
  /** Puna, poštena rečenica o naplati — ide svuda gde se pominje proba. */
  terms:
    "Karticu unosiš odmah, prva naplata je tek osmog dana. Otkažeš pre toga i ne plaćaš ništa.",
} as const;

/* --------------------------------------------------------------------------
   GLOBALNI CTA — jedan poziv na akciju, ponovljen kroz celu stranicu
-------------------------------------------------------------------------- */

export const cta = {
  label: "Počni besplatno",
  labelShort: "Počni besplatno",
  sub: `${trial.days} dana besplatno i ${trial.credits} bonus kredita. Otkažeš pre naplate i ne plaćaš ništa.`,
  formPlaceholder: "example@email.com",
  formButton: "Počni besplatno",
  formNote: "Javljam ti se lično, ne šaljem automatske mejlove.",
  successTitle: "Stigla je tvoja prijava.",
  successBody:
    "Šaljem ti pristup lično. Proveri i spam folder, jer mejl stiže sa adrese koju verovatno nemaš u kontaktima.",
  errorGeneric: "Nešto je puklo na mojoj strani. Probaj ponovo za koji trenutak.",
  errorEmail: "Ovo ne liči na ispravnu mejl adresu.",
  errorDuplicate: "Ova adresa je već prijavljena. Javljam se uskoro.",
} as const;

/* --------------------------------------------------------------------------
   HERO
   VAŽNO: broj u naslovu mora biti tvoj stvaran podatak iz scana (PRD, sekcija 1).
   Ako se promenio posle novih skeniranja, promeni ga OVDE i u `proof.rows`.
-------------------------------------------------------------------------- */

export const hero = {
  badge: `${trial.label} · Srbija`,
  scanLabel: "SCAN · ŠABAC · PVC STOLARIJA",
  titleLine1: "Prestani da guglaš klijente.",
  titleLine2: "Spisak je gotov za 4 minuta.",
  titleAccent: "4 minuta",
  lede: "Dok ti otvaraš četrdeset tabova, Sajtoskop skenira celu nišu u tvom gradu i izdvoji firme koje rade, imaju recenzije i ljudi ih zovu, a nemaju sajt. Sa telefonom, screenshotom i porukom koja je spremna za slanje.",
  trust: [
    `${trial.days} dana besplatno`,
    "Otkažeš kad hoćeš",
    "Podaci sa Google Mapsa",
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
  badge: "pretraga",
  statusScanning: "Skeniram Google Maps",
  statusDone: "Skeniranje završeno",
  legend: "Zeleno znači da firma uopšte nema sajt. To je najbolji prospekt.",
  columns: ["Firma", "Ugly Score", "Problem", ""] as const,
  rows: [
    { name: "PVC Mont Šabac", score: null, band: "nema" as Band, issue: "nema sajt · samo Instagram", phone: "064 3•• •••", locked: true },
    { name: "Aluplast Sistem", score: null, band: "nema" as Band, issue: "nema sajt · samo Maps profil", phone: "062 7•• •••", locked: true },
    { name: "Stolarija Mićić", score: 94, band: "katastrofa" as Band, issue: "mrtav domen · greška 522", phone: "015 3•• •••", locked: true },
    { name: "Termo Prozor d.o.o.", score: 81, band: "katastrofa" as Band, issue: "ne radi na telefonu · nije bezbedan", phone: "064 1•• •••", locked: true },
    { name: "Vekaplast Mačva", score: 63, band: "ruzan" as Band, issue: "učitava se 8,4 s · nema kontakt", phone: "065 4•• •••", locked: true },
    { name: "Prozori Plus", score: 41, band: "osrednji" as Band, issue: "stara galerija · nema dugme za upit", phone: "015 8•• •••", locked: true },
    { name: "Fenester Group", score: 12, band: "solidan" as Band, issue: "solidan sajt, nije prospekt", phone: "011 2•• •••", locked: false },
  ],
  footer: "7 od 12 firmi u ovoj niši nema sajt koji radi",
} as const;

/* --------------------------------------------------------------------------
   1. PROBLEM — najveći problem, bez uvijanja
-------------------------------------------------------------------------- */

export const problem = {
  eyebrow: "Najveći problem",
  title: "Ne fali ti posla. Fali ti spisak.",
  lede: "Firme bez sajta postoje u svakom gradu u Srbiji, u svakoj niši, i niko ih ne zove. Problem je što do tog spiska dolaziš ručno, u svoje slobodno vreme, a to je posao koji ti niko ne plaća, pa ga radiš tek kad ostaneš bez klijenata. Tada je već kasno.",
  items: [
    {
      tag: "Vreme",
      title: "Traženje klijenata je neplaćen posao",
      body: "Otvoriš Maps, pa četrdeset tabova, pa ručno proveravaš ko od njih uopšte ima sajt i da li taj sajt radi. Pola dana za deset firmi, od kojih je osam već nečiji klijent. To vreme ne naplaćuješ nikome.",
      stat: "4h",
      statLabel: "po jednoj niši, ručno",
    },
    {
      tag: "Poruka",
      title: "Poruka bez razloga se ne otvara",
      body: "Kad konačno nađeš nekoga, ne znaš šta tačno ne valja na njegovom sajtu, pa poruka ispadne ista kao svačija. „Zdravo, bavim se izradom sajtova“ je rečenica koju je taj čovek dobio već petnaest puta ove godine.",
      stat: "1%",
      statLabel: "odgovora na poruku koja je ista za svakoga",
    },
    {
      tag: "Tržište",
      title: "Zapadni alati ne vide Srbiju",
      body: "Apollo, Clay i slični traže firme sa „lošim sajtom“. Kod nas je najbolji lead firma koja sajt uopšte nema, a to nijedan strani alat ne ume da filtrira, jer u njihovim bazama takvih firmi skoro i nema.",
      stat: "≈0",
      statLabel: "malih srpskih firmi u njihovim bazama",
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
  lede: "Tri niše koje sam skenirao pre nego što sam napisao ijednu liniju ove stranice. Svaki procenat je udeo firmi koje nemaju sajt, imaju mrtav domen ili imaju samo društvenu mrežu. Svaka od njih je neko ko te još nije čuo, a treba mu ono što radiš.",
  columns: ["Niša", "Grad", "Bez sajta koji radi"] as const,
  rows: [
    { nisa: "PVC stolarija", grad: "Šabac", pct: 58 },
    { nisa: "Advokat", grad: "Kragujevac", pct: 57 },
    { nisa: "Autoplac", grad: "Čačak", pct: 48 },
  ],
  footnote:
    "Skenirano preko zvaničnog Google Places servisa. Tri niše u tri grada. U Srbiji ima na stotine ovakvih spojeva grada i niše koje niko ne obrađuje.",
} as const;

/* --------------------------------------------------------------------------
   3. KAKO RADI — rešenje, u tri koraka
-------------------------------------------------------------------------- */

export const how = {
  eyebrow: "Rešenje, u tri koraka",
  title: "Od praznog ekrana do prve poruke, za par minuta.",
  lede: "Bez podešavanja, bez učenja alata, bez uvoza ičega. Otvoriš, izabereš dve stvari i gledaš kako se lista puni.",
  steps: [
    {
      n: "01",
      title: "Izabereš grad i nišu",
      body: "Šabac i PVC stolarija. Ili Kragujevac i stomatolog. Dva padajuća menija, bez upita i bez filtera koje treba naučiti.",
      detail: "Svejedno je da li se firma piše ćirilicom ili latinicom. „Столарија“ i „Stolarija“ su za alat ista firma.",
    },
    {
      n: "02",
      title: "Sajtoskop skenira i oceni",
      body: "Povlači firme sa Google Mapsa, otvara svaki sajt i daje mu Ugly Score od 0 do 100, sa listom konkretnih problema: mrtav domen, ne radi na telefonu, sporo se učitava, nema kontakt.",
      detail: "Firme koje sajt uopšte nemaju idu na vrh liste, obeležene zeleno.",
    },
    {
      n: "03",
      title: "Otključaš i pišeš",
      body: "Jedan kredit otvara telefon, mejl, screenshot sajta i predlog poruke na srpskom, prilagođen tome gde je šalješ. Kopiraš i šalješ. Sve kontakte pratiš na tabli.",
      detail: "Isti prospekt nikad ne plaćaš dvaput. Otključan jednom i zauvek je tvoj.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   4. ANATOMIJA LEADA — šta dobiješ za jedan kredit
-------------------------------------------------------------------------- */

export const anatomy = {
  eyebrow: "Jedan kredit",
  title: "Šta tačno dobiješ kad otključaš prospekt.",
  lede: "Ne dobijaš red u tabeli. Dobijaš sve što ti treba da pošalješ poruku koja ima razlog da postoji. I to za manje novca nego što košta jedna kafa.",
  business: {
    name: "PVC Mont Šabac",
    category: "PVC stolarija · Šabac",
    rating: "4,6 ★ · 38 recenzija",
    scoreLabel: "Nema sajt",
    phone: "064 312 8890",
    phoneType: "Mobilni · Viber",
    email: "pvcmont.sabac@gmail.com",
    website: "nema domen",
  },
  items: [
    { title: "Ime i kategorija", body: "Tačan naziv firme sa Google Mapsa, kategorija i broj recenzija." },
    { title: "Telefon sa tipom", body: "Iz prefiksa znaš da li ide Viber poruka ili poziv. Ne gubiš pokušaj." },
    { title: "Mejl adresa", body: "Kad postoji na sajtu ili u Maps profilu, izvučena i proverena." },
    { title: "Screenshot sajta", body: "Vidiš svojim očima kako izgleda pre nego što napišeš rečenicu o tome." },
    { title: "Ugly Score i bend", body: "Ocena od 0 do 100 i bend: Solidan, Osrednji, Ružan ili Katastrofa." },
    { title: "Lista konkretnih problema", body: "„Nije prilagođen mobilnom“, „Učitava se 8 sekundi“, „Nema kontakt formu“." },
    { title: "Predlog poruke", body: "Na srpskom, sa konkretnim problemom njihovog sajta u prvoj rečenici." },
    { title: "Status kontakta", body: "Nekontaktiran, Kontaktiran, Odgovorio, Potpisan, Nezainteresovan." },
  ],
  issues: [
    "Domen ne odgovara, greška 522",
    "Nije prilagođen mobilnom telefonu",
    "Nema kontakt formu ni broj telefona",
    "Poslednja izmena sadržaja: 2019.",
  ],
  messageLabel: "Predlog poruke · Viber",
  message:
    "Dobar dan, video sam da imate odlične ocene na Googlu, ali da firma trenutno nema sajt. Ljudi koji vas nađu na Google Mapsu nemaju gde da vide radove i cene. Napravio bih vam jednostavan sajt sa galerijom i formom za upit. Mogu da Vam pošaljem predlog, bez obaveze.",
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
      body: "Najbolji prospekt kod nas nije firma sa ružnim sajtom. To je firma koja sajt uopšte nema, a ima 40 recenzija i posao koji radi. Takve idu na vrh liste.",
    },
    {
      title: "Tip telefona iz prefiksa",
      body: "06x je mobilni, ide Viber. Fiksni prefiks znači poziv u radno vreme. Alat ti kaže koji je koji, pa ne trošiš pokušaj na pogrešan kanal.",
    },
    {
      title: "Poruke na srpskom, za mejl, Viber i poziv",
      body: "Mejl, Viber i telefonski poziv nisu isti tekst. Dobijaš predlog za svaki, sa konkretnim problemom njihovog sajta u prvoj rečenici.",
    },
    {
      title: "Ista firma se ne pojavljuje dvaput",
      body: "„Столарија Мићић“ i „Stolarija Micic“ su ista firma. Bez toga ti se ista firma pojavi tri puta u listi, a jednu propustiš.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   6. POREĐENJE
   Red „Mesečni trošak“ mora da prati cenovnik — proveri kad menjaš cene.
-------------------------------------------------------------------------- */

export const compare = {
  eyebrow: "Alternative",
  title: "Tri načina da nađeš iste firme.",
  lede: "Dva od njih si verovatno već probao.",
  columns: ["Ručno guglanje", "Zapadni lead alati", "Sajtoskop"] as const,
  highlight: 2,
  rows: [
    {
      label: "Pokrivenost malih srpskih firmi",
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
      values: ["Procenjuješ napamet", "Retko, površno", "Ugly Score i lista problema"],
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
      values: ["Tvoje neplaćeno vreme", "60 do 300 €", "Od 29 €"],
      marks: ["warn", "no", "yes"],
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   7. ZA KOGA JE — profili se poklapaju sa planovima u cenovniku
-------------------------------------------------------------------------- */

export const audience = {
  eyebrow: "Za koga je",
  title: "Ako ti prihod zavisi od toga koga si kontaktirao ove nedelje.",
  lede: "Tri profila koji od prvog dana imaju konkretnu korist. Ako se ne prepoznaješ ni u jednom, alat verovatno nije za tebe, i to je u redu.",
  items: [
    {
      role: "Frilenser web dizajner",
      pain: "Radiš preko preporuke i onda dođe mesec bez preporuke.",
      win: "Skeniraš tri niše u svom gradu i imaš dvadeset firmi bez sajta koje niko još nije zvao. Prva poruka nije hladna, ima screenshot i razlog. Starter plan je pravljen tačno za ovaj ritam.",
    },
    {
      role: "Studio ili mala agencija",
      pain: "Neko mora da traži nove klijente, a svi su na projektima.",
      win: "Jedna osoba za jedno popodne napuni tablu za ceo mesec. Statusi su zajednički, pa ne dupliraš kontakt koji je kolega već poslao. Pro plan drži tempo ako poruke šalješ svaki dan.",
    },
    {
      role: "Tim koji pokriva celu Srbiju",
      pain: "Baze koje kupuješ su stare, a odziv je ispod jedan posto.",
      win: "Radiš više gradova i više niša u isto vreme, sa svežim podatkom iz Googla i razlogom za kontakt koji je vidljiv i samoj firmi. Advanced plan diže limite skeniranja i izvoza na taj obim.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   8. CENOVNIK
   VAŽNO: brojke ovde moraju da se poklapaju sa Stripe proizvodima u aplikaciji.
   Godišnja cena = 10 mesečnih (dva meseca gratis).
-------------------------------------------------------------------------- */

export type BillingCycle = "monthly" | "yearly";

export const pricing = {
  eyebrow: "Cene",
  title: "Jedan potpisan sajt plaća celu godinu.",
  lede: "Izrada sajta u Srbiji ide od 300 do 800 evra. Ako ti Sajtoskop donese jednog jedinog klijenta godišnje, pretplata je vraćena i ostaje ti višak. Sve preko toga je čist prihod.",
  toggle: {
    monthly: "Mesečno",
    yearly: "Godišnje",
    yearlyBadge: "2 meseca gratis",
  },
  perMonth: "mesečno",
  perYear: "godišnje",
  popular: "Najčešći izbor",
  plans: [
    {
      id: "starter",
      name: "Starter",
      tagline: "Za frilensera koji radi sam i uzima nekoliko klijenata mesečno.",
      priceMonthly: 29,
      priceYearly: 290,
      cta: "Uzmi Starter",
      featured: false,
      features: [
        "100 kredita mesečno",
        "Do 30 skeniranja dnevno",
        "5 AI varijanti poruke dnevno",
        "Izvoz u CSV do 500 redova dnevno",
        "Pretraga po kešu, neograničeno",
        "Podrška mejlom",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "Za studio ili agenciju koja svakog dana traži nove klijente.",
      priceMonthly: 59,
      priceYearly: 590,
      cta: "Uzmi Pro",
      featured: true,
      features: [
        "300 kredita mesečno",
        "Do 60 skeniranja dnevno",
        "20 AI varijanti poruke dnevno",
        "Izvoz u CSV do 2.000 redova dnevno",
        "Pretraga po kešu, neograničeno",
        "Prioritet u podršci",
      ],
    },
    {
      id: "advanced",
      name: "Advanced",
      tagline: "Za tim koji pokriva celu Srbiju i radi u više niša odjednom.",
      priceMonthly: 119,
      priceYearly: 1190,
      cta: "Uzmi Advanced",
      featured: false,
      features: [
        "800 kredita mesečno",
        "Do 120 skeniranja dnevno",
        "60 AI varijanti poruke dnevno",
        "Izvoz u CSV do 10.000 redova dnevno",
        "Pretraga po kešu, neograničeno",
        "Odgovor u istom radnom danu",
      ],
    },
  ],
  /** Traka ispod kartica — skida rizik pre nego što čovek klikne. */
  reassurance: [
    `${trial.days} dana besplatno na svakom planu, sa ${trial.credits} bonus kredita`,
    "Otkažeš u dva klika, bez ugovora i bez otkaznog roka",
    "Menjaš plan gore ili dole u svakom trenutku",
    "Otključani prospekti ostaju tvoji i izvoze se u CSV",
  ],
  finePrint: `${trial.terms} Cene su konačne, to je iznos koji ti se naplati. Plaćanje ide preko Stripea, karticu ne vidim ni ja ni Sajtoskop.`,
} as const;

/* --------------------------------------------------------------------------
   9. FAQ
-------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "Pitanja",
  title: "Ono što bih i ja pitao.",
  items: [
    {
      q: "Šta se dešava posle 7 besplatnih dana?",
      a: `Karticu unosiš na početku, ali ti se ništa ne naplaćuje tokom probe. Dobiješ ${trial.credits} bonus kredita i punih ${trial.days} dana da vidiš kako izgleda lista firmi u tvom gradu. Osmog dana ide prva naplata za plan koji si izabrao. Ako otkažeš bilo kada pre toga, ne plaćaš ništa i ne moraš mi objašnjavati zašto. Otkazivanje su dva klika u nalogu, ne mejl meni.`,
    },
    {
      q: "Koji plan da uzmem?",
      a: "Ako radiš sam i šalješ poruke povremeno, Starter i njegovih 100 kredita mesečno je više nego dovoljno. Ako poruke šalješ svakog dana ili vas je više u timu, Pro. Advanced ima smisla tek kad pokrivaš više gradova i niša paralelno i izvoziš velike liste. Počni od nižeg plana. Plan dižeš kad god hoćeš, a novac koji nisi potrošio niko ti ne vraća.",
    },
    {
      q: "Šta je kredit i šta ga troši?",
      a: "Jedan kredit otključava jedan prospekt: telefon, mejl, screenshot sajta, Ugly Score, listu konkretnih problema i predlog poruke. Skeniranje i pregled liste ne troše kredite. Plaćaš samo ono što stvarno otvoriš. Isti prospekt nikad ne plaćaš dvaput, jednom otključan zauvek je tvoj.",
    },
    {
      q: "Da li je ovo legalno?",
      a: "Jeste. Podaci su javni, dolaze sa Google Mapsa preko zvaničnog Places servisa, uz poštovanje njihovih uslova korišćenja. Sajtove čitam polako, najviše jedan zahtev u sekundi, uz poštovanje pravila koja svaki sajt sam postavi u robots.txt fajlu, i uvek se predstavim svojim imenom. Za način na koji šalješ poruke odgovoran si ti. U alatu stoji kratko uputstvo i gotova rečenica kojom nudiš odjavu, iskoristi ih.",
    },
    {
      q: "Šta ako podaci nisu tačni?",
      a: "Podaci sa Googla se osvežavaju na svakih trideset dana, tako da nikad ne dobiješ stariji podatak od toga. Ocena sajta se radi u trenutku kad otključaš prospekt, ne unapred. Znači vidiš kako sajt izgleda danas, a ne kako je izgledao kad je niša prvi put skenirana.",
    },
    {
      q: "Radi li za Hrvatsku i Bosnu?",
      a: "Ne još. Trenutno se fokusiramo na Srbiju. Baza je od prvog dana pripremljena za više zemalja, ali dok Srbija ne radi kako treba, ne širimo se na ostale zemlje. Ako ti treba neki drugi region, javi mi, to menja redosled funkcionalnosti.",
    },
    {
      q: "Da li ću dobiti iste firme kao svi ostali korisnici?",
      a: "Firme dolaze iz istog javnog izvora, pa se preklapanje dešava ako dvoje ljudi skenira istu nišu u istom gradu. Zato je alat najkorisniji za gradove i niše koje niko ne obrađuje, a takvih je u Srbiji mnogo više nego što izgleda. Statuse i istoriju kontakta vidiš samo ti.",
    },
    {
      q: "Šta biva sa mojim prospektima ako otkažem?",
      a: "Izvezeš ih u CSV i to je to. Ono što si otključao ostaje tvoje. Nalog i sve što je uz njega brišem na zahtev, i ta procedura stvarno postoji, nije samo rečenica u politici privatnosti.",
    },
    {
      q: "Ko stoji iza Sajtoskopa?",
      a: "Marko Milenković, radim pod imenom Remati. Pravim sajtove i alate, i Sajtoskop sam napravio zato što je meni samom trebao da nađem klijente. Prvo je bio mala skripta samo za mene, pa sam shvatio da isti problem ima svako ko prodaje izradu sajtova u Srbiji. Koristim ga sam, svaki dan. Nisam tim, nisam startap i nemam investitore, pa ti na mejl odgovaram lično.",
    },
  ],
} as const;

/* --------------------------------------------------------------------------
   10. ZAVRŠNI CTA
-------------------------------------------------------------------------- */

export const finalCta = {
  eyebrow: "Poslednja stvar",
  title: "Firme bez sajta postoje i danas.",
  titleAccent: "Pitanje je ko će ih zvati.",
  lede: "Za četiri minuta imaš listu firmi u svom gradu koje imaju recenzije, imaju posao i imaju novca, a nemaju gde da pošalju čoveka koji hoće da kupi. Prvih sedam dana ne plaćaš ništa.",
} as const;

/* --------------------------------------------------------------------------
   FUTER
-------------------------------------------------------------------------- */

export const footer = {
  tagline:
    "Alat za pronalaženje klijenata, za web dizajnere, frilensere i agencije u Srbiji. Nađi firme sa lošim ili nepostojećim sajtovima i pošalji im poruku danas.",
  columns: [
    {
      title: "Proizvod",
      links: [
        { label: "Kako radi", href: "#kako-radi" },
        { label: "Za koga je", href: "#za-koga" },
        { label: "Cene", href: "#cene" },
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
