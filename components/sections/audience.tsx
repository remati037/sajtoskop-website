import { ArrowRight } from "lucide-react";
import { audience } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { Stagger, StaggerItem } from "../motion-primitives";

export function Audience() {
  return (
    <Section id="za-koga" tone="subtle">
      <Container>
        <SectionHeader
          eyebrow={audience.eyebrow}
          title={audience.title}
          lede={audience.lede}
          max="max-w-[740px]"
        />

        <Stagger className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-3">
          {audience.items.map((item) => (
            <StaggerItem key={item.role} className="h-full">
              <article className="card-glass flex h-full flex-col p-6 sm:p-7">
                <h3 className="h2 text-[1.05rem]">{item.role}</h3>

                <p
                  className="mt-5 border-l-2 pl-3.5 text-[13.5px] leading-relaxed italic text-fg-muted"
                  style={{ borderColor: "var(--danger)" }}
                >
                  „{item.pain}"
                </p>

                <div className="mt-6 flex items-start gap-2.5">
                  <ArrowRight
                    size={14}
                    strokeWidth={2.4}
                    className="mt-[3px] shrink-0"
                    style={{ color: "var(--accent-text)" }}
                  />
                  <p className="text-[14px] leading-relaxed text-fg">{item.win}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
