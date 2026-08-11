import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Container } from "./ui";

export function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader minimal />
      <main className="relative pt-[calc(68px+3.5rem)]">
        <div className="grid-bg" aria-hidden />
        <Container className="relative">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft size={13} strokeWidth={2.2} />
            Nazad na početnu
          </Link>

          <header className="mt-8 max-w-[720px]">
            <h1 className="h1">{title}</h1>
            <p className="num mt-4 text-[12.5px] text-fg-faint">
              Poslednja izmena: {updated}
            </p>
            <p className="lede mt-6">{intro}</p>
          </header>

          <div className="prose-legal mt-12 max-w-[720px] pb-24">{children}</div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
