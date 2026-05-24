import { Suspense } from "react";
import { GeneratorClient } from "./generator-client";

export default function GeneratePage() {
  return (
    <div className="px-6 md:px-10 lg:px-16 py-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Generate content</h1>
        <p className="text-sm text-muted-foreground mt-1">Pick a framework, format, theme — and a batch size. We'll do the rest.</p>
      </div>
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
        <GeneratorClient />
      </Suspense>
    </div>
  );
}
