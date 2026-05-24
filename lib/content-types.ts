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
  | "reels";

export interface ContentType {
  id: string;
  label: string;
  hint: string;
  suggestedFormat: FormatId;
  tone: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  types: ContentType[];
}

export const CATEGORIES: Category[] = [
  {
    id: "daily-islamic",
    name: "Daily Islamic",
    description: "Soft daily touches of faith.",
    icon: "moon",
    types: [
      { id: "daily-dua", label: "Daily Dua", hint: "A short bedtime or morning dua.", suggestedFormat: "single", tone: "calm, intimate" },
      { id: "quran-ayah", label: "Quran Ayah", hint: "A gentle ayah with reflection.", suggestedFormat: "carousel", tone: "reverent, soft" },
      { id: "hadith-motivation", label: "Hadith Motivation", hint: "A warm hadith with a takeaway.", suggestedFormat: "carousel", tone: "encouraging" },
      { id: "friday-reminder", label: "Friday Reminder", hint: "A Jumuah ritual or salawat nudge.", suggestedFormat: "single", tone: "warm, ceremonial" },
      { id: "ramadan-reminder", label: "Ramadan Reminder", hint: "A small Ramadan habit or feeling.", suggestedFormat: "carousel", tone: "cozy, anticipatory" },
      { id: "dhikr-reminder", label: "Dhikr Reminder", hint: "A breath, a phrase, a moment.", suggestedFormat: "single", tone: "still, soothing" },
    ],
  },
  {
    id: "emotional-childhood",
    name: "Emotional Childhood",
    description: "Tender, nostalgic, child-centered.",
    icon: "heart",
    types: [
      { id: "tiny-heart-talks", label: "Tiny Heart Talks", hint: "A whisper between mama & child.", suggestedFormat: "carousel", tone: "tender, intimate" },
      { id: "dear-little-muslim", label: "Dear Little Muslim", hint: "A letter to the child.", suggestedFormat: "carousel", tone: "letter, hopeful" },
      { id: "before-sleep-series", label: "Before Sleep Series", hint: "A bedtime moment of calm.", suggestedFormat: "carousel", tone: "lullaby" },
      { id: "tiny-tafakkur", label: "Tiny Tafakkur", hint: "A small reflection on Allah's signs.", suggestedFormat: "single", tone: "wonderous, quiet" },
      { id: "muslim-childhood-nostalgia", label: "Muslim Childhood Nostalgia", hint: "Cozy memories: grandma, mosques, kuih.", suggestedFormat: "carousel", tone: "nostalgic" },
    ],
  },
  {
    id: "parenting",
    name: "Parenting",
    description: "For mama & ayah.",
    icon: "home",
    types: [
      { id: "gentle-muslim-parenting", label: "Gentle Muslim Parenting", hint: "Soft, attuned parenting tips.", suggestedFormat: "carousel", tone: "warm, validating" },
      { id: "mama-reflection", label: "Mama Reflection", hint: "An emotional reflection from a mother.", suggestedFormat: "single", tone: "honest, soft" },
      { id: "ayah-series", label: "Ayah Series", hint: "The quiet love of a father.", suggestedFormat: "carousel", tone: "steady, tender" },
      { id: "emotional-parenting-reminder", label: "Emotional Parenting Reminder", hint: "A grounding reminder.", suggestedFormat: "single", tone: "validating" },
    ],
  },
  {
    id: "kids-educational",
    name: "Kids Educational",
    description: "Wonder + learning.",
    icon: "sparkles",
    types: [
      { id: "did-you-know", label: "Did You Know", hint: "A fascinating Islamic fact.", suggestedFormat: "carousel", tone: "curious, playful" },
      { id: "allahs-creation", label: "Allah's Creation Series", hint: "A wonder of Allah's signs in creation.", suggestedFormat: "carousel", tone: "awe, wonder" },
      { id: "arabic-word-of-the-day", label: "Arabic Word of the Day", hint: "One Arabic word + meaning + use.", suggestedFormat: "single", tone: "educational, simple" },
      { id: "islamic-fun-facts", label: "Islamic Fun Facts", hint: "A playful Islamic fact.", suggestedFormat: "carousel", tone: "playful" },
      { id: "tiny-sahabah-stories", label: "Tiny Sahabah Stories", hint: "A short story of a companion.", suggestedFormat: "carousel", tone: "story, gentle" },
    ],
  },
  {
    id: "interactive",
    name: "Interactive",
    description: "Comment + share prompts.",
    icon: "message",
    types: [
      { id: "guess-the-sunnah", label: "Guess The Sunnah", hint: "A guess-the-Sunnah quiz.", suggestedFormat: "carousel", tone: "playful, curious" },
      { id: "finish-the-dua", label: "Finish The Dua", hint: "Fill-in-the-blank dua moment.", suggestedFormat: "single", tone: "interactive" },
      { id: "spot-the-adab", label: "Spot The Adab", hint: "Find the adab in this scene.", suggestedFormat: "carousel", tone: "fun, teaching" },
      { id: "tiny-sunnah-missions", label: "Tiny Sunnah Missions", hint: "A small Sunnah challenge for kids.", suggestedFormat: "single", tone: "encouraging" },
      { id: "this-or-that-muslim-kid", label: "This or That: Muslim Kid Edition", hint: "Cozy this-or-that choices.", suggestedFormat: "single", tone: "playful" },
    ],
  },
  {
    id: "story",
    name: "Story Content",
    description: "Mini stories that move hearts.",
    icon: "book",
    types: [
      { id: "mini-islamic-story", label: "Mini Islamic Story Slides", hint: "A 4-5 slide gentle story.", suggestedFormat: "carousel", tone: "story, warm" },
      { id: "what-would-prophet-do", label: "What Would Prophet Muhammad ﷺ Do?", hint: "A scenario + prophetic response.", suggestedFormat: "carousel", tone: "respectful, instructive" },
      { id: "emotional-story-carousel", label: "Emotional Story Carousel", hint: "A short emotional narrative.", suggestedFormat: "carousel", tone: "emotional, hopeful" },
    ],
  },
  {
    id: "reels",
    name: "Reels Content",
    description: "Vertical hook-driven.",
    icon: "film",
    types: [
      { id: "pov-muslim-childhood", label: "POV Muslim Childhood", hint: "POV-style cozy childhood scene.", suggestedFormat: "reels", tone: "nostalgic, intimate" },
      { id: "soft-islamic-affirmations", label: "Soft Islamic Affirmations", hint: "Gentle, calming affirmations.", suggestedFormat: "reels", tone: "affirming" },
      { id: "five-second-habit", label: "5-Second Islamic Habit", hint: "A tiny habit, fast hook.", suggestedFormat: "reels", tone: "punchy, soft" },
      { id: "cozy-islamic-reels", label: "Cozy Islamic Reels", hint: "Cozy mood reel script.", suggestedFormat: "reels", tone: "cozy, ambient" },
    ],
  },
];

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
