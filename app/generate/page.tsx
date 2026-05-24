import { Suspense } from "react";
import { GeneratorClient } from "./generator-client";

export default function GeneratePage() {
  return (
    <div className="px-4 md:px-10 lg:px-12 py-6 md:py-10 max-w-6xl mx-auto animate-fade-in">
      <div className="mb-6 md:mb-8">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1 font-semibold">Generate</div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Bikin konten Baby Mo</h1>
        <p className="text-sm md:text-[15px] text-muted-foreground mt-2 max-w-xl">
          Tiga langkah: pilih konten, atur format, generate. Hasilnya tersimpan otomatis di Library — siap di-export PNG / ZIP.
        </p>
      </div>
      <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
        <GeneratorClient />
      </Suspense>
    </div>
  );
}
