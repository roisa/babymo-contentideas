"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LayoutGrid, Calendar, Palette, Library, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Studio", icon: LayoutGrid },
  { href: "/generate", label: "Generate", icon: Sparkles },
  { href: "/library", label: "Library", icon: Library },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/themes", label: "Themes", icon: Palette },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col gap-2 p-4 border-r border-border/60 bg-white/40 backdrop-blur-sm min-h-screen">
      <Link href="/" className="flex items-center gap-2 px-3 py-3 mb-2">
        <div className="h-9 w-9 rounded-2xl bg-babymo-gold/20 flex items-center justify-center">
          <Heart className="h-5 w-5 text-babymo-ink" />
        </div>
        <div>
          <div className="text-sm font-semibold leading-tight">Baby Mo</div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Content Studio</div>
        </div>
      </Link>
      <div className="soft-divider mb-1" />
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border bg-white/70 p-4 text-xs">
        <div className="font-medium mb-1">Soft Islam, daily.</div>
        <div className="text-muted-foreground leading-relaxed">
          A content engine for the modern Muslim home. Premium · calm · scalable.
        </div>
      </div>
    </aside>
  );
}

export function MobileTopbar() {
  return (
    <div className="md:hidden sticky top-0 z-30 flex items-center justify-between gap-2 px-4 py-3 bg-white/70 backdrop-blur border-b border-border/60">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-babymo-gold/20 flex items-center justify-center">
          <Heart className="h-4 w-4 text-babymo-ink" />
        </div>
        <span className="text-sm font-semibold">Baby Mo · Content Studio</span>
      </Link>
      <nav className="flex items-center gap-1 text-xs">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="px-2 py-1 text-muted-foreground hover:text-foreground">
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
