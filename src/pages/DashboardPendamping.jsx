import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UploadCloud, 
  Sparkles, 
  BookOpen, 
  Check, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  FileText, 
  BarChart2, 
  Clock,
  Send
} from 'lucide-react';

export const DashboardPendamping = () => {
  const { 
    materials, 
    cases, 
    addMaterialAndGenerateCases, 
    toggleCaseActive, 
    deleteCase, 
    updateCase,
    closeDiscussionRoom,
    closedRooms
  } = useApp();

  const [judulBuku, setJudulBuku] = useState('');
  const [fileInputName, setFileInputName] = useState('');
  const [sampleText, setSampleText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState('');

  const [editingCaseId, setEditingCaseId] = useState(null);
  const [editFields, setEditFields] = useState({ judulKasus: '', teksKasus: '', levelBloom: 'Analisis', durasi: 60 });

  const handleUploadAndGenerate = async (e) => {
    e.preventDefault();
    if (!judulBuku.trim()) {
      alert('Mohon masukkan judul materi e-book!');
      return;
    }

    setIsGenerating(true);
    setNotification('AI sedang mem-parsing dokumen, chunking konsep, dan merumuskan kasus Taksonomi Bloom...');

    try {
      const generated = await addMaterialAndGenerateCases(
        judulBuku, 
        fileInputName || 'modul_materi_ajar.pdf', 
        sampleText
      );
      setNotification(`Berhasil mengekstrak ${generated.length} kartu kasus baru!`);
      setJudulBuku('');
      setFileInputName('');
      setSampleText('');
    } catch (err) {
      setNotification('Gagal mengekstrak materi.');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setNotification(''), 5000);
    }
  };

  const loadPreset = (topic) => {
    if (topic === 'ai') {
      setJudulBuku('Bab 5: Dilema Akuntabilitas Algoritma dan Integritas Siswa');
      setFileInputName('Modul_Etika_AI_Sekolah.pdf');
      setSampleText('Perdebatan antara pelarangan kalkulator di masa lalu dan pelarangan AI generatif di era sekarang. Keterampilan yang diuji bergeser dari retensi statis ke validasi dinamis.');
    } else {
      setJudulBuku('Bab 8: Bioetika Rekayasa Genetika & Ketahanan Pangan');
      setFileInputName('Biologi_Modern_Bab8.pdf');
      setSampleText('Tanaman transgenik tahan hama mampu melipatgandakan panen di wilayah rawan pangan, namun memicu kekhawatiran kepunahan varietas lokal.');
    }
  };

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

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Dashboard */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#111827' }}>
                // PILAR 1 : CASE FORGE
              </span>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>PENDAMPING / GURU</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Kurasi Modul & Bank Kasus
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ubah modul belajar milik guru menjadi bank kasus berpikir spontan dengan label Taksonomi Bloom.
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}>
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>KELAS AKTIF</div>
              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.92rem' }}>XI-IPA 2 (SMA Mandiri)</div>
            </div>
            <div style={{ height: '20px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>KODE GABUNG</div>
              <div style={{ fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#111827' }}>SPIN-2026</div>
            </div>
          </div>
        </div>

        {notification && (
          <div style={{
            background: '#f8f9fa',
            border: '1px solid rgba(0,0,0,0.1)',
            padding: '1rem',
            borderRadius: 'var(--radius-card-sm)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: '#111827'
          }}>
            <Sparkles size={16} />
            <span className="mono-tag" style={{ fontSize: '0.85rem' }}>{notification}</span>
          </div>
        )}

        {/* TOP SECTION: Upload & Statistik */}
        <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
          {/* Form Upload */}
          <div className="glass-panel" style={{ padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <UploadCloud size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#111827' }}>Unggah Modul Pembelajaran</h3>
                <span className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PDF / EPUB / TXT</span>
              </div>
            </div>

            <form onSubmit={handleUploadAndGenerate}>
              <div style={{ marginBottom: '1.15rem' }}>
                <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                  JUDUL MATERI / BAB:
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Contoh: Bab 4: Etika AI & Masa Depan Pendidikan"
                  value={judulBuku}
                  onChange={(e) => setJudulBuku(e.target.value)}
                  required
                />
              </div>

              <div style={{ marginBottom: '1.15rem' }}>
                <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                  FILE DOKUMEN:
                </label>
                <div style={{
                  border: '2px dashed rgba(0,0,0,0.12)',
                  borderRadius: 'var(--radius-card-sm)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  background: '#f8f9fa',
                  cursor: 'pointer'
                }}>
                  <FileText size={26} color="#111827" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.86rem', color: '#374151', fontWeight: 500 }}>
                    {fileInputName || 'Klik atau tarik file modul ke sini'}
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.epub,.txt"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFileInputName(e.target.files[0].name);
                        if (!judulBuku) setJudulBuku(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
                      }
                    }}
                    style={{ display: 'none' }}
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="btn btn-sm btn-secondary" style={{ marginTop: '0.75rem', cursor: 'pointer' }}>
                    Pilih File
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <label className="mono-tag" style={{ color: '#111827' }}>
                    RINGKASAN KONSEP (OPSIONAL):
                  </label>
                  <div style={{ fontSize: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    <button type="button" onClick={() => loadPreset('ai')} className="mono-tag" style={{ background: 'none', border: 'none', color: '#111827', cursor: 'pointer', textDecoration: 'underline' }}>
                      [CONTOH AI]
                    </button>
                    <button type="button" onClick={() => loadPreset('bio')} className="mono-tag" style={{ background: 'none', border: 'none', color: '#4b5563', cursor: 'pointer', textDecoration: 'underline' }}>
                      [BIOETIKA]
                    </button>
                  </div>
                </div>
                <textarea
                  className="textarea-custom"
                  rows={3}
                  placeholder="Ketikkan ringkasan materi atau biarkan AI mengekstrak secara otomatis..."
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <Sparkles size={16} />
                {isGenerating ? 'AI Sedang Mengekstrak Konsep...' : 'Ekstrak Kasus dengan AI'}
              </button>
            </form>
          </div>

          {/* Modul & Statistik */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-panel" style={{ padding: '1.75rem', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 className="mono-tag" style={{ fontSize: '0.9rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <BookOpen size={16} /> [ MODUL TERUNGGAH ]
                </h3>
                <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>{materials.length} FILE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {materials.map((m) => (
                  <div key={m.id} className="glass-card" style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem', color: '#111827' }}>{m.judul}</div>
                        <div className="mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {m.fileName} • {m.fileSize}
                        </div>
                      </div>
                      <span className="badge badge-bloom-analisis">SIAP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistik */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h3 className="mono-tag" style={{ fontSize: '0.85rem', marginBottom: '1rem', color: '#111827' }}>
                // TELEMETRI KELAS
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
                <div style={{ background: '#f8f9fa', padding: '0.85rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>{cases.length}</div>
                  <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>KASUS</div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '0.85rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>86.5</div>
                  <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RATA-RATA NALAR</div>
                </div>
                <div style={{ background: '#f8f9fa', padding: '0.85rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>94%</div>
                  <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PARTISIPASI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BANK KASUS */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#111827', letterSpacing: '-0.03em' }}>Kurasi Bank Kasus Diskusi</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Kendali guru: edit pertanyaan, sesuaikan durasi, atau kunci kasus sebelum dilepas ke siswa.
              </p>
            </div>
            <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)' }}>
              {cases.filter(c => c.aktif).length} KASUS AKTIF
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cases.map((c) => {
              const isEditing = editingCaseId === c.id;

              return (
                <div key={c.id} className="glass-panel" style={{
                  padding: '1.75rem',
                  opacity: c.aktif ? 1 : 0.65
                }}>
                  {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <input
                        type="text"
                        className="input-text"
                        value={editFields.judulKasus}
                        onChange={(e) => setEditFields({ ...editFields, judulKasus: e.target.value })}
                        placeholder="Judul Kasus"
                      />
                      <textarea
                        className="textarea-custom"
                        rows={3}
                        value={editFields.teksKasus}
                        onChange={(e) => setEditFields({ ...editFields, teksKasus: e.target.value })}
                        placeholder="Teks Dilema Kasus"
                      />
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div>
                          <label className="mono-tag" style={{ color: 'var(--text-muted)', display: 'block' }}>BLOOM:</label>
                          <select
                            className="input-text"
                            value={editFields.levelBloom}
                            onChange={(e) => setEditFields({ ...editFields, levelBloom: e.target.value })}
                            style={{ padding: '0.4rem', width: 'auto' }}
                          >
                            <option value="Analisis">Analisis</option>
                            <option value="Evaluasi">Evaluasi</option>
                            <option value="Kreasi">Kreasi</option>
                          </select>
                        </div>
                        <div>
                          <label className="mono-tag" style={{ color: 'var(--text-muted)', display: 'block' }}>DURASI:</label>
                          <select
                            className="input-text"
                            value={editFields.durasi}
                            onChange={(e) => setEditFields({ ...editFields, durasi: Number(e.target.value) })}
                            style={{ padding: '0.4rem', width: 'auto' }}
                          >
                            <option value={60}>60 Detik</option>
                            <option value={120}>120 Detik</option>
                          </select>
                        </div>
                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', marginTop: '1.2rem' }}>
                          <button onClick={() => setEditingCaseId(null)} className="btn btn-sm btn-secondary">
                            Batal
                          </button>
                          <button onClick={() => handleSaveEdit(c.id)} className="btn btn-sm btn-primary">
                            <Check size={14} /> Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span className={`badge ${
                            c.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                            c.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                          }`}>
                            // {c.levelBloom}
                          </span>
                          <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                            {c.durasi}s Pikir
                          </span>
                          <span className="mono-tag" style={{ color: 'var(--text-secondary)' }}>{c.kategori}</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button
                            onClick={() => toggleCaseActive(c.id)}
                            className="btn btn-sm btn-secondary"
                            title={c.aktif ? 'Kunci kasus' : 'Aktifkan kasus'}
                          >
                            {c.aktif ? <Unlock size={13} color="#059669" /> : <Lock size={13} color="#e11d48" />}
                            {c.aktif ? 'Tersedia di Roda' : 'Terkunci'}
                          </button>

                          <button
                            onClick={() => handleStartEdit(c)}
                            className="btn btn-sm btn-secondary"
                          >
                            <Edit3 size={13} />
                          </button>

                          <button
                            onClick={() => deleteCase(c.id)}
                            className="btn btn-sm btn-danger"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827', letterSpacing: '-0.02em' }}>{c.judulKasus}</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                        {c.teksKasus}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                          {c.kataKunci?.map((k, i) => (
                            <span key={i} className="mono-tag" style={{ fontSize: '0.7rem', background: '#f8f9fa', padding: '0.15rem 0.5rem', border: '1px solid #e5e7eb' }}>
                              #{k}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            closeDiscussionRoom(c.id);
                            alert(`Ruang diskusi kasus "${c.judulKasus}" telah ditutup. AI telah merangkum Sintesis Penutup Kelas!`);
                          }}
                          className={`btn btn-sm ${closedRooms[c.id] ? 'btn-secondary' : 'btn-primary'}`}
                        >
                          <Send size={12} />
                          {closedRooms[c.id] ? 'Sintesis Penutup Dibuat' : 'Tutup Diskusi & Sintesis AI'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
