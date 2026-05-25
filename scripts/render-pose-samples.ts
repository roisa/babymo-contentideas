/**
 * One-shot script: render a handful of samples that prove the new
 * beat-aware pose logic. Output goes to .samples/<name>.png.
 *
 * Each sample picks the pose via lib/poses.ts → loadPoseDataUrl so we
 * exercise the same code path that the production /api/render uses.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { renderSlidePng } from "../lib/render";
import { pickPoseFilename } from "../lib/poses";
import type { GeneratedContent, Slide } from "../lib/types";

const OUT = path.join(process.cwd(), ".samples");

function makeContent(opts: {
  id: string;
  categoryId: string;
  contentTypeId: string;
  contentTypeLabel: string;
  format: GeneratedContent["format"];
  theme: GeneratedContent["theme"];
  title: string;
  slides: Slide[];
}): GeneratedContent {
  return {
    id: opts.id,
    title: opts.title,
    hook: opts.title,
    caption: "",
    cta: "Save & share!",
    hashtags: [],
    categoryId: opts.categoryId,
    contentTypeId: opts.contentTypeId,
    contentTypeLabel: opts.contentTypeLabel,
    format: opts.format,
    theme: opts.theme,
    slides: opts.slides,
    createdAt: Date.now(),
  };
}

const SAMPLES: Array<{ name: string; content: GeneratedContent; slideIndex?: number }> = [
  // ---- 1. Single post (Daily Dua) → should pick ICONIC_POSE "thank-you"
  {
    name: "01-daily-dua-single-iconic",
    content: makeContent({
      id: "s1",
      categoryId: "daily-islamic",
      contentTypeId: "daily-dua",
      contentTypeLabel: "Daily Dua",
      format: "single",
      theme: "cream-sand",
      title: "Doa Sebelum Tidur",
      slides: [
        {
          heading: "Doa Sebelum Tidur",
          kicker: "Yuk, Hafalkan!",
          body: "Bismika Allahumma amuutu wa ahyaa.\n\n“Dengan nama-Mu ya Allah, aku mati dan aku hidup.”",
          arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
          attribution: "HR. Bukhari 6312",
        },
      ],
    }),
  },

  // ---- 2. Single post (Mama Reflection) → ICONIC_POSE "alright"
  {
    name: "02-mama-reflection-single-iconic",
    content: makeContent({
      id: "s2",
      categoryId: "emotional-childhood",
      contentTypeId: "mama-reflection",
      contentTypeLabel: "Mama Reflection",
      format: "single",
      theme: "peach-apricot",
      title: "Capek itu tanda kamu sayang banget.",
      slides: [
        {
          heading: "Capek itu tanda kamu sayang banget.",
          kicker: "Untuk Mama",
          body: "Setiap hari kamu kasih yang terbaik — meskipun nggak kelihatan.",
        },
      ],
    }),
  },

  // ---- 3. POV Muslim Childhood reel → CONTENT_TYPE_OVERRIDE "dreamy" arc
  {
    name: "03-pov-childhood-reels-slide-0",
    content: makeContent({
      id: "s3",
      categoryId: "reels",
      contentTypeId: "pov-muslim-childhood",
      contentTypeLabel: "POV Muslim Childhood",
      format: "reels",
      theme: "lavender-night",
      title: "POV: Sahur dimasakin Mama",
      slides: [
        { heading: "POV: Sahur Bareng Mama", kicker: "Ingat Nggak?", body: "Bangun jam 3, langit masih gelap." },
        { heading: "Bau Nasi Goreng", kicker: "Scene 2", body: "Dapur hangat, Mama udah siap." },
        { heading: "Bismillah Bareng", kicker: "Scene 3", body: "Doa dulu, baru makan." },
        { heading: "Adzan Subuh", kicker: "Scene 4", body: "Pelan-pelan, langit mulai cerah." },
        { heading: "Save kalau Kangen", kicker: "CTA", body: "Tag mama-mu di kolom komentar." },
      ],
    }),
    slideIndex: 0,
  },

  // ---- 4. POV Muslim Childhood reel slide 2 (REVEAL) → still dreamy
  {
    name: "04-pov-childhood-reels-slide-2",
    content: makeContent({
      id: "s4",
      categoryId: "reels",
      contentTypeId: "pov-muslim-childhood",
      contentTypeLabel: "POV Muslim Childhood",
      format: "reels",
      theme: "lavender-night",
      title: "POV: Sahur dimasakin Mama",
      slides: [
        { heading: "POV: Sahur Bareng Mama", kicker: "Ingat Nggak?", body: "Bangun jam 3, langit masih gelap." },
        { heading: "Bau Nasi Goreng", kicker: "Scene 2", body: "Dapur hangat, Mama udah siap." },
        { heading: "Bismillah Bareng", kicker: "Scene 3", body: "Doa dulu, baru makan." },
        { heading: "Adzan Subuh", kicker: "Scene 4", body: "Pelan-pelan, langit mulai cerah." },
        { heading: "Save kalau Kangen", kicker: "CTA", body: "Tag mama-mu di kolom komentar." },
      ],
    }),
    slideIndex: 2,
  },

  // ---- 5. Adab Hari Ini carousel slide 0 (HOOK) → bow-greeting (override)
  {
    name: "05-adab-carousel-slide-0-hook",
    content: makeContent({
      id: "s5",
      categoryId: "kids-educational",
      contentTypeId: "adab-hari-ini",
      contentTypeLabel: "Adab Hari Ini",
      format: "carousel",
      theme: "mint-garden",
      title: "Adab Mengucap Salam",
      slides: [
        { heading: "Adab Salam", kicker: "Yuk, Belajar!", body: "Salam itu doa untuk teman kita." },
        { heading: "Kenapa Salam?", kicker: "Tahukah Kamu?", body: "Karena Rasulullah suka menebar salam." },
        { heading: "Caranya Gimana?", kicker: "Ini Caranya", body: "Assalamu’alaikum dulu, baru ngobrol." },
        { heading: "Tips dari Mo", kicker: "Coba Yuk!", body: "Salam ke siapa pun yang kamu temui." },
        { heading: "Simpan & Praktikkan", kicker: "CTA", body: "Tag teman buat mulai bareng." },
      ],
    }),
    slideIndex: 0,
  },

  // ---- 6. Adab Hari Ini carousel slide 4 (CTA) → confident-wink
  {
    name: "06-adab-carousel-slide-4-cta",
    content: makeContent({
      id: "s6",
      categoryId: "kids-educational",
      contentTypeId: "adab-hari-ini",
      contentTypeLabel: "Adab Hari Ini",
      format: "carousel",
      theme: "mint-garden",
      title: "Adab Mengucap Salam",
      slides: [
        { heading: "Adab Salam", kicker: "Yuk, Belajar!", body: "Salam itu doa untuk teman kita." },
        { heading: "Kenapa Salam?", kicker: "Tahukah Kamu?", body: "Karena Rasulullah suka menebar salam." },
        { heading: "Caranya Gimana?", kicker: "Ini Caranya", body: "Assalamu’alaikum dulu, baru ngobrol." },
        { heading: "Tips dari Mo", kicker: "Coba Yuk!", body: "Salam ke siapa pun yang kamu temui." },
        { heading: "Simpan & Praktikkan", kicker: "CTA", body: "Tag teman buat mulai bareng." },
      ],
    }),
    slideIndex: 4,
  },

  // ---- 7. Short 3-slide carousel — distributed beats (Kids Edu)
  {
    name: "07-kids-edu-3slide-distributed-slide-1",
    content: makeContent({
      id: "s7",
      categoryId: "kids-educational",
      contentTypeId: "did-you-know",
      contentTypeLabel: "Did You Know",
      format: "carousel",
      theme: "sunny-yellow",
      title: "Tahukah Kamu? Rasulullah Tersenyum!",
      slides: [
        { heading: "Tahukah Kamu?", kicker: "Yuk, Belajar!", body: "Senyum itu sedekah lho." },
        { heading: "Wow, Rasulullah Sering Senyum!", kicker: "Fakta", body: "Rasulullah selalu menyambut sahabatnya dengan senyum." },
        { heading: "Mulai dari Kamu!", kicker: "CTA", body: "Senyum ke teman hari ini, ya." },
      ],
    }),
    slideIndex: 1, // middle → REVEAL → wow
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  console.log(`Rendering ${SAMPLES.length} samples → ${OUT}\n`);

  for (const sample of SAMPLES) {
    const idx = sample.slideIndex ?? 0;
    const pick = pickPoseFilename(
      sample.content.categoryId,
      sample.content.contentTypeId,
      idx,
      sample.content.slides.length
    );
    console.log(`  ${sample.name}`);
    console.log(`    → category=${sample.content.categoryId} type=${sample.content.contentTypeId} slide ${idx + 1}/${sample.content.slides.length}`);
    console.log(`    → pose: ${pick}`);
    const png = await renderSlidePng(sample.content, idx);
    const outPath = path.join(OUT, `${sample.name}.png`);
    await writeFile(outPath, png);
    console.log(`    → ${outPath}\n`);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
