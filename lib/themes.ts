/**
 * Themes match the actual published @babymo.official aesthetic:
 * bright, kid-friendly, 3D-scene backgrounds.
 * Each theme has:
 *   - gradient: 3-stop background gradient (full-bleed scene placeholder)
 *   - title:    bold display title color (pink/red/blue/etc — the "sticker" text)
 *   - titleStroke: white stroke around the title for that 3D sticker look
 *   - ink:      body text color (on white card)
 *   - card:     body card background
 *   - accent:   decorative shapes (stars, sparkles, clouds)
 *   - sceneHint: a tiny english hint for the designer ("garden", "bedroom", etc)
 */

export type ThemeId =
  | "coral-pink"
  | "sky-blue"
  | "mint-garden"
  | "sunny-yellow"
  | "peach-apricot"
  | "lavender-night"
  | "cream-sand"
  | "cloud-day";

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  gradient: [string, string, string];
  title: string;
  titleStroke: string;
  ink: string;
  muted: string;
  accent: string;
  card: string;
  /** Optional soft tint for the body card (matches the published @babymo.official look). */
  cardBody?: string;
  footer: string;
  mood: "light" | "dark";
  sceneHint: string;
}

export const THEMES: Theme[] = [
  {
    id: "coral-pink",
    name: "Coral Pink",
    description: "Yuk, belajar! Bright pink, sticker-style.",
    gradient: ["#FFD7E2", "#FFB5C8", "#F87BAB"],
    title: "#E2447E",
    titleStroke: "#FFFFFF",
    ink: "#3A1B2A",
    muted: "#7A4B61",
    accent: "#FFD93D",
    card: "#FFFFFF",
    cardBody: "#FFF6F9",
    footer: "#7A4B61",
    mood: "light",
    sceneHint: "pink room / soft cloud scene",
  },
  {
    id: "sky-blue",
    name: "Sky Blue",
    description: "Cloud day, classroom morning.",
    gradient: ["#DCEEFF", "#B6DBFF", "#88C0F2"],
    title: "#2E7BC4",
    titleStroke: "#FFFFFF",
    ink: "#13345A",
    muted: "#4A6B8C",
    accent: "#FFE066",
    card: "#FFFFFF",
    cardBody: "#F2F8FF",
    footer: "#4A6B8C",
    mood: "light",
    sceneHint: "blue sky + clouds + sun",
  },
  {
    id: "mint-garden",
    name: "Mint Garden",
    description: "Outdoor garden, soft mint grass.",
    gradient: ["#E6F4D8", "#C4E29A", "#92C76B"],
    title: "#2E8B57",
    titleStroke: "#FFFFFF",
    ink: "#1E3A1E",
    muted: "#4F7048",
    accent: "#FFD93D",
    card: "#FFFFFF",
    cardBody: "#F4FAEC",
    footer: "#4F7048",
    mood: "light",
    sceneHint: "garden / outdoor / grass + sky",
  },
  {
    id: "sunny-yellow",
    name: "Sunny Yellow",
    description: "Sunshine kitchen, warm appetit.",
    gradient: ["#FFF1B8", "#FFE066", "#FFC83D"],
    title: "#D9622E",
    titleStroke: "#FFFFFF",
    ink: "#3A2310",
    muted: "#7A532A",
    accent: "#FF8FB0",
    card: "#FFFFFF",
    cardBody: "#FFF9E4",
    footer: "#7A532A",
    mood: "light",
    sceneHint: "kitchen / dining table morning",
  },
  {
    id: "peach-apricot",
    name: "Peach Apricot",
    description: "Cozy peach, adab learning.",
    gradient: ["#FFE0CC", "#FFC1A0", "#FF9F76"],
    title: "#C4592E",
    titleStroke: "#FFFFFF",
    ink: "#3A1B0F",
    muted: "#7A4A2F",
    accent: "#7AC4D9",
    card: "#FFFFFF",
    cardBody: "#FFF4EC",
    footer: "#7A4A2F",
    mood: "light",
    sceneHint: "warm interior / wooden room",
  },
  {
    id: "lavender-night",
    name: "Lavender Night",
    description: "Bedtime, stars, bintang jatuh.",
    gradient: ["#5B4A8C", "#3E2E6E", "#262050"],
    title: "#FFD93D",
    titleStroke: "#3E2E6E",
    ink: "#26203F",
    muted: "#7B7AAA",
    accent: "#FFD93D",
    card: "#FFFFFF",
    cardBody: "#FFFCF0",
    footer: "#C4C0E0",
    mood: "dark",
    sceneHint: "bedroom at night / stars",
  },
  {
    id: "cream-sand",
    name: "Cream Sand",
    description: "Tafakkur, soft beige study.",
    gradient: ["#FBF3E0", "#F0E0BF", "#DEC58E"],
    title: "#B8862C",
    titleStroke: "#FFFFFF",
    ink: "#3A2E10",
    muted: "#7A5E2A",
    accent: "#F87BAB",
    card: "#FFFFFF",
    cardBody: "#FFFAEC",
    footer: "#7A5E2A",
    mood: "light",
    sceneHint: "study / library / soft shelves",
  },
  {
    id: "cloud-day",
    name: "Cloud Day",
    description: "Bright sky with sun rays.",
    gradient: ["#E7F4FF", "#C9E6FF", "#FFE9AC"],
    title: "#5BB3C4",
    titleStroke: "#FFFFFF",
    ink: "#14384A",
    muted: "#4A6B7A",
    accent: "#F87BAB",
    card: "#FFFFFF",
    cardBody: "#F4FAFF",
    footer: "#4A6B7A",
    mood: "light",
    sceneHint: "sky + grass + sunshine playful",
  },
];

export function getTheme(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

/**
 * Theme mappings live in `lib/content-types.ts` (CATEGORIES → each type
 * declares its `themeAlternates` inline). This file just exposes the
 * picker function.
 */
import {
  THEMES_BY_CONTENT_TYPE,
  THEMES_BY_CATEGORY,
} from "./content-types";

/**
 * Suggest a theme based on content type + category. `batchIndex` rotates
 * across the alternates so a batch of 10 same-type pieces uses different
 * themes from the same mood family.
 */
export function suggestTheme(
  contentTypeId: string,
  categoryId: string,
  batchIndex = 0
): ThemeId {
  const byType = THEMES_BY_CONTENT_TYPE[contentTypeId];
  if (byType && byType.length > 0) return byType[batchIndex % byType.length] as ThemeId;
  const byCat = THEMES_BY_CATEGORY[categoryId];
  if (byCat && byCat.length > 0) return byCat[batchIndex % byCat.length] as ThemeId;
  return "coral-pink";
}
