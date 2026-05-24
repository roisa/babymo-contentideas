"use client";

import { cn } from "@/lib/utils";
import { FORMATS } from "@/lib/content-types";
import { getTheme } from "@/lib/themes";
import type { GeneratedContent } from "@/lib/types";

interface SlidePreviewProps {
  content: GeneratedContent;
  slideIndex?: number;
  className?: string;
  showFooter?: boolean;
}

export function SlidePreview({ content, slideIndex = 0, className, showFooter = true }: SlidePreviewProps) {
  const theme = getTheme(content.theme);
  const fmt = FORMATS.find((f) => f.id === content.format)!;
  const slide = content.slides[slideIndex];
  const isReels = content.format === "reels";
  const isFirst = slideIndex === 0;
  const isLast = slideIndex === content.slides.length - 1;

  const aspect = `${fmt.width} / ${fmt.height}`;
  const bg = `linear-gradient(140deg, ${theme.gradient[0]} 0%, ${theme.gradient[1]} 55%, ${theme.gradient[2]} 100%)`;

  return (
    <div
      className={cn("relative w-full overflow-hidden rounded-2xl border shadow-sm", className)}
      style={{ aspectRatio: aspect, background: bg, color: theme.ink }}
    >
      {/* mascot placeholder */}
      <div
        className="absolute right-[5%] top-[5%] aspect-square w-[13%] rounded-full flex items-center justify-center text-[10px]"
        style={{ background: `${theme.accent}33`, border: `2px dashed ${theme.accent}66`, color: theme.muted }}
      >
        baby mo
      </div>

      <div
        className="flex h-full w-full flex-col"
        style={{
          padding: isReels ? "16% 7.5% 22% 7.5%" : "8% 7.5%",
        }}
      >
        <div
          className="inline-flex items-center self-start rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]"
          style={{
            background: theme.card,
            color: theme.ink,
            borderColor: `${theme.accent}55`,
          }}
        >
          {slide.footer ?? "Baby Mo"}
        </div>

        <div className="flex flex-1 flex-col justify-center" style={{ marginTop: "4%" }}>
          {isFirst && (
            <div className="text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: theme.muted }}>
              {content.title}
            </div>
          )}
          <div
            className="font-semibold leading-tight"
            style={{ color: theme.ink, fontSize: isReels ? "clamp(14px, 3.6vw, 28px)" : "clamp(14px, 2.8vw, 28px)" }}
          >
            {slide.heading}
          </div>
          {slide.arabic && (
            <div
              className="mt-3 font-semibold"
              dir="rtl"
              style={{ color: theme.ink, fontSize: isReels ? "clamp(14px, 3.6vw, 28px)" : "clamp(14px, 3vw, 30px)" }}
            >
              {slide.arabic}
            </div>
          )}
          <div
            className="mt-3 leading-relaxed"
            style={{
              color: theme.ink,
              opacity: 0.9,
              fontSize: isReels ? "clamp(10px, 2.4vw, 18px)" : "clamp(10px, 1.9vw, 18px)",
            }}
          >
            {slide.body}
          </div>
          {isLast && content.cta && (
            <div
              className="mt-4 inline-flex self-start rounded-xl border px-3 py-2"
              style={{
                background: theme.card,
                borderColor: `${theme.accent}55`,
                color: theme.ink,
                fontSize: "clamp(9px, 1.6vw, 14px)",
              }}
            >
              {content.cta}
            </div>
          )}
        </div>

        {showFooter && (
          <div
            className="flex items-center justify-between text-[9px]"
            style={{ color: theme.footer, borderTop: `1px solid ${theme.accent}33`, paddingTop: 6 }}
          >
            <span>babymo.studio</span>
            <span>
              {slideIndex + 1} / {content.slides.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
