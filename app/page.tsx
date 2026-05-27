import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Layers, Zap, Heart, Library, Palette, ArrowRight, Check } from "lucide-react";
import { CATEGORIES } from "@/lib/content-types";
import { THEMES } from "@/lib/themes";
import { BrandMark } from "@/components/sidebar";

const QUICK_LINKS = [
  { href: "/generate", label: "Generate", desc: "Make 5–20 pieces in minutes", icon: Sparkles, color: "babymo-coral", bg: "bg-babymo-coral/10" },
  { href: "/calendar", label: "Calendar", desc: "30-day content plan", icon: Calendar, color: "babymo-sky", bg: "bg-babymo-sky/10" },
  { href: "/library", label: "Library", desc: "Your generated content", icon: Library, color: "babymo-yellow-dark", bg: "bg-babymo-yellow/30" },
  { href: "/themes", label: "Themes", desc: "Bright Baby Mo palettes", icon: Palette, color: "babymo-green", bg: "bg-babymo-green-soft" },
];

export default function HomePage() {
  return (
    <div className="px-4 md:px-10 lg:px-12 py-8 md:py-12 max-w-6xl mx-auto animate-fade-in">
      {/* Hero */}
      <div className="flex flex-col gap-6 mb-10 md:mb-14">
        <div className="flex items-center gap-2 flex-wrap">
          <BrandMark size={36} />
          <Badge variant="green" className="font-mono">
            {/* SHA + build time = "is this the version I expect?" at a glance.
             *  Falls back to "local" when not running on Vercel. */}
            build {process.env.NEXT_PUBLIC_BUILD_SHA ?? "local"} ·{" "}
            {process.env.NEXT_PUBLIC_BUILD_TIME ?? ""}
          </Badge>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.02]">
          Konten Baby Mo, <span className="text-babymo-green">dalam menit.</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
          Studio internal untuk produksi konten Instagram Baby Mo — single post, carousel, & reels — secara cepat,
          konsisten, dan langsung sesuai brand. Tim desainer tinggal swap background scene & character pose.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild size="xl">
            <Link href="/generate">
              <Sparkles className="h-4 w-4 mr-2" /> Mulai generate
            </Link>
          </Button>
          <Button asChild size="xl" variant="glass">
            <Link href="/calendar">
              <Calendar className="h-4 w-4 mr-2" /> 30-day plan
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick links — iOS tile grid */}
      <section className="mb-10 md:mb-14">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3 font-semibold">Quick start</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="group">
                <Card className="h-full hover:shadow-ios-sticker transition-all active:scale-[0.98]">
                  <CardContent className="p-4 md:p-5">
                    <div className={`h-11 w-11 rounded-2xl ${item.bg} flex items-center justify-center mb-3 shadow-inner`}>
                      <Icon className={`h-5 w-5 text-${item.color}`} />
                    </div>
                    <div className="font-semibold text-[15px] mb-0.5">{item.label}</div>
                    <div className="text-[12px] text-muted-foreground leading-tight">{item.desc}</div>
                    <ArrowRight className="h-3.5 w-3.5 mt-3 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Showcase row — what the studio makes */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 font-semibold">Made for</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Tim produksi Baby Mo</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BulletCard
            icon={<Zap className="h-5 w-5" />}
            color="bg-babymo-coral/15 text-babymo-coral-dark"
            title="Cepet banget"
            items={["Batch 5 / 10 / 20 sekali klik", "Render PNG / ZIP otomatis", "Tinggal swap art di Canva"]}
          />
          <BulletCard
            icon={<Heart className="h-5 w-5" />}
            color="bg-babymo-green-soft text-babymo-green-dark"
            title="On brand"
            items={["Voice Indonesian Sahabat Mo", "Palette resmi Baby Mo", "Logo + character zone tertanam"]}
          />
          <BulletCard
            icon={<Layers className="h-5 w-5" />}
            color="bg-babymo-yellow/30 text-babymo-ink"
            title="Storytelling siap pakai"
            items={["Hadith + atribusi", "Arabic + arti otomatis", "Hook → reflection → CTA"]}
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 font-semibold">Frameworks</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">7 kategori, 30+ tipe konten</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/generate">Lihat semua →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/generate?type=${c.types[0].id}`}>
              <Card className="h-full hover:shadow-ios-sticker hover:-translate-y-0.5 transition group cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between mb-1">
                    <CardTitle className="text-[15px]">{c.name}</CardTitle>
                    <Badge variant="green" className="text-[10px]">{c.types.length}</Badge>
                  </div>
                  <CardDescription>{c.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {c.types.slice(0, 2).map((t) => (
                      <Badge key={t.id} variant="soft" className="font-normal text-[10px]">
                        {t.label}
                      </Badge>
                    ))}
                    {c.types.length > 2 && (
                      <Badge variant="outline" className="font-normal text-[10px]">
                        +{c.types.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Themes */}
      <section className="mb-10 md:mb-14">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 font-semibold">Visual</div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Bright Baby Mo themes</h2>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/themes">Buka galeri →</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {THEMES.map((t) => (
            <Link key={t.id} href={`/generate?theme=${t.id}`} className="group">
              <div
                className="aspect-square rounded-ios border-[3px] border-white shadow-ios-soft overflow-hidden relative group-hover:shadow-ios-sticker group-active:scale-[0.97] transition"
                style={{
                  background: `linear-gradient(170deg, ${t.gradient[0]} 0%, ${t.gradient[1]} 55%, ${t.gradient[2]} 100%)`,
                }}
              >
                <div className="absolute left-2 right-2 bottom-2 rounded-xl bg-white/80 backdrop-blur px-2 py-1.5">
                  <div className="text-[11px] font-bold text-foreground truncate">{t.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <Card className="overflow-hidden bg-gradient-to-br from-babymo-green via-babymo-green to-babymo-green-dark text-white border-babymo-green">
          <div className="p-7 md:p-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="space-y-2 max-w-xl">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-bold">Ayo, mulai!</div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                Generate 20 konten Baby Mo dalam menit.
              </h3>
              <p className="text-[14px] text-white/80">
                Pilih kategori, format, theme — batch size. Export JPG / PNG / ZIP siap kirim ke designer.
              </p>
            </div>
            <Button asChild size="xl" variant="accent">
              <Link href="/generate">
                <Sparkles className="h-4 w-4 mr-2" /> Mulai generate
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}

function BulletCard({ icon, color, title, items }: { icon: React.ReactNode; color: string; title: string; items: string[] }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <div className="font-bold text-[16px] mb-2.5">{title}</div>
        <ul className="space-y-1.5">
          {items.map((it, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-babymo-green shrink-0 mt-0.5" strokeWidth={3} />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
