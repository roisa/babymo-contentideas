/** Verify that warmUp() eliminates the cold-start tax on first render. */
import { performance } from "node:perf_hooks";
import { renderSlidePng, warmUp } from "../lib/render";
import type { GeneratedContent } from "../lib/types";

const sample: GeneratedContent = {
  id: "bench",
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
    {
      heading: "Doa Sebelum Tidur",
      kicker: "Yuk, Hafalkan!",
      body: "Bismika Allahumma amuutu wa ahyaa.\n\n“Dengan nama-Mu ya Allah.”",
      arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
      attribution: "HR. Bukhari 6312",
    },
  ],
};

async function bench(label: string, fn: () => Promise<unknown>) {
  const t = performance.now();
  const r = await fn();
  const ms = performance.now() - t;
  console.log(`  ${label.padEnd(36)} ${ms.toFixed(0).padStart(5)} ms`);
  return r;
}

async function main() {
  console.log("Warmup effectiveness:\n");
  await bench("warmUp() — primes caches", () => warmUp());
  await bench("first render (post-warmup)", () => renderSlidePng(sample, 0));
  await bench("second render", () => renderSlidePng(sample, 0));
  console.log("\nCompare: without warmup the first render took ~4200 ms.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
