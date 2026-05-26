import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { FORMATS, CATEGORIES, findContentType } from "./content-types";
import { getTheme, type Theme } from "./themes";
import type { GeneratedContent, Slide } from "./types";
import { loadPoseDataUrl } from "./poses";
import React from "react";

let cachedFonts: {
  sans: ArrayBuffer;
  sansBold: ArrayBuffer;
  sansItalic?: ArrayBuffer;
  display: ArrayBuffer; // Fredoka medium
  displayBold: ArrayBuffer; // Fredoka bold
  arabic?: ArrayBuffer;
} | null = null;

function toAB(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch font: " + url);
  return await res.arrayBuffer();
}

async function loadFonts() {
  if (cachedFonts) return cachedFonts;
  const dir = path.join(process.cwd(), ".fonts");
  try {
    const [sans, sansBold, sansItalic, display, displayBold, arabic] = await Promise.all([
      readFile(path.join(dir, "inter.ttf")),
      readFile(path.join(dir, "fraunces.ttf")), // Inter SemiBold legacy
      readFile(path.join(dir, "inter-italic.ttf")).catch(() => null),
      readFile(path.join(dir, "fredoka-medium.ttf")),
      readFile(path.join(dir, "fredoka-bold.ttf")),
      // Arabic font: Cairo Bold renders shaped Arabic in Satori; Reem Kufi
      // and Noto Sans Arabic are kept as fallbacks if Cairo is missing.
      readFile(path.join(dir, "arabic-cairo-bold.ttf"))
        .catch(() => readFile(path.join(dir, "arabic-reemkufi.ttf")))
        .catch(() => readFile(path.join(dir, "arabic-noto-sans.ttf")))
        .catch(() => readFile(path.join(dir, "noto-arabic.ttf")))
        .catch(() => null),
    ]);
    cachedFonts = {
      sans: toAB(sans),
      sansBold: toAB(sansBold),
      sansItalic: sansItalic ? toAB(sansItalic) : undefined,
      display: toAB(display),
      displayBold: toAB(displayBold),
      arabic: arabic ? toAB(arabic) : undefined,
    };
    return cachedFonts;
  } catch {
    // fall through
  }
  const [sans, sansBold, sansItalic, display, displayBold, arabic] = await Promise.all([
    fetchFont("https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc69thjQ.ttf").catch(() => undefined),
    fetchFont("https://fonts.gstatic.com/s/fredoka/v17/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OwyLMFg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/fredoka/v17/X7nP4b87HvSqjb_WIi2yDCRwoQ_k7367_B-i2yQag0-mac3OFiXMFg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/scheherazadenew/v21/4UaerFhTvxVnHDvUkUiHg8jprP4DM79DHlY.ttf").catch(() =>
      fetchFont("https://fonts.gstatic.com/s/notosansarabic/v33/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfL2uvuw.ttf")
    ).catch(() => undefined),
  ]);
  cachedFonts = { sans, sansBold, sansItalic, display, displayBold, arabic };
  return cachedFonts;
}

/* ---------- Emoji loader (Twemoji) ---------- */

const emojiCache = new Map<string, string>();

function toCodePoint(unicode: string): string {
  const codes: string[] = [];
  let i = 0;
  while (i < unicode.length) {
    const cp = unicode.codePointAt(i);
    if (cp === undefined) break;
    if (cp !== 0xfe0f) codes.push(cp.toString(16));
    i += cp > 0xffff ? 2 : 1;
  }
  return codes.join("-");
}

