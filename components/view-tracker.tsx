"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Javi Umamiju da je posetilac stigao dovde. Šalje se najviše jednom po
 * učitavanju stranice — zanima nas dokle su stigli, ne koliko su puta skrolovali
 * gore-dole. Nekoliko ovakvih markera kroz stranicu daje levak dubine skrola.
 */
export function ViewTracker({ event }: { event: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const sent = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || sent.current) return;
        sent.current = true;
        track(event);
        observer.disconnect();
      },
      { threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);

  return <span ref={ref} aria-hidden className="block h-px w-full" />;
}
