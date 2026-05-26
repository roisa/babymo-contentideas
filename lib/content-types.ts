export type FormatId = "single" | "carousel" | "reels";

export interface FormatSpec {
  id: FormatId;
  name: string;
  description: string;
  width: number;
  height: number;
  defaultSlides: number;
  minSlides: number;
  maxSlides: number;
}

export const FORMATS: FormatSpec[] = [
  {
    id: "single",
    name: "Single Post",
    description: "One emotional square. 1080×1080.",
    width: 1080,
    height: 1080,
    defaultSlides: 1,
    minSlides: 1,
    maxSlides: 1,
  },
  {
    id: "carousel",
    name: "Carousel Slides",
    description: "Storytelling sequence. 1080×1080.",
    width: 1080,
    height: 1080,
    defaultSlides: 5,
    minSlides: 3,
    maxSlides: 8,
  },
  {
    id: "reels",
    name: "Reels Slides",
    description: "Vertical 1080×1920, subtitle-safe.",
    width: 1080,
    height: 1920,
    defaultSlides: 4,
    minSlides: 2,
    maxSlides: 6,
  },
];

export type CategoryId =
  | "daily-islamic"
  | "emotional-childhood"
  | "parenting"
  | "kids-educational"
  | "interactive"
  | "story"
  | "reels"
  | "ramadan";

/**
 * Per-content-type metadata. This is the SINGLE SOURCE OF TRUTH for
 * everything keyed by content type ID: label, hint, format, tone,
 * theme alternates, and the beat-aware pose track.
 *
 * `lib/themes.ts` derives THEMES_BY_CONTENT_TYPE from the optional
 * `themeAlternates`; `lib/poses-pure.ts` derives CONTENT_TYPE_OVERRIDES
 * from the optional `poseTrack`. Adding a new content type now happens
 * in one place — everything else is derived.
 *
 * (Themes/poses are typed loosely as string[] here to avoid a circular
 *  type import. The derived constants in themes.ts / poses-pure.ts
 *  cast to their proper enums.)
 */
export interface ContentType {
  id: string;
  label: string;
  hint: string;
  suggestedFormat: FormatId;
  tone: string;
  /** Mood-fit theme alternates. Rotates across a batch. Falls back to
   *  the category's `themeFallback` when omitted. */
  themeAlternates?: string[];
  /** Per-content-type beat-aware pose track. Override of the
   *  category-level POSES_BY_CATEGORY. Falls back to the category
   *  track when omitted. */
  poseTrack?: string[];
}

/**
 * Per-category defaults: applied when a ContentType doesn't override.
 *
 * `iconicPoses` are used for single-slide posts (Daily Dua, Mama
 * Reflection, etc.). `categoryPoseTrack` is the 5-beat carousel
 * default. `themeFallback` is the mood family for the category.
 */
export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  /** Suggested character pose + placement hint, shown in the slide as a dashed reservation zone for the design team. */
  pose: { hint: string; position: "br" | "bl" | "tr" | "tl" | "right" | "bottom" };
  /** Theme alternates when a ContentType has none of its own. */
  themeFallback?: string[];
  /** 5-beat carousel pose track (HOOK→CURIOSITY→REVEAL→FAQ→CTA). */
  categoryPoseTrack?: string[];
  /** Iconic poses for single-slide posts in this category. The first is
   *  canonical; the rest rotate across a batch for variety. */
  iconicPoses?: string[];
  types: ContentType[];
}

