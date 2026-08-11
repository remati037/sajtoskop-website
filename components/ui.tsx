import type { ReactNode } from "react";
import { Reveal } from "./motion-primitives";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1160px] px-5 sm:px-7 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  tone = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "base" | "subtle";
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-[clamp(4.5rem,9vw,8rem)] ${className}`}
      style={tone === "subtle" ? { backgroundColor: "var(--bg-subtle)" } : undefined}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  lede,
  align = "start",
  max = "max-w-[720px]",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
  align?: "start" | "center";
  max?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={`${max} ${centered ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}>
        <span
          className="h-[5px] w-[5px] rounded-full"
          style={{ background: "var(--accent)" }}
          aria-hidden
        />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="h1 mt-4">
        {title}
        {accent && (
          <>
            {" "}
            <span style={{ color: "var(--accent-text)" }}>{accent}</span>
          </>
        )}
      </h2>
      {lede && <p className="lede mt-5">{lede}</p>}
    </Reveal>
  );
}

/** Tanka linija sa oznakom — koristi se kao razdvajač sekcija. */
export function RuleLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="eyebrow shrink-0">{children}</span>
      <span className="h-px flex-1" style={{ background: "var(--border)" }} />
    </div>
  );
}
