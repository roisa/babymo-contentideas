/**
 * Pure pose-picking logic — no Node imports, safe for client bundles.
 *
 * `lib/poses.ts` re-exports everything here AND adds `loadPoseDataUrl`
 * (which needs `node:fs`). Browser code imports from this file directly.
 */

import { ALL_POSES, ALL_NAMED_POSES } from "./poses-list";
export { ALL_POSES, ALL_NAMED_POSES };

export type SlideBeat = "hook" | "curiosity" | "reveal" | "faq" | "cta";

/**
 * 5-beat carousel track per category. Position [i] is the pose for
 * slide i in a 5-slide carousel (HOOK → CURIOSITY → REVEAL → FAQ → CTA).
 * Shorter carousels distribute beats, single posts use ICONIC_POSE.
 */
export const POSES_BY_CATEGORY: Record<string, string[]> = {
  // Daily Islamic — climbs to SUJUD on the CTA slide
  "daily-islamic": [
    "baby-mo-idea.png",          // 1. HOOK — "ada doa baru!"
    "baby-mo-pose-05.png",       // 2. CURIOSITY — hopeful clasped
    "baby-mo-thank-you.png",     // 3. REVEAL — hands in dua
    "baby-mo-pose-12.png",       // 4. FAQ — sit-dua reflective
    "baby-mo-pose-17.png",       // 5. CTA — SUJUD
  ],
  "emotional-childhood": [
    "baby-mo-alright.png",
    "baby-mo-pose-39.png",
    "baby-mo-pose-28.png",
    "baby-mo-pose-07.png",
    "baby-mo-pose-21.png",
  ],
  parenting: [
    "baby-mo-alright.png",
    "baby-mo-pose-22.png",
    "baby-mo-ok.png",
    "baby-mo-pose-15.png",
    "baby-mo-pose-25.png",
  ],
  "kids-educational": [
    "baby-mo-idea.png",
    "baby-mo-pose-22.png",
    "baby-mo-wow.png",
    "baby-mo-pose-08.png",
    "baby-mo-yes.png",
  ],
  interactive: [
    "baby-mo-idea.png",
    "baby-mo-pose-22.png",
    "baby-mo-yeyy.png",
    "baby-mo-pose-21.png",
    "baby-mo-pose-35.png",
  ],
  story: [
    "baby-mo-pose-11.png",
    "baby-mo-pose-06.png",
    "baby-mo-wow.png",
    "baby-mo-pose-12.png",
    "baby-mo-pose-21.png",
  ],
  reels: [
    "baby-mo-pose-29.png",
    "baby-mo-pose-32.png",
    "baby-mo-wow.png",
    "baby-mo-pose-42.png",
    "baby-mo-run.png",
  ],

  // Ramadan — arc moves from gentle anticipation → reverent dua → joyful celebration
  ramadan: [
    "baby-mo-pose-05.png",       // 1. HOOK — hopeful clasped, anticipating sahur/iftar
    "baby-mo-pose-12.png",       // 2. CURIOSITY — sit-dua reflective
    "baby-mo-thank-you.png",     // 3. REVEAL — hands in dua (the moment)
    "baby-mo-pose-17.png",       // 4. FAQ — SUJUD (Lailatul Qadr / Tarawih)
    "baby-mo-yeyy.png",          // 5. CTA — celebration (Eid joy)
  ],
};

/**
 * Iconic poses per category — used for single-slide posts. The FIRST
 * entry is the canonical iconic pose for the category; the rest are
 * mood-matched alternates that rotate through a batch.
 */
export const ICONIC_POSES: Record<string, string[]> = {
  "daily-islamic": ["baby-mo-thank-you.png", "baby-mo-pose-12.png", "baby-mo-pose-17.png"],
  "emotional-childhood": ["baby-mo-alright.png", "baby-mo-pose-07.png", "baby-mo-pose-28.png"],
  parenting: ["baby-mo-ok.png", "baby-mo-pose-21.png", "baby-mo-pose-25.png"],
  "kids-educational": ["baby-mo-idea.png", "baby-mo-pose-22.png", "baby-mo-wow.png"],
  interactive: ["baby-mo-yeyy.png", "baby-mo-pose-35.png", "baby-mo-pose-37.png"],
  story: ["baby-mo-pose-11.png", "baby-mo-pose-06.png", "baby-mo-pose-18.png"],
  reels: ["baby-mo-run.png", "baby-mo-pose-32.png", "baby-mo-pose-42.png"],
  ramadan: [
    "baby-mo-thank-you.png",     // praying hands (canonical for Ramadan)
    "baby-mo-pose-12.png",       // sit-dua reflective
    "baby-mo-pose-17.png",       // sujud
  ],
};

