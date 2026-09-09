/**
 * 1080 × 1080 za Instagram feed i LinkedIn objavu.
 * Nije deo meta tagova — otvoriš /social/kvadrat i sačuvaš sliku.
 */
import { ImageResponse } from "next/og";
import { loadFonts, SQUARE_SIZE, SquareCard } from "@/lib/og";

export async function GET() {
  return new ImageResponse(<SquareCard />, { ...SQUARE_SIZE, fonts: await loadFonts() });
}
