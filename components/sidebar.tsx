"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LayoutGrid, Calendar, Palette, Library, Heart, Star, Settings, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Studio", icon: LayoutGrid, color: "babymo-green" },
  { href: "/generate", label: "Generate", icon: Sparkles, color: "babymo-coral" },
  { href: "/animate", label: "Animate", icon: Video, color: "babymo-coral" },
  { href: "/library", label: "Library", icon: Library, color: "babymo-yellow" },
  { href: "/calendar", label: "Calendar", icon: Calendar, color: "babymo-sky" },
  { href: "/themes", label: "Themes", icon: Palette, color: "babymo-orange" },
  { href: "/settings", label: "Settings", icon: Settings, color: "babymo-green" },
];

export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="rounded-full bg-babymo-green flex items-center justify-center shadow-ios-sticker border-[3px] border-white"
      style={{ width: size, height: size }}
    >
      <Heart className="text-white" style={{ width: size * 0.45, height: size * 0.45 }} fill="white" />
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 p-4 border-r border-border/40 bg-white/50 backdrop-blur-ios min-h-screen sticky top-0">
      <Link href="/" className="flex items-center gap-3 px-2 py-4 mb-2">
        <BrandMark size={48} />
        <div>
          <div className="text-base font-bold tracking-tight leading-none">Baby Mo</div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-1">Content Studio</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-all",
                active
                  ? "bg-white shadow-ios-soft text-foreground"
                  : "text-muted-foreground hover:bg-white/70 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "h-9 w-9 rounded-xl flex items-center justify-center transition",
                  active ? `bg-${item.color}/15` : "bg-secondary"
                )}
              >
                <Icon className={cn("h-[18px] w-[18px]", active ? `text-${item.color}` : "text-muted-foreground")} />
              </div>
              <span>{item.label}</span>
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-babymo-green" />}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-ios-lg border border-white/60 bg-gradient-to-br from-babymo-green-soft to-white p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-lg bg-babymo-yellow/60 flex items-center justify-center">
            <Star className="h-3.5 w-3.5 text-babymo-ink" fill="currentColor" />
          </div>
          <div className="text-xs font-bold text-babymo-ink">Internal beta</div>
        </div>
        <div className="text-[11px] text-muted-foreground leading-relaxed">
          Content engine for the Baby Mo team. Designers refine outputs after.
        </div>
      </div>
    </aside>
  );
}

export function MobileTopbar() {
  return (
    <div className="md:hidden sticky top-0 z-30 flex items-center justify-between gap-2 px-4 py-3 bg-white/70 backdrop-blur-ios border-b border-border/40">
      <Link href="/" className="flex items-center gap-2">
        <BrandMark size={34} />
        <span className="text-sm font-bold tracking-tight">Baby Mo Studio</span>
      </Link>
    </div>
  );
}

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <div className="md:hidden sticky bottom-0 z-30 px-3 pb-3 pt-2">
      <div className="flex items-center justify-around gap-1 rounded-full bg-white/80 backdrop-blur-ios border border-white shadow-ios-card p-1.5">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-0.5 rounded-full py-2 transition",
                active ? "bg-babymo-green text-white" : "text-muted-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
