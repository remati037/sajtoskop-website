/**
 * Atribucija koju ad-blocker ne može da obori.
 *
 * `referer` heder na POST zahtevu je uvek sama landing stranica, jer zahtev
 * šalje ona sama — beskoristan za pitanje „odakle je čovek došao". Zato se
 * pravi izvor hvata pri PRVOM učitavanju u sesiji i čuva u sessionStorage,
 * pa se šalje uz prijavu i upisuje u bazu.
 *
 * Prvi upis pobeđuje: kasnija navigacija po sajtu ne sme da pregazi izvor.
 */

const KEY = "sajtoskop-attribution";
const MAX = 300;

export type Attribution = {
  referrer: string;
  landingPath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  clickId: string;
};

function clip(value: string | null | undefined): string {
  return (value ?? "").trim().slice(0, MAX);
}

/** Da li je referrer sa drugog sajta — interni prelazi nisu izvor posete. */
function externalReferrer(): string {
  const raw = document.referrer;
  if (!raw) return "";
  try {
    return new URL(raw).hostname === window.location.hostname ? "" : raw;
  } catch {
    return "";
  }
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const data: Attribution = {
      referrer: clip(externalReferrer()),
      landingPath: clip(window.location.pathname + window.location.search),
      utmSource: clip(params.get("utm_source")),
      utmMedium: clip(params.get("utm_medium")),
      utmCampaign: clip(params.get("utm_campaign")),
      utmContent: clip(params.get("utm_content")),
      utmTerm: clip(params.get("utm_term")),
      // Google i Facebook lepe svoj identifikator klika i bez UTM-a.
      clickId: clip(params.get("gclid") ?? params.get("fbclid")),
    };

    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* private mode ili blokiran storage — prijava mora da prođe i bez ovoga */
  }
}

export function readAttribution(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
