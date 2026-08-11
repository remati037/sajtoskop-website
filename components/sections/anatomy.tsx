import { AlertTriangle, Copy, Globe, Mail, Phone, Star, Unlock } from "lucide-react";
import { anatomy } from "@/lib/content";
import { Container, Section, SectionHeader } from "../ui";
import { Reveal, Stagger, StaggerItem } from "../motion-primitives";

export function Anatomy() {
  const b = anatomy.business;

  return (
    <Section id="lead">
      <Container>
        <SectionHeader
          eyebrow={anatomy.eyebrow}
          title={anatomy.title}
          lede={anatomy.lede}
        />

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          {/* ── kartica prospekta ─────────────────────────────── */}
          <Reveal y={28}>
            <div className="relative">
              <div
                aria-hidden
                className="glow -left-8 top-16 h-56 w-56"
                style={{ background: "var(--accent-glow)", opacity: 0.4 }}
              />
              <article
                className="noise relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg-elev"
                style={{ boxShadow: "var(--shadow-hero)" }}
              >
                {/* zaglavlje */}
                <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
                  <div className="min-w-0">
                    <h3 className="truncate text-[17px] font-semibold tracking-[-0.025em] text-fg">
                      {b.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-fg-muted">{b.category}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-[12px] text-fg-faint">
                      <Star size={11} strokeWidth={2.2} style={{ color: "var(--warn)" }} />
                      {b.rating}
                    </p>
                  </div>
                  <span
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11.5px] font-semibold"
                    style={{
                      background: "var(--score-none-bg)",
                      color: "var(--score-none)",
                    }}
                  >
                    <Unlock size={11} strokeWidth={2.5} />
                    {b.scoreLabel}
                  </span>
                </div>

                {/* kontakt */}
                <div className="grid gap-px bg-border sm:grid-cols-3">
                  <Field icon={Phone} label="Telefon" value={b.phone} note={b.phoneType} />
                  <Field icon={Mail} label="Mejl" value={b.email} />
                  <Field icon={Globe} label="Sajt" value={b.website} muted />
                </div>

                {/* problemi */}
                <div className="border-t border-border p-5 sm:p-6">
                  <span className="eyebrow">Konkretni problemi</span>
                  <ul className="mt-3.5 flex flex-col gap-2">
                    {anatomy.issues.map((issue) => (
                      <li
                        key={issue}
                        className="flex items-start gap-2.5 text-[13.5px] leading-snug text-fg-muted"
                      >
                        <AlertTriangle
                          size={13}
                          strokeWidth={2.2}
                          className="mt-[3px] shrink-0"
                          style={{ color: "var(--orange)" }}
                        />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* predlog poruke */}
                <div
                  className="border-t border-border p-5 sm:p-6"
                  style={{ background: "var(--bg-subtle)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow">{anatomy.messageLabel}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev px-2 py-1 text-[11px] text-fg-muted">
                      <Copy size={10.5} strokeWidth={2.2} />
                      Kopiraj
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-fg-muted">
                    {anatomy.message}
                  </p>
                </div>
              </article>
            </div>
          </Reveal>

          {/* ── lista onoga što dobijaš ───────────────────────── */}
          <Stagger className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 lg:content-start lg:gap-y-5">
            {anatomy.items.map((item, i) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-3.5">
                  <span
                    className="num mt-[3px] shrink-0 text-[11px] font-medium"
                    style={{ color: "var(--accent-text)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[14.5px] font-semibold tracking-[-0.02em] text-fg">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  note,
  muted = false,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  note?: string;
  muted?: boolean;
}) {
  return (
    <div className="p-5 sm:p-6" style={{ background: "var(--bg-elev)" }}>
      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-fg-faint">
        <Icon size={11.5} strokeWidth={2.2} />
        {label}
      </span>
      <p
        className={`num mt-2 truncate text-[13.5px] ${muted ? "text-fg-faint" : "text-fg"}`}
        title={value}
      >
        {value}
      </p>
      {note && (
        <p className="mt-1 text-[11.5px]" style={{ color: "var(--accent-text)" }}>
          {note}
        </p>
      )}
    </div>
  );
}
