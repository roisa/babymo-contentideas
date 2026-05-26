import { NextResponse } from "next/server";
import { createAutofill, pollAutofill } from "@/lib/canva";
import { getTemplateId, slideToAutofillData, type CanvaDesignSummary } from "@/lib/canva-mapping";
import type { GeneratedContent } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Accepts a GeneratedContent and creates one Canva design per slide
 * (carousel/reels produce N designs; single produces 1). Returns each
 * design's edit_url so the UI can offer "Open in Canva" links.
 *
 * Single-account model: uses the shared CANVA_REFRESH_TOKEN env var to
 * mint access tokens on demand. No per-user OAuth.
 */
export async function POST(req: Request) {
  try {
    const { content } = (await req.json()) as { content: GeneratedContent };
    const templateId = getTemplateId(content.format);
    if (!templateId) {
      return NextResponse.json(
        {
          error: `No Canva Brand Template ID configured for format "${content.format}". Set CANVA_TEMPLATE_${content.format.toUpperCase()} in your env vars. See CANVA_TEMPLATE_GUIDE.md.`,
        },
        { status: 412 }
      );
    }

    // One autofill job per slide. Canva's Autofill API creates one design
    // per call from one Brand Template — for carousel/reels we treat each
    // slide as a separate Canva design that the designer team can later
    // combine in a Canva carousel.
    const total = content.slides.length;
    const perSlide: CanvaDesignSummary["perSlide"] = [];

    for (let i = 0; i < total; i++) {
      const data = slideToAutofillData(content.slides[i], i, total, content.contentTypeLabel);
      const title = `${content.title} · slide ${i + 1}/${total}`;
      const { jobId } = await createAutofill({ brand_template_id: templateId, data, title });
      const job = await pollAutofill(jobId);
      if (job.job.status !== "success" || !job.job.result) {
        return NextResponse.json(
          { error: `Slide ${i + 1} autofill failed: ${job.job.error?.message ?? "unknown"}` },
          { status: 502 }
        );
      }
      perSlide.push({
        slideIndex: i,
        designId: job.job.result.design.id,
        editUrl: job.job.result.design.urls.edit_url,
      });
    }

    const first = perSlide[0];
    const summary: CanvaDesignSummary = {
      designId: first.designId,
      title: content.title,
      editUrl: first.editUrl,
      viewUrl: first.editUrl, // edit_url is what we expose; view_url available if needed
      multipage: total > 1,
      perSlide: total > 1 ? perSlide : undefined,
    };
    return NextResponse.json(summary);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
