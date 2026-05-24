"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SlidePreview } from "@/components/slide-preview";
import { Download, Eye, Trash2, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import type { GeneratedContent } from "@/lib/types";
import { useLibrary } from "@/lib/store";

interface Props {
  content: GeneratedContent;
  onRemove?: (id: string) => void;
}

export function ContentCard({ content, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden group hover:shadow-md transition">
        <div onClick={() => setOpen(true)} className="cursor-pointer">
          <SlidePreview content={content} className="rounded-none border-0 border-b" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="soft" className="font-normal">
              {content.contentTypeLabel}
            </Badge>
            <Badge variant="outline" className="font-normal capitalize">
              {content.format}
            </Badge>
            {content.slides.length > 1 && (
              <Badge variant="outline" className="font-normal">
                {content.slides.length} slides
              </Badge>
            )}
          </div>
          <div className="text-sm font-semibold mt-2 line-clamp-2">{content.title}</div>
          <div className="text-xs text-muted-foreground line-clamp-2">{content.hook}</div>
        </CardHeader>
        <CardContent className="pt-0 flex gap-2">
          <Button size="sm" variant="soft" className="flex-1" onClick={() => setOpen(true)}>
            <Eye className="h-3.5 w-3.5 mr-1.5" /> View
          </Button>
          <ExportButton content={content} variant="default" />
          {onRemove && (
            <Button size="icon" variant="ghost" onClick={() => onRemove(content.id)} className="h-8 w-8">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </CardContent>
      </Card>

      <ContentDetailDialog content={content} open={open} onOpenChange={setOpen} />
    </>
  );
}

export function ContentDetailDialog({
  content,
  open,
  onOpenChange,
}: {
  content: GeneratedContent;
  open: boolean;
  onOpenChange: (b: boolean) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [copied, setCopied] = useState<"caption" | "tags" | null>(null);
  const total = content.slides.length;

  function next() {
    setIdx((i) => (i + 1) % total);
  }
  function prev() {
    setIdx((i) => (i - 1 + total) % total);
  }
  async function copy(value: string, kind: "caption" | "tags") {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <Badge variant="soft" className="font-normal">{content.contentTypeLabel}</Badge>
            <Badge variant="outline" className="font-normal capitalize">{content.format}</Badge>
            {content.slides.length > 1 && (
              <Badge variant="outline" className="font-normal">{content.slides.length} slides</Badge>
            )}
          </div>
          <DialogTitle className="text-base">{content.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,360px] gap-6 mt-2">
          <div>
            <div className="relative">
              <SlidePreview content={content} slideIndex={idx} />
              {total > 1 && (
                <>
                  <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
            {total > 1 && (
              <div className="mt-3 grid grid-cols-6 gap-2">
                {content.slides.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} className={i === idx ? "ring-2 ring-babymo-gold rounded-xl" : "opacity-70 hover:opacity-100 transition"}>
                    <SlidePreview content={content} slideIndex={i} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Hook</div>
              <div className="text-sm">{content.hook}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Caption</div>
                <Button size="sm" variant="ghost" onClick={() => copy(content.caption, "caption")}>
                  {copied === "caption" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <div className="text-sm rounded-xl bg-muted/60 p-3 leading-relaxed">{content.caption}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">CTA</div>
              <div className="text-sm">{content.cta}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Hashtags</div>
                <Button size="sm" variant="ghost" onClick={() => copy(content.hashtags.join(" "), "tags")}>
                  {copied === "tags" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>
              <div className="text-xs text-muted-foreground leading-relaxed">{content.hashtags.join("  ")}</div>
            </div>
            <ExportButton content={content} variant="full" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ExportButton({ content, variant }: { content: GeneratedContent; variant: "default" | "full" }) {
  const [busy, setBusy] = useState<"jpg" | "png" | "zip" | null>(null);

  async function downloadSingle(format: "jpg" | "png") {
    setBusy(format);
    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, slideIndex: 0, format }),
      });
      if (!res.ok) throw new Error("render failed");
      const blob = await res.blob();
      triggerDownload(blob, `${slug(content.title)}-1.${format}`);
    } finally {
      setBusy(null);
    }
  }

  async function downloadZip() {
    setBusy("zip");
    try {
      const res = await fetch("/api/export-zip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("zip failed");
      const blob = await res.blob();
      triggerDownload(blob, `${slug(content.title)}.zip`);
    } finally {
      setBusy(null);
    }
  }

  if (variant === "default") {
    return (
      <Button
        size="sm"
        variant="default"
        className="flex-1"
        disabled={busy !== null}
        onClick={() => (content.slides.length > 1 ? downloadZip() : downloadSingle("jpg"))}
      >
        <Download className="h-3.5 w-3.5 mr-1.5" />
        {busy ? "..." : content.slides.length > 1 ? "ZIP" : "JPG"}
      </Button>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button size="sm" variant="soft" disabled={busy !== null} onClick={() => downloadSingle("jpg")}>
        <Download className="h-3.5 w-3.5 mr-1.5" />
        {busy === "jpg" ? "..." : "JPG"}
      </Button>
      <Button size="sm" variant="soft" disabled={busy !== null} onClick={() => downloadSingle("png")}>
        <Download className="h-3.5 w-3.5 mr-1.5" />
        {busy === "png" ? "..." : "PNG"}
      </Button>
      <Button size="sm" variant="default" disabled={busy !== null} onClick={downloadZip}>
        <Download className="h-3.5 w-3.5 mr-1.5" />
        {busy === "zip" ? "..." : "ZIP"}
      </Button>
    </div>
  );
}

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "babymo";
}

function triggerDownload(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
