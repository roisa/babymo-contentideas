import { getCachedArabicByAttribution } from "../lib/arabic-cache";

async function main() {
  const cases = [
    "(QS. Al-Inshirah: 5-6)",
    "QS. Al-Inshirah: 5-6",
    "HR. Bukhari 6312",
    "(HR. Tirmidzi 3426)",
    "QS. Not Real: 99",
    "",
    undefined,
  ];
  for (const attr of cases) {
    const r = await getCachedArabicByAttribution(attr);
    const label = (attr ?? "<undef>").padEnd(28);
    console.log(`  ${label} → ${r ? `OK, h=${r.height}, ${r.dataUrl.length}b dataUrl` : "(no cache)"}`);
  }
}
main();
