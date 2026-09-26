export const INITIAL_MATERIALS = [
  {
    id: 'mat-1',
    kelasId: 'kls-1',
    judul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    fileName: 'Etika_AI_Pendidikan_Modul4.pdf',
    fileSize: '2.4 MB',
    tanggalUpload: '2026-09-20',
    status: 'selesai', // proses | selesai
    deskripsi: 'Modul komprehensif mengulas dampak LLM terhadap retensi memori, ketergantungan kognitif, dan integritas akademik di era pembelajaran digital.'
  },
  {
    id: 'mat-2',
    kelasId: 'kls-1',
    judul: 'Bab 7: Dilema Eksplorasi Luar Angkasa Komersial vs Restorasi Bumi',
    fileName: 'Sains_Sosial_Antariksa_v2.epub',
    fileSize: '4.1 MB',
    tanggalUpload: '2026-09-18',
    status: 'selesai',
    deskripsi: 'Kajian alokasi anggaran triliunan rupiah untuk kolonisasi Mars vs mitigasi krisis iklim global dan kesenjangan ekonomi.'
  }
];

export const INITIAL_CASES = [
  {
    id: 'case-1',
    materialId: 'mat-1',
    judulKasus: 'Larangan vs Integrasi Penuh AI di Ujian Akhir',
    teksKasus: 'Sebuah sekolah menengah memutuskan memblokir seluruh akses AI generatif saat ujian dan tugas akhir dengan alasan menjaga orisinalitas nalar. Namun, siswa berargumen bahwa di dunia industri nanti, kemampuan memanfaatkan AI secara kritis adalah kompetensi utama. Haruskah sekolah melarang total atau justru mewajibkan penyertaan prompt engineering dalam rubrik penilaian?',
    levelBloom: 'Evaluasi',
    durasi: 60, // detik
    aktif: true,
    kategori: 'Pendidikan & Teknologi',
    kataKunci: ['Integritas Akademik', 'Keterampilan Abad 21', 'Regulasi Sekolah']
  },
  {
    id: 'case-2',
    materialId: 'mat-1',
    judulKasus: 'Hak Cipta Esai Buatan AI: Milik Siswa atau Pengembang Algoritma?',
    teksKasus: 'Siswa memenangkan lomba karya tulis ilmiah tingkat nasional dengan esai yang 70% kerangka argumennya di-generate oleh AI melalui serangkaian iterasi prompt rumit selama 2 minggu. Dewan juri memperdebatkan apakah penghargaan tersebut harus dicabut atau disahkan sebagai model karya kolaboratif manusia-AI.',
    levelBloom: 'Analisis',
    durasi: 120,
    aktif: true,
    kategori: 'Hukum & Orisinalitas',
    kataKunci: ['Hak Kekayaan Intelektual', 'Prompt Engineering', 'Etika Lomba']
  },
  {
    id: 'case-3',
    materialId: 'mat-1',
    judulKasus: 'Desain Kurikulum Anti-Ketergantungan AI',
    teksKasus: 'Jika kalkulator dahulu dikhawatirkan mematikan kemampuan berhitung dasar namun sekarang jadi alat lumrah, rancanglah satu mekanisme asesmen lisan baru di mana siswa tidak bisa mengelabui pemahaman konseptual meskipun mereka memakai AI setiap malam untuk membuat ringkasan!',
    levelBloom: 'Kreasi',
    durasi: 120,
    aktif: true,
    kategori: 'Desain Pedagogis',
    kataKunci: ['Asesmen Otentik', 'Ujian Lisan Spontan', 'Metakognisi']
  },
  {
    id: 'case-4',
    materialId: 'mat-2',
    judulKasus: 'Pajak Miliarder Luar Angkasa untuk Subsidi Iklim',
    teksKasus: 'Perusahaan swasta menghabiskan ratusan triliun untuk wisata suborbital dan riset pendaratan asteroid. Muncul desakan legislasi global mengenakan pajak 40% atas setiap peluncuran roket komersial untuk mendanai pemulihan terumbu karang dan energi terbarukan di negara berkembang.',
    levelBloom: 'Evaluasi',
    durasi: 60,
    aktif: true,
    kategori: 'Sosial & Ekologi',
    kataKunci: ['Keadilan Iklim', 'Inovasi Swasta', 'Kebijakan Fiskal Global']
  },
  {
    id: 'case-5',
    materialId: 'mat-1',
    judulKasus: 'Tutor AI Berbayar vs Kesetaraan Peluang Siswa Kurang Mampu',
    teksKasus: 'Siswa dari keluarga mampu berlangganan tutor AI premium dengan respon instan suara dan umpan balik personal 24 jam, mendongkrak nilai ujian mereka secara signifikan. Sementara siswa tanpa akses gawai premium tertinggal jauh. Apakah sekolah negeri wajib membiayai langganan serupa bagi seluruh siswa atau melarang penggunaan alat bimbel privat?',
    levelBloom: 'Analisis',
    durasi: 60,
    aktif: true,
    kategori: 'Kesenjangan Sosial',
    kataKunci: ['Digital Divide', 'Pemerataan Fasilitas', 'Afirmasi Pendidikan']
  },
  {
    id: 'case-6',
    materialId: 'mat-1',
    judulKasus: 'Transparansi Data Belajar Siswa pada Model Komersial',
    teksKasus: 'Platform edukasi gratis merekam rekaman suara dan transkrip argumen ribuan siswa untuk melatih model AI komersial generasi berikutnya tanpa kompensasi langsung. Guru menganggap ini pelanggaran privasi anak, sementara pengembang berdalih data tersebut esensial agar aksen lokal terwakili dalam AI global.',
    levelBloom: 'Evaluasi',
    durasi: 120,
    aktif: true,
    kategori: 'Privasi & Etika Data',
    kataKunci: ['Perlindungan Anak', 'Kedaulatan Data', 'Bias AI']
  }
];

