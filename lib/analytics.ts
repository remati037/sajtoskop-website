/**
 * Tanak omotač oko Umamija.
 *
 * Umami se učitava sa spoljnog domena, pa ga ad-blocker može oboriti — zbog toga
 * `track` nikad ne sme da baci grešku niti da bude uslov za bilo šta u UI-u.
 * Za brojke od kojih zavisiš (prijave) izvor istine je `waitlist` tabela,
 * ovde je samo brz pregled ponašanja.
 *
 * Imena događaja su na engleskom, kao i ostali identifikatori u kodu i bazi —
 * poklapaju se sa vrednostima `waitlist.source` (hero, beta, final).
 */

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function track(name: string, data?: Record<string, string>): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(name, data);
  } catch {
    /* analitika nikad ne obara stranicu */
  }
}
