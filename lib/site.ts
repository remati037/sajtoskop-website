/**
 * Konfiguracija sajta. Sve što se menja bez diranja komponenti.
 */

export const site = {
  name: "Sajtoskop",
  domain: "sajtoskop.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sajtoskop.com",
  author: "Marko Milenković",
  company: "Remati",
  email: "marko2000.dev@gmail.com",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
  /** Godina od koje ide copyright notice u futeru. */
  since: 2026,
} as const;

/**
 * Prekidač za CTA.
 *
 *   NEXT_PUBLIC_CTA_MODE=signup    → sva CTA dugmad vode na registraciju (default)
 *   NEXT_PUBLIC_CTA_MODE=waitlist  → sva CTA dugmad otvaraju formu za listu čekanja
 *
 * Otkad landing ima cenovnik, podrazumevano je `signup`. Ako aplikacija još
 * nije puštena, postavi NEXT_PUBLIC_CTA_MODE=waitlist i dugmad se vraćaju na
 * formu — kopi tada obećava nešto što ne postoji, pa ne ostavljaj dugo tako.
 */
export type CtaMode = "waitlist" | "signup";

export const ctaMode: CtaMode =
  process.env.NEXT_PUBLIC_CTA_MODE === "waitlist" ? "waitlist" : "signup";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.sajtoskop.com";

export const signUpUrl = `${appUrl}/sign-up`;
