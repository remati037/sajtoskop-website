"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cta } from "@/lib/content";
import { ctaMode, signUpUrl } from "@/lib/site";
import { Magnetic } from "./motion-primitives";

type State = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function WaitlistForm({
  size = "lg",
  source = "hero",
  align = "start",
}: {
  size?: "lg" | "md";
  source?: string;
  align?: "start" | "center";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  // U „signup" režimu forme nema — dugme vodi pravo u aplikaciju.
  if (ctaMode === "signup") {
    return (
      <div className={align === "center" ? "flex flex-col items-center" : ""}>
        <Magnetic>
          <a
            href={signUpUrl}
            className={`btn btn-primary ${size === "lg" ? "btn-lg" : "btn-md"} w-full sm:w-auto`}
          >
            {cta.label}
            <ArrowRight size={17} strokeWidth={2.2} />
          </a>
        </Magnetic>
        <p className="mt-3 text-[13px] text-fg-faint">{cta.sub}</p>
      </div>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setState("error");
      setMessage(cta.errorEmail);
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };

      if (res.ok && data.ok) {
        setState("success");
        return;
      }
      setState("error");
      setMessage(data.code === "duplicate" ? cta.errorDuplicate : cta.errorGeneric);
    } catch {
      setState("error");
      setMessage(cta.errorGeneric);
    }
  }

  const centered = align === "center";

  return (
    <div className={centered ? "flex w-full flex-col items-center" : "w-full"}>
      <AnimatePresence mode="wait" initial={false}>
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="card-glass w-full max-w-[520px] p-5"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full"
                style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
              >
                <Check size={15} strokeWidth={3} />
              </span>
              <div>
                <p className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
                  {cta.successTitle}
                </p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-fg-muted">
                  {cta.successBody}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            className={`w-full max-w-[520px] ${centered ? "text-center" : ""}`}
          >
            <div
              className="group flex w-full flex-col gap-2 rounded-[14px] border border-border bg-bg-elev p-1.5 shadow-[var(--shadow-card)] transition-colors duration-200 focus-within:border-[var(--border-accent)] sm:flex-row sm:items-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <label htmlFor={`wl-${source}`} className="sr-only">
                Mejl adresa
              </label>
              <input
                id={`wl-${source}`}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder={cta.formPlaceholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-invalid={state === "error"}
                className={`min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-fg outline-none placeholder:text-fg-faint ${
                  size === "lg" ? "h-12" : "h-10"
                }`}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className={`btn btn-primary shrink-0 ${
                  size === "lg" ? "h-12 px-5 text-[15px]" : "h-10 px-4 text-[14px]"
                } disabled:opacity-70`}
              >
                {state === "loading" ? (
                  <Loader2 size={16} className="animate-spin" strokeWidth={2.4} />
                ) : (
                  <>
                    {cta.formButton}
                    <ArrowRight size={16} strokeWidth={2.3} />
                  </>
                )}
              </button>
            </div>

            <div className={`mt-3 ${centered ? "" : ""}`}>
              {state === "error" ? (
                <p
                  className="text-[13px] font-medium"
                  style={{ color: "var(--danger)" }}
                  role="alert"
                >
                  {message}
                </p>
              ) : (
                <p className="text-[13px] leading-relaxed text-fg-faint">
                  {cta.sub}
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Dugme koje ili vodi u aplikaciju ili skroluje do forme. */
export function CtaButton({
  size = "md",
  variant = "primary",
  label,
  className = "",
}: {
  size?: "lg" | "md";
  variant?: "primary" | "ghost";
  label?: string;
  className?: string;
}) {
  const href = ctaMode === "signup" ? signUpUrl : "#pristup";
  return (
    <a
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${
        size === "lg" ? "btn-lg" : "btn-md"
      } ${className}`}
    >
      {label ?? cta.labelShort}
      <ArrowRight size={size === "lg" ? 17 : 15} strokeWidth={2.2} />
    </a>
  );
}
