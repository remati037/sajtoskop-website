"use client";

import { faq } from "@/lib/content";
import { site } from "@/lib/site";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "../motion-primitives";
import { Container, Section, SectionHeader } from "../ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" tone="subtle">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader eyebrow={faq.eyebrow} title={faq.title} max="max-w-none" />
            <Reveal delay={0.1} className="mt-6">
              <p className="text-[14px] leading-relaxed text-fg-muted">
                Nema odgovora na tvoje pitanje?{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium underline underline-offset-4"
                  style={{ color: "var(--accent-text)" }}
                >
                  Piši mi direktno
                </a>
                , odgovaram lično, obično isti dan.
              </p>
            </Reveal>
          </div>

          <Reveal y={24}>
            <ul className="border-t border-border">
              {faq.items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={item.q} className="border-b border-border">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="group flex w-full items-start justify-between gap-5 py-5 text-left"
                      >
                        <span
                          className="text-[15.5px] font-medium tracking-[-0.02em] transition-colors duration-200"
                          style={{ color: isOpen ? "var(--fg)" : "var(--fg)" }}
                        >
                          {item.q}
                        </span>
                        <span
                          className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-border transition-all duration-300"
                          style={{
                            background: isOpen ? "var(--accent)" : "transparent",
                            color: isOpen ? "var(--accent-ink)" : "var(--fg-faint)",
                            borderColor: isOpen ? "var(--accent)" : "var(--border)",
                          }}
                          aria-hidden
                        >
                          <Plus
                            size={13}
                            strokeWidth={2.4}
                            className="transition-transform duration-300"
                            style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                          />
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-6 pr-8 text-[14.5px] leading-relaxed text-fg-muted">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
