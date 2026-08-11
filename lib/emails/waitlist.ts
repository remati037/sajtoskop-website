/**
 * Mejl koji stiže čoveku čim ostavi adresu na landingu.
 * Kopi je izvučen u `mejl-waitlist-copy.md` radi čitanja i prepravki.
 *
 * Pravila koja drže ovaj fajl:
 *   1. Tabele umesto flexboxa i grida — Outlook renderuje kroz Word engine.
 *   2. Svi stilovi inline — Gmail briše <style> blok u dobrom delu slučajeva.
 *   3. Bez slika — Gmail i Outlook ih podrazumevano ne učitavaju, pa bi logo
 *      bio prazna rupa na vrhu poruke. Znak je tekst plus obojena ćelija.
 *   4. Svetla paleta i eksplicitan color-scheme, da klijent ne invertuje boje.
 */

import { site } from "@/lib/site";

const C = {
  page: "#f7f8f7",
  card: "#ffffff",
  fg: "#0a0b0c",
  muted: "#575e66",
  faint: "#868d95",
  border: "#e5e7e6",
  accent: "#8fd413",
  accentInk: "#0a0b0c",
  accentText: "#4e7c0a",
} as const;

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const waitlistSubject = "Uspešno si se prijavio na listu čekanja za Sajtoskop Beta fazu";

const PREHEADER = "Lično ću ti poslati email sa ove adrese kada Beta faza bude puštena.";

export const waitlistText = [
  "Zdravo,",
  "",
  "Dodat si na listu čekanja za Sajtoskop Beta fazu. Ovaj mejl je samo potvrda da je prijava stigla,",
  "ništa ne treba da radiš.",
  "",
  "Puštam ljude u malim grupama, da stignem da ispratim gde se ko zaglavi i da odgovorim",
  "svakome. Kad dođe red na tebe, javim ti se lično sa pristupom, sa ove iste adrese.",
  "",
  "Beta faza je besplatna. Bez kartice, sa 30 kredita mesečno.",
  "",
  "Ako te zanima šta te čeka unutra, na sajtu je objašnjeno kako alat radi:",
  `${site.url}/#kako-radi`,
  "",
  "Ako imaš pitanje, samo odgovori na ovaj mejl, čitam sve.",
  "Ako si se predomislio, odgovori isto tako i skidam te sa liste.",
  "",
  "Marko",
  site.url,
  "",
  `Dobijaš ovaj mejl jer si ostavio adresu na ${site.domain}.`,
].join("\n");

/** Pasus u telu poruke. */
function p(text: string, color: string = C.fg): string {
  // mso-line-height-rule:exactly — bez toga Outlook razvuče prored po svom.
  return `<p style="margin:0 0 18px;font-size:15.5px;line-height:1.62;mso-line-height-rule:exactly;color:${color};">${text}</p>`;
}

export function waitlistHtml(): string {
  const instagram = site.instagram
    ? ` &nbsp;·&nbsp; <a href="${site.instagram}" style="color:${C.faint};text-decoration:underline;">Instagram</a>`
    : "";

  return `<!doctype html>
<html lang="sr-Latn-RS" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${waitlistSubject}</title>
<!--[if mso]>
<xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${C.page};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Pretpregled u inboxu. Nevidljivi znakovi na kraju guraju ostatak teksta iz
     pretpregleda, inače Gmail nastavlja da čita telo poruke i lepi ga uz njega. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${PREHEADER}${"&#847;&zwnj;&nbsp;".repeat(60)}</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background-color:${C.page};border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">
  <tr>
    <td align="center" style="padding:32px 16px;">

      <!--[if mso]>
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0"><tr><td>
      <![endif]-->

      <!-- width="100%" plus max-width, a ne fiksnih 560px: fiksna širina ne
           popušta na telefonu i poruka izlazi izvan ekrana. Outlook ne razume
           max-width, pa njemu širinu drži uslovna tabela iznad. -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;">

        <!-- znak -->
        <tr>
          <td style="padding:0 4px 18px;font-family:${FONT};font-size:15px;font-weight:600;letter-spacing:-0.4px;color:${C.fg};">
            <span style="color:${C.accent};font-size:15px;">&#9679;</span>&nbsp;sajtoskop
          </td>
        </tr>

        <!-- poruka -->
        <tr>
          <td style="background-color:${C.card};border:1px solid ${C.border};border-radius:14px;padding:30px 26px 26px;font-family:${FONT};">

            ${p("Zdravo,")}
            ${p("Dodat si na listu čekanja za <strong style=\"font-weight:600;\">Sajtoskop Beta fazu</strong>. Ovaj mejl je samo potvrda da je prijava stigla, ništa ne treba da radiš.")}
            ${p("Puštam ljude u malim grupama, da stignem da ispratim gde se ko zaglavi i da odgovorim svakome. Kad dođe red na tebe, javim ti se lično sa pristupom, sa ove iste adrese.")}
            ${p(`Beta faza je besplatna. Bez kartice, sa <span style="color:${C.accentText};font-weight:600;">30 kredita mesečno</span>.`)}
            ${p("Ako te zanima šta te čeka unutra, na sajtu je objašnjeno kako alat radi.", C.muted)}

            <!-- Dugme: razmak je na ćeliji, ne na <a>. Outlook ignoriše padding
                 na inline elementu, pa bi zeleno stalo tik uz slova. -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 26px;border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;">
              <tr>
                <td align="center" bgcolor="${C.accent}" style="background-color:${C.accent};border-radius:10px;padding:14px 24px;">
                  <a href="${site.url}/#kako-radi"
                     style="display:inline-block;font-family:${FONT};font-size:15px;font-weight:600;line-height:1;color:${C.accentInk};text-decoration:none;mso-line-height-rule:exactly;">Pogledaj kako radi</a>
                </td>
              </tr>
            </table>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td height="1" style="border-top:1px solid ${C.border};font-size:1px;line-height:1px;height:1px;">&nbsp;</td></tr>
            </table>

            <div style="padding-top:22px;">
              ${p("Ako imaš pitanje, samo odgovori na ovaj mejl, čitam sve.<br>Ako si se predomislio, odgovori isto tako i skidam te sa liste.", C.muted)}
              <p style="margin:22px 0 0;font-size:15.5px;line-height:1.6;color:${C.fg};font-weight:600;">Marko</p>
            </div>

          </td>
        </tr>

        <!-- podnožje -->
        <tr>
          <td style="padding:20px 8px 0;font-family:${FONT};font-size:12.5px;line-height:1.6;color:${C.faint};">
            Dobijaš ovaj mejl jer si ostavio adresu na ${site.domain}.<br>
            <a href="${site.url}" style="color:${C.faint};text-decoration:underline;">${site.domain}</a>${instagram}
          </td>
        </tr>

      </table>

      <!--[if mso]>
      </td></tr></table>
      <![endif]-->

    </td>
  </tr>
</table>

</body>
</html>`;
}
