/**
 * Curated Arabic for well-known ayahs and hadith. Used as a fallback
 * when the AI omits the `arabic` field on a slide whose attribution
 * clearly references one of these (e.g. "QS. Al-Inshirah: 5-6").
 *
 * Authentic, sourced from the same references the seeds use. Lookup is
 * case-insensitive and ignores surrounding punctuation/parens, so
 * `"(QS. Al-Inshirah: 5-6)"` and `"QS. Al-Inshirah: 5-6"` both match.
 *
 * Keep this list curated — never add an entry you're not 100% sure is
 * the correct authentic Arabic. The whole point of the renderer's
 * empty-PNG safety check is that "missing Arabic" is better than "wrong
 * Arabic shown to thousands of Muslims."
 */

export const ARABIC_LOOKUP: Record<string, string> = {
  // ----- Quran ayahs -----
  "qs. al-inshirah: 5-6": "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا * إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  "qs. al-inshirah: 6": "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
  "qs. al-baqarah: 286": "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
  "qs. al-baqarah: 153": "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
  "qs. al-baqarah: 152": "فَاذْكُرُونِي أَذْكُرْكُمْ",
  "qs. al-baqarah: 185": "شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ",
  "qs. al-baqarah: 183": "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ",
  "qs. al-hadid: 4": "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنْتُمْ",
  "qs. al-ikhlas: 1": "قُلْ هُوَ اللَّهُ أَحَدٌ",
  "qs. an-naas: 1": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
  "qs. al-falaq: 1": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
  "qs. al-qadr: 3": "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ",
  "qs. ar-rahman: 13": "فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ",
  "qs. ad-duha: 5": "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
  "qs. ad-duha: 11": "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ",
  "qs. ali imran: 134": "وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
  "qs. ali imran: 159": "فَبِمَا رَحْمَةٍ مِنَ اللَّهِ لِنْتَ لَهُمْ",
  "qs. ar-ra'd: 28": "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
  "qs. al-mu'min: 60": "ادْعُونِي أَسْتَجِبْ لَكُمْ",
  "qs. ghafir: 60": "ادْعُونِي أَسْتَجِبْ لَكُمْ",
  "qs. luqman: 14": "وَوَصَّيْنَا الْإِنْسَانَ بِوَالِدَيْهِ",
  "qs. al-isra: 23": "وَبِالْوَالِدَيْنِ إِحْسَانًا",

  // ----- Hadith (most-cited dua/wisdom hadith with Arabic) -----
  "hr. bukhari 1": "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
  "hr. bukhari 6312": "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
  "hr. bukhari 1923": "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
  "hr. bukhari 1904": "لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ عِنْدَ فِطْرِهِ، وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ",
  "hr. bukhari 1896": "إِنَّ فِي الْجَنَّةِ بَابًا يُقَالُ لَهُ الرَّيَّانُ",
  "hr. bukhari 6464": "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
  "hr. bukhari 6011": "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
  "hr. muslim 1095": "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
  "hr. muslim 2699": "مَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ",
  "hr. abu dawud 2358": "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
  "hr. abu dawud 2356": "كَانَ يُفْطِرُ عَلَى رُطَبَاتٍ قَبْلَ أَنْ يُصَلِّيَ",
  "hr. tirmidzi 3598": "ثَلَاثَةٌ لَا تُرَدُّ دَعْوَتُهُمْ",
  "hr. tirmidzi 3513": "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
  "hr. tirmidzi 3426": "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  "hr. ahmad 24206": "اللَّهُمَّ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
};

/**
 * Normalize an attribution string for lookup. Strips parens, trims
 * whitespace, lowercases. So `"(QS. Al-Inshirah: 5-6)"` →
 * `"qs. al-inshirah: 5-6"`.
 */
function normalizeAttribution(attr: string): string {
  return attr
    .replace(/[()]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Find the canonical Arabic for an attribution string, if we have it.
 * Returns undefined when not in the lookup — the caller should leave
 * the slide without Arabic in that case rather than guessing.
 */
export function lookupArabicByAttribution(attr: string | undefined): string | undefined {
  if (!attr) return undefined;
  return ARABIC_LOOKUP[normalizeAttribution(attr)];
}

/* ============================================================
 * Backfill helpers — used by the Library page's "Fix Arabic"
 * button to retroactively repair pieces generated before the
 * curated lookup existed.
 * ============================================================ */

/**
 * Backfill missing Arabic on a single content piece. Returns the new
 * item (or the same reference if nothing changed) and a flag.
 *
 * Generic on T = any object with `.slides[].arabic` + `.slides[].attribution`
 * — so this works with the real `GeneratedContent` type without us
 * having to import it here (keeps this file dep-free for client bundles).
 */
export function backfillArabicInContent<
  S extends { arabic?: string; attribution?: string },
  T extends { slides: S[] }
>(item: T): { item: T; changed: boolean } {
  let changed = false;
  const newSlides = item.slides.map((s): S => {
    const hasArabic = typeof s.arabic === "string" && s.arabic.trim().length > 0;
    if (hasArabic) return s;
    const lookedUp = lookupArabicByAttribution(s.attribution);
    if (!lookedUp) return s;
    changed = true;
    return { ...s, arabic: lookedUp };
  });
  if (!changed) return { item, changed: false };
  return { item: { ...item, slides: newSlides }, changed: true };
}

/**
 * Sweep an array of items, returning the new array and the count of
 * items that received an Arabic backfill.
 */
export function backfillArabicInItems<
  S extends { arabic?: string; attribution?: string },
  T extends { slides: S[] }
>(items: T[]): { items: T[]; fixedCount: number } {
  let fixedCount = 0;
  const next = items.map((it): T => {
    const { item, changed } = backfillArabicInContent<S, T>(it);
    if (changed) fixedCount++;
    return item;
  });
  return { items: next, fixedCount };
}
