"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { pricing, type BillingCycle } from "@/lib/content";
import { ctaMode, signUpUrl } from "@/lib/site";
import { Container, Section, SectionHeader } from "../ui";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

/** Formatira cenu bez decimala: 1190 → „1.190". */
function formatPrice(value: number): string {
  return new Intl.NumberFormat("sr-RS", { maximumFractionDigits: 0 }).format(value);
}

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const yearly = cycle === "yearly";

  return (
    <Section id="cene">
      <Container>
        <SectionHeader
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          lede={pricing.lede}
          align="center"
          max="max-w-[700px]"
        />

        {/* ── prekidač mesečno / godišnje ─────────────────────── */}
        <Reveal delay={0.08} className="mt-10 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-label="Način plaćanja"
            className="relative inline-flex items-center rounded-full border border-border p-1"
            style={{ background: "var(--bg-elev)" }}
          >
            {(["monthly", "yearly"] as const).map((value) => {
              const active = cycle === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setCycle(value)}
                  aria-pressed={active}
                  className="relative z-10 rounded-full px-5 py-2 text-[13.5px] font-medium transition-colors duration-200"
                  style={{ color: active ? "var(--fg)" : "var(--fg-muted)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="pricing-cycle"
                      className="absolute inset-0 -z-10 rounded-full border border-border"
                      style={{ background: "var(--bg-subtle)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {value === "monthly" ? pricing.toggle.monthly : pricing.toggle.yearly}
                </button>
              );
            })}
          </div>

          {/* Visina je rezervisana da kartice ne poskoče pri prebacivanju. */}
          <p
            className="h-[18px] text-[12.5px] font-medium transition-opacity duration-200"
            style={{
              color: "var(--accent-text)",
              opacity: yearly ? 1 : 0,
            }}
            aria-hidden={!yearly}
          >
            {pricing.toggle.yearlyBadge}
          </p>
        </Reveal>

        {/* ── kartice ─────────────────────────────────────────── */}
        <Stagger className="mt-10 grid items-start gap-4 lg:grid-cols-3 lg:gap-5">
          {pricing.plans.map((plan) => {
            const price = yearly ? plan.priceYearly : plan.priceMonthly;
            const period = yearly ? pricing.perYear : pricing.perMonth;

            return (
              <StaggerItem key={plan.id} className="h-full">
                <article
                  className={`noise relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-7 ${
                    plan.featured ? "lg:-mt-4 lg:pb-9 lg:pt-9" : ""
                  }`}
                  style={{
                    borderColor: plan.featured ? "var(--border-accent)" : "var(--border)",
                    background: plan.featured ? "var(--bg-elev)" : "var(--bg-subtle)",
                    boxShadow: plan.featured ? "var(--shadow-hero)" : "var(--shadow-card)",
                  }}
                >
                  {plan.featured && (
                    <div
                      aria-hidden
                      className="glow -right-12 -top-16 h-56 w-56"
                      style={{ background: "var(--accent-glow)", opacity: 0.55 }}
                    />
                  )}

                  <div className="relative flex flex-col">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-fg">
                        {plan.name}
                      </h3>
                      {plan.featured && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.01em]"
                          style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
                        >
                          {pricing.popular}
                        </span>
                      )}
                    </div>

                    <p className="mt-2.5 min-h-[42px] text-[13.5px] leading-relaxed text-fg-muted">
                      {plan.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1.5">
                      <span className="num text-[2.6rem] font-semibold leading-none tracking-[-0.055em] text-fg">
                        €{formatPrice(price)}
                      </span>
                      <span className="text-[13.5px] text-fg-faint">/ {period}</span>
                    </div>

                    <a
                      href={ctaMode === "signup" ? signUpUrl : "#pristup"}
                      data-umami-event="cta-click"
                      data-umami-event-source={`pricing-${plan.id}`}
                      className={`btn btn-md mt-6 w-full ${
                        plan.featured ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </a>

                    <ul className="mt-7 flex flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
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
                          <span className="text-[13.5px] leading-snug text-fg-muted">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* ── skidanje rizika ─────────────────────────────────── */}
        <Reveal delay={0.1} className="mt-10">
          <ul className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
            {pricing.reassurance.map((item) => (
              <li
                key={item}
                className="flex items-start gap-1.5 text-[12.5px] leading-snug text-fg-faint"
              >
                <Check
                  size={12.5}
                  strokeWidth={2.6}
                  className="mt-[2px] shrink-0"
                  style={{ color: "var(--accent)" }}
                />
                {item}
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-6 max-w-[620px] text-center text-[12.5px] leading-relaxed text-fg-faint">
            {pricing.finePrint}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