export const CATEGORIES: Category[] = [
  {
    id: "daily-islamic",
    name: "Daily Islamic",
    description: "Soft daily touches of faith.",
    icon: "moon",
    pose: { hint: "baby mo · hands raised in dua", position: "br" },
    themeFallback: ["cream-sand", "peach-apricot", "mint-garden"],
    categoryPoseTrack: [
      "baby-mo-idea.png",
      "baby-mo-pose-05.png",
      "baby-mo-thank-you.png",
      "baby-mo-pose-12.png",
      "baby-mo-pose-17.png",
    ],
    iconicPoses: ["baby-mo-thank-you.png", "baby-mo-pose-12.png", "baby-mo-pose-17.png"],
    types: [
      { id: "daily-dua", label: "Daily Dua", hint: "A short bedtime or morning dua.", suggestedFormat: "single", tone: "calm, intimate",
        themeAlternates: ["cream-sand", "peach-apricot", "cloud-day"] },
      { id: "quran-ayah", label: "Quran Ayah", hint: "A gentle ayah with reflection.", suggestedFormat: "carousel", tone: "reverent, soft",
        themeAlternates: ["cream-sand", "lavender-night"] },
      { id: "hadith-motivation", label: "Hadith Motivation", hint: "A warm hadith with a takeaway.", suggestedFormat: "carousel", tone: "encouraging",
        themeAlternates: ["mint-garden", "cream-sand"] },
      { id: "friday-reminder", label: "Friday Reminder", hint: "A Jumuah ritual or salawat nudge.", suggestedFormat: "single", tone: "warm, ceremonial",
        themeAlternates: ["sunny-yellow", "mint-garden"] },
      { id: "ramadan-reminder", label: "Ramadan Reminder", hint: "A small Ramadan habit or feeling.", suggestedFormat: "carousel", tone: "cozy, anticipatory",
        themeAlternates: ["lavender-night", "peach-apricot"] },
      { id: "dhikr-reminder", label: "Dhikr Reminder", hint: "A breath, a phrase, a moment.", suggestedFormat: "single", tone: "still, soothing",
        themeAlternates: ["cream-sand", "peach-apricot"] },
    ],
  },
  {
    id: "emotional-childhood",
    name: "Emotional Childhood",
    description: "Tender, nostalgic, child-centered.",
    icon: "heart",
    pose: { hint: "baby mo · curled up with blanket", position: "br" },
    themeFallback: ["peach-apricot", "coral-pink", "cream-sand"],
    categoryPoseTrack: [
      "baby-mo-alright.png",
      "baby-mo-pose-39.png",
      "baby-mo-pose-28.png",
      "baby-mo-pose-07.png",
      "baby-mo-pose-21.png",
    ],
    iconicPoses: ["baby-mo-alright.png", "baby-mo-pose-07.png", "baby-mo-pose-28.png"],
    types: [
      { id: "tiny-heart-talks", label: "Tiny Heart Talks", hint: "A whisper between mama & child.", suggestedFormat: "carousel", tone: "tender, intimate",
        themeAlternates: ["peach-apricot", "coral-pink"] },
      { id: "dear-little-muslim", label: "Dear Little Muslim", hint: "A letter to the child.", suggestedFormat: "carousel", tone: "letter, hopeful",
        themeAlternates: ["peach-apricot", "cream-sand"] },
      { id: "before-sleep-series", label: "Before Sleep Series", hint: "A bedtime moment of calm.", suggestedFormat: "carousel", tone: "lullaby",
        themeAlternates: ["lavender-night", "sky-blue"] },
      { id: "tiny-tafakkur", label: "Tiny Tafakkur", hint: "A small reflection on Allah's signs.", suggestedFormat: "single", tone: "wonderous, quiet",
        themeAlternates: ["sky-blue", "cloud-day"] },
      { id: "muslim-childhood-nostalgia", label: "Muslim Childhood Nostalgia", hint: "Cozy memories: grandma, mosques, kuih.", suggestedFormat: "carousel", tone: "nostalgic",
        themeAlternates: ["peach-apricot", "cream-sand"] },
    ],
  },
  {
    id: "parenting",
    name: "Parenting",
    description: "For mama & ayah.",
    icon: "home",
    pose: { hint: "baby mo · being held / cuddled", position: "bl" },
    themeFallback: ["mint-garden", "peach-apricot", "cream-sand"],
    categoryPoseTrack: [
      "baby-mo-alright.png",
      "baby-mo-pose-22.png",
      "baby-mo-ok.png",
      "baby-mo-pose-15.png",
      "baby-mo-pose-25.png",
    ],
    iconicPoses: ["baby-mo-ok.png", "baby-mo-pose-21.png", "baby-mo-pose-25.png"],
    types: [
      { id: "gentle-muslim-parenting", label: "Gentle Muslim Parenting", hint: "Soft, attuned parenting tips.", suggestedFormat: "carousel", tone: "warm, validating",
        themeAlternates: ["mint-garden", "peach-apricot"] },
      { id: "mama-reflection", label: "Mama Reflection", hint: "An emotional reflection from a mother.", suggestedFormat: "single", tone: "honest, soft",
        themeAlternates: ["peach-apricot", "coral-pink"],
        poseTrack: ["baby-mo-pose-21.png", "baby-mo-pose-07.png", "baby-mo-thank-you.png"] },
      { id: "ayah-series", label: "Ayah Series", hint: "The quiet love of a father.", suggestedFormat: "carousel", tone: "steady, tender",
        themeAlternates: ["cream-sand", "sky-blue"] },
      { id: "emotional-parenting-reminder", label: "Emotional Parenting Reminder", hint: "A grounding reminder.", suggestedFormat: "single", tone: "validating",
        themeAlternates: ["cream-sand", "peach-apricot"] },
    ],
  },
  {
    id: "kids-educational",
    name: "Kids Educational",
    description: "Wonder + learning.",
    icon: "sparkles",
    pose: { hint: "baby mo · curious, pointing up", position: "br" },
    themeFallback: ["sunny-yellow", "sky-blue", "mint-garden"],
    categoryPoseTrack: [
      "baby-mo-idea.png",
      "baby-mo-pose-22.png",
      "baby-mo-wow.png",
      "baby-mo-pose-08.png",
      "baby-mo-yes.png",
    ],
    iconicPoses: ["baby-mo-idea.png", "baby-mo-pose-22.png", "baby-mo-wow.png"],
    types: [
      { id: "did-you-know", label: "Did You Know", hint: "A fascinating Islamic fact.", suggestedFormat: "carousel", tone: "curious, playful",
        themeAlternates: ["sunny-yellow", "sky-blue"] },
      { id: "allahs-creation", label: "Allah's Creation Series", hint: "A wonder of Allah's signs in creation.", suggestedFormat: "carousel", tone: "awe, wonder",
        themeAlternates: ["sky-blue", "mint-garden"] },
      { id: "arabic-word-of-the-day", label: "Arabic Word of the Day", hint: "One Arabic word + meaning + use.", suggestedFormat: "single", tone: "educational, simple",
        themeAlternates: ["sunny-yellow", "cream-sand"] },
      { id: "islamic-fun-facts", label: "Islamic Fun Facts", hint: "A playful Islamic fact.", suggestedFormat: "carousel", tone: "playful",
        themeAlternates: ["sunny-yellow", "coral-pink"] },
      { id: "tiny-sahabah-stories", label: "Tiny Sahabah Stories", hint: "A short story of a companion.", suggestedFormat: "carousel", tone: "story, gentle",
        themeAlternates: ["cream-sand", "mint-garden"] },
      { id: "kisah-nabi", label: "Kisah Nabi", hint: "A prophet's story in kid-friendly format.", suggestedFormat: "carousel", tone: "story, awe",
        themeAlternates: ["cream-sand", "lavender-night"],
        poseTrack: ["baby-mo-pose-11.png", "baby-mo-pose-39.png", "baby-mo-wow.png", "baby-mo-pose-12.png", "baby-mo-thank-you.png"] },
      { id: "pertanyaan-sahabat-mo", label: "Pertanyaan Sahabat Mo", hint: "Common kids' questions about Islam, gently answered.", suggestedFormat: "carousel", tone: "curious, warm",
        themeAlternates: ["sky-blue", "sunny-yellow"],
        poseTrack: ["baby-mo-pose-22.png", "baby-mo-pose-23.png", "baby-mo-idea.png", "baby-mo-ok.png", "baby-mo-pose-21.png"] },
      { id: "adab-hari-ini", label: "Adab Hari Ini", hint: "One specific adab per piece, with scene + practice.", suggestedFormat: "carousel", tone: "playful, instructive",
        themeAlternates: ["mint-garden", "sunny-yellow"],
        poseTrack: ["baby-mo-pose-34.png", "baby-mo-pose-22.png", "baby-mo-pose-15.png", "baby-mo-pose-21.png", "baby-mo-pose-25.png"] },
    ],
  },
  {
    id: "interactive",
    name: "Interactive",
    description: "Comment + share prompts.",
    icon: "message",
    pose: { hint: "baby mo · thinking, finger on chin", position: "br" },
    themeFallback: ["coral-pink", "sunny-yellow", "sky-blue"],
    categoryPoseTrack: [
      "baby-mo-idea.png",
      "baby-mo-pose-22.png",
      "baby-mo-yeyy.png",
      "baby-mo-pose-21.png",
      "baby-mo-pose-35.png",
    ],
    iconicPoses: ["baby-mo-yeyy.png", "baby-mo-pose-35.png", "baby-mo-pose-37.png"],
    types: [
      { id: "guess-the-sunnah", label: "Guess The Sunnah", hint: "A guess-the-Sunnah quiz.", suggestedFormat: "carousel", tone: "playful, curious",
        themeAlternates: ["coral-pink", "sunny-yellow"] },
      { id: "finish-the-dua", label: "Finish The Dua", hint: "Fill-in-the-blank dua moment.", suggestedFormat: "single", tone: "interactive",
        themeAlternates: ["sunny-yellow", "mint-garden"] },
      { id: "spot-the-adab", label: "Spot The Adab", hint: "Find the adab in this scene.", suggestedFormat: "carousel", tone: "fun, teaching",
        themeAlternates: ["mint-garden", "sky-blue"] },
      { id: "tiny-sunnah-missions", label: "Tiny Sunnah Missions", hint: "A small Sunnah challenge for kids.", suggestedFormat: "single", tone: "encouraging",
        themeAlternates: ["coral-pink", "sunny-yellow"] },
      { id: "this-or-that-muslim-kid", label: "This or That: Muslim Kid Edition", hint: "Cozy this-or-that choices.", suggestedFormat: "single", tone: "playful",
        themeAlternates: ["coral-pink", "sky-blue"] },
    ],
  },
  {
    id: "story",
    name: "Story Content",
    description: "Mini stories that move hearts.",
    icon: "book",
    pose: { hint: "baby mo · listening / wide-eyed", position: "br" },
    themeFallback: ["sky-blue", "cream-sand", "mint-garden"],
    categoryPoseTrack: [
      "baby-mo-pose-11.png",
      "baby-mo-pose-06.png",
      "baby-mo-wow.png",
      "baby-mo-pose-12.png",
      "baby-mo-pose-21.png",
    ],
    iconicPoses: ["baby-mo-pose-11.png", "baby-mo-pose-06.png", "baby-mo-pose-18.png"],
    types: [
      { id: "mini-islamic-story", label: "Mini Islamic Story Slides", hint: "A 4-5 slide gentle story.", suggestedFormat: "carousel", tone: "story, warm",
        themeAlternates: ["sky-blue", "mint-garden"] },
      { id: "what-would-prophet-do", label: "What Would Prophet Muhammad ﷺ Do?", hint: "A scenario + prophetic response.", suggestedFormat: "carousel", tone: "respectful, instructive",
        themeAlternates: ["cream-sand", "sky-blue"],
        poseTrack: ["baby-mo-pose-22.png", "baby-mo-pose-27.png", "baby-mo-thank-you.png", "baby-mo-pose-15.png", "baby-mo-pose-25.png"] },
      { id: "emotional-story-carousel", label: "Emotional Story Carousel", hint: "A short emotional narrative.", suggestedFormat: "carousel", tone: "emotional, hopeful",
        themeAlternates: ["lavender-night", "peach-apricot"],
        poseTrack: ["baby-mo-pose-39.png", "baby-mo-pose-38.png", "baby-mo-thank-you.png", "baby-mo-pose-28.png", "baby-mo-pose-21.png"] },
    ],
  },
  {
    id: "reels",
    name: "Reels Content",
    description: "Vertical hook-driven.",
    icon: "film",
    pose: { hint: "baby mo · POV close-up", position: "bottom" },
    themeFallback: ["coral-pink", "peach-apricot", "sunny-yellow"],
    categoryPoseTrack: [
      "baby-mo-pose-29.png",
      "baby-mo-pose-32.png",
      "baby-mo-wow.png",
      "baby-mo-pose-42.png",
      "baby-mo-run.png",
    ],
    iconicPoses: ["baby-mo-run.png", "baby-mo-pose-32.png", "baby-mo-pose-42.png"],
    types: [
      { id: "pov-muslim-childhood", label: "POV Muslim Childhood", hint: "POV-style cozy childhood scene.", suggestedFormat: "reels", tone: "nostalgic, intimate",
        themeAlternates: ["peach-apricot", "lavender-night"],
        poseTrack: ["baby-mo-pose-28.png", "baby-mo-pose-18.png", "baby-mo-pose-06.png", "baby-mo-pose-11.png", "baby-mo-pose-12.png"] },
      { id: "soft-islamic-affirmations", label: "Soft Islamic Affirmations", hint: "Gentle, calming affirmations.", suggestedFormat: "reels", tone: "affirming",
        themeAlternates: ["peach-apricot", "cream-sand"],
        poseTrack: ["baby-mo-pose-07.png", "baby-mo-pose-28.png", "baby-mo-thank-you.png", "baby-mo-alright.png", "baby-mo-pose-21.png"] },
      { id: "five-second-habit", label: "5-Second Islamic Habit", hint: "A tiny habit, fast hook.", suggestedFormat: "reels", tone: "punchy, soft",
        themeAlternates: ["coral-pink", "sunny-yellow"],
        poseTrack: ["baby-mo-idea.png", "baby-mo-pose-08.png", "baby-mo-yes.png", "baby-mo-run.png", "baby-mo-pose-21.png"] },
      { id: "cozy-islamic-reels", label: "Cozy Islamic Reels", hint: "Cozy mood reel script.", suggestedFormat: "reels", tone: "cozy, ambient",
        themeAlternates: ["lavender-night", "cream-sand"],
        poseTrack: ["baby-mo-pose-06.png", "baby-mo-pose-28.png", "baby-mo-pose-11.png", "baby-mo-thank-you.png", "baby-mo-pose-12.png"] },
    ],
  },
  {
    id: "ramadan",
    name: "Ramadan & Eid",
    description: "Sahur, iftar, tarawih, Lailatul Qadr, first fast, Eid — for the holiest month.",
    icon: "moon",
    pose: { hint: "baby mo · hands raised in dua at iftar", position: "br" },
    themeFallback: ["cream-sand", "lavender-night", "peach-apricot"],
    categoryPoseTrack: [
      "baby-mo-pose-05.png",
      "baby-mo-pose-12.png",
      "baby-mo-thank-you.png",
      "baby-mo-pose-17.png",
      "baby-mo-yeyy.png",
    ],
    iconicPoses: ["baby-mo-thank-you.png", "baby-mo-pose-12.png", "baby-mo-pose-17.png"],
    types: [
      { id: "ramadan-sahur", label: "Sahur Moment", hint: "A cozy pre-dawn meal moment + doa.", suggestedFormat: "single", tone: "intimate, sleepy-warm",
        themeAlternates: ["lavender-night", "cream-sand"],
        poseTrack: ["baby-mo-pose-06.png", "baby-mo-pose-12.png", "baby-mo-thank-you.png"] },
      { id: "ramadan-iftar", label: "Iftar Moment", hint: "Breaking the fast with doa berbuka.", suggestedFormat: "single", tone: "joyful, grateful",
        themeAlternates: ["peach-apricot", "cream-sand"],
        poseTrack: ["baby-mo-pose-05.png", "baby-mo-thank-you.png", "baby-mo-yeyy.png"] },
      { id: "ramadan-tarawih", label: "Tarawih Reminder", hint: "About tarawih, family + mosque scene.", suggestedFormat: "carousel", tone: "warm, communal",
        themeAlternates: ["lavender-night", "cream-sand"],
        poseTrack: ["baby-mo-pose-11.png", "baby-mo-pose-12.png", "baby-mo-thank-you.png", "baby-mo-pose-17.png", "baby-mo-pose-21.png"] },
      { id: "ramadan-first-fast", label: "First Fast Story", hint: "A kid trying their first fast — emotional arc.", suggestedFormat: "carousel", tone: "tender, encouraging",
        themeAlternates: ["peach-apricot", "coral-pink"],
        poseTrack: ["baby-mo-pose-22.png", "baby-mo-pose-39.png", "baby-mo-pose-05.png", "baby-mo-yeyy.png", "baby-mo-pose-21.png"] },
      { id: "ramadan-fun-facts", label: "Ramadan Fun Facts", hint: "Curious facts about Ramadan for kids.", suggestedFormat: "carousel", tone: "playful, curious",
        themeAlternates: ["sunny-yellow", "mint-garden"],
        poseTrack: ["baby-mo-idea.png", "baby-mo-pose-22.png", "baby-mo-wow.png", "baby-mo-pose-08.png", "baby-mo-pose-35.png"] },
      { id: "lailatul-qadr", label: "Lailatul Qadr Kids", hint: "Night of Power explained kid-friendly.", suggestedFormat: "carousel", tone: "reverent, awe",
        themeAlternates: ["lavender-night", "cream-sand"],
        poseTrack: ["baby-mo-pose-18.png", "baby-mo-pose-28.png", "baby-mo-thank-you.png", "baby-mo-pose-17.png", "baby-mo-pose-12.png"] },
      { id: "eid-mubarak", label: "Eid Mubarak", hint: "Eid prep, takbir night, joy of meeting again.", suggestedFormat: "carousel", tone: "celebratory, warm",
        themeAlternates: ["coral-pink", "sunny-yellow"],
        poseTrack: ["baby-mo-pose-11.png", "baby-mo-thank-you.png", "baby-mo-yeyy.png", "baby-mo-pose-35.png", "baby-mo-pose-37.png"] },
    ],
  },
];

