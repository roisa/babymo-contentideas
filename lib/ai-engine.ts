import Anthropic from "@anthropic-ai/sdk";
import { findContentType, FORMATS, STORY_STYLES, type FormatId } from "./content-types";
import { getSeedsFor, SEEDS, type SampleSeed } from "./samples";
import type { GeneratedContent, GenerationRequest, Slide } from "./types";

const SYSTEM_PROMPT = `You are the content writer for Baby Mo — a modern Islamic childhood & parenting brand.

Voice:
- soft, emotional, calming, intimate
- modern, minimalist, premium
- never preachy, never harsh dakwah tone
- never overly formal religious language
- focused on Islam in small daily moments

Hard rules:
- write like a tender friend, not a lecturer
- never include the prophet's name without ﷺ when referenced
- prefer one image, one feeling per slide
- one short sentence per slide body when possible
- never invent hadith or Quran references; only use well-known authentic ones
- captions should feel like an Instagram caption, not a sermon
- output STRICT JSON, no commentary, no markdown fences`;

interface RawSlide {
  heading?: string;
  body?: string;
  footer?: string;
  arabic?: string;
}

interface RawContent {
  title?: string;
  hook?: string;
  slides?: RawSlide[];
  caption?: string;
  cta?: string;
  hashtags?: string[];
}

function userPrompt(req: GenerationRequest, slidesCount: number, seed?: SampleSeed): string {
  const meta = findContentType(req.contentTypeId);
  if (!meta) throw new Error("Unknown content type: " + req.contentTypeId);
  const style = STORY_STYLES.find((s) => s.id === req.storyStyle);
  const format = FORMATS.find((f) => f.id === req.format)!;

  const parts: string[] = [];
  parts.push(`Generate ONE Instagram piece for Baby Mo.`);
  parts.push(`Content type: ${meta.type.label} (${meta.category.name})`);
  parts.push(`Brief: ${meta.type.hint}`);
  parts.push(`Tone: ${meta.type.tone}`);
  parts.push(`Format: ${format.name} (${slidesCount} slide${slidesCount === 1 ? "" : "s"})`);
  if (style) {
    parts.push(`Storytelling structure: ${style.name}. Use this blueprint in order: ${style.blueprint.join(" → ")}.`);
  }
  if (req.customPrompt) {
    parts.push(`Extra direction from the team: ${req.customPrompt}`);
  }
  if (seed) {
    parts.push(`Reference an internal seed for VOICE only (do NOT copy): "${seed.title}" — ${seed.hook}`);
  }
  parts.push(`
Return JSON in this exact shape:
{
  "title": "string, short, evocative",
  "hook": "one-line emotional hook",
  "slides": [
    { "heading": "string", "body": "string (1-2 short sentences)", "footer": "Baby Mo · ${meta.type.label}", "arabic": "OPTIONAL Arabic text if relevant" }
  ],
  "caption": "an Instagram caption, 1-3 sentences, soft and intimate, may include 1-2 emojis",
  "cta": "one short save / share / tag call-to-action",
  "hashtags": ["#babymo", "...", "..."]
}
- Exactly ${slidesCount} slide(s).
- Keep slide bodies short. Reels slides especially short (under 12 words).
- The first slide must be the strongest hook.
- The last slide must be the CTA/save moment.
`);
  return parts.join("\n");
}

function variationSeed(req: GenerationRequest, index: number): SampleSeed | undefined {
  const seeds = getSeedsFor(req.contentTypeId);
  if (seeds.length === 0) return undefined;
  return seeds[index % seeds.length];
}

function resolveSlidesCount(req: GenerationRequest): number {
  const f = FORMATS.find((x) => x.id === req.format)!;
  return f.defaultSlides;
}

function genId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function normalize(raw: RawContent, fallback: SampleSeed | undefined, req: GenerationRequest, slidesCount: number): { title: string; hook: string; slides: Slide[]; caption: string; cta: string; hashtags: string[] } {
  const meta = findContentType(req.contentTypeId);
  const labelFooter = `Baby Mo · ${meta?.type.label ?? "Content"}`;
  const slidesRaw = (raw.slides ?? []).slice(0, slidesCount);
  const slides: Slide[] = slidesRaw.map((s, i) => ({
    heading: (s.heading ?? "").trim() || (fallback?.slides[i]?.heading ?? `Slide ${i + 1}`),
    body: (s.body ?? "").trim() || (fallback?.slides[i]?.body ?? "A soft moment of remembrance."),
    footer: (s.footer ?? "").trim() || labelFooter,
    arabic: s.arabic?.trim() || fallback?.slides[i]?.arabic,
  }));
  while (slides.length < slidesCount) {
    const i = slides.length;
    slides.push({
      heading: fallback?.slides[i]?.heading ?? `Slide ${i + 1}`,
      body: fallback?.slides[i]?.body ?? "A soft moment of remembrance.",
      footer: labelFooter,
    });
  }
  return {
    title: (raw.title ?? "").trim() || fallback?.title || "A Baby Mo moment",
    hook: (raw.hook ?? "").trim() || fallback?.hook || "A soft reminder.",
    slides,
    caption: (raw.caption ?? "").trim() || fallback?.caption || "Saved for a tender moment 🤍",
    cta: (raw.cta ?? "").trim() || fallback?.cta || "Save & share.",
    hashtags: (raw.hashtags ?? fallback?.hashtags ?? ["#babymo"]).slice(0, 8),
  };
}

