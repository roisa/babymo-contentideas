import Anthropic from "@anthropic-ai/sdk";
import { findContentType, FORMATS, STORY_STYLES, type FormatId } from "./content-types";
import { getSeedsFor, SEEDS, type SampleSeed } from "./samples";
import { suggestTheme } from "./themes";
import { getIslamicContext, type IslamicPhase } from "./hijri";
import { trackUsage } from "./usage-store";
import { lookupArabicByAttribution } from "./arabic-lookup";
import type { GeneratedContent, GenerationRequest, Slide } from "./types";

/** Pick the theme for one item: when autoTheme is on, derive from
 * content-type mood + batch position; otherwise honor the user's choice. */
function themeFor(req: GenerationRequest, categoryId: string, batchIndex: number) {
  return req.autoTheme ? suggestTheme(req.contentTypeId, categoryId, batchIndex) : req.theme;
}

const SYSTEM_PROMPT = `You write Instagram content for Baby Mo (@babymo.official) — a bright, kid-friendly Indonesian Islamic brand for Muslim children & families.

# Voice & style
- Bahasa Indonesia (kid-friendly), occasional English/Malay mix
- BOLD, playful, attention-grabbing titles
- warm, encouraging, never preachy, never harsh dakwah tone
- speak directly to "Sahabat Mo" (Baby Mo's friends / kids)
- pair every reminder with a practical small action
- never invent hadith/Quran references — only use well-known authentic ones
- when referring to Prophet Muhammad always add SAW or ﷺ

# Title pattern bank (use these patterns, vary the substance)
- "Tahukah Kamu? [surprising fact]"
- "Yuk, [verb] [object]!"
- "Wow! [observation]"
- "Sahabat Mo, [reminder]"
- "Pernah ngga sih, [scenario]?"
- "Kenapa [verb] itu [adjective]?"
- "Mulai dari [small action]!"
- "[Emotional state] itu [reframe]" (e.g. "Capek itu tanda kamu sayang")
- "Doa [moment]" (e.g. "Doa Sebelum Tidur")
- "Adab [activity]" (e.g. "Adab Mengucap Salam")
- "Kisah Nabi [name]"
- "POV: [scene]"

# Kicker label library (pick one that matches the slide's role)
Curious/educational:
- "Tahukah Kamu?", "Fakta:", "Yuk, Belajar!", "Cobain Yuk!"
Action/practice:
- "Yuk, Hafalkan!", "Coba Yuk!", "Mulai Hari Ini!", "Praktikkan Yuk!"
Reflective/warm:
- "Catatan Hari Ini:", "Pesan Mama Mo:", "Untuk Mama", "Yuk, Renungkan:"
Story/scene:
- "Scene 1", "Pagi yang Cerah!", "Ingat Nggak?", "Cerita Hari Ini"
Quiz/interactive:
- "Quiz Seru:", "Pilih Mana?", "Tebak Yuk!", "Sahabat Mo Tahu?"
CTA/wrap:
- "Save & Bagikan!", "Tag Temanmu!", "Yuk, Bagikan!", "Coba Yuk!"

# Format conventions
- "heading" = the BIG bold sticker title (1-3 lines, bold, attention-grabbing). Indonesian.
- "kicker" = small label inside the body card (from the library above)
- "body" = the white-card body text, max 3 short lines, with optional Arabic translation/meaning quoted. When body has Arabic transliteration + Indonesian translation, separate them with a blank line: "Bismika Allahumma amuutu wa ahyaa.\\n\\n"Dengan nama-Mu ya Allah, aku mati dan aku hidup.""
- "arabic" = original Arabic text (when relevant, for dua/ayat/hadith) — pasted as plain Arabic, not transliterated
- "attribution" = hadith/Quran source with number (e.g. "HR. Bukhari 6312", "QS. Al-Hadid: 4")
- "caption" = Indonesian, 1-2 sentences, with 1-2 emojis like 🌙💚✨
- "cta" = Indonesian CTA (e.g. "Save & bagikan!", "Tag Sahabat Mo-mu!", "Comment jawabanmu!")

# Per-format expectations
- **single** (1 slide): one self-contained moment. The heading IS the post. Body adds intimate detail. Often a dua or a single emotional reflection.
- **carousel** (3-5 slides): narrative arc — HOOK → CURIOSITY → REVEAL → FAQ → CTA. Each slide builds on the last. First slide is the strongest hook; last slide is the save/share moment. Don't repeat the same idea across slides.
- **reels** (2-4 slides): punchy, hook-driven, ultra-short body. Each slide is a beat in a fast-paced scene. Vertical 1080×1920.

# Output contract (STRICT JSON, no commentary, no markdown fences)
Always return exactly this shape:
{
  "title": "short Indonesian title for the post (internal label)",
  "hook": "one-line emotional hook in Indonesian",
  "slides": [
    {
      "heading": "BIG bold sticker title (Indonesian, 1-3 lines, attention-grabbing)",
      "kicker": "small label from the kicker library",
      "body": "1-3 short Indonesian sentences in the white card",
      "arabic": "REQUIRED Arabic text when body has transliteration OR attribution mentions HR./QS. — omit ENTIRELY (don't send empty string) for non-religious-text slides",
      "attribution": "OPTIONAL source like 'HR. Bukhari 6312' or 'QS. Al-Hadid: 4'"
    }
  ],
  "caption": "Indonesian Instagram caption, 1-2 sentences, with 1-2 emojis",
  "cta": "Indonesian CTA",
  "hashtags": ["#BabyMo", "..."]
}

Hard rules:
- The slides array length must match the requested slide count exactly.
- Heading must be BOLD and punchy (kid-friendly Indonesian).
- Keep body text short (max 3 lines).
- For Reels: even shorter, hook-driven.
- The first slide is the strongest hook; for carousels, the last slide is the CTA/save moment.
- If unsure whether a hadith reference is authentic, omit the attribution field entirely.
- **Arabic is REQUIRED, not optional, in these cases** (skipping it breaks the rendered card layout):
    • Any dua content (daily-dua, ramadan-sahur, ramadan-iftar, etc.)
    • Any Quran ayah or hadith reveal (quran-ayah, hadith-motivation)
    • Any slide whose body contains a Latin-script transliteration (the "Bismika..." / "Alhamdulillahi..." / "Allahumma..." style)
    • Any slide whose attribution starts with "HR." or "QS."
  In those cases, the \`arabic\` field MUST contain the authentic Arabic script. Never send "", " ", "...", or omit the field — emit the real shaped Arabic text.
- For NON-religious-text slides (kid feeling slides, scene transitions, CTA wraps), OMIT the arabic field entirely — don't include it as an empty string.`;

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
  parts.push(`Format: ${format.name} — exactly ${slidesCount} slide${slidesCount === 1 ? "" : "s"}.`);
  if (style) {
    parts.push(`Storytelling structure: ${style.name}. Use this blueprint in order: ${style.blueprint.join(" → ")}.`);
  }
  if (req.customPrompt) {
    parts.push(`Extra direction from the team: ${req.customPrompt}`);
  }
  if (seed) {
    // Expose seed as VOICE reference + authentic Arabic source. The AI
    // can either reuse the seed's exact hadith/ayah (copying its arabic
    // and attribution verbatim — these are pre-verified by the team) OR
    // pick a different well-known reference where it knows the exact
    // arabic. Inventing arabic is forbidden by the system prompt.
    parts.push(`Reference seed for VOICE (vary the framing, but feel free to reuse the canonical arabic/attribution verbatim — these are pre-verified):`);
    parts.push(`  title: "${seed.title}"`);
    parts.push(`  hook: "${seed.hook}"`);
    const seedFirstSlideWithArabic = seed.slides.find((s) => s.arabic);
    if (seedFirstSlideWithArabic) {
      parts.push(`  authentic arabic example: "${seedFirstSlideWithArabic.arabic}"`);
      if (seedFirstSlideWithArabic.attribution) {
        parts.push(`  attribution: "${seedFirstSlideWithArabic.attribution}"`);
      }
    }
  }
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
  const slides: Slide[] = slidesRaw.map((s, i) => {
    const attribution = s.attribution?.trim() || fallback?.slides[i]?.attribution;
    // Arabic priority: AI output → seed slide → curated lookup by attribution.
    // The lookup catches the most-common-omission case where the AI gives
    // us a slide with "(QS. Al-Inshirah: 5-6)" but forgets the Arabic.
    const arabic =
      s.arabic?.trim() ||
      fallback?.slides[i]?.arabic ||
      lookupArabicByAttribution(attribution) ||
      undefined;
    return {
      heading: (s.heading ?? "").trim() || (fallback?.slides[i]?.heading ?? `Slide ${i + 1}`),
      body: (s.body ?? "").trim() || (fallback?.slides[i]?.body ?? "Soft Islam in small daily moments."),
      footer: (s.footer ?? "").trim() || labelFooter,
      arabic,
      kicker: s.kicker?.trim() || fallback?.slides[i]?.kicker,
      attribution,
    };
  });
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

