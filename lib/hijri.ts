/**
 * Detect Islamic-calendar context (Ramadan window, Eid week) so the
 * 30-day Calendar planner can inject Ramadan content types automatically
 * when relevant.
 *
 * Uses the `islamic` calendar built into ECMAScript Intl (works in
 * Node 18+ and all modern browsers). The Intl Islamic calendar is
 * Tabular-Civil, which can be 1-2 days off from official Ummul-Qura
 * sightings — fine for content-planning purposes; we just need to
 * know "is Ramadan coming/here?", not the exact moonsight.
 */

export type IslamicPhase =
  | "ramadan-approaching" // within 14 days of Ramadan 1
  | "ramadan"             // anywhere in Ramadan (1-29/30)
  | "ramadan-last-ten"    // last 10 nights (Lailatul Qadr window)
  | "eid-week"            // Shawwal 1-7
  | "none";

export interface IslamicContext {
  phase: IslamicPhase;
  /** Hijri month name in English (e.g. "Ramadan", "Shawwal"). */
  monthName: string;
  /** 1-indexed Hijri month (1..12). 9 = Ramadan, 10 = Shawwal. */
  month: number;
  /** Hijri day of month. */
  day: number;
  /** Hijri year. */
  year: number;
}

const MONTH_NAMES = [
  "Muharram", "Safar", "Rabi al-Awwal", "Rabi al-Thani",
  "Jumada al-Ula", "Jumada al-Thani", "Rajab", "Sha'ban",
  "Ramadan", "Shawwal", "Dhul Qi'dah", "Dhul Hijjah",
];

/**
 * Convert a Gregorian Date to the Tabular Islamic calendar via
 * Intl.DateTimeFormat. Returns { year, month (1-12), day }.
 */
function toIslamic(date: Date): { year: number; month: number; day: number } {
  const fmt = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const parts = fmt.formatToParts(date);
  let year = 0, month = 0, day = 0;
  for (const p of parts) {
    if (p.type === "year") year = parseInt(p.value, 10);
    else if (p.type === "month") month = parseInt(p.value, 10);
    else if (p.type === "day") day = parseInt(p.value, 10);
  }
  return { year, month, day };
}

/** Days between two dates (positive if `b` is after `a`). */
function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/**
 * Find the next Ramadan 1 (Gregorian Date) on or after `from`.
 * Walks forward day by day — slow but trivially correct, and called
 * at most once per Calendar /api/calendar request.
 */
function findNextRamadanStart(from: Date): Date {
  const d = new Date(from);
  for (let i = 0; i < 366; i++) {
    const h = toIslamic(d);
    if (h.month === 9 && h.day === 1) return new Date(d);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  // Should never hit — Ramadan happens every Hijri year.
  return new Date(from);
}

export function getIslamicContext(now: Date = new Date()): IslamicContext {
  const h = toIslamic(now);
  const monthName = MONTH_NAMES[h.month - 1] ?? "Unknown";

  // In Ramadan?
  if (h.month === 9) {
    return {
      phase: h.day >= 20 ? "ramadan-last-ten" : "ramadan",
      monthName,
      month: h.month,
      day: h.day,
      year: h.year,
    };
  }

  // First 10 days of Shawwal = Eid + post-Eid sweetness. Eid al-Fitr is
  // Shawwal 1; takbir + festivities run ~3 days but the content stays
  // relevant for a week-plus after.
  if (h.month === 10 && h.day <= 10) {
    return { phase: "eid-week", monthName, month: h.month, day: h.day, year: h.year };
  }

  // Approaching Ramadan (last 14 days of Sha'ban). Sha'ban is month 8.
  if (h.month === 8) {
    const nextRamadan = findNextRamadanStart(now);
    if (daysBetween(now, nextRamadan) <= 14) {
      return {
        phase: "ramadan-approaching",
        monthName,
        month: h.month,
        day: h.day,
        year: h.year,
      };
    }
  }

  return { phase: "none", monthName, month: h.month, day: h.day, year: h.year };
}
