import { ImageResponse } from "next/og";
import { LandscapeCard, loadFonts, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Sajtoskop, prestani da guglaš klijente. Spisak je gotov za 4 minuta.";

export default async function Image() {
  return new ImageResponse(<LandscapeCard />, { ...size, fonts: await loadFonts() });
}