export const INITIAL_ARENA_POSTS = [
  {
    id: 'post-1',
    caseId: 'case-1',
    siswaNama: 'Nabila Putri',
    siswaRole: 'Siswa (Kelas XI-IPA 2)',
    avatarColor: '#06b6d4',
    kutub: 'Regulasi Adaptif & Prompting',
    posisiX: 68,
    posisiY: 35,
    transkrip: 'Menurut saya, melarang total AI di sekolah adalah langkah mundur yang naif. Dunia kerja menuntut kita menguasai kolaborasi dengan alat ini. Yang seharusnya diuji guru bukan lagi teks akhirnya, melainkan logika prompt dan kemampuan kita memverifikasi fakta hasil AI dengan sumber primer.',
    skorArgumen: 88,
    cermin: {
      klaim: 'Melarang AI keliru; sekolah harus menguji verifikasi prompt.',
      alasan: 'Dunia industri nyata membutuhkan kecakapan kerja bersama AI.',
      bukti: 'Pengujian teks akhir sudah usang; verifikasi fakta primer lebih esensial.',
      fillerWords: 2,
      clarityScore: 92
    },
    waktu: '10 menit lalu',
    replies: [
      {
        id: 'rep-1',
        siswaNama: 'Farhan Maulana',
        label: 'Menyanggah',
        isi: 'Tapi Nabila, jika dasar konsep siswa belum matang, mereka tidak akan mampu mendeteksi saat AI berhalusinasi. Keterampilan dasar harus dikuasai tanpa alat bantu dahulu.',
        waktu: '7 menit lalu'
      },
      {
        id: 'rep-2',
        siswaNama: 'Zahra Amelia',
        label: 'Menambah bukti',
        isi: 'Studi UNESCO 2024 juga merekomendasikan batas usia minimal 13 tahun untuk penggunaan AI generatif mandiri agar tidak mengganggu tahapan perkembangan nalar kritis dasar.',
        waktu: '4 menit lalu'
      }
    ]
  },
  {
    id: 'post-2',
    caseId: 'case-1',
    siswaNama: 'Budi Prakoso',
    siswaRole: 'Siswa (Kelas XI-IPA 2)',
    avatarColor: '#f43f5e',
    kutub: 'Proteksi Nalar & Larangan Ujian',
    posisiX: 25,
    posisiY: 70,
    transkrip: 'Saya sepakat jika untuk ujian akhir dilarang total. Ujian bertujuan mengukur kapasitas memori kerja dan pemecahan masalah otentik individu. Jika AI diizinkan di ruang ujian, yang diuji adalah kecepatan mengetik prompt, bukan daya ingat atau pemahaman konsep biologis maupun matematis anak.',
    skorArgumen: 82,
    cermin: {
      klaim: 'Ujian akhir wajib bebas AI guna mengukur kapasitas murni.',
      alasan: 'Ujian bertujuan memverifikasi memori kerja dan pemahaman otentik.',
      bukti: 'Prompting mengaburkan evaluasi penguasaan konsep fundamental.',
      fillerWords: 3,
      clarityScore: 85
    },
    waktu: '25 menit lalu',
    replies: [
      {
        id: 'rep-3',
        siswaNama: 'Rafi Ramadhan',
        label: 'Bertanya',
        isi: 'Lalu bagaimana dengan siswa yang memiliki disleksia atau hambatan verbal dan sangat terbantu oleh AI untuk mengorganisir jalan pikirannya?',
        waktu: '15 menit lalu'
      }
    ]
  },
  {
    id: 'post-3',
    caseId: 'case-1',
    siswaNama: 'Aisyah Maharani',
    siswaRole: 'Siswa (Kelas XI-IPA 2)',
    avatarColor: '#10b981',
    kutub: 'Model Ujian 2 Tahap (Hibrida)',
    posisiX: 52,
    posisiY: 82,
    transkrip: 'Solusi jalan tengah adalah ujian dua tahap. Tahap pertama 45 menit tanpa gawai sama sekali untuk mengecek konsep dasar. Tahap kedua 45 menit dengan AI, di mana siswa diminta memecahkan studi kasus kompleks yang sengaja memerlukan analisis sintesis tingkat tinggi.',
    skorArgumen: 94,
    cermin: {
      klaim: 'Model ujian hibrida dua tahap menyelesaikan dikotomi ini.',
      alasan: 'Tahap 1 menjamin konsep dasar, Tahap 2 melatih sintesis dunia nyata.',
      bukti: 'Kedua kompetensi (otentik & digital) terukur secara proporsional.',
      fillerWords: 1,
      clarityScore: 96
    },
    waktu: '40 menit lalu',
    replies: [
      {
        id: 'rep-4',
        siswaNama: 'Nabila Putri',
        label: 'Menguatkan',
        isi: 'Pendekatan dua tahap ini sangat brilian karena adil bagi guru yang ingin validitas dan siswa yang butuh kesiapan masa depan!',
        waktu: '20 menit lalu'
      }
    ]
  }
];

