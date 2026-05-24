import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Palette, Layers, Zap, Heart, Library } from "lucide-react";
import { CATEGORIES } from "@/lib/content-types";
import { THEMES } from "@/lib/themes";

export default function HomePage() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-12 max-w-7xl mx-auto animate-fade-in">
      {/* Hero */}
      <div className="flex flex-col gap-5 mb-12">
        <div className="flex items-center gap-2">
          <Badge variant="soft">Internal Studio</Badge>
          <Badge variant="accent">v1 · Beta</Badge>
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl leading-[1.05]">
          A premium AI-powered Islamic parenting content studio.
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
          Generate 20 decent, on-brand Instagram contents in minutes. Single posts, carousels, and reels — all in Baby Mo's
          soft, modern aesthetic. Built for speed, automation, and emotional branding.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild size="lg">
            <Link href="/generate">
              <Sparkles className="h-4 w-4 mr-2" /> Generate content
            </Link>
          </Button>
          <Button asChild size="lg" variant="glass">
            <Link href="/calendar">
              <Calendar className="h-4 w-4 mr-2" /> 30-day plan
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/library">
              <Library className="h-4 w-4 mr-2" /> Your library
            </Link>
          </Button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
        <FeatureCard
          icon={<Zap className="h-5 w-5" />}
          title="Batch in minutes"
          body="Generate 5, 10, or 20 pieces at once. No drag-drop. No layers. Just speed."
        />
        <FeatureCard
          icon={<Heart className="h-5 w-5" />}
          title="Emotionally branded"
          body="Every piece feels soft, intimate, and Baby Mo. Tone-tuned by category."
        />
        <FeatureCard
          icon={<Layers className="h-5 w-5" />}
          title="Storytelling structures"
          body="Hook → reflection → CTA. Question → insight → takeaway. Mini stories for kids."
        />
      </div>

      {/* Content categories */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Content frameworks</h2>
            <p className="text-sm text-muted-foreground">Seven categories. Thirty-plus content types. All tuned to Baby Mo.</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/generate">Open generator →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Card key={c.id} className="hover:shadow-md transition group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{c.name}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {c.types.slice(0, 3).map((t) => (
                    <Badge key={t.id} variant="soft" className="font-normal">
                      {t.label}
                    </Badge>
                  ))}
                  {c.types.length > 3 && (
                    <Badge variant="outline" className="font-normal">
                      +{c.types.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Themes preview */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Visual themes</h2>
            <p className="text-sm text-muted-foreground">Hand-tuned palettes. Soft gradients. Calm typography.</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/themes">View all →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <Link key={t.id} href={`/generate?theme=${t.id}`} className="group">
              <div
                className="aspect-square rounded-2xl border shadow-sm overflow-hidden relative"
                style={{
                  background: `linear-gradient(140deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                }}
              >
                <div className="absolute inset-x-2 bottom-2 rounded-xl bg-white/70 backdrop-blur px-2 py-1.5">
                  <div className="text-[10px] font-medium text-foreground truncate">{t.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="overflow-hidden border-babymo-gold/30 bg-gradient-to-br from-babymo-cream via-white to-babymo-sand/40">
          <div className="p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Ready to fill the next 30 days?</h3>
              <p className="text-sm text-muted-foreground">
                Open the generator, pick a format, choose a theme, set a batch size. Export as JPG, PNG, or zipped sets.
              </p>
            </div>
            <Button asChild size="lg" variant="accent">
              <Link href="/generate">
                <Sparkles className="h-4 w-4 mr-2" /> Start generating
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <div className="h-10 w-10 rounded-xl bg-babymo-gold/15 flex items-center justify-center mb-2 text-babymo-ink">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-relaxed">{body}</CardDescription>
      </CardHeader>
    </Card>
  );
}
