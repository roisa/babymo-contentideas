import { getIslamicContext } from "../lib/hijri";

const cases: Array<[string, Date]> = [
  ["now (real)",                              new Date()],
  ["Mar 15, 2026 (mid-Ramadan)",              new Date("2026-03-15")],
  ["Mar 27, 2026 (last-ten)",                 new Date("2026-03-27")],
  ["Apr 1, 2026 (post-Eid, Shawwal week)",    new Date("2026-04-01")],
  ["Feb 10, 2026 (Sha'ban → approaching?)",   new Date("2026-02-10")],
  ["Jan 1, 2027 (Rajab — none)",              new Date("2027-01-01")],
];

for (const [label, d] of cases) {
  const ctx = getIslamicContext(d);
  console.log(`${label.padEnd(44)} → ${ctx.monthName} ${ctx.day} ${ctx.year} AH · phase=${ctx.phase}`);
}
