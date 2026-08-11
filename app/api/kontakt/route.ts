import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const hits = new Map<string, { n: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

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

  const { name, email, topic, message, company } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: popunjeno = bot. Vraćamo 200 da bot ne uči.
  if (typeof company === "string" && company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    name.trim().length < 2 ||
    !EMAIL_RE.test(email.trim()) ||
    message.trim().length < 10 ||
    message.length > 5000
  ) {
    return NextResponse.json({ ok: false, code: "invalid" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.NOTIFY_EMAIL ?? site.email;

  if (!resendKey || !from) {
    console.warn(
      `[kontakt] Resend nije podešen. Poruka od ${email.trim()}: ${message.slice(0, 200)}`,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email.trim(),
      subject: `Sajtoskop kontakt: ${typeof topic === "string" ? topic : "Bez teme"}`,
      text: [
        `Ime: ${name.trim()}`,
        `Mejl: ${email.trim()}`,
        `Tema: ${typeof topic === "string" ? topic : "—"}`,
        `IP: ${ip}`,
        "",
        message.trim(),
      ].join("\n"),
    });
  } catch (err) {
    console.error("[kontakt] slanje nije uspelo:", err);
    return NextResponse.json({ ok: false, code: "send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
