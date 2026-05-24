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
      title: "Senyum itu Sedekah!",
      hook: "Senyum kecilmu bisa jadi pahala besar.",
      slides: [
        {
          heading: "Senyum kecilmu bisa jadi pahala besar.",
          kicker: "Tahukah Kamu?",
          body: "Sahabat Mo, kamu nggak perlu uang buat sedekah hari ini. Cukup satu hal aja...",
        },
        {
          heading: "Yaitu... Senyum!",
          kicker: "Sabda Rasulullah:",
          body: "“Senyummu kepada saudaramu adalah sedekah.”",
          attribution: "HR. Tirmidzi 1956",
        },
        {
          heading: "Kenapa Senyum Penting?",
          kicker: "Manfaatnya:",
          body: "Senyum bikin hati orang lain hangat, ngusir sedih, dan bikin Sahabat Mo dapat pahala — semua dalam 1 detik!",
        },
        {
          heading: "Misi Hari Ini!",
          kicker: "Yuk Coba:",
          body: "Senyum tulus ke 3 orang hari ini. Mama, ayah, adik, teman — siapa aja. Rasakan bedanya!",
        },
        {
          heading: "Bagikan Senyummu!",
          kicker: "Pesan Mo:",
          body: "Save slide ini & tag temanmu. Ajak mereka ikut misi senyum hari ini. Pahala bareng-bareng, seru!",
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
          heading: "Mengalah itu Hebat, bukan kalah",
          kicker: "Pesan untuk Sahabat Mo:",
          body: "Pernah ngga, lagi rebutan mainan sama adik? Atau berdebat sama teman? Yuk, dengerin satu hadits ini.",
        },
        {
          heading: "Sabda Rasulullah SAW:",
          kicker: "Hadits Hari Ini:",
          body: "“Orang kuat adalah yang mampu menahan amarah ketika sedang marah.”",
          attribution: "HR. Bukhari 6114 & HR. Muslim 2609",
        },
        {
          heading: "Jadi, Kuat Bukan...",
          kicker: "Bukan ya:",
          body: "...orang yang otot-nya gede, atau yang bisa bertarung. Kuat itu yang BISA mengendalikan dirinya pas lagi marah.",
        },
        {
          heading: "Coba Cara Ini!",
          kicker: "Jurus Sahabat Mo:",
          body: "Pas lagi marah: 1. Tarik nafas dalam.\n2. Baca ta'awudz.\n3. Diam dulu. Insya Allah marahnya hilang.",
        },
        {
          heading: "Sahabat Mo, Kamu Bisa!",
          kicker: "Save & Bagikan:",
          body: "Save slide ini. Coba praktekkan minggu ini. Kalau berhasil, kamu udah jadi orang kuat versi Rasulullah!",
        },
      ],
      caption: "Pemenang sejati itu yang bisa sabar 💪 Save & bagikan ke teman!",
      cta: "Save & jadi anak sholeh!",
      hashtags: ["#BabyMo", "#Sabar", "#AnakSholeh", "#Hadits"],
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
      title: "Tahukah Kamu? Bismillah Sebelum Makan",
      hook: "Satu kalimat, sejuta pahala!",
      slides: [
        {
          heading: "Tahukah Kamu?",
          kicker: "Fakta Seru:",
          body: "Ada satu kalimat ajaib yang bikin makananmu jadi penuh berkah. Tebak apa? 🤫",
        },
        {
          heading: "Jawabannya: Bismillah!",
          kicker: "Yes!",
          body: "Saat kita ucap “Bismillah” sebelum makan, setan nggak bisa ikut makan dari makanan kita loh!",
          attribution: "HR. Muslim 2017",
        },
        {
          heading: "Kalau Lupa Bismillah?",
          kicker: "Eits, Tunggu Dulu:",
          body: "Tenang Sahabat Mo, kalau lupa di awal, baca aja “Bismillahi awwalahu wa akhirahu” — artinya “Dengan nama Allah di awal dan akhir”.",
        },
        {
          heading: "Latih Setiap Hari!",
          kicker: "Tantangan Sahabat Mo:",
          body: "Hari ini, coba ucap Bismillah sebelum SEMUA aktivitas. Sebelum makan, sebelum belajar, sebelum bermain.",
        },
        {
          heading: "Bagikan Ilmunya!",
          kicker: "Yuk, Save:",
          body: "Save & ajarkan adik / teman. Satu ilmu yang dibagikan, satu lagi pintu pahala terbuka.",
        },
      ],
      caption: "Bismillah dulu, baru makan ya Sahabat Mo! 🍽️ Tag temanmu yang sering lupa Bismillah 😄",
      cta: "Save & ajarkan adik!",
      hashtags: ["#BabyMo", "#TahukahKamu", "#Bismillah", "#AdabMakan"],
    },
    {
      title: "Tahukah Kamu? Berwudhu Sebelum Tidur",
      hook: "Sunnah kecil, manfaat besar.",
      slides: [
        {
          heading: "Tahukah Kamu?",
          kicker: "Fakta Sunnah:",
          body: "Ada satu kebiasaan sebelum tidur yang bikin malam Sahabat Mo dijaga malaikat. Penasaran? 🌙",
        },
        {
          heading: "Yaitu... Berwudhu!",
          kicker: "Sunnah Rasulullah:",
          body: "Jika sebelum tidur dianjurkan untuk berwudhu terlebih dulu. Tidur jadi lebih berkah!",
          attribution: "HR. Imam Bukhari 247",
        },
        {
          heading: "Apa Manfaatnya?",
          kicker: "Bonus Berkah:",
          body: "1. Diampuni dosa-dosa kecil\n2. Mimpi lebih indah\n3. Bangun lebih segar untuk Subuh!",
        },
        {
          heading: "Caranya Gampang!",
          kicker: "Mini Tutorial:",
          body: "Wudhu seperti biasa. Selesai? Langsung baca doa tidur. Tidur miring ke kanan. Selesai!",
        },
        {
          heading: "Coba Mulai Malam Ini!",
          kicker: "Misi Sahabat Mo:",
          body: "Save slide ini. Coba malam ini. Komen di postingan kalau Sahabat Mo udah ngelakuin ya!",
        },
      ],
      caption: "Yuk wudhu dulu sebelum bobo 💧 Tag yang perlu pengingat ini!",
      cta: "Save buat malam ini!",
      hashtags: ["#BabyMo", "#Sunnah", "#TahukahKamu", "#WudhuSebelumTidur"],
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
      title: "Kisah Semut yang Berdoa",
      hook: "Allah dengar doa yang paling kecil sekalipun.",
      slides: [
        {
          heading: "Kisah Semut Kecil 🐜",
          kicker: "Cerita untuk Sahabat Mo:",
          body: "Di taman yang sejuk, ada seekor semut kecil yang sedang berusaha mengangkat sehelai daun. Daunnya sangat besar...",
        },
        {
          heading: "Si Semut Lelah",
          kicker: "Slide 2:",
          body: "Semut mencoba berkali-kali. Daun itu jatuh terus. Akhirnya semut berhenti sebentar, menengadah ke langit.",
        },
        {
          heading: "Doa Semut Kecil",
          kicker: "Slide 3:",
          body: "Semut berbisik pelan: “Ya Rahman, Engkau Maha Pengasih. Kuatkan tubuh kecilku ini.”",
        },
        {
          heading: "Allah Mendengar 💚",
          kicker: "Slide 4:",
          body: "Ajaibnya, tiba-tiba semut merasa kuat. Ia angkat daun itu dengan mudah. Allah Maha Mendengar semua doa, sekecil apapun.",
        },
        {
          heading: "Pesan dari Sahabat Mo",
          kicker: "Slide 5:",
          body: "Doamu, Sahabat Mo, juga selalu didengar Allah. Yuk, jangan malu berdoa untuk hal kecil sekalipun!",
        },
      ],
      caption: "Doa sekecil apapun, Allah dengar 🐜💚 Save & ceritakan ke adik sebelum bobo!",
      cta: "Save buat bedtime story!",
      hashtags: ["#BabyMo", "#CeritaIslami", "#BedtimeStory", "#KisahHewan"],
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
