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
      title: "Pernah Merasa Sendirian? Ada 1 Ayat...",
      hook: "Ayat singkat yang ubah cara kamu rasa kesepian.",
      slides: [
        {
          heading: "Pernah Merasa Sendirian? 🥺",
          kicker: "Sahabat Mo, dengerin dulu yuk:",
          body: "Ada hari-hari ketika kita ngerasa nggak ada yang ngerti. Hari ini Mo mau ingetin satu ayat yang ubah perasaan itu. Swipe pelan-pelan →",
        },
        {
          heading: "Allah Bicara Langsung Ke Kamu",
          kicker: "Sebelum baca, tarik nafas dulu:",
          body: "Bayangkan ayat ini sedang dibisikkan langsung ke hatimu. Bukan untuk siapa-siapa lain. Untukmu. Ready?",
        },
        {
          heading: "“Dia Bersamamu, Di Manapun Kamu Berada.”",
          kicker: "Firman Allah:",
          body: "Maha Suci Allah, Dia tidak pernah jauh.",
          arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ",
          attribution: "QS. Al-Hadid: 4",
        },
        {
          heading: "Artinya Apa?",
          kicker: "Renungkan Ini:",
          body: "Di kamar yang sepi — Allah ada.\nDi sekolah yang ramai — Allah ada.\nDi malam yang panjang — Allah ada.\n\nKamu nggak pernah benar-benar sendirian.",
        },
        {
          heading: "Save Buat Hari Berat 💚",
          kicker: "Pesan Mo:",
          body: "Save slide ini. Buka lagi kalau hatimu lelah. Atau kirim ke teman yang butuh diingatkan. Allah dengar, Allah lihat, Allah dekat.",
        },
      ],
      caption: "Untuk Sahabat Mo yang ngerasa sendirian — Allah selalu dekat 💚",
      cta: "Save & kirim ke teman yang butuh!",
      hashtags: ["#BabyMo", "#AyatQuran", "#AllahDekat", "#PenyemangatHati"],
    },
    {
      title: "Pas Lagi Susah, Inget Ayat Ini",
      hook: "Allah janji — dan janji-Nya pasti.",
      slides: [
        {
          heading: "Lagi Susah Banget? 😔",
          kicker: "Mo Mau Cerita:",
          body: "Sahabat Mo, kadang hidup kasih ujian yang rasanya nggak ada habisnya. Tapi Allah punya janji buat kamu. Yuk dengerin →",
        },
        {
          heading: "Janji Apa Sih?",
          kicker: "Penasaran:",
          body: "Janji yang Allah ulang DUA KALI dalam surah yang sama. Saking pentingnya. Swipe untuk baca ayatnya →",
        },
        {
          heading: "“Sesungguhnya Bersama Kesulitan, Ada Kemudahan.”",
          kicker: "Firman Allah:",
          body: "Allah ulang ayat ini dua kali — penegasan bahwa janji-Nya pasti.",
          arabic: "فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا",
          attribution: "QS. Al-Inshirah: 5-6",
        },
        {
          heading: "Perhatikan Kata 'MA'A' (Bersama)",
          kicker: "Pesan Tersembunyi:",
          body: "Bukan 'SETELAH' kesulitan ada kemudahan. Tapi 'BERSAMA'. Kemudahanmu sudah jalan bareng ujianmu. Tinggal sabar nunggu wujudnya.",
        },
        {
          heading: "Pegang Janji Ini Hari Ini 💚",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Kalau hari ini berat, baca ulang ayatnya. Allah nggak pernah ingkar janji. Tag teman yang lagi struggle ya.",
        },
      ],
      caption: "Allah selalu jalan bareng kamu 💚 Tag yang butuh pengingat ini.",
      cta: "Save & tag yang lagi struggle!",
      hashtags: ["#BabyMo", "#AyatQuran", "#JanjiAllah", "#AlInshirah"],
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
          arabic: "لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ",
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
          arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
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
          arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
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
      title: "Jumat Mubarak!",
      hook: "Hari paling istimewa minggu ini.",
      slides: [
        {
          heading: "Jumat Mubarak! 🌿",
          kicker: "Yuk, Amalkan:",
          body: "Hari paling Allah cintai dalam seminggu. Perbanyak shalawat, baca Surah Al-Kahfi, & doa di antara ashar-maghrib (waktu mustajab).",
          attribution: "HR. Muslim 854",
        },
      ],
      caption: "Jumat Mubarak, Sahabat Mo! 🌿✨ Tag yang perlu pengingat hari ini!",
      cta: "Tag sahabatmu, ucapkan Jumat Mubarak!",
      hashtags: ["#BabyMo", "#JumatBerkah", "#Shalawat"],
    },
    {
      title: "Baca Surah Al-Kahfi Hari Ini? 🌅",
      hook: "Surah yang ngelindungi kamu sampai Jumat depan.",
      slides: [
        {
          heading: "Baca Surah Al-Kahfi Hari Ini! 🌅",
          kicker: "Sunnah Jumat:",
          body: "Rasulullah ﷺ janji: barang siapa baca Surah Al-Kahfi di hari Jumat, akan dipancarkan cahaya untuknya sampai Jumat berikutnya.",
          arabic: "مَنْ قَرَأَ سُورَةَ الْكَهْفِ فِي يَوْمِ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ",
          attribution: "HR. Al-Hakim 3392",
        },
      ],
      caption: "Cahaya Jumat dari Surah Al-Kahfi 🌅 Save & baca hari ini!",
      cta: "Save buat dibaca!",
      hashtags: ["#BabyMo", "#JumatBerkah", "#AlKahfi"],
    },
    {
      title: "Shalawat 100x Hari Ini, Yuk!",
      hook: "Hadiah singkat yang dibalas Allah berkali-kali.",
      slides: [
        {
          heading: "Shalawat 100x Hari Ini, Yuk! 🌿",
          kicker: "Sunnah Jumat:",
          body: "Sabda Rasulullah ﷺ: “Barang siapa bershalawat untukku 1 kali, Allah akan bershalawat untuknya 10 kali.” 100x shalawat = 1000 balasan dari Allah.",
          arabic: "مَنْ صَلَّى عَلَيَّ صَلَاةً صَلَّى اللَّهُ عَلَيْهِ بِهَا عَشْرًا",
          attribution: "HR. Muslim 408",
        },
      ],
      caption: "100 shalawat = 1000 balasan dari Allah 🌿 Tag yang mau ikutan!",
      cta: "Save & shalawat hari ini!",
      hashtags: ["#BabyMo", "#Shalawat", "#JumatBerkah"],
    },
  ],
  "ramadan-reminder": [
    {
      title: "Ramadan Tinggal Hitungan Hari! Siap?",
      hook: "Persiapan hati lebih penting dari persiapan menu sahur.",
      slides: [
        {
          heading: "Ramadan Tinggal Hitungan Hari! 🌙",
          kicker: "Pertanyaan Jujur:",
          body: "Sahabat Mo... tahun lalu Ramadan kamu berkesan nggak? Atau lewat aja tanpa ngerasa beda? Kalau yang kedua — slide ini buat kamu. Swipe →",
        },
        {
          heading: "Kenapa Ramadan ITU Spesial?",
          kicker: "Firman Allah:",
          body: "Allah panggil bulan ini dengan nama-Nya sendiri. Bulan turunnya Al-Qur'an. Tiap detik dilipat-gandakan.",
          arabic: "شَهْرُ رَمَضَانَ ٱلَّذِىٓ أُنزِلَ فِيهِ ٱلْقُرْءَانُ",
          attribution: "QS. Al-Baqarah: 185",
        },
        {
          heading: "Kenapa Sering Lewat Begitu Aja?",
          kicker: "Jawaban:",
          body: "Karena kita SIBUK persiapan makanan & jadwal — tapi LUPA persiapan HATI. Niat. Target ibadah. Pengampunan ke orang yang kita selisihi.",
        },
        {
          heading: "Checklist Hati Pra-Ramadan 💚",
          kicker: "Sebelum 1 Ramadan:",
          body: "1. Tulis 3 target ibadah\n2. Maafkan 1 orang yang masih nyangkut di hati\n3. Niatkan: “Ramadan ini buat aku berubah”\n4. Bilang ke keluarga: yuk siapin bareng",
        },
        {
          heading: "Save & Mulai Hari Ini, Bukan H-1 🌙",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Pilih 1 dari checklist tadi, mulai HARI INI. Tag pasangan/keluarga — bareng-bareng siap Ramadan lebih dari sekedar menu.",
        },
      ],
      caption: "Marhaban ya Ramadan! 🌙 Persiapan hati > persiapan menu. Save & bagikan!",
      cta: "Save buat checklist Ramadan!",
      hashtags: ["#BabyMo", "#Ramadan", "#PersiapanRamadan", "#AnakMuslim"],
    },
    {
      title: "Sahur: Berkah Paling Underrated",
      hook: "Dia bilang 'males ah, lewat aja' — padahal berkahnya BESAR.",
      slides: [
        {
          heading: "Sering Skip Sahur? 🥱",
          kicker: "Mengaku:",
          body: "Sahabat Mo, ngaku — pernah ngerasa “ah, sahur dikit aja, atau skip aja, kan masih kenyang”? Tunggu, ada satu hadits yang akan ubah cara pandangmu →",
        },
        {
          heading: "Kata Rasulullah ﷺ Tentang Sahur",
          kicker: "Sabda Beliau:",
          body: "“Bersahurlah kalian, karena dalam sahur itu ada BERKAH.”",
          arabic: "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
          attribution: "HR. Bukhari 1923 & HR. Muslim 1095",
        },
        {
          heading: "Apa Berkahnya Sih? ✨",
          kicker: "Triple Bonus:",
          body: "1. Allah & malaikat bershalawat untuk yang sahur\n2. Pembeda puasa Muslim vs umat lain\n3. Energi untuk ibadah seharian",
        },
        {
          heading: "Sahur Walau 1 Gelas Air 💧",
          kicker: "Pesan Rasulullah:",
          body: "“Sahurlah walaupun hanya dengan seteguk air.”\n\nJadi sebenarnya nggak ada alasan skip sahur — air aja udah berkah.",
          attribution: "HR. Ahmad 11086",
        },
        {
          heading: "Misi Ramadan Ini, Yuk!",
          kicker: "Tantangan Sahabat Mo:",
          body: "Sahur SETIAP HARI Ramadan, walau cuma kurma + air. Save slide ini. Tag yang biasanya sering skip — ajak berkah bareng! 🌙",
        },
      ],
      caption: "Sahur = berkah yang sering kita lewatkan 🌙 Tag yang suka skip sahur!",
      cta: "Save & tag yang skip sahur!",
      hashtags: ["#BabyMo", "#Sahur", "#Ramadan", "#BerkahSahur"],
    },
  ],
  "tiny-heart-talks": [
    {
      title: "3 Kalimat Ajaib Untuk Anak (Save Malam Ini)",
      hook: "Kalimat kecil yang tinggal di hati anak seumur hidup.",
      slides: [
        {
          heading: "Mama, Ada 3 Kalimat... 💛",
          kicker: "Sebelum kamu skip:",
          body: "3 kalimat ini, kalau diucapkan tulus ke anak, bakal tinggal di hatinya seumur hidup. Anak ingat sampai dia besar. Save dulu, lalu swipe →",
        },
        {
          heading: "Kalimat #1: “Allah Sayang Kamu.” 💚",
          kicker: "Bisikkan saat:",
          body: "Pas anak rewel, sedih, atau takut. Peluk dulu, lalu bisikkan pelan. Bukan menenangkan badan — tapi menenangkan JIWA.",
        },
        {
          heading: "Kalimat #2: “Cerita Ke Mama Aja.”",
          kicker: "Bisikkan saat:",
          body: "Pas anak diam atau wajahnya beda. Buat rumah jadi tempat aman cerita. Anak yang didengar di rumah, akan tumbuh BERANI di luar.",
        },
        {
          heading: "Kalimat #3: “Maaf, Mama Salah Tadi.”",
          kicker: "Yang paling sulit, paling penting:",
          body: "Mama juga manusia. Minta maaf ke anak nggak menurunkan wibawa. Justru itu yang Rasulullah ajarkan ke kita.",
          attribution: "HR. Bukhari 6203",
        },
        {
          heading: "Coba Satu Malam Ini, Ma 💛",
          kicker: "Misi:",
          body: "Pilih SATU kalimat dari 3 di atas. Bisikkan ke anak sebelum bobo nanti. Save slide ini. Besok ulang lagi. Konsisten = ajaib.",
        },
      ],
      caption: "Kalimat kecil yang bikin hati anak besar 💛 Save & coba malam ini, Ma.",
      cta: "Bisikkan ke anakmu malam ini.",
      hashtags: ["#BabyMo", "#ParentingIslami", "#KalimatAjaib", "#TarbiyahCinta"],
    },
  ],
  "dear-little-muslim": [
    {
      title: "Surat Sayang Buat Sahabat Mo (Save Pelan-pelan)",
      hook: "3 hal penting yang Mo ingin kamu ingat seumur hidup.",
      slides: [
        {
          heading: "Halo Sahabat Mo,",
          kicker: "Surat Hari Ini:",
          body: "Mama Mo mau cerita 3 hal penting buat kamu. Mungkin sekarang kamu belum ngerti semua, tapi tolong simpan baik-baik di hati. Swipe pelan-pelan →",
        },
        {
          heading: "Hal #1: Kamu SUDAH Cukup.",
          kicker: "Dengarkan baik-baik:",
          body: "Kamu nggak perlu jadi paling pintar, paling cepat, paling juara. Allah udah ciptakan kamu cukup — apa adanya. Itu kebenaran nomor satu.",
        },
        {
          heading: "Hal #2: Allah Sayang Kamu, Selalu.",
          kicker: "Bahkan saat:",
          body: "...kamu salah. ...kamu lupa shalat. ...kamu sedih banget. Allah nggak pernah ninggalin kamu. Dia paling sayang sama anak yang BERUSAHA.",
        },
        {
          heading: "Hal #3: Lembut Itu Kekuatan.",
          kicker: "Yang paling sulit, paling indah:",
          body: "Dunia luar mungkin keras. Tapi kalau kamu tetap lembut hati, itu sunnah Rasulullah ﷺ. Kekuatan paling tinggi, paling Allah cinta.",
        },
        {
          heading: "Salam Sayang, Mama Mo 💚",
          kicker: "Penutup:",
          body: "Tumbuh besar dengan hati lembut ya, Sahabat Mo. Save slide ini, baca lagi pas kamu udah gede. Atau tag adik/keponakanmu sekarang!",
        },
      ],
      caption: "Surat-surat yang kami harap setiap Muslim cilik baca seumur hidupnya 💛",
      cta: "Tag adik / keponakanmu!",
      hashtags: ["#BabyMo", "#DearSahabatMo", "#MuslimKids", "#SuratUntukAnak"],
    },
  ],
  "muslim-childhood-nostalgia": [
    {
      title: "Sebelum Kamu Tau Apa Itu Iman... (Nostalgia)",
      hook: "Islam yang kita kenal pertama, dari tekstur rumah.",
      slides: [
        {
          heading: "Inget Nggak Sih... 🥹",
          kicker: "Nostalgia Hari Ini:",
          body: "Sebelum kita ngerti Islam dari kitab, kita udah belajar Islam dari rumah. Diam-diam, lewat 3 momen ini. Sahabat Mo siap nostalgia? →",
        },
        {
          heading: "Aroma Dapur Nenek 🍛",
          kicker: "Memori #1:",
          body: "Wangi rendang Lebaran, suara nenek nguleg sambal, dan “Bismillah” yang selalu disebut sebelum setiap suapan. Itu Islam pertama kita.",
        },
        {
          heading: "Adzan Dari Radio Kecil 📻",
          kicker: "Memori #2:",
          body: "Setiap maghrib, semuanya berhenti. TV dikecilkan. Ayah ke surau. Rumah jadi senyap. Bukan dipaksa — alami. Itu juga Islam.",
        },
        {
          heading: "Peluk Mama Setelah Shalat 💛",
          kicker: "Memori #3:",
          body: "Mama nyium pipi sambil bilang “anak sholehnya mama.” Kita ngerasa AMAN, DICINTAI, dan tau enaknya jadi anak Muslim. Pelajaran paling dalam.",
        },
        {
          heading: "Sekarang Giliran Kita 🌿",
          kicker: "Untuk Mama & Ayah:",
          body: "Anak kita sedang menulis “memori Islam-nya” dari hal-hal yang kita lakukan HARI INI. Save slide & tag pasanganmu — bareng yuk bikin rumah jadi kenangan terbaik.",
        },
      ],
      caption: "Childhood Islam, dalam tekstur rumah 🏡 Tag yang relate!",
      cta: "Tag pasanganmu / ayah-ibu!",
      hashtags: ["#BabyMo", "#MuslimChildhood", "#Nostalgia", "#CozyIslam"],
    },
  ],
  "ayah-series": [
    {
      title: "Ayah Yang Cintanya Nggak Pernah Diomongin",
      hook: "Cinta yang bekerja diam-diam, bicara lewat tindakan.",
      slides: [
        {
          heading: "Pernah Liat Ayahmu Diam? 🤍",
          kicker: "Coba Perhatikan:",
          body: "Ada cinta yang nggak banyak bicara. Yang kerja diam-diam. Yang bangun jam 4 subuh tapi tidur paling akhir. Sahabat Mo ngeh nggak?  Swipe →",
        },
        {
          heading: "Tahukah Kamu Yang Ini? 🌙",
          kicker: "Rahasia Ayah:",
          body: "Ayahmu mungkin nggak pernah cerita. Tapi di sepertiga malam yang sunyi, dia sebut NAMAMU di sujud terakhirnya. Setiap. Malam.",
        },
        {
          heading: "Itu Doa Paling Mustajab 💚",
          kicker: "Sabda Rasulullah:",
          body: "“Doa orangtua untuk anaknya adalah doa yang mustajab — TIDAK terhalang.”",
          arabic: "دَعْوَةُ الْوَالِدِ لِوَلَدِهِ لَا تُحْجَبُ",
          attribution: "HR. Tirmidzi 1905",
        },
        {
          heading: "Yuk, Balas Cinta Ayah",
          kicker: "4 Cara Berbakti:",
          body: "1. Salam & cium tangan pas pulang/pergi\n2. Bantu Ayah tanpa diminta\n3. Doakan Ayah tiap hari\n4. Senyum & dengarkan pas ditegur",
        },
        {
          heading: "Tag Ayahmu Sekarang, Jangan Nanti 💙",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Tag Ayahmu. Hari ini ucapkan terima kasih ke Ayah — pelukan kalau berani. Cinta diam-diam pantas dapat terima kasih yang LANTANG.",
        },
      ],
      caption: "Untuk setiap Ayah yang mencintai dalam diam 💙 Tag Ayahmu sekarang!",
      cta: "Tag Ayah kebanggaanmu!",
      hashtags: ["#BabyMo", "#AyahHebat", "#KeluargaSholeh", "#TagAyahmu"],
    },
  ],
  "islamic-fun-facts": [
    {
      title: "Rasulullah Pernah Potong Jubahnya... Demi Kucing!",
      hook: "Cerita sweet yang ngajarin kita arti lembut hati.",
      slides: [
        {
          heading: "Tahukah Kamu? 🐈",
          kicker: "Fakta Seru Hari Ini:",
          body: "Ada satu hewan kecil yang Rasulullah ﷺ SANGAT sayang. Sampai-sampai beliau ngelakuin hal tak terduga demi hewan ini. Tebak hewan apa? 👀",
        },
        {
          heading: "Hint: Suka Mengeong, Suka Tidur 🐱",
          kicker: "Udah tebak?",
          body: "Yes! Kucing! Nama kucing kesayangan Rasulullah adalah MUEZZA. Lanjut yuk, cerita seru-nya baru mulai →",
        },
        {
          heading: "Suatu Hari... 😴",
          kicker: "Adegan:",
          body: "Rasulullah ﷺ mau berangkat shalat. Tapi Muezza, kucingnya, lagi tidur PULAS di atas jubah beliau. Apa yang beliau lakukan?",
        },
        {
          heading: "Beliau POTONG Jubahnya! ✂️",
          kicker: "MasyaAllah:",
          body: "Daripada membangunkan Muezza, Rasulullah ﷺ memotong bagian jubahnya yang ditiduri kucing. Lalu beliau berangkat shalat dengan jubah belah. Cinta hewan setinggi itu.",
        },
        {
          heading: "Tag Pecinta Kucing! 🐱",
          kicker: "Pesan Sahabat Mo:",
          body: "Sayang sama hewan kecil = SUNNAH. Lembut hati ke makhluk Allah = pahala. Save & tag teman yang punya kucing — ingatkan, mereka udah ngikutin sunnah!",
        },
      ],
      caption: "Tiny hearts, tiny cats, big Sunnah 🐈 Tag pecinta kucing!",
      cta: "Tag pecinta kucing!",
      hashtags: ["#BabyMo", "#FaktaIslam", "#Sunnah", "#KucingRasulullah"],
    },
    {
      title: "Tahukah Kamu? Madu Disebut Allah Sebagai Obat",
      hook: "Cairan emas yang Allah puji langsung di Al-Qur'an.",
      slides: [
        {
          heading: "Tahukah Kamu? 🍯",
          kicker: "Fakta Seru Hari Ini:",
          body: "Ada satu makanan yang Allah SENDIRI sebut sebagai OBAT dalam Al-Qur'an. Tebak apa? Hint: warnanya emas, manis, dari hewan kecil. 🐝",
        },
        {
          heading: "Yes! MADU 🍯",
          kicker: "Tapi tunggu...",
          body: "Yang spesial dari madu bukan rasanya. Tapi bagaimana Allah memuji-nya dalam ayat ini. Siap dengerin? →",
        },
        {
          heading: "Firman Allah Tentang Madu",
          kicker: "QS. An-Nahl: 69",
          body: "“Dari perut lebah keluar minuman dengan bermacam-macam warna, di dalamnya terdapat OBAT yang menyembuhkan bagi manusia.”",
          arabic: "فِيهِ شِفَاءٌ لِلنَّاسِ",
          attribution: "QS. An-Nahl: 69",
        },
        {
          heading: "Sains Setuju! 🔬",
          kicker: "Bonus Fakta:",
          body: "Penelitian modern: madu bisa sembuhin luka, kuatin imun, redain batuk. Allah udah kasih tau 1.400 tahun sebelum lab nemu! MasyaAllah.",
        },
        {
          heading: "Yuk, Sunnah Hari Ini!",
          kicker: "Tantangan Sahabat Mo:",
          body: "Coba minum 1 sendok madu pagi ini, bismillah dulu, niatkan sebagai sunnah. Save slide & tag teman yang lagi sakit — kirim doa sembuh!",
        },
      ],
      caption: "Madu = obat, langsung dari Al-Qur'an 🍯 Tag teman yang lagi sakit!",
      cta: "Save & tag yang lagi sakit!",
      hashtags: ["#BabyMo", "#FaktaIslam", "#Madu", "#SunnahNabi"],
    },
  ],
  "tiny-sahabah-stories": [
    {
      title: "10 Tahun, Tanpa Sekali Pun Dimarahi (Kisah Anas)",
      hook: "Pelajaran kepemimpinan paling dalam dari Rasulullah ﷺ.",
      slides: [
        {
          heading: "Bayangkan Sahabat Mo... 🤍",
          kicker: "Cerita Hari Ini:",
          body: "Sahabat Mo umur 10 tahun. Mama bawa kamu ke rumah orang ternama, dititipkan untuk membantunya. Kamu bakal di sana 10 tahun penuh. Siap dengerin lanjutannya? →",
        },
        {
          heading: "Itulah Cerita Anas bin Malik 🌿",
          kicker: "Sahabat Cilik:",
          body: "Anas dititipkan ke rumah Rasulullah ﷺ saat umur 10 tahun. Tugasnya: jaga sandal, antar surat, bantu di rumah. SETIAP HARI selama 10 tahun.",
        },
        {
          heading: "Tapi Ini Yang Bikin Heran...",
          kicker: "Anas bercerita:",
          body: "“Selama 10 tahun itu, Rasulullah TIDAK PERNAH SEKALI PUN bilang ke aku 'kenapa kamu lakukan ini?' atau 'kenapa kamu nggak lakukan itu?'”",
          arabic: "فَمَا قَالَ لِي قَطُّ لِمَ فَعَلْتَ كَذَا وَلَا تَرَكْتَ كَذَا",
          attribution: "HR. Bukhari 6038",
        },
        {
          heading: "Lemah Lembut = Kepemimpinan Tertinggi",
          kicker: "Pesan:",
          body: "Rasulullah ﷺ memimpin sahabat, mendidik anak, ngajarin umat — semua dengan SABAR, bukan amarah. Itulah kekuatan beliau yang ngubah dunia.",
        },
        {
          heading: "Coba Minggu Ini, Ma 🌿",
          kicker: "Misi Tarbiyah:",
          body: "Selama 1 minggu, hindari bilang “kenapa kamu...” ke anak. Coba ganti dengan “lain kali kita coba...”. Save slide & tag pasanganmu, bareng yuk!",
        },
      ],
      caption: "Cerita yang bikin anak (& kita) belajar sabar & lembut 💚 Save buat bedtime story!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#KisahSahabat", "#AnakSholeh", "#AnasBinMalik"],
    },
    {
      title: "Bilal: Suara Adzan Pertama di Dunia",
      hook: "Sahabat yang dulunya budak, kini disebut suaranya di Surga.",
      slides: [
        {
          heading: "Tau Suara Adzan Yang Pertama? 🔊",
          kicker: "Cerita Hari Ini:",
          body: "Sahabat Mo, ada satu sahabat Rasulullah ﷺ yang suaranya jadi adzan PERTAMA di dunia. Tebak siapa? Hint: dulu dia budak. Swipe →",
        },
        {
          heading: "Yes — BILAL BIN RABAH 💚",
          kicker: "Latar Belakang:",
          body: "Bilal lahir sebagai budak. Disiksa berat karena masuk Islam. Tuannya menindihnya dengan batu di tengah gurun. Tapi dia tetap ucap: “Ahad, Ahad” (Allah Maha Esa).",
        },
        {
          heading: "Lalu Dibebaskan Oleh Abu Bakar 🌿",
          kicker: "Plot Twist:",
          body: "Abu Bakar membeli kebebasan Bilal. Sejak hari itu, Bilal menjadi salah satu sahabat paling dicintai Rasulullah. Dipilih jadi MUADZIN pertama.",
        },
        {
          heading: "Suaranya... Di Surga!",
          kicker: "Sabda Rasulullah:",
          body: "“Aku mendengar suara langkah sandalmu di hadapanku, di dalam Surga.”\n\nRasulullah berkata ini langsung ke Bilal. MasyaAllah.",
          arabic: "سَمِعْتُ خَشْفَ نَعْلَيْكَ بَيْنَ يَدَيَّ فِي الْجَنَّةِ",
          attribution: "HR. Bukhari 1149",
        },
        {
          heading: "Pesan Untuk Sahabat Mo 🌷",
          kicker: "Yang Bisa Kita Ambil:",
          body: "Allah nggak lihat status, nggak lihat asal-usul. Allah lihat HATI. Sahabat Mo bisa jadi siapa aja yang Allah cintai. Save & ceritakan ke adik!",
        },
      ],
      caption: "Bilal — dari budak jadi muadzin pertama di dunia 💚 Save buat cerita anak!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#KisahSahabat", "#BilalBinRabah", "#KisahMuslim"],
    },
  ],
  "kisah-nabi": [
    {
      title: "Nabi Yusuf — Dari Sumur Ke Istana",
      hook: "Allah selalu siapkan jalan, walau lewat ujian.",
      slides: [
        {
          heading: "Pernah Denger Cerita Nabi Yusuf? 🌙",
          kicker: "Kisah Hari Ini:",
          body: "Sahabat Mo, ada satu kisah Nabi yang Allah sendiri sebut dalam Al-Qur'an sebagai “sebaik-baik kisah”. Tebak siapa? Swipe pelan-pelan →",
        },
        {
          heading: "Beliau: Nabi Yusuf 'alaihissalam",
          kicker: "Babak 1 — Sumur:",
          body: "Yusuf kecil dimasukkan ke dalam sumur oleh saudara-saudaranya sendiri. Sendirian, gelap, dingin. Kelihatannya akhir dari segalanya.",
        },
        {
          heading: "Tapi Allah Punya Rencana...",
          kicker: "Babak 2 — Istana:",
          body: "Yusuf diangkat dari sumur, dijual, dibawa ke Mesir, difitnah, dipenjara — lalu akhirnya jadi BENDAHARA NEGARA. Dari sumur, ke istana.",
        },
        {
          heading: "Janji Allah Yang Diingat Yusuf",
          kicker: "Firman Allah:",
          body: "“Sesungguhnya siapa yang bertakwa dan bersabar — Allah tidak menyia-nyiakan pahala orang yang berbuat baik.”",
          arabic: "إِنَّهُۥ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ",
          attribution: "QS. Yusuf: 90",
        },
        {
          heading: "Pesan Buat Sahabat Mo 💚",
          kicker: "Yang Bisa Kita Ambil:",
          body: "Kalau kamu lagi di “sumur” — sabar, jangan menyerah. Allah lagi siapin “istana”-mu, dengan cara yang nggak kamu duga. Save & cerita ke adik!",
        },
      ],
      caption: "Dari sumur ke istana — Allah selalu siapkan jalan 🌙 Save buat bedtime story!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#KisahNabi", "#NabiYusuf", "#JanganMenyerah"],
    },
    {
      title: "Nabi Yunus — Doa di Perut Ikan",
      hook: "Doa singkat yang membuka pintu ampunan paling tertutup.",
      slides: [
        {
          heading: "Ada Nabi Yang Pernah Di Perut Ikan 🐋",
          kicker: "Kisah Hari Ini:",
          body: "Sahabat Mo, percaya nggak — ada Nabi yang pernah hidup BERHARI-HARI di dalam perut ikan paus, lalu Allah selamatkan. Tebak siapa? Swipe →",
        },
        {
          heading: "Beliau: Nabi Yunus 'alaihissalam",
          kicker: "Cerita Singkat:",
          body: "Nabi Yunus pergi tanpa izin Allah, naik kapal, kapalnya kena badai. Beliau dilempar ke laut, lalu ditelan ikan paus. Gelap, dalam, sendirian.",
        },
        {
          heading: "Di Sana, Beliau Berdoa...",
          kicker: "3 Kalimat Yang Ubah Segalanya:",
          body: "“Tiada Tuhan selain Engkau. Maha Suci Engkau. Sesungguhnya aku termasuk orang yang zalim (pada diri sendiri).”",
          arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّى كُنتُ مِنَ ٱلظَّالِمِينَ",
          attribution: "QS. Al-Anbiya: 87",
        },
        {
          heading: "Lalu... Allah Selamatkan!",
          kicker: "Babak Akhir:",
          body: "Ikan paus muntahkan Yunus ke daratan. Hidup. Sembuh. Diberi tugas baru. Doa singkat itu membuka pintu yang paling tertutup di dunia.",
        },
        {
          heading: "Doa Ini Bisa Buat Sahabat Mo Juga 💚",
          kicker: "Pesan Mama Mo:",
          body: "Kalau kamu lagi dalam “perut ikan” sendiri — masalah yang kelihatannya nggak ada jalan keluarnya — baca doa Yunus. Allah dengar. Selalu. Save & hafalkan!",
        },
      ],
      caption: "Doa Nabi Yunus — buat saat kamu di titik paling bawah 🐋 Save & hafalkan!",
      cta: "Save & hafalkan doa Yunus!",
      hashtags: ["#BabyMo", "#KisahNabi", "#NabiYunus", "#DoaYunus"],
    },
  ],
  "pertanyaan-sahabat-mo": [
    {
      title: "Q: Kenapa Allah Nggak Bisa Dilihat?",
      hook: "Pertanyaan jujur anak yang dijawab dengan lembut.",
      slides: [
        {
          heading: "Anak Mama Pernah Tanya... 👀",
          kicker: "Pertanyaan Sahabat Mo:",
          body: "“Ma, kenapa Allah nggak kelihatan? Kalau Dia ada, kenapa nggak kita lihat aja?”\n\nJawaban yang sering kita panik. Swipe untuk jawaban lembutnya →",
        },
        {
          heading: "Coba Jawab Pakai Pertanyaan Balik",
          kicker: "Pancing Dia Mikir:",
          body: "Tanya balik: “Sayang, kamu bisa LIHAT angin nggak? Atau LIHAT cinta mama ke kamu? Kalau nggak, berarti angin & cinta nggak ada?”",
        },
        {
          heading: "Apa Kata Al-Qur'an?",
          kicker: "Firman Allah:",
          body: "“Penglihatan tidak dapat menjangkau-Nya, tapi Dia dapat menjangkau segala penglihatan. Dialah Yang Maha Halus, Maha Mengetahui.”",
          arabic: "لَّا تُدْرِكُهُ ٱلْأَبْصَـٰرُ وَهُوَ يُدْرِكُ ٱلْأَبْصَـٰرَ",
          attribution: "QS. Al-An'am: 103",
        },
        {
          heading: "Allah Terlalu Besar Buat Mata Kita",
          kicker: "Analogi Sederhana:",
          body: "Sahabat Mo nggak bisa pegang matahari karena terlalu panas. Tapi kamu bisa rasain hangatnya. Allah juga begitu — terlalu besar buat dilihat, tapi terasa lewat semua hal.",
        },
        {
          heading: "Mama, Save Buat Pertanyaan Berikutnya 🌿",
          kicker: "Tips Tarbiyah:",
          body: "Anak tanya = anak sedang BERPIKIR tentang Allah. Itu sehat. Jangan panik, jawab dengan lembut. Save slide ini buat referensi waktu anak tanya lagi.",
        },
      ],
      caption: "Pertanyaan anak yang sering bikin mama panik — ini jawabannya 🌿 Save!",
      cta: "Save buat pertanyaan berikutnya!",
      hashtags: ["#BabyMo", "#PertanyaanSahabatMo", "#TarbiyahCinta", "#JawabanAnak"],
    },
    {
      title: "Q: Kenapa Harus Sholat Sih?",
      hook: "Jawaban yang nggak bikin anak takut tapi paham.",
      slides: [
        {
          heading: "Pertanyaan Klasik Anak 🤔",
          kicker: "Pertanyaan Sahabat Mo:",
          body: "“Ma, kenapa harus sholat sih? Kan capek. Allah udah tau aku sayang.”\n\nJangan jawab “pokoknya harus!”. Coba jawaban yang bikin anak PAHAM. Swipe →",
        },
        {
          heading: "Pakai Analogi Anak Suka",
          kicker: "Coba Cara Ini:",
          body: "“Sayang, kamu sayang mama kan? Tapi kalau seminggu nggak pelukan, nggak ngobrol — kita masih dekat nggak?”\n\nAnak biasanya menggeleng.",
        },
        {
          heading: "Itu Sholat 💚",
          kicker: "Sholat = Pelukan Ke Allah:",
          body: "“Sholat itu pelukan kita ke Allah. Lima kali sehari, biar kita & Allah tetap dekat. Bukan beban — itu hadiah.”",
        },
        {
          heading: "Apa Kata Allah?",
          kicker: "Firman Allah:",
          body: "“Sesungguhnya shalat itu mencegah dari perbuatan keji dan munkar.”",
          arabic: "إِنَّ ٱلصَّلَوٰةَ تَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ",
          attribution: "QS. Al-Ankabut: 45",
        },
        {
          heading: "Mama, Save Buat Pertanyaan Anak 🌿",
          kicker: "Tips Tarbiyah:",
          body: "Anak yang ngerti TUJUAN sholat akan sholat dengan hati, bukan karena dipaksa. Save slide ini. Coba ceritain ke anakmu malam ini. Diskusi yuk!",
        },
      ],
      caption: "Anak tanya kenapa harus sholat? Ini jawaban lembut yang bikin paham 💚",
      cta: "Save & diskusi sama anak!",
      hashtags: ["#BabyMo", "#PertanyaanSahabatMo", "#AjarinSholat", "#TarbiyahCinta"],
    },
  ],
  "adab-hari-ini": [
    {
      title: "Adab Masuk Rumah — 3 Detik Yang Sering Kita Skip",
      hook: "Ritual masuk rumah Rasulullah yang bawa berkah.",
      slides: [
        {
          heading: "Sahabat Mo, Coba Inget...",
          kicker: "Adab Hari Ini:",
          body: "Pas pulang ke rumah, langsung buka pintu & masuk? Atau ada langkah kecil yang sering Sahabat Mo skip? Yang Rasulullah ajarin... Swipe →",
        },
        {
          heading: "Langkah #1: Salam — Walau Sendirian!",
          kicker: "Tunggu, sendirian?",
          body: "Yes, walau di rumah lagi nggak ada siapa-siapa. Ucap “Assalamu'alaikum.” Salam buat siapa? Buat malaikat penjaga rumah & untuk dirimu sendiri.",
        },
        {
          heading: "Apa Kata Al-Qur'an?",
          kicker: "Firman Allah:",
          body: "“Jika kalian masuk ke rumah, ucapkanlah salam kepada DIRIMU SENDIRI — salam yang ditetapkan dari sisi Allah.”",
          arabic: "فَإِذَا دَخَلْتُم بُيُوتًۭا فَسَلِّمُوا۟ عَلَىٰٓ أَنفُسِكُمْ",
          attribution: "QS. An-Nur: 61",
        },
        {
          heading: "Langkah #2: Baca Doa Masuk Rumah",
          kicker: "Doa Singkat:",
          body: "“Allahumma innii as-aluka khoirol mawliji wa khoirol makhroji.”\n\nArtinya: “Ya Allah, aku mohon kebaikan saat masuk & keluar rumah.”",
          arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلِجِ وَخَيْرَ الْمَخْرَجِ",
          attribution: "HR. Abu Daud 5096",
        },
        {
          heading: "Mulai Latih Hari Ini, Sahabat Mo 🏡",
          kicker: "Misi:",
          body: "Setiap kamu masuk rumah hari ini: 1) Salam dulu, 2) Baca doa. Save slide & coba seharian. Komen kalau udah berhasil! 💚",
        },
      ],
      caption: "Adab kecil, berkah besar 🏡 Save & coba seharian ini!",
      cta: "Save & latih seharian!",
      hashtags: ["#BabyMo", "#AdabHariIni", "#AdabIslami", "#AdabRumah"],
    },
    {
      title: "Adab Makan — Yang Sering Dilupain Anak (& Kita)",
      hook: "3 adab makan dari Rasulullah ﷺ — singkat tapi penting.",
      slides: [
        {
          heading: "Tahukah Kamu... 🍽️",
          kicker: "Adab Hari Ini:",
          body: "Sahabat Mo, makan itu bukan cuma masukkan makanan ke mulut. Rasulullah ﷺ ajarin 3 adab kecil yang ubah makan biasa jadi IBADAH. Swipe →",
        },
        {
          heading: "Adab #1: Bismillah Dulu",
          kicker: "Pondasi:",
          body: "“Jika salah seorang dari kalian makan, hendaklah ia menyebut nama Allah.”\n\nLupa? Baca tengah jalan: “Bismillahi awwalahu wa aakhirahu.”",
          arabic: "إِذَا أَكَلَ أَحَدُكُمْ فَلْيَذْكُرِ اسْمَ اللَّهِ",
          attribution: "HR. Abu Daud 3767",
        },
        {
          heading: "Adab #2: Pakai Tangan Kanan",
          kicker: "Pesan Rasulullah:",
          body: "“Jika kalian makan, makanlah dengan tangan kananmu. Jika kalian minum, minumlah dengan tangan kananmu.”",
          arabic: "إِذَا أَكَلَ أَحَدُكُمْ فَلْيَأْكُلْ بِيَمِينِهِ",
          attribution: "HR. Muslim 2020",
        },
        {
          heading: "Adab #3: Makan Yang Dekat Aja",
          kicker: "Sopan Bersantap:",
          body: "“Makanlah yang dekat denganmu (yang ada di hadapanmu).”\n\nNggak ambil dari piring tengah jauh-jauh. Bukan cuma adab — itu HORMAT ke orang lain juga.",
          attribution: "HR. Bukhari 5376",
        },
        {
          heading: "Latih Bareng Anak Yuk! 🌿",
          kicker: "Misi Keluarga:",
          body: "Save slide ini. Pas makan malam ini, latih 3 adab bareng anak. Yang paling rajin = juara! Tag #BabyMo kalau udah praktek 💚",
        },
      ],
      caption: "Adab makan = ibadah harian 🍽️ Save & latih sekeluarga malam ini!",
      cta: "Save & latih sekeluarga!",
      hashtags: ["#BabyMo", "#AdabHariIni", "#AdabMakan", "#AdabIslami"],
    },
  ],
  "guess-the-sunnah": [
    {
      title: "Quiz: Tebak Mana Yang Sunnah! 🎉",
      hook: "Plot twist — jawaban yang sering nggak kepikiran.",
      slides: [
        {
          heading: "Tebak Sunnah! 🎉",
          kicker: "Quiz Seru:",
          body: "Sahabat Mo, siap quiz cepat? Akan ada 3 kebiasaan. Tugasmu: pilih mana yang sunnah Rasulullah ﷺ. Jawab di kepala dulu, lalu komen! Swipe →",
        },
        {
          heading: "Pilih Yang Mana?",
          kicker: "Round 1:",
          body: "A. Makan pakai tangan kanan ✋\nB. Tidur miring ke kanan 🛏️\nC. Senyum ke saudara 😊\n\nMana yang sunnah Rasulullah?",
        },
        {
          heading: "🥁 Jawabannya...",
          kicker: "Pengumuman:",
          body: "Bukan A doang.\nBukan B doang.\nBukan C doang.\n\nJawaban: SEMUANYA SUNNAH! 🎉",
        },
        {
          heading: "Yang Bikin Plot Twist 🤯",
          kicker: "Sumber Hadits:",
          body: "Tangan kanan — HR. Bukhari 5376\nMiring kanan saat tidur — HR. Bukhari 247\nSenyum sedekah — HR. Tirmidzi 1956\n\nTiga hal kecil = pahala besar tiap hari.",
        },
        {
          heading: "Sunnah Favoritmu Apa?",
          kicker: "Komen Yuk!",
          body: "Save slide ini & komen sunnah FAVORITMU di postingan. Mama Mo bakal bales satu-satu — siapa tau kita sunnah-an bareng besok! 🌿",
        },
      ],
      caption: "Mainin quiz ini sama anak pas dinner ya 🤍 Komen sunnah favoritmu!",
      cta: "Comment sunnah favoritmu!",
      hashtags: ["#BabyMo", "#TebakSunnah", "#QuizIslami", "#AnakMuslim"],
    },
    {
      title: "Quiz: Doa Sebelum Tidur — Yang Mana Lebih Dulu?",
      hook: "5 sunnah tidur, tapi ada urutan yang benar.",
      slides: [
        {
          heading: "Quiz Cepat — Siap? 🎯",
          kicker: "Babak 2:",
          body: "Sahabat Mo, kamu pasti tau sunnah-sunnah sebelum tidur. Tapi tau nggak URUTAN yang benar? Swipe untuk quiz-nya →",
        },
        {
          heading: "Tebak Urutannya!",
          kicker: "Urutkan dari yang paling awal:",
          body: "( ) Tidur miring kanan\n( ) Baca 3 surah\n( ) Wudhu dulu\n( ) Tiup ke tangan & usap badan\n\nUrut di kepalamu dulu...",
        },
        {
          heading: "🥁 Jawabannya:",
          kicker: "Urutan Benar:",
          body: "1. Wudhu (HR. Bukhari 247)\n2. Baca Al-Ikhlas, Al-Falaq, An-Nas\n3. Tiup ke kedua telapak tangan\n4. Usap ke seluruh badan\n5. Tidur miring kanan",
          attribution: "HR. Bukhari 5017",
        },
        {
          heading: "Kenapa Urutannya Begitu? 🌙",
          kicker: "Filosofinya:",
          body: "Wudhu = bersihin diri.\nQuran = bersihin pikiran.\nTiup & usap = perlindungan.\nMiring kanan = posisi anatomis terbaik.\n\nAjaib — sains & sunnah cocok!",
        },
        {
          heading: "Coba Praktek Malam Ini!",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Coba urutan 5 langkah tadi malam ini sebelum bobo. Komen di postingan kalau ngerasa bedanya! 🌙",
        },
      ],
      caption: "Sunnah tidur — pas urutannya bikin tidur lebih berkah 🌙 Save & coba malam ini!",
      cta: "Save & coba malam ini!",
      hashtags: ["#BabyMo", "#QuizSunnah", "#SunnahTidur", "#AnakMuslim"],
    },
  ],
  "spot-the-adab": [
    {
      title: "Detektif Adab — Berapa Yang Kamu Temuin? 🔍",
      hook: "Game seru yang ngajarin anak adab Islami tanpa ceramah.",
      slides: [
        {
          heading: "Main Detektif Yuk! 🔍",
          kicker: "Misi Sahabat Mo:",
          body: "Sahabat Mo, hari ini kita main detektif. Ada cerita kecil — tugasmu cari semua adab Islami yang ada di dalamnya. Pakai mata jeli ya! Swipe →",
        },
        {
          heading: "Ini Ceritanya... 🏡",
          kicker: "Baca Pelan-pelan:",
          body: "Aisyah dateng ke rumah nenek. Dia lepas sepatu di luar pintu. Ketuk pintu pelan, lalu ucap “Assalamu'alaikum.” Pas masuk, bantu nenek bawa belanjaan ke dapur.",
        },
        {
          heading: "Hint: Ada 3 Adab! 🤫",
          kicker: "Petunjuk Detektif:",
          body: "Coba baca ulang slide tadi. Perhatikan tiap kalimat. Sahabat Mo udah temuin berapa? Hitung dulu di kepalamu, jangan langsung swipe →",
        },
        {
          heading: "🥁 Jawabannya:",
          kicker: "Tada! 🎉",
          body: "1. LEPAS SEPATU — adab masuk rumah\n2. UCAP SALAM — adab bertamu (HR. Bukhari 6228)\n3. BANTU NENEK — adab hormati orang tua\n\nKamu temukan semua?",
        },
        {
          heading: "Misi: Detektif Di Rumahmu! 🌿",
          kicker: "Tantangan Sahabat Mo:",
          body: "Hari ini, hitung berapa adab yang kamu praktekkan di rumahmu sendiri. Save slide & komen di postingan jumlahnya. Tag teman buat main detektif bareng!",
        },
      ],
      caption: "Adab hunting = game terbaik buat ngajarin anak 🔍 Save & main bareng anak!",
      cta: "Save & main di rumah!",
      hashtags: ["#BabyMo", "#TemukanAdab", "#AdabIslami", "#GameMuslim"],
    },
  ],
  "what-would-prophet-do": [
    {
      title: "Sup Tumpah Di Meja — Kalau Rasulullah Gimana? ﷺ",
      hook: "Sunnah parenting yang lupa kita pakai di momen panik.",
      slides: [
        {
          heading: "Coba Bayangkan Sahabat Mo...",
          kicker: "Skenario Hari Ini:",
          body: "Anak kecilmu lagi makan. Tanpa sengaja, semangkuk sup hangat TUMPAH ke meja, baju, lantai. Sup ngalir ke mana-mana. Anakmu diam, kaget, takut. Reaksimu pertama? →",
        },
        {
          heading: "Reaksi Kita Yang Sering...",
          kicker: "Jujur Yuk:",
          body: "“YAAAH KAMU SIH! Mama udah bilang hati-hati!”\n\nNada naik. Anak nangis. Sup terlupa, yang tinggal: trauma & rasa bersalah si kecil.",
        },
        {
          heading: "Kalau Rasulullah ﷺ?",
          kicker: "Sunnah Beliau:",
          body: "Pertama: CEK apakah anaknya kepanasan / lukanya?\nKedua: SENYUM ke anak.\nKetiga: “Nggak apa-apa, ayo bersihkan sama-sama, nak.”\n\nNggak ada drama. Ada kasih sayang.",
          attribution: "Sirah Nabawiyah",
        },
        {
          heading: "Bedanya Di Mana?",
          kicker: "Yang Allah Lihat:",
          body: "Sup yang tumpah pasti tetap tumpah.\nLantai yang kotor pasti tetap kotor.\nYang BEDA adalah HATI anak — yang ngerasa aman, atau yang luka.\n\nItu yang dikenang seumur hidup.",
        },
        {
          heading: "Coba Minggu Ini, Ma 💚",
          kicker: "Misi Parenting:",
          body: "Save slide ini. Pas anak tumpah/pecahin sesuatu minggu ini, tarik nafas 3 detik. Bisikkan ke diri sendiri: “Kalau Rasulullah, gimana?” Lalu jawab. ✨",
        },
      ],
      caption: "Rasulullah ﷺ dalam moment dapur kita sehari-hari 💚 Save buat pengingat sabar!",
      cta: "Save buat pengingat sabar!",
      hashtags: ["#BabyMo", "#WhatWouldRasulullahDo", "#Sunnah", "#GentleParenting"],
    },
    {
      title: "Anak Ngamuk Di Tempat Umum — WWRD? ﷺ",
      hook: "Sunnah parenting versus reaksi panik kita.",
      slides: [
        {
          heading: "Skenario: Anak Ngamuk Di Mall 😩",
          kicker: "Pernah Ngalamin?",
          body: "Sahabat Mo, anak kecilmu lagi rewel BERAT di mall. Tantrum di lantai, semua orang lihat. Mukamu memerah malu. Sekarang... apa yang biasanya kita lakukan? →",
        },
        {
          heading: "Reaksi Panik Kita...",
          kicker: "Sering Banget:",
          body: "Bisikan keras: “Diem sekarang juga!” Tarik tangan paksa. Bilang “Malu-maluin Mama!”. Anak makin nangis. Kita makin malu. Spiral keras.",
        },
        {
          heading: "Kalau Rasulullah ﷺ Bagaimana?",
          kicker: "Sunnah Beliau:",
          body: "Beliau pernah saat shalat, cucunya Hasan menumpangi punggung beliau saat sujud. Beliau MEMANJANGKAN sujud sampai cucunya turun sendiri — tanpa marah.",
          attribution: "HR. Nasai 1141",
        },
        {
          heading: "Apa Pesannya?",
          kicker: "Yang Beliau Ajarkan:",
          body: "Anak bukan musuh kita.\nAnak juga manusia kecil yang lagi belajar.\nMartabat kita nggak hilang karena ngalah pada anak — justru itu kekuatan.",
        },
        {
          heading: "Strategi Mama Mo 💚",
          kicker: "Coba 3 Langkah Ini:",
          body: "1. Jongkok ke level anak\n2. Bisikkan: “Mama disini, nak”\n3. Tunggu sampai dia tenang, baru bicara\n\nSave & coba di tantrum berikutnya. Doain bareng yuk!",
        },
      ],
      caption: "Sunnah parenting yang ubah moment panik jadi moment cinta 💚 Save & coba!",
      cta: "Save buat moment tantrum!",
      hashtags: ["#BabyMo", "#WhatWouldRasulullahDo", "#GentleParenting", "#TarbiyahCinta"],
    },
  ],
  "emotional-story-carousel": [
    {
      title: "Untuk Mama Yang Sedang Lelah Malam Ini 💛",
      hook: "Cerita untuk yang punya momen tersembunyi.",
      slides: [
        {
          heading: "Cerita Ini Untukmu, Ma... 💛",
          kicker: "Sebelum Skip:",
          body: "Untuk mama yang lagi capek banget malam ini. Untuk yang punya momen yang nggak diceritakan ke siapa-siapa. Bacanya pelan-pelan ya...",
        },
        {
          heading: "Pukul 11 Malam Itu...",
          kicker: "Adegan:",
          body: "Bayinya akhirnya tertidur. Mama duduk di lantai laundry, sandar tembok. Setumpuk baju kotor. Kepala penuh. Dan air mata mulai pelan-pelan jatuh.",
        },
        {
          heading: "Ia Cuma Bisa Bisik 1 Kalimat...",
          kicker: "Hanya Itu:",
          body: "“Ya Allah.”\n\nNggak ada doa panjang. Nggak ada permintaan rinci. Cuma NAMA-Nya yang ia ingat malam itu.",
        },
        {
          heading: "Dan Itu... Cukup. 💚",
          kicker: "Firman Allah:",
          body: "“Berdoalah kepada-Ku, niscaya Aku kabulkan untukmu.”\n\nAllah dengar doa yang nggak ada kata-katanya. Allah tau yang tersembunyi di hati. Mama nggak butuh doa fancy.",
          arabic: "ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ",
          attribution: "QS. Al-Mu'min: 60",
        },
        {
          heading: "Mama, Kamu Nggak Sendiri 💛",
          kicker: "Save & Kirim:",
          body: "Save slide ini buat malam-malam berikutnya. Atau tag teman mama yang butuh diingat — kamu nggak sendiri. Allah selalu dengar. Selalu.",
        },
      ],
      caption: "Untuk mama yang di lantai cucian malam ini 🤍 Save & kirim ke teman mama!",
      cta: "Save & kirim ke teman mama!",
      hashtags: ["#BabyMo", "#MamaCerita", "#TaqarrubIlallah", "#UntukMama"],
    },
    {
      title: "Sajadah Yang Selalu Menerima — Cerita Tentang Tawbah",
      hook: "Berapa kali pun jatuh, sajadah Allah selalu terbuka.",
      slides: [
        {
          heading: "Pernah Ngerasa 'Aku Udah Jauh'? 🥺",
          kicker: "Cerita Hari Ini:",
          body: "Untuk Sahabat Mo yang ngerasa shalatnya nggak khusyu', ibadahnya bolong-bolong, hatinya jauh dari Allah... cerita ini buatmu. Pelan-pelan ya →",
        },
        {
          heading: "Ada Anak Muda Yang Tersesat",
          kicker: "Adegan:",
          body: "Sudah 3 tahun nggak shalat. Hatinya kosong. Suatu malam dia liat ibunya nangis shalat. Diam-diam, dia ke kamar, buka lemari, ambil sajadah yang sudah berdebu.",
        },
        {
          heading: "Dia Ngelap Sajadahnya, Lalu Sujud... 🤲",
          kicker: "Yang Dia Bisik:",
          body: "“Ya Allah, aku nggak tau apa Engkau masih mau ke aku. Tapi aku coba kembali.”\n\nAir mata jatuh. Sajadah jadi basah. Hatinya... mulai terisi.",
        },
        {
          heading: "Apa Yang Allah Katakan?",
          kicker: "Firman Allah:",
          body: "“Wahai hamba-hamba-Ku yang melampaui batas terhadap diri sendiri, JANGAN BERPUTUS ASA dari rahmat Allah.”",
          arabic: "لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ",
          attribution: "QS. Az-Zumar: 53",
        },
        {
          heading: "Pintu Itu Selalu Terbuka 💚",
          kicker: "Pesan Untuk Sahabat Mo:",
          body: "Berapa pun lama, berapa pun jauh, sajadah Allah selalu siap. Save slide ini. Atau kirim ke seseorang yang lagi merasa terlalu jauh — tunjukkan, pintunya masih terbuka.",
        },
      ],
      caption: "Pintu Allah selalu terbuka 💚 Tag yang butuh pengingat ini.",
      cta: "Save & kirim ke yang ngerasa jauh!",
      hashtags: ["#BabyMo", "#Tawbah", "#KembaliKeAllah", "#UntukYangLelah"],
    },
  ],
  "dhikr-reminder": [
    {
      title: "SubhanAllah — Dzikir 1 Kata Yang Allah Cinta",
      hook: "Satu kata, pohon di Surga.",
      slides: [
        {
          heading: "SubhanAllah 🌿",
          kicker: "Dzikir Hari Ini:",
          body: "“Subhanallahil 'azhiim wa bihamdihi.” Rasulullah ﷺ bilang: setiap kali kamu ucap ini, ditanamkan 1 POHON untukmu di Surga.",
          arabic: "سُبْحَانَ ٱللَّهِ وَبِحَمْدِهِ",
          attribution: "HR. Tirmidzi 3464",
        },
      ],
      caption: "Tiap SubhanAllah = 1 pohon di Surga 🌿 Save & dzikir hari ini!",
      cta: "Save & dzikir 33x!",
      hashtags: ["#BabyMo", "#Dzikir", "#SubhanAllah"],
    },
    {
      title: "Alhamdulillah — Hadiah Yang Allah Suka",
      hook: "Dzikir paling Allah cintai, paling sering kita lupa.",
      slides: [
        {
          heading: "Alhamdulillah 💚",
          kicker: "Dzikir Hari Ini:",
          body: "Sabda Rasulullah ﷺ: “Alhamdulillah memenuhi timbangan.” Satu kalimat ini di hari kiamat akan jadi BERAT BANGET di timbangan amal kamu.",
          arabic: "ٱلْحَمْدُ لِلَّهِ تَمْلَأُ ٱلْمِيزَانَ",
          attribution: "HR. Muslim 223",
        },
      ],
      caption: "Alhamdulillah = berat banget di timbangan akhirat 💚 Save & ucap hari ini!",
      cta: "Save & ucap Alhamdulillah!",
      hashtags: ["#BabyMo", "#Dzikir", "#Alhamdulillah"],
    },
    {
      title: "Astaghfirullah — Dzikir Penghapus Beban",
      hook: "Kalimat yang ngebuka pintu rezeki & keluar dari masalah.",
      slides: [
        {
          heading: "Astaghfirullah 🌧️",
          kicker: "Dzikir Hari Ini:",
          body: "Janji Allah: barang siapa istighfar (mohon ampun) terus-menerus, Allah akan kasih jalan keluar dari setiap kesusahan & rezeki dari arah tak terduga.",
          arabic: "أَسْتَغْفِرُ ٱللَّهَ",
          attribution: "HR. Abu Daud 1518",
        },
      ],
      caption: "Astaghfirullah = pintu jalan keluar 🌧️ Save & ucap 100x hari ini!",
      cta: "Save & istighfar 100x!",
      hashtags: ["#BabyMo", "#Dzikir", "#Astaghfirullah"],
    },
  ],

  /* ---------- EMOTIONAL CHILDHOOD (additional) ---------- */
  "before-sleep-series": [
    {
      title: "Ritual Tidur Sunnah — 5 Menit, Hidup Berkah",
      hook: "5 langkah Rasulullah sebelum bobo, tinggal ikutin.",
      slides: [
        {
          heading: "Tidur Nggak Cuma Tidur 🌙",
          kicker: "Tahukah Kamu?",
          body: "Sahabat Mo, setiap malam ada 5-10 jam tidur. Kalau diawali dengan sunnah, semua jam itu jadi PAHALA. Caranya? Swipe yuk, urut step-by-step →",
        },
        {
          heading: "Step 1: Wudhu Dulu 💧",
          kicker: "Sunnah Pertama:",
          body: "Wudhu sebelum tidur = malaikat menemani sepanjang malam. Cuma 2 menit, tapi hasilnya luar biasa.",
          attribution: "HR. Ibnu Hibban 1051",
        },
        {
          heading: "Step 2: Baca 3 Surah Pelindung 📖",
          kicker: "Sunnah Kedua:",
          body: "Baca Al-Ikhlas, Al-Falaq, An-Nas (1x). Tiup ke kedua telapak tangan. Usap ke seluruh badan. Itu perisai malam.",
          attribution: "HR. Bukhari 5017",
        },
        {
          heading: "Step 3: Tidur Miring Kanan 🛏️",
          kicker: "Sunnah Ketiga:",
          body: "Posisi tidur Rasulullah ﷺ: miring ke KANAN, tangan kanan di bawah pipi. Bonus: sains setuju — bagus buat jantung & pencernaan.",
        },
        {
          heading: "5 Menit Ritual, Hidup Berkah 🌙",
          kicker: "Misi Malam Ini:",
          body: "Save slide ini. Coba urutan ini SEKARANG sebelum bobo. Besok pagi komen di postingan — Sahabat Mo ngerasa bedanya nggak? 💚",
        },
      ],
      caption: "Yuk, mulai kebiasaan baik dari sekarang 🌙 Save & coba malam ini!",
      cta: "Save & coba malam ini!",
      hashtags: ["#BabyMo", "#SunnahTidur", "#AnakMuslim", "#5SunnahTidur"],
    },
    {
      title: "Doa Tidur Versi Anak — Singkat, Mudah, Berkah",
      hook: "Ajarin anak doa tidur dalam 3 langkah.",
      slides: [
        {
          heading: "Anak Suka Lupa Doa Tidur? 🥺",
          kicker: "Ma, Pa — Coba Trick Ini:",
          body: "Sahabat Mo, banyak anak susah hafal doa tidur karena terasa panjang. Tapi sebenarnya bisa dimulai dari yang SUPER PENDEK. Swipe untuk versi simpelnya →",
        },
        {
          heading: "Versi Anak: Cuma 6 Kata!",
          kicker: "Mulai Dari Sini:",
          body: "“Bismika Allahumma ahyaa wa amuut.”\n\nArtinya: “Dengan nama-Mu ya Allah, aku hidup dan aku mati.” Singkat, lengkap.",
          arabic: "بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوْتُ",
          attribution: "HR. Bukhari 6312",
        },
        {
          heading: "Cara Ngajarinnya...",
          kicker: "3-Step:",
          body: "Hari 1-3: Baca BARENG anak, kalimat per kalimat.\nHari 4-7: Anak baca, mama dengerin.\nHari 8+: Anak baca sendiri sebelum bobo.\n\nKonsisten 1 minggu = melekat.",
        },
        {
          heading: "Lalu Pelukan Doa 🤗",
          kicker: "Bonus Magic:",
          body: "Setelah anak baca, peluk dia & bisikkan: “Allah jaga kamu malam ini.”\n\nDoa + pelukan = anak tidur tenang, mama tidur lega.",
        },
        {
          heading: "Mulai Malam Ini, Yuk Ma! 🌙",
          kicker: "Misi 1 Minggu:",
          body: "Save slide ini. Mulai malam ini, ajak anak baca 6 kata doa. Komen progres Sahabat Mo di postingan — bareng yuk minggu ini! 💚",
        },
      ],
      caption: "Ajarin doa tidur tanpa drama 🌙 Save & mulai malam ini, Ma!",
      cta: "Save & mulai malam ini!",
      hashtags: ["#BabyMo", "#DoaTidur", "#TarbiyahCinta", "#AjarinAnak"],
    },
  ],
  "tiny-tafakkur": [
    {
      title: "MasyaAllah, Lihat Daun Itu 🍃",
      hook: "Tafakkur kecil setiap hari.",
      slides: [
        {
          heading: "MasyaAllah, Lihat Daun Itu 🍃",
          kicker: "Tafakkur Hari Ini:",
          body: "Coba sentuh daun di sekitarmu, Sahabat Mo. Lihat urat-uratnya. Setiap urat itu pipa air mini yang Allah desain — SubhanAllah.",
          arabic: "إِنَّ فِى خَلْقِ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ لَءَايَـٰتٍۢ",
          attribution: "QS. Al-Imran: 190",
        },
      ],
      caption: "Belajar lihat dunia dengan mata syukur 🌿",
      cta: "Save & ajak anak tafakkur!",
      hashtags: ["#BabyMo", "#Tafakkur", "#KebesaranAllah"],
    },
    {
      title: "Setiap Nafas Yang Kamu Tarik... 🌬️",
      hook: "Tafakkur tentang nikmat yang sering kita lupain.",
      slides: [
        {
          heading: "Tarik Nafas. Hembuskan. 🌬️",
          kicker: "Tafakkur Hari Ini:",
          body: "Hari ini kamu udah tarik nafas ribuan kali tanpa mikir. Setiap satu napas = nikmat dari Allah yang nggak kamu bisa hitung. Alhamdulillah.",
          arabic: "وَإِن تَعُدُّوا۟ نِعْمَةَ ٱللَّهِ لَا تُحْصُوهَآ",
          attribution: "QS. Ibrahim: 34",
        },
      ],
      caption: "Setiap nafas = nikmat 🌬️ Save & syukur hari ini!",
      cta: "Save & ucap Alhamdulillah!",
      hashtags: ["#BabyMo", "#Tafakkur", "#Syukur"],
    },
    {
      title: "Pas Liat Hujan, Coba Ucap Ini... ☔",
      hook: "Tafakkur 30 detik yang ubah mood.",
      slides: [
        {
          heading: "Pas Liat Hujan ☔",
          kicker: "Tafakkur Hari Ini:",
          body: "Tiap tetes hujan adalah malaikat yang bertugas. Allah hidupkan bumi yang mati lewatnya. Coba ucap pelan: “SubhanAllah, betapa lembut Engkau, ya Allah.”",
          arabic: "وَيُنَزِّلُ مِنَ ٱلسَّمَآءِ مَآءًۭ فَيُحْىِۦ بِهِ ٱلْأَرْضَ",
          attribution: "QS. Ar-Rum: 24",
        },
      ],
      caption: "Hujan = rahmat. Bukan keluhan ☔ Save buat hujan berikutnya!",
      cta: "Save buat saat hujan!",
      hashtags: ["#BabyMo", "#Tafakkur", "#TafakkurHujan"],
    },
  ],
  /* ---------- PARENTING ---------- */
  "gentle-muslim-parenting": [
    {
      title: "Anak Dibentak = Diam Karena Takut, Bukan Paham",
      hook: "Tarbiyah dengan cinta, bukan dengan amarah.",
      slides: [
        {
          heading: "Marah-Marah Bukan Tarbiyah 💔",
          kicker: "Pesan Untuk Mama & Ayah:",
          body: "Sahabat Mo... anak yang dibentak akan diam — bukan karena PAHAM, tapi karena TAKUT. Dan takut bukan tujuan kita didik mereka. Swipe yuk →",
        },
        {
          heading: "Apa Kata Rasulullah ﷺ?",
          kicker: "Teladan Beliau:",
          body: "“Anas bin Malik melayani Rasulullah ﷺ selama 10 tahun. Beliau tidak pernah sekali pun membentakku.”",
          arabic: "خَدَمْتُ النَّبِيَّ ﷺ عَشْرَ سِنِينَ، فَمَا قَالَ لِي أُفٍّ قَطُّ",
          attribution: "HR. Muslim 2310",
        },
        {
          heading: "3 Jurus Sabar Mama Mo 🌿",
          kicker: "Coba Praktekkan:",
          body: "1. TARIK NAFAS 3x sebelum bicara\n2. TUNDUK ke level mata anak\n3. Bicara PELAN tapi tegas\n\nCoba 1 dari 3, mulai hari ini.",
        },
        {
          heading: "Eh, Tapi Kalau Terlanjur Marah?",
          kicker: "Tenang Ma:",
          body: "Tarbiyah itu PROSES panjang. Kalau terlanjur teriak, minta maaf ke anak — itu teladan PALING indah dari Rasulullah. Anak belajar maaf dari kita.",
          attribution: "HR. Bukhari 6203",
        },
        {
          heading: "Mama & Ayah, Kamu Bisa 💚",
          kicker: "Reminder Cinta:",
          body: "Save slide ini buat hari-hari berat. Setiap nafas sabarmu, setiap suaramu yang pelan — Allah catat semua. Bagikan ke pasangan / sesama mama!",
        },
      ],
      caption: "Tarbiyah dengan cinta, bukan dengan amarah 💚 Save & bagikan ke mama lain!",
      cta: "Save & jadi orangtua sabar!",
      hashtags: ["#BabyMo", "#ParentingIslami", "#GentleParenting", "#TarbiyahCinta"],
    },
    {
      title: "Mendengar Anak — Skill Parenting Paling Underrated",
      hook: "Anak yang didengar = anak yang berani jujur.",
      slides: [
        {
          heading: "Anak Sahabat Mo Suka Cerita Nggak? 🤔",
          kicker: "Pertanyaan Buat Ma & Pa:",
          body: "Kalau jawabannya “jarang” atau “kayaknya nggak”, slide ini buatmu. Karena ada 1 skill parenting yang bikin anak BUKA hati sendiri. Swipe →",
        },
        {
          heading: "Bukan Bicara — MENDENGAR.",
          kicker: "Fakta:",
          body: "Anak yang merasa DIDENGAR di rumah, akan tumbuh berani jujur di luar. Yang merasa nggak didengar, akan cari pendengar di tempat lain. Yang mana yang kita mau?",
        },
        {
          heading: "Sunnah Rasulullah ﷺ",
          kicker: "Cara Beliau Mendengar:",
          body: "Rasulullah selalu MEMUTAR badan SELURUHNYA ke orang yang bicara — tidak setengah-setengah. Ini dia hadiahkan ke anak-anak juga.",
          attribution: "HR. Tirmidzi 2811",
        },
        {
          heading: "3 Cara Mendengar Anak 💚",
          kicker: "Praktekkan:",
          body: "1. Letakkan HP, putar badan ke anak\n2. Tatap mata, jangan koreksi dulu\n3. Akhiri dengan “Makasih udah cerita ke mama”\n\nAjaib — anak buka diri sendiri.",
        },
        {
          heading: "Misi 1 Minggu Buat Mama 🌿",
          kicker: "Tantangan:",
          body: "Save slide ini. Mulai hari ini, latih 3 langkah tadi. Komen di postingan — minggu ini Sahabat Mo cerita apa ke mama? Bareng yuk jadi pendengar terbaik anak.",
        },
      ],
      caption: "Anak yang didengar = anak yang aman 💚 Save & coba seminggu ini!",
      cta: "Save & latih 1 minggu!",
      hashtags: ["#BabyMo", "#GentleParenting", "#TarbiyahCinta", "#MendengarAnak"],
    },
  ],
  "mama-reflection": [
    {
      title: "Mama, Allah Lihat Kamu 💛",
      hook: "Setiap kelelahanmu dilihat Allah.",
      slides: [
        {
          heading: "Mama, Allah Lihat Kamu 💛",
          kicker: "Pesan Sayang:",
          body: "Setiap pelukan, usapan kepala, doa diam-diam pukul 3 pagi — semua dicatat. Sahabat Mo bilang ke mama: kamu HEBAT.",
          arabic: "إِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ",
          attribution: "QS. Yusuf: 90",
        },
      ],
      caption: "Untuk para mama yang tak pernah berhenti mencintai 💛 Tag mama!",
      cta: "Tag mama hebatmu!",
      hashtags: ["#BabyMo", "#MamaHebat", "#ParentingIslami"],
    },
    {
      title: "Capek? Mama, Ini Bukan Tanda Lemah 🌿",
      hook: "Tarbiyah itu marathon, bukan sprint.",
      slides: [
        {
          heading: "Capek Itu Wajar, Ma 🌿",
          kicker: "Pesan Hari Ini:",
          body: "Mama nangis tadi malam? Sahabat Mo ngerti. Tarbiyah itu marathon, bukan sprint. Rasulullah ﷺ pun pernah lelah — Allah ingatkan hamba-Nya untuk istirahat.",
          arabic: "وَجَعَلْنَا نَوْمَكُمْ سُبَاتًۭا",
          attribution: "QS. An-Naba: 9",
        },
      ],
      caption: "Capek bukan tanda kamu gagal 🌿 Tag mama yang lagi lelah.",
      cta: "Tag mama yang butuh ini!",
      hashtags: ["#BabyMo", "#MamaReflection", "#TarbiyahCinta"],
    },
    {
      title: "Doa Mama = Doa Paling Mustajab 🤲",
      hook: "Pengingat bahwa setiap doamu untuk anak — terkabul.",
      slides: [
        {
          heading: "Doamu Untuk Anak = Mustajab 🤲",
          kicker: "Janji Allah:",
          body: "Sabda Rasulullah ﷺ: “Doa orangtua untuk anaknya adalah doa yang TIDAK terhalang.” Setiap kali Mama berdoa tadi malam — itu sudah sampai.",
          arabic: "دَعْوَةُ الْوَالِدِ لِوَلَدِهِ لَا تُحْجَبُ",
          attribution: "HR. Tirmidzi 1905",
        },
      ],
      caption: "Doa mama paling mustajab 🤲 Save buat reminder!",
      cta: "Save & doakan anakmu hari ini!",
      hashtags: ["#BabyMo", "#MamaReflection", "#DoaIbu"],
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
          arabic: "مَنْ بَاتَ طَاهِرًا بَاتَ فِي شِعَارِهِ مَلَكٌ",
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
          arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ",
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
      title: "Bulan Nggak Punya Cahaya Sendiri — Subhanallah!",
      hook: "Sains modern yang ngonfirmasi tafakkur 1.400 tahun lalu.",
      slides: [
        {
          heading: "Coba Tengok Langit Malam Ini 🌙",
          kicker: "Tafakkur Hari Ini:",
          body: "Sahabat Mo, ada satu hal di langit yang setiap malam kita lihat — tapi belum tentu kita ngerti rahasianya. Penasaran? Swipe pelan-pelan →",
        },
        {
          heading: "Fakta Mind-Blown 🤯",
          kicker: "Tahukah Kamu?",
          body: "Bulan SEBENARNYA nggak punya cahaya sendiri. Sama sekali nggak. Cahaya yang kita lihat adalah PANTULAN dari matahari. Itu yang sains modern temukan.",
        },
        {
          heading: "Tapi Quran Udah Bilang... 📖",
          kicker: "1.400 Tahun Lalu:",
          body: "“Yang menjadikan matahari bersinar (sebagai dhiya — sumber cahaya) dan bulan bercahaya (nur — cahaya pantulan).”",
          arabic: "هُوَ ٱلَّذِى جَعَلَ ٱلشَّمْسَ ضِيَآءً وَٱلْقَمَرَ نُورًۭا",
          attribution: "QS. Yunus: 5",
        },
        {
          heading: "Pelajaran Buat Kita 💚",
          kicker: "MasyaAllah:",
          body: "Sama kayak bulan, kita juga nggak punya cahaya sendiri. Yang kita pantulkan ke sekitar = cinta & rahmat ALLAH. Tugas kita: jadi bulan yang terang.",
        },
        {
          heading: "Misi Tafakkur Malam Ini 🌙",
          kicker: "Untuk Sahabat Mo:",
          body: "Ajak mama / ayah keluar rumah malam ini. Lihat bulan bareng. Bilang “SubhanAllah” pelan-pelan. Foto & tag #BabyMo — yuk tafakkur seluruh keluarga!",
        },
      ],
      caption: "Tafakkur malam ini: SubhanAllah! 🌙 Save & ajak keluarga lihat bulan!",
      cta: "Save & lihat bulan malam ini!",
      hashtags: ["#BabyMo", "#KebesaranAllah", "#AnakMuslim", "#TafakkurMalam"],
    },
    {
      title: "Setiap Tetes Hujan Punya Malaikat — Subhanallah",
      hook: "Tafakkur yang ubah cara kita lihat hujan.",
      slides: [
        {
          heading: "Pernah Liat Hujan Turun? ☔",
          kicker: "Tafakkur Hari Ini:",
          body: "Sahabat Mo, kebanyakan kita lihat hujan dengan biasa aja. Atau malah ngeluh “Yaaah hujan!”. Tapi ada rahasia di balik tiap tetes air itu. Swipe →",
        },
        {
          heading: "Apa Kata Rasulullah ﷺ?",
          kicker: "Subhanallah:",
          body: "“Tidak satu tetes hujan pun yang turun ke bumi, kecuali ada MALAIKAT yang mengantarkannya sampai ke tempat yang Allah tentukan.”",
          attribution: "HR. Ahmad 9499",
        },
        {
          heading: "Bayangkan, Sahabat Mo... 🤯",
          kicker: "Pikirkan Sebentar:",
          body: "Hujan deras yang Sahabat Mo lihat hari ini = jutaan malaikat sedang BERTUGAS. Tiap tetes sudah Allah TENTUKAN jatuhnya di mana. Wow!",
        },
        {
          heading: "Doa Saat Hujan ☔",
          kicker: "Sunnah Beliau:",
          body: "Pas hujan turun, Rasulullah ﷺ angkat tangan & berdoa:\n\n“Allahumma shoyyiban naafi'an.” (Ya Allah, jadikan hujan ini yang bermanfaat).",
          arabic: "اللَّهُمَّ صَيِّبًا نَافِعًا",
          attribution: "HR. Bukhari 1032",
        },
        {
          heading: "Misi Hujan Berikutnya! ☔",
          kicker: "Coba Sahabat Mo:",
          body: "Pas hujan turun berikutnya, jangan ngeluh. Pelan-pelan lihat ke luar jendela & ucap “SubhanAllah”. Baca doa di atas. Save slide ini biar nggak lupa! 💚",
        },
      ],
      caption: "Setiap tetes hujan = malaikat bertugas ☔ Save buat hujan berikutnya!",
      cta: "Save buat hujan berikutnya!",
      hashtags: ["#BabyMo", "#KebesaranAllah", "#TafakkurHujan", "#AnakMuslim"],
    },
  ],
  "arabic-word-of-the-day": [
    {
      title: "Kata Hari Ini: Rahmah",
      hook: "Cinta Allah yang sedalam pelukan ibu.",
      slides: [
        {
          heading: "Kata Hari Ini: Rahmah ✨",
          kicker: "Belajar Arab:",
          body: "Rahmah artinya KASIH SAYANG. Akar katanya sama dengan “rahim” (perut ibu). Cinta Allah itu sedalam pelukan seorang ibu ke anaknya.",
          arabic: "رَحْمَة",
        },
      ],
      caption: "Rahmah = cinta sedalam pelukan ibu ✨ Save & ajarin adik!",
      cta: "Comment kata Arab favoritmu!",
      hashtags: ["#BabyMo", "#BelajarArab", "#Rahmah"],
    },
    {
      title: "Kata Hari Ini: Syukur",
      hook: "Kata kecil yang mengundang nikmat lebih banyak.",
      slides: [
        {
          heading: "Kata Hari Ini: Syukur ✨",
          kicker: "Belajar Arab:",
          body: "Syukur artinya BERTERIMA KASIH. Allah janji: kalau kamu syukur, Dia tambah nikmatmu. Coba ucap “Alhamdulillah” 10x hari ini, rasakan bedanya.",
          arabic: "شُكْر",
          attribution: "QS. Ibrahim: 7",
        },
      ],
      caption: "Syukur = pintu nikmat tambahan ✨ Save & latih hari ini!",
      cta: "Save & ucap Alhamdulillah 10x!",
      hashtags: ["#BabyMo", "#BelajarArab", "#Syukur"],
    },
    {
      title: "Kata Hari Ini: Sabar",
      hook: "Kata yang Allah ulang 90+ kali dalam Al-Qur'an.",
      slides: [
        {
          heading: "Kata Hari Ini: Sabar ✨",
          kicker: "Belajar Arab:",
          body: "Sabar artinya MENAHAN (diri). Bukan diam pasif — tapi aktif menahan amarah, putus asa, dan tergesa-gesa. Allah cinta orang yang sabar.",
          arabic: "صَبْر",
          attribution: "QS. Al-Baqarah: 153",
        },
      ],
      caption: "Sabar bukan diam pasif — itu kekuatan ✨ Save & ajarin anak!",
      cta: "Save & ajarin anak!",
      hashtags: ["#BabyMo", "#BelajarArab", "#Sabar"],
    },
    {
      title: "Kata Hari Ini: Tawakkal",
      hook: "Skill paling sulit, paling Allah cintai.",
      slides: [
        {
          heading: "Kata Hari Ini: Tawakkal ✨",
          kicker: "Belajar Arab:",
          body: "Tawakkal artinya BERSERAH (kepada Allah). Setelah berusaha keras, kita serahkan hasilnya. “Manusia berencana, Allah yang tentukan.” Itu tawakkal.",
          arabic: "تَوَكُّل",
          attribution: "QS. At-Talaq: 3",
        },
      ],
      caption: "Tawakkal = istirahatnya hati ✨ Save buat hari-hari berat!",
      cta: "Save buat hari berat!",
      hashtags: ["#BabyMo", "#BelajarArab", "#Tawakkal"],
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
    {
      title: "POV: Subuh Pertama Belajar Sholat",
      hook: "Tangan Ayah memandu pelan-pelan.",
      slides: [
        {
          heading: "POV: Sholat Pertama",
          kicker: "POV:",
          body: "Sajadah kecil di sebelah Ayah. Tangan Ayah pegang tanganku. \"Niat dulu, sayang.\" Subuh pertama yang ngga akan kulupa.",
        },
      ],
      caption: "Momen yang bikin sholat terasa rumah 💚",
      cta: "Tag Ayah yang mengajari sholat!",
      hashtags: ["#BabyMo", "#POVSholat", "#AnakMuslim"],
    },
    {
      title: "POV: Naik ke Masjid Bareng Kakek",
      hook: "Tangan tua yang ngga pernah lepas.",
      slides: [
        {
          heading: "POV: ke Masjid Bareng Kakek",
          kicker: "POV:",
          body: "Kakek pegang tanganku. Jalan pelan-pelan. \"Adzan, cucuk. Yuk.\" Suara sandal kakek + suara langkahku. Memori paling syahdu.",
        },
      ],
      caption: "Tangan kakek yang mengajari kita arah qiblat 🕋",
      cta: "Tag kakek/nenek yang relate!",
      hashtags: ["#BabyMo", "#POVKakek", "#Masjid"],
    },
    {
      title: "POV: Hafalan Surah Pertama",
      hook: "Detik-detik 'Aku bisa!' yang ngga terlupa.",
      slides: [
        {
          heading: "POV: Hafalan Pertama",
          kicker: "POV:",
          body: "Al-Fatihah, dibaca pelan-pelan. Mama nungguin. \"Alhamdulillaaaahi...\" Pelan, ragu. Tapi sampai akhir tanpa salah. Senyum Mama lebar.",
        },
      ],
      caption: "Hafalan pertama = hadiah terbaik untuk Mama 💛",
      cta: "Tag siapa yang mengajari kamu Al-Fatihah!",
      hashtags: ["#BabyMo", "#POVHafalan", "#AlFatihah"],
    },
    {
      title: "POV: Lebaran Tahun Pertama Tanpa Kakek",
      hook: "Pelukan yang ngga lagi ada.",
      slides: [
        {
          heading: "POV: Lebaran Pertama Tanpa Kakek",
          kicker: "POV:",
          body: "Semua sepupu kumpul di rumah nenek. Kursi kakek kosong. Senyum semua orang ada tapi mata ada yang nahan. Nenek bilang: \"Kakek nungguin kita di Jannah.\"",
        },
      ],
      caption: "Kehilangan yang bikin makin rindu Jannah 🤍",
      cta: "Tag siapa yang kamu kangenin tahun ini.",
      hashtags: ["#BabyMo", "#POVLebaran", "#JannahReunion"],
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
    {
      title: "Afirmasi Pagi yang Berat",
      hook: "Bisikan halus sebelum mulai hari.",
      slides: [
        {
          heading: "Hari Ini, Aku Cukup.",
          kicker: "Afirmasi Pagi:",
          body: "Aku ngga harus sempurna.\nAllah ngga butuh sempurnaku.\nDia hanya butuh hatiku yang menghadap.",
        },
      ],
      caption: "Untuk pagi yang berat — kamu sudah cukup 🌅",
      cta: "Save buat pagi besok.",
      hashtags: ["#BabyMo", "#AfirmasiPagi", "#KamuCukup"],
    },
    {
      title: "Afirmasi Saat Lelah",
      hook: "Pas hati capek banget.",
      slides: [
        {
          heading: "Lelahmu Dilihat Allah.",
          kicker: "Pesan Hati:",
          body: "Setiap nafas berat, Allah catat.\nSetiap usaha kecil, Allah hitung.\nLelahmu ngga sia-sia. Allah selalu lihat.",
        },
      ],
      caption: "Untuk hari-hari saat semuanya berat 💚",
      cta: "Bagikan ke yang lagi capek.",
      hashtags: ["#BabyMo", "#KamuTidakSendiri", "#Afirmasi"],
    },
    {
      title: "Afirmasi Saat Doamu Lama Dijawab",
      hook: "Bukan ditolak — masih ditunggu.",
      slides: [
        {
          heading: "Doamu Sedang Dirakit.",
          kicker: "Pesan Tenang:",
          body: "Doa yang belum dijawab,\nbukan berarti tidak didengar.\nAllah lagi rakit jawaban yang terbaik untukmu.\nBersabar sebentar lagi.",
        },
      ],
      caption: "Untuk hati yang lelah menunggu jawaban 🌸",
      cta: "Save & tetap berdoa.",
      hashtags: ["#BabyMo", "#DoaBelumDijawab", "#Sabar"],
    },
    {
      title: "Afirmasi: Masih Punya Hari Ini",
      hook: "Hari ini kesempatan baru.",
      slides: [
        {
          heading: "Mulai Lagi, Bisa.",
          kicker: "Reminder:",
          body: "Kemarin gagal, hari ini masih bisa.\nMinggu lalu jauh dari Allah, sekarang masih bisa pulang.\nPintu taubat ngga pernah ditutup. Mulai lagi.",
        },
      ],
      caption: "Setiap detik adalah kesempatan kedua 💛",
      cta: "Bagikan ke yang butuh dorongan.",
      hashtags: ["#BabyMo", "#MulaiLagi", "#Taubat"],
    },
  ],
  "five-second-habit": [
    {
      title: "Sunnah 5 Detik: Bismillah",
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
    {
      title: "Sunnah 5 Detik: Senyum",
      hook: "Sedekah paling gampang.",
      slides: [
        {
          heading: "Senyum = Sedekah!",
          kicker: "Sunnah Termudah:",
          body: "Senyumin orang yang lewat. Itu sedekah. Rasulullah ﷺ bilang: \"Senyummu pada saudaramu adalah sedekah.\"",
        },
      ],
      caption: "Sedekah paling murah & paling besar pahalanya 😊",
      cta: "Save & senyum ke orang berikutnya!",
      hashtags: ["#BabyMo", "#SenyumSedekah", "#Sunnah5Detik"],
    },
    {
      title: "Sunnah 5 Detik: Salam",
      hook: "Doa singkat untuk orang lain.",
      slides: [
        {
          heading: "Ucapkan Salam!",
          kicker: "Sebelum Ngobrol:",
          body: "Assalamu'alaikum. Artinya: \"Semoga keselamatan untukmu.\" 3 detik, doa lengkap, pahala besar.",
        },
      ],
      caption: "Salam = doa, bukan sekadar greeting 🤲",
      cta: "Save & ucap salam ke orang berikutnya!",
      hashtags: ["#BabyMo", "#Salam", "#Sunnah5Detik"],
    },
    {
      title: "Sunnah 5 Detik: Alhamdulillah",
      hook: "Reaksi otomatis yang bikin hidup lebih ringan.",
      slides: [
        {
          heading: "Bilang Alhamdulillah!",
          kicker: "Setiap Hal Kecil:",
          body: "Selesai makan? Alhamdulillah. Sampai rumah? Alhamdulillah. Bangun tidur? Alhamdulillah. Sederhana, tapi bikin hati berbeda.",
        },
      ],
      caption: "Hati yang sering bersyukur = hati yang ringan 💚",
      cta: "Save & latihan tiap hari!",
      hashtags: ["#BabyMo", "#Alhamdulillah", "#Syukur"],
    },
    {
      title: "Sunnah 5 Detik: Doa Naik Kendaraan",
      hook: "Sebelum jalan, dilindungi Allah.",
      slides: [
        {
          heading: "Doa Naik Kendaraan",
          kicker: "Yuk, Hafalkan!",
          body: "Subhaanalladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin.\n\n\"Maha Suci Allah yang telah menundukkan ini untuk kami, sedangkan kami sendiri tidak mampu menguasainya.\"",
          arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
          attribution: "HR. Muslim 1342",
        },
      ],
      caption: "5 detik doa = lindung sepanjang perjalanan 🚗",
      cta: "Save buat tiap kali naik mobil!",
      hashtags: ["#BabyMo", "#DoaKendaraan", "#Sunnah5Detik"],
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
    {
      title: "Sore Cozy Sebelum Maghrib",
      hook: "Cahaya emas, dzikir pelan, hati tenang.",
      slides: [
        {
          heading: "Sore yang Tenang",
          kicker: "POV Sore:",
          body: "Cahaya jendela jadi keemasan. Dzikir pelan-pelan: subhanallah, alhamdulillah, allahuakbar. Maghrib hampir tiba.",
        },
      ],
      caption: "Sore terbaik buat cooling down 🌅",
      cta: "Save buat sore besok!",
      hashtags: ["#BabyMo", "#SoreCozy", "#DzikirSore"],
    },
    {
      title: "Malam Cozy Sebelum Tidur",
      hook: "Lampu redup, ayat kursi, peluk.",
      slides: [
        {
          heading: "Malam yang Tenang",
          kicker: "POV Malam:",
          body: "Lampu dimatikan. Ayat Kursi dibaca pelan. Tangan Mama di kepala. Mata berat. Hati tenang.",
        },
      ],
      caption: "Malam terbaik buat semua Sahabat Mo 🌙",
      cta: "Save buat malam ini!",
      hashtags: ["#BabyMo", "#MalamCozy", "#TidurTenang"],
    },
    {
      title: "Hujan Cozy di Rumah",
      hook: "Hujan turun, secangkir teh, doa hujan.",
      slides: [
        {
          heading: "Hujan yang Berkah",
          kicker: "POV Hujan:",
          body: "Suara hujan deras. Secangkir teh hangat di tangan. Berdoa pelan: 'Allahumma shayyiban nafi'an.' Hujan jadi terasa pelukan.",
        },
      ],
      caption: "Hujan = waktu terbaik buat berdoa 🌧️",
      cta: "Save buat hari hujan!",
      hashtags: ["#BabyMo", "#HujanBerkah", "#DoaHujan"],
    },
    {
      title: "Jumat Cozy Pagi",
      hook: "Hari yang istimewa, Al-Kahfi pelan.",
      slides: [
        {
          heading: "Jumat Berkah!",
          kicker: "POV Jumat:",
          body: "Bangun pelan, mandi besar, baju paling rapi. Al-Kahfi pelan dari hp. Hari paling tenang seminggu.",
        },
      ],
      caption: "Jumat = reset spiritual mingguan ✨",
      cta: "Save buat Jumat ini!",
      hashtags: ["#BabyMo", "#JumatBerkah", "#AlKahfi"],
    },
  ],

  /* ============================================================
   *                    RAMADAN & EID CATEGORY
   * ============================================================
   * Authentic hadith/Quran references only. Doa berbuka, sahur,
   * lailatul qadr, takbir Eid — all well-known sound (sahih) sources.
   */

  "ramadan-sahur": [
    {
      title: "Sahur Bareng Mama",
      hook: "Jam 3 pagi, dapur hangat, niat puasa.",
      slides: [
        {
          heading: "Yuk, Sahur!",
          kicker: "Berkahnya Sahur",
          body: "Nawaitu shauma ghadin 'an adaa-i fardhi syahri Ramadhana hadzihis-sanati lillahi ta'ala.\n\n\"Aku niat puasa besok untuk menunaikan kewajiban Ramadhan tahun ini karena Allah.\"",
          arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هَذِهِ السَّنَةِ لِلَّهِ تَعَالَى",
          attribution: "Niat puasa Ramadhan",
        },
      ],
      caption: "Bismillah, semoga lancar puasanya hari ini 🌙✨",
      cta: "Tag teman buat sahur bareng!",
      hashtags: ["#BabyMo", "#Sahur", "#Ramadan", "#NiatPuasa"],
    },
    {
      title: "Sahur Jangan Lupa!",
      hook: "Sahur itu berkah — kata Rasulullah ﷺ.",
      slides: [
        {
          heading: "Sahur = Berkah",
          kicker: "Tahukah Kamu?",
          body: "Tasahharuu, fa inna fis-sahuuri barakah.\n\n\"Bersahurlah kalian, karena sesungguhnya pada sahur itu ada keberkahan.\"",
          arabic: "تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً",
          attribution: "HR. Bukhari 1923 & Muslim 1095",
        },
      ],
      caption: "Sekecil apapun sahurnya, ada berkah di dalamnya 🍽️",
      cta: "Save & ingatin keluarga!",
      hashtags: ["#BabyMo", "#Sahur", "#BerkahSahur"],
    },
    {
      title: "Sahur Ringan Tapi Penuh",
      hook: "Korma + air putih = sunnah lengkap.",
      slides: [
        {
          heading: "Sahur Sederhana",
          kicker: "Sunnah Sahur:",
          body: "Rasulullah ﷺ menganjurkan sahur walau hanya seteguk air. 3 butir kurma + segelas air sudah cukup buat memulai hari yang penuh.",
          attribution: "HR. Ahmad 11086",
        },
      ],
      caption: "Sahur ngga harus mewah — yang penting niatnya 💛",
      cta: "Save resep sahur kamu!",
      hashtags: ["#BabyMo", "#SahurSederhana", "#Ramadan"],
    },
    {
      title: "Bangun Sahur, Susah Banget",
      hook: "Tapi pahalanya beda kalo bangun untuk Allah.",
      slides: [
        {
          heading: "Susah Bangun?",
          kicker: "Tapi…",
          body: "Setiap kali kamu mengalahkan kantuk demi sahur, malaikat catat sebagai 'usaha karena Allah.' Itu jauh lebih besar dari sekadar makan.",
        },
      ],
      caption: "Pejuang sahur, kamu hebat 💪🌙",
      cta: "Tag pejuang sahur di rumahmu!",
      hashtags: ["#BabyMo", "#PejuangSahur", "#Ramadan"],
    },
  ],

  "ramadan-iftar": [
    {
      title: "Doa Berbuka Puasa",
      hook: "Saat paling ditunggu seharian.",
      slides: [
        {
          heading: "Doa Berbuka",
          kicker: "Yuk, Hafalkan!",
          body: "Allahumma laka shumtu wa 'ala rizqika afthartu.\n\n\"Ya Allah, untuk-Mu aku berpuasa, dan dengan rezeki dari-Mu aku berbuka.\"",
          arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
          attribution: "HR. Abu Dawud 2358",
        },
      ],
      caption: "Doa kecil sebelum nyebrang ke Maghrib 🌅",
      cta: "Save & baca tiap berbuka!",
      hashtags: ["#BabyMo", "#DoaBerbuka", "#Ramadan", "#Iftar"],
    },
    {
      title: "Buka dengan Kurma & Air",
      hook: "Cara Rasulullah ﷺ berbuka.",
      slides: [
        {
          heading: "Sunnah Berbuka",
          kicker: "Tahukah Kamu?",
          body: "Rasulullah ﷺ berbuka dengan ruthab (kurma basah) sebelum sholat. Kalau tidak ada, dengan tamr (kurma kering). Kalau tidak ada, dengan beberapa teguk air.",
          attribution: "HR. Abu Dawud 2356",
        },
      ],
      caption: "Sunnah kecil yang bikin iftar makin berkah 🌴",
      cta: "Save & ikuti sunnah hari ini!",
      hashtags: ["#BabyMo", "#SunnahBerbuka", "#Kurma"],
    },
    {
      title: "Berbuka = Saat Doa Dikabulkan",
      hook: "Jangan lewatkan momen ini.",
      slides: [
        {
          heading: "Doa Cepat Ijabah",
          kicker: "Wow, Tahukah Kamu?",
          body: "Tiga doa yang tidak ditolak: doa orang yang puasa sampai dia berbuka, doa pemimpin yang adil, dan doa orang yang dizalimi.",
          attribution: "HR. Tirmidzi 3598",
        },
      ],
      caption: "Sebelum suap pertama, ucapkan doamu 💚",
      cta: "Tag siapa yang mau didoakan!",
      hashtags: ["#BabyMo", "#DoaBerbuka", "#WaktuMustajab"],
    },
    {
      title: "Bahagianya Orang Puasa",
      hook: "Dua kebahagiaan: saat berbuka dan saat bertemu Allah.",
      slides: [
        {
          heading: "Dua Bahagia",
          kicker: "Pesan Rasulullah ﷺ:",
          body: "Lish-shaa-imi farhataani: farhatun 'inda fithrihi, wa farhatun 'inda liqaa-i rabbihi.\n\n\"Orang yang puasa punya dua kebahagiaan: saat berbuka dan saat bertemu Tuhannya.\"",
          arabic: "لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ عِنْدَ فِطْرِهِ، وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ",
          attribution: "HR. Bukhari 1904",
        },
      ],
      caption: "Bahagiamu hari ini = bahagiamu di akhirat nanti ✨",
      cta: "Save buat reminder iftar!",
      hashtags: ["#BabyMo", "#BahagiaIftar", "#Ramadan"],
    },
    {
      title: "Iftar Bareng Keluarga",
      hook: "Tradisi paling hangat di rumah.",
      slides: [
        {
          heading: "Iftar = Hangat",
          kicker: "Momen Keluarga:",
          body: "Adzan Maghrib. Semua duduk. Tangan menggenggam doa. Suara takbir kecil di hati. Inilah momen paling dicari seharian.",
        },
      ],
      caption: "Iftar = waktu paling bikin rindu 🍽️💛",
      cta: "Tag keluarga yang selalu iftar bareng!",
      hashtags: ["#BabyMo", "#IftarKeluarga", "#Ramadan"],
    },
  ],

  "ramadan-tarawih": [
    {
      title: "Tarawih: Sholat Khusus Ramadhan",
      hook: "Cuma ada sebulan setahun.",
      slides: [
        {
          heading: "Apa itu Tarawih?",
          kicker: "Yuk, Belajar!",
          body: "Tarawih = sholat sunnah khusus malam Ramadhan. Dilakukan setelah sholat Isya. Bisa di rumah, lebih baik di masjid.",
        },
        {
          heading: "Berapa Rakaat?",
          kicker: "Pilihan:",
          body: "8 rakaat + 3 witir (cara Rasulullah ﷺ) atau 20 rakaat + 3 witir (cara umumnya di banyak masjid). Yang penting istiqomah!",
          attribution: "HR. Bukhari 1147",
        },
        {
          heading: "Pahala Tarawih",
          kicker: "Wow!",
          body: "Man qaama Ramadhaana iimaanan wahtisaaban ghufira lahu maa taqaddama min dzanbihi.\n\n\"Siapa yang sholat malam di Ramadhan karena iman dan mengharap pahala, diampuni dosa-dosanya yang lalu.\"",
          arabic: "مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
          attribution: "HR. Bukhari 37 & Muslim 759",
        },
        {
          heading: "Yuk Coba Malam Ini",
          kicker: "Mulai Pelan:",
          body: "Tahun ini, mulai dengan 2 rakaat dulu. Nambah pelan-pelan. Yang penting konsisten sampai akhir Ramadhan.",
        },
        {
          heading: "Save & Ajak Keluarga!",
          kicker: "CTA",
          body: "Tag siapa yang mau tarawih bareng kamu malam ini. Niatkan karena Allah.",
        },
      ],
      caption: "Tarawih = malam yang dirindukan setahun sekali 🌙",
      cta: "Save & tag teman tarawih!",
      hashtags: ["#BabyMo", "#Tarawih", "#Ramadan", "#SholatMalam"],
    },
    {
      title: "Tarawih di Rumah Juga Boleh",
      hook: "Yang penting niat dan istiqomah.",
      slides: [
        {
          heading: "Di Rumah Boleh?",
          kicker: "Tentu!",
          body: "Rasulullah ﷺ sendiri sebagian besar tarawih di rumah, biar keluarga juga ikut. Yang penting bukan tempatnya, tapi kualitasnya.",
          attribution: "HR. Bukhari 1129",
        },
        {
          heading: "Jangan Buru-Buru",
          kicker: "Pesan:",
          body: "Tarawih artinya 'istirahat.' Pelan-pelan, nikmati setiap rukuk, setiap sujud. 4 rakaat pelan > 20 rakaat buru-buru.",
        },
        {
          heading: "Anak-Anak Ikut?",
          kicker: "Boleh banget!",
          body: "Ajari mereka pelan-pelan. 1-2 rakaat dulu. Yang penting mereka senang dan terbiasa dengan suasana ibadah.",
        },
        {
          heading: "Save & Mulai!",
          kicker: "CTA",
          body: "Tag mama-ayah yang lagi cari motivasi tarawih bareng anak. Yuk semangat!",
        },
      ],
      caption: "Tarawih di rumah = quality time + ibadah 💚",
      cta: "Save & ajak anak!",
      hashtags: ["#BabyMo", "#TarawihRumah", "#Ramadan"],
    },
    {
      title: "Kenapa Pas Tarawih Bisa Khusyuk?",
      hook: "Karena Ramadhan punya energi khusus.",
      slides: [
        {
          heading: "Khusyuknya Beda",
          kicker: "Pernah Ngga?",
          body: "Pas Ramadhan, rasanya bacaan imam masuk ke hati. Itu bukan kebetulan — itu rahmat khusus dari Allah.",
        },
        {
          heading: "Energinya Khusus",
          kicker: "Wow!",
          body: "Di bulan ini, setan-setan dibelenggu. Pintu surga dibuka. Pintu neraka ditutup. Wajar kalau hati jadi lebih ringan untuk taat.",
          attribution: "HR. Bukhari 1899 & Muslim 1079",
        },
        {
          heading: "Manfaatkan Momentum",
          kicker: "Pesan:",
          body: "Kalau bulan-bulan biasa kamu malas sholat malam, bulan ini coba lagi. Hati yang lembut menanti kamu.",
        },
        {
          heading: "Save Reminder Ini!",
          kicker: "CTA",
          body: "Tag siapa yang lagi butuh dorongan tarawih malam ini.",
        },
      ],
      caption: "Hati yang khusyuk di Ramadhan = nikmat dari Allah ✨",
      cta: "Save & ingatkan teman!",
      hashtags: ["#BabyMo", "#KhusyukRamadhan", "#Tarawih"],
    },
    {
      title: "Setelah Tarawih, Jangan Langsung Pulang",
      hook: "Ada sunnah kecil yang sering kelewat.",
      slides: [
        {
          heading: "Tunggu Sebentar",
          kicker: "Tahukah Kamu?",
          body: "Setelah tarawih, sebelum witir, ada jeda. Manfaatkan untuk dzikir pendek atau membaca Quran sebentar.",
        },
        {
          heading: "Witir = Penutup Manis",
          kicker: "Sunnah Witir:",
          body: "Witir = ganjil (1, 3, 5...). Rasulullah ﷺ tidak pernah meninggalkan witir, baik mukim maupun safar.",
          attribution: "HR. Abu Dawud 1418",
        },
        {
          heading: "Doa Setelah Witir",
          kicker: "Coba Yuk!",
          body: "Subhaanal malikil quddus. (3x, yang ke-3 dipanjangkan)\n\n\"Maha Suci Raja Yang Maha Suci.\"",
          arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوسِ",
          attribution: "HR. Nasa'i 1733",
        },
        {
          heading: "Save Doa Ini!",
          kicker: "CTA",
          body: "Tag teman yang sering tarawih bareng kamu di masjid.",
        },
      ],
      caption: "Sunnah-sunnah kecil yang bikin Ramadhan beda 🌙",
      cta: "Save buat malam ini!",
      hashtags: ["#BabyMo", "#SunnahWitir", "#Ramadan"],
    },
  ],

  "ramadan-first-fast": [
    {
      title: "Puasa Pertama Sahabat Mo",
      hook: "Hari paling lama, tapi paling membanggakan.",
      slides: [
        {
          heading: "Hari Pertama Puasa",
          kicker: "Cerita:",
          body: "Sahur tadi rasanya kayak makan malam. 'Aku kuat ngga ya?' Pikiran itu muncul terus.",
        },
        {
          heading: "Tengah Hari…",
          kicker: "Cobaan Besar:",
          body: "Lapar mulai terasa. Teman-teman makan siang. Hati gembur tapi tetap bilang: 'Aku puasa karena Allah.'",
        },
        {
          heading: "Sore Datang!",
          kicker: "Tinggal Sedikit:",
          body: "Bayang-bayang berbuka. Mama nyiapin kurma di meja. Adzan Maghrib makin dekat.",
        },
        {
          heading: "Adzan Maghrib!",
          kicker: "Akhirnya!",
          body: "Bismillah. Kurma masuk mulut. Senyum lebar Mama. 'Selamat ya, kamu hebat!' Hari ini, Sahabat Mo jadi pejuang puasa.",
        },
        {
          heading: "Pejuang Puasa Hari Ini!",
          kicker: "CTA",
          body: "Tag anak yang lagi belajar puasa atau yang selesai puasa pertamanya. Beri semangat!",
        },
      ],
      caption: "Anak-anak yang puasa pertama, kalian luar biasa 💚🌙",
      cta: "Tag pejuang puasa di rumahmu!",
      hashtags: ["#BabyMo", "#PuasaPertama", "#AnakMuslim", "#Ramadan"],
    },
    {
      title: "Anak Belum Kuat Puasa Penuh? OK!",
      hook: "Latihan dulu, bertahap.",
      slides: [
        {
          heading: "Ga Apa-Apa, Sayang",
          kicker: "Pesan Mama:",
          body: "Belum kuat sampai Maghrib? Coba sampai Dzuhur dulu. Belum kuat juga? Sampai jam 10 dulu. Yang penting niat.",
        },
        {
          heading: "Allah Tahu Usahamu",
          kicker: "Reminder:",
          body: "Setiap menit kamu menahan, malaikat catat. Setiap niat baik, dihitung pahala. Anak-anak yang masih belajar, kamu juara.",
        },
        {
          heading: "Bertahap, Sahabat Mo",
          kicker: "Tips:",
          body: "Tahun pertama: ½ hari. Tahun kedua: ¾ hari. Tahun ketiga: insyaAllah full. Pelan-pelan, ya.",
        },
        {
          heading: "Tag Anak yang Lagi Belajar Puasa!",
          kicker: "CTA",
          body: "Beri mereka semangat. Setiap kemajuan kecil itu besar di mata Allah.",
        },
      ],
      caption: "Puasa anak = perjalanan, bukan tujuan 💛",
      cta: "Save buat anak yang lagi latihan!",
      hashtags: ["#BabyMo", "#PuasaAnak", "#Bertahap"],
    },
    {
      title: "Tips Survive Puasa untuk Anak",
      hook: "Biar kuat sampai Maghrib!",
      slides: [
        {
          heading: "5 Tips Puasa Anak",
          kicker: "Yuk, Catat!",
          body: "Tips dari Mama Mo biar puasa lancar:",
        },
        {
          heading: "1. Sahur Penuh Nutrisi",
          kicker: "Tips 1:",
          body: "Nasi + telur + buah + segelas susu. Hindari yang terlalu manis (bikin haus). Penuhi air sampai sahur terakhir.",
        },
        {
          heading: "2. Sibukkan Diri Pas Lapar",
          kicker: "Tips 2:",
          body: "Main, baca buku, gambar, tidur siang sebentar. Jangan duduk diam — pikiran ngga ke makanan.",
        },
        {
          heading: "3. Hitung Mundur Bareng Mama",
          kicker: "Tips 3:",
          body: "'Tinggal 2 jam!' 'Tinggal 1 jam!' Ini bikin anak excited menunggu Maghrib, bukan tertekan.",
        },
        {
          heading: "Save Tips Ini!",
          kicker: "CTA",
          body: "Tag mama-mama yang lagi nyemangati anak puasa. Yuk semangat bareng!",
        },
      ],
      caption: "Puasa anak = tantangan keluarga 💪",
      cta: "Save buat besok!",
      hashtags: ["#BabyMo", "#TipsPuasa", "#PuasaAnak"],
    },
  ],

  "ramadan-fun-facts": [
    {
      title: "5 Fakta Ramadhan untuk Anak",
      hook: "Tahukah kamu? Ramadhan itu spesial banget!",
      slides: [
        {
          heading: "Tahukah Kamu?",
          kicker: "Fakta Ramadhan:",
          body: "Ada 5 fakta seru tentang bulan paling istimewa ini!",
        },
        {
          heading: "Fakta 1: Setan Dibelenggu",
          kicker: "Wow!",
          body: "Pas Ramadhan, setan-setan jahat diikat. Makanya hati lebih mudah untuk taat. Pintu surga juga dibuka lebar-lebar!",
          attribution: "HR. Bukhari 1899",
        },
        {
          heading: "Fakta 2: Quran Turun di Ramadhan",
          kicker: "Tahukah Kamu?",
          body: "Pertama kali Quran turun ke bumi, itu di bulan Ramadhan. Ayatnya: 'Iqra!' — yang berarti 'Bacalah!'",
          attribution: "QS. Al-Baqarah: 185",
        },
        {
          heading: "Fakta 3: Pintu Khusus 'Ar-Rayyan'",
          kicker: "Keren!",
          body: "Di surga, ada pintu bernama Ar-Rayyan. Hanya orang yang puasa yang boleh masuk lewat sana!",
          attribution: "HR. Bukhari 1896",
        },
        {
          heading: "Fakta 4: Pahala Dilipatgandakan",
          kicker: "Subhanallah!",
          body: "Setiap kebaikan di bulan biasa pahalanya 10. Di Ramadhan, dikalikan minimal 10x. Beda banget!",
        },
        {
          heading: "Fakta 5: Lailatul Qadr!",
          kicker: "Yang Paling Spesial:",
          body: "Ada 1 malam di Ramadhan yang lebih baik dari 1000 bulan. Itu Lailatul Qadr. Cari dia di 10 malam terakhir!",
          attribution: "QS. Al-Qadr: 3",
        },
        {
          heading: "Save & Bagikan!",
          kicker: "CTA",
          body: "Tag Sahabat Mo yang harus tau fakta-fakta seru ini!",
        },
      ],
      caption: "Ramadhan = bulan paling spesial dalam setahun 🌙✨",
      cta: "Save & bagikan ke teman!",
      hashtags: ["#BabyMo", "#FaktaRamadhan", "#AnakMuslim"],
    },
    {
      title: "Kenapa Kita Puasa Ramadhan?",
      hook: "Alasan utama yang anak harus tahu.",
      slides: [
        {
          heading: "Kenapa Sih Puasa?",
          kicker: "Pertanyaan Sering Ditanya:",
          body: "Bukan cuma menahan lapar — puasa itu latihan banyak hal. Yuk kupas bareng!",
        },
        {
          heading: "1. Perintah Allah",
          kicker: "Alasan Utama:",
          body: "Yaa ayyuhalladziina aamanuu kutiba 'alaikumush-shiyaamu...\n\n\"Wahai orang beriman, telah diwajibkan atas kalian puasa...\"",
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ",
          attribution: "QS. Al-Baqarah: 183",
        },
        {
          heading: "2. Latihan Sabar",
          kicker: "Manfaat:",
          body: "Pas puasa, kita belajar menahan diri. Dari makan, minum, marah, dan kata-kata jelek. Ini latihan jadi orang yang lebih baik.",
        },
        {
          heading: "3. Merasakan Lapar Orang Lain",
          kicker: "Empati:",
          body: "Ada banyak orang yang tiap hari lapar. Pas kita puasa, kita ngerti rasanya. Jadi lebih semangat berbagi.",
        },
        {
          heading: "4. Hati Jadi Lembut",
          kicker: "Akhir Cerita:",
          body: "Setelah sebulan latihan, hati kita jadi lebih dekat sama Allah. Itu hadiah terbesar dari puasa.",
        },
        {
          heading: "Save & Jelaskan ke Adik!",
          kicker: "CTA",
          body: "Tag siapa yang masih bingung kenapa kita puasa. Yuk jelasin pelan-pelan.",
        },
      ],
      caption: "Puasa = sekolah karakter 30 hari 💚",
      cta: "Save & ajarkan!",
      hashtags: ["#BabyMo", "#KenapaPuasa", "#Ramadan"],
    },
    {
      title: "Apa Aja yang Membatalkan Puasa?",
      hook: "Anak harus tau, biar puasa lancar!",
      slides: [
        {
          heading: "Pembatal Puasa",
          kicker: "Yuk, Belajar!",
          body: "5 hal utama yang bikin puasa batal:",
        },
        {
          heading: "1. Makan & Minum Sengaja",
          kicker: "Pembatal #1:",
          body: "Kalau lupa, ga apa-apa — puasanya lanjut. Tapi kalau sengaja, batal. Jadi inget terus ya: 'Aku puasa!'",
          attribution: "HR. Bukhari 6669",
        },
        {
          heading: "2. Muntah Sengaja",
          kicker: "Pembatal #2:",
          body: "Kalau muntahnya ngga sengaja (mual), ga batal. Kalau sengaja dipaksa keluar, batal.",
        },
        {
          heading: "3. Haid (Buat Perempuan)",
          kicker: "Pembatal #3:",
          body: "Anak perempuan yang udah haid, ga puasa dulu. Nanti diganti hari lain setelah Ramadhan.",
        },
        {
          heading: "Yang Ngga Batal!",
          kicker: "Tenang…",
          body: "Sikat gigi (asal ga ditelan pastanya), berenang, lupa makan, mimpi makan — semua ga batal!",
        },
        {
          heading: "Save & Belajar Bareng!",
          kicker: "CTA",
          body: "Tag teman yang masih bingung soal puasa. Yuk belajar bareng!",
        },
      ],
      caption: "Tau aturannya, puasa jadi lebih tenang ✨",
      cta: "Save buat panduan!",
      hashtags: ["#BabyMo", "#PembatalPuasa", "#Ramadan"],
    },
  ],

  "lailatul-qadr": [
    {
      title: "Lailatul Qadr: Malam Paling Spesial",
      hook: "1 malam = lebih baik dari 1000 bulan.",
      slides: [
        {
          heading: "Apa itu Lailatul Qadr?",
          kicker: "Yuk, Belajar!",
          body: "Lailatul Qadr = Malam Penentuan / Malam Mulia. Ini malam saat Quran pertama kali turun ke Nabi Muhammad ﷺ.",
        },
        {
          heading: "Kekuatannya Luar Biasa",
          kicker: "Wow!",
          body: "Lailatul-qadri khairum-min alfi syahr.\n\n\"Malam Lailatul Qadr lebih baik dari 1000 bulan.\"",
          arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِنْ أَلْفِ شَهْرٍ",
          attribution: "QS. Al-Qadr: 3",
        },
        {
          heading: "Hitung Yuk!",
          kicker: "Maths Time:",
          body: "1000 bulan = 83 tahun. Ibadah 1 malam ini = ibadah satu hidup! Allah kasih kesempatan kita 'lompat' ribuan tahun pahala.",
        },
        {
          heading: "Kapan Sih?",
          kicker: "Cari di…",
          body: "Di 10 malam terakhir Ramadhan, terutama malam-malam ganjil (21, 23, 25, 27, 29). Yang paling kuat: malam ke-27.",
          attribution: "HR. Bukhari 2017",
        },
        {
          heading: "Doa Khusus Malam Itu",
          kicker: "Hafalkan!",
          body: "Allahumma innaka 'afuwwun, tuhibbul 'afwa, fa'fu 'annii.\n\n\"Ya Allah, Engkau Maha Pemaaf, suka memaafkan, maafkanlah aku.\"",
          arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
          attribution: "HR. Tirmidzi 3513",
        },
        {
          heading: "Save & Tunggu Malamnya!",
          kicker: "CTA",
          body: "Tag teman-teman yang mau berburu Lailatul Qadr bareng tahun ini.",
        },
      ],
      caption: "Malam yang ga boleh dilewatin — sekali setahun! 🌙✨",
      cta: "Save buat malam ke-27!",
      hashtags: ["#BabyMo", "#LailatulQadr", "#Ramadan", "#MalamMulia"],
    },
    {
      title: "Cara Anak Berburu Lailatul Qadr",
      hook: "Kecil-kecil juga bisa dapat pahalanya!",
      slides: [
        {
          heading: "Anak Juga Bisa!",
          kicker: "Tips:",
          body: "Lailatul Qadr bukan cuma buat orang dewasa. Anak-anak juga bisa dapat pahala besar dengan cara mereka.",
        },
        {
          heading: "1. Sholat Isya + Tarawih",
          kicker: "Cara 1:",
          body: "Sholat malam = ibadah utama Lailatul Qadr. Sholat sekali pun pas malam itu, pahalanya 1000+ bulan.",
        },
        {
          heading: "2. Baca Quran",
          kicker: "Cara 2:",
          body: "Quran turun di malam ini. Baca walau 1 ayat, atau dengerin orang baca, sama-sama dihitung berkah.",
        },
        {
          heading: "3. Banyak Doa & Istighfar",
          kicker: "Cara 3:",
          body: "Yang paling penting: doa permohonan ampun. 'Allahumma 'afwun, fa'fu 'annii.' Ucapkan 100x malam itu!",
        },
        {
          heading: "4. Tidur dengan Niat Bangun",
          kicker: "Cara 4:",
          body: "Sebelum tidur, niat bangun pas 2/3 malam untuk witir. Walaupun kebablasan, niatnya dapat pahala.",
        },
        {
          heading: "Save & Praktikkan!",
          kicker: "CTA",
          body: "Tag mama-ayah yang mau ajak anak-anaknya tahun ini.",
        },
      ],
      caption: "Anak kecil juga bisa raih malam terbaik 💚",
      cta: "Save buat 10 malam terakhir!",
      hashtags: ["#BabyMo", "#LailatulQadrAnak", "#Ramadan"],
    },
    {
      title: "Tanda-Tanda Lailatul Qadr",
      hook: "Allah kasih hint biar kita tau.",
      slides: [
        {
          heading: "Tanda-Tandanya?",
          kicker: "Yuk Hafal:",
          body: "Rasulullah ﷺ kasih 4 tanda fisik Lailatul Qadr — bisa kamu rasakan sendiri!",
        },
        {
          heading: "1. Malamnya Tenang",
          kicker: "Tanda 1:",
          body: "Malamnya sangat tenang. Ngga panas, ngga dingin. Anginnya kalem. Hawa terasa damai.",
          attribution: "HR. Muslim 762",
        },
        {
          heading: "2. Bulan Cerah",
          kicker: "Tanda 2:",
          body: "Bulannya kelihatan jernih, kayak setengah baki. Langit cerah tanpa awan.",
          attribution: "HR. Muslim 762",
        },
        {
          heading: "3. Matahari Pagi Lembut",
          kicker: "Tanda 3:",
          body: "Pagi harinya, matahari terbit tapi sinarnya ngga menyilaukan. Kayak bulan, cerah tapi lembut.",
          attribution: "HR. Muslim 762",
        },
        {
          heading: "4. Hati Terasa Tenang",
          kicker: "Tanda 4 (Spesial):",
          body: "Hati jadi luar biasa tenang. Pengen nangis pas berdoa. Ada perasaan 'ada sesuatu yang istimewa malam ini.'",
        },
        {
          heading: "Tag Sahabat Mo!",
          kicker: "CTA",
          body: "Save tanda-tanda ini buat malam ke-21, 23, 25, 27, 29!",
        },
      ],
      caption: "Allah ngasih tanda — kita tinggal jeli ✨",
      cta: "Save buat 10 malam terakhir!",
      hashtags: ["#BabyMo", "#TandaLailatulQadr", "#Ramadan"],
    },
  ],

  "eid-mubarak": [
    {
      title: "Malam Takbir: Suara Paling Indah",
      hook: "Tradisi 1400 tahun yang ngga pernah berhenti.",
      slides: [
        {
          heading: "Malam Takbir!",
          kicker: "Yang Ditunggu:",
          body: "Setelah 30 hari puasa, malamnya kita takbir. Suara takbir berkumandang dari rumah ke rumah, masjid ke masjid.",
        },
        {
          heading: "Takbir Lengkap",
          kicker: "Hafalkan!",
          body: "Allahu akbar, Allahu akbar, Allahu akbar. Laa ilaaha illallahu wallahu akbar. Allahu akbar wa lillahil hamd.",
          arabic: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لاَ إِلَهَ إِلاَّ اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
          attribution: "Takbir Hari Raya",
        },
        {
          heading: "Artinya?",
          kicker: "Terjemahan:",
          body: "\"Allah Maha Besar (3x). Tiada Tuhan selain Allah dan Allah Maha Besar. Allah Maha Besar dan segala puji bagi-Nya.\"",
        },
        {
          heading: "Kapan Takbirnya?",
          kicker: "Mulai Dari:",
          body: "Mulai Maghrib akhir Ramadhan, lanjut sampai sebelum sholat Eid esok pagi. Kumandangkan dengan suara dan hati!",
        },
        {
          heading: "Tag Keluarga!",
          kicker: "CTA",
          body: "Tag siapa yang biasa takbir bareng kamu malam Eid. Save lirik takbirnya!",
        },
      ],
      caption: "Malam takbir = malam paling syahdu tahun ini 🌙✨",
      cta: "Save & takbiran bareng!",
      hashtags: ["#BabyMo", "#TakbirEid", "#EidMubarak", "#HariRaya"],
    },
    {
      title: "Adab Sholat Eid",
      hook: "Sunnah yang sering kelewat.",
      slides: [
        {
          heading: "Sebelum Sholat Eid",
          kicker: "Sunnah-Sunnah:",
          body: "Ada beberapa sunnah Rasulullah ﷺ yang bikin Eid kita lebih berkah.",
        },
        {
          heading: "1. Mandi Besar",
          kicker: "Pagi-Pagi:",
          body: "Bangun pagi, mandi besar (mandi sunnah). Pakai baju paling rapi (ngga harus baru).",
        },
        {
          heading: "2. Makan Dulu (Khusus Eid Fitri)",
          kicker: "Sunnah Unik:",
          body: "Kalau hari biasa, kita ngga makan sebelum sholat. Tapi Eid Fitri, sunnah makan 3 butir kurma dulu. Tandanya: puasanya udah selesai!",
          attribution: "HR. Bukhari 953",
        },
        {
          heading: "3. Pulang Lewat Jalan Beda",
          kicker: "Sunnah Aneh:",
          body: "Rasulullah ﷺ ke masjid lewat jalan A, pulangnya lewat jalan B. Biar ketemu lebih banyak orang, sapa lebih banyak orang.",
          attribution: "HR. Bukhari 986",
        },
        {
          heading: "4. Ucapkan Selamat",
          kicker: "Greeting:",
          body: "\"Taqabbalallahu minna wa minkum\" — Semoga Allah terima dari kami dan darimu. Atau singkat: \"Selamat Hari Raya, Mohon Maaf Lahir Batin!\"",
        },
        {
          heading: "Save & Praktikkan!",
          kicker: "CTA",
          body: "Tag siapa yang mau sholat Eid bareng kamu pagi besok.",
        },
      ],
      caption: "Eid bukan cuma baju baru — ada sunnah-sunnahnya 💚",
      cta: "Save buat pagi Eid!",
      hashtags: ["#BabyMo", "#AdabEid", "#EidMubarak"],
    },
    {
      title: "Eid Bukan Akhir, Tapi Awal",
      hook: "Setelah Ramadhan, jangan balik ke kebiasaan lama.",
      slides: [
        {
          heading: "Ramadhan Selesai…",
          kicker: "Sedih?",
          body: "Banyak orang sedih pas Ramadhan selesai. Wajar, soalnya bulan paling berkah.",
        },
        {
          heading: "Tapi Ini Bukan Akhir!",
          kicker: "Justru…",
          body: "Eid = wisudaan dari 'sekolah Ramadhan.' Yang sudah kita pelajari (sabar, sholat malam, dekat sama Quran), kita bawa terus.",
        },
        {
          heading: "Tanda Diterima",
          kicker: "Tahukah Kamu?",
          body: "Tanda Ramadhan kita diterima Allah = setelah Ramadhan, kita lebih baik dari sebelumnya. Lebih sabar, lebih dekat, lebih berbagi.",
        },
        {
          heading: "Komitmen Pasca-Ramadhan",
          kicker: "Yuk Pilih 1:",
          body: "Ambil 1 kebiasaan baik Ramadhan yang mau kamu lanjutkan setahun ke depan. Sholat malam? Baca Quran tiap hari? Pilih satu!",
        },
        {
          heading: "Komitmen Pertama!",
          kicker: "CTA",
          body: "Komen di bawah: kebiasaan apa yang mau kamu bawa pulang dari Ramadhan tahun ini?",
        },
      ],
      caption: "Eid = bukan finish line, tapi starting point ✨",
      cta: "Komen komitmenmu!",
      hashtags: ["#BabyMo", "#PascaRamadhan", "#EidMubarak", "#KomitmenBaik"],
    },
  ],
};

export function getSeedsFor(contentTypeId: string): SampleSeed[] {
  return SEEDS[contentTypeId] ?? [];
}
