"use client";

import { useEffect, useMemo, useState } from "react";
import { useLibrary } from "@/lib/store";
import { ContentCard } from "@/components/content-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/content-types";
import { Library as LibraryIcon, Trash2, Cloud, CloudOff, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";

export function LibraryClient() {
  const items = useLibrary((s) => s.items);
  const remove = useLibrary((s) => s.remove);
  const clear = useLibrary((s) => s.clear);
  const sync = useLibrary((s) => s.sync);
  const syncError = useLibrary((s) => s.syncError);
  const serverEnabled = useLibrary((s) => s.serverEnabled);
  const hydrate = useLibrary((s) => s.hydrate);
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="ml-auto">
          <Button variant="ghost" size="sm" onClick={() => confirm("Clear all generated content?") && clear()}>
            <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Clear all
          </Button>
        </div>
      </div>

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