function offlineGenerateOne(req: GenerationRequest, index: number, slidesCount: number): GeneratedContent {
  const meta = findContentType(req.contentTypeId)!;
  const seed = variationSeed(req, index);
  const seeds = getSeedsFor(req.contentTypeId);
  const allSeeds = seeds.length > 0 ? seeds : Object.values(SEEDS).flat();
  const base = seed ?? allSeeds[index % allSeeds.length];

  // Light variation: rotate slide order subtly for batches, append index hint to title for visible variety.
  const variantTitle = index === 0 ? base.title : `${base.title} · v${index + 1}`;
  const slides = base.slides.slice(0, slidesCount).map((s) => ({ ...s }));
  while (slides.length < slidesCount) {
    slides.push({
      heading: "Save this",
      body: "Soft Islam in small daily moments.",
      footer: `Baby Mo · ${meta.type.label}`,
    });
  }
  return {
    id: genId(),
    createdAt: Date.now(),
    contentTypeId: req.contentTypeId,
    contentTypeLabel: meta.type.label,
    categoryId: meta.category.id,
    format: req.format,
    theme: req.theme,
    storyStyle: req.storyStyle,
    title: variantTitle,
    hook: base.hook,
    caption: base.caption,
    cta: base.cta,
    hashtags: base.hashtags,
    slides,
  };
}

async function aiGenerateOne(client: Anthropic, req: GenerationRequest, index: number, slidesCount: number): Promise<GeneratedContent> {
  const meta = findContentType(req.contentTypeId)!;
  const seed = variationSeed(req, index);
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt(req, slidesCount, seed) }],
  });
  const text = msg.content
    .map((c) => (c.type === "text" ? c.text : ""))
    .join("\n")
    .trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned non-JSON output");
  const raw = JSON.parse(jsonMatch[0]) as RawContent;
  const norm = normalize(raw, seed, req, slidesCount);
  return {
    id: genId(),
    createdAt: Date.now(),
    contentTypeId: req.contentTypeId,
    contentTypeLabel: meta.type.label,
    categoryId: meta.category.id,
    format: req.format,
    theme: req.theme,
    storyStyle: req.storyStyle,
    ...norm,
  };
}

export async function generateBatch(req: GenerationRequest): Promise<{ items: GeneratedContent[]; usedAI: boolean; warning?: string }> {
  const slidesCount = resolveSlidesCount(req);
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const items: GeneratedContent[] = [];

  if (apiKey) {
    const client = new Anthropic({ apiKey });
    const promises = Array.from({ length: req.batchSize }, (_, i) =>
      aiGenerateOne(client, req, i, slidesCount).catch((err: unknown) => {
        console.warn("AI generation failed for one item, falling back:", err);
        return offlineGenerateOne(req, i, slidesCount);
      })
    );
    const settled = await Promise.all(promises);
    items.push(...settled);
    return { items, usedAI: true };
  }

  for (let i = 0; i < req.batchSize; i++) {
    items.push(offlineGenerateOne(req, i, slidesCount));
  }
  return {
    items,
    usedAI: false,
    warning: "ANTHROPIC_API_KEY not set — generated from curated Baby Mo content library. Set the env var to enable live AI generation.",
  };
}

export function generateCalendar(theme: GenerationRequest["theme"]): GeneratedContent[] {
  const plan: Array<{ weekday: string; contentTypeId: string; format: FormatId }> = [
    { weekday: "Mon", contentTypeId: "daily-dua", format: "single" },
    { weekday: "Tue", contentTypeId: "gentle-muslim-parenting", format: "carousel" },
    { weekday: "Wed", contentTypeId: "did-you-know", format: "carousel" },
    { weekday: "Thu", contentTypeId: "mini-islamic-story", format: "carousel" },
    { weekday: "Fri", contentTypeId: "friday-reminder", format: "single" },
    { weekday: "Sat", contentTypeId: "muslim-childhood-nostalgia", format: "carousel" },
    { weekday: "Sun", contentTypeId: "before-sleep-series", format: "carousel" },
  ];
  const out: GeneratedContent[] = [];
  for (let day = 0; day < 30; day++) {
    const slot = plan[day % 7];
    const req: GenerationRequest = { contentTypeId: slot.contentTypeId, format: slot.format, theme, batchSize: 1 };
    const slidesCount = FORMATS.find((f) => f.id === slot.format)!.defaultSlides;
    out.push(offlineGenerateOne(req, day, slidesCount));
  }
  return out;
}
