import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Grubi in-memory rate limit — dovoljno za landing, nije zamena za WAF. */
const hits = new Map<string, { n: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.n += 1;
  return entry.n > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limit" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, code: "bad_json" }, { status: 400 });
  }

  const { email, source } = (body ?? {}) as { email?: unknown; source?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email.trim()) || email.length > 254) {
    return NextResponse.json({ ok: false, code: "bad_email" }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();
  const src = typeof source === "string" ? source.slice(0, 40) : "unknown";

  // ── 1. upis u bazu ──────────────────────────────────────────────
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });

      const { error } = await supabase.from("waitlist").insert({
        email: normalized,
        source: src,
        country_code: "RS",
        user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
        referrer: request.headers.get("referer")?.slice(0, 300) ?? null,
      });

      if (error) {
        // 23505 = unique violation → mejl je već na listi
        if (error.code === "23505") {
          return NextResponse.json({ ok: false, code: "duplicate" }, { status: 409 });
        }
        console.error("[waitlist] supabase insert failed:", error.message);
        return NextResponse.json({ ok: false, code: "db" }, { status: 500 });
      }
    } catch (err) {
      console.error("[waitlist] supabase threw:", err);
      return NextResponse.json({ ok: false, code: "db" }, { status: 500 });
    }
  } else {
    // Bez konfiguracije ne obaramo formu — logujemo i idemo dalje.
    console.warn(
      `[waitlist] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY nisu podešeni. Prijava: ${normalized} (${src})`,
    );
  }

  // ── 2. mejl notifikacija ────────────────────────────────────────
  // Nikad ne obara zahtev: korisnik je već upisan u bazu.
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const notifyTo = process.env.NOTIFY_EMAIL ?? site.email;

  if (resendKey && from) {
    try {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from,
        to: notifyTo,
        subject: `Nova beta prijava: ${normalized}`,
        text: [
          `Mejl: ${normalized}`,
          `Izvor: ${src}`,
          `IP: ${ip}`,
          `Vreme: ${new Date().toISOString()}`,
        ].join("\n"),
      });

      await resend.emails.send({
        from,
        to: normalized,
        subject: "Upisan si na Sajtoskop betu",
        text: [
          "Zdravo,",
          "",
          "Primio sam tvoju prijavu za Sajtoskop betu.",
          "",
          "Puštam ljude u malim grupama, jednu po jednu poruku, da mogu da ispratim",
          "gde se ko zaglavi. Javim ti se lično sa pristupom, sa ove iste adrese.",
          "",
          "Ako u međuvremenu imaš pitanje, samo odgovori na ovaj mejl.",
          "",
          `— ${site.author}, ${site.company}`,
          site.url,
        ].join("\n"),
      });
    } catch (err) {
      console.error("[waitlist] resend failed:", err);
    }
  } else {
    console.warn("[waitlist] RESEND_API_KEY / RESEND_FROM nisu podešeni — mejl nije poslat.");
  }

  return NextResponse.json({ ok: true });
}
