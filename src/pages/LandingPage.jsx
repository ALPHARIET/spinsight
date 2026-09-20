import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCw, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Layers, 
  ChevronRight, 
  BrainCircuit, 
  Users, 
  Shield,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LandingPage = () => {
  const { setActivePage, cases, setActiveCaseId } = useApp();

  const [spinning, setSpinning] = useState(false);
  const [selectedDemoCase, setSelectedDemoCase] = useState(cases[0]);
  const [rotation, setRotation] = useState(0);

  const spinDemoWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const extraRotations = 5 + Math.floor(Math.random() * 4);
    const targetIdx = Math.floor(Math.random() * cases.length);
    const degreesPerSlice = 360 / cases.length;
    const targetDeg = rotation + (extraRotations * 360) + (targetIdx * degreesPerSlice);

    setRotation(targetDeg);

    setTimeout(() => {
      setSpinning(false);
      setSelectedDemoCase(cases[targetIdx]);
      setActiveCaseId(cases[targetIdx].id);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 2800);
  };

  const ANTIGRAVITY_PALETTE = [
    '#18181b', // Solid Charcoal
    '#2563eb', // Clean Blue
    '#059669', // Emerald
    '#d97706', // Amber
    '#4b5563', // Slate
    '#7c3aed'  // Purple
  ];

  return (
    <div className="page-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        {/* HERO SECTION (Antigravity Style) */}
        <section style={{ textAlign: 'center', paddingTop: '2.5rem', paddingBottom: '4.5rem', position: 'relative' }}>
          {/* Monospace Pill Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
            <span className="mono-tag" style={{
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.08)',
              padding: '0.35rem 0.95rem',
              borderRadius: 'var(--radius-pill)',
              color: '#374151',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
              RAFA-TECH 2026 // THEME APEX : AI FOR THE WEB
            </span>
          </div>

          <h1 className="hero-title" style={{ maxWidth: '960px', margin: '0 auto 1.5rem' }}>
            Satu Putaran, Satu Argumen,<br />
            <span style={{ color: '#4b5563' }}>Satu Wawasan Baru.</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '740px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            fontWeight: 400
          }}>
            Di kelas biasa, saat guru bertanya hanya 3 siswa mengangkat tangan. 
            <strong style={{ color: '#111827' }}> SPINSIGHT </strong> 
            mengubah dinamika kelas: AI mengonversi modul ajar guru menjadi kartu tantangan nalar spontan, 
            menguji struktur argumen lisan siswa, dan membuka ruang debat berbasis bukti empiris.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActivePage('spin')} 
              className="btn btn-primary btn-lg"
              style={{ gap: '0.75rem' }}
            >
              <RotateCw size={18} />
              Mulai Putar Roda Kasus
              <ArrowRight size={17} />
            </button>

            <button 
              onClick={() => setActivePage('pendamping')} 
              className="btn btn-secondary btn-lg"
              style={{ gap: '0.75rem' }}
            >
              <BookOpen size={18} />
              Unggah Modul Guru (Case Forge)
            </button>
          </div>
        </section>

        {/* INTERACTIVE DEMO WHEEL SHOWCASE (28px Card) */}
        <section style={{ marginBottom: '5rem' }}>
          <div className="glass-panel" style={{ padding: '3rem 2.5rem', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span className="mono-tag" style={{
                background: '#f1f3f4',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                color: '#4b5563',
                marginBottom: '0.75rem',
                display: 'inline-block'
              }}>
                [ INTERACTIVE DEMO ]
              </span>
              <h2 style={{ fontSize: '2.2rem', color: '#111827', letterSpacing: '-0.03em' }}>
                Mekanik Putar Roda Kasus Spontan
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem' }}>
                Klik tombol putar untuk mengacak studi kasus nyata dari e-book guru sebelum siswa berpendapat.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'center'
            }}>
              {/* Visual Wheel */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Minimalist Needle Pointer */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  zIndex: 10,
                  width: 0,
                  height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderTop: '22px solid #000000',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                }} />

                <div style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 2.8s cubic-bezier(0.12, 0.9, 0.15, 1)' : 'none',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '6px solid #ffffff'
                }}>
                  {cases.map((c, i) => {
                    const angle = 360 / cases.length;
                    const rotate = i * angle;
                    return (
                      <div
                        key={c.id}
                        style={{
                          position: 'absolute',
                          width: '50%',
                          height: '50%',
                          top: 0,
                          right: 0,
                          transformOrigin: '0% 100%',
                          transform: `rotate(${rotate}deg) skewY(${90 - angle}deg)`,
                          background: ANTIGRAVITY_PALETTE[i % ANTIGRAVITY_PALETTE.length],
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                    );
                  })}
                  {/* Wheel center circle */}
                  <div style={{
                    position: 'absolute',
                    width: '64px',
                    height: '64px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 5,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <RotateCw size={22} color="#111827" />
                  </div>
                </div>

                <button
                  onClick={spinDemoWheel}
                  disabled={spinning}
                  className="btn btn-primary"
                  style={{ marginTop: '2rem', padding: '0.8rem 2.2rem' }}
                >
                  <RotateCw size={17} />
                  {spinning ? 'Mengacak Kasus...' : 'Putar Roda Kasus'}
                </button>
              </div>

              {/* Case Card Result (Antigravity High-Tech Card) */}
              <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <span className={`badge ${
                    selectedDemoCase.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                    selectedDemoCase.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                  }`}>
                    // {selectedDemoCase.levelBloom}
                  </span>
                  <span className="mono-tag" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Clock size={13} /> {selectedDemoCase.durasi}s Pikir
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.85rem', color: '#111827', letterSpacing: '-0.02em' }}>
                  {selectedDemoCase.judulKasus}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  {selectedDemoCase.teksKasus}
                </p>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {selectedDemoCase.kataKunci.map((k, i) => (
                    <span key={i} className="mono-tag" style={{ fontSize: '0.72rem', background: '#f8f9fa', padding: '0.2rem 0.55rem', border: '1px solid #e5e7eb' }}>
                      #{k}
                    </span>
                  ))}
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-card-sm)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Ingin menjawab dan uji nalar lisanmu sekarang?
                  </div>
                  <button
                    onClick={() => {
                      setActiveCaseId(selectedDemoCase.id);
                      setActivePage('spin');
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    Mulai Jawab Lisan <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSED LOOP LEARNING CYCLE (5 Steps) */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="mono-tag" style={{
              background: '#f1f3f4',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              color: '#4b5563',
              marginBottom: '0.75rem',
              display: 'inline-block'
            }}>
              [ ARCHITECTURE ]
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Siklus Belajar Tertutup
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0.5rem auto 0' }}>
              Output setiap fitur menjadi input fitur berikutnya. Tidak ada fitur yang bisa dicabut tanpa memutus rantai berpikir kritis siswa.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              {
                step: '01',
                title: 'Case Forge',
                subtitle: 'Eksplorasi E-Book',
                desc: 'AI mengekstrak modul milik guru menjadi bank kartu kasus Taksonomi Bloom.'
              },
              {
                step: '02',
                title: 'Spin & Timer',
                subtitle: 'Berpikir Spontan',
                desc: 'Mekanik roda mencegah bias hafalan dengan timer berpikir terukur 60/120 detik.'
              },
              {
                step: '03',
                title: 'Jawab Lisan',
                subtitle: 'Browser Native',
                desc: 'Merekam suara argumen siswa via MediaRecorder dan transkripsi bahasa Indonesia.'
              },
              {
                step: '04',
                title: 'Insight Panel',
                subtitle: 'Cermin Nalar & Fakta',
                desc: 'Evaluasi struktur Klaim-Alasan-Bukti serta komparasi jurnal ilmiah bereputasi.'
              },
              {
                step: '05',
                title: 'Arena Terkunci',
                subtitle: 'Peta Posisi Kelas',
                desc: 'Akses terbuka setelah siswa berpendapat, memvisualkan spektrum pemikiran sekelas.'
              }
            ].map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.75rem', border: '1px solid rgba(0,0,0,0.07)' }}>
                <div className="mono-tag" style={{
                  fontSize: '1.1rem',
                  color: '#9ca3af',
                  marginBottom: '0.75rem'
                }}>
                  // {item.step}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem', color: '#111827' }}>
                  {item.title}
                </div>
                <div className="mono-tag" style={{ color: '#4b5563', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                  {item.subtitle}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4 PILAR FITUR */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="mono-tag" style={{
              background: '#f1f3f4',
              padding: '0.3rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              color: '#4b5563',
              marginBottom: '0.75rem',
              display: 'inline-block'
            }}>
              [ FOUR PILLARS ]
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Empat Pilar Utama SPINSIGHT
            </h2>
          </div>

          <div className="grid-2">
            <div className="glass-panel" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '50%', background: '#000000', color: '#ffffff' }}>
                  <Layers size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>Pilar 1: Case Forge</h3>
                  <span className="mono-tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Materi Guru Sendiri, Bukan Soal Generik</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Guru mengunggah PDF modul kelas. AI mengekstrak konsep kunci menjadi kasus dilema berlabel Bloom (Analisis, Evaluasi, Kreasi) yang dapat dikurasi sebelum dirilis.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Parsing dokumen & chunking semantik terstruktur
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Estimasi durasi berpikir kontekstual 60-120 detik
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '50%', background: '#000000', color: '#ffffff' }}>
                  <RotateCw size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>Pilar 2: Spin Arena</h3>
                  <span className="mono-tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Berpikir Spontan Tanpa Hafalan</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Siswa memutar roda untuk mendapatkan studi kasus acak, dihadapkan timer visual, dan langsung merekam respons lisan menggunakan mikrofon peramban secara native.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Perekaman MediaRecorder murni tanpa server
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Transkripsi bahasa Indonesia dengan koreksi manual
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '50%', background: '#000000', color: '#ffffff' }}>
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>Pilar 3: Insight Panel</h3>
                  <span className="mono-tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cermin Nalar & Perspektif Terverifikasi</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Tiga kartu instan: Cermin Argumen (Klaim-Alasan-Bukti & filler detector), Fakta Terverifikasi dari sumber kredibel (UNESCO, Garuda), dan fakta unik pemantik nalar.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Bebas klaim kebenaran tunggal (Anti-dogmatis)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Identifikasi asumsi tak teruji secara objektif
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.65rem', borderRadius: '50%', background: '#000000', color: '#ffffff' }}>
                  <Users size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: '#111827' }}>Pilar 4: Arena Diskusi Terkunci</h3>
                  <span className="mono-tag" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Peta Posisi & Balasan Berlabel</span>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Forum terkunci sampai siswa selesai menjawab. Jawaban lisan otomatis menjadi post pembuka, divisualkan dalam Peta Posisi kutub kelas, dengan AI Moderator pendukung diskusi.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> Balasan wajib berlabel (Menguatkan / Menyanggah / Bertanya)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} color="#111827" /> AI Moderator Nudge untuk melengkapi penalaran
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ETIKA & KEDAULATAN DATA */}
        <section style={{ marginBottom: '5rem' }}>
          <div className="glass-panel" style={{ padding: '2.5rem', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <Shield size={24} color="#111827" />
              <h3 style={{ fontSize: '1.45rem', color: '#111827' }}>Komitmen Etika & Privasi Pembelajar</h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.75rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <div>
                <strong style={{ color: '#111827', display: 'block', marginBottom: '0.35rem' }}>Minimalisasi Data Suara</strong>
                Audio suara langsung dihapus setelah transkripsi selesai di sisi peramban siswa. Rekaman tidak disimpan di server tanpa persetujuan eksplisit.
              </div>
              <div>
                <strong style={{ color: '#111827', display: 'block', marginBottom: '0.35rem' }}>Anti-Klaim Kebenaran Tunggal</strong>
                Sistem tidak pernah memvonis "jawaban benar atau salah". AI hanya menyediakan komparasi bukti dari jurnal bereputasi untuk melatih kerendahan hati intelektual.
              </div>
              <div>
                <strong style={{ color: '#111827', display: 'block', marginBottom: '0.35rem' }}>Transparansi Rujukan Akademik</strong>
                Semua rujukan fakta dibatasi pada whitelist domain resmi (Kemdikbud, UNESCO, DOAJ, Garuda, Scopus).
              </div>
            </div>
          </div>
        </section>

        {/* WATERMARK FOOTER (Signature Antigravity Style) */}
        <footer style={{
          textAlign: 'center',
          paddingTop: '3rem',
          paddingBottom: '2rem',
          position: 'relative'
        }}>
          {/* Giant subtle watermark like antigravity.google */}
          <div style={{
            fontSize: '9vw',
            fontWeight: 900,
            color: 'rgba(0, 0, 0, 0.04)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)'
          }}>
            SPINSIGHT
          </div>

          <p className="mono-tag" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
            SPINSIGHT // RAFA-TECH 2026 // UIN RADEN FATAH PALEMBANG
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            "Di kelas, guru bertanya dan hanya tiga siswa yang mengangkat tangan. SPINSIGHT membuat semua siswa harus berpikir."
          </p>
        </footer>
      </div>
    </div>
  );
};
