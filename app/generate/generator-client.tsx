"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, FORMATS, STORY_STYLES, findContentType, type FormatId } from "@/lib/content-types";
import { THEMES, type ThemeId } from "@/lib/themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Sparkles, Wand2, AlertCircle } from "lucide-react";
import { ContentCard } from "@/components/content-card";
import { useLibrary } from "@/lib/store";
import type { GeneratedContent, GenerationRequest } from "@/lib/types";

const BATCH_SIZES = [1, 5, 10, 20] as const;

export function GeneratorClient() {
  const search = useSearchParams();
  const initialTheme = (search.get("theme") as ThemeId) ?? "warm-cream";
  const initialType = search.get("type") ?? "daily-dua";

  const [contentTypeId, setContentTypeId] = useState<string>(initialType);
  const [theme, setTheme] = useState<ThemeId>(initialTheme);
  const [format, setFormat] = useState<FormatId>(() => {
    const m = findContentType(initialType);
    return m?.type.suggestedFormat ?? "single";
  });
  const [storyStyle, setStoryStyle] = useState<string>("style-a");
  const [batchSize, setBatchSize] = useState<number>(5);
  const [customPrompt, setCustomPrompt] = useState("");

  const [busy, setBusy] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addBatch = useLibrary((s) => s.addBatch);

  const activeCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.types.some((t) => t.id === contentTypeId)) ?? CATEGORIES[0];
  }, [contentTypeId]);

  const activeType = findContentType(contentTypeId)?.type;

  function pickType(id: string) {
    setContentTypeId(id);
    const sf = findContentType(id)?.type.suggestedFormat;
    if (sf) setFormat(sf);
  }

  async function handleGenerate() {
    setBusy(true);
    setError(null);
    setWarning(null);
    try {
      const req: GenerationRequest = {
        contentTypeId,
        format,
        theme,
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
    <div className="grid grid-cols-1 lg:grid-cols-[360px,1fr] gap-6">
      {/* Left rail */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">1. Content framework</CardTitle>
            <CardDescription>Pick the category & content type.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Tabs value={activeCategory.id} onValueChange={() => {}}>
              <TabsList className="flex-wrap h-auto bg-muted/60 p-1 gap-1">
                {CATEGORIES.map((c) => (
                  <TabsTrigger
                    key={c.id}
                    value={c.id}
                    onClick={() => pickType(c.types[0].id)}
                    className="text-[11px] px-2.5 py-1 h-auto"
                  >
                    {c.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {CATEGORIES.map((c) => (
                <TabsContent key={c.id} value={c.id} className="mt-3">
                  <div className="grid grid-cols-1 gap-1.5">
                    {c.types.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => pickType(t.id)}
                        className={cn(
                          "w-full text-left rounded-xl border p-2.5 transition",
                          contentTypeId === t.id
                            ? "border-babymo-gold bg-babymo-gold/10"
                            : "border-transparent hover:bg-muted"
                        )}
                      >
                        <div className="text-sm font-medium">{t.label}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{t.hint}</div>
                      </button>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">2. Format</CardTitle>
            <CardDescription>Single, carousel, or reels.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={cn(
                  "rounded-xl border p-3 text-left transition",
                  format === f.id ? "border-babymo-gold bg-babymo-gold/10" : "border-input hover:bg-muted"
                )}
              >
                <div className="text-sm font-medium">{f.name}</div>
                <div className="text-[11px] text-muted-foreground mt-1">
                  {f.width}×{f.height}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {format === "carousel" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">3. Storytelling structure</CardTitle>
              <CardDescription>How the carousel flows.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-2">
              {STORY_STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStoryStyle(s.id)}
                  className={cn(
                    "w-full text-left rounded-xl border p-2.5 transition",
                    storyStyle === s.id ? "border-babymo-gold bg-babymo-gold/10" : "border-input hover:bg-muted"
                  )}
                >
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">{s.description}</div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Theme</CardTitle>
            <CardDescription>Soft palettes, Baby Mo-tuned.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-2">
            {THEMES.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)} className="text-left group">
                <div
                  className={cn(
                    "aspect-square rounded-xl border-2 shadow-sm overflow-hidden relative transition",
                    theme === t.id ? "border-babymo-gold ring-2 ring-babymo-gold/30" : "border-transparent"
                  )}
                  style={{
                    background: `linear-gradient(140deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                  }}
                />
                <div className="text-[10px] mt-1 text-center text-muted-foreground truncate">{t.name}</div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Batch size</CardTitle>
            <CardDescription>How many to generate.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-2">
            {BATCH_SIZES.map((n) => (
              <button
                key={n}
                onClick={() => setBatchSize(n)}
                className={cn(
                  "rounded-xl border py-3 text-sm font-medium transition",
                  batchSize === n ? "border-babymo-gold bg-babymo-gold/10" : "border-input hover:bg-muted"
                )}
              >
                {n}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Optional · custom direction</CardTitle>
            <CardDescription>Add a creative brief.</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor="prompt" className="sr-only">Custom direction</Label>
            <Textarea
              id="prompt"
              placeholder="e.g. tone like a soft letter, mention bedtime, end with a Quran ayah…"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </CardContent>
        </Card>

        <Button onClick={handleGenerate} disabled={busy} size="lg" className="w-full">
          {busy ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              Generating {batchSize} pieces…
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Generate {batchSize} pieces
            </span>
          )}
        </Button>
        {activeType && (
          <div className="text-xs text-muted-foreground text-center">
            <Wand2 className="inline h-3 w-3 mr-1 -mt-0.5" />
            {activeType.label} · {format} · {batchSize}×
          </div>
        )}
      </div>

      {/* Right side: results */}
      <div className="space-y-4 min-w-0">
        {warning && (
          <div className="rounded-xl border border-babymo-gold/40 bg-babymo-gold/10 p-3 text-xs flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-babymo-ink mt-0.5 shrink-0" />
            <div className="leading-relaxed">{warning}</div>
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
            {error}
          </div>
        )}

        {busy && results.length === 0 && <SkeletonGrid count={batchSize} format={format} />}

        {results.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Latest batch — {results.length} pieces</div>
              <Badge variant="soft" className="font-normal">Saved to library</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.map((r) => (
                <ContentCard key={r.id} content={r} />
              ))}
            </div>
          </>
        ) : (
          !busy && (
            <Card className="border-dashed">
              <CardContent className="p-10 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-babymo-gold/15 flex items-center justify-center mb-3">
                  <Sparkles className="h-5 w-5 text-babymo-ink" />
                </div>
                <div className="font-medium">No batch yet</div>
                <div className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                  Pick a content type on the left, choose a format and theme, then hit generate. Your library will keep everything you make.
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}

function SkeletonGrid({ count, format }: { count: number; format: FormatId }) {
  const aspect = format === "reels" ? "1080 / 1920" : "1 / 1";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="bg-muted/60 relative" style={{ aspectRatio: aspect }}>
            <div className="absolute inset-0 shimmer" />
          </div>
          <CardContent className="p-4">
            <div className="h-3 w-2/3 rounded-full bg-muted relative overflow-hidden mb-2">
              <div className="absolute inset-0 shimmer" />
            </div>
            <div className="h-3 w-1/2 rounded-full bg-muted relative overflow-hidden">
              <div className="absolute inset-0 shimmer" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
