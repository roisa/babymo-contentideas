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
  const fontDir = path.join(process.cwd(), ".fonts");
  const candidates = [
    "arabic-cairo-bold.ttf",
    "arabic-reemkufi.ttf",
    "arabic-noto-sans.ttf",
    "noto-arabic.ttf",
  ];

  // Probe which font files actually exist on disk in the Vercel function.
  const fonts: Record<string, { present: boolean; size?: number }> = {};
  for (const name of candidates) {
    try {
      const buf = await readFile(path.join(fontDir, name));
      fonts[name] = { present: true, size: buf.length };
    } catch {
      fonts[name] = { present: false };
    }
  }

  // Now exercise the actual render path with a known authentic Arabic
  // string. If this works, the static SlidePreview should also work.
  const testText = "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا";
  const result = await renderArabicAsImage(testText, "#1a1a1a", 64, 860);

  return NextResponse.json({
    cwd: process.cwd(),
    fontDirChecked: fontDir,
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
