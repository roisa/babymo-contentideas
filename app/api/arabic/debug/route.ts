import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderArabicAsImage } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic for the Arabic pipeline on Vercel. Hit this URL from any
 * browser and you'll get a JSON answer to:
 *
 *  - Is the Arabic font (.fonts/arabic-cairo-bold.ttf) bundled into
 *    the /api/render function on this deployment?
 *  - Can Resvg actually render Arabic to a non-empty PNG?
 *  - How big is a typical render?
 *
 * If `fontFound` is false, the .fonts/ directory didn't ship with
 * the serverless function — fix outputFileTracingIncludes.
 * If `fontFound` is true but `pngBytes` is suspiciously small (<500),
 * Resvg is shaping to blank — font may be missing glyphs or the
 * fontFamily lookup mismatches.
 */
export async function GET() {
  const publicFontDir = path.join(process.cwd(), "public", "fonts");
  const dotFontDir = path.join(process.cwd(), ".fonts");
  const candidates = [
    "arabic-cairo-bold.ttf",
    "arabic-reemkufi.ttf",
    "arabic-noto-sans.ttf",
    "noto-arabic.ttf",
  ];

  // Probe BOTH possible locations on the Vercel serverless filesystem.
  // public/fonts/ is the new canonical location (always bundled).
  // .fonts/ is the legacy location (might be skipped if outputFileTracingIncludes
  // drops dotfile dirs on this Vercel version).
  const fonts: Record<string, { publicCopy: { present: boolean; size?: number }; dotCopy: { present: boolean; size?: number } }> = {};
  for (const name of candidates) {
    const entry = {
      publicCopy: { present: false } as { present: boolean; size?: number },
      dotCopy: { present: false } as { present: boolean; size?: number },
    };
    try {
      const buf = await readFile(path.join(publicFontDir, name));
      entry.publicCopy = { present: true, size: buf.length };
    } catch { /* fall through */ }
    try {
      const buf = await readFile(path.join(dotFontDir, name));
      entry.dotCopy = { present: true, size: buf.length };
    } catch { /* fall through */ }
    fonts[name] = entry;
  }

  // Now exercise the actual render path with a known authentic Arabic
  // string. If this works, the static SlidePreview should also work.
  const testText = "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا";
  const result = await renderArabicAsImage(testText, "#1a1a1a", 64, 860);

  return NextResponse.json({
    cwd: process.cwd(),
    publicFontDir,
    dotFontDir,
    fonts,
    testRender: result
      ? {
          ok: true,
          dataUrlPrefix: result.dataUrl.slice(0, 50),
          // Decode the base64 to count actual PNG bytes.
          pngBytes: Math.floor(((result.dataUrl.length - 30) * 3) / 4),
          height: result.height,
        }
      : { ok: false, reason: "renderArabicAsImage returned null" },
  });
}
