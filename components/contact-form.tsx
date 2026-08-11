"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Send } from "lucide-react";

type State = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const TOPICS = [
  "Hoću u betu",
  "Pitanje o alatu",
  "Moja firma je u bazi, ukloni je",
  "Nešto ne radi",
  "Drugo",
] as const;

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? ""); // honeypot

    if (!name || name.length < 2) {
      setState("error");
      setError("Napiši kako da ti se obratim.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setState("error");
      setError("Ovo ne liči na ispravnu mejl adresu.");
      return;
    }
    if (message.length < 10) {
      setState("error");
      setError("Napiši bar rečenicu — teško mi je da odgovorim na tri slova.");
      return;
    }

    setState("loading");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, company }),
      });
      if (res.ok) {
        setState("success");
        form.reset();
        return;
      }
      setState("error");
      setError("Nešto je puklo na mojoj strani. Piši mi direktno na mejl iz podnožja.");
    } catch {
      setState("error");
      setError("Nešto je puklo na mojoj strani. Piši mi direktno na mejl iz podnožja.");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === "success" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass p-7"
          role="status"
          aria-live="polite"
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-full"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            <Check size={18} strokeWidth={3} />
          </span>
          <h2 className="h2 mt-4 text-[1.05rem]">Stiglo je.</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
            Odgovaram lično, obično isti dan, najkasnije za dva. Ako ti je hitno, javi se i na
            Instagramu.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          className="card-glass flex flex-col gap-5 p-6 sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ime" htmlFor="name">
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Marko"
                className="h-11 w-full rounded-[10px] border border-border bg-bg px-3.5 text-[14.5px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-[var(--border-accent)]"
              />
            </Field>
            <Field label="Mejl" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tvoj@mejl.com"
                className="h-11 w-full rounded-[10px] border border-border bg-bg px-3.5 text-[14.5px] text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-[var(--border-accent)]"
              />
            </Field>
          </div>

          <Field label="O čemu se radi" htmlFor="topic">
            <select
              id="topic"
              name="topic"
              defaultValue={TOPICS[0]}
              className="h-11 w-full appearance-none rounded-[10px] border border-border bg-bg px-3.5 text-[14.5px] text-fg outline-none transition-colors focus:border-[var(--border-accent)]"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Poruka" htmlFor="message">
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Piši slobodno."
              className="w-full resize-y rounded-[10px] border border-border bg-bg p-3.5 text-[14.5px] leading-relaxed text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-[var(--border-accent)]"
            />
          </Field>

          {/* honeypot — ljudi ga ne vide, botovi ga popune */}
          <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="company">Firma</label>
            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
          </div>

          {state === "error" && (
            <p className="text-[13px] font-medium" style={{ color: "var(--danger)" }} role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={state === "loading"}
            className="btn btn-primary btn-lg self-start disabled:opacity-70"
          >
            {state === "loading" ? (
              <Loader2 size={16} className="animate-spin" strokeWidth={2.4} />
            ) : (
              <>
                Pošalji poruku
                <Send size={15} strokeWidth={2.2} />
              </>
            )}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="eyebrow">
        {label}
      </label>
      {children}
    </div>
  );
}
