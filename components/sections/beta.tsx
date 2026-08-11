import { Check } from "lucide-react";
import { beta } from "@/lib/content";
import { Container, Section } from "../ui";
import { Reveal } from "../motion-primitives";
import { WaitlistForm } from "../waitlist-form";

export function Beta() {
  return (
    <Section id="beta">
      <Container>
        <Reveal y={28}>
          <div
            className="noise relative overflow-hidden rounded-[var(--radius-lg)] border p-7 sm:p-10 lg:p-12"
            style={{
              borderColor: "var(--border-accent)",
              background: "var(--bg-elev)",
              boxShadow: "var(--shadow-hero)",
            }}
          >
            <div className="grid-bg opacity-60" aria-hidden />
            <div
              aria-hidden
              className="glow -left-16 -top-16 h-72 w-96"
              style={{ background: "var(--accent-glow)", opacity: 0.6 }}
            />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-14">
              <div>
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-[5px] w-[5px] rounded-full"
                    style={{ background: "var(--accent)" }}
                    aria-hidden
                  />
                  <span className="eyebrow">{beta.eyebrow}</span>
                </div>

                <h2 className="h1 mt-4">{beta.title}</h2>
                <p className="lede mt-4 max-w-[440px]">{beta.lede}</p>

                <div className="mt-8">
                  <WaitlistForm size="lg" source="beta" />
                </div>

                <p className="mt-6 max-w-[440px] text-[12.5px] leading-relaxed text-fg-faint">
                  {beta.finePrint}
                </p>
              </div>

              <div className="lg:pl-10 lg:border-l lg:border-border">
                <span className="eyebrow">Šta ulazi u besplatnu betu</span>
                <ul className="mt-5 flex flex-col gap-3">
                  {beta.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        className="mt-[2px] grid h-[17px] w-[17px] shrink-0 place-items-center rounded-full"
                        style={{ background: "var(--accent-wash)" }}
                        aria-hidden
                      >
                        <Check
                          size={10.5}
                          strokeWidth={3}
                          style={{ color: "var(--accent-text)" }}
                        />
                      </span>
                      <span className="text-[14px] leading-snug text-fg-muted">{item}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="mt-8 rounded-[var(--radius)] border border-border p-5"
                  style={{ background: "var(--bg-subtle)" }}
                >
                  <h3 className="text-[13.5px] font-semibold tracking-[-0.02em] text-fg">
                    {beta.promise.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">
                    {beta.promise.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
