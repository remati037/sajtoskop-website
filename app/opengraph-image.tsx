import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hero, proof } from "@/lib/content";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sajtoskop — nađi firme u Srbiji koje nemaju sajt";

const BG = "#07080a";
const FG = "#f2f4f3";
const MUTED = "#9aa2ab";
const ACCENT = "#adee2e";
const BORDER = "rgba(255,255,255,0.1)";

export default async function Image() {
  const [semibold, regular, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/Geist-SemiBold.ttf")),
    readFile(join(process.cwd(), "assets/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "assets/GeistMono-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
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
        {/* zeleni odsjaj */}
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 620,
            height: 480,
            background: "radial-gradient(circle closest-side, rgba(173,238,46,0.20), rgba(173,238,46,0))",
            display: "flex",
          }}
        />

        {/* zaglavlje */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              border: `2.5px solid ${FG}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: ACCENT, display: "flex" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: FG, letterSpacing: "-0.03em" }}>
            sajtoskop
          </div>
          <div
            style={{
              marginLeft: 8,
              fontSize: 15,
              fontFamily: "GeistMono",
              color: BG,
              background: ACCENT,
              padding: "4px 10px",
              borderRadius: 6,
              display: "flex",
            }}
          >
            BETA
          </div>
        </div>

        {/* naslov */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 600,
              color: FG,
              letterSpacing: "-0.045em",
              lineHeight: 1.03,
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 1000,
            }}
          >
            U Šapcu <span style={{ color: ACCENT, marginLeft: 20, marginRight: 20 }}>{hero.titleAccent}</span> PVC stolarija nema sajt koji radi.
          </div>
          <div style={{ fontSize: 27, color: MUTED, maxWidth: 860, lineHeight: 1.4, display: "flex" }}>
            Sajtoskop zna njihova imena, telefone i tačan problem.
          </div>
        </div>

        {/* podnožje sa brojkama */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${BORDER}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 44 }}>
            {proof.rows.map((row) => (
              <div key={row.nisa} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    fontSize: 34,
                    fontFamily: "GeistMono",
                    color: ACCENT,
                    letterSpacing: "-0.03em",
                    display: "flex",
                  }}
                >
                  {row.pct}%
                </div>
                <div style={{ fontSize: 17, color: MUTED, display: "flex" }}>
                  {row.nisa}, {row.grad}
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 19, fontFamily: "GeistMono", color: MUTED, display: "flex" }}>
            {site.domain}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "GeistMono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
