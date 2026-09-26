import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Sparkles, 
  Search, 
  Filter, 
  PlusCircle, 
  Heart, 
  User, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  ShieldCheck, 
  X,
  CornerDownRight,
  MessageCircle
} from 'lucide-react';
import { aiService } from '../services/aiService';

export const ForumDiskusi = () => {
  const { 
    materials, 
    forumPosts, 
    addForumPost, 
    addComment, 
    toggleLikeForumPost,
    currentUser 
  } = useApp();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaterialFilter, setSelectedMaterialFilter] = useState('Semua');

  // Modal New Post State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostMaterialId, setNewPostMaterialId] = useState(materials[0]?.id || 'mat-1');
  const [newPostKategori, setNewPostKategori] = useState('Etika & Kebijakan');
  const [newPostJudul, setNewPostJudul] = useState('');
  const [newPostIsi, setNewPostIsi] = useState('');

  // Active Comment Input per Post: { [postId]: string }
  const [commentInputs, setCommentInputs] = useState({});
  const [commentNudge, setCommentNudge] = useState({ postId: null, text: '' });

  // Handle Create New Forum Thread
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostJudul.trim() || !newPostIsi.trim()) {
      alert('Mohon isi judul dan pertanyaan/argumen diskusi Anda!');
      return;
    }

    const matchedMaterial = materials.find(m => m.id === newPostMaterialId);

    addForumPost({
      materiId: newPostMaterialId,
      materiJudul: matchedMaterial ? matchedMaterial.judul : 'Modul Pembelajaran',
      kategori: newPostKategori,
      judul: newPostJudul,
      isi: newPostIsi
    });

    setNewPostJudul('');
    setNewPostIsi('');
    setIsModalOpen(false);
  };

  // Handle Comment Submission
  const handleSendComment = (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;

    // Check with AI Moderator
    const moderation = aiService.checkModeration(text, 'Tanggapan');
    if (!moderation.allowed) {
      alert(`⚠️ Peringatan AI Moderator: ${moderation.message}`);
      return;
    }

    if (moderation.hasNudge) {
      setCommentNudge({ postId, text: moderation.nudgeText });
      setTimeout(() => setCommentNudge({ postId: null, text: '' }), 6000);
    }

    addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  // Filter posts
  const filteredPosts = (forumPosts || []).filter((post) => {
    const matchSearch = 
      post.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.penulisNama.toLowerCase().includes(searchTerm.toLowerCase());

    const matchMaterial = selectedMaterialFilter === 'Semua' || post.materiId === selectedMaterialFilter;

    return matchSearch && matchMaterial;
  });

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Forum */}
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
              <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 600 }}>
                Diskusi Studi Kasus
              </span>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Kolaborasi Kelas XI-IPA 2</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Forum Diskusi Studi Kasus
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ruang bedah kasus pembelajaran dan kajian bahan ajar guru tanpa distraksi tren media sosial.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary btn-lg"
            style={{ gap: '0.55rem' }}
          >
            <PlusCircle size={18} />
            Mulai Topik Diskusi
          </button>
        </div>

        {/* Search & Filter Card */}
        <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="input-text"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Cari topik kasus atau nama penulis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter by Material Category */}
            <div>
              <select
                className="input-text"
                value={selectedMaterialFilter}
                onChange={(e) => setSelectedMaterialFilter(e.target.value)}
                style={{ background: '#ffffff' }}
              >
                <option value="Semua">Semua Bahan Ajar Pelajaran</option>
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.judul}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', textAlign: 'right' }}>
              Menampilkan <strong>{filteredPosts.length}</strong> utas diskusi studi kasus
            </div>
          </div>
        </div>

        {/* Academic Discussion Principles Reminder */}
        <div style={{
          background: '#f8f9fa',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 'var(--radius-card-sm)',
          padding: '1rem 1.4rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          color: 'var(--text-secondary)',
          fontSize: '0.86rem'
        }}>
          <ShieldCheck size={20} color="#059669" />
          <div>
            <strong>Pedoman Diskusi Berbobot:</strong> Setiap tanggapan diwajibkan menyertakan argumen logis ("karena...") dan bukti pembanding, serta saling menghargai keberagaman perspektif nalar antarsiswa dan bapak/ibu guru.
          </div>
        </div>

        {/* List of Discussion Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {filteredPosts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '3.5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <MessageSquare size={36} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.2rem', color: '#111827', marginBottom: '0.4rem' }}>Belum Ada Topik Diskusi</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Jadilah yang pertama memulai pertukaran nalar kritis untuk materi pelajaran ini!
              </p>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary btn-sm">
                + Buka Topik Sekarang
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isTeacher = post.penulisRole === 'pendamping' || post.penulisRole === 'guru';

              return (
                <article key={post.id} className="glass-panel" style={{ padding: '2rem' }}>
                  {/* Post Header: Material Badge & Author */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {/* Avatar */}
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: isTeacher ? '#000000' : '#eff6ff',
                        color: isTeacher ? '#ffffff' : '#1d4ed8',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.95rem'
                      }}>
                        {post.penulisAvatar || (isTeacher ? 'SW' : 'ST')}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.96rem', color: '#111827' }}>
                            {post.penulisNama}
                          </span>
                          <span className={`badge ${isTeacher ? 'badge-bloom-evaluasi' : 'badge-bloom-analisis'}`} style={{ fontSize: '0.68rem', padding: '0.15rem 0.55rem' }}>
                            {isTeacher ? 'Guru / Pendamping' : 'Siswa'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {post.tanggal}
                        </div>
                      </div>
                    </div>

                    {/* Material & Category Tags */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ background: '#f1f5f9', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-pill)', color: '#334155', fontSize: '0.72rem', fontWeight: 600 }}>
                        {post.kategori || 'Kasus'}
                      </span>
                      <span className="mono-tag" style={{ color: 'var(--text-secondary)', background: '#fafafa', border: '1px solid #e5e7eb', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem' }}>
                        {post.materiJudul}
                      </span>
                    </div>
                  </div>

                  {/* Post Title & Content */}
                  <h2 style={{ fontSize: '1.4rem', color: '#111827', marginBottom: '0.85rem', letterSpacing: '-0.02em', lineHeight: 1.35 }}>
                    {post.judul}
                  </h2>

                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.96rem',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                    whiteSpace: 'pre-line'
                  }}>
                    {post.isi}
                  </p>

                  {/* Post Action Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '1.25rem',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    marginBottom: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => toggleLikeForumPost(post.id)}
                        className="btn btn-sm btn-secondary"
                        style={{ gap: '0.35rem', padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}
                      >
                        <Heart size={14} color="#e11d48" />
                        <span>Apresiasi ({post.likes || 0})</span>
                      </button>

                      <div className="btn btn-sm btn-secondary" style={{ gap: '0.35rem', padding: '0.3rem 0.8rem', fontSize: '0.8rem', cursor: 'default' }}>
                        <MessageCircle size={14} />
                        <span>{post.comments?.length || 0} Tanggapan</span>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div style={{ paddingLeft: '0.5rem' }}>
                    {/* List Existing Comments */}
                    {post.comments && post.comments.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                        {post.comments.map((comment) => {
                          const isCommentTeacher = comment.penulisRole === 'pendamping' || comment.penulisRole === 'guru';

                          return (
                            <div key={comment.id} style={{
                              display: 'flex',
                              gap: '0.75rem',
                              background: isCommentTeacher ? '#fbfcfe' : '#f8f9fa',
                              border: isCommentTeacher ? '1px solid #bfdbfe' : '1px solid rgba(0,0,0,0.05)',
                              borderRadius: '14px',
                              padding: '0.9rem 1.1rem'
                            }}>
                              <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                background: isCommentTeacher ? '#000000' : '#e0e7ff',
                                color: isCommentTeacher ? '#ffffff' : '#3730a3',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                flexShrink: 0
                              }}>
                                {comment.penulisAvatar || (isCommentTeacher ? 'SW' : 'ST')}
                              </div>

                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                                  <strong style={{ fontSize: '0.86rem', color: '#111827' }}>
                                    {comment.penulisNama}
                                  </strong>
                                  <span className={`badge ${isCommentTeacher ? 'badge-bloom-evaluasi' : 'badge-outline'}`} style={{ fontSize: '0.64rem', padding: '0.1rem 0.45rem' }}>
                                    {isCommentTeacher ? 'Guru' : 'Siswa'}
                                  </span>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                                    {comment.tanggal}
                                  </span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                  {comment.isi}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* AI Moderator Nudge if applicable */}
                    {commentNudge.postId === post.id && (
                      <div style={{
                        background: '#fffbeb',
                        border: '1px solid #fde68a',
                        borderRadius: '10px',
                        padding: '0.65rem 1rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.82rem',
                        color: '#b45309'
                      }}>
                        {commentNudge.text}
                      </div>
                    )}

                    {/* Instant Reply Input Form */}
                    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="input-text"
                        style={{ fontSize: '0.86rem', padding: '0.6rem 1rem' }}
                        placeholder={`Tanggapi sebagai ${currentUser.nama}... (tuliskan argumen atau alasan)`}
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendComment(post.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleSendComment(post.id)}
                        disabled={!(commentInputs[post.id] || '').trim()}
                        className="btn btn-primary"
                        style={{ padding: '0.6rem 1.1rem', fontSize: '0.86rem' }}
                      >
                        <Send size={14} /> Balas
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* MODAL: FORM MEMBUAT TOPIK DISKUSI BARU */}
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '1.5rem'
          }}>
            <div className="glass-panel" style={{
              width: '100%',
              maxWidth: '680px',
              padding: '2.5rem',
              position: 'relative',
              background: '#ffffff',
              boxShadow: '0 20px 50px rgba(0,0,0,0.18)'
            }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: '#f1f3f4',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ background: '#f1f5f9', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-pill)', color: '#334155', fontSize: '0.72rem', fontWeight: 600 }}>
                  Topik Diskusi Baru
                </span>
                <span style={{ color: '#64748b', fontSize: '0.78rem' }}>Ruang Pelajaran</span>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: '#111827', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                Mulai Topik Diskusi Studi Kasus
              </h2>

              <form onSubmit={handleCreatePost}>
                {/* Select Material */}
                <div style={{ marginBottom: '1.15rem' }}>
                  <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                    PILIH MATERI PELAJARAN:
                  </label>
                  <select
                    className="input-text"
                    value={newPostMaterialId}
                    onChange={(e) => setNewPostMaterialId(e.target.value)}
                    required
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.judul}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div style={{ marginBottom: '1.15rem' }}>
                  <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                    KATEGORI TOPIK KASUS:
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Contoh: Etika & Regulasi, Bioetika, Hak Cipta & Orisinalitas"
                    value={newPostKategori}
                    onChange={(e) => setNewPostKategori(e.target.value)}
                    required
                  />
                </div>

                {/* Title */}
                <div style={{ marginBottom: '1.15rem' }}>
                  <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                    JUDUL TOPIK DISKUSI:
                  </label>
                  <input
                    type="text"
                    className="input-text"
                    placeholder="Contoh: Larangan vs Pengujian Prompt: Apa Standar Asesmen yang Adil?"
                    value={newPostJudul}
                    onChange={(e) => setNewPostJudul(e.target.value)}
                    required
                  />
                </div>

                {/* Content / Question */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label className="mono-tag" style={{ display: 'block', marginBottom: '0.4rem', color: '#111827' }}>
                    ARGUMEN ATAU PERTANYAAN PEMANTIK:
                  </label>
                  <textarea
                    className="textarea-custom"
                    rows={5}
                    placeholder="Uraikan latar belakang studi kasus, dilema yang kamu lihat, dan pertanyaan yang ingin kamu diskusikan bersama rekan sekelas dan guru..."
                    value={newPostIsi}
                    onChange={(e) => setNewPostIsi(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    <Send size={15} /> Terbitkan Topik Diskusi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
