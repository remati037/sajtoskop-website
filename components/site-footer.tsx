import { footer } from "@/lib/content";
import { site } from "@/lib/site";
import { Mail } from "lucide-react";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon } from "./brand-icons";
import { Logo } from "./logo";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const years = year > site.since ? `${site.since}–${year}` : `${site.since}`;

  const socials = [
    { href: `mailto:${site.email}`, label: "Mejl", Icon: Mail },
    site.instagram ? { href: site.instagram, label: "Instagram", Icon: InstagramIcon } : null,
    site.linkedin ? { href: site.linkedin, label: "LinkedIn", Icon: LinkedinIcon } : null,
  ].filter(Boolean) as { href: string; label: string; Icon: typeof Mail }[];

  return (
    <footer
      className="relative border-t border-border"
      style={{ background: "var(--bg-subtle)" }}
    >
      <Container>
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] lg:gap-20">
          <div>
            <Logo />
            <p className="mt-4 max-w-[340px] text-[13.5px] leading-relaxed text-fg-muted">
              {footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border text-fg-faint transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-fg"
                >
                  <Icon size={14} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="eyebrow">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.href.startsWith("#") ? (
                        <a
                          href={`/${link.href}`}
                          className="text-[13.5px] text-fg-muted transition-colors duration-200 hover:text-fg"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13.5px] text-fg-muted transition-colors duration-200 hover:text-fg"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-fg-faint">
            © {years} {site.name}. Sva prava zadržana.
          </p>
          <p className="max-w-[420px] text-[11.5px] leading-relaxed text-fg-faint">
            {footer.legalNote}
          </p>
        </div>
      </Container>
    </footer>
  );
}
