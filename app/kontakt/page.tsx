import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { InstagramIcon, LinkedinIcon } from "@/components/brand-icons";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Piši direktno autoru Sajtoskopa. Pitanja o alatu, ulazak u betu ili zahtev za uklanjanje firme iz baze.",
};

export default function Page() {
  const links = [
    { href: `mailto:${site.email}`, label: site.email, sub: "Odgovaram lično", Icon: Mail },
    site.instagram
      ? { href: site.instagram, label: "Instagram", sub: "Brz odgovor u poruci", Icon: InstagramIcon }
      : null,
    site.linkedin
      ? { href: site.linkedin, label: "LinkedIn", sub: "Ako ti je tako lakše", Icon: LinkedinIcon }
      : null,
  ].filter(Boolean) as { href: string; label: string; sub: string; Icon: typeof Mail }[];

  return (
    <>
      <SiteHeader minimal />
      <main className="relative pt-[calc(68px+3.5rem)]">
        <div className="grid-bg" aria-hidden />
        <Container className="relative pb-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Nazad na početnu
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <h1 className="h1">Piši mi.</h1>
              <p className="lede mt-5">
                Iza Sajtoskopa nema tima ni kontakt centra, nego samo {site.author.split(" ")[0]}. Sve
                što pošalješ ovde dolazi direktno meni i ja ti odgovaram.
              </p>

              <ul className="mt-9 flex flex-col gap-3">
                {links.map(({ href, label, sub, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="card group flex items-center gap-3.5 p-4 transition-colors duration-200 hover:border-[var(--border-strong)]"
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
                        style={{ background: "var(--accent-wash)", color: "var(--accent-text)" }}
                      >
                        <Icon size={15} strokeWidth={2.1} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-medium text-fg">
                          {label}
                        </span>
                        <span className="block text-[12.5px] text-fg-faint">{sub}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div
                className="mt-8 rounded-[var(--radius)] border p-5"
                style={{ borderColor: "var(--border-accent)", background: "var(--accent-wash)" }}
              >
                <h2 className="text-[13.5px] font-semibold tracking-[-0.02em] text-fg">
                  Vlasnik si firme koja se pojavljuje u alatu?
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                  Napiši mi naziv firme i uklanjam je iz sistema. Ne treba obrazloženje i ne
                  postavljam dodatna pitanja. Detalji su u{" "}
                  <Link
                    href="/privatnost"
                    className="underline underline-offset-4"
                    style={{ color: "var(--accent-text)" }}
                  >
                    politici privatnosti
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
