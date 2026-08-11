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
 *   NEXT_PUBLIC_CTA_MODE=waitlist  → sva CTA dugmad otvaraju waitlist formu (default)
 *   NEXT_PUBLIC_CTA_MODE=signup    → sva CTA dugmad vode na registraciju u aplikaciji
 *
 * Kad F4 bude gotov, promeniš jednu env varijablu i ceo landing se prebaci.
 */
export type CtaMode = "waitlist" | "signup";

export const ctaMode: CtaMode =
  process.env.NEXT_PUBLIC_CTA_MODE === "signup" ? "signup" : "waitlist";

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.sajtoskop.com";

export const signUpUrl = `${appUrl}/sign-up`;
