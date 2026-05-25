/**
 * Baby Mo character pose library — beat-aware mapping.
 *
 * After visually analysing all 50 poses, each pose is tagged with the
 * emotional moment it captures. Carousels follow a 5-beat narrative
 * (HOOK → CURIOSITY → REVEAL → FAQ → CTA), so each slide gets a pose
 * that matches its beat — not just rotates randomly through a list.
 *
 * Result: a 5-slide carousel reads like an actual story where Baby Mo
 * is reacting in real-time (curious on slide 1, thinking on slide 2,
 * wowed on slide 3, explaining on slide 4, celebrating on slide 5).
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

const POSES_DIR = "baby-mo-poses";

/**
 * Visual catalogue — what each pose actually shows.
 * Pose IDs reference the cleaned filenames in baby-mo-poses/.
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

/**
 * The 5-beat carousel arc:
 *   HOOK       (slide 1) — invite, curious, "look here"
 *   CURIOSITY  (slide 2) — set up, ask, "tebak..."
 *   REVEAL     (slide 3) — hadith/ayat/answer, the "aha!" moment
 *   FAQ        (slide 4) — "but what if..." / explain
 *   CTA        (slide 5) — celebrate, save, share
 */
export type SlideBeat = "hook" | "curiosity" | "reveal" | "faq" | "cta";

/**
 * Per-category pose track. Position [i] is the pose for slide i
 * (cycles via modulo for longer carousels). The ordering is the
 * 5-beat narrative arc: hook → curiosity → reveal → faq → cta.
 *
 * Each category gets a track that fits its tone:
 *   - daily-islamic ends with SUJUD (the prayer pose) for CTA
 *   - kids-educational uses idea → think → wow → explain → yes
 *   - interactive uses idea → think → yeyy → thumbs → peace
 *   - story uses sit-wave → sit-listen → wow → reflect → thumbs
 *   - reels stays kinetic throughout (run / walk / wave / strut)
 */
export const POSES_BY_CATEGORY: Record<string, string[]> = {
  // HOOK: idea (point up) → CURIOSITY: hopeful → REVEAL: thank-you (prayer)
  // → FAQ: sit-dua → CTA: sujud
  "daily-islamic": [
    "baby-mo-idea.png",          // 1. "Ada doa baru!"
    "baby-mo-pose-05.png",       // 2. Hopeful clasped — "siap?"
    "baby-mo-thank-you.png",     // 3. Hands in dua — the prayer
    "baby-mo-pose-12.png",       // 4. Sit-dua reflective
    "baby-mo-pose-17.png",       // 5. SUJUD — yuk sujud!
  ],

  // HOOK: alright wink → CURIOSITY: sad-sit → REVEAL: dreamy/relief
  // → FAQ: shy-blush comfort → CTA: gentle thumbs
  "emotional-childhood": [
    "baby-mo-alright.png",       // 1. "Mama, ada cerita..."
    "baby-mo-pose-39.png",       // 2. Sad-down — "pernah ngerasa...?"
    "baby-mo-pose-28.png",       // 3. Dreamy looking up — the comfort
    "baby-mo-pose-07.png",       // 4. Shy-blush — soft warmth
    "baby-mo-pose-21.png",       // 5. Gentle thumbs — "kamu bisa"
  ],

  // HOOK: alright → CURIOSITY: think → REVEAL: ok/firm → FAQ: present
  // → CTA: confident-wink
  parenting: [
    "baby-mo-alright.png",       // 1. "Ma, baca dulu..."
    "baby-mo-pose-22.png",       // 2. Thinking-chin
    "baby-mo-ok.png",            // 3. Firm OK — the principle
    "baby-mo-pose-15.png",       // 4. Presenting — "begini caranya"
    "baby-mo-pose-25.png",       // 5. Confident-wink — "kamu bisa, Ma"
  ],

  // HOOK: idea (point) → CURIOSITY: think → REVEAL: wow → FAQ: explain
  // → CTA: yes
  "kids-educational": [
    "baby-mo-idea.png",          // 1. "Tahukah kamu?" 👆
    "baby-mo-pose-22.png",       // 2. Thinking-chin — "tebak..."
    "baby-mo-wow.png",           // 3. WOW — the reveal
    "baby-mo-pose-08.png",       // 4. Present-pointing explain
    "baby-mo-yes.png",           // 5. Yes — "save & coba!"
  ],

  // HOOK: idea → CURIOSITY: think → REVEAL: yeyy celebration
  // → FAQ: thumbs → CTA: peace (comment)
  interactive: [
    "baby-mo-idea.png",          // 1. "Quiz time!"
    "baby-mo-pose-22.png",       // 2. Thinking — "pilih mana?"
    "baby-mo-yeyy.png",          // 3. CELEBRATE — answer reveal
    "baby-mo-pose-21.png",       // 4. Thumbs-up explain
    "baby-mo-pose-35.png",       // 5. Peace signs — "komen ya!"
  ],

  // HOOK: sit-wave → CURIOSITY: sit-listen → REVEAL: wow → FAQ: reflect
  // → CTA: thumbs
  story: [
    "baby-mo-pose-11.png",       // 1. Sit-wave — "ayo dengar"
    "baby-mo-pose-06.png",       // 2. Sit cross-legged listening
    "baby-mo-wow.png",           // 3. Wow — twist moment
    "baby-mo-pose-12.png",       // 4. Sit-dua reflecting
    "baby-mo-pose-21.png",       // 5. Thumbs — "save buat bedtime"
  ],

  // Kinetic throughout — reels are short, dynamic, multi-shot
  reels: [
    "baby-mo-pose-29.png",       // 1. Shh-secret — "POV: ..."
    "baby-mo-pose-32.png",       // 2. Wave-walk
    "baby-mo-wow.png",           // 3. Wow moment
    "baby-mo-pose-42.png",       // 4. Walking-step
    "baby-mo-run.png",           // 5. Run — action close
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