export const INITIAL_SYNTHESIS = {
  caseId: 'case-1',
  titikTemu: 'Seluruh peserta sepakat bahwa kemampuan dasar (foundational knowledge) tidak boleh hilang, dan pelarangan tanpa edukasi tidak efektif di luar gerbang sekolah.',
  titikBeda: 'Perdebatan terpusat pada kapan waktu yang tepat mengizinkan AI: apakah setelah lulus SMA, atau sejak dini lewat rubrik penilaian bertingkat hibrida.',
  pertanyaanTerbuka: 'Bagaimana sekolah di daerah dengan keterbatasan perangkat mendesain asesmen hibrida tanpa menciptakan ketimpangan baru?'
};

export const INITIAL_STUDENT_JOURNAL = [
  {
    id: 'jrn-1',
    tanggal: '2026-09-20 14:35',
    caseJudul: 'Larangan vs Integrasi Penuh AI di Ujian Akhir',
    levelBloom: 'Evaluasi',
    durasiPikir: 60,
    durasiBicara: '01:14',
    skorArgumen: 89,
    transkrip: 'Menurut saya, melarang total AI di sekolah adalah langkah mundur yang naif. Dunia kerja menuntut kita menguasai kolaborasi dengan alat ini. Yang seharusnya diuji guru bukan lagi teks akhirnya, melainkan logika prompt dan kemampuan kita memverifikasi fakta hasil AI dengan sumber primer.',
    cermin: {
      klaim: 'Melarang AI keliru; sekolah harus menguji verifikasi prompt.',
      alasan: 'Dunia industri nyata membutuhkan kecakapan kerja bersama AI.',
      bukti: 'Pengujian teks akhir sudah usang; verifikasi fakta primer lebih esensial.'
    },
    dimensi: {
      kejelasanKlaim: 90,
      kekuatanAlasan: 88,
      ketajamanBukti: 85,
      kelancaranLisan: 92,
      kemandirianNalar: 89
    },
    faktaCount: 3,
    statusArena: 'Selesai Diskusi'
  },
  {
    id: 'jrn-2',
    tanggal: '2026-09-19 10:15',
    caseJudul: 'Hak Cipta Esai Buatan AI: Milik Siswa atau Pengembang Algoritma?',
    levelBloom: 'Analisis',
    durasiPikir: 120,
    durasiBicara: '01:42',
    skorArgumen: 84,
    transkrip: 'Hak cipta semestinya tetap berada di tangan siswa jika proses kurasi dan sintesis intelektualnya nyata, namun penghargaan lomba wajib mencantumkan label karya hibrida.',
    cermin: {
      klaim: 'Karya hibrida sah diakui dengan transparansi atribusi penuh.',
      alasan: 'Intelektualitas terletak pada arahan prompt dan penyaringan argumen.',
      bukti: 'Model analogi fotografi: kamera adalah alat, namun fotografer memegang hak cipta visual.'
    },
    dimensi: {
      kejelasanKlaim: 85,
      kekuatanAlasan: 82,
      ketajamanBukti: 80,
      kelancaranLisan: 86,
      kemandirianNalar: 88
    },
    faktaCount: 2,
    statusArena: 'Selesai Diskusi'
  }
];

