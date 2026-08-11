import { proof } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { CountUp, Reveal, Stagger, StaggerItem } from "../motion-primitives";

export function Proof() {
  return (
    <Section id="dokaz">
      <Container>
        <SectionHeader
          eyebrow={proof.eyebrow}
          title={proof.title}
          accent={proof.titleAccent}
          lede={proof.lede}
          max="max-w-[760px]"
        />

        <Stagger className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
          {proof.rows.map((row) => (
            <StaggerItem key={row.nisa}>
              <article className="card-glass relative h-full overflow-hidden p-6 sm:p-7">
                <div
                  aria-hidden
                  className="glow -right-10 -top-12 h-40 w-40"
                  style={{ background: "var(--accent-glow)", opacity: 0.35 }}
                />
                <div className="relative">
                  <div className="flex items-baseline gap-1.5">
                    <span className="num text-[clamp(3rem,7vw,4.25rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-fg">
                      <CountUp to={row.pct} />
                    </span>
                    <span
                      className="num text-[1.9rem] font-medium leading-none"
                      style={{ color: "var(--accent-text)" }}
                    >
                      %
                    </span>
                  </div>

                  <div
                    className="mt-5 h-[3px] w-full overflow-hidden rounded-full"
                    style={{ background: "var(--bg-inset)" }}
                    aria-hidden
                  >
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${row.pct}%`, background: "var(--accent)" }}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
                      {row.nisa}
                    </span>
                    <span className="text-fg-faint" aria-hidden>
                      ·
                    </span>
                    <span className="text-[15px] text-fg-muted">{row.grad}</span>
                  </div>
                  <p className="mt-1 text-[13px] text-fg-faint">
                    {proof.columns[2].toLowerCase()}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-7">
          <p className="max-w-[620px] text-[13px] leading-relaxed text-fg-faint">
            {proof.footnote}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
