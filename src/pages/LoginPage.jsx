import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCw, 
  GraduationCap, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck, 
  User, 
  Lock, 
  LogIn
} from 'lucide-react';

export const LoginPage = () => {
  const { login } = useApp();

  const [selectedRole, setSelectedRole] = useState('siswa'); // 'siswa' | 'pendamping'
  const [username, setUsername] = useState('jason.pratama');
  const [password, setPassword] = useState('spinsight2026');
  const [selectedStudentName, setSelectedStudentName] = useState('Jason Pratama');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'pendamping') {
      login('pendamping', 'Dra. Sri Wahyuni, M.Pd.');
    } else {
      login('siswa', selectedStudentName || 'Jason Pratama');
    }
  };

  const handleQuickLogin = (role, name) => {
    login(role, name);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.5rem',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            padding: '0.4rem 1rem',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            marginBottom: '1.25rem'
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
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              color: '#0f172a'
            }}>
              SPINSIGHT
            </span>
            <span style={{
              fontSize: '0.72rem',
              color: '#64748b',
              background: '#f1f5f9',
              padding: '0.12rem 0.5rem',
              borderRadius: '9999px',
              fontWeight: 600
            }}>
              Edu Platform
            </span>
          </div>

          <h1 style={{ fontSize: '1.9rem', color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '0.35rem' }}>
            Masuk ke Portal Belajar
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Silakan pilih peran untuk mengakses fitur yang sesuai.
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-panel" style={{ padding: '2.25rem', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)' }}>
          {/* Role Selection Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.35rem',
            background: '#f1f5f9',
            padding: '0.25rem',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '1.5rem'
          }}>
            <button
              type="button"
              onClick={() => handleRoleChange('siswa')}
              className={`btn btn-sm ${selectedRole === 'siswa' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', padding: '0.55rem', fontSize: '0.85rem' }}
            >
              <GraduationCap size={15} />
              Portal Siswa
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('pendamping')}
              className={`btn btn-sm ${selectedRole === 'pendamping' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', padding: '0.55rem', fontSize: '0.85rem' }}
            >
              <BookOpen size={15} />
              Portal Guru
            </button>
          </div>

          {/* Role Feature Note */}
          <div style={{
            background: selectedRole === 'pendamping' ? '#eff6ff' : '#f8fafc',
            border: selectedRole === 'pendamping' ? '1px solid #bfdbfe' : '1px solid #e2e8f0',
            borderRadius: 'var(--radius-card-sm)',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: selectedRole === 'pendamping' ? '#1e40af' : '#475569'
          }}>
            {selectedRole === 'pendamping' ? (
              <div>
                <strong>Akses Khusus Guru:</strong> Manajemen Bahan Ajar, Rekapitulasi Evaluasi Siswa Berbasis Rubrik, serta Kurasi Kasus.
              </div>
            ) : (
              <div>
                <strong>Akses Siswa:</strong> Roda Putar Kasus, Lembar Jawaban Teks & Dikte Suara, Evaluasi Formatif, Forum Diskusi, serta Jurnal.
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {selectedRole === 'siswa' && (
              <div style={{ marginBottom: '1.15rem' }}>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                  PILIH PROFIL SISWA
                </label>
                <select
                  className="input-text"
                  value={selectedStudentName}
                  onChange={(e) => {
                    setSelectedStudentName(e.target.value);
                    setUsername(e.target.value.toLowerCase().replace(/\s+/g, '.'));
                  }}
                  style={{ background: '#ffffff' }}
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

            <div style={{ marginBottom: '1.15rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                {selectedRole === 'pendamping' ? 'NIP ATAU EMAIL GURU' : 'NISN ATAU USERNAME'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  className="input-text"
                  style={{ paddingLeft: '2.4rem' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username/email"
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>
                KATA SANDI
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="password"
                  className="input-text"
                  style={{ paddingLeft: '2.4rem' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.92rem' }}
            >
              <LogIn size={15} />
              Masuk sebagai {selectedRole === 'pendamping' ? 'Guru' : 'Siswa'}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
              AKSES CEPAT DEMO (1-KLIK)
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => handleQuickLogin('pendamping', 'Dra. Sri Wahyuni, M.Pd.')}
                className="btn btn-sm btn-secondary"
                style={{ justifyContent: 'space-between', padding: '0.55rem 0.95rem', width: '100%' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#047857', color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>SW</div>
                  <strong style={{ fontSize: '0.82rem' }}>Guru:</strong> Dra. Sri Wahyuni, M.Pd.
                </span>
                <ArrowRight size={13} color="#64748b" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('siswa', 'Jason Pratama')}
                className="btn btn-sm btn-secondary"
                style={{ justifyContent: 'space-between', padding: '0.55rem 0.95rem', width: '100%' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#2563eb', color: '#fff', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>JP</div>
                  <strong style={{ fontSize: '0.82rem' }}>Siswa:</strong> Jason Pratama
                </span>
                <ArrowRight size={13} color="#64748b" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.78rem',
          color: '#64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem'
        }}>
          <ShieldCheck size={14} color="#059669" />
          <span>Privasi terlindungi: Pemrosesan audio transkripsi berlangsung di peramban lokal.</span>
        </div>
      </div>
    </div>
  );
};
