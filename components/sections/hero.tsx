import { Check } from "lucide-react";
import { hero } from "@/lib/content";
import { Container } from "../ui";
import { Reveal } from "../motion-primitives";
import { ScanDemo } from "../scan-demo";
import { WaitlistForm } from "../waitlist-form";

/**
 * Boji `hero.titleAccent` u redu u kom se nalazi. Akcenat sme da bude u bilo
 * kom od dva reda naslova, pa se kopi menja bez diranja komponente.
 */
function TitleLine({ line, accent }: { line: string; accent: string }) {
  const at = line.indexOf(accent);
  if (at === -1) return <>{line}</>;

  return (
    <>
      {line.slice(0, at)}
      <span style={{ color: "var(--accent-text)" }}>{accent}</span>
      {line.slice(at + accent.length)}
    </>
  );
}

export function Hero() {
  return (
    <section className="noise relative overflow-hidden pt-[calc(68px+clamp(2rem,4.5vw,3.5rem))] pb-[clamp(2.5rem,5vw,4.5rem)]">
      <div className="grid-bg" aria-hidden />
      <div
        aria-hidden
        className="glow left-[8%] top-[-6%] h-[420px] w-[520px]"
        style={{ background: "var(--glow-1)" }}
      />
      <div
        aria-hidden
        className="glow right-[-6%] top-[12%] h-[380px] w-[420px]"
        style={{ background: "var(--glow-2)" }}
      />

      <Container className="relative">
        {/* bedž */}
        <Reveal y={12}>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev/70 py-1 pl-1.5 pr-3 backdrop-blur">
            <span
              className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.02em]"
              style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            >
              NOVO
            </span>
            <span className="text-[12.5px] text-fg-muted">{hero.badge}</span>
          </div>
        </Reveal>

        {/* naslov */}
        <Reveal delay={0.06} className="mt-6 max-w-[900px]">
          <h1 className="h-display">
            <TitleLine line={hero.titleLine1} accent={hero.titleAccent} />
            <br className="hidden sm:block" />{" "}
            <span className="text-fg">
              <TitleLine line={hero.titleLine2} accent={hero.titleAccent} />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.12} className="mt-5 max-w-[600px]">
          <p className="lede">{hero.lede}</p>
        </Reveal>

        {/* forma */}
        <Reveal delay={0.18} className="mt-8">
          <div id="pristup" className="scroll-mt-28">
            <WaitlistForm size="lg" source="hero" />
          </div>
        </Reveal>

        {/* trust traka */}
        <Reveal delay={0.24} className="mt-6">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[12.5px] text-fg-faint">
                <Check size={12.5} strokeWidth={2.6} style={{ color: "var(--accent)" }} />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* mock aplikacije */}
        <Reveal delay={0.1} y={40} className="mt-12 sm:mt-14">
          <ScanDemo />
        </Reveal>
      </Container>
    </section>
  );
}
