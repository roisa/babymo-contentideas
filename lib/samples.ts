import type { Slide } from "./types";

/**
 * Curated Baby Mo seeds.
 *
 * Voice matches the published @babymo.official feed:
 * - Indonesian / Bahasa, kid-friendly
 * - Bold, playful, attention-grabbing titles ("Tahukah Kamu?", "Yuk, Belajar!", "Wow!")
 * - Hadith/Quran with attribution
 * - Arabic + meaning when relevant
 * - Short body, emoji-ish energy without literal emoji
 */

export interface SampleSeed {
  title: string;
  hook: string;
  slides: Slide[];
  caption: string;
  cta: string;
  hashtags: string[];
}

export const SEEDS: Record<string, SampleSeed[]> = {
  /* ---------- DAILY ISLAMIC ---------- */
  "daily-dua": [
    {
      title: "Doa Sebelum Tidur",
      hook: "Tidur jadi lebih tenang sama Baby Mo.",
      slides: [
        {
          heading: "Doa Sebelum Tidur",
          kicker: "Yuk, Hafalkan!",
          body: "Bismika Allahumma amuutu wa ahyaa.\n\n“Dengan nama-Mu ya Allah, aku mati dan aku hidup.”",
          arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوْتُ وَأَحْيَا",
          attribution: "HR. Bukhari 6312",
        },
      ],
      caption: "Sebelum bobo, jangan lupa doa dulu ya, Sahabat Mo 🌙✨",
      cta: "Save & ajarkan ke adik!",
      hashtags: ["#BabyMo", "#DoaHarian", "#AnakMuslim", "#BismillahDulu"],
    },
    {
      title: "Doa Bangun Tidur",
      hook: "Mulai hari dengan rasa syukur.",
      slides: [
        {
          heading: "Doa Bangun Tidur",
          kicker: "Pagi yang Cerah!",
          body: "Alhamdulillahil ladzii ahyaanaa ba'da maa amaatanaa wa ilaihin nusyuur.\n\n“Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami.”",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا",
          attribution: "HR. Bukhari 6312",
        },
      ],
      caption: "Pagi-pagi, langsung Alhamdulillah dulu ya 🌞",
      cta: "Tag teman Mo-mu!",
      hashtags: ["#BabyMo", "#DoaPagi", "#AnakSholeh"],
    },
  ],
  "quran-ayah": [
    {
      title: "Allah Selalu Bersama Kita",
      hook: "Di manapun kamu, Allah selalu dekat.",
      slides: [
        {
          heading: "Allah Selalu Dekat",
          kicker: "Catatan Hari Ini:",
          body: "“Dan Dia bersama kamu di manapun kamu berada.”",
          arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
          attribution: "QS. Al-Hadid: 4",
        },
      ],
      caption: "Allah selalu dekat sama Sahabat Mo 💚",
      cta: "Save buat pengingat!",
      hashtags: ["#BabyMo", "#AyatQuran", "#AnakMuslim"],
    },
  ],
  "hadith-motivation": [
    {
      title: "Senyum itu Sedekah!",
      hook: "Senyum kecilmu bisa jadi pahala besar.",
      slides: [
        {
          heading: "Senyum kecilmu bisa jadi pahala besar.",
          body: "“Senyummu kepada saudaramu adalah sedekah.”",
          attribution: "HR. Tirmidzi 1956",
        },
      ],
      caption: "Ayo, senyum dulu hari ini! 😊 Pahala udah nunggu loh.",
      cta: "Bagikan ke teman Mo-mu!",
      hashtags: ["#BabyMo", "#SenyumSedekah", "#AnakMuslim", "#Hadits"],
    },
    {
      title: "Mengalah itu Hebat!",
      hook: "Bukan kalah, tapi pemenang sejati.",
      slides: [
        {
          heading: "Mengalah itu hebat, bukan kalah",
          body: "Rasulullah SAW bersabda: “Orang kuat adalah yang mampu menahan amarah.”",
          attribution: "HR. Bukhari 6114 & HR. Muslim 2609",
        },
      ],
      caption: "Pemenang sejati itu yang bisa sabar 💪",
      cta: "Save & jadi anak sholeh!",
      hashtags: ["#BabyMo", "#Sabar", "#AnakSholeh"],
    },
  ],
  "friday-reminder": [
    {
      title: "Jumat Berkah!",
      hook: "Hari yang paling Allah cintai.",
      slides: [
        {
          heading: "Jumat Penuh Berkah!",
          kicker: "Yuk, Amalkan!",
          body: "Hari Jumat adalah hari yang istimewa. Yuk, perbanyak baca shalawat & Surah Al-Kahfi!",
          attribution: "HR. Hakim 3392",
        },
      ],
      caption: "Jumat Mubarak, Sahabat Mo! 🌿✨",
      cta: "Tag sahabatmu, ucapkan Jumat Mubarak!",
      hashtags: ["#BabyMo", "#JumatBerkah", "#Shalawat"],
    },
  ],
  "ramadan-reminder": [
    {
      title: "Ramadan Sebentar Lagi!",
      hook: "Yuk, siap-siap dari sekarang!",
      slides: [
        {
          heading: "Ramadan Sebentar Lagi!",
          kicker: "Yuk, Persiapan!",
          body: "Bulan paling istimewa! Ayo siap-siap puasa, baca Quran, dan banyak sedekah ya, Sahabat Mo.",
        },
      ],
      caption: "Marhaban ya Ramadan! 🌙 Yuk sambut bareng Baby Mo!",
      cta: "Save buat checklist Ramadan!",
      hashtags: ["#BabyMo", "#Ramadan", "#AnakMuslim"],
    },
  ],
  "dhikr-reminder": [
    {
      title: "SubhanAllah",
      hook: "Satu kata, banyak pahala.",
      slides: [
        {
          heading: "SubhanAllah!",
          kicker: "Dzikir Harian:",
          body: "Yuk, ucapkan SubhanAllah 33x setiap hari. Hati jadi tenang, pahala terus bertambah!",
          arabic: "سُبْحَانَ ٱللَّٰهِ",
        },
      ],
      caption: "Dzikir dulu sebentar, hati jadi adem 🌿",
      cta: "Save & dzikir bareng!",
      hashtags: ["#BabyMo", "#Dzikir", "#AnakMuslim"],
    },
  ],

  /* ---------- EMOTIONAL CHILDHOOD ---------- */
  "tiny-heart-talks": [
    {
      title: "Bicara Sama Hati Kecil",
      hook: "Pelukan terbaik adalah doa.",
      slides: [
        {
          heading: "Sayang, Allah Sayang Kamu",
          kicker: "Bisikan Hati:",
          body: "Walaupun mama nggak selalu di sisi, Allah selalu menjaga. Tenang ya, sayang.",
        },
      ],
      caption: "Kalimat kecil yang bikin hati anak besar 💛",
      cta: "Bisikkan ke anakmu malam ini.",
      hashtags: ["#BabyMo", "#ParentingIslami", "#AnakMuslim"],
    },
  ],
  "dear-little-muslim": [
    {
      title: "Dear Sahabat Mo,",
      hook: "Surat kecil untuk Muslim cilik.",
      slides: [
        {
          heading: "Kamu Spesial!",
          kicker: "Dear Sahabat Mo,",
          body: "Allah ciptakan kamu dengan sempurna. Senyummu, suaramu, dan hatimu — semua dicintai-Nya.",
        },
      ],
      caption: "Untuk Sahabat Mo yang sedang tumbuh 🌱",
      cta: "Tag anak / keponakanmu!",
      hashtags: ["#BabyMo", "#SuratUntukAnak", "#MuslimKids"],
    },
  ],
  "before-sleep-series": [
    {
      title: "Sebelum Tidur, Yuk Lakukan Ini!",
      hook: "3 sunnah kecil sebelum bobo.",
      slides: [
        {
          heading: "Yuk, Wudhu Dulu!",
          kicker: "Sunnah Sebelum Tidur:",
          body: "Wudhu sebelum tidur bikin malam lebih berkah dan mimpi lebih indah.",
          attribution: "HR. Bukhari 247",
        },
      ],
      caption: "Yuk, mulai kebiasaan baik dari sekarang 🌙",
      cta: "Save & coba malam ini!",
      hashtags: ["#BabyMo", "#SunnahTidur", "#AnakMuslim"],
    },
  ],
  "tiny-tafakkur": [
    {
      title: "Lihat Daun, Ingat Allah",
      hook: "Tafakkur kecil setiap hari.",
      slides: [
        {
          heading: "MasyaAllah, Indah Banget!",
          kicker: "Yuk, Tafakkur:",
          body: "Lihat warna daun, suara angin, bentuk awan — semua tanda kebesaran Allah. Yuk, bilang “MasyaAllah!”",
        },
      ],
      caption: "Belajar lihat dunia dengan mata syukur 🌿",
      cta: "Save & ajak anak tafakkur!",
      hashtags: ["#BabyMo", "#Tafakkur", "#KebesaranAllah"],
    },
  ],
  "muslim-childhood-nostalgia": [
    {
      title: "Aroma Dapur Nenek",
      hook: "Islam belajar dari hal-hal kecil di rumah.",
      slides: [
        {
          heading: "Wangi Dapur Nenek di Hari Raya",
          kicker: "Kenangan Manis:",
          body: "Bismillah sebelum makan, doa sebelum tidur, suara adzan dari radio — itu cara kita kenal Islam pertama kali.",
        },
      ],
      caption: "Kenangan kecil yang bikin Islam terasa dekat 💛",
      cta: "Tag yang relate!",
      hashtags: ["#BabyMo", "#Nostalgia", "#KenanganIslam"],
    },
  ],

  /* ---------- PARENTING ---------- */
  "gentle-muslim-parenting": [
    {
      title: "Marah-Marah Bukan Tarbiyah",
      hook: "Lembut itu kuat, bukan lemah.",
      slides: [
        {
          heading: "Lembutlah pada Anakmu!",
          kicker: "Tahukah Kamu?",
          body: "Rasulullah SAW tidak pernah membentak anak. Beliau selalu lemah lembut. Yuk, tiru sunnah ini!",
          attribution: "HR. Muslim 2310",
        },
      ],
      caption: "Tarbiyah dengan cinta, bukan dengan amarah 💚",
      cta: "Save & jadi orangtua sabar!",
      hashtags: ["#BabyMo", "#ParentingIslami", "#GentleParenting"],
    },
  ],
  "mama-reflection": [
    {
      title: "Mama, Kamu Hebat!",
      hook: "Setiap kelelahanmu dilihat Allah.",
      slides: [
        {
          heading: "Mama, Allah Lihat Kamu",
          kicker: "Pesan Sayang:",
          body: "Setiap pelukan, setiap usapan kepala, setiap doa diam-diam — semua jadi pahala. Kamu hebat, Ma!",
        },
      ],
      caption: "Untuk para mama yang tak pernah berhenti mencintai 💛",
      cta: "Tag mama hebatmu!",
      hashtags: ["#BabyMo", "#MamaHebat", "#ParentingIslami"],
    },
  ],
  "ayah-series": [
    {
      title: "Ayah, Pahlawan Diam-Diam",
      hook: "Cinta Ayah selalu bekerja.",
      slides: [
        {
          heading: "Terima Kasih, Ayah!",
          kicker: "Pesan untuk Ayah:",
          body: "Doa Ayah di sepertiga malam, kerja kerasnya, semuanya adalah cinta. Yuk, peluk Ayah hari ini!",
        },
      ],
      caption: "Cinta Ayah itu pelan, tapi dalam 💙",
      cta: "Tag Ayah kebanggaanmu!",
      hashtags: ["#BabyMo", "#AyahHebat", "#KeluargaSholeh"],
    },
  ],
  "emotional-parenting-reminder": [
    {
      title: "Niat Baikmu Dicatat Allah",
      hook: "Setiap kelelahanmu = pahala.",
      slides: [
        {
          heading: "Niat Baik Membawamu Ke Jalan yang Baik",
          body: "“Sesungguhnya amal itu tergantung niatnya.”",
          attribution: "HR. Bukhari 1 & HR. Muslim 1907",
        },
      ],
      caption: "Niatkan semua untuk Allah, Ma 💚",
      cta: "Save buat penyemangat harian!",
      hashtags: ["#BabyMo", "#NiatBaik", "#ParentingIslami"],
    },
  ],

  /* ---------- KIDS EDUCATIONAL ---------- */
  "did-you-know": [
    {
      title: "Tahukah Kamu? Bismillah Sebelum Makan",
      hook: "Satu kalimat, sejuta pahala!",
      slides: [
        {
          heading: "Tahukah Kamu?",
          kicker: "Fakta Seru:",
          body: "Saat kita ucap “Bismillah” sebelum makan, setan nggak bisa ikut makan dari makanan kita loh!",
          attribution: "HR. Muslim 2017",
        },
      ],
      caption: "Bismillah dulu, baru makan ya Sahabat Mo! 🍽️",
      cta: "Save & ajarkan adik!",
      hashtags: ["#BabyMo", "#TahukahKamu", "#Bismillah"],
    },
    {
      title: "Tahukah Kamu? Berwudhu Sebelum Tidur",
      hook: "Sunnah kecil, manfaat besar.",
      slides: [
        {
          heading: "Tahukah Kamu?",
          kicker: "Fakta Sunnah:",
          body: "Jika sebelum tidur dianjurkan untuk berwudhu terlebih dulu. Tidur jadi lebih berkah!",
          attribution: "HR. Imam Bukhari 247",
        },
      ],
      caption: "Yuk wudhu dulu sebelum bobo 💧",
      cta: "Save buat malam ini!",
      hashtags: ["#BabyMo", "#Sunnah", "#TahukahKamu"],
    },
  ],
  "allahs-creation": [
    {
      title: "Subhanallah, Lihat Bulan!",
      hook: "Allah ciptakan lampu untuk seluruh dunia.",
      slides: [
        {
          heading: "Wow! Lihat Bulan!",
          kicker: "Ciptaan Allah:",
          body: "Bulan nggak punya cahaya sendiri. Ia hanya memantulkan cahaya matahari. Sama kita, mantulkan rahmat Allah ke sekitar.",
        },
      ],
      caption: "Tafakkur malam ini: SubhanAllah! 🌙",
      cta: "Save & lihat bulan malam ini!",
      hashtags: ["#BabyMo", "#KebesaranAllah", "#AnakMuslim"],
    },
  ],
  "arabic-word-of-the-day": [
    {
      title: "Kata Hari Ini: Rahmah",
      hook: "Satu kata, banyak makna.",
      slides: [
        {
          heading: "Apa Itu Rahmah?",
          kicker: "Kata Arab Hari Ini:",
          body: "Rahmah (رحمة) artinya kasih sayang. Akar kata yang sama dengan “rahim”. Cinta Allah itu sedalam pelukan ibu.",
          arabic: "رَحْمَة",
        },
      ],
      caption: "Yuk, hafal kata Arab baru hari ini! ✨",
      cta: "Comment kata Arab favoritmu!",
      hashtags: ["#BabyMo", "#BelajarArab", "#AnakMuslim"],
    },
  ],
  "islamic-fun-facts": [
    {
      title: "Fakta Seru: Rasulullah Sayang Kucing!",
      hook: "Sampai potong jubah biar kucingnya nggak terganggu.",
      slides: [
        {
          heading: "Rasulullah Sayang Kucing!",
          kicker: "Fakta Seru:",
          body: "Rasulullah SAW pernah memotong jubahnya sendiri agar tidak membangunkan kucing yang tidur di atasnya. MasyaAllah!",
        },
      ],
      caption: "Sayang binatang itu sunnah loh, Sahabat Mo 🐈",
      cta: "Tag pecinta kucing!",
      hashtags: ["#BabyMo", "#FaktaIslam", "#Sunnah"],
    },
  ],
  "tiny-sahabah-stories": [
    {
      title: "Kisah Anas bin Malik Kecil",
      hook: "10 tahun melayani Rasulullah, tak pernah dimarahi.",
      slides: [
        {
          heading: "Anas Si Sahabat Cilik!",
          kicker: "Kisah Sahabat:",
          body: "Anas bin Malik melayani Rasulullah selama 10 tahun. Tak sekalipun Beliau bertanya, “Kenapa kamu lakukan ini?” MasyaAllah lembutnya!",
          attribution: "HR. Bukhari 6038",
        },
      ],
      caption: "Cerita yang bikin anak belajar sabar & lembut 💚",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#KisahSahabat", "#AnakSholeh"],
    },
  ],

  /* ---------- INTERACTIVE ---------- */
  "guess-the-sunnah": [
    {
      title: "Tebak Sunnah!",
      hook: "Yang mana ya yang sunnah?",
      slides: [
        {
          heading: "Tebak Sunnah!",
          kicker: "Quiz Seru:",
          body: "A. Makan pakai tangan kanan\nB. Tidur miring ke kanan\nC. Senyum ke saudara\n\nMenurut Sahabat Mo, yang mana sunnah?",
        },
      ],
      caption: "Jawab di komen ya! 👇 (Jawaban: SEMUANYA SUNNAH! 🎉)",
      cta: "Comment jawabanmu!",
      hashtags: ["#BabyMo", "#TebakSunnah", "#QuizIslami"],
    },
  ],
  "finish-the-dua": [
    {
      title: "Lengkapi Doanya!",
      hook: "Sahabat Mo masih ingat?",
      slides: [
        {
          heading: "Lengkapi Doanya!",
          kicker: "Quiz Hafalan:",
          body: "“Allahumma inni as'aluka __________”\n\nLanjutkan di komen ya, Sahabat Mo!",
        },
      ],
      caption: "Cek hafalan kamu yuk! 👇",
      cta: "Comment lanjutannya!",
      hashtags: ["#BabyMo", "#LengkapiDoa", "#AnakMuslim"],
    },
  ],
  "spot-the-adab": [
    {
      title: "Temukan Adabnya!",
      hook: "Berapa banyak adab yang Sahabat Mo lihat?",
      slides: [
        {
          heading: "Temukan Adabnya!",
          kicker: "Misi Sahabat Mo:",
          body: "Aisyah masuk ke rumah nenek. Dia lepas sepatu, ucap salam, dan bantu bawa belanjaan.\n\nBerapa adab yang kamu temukan?",
        },
      ],
      caption: "Hitung di komen! (Hint: 3 adab!) 👀",
      cta: "Comment jawabanmu!",
      hashtags: ["#BabyMo", "#TemukanAdab", "#AdabIslami"],
    },
  ],
  "tiny-sunnah-missions": [
    {
      title: "Misi Sunnah Hari Ini!",
      hook: "Senyum ke 3 orang hari ini!",
      slides: [
        {
          heading: "Misi Sunnah!",
          kicker: "Misi Hari Ini:",
          body: "Senyum tulus ke 3 orang hari ini. Senyummu adalah sedekah dan pahala!",
          attribution: "HR. Tirmidzi 1956",
        },
      ],
      caption: "Sahabat Mo, terima misi? 🫡 Comment 'SIAP'!",
      cta: "Comment 'SIAP' jika menerima misi!",
      hashtags: ["#BabyMo", "#MisiSunnah", "#AnakMuslim"],
    },
  ],
  "this-or-that-muslim-kid": [
    {
      title: "Pilih Yang Mana?",
      hook: "Tipe Sahabat Mo kamu yang mana?",
      slides: [
        {
          heading: "Pilih Yang Mana?",
          kicker: "Anak Mo Edition:",
          body: "Kurma 🌴 atau Kurma cake 🍰?\nAl-Fatiha atau Al-Ikhlas?\nAdzan dari HP atau speaker?",
        },
      ],
      caption: "Comment pilihanmu! 👇",
      cta: "Comment pilihanmu!",
      hashtags: ["#BabyMo", "#PilihYangMana", "#AnakMuslim"],
    },
  ],

  /* ---------- STORY ---------- */
  "mini-islamic-story": [
    {
      title: "Kisah Semut yang Berdoa",
      hook: "Allah dengar doa yang paling kecil sekalipun.",
      slides: [
        {
          heading: "Semut Kecil yang Berdoa",
          kicker: "Cerita Sahabat Mo:",
          body: "Seekor semut kecil mengangkat daun yang lebih besar dari dirinya. Sambil berdoa, “Ya Rahman, kuatkan aku.” Dan Allah pun menjawab.",
        },
      ],
      caption: "Doa sekecil apapun, Allah dengar 🐜💚",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#CeritaIslami", "#BedtimeStory"],
    },
  ],
  "what-would-prophet-do": [
    {
      title: "Kalau Rasulullah Bagaimana?",
      hook: "Saat sup tumpah di lantai...",
      slides: [
        {
          heading: "Sup Tumpah, Apa yang Rasulullah Lakukan?",
          kicker: "What Would Rasulullah Do?",
          body: "Anak tumpah sup di meja. Rasulullah SAW pasti tersenyum, pastikan anak baik-baik saja, lalu bersihkan bersama. Tanpa marah!",
          attribution: "Sirah Nabawiyah",
        },
      ],
      caption: "Rasulullah dalam moment dapur kita sehari-hari 💛",
      cta: "Save buat pengingat sabar!",
      hashtags: ["#BabyMo", "#Sunnah", "#GentleParenting"],
    },
  ],
  "emotional-story-carousel": [
    {
      title: "Doa di Lantai Cucian",
      hook: "Allah hadir di sudut tersembunyi kita.",
      slides: [
        {
          heading: "Doa di Lantai Cucian",
          kicker: "Cerita untuk Mama:",
          body: "Pukul 11 malam, mama duduk di lantai cucian. Capek bicara apa-apa, ia hanya bisik: “Ya Allah.” Dan itu cukup. Allah dengar.",
        },
      ],
      caption: "Untuk para mama yang lelah malam ini 💛",
      cta: "Save & bagikan ke teman mama!",
      hashtags: ["#BabyMo", "#MamaCerita", "#TaqarrubIlallah"],
    },
  ],

  /* ---------- REELS ---------- */
  "pov-muslim-childhood": [
    {
      title: "POV: Maghrib di Rumah Nenek",
      hook: "Memori paling tenang seumur hidup.",
      slides: [
        {
          heading: "POV: Maghrib di Rumah Nenek",
          kicker: "POV:",
          body: "Adzan berkumandang. Dapur wangi rendang. Semua orang berhenti, ambil wudhu, lalu shalat berjamaah.",
        },
      ],
      caption: "Memori yang bikin Islam terasa rumah 🏡",
      cta: "Tag yang relate!",
      hashtags: ["#BabyMo", "#POVMuslim", "#Nostalgia"],
    },
  ],
  "soft-islamic-affirmations": [
    {
      title: "Afirmasi Sebelum Tidur",
      hook: "Bisikkan ke hati malam ini.",
      slides: [
        {
          heading: "Allah Bersamamu.",
          kicker: "Afirmasi Malam Ini:",
          body: "Hari ini, Allah bersamaku.\nBesok, Allah cukup bagiku.\nSelamanya, Allah lebih dekat dari nadi.",
        },
      ],
      caption: "Untuk hati yang butuh tenang malam ini 🌙",
      cta: "Save buat malam ini.",
      hashtags: ["#BabyMo", "#AfirmasiIslami", "#TenangkanHati"],
    },
  ],
  "five-second-habit": [
    {
      title: "Sunnah 5 Detik!",
      hook: "Satu nafas, satu pahala.",
      slides: [
        {
          heading: "Sunnah 5 Detik!",
          kicker: "Cepet Banget!",
          body: "Ucap “Bismillah” sebelum buka pintu. Selesai! Sebuah sunnah dalam 5 detik.",
        },
      ],
      caption: "Sunnah gampang, pahala melimpah 💚",
      cta: "Save & coba hari ini!",
      hashtags: ["#BabyMo", "#Sunnah5Detik", "#AnakMuslim"],
    },
  ],
  "cozy-islamic-reels": [
    {
      title: "Pagi Cozy Sahabat Mo",
      hook: "Adzan pagi, susu hangat, Quran pelan.",
      slides: [
        {
          heading: "Pagi yang Cozy!",
          kicker: "POV Pagi:",
          body: "06:12 — adzan subuh. 06:30 — susu hangat. 07:00 — Quran pelan dari speaker. Pagi jadi tenang.",
        },
      ],
      caption: "Pagi yang bikin hati adem 💛",
      cta: "Save buat besok pagi!",
      hashtags: ["#BabyMo", "#PagiCozy", "#PagiMuslim"],
    },
  ],
};

export function getSeedsFor(contentTypeId: string): SampleSeed[] {
  return SEEDS[contentTypeId] ?? [];
}
