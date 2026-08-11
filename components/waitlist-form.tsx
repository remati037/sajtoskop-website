"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
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
            data-umami-event="cta-click"
            data-umami-event-source={source}
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
      track("waitlist-error", { source, reason: "invalid-email" });
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };

      if (res.ok && data.ok) {
        setState("success");
        track("waitlist-submitted", { source });
        return;
      }
      setState("error");
      setMessage(data.code === "duplicate" ? cta.errorDuplicate : cta.errorGeneric);
      track("waitlist-error", { source, reason: data.code ?? String(res.status) });
    } catch {
      setState("error");
      setMessage(cta.errorGeneric);
      track("waitlist-error", { source, reason: "network" });
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
            {/* Na telefonu: input sa sopstvenim okvirom + dugme pune širine ispod.
                Od sm naviše: jedna „pilula" u kojoj input nema svoj okvir. */}
            <div className="group flex w-full flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-2 sm:rounded-[14px] sm:border sm:border-border sm:bg-bg-elev sm:p-1.5 sm:shadow-[var(--shadow-card)] sm:transition-colors sm:duration-200 sm:focus-within:border-[var(--border-accent)]">
              <label htmlFor={`wl-${source}`} className="sr-only">
                Mejl adresa
              </label>
              <input
                id={`wl-${source}`}
                // Password manageri i autofill ekstenzije ubace svoje data-* atribute
                // u polje pre hidracije; bez ovoga React regeneriše celo stablo.
                suppressHydrationWarning
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
                // text-[16px] na telefonu — ispod 16px iOS Safari zumira pri fokusu.
                className={`h-12 w-full min-w-0 rounded-[12px] border border-border bg-bg-elev px-4 text-[16px] text-fg shadow-[var(--shadow-card)] outline-none transition-colors duration-200 placeholder:text-fg-faint focus:border-[var(--border-accent)] sm:flex-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-3.5 sm:text-[15px] sm:shadow-none ${
                  size === "lg" ? "sm:h-12" : "sm:h-10"
                }`}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className={`btn btn-primary h-12 w-full shrink-0 px-5 text-[15px] disabled:opacity-70 sm:w-auto ${
                  size === "lg" ? "sm:h-12 sm:px-5" : "sm:h-10 sm:px-4 sm:text-[14px]"
                }`}
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
  onClick,
  source = "unknown",
}: {
  size?: "lg" | "md";
  variant?: "primary" | "ghost";
  label?: string;
  className?: string;
  onClick?: () => void;
  /** Odakle je kliknuto — ista imena kao `waitlist.source`. */
  source?: string;
}) {
  const href = ctaMode === "signup" ? signUpUrl : "#pristup";
  return (
    <a
      href={href}
      onClick={onClick}
      data-umami-event="cta-click"
      data-umami-event-source={source}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${
        size === "lg" ? "btn-lg" : "btn-md"
      } ${className}`}
    >
      {label ?? cta.labelShort}
      <ArrowRight size={size === "lg" ? 17 : 15} strokeWidth={2.2} />
    </a>
  );
}
