/**
 * Scene presets for the Animator. Each preset is a recipe for how a
 * sequence of 1-3 Baby Mo poses + a title + a body card animate on
 * screen — meant to be screen-recorded as a TikTok / Reels clip.
 *
 * Timing is in milliseconds. Total loop = poses.length * poseHoldMs.
 * `transitionMs` is how long enter/exit animations take. Pick a hold
 * value comfortably larger than the transition so each pose actually
 * gets to be seen still.
 *
 * The actual CSS keyframes for `poseEnter`/`poseExit`/`cardAnim` etc.
 * live in animator.css — these are class-name references.
 */

export type SceneId = "slideshow" | "energetic" | "cozy" | "quiz" | "prayer" | "playful";

export interface Scene {
  id: SceneId;
  name: string;
  description: string;
  /** How long each pose holds before swapping. ms. */
  poseHoldMs: number;
  /** Enter/exit transition duration. ms. */
  transitionMs: number;
  /** CSS class on the entering pose. */
  poseEnter: string;
  /** CSS class on the exiting pose. */
  poseExit: string;
  /** CSS class on the body card (constant across the loop). */
  cardAnim: string;
  /** CSS class on the title sticker. */
  titleAnim: string;
  /** Background decoration motion. */
  decor: "spinning-stars" | "drifting-clouds" | "sparkle-burst" | "rising-hearts" | "none";
  /** Whether each beat can carry its own body text. */
  perBeatBody: boolean;
}

export const SCENES: Scene[] = [
  {
    id: "slideshow",
    name: "Slideshow",
    description: "Smooth slow crossfades. Default for carousels-as-reel.",
    poseHoldMs: 3800,
    transitionMs: 800,
    poseEnter: "anim-pose-zoom-fade-in",
    poseExit: "anim-pose-zoom-fade-out",
    cardAnim: "anim-card-rise",
    titleAnim: "anim-title-soft",
    decor: "drifting-clouds",
    perBeatBody: true,
  },
  {
    id: "energetic",
    name: "Energetic",
    description: "Bouncy pops, fast tempo. Best for quizzes & fun facts.",
    poseHoldMs: 2500,
    transitionMs: 450,
    poseEnter: "anim-pose-bounce-in",
    poseExit: "anim-pose-shrink-out",
    cardAnim: "anim-card-pop",
    titleAnim: "anim-title-sticker",
    decor: "spinning-stars",
    perBeatBody: true,
  },
  {
    id: "cozy",
    name: "Cozy",
    description: "Soft fades, slow tempo. Best for bedtime & reflections.",
    poseHoldMs: 4000,
    transitionMs: 700,
    poseEnter: "anim-pose-fade-up",
    poseExit: "anim-pose-fade-down",
    cardAnim: "anim-card-rise",
    titleAnim: "anim-title-soft",
    decor: "drifting-clouds",
    perBeatBody: true,
  },
  {
    id: "quiz",
    name: "Quiz reveal",
    description: "Hook → think → reveal. 3 poses recommended.",
    poseHoldMs: 3000,
    transitionMs: 500,
    poseEnter: "anim-pose-slide-in",
    poseExit: "anim-pose-slide-out",
    cardAnim: "anim-card-pop",
    titleAnim: "anim-title-type",
    decor: "sparkle-burst",
    perBeatBody: true,
  },
  {
    id: "prayer",
    name: "Prayer / dua",
    description: "Calm, reverent. Title stays, pose softly cycles.",
    poseHoldMs: 4500,
    transitionMs: 900,
    poseEnter: "anim-pose-fade",
    poseExit: "anim-pose-fade",
    cardAnim: "anim-card-rise",
    titleAnim: "anim-title-soft",
    decor: "none",
    perBeatBody: false,
  },
  {
    id: "playful",
    name: "Playful",
    description: "Wiggle + hop. Best for affirmations & happy moments.",
    poseHoldMs: 2200,
    transitionMs: 400,
    poseEnter: "anim-pose-hop-in",
    poseExit: "anim-pose-hop-out",
    cardAnim: "anim-card-pop",
    titleAnim: "anim-title-sticker",
    decor: "rising-hearts",
    perBeatBody: true,
  },
];

export function getScene(id: SceneId): Scene {
  return SCENES.find((s) => s.id === id) ?? SCENES[0];
}
