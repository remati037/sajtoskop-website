"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/content";
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="transition-all duration-300"
        style={{
          backgroundColor: scrolled || open ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
          backdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
          WebkitBackdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
          borderBottom: `1px solid ${scrolled || open ? "var(--border)" : "transparent"}`,
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
            <div className="hidden sm:block">
              <CtaButton size="md" />
            </div>
            {!minimal && (
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Zatvori meni" : "Otvori meni"}
                aria-expanded={open}
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-fg md:hidden"
              >
                {open ? <X size={16} strokeWidth={2.2} /> : <Menu size={16} strokeWidth={2.2} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* mobilni meni */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-border md:hidden"
            style={{
              backgroundColor: "var(--bg)",
              backdropFilter: "blur(14px)",
            }}
          >
            <nav className="mx-auto flex w-full max-w-[1160px] flex-col px-5 pb-5 pt-2 sm:px-7">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3.5 text-[15px] font-medium text-fg last:border-b-0"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 sm:hidden">
                <CtaButton size="lg" className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
