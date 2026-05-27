import { lookupArabicByAttribution } from "../lib/arabic-lookup";

const cases = [
  "(QS. Al-Inshirah: 5-6)",
  "QS. Al-Inshirah: 5-6",
  "qs. al-inshirah: 5-6",
  "HR. Bukhari 6312",
  "(HR. Tirmidzi 3426)",
  "QS. Al-Baqarah: 286",
  "QS. NonExistent: 99",
  "",
  undefined,
];

for (const attr of cases) {
  const result = lookupArabicByAttribution(attr);
  const label = (attr ?? "<undefined>").padEnd(28);
  console.log(`  ${label} → ${result ? result.slice(0, 50) + "..." : "(not in lookup)"}`);
}