/* ============================================================
 * DERIVED ACCESSORS — these collapse the inline data above into
 * the shape the rest of the codebase expects. Don't add data here;
 * add it inline in CATEGORIES above.
 * ============================================================ */

/** Per-content-type theme alternates. Falls back to `themesForCategory`. */
export const THEMES_BY_CONTENT_TYPE: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.flatMap((c) =>
    c.types
      .filter((t) => t.themeAlternates && t.themeAlternates.length > 0)
      .map((t) => [t.id, t.themeAlternates!])
  )
);

/** Per-category theme fallbacks (used when a ContentType has no themeAlternates). */
export const THEMES_BY_CATEGORY: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.filter((c) => c.themeFallback && c.themeFallback.length > 0).map((c) => [
    c.id,
    c.themeFallback!,
  ])
);

/** Per-content-type beat-aware pose track. Sparse — only types that
 *  override their category's default appear here. */
export const CONTENT_TYPE_POSE_OVERRIDES: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.flatMap((c) =>
    c.types
      .filter((t) => t.poseTrack && t.poseTrack.length > 0)
      .map((t) => [t.id, t.poseTrack!])
  )
);

/** Per-category 5-beat carousel pose track. */
export const POSES_BY_CATEGORY: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.filter((c) => c.categoryPoseTrack && c.categoryPoseTrack.length > 0).map((c) => [
    c.id,
    c.categoryPoseTrack!,
  ])
);

