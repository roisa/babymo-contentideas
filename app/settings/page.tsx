import { Suspense } from "react";
import { SettingsClient } from "./settings-client";

export default function SettingsPage() {
  return (
    <div className="px-4 md:px-10 lg:px-12 py-6 md:py-10 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 font-semibold">Settings</div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Integrations & studio</h1>
        <p className="text-sm md:text-[15px] text-muted-foreground mt-2 max-w-xl">
          Wire the studio to your shared Baby Mo Canva account so every generated piece can be one-click-opened in Canva.
        </p>
      </div>
      <Suspense fallback={null}>
        <SettingsClient />
      </Suspense>
    </div>
  );
}
