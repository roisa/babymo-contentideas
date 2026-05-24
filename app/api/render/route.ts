import { NextResponse } from "next/server";
import { renderSlidePng } from "@/lib/render";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  content: GeneratedContent;
  slideIndex?: number;
  format?: "jpg" | "png";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const idx = body.slideIndex ?? 0;
    const png = await renderSlidePng(body.content, idx);
    const mime = "image/png";
    return new NextResponse(new Uint8Array(png), {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
