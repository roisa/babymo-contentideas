"use client";

import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/lib/store";
import { ContentCard } from "@/components/content-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/content-types";
import { Library as LibraryIcon, Trash2, Cloud, CloudOff, RefreshCw, AlertCircle, Wand2 } from "lucide-react";
import Link from "next/link";
import { lookupArabicByAttribution } from "@/lib/arabic-lookup";
import type { GeneratedContent } from "@/lib/types";

export function LibraryClient() {
  const items = useLibrary((s) => s.items);
  const remove = useLibrary((s) => s.remove);
  const clear = useLibrary((s) => s.clear);
  const sync = useLibrary((s) => s.sync);
  const syncError = useLibrary((s) => s.syncError);
  const serverEnabled = useLibrary((s) => s.serverEnabled);
  const hydrate = useLibrary((s) => s.hydrate);
  const replaceItems = useLibrary((s) => s.replaceItems);
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);
  const [fixing, setFixing] = useState(false);
  const [fixToast, setFixToast] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Count items that have at least one slide where the curated Arabic
  // lookup would inject something (attribution matches AND no arabic
  // currently). The "Fix Arabic" button only shows when this is > 0.
  const fixableCount = useMemo(() => {
    let n = 0;
    for (const it of items) {
      const hasFixable = it.slides.some(
        (s) => (!s.arabic || !s.arabic.trim()) && lookupArabicByAttribution(s.attribution)
      );
      if (hasFixable) n++;
    }
    return n;
  }, [items]);

  async function backfillArabic() {
    setFixing(true);
    setFixToast(null);
    try {
      const res = await fetch("/api/library/backfill-arabic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // When the server isn't configured, send our local items up and
        // let the endpoint do the lookup work (keeps the logic in one
        // place — no duplicating it on the client).
        body: JSON.stringify({ items }),
      });
      const data = (await res.json()) as {
        configured: boolean;
        fixedCount: number;
        items: GeneratedContent[];
      };
      replaceItems(data.items);
      setFixToast(
        data.fixedCount === 0
          ? "Nothing to fix — all eligible Arabic already in place."
          : `Updated ${data.fixedCount} piece${data.fixedCount === 1 ? "" : "s"} with canonical Arabic.`
      );
      setTimeout(() => setFixToast(null), 4000);
    } catch (e) {
      setFixToast(`Backfill failed: ${e instanceof Error ? e.message : String(e)}`);
      setTimeout(() => setFixToast(null), 5000);
    } finally {
      setFixing(false);
    }
  }

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const it of items) map[it.categoryId] = (map[it.categoryId] ?? 0) + 1;
    return map;
  }, [items]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((i) => i.categoryId === filter);
  }, [items, filter]);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-babymo-gold/15 flex items-center justify-center mb-3">
            <LibraryIcon className="h-5 w-5 text-babymo-ink" />
          </div>
          <div className="font-medium">Nothing here yet.</div>
          <div className="text-sm text-muted-foreground mt-1">Open the generator to make your first batch.</div>
          <Button asChild className="mt-4">
            <Link href="/generate">Generate content</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <SyncBanner sync={sync} serverEnabled={serverEnabled} syncError={syncError} onRetry={hydrate} />
      <div className="flex items-center gap-2 flex-wrap">
        <FilterChip label="All" count={items.length} active={filter === "all"} onClick={() => setFilter("all")} />
        {CATEGORIES.map((c) =>
          counts[c.id] ? (
            <FilterChip
              key={c.id}
              label={c.name}
              count={counts[c.id]}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            />
          ) : null
        )}
        <div className="ml-auto flex items-center gap-1">
          {fixableCount > 0 && (
            <Button variant="soft" size="sm" onClick={backfillArabic} disabled={fixing} title="Inject canonical Arabic into pieces that are missing it">
              <Wand2 className={cn("h-3.5 w-3.5 mr-1.5", fixing && "animate-spin")} />
              {fixing ? "Fixing…" : `Fix Arabic (${fixableCount})`}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={() => confirm("Clear all generated content?") && clear()}>
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Clear all
          </Button>
        </div>
      </div>

      {fixToast && (
        <div className="rounded-2xl border border-babymo-green/30 bg-babymo-green-soft/60 px-3 py-2 text-[12px] text-foreground inline-flex items-center gap-2">
          <Wand2 className="h-3.5 w-3.5 text-babymo-green" />
          {fixToast}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((c) => (
          <ContentCard key={c.id} content={c} onRemove={remove} />
        ))}
      </div>
    </div>
  );
}

function SyncBanner({
  sync,
  serverEnabled,
  syncError,
  onRetry,
}: {
  sync: import("@/lib/store").SyncStatus;
  serverEnabled: boolean;
  syncError: string | null;
  onRetry: () => void;
}) {
  if (sync === "synced" && serverEnabled) {
    return (
      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
        <Cloud className="h-3 w-3 text-babymo-green" />
        Team library · synced
      </div>
    );
  }
  if (sync === "hydrating") {
    return (
      <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
        <RefreshCw className="h-3 w-3 animate-spin" />
        Syncing team library…
      </div>
    );
  }
  if (sync === "local-only" || !serverEnabled) {
    return (
      <div className="rounded-2xl border border-border/40 bg-white/50 px-3 py-2 text-[12px] text-muted-foreground inline-flex items-center gap-2">
        <CloudOff className="h-3.5 w-3.5" />
        Local-only mode — library lives in this browser. Configure Upstash Redis in <Link href="/settings" className="underline">Settings</Link> to share across the team.
      </div>
    );
  }
  if (sync === "error") {
    return (
      <div className="rounded-2xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-[12px] text-destructive inline-flex items-center gap-2">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span className="min-w-0 break-all">Sync error: {syncError ?? "unknown"}</span>
        <button onClick={onRetry} className="ml-2 underline whitespace-nowrap">Retry</button>
      </div>
    );
  }
  return null;
}

function FilterChip({ label, count, active, onClick }: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
        active ? "bg-babymo-ink text-white border-babymo-ink" : "bg-white hover:bg-muted border-input"
      }`}
    >
      {label}
      <Badge variant={active ? "outline" : "soft"} className={active ? "bg-white/10 text-white border-white/20" : ""}>
        {count}
      </Badge>
    </button>
  );
}
