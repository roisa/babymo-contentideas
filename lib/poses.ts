/**
 * Server-side pose access. The pure picking logic lives in
 * `lib/poses-pure.ts` (also re-exported from here, so existing
 * imports keep working). This file only owns the file-IO loader.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { pickPoseFilename } from "./poses-pure";

export * from "./poses-pure";

const POSES_DIR = "baby-mo-poses";

// Module-scope cache so the same pose isn't re-read + re-base64'd per request.
const poseCache = new Map<string, string | null>();

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