export const INITIAL_EVALUATION_RECORDS = [
  {
    id: 'eval-1',
    siswaId: 'usr-siswa-2',
    siswaNama: 'Nabila Putri',
    kelas: 'XI-IPA 2',
    caseId: 'case-1',
    topikKasus: 'Larangan vs Integrasi Penuh AI di Ujian Akhir',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    jawabanTeks: 'Menurut saya, melarang total AI di sekolah adalah langkah mundur yang naif. Dunia kerja menuntut kita menguasai kolaborasi dengan alat ini. Yang seharusnya diuji guru bukan lagi teks akhirnya, melainkan logika prompt dan kemampuan kita memverifikasi fakta hasil AI dengan sumber primer.',
    skor: 88,
    statusKetepatan: 'Sangat Kritis & Konstruktif',
    feedback: 'Klaim pokok sangat tegas dan kontekstual terhadap tuntutan abad ke-21. Alur logika antara persiapan dunia kerja dengan kebutuhan asesmen prompt terbangun kokoh. Rekomendasi: Sertakan rujukan riset empiris atau data persentase adopsi industri untuk menyempurnakan bukti.',
    penjelasanKonsep: 'Kunci konsep berpusat pada pergeseran Taksonomi Bloom: dari retensi memori statis (mengingat) menuju evaluasi kritis dan audit validitas (mengevaluasi). Pelarangan total tanpa literasi prompt berisiko memunculkan kesenjangan kompetensi.',
    durasiPengerjaan: '01:14',
    tanggal: '2026-09-25 10:15'
  },
  {
    id: 'eval-2',
    siswaId: 'usr-siswa-3',
    siswaNama: 'Budi Prakoso',
    kelas: 'XI-IPA 2',
    caseId: 'case-1',
    topikKasus: 'Larangan vs Integrasi Penuh AI di Ujian Akhir',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    jawabanTeks: 'Saya sepakat jika untuk ujian akhir dilarang total. Ujian bertujuan mengukur kapasitas memori kerja dan pemecahan masalah otentik individu. Jika AI diizinkan di ruang ujian, yang diuji adalah kecepatan mengetik prompt, bukan daya ingat atau pemahaman konsep biologis maupun matematis anak.',
    skor: 82,
    statusKetepatan: 'Cukup Baik & Relevan',
    feedback: 'Argumen mempertahankan nilai esensial memori kerja dengan baik. Terdapat identifikasi risiko ketergantungan kognitif. Saran: Pertimbangkan alternatif format evaluasi hibrida agar siswa tetap memiliki kesiapan adaptasi teknologi.',
    penjelasanKonsep: 'Konsep beban kognitif (Cognitive Load Theory) menjelaskan bahwa pemikiran tingkat tinggi membutuhkan pondasi skema pengetahuan yang tersimpan kuat di memori jangka panjang, sehingga verifikasi pemahaman dasar tanpa alat bantu tetap memiliki urgensi pedagogis.',
    durasiPengerjaan: '01:30',
    tanggal: '2026-09-25 09:40'
  },
  {
    id: 'eval-3',
    siswaId: 'usr-siswa-4',
    siswaNama: 'Aisyah Maharani',
    kelas: 'XI-IPA 2',
    caseId: 'case-1',
    topikKasus: 'Larangan vs Integrasi Penuh AI di Ujian Akhir',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    jawabanTeks: 'Solusi jalan tengah adalah ujian dua tahap. Tahap pertama 45 menit tanpa gawai sama sekali untuk mengecek konsep dasar. Tahap kedua 45 menit dengan AI, di mana siswa diminta memecahkan studi kasus kompleks yang sengaja memerlukan analisis sintesis tingkat tinggi.',
    skor: 94,
    statusKetepatan: 'Sangat Kritis & Komprehensif',
    feedback: 'Analisis tingkat tinggi (Bloom: Kreasi) yang memecah kebuntuan polarisasi "larang vs bebas". Desain penilaian dua tahap menjawab kebutuhan validitas akademis sekaligus relevansi kecakapan modern secara terukur.',
    penjelasanKonsep: 'Konsep asesmen autentik bertingkat: mengkombinasikan penilaian formatif nalar mandiri dengan penilaian sumatif berbasis sintesis terapan. Model ini direkomendasikan oleh laporan UNESCO 2024 untuk memitigasi ilusi kompetensi.',
    durasiPengerjaan: '01:05',
    tanggal: '2026-09-24 16:20'
  },
  {
    id: 'eval-4',
    siswaId: 'usr-siswa-5',
    siswaNama: 'Farhan Maulana',
    kelas: 'XI-IPA 2',
    caseId: 'case-4',
    topikKasus: 'Pajak Miliarder Luar Angkasa untuk Subsidi Iklim',
    materiJudul: 'Bab 7: Dilema Eksplorasi Luar Angkasa Komersial vs Restorasi Bumi',
    jawabanTeks: 'Pajak penerbangan roket komersial harus diterapkan karena atmosfer bumi merupakan milik bersama seluruh umat manusia. Uang pajak tersebut dapat dialokasikan langsung untuk mitigasi krisis iklim di wilayah pesisir yang terancam tenggelam.',
    skor: 78,
    statusKetepatan: 'Perlu Penguatan Bukti',
    feedback: 'Prinsip keadilan lingkungan (environmental justice) disampaikan dengan jelas. Namun, perlu diperkuat dengan analisis dampak terhadap inovasi riset sains luar angkasa dan mekanisme regulasi fiskal antarnegara.',
    penjelasanKonsep: 'Tragedy of the Commons dan prinsip "Polluter Pays" dalam hukum lingkungan internasional: aktivitas komersial berkadar emisi tinggi wajib menginternalisasi biaya eksternalitas lingkungan tanpa mematikan insentif riset masa depan.',
    durasiPengerjaan: '01:45',
    tanggal: '2026-09-24 11:15'
  },
  {
    id: 'eval-5',
    siswaId: 'usr-siswa-1',
    siswaNama: 'Jason Pratama',
    kelas: 'XI-IPA 2',
    caseId: 'case-2',
    topikKasus: 'Hak Cipta Esai Buatan AI: Milik Siswa atau Pengembang Algoritma?',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    jawabanTeks: 'Hak cipta semestinya tetap berada di tangan siswa jika proses kurasi dan sintesis intelektualnya nyata, namun penghargaan lomba wajib mencantumkan label karya hibrida. Kamera adalah alat bagi fotografer; begitu juga AI bagi penulis yang memiliki arah visi orisinal.',
    skor: 89,
    statusKetepatan: 'Sangat Kritis & Konstruktif',
    feedback: 'Analogi fotografi yang digunakan sangat relevan dan memperjelas batas antara alat bantu vs subjek pencipta. Pengutaraan transparansi atribusi karya memperlihatkan kematangan etika ilmiah.',
    penjelasanKonsep: 'Doktrin "Human Authorship Requirement" dalam hak kekayaan intelektual menetapkan bahwa perlindungan hak cipta mensyaratkan adanya kontribusi kreatif manusia yang substansial dalam memandu, memilih, dan menyusun luaran alat generatif.',
    durasiPengerjaan: '01:14',
    tanggal: '2026-09-20 14:35'
  }
];

