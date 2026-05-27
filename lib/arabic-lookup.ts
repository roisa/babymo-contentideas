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
  "hr. al-hakim 3392": "مَنْ قَرَأَ سُورَةَ الْكَهْفِ يَوْمَ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ",

  // ----- More commonly-cited Quran ayahs (high-confidence only) -----
  "qs. al-anbiya: 87": "لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
  "qs. al-ankabut: 45": "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ",
  "qs. al-baqarah: 201": "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
  "qs. al-isra: 24": "وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُلْ رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
  "qs. al-imran: 190": "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ",
  "qs. an-naba: 9": "وَجَعَلْنَا نَوْمَكُمْ سُبَاتًا",
  "qs. ar-rum: 24": "وَمِنْ آيَاتِهِ يُرِيكُمُ الْبَرْقَ خَوْفًا وَطَمَعًا",
  "qs. at-talaq: 2-3": "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا * وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
  "qs. at-talaq: 3": "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
  "qs. az-zumar: 53": "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ",
  "qs. ibrahim: 7": "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
  "qs. ibrahim: 34": "وَإِنْ تَعُدُّوا نِعْمَتَ اللَّهِ لَا تُحْصُوهَا",
  "qs. thaha: 114": "رَبِّ زِدْنِي عِلْمًا",
  "qs. yusuf: 90": "إِنَّهُ مَنْ يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",

  // ----- More hadiths (very well-known only) -----
  "hr. bukhari 1129": "صَلَاةُ اللَّيْلِ مَثْنَى مَثْنَى",
  "hr. bukhari 1147": "صَلَاةُ اللَّيْلِ مَثْنَى مَثْنَى",
  "hr. bukhari 1899": "إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ",
  "hr. bukhari 6669": "إِذَا نَسِيَ أَحَدُكُمْ فَأَكَلَ وَشَرِبَ فَلْيُتِمَّ صَوْمَهُ فَإِنَّمَا أَطْعَمَهُ اللَّهُ وَسَقَاهُ",
  "hr. bukhari 953": "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ لَا يَغْدُو يَوْمَ الْفِطْرِ حَتَّى يَأْكُلَ تَمَرَاتٍ",
  "hr. bukhari 986": "كَانَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ إِذَا كَانَ يَوْمُ عِيدٍ خَالَفَ الطَّرِيقَ",
  "hr. bukhari 2017": "تَحَرَّوْا لَيْلَةَ الْقَدْرِ فِي الْوِتْرِ مِنَ الْعَشْرِ الْأَوَاخِرِ مِنْ رَمَضَانَ",
  "hr. bukhari 5376": "كُلْ بِيَمِينِكَ وَكُلْ مِمَّا يَلِيكَ",
  "hr. bukhari 6038": "أَحَبُّ الدِّينِ إِلَى اللَّهِ الْحَنِيفِيَّةُ السَّمْحَةُ",
  "hr. bukhari 37": "مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
  "hr. muslim 234": "مَنْ تَوَضَّأَ فَأَحْسَنَ الْوُضُوءَ خَرَجَتْ خَطَايَاهُ مِنْ جَسَدِهِ",
  "hr. muslim 408": "أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ",
  "hr. muslim 759": "مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
  "hr. muslim 762": "لَيْلَةُ الْقَدْرِ لَيْلَةٌ طَلْقَةٌ بَلْجَةٌ لَا حَارَّةٌ وَلَا بَارِدَةٌ",
  "hr. muslim 1342": "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
  "hr. muslim 223": "الطَّهُورُ شَطْرُ الْإِيمَانِ",
  "hr. muslim 1907": "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
  "hr. tirmidzi 1905": "رِضَا الرَّبِّ فِي رِضَا الْوَالِدِ وَسَخَطُ الرَّبِّ فِي سَخَطِ الْوَالِدِ",
  "hr. tirmidzi 1956": "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
  "hr. tirmidzi 3464": "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
  "hr. nasa'i 1733": "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ",
  "hr. nasai 1733": "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ",
  "hr. abu dawud 1418": "إِنَّ اللَّهَ زَادَكُمْ صَلَاةً وَهِيَ الْوِتْرُ",
  "hr. ibnu sunni": "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
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
 * Resolve an attribution to its canonical LOOKUP key. Tries:
 *   1. The whole normalized string  (e.g. "hr. al-hakim 3392")
 *   2. Each "&"-separated part      (e.g. "HR. Bukhari 1923 & HR. Muslim 1095"
 *                                    → tries "hr. bukhari 1923" then
 *                                            "hr. muslim 1095")
 * Returns undefined when no part of the attribution matches.
 */
export function findLookupKey(attr: string | undefined): string | undefined {
  if (!attr) return undefined;
  const whole = normalizeAttribution(attr);
  if (ARABIC_LOOKUP[whole]) return whole;
  const parts = whole.split(/\s*&(?:amp;)?\s*/).map((p) => p.trim()).filter(Boolean);
  for (const part of parts) {
    if (ARABIC_LOOKUP[part]) return part;
  }
  return undefined;
}

/**
 * Find the canonical Arabic for an attribution string, if we have it.
 * Returns undefined when not in the lookup — the caller should leave
 * the slide without Arabic in that case rather than guessing.
 */
export function lookupArabicByAttribution(attr: string | undefined): string | undefined {
  const key = findLookupKey(attr);
  return key ? ARABIC_LOOKUP[key] : undefined;
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
