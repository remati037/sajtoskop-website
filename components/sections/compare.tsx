import { Check, Minus, X } from "lucide-react";
import { compare } from "@/lib/content";
import { LogoMark } from "../logo";
import { Container, Section, SectionHeader } from "../ui";
import { Reveal } from "../motion-primitives";

const MARK = {
  yes: { Icon: Check, color: "var(--accent-text)" },
  warn: { Icon: Minus, color: "var(--warn)" },
  no: { Icon: X, color: "var(--danger)" },
} as const;

type Mark = keyof typeof MARK;

export function Compare() {
  return (
    <Section id="poredjenje">
      <Container>
        <SectionHeader
          eyebrow={compare.eyebrow}
          title={compare.title}
          lede={compare.lede}
          max="max-w-[640px]"
        />

        <Reveal y={26} className="mt-12 sm:mt-16">
          {/* Telefon: svaki red tabele je kartica — bez horizontalnog skrola. */}
          <div className="grid gap-3 md:hidden">
            {compare.rows.map((row) => (
              <div key={row.label} className="card-glass p-4">
                <p className="text-[13.5px] font-semibold tracking-[-0.015em] text-fg">
                  {row.label}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {row.values.map((value, i) => {
                    const isUs = i === compare.highlight;
                    const mark = MARK[row.marks[i] as Mark];
                    return (
                      <li
                        key={`${row.label}-${i}`}
                        className="flex items-start gap-2.5 rounded-[10px] border border-border px-2.5 py-2"
                        style={
                          isUs
                            ? {
                                background: "var(--accent-wash)",
                                borderColor: "var(--border-accent)",
                              }
                            : undefined
                        }
                      >
                        <mark.Icon
                          size={14}
                          strokeWidth={2.6}
                          className="mt-[3px] shrink-0"
                          style={{ color: mark.color }}
                        />
                        <div className="min-w-0">
                          <span className="flex items-center gap-1.5">
                            {isUs && <LogoMark className="h-[11px] w-[11px] text-fg-muted" />}
                            <span className="eyebrow">{compare.columns[i]}</span>
                          </span>
                          <span
                            className="mt-1 block text-[13.5px] leading-snug"
                            style={{ color: isUs ? "var(--fg)" : "var(--fg-muted)" }}
                          >
                            {value}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="card-glass hidden overflow-hidden md:block"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <div className="scroll-x">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-[30%] px-5 py-4 sm:px-6" />
                    {compare.columns.map((col, i) => {
                      const isUs = i === compare.highlight;
                      return (
                        <th
                          key={col}
                          scope="col"
                          className="px-5 py-4 align-bottom sm:px-6"
                          style={
                            isUs
                              ? {
                                  background: "var(--accent-wash)",
                                  borderInline: "1px solid var(--border-accent)",
                                }
                              : undefined
                          }
                        >
                          <span className="flex items-center gap-2">
                            {isUs && <LogoMark className="h-[15px] w-[15px] text-fg" />}
                            <span
                              className="text-[13.5px] font-semibold tracking-[-0.02em]"
                              style={{ color: isUs ? "var(--fg)" : "var(--fg-muted)" }}
                            >
                              {col}
                            </span>
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {compare.rows.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th
                        scope="row"
                        className="px-5 py-4 text-[13.5px] font-medium tracking-[-0.015em] text-fg sm:px-6"
                      >
                        {row.label}
                      </th>
                      {row.values.map((value, i) => {
                        const isUs = i === compare.highlight;
                        const mark = MARK[row.marks[i] as Mark];
                        return (
                          <td
                            key={`${row.label}-${i}`}
                            className="px-5 py-4 sm:px-6"
                            style={
                              isUs
                                ? {
                                    background: "var(--accent-wash)",
                                    borderInline: "1px solid var(--border-accent)",
                                  }
                                : undefined
                            }
                          >
                            <span className="flex items-start gap-2">
                              <mark.Icon
                                size={14}
                                strokeWidth={2.6}
                                className="mt-[2px] shrink-0"
                                style={{ color: mark.color }}
                              />
                              <span
                                className="text-[13px] leading-snug"
                                style={{ color: isUs ? "var(--fg)" : "var(--fg-muted)" }}
                              >
                                {value}
                              </span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
