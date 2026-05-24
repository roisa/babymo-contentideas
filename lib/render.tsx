import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { FORMATS, findContentType } from "./content-types";
import { getTheme } from "./themes";
import type { GeneratedContent, Slide } from "./types";

let cachedFonts: { sans: ArrayBuffer; display: ArrayBuffer; arabic?: ArrayBuffer } | null = null;

async function fetchFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch font: " + url);
  return await res.arrayBuffer();
}

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

async function loadFonts() {
  if (cachedFonts) return cachedFonts;
  const fontDir = path.join(process.cwd(), ".fonts");
  try {
    const [sans, display, arabic] = await Promise.all([
      readFile(path.join(fontDir, "inter.ttf")),
      readFile(path.join(fontDir, "fraunces.ttf")),
      readFile(path.join(fontDir, "noto-arabic.ttf")).catch(() => null),
    ]);
    cachedFonts = {
      sans: toArrayBuffer(sans),
      display: toArrayBuffer(display),
      arabic: arabic ? toArrayBuffer(arabic) : undefined,
    };
    return cachedFonts;
  } catch {
    // fall through to network
  }
  const [sans, display, arabic] = await Promise.all([
    fetchFont("https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf"),
    fetchFont("https://fonts.gstatic.com/s/notonaskharabic/v44/RrQ5bpV-9Dd1b1OAGA6M9PkyDuVBePeKNaxcsss0Y7bwj85krA.ttf").catch(() => undefined),
  ]);
  cachedFonts = { sans, display, arabic };
  return cachedFonts;
}

interface SlideRenderProps {
  slide: Slide;
  index: number;
  total: number;
  themeId: GeneratedContent["theme"];
  format: GeneratedContent["format"];
  contentTypeId: string;
  title: string;
  isFirst: boolean;
  isLast: boolean;
  cta?: string;
}

function SlideNode(props: SlideRenderProps): React.ReactElement {
  const theme = getTheme(props.themeId);
  const fmt = FORMATS.find((f) => f.id === props.format)!;
  const isReels = props.format === "reels";
  const safeTop = isReels ? 220 : 80;
  const safeBottom = isReels ? 320 : 80;

  const bg = `linear-gradient(140deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 55%, ${theme.gradient[2]} 100%)`;

  return (
    <div
      style={{
        width: fmt.width,
        height: fmt.height,
        display: "flex",
        flexDirection: "column",
        background: bg,
        color: theme.ink,
        fontFamily: "Inter, sans-serif",
        position: "relative",
        padding: `${safeTop}px 80px ${safeBottom}px 80px`,
      }}
    >
      {/* soft mascot placeholder bubble */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 140,
          height: 140,
          borderRadius: 9999,
          background: `${theme.accent}33`,
          border: `2px dashed ${theme.accent}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.muted,
          fontSize: 18,
        }}
      >
        baby mo
      </div>

      {/* category chip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: theme.card,
          color: theme.ink,
          padding: "10px 20px",
          borderRadius: 9999,
          fontSize: 22,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          alignSelf: "flex-start",
          marginBottom: 28,
          border: `1px solid ${theme.accent}33`,
        }}
      >
        <span style={{ display: "flex" }}>{props.slide.footer ?? "Baby Mo"}</span>
      </div>

      {/* main content stack */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
        {props.isFirst && (
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: theme.muted,
              marginBottom: 16,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {props.title}
          </div>
        )}

        <div
          style={{
            display: "flex",
            fontSize: isReels ? 56 : 64,
            fontWeight: 600,
            lineHeight: 1.15,
            color: theme.ink,
            marginBottom: 28,
            maxWidth: "92%",
          }}
        >
          {props.slide.heading}
        </div>

        {props.slide.arabic ? (
          <div
            style={{
              display: "flex",
              fontSize: 64,
              color: theme.ink,
              direction: "rtl",
              marginBottom: 28,
              fontWeight: 500,
              lineHeight: 1.5,
              fontFamily: "NotoArabic, Inter, sans-serif",
            }}
          >
            {props.slide.arabic}
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            fontSize: isReels ? 38 : 40,
            lineHeight: 1.4,
            color: theme.ink,
            opacity: 0.92,
            maxWidth: "94%",
          }}
        >
          {props.slide.body}
        </div>

        {props.isLast && props.cta ? (
          <div
            style={{
              display: "flex",
              marginTop: 40,
              padding: "18px 26px",
              background: theme.card,
              border: `1px solid ${theme.accent}55`,
              borderRadius: 18,
              color: theme.ink,
              fontSize: 30,
              alignSelf: "flex-start",
              maxWidth: "85%",
            }}
          >
            {props.cta}
          </div>
        ) : null}
      </div>

      {/* footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: theme.footer,
          fontSize: 22,
          opacity: 0.9,
          borderTop: `1px solid ${theme.accent}33`,
          paddingTop: 18,
        }}
      >
        <div style={{ display: "flex" }}>babymo.studio</div>
        <div style={{ display: "flex" }}>
          {props.index + 1} / {props.total}
        </div>
      </div>
    </div>
  );
}

export async function renderSlidePng(content: GeneratedContent, slideIndex: number): Promise<Buffer> {
  const fmt = FORMATS.find((f) => f.id === content.format)!;
  const fonts = await loadFonts();
  const node = SlideNode({
    slide: content.slides[slideIndex],
    index: slideIndex,
    total: content.slides.length,
    themeId: content.theme,
    format: content.format,
    contentTypeId: content.contentTypeId,
    title: content.title,
    isFirst: slideIndex === 0,
    isLast: slideIndex === content.slides.length - 1,
    cta: content.cta,
  });

  type FontList = Parameters<typeof satori>[1]["fonts"];
  const baseFonts: FontList = [
    { name: "Inter", data: fonts.sans, weight: 400, style: "normal" },
    { name: "Inter", data: fonts.display, weight: 600, style: "normal" },
  ];
  const withArabic: FontList = fonts.arabic
    ? [...baseFonts, { name: "NotoArabic", data: fonts.arabic, weight: 500, style: "normal" }]
    : baseFonts;

  let svg: string;
  try {
    svg = await satori(node, { width: fmt.width, height: fmt.height, fonts: withArabic });
  } catch (err) {
    // Some Arabic fonts use OpenType lookups satori doesn't fully support.
    // Fall back to Latin-only fonts so non-Arabic content always renders.
    svg = await satori(node, { width: fmt.width, height: fmt.height, fonts: baseFonts });
  }

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: fmt.width } });
  return resvg.render().asPng();
}

export function summarizeContent(c: GeneratedContent): string {
  const meta = findContentType(c.contentTypeId);
  return `${meta?.type.label ?? c.contentTypeLabel} · ${c.format} · ${c.slides.length} slide(s)`;
}
