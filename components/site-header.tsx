"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cta, nav } from "@/lib/content";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { CtaButton } from "./waitlist-form";

export function SiteHeader({ minimal = false }: { minimal?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc zatvara meni; prelaz na desktop takođe — inače bi meni ostao „otvoren"
  // iza md:hidden i skrol bi ostao zaključan.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="relative z-50 transition-all duration-300"
        style={{
          // Kad je meni otvoren, traka je puna boja i bez linije — nastavlja se
          // u panel ispod, bez šava.
          backgroundColor: open
            ? "var(--bg)"
            : scrolled
              ? "color-mix(in oklab, var(--bg) 82%, transparent)"
              : "transparent",
          backdropFilter: scrolled && !open ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled && !open ? "blur(14px) saturate(140%)" : "none",
          borderBottom: `1px solid ${scrolled && !open ? "var(--border)" : "transparent"}`,
        }}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-[1160px] items-center gap-6 px-5 sm:px-7 lg:px-8">
          <Logo />

          {!minimal && (
            <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Glavna navigacija">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2.5 py-1.5 text-[13.5px] font-medium text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2.5">
            <ThemeToggle />
            {/* Dok je meni otvoren, CTA iz trake se sklanja — isto dugme stoji na dnu panela. */}
            <div className={open ? "hidden md:block" : "hidden sm:block"}>
              <CtaButton size="md" />
            </div>
            {!minimal && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Zatvori meni" : "Otvori meni"}
                aria-expanded={open}
                aria-controls="mobilni-meni"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-fg md:hidden"
              >
                {open ? <X size={16} strokeWidth={2.2} /> : <Menu size={16} strokeWidth={2.2} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* mobilni meni — pun ekran, ništa od sajta ne viri iza */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobilni-meni"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-0 z-40 md:hidden"
            style={{ height: "100dvh", backgroundColor: "var(--bg)" }}
          >
            <div className="mx-auto flex h-full w-full max-w-[1160px] flex-col px-5 pt-[68px] pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:px-7">
              <nav className="flex flex-col pt-2" aria-label="Mobilna navigacija">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.32,
                      delay: 0.04 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="border-b border-border py-4 text-[17px] font-medium tracking-[-0.015em] text-fg last:border-b-0"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="mt-auto pt-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <CtaButton size="lg" className="w-full" onClick={() => setOpen(false)} />
                <p className="mt-3 text-center text-[13px] leading-relaxed text-fg-faint">
                  {cta.sub}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
