"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Ne renderuje ništa — samo upamti odakle je posetilac došao, pri prvom
 * učitavanju bilo koje stranice. Stoji u layout-u da pokrije i /kontakt ulaz.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
