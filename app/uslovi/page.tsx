import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { trial } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description:
    "Uslovi korišćenja Sajtoskopa — pravila pristupa, pretplata i naplata, zabrane i odgovornost korisnika.",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <LegalShell
      title="Uslovi korišćenja"
      updated="11. avgust 2026."
      intro="Ovo su pravila po kojima koristiš Sajtoskop. Pisana su da budu čitljiva, a ne da te zamore. Ako nešto nije jasno, piši mi i objasniću."
    >
      <h2>1. Ko stoji iza usluge</h2>
      <p>
        Sajtoskop ({site.domain}) je alat koji razvija i održava {site.author}, koji posluje
        pod imenom {site.company}. Kontakt za sva pitanja u vezi sa ovim uslovima:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        Korišćenjem usluge prihvataš ove uslove u celosti. Ako se sa nečim ne slažeš, nemoj
        koristiti uslugu.
      </p>

      <h2>2. Šta usluga radi</h2>
      <p>
        Sajtoskop pretražuje javno dostupne podatke o poslovnim subjektima preko zvaničnog
        Google Places API-ja, procenjuje stanje njihovih veb sajtova i prikazuje ti rezultat
        zajedno sa materijalom za kontakt. Alat ti daje informaciju. Odluku šta ćeš sa tom
        informacijom da uradiš donosiš ti.
      </p>

      <h2>3. Pretplata, probni period i naplata</h2>
      <p>
        Sajtoskop se koristi uz pretplatu. Planovi, cene i mesečni limiti navedeni su na{" "}
        <a href="/#cene">stranici sa cenama</a> i čine sastavni deo ovih uslova.
      </p>
      <ul>
        <li>
          <strong>Probni period traje {trial.days} dana</strong> i uz njega dobijaš{" "}
          {trial.credits} bonus kredita. Podatke o kartici unosiš pri registraciji, ali ti se
          tokom probnog perioda ništa ne naplaćuje.
        </li>
        <li>
          <strong>Prva naplata je prvog dana posle isteka probnog perioda</strong>, u iznosu
          izabranog plana. Ako otkažeš pretplatu pre isteka probe, naplate nema.
        </li>
        <li>
          <strong>Pretplata se obnavlja automatski</strong> — mesečno ili godišnje, u zavisnosti
          od izabranog ciklusa — dok je ne otkažeš. Otkazivanje je dostupno u svakom trenutku
          kroz podešavanja naloga.
        </li>
        <li>
          Posle otkazivanja pristup ostaje aktivan do kraja već plaćenog perioda. Iznos za
          započeti period se ne vraća srazmerno, niti nudim povraćaj novca za neiskorišćene
          kredite.
        </li>
        <li>
          Plan možeš da promeniš u svakom trenutku. Razlika u ceni obračunava se od trenutka
          promene.
        </li>
        <li>
          Cene su iskazane u evrima i konačne su — to je iznos koji se naplaćuje. Naplatu
          obrađuje Stripe; podatke o kartici ne primam niti čuvam.
        </li>
        <li>
          <strong>O promeni cene obaveštavam te mejlom najmanje trideset dana unapred.</strong>{" "}
          Nova cena važi tek od narednog ciklusa i do tada možeš da otkažeš bez posledica.
        </li>
        <li>
          Ako naplata ne prođe, pristup se privremeno pauzira dok se plaćanje ne izvrši. Nalog
          i tvoji otključani prospekti ostaju sačuvani.
        </li>
      </ul>
      <p>
        Usluga se aktivno razvija: funkcije se dodaju i menjaju, i ne garantujem određeni nivo
        dostupnosti (SLA). O trajnom prekidu usluge obaveštavam te unapred, mejlom na adresu sa
        kojom si registrovan, i u tom slučaju ne naplaćujem naredni ciklus.
      </p>

      <h2>4. Nalog</h2>
      <ul>
        <li>
          <strong>Jedan nalog pripada jednom fizičkom licu.</strong> Deljenje pristupnih
          podataka sa drugim licem nije dozvoljeno, bez obzira na to da li radi u istoj firmi.
        </li>
        <li>
          Odgovoran si za čuvanje svojih pristupnih podataka i za sve aktivnosti koje se dese
          preko tvog naloga.
        </li>
        <li>
          Pri registraciji daješ tačne podatke. Nalozi otvoreni sa lažnim podacima mogu biti
          suspendovani.
        </li>
      </ul>

      <h2>5. Šta nije dozvoljeno</h2>
      <p>Zabranjeno je, i predstavlja osnov za trenutnu suspenziju naloga:</p>
      <ul>
        <li>
          <strong>Automatizovan pristup</strong> usluzi — skripte, botovi, headless pretraživači,
          scraping stranica ili API poziva izvan zvaničnog korisničkog interfejsa.
        </li>
        <li>
          <strong>Reverse engineering</strong>, dekompilacija ili pokušaj rekonstrukcije logike
          ocenjivanja sajtova, algoritama ili strukture podataka.
        </li>
        <li>
          <strong>Preprodaja, dalja distribucija ili deljenje</strong> podataka dobijenih kroz
          uslugu, u bilo kom obliku — uključujući izvoz u tabelu koja se prosleđuje trećem licu.
        </li>
        <li>
          <strong>Korišćenje podataka ili uvida iz usluge za izgradnju konkurentskog proizvoda</strong>,
          direktno ili preko trećeg lica.
        </li>
        <li>
          Zaobilaženje ograničenja kredita ili dnevnih limita plana, otvaranje više naloga radi
          ponovnog korišćenja probnog perioda ili bonus kredita, i svaki drugi vid zloupotrebe
          sistema.
        </li>
        <li>
          Radnje koje ugrožavaju stabilnost, bezbednost ili integritet usluge i njene
          infrastrukture.
        </li>
      </ul>
      <p>
        U bazi se nalaze označeni kontrolni zapisi. Ako se podaci iz Sajtoskopa pojave izvan
        dozvoljene upotrebe, moguće je utvrditi sa kog naloga potiču.
      </p>

      <h2>6. Tvoja odgovornost pri kontaktiranju firmi</h2>
      <p>
        Ovo je najvažniji deo ovih uslova. Sajtoskop ti daje kontakt podatke koji su javno
        objavljeni. <strong>Za način na koji te podatke koristiš odgovoran si isključivo ti.</strong>
      </p>
      <ul>
        <li>
          Dužan si da poštuješ propise Republike Srbije o zaštiti podataka o ličnosti i o
          elektronskim komunikacijama, uključujući pravila o neželjenim komercijalnim porukama.
        </li>
        <li>
          U svakoj poruci moraš jasno da se predstaviš i da omogućiš primaocu da traži da ga
          više ne kontaktiraš. U alatu postoji šablon za opt-out — koristi ga.
        </li>
        <li>
          Ako te neko zamoli da ga ne kontaktiraš, dužan si da to ispoštuješ. Sajtoskop tu
          molbu ne prima umesto tebe.
        </li>
        <li>
          Masovno slanje identičnih poruka, lažno predstavljanje i uznemiravanje su zabranjeni
          i predstavljaju osnov za suspenziju.
        </li>
      </ul>
      <p>
        Ako zbog tvog načina kontaktiranja nastane šteta ili pravni postupak, odgovornost je
        tvoja, a ne moja.
      </p>

      <h2>7. Krediti</h2>
      <ul>
        <li>
          Otključavanje jednog prospekta troši jedan kredit. Isti prospekt ne plaćaš dvaput —
          jednom otključan, ostaje otključan za tvoj nalog.
        </li>
        <li>
          Krediti su interna jedinica korišćenja usluge. Nemaju novčanu vrednost, ne mogu se
          preneti na drugi nalog, ne prodaju se odvojeno od pretplate i ne isplaćuju se u novcu.
        </li>
        <li>
          Neiskorišćeni mesečni krediti se ne prenose u naredni mesec, osim ako izričito ne
          navedem drugačije.
        </li>
      </ul>

      <h2>8. Tačnost podataka</h2>
      <p>
        Podaci dolaze iz spoljnog izvora (Google Maps) i iz automatske analize javno dostupnih
        sajtova. Trudim se da budu tačni i sveži — podaci sa Google-a se osvežavaju u
        tridesetodnevnom ciklusu, a ocena sajta se radi u trenutku otključavanja. Uprkos tome,
        ne garantujem tačnost, potpunost niti aktuelnost bilo kog pojedinačnog podatka.
        Proveri pre nego što se osloniš na njega.
      </p>

      <h2>9. Intelektualna svojina</h2>
      <p>
        Softver, dizajn, tekstovi, logika ocenjivanja i baza obrađenih podataka su moja
        intelektualna svojina. Korišćenje usluge ti ne daje nikakvo pravo svojine nad njima,
        već ograničenu, neprenosivu i opozivu licencu za lično poslovno korišćenje u skladu sa
        ovim uslovima.
      </p>

      <h2>10. Suspenzija i prestanak</h2>
      <p>
        Mogu da suspendujem ili ukinem tvoj nalog bez prethodne najave ako prekršiš ove uslove,
        posebno odredbe iz tačaka 4, 5 i 6. Ti možeš u svakom trenutku da prestaneš da koristiš
        uslugu i da zatražiš brisanje naloga. Pre brisanja možeš da izvezeš svoje otključane
        prospekte u CSV.
      </p>

      <h2>11. Ograničenje odgovornosti</h2>
      <p>
        Usluga se pruža „takva kakva jeste", bez garancija bilo koje vrste. U meri u kojoj to
        propisi dozvoljavaju, ne odgovaram za izgubljenu dobit, izgubljene poslove, gubitak
        podataka niti za posrednu ili posledičnu štetu nastalu korišćenjem ili nemogućnošću
        korišćenja usluge.
      </p>

      <h2>12. Izmene uslova</h2>
      <p>
        Ove uslove mogu da menjam. O svakoj bitnoj izmeni obaveštavam te mejlom najmanje
        petnaest dana unapred. Nastavak korišćenja usluge posle stupanja izmene na snagu znači
        da prihvataš novu verziju.
      </p>

      <h2>13. Merodavno pravo</h2>
      <p>
        Na ove uslove primenjuje se pravo Republike Srbije. Za sporove koji se ne reše
        dogovorom nadležan je stvarno nadležni sud u Republici Srbiji.
      </p>

      <h2>14. Google</h2>
      <p>
        Sajtoskop nije povezan sa kompanijom Google LLC, niti ga ona podržava ili sponzoriše.
        Google i Google Maps su zaštićeni znaci kompanije Google LLC. Podaci se pribavljaju
        preko zvaničnog Google Places API-ja, uz poštovanje uslova korišćenja te usluge.
      </p>

      <p style={{ marginTop: "2.5rem", fontSize: "0.85rem" }}>
        © {site.since} {site.name} · {site.author} / {site.company}
      </p>
    </LegalShell>
  );
}
