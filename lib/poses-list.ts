/**
 * Pure pose-filename list — no Node deps, safe for client bundles.
 * `lib/poses.ts` re-exports these and adds the server-side
 * pickPoseFilename / loadPoseDataUrl helpers (which pull in `node:fs`).
 */

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
