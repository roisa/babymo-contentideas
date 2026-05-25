import Anthropic from "@anthropic-ai/sdk";
import { findContentType, FORMATS, STORY_STYLES, type FormatId } from "./content-types";
import { getSeedsFor, SEEDS, type SampleSeed } from "./samples";
import type { GeneratedContent, GenerationRequest, Slide } from "./types";

const SYSTEM_PROMPT = `You write Instagram content for Baby Mo (@babymo.official) — a bright, kid-friendly Indonesian Islamic brand for Muslim children & families.

Voice & style:
- Bahasa Indonesia (kid-friendly), occasional English/Malay mix
- BOLD, playful, attention-grabbing titles (e.g. "Tahukah Kamu?", "Yuk, Belajar!", "Wow!", "Senyum kecilmu...", "Mengalah itu hebat")
- warm, encouraging, never preachy, never harsh dakwah tone
- speak directly to "Sahabat Mo" (Baby Mo's friends / kids)
- pair every reminder with practical small action

Format conventions:
- "heading" = the big bold sticker title (1-3 lines, bold, attention-grabbing). Indonesian.
- "kicker" = small label inside the body card (e.g. "Catatan Hari Ini:", "Tahukah Kamu?", "Yuk, Hafalkan!", "Quiz Seru:")
- "body" = the white-card body text, max 3 short lines, with optional Arabic translation/meaning quoted
- "arabic" = original Arabic text (when relevant, for dua/ayat/hadith)
- "attribution" = hadith/Quran source with number (e.g. "HR. Bukhari 6312", "QS. Al-Hadid: 4")
- captions = Indonesian, 1-2 sentences, with 1-2 emojis like 🌙💚✨

Hard rules:
- never invent hadith/Quran references — only use well-known authentic ones
- when referring to Prophet Muhammad always add SAW or ﷺ
- output STRICT JSON, no commentary, no markdown fences`;