async function loadEmojiSvg(emoji: string): Promise<string | undefined> {
  const cp = toCodePoint(emoji);
  if (!cp) return undefined;
  const cached = emojiCache.get(cp);
  if (cached) return cached;

  // 1) Local bundled cache (.emoji/<cp>.svg) — works offline & in sandboxes
  try {
    const localPath = path.join(process.cwd(), ".emoji", `${cp}.svg`);
    const svgText = await readFile(localPath, "utf8");
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgText).toString("base64")}`;
    emojiCache.set(cp, dataUrl);
    return dataUrl;
  } catch {
    /* not bundled, try network */
  }

  // 2) Twemoji CDN fallback (works on Vercel etc.)
  const cdns = [
    `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${cp}.svg`,
    `https://unpkg.com/twemoji@14.0.2/assets/svg/${cp}.svg`,
  ];
  for (const url of cdns) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const svgText = await res.text();
      const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgText).toString("base64")}`;
      emojiCache.set(cp, dataUrl);
      return dataUrl;
    } catch {
      /* try next */
    }
  }
  return undefined;
}

/* ---------- Decorative scene chrome ---------- */

function stickerStroke(stroke: string, w = 4): React.CSSProperties {
  // Fake stroke via multi-direction text-shadow (satori supports text-shadow).
  const shadows: string[] = [];
  for (let dx = -w; dx <= w; dx++) {
    for (let dy = -w; dy <= w; dy++) {
      if (dx === 0 && dy === 0) continue;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d > w) continue;
      shadows.push(`${dx}px ${dy}px 0 ${stroke}`);
    }
  }
  // Smaller drop shadow so it doesn't collide with the body card below.
  shadows.push(`3px 5px 0 rgba(0,0,0,0.08)`);
  return { textShadow: shadows.join(", ") };
}

function Cloud({ x, y, size = 100, opacity = 0.95 }: { x: number; y: number; size?: number; opacity?: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", opacity }}>
      <svg width={size * 1.6} height={size} viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        <g fill="#FFFFFF">
          <ellipse cx="50" cy="60" rx="40" ry="30" />
          <ellipse cx="95" cy="55" rx="45" ry="35" />
          <ellipse cx="130" cy="70" rx="28" ry="22" />
        </g>
      </svg>
    </div>
  );
}

function Star({ x, y, size = 36, color = "#FFD93D", rotate = 0 }: { x: number; y: number; size?: number; color?: string; rotate?: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", transform: `rotate(${rotate}deg)` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 1.5 L14.7 8.6 L22 9.3 L16.4 14.1 L18.2 21.5 L12 17.6 L5.8 21.5 L7.6 14.1 L2 9.3 L9.3 8.6 Z"
          fill={color}
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

function Sparkle({ x, y, size = 22, color = "#FFD93D" }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex" }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
      </svg>
    </div>
  );
}

function Heart({ x, y, size = 30, color = "#F87BAB", rotate = 0 }: { x: number; y: number; size?: number; color?: string; rotate?: number }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", transform: `rotate(${rotate}deg)` }}>
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21 C 5 14, 2 10, 5 6 C 8 2, 11 5, 12 7 C 13 5, 16 2, 19 6 C 22 10, 19 14, 12 21 Z" fill={color} stroke="#FFFFFF" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function Dot({ x, y, size = 12, color }: { x: number; y: number; size?: number; color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: 9999,
        background: color,
        display: "flex",
      }}
    />
  );
}

function SunRays({ x, y, size = 200, color = "#FFE066" }: { x: number; y: number; size?: number; color?: string }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex" }}>
      <svg width={size} height={size} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="55" fill={color} />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 70;
          const y1 = 100 + Math.sin(angle) * 70;
          const x2 = 100 + Math.cos(angle) * 95;
          const y2 = 100 + Math.sin(angle) * 95;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="8" strokeLinecap="round" />;
        })}
      </svg>
    </div>
  );
}

/* Per-theme decorative scenery */
function Decorations({ themeId, width }: { themeId: Theme["id"]; width: number }) {
  const items: React.ReactNode[] = [];
  const right = width - 60;
  // All decorations kept clear of the central column (where title + card live).
  // Stick to left edge (x < 90) or right edge (x > width - 90), and y far from title (< 110 or > 360).
  if (themeId === "coral-pink") {
    items.push(<Star key="s1" x={40} y={120} size={36} color="#FFD93D" rotate={-12} />);
    items.push(<Heart key="h1" x={right - 30} y={120} size={42} color="#FFFFFF" rotate={14} />);
    items.push(<Heart key="h2" x={50} y={380} size={28} color="#FFFFFF" rotate={-20} />);
  } else if (themeId === "sky-blue") {
    items.push(<Cloud key="c1" x={-30} y={80} size={90} opacity={0.95} />);
    items.push(<Cloud key="c2" x={width - 130} y={420} size={70} opacity={0.85} />);
    items.push(<SunRays key="sun" x={right - 120} y={30} size={150} color="#FFE066" />);
  } else if (themeId === "mint-garden") {
    items.push(<SunRays key="sun" x={right - 110} y={30} size={140} color="#FFE066" />);
    items.push(<Cloud key="c1" x={-20} y={60} size={80} />);
    items.push(<Dot key="d1" x={50} y={400} size={14} color="#FFFFFF" />);
    items.push(<Dot key="d2" x={width - 50} y={430} size={10} color="#FFFFFF" />);
  } else if (themeId === "sunny-yellow") {
    items.push(<Star key="s1" x={40} y={110} size={32} color="#FF8FB0" />);
    items.push(<Star key="s2" x={right - 30} y={130} size={36} color="#FFFFFF" rotate={20} />);
    items.push(<Sparkle key="sp1" x={50} y={400} size={20} color="#FFFFFF" />);
  } else if (themeId === "peach-apricot") {
    items.push(<Dot key="d1" x={40} y={150} size={18} color="#FFFFFF" />);
    items.push(<Dot key="d2" x={right - 20} y={130} size={14} color="#FFFFFF" />);
    items.push(<Sparkle key="sp1" x={50} y={420} size={20} color="#FFFFFF" />);
  } else if (themeId === "lavender-night") {
    items.push(<Star key="s1" x={50} y={120} size={24} color="#FFD93D" />);
    items.push(<Star key="s2" x={right - 30} y={140} size={30} color="#FFD93D" rotate={20} />);
    items.push(<Star key="s3" x={40} y={420} size={20} color="#FFFFFF" />);
    items.push(<Sparkle key="sp2" x={right - 20} y={460} size={20} color="#FFFFFF" />);
  } else if (themeId === "cream-sand") {
    items.push(<Sparkle key="sp1" x={50} y={130} size={24} color="#F87BAB" />);
    items.push(<Dot key="d1" x={right - 20} y={140} size={12} color="#B8862C" />);
    items.push(<Star key="s1" x={50} y={420} size={28} color="#F87BAB" rotate={-10} />);
  } else if (themeId === "cloud-day") {
    items.push(<Cloud key="c1" x={-20} y={80} size={80} />);
    items.push(<Cloud key="c2" x={width - 130} y={430} size={70} />);
    items.push(<SunRays key="sun" x={right - 110} y={30} size={140} color="#FFE066" />);
  }
  return <div style={{ position: "absolute", inset: 0, display: "flex", zIndex: "0" as any }}>{items}</div>;
}

/* ---------- Slide chrome pieces ---------- */

/* ---------- Arabic rendered via Resvg (proper harfbuzz shaping) ---------- */

let cachedArabicFontBuf: Buffer | null | undefined;

async function getArabicFontBuf(): Promise<Buffer | null> {
  if (cachedArabicFontBuf !== undefined) return cachedArabicFontBuf;
  const dir = path.join(process.cwd(), ".fonts");
  for (const name of ["arabic-cairo-bold.ttf", "arabic-reemkufi.ttf", "arabic-noto-sans.ttf", "noto-arabic.ttf"]) {
    try {
      cachedArabicFontBuf = await readFile(path.join(dir, name));
      return cachedArabicFontBuf;
    } catch {
      /* try next */
    }
  }
  cachedArabicFontBuf = null;
  return null;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Wrap Arabic text into balanced lines at word boundaries.
 * Heuristic: ~22 chars per line at our font sizes (works for Cairo Bold at 72-84pt).
 */
function wrapArabicLines(text: string, maxCharsPerLine: number): string[] {
  if (text.length <= maxCharsPerLine) return [text];
  const words = text.trim().split(/\s+/);
  if (words.length === 1) return [text];
  // Greedy fill — keep adding words until the next would overflow.
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const tryLine = cur ? cur + " " + w : w;
    if (tryLine.length > maxCharsPerLine && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = tryLine;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Render Arabic text via Resvg directly (harfbuzz shaping), return PNG data URL
 * + the resulting image height (so the caller can size the <img> correctly).
 * Satori can't shape Arabic so we hand it off to Resvg as an image.
 */
export async function renderArabicAsImage(
  text: string,
  color: string,
  fontSize: number,
  maxWidth: number
): Promise<{ dataUrl: string; height: number } | null> {
  const fontBuf = await getArabicFontBuf();
  if (!fontBuf) return null;

  // ~22 chars per line works well for Cairo Bold at our sizes; shrink the
  // font when Arabic wraps to many lines so the card doesn't overflow.
  let activeSize = fontSize;
  let lines = wrapArabicLines(text, 22);
  // Aim for ≤2 lines: keeps the card compact even when there's also
  // transliteration + translation + attribution below the Arabic.
  while (lines.length > 2 && activeSize > 44) {
    activeSize -= 6;
    lines = wrapArabicLines(text, Math.round(22 * (fontSize / activeSize)));
  }

  const lineHeight = Math.round(activeSize * 1.55);
  const topPad = Math.round(activeSize * 0.85);
  const height = topPad + lineHeight * (lines.length - 1) + Math.round(activeSize * 0.6);

  // tspan inside an RTL <text> renders incorrectly in resvg — use one
  // <text> element per line, stacked vertically.
  const textElements = lines
    .map(
      (line, i) =>
        `<text x="${maxWidth / 2}" y="${topPad + i * lineHeight}"
        text-anchor="middle"
        font-family="Cairo"
        font-size="${activeSize}"
        font-weight="700"
        fill="${color}"
        direction="rtl"
        xml:lang="ar">${escapeXml(line)}</text>`
    )
    .join("\n  ");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${maxWidth}" height="${height}">
  ${textElements}
</svg>`;

  try {
    const resvg = new Resvg(svg, {
      font: { fontBuffers: [fontBuf], loadSystemFonts: false, defaultFontFamily: "Cairo" } as any,
      fitTo: { mode: "width", value: maxWidth },
    });
    const png = resvg.render().asPng();
    return {
      dataUrl: `data:image/png;base64,${png.toString("base64")}`,
      height,
    };
  } catch {
    return null;
  }
}

