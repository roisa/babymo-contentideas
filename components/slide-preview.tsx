"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FORMATS } from "@/lib/content-types";
import type { GeneratedContent } from "@/lib/types";

interface SlidePreviewProps {
  content: GeneratedContent;
  slideIndex?: number;
  className?: string;
  /** Defer fetching until the element is near the viewport. Default true. */
  lazy?: boolean;
}

// Module-scope cache so re-mounts don't re-fetch the same image.
const cache = new Map<string, string>();

function cacheKey(c: GeneratedContent, i: number): string {
  return `${c.id}:${i}`;
}

export function SlidePreview({ content, slideIndex = 0, className, lazy = true }: SlidePreviewProps) {
  const fmt = FORMATS.find((f) => f.id === content.format)!;
  const aspect = `${fmt.width} / ${fmt.height}`;
  const [src, setSrc] = useState<string | null>(() => cache.get(cacheKey(content, slideIndex)) ?? null);
  const [visible, setVisible] = useState(!lazy);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visible) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const key = cacheKey(content, slideIndex);
    const cached = cache.get(key);
    if (cached) {
      setSrc(cached);
      return;
    }
    let aborted = false;
    (async () => {
      try {
        const res = await fetch("/api/render", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content, slideIndex }),
        });
        if (!res.ok) return;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        cache.set(key, url);
        if (!aborted) setSrc(url);
      } catch {
        /* swallow */
      }
    })();
    return () => {
      aborted = true;
    };
  }, [content, slideIndex, visible]);

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full overflow-hidden rounded-3xl bg-muted/60", className)}
      style={{ aspectRatio: aspect }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={content.title} className="h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 shimmer bg-gradient-to-br from-muted to-secondary" />
      )}
    </div>
  );
}
