import { getCachedArabicByAttribution } from "../lib/arabic-cache";

async function main() {
  const cases = [
    "(QS. Al-Inshirah: 5-6)",
    "HR. Al-Hakim 3392",                          // newly added
    "HR. Bukhari 1923 & HR. Muslim 1095",         // joined — should match either
    "HR. Bukhari 6464 & HR. Muslim 783",          // joined
    "HR. Bukhari 1899 & Muslim 1079",             // joined (one without HR. prefix)
    "QS. NotReal: 99",                            // not in lookup
  ];
  for (const attr of cases) {
    const r = await getCachedArabicByAttribution(attr);
    console.log(`  ${attr.padEnd(46)} → ${r ? `OK h=${r.height}` : "(no cache)"}`);
  }
}
main();