/* ---------- Baby Mo logo (real PNG, base64-embedded) ---------- */

let cachedLogo: string | null | undefined; // dataUrl, null = tried & missing

async function loadLogoDataUrl(): Promise<string | null> {
  if (cachedLogo !== undefined) return cachedLogo;
  try {
    const buf = await readFile(path.join(process.cwd(), "public", "babymo-logo.png"));
    cachedLogo = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    cachedLogo = null;
  }
  return cachedLogo;
}

function ChibiHead({ size }: { size: number }) {
  // Simplified Baby Mo character head (SVG paths only — no text).
  const w = size;
  const h = size;
  return (
    <div style={{ display: "flex", width: w, height: h }}>
      <svg width={w} height={h} viewBox="-40 -40 80 80" xmlns="http://www.w3.org/2000/svg">
        {/* Face base */}
        <ellipse cx="0" cy="2" rx="26" ry="24" fill="#FAD2B6" />
        {/* Hair (spiky tuft) */}
        <path
          d="M -28 -6 C -30 -30, -10 -38, -2 -30 C 4 -34, 16 -34, 22 -22 C 30 -14, 30 -6, 26 -2 L 22 -10 L 16 -2 L 10 -14 L 2 -4 L -6 -16 L -12 -4 L -18 -16 L -22 -4 L -28 -2 Z"
          fill="#171411"
        />
        {/* Cheeks blush */}
        <ellipse cx="-16" cy="10" rx="6" ry="3.5" fill="#F87BAB" opacity="0.55" />
        <ellipse cx="16" cy="10" rx="6" ry="3.5" fill="#F87BAB" opacity="0.55" />
        {/* Eyes — big shiny */}
        <ellipse cx="-9" cy="2" rx="5.5" ry="7" fill="#171411" />
        <ellipse cx="9" cy="2" rx="5.5" ry="7" fill="#171411" />
        <circle cx="-7" cy="0" r="2" fill="#FFFFFF" />
        <circle cx="11" cy="0" r="2" fill="#FFFFFF" />
        {/* Smile open mouth */}
        <path d="M -7 14 Q 0 22 7 14 Q 4 19 0 19 Q -4 19 -7 14 Z" fill="#7A2A2A" />
        <ellipse cx="0" cy="18" rx="3.5" ry="1.6" fill="#F87BAB" />
      </svg>
    </div>
  );
}

