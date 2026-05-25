/**
 * Maps Baby Mo Studio's `GeneratedContent` schema → Canva Brand Template
 * autofill payload.
 *
 * The designer team builds one Brand Template per `{format, theme?}` combo
 * in Canva (see CANVA_TEMPLATE_GUIDE.md for the spec), names each text
 * field exactly like the keys below, and pastes the template IDs into
 * CANVA_TEMPLATES.
 *
 * Field naming convention inside Canva templates:
 *   - title         → the big sticker title  (heading)
 *   - kicker        → the small label inside the body card
 *   - body          → main body text
 *   - translit      → italic Latin transliteration (split from body)
 *   - arabic        → Arabic text (Canva will shape it natively)
 *   - attribution   → "HR. Bukhari 6312" / "QS. Al-Hadid: 4"
 *   - footer        → "babymo.studio · day 04" style chrome
 *   - page_number   → "1 / 5" carousel pip
 *
 * For carousels, the template is multi-page (one page per slide). We send
 * one autofill request per slide, then assemble — or we use a single
 * brand template with N slide variants. v2 starts simple: one template
 * per format, one autofill per slide.
 */

import type { GeneratedContent, Slide } from "./types";
import type { AutofillFieldValue } from "./canva";

type FormatId = GeneratedContent["format"];

/**
 * Template ID lookup. Paste real IDs here once the design team builds them.
 * Falls back to undefined → the autofill route returns a helpful error.
 *
 * Use the environment variable form if you'd rather not check IDs into git:
 *   CANVA_TEMPLATE_SINGLE, CANVA_TEMPLATE_CAROUSEL, CANVA_TEMPLATE_REELS
 */
export const CANVA_TEMPLATES: Record<FormatId, string | undefined> = {
  single: process.env.CANVA_TEMPLATE_SINGLE,
  carousel: process.env.CANVA_TEMPLATE_CAROUSEL,
  reels: process.env.CANVA_TEMPLATE_REELS,
};

export function getTemplateId(format: FormatId): string | undefined {
  return CANVA_TEMPLATES[format];
}

/** Split a body string into transliteration + translation halves. */
function splitTranslitTranslation(body: string): { translit?: string; translation: string } {
  const parts = body.split(/\n\s*\n/);
  if (parts.length > 1) {
    return { translit: parts[0].trim(), translation: parts.slice(1).join("\n\n").trim() };
  }
  return { translation: body };
}

/** Build the autofill `data` map for a single slide. */
export function slideToAutofillData(
  slide: Slide,
  index: number,
  total: number,
  contentTypeLabel: string
): Record<string, AutofillFieldValue> {
  const { translit, translation } = splitTranslitTranslation(slide.body || "");
  const data: Record<string, AutofillFieldValue> = {
    title: { type: "text", text: slide.heading || "" },
    body: { type: "text", text: translation || "" },
    page_number: { type: "text", text: `${index + 1} / ${total}` },
    footer: { type: "text", text: `babymo.studio · ${contentTypeLabel}` },
  };
  if (slide.kicker) data.kicker = { type: "text", text: slide.kicker };
  if (slide.arabic) data.arabic = { type: "text", text: slide.arabic };
  if (translit) data.translit = { type: "text", text: translit };
  if (slide.attribution) data.attribution = { type: "text", text: `(${slide.attribution})` };
  return data;
}

/** The shape returned by /api/canva/autofill so the UI can render & link. */
export interface CanvaDesignSummary {
  designId: string;
  title: string;
  editUrl: string;
  viewUrl: string;
  /** True when the design has multiple pages (carousel/reels). */
  multipage: boolean;
  /** One sub-design per slide for carousel/reels where we created N designs. */
  perSlide?: Array<{ slideIndex: number; designId: string; editUrl: string }>;
}
