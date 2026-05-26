/**
 * Baby Mo character pose library — beat-aware mapping.
 *
 * After visually analysing all 50 poses, each pose is tagged with the
 * emotional moment it captures. Carousels follow a 5-beat narrative
 * (HOOK → CURIOSITY → REVEAL → FAQ → CTA), so each slide gets a pose
 * that matches its beat — not just rotates randomly through a list.
 *
 * Layered selection:
 *   1) CONTENT_TYPE_OVERRIDES — specific content types (POV reels,
 *      Soft Affirmations, etc.) get their own tracks
 *   2) ICONIC_POSE — single-slide posts (Daily Dua, Mama Reflection)
 *      always use the most iconic pose for the category
 *   3) Distributed beats — 2-4 slide carousels pick representative
 *      beats from the 5-beat track (always HOOK and CTA at minimum)
 *   4) Full 5-beat track — 5+ slide carousels cycle through
 *      POSES_BY_CATEGORY in narrative order
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const POSES_DIR = "baby-mo-poses";

/**
 * Visual catalogue — what each pose actually shows.
 *
 *  NAMED (semantic tags)
 *    alright       — wink + finger-gun, confident-playful
 *    idea          — finger pointing UP, "tahukah kamu" energy
 *    ok            — OK hand gesture, calm-affirming
 *    run           — running, dynamic action
 *    thank-you     — hands clasped + eyes closed, PRAYER pose
 *    wow           — hands at cheeks surprised, AMAZED
 *    yes           — fist raised, energetic affirm
 *    yeyy          — arms wide celebrating, CTA energy
 *
 *  NUMBERED (variety pool)
 *    01 wink+wave (greeting)         22 thinking-chin (standing think)
 *    02 sit+fist-up (sit-celebrate)  23 kneel+shrug (confused/worried)
 *    03 walk+hand-on-mouth (curious) 24 stop-hand (no/stop)
 *    04 lean-eager                   25 confident-wink+thumbs
 *    05 hopeful-clasped (please)     26 wow-cheeks (amazed)
 *    06 sit cross-legged calm        27 angry-stance fists
 *    07 shy-blush (hands on face)    28 dreamy (arms behind head)
 *    08 present-pointing dynamic     29 shh-secret (wink+finger)
 *    09 laughing (eyes closed)       30 strut-wink cool
 *    10 pout-sit (sad cute)          31 shock-hands (surprised)
 *    11 sit+waving                   32 wave-walk
 *    12 sit-dua (hands together)     33 shrug-confused-stand
 *    13 sit+waving-high              34 bow-greeting
 *    14 standing-think (finger)      35 peace-signs (both hands)
 *    15 present-tada                 36 quiet-shock (finger to mouth)
 *    16 wink-cute (finger near face) 37 cheer-fists clenched
 *    17 SUJUD (prostration!)         38 sad-back (alone)
 *    18 sit-stare (contemplative)    39 sad-down (eyes closed)
 *    19 book-on-head (focus)         40 angry-action (running mad)
 *    20 arms-wide-kneel              41 arms-wide-happy
 *    21 thumbs-up (calm)             42 walking-step
 */

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

  // Emotional childhood — full arc: warm → sad → comfort → warmth → hope
  "emotional-childhood": [
    "baby-mo-alright.png",       // 1. HOOK — soft wink
    "baby-mo-pose-39.png",       // 2. CURIOSITY — sad-down
    "baby-mo-pose-28.png",       // 3. REVEAL — dreamy looking up
    "baby-mo-pose-07.png",       // 4. FAQ — shy-blush warmth
    "baby-mo-pose-21.png",       // 5. CTA — gentle thumbs
  ],

  // Parenting — thinking through to confident
  parenting: [
    "baby-mo-alright.png",       // 1. HOOK — "ma, baca dulu"
    "baby-mo-pose-22.png",       // 2. CURIOSITY — thinking-chin
    "baby-mo-ok.png",            // 3. REVEAL — firm OK
    "baby-mo-pose-15.png",       // 4. FAQ — presenting "begini caranya"
    "baby-mo-pose-25.png",       // 5. CTA — confident-wink "kamu bisa"
  ],

  // Kids educational — classic quiz format: idea → think → WOW → explain → yes
  "kids-educational": [
    "baby-mo-idea.png",          // 1. HOOK — pointing up
    "baby-mo-pose-22.png",       // 2. CURIOSITY — thinking-chin
    "baby-mo-wow.png",           // 3. REVEAL — WOW!
    "baby-mo-pose-08.png",       // 4. FAQ — present-pointing
    "baby-mo-yes.png",           // 5. CTA — yes (fist)
  ],

  // Interactive (quiz/game) — energetic celebration arc
  interactive: [
    "baby-mo-idea.png",          // 1. HOOK — "quiz time!"
    "baby-mo-pose-22.png",       // 2. CURIOSITY — "pilih mana?"
    "baby-mo-yeyy.png",          // 3. REVEAL — CELEBRATE
    "baby-mo-pose-21.png",       // 4. FAQ — thumbs-up
    "baby-mo-pose-35.png",       // 5. CTA — peace-signs (komen!)
  ],

  // Story — listening pose throughout, building to thumbs save
  story: [
    "baby-mo-pose-11.png",       // 1. HOOK — sit-wave "ayo dengar"
    "baby-mo-pose-06.png",       // 2. CURIOSITY — sit-cross-legged
    "baby-mo-wow.png",           // 3. REVEAL — story climax
    "baby-mo-pose-12.png",       // 4. FAQ — sit-dua reflecting
    "baby-mo-pose-21.png",       // 5. CTA — thumbs "save"
  ],

  // Reels — kinetic throughout
  reels: [
    "baby-mo-pose-29.png",       // 1. HOOK — shh-secret
    "baby-mo-pose-32.png",       // 2. CURIOSITY — wave-walk
    "baby-mo-wow.png",           // 3. REVEAL — wow
    "baby-mo-pose-42.png",       // 4. FAQ — walking-step
    "baby-mo-run.png",           // 5. CTA — RUN
  ],
};

