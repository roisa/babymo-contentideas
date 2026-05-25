/**
 * Baby Mo character pose library — maps content categories to the
 * matching 3D pose PNG. Poses live in `baby-mo-poses/` at the repo
 * root (user-owned naming preserved).
 *
 * Per category we have an array of valid poses; the studio picks
 * deterministically from the slide index so a multi-slide carousel
 * shows variety without random shuffle on each render.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const POSES_DIR = "baby-mo-poses";

/** "Baby Mo · 3D pose" filenames (the named set from the user's upload). */
export const POSES_BY_CATEGORY: Record<string, string[]> = {
  // Hands clasped in prayer — the dua pose
  "daily-islamic": ["20260429_Baby Mo_Thank You.png"],

  // Soft, gentle, intimate — heart talks, bedtime, nostalgia
  "emotional-childhood": [
    "20260429_Baby Mo_Alright.png",
    "20260429_Baby Mo_Ok.png",
    "20260429_Baby Mo_Thank You.png",
  ],

  // Friendly, warm, validating — for/about parents
  parenting: ["20260429_Baby Mo_Alright.png", "20260429_Baby Mo_Ok.png"],

  // Curious, learning — finger pointing up + wow surprise
  "kids-educational": [
    "20260429_Baby Mo_Idea.png",
    "20260429_Baby Mo_Wow.png",
    "20260429_Baby Mo_Idea.png", // bias toward Idea for "did you know" energy
  ],

  // Energetic, playful, quiz/CTA
  interactive: [
    "20260429_Baby Mo_Yes.png",
    "20260429_Baby Mo_Yeyy.png",
    "20260429_Baby Mo_Idea.png",
  ],

  // Wide-eyed listening for stories
  story: ["20260429_Baby Mo_Wow.png", "20260429_Baby Mo_Idea.png"],

  // Vertical reels — dynamic / motion
  reels: [
    "20260429_Baby Mo_Run.png",
    "20260429_Baby Mo_Yeyy.png",
    "20260429_Baby Mo_Yes.png",
  ],
};

export const DEFAULT_POSE = "20260429_Baby Mo_Ok.png";

// In-memory cache: filename → base64 data URL
const poseCache = new Map<string, string | null>();

export function pickPoseFilename(categoryId: string, slideIndex: number): string {
  const list = POSES_BY_CATEGORY[categoryId];
  if (list && list.length > 0) {
    return list[slideIndex % list.length];
  }
  return DEFAULT_POSE;
}

export async function loadPoseDataUrl(categoryId: string, slideIndex: number): Promise<string | null> {
  const filename = pickPoseFilename(categoryId, slideIndex);
  if (poseCache.has(filename)) return poseCache.get(filename) ?? null;
  try {
    const buf = await readFile(path.join(process.cwd(), POSES_DIR, filename));
    const dataUrl = `data:image/png;base64,${buf.toString("base64")}`;
    poseCache.set(filename, dataUrl);
    return dataUrl;
  } catch {
    poseCache.set(filename, null);
    return null;
  }
}
