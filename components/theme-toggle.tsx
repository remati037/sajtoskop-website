"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const OPTIONS: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Svetla tema" },
  { value: "system", icon: Monitor, label: "Tema po sistemu" },
  { value: "dark", icon: Moon, label: "Tamna tema" },
];

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("sajtoskop-theme", theme);
  } catch {
    /* private mode — nema veze */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // Bez sačuvanog izbora sajt je taman, pa je i „mesec" aktivan.
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("sajtoskop-theme") as Theme | null;
      setTheme(stored === "light" || stored === "system" ? stored : "dark");
    } catch {
      setTheme("dark");
    }
  }, []);

  function pick(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Tema"
      className={`relative inline-flex items-center gap-0.5 rounded-full border border-border bg-bg-subtle p-0.5 ${className}`}
    >
      {OPTIONS.map(({ value, icon: Icon, label }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => pick(value)}
            className="relative grid h-7 w-7 place-items-center rounded-full transition-colors duration-200"
            style={
              active
                ? { backgroundColor: "var(--bg-elev)", color: "var(--fg)", boxShadow: "var(--shadow-sm)" }
                : { color: "var(--fg-faint)" }
            }
          >
            <Icon size={13.5} strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