/**
 * Iconic poses per category — used for single-slide posts. The FIRST
 * entry is the canonical iconic pose for the category; the rest are
 * mood-matched alternates that rotate through a batch so 10 Daily Dua
 * singles don't all look identical. See pickIconicPose() for rotation.
 */
export const ICONIC_POSES: Record<string, string[]> = {
  "daily-islamic": [
    "baby-mo-thank-you.png",     // prayer hands (canonical)
    "baby-mo-pose-12.png",       // sit-dua reflective
    "baby-mo-pose-17.png",       // sujud prostration
  ],
  "emotional-childhood": [
    "baby-mo-alright.png",       // warm wink (canonical)
    "baby-mo-pose-07.png",       // shy-blush warmth
    "baby-mo-pose-28.png",       // dreamy looking up
  ],
  parenting: [
    "baby-mo-ok.png",            // calm firm (canonical)
    "baby-mo-pose-21.png",       // gentle thumbs
    "baby-mo-pose-25.png",       // confident wink
  ],
  "kids-educational": [
    "baby-mo-idea.png",          // pointing up (canonical)
    "baby-mo-pose-22.png",       // thinking-chin
    "baby-mo-wow.png",           // amazed cheeks
  ],
  interactive: [
    "baby-mo-yeyy.png",          // celebrating (canonical)
    "baby-mo-pose-35.png",       // peace signs
    "baby-mo-pose-37.png",       // cheer fists
  ],
  story: [
    "baby-mo-pose-11.png",       // sit-wave inviting (canonical)
    "baby-mo-pose-06.png",       // sit cross-legged calm
    "baby-mo-pose-18.png",       // contemplative
  ],
  reels: [
    "baby-mo-run.png",           // dynamic action (canonical)
    "baby-mo-pose-32.png",       // wave-walk
    "baby-mo-pose-42.png",       // walking step
  ],
};

/** Back-compat: callers that just want the canonical iconic pose. */
export const ICONIC_POSE: Record<string, string> = Object.fromEntries(
  Object.entries(ICONIC_POSES).map(([k, v]) => [k, v[0]])
);

