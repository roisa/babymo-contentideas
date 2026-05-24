import Link from "next/link";
import { THEMES } from "@/lib/themes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ThemesPage() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Visual themes</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Hand-tuned Baby Mo palettes — soft, modern, calm. Pick one to generate with.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {THEMES.map((t) => (
          <Card key={t.id} className="overflow-hidden">
            <div
              className="aspect-square relative"
              style={{
                background: `linear-gradient(140deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
              }}
            >
              <div className="absolute inset-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div
                    className="rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] border bg-white/70"
                    style={{ color: t.ink, borderColor: `${t.accent}55` }}
                  >
                    Baby Mo · {t.name}
                  </div>
                  <div className="aspect-square w-10 rounded-full" style={{ background: `${t.accent}40`, border: `2px dashed ${t.accent}` }} />
                </div>
                <div>
                  <div className="font-semibold text-xl" style={{ color: t.ink }}>
                    A tiny dua
                  </div>
                  <div className="text-xs mt-1" style={{ color: t.muted }}>
                    Whisper it tonight.
                  </div>
                </div>
                <div className="flex justify-between text-[10px]" style={{ color: t.footer }}>
                  <span>babymo.studio</span>
                  <span>{t.mood}</span>
                </div>
              </div>
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium text-sm">{t.name}</div>
                <Badge variant="outline" className="font-normal capitalize">{t.mood}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{t.description}</p>
              <div className="flex gap-1.5 pt-1">
                {t.gradient.map((c, i) => (
                  <div key={i} className="h-5 w-5 rounded-full border" style={{ background: c }} />
                ))}
                <div className="h-5 w-5 rounded-full border" style={{ background: t.accent }} />
                <div className="h-5 w-5 rounded-full border" style={{ background: t.ink }} />
              </div>
              <Button asChild size="sm" variant="soft" className="w-full mt-2">
                <Link href={`/generate?theme=${t.id}`}>Generate with this theme →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
