import type { FormatId } from "./content-types";
import type { ThemeId } from "./themes";

export interface Slide {
  heading: string;
  body: string;
  footer?: string;
  arabic?: string;
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
