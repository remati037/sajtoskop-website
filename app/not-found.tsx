import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader minimal />
      <main className="relative grid min-h-[70vh] place-items-center pt-[68px]">
        <div className="grid-bg" aria-hidden />
        <Container className="relative text-center">
          <span className="num text-[clamp(4rem,14vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-fg-faint opacity-40">
            404
          </span>
          <h1 className="h1 mt-6">Ova stranica nema sajt koji radi.</h1>
          <p className="lede mx-auto mt-4 max-w-[440px]">
            Ironično, znam. Adresa ne postoji ili je premeštena.
          </p>
          <Link href="/" className="btn btn-primary btn-lg mt-8">
            <ArrowLeft size={16} strokeWidth={2.2} />
            Nazad na početnu
          </Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
