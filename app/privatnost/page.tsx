import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description:
    "Kako Sajtoskop obrađuje podatke o ličnosti — koji podaci, po kom osnovu, koliko dugo se čuvaju i kako tražiš brisanje.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalShell
      title="Politika privatnosti"
      updated="11. avgust 2026."
      intro="Ovde piše koje podatke obrađujem, zašto, koliko dugo i kako tražiš da ih obrišem. Pisano u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije."
    >
      <h2>1. Rukovalac podacima</h2>
      <p>
        Rukovalac je {site.author}, koji posluje pod imenom {site.company}, kao lice odgovorno za
        obradu podataka na servisu Sajtoskop ({site.domain}).
      </p>
      <p>
        Kontakt za sva pitanja o podacima, uključujući zahteve za pristup i brisanje:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Na zahteve odgovaram lično, u roku
        od trideset dana.
      </p>

      <h2>2. Dve vrste podataka</h2>
      <p>
        Sajtoskop obrađuje dve odvojene grupe podataka i važno je da se razlikuju, jer za njih
        važe različiti osnovi obrade:
      </p>
      <ul>
        <li>
          <strong>Podaci o tebi kao korisniku</strong> — mejl adresa i minimum tehničkih
          podataka potrebnih da nalog radi.
        </li>
        <li>
          <strong>Podaci o poslovnim subjektima</strong> koje alat prikazuje — javno objavljeni
          kontakt podaci firmi i preduzetnika. Kod preduzetnika i malih firmi ti podaci mogu
          istovremeno biti i podaci o ličnosti.
        </li>
      </ul>

      <h2>3. Podaci o tebi kao korisniku</h2>

      <h3>Šta se obrađuje</h3>
      <ul>
        <li>Mejl adresa — obavezna, bez nje nalog ne postoji.</li>
        <li>
          Datum registracije, stanje kredita i istorija otključavanja — potrebni da bi usluga
          radila i da ne bi platio isti prospekt dvaput.
        </li>
        <li>
          Statusi u tvom pipeline-u (Nekontaktiran, Kontaktiran, Odgovorio, Potpisan,
          Nezainteresovan) — vidljivi su isključivo tebi.
        </li>
        <li>
          Osnovni tehnički podaci pri prijavi na beta listu: izvor prijave, User-Agent i
          referer. Koriste se samo da razumem odakle ljudi dolaze.
        </li>
      </ul>

      <h3>Osnov obrade</h3>
      <ul>
        <li>
          <strong>Izvršenje ugovora</strong> — obrada mejla, kredita i istorije otključavanja
          neophodna je da bi ti uslugu uopšte pružio.
        </li>
        <li>
          <strong>Pristanak</strong> — prijava na beta listu i mejlovi o statusu bete. Pristanak
          povlačiš u svakom trenutku, jednim odgovorom na bilo koji moj mejl.
        </li>
        <li>
          <strong>Legitimni interes</strong> — bezbednost sistema i sprečavanje zloupotrebe
          (na primer, otvaranje više naloga radi dodatnih besplatnih kredita).
        </li>
      </ul>

      <h3>Rok čuvanja</h3>
      <ul>
        <li>Dok imaš aktivan nalog, i najviše dvanaest meseci nakon poslednje prijave.</li>
        <li>
          Ako zatražiš brisanje, brišem u roku od trideset dana od zahteva, izuzev podataka
          koje sam po propisu dužan da zadržim.
        </li>
        <li>
          Prijave sa beta liste koje nikad nisu postale nalog brišem najkasnije dvanaest meseci
          nakon zatvaranja bete.
        </li>
      </ul>

      <h2>4. Podaci o poslovnim subjektima</h2>
      <p>
        Alat prikazuje naziv firme, kategoriju, adresu, telefon, mejl i adresu sajta — podatke
        koje su te firme same javno objavile na Google Maps-u ili na svom sajtu. Podaci se
        pribavljaju preko zvaničnog Google Places API-ja, a sajtovi se čitaju uz poštovanje
        <code> robots.txt</code> fajla, sa identifikujućim User-Agent-om i najviše jednim
        zahtevom u sekundi po domenu.
      </p>
      <p>
        Kod preduzetnika i mikro firmi kontakt podatak može istovremeno biti i podatak o
        ličnosti. Osnov obrade je legitimni interes — poslovna komunikacija između privrednih
        subjekata, u obimu koji je za tu svrhu neophodan. Podaci sa Google-a se ne čuvaju duže
        od trideset dana bez osvežavanja.
      </p>
      <p>
        <strong>Ako si vlasnik firme koja se pojavljuje u Sajtoskopu</strong> i ne želiš da tvoji
        podaci budu prikazivani, piši na <a href={`mailto:${site.email}`}>{site.email}</a> i
        uklanjam ih iz sistema. Nije ti potrebno obrazloženje.
      </p>

      <h2>5. Ko još vidi podatke</h2>
      <p>
        Podatke ne prodajem i ne ustupam trećim licima u marketinške svrhe. Koristim sledeće
        obrađivače, isključivo za rad same usluge:
      </p>
      <ul>
        <li><strong>Supabase</strong> — baza podataka i skladište fajlova.</li>
        <li><strong>Vercel</strong> — hostovanje veb aplikacije.</li>
        <li><strong>Clerk</strong> — autentifikacija korisnika.</li>
        <li><strong>Resend</strong> — slanje transakcionih mejlova.</li>
        <li><strong>Google Places API</strong> — izvor podataka o poslovnim subjektima.</li>
      </ul>
      <p>
        Neki od ovih obrađivača imaju infrastrukturu izvan Republike Srbije, pretežno u
        Evropskoj uniji i Sjedinjenim Državama. Prenos se vrši na osnovu njihovih standardnih
        ugovornih klauzula o zaštiti podataka.
      </p>

      <h2>6. Šta se ne loguje</h2>
      <p>
        Puni kontakt podaci prospekata se ne upisuju u aplikacione logove. Logovi sadrže
        identifikatore i kodove grešaka, ne sadržaj kontakata.
      </p>

      <h2>7. Kolačići i analitika</h2>
      <p>
        Landing stranica ne postavlja marketinške kolačiće i ne koristi spoljne analitičke
        alate. Jedina stvar koja se čuva u tvom pretraživaču je izbor teme (svetla ili tamna),
        u lokalnom skladištu — to nije kolačić i ne napušta tvoj uređaj.
      </p>
      <p>
        Aplikacija koristi kolačiće neophodne za prijavu i održavanje sesije. Bez njih prijava
        tehnički nije moguća.
      </p>

      <h2>8. Tvoja prava</h2>
      <p>Po Zakonu o zaštiti podataka o ličnosti imaš pravo na:</p>
      <ul>
        <li>pristup podacima koje o tebi obrađujem i kopiju tih podataka,</li>
        <li>ispravku netačnih i dopunu nepotpunih podataka,</li>
        <li>brisanje podataka („pravo na zaborav"),</li>
        <li>ograničenje obrade,</li>
        <li>prenosivost podataka u strukturisanom, mašinski čitljivom formatu,</li>
        <li>prigovor na obradu zasnovanu na legitimnom interesu,</li>
        <li>opoziv pristanka u svakom trenutku, bez posledica po ranije zakonitu obradu.</li>
      </ul>

      <h3>Kako se traži brisanje</h3>
      <p>
        Pošalji mejl na <a href={`mailto:${site.email}`}>{site.email}</a> sa naslovom „Brisanje
        podataka", sa mejl adrese koja je vezana za nalog. Postupam u roku od trideset dana i
        potvrđujem ti kad je izvršeno. Ova procedura stvarno postoji i sprovodi se ručno — nije
        samo rečenica u ovom tekstu.
      </p>

      <h2>9. Pritužba</h2>
      <p>
        Ako smatraš da ti je obradom povređeno pravo, možeš da podneseš pritužbu Povereniku za
        informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije. Bio bih
        zahvalan da se prvo javiš meni — verovatno je nešto što mogu odmah da ispravim.
      </p>

      <h2>10. Bezbednost</h2>
      <p>
        Pristup bazi je zaključan na nivou svakog reda (row level security). Zaključana polja
        prospekata ne postoje u odgovoru servera dok se ne otključaju — nisu sakrivena
        stilizovanjem, već se uopšte ne šalju. Komunikacija ide isključivo preko HTTPS-a.
      </p>

      <h2>11. Izmene ove politike</h2>
      <p>
        O bitnim izmenama obaveštavam te mejlom pre nego što stupe na snagu. Datum poslednje
        izmene stoji na vrhu ove stranice.
      </p>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem" }}>
        © {site.since} {site.name} · {site.author} / {site.company}
      </p>
    </LegalShell>
  );
}
