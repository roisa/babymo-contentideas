import { NextResponse } from "next/server";
import { renderArabicAsImage } from "@/lib/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const result = await renderArabicAsImage(
      body.text,
      body.color ?? "#1a1a1a",
      body.fontSize ?? 64,
      body.maxWidth ?? 860
    );
    if (!result) {
      return NextResponse.json({ error: "Arabic font not bundled" }, { status: 500 });
    }
    // The data URL is base64; decode to bytes and return as image/png.
    const base64 = result.dataUrl.replace(/^data:image\/png;base64,/, "");
    const buf = Buffer.from(base64, "base64");
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
        // Communicate the rendered height so the client can size the <img>
        // without onload measurement.
        "X-Arabic-Height": String(result.height),
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
