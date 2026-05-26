import {
  CATEGORIES,
  THEMES_BY_CONTENT_TYPE,
  THEMES_BY_CATEGORY,
  CONTENT_TYPE_POSE_OVERRIDES,
  POSES_BY_CATEGORY,
  ICONIC_POSES,
} from "../lib/content-types";

console.log("=== Derived map sizes ===");
console.log("THEMES_BY_CONTENT_TYPE:", Object.keys(THEMES_BY_CONTENT_TYPE).length, "entries");
console.log("THEMES_BY_CATEGORY:    ", Object.keys(THEMES_BY_CATEGORY).length, "entries");
console.log("CONTENT_TYPE_POSE_OVERRIDES:", Object.keys(CONTENT_TYPE_POSE_OVERRIDES).length, "entries");
console.log("POSES_BY_CATEGORY:     ", Object.keys(POSES_BY_CATEGORY).length, "entries");
console.log("ICONIC_POSES:          ", Object.keys(ICONIC_POSES).length, "entries");

console.log("\n=== Content types missing themeAlternates ===");
for (const c of CATEGORIES) {
  for (const t of c.types) {
    if (!t.themeAlternates) {
      console.log(`  ${c.id}/${t.id}: no themeAlternates (will fallback to category)`);
    }
  }
}

console.log("\n=== Categories with no themeFallback ===");
for (const c of CATEGORIES) {
  if (!c.themeFallback) console.log(`  ${c.id}`);
}

console.log("\n=== Spot-check: daily-dua themes ===");
console.log(JSON.stringify(THEMES_BY_CONTENT_TYPE["daily-dua"]));

console.log("\n=== Spot-check: ramadan-sahur theme + pose ===");
console.log("theme:", JSON.stringify(THEMES_BY_CONTENT_TYPE["ramadan-sahur"]));
console.log("pose:", JSON.stringify(CONTENT_TYPE_POSE_OVERRIDES["ramadan-sahur"]));

console.log("\n=== Spot-check: daily-islamic category ===");
console.log("themeFallback:", JSON.stringify(THEMES_BY_CATEGORY["daily-islamic"]));
console.log("iconic:", JSON.stringify(ICONIC_POSES["daily-islamic"]));
