# SPINSIGHT

> **Spin. Speak. Insight.**  
> Platform Web Pembelajaran Nalar Kritis & Berargumen Lisan Berbasis AI  
> **Lomba Web Development Internasional — RafaTech 2026 (UIN Raden Fatah Palembang)**  
> **Tema: APEX — AI Powered Experience for the Web**

---

## 📌 Ringkasan Proyek

Di kelas konvensional, saat guru bertanya hanya 3 siswa yang berani mengangkat tangan. **SPINSIGHT** mengubah dinamika kelas:
1. **Pilar 1 — Case Forge**: Guru mengunggah e-book materi pelajaran. AI mengekstraknya menjadi bank kasus studi berbasis Taksonomi Bloom (Analisis, Evaluasi, Kreasi) dengan estimasi waktu berpikir 60-120 detik.
2. **Pilar 2 — Spin Arena**: Siswa memutar roda kasus acak, diberi waktu berpikir spontan, dan merekam jawaban lisan langsung dari browser melalui native `MediaRecorder API`.
3. **Pilar 3 — Insight Panel**: AI mentranskrip ucapan siswa dan menyajikan evaluasi 3 kartu:
   - **Cermin Argumen**: Bedah struktur Klaim – Alasan – Bukti, deteksi *filler words*, kejelasan tutur, dan asumsi belum teruji.
   - **Fakta Terverifikasi**: Komparasi rujukan bereputasi (UNESCO, Garuda, Kemdikbud) bertanda *Menguatkan* atau *Menyanggah*.
   - **Trend & Fakta Unik**: Konteks perbincangan global terkini.
4. **Pilar 4 — Arena Diskusi Terkunci**: Gerbang forum baru terbuka setelah siswa punya opini sendiri (*Think-Pair-Share*). Transkrip lisan otomatis menjadi post pembuka, dipetakan dalam **Peta Posisi 2D Spektrum Nalar Kelas**, dengan balasan berlabel wajib (*Menguatkan, Menyanggah, Bertanya, Menambah Bukti*) serta AI Moderator.
5. **Jurnal Siswa & Telemetri**: Portofolio refleksi kognitif dengan grafik 5 dimensi nalar dari waktu ke waktu.

---

## 🎨 Desain Antarmuka

Mengacu pada bahasa visual resmi **Google Antigravity** (`https://antigravity.google/`):
- Tombol kapsul hitam solid (`border-radius: 9999px`)
- Sudut lengkung kartu besar (`border-radius: 28px - 32px`)
- Floating capsule navbar
- Kanvas bertekstur dot-matrix halus
- Tipografi monospaced technical tagging (`//`, `[ 01 ]`)

---

## 🚀 Menjalankan Aplikasi Secara Lokal

### Prasyarat
- Node.js (v18 ke atas disarankan)
- npm

### Instalasi & Menjalankan Dev Server
```bash
# 1. Masuk ke direktori proyek
cd spinsight

# 2. Pasang dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka peramban di:
```bash
http://localhost:3000/
```

### Build Produksi
```bash
npm run build
```

---

## 🏛️ Struktur Direktori

```
spinsight/
├── src/
│   ├── components/
│   │   └── Navbar.jsx              # Floating capsule navigation bar
│   ├── context/
│   │   └── AppContext.jsx          # State manajemen siklus tertutup
│   ├── data/
│   │   └── seedData.js             # Data awal materi, kasus, dan telemetri
│   ├── pages/
│   │   ├── LandingPage.jsx         # Landing page & demo roda publik
│   │   ├── DashboardPendamping.jsx # Pilar 1: Case Forge modul guru
│   │   ├── SpinArena.jsx           # Pilar 2 & 3: Roda, rekam, Insight Panel
│   │   ├── ArenaPage.jsx           # Pilar 4: Forum terkunci & Peta Posisi 2D
│   │   └── JurnalSiswa.jsx         # Jurnal reflektif 5 dimensi nalar
│   ├── services/
│   │   └── aiService.js            # Engine ekstraksi kasus, Cermin Argumen, RAG
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Sistem token Google Antigravity
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛡️ Etika & Privasi
- **Minimalisasi Data**: Audio dihapus seketika setelah transkripsi selesai di browser siswa.
- **Anti-Klaim Kebenaran Tunggal**: AI tidak pernah memvonis "jawaban benar atau salah", melainkan menyajikan perspektif komparatif dari rujukan ilmiah.
- **Transparansi Rujukan**: Sumber data dibatasi pada whitelist domain akademik resmi.
