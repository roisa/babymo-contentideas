/**
 * Maps Baby Mo Studio's `GeneratedContent` schema → Canva Brand Template
 * autofill payload.
 *
 * v2 architecture: ONE master Brand Template per format. Themes live in
 * the Canva Brand Kit as named color palettes; the studio additionally
 * uploads a pre-rendered theme background as the `bg` image field and a
 * pose PNG as the `character` image field. See CANVA_TEMPLATE_GUIDE.md.
 *
 * Field naming convention inside Canva templates:
 *   - title         → big sticker title (heading)
 *   - kicker        → small label inside the body card
 *   - body          → main body text (Indonesian translation when applicable)
 *   - translit      → italic Latin transliteration (split from body)
 *   - arabic        → Arabic text (Canva shapes it natively — perfect)
 *   - attribution   → "HR. Bukhari 6312" / "QS. Al-Hadid: 4"
 *   - footer        → "babymo.studio · Daily Dua" style chrome
 *   - page_number   → "1 / 5" carousel pip
 *   - bg            → image: full-bleed theme background
 *   - character     → image: matching Baby Mo character pose
 */

import type { GeneratedContent, Slide } from "./types";
import type { AutofillFieldValue } from "./canva";

type FormatId = GeneratedContent["format"];

/** One template per format. Theme is conveyed by the `bg` image, not by template choice. */
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

/**
 * Build the autofill `data` map for a single slide.
 *
 * `bgAssetId` and `characterAssetId` are optional — when present, the
 * studio has pre-uploaded a themed background / pose to Canva. When
 * absent, those slots stay as whatever the designer set in the template.
 */
export function slideToAutofillData(
  slide: Slide,
  index: number,
  total: number,
  contentTypeLabel: string,
  assets: { bgAssetId?: string; characterAssetId?: string } = {}
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
  if (assets.bgAssetId) data.bg = { type: "image", asset_id: assets.bgAssetId };
  if (assets.characterAssetId) data.character = { type: "image", asset_id: assets.characterAssetId };
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
