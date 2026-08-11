import { how } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { Stagger, StaggerItem } from "../motion-primitives";

export function How() {
  return (
    <Section id="kako-radi" tone="subtle">
      <Container>
        <SectionHeader eyebrow={how.eyebrow} title={how.title} lede={how.lede} />

        <Stagger className="relative mt-12 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-border bg-border sm:mt-16 md:grid-cols-3">
          {how.steps.map((step) => (
            <StaggerItem key={step.n} className="h-full">
              <article
                className="relative flex h-full flex-col p-7 sm:p-8"
                style={{ background: "var(--bg-elev)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="num grid h-8 w-8 place-items-center rounded-lg text-[12px] font-semibold"
                    style={{
                      background: "var(--accent-wash)",
                      color: "var(--accent-text)",
                      border: "1px solid var(--border-accent)",
                    }}
                  >
                    {step.n}
                  </span>
                  <span
                    className="h-px flex-1"
                    style={{ background: "var(--border)" }}
                    aria-hidden
                  />
                </div>

                <h3 className="h2 mt-6 text-[1.15rem]">{step.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-fg-muted">
                  {step.body}
                </p>

                <p
                  className="mt-auto pt-6 text-[12.5px] leading-relaxed text-fg-faint"
                >
                  <span
                    className="mr-1.5 inline-block h-[5px] w-[5px] translate-y-[-2px] rounded-full"
                    style={{ background: "var(--accent)" }}
                    aria-hidden
                  />
                  {step.detail}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