/**
 * Pick an iconic pose for a single-slide post, rotating across a batch.
 * `batchIndex` is the index of this content within the current generation
 * batch — passed through from /api/generate. Different batch positions
 * land on different alternates so the team's grid feels alive instead
 * of cloned. Falls back to the canonical pose when categoryId is missing.
 */
function pickIconicPose(categoryId: string, batchIndex: number): string {
  const alternates = ICONIC_POSES[categoryId];
  if (!alternates || alternates.length === 0) return DEFAULT_POSE;
  return alternates[batchIndex % alternates.length];
}

/**
 * Per-content-type overrides — when a specific content type has a
 * mood that differs from its parent category. The picker checks
 * here first, then falls back to category track.
 *
 * The most common case is reels variants — Soft Affirmations should
 * be gentle, not kinetic; POV Childhood should be dreamy/nostalgic;
 * 5-Second Habit should be action.
 */
export const CONTENT_TYPE_OVERRIDES: Record<string, string[]> = {
  // POV reels — dreamy, intimate, nostalgic
  "pov-muslim-childhood": [
    "baby-mo-pose-28.png",       // dreamy looking up
    "baby-mo-pose-18.png",       // contemplative sitting
    "baby-mo-pose-06.png",       // sit-calm
    "baby-mo-pose-11.png",       // sit-wave
    "baby-mo-pose-12.png",       // sit-dua
  ],
  // Soft affirmations — gentle, shy, warm
  "soft-islamic-affirmations": [
    "baby-mo-pose-07.png",       // shy-blush
    "baby-mo-pose-28.png",       // dreamy
    "baby-mo-thank-you.png",     // praying hands
    "baby-mo-alright.png",       // gentle wink
    "baby-mo-pose-21.png",       // thumbs gentle
  ],
  // 5-second habit — punchy action
  "five-second-habit": [
    "baby-mo-idea.png",          // hook with idea
    "baby-mo-pose-08.png",       // present-pointing
    "baby-mo-yes.png",           // yes fist
    "baby-mo-run.png",           // run action
    "baby-mo-pose-21.png",       // thumbs save
  ],
  // Cozy reels — calm, sit-back, warm
  "cozy-islamic-reels": [
    "baby-mo-pose-06.png",       // sit-calm
    "baby-mo-pose-28.png",       // dreamy
    "baby-mo-pose-11.png",       // sit-wave
    "baby-mo-thank-you.png",     // praying hands
    "baby-mo-pose-12.png",       // sit-dua
  ],
  // Adab Hari Ini — specific, instructive, bowing/greeting
  "adab-hari-ini": [
    "baby-mo-pose-34.png",       // bow-greeting (HOOK — "salam dulu")
    "baby-mo-pose-22.png",       // thinking
    "baby-mo-pose-15.png",       // present-tada (REVEAL)
    "baby-mo-pose-21.png",       // thumbs-up (FAQ)
    "baby-mo-pose-25.png",       // confident-wink (CTA)
  ],
  // Kisah Nabi — proper story arc, ends with prayer
  "kisah-nabi": [
    "baby-mo-pose-11.png",       // sit-wave "ayo dengar"
    "baby-mo-pose-39.png",       // sad-down (act 2 — conflict)
    "baby-mo-wow.png",           // wow (act 3 — turn)
    "baby-mo-pose-12.png",       // sit-dua (reflection)
    "baby-mo-thank-you.png",     // praying hands (CTA)
  ],
  // Pertanyaan Sahabat Mo — kid Q&A, thinking dominant
  "pertanyaan-sahabat-mo": [
    "baby-mo-pose-22.png",       // thinking-chin (the question)
    "baby-mo-pose-23.png",       // shrug confused
    "baby-mo-idea.png",          // idea (the answer)
    "baby-mo-ok.png",            // ok (explained)
    "baby-mo-pose-21.png",       // thumbs-up
  ],
  // What Would Rasulullah Do — comparing scenarios
  "what-would-prophet-do": [
    "baby-mo-pose-22.png",       // thinking
    "baby-mo-pose-27.png",       // angry (reaction we DON'T want)
    "baby-mo-thank-you.png",     // praying (the prophetic way)
    "baby-mo-pose-15.png",       // presenting
    "baby-mo-pose-25.png",       // confident
  ],
  // Emotional story — emotional journey ending with hope
  "emotional-story-carousel": [
    "baby-mo-pose-39.png",       // sad-down (set the scene)
    "baby-mo-pose-38.png",       // sad-back (alone moment)
    "baby-mo-thank-you.png",     // prayer (the turn)
    "baby-mo-pose-28.png",       // dreamy relief
    "baby-mo-pose-21.png",       // gentle thumbs (CTA)
  ],
  // Mama Reflection — single posts mostly, but if carousel: comfort arc
  "mama-reflection": [
    "baby-mo-pose-21.png",       // gentle thumbs (single iconic)
    "baby-mo-pose-07.png",
    "baby-mo-thank-you.png",
  ],
};

