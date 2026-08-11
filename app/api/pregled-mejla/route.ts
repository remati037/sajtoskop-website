import { waitlistHtml } from "@/lib/emails/waitlist";

export const dynamic = "force-dynamic";

/**
 * Pregled mejla u browseru, da se tekst i izgled menjaju bez slanja probnih
 * poruka. Postoji samo u razvoju, u produkciji vraća 404.
 */
export function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  return new Response(waitlistHtml(), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
