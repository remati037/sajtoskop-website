"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ChevronDown, Lock, MapPin, RotateCw, Search } from "lucide-react";
import { bandLabel, scanDemo, type Band } from "@/lib/content";

const BAND_STYLE: Record<Band, { fg: string; bg: string }> = {
  nema: { fg: "var(--score-none)", bg: "var(--score-none-bg)" },
  katastrofa: { fg: "var(--score-cat)", bg: "var(--score-cat-bg)" },
  ruzan: { fg: "var(--score-ugly)", bg: "var(--score-ugly-bg)" },
  osrednji: { fg: "var(--score-mid)", bg: "var(--score-mid-bg)" },
  solidan: { fg: "var(--score-ok)", bg: "var(--score-ok-bg)" },
};

const ROW_DELAY = 340;
const HOLD_MS = 5200;

export function ScanDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(0);
  const [runId, setRunId] = useState(0);
  const total = scanDemo.rows.length;
  const done = visible >= total;

  // Sekvenca: redovi izlaze jedan po jedan, pa pauza, pa ponovo.
  useEffect(() => {
    if (reduce) {
      setVisible(total);
      return;
    }
    if (!inView) return;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    setVisible(0);
    for (let i = 1; i <= total; i++) {
      timers.push(
        setTimeout(() => {
          if (!cancelled) setVisible(i);
        }, 420 + i * ROW_DELAY),
      );
    }
    timers.push(
      setTimeout(
        () => {
          if (!cancelled) setRunId((r) => r + 1);
        },
        420 + total * ROW_DELAY + HOLD_MS,
      ),
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [inView, runId, total, reduce]);

  const leadCount = scanDemo.rows
    .slice(0, visible)
    .filter((r) => r.band === "nema" || r.band === "katastrofa").length;

  return (
    <div ref={ref} className="relative">
      {/* odsjaj ispod prozora */}
      <div
        aria-hidden
        className="glow left-1/2 top-10 h-[55%] w-[80%] -translate-x-1/2"
        style={{ background: "var(--accent-glow)", opacity: 0.5 }}
      />

      <div
        className="noise relative overflow-hidden rounded-[18px] border border-border bg-bg-elev"
        style={{ boxShadow: "var(--shadow-hero)" }}
      >
        {/* ── chrome prozora ─────────────────────────────────────── */}
        <div className="flex items-center gap-3 border-b border-border bg-bg-subtle px-3.5 py-2.5 sm:px-4">
          <div className="flex gap-1.5" aria-hidden>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span
                key={c}
                className="h-[9px] w-[9px] rounded-full opacity-70"
                style={{ background: c }}
              />
            ))}
          </div>
          <div className="mx-auto hidden max-w-[280px] flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-bg px-2.5 py-1 sm:flex">
            <span className="num text-[10.5px] text-fg-faint">app.sajtoskop.com/pretraga</span>
          </div>
          <span className="eyebrow ml-auto text-[9.5px] sm:ml-0">beta</span>
        </div>

        {/* ── traka sa upitom ────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border px-3.5 py-3 sm:px-4">
          <SelectPill icon={MapPin} value={scanDemo.query.grad} />
          <SelectPill icon={Search} value={scanDemo.query.nisa} />
          <div className="ml-auto flex items-center gap-2">
            <StatusDot done={done} />
            <span className="num text-[11px] text-fg-muted">
              {done ? scanDemo.statusDone : scanDemo.statusScanning}
              {!done && <span className="animate-blink">…</span>}
            </span>
          </div>
        </div>

        {/* ── tabela ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* linija skeniranja */}
          {!done && !reduce && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 animate-scanline"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--accent-wash) 55%, var(--accent-glow))",
                maskImage: "linear-gradient(to bottom, transparent, #000)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent, #000)",
              }}
            />
          )}

          <div className="grid grid-cols-[1fr_auto] gap-x-3 border-b border-border px-3.5 py-2 sm:grid-cols-[minmax(0,1.5fr)_92px_minmax(0,1.4fr)_36px] sm:px-4">
            <span className="eyebrow text-[9.5px]">{scanDemo.columns[0]}</span>
            <span className="eyebrow hidden text-[9.5px] sm:block">{scanDemo.columns[1]}</span>
            <span className="eyebrow hidden text-[9.5px] sm:block">{scanDemo.columns[2]}</span>
            <span className="sr-only">Status</span>
          </div>

          {/* Svi redovi su uvek u DOM-u — samo se otkrivaju. Tako se visina
              prozora ne menja u toku animacije i ništa ne poskakuje. */}
          <ul>
            {scanDemo.rows.map((row, i) => {
                const style = BAND_STYLE[row.band];
                const shown = i < visible;
                return (
                  <motion.li
                    key={row.name}
                    animate={
                      reduce
                        ? { opacity: 1 }
                        : {
                            opacity: shown ? 1 : 0,
                            y: shown ? 0 : -5,
                            filter: shown ? "blur(0px)" : "blur(4px)",
                          }
                    }
                    initial={false}
                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden={!shown}
                    className="grid grid-cols-[1fr_auto] items-center gap-x-3 border-b border-border px-3.5 py-2.5 last:border-b-0 sm:grid-cols-[minmax(0,1.5fr)_92px_minmax(0,1.4fr)_36px] sm:px-4"
                    style={{
                      background:
                        row.band === "nema" ? "var(--score-none-bg)" : undefined,
                    }}
                  >
                    {/* ime */}
                    <div className="min-w-0">
                      <p className="truncate text-[13.5px] font-medium tracking-[-0.015em] text-fg">
                        {row.name}
                      </p>
                      <p className="num mt-0.5 truncate text-[10.5px] text-fg-faint sm:hidden">
                        {row.issue}
                      </p>
                    </div>

                    {/* score / bend */}
                    <div className="order-3 col-span-2 mt-1.5 flex items-center gap-2 sm:order-none sm:col-span-1 sm:mt-0">
                      <span
                        className="num inline-flex h-[22px] items-center rounded-md px-1.5 text-[11px] font-medium"
                        style={{ color: style.fg, background: style.bg }}
                      >
                        {row.score === null ? bandLabel.nema : row.score}
                      </span>
                      {row.score !== null && (
                        <span
                          className="hidden text-[10px] font-medium tracking-[-0.01em] sm:inline"
                          style={{ color: style.fg }}
                        >
                          {bandLabel[row.band]}
                        </span>
                      )}
                    </div>

                    {/* problem */}
                    <p className="num hidden truncate text-[11.5px] text-fg-muted sm:block">
                      {row.issue}
                    </p>

                    {/* zaključano */}
                    <div className="hidden justify-end sm:flex">
                      {row.locked ? (
                        <span
                          className="grid h-6 w-6 place-items-center rounded-md border border-border text-fg-faint"
                          title="Otključaj za 1 kredit"
                        >
                          <Lock size={11} strokeWidth={2.2} />
                        </span>
                      ) : (
                        <span className="text-[11px] text-fg-faint">—</span>
                      )}
                    </div>

                    <span className="sr-only">
                      {row.score === null
                        ? "nema sajt"
                        : `ugly score ${row.score}, ${bandLabel[row.band]}`}
                    </span>
                  </motion.li>
                );
              })}
          </ul>
        </div>

        {/* ── podnožje prozora ───────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border bg-bg-subtle px-3.5 py-2.5 sm:px-4">
          <span className="inline-flex items-center gap-1.5 text-[11.5px] text-fg-muted">
            <span
              className="h-2 w-2 rounded-[3px]"
              style={{ background: "var(--accent)" }}
              aria-hidden
            />
            {scanDemo.legend}
          </span>
          <span className="num ml-auto text-[11px] text-fg-faint">
            {leadCount} / {visible} leadova
          </span>
          <button
            type="button"
            onClick={() => setRunId((r) => r + 1)}
            className="grid h-6 w-6 place-items-center rounded-md border border-border text-fg-faint transition-colors hover:text-fg"
            aria-label="Pusti animaciju ponovo"
          >
            <RotateCw size={11} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SelectPill({
  icon: Icon,
  value,
}: {
  icon: typeof MapPin;
  value: string;
}) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-bg px-2.5 text-[12.5px] font-medium text-fg">
      <Icon size={12.5} strokeWidth={2} className="text-fg-faint" />
      {value}
      <ChevronDown size={12} strokeWidth={2.2} className="text-fg-faint" />
    </span>
  );
}

function StatusDot({ done }: { done: boolean }) {
  return (
    <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden>
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: done ? "var(--accent)" : "var(--warn)" }}
      />
      {!done && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "var(--warn)",
            animation: "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      )}
    </span>
  );
}
