/**
 * Read pre-rendered Arabic PNGs from public/arabic-cache/ at server-side
 * render time. The PNGs are generated locally by
 * scripts/pregenerate-arabic.ts (where Resvg + harfbuzz work correctly)
 * and committed to the repo. This bypasses Vercel's broken Arabic
 * shaper at request time.
 *
 * Lookup is by content's `attribution` field (e.g. "QS. Al-Inshirah:
 * 5-6"). The slug is normalized so "(QS. Al-Inshirah: 5-6)" and
 * "QS. Al-Inshirah: 5-6" map to the same file.
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { findLookupKey } from "./arabic-lookup";

const CACHE_DIR = path.join(process.cwd(), "public", "arabic-cache");

/** Must match slugAttribution in scripts/pregenerate-arabic.ts. */
export function slugAttribution(attr: string): string {
  return attr
    .replace(/[()]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ManifestEntry {
  attribution: string;
  arabic: string;
  file: string;
  width: number;
  height: number;
  bytes: number;
}

let cachedManifest: Record<string, ManifestEntry> | null | undefined;

async function loadManifest(): Promise<Record<string, ManifestEntry> | null> {
  if (cachedManifest !== undefined) return cachedManifest;
  try {
    const buf = await readFile(path.join(CACHE_DIR, "manifest.json"), "utf8");
    cachedManifest = JSON.parse(buf) as Record<string, ManifestEntry>;
    return cachedManifest;
  } catch {
    cachedManifest = null;
    return null;
  }
}

export interface CachedArabic {
  dataUrl: string;
  height: number;
}

const pngCache = new Map<string, CachedArabic>();

/**
 * Try to load a pre-rendered Arabic PNG for the given attribution.
 * Returns null if no cache entry exists (caller should fall back to
 * runtime Resvg rendering, which works locally but produces tofu on
 * Vercel).
 */
export async function getCachedArabicByAttribution(
  attribution: string | undefined
): Promise<CachedArabic | null> {
  if (!attribution) return null;
  // Resolve via the lookup's matcher first — handles joined attributions
  // like "HR. Bukhari 1923 & HR. Muslim 1095" by finding the first
  // recognizable part. Falls back to the raw normalized form so the
  // cache also catches direct matches that haven't been re-pregenerated yet.
  const canonicalKey = findLookupKey(attribution);
  const slug = canonicalKey
    ? canonicalKey
        .replace(/[()]/g, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
    : slugAttribution(attribution);
  if (!slug) return null;

  const cached = pngCache.get(slug);
  if (cached) return cached;

  const manifest = await loadManifest();
  if (!manifest || !manifest[slug]) return null;

  try {
    const filePath = path.join(CACHE_DIR, manifest[slug].file);
    await stat(filePath); // existence check
    const buf = await readFile(filePath);
    const result: CachedArabic = {
      dataUrl: `data:image/png;base64,${buf.toString("base64")}`,
      height: manifest[slug].height,
    };
    pngCache.set(slug, result);
    return result;
  } catch {
    return null;
  }
}
