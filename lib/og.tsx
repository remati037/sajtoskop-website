/**
 * Zajednički izgled svih deljivih slika — OG, Twitter i social formati.
 *
 * Tekst se NE piše ovde nego se povlači iz `lib/content.ts`, pa kad promeniš
 * kopi na landingu, slike se same usklade. Jedini razlog da diraš ovaj fajl je
 * promena rasporeda, ne promena rečenice.
 *
 * Satori (motor iza `next/og`) je strog:
 *   · svaki div sa više dece mora imati eksplicitan `display: flex`
 *   · nema `gap` shorthand problema, ali nema ni grid-a
 *   · font se prosleđuje kao bafer, ne kao CSS
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero, pricing, proof, trial } from "@/lib/content";
import { site } from "@/lib/site";

export const BG = "#07080a";
export const FG = "#f2f4f3";
export const MUTED = "#9aa2ab";
export const ACCENT = "#adee2e";
export const BORDER = "rgba(255,255,255,0.1)";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const SQUARE_SIZE = { width: 1080, height: 1080 } as const;
export const STORY_SIZE = { width: 1080, height: 1920 } as const;

/** Najjeftiniji plan — „od 29 €" u podnožju slika. */
const cheapest = pricing.plans.reduce((min, p) =>
  p.priceMonthly < min.priceMonthly ? p : min,
);

export async function loadFonts() {
  const [semibold, regular, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "assets/GeistMono-Medium.ttf")),
  ]);

  return [
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "GeistMono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** Redovi naslova iz kopija, sa akcentom izdvojenim u zaseban komad. */
function titleParts(line: string) {
  const at = line.indexOf(hero.titleAccent);
  if (at === -1) return [{ text: line, accent: false }];
  return [
    { text: line.slice(0, at), accent: false },
    { text: hero.titleAccent, accent: true },
    { text: line.slice(at + hero.titleAccent.length), accent: false },
  ].filter((part) => part.text.length > 0);
}

function TitleLine({ line, size }: { line: string; size: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        fontSize: size,
        fontWeight: 600,
        color: FG,
        letterSpacing: "-0.045em",
        lineHeight: 1.02,
      }}
    >
      {titleParts(line).map((part, i) => (
        <span key={i} style={{ color: part.accent ? ACCENT : FG, whiteSpace: "pre" }}>
          {part.text}
        </span>
      ))}
    </div>
  );
}

function Wordmark({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 * scale }}>
      <div
        style={{
          width: 30 * scale,
          height: 30 * scale,
          borderRadius: 999,
          border: `${2.5 * scale}px solid ${FG}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 10 * scale,
            height: 10 * scale,
            borderRadius: 999,
            background: ACCENT,
            display: "flex",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 28 * scale,
          fontWeight: 600,
          color: FG,
          letterSpacing: "-0.03em",
        }}
      >
        sajtoskop
      </div>
      <div
        style={{
          marginLeft: 8 * scale,
          fontSize: 15 * scale,
          fontFamily: "GeistMono",
          color: BG,
          background: ACCENT,
          padding: `${4 * scale}px ${10 * scale}px`,
          borderRadius: 6 * scale,
          display: "flex",
        }}
      >
        {trial.label.toUpperCase()}
      </div>
    </div>
  );
}

function Glow({ size, top, left }: { size: number; top: number; left: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size * 0.78,
        background:
          "radial-gradient(circle closest-side, rgba(173,238,46,0.20), rgba(173,238,46,0))",
        display: "flex",
      }}
    />
  );
}

function ProofRow({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", gap: 44 * scale }}>
      {proof.rows.map((row) => (
        <div
          key={row.nisa}
          style={{ display: "flex", flexDirection: "column", gap: 6 * scale }}
        >
          <div
            style={{
              fontSize: 34 * scale,
              fontFamily: "GeistMono",
              color: ACCENT,
              letterSpacing: "-0.03em",
              display: "flex",
            }}
          >
            {row.pct}%
          </div>
          <div style={{ fontSize: 17 * scale, color: MUTED, display: "flex" }}>
            {row.nisa}, {row.grad}
          </div>
        </div>
      ))}
    </div>
  );
}

const priceLine = `Planovi od ${cheapest.priceMonthly} € mesečno`;

/* ==========================================================================
   1200 × 630 — OG i Twitter
========================================================================== */

export function LandscapeCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        padding: 72,
        fontFamily: "Geist",
        position: "relative",
      }}
    >
      <Glow size={620} top={-160} left={-120} />

      <Wordmark />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1010 }}>
          <TitleLine line={hero.titleLine1} size={74} />
          <TitleLine line={hero.titleLine2} size={74} />
        </div>
        <div style={{ fontSize: 26, color: MUTED, maxWidth: 900, lineHeight: 1.4, display: "flex" }}>
          Firme u tvom gradu koje nemaju sajt, sa telefonom, screenshotom i gotovom porukom.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 28,
        }}
      >
        <ProofRow />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 19, fontFamily: "GeistMono", color: ACCENT, display: "flex" }}>
            {priceLine}
          </div>
          <div style={{ fontSize: 19, fontFamily: "GeistMono", color: MUTED, display: "flex" }}>
            {site.domain}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   1080 × 1080 — Instagram feed, LinkedIn objava
========================================================================== */

export function SquareCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        padding: 84,
        fontFamily: "Geist",
        position: "relative",
      }}
    >
      <Glow size={760} top={-200} left={-160} />

      <Wordmark scale={1.15} />

      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TitleLine line={hero.titleLine1} size={66} />
          <TitleLine line={hero.titleLine2} size={66} />
        </div>
        <div style={{ fontSize: 30, color: MUTED, maxWidth: 840, lineHeight: 1.42, display: "flex" }}>
          U Šapcu {proof.rows[0].pct}% firmi za PVC stolariju nema sajt koji radi. Sajtoskop zna
          njihova imena, telefone i tačan problem.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 34,
        }}
      >
        <ProofRow scale={1.05} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 22, fontFamily: "GeistMono", color: ACCENT, display: "flex" }}>
            {priceLine}
          </div>
          <div style={{ fontSize: 22, fontFamily: "GeistMono", color: MUTED, display: "flex" }}>
            {site.domain}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   1080 × 1920 — Instagram story
========================================================================== */

export function StoryCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: BG,
        padding: "220px 84px 300px",
        fontFamily: "Geist",
        position: "relative",
      }}
    >
      <Glow size={860} top={-160} left={-200} />

      <Wordmark scale={1.2} />

      <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TitleLine line={hero.titleLine1} size={68} />
          <TitleLine line={hero.titleLine2} size={68} />
        </div>
        <div style={{ fontSize: 32, color: MUTED, maxWidth: 860, lineHeight: 1.45, display: "flex" }}>
          Izabereš grad i nišu. Dobiješ firme bez sajta, sa telefonom, screenshotom i porukom
          spremnom za slanje.
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: ACCENT,
            color: BG,
            fontSize: 30,
            fontWeight: 600,
            padding: "20px 36px",
            borderRadius: 999,
            marginTop: 10,
          }}
        >
          {trial.days} dana besplatno
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          borderTop: `1px solid ${BORDER}`,
          paddingTop: 38,
        }}
      >
        <ProofRow scale={1.1} />
        <div style={{ fontSize: 26, fontFamily: "GeistMono", color: MUTED, display: "flex" }}>
          {site.domain}
        </div>
      </div>
    </div>
  );
}
