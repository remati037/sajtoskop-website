import { local } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { Stagger, StaggerItem } from "../motion-primitives";

export function Local() {
  return (
    <Section id="srbija" tone="subtle">
      <Container>
        <SectionHeader
          eyebrow={local.eyebrow}
          title={local.title}
          lede={local.lede}
          align="center"
          max="max-w-[680px]"
        />

        <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2">
          {local.items.map((item, i) => (
            <StaggerItem key={item.title} className="h-full">
              <article className="card-glass group relative h-full overflow-hidden p-6 sm:p-7">
                <span
                  aria-hidden
                  className="num absolute right-5 top-4 text-[3.5rem] font-semibold leading-none tracking-[-0.06em] opacity-[0.045] transition-opacity duration-300 group-hover:opacity-[0.09]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h2 relative max-w-[85%] text-[1.05rem]">{item.title}</h3>
                <p className="relative mt-3 text-[14.5px] leading-relaxed text-fg-muted">
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