/** Used when a category isn't found (shouldn't happen). */
export const DEFAULT_POSE = "baby-mo-ok.png";

// Module-scope cache so the same pose isn't re-read + re-base64'd per request.
const poseCache = new Map<string, string | null>();

/**
 * Pick the right pose for a slide.
 *
 * @param categoryId      e.g. "daily-islamic"
 * @param contentTypeId   e.g. "pov-muslim-childhood" — used for type-specific overrides
 * @param slideIndex      0-based slide index
 * @param total           total slides in this content piece
 * @param batchIndex      position in the current generation batch (for variety
 *                        across single-post batches). Defaults to 0.
 */
export function pickPoseFilename(
  categoryId: string,
  contentTypeId: string,
  slideIndex: number,
  total: number,
  batchIndex = 0
): string {
  // 1) Single-slide posts rotate through iconic alternates per batch position
  if (total === 1) {
    return pickIconicPose(categoryId, batchIndex);
  }

  // 2) Per-content-type overrides take precedence
  const overrideTrack = CONTENT_TYPE_OVERRIDES[contentTypeId];
  if (overrideTrack && overrideTrack.length > 0) {
    return pickFromTrack(overrideTrack, slideIndex, total);
  }

  // 3) Category track
  const track = POSES_BY_CATEGORY[categoryId];
  if (track && track.length > 0) {
    return pickFromTrack(track, slideIndex, total);
  }

  return pickIconicPose(categoryId, batchIndex);
}

/**
 * Pick from a track, distributing beats sensibly for short carousels:
 *   2 slides → beats [hook, cta]                  = track[0], track[4]
 *   3 slides → beats [hook, reveal, cta]          = track[0], track[2], track[4]
 *   4 slides → beats [hook, curiosity, reveal, cta] = track[0..2], track[4]
 *   5+ slides → cycle through all beats           = track[i % len]
 */
function pickFromTrack(track: string[], slideIndex: number, total: number): string {
  if (total >= track.length) {
    return track[slideIndex % track.length];
  }
  // Distribute slideIndex proportionally across the track.
  // Ensures slide 0 = track[0] (HOOK) and slide (total-1) = track[track.length-1] (CTA)
  const ratio = total > 1 ? slideIndex / (total - 1) : 0;
  const idx = Math.round(ratio * (track.length - 1));
  return track[idx] ?? track[0];
}

export async function loadPoseDataUrl(
  categoryId: string,
  contentTypeId: string,
  slideIndex: number,
  total: number,
  batchIndex = 0
): Promise<string | null> {
  const filename = pickPoseFilename(categoryId, contentTypeId, slideIndex, total, batchIndex);
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

/* ---------- All pose filenames (for future "pick a specific pose" UI) ---------- */

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
const ALL_EXTRAS = Array.from({ length: 42 }, (_, i) => `baby-mo-pose-${String(i + 1).padStart(2, "0")}.png`);
export const ALL_POSES = [...ALL_NAMED_POSES, ...ALL_EXTRAS];
