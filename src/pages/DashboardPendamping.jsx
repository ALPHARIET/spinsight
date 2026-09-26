import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  BookOpen, 
  CheckSquare, 
  RotateCw, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  X, 
  Clock, 
  Sparkles, 
  FileText, 
  Check, 
  Lock, 
  Unlock, 
  MessageSquare, 
  TrendingUp,
  BarChart3,
  BookMarked
} from 'lucide-react';

export const DashboardPendamping = () => {
  const { 
    currentUser,
    materials, 
    cases, 
    evaluationRecords,
    addTeachingMaterial,
    toggleCaseActive, 
    deleteCase, 
    updateCase,
    closeDiscussionRoom,
    closedRooms,
    teacherTab,
    setTeacherTab
  } = useApp();

  // Tab state synced with context or internal fallback
  const activeTab = teacherTab || 'rekap_ai';
  const setActiveTab = setTeacherTab;

  // Form State for Adding Teaching Material
  const [judulBuku, setJudulBuku] = useState('');
  const [fileInputName, setFileInputName] = useState('');
  const [sampleText, setSampleText] = useState('');
  const [deskripsiMateri, setDeskripsiMateri] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState('');

  // Editing Case State
  const [editingCaseId, setEditingCaseId] = useState(null);
  const [editFields, setEditFields] = useState({ judulKasus: '', teksKasus: '', levelBloom: 'Analisis', durasi: 60 });

  // Adding New Case Quick Modal
  const [isAddingCase, setIsAddingCase] = useState(false);
  const [newCaseFields, setNewCaseFields] = useState({
    judulKasus: '',
    teksKasus: '',
    kategori: 'Etika AI & Teknologi',
    levelBloom: 'Analisis',
    durasi: 60
  });

  // Evaluation Table Filter & Search State
  const [searchStudent, setSearchStudent] = useState('');
  const [filterMaterial, setFilterMaterial] = useState('Semua');
  const [filterScoreRange, setFilterScoreRange] = useState('Semua');

  // Detail Modal State for Student Evaluation
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);

  // Upload Material & Auto-generate Cases
  const handleUploadAndGenerate = async (e) => {
    e.preventDefault();
    if (!judulBuku.trim()) {
      alert('Mohon masukkan judul materi pelajaran atau bab modul!');
      return;
    }

    setIsGenerating(true);
    setNotification('Memproses bahan ajar dan merumuskan kartu studi kasus AI...');

    try {
      const res = await addTeachingMaterial({
        judul: judulBuku,
        deskripsi: deskripsiMateri || 'Materi pembelajaran kurikulum aktif dengan ekstraksi kasus.',
        fileName: fileInputName || 'modul_materi_ajar.pdf',
        fileSize: '2.1 MB',
        textSample: sampleText,
        autoGenerate: true
      });
      setNotification(`Berhasil menambahkan bahan ajar "${res.material.judul}" dan merumuskan ${res.generatedCases.length} studi kasus baru.`);
      setJudulBuku('');
      setFileInputName('');
      setSampleText('');
      setDeskripsiMateri('');
    } catch (err) {
      setNotification('Gagal memproses materi pelajaran.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setNotification(''), 6000);
    }
  };

  // Case Editing
  const handleStartEdit = (c) => {
    setEditingCaseId(c.id);
    setEditFields({
      judulKasus: c.judulKasus,
      teksKasus: c.teksKasus,
      levelBloom: c.levelBloom,
      durasi: c.durasi
    });
  };

  const handleSaveEdit = (id) => {
    updateCase(id, editFields);
    setEditingCaseId(null);
  };

  // Filtered Evaluations
  const filteredEvaluations = (evaluationRecords || []).filter((rec) => {
    const matchSearch = 
      rec.siswaNama.toLowerCase().includes(searchStudent.toLowerCase()) ||
      rec.topikKasus.toLowerCase().includes(searchStudent.toLowerCase());
    const matchMaterial = filterMaterial === 'Semua' || rec.materiJudul === filterMaterial;
    let matchScore = true;
    if (filterScoreRange === 'tinggi') matchScore = rec.skor >= 85;
    else if (filterScoreRange === 'sedang') matchScore = rec.skor >= 75 && rec.skor < 85;
    else if (filterScoreRange === 'bimbingan') matchScore = rec.skor < 75;

    return matchSearch && matchMaterial && matchScore;
  });

  // Calculate Statistics
  const totalStudents = 24; // demo class size
  const totalEvaluations = evaluationRecords?.length || 0;
  const avgScore = evaluationRecords?.length 
    ? (evaluationRecords.reduce((acc, r) => acc + (r.skor || 0), 0) / evaluationRecords.length).toFixed(1)
    : '88.2';
  const tuntasCount = (evaluationRecords || []).filter(r => (r.skor || 0) >= 75).length;
  const tuntasPct = totalEvaluations ? Math.round((tuntasCount / totalEvaluations) * 100) : 88;
  const activeCasesCount = cases.filter(c => c.aktif).length;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '1380px' }}>
        
        {/* ========================================================
            PAGE HEADER (SpinSight Unified Header)
           ======================================================== */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              marginBottom: '0.45rem',
              fontSize: '0.85rem',
              color: '#64748b',
              flexWrap: 'wrap'
            }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Portal Guru</span>
              <span style={{ color: '#cbd5e1', userSelect: 'none' }}>/</span>
              <span style={{ fontWeight: 600, color: '#0f172a' }}>
                Kelas 12-IPA 2 (SMA Cerdas Mandiri)
              </span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                color: '#059669', 
                fontWeight: 600,
                fontSize: '0.8rem'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                Semester Ganjil 2025/2026
              </span>
            </div>
            <h1 style={{ fontSize: '2.1rem', color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '0.35rem', fontWeight: 800 }}>
              Pusat Kendali Pembelajaran
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '680px', lineHeight: 1.55 }}>
              Kurasi studi kasus roda putar, pantau evaluasi penalaran lisan siswa, dan kelola sintesis diskusi kelas.
            </p>
          </div>

          {/* Quick Academic Card */}
          <div className="glass-panel" style={{
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-card-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PENDAMPING KELAS</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>
                {currentUser?.nama || 'Dra. Sri Wahyuni, M.Pd.'}
              </div>
            </div>
            <div style={{ height: '24px', width: '1px', background: '#e2e8f0' }} />
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SEMESTER</div>
              <div style={{ fontWeight: 600, color: '#2563eb', fontSize: '0.85rem' }}>
                Ganjil 2026
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            OVERVIEW KPI CARDS (SpinSight Unified Glass Cards)
           ======================================================== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Card 1: Rata-rata Skor */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Rata-rata Skor Kelas
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {avgScore}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>/ 100</span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#059669',
                background: '#ecfdf5',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                marginLeft: 'auto'
              }}>
                +4.2 pt
              </span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${avgScore}%`, height: '100%', background: '#2563eb', borderRadius: '9999px' }} />
            </div>
          </div>

          {/* Card 2: Ketuntasan KKM */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Ketuntasan KKM (≥ 75)
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle2 size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {tuntasPct}%
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({tuntasCount}/{totalEvaluations || 24} siswa)</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              {totalEvaluations - tuntasCount > 0 ? `${totalEvaluations - tuntasCount} siswa perlu penguatan nalar lisan` : 'Seluruh siswa telah tuntas KKM'}
            </p>
          </div>

          {/* Card 3: Total Evaluasi AI */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Jawaban Terkoreksi AI
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#faf5ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {totalEvaluations}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Respons Lisan</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#059669', margin: 0, fontWeight: 500 }}>
              100% transkrip dinilai otomatis tanpa rekap manual
            </p>
          </div>

          {/* Card 4: Studi Kasus Roda */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Studi Kasus Roda Putar
              </span>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <RotateCw size={18} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                {activeCasesCount}
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>/ {cases.length} Aktif</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
              Tampil live pada roda putar acak siswa
            </p>
          </div>
        </div>

        {/* ========================================================
            DASHBOARD WORKSPACE (Left Sidebar + Right Content Area)
           ======================================================== */}
        <div className="dashboard-grid-layout" style={{ marginBottom: '2.5rem' }}>

          {/* ========================================================
              LEFT SIDEBAR: MODUL KONTROL GURU
             ======================================================== */}
          <aside style={{
            position: 'sticky',
            top: '5.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignSelf: 'start'
          }}>
            {/* Sidebar Card */}
            <div className="glass-panel" style={{
              padding: '1.15rem',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              boxShadow: '0 4px 20px -4px rgba(15, 23, 42, 0.05)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.85rem',
                marginBottom: '0.75rem',
                borderBottom: '1px solid #f1f5f9'
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: '#64748b',
                  textTransform: 'uppercase'
                }}>
                  Modul Kontrol Guru
                </span>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#475569',
                  background: '#f1f5f9',
                  padding: '0.1rem 0.45rem',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}>
                  4 Modul
                </span>
              </div>

              {/* Sidebar Menu Items */}
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {[
                  { 
                    id: 'rekap_ai', 
                    label: 'Rekapitulasi AI', 
                    desc: 'Evaluasi nalar lisan siswa',
                    icon: <Award size={18} />, 
                    badge: evaluationRecords?.length 
                  },
                  { 
                    id: 'materi', 
                    label: 'Input Bahan Ajar', 
                    desc: 'AI Case Forge Generator',
                    icon: <BookOpen size={18} />, 
                    badge: materials?.length 
                  },
                  { 
                    id: 'bank_kasus', 
                    label: 'Bank Studi Kasus', 
                    desc: 'Kurasi kartu roda putar',
                    icon: <CheckSquare size={18} />, 
                    badge: cases?.length 
                  },
                  { 
                    id: 'moderasi', 
                    label: 'Moderasi Diskusi', 
                    desc: 'Forum & sintesis kelas',
                    icon: <MessageSquare size={18} /> 
                  }
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem 0.95rem',
                        borderRadius: '12px',
                        border: isActive ? '1px solid #0f172a' : '1px solid transparent',
                        background: isActive ? '#0f172a' : 'transparent',
                        color: isActive ? '#ffffff' : '#334155',
                        boxShadow: isActive ? '0 4px 14px rgba(15, 23, 42, 0.16)' : 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.18s ease',
                        width: '100%'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = '#f8fafc';
                          e.currentTarget.style.color = '#0f172a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#334155';
                        }
                      }}
                    >
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: isActive ? 'rgba(255, 255, 255, 0.16)' : '#f1f5f9',
                        color: isActive ? '#ffffff' : '#64748b'
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.35rem' }}>
                          <span style={{ 
                            fontSize: '0.88rem', 
                            fontWeight: isActive ? 700 : 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {item.label}
                          </span>
                          {item.badge !== undefined && (
                            <span style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '0.1rem 0.45rem',
                              borderRadius: '9999px',
                              background: isActive ? 'rgba(255, 255, 255, 0.22)' : '#e2e8f0',
                              color: isActive ? '#ffffff' : '#64748b'
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div style={{
                          fontSize: '0.72rem',
                          color: isActive ? 'rgba(255, 255, 255, 0.7)' : '#64748b',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginTop: '0.1rem'
                        }}>
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Quick Action & Live Status Widget */}
              <div style={{
                marginTop: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <button
                  onClick={() => setIsAddingCase(true)}
                  className="btn btn-sm btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.6rem',
                    fontSize: '0.82rem',
                    gap: '0.4rem',
                    borderRadius: '10px'
                  }}
                >
                  <Plus size={15} />
                  Tambah Kasus Cepat
                </button>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.75rem 0.85rem',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  lineHeight: 1.45
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 700, marginBottom: '0.25rem' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981' }} />
                    AI Auto-Scoring Live
                  </div>
                  Transkrip dinilai instan otomatis dengan rubrik taksonomi nalar.
                </div>
              </div>
            </div>
          </aside>

          {/* ========================================================
              RIGHT MAIN CONTENT AREA
             ======================================================== */}
          <main style={{ minWidth: 0 }}>
        {notification && (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-card-sm)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            fontSize: '0.9rem',
            fontWeight: 500
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>{notification}</span>
            </div>
            <button 
              onClick={() => setNotification('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#065f46' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* ========================================================
            TAB 1: REKAPITULASI EVALUASI SISWA (AI)
           ======================================================== */}
        {activeTab === 'rekap_ai' && (
          <div>
            {/* Search & Filter Controls */}
            <div className="glass-panel" style={{
              padding: '1.25rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {/* Search Bar */}
              <div style={{ position: 'relative', minWidth: '280px', flex: '1 1 300px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Cari nama siswa atau topik kasus..."
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                  className="input-text"
                  style={{ paddingLeft: '2.3rem' }}
                />
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                {/* Filter Materi */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Filter size={14} color="#64748b" />
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Materi:</span>
                  <select
                    value={filterMaterial}
                    onChange={(e) => setFilterMaterial(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.82rem',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Semua">Semua Materi Pelajaran</option>
                    {materials.map((m) => (
                      <option key={m.id} value={m.judul}>{m.judul}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Skor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Status Nilai:</span>
                  <select
                    value={filterScoreRange}
                    onChange={(e) => setFilterScoreRange(e.target.value)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '0.45rem 0.75rem',
                      fontSize: '0.82rem',
                      color: '#0f172a',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="tinggi">Sangat Baik (≥ 85)</option>
                    <option value="sedang">Tuntas KKM (75 - 84)</option>
                    <option value="bimbingan">Perlu Bimbingan (&lt; 75)</option>
                  </select>
                </div>

                {(searchStudent || filterMaterial !== 'Semua' || filterScoreRange !== 'Semua') && (
                  <button
                    onClick={() => {
                      setSearchStudent('');
                      setFilterMaterial('Semua');
                      setFilterScoreRange('Semua');
                    }}
                    className="btn btn-sm btn-secondary"
                    style={{ fontSize: '0.78rem' }}
                  >
                    Reset Filter
                  </button>
                )}
              </div>
            </div>

            {/* Table Container */}
            <div className="glass-panel" style={{ overflow: 'hidden' }}>
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700 }}>
                    Rekapitulasi Penilaian Nalar AI Siswa
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    Menampilkan {filteredEvaluations.length} dari total {evaluationRecords?.length} pengerjaan studi kasus
                  </p>
                </div>
              </div>

              {filteredEvaluations.length === 0 ? (
                <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center' }}>
                  <Award size={40} color="#cbd5e1" style={{ margin: '0 auto 0.75rem' }} />
                  <div style={{ fontWeight: 600, color: '#334155', marginBottom: '0.25rem' }}>
                    Tidak ada rekapan evaluasi yang sesuai filter
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Coba ganti kata kunci pencarian atau bersihkan filter di atas.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <th style={{ padding: '0.85rem 1.5rem', fontWeight: 700 }}>Siswa</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Topik Studi Kasus</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700, textAlign: 'center' }}>Skor Akhir</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Status KKM</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Dimensi Nalar</th>
                        <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Waktu</th>
                        <th style={{ padding: '0.85rem 1.5rem', fontWeight: 700, textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvaluations.map((rec) => {
                        const isTuntas = (rec.skor || 0) >= 75;
                        const isHigh = (rec.skor || 0) >= 85;
                        return (
                          <tr 
                            key={rec.id}
                            style={{ 
                              borderBottom: '1px solid #f1f5f9',
                              transition: 'background 0.15s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            {/* Siswa */}
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  background: '#eff6ff',
                                  color: '#2563eb',
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '1px solid #dbeafe'
                                }}>
                                  {rec.siswaNama.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <div style={{ fontWeight: 600, color: '#0f172a' }}>{rec.siswaNama}</div>
                                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{rec.siswaKelas || 'XI-IPA 2'}</div>
                                </div>
                              </div>
                            </td>

                            {/* Topik Kasus */}
                            <td style={{ padding: '1rem 1rem' }}>
                              <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '0.2rem', maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {rec.topikKasus}
                              </div>
                              <span className={`badge ${
                                rec.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                                rec.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                              }`}>
                                {rec.levelBloom || 'Analisis'}
                              </span>
                            </td>

                            {/* Skor Akhir */}
                            <td style={{ padding: '1rem 1rem', textAlign: 'center' }}>
                              <span style={{
                                display: 'inline-block',
                                fontSize: '1.05rem',
                                fontWeight: 800,
                                color: isHigh ? '#059669' : isTuntas ? '#2563eb' : '#d97706',
                                background: isHigh ? '#ecfdf5' : isTuntas ? '#eff6ff' : '#fffbeb',
                                border: `1px solid ${isHigh ? '#a7f3d0' : isTuntas ? '#bfdbfe' : '#fde68a'}`,
                                padding: '0.2rem 0.65rem',
                                borderRadius: 'var(--radius-pill)',
                                minWidth: '46px'
                              }}>
                                {rec.skor}
                              </span>
                            </td>

                            {/* Status KKM */}
                            <td style={{ padding: '1rem 1rem' }}>
                              {isTuntas ? (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  fontSize: '0.74rem',
                                  fontWeight: 600,
                                  color: '#059669',
                                  background: '#ecfdf5',
                                  border: '1px solid #a7f3d0',
                                  padding: '0.15rem 0.55rem',
                                  borderRadius: 'var(--radius-pill)'
                                }}>
                                  <CheckCircle2 size={12} /> Tuntas KKM
                                </span>
                              ) : (
                                <span style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  fontSize: '0.74rem',
                                  fontWeight: 600,
                                  color: '#d97706',
                                  background: '#fffbeb',
                                  border: '1px solid #fde68a',
                                  padding: '0.15rem 0.55rem',
                                  borderRadius: 'var(--radius-pill)'
                                }}>
                                  <AlertCircle size={12} /> Perlu Bimbingan
                                </span>
                              )}
                            </td>

                            {/* Dimensi Nalar */}
                            <td style={{ padding: '1rem 1rem' }}>
                              <div style={{ display: 'flex', gap: '0.35rem', fontSize: '0.72rem' }}>
                                <span style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#475569' }}>
                                  Klaim: {rec.dimensi?.kejelasanKlaim || 85}
                                </span>
                                <span style={{ background: '#f1f5f9', padding: '0.1rem 0.4rem', borderRadius: '4px', color: '#475569' }}>
                                  Bukti: {rec.dimensi?.ketajamanBukti || 82}
                                </span>
                              </div>
                            </td>

                            {/* Waktu */}
                            <td style={{ padding: '1rem 1rem', fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                              {rec.waktu ? new Date(rec.waktu).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Hari ini'}
                            </td>

                            {/* Aksi */}
                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                              <button
                                onClick={() => setSelectedEvaluation(rec)}
                                className="btn btn-sm btn-secondary"
                                style={{
                                  fontSize: '0.78rem',
                                  gap: '0.35rem',
                                  padding: '0.35rem 0.75rem'
                                }}
                              >
                                <Eye size={13} />
                                Lihat Detail AI
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: INPUT BAHAN AJAR & MODUL (CASE FORGE)
           ======================================================== */}
        {activeTab === 'materi' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.1fr)',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            {/* Form Input Bahan Ajar */}
            <div className="glass-panel" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700 }}>
                    Input Modul & Bahan Ajar
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                    Otomatisasi perumusan kartu studi kasus dengan AI Case Forge
                  </p>
                </div>
              </div>

              <form onSubmit={handleUploadAndGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Judul Materi / Bab Pelajaran *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Etika Kecerdasan Buatan & Privasi Data Medis"
                    value={judulBuku}
                    onChange={(e) => setJudulBuku(e.target.value)}
                    className="input-text"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Deskripsi Singkat / Capaian Pembelajaran
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Menganalisis dilema etis algoritma diagnosa mandiri."
                    value={deskripsiMateri}
                    onChange={(e) => setDeskripsiMateri(e.target.value)}
                    className="input-text"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Catatan Kasus / Bahan Bacaan Referensi
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Tuliskan intisari materi, kutipan artikel, atau dilema nyata yang ingin dijadikan studi kasus oleh siswa..."
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    className="textarea-custom"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px dashed #cbd5e1',
                  borderRadius: '10px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.25rem' }}>
                    File Modul / Silabus (Opsional)
                  </div>
                  <input
                    type="text"
                    placeholder="Nama file pendukung (misal: Bab-3-Bioetika.pdf)"
                    value={fileInputName}
                    onChange={(e) => setFileInputName(e.target.value)}
                    className="input-text"
                    style={{ fontSize: '0.82rem', textAlign: 'center' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }}
                >
                  {isGenerating ? (
                    <>
                      <RotateCw size={16} className="animate-spin" />
                      Memproses Bahan Ajar...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} color="#60a5fa" />
                      Simpan & Rumuskan Kasus AI
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Daftar Bahan Ajar Terdaftar */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <h3 style={{ fontSize: '1.05rem', color: '#0f172a', fontWeight: 700 }}>
                  Koleksi Bahan Ajar Terdaftar ({materials.length})
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {materials.map((m) => {
                  const derivedCases = cases.filter(c => c.materiId === m.id);
                  return (
                    <div 
                      key={m.id} 
                      className="glass-card" 
                      style={{ padding: '1.25rem' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              color: '#2563eb',
                              background: '#eff6ff',
                              padding: '0.1rem 0.5rem',
                              borderRadius: 'var(--radius-pill)'
                            }}>
                              Modul Aktif
                            </span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                              {m.fileName || 'Silabus Digital'}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                            {m.judul}
                          </h4>
                        </div>

                        <span style={{
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-pill)'
                        }}>
                          {derivedCases.length} Kasus
                        </span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                        {m.deskripsi}
                      </p>

                      {m.textSample && (
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          fontSize: '0.78rem',
                          color: '#64748b',
                          fontStyle: 'italic',
                          marginBottom: '0.75rem'
                        }}>
                          "{m.textSample.slice(0, 140)}..."
                        </div>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Dibuat: {m.tanggalDibuat || 'Semester Ini'}</span>
                        <span style={{ color: '#059669', fontWeight: 600 }}>Tersinkronisasi</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: BANK & KURASI STUDI KASUS (RODA PUTAR)
           ======================================================== */}
        {activeTab === 'bank_kasus' && (
          <div>
            {/* Guidance Banner */}
            <div className="glass-panel" style={{
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderLeft: '4px solid #2563eb'
            }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                  Kurasi Roda Putar (Spin Wheel Siswa)
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '780px' }}>
                  Sebagai guru, Anda memegang kendali penuh. Kartu kasus dengan status <strong>Aktif di Roda</strong> adalah yang akan muncul dan diacak pada roda putar siswa. Nonaktifkan kasus yang tidak ingin diujikan pada sesi ini.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid #a7f3d0'
                }}>
                  {cases.filter(c => c.aktif).length} Kasus Aktif di Roda
                </span>
                <button
                  onClick={() => setIsAddingCase(true)}
                  className="btn btn-sm btn-primary"
                  style={{ gap: '0.35rem' }}
                >
                  <Plus size={15} />
                  Tambah Kasus
                </button>
              </div>
            </div>

            {/* Grid of Cases */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: '1.25rem'
            }}>
              {cases.map((c) => {
                const isEditing = editingCaseId === c.id;
                return (
                  <div 
                    key={c.id} 
                    className="glass-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: c.aktif ? '1px solid #cbd5e1' : '1px dashed #cbd5e1',
                      background: c.aktif ? '#ffffff' : '#fafafa',
                      opacity: c.aktif ? 1 : 0.8
                    }}
                  >
                    <div>
                      {/* Top Header Card: Toggle & Badges */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem'
                      }}>
                        {/* Status Toggle Switch */}
                        <button
                          onClick={() => toggleCaseActive(c.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.45rem',
                            background: c.aktif ? '#ecfdf5' : '#f1f5f9',
                            color: c.aktif ? '#059669' : '#64748b',
                            border: `1px solid ${c.aktif ? '#a7f3d0' : '#e2e8f0'}`,
                            padding: '0.2rem 0.65rem',
                            borderRadius: 'var(--radius-pill)',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                          title="Klik untuk mengubah aktivasi pada Roda Putar"
                        >
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: c.aktif ? '#10b981' : '#94a3b8'
                          }} />
                          {c.aktif ? 'Aktif di Roda' : 'Nonaktif'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span className={`badge ${
                            c.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                            c.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                          }`}>
                            {c.levelBloom || 'Analisis'}
                          </span>
                          <span style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            color: '#475569',
                            background: '#f1f5f9',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 'var(--radius-pill)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <Clock size={11} />
                            {c.durasi}s
                          </span>
                        </div>
                      </div>

                      {/* Content or Edit Form */}
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                          <input
                            type="text"
                            value={editFields.judulKasus}
                            onChange={(e) => setEditFields({ ...editFields, judulKasus: e.target.value })}
                            className="input-text"
                            style={{ fontSize: '0.88rem', fontWeight: 600 }}
                          />
                          <textarea
                            rows={4}
                            value={editFields.teksKasus}
                            onChange={(e) => setEditFields({ ...editFields, teksKasus: e.target.value })}
                            className="textarea-custom"
                            style={{ fontSize: '0.82rem' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <select
                              value={editFields.levelBloom}
                              onChange={(e) => setEditFields({ ...editFields, levelBloom: e.target.value })}
                              style={{ flex: 1, padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                            >
                              <option value="Analisis">Analisis</option>
                              <option value="Evaluasi">Evaluasi</option>
                              <option value="Kreasi">Kreasi</option>
                            </select>
                            <select
                              value={editFields.durasi}
                              onChange={(e) => setEditFields({ ...editFields, durasi: Number(e.target.value) })}
                              style={{ flex: 1, padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                            >
                              <option value={60}>60 detik</option>
                              <option value={120}>120 detik</option>
                              <option value={180}>180 detik</option>
                            </select>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                            <button 
                              onClick={() => handleSaveEdit(c.id)}
                              className="btn btn-sm btn-primary"
                              style={{ flex: 1 }}
                            >
                              <Check size={13} /> Simpan
                            </button>
                            <button 
                              onClick={() => setEditingCaseId(null)}
                              className="btn btn-sm btn-secondary"
                              style={{ flex: 1 }}
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.45rem', lineHeight: 1.35 }}>
                            {c.judulKasus}
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                            {c.teksKasus}
                          </p>

                          {c.kunciKonsep && (
                            <div style={{
                              background: '#f8fafc',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              padding: '0.55rem 0.75rem',
                              fontSize: '0.76rem',
                              color: '#64748b',
                              marginBottom: '1rem'
                            }}>
                              <strong style={{ color: '#334155' }}>Target Nalar:</strong> {c.kunciKonsep}
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Actions Footer */}
                    {!isEditing && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid #f1f5f9',
                        marginTop: '0.5rem'
                      }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          ID: {c.id}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => handleStartEdit(c)}
                            className="btn btn-sm btn-secondary"
                            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                            title="Edit redaksi atau level studi kasus"
                          >
                            <Edit3 size={12} />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus studi kasus "${c.judulKasus}"?`)) {
                                deleteCase(c.id);
                              }
                            }}
                            className="btn btn-sm btn-danger"
                            style={{ padding: '0.25rem 0.55rem', fontSize: '0.75rem' }}
                            title="Hapus kasus dari bank data"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: MODERASI FORUM & SINTESIS KELAS
           ======================================================== */}
        {activeTab === 'moderasi' && (
          <div>
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <MessageSquare size={22} color="#2563eb" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  Kontrol Moderasi & Sintesis Nalar Kolektif
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '780px', margin: 0 }}>
                Setelah siswa selesai berdebat pada Arena, Anda dapat menutup sesi diskusi untuk memicu perumusan <strong>Sintesis AI Kelas</strong>. Sintesis ini merangkum polaritas pandangan siswa dan kesimpulan reflektif bersama.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cases.map((c) => {
                const isClosed = closedRooms[c.id];
                return (
                  <div key={c.id} className="glass-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            padding: '0.15rem 0.55rem',
                            borderRadius: 'var(--radius-pill)',
                            background: isClosed ? '#fef2f2' : '#ecfdf5',
                            color: isClosed ? '#dc2626' : '#059669',
                            border: `1px solid ${isClosed ? '#fecaca' : '#a7f3d0'}`
                          }}>
                            {isClosed ? <Lock size={12} /> : <Unlock size={12} />}
                            {isClosed ? 'Diskusi Ditutup Guru' : 'Diskusi Terbuka (Live)'}
                          </span>
                          <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>{c.id}</span>
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                          {c.judulKasus}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                          {c.teksKasus.slice(0, 180)}...
                        </p>
                      </div>

                      <button
                        onClick={() => closeDiscussionRoom(c.id)}
                        className={`btn btn-sm ${isClosed ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ whiteSpace: 'nowrap' }}
                      >
                        {isClosed ? (
                          <>
                            <Unlock size={14} /> Buka Kembali Ruang
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} color="#60a5fa" /> Tutup Diskusi & Buat Sintesis AI
                          </>
                        )}
                      </button>
                    </div>

                    {isClosed && (
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        marginTop: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <Sparkles size={16} color="#7c3aed" />
                          <h5 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                            Sintesis Nalar Kelas Dihasilkan oleh AI
                          </h5>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                          "Mayoritas siswa (68%) sepakat bahwa transparansi data adalah fondasi utama keputusan klinis, sementara 32% lainnya menggarisbawahi perlunya pengawasan manual oleh komite etik kedokteran untuk memitigasi bias algoritma."
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
          </main>
        </div>

        {/* ========================================================
            MODAL: DETAIL EVALUASI AI SISWA
           ======================================================== */}
        {selectedEvaluation && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '740px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              padding: '2rem',
              background: '#ffffff'
            }}>
              {/* Header Modal */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      background: '#eff6ff',
                      color: '#2563eb',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 'var(--radius-pill)'
                    }}>
                      Laporan Audit AI
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      NISN: 00742189 • {selectedEvaluation.siswaKelas || 'XI-IPA 2'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedEvaluation.siswaNama}
                  </h3>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    Topik Kasus: <strong>{selectedEvaluation.topikKasus}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>SKOR AKHIR</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: selectedEvaluation.skor >= 75 ? '#059669' : '#d97706' }}>
                      {selectedEvaluation.skor} <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 100</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEvaluation(null)}
                    style={{
                      background: '#f1f5f9',
                      border: 'none',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#64748b'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Transkrip Lisan Siswa */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={15} color="#2563eb" />
                  Transkrip Jawaban Lisan Siswa:
                </h4>
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1rem',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: '#1e293b',
                  fontStyle: 'italic'
                }}>
                  "{selectedEvaluation.jawabanSiswa || 'Klaim utama saya adalah algoritma AI tidak boleh dibiarkan mengambil keputusan akhir tanpa verifikasi dokter, karena tanggung jawab medis berada pada profesional bersertifikat, bukan pada kode komputasi.'}"
                </div>
              </div>

              {/* Rubrik Penilaian Dimensi */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Award size={15} color="#7c3aed" />
                  Breakdown Rubrik 5 Dimensi Nalar Lisan:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                  {[
                    { label: 'Klaim Pokok', score: selectedEvaluation.dimensi?.kejelasanKlaim || 88 },
                    { label: 'Kekuatan Alasan', score: selectedEvaluation.dimensi?.kekuatanAlasan || 85 },
                    { label: 'Ketajaman Bukti', score: selectedEvaluation.dimensi?.ketajamanBukti || 82 },
                    { label: 'Kelancaran Lisan', score: selectedEvaluation.dimensi?.kelancaranLisan || 90 },
                    { label: 'Kemandirian Nalar', score: selectedEvaluation.dimensi?.kemandirianNalar || 86 }
                  ].map((dim, i) => (
                    <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{dim.label}</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>{dim.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feedback Analisis AI */}
              <div style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
                  <Sparkles size={16} color="#2563eb" />
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e40af', margin: 0 }}>
                    Evaluasi Otomatis & Rekomendasi AI
                  </h4>
                </div>
                <div style={{ fontSize: '0.86rem', color: '#1e3a8a', lineHeight: 1.6 }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>Kekuatan Nalar:</strong> Siswa menyampaikan premis kausalitas dengan sangat runtut dan artikulatif. Diksi argumentatif lugas tanpa kata jeda berlebihan.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Rekomendasi Tindak Lanjut:</strong> Perlu bimbingan dalam menyertakan referensi regulasi konkret (misal: UU PDP atau standar keselamatan ISO AI Medis) guna memperkokoh validitas klaim.
                  </p>
                </div>
              </div>

              {/* Footer Modal */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button
                  onClick={() => setSelectedEvaluation(null)}
                  className="btn btn-secondary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
                >
                  Tutup Laporan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: TAMBAH KASUS CEPAT
           ======================================================== */}
        {isAddingCase && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '560px',
              padding: '2rem',
              borderRadius: '20px',
              background: '#ffffff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  Tambah Studi Kasus Roda Putar
                </h3>
                <button
                  onClick={() => setIsAddingCase(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Judul Studi Kasus *
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Dilema Mobil Otonom & Kereta Rem Blong"
                    value={newCaseFields.judulKasus}
                    onChange={(e) => setNewCaseFields({ ...newCaseFields, judulKasus: e.target.value })}
                    className="input-text"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                    Teks Skenario Kasus *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Jelaskan skenario dilema etis, teknis, atau filosofis yang harus dipecahkan siswa secara lisan..."
                    value={newCaseFields.teksKasus}
                    onChange={(e) => setNewCaseFields({ ...newCaseFields, teksKasus: e.target.value })}
                    className="textarea-custom"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Level Kognitif Bloom
                    </label>
                    <select
                      value={newCaseFields.levelBloom}
                      onChange={(e) => setNewCaseFields({ ...newCaseFields, levelBloom: e.target.value })}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    >
                      <option value="Analisis">Analisis</option>
                      <option value="Evaluasi">Evaluasi</option>
                      <option value="Kreasi">Kreasi</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
                      Durasi Waktu Berpikir
                    </label>
                    <select
                      value={newCaseFields.durasi}
                      onChange={(e) => setNewCaseFields({ ...newCaseFields, durasi: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    >
                      <option value={60}>60 Detik</option>
                      <option value={120}>120 Detik</option>
                      <option value={180}>180 Detik</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      if (!newCaseFields.judulKasus || !newCaseFields.teksKasus) {
                        alert('Mohon isi judul dan skenario kasus!');
                        return;
                      }
                      // Use updateCase or add case
                      updateCase(`case-${Date.now()}`, {
                        ...newCaseFields,
                        id: `case-${Date.now()}`,
                        aktif: true,
                        kategori: 'Kurikulum Guru',
                        kunciKonsep: 'Analisis kritis & etika'
                      });
                      setIsAddingCase(false);
                      setNotification(`Berhasil menambahkan kartu kasus baru "${newCaseFields.judulKasus}" ke Roda Putar.`);
                      setNewCaseFields({ judulKasus: '', teksKasus: '', kategori: 'Etika AI & Teknologi', levelBloom: 'Analisis', durasi: 60 });
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1, padding: '0.65rem' }}
                  >
                    Simpan Kasus ke Roda
                  </button>
                  <button
                    onClick={() => setIsAddingCase(false)}
                    className="btn btn-secondary"
                    style={{ padding: '0.65rem 1.25rem' }}
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
