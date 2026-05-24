import { NextResponse } from "next/server";
import JSZip from "jszip";
import { renderSlidePng } from "@/lib/render";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "babymo";
}

export async function POST(req: Request) {
  try {
    const { content } = (await req.json()) as { content: GeneratedContent };
    const zip = new JSZip();
    const folder = zip.folder(slug(content.title)) ?? zip;

    for (let i = 0; i < content.slides.length; i++) {
      const png = await renderSlidePng(content, i);
      folder.file(`${String(i + 1).padStart(2, "0")}-${slug(content.slides[i].heading)}.png`, png);
    }

    folder.file(
      "content.json",
      JSON.stringify(
        {
          title: content.title,
          hook: content.hook,
          caption: content.caption,
          cta: content.cta,
          hashtags: content.hashtags,
          slides: content.slides,
          meta: {
            contentTypeLabel: content.contentTypeLabel,
            categoryId: content.categoryId,
            format: content.format,
            theme: content.theme,
            storyStyle: content.storyStyle,
            createdAt: content.createdAt,
          },
        },
        null,
        2
      )
    );

    folder.file(
      "caption.txt",
      `${content.caption}\n\n${content.cta}\n\n${content.hashtags.join(" ")}\n`
    );

    const buf = await zip.generateAsync({ type: "uint8array" });
    const body = new Blob([buf as BlobPart], { type: "application/zip" });
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
