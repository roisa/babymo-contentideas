"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, FORMATS, STORY_STYLES, findContentType, type FormatId } from "@/lib/content-types";
import { THEMES, type ThemeId } from "@/lib/themes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Sparkles, AlertCircle, Wand2, Check } from "lucide-react";
import { ContentCard } from "@/components/content-card";
import { useLibrary } from "@/lib/store";
import type { GeneratedContent, GenerationRequest } from "@/lib/types";

const BATCH_SIZES = [1, 5, 10, 20] as const;

export function GeneratorClient() {
  const search = useSearchParams();
  const initialThemeParam = search.get("theme");
  const initialTheme: ThemeId | "auto" = (initialThemeParam as ThemeId) ?? "auto";
  const initialType = search.get("type") ?? "daily-dua";

  const [contentTypeId, setContentTypeId] = useState<string>(initialType);
  const [theme, setTheme] = useState<ThemeId | "auto">(initialTheme);
  const [format, setFormat] = useState<FormatId>(() => findContentType(initialType)?.type.suggestedFormat ?? "single");
  const [storyStyle, setStoryStyle] = useState<string>("style-a");
  const [batchSize, setBatchSize] = useState<number>(5);
  const [customPrompt, setCustomPrompt] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    return findContentType(initialType)?.category.id ?? "daily-islamic";
  });

  const [busy, setBusy] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addBatch = useLibrary((s) => s.addBatch);
  const activeCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === activeCategoryId) ?? CATEGORIES[0],
    [activeCategoryId]
  );
  const activeType = findContentType(contentTypeId)?.type;

  function pickType(id: string) {
    setContentTypeId(id);
    const m = findContentType(id);
    if (m) {
      setActiveCategoryId(m.category.id);
      setFormat(m.type.suggestedFormat);
    }
  }

  async function handleGenerate() {
    setBusy(true);
    setError(null);
    setWarning(null);
    try {
      const req: GenerationRequest = {
        contentTypeId,
        format,
        // When Auto is selected we still need a non-null theme on the wire
        // for backwards-compat; the autoTheme flag is what actually triggers
        // suggestTheme() per item on the server.
        theme: theme === "auto" ? "coral-pink" : theme,
        autoTheme: theme === "auto" ? true : undefined,
        batchSize,
        storyStyle: format === "carousel" ? storyStyle : undefined,
        customPrompt: customPrompt.trim() || undefined,
      };
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });
      if (!res.ok) throw new Error("Generate failed: " + res.status);
      const data = (await res.json()) as { items: GeneratedContent[]; usedAI: boolean; warning?: string };
      setResults(data.items);
      addBatch(data.items);
      if (data.warning) setWarning(data.warning);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Step 1: Pilih konten */}
      <StepCard step={1} label="Pilih konten" subtitle="Kategori dan tipe konten yang ingin dibuat">
        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {CATEGORIES.map((c) => {
            const active = activeCategoryId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategoryId(c.id);
                  pickType(c.types[0].id);
                }}
                className={cn("pill-tab", active ? "pill-tab-active" : "pill-tab-inactive")}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        {/* Content type tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {activeCategory.types.map((t) => {
            const active = contentTypeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => pickType(t.id)}
                className={cn(
                  "text-left rounded-2xl border p-3 transition-all active:scale-[0.98]",
                  active
                    ? "border-babymo-green bg-babymo-green-soft shadow-ios-soft"
                    : "border-transparent bg-white hover:border-babymo-green/30 hover:bg-secondary/40"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="text-[14px] font-semibold leading-tight">{t.label}</div>
                  {active && (
                    <div className="h-5 w-5 rounded-full bg-babymo-green text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground leading-snug">{t.hint}</div>
              </button>
            );
          })}
        </div>
      </StepCard>

      {/* Step 2: Format + Theme + Batch */}
      <StepCard step={2} label="Atur format" subtitle="Bentuk, palet, dan jumlah">
        <div className="space-y-5">
          <Field label="Format">
            <div className="grid grid-cols-3 gap-2">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={cn(
                    "text-left rounded-2xl border p-3 transition-all active:scale-[0.98]",
                    format === f.id
                      ? "border-babymo-green bg-babymo-green-soft shadow-ios-soft"
                      : "border-transparent bg-white hover:bg-secondary/40"
                  )}
                >
                  <div className="text-[13px] font-semibold">{f.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {f.width}×{f.height}
                  </div>
                </button>
              ))}
            </div>
          </Field>

          {format === "carousel" && (
            <Field label="Storytelling structure">
              <div className="grid grid-cols-1 gap-1.5">
                {STORY_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStoryStyle(s.id)}
                    className={cn(
                      "w-full text-left rounded-2xl border p-2.5 transition active:scale-[0.99]",
                      storyStyle === s.id
                        ? "border-babymo-green bg-babymo-green-soft"
                        : "border-transparent bg-white hover:bg-secondary/40"
                    )}
                  >
                    <div className="text-[13px] font-semibold">{s.name}</div>
                    <div className="text-[11px] text-muted-foreground">{s.description}</div>
                  </button>
                ))}
              </div>
            </Field>
          )}

          <Field label={theme === "auto" ? "Theme & scene — Auto (mood per piece)" : "Theme & scene"}>
            <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
              <button onClick={() => setTheme("auto")} className="text-left group">
                <div
                  className={cn(
                    "aspect-square rounded-2xl border-[3px] shadow-ios-soft overflow-hidden relative transition group-active:scale-[0.95] flex items-center justify-center",
                    theme === "auto" ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-white"
                  )}
                  style={{
                    background:
                      "conic-gradient(from 90deg, #FFD7C4, #FFE7A0, #C6E8FF, #C9F0D4, #E2D3FF, #FFD3E0, #FFE0B0, #FFD7C4)",
                  }}
                >
                  <Wand2 className="h-4 w-4 text-babymo-ink/80" />
                </div>
                <div className="text-[10px] mt-1 text-center font-semibold truncate">Auto</div>
              </button>
              {THEMES.map((t) => (
                <button key={t.id} onClick={() => setTheme(t.id)} className="text-left group">
                  <div
                    className={cn(
                      "aspect-square rounded-2xl border-[3px] shadow-ios-soft overflow-hidden relative transition group-active:scale-[0.95]",
                      theme === t.id ? "border-babymo-green ring-2 ring-babymo-green/30" : "border-white"
                    )}
                    style={{
                      background: `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                    }}
                  />
                  <div className="text-[10px] mt-1 text-center text-muted-foreground truncate font-medium">{t.name}</div>
                </button>
              ))}
            </div>
          </Field>

          <Field label={`Batch size — ${batchSize} ${batchSize === 1 ? "piece" : "pieces"}`}>
            <div className="grid grid-cols-4 gap-2">
              {BATCH_SIZES.map((n) => (
                <button
                  key={n}
                  onClick={() => setBatchSize(n)}
                  className={cn(
                    "rounded-2xl border py-3 text-[15px] font-bold transition active:scale-[0.97]",
                    batchSize === n
                      ? "border-babymo-green bg-babymo-green text-white"
                      : "border-transparent bg-white text-foreground hover:bg-secondary/40"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </StepCard>

      {/* Step 3: Optional direction */}
      <StepCard step={3} label="Tambah arahan (opsional)" subtitle="Brief tambahan untuk AI / variasi tone">
        <Textarea
          placeholder="cth: tone bedtime story, akhiri dengan ayat, tambahkan Sahabat Mo POV…"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="min-h-[80px] bg-white rounded-2xl border-white shadow-ios-soft"
        />
      </StepCard>

      {/* Sticky generate bar */}
      <div className="sticky bottom-24 md:bottom-6 z-20 px-1">
        <div className="rounded-full bg-white/80 backdrop-blur-ios border border-white shadow-ios-card p-2 flex items-center gap-2">
          <div className="flex items-center gap-2 pl-3 min-w-0 flex-1">
            <Wand2 className="h-4 w-4 text-babymo-green shrink-0" />
            <span className="text-[13px] font-semibold truncate">
              <span className="hidden sm:inline">{activeType?.label} · {format} · </span>{batchSize}×
            </span>
          </div>
          <Button onClick={handleGenerate} disabled={busy} size="lg" className="shrink-0 whitespace-nowrap">
            {busy ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                <span className="hidden xs:inline">Generating</span> {batchSize}…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Generate {batchSize}
              </span>
            )}
          </Button>
        </div>
      </div>

      {warning && (
        <div className="rounded-2xl border border-babymo-yellow/50 bg-babymo-yellow/20 p-3 text-[12px] flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-babymo-ink mt-0.5 shrink-0" />
          <div className="leading-relaxed">{warning}</div>
        </div>
      )}
      {error && (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-[12px] text-destructive">
          {error}
        </div>
      )}

      {/* Results */}
      {busy && results.length === 0 && <SkeletonGrid count={batchSize} format={format} />}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Hasil — {results.length} pieces</div>
            <Badge variant="green">Tersimpan di library</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((r) => (
              <ContentCard key={r.id} content={r} />
            ))}
          </div>
        </div>
      )}
      {!busy && results.length === 0 && (
        <Card className="border-dashed border-2 bg-transparent shadow-none">
          <CardContent className="p-10 text-center">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-babymo-green/15 flex items-center justify-center mb-3">
              <Sparkles className="h-5 w-5 text-babymo-green" />
            </div>
            <div className="font-semibold">Belum ada batch</div>
            <div className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              Pilih tipe konten di atas, lalu tekan <b>Generate</b>. Hasil otomatis tersimpan di Library.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StepCard({ step, label, subtitle, children }: { step: number; label: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Card className="bg-white/70 backdrop-blur-ios">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-babymo-green text-white text-[13px] font-bold flex items-center justify-center shadow-ios-sticker">
            {step}
          </div>
          <div>
            <div className="font-bold text-[15px] leading-tight">{label}</div>
            <div className="text-[12px] text-muted-foreground">{subtitle}</div>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.16em] font-semibold text-muted-foreground mb-2">{label}</div>
      {children}
    </div>
  );
}

function SkeletonGrid({ count, format }: { count: number; format: FormatId }) {
  const aspect = format === "reels" ? "1080 / 1920" : "1 / 1";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="bg-secondary relative" style={{ aspectRatio: aspect }}>
            <div className="absolute inset-0 shimmer" />
          </div>
          <CardContent className="p-4">
            <div className="h-3 w-2/3 rounded-full bg-secondary relative overflow-hidden mb-2">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="h-3 w-1/2 rounded-full bg-secondary relative overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
