import { NextResponse } from "next/server";
import { renderArabicAsImage } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server-side LRU. Resvg + harfbuzz shaping costs ~100-200ms per call,
 * and the team renders the same dua / hadith Arabic dozens of times
 * across batches. Caching the PNG bytes (with the height header) keyed
 * by the request shape eliminates that work on repeats.
 *
 * Capped at 64 entries — enough for the curated seed Arabic + a healthy
 * buffer for AI-generated variants. Evicts oldest on overflow.
 */
type Cached = { png: Uint8Array; height: number };
const CACHE = new Map<string, Cached>();
const CACHE_MAX = 64;

function cacheKey(text: string, color: string, fontSize: number, maxWidth: number): string {
  return `${fontSize}|${maxWidth}|${color}|${text}`;
}

function getCached(key: string): Cached | undefined {
  const hit = CACHE.get(key);
  if (!hit) return undefined;
  // Re-insert to mark it most-recently-used.
  CACHE.delete(key);
  CACHE.set(key, hit);
  return hit;
}

function setCached(key: string, value: Cached): void {
  if (CACHE.size >= CACHE_MAX) {
    // Map iteration order is insertion order; the first key is the LRU.
    const oldest = CACHE.keys().next().value;
    if (oldest) CACHE.delete(oldest);
  }
  CACHE.set(key, value);
}

/**
 * Render an Arabic string as a transparent PNG with proper harfbuzz
 * shaping (via Resvg). Used by client-side surfaces like the Animator
 * that can't shape Arabic in CSS.
 *
 * POST { text, color?, fontSize?, maxWidth? } → image/png
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      text?: string;
      color?: string;
      fontSize?: number;
      maxWidth?: number;
    };
    if (!body.text || typeof body.text !== "string") {
      return NextResponse.json({ error: "text required" }, { status: 400 });
    }
    const color = body.color ?? "#1a1a1a";
    const fontSize = body.fontSize ?? 64;
    const maxWidth = body.maxWidth ?? 860;
    const key = cacheKey(body.text, color, fontSize, maxWidth);

    const cached = getCached(key);
    if (cached) {
      return new NextResponse(new Uint8Array(cached.png), {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
          "X-Arabic-Height": String(cached.height),
          "X-Arabic-Cache": "hit",
        },
      });
    }

    const result = await renderArabicAsImage(body.text, color, fontSize, maxWidth);
    if (!result) {
      return NextResponse.json({ error: "Arabic font not bundled" }, { status: 500 });
    }

    const base64 = result.dataUrl.replace(/^data:image\/png;base64,/, "");
    const png = new Uint8Array(Buffer.from(base64, "base64"));
    setCached(key, { png, height: result.height });

    return new NextResponse(png, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
        // Communicate the rendered height so the client can size the <img>
        // without onload measurement.
        "X-Arabic-Height": String(result.height),
        "X-Arabic-Cache": "miss",
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
