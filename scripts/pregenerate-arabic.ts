/**
 * Pre-render the curated Arabic strings to PNG files. Run this locally
 * (where Resvg's harfbuzz works correctly) and commit the resulting
 * PNGs to public/arabic-cache/. The static renderer reads them from
 * disk at request time, bypassing Vercel's broken Arabic shaping.
 *
 *   npm run pregenerate-arabic
 *
 * Re-run whenever lib/arabic-lookup.ts changes.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { ARABIC_LOOKUP } from "../lib/arabic-lookup";
import { renderArabicAsImage } from "../lib/render";

/** Mirror of slugAttribution in lib/arabic-cache.ts. Keep in sync. */
function slugAttribution(attr: string): string {
  return attr
    .replace(/[()]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const OUT_DIR = path.join(process.cwd(), "public", "arabic-cache");

interface ManifestEntry {
  attribution: string;
  arabic: string;
  file: string;
  width: number;
  height: number;
  bytes: number;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Pre-rendering ${Object.keys(ARABIC_LOOKUP).length} Arabic strings → ${OUT_DIR}\n`);

  const manifest: Record<string, ManifestEntry> = {};
  let ok = 0;
  let failed = 0;

  for (const [attribution, arabic] of Object.entries(ARABIC_LOOKUP)) {
    const slug = slugAttribution(attribution);
    const filename = `${slug}.png`;
    const filepath = path.join(OUT_DIR, filename);

    // Match the static renderer's defaults: color is theme.title (varies),
    // but a neutral dark cream-friendly color works across all themes.
    // Themes that need a different color will fall back to runtime
    // rendering (currently broken on Vercel but local + future fix).
    const result = await renderArabicAsImage(arabic, "#1a1a1a", 64, 860);
    if (!result) {
      console.log(`  ✗ ${attribution} — renderArabicAsImage returned null`);
      failed++;
      continue;
    }

    const base64 = result.dataUrl.replace(/^data:image\/png;base64,/, "");
    const png = Buffer.from(base64, "base64");
    await writeFile(filepath, png);

    manifest[slug] = {
      attribution,
      arabic,
      file: filename,
      width: 860,
      height: result.height,
      bytes: png.length,
    };
    console.log(`  ✓ ${attribution} → ${filename} (${png.length} bytes, h=${result.height})`);
    ok++;
  }

  const manifestPath = path.join(OUT_DIR, "manifest.json");
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\nDone. ${ok} ok, ${failed} failed.`);
  console.log(`Manifest written to ${manifestPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