/** Per-category iconic poses for single-slide posts (rotates across a batch). */
export const ICONIC_POSES: Record<string, string[]> = Object.fromEntries(
  CATEGORIES.filter((c) => c.iconicPoses && c.iconicPoses.length > 0).map((c) => [
    c.id,
    c.iconicPoses!,
  ])
);

export function findContentType(id: string): { category: Category; type: ContentType } | null {
  for (const c of CATEGORIES) {
    const t = c.types.find((tt) => tt.id === id);
    if (t) return { category: c, type: t };
  }
  return null;
}

export const STORY_STYLES = [
  {
    id: "style-a",
    name: "Style A — Emotional Hook",
    description: "Hook → Relatable situation → Islamic reflection → Comforting insight → CTA",
    blueprint: ["emotional hook", "relatable situation", "Islamic reflection", "comforting insight", "save / share CTA"],
  },
  {
    id: "style-b",
    name: "Style B — Question → Insight",
    description: "Question → Emotional struggle → Quran/Hadith insight → Practical takeaway → Save CTA",
    blueprint: ["question", "emotional struggle", "Quran or hadith insight", "practical takeaway", "save / share CTA"],
  },
  {
    id: "style-c",
    name: "Style C — Mini Story",
    description: "Mini story format for children.",
    blueprint: ["once upon a time", "tiny conflict", "gentle wisdom", "warm ending", "lesson + CTA"],
  },
] as const;

export type StoryStyleId = (typeof STORY_STYLES)[number]["id"];