/** Back-compat: callers that just want the canonical iconic pose. */
export const ICONIC_POSE: Record<string, string> = Object.fromEntries(
  Object.entries(ICONIC_POSES).map(([k, v]) => [k, v[0]])
);

/**
 * Per-content-type overrides — when a specific content type has a
 * mood that differs from its parent category.
 */
export const CONTENT_TYPE_OVERRIDES: Record<string, string[]> = {
  "pov-muslim-childhood": [
    "baby-mo-pose-28.png", "baby-mo-pose-18.png", "baby-mo-pose-06.png", "baby-mo-pose-11.png", "baby-mo-pose-12.png",
  ],
  "soft-islamic-affirmations": [
    "baby-mo-pose-07.png", "baby-mo-pose-28.png", "baby-mo-thank-you.png", "baby-mo-alright.png", "baby-mo-pose-21.png",
  ],
  "five-second-habit": [
    "baby-mo-idea.png", "baby-mo-pose-08.png", "baby-mo-yes.png", "baby-mo-run.png", "baby-mo-pose-21.png",
  ],
  "cozy-islamic-reels": [
    "baby-mo-pose-06.png", "baby-mo-pose-28.png", "baby-mo-pose-11.png", "baby-mo-thank-you.png", "baby-mo-pose-12.png",
  ],
  "adab-hari-ini": [
    "baby-mo-pose-34.png", "baby-mo-pose-22.png", "baby-mo-pose-15.png", "baby-mo-pose-21.png", "baby-mo-pose-25.png",
  ],
  "kisah-nabi": [
    "baby-mo-pose-11.png", "baby-mo-pose-39.png", "baby-mo-wow.png", "baby-mo-pose-12.png", "baby-mo-thank-you.png",
  ],
  "pertanyaan-sahabat-mo": [
    "baby-mo-pose-22.png", "baby-mo-pose-23.png", "baby-mo-idea.png", "baby-mo-ok.png", "baby-mo-pose-21.png",
  ],
  "what-would-prophet-do": [
    "baby-mo-pose-22.png", "baby-mo-pose-27.png", "baby-mo-thank-you.png", "baby-mo-pose-15.png", "baby-mo-pose-25.png",
  ],
  "emotional-story-carousel": [
    "baby-mo-pose-39.png", "baby-mo-pose-38.png", "baby-mo-thank-you.png", "baby-mo-pose-28.png", "baby-mo-pose-21.png",
  ],
  "mama-reflection": ["baby-mo-pose-21.png", "baby-mo-pose-07.png", "baby-mo-thank-you.png"],

  /* ===== Ramadan ===== */
  // Sahur — quiet, sleepy-warm, building to readiness
  "ramadan-sahur": [
    "baby-mo-pose-06.png",       // sit cross-legged, calm
    "baby-mo-pose-12.png",       // sit-dua reflective
    "baby-mo-thank-you.png",     // praying hands (niat)
  ],
  // Iftar — anticipation → reveal → joy
  "ramadan-iftar": [
    "baby-mo-pose-05.png",       // hopeful clasped (waiting)
    "baby-mo-thank-you.png",     // dua before suap pertama
    "baby-mo-yeyy.png",          // joy of breaking fast
  ],
  // Tarawih — communal, building to sujud
  "ramadan-tarawih": [
    "baby-mo-pose-11.png",       // sit-wave (come pray)
    "baby-mo-pose-12.png",       // sit-dua
    "baby-mo-thank-you.png",     // standing prayer
    "baby-mo-pose-17.png",       // SUJUD
    "baby-mo-pose-21.png",       // gentle thumbs (CTA)
  ],
  // First Fast — full emotional arc (anxious → tired → triumphant)
  "ramadan-first-fast": [
    "baby-mo-pose-22.png",       // thinking-chin (worried)
    "baby-mo-pose-39.png",       // sad-down (hungry, struggling)
    "baby-mo-pose-05.png",       // hopeful clasped (counting down)
    "baby-mo-yeyy.png",          // celebration (made it!)
    "baby-mo-pose-21.png",       // gentle thumbs (CTA: support others)
  ],
  // Fun Facts — curious + wonder
  "ramadan-fun-facts": [
    "baby-mo-idea.png",          // pointing up (did you know!)
    "baby-mo-pose-22.png",       // thinking-chin
    "baby-mo-wow.png",           // WOW!
    "baby-mo-pose-08.png",       // present-pointing (explaining)
    "baby-mo-pose-35.png",       // peace signs (save & share)
  ],
  // Lailatul Qadr — reverent, building to praying hands + sujud
  "lailatul-qadr": [
    "baby-mo-pose-18.png",       // contemplative
    "baby-mo-pose-28.png",       // dreamy looking up (the night)
    "baby-mo-thank-you.png",     // praying hands (the doa)
    "baby-mo-pose-17.png",       // SUJUD (the moment)
    "baby-mo-pose-12.png",       // sit-dua (witir)
  ],
  // Eid Mubarak — full celebration arc
  "eid-mubarak": [
    "baby-mo-pose-11.png",       // sit-wave (greeting)
    "baby-mo-thank-you.png",     // takbir / praying
    "baby-mo-yeyy.png",          // CELEBRATE
    "baby-mo-pose-35.png",       // peace signs
    "baby-mo-pose-37.png",       // cheer fists
  ],
};