function StarShape({ size = 18 }: { size?: number }) {
  return (
    <div style={{ display: "flex", width: size, height: size }}>
      <svg width={size} height={size} viewBox="-10 -10 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 0 -9 L 2.6 -2.8 L 9 -2.5 L 4 1.5 L 5.6 8 L 0 4.5 L -5.6 8 L -4 1.5 L -9 -2.5 L -2.6 -2.8 Z"
          fill="#FFE066"
          stroke="#1E7A38"
          strokeWidth="1.4"
        />
      </svg>
    </div>
  );
}

function BabyMoLogo({ size = 110, logoDataUrl }: { size?: number; logoDataUrl?: string | null }) {
  // Real logo image when available (rendered as <img> with base64 data URL).
  // Falls back to the stylised SVG approximation if the PNG isn't bundled.
  if (logoDataUrl) {
    // The official PNG is roughly square (838x834). Render at the requested
    // size, preserving aspect ratio.
    return (
      <div style={{ display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={logoDataUrl} width={size * 1.4} height={size * 1.4} />
      </div>
    );
  }

  // -- Fallback chibi+pill stylisation --
  const headSize = Math.round(size * 0.62);
  const wordmark: React.CSSProperties = {
    fontFamily: "Fredoka, sans-serif",
    fontWeight: 700,
    fontSize: Math.round(size * 0.34),
    color: "#FFFFFF",
    letterSpacing: 0.5,
    lineHeight: 1,
    display: "flex",
    textShadow: [
      "-2px 0 0 #1E7A38",
      "2px 0 0 #1E7A38",
      "0 -2px 0 #1E7A38",
      "0 2px 0 #1E7A38",
      "-2px -2px 0 #1E7A38",
      "2px -2px 0 #1E7A38",
      "-2px 2px 0 #1E7A38",
      "2px 2px 0 #1E7A38",
      "0 4px 0 #1E7A38",
      "0 5px 0 rgba(0,0,0,0.18)",
    ].join(", "),
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Chibi head */}
      <div style={{ display: "flex", marginBottom: -Math.round(headSize * 0.45) }}>
        <ChibiHead size={headSize} />
      </div>
      {/* Green pill with the wordmark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#2EA84F",
          border: "3px solid #FFFFFF",
          borderRadius: 9999,
          padding: `${Math.round(size * 0.14)}px ${Math.round(size * 0.32)}px ${Math.round(size * 0.16)}px ${Math.round(size * 0.32)}px`,
          boxShadow: "0 4px 0 rgba(0,0,0,0.14)",
        }}
      >
        <span style={{ ...wordmark, color: "#FFFFFF" }}>Baby Mo</span>
        <div style={{ display: "flex", marginLeft: 6 }}>
          <StarShape size={Math.round(size * 0.22)} />
        </div>
      </div>
    </div>
  );
}

function CharacterPose({
  position,
  hint,
  contrast,
  size,
  poseDataUrl,
}: {
  position: "br" | "bl" | "tr" | "tl" | "right" | "bottom";
  hint: string;
  /** A high-contrast color for the dashed border & label (light on dark, dark on light). */
  contrast: string;
  size: number;
  /** When provided, renders the real Baby Mo character PNG instead of the dashed placeholder. */
  poseDataUrl?: string | null;
}) {
  const wrap: React.CSSProperties = { position: "absolute", display: "flex", zIndex: "1" as any };
  // Real character flushes near the canvas edges. Dashed placeholder
  // keeps a small inset.
  const isRealPose = Boolean(poseDataUrl);
  const inset = isRealPose ? -30 : 30;
  const bottomGap = isRealPose ? -40 : 30;
  if (position === "br") Object.assign(wrap, { right: inset, bottom: bottomGap });
  else if (position === "bl") Object.assign(wrap, { left: inset, bottom: bottomGap });
  else if (position === "tr") Object.assign(wrap, { right: inset, top: 200 });
  else if (position === "tl") Object.assign(wrap, { left: inset, top: 200 });
  else if (position === "right") Object.assign(wrap, { right: inset, bottom: 180 });
  else Object.assign(wrap, { left: "50%", bottom: bottomGap, transform: "translateX(-50%)" });

  if (poseDataUrl) {
    // Real character — drop in the PNG, no dashed marker.
    return (
      <div style={wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={poseDataUrl} width={size} height={size} style={{ objectFit: "contain" }} />
      </div>
    );
  }

  // Fallback: dashed placeholder when no pose is bundled
  return (
    <div style={wrap}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 9999,
          border: `3px dashed ${contrast}66`,
          background: `${contrast}0D`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            color: `${contrast}AA`,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: 600,
            lineHeight: 1.25,
          }}
        >
          {hint}
        </div>
      </div>
    </div>
  );
}

/* ---------- Master node ---------- */

interface SlideRenderProps {
  slide: Slide;
  index: number;
  total: number;
  themeId: GeneratedContent["theme"];
  format: GeneratedContent["format"];
  contentTypeId: string;
  categoryId: string;
  cta?: string;
  hashtags?: string[];
  logoDataUrl?: string | null;
  arabicImageUrl?: string | null;
  arabicImageHeight?: number;
  poseDataUrl?: string | null;
}

function SlideNode(props: SlideRenderProps): React.ReactElement {
  const theme = getTheme(props.themeId);
  const fmt = FORMATS.find((f) => f.id === props.format)!;
  const isReels = props.format === "reels";
  const category = CATEGORIES.find((c) => c.id === props.categoryId);
  const pose = category?.pose ?? { hint: "happy pose", position: "bottom" as const };

  // Compact pose marker — easier to swap out in Canva
  // Real character art? Make it large (matches @babymo.official feed).
  // Fallback dashed placeholder stays compact.
  const hasRealPose = Boolean(props.poseDataUrl);
  // Character sized to peek next to the card without dominating. The
  // category's preferred position (per pose.position in content-types)
  // decides which side it sits.
  const poseSize = hasRealPose ? (isReels ? 620 : 420) : isReels ? 240 : 200;
  const posePosition = isReels ? "bottom" : pose.position;
  // Body card narrows slightly when there's a real pose to share the canvas.
  const cardWidth = hasRealPose ? "84%" : "92%";
  // A card with Arabic + transliteration + Indonesian translation is dense
  // and overflows the slide unless we shrink the inner text sizes.
  const denseCard = Boolean(props.slide.arabic && /\n\s*\n/.test(props.slide.body || ""));

  // Background: theme gradient (full bleed scene placeholder)
  const bg = `linear-gradient(170deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 55%, ${theme.gradient[2]} 100%)`;

  // Title sizing — scale based on text length so it always fits
  const titleLen = props.slide.heading.length;
  const baseTitle = isReels ? 96 : 84;
  const titleSize = titleLen > 60 ? baseTitle - 22 : titleLen > 40 ? baseTitle - 10 : baseTitle;

  // The big stroked sticker title
  const strokeStyle = stickerStroke(theme.titleStroke, isReels ? 5 : 4);

  return (
    <div
      style={{
        width: fmt.width,
        height: fmt.height,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: bg,
        fontFamily: "Inter, sans-serif",
        padding: isReels ? "100px 80px 80px 80px" : "60px 80px 60px 80px",
        overflow: "hidden",
      }}
    >
      {/* Decorative scene shapes (sit behind everything) */}
      <Decorations themeId={theme.id} width={fmt.width} />

      {/* Logo at top center */}
      <div style={{ display: "flex", zIndex: "2" as any }}>
        <BabyMoLogo size={isReels ? 120 : 110} logoDataUrl={props.logoDataUrl} />
      </div>

      {/* Big sticker title */}
      {/**
       * Title sits inside a flex column wrapper with explicit padding-bottom
       * to reserve space for the text's drop shadow. The shadow visually
       * extends below the text glyph but Satori/Yoga doesn't add that to
       * the element height — without this padding the next sibling (card)
       * overlaps the shadow.
       */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 32,
          paddingBottom: 36,
          width: "100%",
          zIndex: "2" as any,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "Fredoka, sans-serif",
            fontWeight: 700,
            fontSize: titleSize,
            lineHeight: 1.25,
            color: theme.title,
            paddingLeft: 20,
            paddingRight: 20,
            ...strokeStyle,
          }}
        >
          {props.slide.heading}
        </div>
      </div>

      {/* Body card (only render if body has content) */}
      {props.slide.body && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            background: theme.cardBody ?? theme.card,
            border: `3px solid ${theme.titleStroke}`,
            borderRadius: 28,
            padding: isReels ? "30px 36px" : "28px 36px",
            marginTop: 0,
            boxShadow: "0 6px 0 rgba(0,0,0,0.10)",
            width: cardWidth,
            zIndex: "2" as any,
          }}
        >
          {props.slide.kicker && (
            <div
              style={{
                display: "flex",
                fontFamily: "Fredoka, sans-serif",
                fontWeight: 700,
                fontSize: denseCard ? 22 : 28,
                color: theme.title,
                letterSpacing: 0.3,
                marginBottom: denseCard ? 10 : 14,
              }}
            >
              {props.slide.kicker}
            </div>
          )}
          {props.slide.arabic && props.arabicImageUrl && (
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 16, marginTop: 4 }}>
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={props.arabicImageUrl}
                width={fmt.width - 220}
                height={props.arabicImageHeight ?? 180}
              />
            </div>
          )}
          {props.slide.arabic && !props.arabicImageUrl && (
            <div
              dir="rtl"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                fontFamily: "NotoArabic, Inter, sans-serif",
                fontSize: 72,
                lineHeight: 1.55,
                color: theme.title,
                marginBottom: 20,
                marginTop: 4,
                fontWeight: 700,
                textAlign: "center",
                letterSpacing: -1,
              }}
            >
              {props.slide.arabic}
            </div>
          )}
          {(() => {
            // Detect transliteration vs translation. Many seeds use
            // `<latin-arabic>\n\n"<Indonesian translation>"`. The first chunk
            // (transliteration) is italicised so the team can tell at a glance.
            const parts = props.slide.body.split(/\n\s*\n/);
            const hasTranslit = parts.length > 1 && props.slide.arabic;
            const translit = hasTranslit ? parts[0] : null;
            const main = hasTranslit ? parts.slice(1).join("\n\n") : props.slide.body;
            return (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                {translit && (
                  <div
                    style={{
                      display: "flex",
                      fontFamily: "Inter, sans-serif",
                      fontStyle: "italic",
                      fontSize: denseCard ? 22 : 28,
                      lineHeight: 1.45,
                      color: theme.title,
                      textAlign: "center",
                      justifyContent: "center",
                      width: "100%",
                      fontWeight: 600,
                      marginBottom: denseCard ? 10 : 14,
                    }}
                  >
                    {translit}
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Inter, sans-serif",
                    fontSize: denseCard ? 26 : 34,
                    lineHeight: 1.45,
                    color: theme.ink,
                    textAlign: "center",
                    justifyContent: "center",
                    width: "100%",
                    fontWeight: 600,
                  }}
                >
                  {main}
                </div>
              </div>
            );
          })()}
          {props.slide.attribution && (
            <div
              style={{
                display: "flex",
                fontFamily: "Inter, sans-serif",
                fontSize: denseCard ? 20 : 24,
                color: theme.title,
                marginTop: denseCard ? 10 : 14,
                justifyContent: "center",
                width: "100%",
                fontWeight: 700,
              }}
            >
              ({props.slide.attribution})
            </div>
          )}
        </div>
      )}

      {/* tiny scene hint for designers (bottom-left, low opacity) */}
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 18,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: `${theme.ink}55`,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        scene · {theme.sceneHint}
      </div>
      <div
        style={{
          position: "absolute",
          right: 24,
          bottom: 18,
          fontFamily: "Inter, sans-serif",
          fontSize: 13,
          color: `${theme.ink}55`,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          display: "flex",
        }}
      >
        {props.index + 1} / {props.total}
      </div>

      {/* Baby Mo character — paint order matters in Satori (document
          order = paint order, z-index mostly ignored). Rendered LAST so
          it sits on top of the body card and footer. */}
      <CharacterPose
        position={posePosition}
        hint={pose.hint.replace("baby mo · ", "")}
        contrast={theme.mood === "dark" ? "#FFFFFF" : theme.ink}
        size={poseSize}
        poseDataUrl={props.poseDataUrl}
      />
    </div>
  );
}

