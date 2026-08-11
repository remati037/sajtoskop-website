import { finalCta, proof } from "@/lib/content";
import { Container } from "../ui";
import { Reveal } from "../motion-primitives";
import { ViewTracker } from "../view-tracker";
import { WaitlistForm } from "../waitlist-form";

export function FinalCta() {
  return (
    <section className="noise relative overflow-hidden py-[clamp(5rem,10vw,9rem)]">
      <div className="grid-bg" aria-hidden />
      <div
        aria-hidden
        className="glow left-1/2 top-0 h-[360px] w-[720px] max-w-[110vw] -translate-x-1/2"
        style={{ background: "var(--accent-glow)", opacity: 0.75 }}
      />

      <Container className="relative">
        <ViewTracker event="final-cta-viewed" />

        <div className="mx-auto max-w-[720px] text-center">
          <Reveal y={14}>
            <div className="flex items-center justify-center gap-2.5">
              <span
                className="h-[5px] w-[5px] rounded-full"
                style={{ background: "var(--accent)" }}
                aria-hidden
              />
              <span className="eyebrow">{finalCta.eyebrow}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-5">
            <h2 className="h-display text-[clamp(2.1rem,5.4vw,3.9rem)]">
              {finalCta.title}{" "}
              <span style={{ color: "var(--accent-text)" }}>{finalCta.titleAccent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <p className="lede mx-auto max-w-[560px]">{finalCta.lede}</p>
          </Reveal>

          <Reveal delay={0.16} className="mt-9 flex justify-center">
            <WaitlistForm size="lg" source="final" align="center" />
          </Reveal>

          <Reveal delay={0.22} className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {proof.rows.map((row) => (
                <li key={row.nisa} className="flex items-baseline gap-1.5">
                  <span
                    className="num text-[15px] font-semibold"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {row.pct}%
                  </span>
                  <span className="text-[12.5px] text-fg-faint">
                    {row.nisa}, {row.grad}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