/** Used when a category isn't found (shouldn't happen). */
export const DEFAULT_POSE = "baby-mo-ok.png";

function pickIconicPose(categoryId: string, batchIndex: number): string {
  const alternates = ICONIC_POSES[categoryId];
  if (!alternates || alternates.length === 0) return DEFAULT_POSE;
  return alternates[batchIndex % alternates.length];
}

/**
 * Pick from a track, distributing beats sensibly for short carousels:
 *   2 slides → beats [hook, cta]
 *   3 slides → beats [hook, reveal, cta]
 *   4 slides → beats [hook, curiosity, reveal, cta]
 *   5+ slides → cycle through all beats
 */
function pickFromTrack(track: string[], slideIndex: number, total: number): string {
  if (total >= track.length) return track[slideIndex % track.length];
  const ratio = total > 1 ? slideIndex / (total - 1) : 0;
  const idx = Math.round(ratio * (track.length - 1));
  return track[idx] ?? track[0];
}

/**
 * Pick the right pose for a slide.
 *
 * @param categoryId    e.g. "daily-islamic"
 * @param contentTypeId e.g. "pov-muslim-childhood" — for type-specific overrides
 * @param slideIndex    0-based slide index
 * @param total         total slides in this content piece
 * @param batchIndex    position in the batch (variety across single-post batches)
 */
export function pickPoseFilename(
  categoryId: string,
  contentTypeId: string,
  slideIndex: number,
  total: number,
  batchIndex = 0
): string {
  if (total === 1) return pickIconicPose(categoryId, batchIndex);
  const overrideTrack = CONTENT_TYPE_OVERRIDES[contentTypeId];
  if (overrideTrack && overrideTrack.length > 0) {
    return pickFromTrack(overrideTrack, slideIndex, total);
  }
  const track = POSES_BY_CATEGORY[categoryId];
  if (track && track.length > 0) return pickFromTrack(track, slideIndex, total);
  return pickIconicPose(categoryId, batchIndex);
}

/** Derive every pose for a multi-slide piece in one go. */
export function pickPosesForContent(
  categoryId: string,
  contentTypeId: string,
  slideCount: number,
  batchIndex = 0
): string[] {
  return Array.from({ length: slideCount }, (_, i) =>
    pickPoseFilename(categoryId, contentTypeId, i, slideCount, batchIndex)
  );
}

/**
 * Pick poses for a *Reel* derived from a Library piece.
 *
 * Multi-slide content → one pose per slide (calls pickPosesForContent).
 *
 * Single-slide content (Daily Dua, Mama Reflection, etc.) → returns
 * 3 mood-matched poses from the category's ICONIC_POSES alternates,
 * so the reel becomes a multi-beat loop where the pose alternates
 * while the title/body/Arabic stay constant. Falls back to a tighter
 * content-type override track if one exists (e.g. soft-affirmations
 * wants gentle/shy poses, not the energetic iconic set).
 */
export function pickReelPosesFromContent(
  categoryId: string,
  contentTypeId: string,
  slideCount: number,
  batchIndex = 0
): string[] {
  if (slideCount > 1) {
    return pickPosesForContent(categoryId, contentTypeId, slideCount, batchIndex);
  }
  // Single-slide → expand into 3 alternates.
  const override = CONTENT_TYPE_OVERRIDES[contentTypeId];
  if (override && override.length >= 3) return override.slice(0, 3);
  const iconic = ICONIC_POSES[categoryId];
  if (iconic && iconic.length > 0) return iconic.slice(0, 3);
  return [DEFAULT_POSE];
}