export const INITIAL_FORUM_POSTS = [
  {
    id: 'fp-1',
    materiId: 'mat-1',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    kategori: 'Pendidikan & Teknologi',
    judul: 'Etika Ujian Berbasis AI: Apakah Penilaian Perlu Beralih dari Teks Akhir ke Logika Prompt?',
    penulisNama: 'Nabila Putri',
    penulisRole: 'siswa',
    penulisAvatar: 'NP',
    isi: 'Berdasarkan studi kasus Bab 4 mengenai larangan vs integrasi AI, saya berpendapat bahwa melarang total penggunaan AI pada ujian akhir adalah pendekatan yang kurang realistis. Mengapa sekolah tidak beralih menilai transparansi prompt dan kemampuan verifikasi fakta rujukan daripada sekadar menilai naskah akhir? Bagaimana rekan-rekan dan bapak/ibu guru memandang efektivitas metode ini?',
    tanggal: '25 Sep 2026, 09:30',
    likes: 8,
    comments: [
      {
        id: 'fpc-1',
        penulisNama: 'Dra. Sri Wahyuni, M.Pd.',
        penulisRole: 'pendamping',
        penulisAvatar: 'SW',
        isi: 'Pertanyaan yang sangat reflektif, Nabila. Namun dari kacamata pedagogis, jika siswa belum menguasai memori kerja konseptual dasar, bagaimana mereka dapat mendeteksi saat model AI mengalami halusinasi data? Evaluasi nalar dasar tetap butuh ruang mandiri.',
        tanggal: '25 Sep 2026, 10:15'
      },
      {
        id: 'fpc-2',
        penulisNama: 'Aisyah Maharani',
        penulisRole: 'siswa',
        penulisAvatar: 'AM',
        isi: 'Saya sepakat dengan Bu Sri. Format asesmen hibrida dua tahap mungkin adalah jalan tengah terbaik: tahap pertama menguji memori kerja murni tanpa gawai, tahap kedua menguji kolaborasi kritis dengan AI untuk studi kasus berskala besar.',
        tanggal: '25 Sep 2026, 11:05'
      }
    ]
  },
  {
    id: 'fp-2',
    materiId: 'mat-2',
    materiJudul: 'Bab 7: Dilema Eksplorasi Luar Angkasa Komersial vs Restorasi Bumi',
    kategori: 'Sosial & Ekologi',
    judul: 'Pajak Karbon Wisata Antariksa: Adilkah Mendanai Restorasi Ekologi Bumi dari Penerbangan Roket?',
    penulisNama: 'Farhan Maulana',
    penulisRole: 'siswa',
    penulisAvatar: 'FM',
    isi: 'Dalam materi Bab 7, kita membahas alokasi ratusan triliun rupiah untuk wisata luar angkasa swasta sementara pembiayaan transisi energi terbarukan global mengalami defisit. Apakah penerapan instrumen pajak 40% atas peluncuran komersial dapat menjadi preseden hukum lingkungan internasional yang adil?',
    tanggal: '24 Sep 2026, 14:20',
    likes: 5,
    comments: [
      {
        id: 'fpc-3',
        penulisNama: 'Jason Pratama',
        penulisRole: 'siswa',
        penulisAvatar: 'JP',
        isi: 'Sangat adil. Lapisan stratosfer adalah barang publik global (global commons). Kerusakan ozon atau jejak emisi roket ditanggung oleh seluruh populasi bumi, sehingga retribusi kompensasi iklim sudah sepatutnya diwajibkan.',
        tanggal: '24 Sep 2026, 15:02'
      },
      {
        id: 'fpc-4',
        penulisNama: 'Dra. Sri Wahyuni, M.Pd.',
        penulisRole: 'pendamping',
        penulisAvatar: 'SW',
        isi: 'Analisis yang menarik, Farhan dan Jason. Pastikan kalian juga mempertimbangkan bagaimana instrumen pajak tersebut tidak justru mematikan riset satelit penginderaan jauh yang selama ini krusial untuk memantau deforestasi hutan tropis kita.',
        tanggal: '24 Sep 2026, 16:30'
      }
    ]
  },
  {
    id: 'fp-3',
    materiId: 'mat-1',
    materiJudul: 'Bab 4: Etika Kecerdasan Buatan & Transformasi Kognitif Siswa',
    kategori: 'Hukum & Orisinalitas',
    judul: 'Hak Kekayaan Intelektual pada Karya Tulis Ilmiah yang Dikembangkan dengan Bantuan LLM',
    penulisNama: 'Budi Prakoso',
    penulisRole: 'siswa',
    penulisAvatar: 'BP',
    isi: 'Jika seorang siswa merumuskan hipotesis sendiri namun meminta AI menyusun parafrase kalimat dan struktur bab, di manakah garis batas orisinalitas karya ilmiah? Apakah transparansi metodologi cukup untuk menggantikan kekhawatiran dewan juri lomba?',
    tanggal: '24 Sep 2026, 08:45',
    likes: 6,
    comments: [
      {
        id: 'fpc-5',
        penulisNama: 'Zahra Amelia',
        penulisRole: 'siswa',
        penulisAvatar: 'ZA',
        isi: 'Standar akademik internasional saat ini (seperti IEEE dan APA) mewajibkan deklarasi peran alat AI pada bagian metodologi. Kuncinya ada pada akuntabilitas: siswa bertanggung jawab 100% atas kebenaran setiap kalimat yang tertulis.',
        tanggal: '24 Sep 2026, 09:20'
      }
    ]
  }
];

