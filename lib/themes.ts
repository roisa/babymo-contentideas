export type ThemeId =
  | "warm-cream"
  | "sage-green"
  | "soft-peach"
  | "ramadan-gold"
  | "cozy-night"
  | "earth-tone"
  | "dusty-blue"
  | "sand-beige";

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  gradient: [string, string, string];
  ink: string;
  muted: string;
  accent: string;
  card: string;
  footer: string;
  mood: "light" | "dark";
}

export const THEMES: Theme[] = [
  {
    id: "warm-cream",
    name: "Warm Cream",
    description: "Soft cream linen, the Baby Mo default.",
    gradient: ["#FAF3E7", "#F4E7D4", "#EAD6BA"],
    ink: "#3D3A4B",
    muted: "#7A6F5C",
    accent: "#C8A26B",
    card: "#FFFFFFAA",
    footer: "#8B7A60",
    mood: "light",
  },
  {
    id: "sage-green",
    name: "Sage Green",
    description: "Calming garden, Montessori sage tones.",
    gradient: ["#EEF2E6", "#D6DEC6", "#B7C4A4"],
    ink: "#2E3A2A",
    muted: "#5E6A56",
    accent: "#7E9569",
    card: "#FFFFFFAA",
    footer: "#5E6A56",
    mood: "light",
  },
  {
    id: "soft-peach",
    name: "Soft Peach",
    description: "Cozy nursery peach + powder.",
    gradient: ["#FBE7DA", "#F6CFBE", "#EFB29A"],
    ink: "#4A2E2A",
    muted: "#7C534A",
    accent: "#C97A5A",
    card: "#FFFFFFB0",
    footer: "#8B5A4D",
    mood: "light",
  },
  {
    id: "ramadan-gold",
    name: "Ramadan Gold",
    description: "Soft gold + warm cream, lantern mood.",
    gradient: ["#FBF3DE", "#EFD9A2", "#D9B36A"],
    ink: "#3A2E14",
    muted: "#7B5E2A",
    accent: "#B0843A",
    card: "#FFFFFFB0",
    footer: "#8B6A2A",
    mood: "light",
  },
  {
    id: "cozy-night",
    name: "Cozy Night",
    description: "Bedtime navy, calm starlit.",
    gradient: ["#23223A", "#2E2C4A", "#3B3960"],
    ink: "#F2EBDA",
    muted: "#C9C1AC",
    accent: "#E8C98C",
    card: "#FFFFFF12",
    footer: "#C9C1AC",
    mood: "dark",
  },
  {
    id: "earth-tone",
    name: "Earth Tone",
    description: "Clay + terracotta, grounding.",
    gradient: ["#EFE2D2", "#D9B89A", "#B98968"],
    ink: "#3A2A20",
    muted: "#7A5642",
    accent: "#9A5C3A",
    card: "#FFFFFFAA",
    footer: "#7A5642",
    mood: "light",
  },
  {
    id: "dusty-blue",
    name: "Dusty Blue",
    description: "Quiet sky, gentle morning.",
    gradient: ["#E7ECF1", "#C8D3DD", "#A2B3C2"],
    ink: "#26313D",
    muted: "#52647A",
    accent: "#6A88A6",
    card: "#FFFFFFB0",
    footer: "#52647A",
    mood: "light",
  },
  {
    id: "sand-beige",
    name: "Sand Beige",
    description: "Linen + warm sand minimalism.",
    gradient: ["#F6EFE2", "#E5D5BC", "#CDB893"],
    ink: "#3A3024",
    muted: "#7A6749",
    accent: "#A98859",
    card: "#FFFFFFAA",
    footer: "#7A6749",
    mood: "light",
  },
];

export function getTheme(id: ThemeId): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