function offlineGenerateOne(req: GenerationRequest, index: number, slidesCount: number, batchIndex = index): GeneratedContent {
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
    theme: themeFor(req, meta.category.id, batchIndex),
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
  // System prompt is stable across every batch item — cache it so the
  // 2nd+ requests in a batch pay ~10% input price instead of full.
  const msg = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    system: [
      { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: userPrompt(req, slidesCount, seed) }],
  });
  const u = msg.usage;
  if (process.env.BABYMO_LOG_CACHE === "1") {
    console.log(
      `[cache] item ${index}: write=${u.cache_creation_input_tokens ?? 0} read=${u.cache_read_input_tokens ?? 0} input=${u.input_tokens}`
    );
  }
  // Fire-and-forget usage telemetry — never blocks the response.
  trackUsage({
    inputTokens: u.input_tokens,
    outputTokens: u.output_tokens,
    cacheReadTokens: u.cache_read_input_tokens ?? 0,
    cacheCreationTokens: u.cache_creation_input_tokens ?? 0,
    cacheHit: (u.cache_read_input_tokens ?? 0) > 0,
  }).catch(() => {
    /* never block generation */
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
    theme: themeFor(req, meta.category.id, index),
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
    const run = (i: number) =>
      aiGenerateOne(client, req, i, slidesCount).catch((err: unknown) => {
        console.warn("AI generation failed for one item, falling back:", err);
        return offlineGenerateOne(req, i, slidesCount);
      });
    // Await the first request so it writes the cache for the shared system
    // prompt; then fan out the rest in parallel — those reads cost ~10%.
    // (Parallel calls can't share an in-flight cache write.)
    if (req.batchSize <= 1) {
      items.push(await run(0));
    } else {
      items.push(await run(0));
      const rest = await Promise.all(
        Array.from({ length: req.batchSize - 1 }, (_, i) => run(i + 1))
      );
      items.push(...rest);
    }
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

/**
 * Default weekly plan — year-round backbone. Each weekday has a stable
 * "theme of the day" so the team's grid feels predictable.
 */
const DEFAULT_WEEKLY_PLAN: Array<{ weekday: string; contentTypeId: string; format: FormatId }> = [
  { weekday: "Mon", contentTypeId: "daily-dua", format: "single" },
  { weekday: "Tue", contentTypeId: "gentle-muslim-parenting", format: "carousel" },
  { weekday: "Wed", contentTypeId: "did-you-know", format: "carousel" },
  { weekday: "Thu", contentTypeId: "mini-islamic-story", format: "carousel" },
  { weekday: "Fri", contentTypeId: "friday-reminder", format: "single" },
  { weekday: "Sat", contentTypeId: "muslim-childhood-nostalgia", format: "carousel" },
  { weekday: "Sun", contentTypeId: "before-sleep-series", format: "carousel" },
];

/**
 * Pick the right weekly plan for an Islamic-calendar phase.
 *
 * - ramadan / ramadan-last-ten: every slot is Ramadan content, with the
 *   last-ten window leaning into Lailatul Qadr and Eid prep.
 * - ramadan-approaching: half Ramadan ramp-up + half evergreen.
 * - eid-week: Eid content dominates, with a couple of celebratory
 *   evergreen slots.
 * - none: the default plan.
 */
function planForPhase(phase: IslamicPhase): typeof DEFAULT_WEEKLY_PLAN {
  if (phase === "ramadan-last-ten") {
    return [
      { weekday: "Mon", contentTypeId: "lailatul-qadr",       format: "carousel" },
      { weekday: "Tue", contentTypeId: "ramadan-tarawih",     format: "carousel" },
      { weekday: "Wed", contentTypeId: "lailatul-qadr",       format: "carousel" },
      { weekday: "Thu", contentTypeId: "ramadan-iftar",       format: "single"   },
      { weekday: "Fri", contentTypeId: "ramadan-tarawih",     format: "carousel" },
      { weekday: "Sat", contentTypeId: "lailatul-qadr",       format: "carousel" },
      { weekday: "Sun", contentTypeId: "eid-mubarak",         format: "carousel" },
    ];
  }
  if (phase === "ramadan") {
    return [
      { weekday: "Mon", contentTypeId: "ramadan-sahur",       format: "single"   },
      { weekday: "Tue", contentTypeId: "ramadan-fun-facts",   format: "carousel" },
      { weekday: "Wed", contentTypeId: "ramadan-tarawih",     format: "carousel" },
      { weekday: "Thu", contentTypeId: "ramadan-iftar",       format: "single"   },
      { weekday: "Fri", contentTypeId: "ramadan-first-fast",  format: "carousel" },
      { weekday: "Sat", contentTypeId: "ramadan-sahur",       format: "single"   },
      { weekday: "Sun", contentTypeId: "ramadan-iftar",       format: "single"   },
    ];
  }
  if (phase === "ramadan-approaching") {
    return [
      { weekday: "Mon", contentTypeId: "ramadan-reminder",    format: "carousel" },
      { weekday: "Tue", contentTypeId: "gentle-muslim-parenting", format: "carousel" },
      { weekday: "Wed", contentTypeId: "ramadan-fun-facts",   format: "carousel" },
      { weekday: "Thu", contentTypeId: "mini-islamic-story",  format: "carousel" },
      { weekday: "Fri", contentTypeId: "friday-reminder",     format: "single"   },
      { weekday: "Sat", contentTypeId: "ramadan-first-fast",  format: "carousel" },
      { weekday: "Sun", contentTypeId: "before-sleep-series", format: "carousel" },
    ];
  }
  if (phase === "eid-week") {
    return [
      { weekday: "Mon", contentTypeId: "eid-mubarak",         format: "carousel" },
      { weekday: "Tue", contentTypeId: "muslim-childhood-nostalgia", format: "carousel" },
      { weekday: "Wed", contentTypeId: "eid-mubarak",         format: "carousel" },
      { weekday: "Thu", contentTypeId: "gentle-muslim-parenting", format: "carousel" },
      { weekday: "Fri", contentTypeId: "friday-reminder",     format: "single"   },
      { weekday: "Sat", contentTypeId: "eid-mubarak",         format: "carousel" },
      { weekday: "Sun", contentTypeId: "tiny-heart-talks",    format: "carousel" },
    ];
  }
  return DEFAULT_WEEKLY_PLAN;
}

export interface CalendarMeta {
  /** Hijri context driving this plan — exposed so the UI can show a banner. */
  islamic: ReturnType<typeof getIslamicContext>;
}

export function generateCalendar(
  theme: GenerationRequest["theme"]
): GeneratedContent[] & { meta?: CalendarMeta } {
  const ctx = getIslamicContext();
  const plan = planForPhase(ctx.phase);

  const out: GeneratedContent[] = [];
  for (let day = 0; day < 30; day++) {
    const slot = plan[day % 7];
    const req: GenerationRequest = { contentTypeId: slot.contentTypeId, format: slot.format, theme, batchSize: 1 };
    const slidesCount = FORMATS.find((f) => f.id === slot.format)!.defaultSlides;
    out.push(offlineGenerateOne(req, day, slidesCount));
  }
  // Attach the meta as a non-enumerable property so callers that want
  // the Islamic context can grab it without changing the public shape.
  (out as GeneratedContent[] & { meta?: CalendarMeta }).meta = { islamic: ctx };
  return out as GeneratedContent[] & { meta?: CalendarMeta };
}
