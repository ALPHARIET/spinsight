import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  RotateCw,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Users,
  Shield,
  Layers,
  BarChart2,
  BookMarked,
  GraduationCap,
  LogIn,
  Lock,
  User,
  X
} from 'lucide-react';
import { PromptSpinner } from '../components/PromptSpinner';

export const LandingPage = () => {
  const { cases, setActiveCaseId, materials, login } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('siswa'); // 'siswa' | 'pendamping'
  const [username, setUsername] = useState('jason.pratama');
  const [password, setPassword] = useState('spinsight2026');
  const [selectedStudentName, setSelectedStudentName] = useState('Jason Pratama');

  const gridRef = useRef(null);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (gridRef.current) {
          const x = e.clientX;
          const y = e.clientY;
          // Area pudar 0% (transparan penuh) sebesar 80px di sekitar kursor, lalu bertahap kembali normal
          const mask = `radial-gradient(circle 420px at ${x}px ${y}px, transparent 0%, transparent 80px, rgba(0, 0, 0, 0.15) 170px, rgba(0, 0, 0, 0.55) 290px, black 420px)`;
          gridRef.current.style.webkitMaskImage = mask;
          gridRef.current.style.maskImage = mask;
        }
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(animationFrameId);
      if (gridRef.current) {
        gridRef.current.style.webkitMaskImage = 'none';
        gridRef.current.style.maskImage = 'none';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === 'pendamping') {
      setUsername('guru.sriwahyuni');
      setPassword('guru2026');
    } else {
      setUsername('jason.pratama');
      setPassword('spinsight2026');
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'pendamping') {
      login('pendamping', 'Dra. Sri Wahyuni, M.Pd.');
    } else {
      login('siswa', selectedStudentName || 'Jason Pratama');
    }
  };

  const handleQuickStudentLogin = () => {
    login('siswa', 'Jason Pratama');
  };

  const handleQuickTeacherLogin = () => {
    login('pendamping', 'Dra. Sri Wahyuni, M.Pd.');
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Background Kotak-Kotak (Grid Pattern Modern - Fixed / Diam saat scroll & Pudar di dekat kursor) */}
      <div
        ref={gridRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `
            linear-gradient(to right, rgba(15, 23, 42, 0.055) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(15, 23, 42, 0.055) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Subtle Ambient Radial Highlight (Fixed) */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1000px',
        height: '550px',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* PUBLIC TOP NAVBAR (Sebelum Pengguna Login) */}
      <header style={{
        position: 'fixed',
        top: '0.85rem',
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 1rem',
        pointerEvents: 'none'
      }}>
        <nav style={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: '1200px',
          height: '3.6rem',
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.25rem'
        }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 4px rgba(15, 23, 42, 0.15)'
            }}>
              <RotateCw size={16} color="#ffffff" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.025em', color: '#0f172a' }}>
                SPINSIGHT
              </span>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b', background: '#f1f5f9', padding: '0.12rem 0.55rem', borderRadius: '9999px' }}>
                Edu Platform
              </span>
            </div>
          </div>

          {/* Right Action Login Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={handleQuickStudentLogin}
              className="btn btn-sm btn-secondary"
              style={{ fontSize: '0.82rem', gap: '0.35rem' }}
              title="Masuk langsung sebagai Siswa (Demo Jason)"
            >
              <GraduationCap size={15} color="#2563eb" />
              Masuk Siswa
            </button>

            <button
              onClick={handleQuickTeacherLogin}
              className="btn btn-sm btn-primary"
              style={{ fontSize: '0.82rem', gap: '0.35rem' }}
              title="Masuk langsung sebagai Guru (Demo Dra. Sri Wahyuni)"
            >
              <BookOpen size={15} />
              Portal Guru
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="btn btn-sm btn-secondary"
              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
              title="Buka form login lengkap"
            >
              <LogIn size={14} />
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN HERO & SECTIONS */}
      <div className="page-wrapper" style={{ paddingTop: '6.5rem', position: 'relative', zIndex: 1 }}>
        <div className="container">
          {/* HERO SECTION */}
          <section style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '3.5rem', position: 'relative' }}>

            <h1 className="hero-title" style={{ maxWidth: '920px', margin: '0 auto 1.5rem' }}>
              Latih Nalar Kritis & Argumen Lisan<br />
              <span style={{ color: '#64748b' }}>Melalui Studi Kasus Nyata.</span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: '#475569',
              maxWidth: '720px',
              margin: '0 auto 2.25rem',
              lineHeight: 1.7,
              fontWeight: 400
            }}>
              Di kelas biasa, saat guru bertanya sering kali hanya segelintir siswa aktif berpendapat.
              <strong style={{ color: '#0f172a' }}> SpinSight </strong>
              mengubah dinamika kelas: bahan ajar guru diolah menjadi tantangan berpikir spontan,
              menguji sistematika argumen siswa, dan membuka ruang diskusi berbasis bukti.
            </p>

            {/* Direct Login Call to Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleQuickStudentLogin}
                className="btn btn-primary btn-lg"
                style={{ gap: '0.65rem' }}
              >
                <GraduationCap size={18} />
                Masuk sebagai Siswa
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleQuickTeacherLogin}
                className="btn btn-secondary btn-lg"
                style={{ gap: '0.55rem' }}
              >
                <BookOpen size={18} />
                Masuk Portal Guru
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn btn-secondary btn-lg"
                style={{ gap: '0.55rem' }}
              >
                <LogIn size={18} />
                Pilihan Akun Lain
              </button>
            </div>
          </section>

          {/* INTERACTIVE PROMPT REEL SPINNER PREVIEW */}
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{
                background: '#f1f5f9',
                padding: '0.25rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                color: '#475569',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'inline-block'
              }}>
                Simulasi Roda Putar
              </span>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', letterSpacing: '-0.025em' }}>
                Mekanik Putar Kasus Berpikir Spontan
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                Coba putar prompt di bawah ini untuk mengacak tantangan studi kasus nyata sebelum mulai berargumen.
              </p>
            </div>

            <PromptSpinner
              cases={cases}
              activeCaseId={cases[0]?.id}
              onSelectCase={(id) => {
                setActiveCaseId(id);
              }}
              onStartTimer={(caseItem) => {
                if (caseItem?.id) setActiveCaseId(caseItem.id);
                // When clicking start timer, log in as student to begin immediately!
                login('siswa', 'Jason Pratama');
              }}
              materials={materials}
            />
          </section>

          {/* SIKLUS BELAJAR 4 LANGKAH */}
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{
                background: '#f1f5f9',
                padding: '0.25rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                color: '#475569',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'inline-block'
              }}>
                Metodologi Pembelajaran
              </span>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', letterSpacing: '-0.025em' }}>
                Alur Pembelajaran Terstruktur
              </h2>
              <p style={{ color: '#64748b', maxWidth: '620px', margin: '0.4rem auto 0', fontSize: '0.95rem' }}>
                Setiap tahapan dirancang untuk melatih kedalaman nalar dari pemahaman konsep hingga adu argumentasi logis.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem'
            }}>
              {[
                {
                  step: '1',
                  title: 'Bahan Ajar & Modul',
                  subtitle: 'Kurasi Guru',
                  desc: 'Materi pelajaran diorganisasi menjadi bank kartu kasus berbasis Taksonomi Bloom (Analisis, Evaluasi, Kreasi).'
                },
                {
                  step: '2',
                  title: 'Putaran Kasus Acak',
                  subtitle: 'Spontanitas & Timer',
                  desc: 'Menghindari hafalan teks dengan memilih topik acak dilengkapi timer visual berpikir 60-120 detik.'
                },
                {
                  step: '3',
                  title: 'Penyampaian Argumen',
                  subtitle: 'Teks & Dikte Suara',
                  desc: 'Siswa merangkai opini secara tertulis atau menggunakan perekam suara native di peramban.'
                },
                {
                  step: '4',
                  title: 'Evaluasi & Refleksi',
                  subtitle: 'Rubrik & Diskusi',
                  desc: 'Mendapatkan umpan balik formatif instan mengenai klaim, alasan, dan bukti, lalu melanjutkan ke forum kelas.'
                }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '1.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    marginBottom: '1rem'
                  }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem', color: '#0f172a' }}>
                    {item.title}
                  </div>
                  <div style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.65rem' }}>
                    {item.subtitle}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: 1.55 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4 FITUR UTAMA */}
          <section style={{ marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{
                background: '#f1f5f9',
                padding: '0.25rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                color: '#475569',
                fontSize: '0.75rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                display: 'inline-block'
              }}>
                Fitur Terpadu
              </span>
              <h2 style={{ fontSize: '2rem', color: '#0f172a', letterSpacing: '-0.025em' }}>
                Fitur Utama SPINSIGHT
              </h2>
            </div>

            <div className="grid-2">
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#ffffff' }}>
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Dashboard & Bahan Ajar Guru</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Akses Guru & Fasilitator</span>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.1rem', lineHeight: 1.6 }}>
                  Guru mengelola bahan ajar, menyusun bank studi kasus, dan memantau rekapitulasi evaluasi nilai siswa dengan statistik ketuntasan real-time.
                </p>
                <button onClick={handleQuickTeacherLogin} className="btn btn-sm btn-secondary">
                  Buka Portal Guru →
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#ffffff' }}>
                    <RotateCw size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a' }}>Roda Putar & Asesmen Lisan</h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Aktivitas Siswa</span>
                  </div>
                </div>
                <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '1.1rem', lineHeight: 1.6 }}>
                  Siswa memutar studi kasus acak, diuji ketangkasan berpikir dengan timer, dan menuangkan opini melalui pengetikan teks atau dikte suara.
                </p>
                <button onClick={handleQuickStudentLogin} className="btn btn-sm btn-primary">
                  Coba Latihan Sekarang →
                </button>
              </div>
            </div>
          </section>

          {/* PRIVASI & ETIKA */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="glass-panel" style={{ padding: '2.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <Shield size={22} color="#0f172a" />
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a' }}>Komitmen Privasi & Integritas Akademik</h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                color: '#475569',
                fontSize: '0.88rem'
              }}>
                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.25rem' }}>Pemrosesan Suara Lokal</strong>
                  Audio transkripsi diproses di peramban siswa tanpa penyimpanan rekaman suara permanen di server.
                </div>
                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.25rem' }}>Objektivitas Rubrik</strong>
                  Penilaian difokuskan pada kekuatan bukti dan alur logika argumen siswa, bukan vonis dogmatis kebenaran tunggal.
                </div>
                <div>
                  <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.25rem' }}>Rujukan Terverifikasi</strong>
                  Sumber pembanding berakar dari literatur resmi dan kurikulum pendidikan terakreditasi.
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ========================================================
          FULL-WIDTH ANTIGRAVITY FOOTER (Membaur & Tanpa Pembatas)
         ======================================================== */}
      <footer style={{
        width: '100%',
        backgroundColor: 'transparent',
        borderTop: 'none',
        padding: '3rem clamp(1.5rem, 5vw, 4.5rem) 2.5rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Section: SpinSight Slogan (Center Aligned) */}
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 2.5vw, 2.35rem)',
            fontWeight: 700,
            color: '#0f172a',
            letterSpacing: '-0.03em',
            margin: '0 auto 0.4rem',
            lineHeight: 1.15
          }}>
            Nalar Kritis Dimulai di Sini.
          </h2>
          <p style={{
            fontSize: '0.92rem',
            color: '#64748b',
            margin: '0 auto',
            maxWidth: '560px',
            lineHeight: 1.55
          }}>
            Platform studi kasus interaktif, pengundian spontan bebas hafalan, dan evaluasi nalar lisan berstandar Bloom dengan kecerdasan buatan.
          </p>
        </div>

        {/* Middle Section: COLOSSAL MASSIVE "Spinsight" (Center Aligned & Unclipped) */}
        <div style={{
          width: '100%',
          maxWidth: '1360px',
          margin: '0 auto',
          marginTop: 'clamp(1rem, 2vw, 1.75rem)',
          marginBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          userSelect: 'none'
        }}>
          <svg
            viewBox="0 0 940 160"
            width="100%"
            height="auto"
            style={{ display: 'block', overflow: 'visible' }}
            aria-label="Spinsight"
          >
            <text
              x="50%"
              y="135"
              textAnchor="middle"
              fill="#0f172a"
              fontFamily="var(--font-display), 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontWeight="800"
              letterSpacing="-0.04em"
              fontSize="160"
            >
              Spinsight
            </text>
          </svg>
        </div>

        {/* Bottom Section: Spinsight + Academic Meta Links (Membaur Tanpa Garis Pembatas) */}
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.25rem',
          paddingTop: '1.5rem',
          borderTop: 'none'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <RotateCw size={13} color="#ffffff" />
            </div>
            <span style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em'
            }}>
              SPINSIGHT
            </span>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>•</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              RafaTech Educational Intelligence 2026
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1rem, 2.5vw, 2rem)',
            fontSize: '0.82rem',
            color: '#64748b',
            flexWrap: 'wrap'
          }}>
            <a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>Tentang SpinSight</a>
            <a href="#pilar" style={{ color: 'inherit', textDecoration: 'none' }}>Integritas AI</a>
            <a href="#workflow" style={{ color: 'inherit', textDecoration: 'none' }}>Privasi Data Siswa</a>
            <a href="#showcase" style={{ color: 'inherit', textDecoration: 'none' }}>Ketentuan Pembelajaran</a>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL POPUP */}
      {isLoginModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
            padding: '2rem',
            position: 'relative',
            border: '1px solid #E2E8F0'
          }}>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: '#F1F5F9',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#64748B'
              }}
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem'
              }}>
                <RotateCw size={18} color="#FFFFFF" />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                Masuk ke Spinsight
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '0.2rem' }}>
                Pilih peran Anda untuk melanjutkan ke portal pembelajaran.
              </p>
            </div>

            {/* Role Switcher */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.35rem',
              background: '#F1F5F9',
              padding: '0.25rem',
              borderRadius: '9999px',
              marginBottom: '1.25rem'
            }}>
              <button
                type="button"
                onClick={() => handleRoleChange('siswa')}
                className={`btn btn-sm ${selectedRole === 'siswa' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none', padding: '0.45rem', fontSize: '0.82rem' }}
              >
                <GraduationCap size={14} />
                Portal Siswa
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('pendamping')}
                className={`btn btn-sm ${selectedRole === 'pendamping' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none', padding: '0.45rem', fontSize: '0.82rem' }}
              >
                <BookOpen size={14} />
                Portal Guru
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleModalSubmit}>
              {selectedRole === 'siswa' && (
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                    PROFIL SISWA
                  </label>
                  <select
                    className="input-text"
                    value={selectedStudentName}
                    onChange={(e) => {
                      setSelectedStudentName(e.target.value);
                      setUsername(e.target.value.toLowerCase().replace(/\s+/g, '.'));
                    }}
                    style={{ background: '#ffffff', padding: '0.55rem 0.85rem' }}
                  >
                    <option value="Jason Pratama">Jason Pratama (XI-IPA 2)</option>
                    <option value="Nabila Putri">Nabila Putri (XI-IPA 2)</option>
                    <option value="Budi Prakoso">Budi Prakoso (XI-IPA 2)</option>
                    <option value="Aisyah Maharani">Aisyah Maharani (XI-IPA 2)</option>
                    <option value="Farhan Maulana">Farhan Maulana (XI-IPA 2)</option>
                    <option value="Zahra Amelia">Zahra Amelia (XI-IPA 2)</option>
                  </select>
                </div>
              )}

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                  {selectedRole === 'pendamping' ? 'NIP / EMAIL GURU' : 'NISN / USERNAME'}
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="text"
                    className="input-text"
                    style={{ paddingLeft: '2.2rem', padding: '0.55rem 0.85rem 0.55rem 2.2rem' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '0.3rem', fontSize: '0.75rem', fontWeight: 600, color: '#334155' }}>
                  KATA SANDI
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={14} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  <input
                    type="password"
                    className="input-text"
                    style={{ paddingLeft: '2.2rem', padding: '0.55rem 0.85rem 0.55rem 2.2rem' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
              >
                <LogIn size={15} />
                Masuk sebagai {selectedRole === 'pendamping' ? 'Guru' : 'Siswa'}
              </button>
            </form>

            {/* Quick 1-Click Access */}
            <div style={{
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem'
            }}>
              <button
                type="button"
                onClick={handleQuickTeacherLogin}
                className="btn btn-sm btn-secondary"
                style={{ justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#047857', color: '#fff', fontSize: '0.62rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>SW</span>
                  <strong>Guru Demo:</strong> Dra. Sri Wahyuni
                </span>
                <ArrowRight size={13} color="#64748B" />
              </button>

              <button
                type="button"
                onClick={handleQuickStudentLogin}
                className="btn btn-sm btn-secondary"
                style={{ justifyContent: 'space-between', padding: '0.5rem 0.85rem' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#fff', fontSize: '0.62rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>JP</span>
                  <strong>Siswa Demo:</strong> Jason Pratama
                </span>
                <ArrowRight size={13} color="#64748B" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