interface RawSlide {
  heading?: string;
  body?: string;
  footer?: string;
  arabic?: string;
  kicker?: string;
  attribution?: string;
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
  "title": "short Indonesian title for the post (internal label)",
  "hook": "one-line emotional hook in Indonesian",
  "slides": [
    {
      "heading": "BIG bold sticker title (Indonesian, 1-3 lines, attention-grabbing)",
      "kicker": "small label like 'Tahukah Kamu?' / 'Catatan Hari Ini:' / 'Yuk, Hafalkan!' / 'Quiz Seru:'",
      "body": "1-3 short Indonesian sentences in the white card",
      "arabic": "OPTIONAL Arabic text if relevant (dua/ayat/hadith)",
      "attribution": "OPTIONAL source like 'HR. Bukhari 6312' or 'QS. Al-Hadid: 4'"
    }
  ],
  "caption": "Indonesian Instagram caption, 1-2 sentences, with 1-2 emojis",
  "cta": "Indonesian CTA, e.g. 'Save & bagikan!', 'Tag Sahabat Mo-mu!', 'Comment jawabanmu!'",
  "hashtags": ["#BabyMo", "..."]
}
- Exactly ${slidesCount} slide(s).
- Heading must be BOLD and punchy (kid-friendly Indonesian).
- Keep body text short (max 3 lines).
- For Reels: even shorter, hook-driven.
- The first slide is the strongest hook; for carousels, the last slide is the CTA/save moment.
`);
  return parts.join("\n");
}

/**
 * Per-batch shuffled seed order. Built once per batch via
 * `prepareBatchSeedOrder` so a batch of N gets N distinct seeds when
 * available (Fisher–Yates), with random-but-stable ordering inside the batch.
 */
let currentBatchOrder: number[] | null = null;

function prepareBatchSeedOrder(req: GenerationRequest): void {
  const seeds = getSeedsFor(req.contentTypeId);
  if (seeds.length === 0) {
    currentBatchOrder = null;
    return;
  }
  const idxs = Array.from({ length: seeds.length }, (_, i) => i);
  // Fisher–Yates shuffle
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  currentBatchOrder = idxs;
}

function variationSeed(req: GenerationRequest, index: number): SampleSeed | undefined {
  const seeds = getSeedsFor(req.contentTypeId);
  if (seeds.length === 0) return undefined;
  const order = currentBatchOrder ?? Array.from({ length: seeds.length }, (_, i) => i);
  const seedIdx = order[index % order.length];
  return seeds[seedIdx];
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
    body: (s.body ?? "").trim() || (fallback?.slides[i]?.body ?? "Soft Islam in small daily moments."),
    footer: (s.footer ?? "").trim() || labelFooter,
    arabic: s.arabic?.trim() || fallback?.slides[i]?.arabic,
    kicker: s.kicker?.trim() || fallback?.slides[i]?.kicker,
    attribution: s.attribution?.trim() || fallback?.slides[i]?.attribution,
  }));
  while (slides.length < slidesCount) {
    const i = slides.length;
    slides.push({
      heading: fallback?.slides[i]?.heading ?? `Slide ${i + 1}`,
      body: fallback?.slides[i]?.body ?? "Soft Islam in small daily moments.",
      footer: labelFooter,
      kicker: fallback?.slides[i]?.kicker,
      attribution: fallback?.slides[i]?.attribution,
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

/**
 * When a seed has fewer slides than the requested carousel length, synthesize
 * additional slides that follow the hook → relatable → reflection → takeaway → CTA arc.
 * The first slide stays the seed's "money slide" with the hadith / Arabic / attribution.
 * Subsequent slides explore the same topic from different angles in Indonesian.
 */
function expandToCarousel(seed: SampleSeed, first: Slide, slidesCount: number, label: string): Slide[] {
  const topic = (first.heading || seed.title || label).replace(/\.$/, "");
  const cta = seed.cta || "Save & bagikan!";
  // 5 extra slide blueprints in Indonesian. We pick the ones we need.
  const expansions: Slide[] = [
    {
      kicker: "Yuk, Renungkan:",
      heading: `Pernah ngga sih, ${topic.toLowerCase()}?`,
      body: "Mungkin kelihatan kecil, tapi efeknya besar buat hati. Sahabat Mo pasti sering ngalamin juga, kan?",
    },
    {
      kicker: "Kenapa Penting?",
      heading: "Allah Cinta Hal-hal Kecil",
      body: "Hal-hal kecil yang dilakukan terus-menerus, itu yang Allah cintai. Bukan yang besar tapi cuma sekali.",
      attribution: "HR. Bukhari 6464",
    },
    {
      kicker: "Coba Yuk!",
      heading: "Mulai dari Sekarang!",
      body: "Tarik nafas dalam-dalam, niatkan karena Allah, dan lakukan satu langkah kecil hari ini. Sahabat Mo pasti bisa!",
    },
    {
      kicker: "Pesan Mama Mo:",
      heading: "Kamu Hebat, Sahabat Mo!",
      body: "Setiap niat baik yang kamu mulai, malaikat udah catat. Allah lihat usahamu, bukan hanya hasilnya.",
    },
    {
      kicker: "Yuk, Bagikan!",
      heading: cta,
      body: "Bagikan ke teman & keluargamu. Satu kebaikan, ribuan pahala. Tag #BabyMo kalau kamu coba ya!",
    },
  ];
  return expansions.slice(0, slidesCount - 1);
}

function offlineGenerateOne(req: GenerationRequest, index: number, slidesCount: number): GeneratedContent {
  const meta = findContentType(req.contentTypeId)!;
  const seed = variationSeed(req, index);
  const seeds = getSeedsFor(req.contentTypeId);
  const allSeeds = seeds.length > 0 ? seeds : Object.values(SEEDS).flat();
  const base = seed ?? allSeeds[index % allSeeds.length];

  // Light variation: append a small variant hint to titles for batches.
  const variantTitle = index === 0 ? base.title : `${base.title} · v${index + 1}`;
  const slides = base.slides.slice(0, slidesCount).map((s) => ({ ...s }));
  if (slides.length < slidesCount) {
    // Seed doesn't have enough slides — expand into a proper multi-slide story.
    const expansion = expandToCarousel(base, slides[0], slidesCount, meta.type.label);
    while (slides.length < slidesCount) {
      slides.push(expansion[slides.length - 1] ?? expansion[expansion.length - 1]);
    }
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

  // Fresh per-batch seed shuffle — distinct results each generate.
  prepareBatchSeedOrder(req);

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
