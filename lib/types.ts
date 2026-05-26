import type { FormatId } from "./content-types";
import type { ThemeId } from "./themes";

export interface Slide {
  /** The big colored display title (with white stroke). Bold, kid-friendly, 1-3 lines. */
  heading: string;
  /** The body text inside the white rounded card. */
  body: string;
  /** Optional Arabic line inside the body card. */
  arabic?: string;
  /** Hadith / Quran attribution shown at the bottom of the body card, e.g. "HR. Bukhari 1429". */
  attribution?: string;
  /** Optional small label inside the body card before the body, e.g. "Catatan Hari Ini:". */
  kicker?: string;
  /** Legacy field kept for backwards-compat with older saved content. */
  footer?: string;
}

export interface GeneratedContent {
  id: string;
  createdAt: number;
  contentTypeId: string;
  contentTypeLabel: string;
  categoryId: string;
  format: FormatId;
  theme: ThemeId;
  storyStyle?: string;
  title: string;
  hook: string;
  caption: string;
  hashtags: string[];
  cta: string;
  slides: Slide[];
}

export interface GenerationRequest {
  contentTypeId: string;
  format: FormatId;
  theme: ThemeId;
  /** When true, ignore `theme` and pick one per item via suggestTheme(). */
  autoTheme?: boolean;
  batchSize: number;
  storyStyle?: string;
  customPrompt?: string;
}

export interface CalendarDay {
  day: number;
  weekday: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  contentTypeId: string;
  contentTypeLabel: string;
  categoryId: string;
  format: FormatId;
  title: string;
  hook: string;
}
