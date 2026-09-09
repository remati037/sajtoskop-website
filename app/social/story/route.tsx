/**
 * 1080 × 1920 za Instagram story.
 * Nije deo meta tagova — otvoriš /social/story i sačuvaš sliku.
 */
import { ImageResponse } from "next/og";
import { loadFonts, STORY_SIZE, StoryCard } from "@/lib/og";

export async function GET() {
  return new ImageResponse(<StoryCard />, { ...STORY_SIZE, fonts: await loadFonts() });
}