/** Derive a stable rotation index from the content id so the same content
 * always renders the same pose, but different items in a batch land on
 * different alternates. */
function hashIdToBatchIndex(id: string): number {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum = (sum + id.charCodeAt(i)) | 0;
  return sum & 0xff;
}

export async function renderSlidePng(content: GeneratedContent, slideIndex: number): Promise<Buffer> {
  const fmt = FORMATS.find((f) => f.id === content.format)!;
  const slide = content.slides[slideIndex];
  const theme = getTheme(content.theme);
  // Pre-render Arabic via Resvg (proper harfbuzz shaping) so Satori only has
  // to composite an <img>. The text colour matches the theme's title accent.
  // Treat whitespace-only Arabic as missing — the AI sometimes emits "" or
  // " " and the layout would otherwise reserve space for a failed-to-render
  // Arabic image (the empty gap users see in the body card).
  const arabicText = slide.arabic && slide.arabic.trim().length > 0 ? slide.arabic.trim() : null;
  const arabicMaxWidth = fmt.width - 220; // body card inner width
  const arabicFontSize = 64;
  const [fonts, logoDataUrl, arabicResult, poseDataUrl] = await Promise.all([
    loadFonts(),
    loadLogoDataUrl(),
    arabicText
      ? renderArabicAsImage(arabicText, theme.title, arabicFontSize, arabicMaxWidth)
      : Promise.resolve(null),
    loadPoseDataUrl(content.categoryId, content.contentTypeId, slideIndex, content.slides.length, hashIdToBatchIndex(content.id)),
  ]);
  // Synthesize a cleaned slide so SlideNode doesn't try to render the
  // raw whitespace via the RTL fallback path either.
  const slideForRender = arabicText === slide.arabic ? slide : { ...slide, arabic: arabicText ?? undefined };
  const node = SlideNode({
    slide: slideForRender,
    index: slideIndex,
    total: content.slides.length,
    themeId: content.theme,
    format: content.format,
    contentTypeId: content.contentTypeId,
    categoryId: content.categoryId,
    cta: content.cta,
    hashtags: content.hashtags,
    logoDataUrl,
    arabicImageUrl: arabicResult?.dataUrl ?? null,
    arabicImageHeight: arabicResult?.height,
    poseDataUrl,
  });

  type FontList = Parameters<typeof satori>[1]["fonts"];
  const baseFonts: FontList = [
    { name: "Inter", data: fonts.sans, weight: 400, style: "normal" },
    { name: "Inter", data: fonts.sansBold, weight: 700, style: "normal" },
    { name: "Fredoka", data: fonts.display, weight: 500, style: "normal" },
    { name: "Fredoka", data: fonts.displayBold, weight: 700, style: "normal" },
  ];
  if (fonts.sansItalic) {
    baseFonts.push(
      { name: "Inter", data: fonts.sansItalic, weight: 400, style: "italic" },
      { name: "Inter", data: fonts.sansItalic, weight: 600, style: "italic" }
    );
  }
  const withArabic: FontList = fonts.arabic
    ? [...baseFonts, { name: "NotoArabic", data: fonts.arabic, weight: 500, style: "normal" }]
    : baseFonts;

  const loadAdditionalAsset = async (code: string, segment: string) => {
    if (code === "emoji") {
      const url = await loadEmojiSvg(segment);
      return url ?? "";
    }
    return "";
  };

  let svg: string;
  try {
    svg = await satori(node, { width: fmt.width, height: fmt.height, fonts: withArabic, loadAdditionalAsset });
  } catch {
    svg = await satori(node, { width: fmt.width, height: fmt.height, fonts: baseFonts, loadAdditionalAsset });
  }

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: fmt.width } });
  return resvg.render().asPng();
}

/** Prime every in-process cache that `renderSlidePng` touches —
 * fonts (Inter, Fredoka, Arabic), the logo, the Resvg Arabic font buffer.
 * Subsequent renders skip these multi-hundred-ms loads. Safe to call
 * concurrently; each underlying loader memoizes itself.
 *
 * Call this from /api/warmup on container start to eliminate the
 * ~3.5s cold-start tax on the user's first render. */
export async function warmUp(): Promise<{ ok: true; ms: number }> {
  const t = Date.now();
  await Promise.all([loadFonts(), loadLogoDataUrl(), getArabicFontBuf()]);
  return { ok: true, ms: Date.now() - t };
}

export function summarizeContent(c: GeneratedContent): string {
  const meta = findContentType(c.contentTypeId);
  return `${meta?.type.label ?? c.contentTypeLabel} · ${c.format} · ${c.slides.length} slide(s)`;
}
