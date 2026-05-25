/**
 * Baby Mo character pose library.
 *
 * Two pose sources live in `baby-mo-poses/`:
 *   - The 8 *named* poses (alright, idea, ok, run, thank-you, wow, yes, yeyy)
 *     map to specific emotions. Use them as the PRIMARY pose for each
 *     category so the visual matches the message.
 *   - 42 *numbered* poses (baby-mo-pose-01..42) are variations of the
 *     same gentle Baby Mo energy — sitting, peeking, leaning, etc.
 *     They round out the pool so carousels of the same category don't
 *     reuse the same image.
 *
 * All PNGs are 800×800 (optimised from 2000×2000, ~50 KB each).
 *
 * Pick is deterministic by slide index so re-generating the same
 * content gives the same poses — predictable for the team.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const POSES_DIR = "baby-mo-poses";

const ALL_EXTRAS = Array.from({ length: 42 }, (_, i) => `baby-mo-pose-${String(i + 1).padStart(2, "0")}.png`);

/**
 * For each category: a primary pose (always the first pick) plus a list
 * of extras drawn from the Lintang pool for variety on slides 2+.
 *
 * Extras for each category were chosen by browsing the pool — anything
 * gentle/curious fits most categories. Specific energetic poses are
 * biased toward `interactive` and `reels`.
 */
export const POSES_BY_CATEGORY: Record<string, string[]> = {
  // Hands clasped in prayer — the dua pose
  "daily-islamic": [
    "baby-mo-thank-you.png",
    "baby-mo-pose-05.png", // hands clasped at chest, hopeful
    "baby-mo-pose-12.png",
    "baby-mo-pose-30.png",
  ],

  // Soft, intimate, gentle — heart talks, bedtime, nostalgia
  "emotional-childhood": [
    "baby-mo-alright.png",
    "baby-mo-pose-06.png", // sitting cross-legged
    "baby-mo-pose-07.png", // hands on cheeks shy
    "baby-mo-pose-17.png",
    "baby-mo-pose-38.png",
    "baby-mo-thank-you.png",
  ],

  // Friendly, warm — for/about parents
  parenting: [
    "baby-mo-alright.png",
    "baby-mo-ok.png",
    "baby-mo-pose-01.png", // winking wave
    "baby-mo-pose-04.png", // bending forward eager
    "baby-mo-pose-15.png",
  ],

  // Curious, learning — finger pointing up + wow + variety
  "kids-educational": [
    "baby-mo-idea.png",
    "baby-mo-wow.png",
    "baby-mo-pose-03.png", // walking + hand on mouth, curious
    "baby-mo-pose-19.png",
    "baby-mo-pose-22.png",
    "baby-mo-pose-32.png",
  ],

  // Energetic, playful, quiz/CTA
  interactive: [
    "baby-mo-yes.png",
    "baby-mo-yeyy.png",
    "baby-mo-idea.png",
    "baby-mo-pose-02.png", // sitting + cheering
    "baby-mo-pose-09.png",
    "baby-mo-pose-25.png",
  ],

  // Wide-eyed listening for stories
  story: [
    "baby-mo-wow.png",
    "baby-mo-idea.png",
    "baby-mo-pose-06.png",
    "baby-mo-pose-11.png",
    "baby-mo-pose-20.png",
    "baby-mo-pose-34.png",
  ],

  // Vertical reels — dynamic / motion
  reels: [
    "baby-mo-run.png",
    "baby-mo-yeyy.png",
    "baby-mo-yes.png",
    "baby-mo-pose-08.png",
    "baby-mo-pose-26.png",
    "baby-mo-pose-29.png",
  ],
};

/** Used when a category isn't found (shouldn't happen). */
export const DEFAULT_POSE = "baby-mo-ok.png";

// Module-scope cache so the same pose isn't re-read + re-base64'd per request.
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

/** Convenience for any future "pick a random pose from anywhere" UX. */
export const ALL_NAMED_POSES = [
  "baby-mo-alright.png",
  "baby-mo-idea.png",
  "baby-mo-ok.png",
  "baby-mo-run.png",
  "baby-mo-thank-you.png",
  "baby-mo-wow.png",
  "baby-mo-yes.png",
  "baby-mo-yeyy.png",
];
export const ALL_POSES = [...ALL_NAMED_POSES, ...ALL_EXTRAS];
