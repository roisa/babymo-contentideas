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
    {
      title: "Doa Sebelum Makan",
      hook: "Bismillah dulu, baru makan.",
      slides: [
        {
          heading: "Doa Sebelum Makan",
          kicker: "Yuk, Hafalkan!",
          body: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar.\n\n“Ya Allah, berkahilah rezeki kami dan lindungi kami dari siksa neraka.”",
          arabic: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
          attribution: "HR. Ibnu Sunni",
        },
      ],
      caption: "Bismillah dulu sebelum makan, biar rezekinya berkah 🍽️",
      cta: "Save & ajak keluarga!",
      hashtags: ["#BabyMo", "#DoaMakan", "#AdabIslami"],
    },
    {
      title: "Doa Sesudah Makan",
      hook: "Selesai makan, ingat Allah.",
      slides: [
        {
          heading: "Doa Sesudah Makan",
          kicker: "Yuk, Hafalkan!",
          body: "Alhamdulillaahilladzii ath'amanaa wa saqaanaa wa ja'alanaa muslimiin.\n\n“Segala puji bagi Allah yang telah memberi kami makan dan minum, serta menjadikan kami orang Islam.”",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
          attribution: "HR. Abu Daud 3850",
        },
      ],
      caption: "Habis makan, jangan lupa syukur ya 🤲",
      cta: "Save & amalkan!",
      hashtags: ["#BabyMo", "#DoaSesudahMakan", "#Syukur"],
    },
    {
      title: "Doa Masuk Kamar Mandi",
      hook: "Lindungi diri dari syaitan.",
      slides: [
        {
          heading: "Doa Masuk Kamar Mandi",
          kicker: "Yuk, Hafalkan!",
          body: "Allahumma innii a'uudzu bika minal khubutsi wal khabaa'its.\n\n“Ya Allah, aku berlindung kepada-Mu dari syaitan laki-laki dan perempuan.”",
          arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
          attribution: "HR. Bukhari 142",
        },
      ],
      caption: "Sebelum masuk kamar mandi, doa dulu yaa 🚿",
      cta: "Save & ajarkan adik!",
      hashtags: ["#BabyMo", "#DoaHarian", "#AdabIslami"],
    },
    {
      title: "Doa Keluar Kamar Mandi",
      hook: "Pendek tapi penuh berkah.",
      slides: [
        {
          heading: "Doa Keluar Kamar Mandi",
          kicker: "Cuma 1 Kata!",
          body: "Ghufraanak.\n\n“(Aku memohon) ampunan-Mu.”",
          arabic: "غُفْرَانَكَ",
          attribution: "HR. Abu Daud 30",
        },
      ],
      caption: "Doa terpendek tapi penuh makna 💚",
      cta: "Tag temanmu!",
      hashtags: ["#BabyMo", "#DoaPendek", "#DoaHarian"],
    },
    {
      title: "Doa Sesudah Wudhu",
      hook: "Pintu surga terbuka.",
      slides: [
        {
          heading: "Doa Sesudah Wudhu",
          kicker: "Yuk, Hafalkan!",
          body: "Asyhadu allaa ilaaha illallaah wahdahu laa syariika lahu, wa asyhadu anna Muhammadan 'abduhu wa rasuuluhu.\n\n“Aku bersaksi tiada Tuhan selain Allah dan Muhammad adalah hamba-Nya & Rasul-Nya.”",
          arabic: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
          attribution: "HR. Muslim 234",
        },
      ],
      caption: "Setelah wudhu, baca doa ini — 8 pintu surga dibuka untukmu 🌸",
      cta: "Save & amalkan!",
      hashtags: ["#BabyMo", "#DoaWudhu", "#Sunnah"],
    },
    {
      title: "Doa Masuk Rumah",
      hook: "Bawa berkah ke rumah.",
      slides: [
        {
          heading: "Doa Masuk Rumah",
          kicker: "Sebelum Masuk:",
          body: "Bismillaahi walajnaa wa bismillaahi kharajnaa wa 'alaa rabbinaa tawakkalnaa.\n\n“Dengan nama Allah kami masuk dan keluar, dan kepada Tuhan kami, kami bertawakkal.”",
          arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا",
          attribution: "HR. Abu Daud 5096",
        },
      ],
      caption: "Bawa berkah saat masuk rumah, Sahabat Mo 🏡",
      cta: "Save & amalkan!",
      hashtags: ["#BabyMo", "#DoaRumah", "#Berkah"],
    },
    {
      title: "Doa Keluar Rumah",
      hook: "Tawakkal sebelum melangkah.",
      slides: [
        {
          heading: "Doa Keluar Rumah",
          kicker: "Yuk, Hafalkan!",
          body: "Bismillaahi tawakkaltu 'alallaah, laa hawla wa laa quwwata illaa billaah.\n\n“Dengan nama Allah, aku bertawakkal kepada-Nya. Tiada daya & kekuatan kecuali dengan Allah.”",
          arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
          attribution: "HR. Tirmidzi 3426",
        },
      ],
      caption: "Sebelum keluar rumah, baca doa ini biar dijaga Allah 💚",
      cta: "Save & ajarkan adik!",
      hashtags: ["#BabyMo", "#DoaKeluarRumah", "#Tawakkal"],
    },
    {
      title: "Doa Naik Kendaraan",
      hook: "Perjalanan aman sampai tujuan.",
      slides: [
        {
          heading: "Doa Naik Kendaraan",
          kicker: "Sebelum Berangkat:",
          body: "Subhaanalladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun.\n\n“Maha Suci Tuhan yang menundukkan ini untuk kami, dan kepada Tuhan kami, kami kembali.”",
          arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
          attribution: "HR. Muslim 1342",
        },
      ],
      caption: "Doa biar perjalanan aman & berkah 🚗",
      cta: "Save buat sebelum berangkat!",
      hashtags: ["#BabyMo", "#DoaPerjalanan", "#DoaHarian"],
    },
    {
      title: "Doa Sebelum Belajar",
      hook: "Mohon ilmu yang bermanfaat.",
      slides: [
        {
          heading: "Doa Sebelum Belajar",
          kicker: "Sebelum Buka Buku:",
          body: "Rabbi zidnii 'ilmaa, warzuqnii fahmaa.\n\n“Ya Tuhanku, tambahkan aku ilmu dan berikan aku pemahaman.”",
          arabic: "رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا",
          attribution: "QS. Thaha: 114",
        },
      ],
      caption: "Sebelum belajar, doa dulu biar ilmunya berkah 📚",
      cta: "Save buat di sekolah!",
      hashtags: ["#BabyMo", "#DoaBelajar", "#AnakSholeh"],
    },
    {
      title: "Doa Pakai Baju Baru",
      hook: "Syukur untuk setiap nikmat.",
      slides: [
        {
          heading: "Doa Pakai Baju Baru",
          kicker: "Saat Pakai Baju Baru:",
          body: "Alhamdulillaahilladzii kasaanii haadzaa wa razaqaniihi min ghairi hawlin minnii wa laa quwwah.\n\n“Segala puji bagi Allah yang memberiku pakaian ini sebagai rezeki dariNya.”",
          arabic: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ",
          attribution: "HR. Abu Daud 4023",
        },
      ],
      caption: "Baju baru, doa baru, syukur baru 💚",
      cta: "Save & ajarkan adik!",
      hashtags: ["#BabyMo", "#Syukur", "#DoaHarian"],
    },
    {
      title: "Doa Bercermin",
      hook: "Mohon akhlak yang indah.",
      slides: [
        {
          heading: "Doa Bercermin",
          kicker: "Saat Bercermin:",
          body: "Allahumma hassanta khalqii fa hassin khuluqii.\n\n“Ya Allah, Engkau telah memperindah rupaku, maka perindahlah akhlakku.”",
          arabic: "اللَّهُمَّ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي",
          attribution: "HR. Ahmad 24206",
        },
      ],
      caption: "Cantik luar boleh, tapi yang penting cantik dalam 💚",
      cta: "Save & amalkan setiap pagi!",
      hashtags: ["#BabyMo", "#DoaCermin", "#AkhlakMulia"],
    },
    {
      title: "Doa Berbuka Puasa",
      hook: "Doa yang Allah kabulkan.",
      slides: [
        {
          heading: "Doa Berbuka Puasa",
          kicker: "Saat Adzan Maghrib:",
          body: "Allahumma laka shumtu wa 'alaa rizqika afthartu.\n\n“Ya Allah, karena-Mu aku berpuasa dan dengan rezeki-Mu aku berbuka.”",
          arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
          attribution: "HR. Abu Daud 2358",
        },
      ],
      caption: "Doa berbuka itu mustajab! Jangan lupa baca ya 🌙",
      cta: "Save buat bulan Ramadan!",
      hashtags: ["#BabyMo", "#DoaBerbuka", "#Ramadan"],
    },
    {
      title: "Doa Untuk Orang Tua",
      hook: "Hadiah terbaik untuk Mama & Ayah.",
      slides: [
        {
          heading: "Doa Untuk Orang Tua",
          kicker: "Sayangi Mereka:",
          body: "Rabbighfir lii wa li waalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.\n\n“Ya Allah, ampuni aku & kedua orang tuaku, sayangi mereka seperti mereka menyayangiku waktu kecil.”",
          arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
          attribution: "QS. Al-Isra: 24",
        },
      ],
      caption: "Doa terbaik untuk Mama & Ayah 💚 Tag mereka!",
      cta: "Tag orang tua tersayang!",
      hashtags: ["#BabyMo", "#DoaOrangTua", "#BerbaktiKepadaOrangTua"],
    },
    {
      title: "Doa Sapu Jagat",
      hook: "Doa lengkap untuk dunia & akhirat.",
      slides: [
        {
          heading: "Doa Sapu Jagat",
          kicker: "Doa Favorit Rasulullah:",
          body: "Rabbanaa aatinaa fid dunyaa hasanah wa fil aakhirati hasanah wa qinaa 'adzaaban naar.\n\n“Ya Tuhan kami, beri kami kebaikan di dunia & akhirat, lindungi kami dari neraka.”",
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          attribution: "QS. Al-Baqarah: 201",
        },
      ],
      caption: "Doa ini lengkap banget, Sahabat Mo! Baca tiap hari 💚",
      cta: "Save & amalkan tiap hari!",
      hashtags: ["#BabyMo", "#DoaSapuJagat", "#DoaHarian"],
    },
    {
      title: "Doa Mohon Perlindungan",
      hook: "Lindungi diri dari segala kejahatan.",
      slides: [
        {
          heading: "Doa Perlindungan",
          kicker: "Pagi & Sore:",
          body: "A'uudzu bikalimaatillaahit taammah min syarri maa khalaq.\n\n“Aku berlindung dengan kalimat Allah yang sempurna dari kejahatan makhluk-Nya.”",
          arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
          attribution: "HR. Muslim 2708",
        },
      ],
      caption: "Baca pagi & sore, dilindungi Allah dari segala hal 💚",
      cta: "Save buat dzikir harian!",
      hashtags: ["#BabyMo", "#DoaPerlindungan", "#DzikirPagiSore"],
    },
    {
      title: "Doa Memohon Akhlak Mulia",
      hook: "Cantik luar dan dalam.",
      slides: [
        {
          heading: "Doa Akhlak Mulia",
          kicker: "Yuk, Amalkan!",
          body: "Allahummahdinii li ahsanil akhlaaq, laa yahdii li ahsanihaa illaa anta.\n\n“Ya Allah, tuntun aku ke akhlak terbaik — tiada yang bisa menuntun selain Engkau.”",
          arabic: "اللَّهُمَّ اهْدِنِي لِأَحْسَنِ الْأَخْلَاقِ",
          attribution: "HR. Muslim 771",
        },
      ],
      caption: "Cantik akhlak itu yang Allah cintai 💚",
      cta: "Save & amalkan!",
      hashtags: ["#BabyMo", "#AkhlakMulia", "#DoaHarian"],
    },
    {
      title: "Doa Saat Hujan",
      hook: "Hujan = rahmat, jangan dikeluhin.",
      slides: [
        {
          heading: "Doa Saat Hujan",
          kicker: "Saat Hujan Turun:",
          body: "Allahumma shayyiban naafi'aa.\n\n“Ya Allah, jadikanlah ini hujan yang membawa manfaat.”",
          arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
          attribution: "HR. Bukhari 1032",
        },
      ],
      caption: "Hujan datang? Baca doa ini biar jadi rahmat 🌧️",
      cta: "Save buat musim hujan!",
      hashtags: ["#BabyMo", "#DoaHujan", "#DoaHarian"],
    },
    {
      title: "Doa Saat Sakit",
      hook: "Mohon kesembuhan dari Allah.",
      slides: [
        {
          heading: "Doa Saat Sakit",
          kicker: "Pegang Bagian Sakit:",
          body: "Bismillah (3x). A'uudzu billaahi wa qudratihi min syarri maa ajidu wa uhaadzir (7x).\n\n“Dengan nama Allah, aku berlindung kepada-Nya dari rasa sakit ini.”",
          arabic: "أَعُوذُ بِاللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
          attribution: "HR. Muslim 2202",
        },
      ],
      caption: "Buat Sahabat Mo yang lagi sakit, semoga lekas sembuh 🤲",
      cta: "Tag teman yang lagi sakit.",
      hashtags: ["#BabyMo", "#DoaKesembuhan", "#DoaHarian"],
    },
  ],
  "quran-ayah": [
    {
      title: "Allah Selalu Bersama Kita",
      hook: "Di manapun kamu, Allah selalu dekat.",
      slides: [
        {
          heading: "Allah Selalu Dekat!",
          kicker: "Catatan Hari Ini:",
          body: "Sahabat Mo, mau di rumah, di sekolah, di mana pun — Allah selalu ada bareng kamu.",
        },
        {
          heading: "Apa Kata Al-Qur'an?",
          kicker: "Ayat Hari Ini:",
          body: "“Dan Dia bersama kamu di manapun kamu berada.”",
          arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
          attribution: "QS. Al-Hadid: 4",
        },
        {
          heading: "Allah Maha Melihat",
          kicker: "Tahukah Kamu?",
          body: "Allah lihat semua niat baikmu — yang besar, yang kecil, bahkan yang cuma di dalam hati.",
        },
        {
          heading: "Jadi, Jangan Takut!",
          kicker: "Pesan untuk Sahabat Mo:",
          body: "Kalau sedih, kalau sendirian, kalau takut — ingat: Allah lebih dekat dari nadi sendiri.",
        },
        {
          heading: "Yuk, Save & Bagikan!",
          kicker: "Pengingat:",
          body: "Simpan slide ini, baca lagi pas lagi sedih. Atau bagikan ke teman yang butuh penyemangat.",
        },
      ],
      caption: "Allah selalu dekat sama Sahabat Mo 💚 Save & bagikan ya!",
      cta: "Save buat pengingat!",
      hashtags: ["#BabyMo", "#AyatQuran", "#AnakMuslim", "#AllahMahaMelihat"],
    },
  ],
  "hadith-motivation": [
    {
      title: "Pemenang Sejati Itu Yang Sabar 💪",
      hook: "Hadits singkat yang ubah cara kamu lihat 'kekuatan'.",
      slides: [
        {
          heading: "Siapa Sih Orang Paling Kuat? 💪",
          kicker: "Pertanyaan Sahabat Mo:",
          body: "Apa kata Sahabat Mo? Yang berotot? Yang jago bela diri? Yang bisa angkat barang berat? Hmm... siap-siap kaget. Swipe →",
        },
        {
          heading: "Apa Kata Rasulullah ﷺ?",
          kicker: "Hadits Hari Ini:",
          body: "“Orang kuat itu BUKAN yang menang dalam pertarungan. Tapi yang mampu menahan dirinya ketika sedang marah.”",
          attribution: "HR. Bukhari 6114 & HR. Muslim 2609",
        },
        {
          heading: "MasyaAllah... Plot Twist! 🌀",
          kicker: "Jadi:",
          body: "Kuat sejati itu bukan otot — tapi kemampuan mengendalikan diri sendiri. Yang paling sulit dikalahkan? AMARAH kita.",
        },
        {
          heading: "Jurus Sahabat Mo Pas Marah",
          kicker: "Coba 3 Langkah Ini:",
          body: "1. Tarik nafas dalam (5 kali)\n2. Baca ta'awudz pelan-pelan\n3. Diam dulu, jangan bicara\n\nMarahnya pasti reda, insyaAllah ✨",
        },
        {
          heading: "Mulai Praktek Minggu Ini!",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Pas marah minggu ini, coba 3 langkah tadi. Berhasil? Tag #BabyMo & cerita ke Mo! Pemenang sejati = kamu 💪",
        },
      ],
      caption: "Pemenang sejati = yang bisa sabar 💪 Tag temanmu yang lagi belajar menahan amarah!",
      cta: "Save & coba minggu ini!",
      hashtags: ["#BabyMo", "#Sabar", "#OrangKuat", "#Hadits"],
    },
    {
      title: "Sedekah Termurah, Pahala Termahal 😊",
      hook: "Gratis, mudah, tapi sering kita lupa.",
      slides: [
        {
          heading: "Mau Sedekah TANPA Uang? 💸",
          kicker: "Beneran Lho:",
          body: "Sahabat Mo, ada satu sedekah yang nggak butuh duit, nggak butuh tenaga, dan bisa dilakuin kapan aja. Penasaran? Swipe →",
        },
        {
          heading: "Ini Petunjuknya...",
          kicker: "Coba Tebak:",
          body: "Gerakannya kecil. Pakai bibir. Bikin orang lain hatinya hangat dalam 1 detik. Sahabat Mo udah tebak? 😏",
        },
        {
          heading: "Yes — SENYUM! 😊",
          kicker: "Sabda Rasulullah:",
          body: "“Senyummu kepada saudaramu adalah sedekah.”",
          attribution: "HR. Tirmidzi 1956",
        },
        {
          heading: "Kenapa Senyum Spesial?",
          kicker: "Karena:",
          body: "Senyum tulus bisa bikin orang lupa sedihnya, hilang lelahnya, dan ingat bahwa dunia ini hangat. Itu pahala BESAR.",
        },
        {
          heading: "Misi Senyum Hari Ini!",
          kicker: "Tantangan Sahabat Mo:",
          body: "Senyum tulus ke 5 orang hari ini — mama, ayah, adik, teman, bahkan orang asing di jalan. Save & tag temanmu, sedekah bareng! 🌸",
        },
      ],
      caption: "Senyummu = pahalamu 😊 Tag yang perlu diingatkan untuk senyum hari ini!",
      cta: "Save & senyum hari ini!",
      hashtags: ["#BabyMo", "#SenyumSedekah", "#AnakSholeh", "#Hadits"],
    },
    {
      title: "Cinta Allah Yang Paling Beda 💚",
      hook: "Allah cinta sama orang yang... mengejutkan.",
      slides: [
        {
          heading: "Allah Cinta Sama Siapa? 💚",
          kicker: "Pertanyaan Hari Ini:",
          body: "Sahabat Mo, kira-kira Allah paling sayang sama orang yang gimana? Yang paling pintar? Paling kaya? Paling rajin shalat? Tebak yuk... 🤔",
        },
        {
          heading: "Jawabannya Mengejutkan!",
          kicker: "Hadits Rasulullah ﷺ:",
          body: "“Amalan yang paling Allah cintai adalah yang KONSISTEN, walaupun sedikit.”",
          attribution: "HR. Bukhari 6464 & HR. Muslim 783",
        },
        {
          heading: "Wait, Sedikit? Kok Bisa? 🤯",
          kicker: "Penjelasannya:",
          body: "Allah lebih senang kamu shalat dhuha 2 rakaat SETIAP HARI, dibanding 20 rakaat sekali doang lalu berhenti. Konsisten > banyak!",
        },
        {
          heading: "Yuk, Mulai Kecil",
          kicker: "Pilih 1 Aja:",
          body: "1. Baca 1 ayat Quran/hari\n2. Sedekah Rp1.000/hari\n3. Bismillah di setiap aktivitas\n\nPilih yang paling mudah. Yang penting JALAN.",
        },
        {
          heading: "Konsisten = Sahabat Mo Hebat!",
          kicker: "Tantangan 30 Hari:",
          body: "Save slide ini. Pilih 1 amalan kecil di atas. Lakukan tiap hari selama 30 hari. Komen progressmu ke Mo ya! 💚",
        },
      ],
      caption: "Konsisten > banyak 💚 Save & mulai amalan kecil hari ini, satu yang paling mudah!",
      cta: "Save & komitmen 30 hari!",
      hashtags: ["#BabyMo", "#Istiqomah", "#Konsisten", "#Hadits"],
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
          heading: "Ramadan Sebentar Lagi! 🌙",
          kicker: "Tahukah Kamu?",
          body: "Bulan paling istimewa setahun sekali — bulan di mana pintu surga dibuka & pintu neraka ditutup. Yuk, sambut dengan hati!",
        },
        {
          heading: "Kenapa Ramadan Spesial?",
          kicker: "Ayat Hari Ini:",
          body: "“Bulan Ramadan adalah bulan diturunkannya Al-Qur'an sebagai petunjuk bagi manusia.”",
          arabic: "شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ",
          attribution: "QS. Al-Baqarah: 185",
        },
        {
          heading: "Apa yang Bisa Dilakukan?",
          kicker: "Misi Sahabat Mo:",
          body: "1. Puasa (kalau sudah kuat)\n2. Baca Quran 1 ayat/hari\n3. Sedekah, walau kecil\n4. Sholat tarawih bareng",
        },
        {
          heading: "Tips Puasa Pertama!",
          kicker: "Untuk Sahabat Mo Pemula:",
          body: "Mulai pelan-pelan: puasa sampai dzuhur dulu. Tahun depan tambah jadi ashar. Tahun depannya lagi, full satu hari. Sabar yaa!",
        },
        {
          heading: "Yuk, Persiapkan Hati!",
          kicker: "Save & Bagikan:",
          body: "Save slide ini. Bagikan ke keluarga. Bareng-bareng siapin Ramadan: hati senang, badan sehat, niat tulus!",
        },
      ],
      caption: "Marhaban ya Ramadan! 🌙 Yuk sambut bareng Baby Mo! Save & bagikan ke keluarga 💚",
      cta: "Save buat checklist Ramadan!",
      hashtags: ["#BabyMo", "#Ramadan", "#AnakMuslim", "#PuasaPertama"],
    },
  ],
  "tiny-heart-talks": [
    {
      title: "Bicara Sama Hati Kecil",
      hook: "Kalimat kecil yang bikin hati anak besar.",
      slides: [
        {
          heading: "Bicara Sama Hati Kecil",
          kicker: "Pesan untuk Mama & Ayah:",
          body: "Ada kalimat-kalimat sederhana yang kalau diucapkan ke anak, akan tinggal di hatinya seumur hidup. Yuk, kita pelajari.",
        },
        {
          heading: "“Allah Sayang Kamu, Sayang.”",
          kicker: "Bisikkan ini:",
          body: "Pas anak rewel, sedih, atau takut — peluk dan bisikkan. Bukan menenangkan badan, tapi menenangkan jiwa.",
        },
        {
          heading: "“Kamu Bisa Cerita ke Mama.”",
          kicker: "Bisikkan ini juga:",
          body: "Buat rumah jadi tempat aman cerita. Anak yang merasa didengar di rumah, akan tumbuh berani di luar.",
        },
        {
          heading: "“Maaf, Mama Salah Tadi.”",
          kicker: "Yang Paling Penting:",
          body: "Mama juga manusia. Minta maaf ke anak bukan menurunkan wibawa — itu yang Rasulullah ajarkan.",
          attribution: "HR. Bukhari 6203",
        },
        {
          heading: "Save & Coba Malam Ini!",
          kicker: "Misi Mama:",
          body: "Sebelum tidur nanti, peluk anakmu. Bisikkan satu kalimat. Lihat reaksinya. Save slide ini buat besok dan besoknya.",
        },
      ],
      caption: "Kalimat kecil yang bikin hati anak besar 💛 Save buat malam ini.",
      cta: "Bisikkan ke anakmu malam ini.",
      hashtags: ["#BabyMo", "#ParentingIslami", "#KalimatAjaib", "#TarbiyahCinta"],
    },
  ],
  "dear-little-muslim": [
    {
      title: "Surat untuk Sahabat Mo",
      hook: "Untuk Muslim cilik yang sedang tumbuh.",
      slides: [
        {
          heading: "Dear Sahabat Mo,",
          kicker: "Surat Hari Ini:",
          body: "Ada hal-hal penting yang ingin Mo bilang sama kamu, walau kamu mungkin belum mengerti semuanya sekarang. Yuk dengerin pelan-pelan ya...",
        },
        {
          heading: "Kamu Sudah Cukup.",
          kicker: "Hal Pertama:",
          body: "Kamu nggak perlu jadi anak paling pintar, paling cepat, paling juara. Allah ciptakan kamu udah cukup, apa adanya.",
        },
        {
          heading: "Allah Selalu Sayang Kamu.",
          kicker: "Hal Kedua:",
          body: "Pas kamu salah, pas kamu lupa, pas kamu sedih — Allah nggak ninggalin kamu. Dia paling sayang sama anak-anak yang berusaha.",
        },
        {
          heading: "Lembut Itu Kekuatan.",
          kicker: "Hal Ketiga:",
          body: "Di dunia ini banyak yang keras. Tapi kalau kamu tetap lembut hati, itu yang Rasulullah ajarkan. Kekuatan paling indah.",
        },
        {
          heading: "Salam Sayang, Mo 💚",
          kicker: "Penutup:",
          body: "Tumbuh besar dengan hati yang lembut, Sahabat Mo. Mama, ayah, dan seluruh keluarga Baby Mo akan selalu mendoakan.",
        },
      ],
      caption: "Surat-surat yang kami harap setiap Muslim cilik baca seumur hidupnya 💛",
      cta: "Tag adik / keponakanmu!",
      hashtags: ["#BabyMo", "#DearSahabatMo", "#MuslimKids", "#SuratUntukAnak"],
    },
  ],
  "muslim-childhood-nostalgia": [
    {
      title: "Aroma Dapur Nenek",
      hook: "Islam belajar dari hal-hal kecil di rumah.",
      slides: [
        {
          heading: "Inget Nggak Sih...",
          kicker: "Nostalgia Hari Ini:",
          body: "Sebelum kita gede dan tahu “Islam itu apa” secara teori, ada momen-momen di rumah yang sebenarnya udah ajarin kita Islam diam-diam.",
        },
        {
          heading: "Aroma Dapur Nenek 🍛",
          kicker: "Memori 1:",
          body: "Wangi kue lebaran, suara tangan nenek nguleg sambal, dan “Bismillah!” sebelum setiap suapan. Itu Islam pertama yang kita kenal.",
        },
        {
          heading: "Adzan dari Radio",
          kicker: "Memori 2:",
          body: "Tiap maghrib, semua kegiatan berhenti. TV dikecilkan. Ayah ngajak ke surau. Seluruh rumah jadi tenang. Itu juga Islam.",
        },
        {
          heading: "Peluk Mama Setelah Sholat",
          kicker: "Memori 3:",
          body: "Mama nyium pipi, bilang “anak sholeh.” Kita merasa aman, dicintai, dan tahu rasanya jadi Muslim yang baik. Itu pelajaran paling dalam.",
        },
        {
          heading: "Yuk, Bikin Memori Itu!",
          kicker: "Untuk Mama & Ayah:",
          body: "Anak kita sedang menulis “memori Islam-nya” dari hal-hal yang kita lakukan hari ini. Save slide ini, tag pasanganmu.",
        },
      ],
      caption: "Childhood Islam, dalam tekstur rumah 🏡 Tag yang relate!",
      cta: "Tag pasanganmu / ayah-ibu!",
      hashtags: ["#BabyMo", "#MuslimChildhood", "#Nostalgia", "#CozyIslam"],
    },
  ],
  "ayah-series": [
    {
      title: "Ayah, Pahlawan Diam-Diam",
      hook: "Cinta Ayah selalu bekerja, tanpa banyak bicara.",
      slides: [
        {
          heading: "Ayah, Pahlawan Diam-Diam.",
          kicker: "Untuk Ayah:",
          body: "Ada cinta yang nggak banyak bicara. Yang kerja diam-diam. Yang bangun jam 4 subuh dan tidur paling akhir. Itu cinta Ayah.",
        },
        {
          heading: "Doa Ayah di Sepertiga Malam",
          kicker: "Tahukah Kamu?",
          body: "Ayahmu mungkin nggak pernah cerita. Tapi di sepertiga malam, dia sebut namamu di sujud terakhirnya. Setiap malam.",
        },
        {
          heading: "Apa Kata Rasulullah?",
          kicker: "Sabda Beliau:",
          body: "“Doa orangtua untuk anaknya adalah doa yang mustajab (terkabul) — tidak terhalang.”",
          attribution: "HR. Tirmidzi 1905",
        },
        {
          heading: "Bagaimana Berbakti?",
          kicker: "Untuk Sahabat Mo:",
          body: "1. Salam & cium tangan saat pulang/pergi\n2. Bantu Ayah tanpa diminta\n3. Doakan Ayah setiap hari\n4. Senyum saat ditegur",
        },
        {
          heading: "Tag Ayahmu!",
          kicker: "Yuk Bagikan:",
          body: "Save slide ini. Tag Ayahmu. Ucapkan terima kasih hari ini, jangan nunggu nanti. Cinta diam-diam pantas mendapat terima kasih yang lantang.",
        },
      ],
      caption: "Untuk setiap Ayah yang mencintai dalam diam 💙 Tag Ayahmu sekarang!",
      cta: "Tag Ayah kebanggaanmu!",
      hashtags: ["#BabyMo", "#AyahHebat", "#KeluargaSholeh", "#TagAyahmu"],
    },
  ],
  "islamic-fun-facts": [
    {
      title: "Fakta Seru: Rasulullah Sayang Kucing!",
      hook: "Sampai potong jubah biar kucingnya nggak terganggu.",
      slides: [
        {
          heading: "Fakta Seru Hari Ini! 🐈",
          kicker: "Tahukah Kamu?",
          body: "Ada satu hewan kecil yang sangat dicintai Rasulullah SAW. Tebak apa? Ini hint-nya: suka mengeong dan suka tidur banyak!",
        },
        {
          heading: "Yes! Kucing! 🐱",
          kicker: "Cerita Singkat:",
          body: "Suatu hari Rasulullah hendak sholat. Tapi kucingnya, Muezza, sedang tidur di atas jubahnya. Apa yang beliau lakukan?",
        },
        {
          heading: "Beliau Potong Jubahnya!",
          kicker: "MasyaAllah:",
          body: "Daripada membangunkan Muezza, Rasulullah memotong bagian jubahnya yang ditiduri kucing. Sayang banget!",
        },
        {
          heading: "Pelajarannya Apa?",
          kicker: "Untuk Sahabat Mo:",
          body: "Sayang sama hewan itu sunnah. Bahkan ke hewan kecil seperti kucing. Allah cinta orang yang lembut hati sama semua makhluk.",
        },
        {
          heading: "Tag Pecinta Kucing!",
          kicker: "Yuk Bagikan:",
          body: "Save slide ini & tag teman yang punya kucing. Ingatkan mereka — sayang sama kucing = sunnah Rasulullah!",
        },
      ],
      caption: "Tiny hearts, tiny cats, big Sunnah 🐈 Tag pecinta kucing!",
      cta: "Tag pecinta kucing!",
      hashtags: ["#BabyMo", "#FaktaIslam", "#Sunnah", "#KucingRasulullah"],
    },
  ],
  "tiny-sahabah-stories": [
    {
      title: "Kisah Anas bin Malik Kecil",
      hook: "10 tahun melayani Rasulullah, tak sekali pun dimarahi.",
      slides: [
        {
          heading: "Kisah Anas, Sahabat Cilik",
          kicker: "Cerita Sahabat:",
          body: "Ada anak kecil bernama Anas bin Malik. Umurnya 10 tahun. Mamanya membawa dia untuk melayani Rasulullah SAW. Coba bayangkan...",
        },
        {
          heading: "10 Tahun Bersama Rasulullah!",
          kicker: "MasyaAllah:",
          body: "Anas melayani Rasulullah selama 10 tahun penuh. Setiap hari! Tugas dia: jaga sandal, antar surat, bantu di rumah.",
        },
        {
          heading: "Yang Bikin Kagum...",
          kicker: "Dengarkan Ini:",
          body: "Selama 10 tahun itu, Rasulullah tidak SEKALI PUN bilang “kenapa kamu lakukan ini?” atau “kenapa kamu nggak lakukan itu?”",
          attribution: "HR. Bukhari 6038",
        },
        {
          heading: "Apa Pelajarannya?",
          kicker: "Pesan untuk Kita:",
          body: "Lembut itu bukan lemah — itu kepemimpinan tertinggi. Rasulullah memimpin dengan sabar, bukan dengan amarah.",
        },
        {
          heading: "Yuk, Tiru Rasulullah!",
          kicker: "Untuk Mama & Ayah:",
          body: "Coba minggu ini: bicara ke anak seperti Rasulullah ke Anas. Tanpa “kenapa kamu...”. Save & coba lihat bedanya.",
        },
      ],
      caption: "Cerita yang bikin anak belajar sabar & lembut 💚 Save buat bedtime story!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#KisahSahabat", "#AnakSholeh", "#AnasBinMalik"],
    },
  ],
  "guess-the-sunnah": [
    {
      title: "Tebak Sunnah!",
      hook: "Yang mana sunnah Rasulullah?",
      slides: [
        {
          heading: "Tebak Sunnah! 🎉",
          kicker: "Quiz Seru:",
          body: "Sahabat Mo, siap-siap ya! Ada 3 kebiasaan, dan kamu harus tebak mana yang sunnah Rasulullah. Catat di kepala, jawab di komen!",
        },
        {
          heading: "Pilih Yang Mana?",
          kicker: "Round 1:",
          body: "A. Makan pakai tangan kanan ✋\nB. Tidur miring ke kanan 🛏️\nC. Senyum ke saudara 😊\n\nMana yang sunnah?",
        },
        {
          heading: "Jawabannya...",
          kicker: "Pengumuman:",
          body: "🥁🥁🥁\n\nSEMUANYA SUNNAH! 🎉\nKetiga-tiganya diajarkan Rasulullah. Dapet 3 pahala sekaligus!",
        },
        {
          heading: "Penjelasan Singkat:",
          kicker: "Tahu Nggak?",
          body: "Tangan kanan = adab makan (HR. Bukhari)\nMiring kanan = sunnah tidur\nSenyum = sedekah (HR. Tirmidzi)",
        },
        {
          heading: "Sunnah Favoritmu Apa?",
          kicker: "Yuk Komen!",
          body: "Save slide ini & komen sunnah favoritmu di postingan. Mama Mo bakal bales satu-satu loh!",
        },
      ],
      caption: "Mainin quiz ini sama anak pas dinner ya 🤍 Komen sunnah favoritmu!",
      cta: "Comment sunnah favoritmu!",
      hashtags: ["#BabyMo", "#TebakSunnah", "#QuizIslami", "#AnakMuslim"],
    },
  ],
  "spot-the-adab": [
    {
      title: "Temukan Adabnya!",
      hook: "Berapa banyak adab yang Sahabat Mo lihat?",
      slides: [
        {
          heading: "Temukan Adabnya! 🔍",
          kicker: "Misi Sahabat Mo:",
          body: "Ayo main detektif adab! Ada cerita kecil — tugasmu cari berapa banyak adab Islami yang kamu temukan. Siap?",
        },
        {
          heading: "Ceritanya...",
          kicker: "Baca Pelan-pelan:",
          body: "Aisyah datang ke rumah nenek. Dia lepas sepatu di luar. Ketuk pintu dan ucap “Assalamu'alaikum.” Lalu bantu nenek bawa belanjaan.",
        },
        {
          heading: "Hint untukmu...",
          kicker: "Petunjuk:",
          body: "Ada 3 adab yang Aisyah lakukan. Coba baca lagi cerita di slide tadi. Jangan buru-buru, perhatikan!",
        },
        {
          heading: "Jawabannya...",
          kicker: "Tada! 🎉",
          body: "1. Lepas sepatu (adab masuk rumah)\n2. Salam (adab bertamu)\n3. Bantu nenek (adab hormati orang tua)\n\nKamu temukan semua?",
        },
        {
          heading: "Coba di Rumah!",
          kicker: "Misi Sahabat Mo:",
          body: "Hari ini, hitung berapa adab yang kamu praktekkan di rumahmu sendiri. Save slide ini & ajak teman main detektif adab!",
        },
      ],
      caption: "Adab hunting adalah game terbaik buat ngajarin anak 🚗 Save & coba!",
      cta: "Save & main di rumah!",
      hashtags: ["#BabyMo", "#TemukanAdab", "#AdabIslami", "#AnakMuslim"],
    },
  ],
  "what-would-prophet-do": [
    {
      title: "Kalau Rasulullah Bagaimana? — Saat Sup Tumpah",
      hook: "Rasulullah dalam moment dapur kita sehari-hari.",
      slides: [
        {
          heading: "Kalau Rasulullah Bagaimana?",
          kicker: "What Would Rasulullah Do?",
          body: "Hari ini, mari kita bayangkan satu skenario yang sering terjadi di rumah. Trus, kita bandingkan: kita biasanya gimana vs Rasulullah ﷺ gimana.",
        },
        {
          heading: "Skenario:",
          kicker: "Adegan Sehari-hari:",
          body: "Anak kecil tanpa sengaja menumpahkan semangkuk sup hangat di meja makan. Sup mengalir ke baju & lantai. Anak terdiam, takut...",
        },
        {
          heading: "Reaksi Kebanyakan Orang...",
          kicker: "Sayangnya:",
          body: "Mendesah, naik nada suara, “Yaaah kamu sih! Mama udah bilang hati-hati!” Anak menangis. Sup terlupa, tinggal trauma.",
        },
        {
          heading: "Rasulullah ﷺ Akan...",
          kicker: "Sunnah Beliau:",
          body: "Pertama cek apakah anaknya kepanasan. Senyum dulu. Lalu bilang: “Nggak apa-apa, ayo bersihkan sama-sama.” Tanpa drama, penuh kasih sayang.",
          attribution: "Sirah Nabawiyah",
        },
        {
          heading: "Coba Minggu Ini!",
          kicker: "Untuk Mama & Ayah:",
          body: "Save slide ini. Pas anak tumpah / pecahin sesuatu minggu ini, tarik nafas. Ingat: Rasulullah akan gimana? Save buat pengingat!",
        },
      ],
      caption: "Rasulullah ﷺ dalam moment dapur kita sehari-hari 🤍 Save buat pengingat sabar!",
      cta: "Save buat pengingat sabar!",
      hashtags: ["#BabyMo", "#WhatWouldRasulullahDo", "#Sunnah", "#GentleParenting"],
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
          body: "Cerita ini buat semua mama yang merasa lelah malam ini. Buat semua yang punya momen — yang nggak diceritakan ke siapa-siapa.",
        },
        {
          heading: "Pukul 11 Malam...",
          kicker: "Adegan:",
          body: "Bayi akhirnya tertidur. Mama duduk di lantai laundry, sandar tembok. Setumpuk baju kotor. Kepala penuh. Air mata pelan-pelan jatuh.",
        },
        {
          heading: "Ia Cuma Bisa Bisik...",
          kicker: "Hanya Satu Kalimat:",
          body: "“Ya Allah.” Itu saja. Nggak ada doa panjang. Nggak ada permintaan rinci. Cuma nama-Nya yang ia ingat.",
        },
        {
          heading: "Dan Itu Cukup. 💚",
          kicker: "Pesan untuk Mama:",
          body: "Allah dengar doa yang nggak ada kata-katanya. Dia tahu yang tersembunyi di hati. Mama nggak butuh doa fancy — cukup nama-Nya.",
          attribution: "QS. Al-Mu'min: 60",
        },
        {
          heading: "Untuk Mama Malam Ini.",
          kicker: "Save & Bagikan:",
          body: "Mama yang lagi capek banget malam ini, ini buat kamu. Save slide ini. Atau tag teman mama yang butuh diingat — kamu nggak sendiri.",
        },
      ],
      caption: "Untuk mama yang di lantai cucian malam ini 🤍 Save & kirim ke teman.",
      cta: "Save & kirim ke teman mama!",
      hashtags: ["#BabyMo", "#MamaCerita", "#TaqarrubIlallah", "#UntukMama"],
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

  /* ---------- EMOTIONAL CHILDHOOD (additional) ---------- */
  "before-sleep-series": [
    {
      title: "5 Sunnah Sebelum Tidur",
      hook: "Malam lebih berkah, tidur lebih nyenyak.",
      slides: [
        {
          heading: "5 Sunnah Sebelum Tidur 🌙",
          kicker: "Yuk, Hafalkan!",
          body: "Ada 5 kebiasaan kecil dari Rasulullah yang bikin tidur Sahabat Mo penuh berkah. Catat ya!",
        },
        {
          heading: "1. Wudhu Dulu!",
          kicker: "Sunnah Pertama:",
          body: "Wudhu sebelum tidur bikin malam lebih berkah dan mimpi lebih indah.",
          attribution: "HR. Bukhari 247",
        },
        {
          heading: "2. Baca Tiga Surah",
          kicker: "Sunnah Kedua:",
          body: "Baca Al-Ikhlas, Al-Falaq, An-Nas. Tiup ke kedua tangan, usapkan ke seluruh badan.",
          attribution: "HR. Bukhari 5017",
        },
        {
          heading: "3. Tidur Miring Kanan",
          kicker: "Sunnah Ketiga:",
          body: "Posisi tidur Rasulullah: miring ke kanan, tangan kanan di bawah pipi kanan. Lebih sehat!",
        },
        {
          heading: "Save & Coba Malam Ini!",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Coba 5 sunnah ini malam ini. Tag #BabyMo kalau Sahabat Mo udah ngelakuin!",
        },
      ],
      caption: "Yuk, mulai kebiasaan baik dari sekarang 🌙 Save & coba malam ini!",
      cta: "Save & coba malam ini!",
      hashtags: ["#BabyMo", "#SunnahTidur", "#AnakMuslim", "#5SunnahTidur"],
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
  /* ---------- PARENTING ---------- */
  "gentle-muslim-parenting": [
    {
      title: "Marah-Marah Bukan Tarbiyah",
      hook: "Lembut itu kuat, bukan lemah.",
      slides: [
        {
          heading: "Marah-marah Bukan Tarbiyah",
          kicker: "Pesan untuk Mama & Ayah:",
          body: "Anak yang dibentak akan diam karena takut, bukan karena paham. Yuk, kita ubah caranya.",
        },
        {
          heading: "Apa Kata Rasulullah?",
          kicker: "Sunnah Beliau:",
          body: "Rasulullah SAW melayani anak Anas selama 10 tahun. Tidak sekali pun beliau membentaknya.",
          attribution: "HR. Muslim 2310",
        },
        {
          heading: "Coba Cara Ini!",
          kicker: "3 Langkah Sabar:",
          body: "1. Tarik nafas 3x sebelum bicara.\n2. Tunduk ke level mata anak.\n3. Bicara pelan tapi tegas.",
        },
        {
          heading: "Kalau Terlanjur Marah?",
          kicker: "Nggak Apa-apa:",
          body: "Tarbiyah itu proses panjang. Minta maaf ke anak adalah teladan paling indah dari Rasulullah.",
        },
        {
          heading: "Mama & Ayah, Kamu Bisa!",
          kicker: "Reminder Cinta:",
          body: "Save slide ini untuk hari-hari berat. Setiap kelelahanmu menjadi anak sholeh — Allah catat semua.",
        },
      ],
      caption: "Tarbiyah dengan cinta, bukan dengan amarah 💚 Save & bagikan ke mama lain!",
      cta: "Save & jadi orangtua sabar!",
      hashtags: ["#BabyMo", "#ParentingIslami", "#GentleParenting", "#TarbiyahCinta"],
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
      title: "Tahukah Kamu? 1 Kalimat Ajaib Sebelum Makan",
      hook: "Sebuah kalimat pendek dengan efek BESAR.",
      slides: [
        {
          heading: "Tahukah Kamu? 🤫",
          kicker: "1 Kalimat Ajaib",
          body: "Cuma 1 kata pendek, tapi efeknya BESAR untuk hidup Sahabat Mo. Penasaran? Swipe terus yaa →",
        },
        {
          heading: "Apa Sih Kalimatnya?",
          kicker: "Petunjuk:",
          body: "Diawali dengan huruf 'B'. Rasulullah ﷺ selalu ucap sebelum makan, sebelum berdoa, sebelum apa saja. Udah tebak? 👀",
        },
        {
          heading: "Yes! BISMILLAH 💚",
          kicker: "Artinya:",
          body: "“Dengan menyebut nama Allah.” Kalimat kecil tapi bikin makanan kita penuh berkah — bahkan setan nggak bisa ikut makan dari piring kita.",
          arabic: "بِسْمِ اللَّهِ",
          attribution: "HR. Muslim 2017",
        },
        {
          heading: "Eh, Kalau Lupa Gimana?",
          kicker: "Tenang Sahabat Mo:",
          body: "Begitu ingat di tengah makan, baca:\n\n“Bismillahi awwalahu wa aakhirahu” (Dengan nama Allah di awal & akhir). Selesai, berkahnya kembali!",
        },
        {
          heading: "Yuk, Tantangan Hari Ini!",
          kicker: "Misi Sahabat Mo:",
          body: "Bismillah sebelum SEMUA aktivitas hari ini — makan, belajar, main, naik kendaraan. Save slide & komen 'SIAP' di postingan! 🙋",
        },
      ],
      caption: "Bismillah dulu, hidup berkah! 🍽️💚 Tag temanmu yang sering lupa Bismillah 😄",
      cta: "Save & komen 'SIAP'!",
      hashtags: ["#BabyMo", "#TahukahKamu", "#Bismillah", "#AdabMakan"],
    },
    {
      title: "Tahukah Kamu? Rahasia Tidur Berkah",
      hook: "Satu kebiasaan kecil bikin malam dijaga malaikat.",
      slides: [
        {
          heading: "Tahukah Kamu? 🌙",
          kicker: "Rahasia Sebelum Tidur",
          body: "Ada satu kebiasaan kecil yang bikin malam Sahabat Mo dijaga MALAIKAT sepanjang tidur. Mau tau? Swipe →",
        },
        {
          heading: "Coba Tebak Dulu!",
          kicker: "Pilih jawabanmu:",
          body: "A. Baca doa\nB. Wudhu\nC. Tidur miring kanan\n\nKira-kira yang mana?",
        },
        {
          heading: "Jawabannya: WUDHU! 💧",
          kicker: "Sabda Rasulullah:",
          body: "“Siapa tidur dalam keadaan suci (berwudhu), malaikat akan bersamanya sepanjang malam dan mendoakan ampunan baginya.”",
          attribution: "HR. Ibnu Hibban 1051",
        },
        {
          heading: "Bonus Manfaatnya!",
          kicker: "Triple Berkah:",
          body: "1. Diampuni dosa-dosa kecil\n2. Mimpi lebih indah\n3. Bangun lebih segar untuk Subuh!",
        },
        {
          heading: "Coba Mulai Malam Ini, Yuk!",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Wudhu sebelum bobo malam ini. Besok pagi komen di postingan kalau Sahabat Mo merasa bedanya ya! 🌙✨",
        },
      ],
      caption: "Tidur berkah, bangun segar 💧 Tag yang perlu pengingat ini malam ini!",
      cta: "Save & coba malam ini!",
      hashtags: ["#BabyMo", "#Sunnah", "#TahukahKamu", "#WudhuSebelumTidur"],
    },
    {
      title: "Tahukah Kamu? Senyum = Sedekah",
      hook: "Sedekah paling murah, paling sering kita lewatkan.",
      slides: [
        {
          heading: "Tahukah Kamu? 😊",
          kicker: "Sedekah Tanpa Uang",
          body: "Sahabat Mo, kamu bisa sedekah hari ini TANPA mengeluarkan satu rupiah pun. Caranya? Swipe yuk →",
        },
        {
          heading: "Bukan Uang, Bukan Barang",
          kicker: "Lalu Apa?",
          body: "Ini sedekah yang bisa kita berikan kapan aja, ke siapa aja, di mana aja. Gratis. Mudah. Coba tebak... 🤔",
        },
        {
          heading: "Jawabannya: SENYUM 😊",
          kicker: "Sabda Rasulullah:",
          body: "“Senyummu kepada saudaramu adalah sedekah.”",
          attribution: "HR. Tirmidzi 1956",
        },
        {
          heading: "Kenapa Sih Begitu Spesial?",
          kicker: "Karena:",
          body: "Senyum tulus bisa bikin orang lain lupa sedihnya, hilang lelahnya, dan ingat bahwa dunia masih hangat. Itu pahala BESAR.",
        },
        {
          heading: "Misi Senyum Hari Ini!",
          kicker: "Tantangan Sahabat Mo:",
          body: "Senyum ke 5 orang hari ini — mama, ayah, adik, teman, orang asing di jalan. Tag #BabyMo kalau udah berhasil! 🌸",
        },
      ],
      caption: "Senyum tulus = pahala BESAR 😊 Bagikan ke yang butuh diingatkan hari ini!",
      cta: "Tag temanmu, ajak senyum bareng!",
      hashtags: ["#BabyMo", "#SenyumSedekah", "#TahukahKamu", "#AnakSholeh"],
    },
  ],
  "allahs-creation": [
    {
      title: "Subhanallah, Lihat Bulan!",
      hook: "Allah ciptakan lampu untuk seluruh dunia.",
      slides: [
        {
          heading: "Wow! Lihat Bulan! 🌙",
          kicker: "Ciptaan Allah:",
          body: "Coba tengok ke langit malam ini, Sahabat Mo. Ada satu benda yang sangat menakjubkan...",
        },
        {
          heading: "Fakta Seru!",
          kicker: "Tahukah Kamu?",
          body: "Bulan nggak punya cahaya sendiri loh! Cahaya bulan sebenarnya pantulan dari matahari.",
        },
        {
          heading: "Pelajaran Buat Kita",
          kicker: "MasyaAllah:",
          body: "Sama seperti bulan, kita juga sebenarnya nggak punya cahaya sendiri. Kita pantulkan kasih sayang Allah ke sekitar.",
        },
        {
          heading: "Allah Maha Hebat!",
          kicker: "Tafakkur Yuk:",
          body: "Allah ciptakan bulan tepat ukuran & jaraknya. Kalau terlalu dekat, kita gosong. Terlalu jauh, kita beku. Pas banget!",
        },
        {
          heading: "Misi Tafakkur Malam Ini",
          kicker: "Yuk Coba:",
          body: "Ajak mama / ayah keluar rumah. Lihat bulan bareng. Bilang “SubhanAllah!” bareng. Foto & tag #BabyMo!",
        },
      ],
      caption: "Tafakkur malam ini: SubhanAllah! 🌙 Save & ajak keluarga lihat bulan!",
      cta: "Save & lihat bulan malam ini!",
      hashtags: ["#BabyMo", "#KebesaranAllah", "#AnakMuslim", "#TafakkurMalam"],
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
  /* ---------- INTERACTIVE (additional) ---------- */
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
      title: "Kisah Semut yang Berdoa 🐜",
      hook: "Sebuah cerita yang akan ubah cara Sahabat Mo berdoa.",
      slides: [
        {
          heading: "Yuk, Dengerin Cerita... 🐜",
          kicker: "Pengantar Mo:",
          body: "Sahabat Mo, ada satu cerita kecil tentang seekor semut yang mungkin akan ubah cara kamu lihat doa. Siap? Swipe pelan-pelan →",
        },
        {
          heading: "Suatu Sore di Taman...",
          kicker: "Babak 1:",
          body: "Seekor semut kecil sedang berusaha mengangkat sehelai daun. Tapi daun itu terlalu besar. Jatuh. Coba lagi. Jatuh lagi. Coba lagi. Jatuh...",
        },
        {
          heading: "Akhirnya Semut Itu Berhenti.",
          kicker: "Babak 2:",
          body: "Capek. Sedih. Lalu pelan-pelan menengadah ke langit, dan berbisik:\n\n“Ya Rahman... kuatkan tubuh kecilku ini.”",
        },
        {
          heading: "Lalu... MasyaAllah! ✨",
          kicker: "Babak 3:",
          body: "Tiba-tiba semut itu merasa kuat. Daun yang tadinya berat, sekarang ringan. Allah dengar doa sekecil bisikan semut.",
        },
        {
          heading: "Pesan Untuk Sahabat Mo 💚",
          kicker: "Yang Bisa Kita Ambil:",
          body: "Kalau doa semut aja Allah dengar, doamu juga PASTI didengar. Jangan malu berdoa untuk hal kecil. Save & cerita ke adik sebelum bobo! 🌙",
        },
      ],
      caption: "Sebesar apa hatimu berdoa, Allah dengar 🐜💚 Save buat bedtime story!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#CeritaIslami", "#BedtimeStory", "#KisahHewan"],
    },
    {
      title: "Burung Kecil yang Hilang Sayap",
      hook: "Allah selalu siapkan jalan keluar — bahkan yang nggak kita duga.",
      slides: [
        {
          heading: "Cerita Tentang Burung Kecil 🐦",
          kicker: "Pengantar Mo:",
          body: "Pernah merasa nggak bisa apa-apa, Sahabat Mo? Cerita ini buat kamu. Swipe pelan-pelan ya →",
        },
        {
          heading: "Suatu Hari di Hutan...",
          kicker: "Babak 1:",
          body: "Seekor burung kecil terjatuh dari sarangnya. Sayap kanannya patah. Ia nggak bisa terbang. Nggak bisa pulang. Hanya bisa menangis pelan.",
        },
        {
          heading: "Lalu... Datanglah Seekor Tupai 🐿️",
          kicker: "Babak 2:",
          body: "Tupai itu berhenti, lihat burung kecil, dan bilang: “Naik ke punggungku. Aku antar ke sarangmu.”\n\nBurung kecil kaget. “Kenapa kamu mau bantu aku?”",
        },
        {
          heading: "Jawaban Tupai...",
          kicker: "Babak 3:",
          body: "“Karena Allah kirim aku untukmu. Allah selalu siapkan jalan keluar — kadang lewat orang yang nggak kamu duga.”",
          attribution: "QS. At-Talaq: 2-3",
        },
        {
          heading: "Pesan Untuk Sahabat Mo 💚",
          kicker: "Yang Bisa Kita Ambil:",
          body: "Kalau Sahabat Mo lagi susah, jangan menyerah. Allah pasti kirim 'tupai-tupai' kecil yang bantu kamu. Save & yakini hari ini! 🌿",
        },
      ],
      caption: "Allah selalu siapkan jalan keluar 🐿️💚 Save buat saat sedang merasa sendiri.",
      cta: "Save buat hari-hari berat!",
      hashtags: ["#BabyMo", "#CeritaIslami", "#JanganMenyerah", "#TawakkalAllah"],
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
