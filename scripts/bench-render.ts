/**
 * Measure render latency. The first call pays cold-start cost (font
 * loading, logo embed, resvg init, arabic font load). Subsequent calls
 * should be much faster thanks to in-process caching in lib/render.tsx
 * and lib/poses.ts.
 *
 * Run: `npx tsx scripts/bench-render.ts`
 */
import { performance } from "node:perf_hooks";
import { renderSlidePng } from "../lib/render";
import type { GeneratedContent } from "../lib/types";

function sample(arabic: boolean): GeneratedContent {
  return {
    id: arabic ? "bench-arabic" : "bench-plain",
    createdAt: Date.now(),
    contentTypeId: "daily-dua",
    contentTypeLabel: "Daily Dua",
    categoryId: "daily-islamic",
    format: "single",
    theme: "cream-sand",
    title: "Bench",
    hook: "Bench",
    caption: "",
    cta: "",
    hashtags: [],
    slides: [
      arabic
        ? {
            heading: "Doa Sebelum Tidur",
            kicker: "Yuk, Hafalkan!",
            body: "Bismika Allahumma amuutu wa ahyaa.\n\n“Dengan nama-Mu ya Allah.”",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
            attribution: "HR. Bukhari 6312",
          }
        : {
            heading: "Capek itu tanda sayang.",
            kicker: "Untuk Mama",
            body: "Setiap hari kamu kasih yang terbaik.",
          },
    ],
  };
}

async function bench(label: string, fn: () => Promise<unknown>) {
  const t = performance.now();
  await fn();
  const ms = performance.now() - t;
  console.log(`  ${label.padEnd(28)} ${ms.toFixed(0).padStart(5)} ms`);
  return ms;
}

async function main() {
  console.log("Cold-start render benchmark (each row is one slide PNG):\n");

  console.log("[Cold]");
  await bench("plain (single)", () => renderSlidePng(sample(false), 0));
  await bench("arabic (single)", () => renderSlidePng(sample(true), 0));

  console.log("\n[Warm — fonts/logo cached]");
  await bench("plain (single)", () => renderSlidePng(sample(false), 0));
  await bench("arabic (single)", () => renderSlidePng(sample(true), 0));
  await bench("plain again", () => renderSlidePng(sample(false), 0));

  console.log("\nCold-vs-warm gap = the cost the user pays on the");
  console.log("very first /api/render after a Vercel container spins up.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
