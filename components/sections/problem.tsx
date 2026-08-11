import { problem } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { Stagger, StaggerItem } from "../motion-primitives";

export function Problem() {
  return (
    <Section id="problem" tone="subtle">
      <Container>
        <SectionHeader
          eyebrow={problem.eyebrow}
          title={problem.title}
          lede={problem.lede}
        />

        <Stagger className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3">
          {problem.items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <article
                className="card-glass group relative flex h-full flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-[var(--border-strong)]"
              >
                {/* crvena nit sa strane — „ovo te košta" */}
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-[2px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "var(--danger)" }}
                />

                <span className="eyebrow">{item.tag}</span>

                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    className="num text-[2.6rem] font-semibold leading-none tracking-[-0.05em]"
                    style={{ color: "var(--danger)" }}
                  >
                    {item.stat}
                  </span>
                </div>
                <p className="mt-2 text-[12.5px] leading-snug text-fg-faint">
                  {item.statLabel}
                </p>

                <h3 className="h2 mt-7 text-[1.08rem]">{item.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-fg-muted">
                  {item.body}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
