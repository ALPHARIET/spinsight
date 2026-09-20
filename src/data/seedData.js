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
