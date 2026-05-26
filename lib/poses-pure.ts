/**
 * Pure pose-picking logic — no Node imports, safe for client bundles.
 *
 * `lib/poses.ts` re-exports everything here AND adds `loadPoseDataUrl`
 * (which needs `node:fs`). Browser code imports from this file directly.
 *
 * All pose+category data is declared in `lib/content-types.ts` (CATEGORIES
 * with inline `categoryPoseTrack`, `iconicPoses`, and per-type `poseTrack`).
 * The constants below are derived from that single source.
 */

import {
  CATEGORIES,
  POSES_BY_CATEGORY,
  ICONIC_POSES,
  CONTENT_TYPE_POSE_OVERRIDES as CONTENT_TYPE_OVERRIDES,
} from "./content-types";

export { POSES_BY_CATEGORY, ICONIC_POSES, CONTENT_TYPE_OVERRIDES };

/* ---------- Visual catalogue (50 poses — names + numbered extras) ---------- */

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

const ALL_EXTRAS = Array.from(
  { length: 42 },
  (_, i) => `baby-mo-pose-${String(i + 1).padStart(2, "0")}.png`
);

export const ALL_POSES = [...ALL_NAMED_POSES, ...ALL_EXTRAS];

export type SlideBeat = "hook" | "curiosity" | "reveal" | "faq" | "cta";

/* ---------- Picker helpers ---------- */

/** Back-compat: callers that just want the canonical iconic pose. */
export const ICONIC_POSE: Record<string, string> = Object.fromEntries(
  Object.entries(ICONIC_POSES).map(([k, v]) => [k, v[0]])
);

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
 * Multi-slide content → one pose per slide.
 * Single-slide content → 3 mood-matched poses from the category's
 * ICONIC_POSES alternates (or content-type override if one exists),
 * so the reel becomes a multi-beat loop where the pose alternates
 * while the title/body/Arabic stay constant.
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
  const override = CONTENT_TYPE_OVERRIDES[contentTypeId];
  if (override && override.length >= 3) return override.slice(0, 3);
  const iconic = ICONIC_POSES[categoryId];
  if (iconic && iconic.length > 0) return iconic.slice(0, 3);
  return [DEFAULT_POSE];
}

// Silence the "imported but unused" warning if a future cleanup drops
// the CATEGORIES re-export above without using it locally.
export { CATEGORIES };
