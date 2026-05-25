/**
 * Rename + optimize Baby Mo pose PNGs:
 *   baby-mo-poses/{original}.png
 *     →
 *   baby-mo-poses/baby-mo-{semantic|NN}.png  (800×800, ~85% smaller)
 *
 * Originals stay where they are (you can re-run / re-optimise later if
 * a different size is needed). Optimised files live in
 * `baby-mo-poses-optimized/` and `lib/poses.ts` reads from that folder.
 */
const sharp = require("sharp");
const fs = require("fs/promises");
const path = require("path");

const SRC = path.join(__dirname, "..", "baby-mo-poses");
const DST = path.join(__dirname, "..", "baby-mo-poses-optimized");

// Original "Baby Mo_<Name>" set → semantic filenames.
const NAMED_MAP = {
  "Alright": "alright",
  "Idea": "idea",
  "Ok": "ok",
  "Run": "run",
  "Thank You": "thank-you",
  "Wow": "wow",
  "Yes": "yes",
  "Yeyy": "yeyy",
};

async function main() {
  await fs.mkdir(DST, { recursive: true });
  const files = (await fs.readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".png"));
  console.log(`Found ${files.length} pose PNGs`);

  // 1) Named poses (8) — map by semantic name
  const named = files.filter((f) => f.includes("Baby Mo_"));
  // 2) Lintang poses — sort by date then index, number sequentially 01..NN
  const lintang = files
    .filter((f) => f.includes("LINTANG"))
    .sort((a, b) => {
      const dateA = a.match(/^(\d{8})/)?.[1] ?? "";
      const dateB = b.match(/^(\d{8})/)?.[1] ?? "";
      if (dateA !== dateB) return dateA.localeCompare(dateB);
      const idxA = parseInt(a.match(/_(\d+)_/)?.[1] ?? "0", 10);
      const idxB = parseInt(b.match(/_(\d+)_/)?.[1] ?? "0", 10);
      return idxA - idxB;
    });

  const renameMap = {};

  for (const f of named) {
    const m = f.match(/Baby Mo_([^.]+)\.png$/);
    const name = m ? NAMED_MAP[m[1]] : null;
    if (!name) {
      console.warn(`  skip unknown named: ${f}`);
      continue;
    }
    renameMap[f] = `baby-mo-${name}.png`;
  }
  lintang.forEach((f, i) => {
    renameMap[f] = `baby-mo-pose-${String(i + 1).padStart(2, "0")}.png`;
  });

  let totalIn = 0;
  let totalOut = 0;
  for (const [src, dst] of Object.entries(renameMap)) {
    const srcPath = path.join(SRC, src);
    const dstPath = path.join(DST, dst);
    const srcStat = await fs.stat(srcPath);
    totalIn += srcStat.size;
    await sharp(srcPath)
      .resize(800, 800, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
      .toFile(dstPath);
    const dstStat = await fs.stat(dstPath);
    totalOut += dstStat.size;
    const pct = ((1 - dstStat.size / srcStat.size) * 100).toFixed(0);
    console.log(`  ${src.padEnd(48)} → ${dst.padEnd(24)} ${(srcStat.size / 1024).toFixed(0)}KB → ${(dstStat.size / 1024).toFixed(0)}KB (-${pct}%)`);
  }

  console.log(`\nTotal: ${(totalIn / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB (-${((1 - totalOut / totalIn) * 100).toFixed(0)}%)`);
  console.log(`Saved ${Object.keys(renameMap).length} files to ${path.relative(process.cwd(), DST)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
