"use client";

import { useEffect, useMemo, useState } from "react";
import { THEMES, type ThemeId } from "@/lib/themes";
import { CATEGORIES, FORMATS } from "@/lib/content-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidePreview } from "@/components/slide-preview";
import { ContentDetailDialog } from "@/components/content-card";
import { useLibrary } from "@/lib/store";
import { Calendar, Sparkles, Save, RefreshCw, Moon } from "lucide-react";
import type { GeneratedContent } from "@/lib/types";
import type { IslamicPhase } from "@/lib/hijri";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const WEEKDAY_FOCUS: Record<(typeof WEEKDAYS)[number], string> = {
  Mon: "Dua",
  Tue: "Parenting",
  Wed: "Did You Know",
  Thu: "Stories",
  Fri: "Jumuah",
  Sat: "Nostalgia",
  Sun: "Bedtime",
};

interface IslamicMeta {
  phase: IslamicPhase;
  monthName: string;
  month: number;
  day: number;
  year: number;
}

export function CalendarClient() {
  const [theme, setTheme] = useState<ThemeId>("coral-pink");
  const [days, setDays] = useState<GeneratedContent[]>([]);
  const [islamic, setIslamic] = useState<IslamicMeta | null>(null);
  const [busy, setBusy] = useState(false);
  const [selected, setSelected] = useState<GeneratedContent | null>(null);
  const addBatch = useLibrary((s) => s.addBatch);

  async function plan() {
    setBusy(true);
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      const data = (await res.json()) as {
        items: GeneratedContent[];
        meta?: { islamic: IslamicMeta };
      };
      setDays(data.items);
      setIslamic(data.meta?.islamic ?? null);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    plan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // re-plan when theme changes
  useEffect(() => {
    if (days.length > 0) plan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  function saveAll() {
    addBatch(days);
  }

  return (
    <div className="space-y-5">
      {islamic && islamic.phase !== "none" && <IslamicBanner meta={islamic} />}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 mr-3">
          <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Theme</span>
          <div className="flex gap-1.5">
            {THEMES.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)} title={t.name}>
                <div
                  className={cn(
                    "h-7 w-7 rounded-full border-2 transition shadow-sm",
                    theme === t.id ? "border-babymo-gold ring-2 ring-babymo-gold/30" : "border-transparent"
                  )}
                  style={{
                    background: `linear-gradient(140deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        <Button variant="soft" size="sm" onClick={plan} disabled={busy}>
          <RefreshCw className={cn("h-3.5 w-3.5 mr-1.5", busy && "animate-spin")} />
          {busy ? "Planning…" : "Re-plan"}
        </Button>
        <Button size="sm" onClick={saveAll}>
          <Save className="h-3.5 w-3.5 mr-1.5" /> Save 30 to library
        </Button>
      </div>

      {/* Week structure legend — horizontal scroll on mobile so each chip
       *  shows its full label; grid layout on desktop. */}
      <div className="-mx-4 md:mx-0 px-4 md:px-0 overflow-x-auto md:overflow-visible">
        <div className="flex md:grid md:grid-cols-7 gap-2 min-w-max md:min-w-0 pb-1">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="shrink-0 md:shrink min-w-[110px] md:min-w-0 rounded-xl bg-white/60 backdrop-blur border p-3 text-center"
            >
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{w}</div>
              <div className="text-sm font-medium mt-0.5 whitespace-nowrap">{WEEKDAY_FOCUS[w]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {days.map((c, i) => (
          <DayCard key={c.id} content={c} day={i + 1} weekday={WEEKDAYS[i % 7]} onOpen={() => setSelected(c)} />
        ))}
      </div>

      {selected && (
        <ContentDetailDialog
          content={selected}
          open={!!selected}
          onOpenChange={(b) => !b && setSelected(null)}
        />
      )}
    </div>
  );
}

function DayCard({
  content,
  day,
  weekday,
  onOpen,
}: {
  content: GeneratedContent;
  day: number;
  weekday: string;
  onOpen: () => void;
}) {
  return (
    <button onClick={onOpen} className="text-left group">
      <Card className="overflow-hidden group-hover:shadow-md transition">
        <SlidePreview content={content} className="rounded-none border-0 border-b" />
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-1">
            <Badge variant="soft" className="font-normal">
              Day {day}
            </Badge>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{weekday}</span>
          </div>
          <div className="text-xs font-medium line-clamp-1">{content.title}</div>
          <div className="text-[11px] text-muted-foreground line-clamp-1">{content.contentTypeLabel}</div>
        </CardContent>
      </Card>
    </button>
  );
}

function IslamicBanner({ meta }: { meta: IslamicMeta }) {
  // Friendly copy per phase. The plan in lib/ai-engine.ts already
  // swapped the content types for this week — this banner just tells
  // the user *why* they're seeing Ramadan content this month.
  const copy: Record<Exclude<IslamicPhase, "none">, { title: string; sub: string }> = {
    "ramadan-approaching": {
      title: "Ramadan is around the corner",
      sub: "The plan ramps up with Ramadan reminders + Fun Facts so the team has runway content before Day 1.",
    },
    ramadan: {
      title: "Ramadan Mubarak 🌙",
      sub: "Plan swapped to Sahur / Iftar / Tarawih / First Fast / Fun Facts so every weekday hits the holy month.",
    },
    "ramadan-last-ten": {
      title: "Last ten nights of Ramadan",
      sub: "Lailatul Qadr and Eid prep dominate this week — the most-watched, most-shared moments of the year.",
    },
    "eid-week": {
      title: "Eid Mubarak 🎉",
      sub: "First week of Shawwal — the plan leans into Eid greetings, takbir, and post-Ramadan reflections.",
    },
  };
  const c = copy[meta.phase as Exclude<IslamicPhase, "none">];
  if (!c) return null;
  return (
    <div className="rounded-2xl border border-babymo-green/30 bg-gradient-to-br from-babymo-green-soft to-white p-4 flex items-start gap-3">
      <div className="h-9 w-9 rounded-xl bg-babymo-green/15 flex items-center justify-center shrink-0">
        <Moon className="h-4 w-4 text-babymo-green" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-bold text-[14px]">{c.title}</div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {meta.monthName} {meta.day}, {meta.year} AH
          </span>
        </div>
        <div className="text-[12px] text-muted-foreground mt-1 leading-relaxed">{c.sub}</div>
      </div>
    </div>
  );
}
