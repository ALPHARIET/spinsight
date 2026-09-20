import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Unlock, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  PlusCircle, 
  MinusCircle, 
  Activity
} from 'lucide-react';
import { aiService } from '../services/aiService';

export const ArenaPage = () => {
  const { 
    cases, 
    activeCaseId, 
    unlockedCases, 
    arenaPosts, 
    addArenaReply, 
    syntheses, 
    setActivePage 
  } = useApp();

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];
  const isUnlocked = unlockedCases.includes(activeCase.id);
  const relevantPosts = arenaPosts.filter(p => p.caseId === activeCase.id);
  const currentSynthesis = syntheses[activeCase.id];

  const [activeReplyingPostId, setActiveReplyingPostId] = useState(null);
  const [replyLabel, setReplyLabel] = useState('Menguatkan');
  const [replyText, setReplyText] = useState('');
  const [nudgeWarning, setNudgeWarning] = useState('');
  const [activeTab, setActiveTab] = useState('forum');

  const handleSubmitReply = (postId) => {
    const moderation = aiService.checkModeration(replyText, replyLabel);

    if (!moderation.allowed) {
      alert(`⚠️ Peringatan AI Moderator: ${moderation.message}`);
      return;
    }

    if (moderation.hasNudge) {
      setNudgeWarning(moderation.nudgeText);
    }

    addArenaReply(postId, {
      label: replyLabel,
      isi: replyText.trim()
    });

    setReplyText('');
    setActiveReplyingPostId(null);
  };

  const getLabelBadge = (lbl) => {
    switch (lbl) {
      case 'Menguatkan':
        return { color: '#059669', bg: '#ecfdf5', border: '#a7f3d0', icon: <PlusCircle size={12} /> };
      case 'Menyanggah':
        return { color: '#e11d48', bg: '#fef2f2', border: '#fecdd3', icon: <MinusCircle size={12} /> };
      case 'Bertanya':
        return { color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: <HelpCircle size={12} /> };
      case 'Menambah bukti':
        return { color: '#d97706', bg: '#fffbeb', border: '#fde68a', icon: <CheckCircle2 size={12} /> };
      default:
        return { color: '#4b5563', bg: '#f1f3f4', border: '#e5e7eb', icon: null };
    }
  };

  if (!isUnlocked) {
    return (
      <div className="page-wrapper">
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center', paddingTop: '3rem' }}>
          <div className="glass-panel" style={{ padding: '3.5rem 2rem', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#f1f3f4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#111827'
            }}>
              <Lock size={32} />
            </div>

            <span className="mono-tag" style={{ color: '#4b5563', marginBottom: '0.75rem', background: '#f1f3f4', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', display: 'inline-block' }}>
              // THINK-PAIR-SHARE GATE
            </span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Ruang Arena Terkunci
            </h2>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Untuk mencegah bias tiru pendapat teman, kamu <strong>wajib menyelesaikan respon lisanmu</strong> di Spin Arena terlebih dahulu.
            </p>

            <button
              onClick={() => setActivePage('spin')}
              className="btn btn-primary btn-lg"
              style={{ gap: '0.75rem' }}
            >
              <Unlock size={17} />
              Putar & Rekam di Spin Arena
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Arena */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#111827' }}>
                // PILAR 4 : ARENA
              </span>
              <span className="mono-tag" style={{ color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)' }}>
                ● UNLOCKED
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', color: '#111827', letterSpacing: '-0.03em' }}>{activeCase.judulKasus}</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Forum adu nalar terstruktur: setiap postingan berakar dari rekaman lisan otentik dan balasan berlabel kognitif.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              background: '#f1f3f4',
              padding: '0.22rem',
              borderRadius: 'var(--radius-pill)'
            }}>
              <button
                onClick={() => setActiveTab('forum')}
                className={`btn btn-sm ${activeTab === 'forum' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none', padding: '0.35rem 0.95rem' }}
              >
                <MessageSquare size={13} /> Forum
              </button>
              <button
                onClick={() => setActiveTab('peta')}
                className={`btn btn-sm ${activeTab === 'peta' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ border: 'none', padding: '0.35rem 0.95rem' }}
              >
                <Activity size={13} /> Peta Posisi
              </button>
            </div>
          </div>
        </div>

        {/* SINTESIS PENUTUP */}
        {currentSynthesis && (
          <div className="glass-panel" style={{
            padding: '2rem',
            marginBottom: '2.5rem',
            border: '1px solid rgba(0,0,0,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '50%', background: '#000000', color: '#ffffff' }}>
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="mono-tag" style={{ fontSize: '0.95rem', color: '#111827' }}>
                  [ SINTESIS PENUTUP KELAS ]
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Rangkuman AI untuk bahan ajar guru pertemuan berikutnya
                </span>
              </div>
            </div>

            <div className="grid-3" style={{ gap: '1rem', fontSize: '0.86rem' }}>
              <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <strong className="mono-tag" style={{ color: '#059669', display: 'block', marginBottom: '0.45rem' }}>// TITIK TEMU</strong>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>{currentSynthesis.titikTemu}</p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <strong className="mono-tag" style={{ color: '#e11d48', display: 'block', marginBottom: '0.45rem' }}>// TITIK BEDA</strong>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>{currentSynthesis.titikBeda}</p>
              </div>

              <div style={{ background: '#f8f9fa', padding: '1.2rem', borderRadius: 'var(--radius-card-sm)', border: '1px solid rgba(0,0,0,0.06)' }}>
                <strong className="mono-tag" style={{ color: '#2563eb', display: 'block', marginBottom: '0.45rem' }}>// PERTANYAAN TERBUKA</strong>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.55 }}>{currentSynthesis.pertanyaanTerbuka}</p>
              </div>
            </div>
          </div>
        )}

        {nudgeWarning && (
          <div style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 'var(--radius-card-sm)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontWeight: 500, fontSize: '0.88rem' }}>{nudgeWarning}</span>
            <button onClick={() => setNudgeWarning('')} className="btn btn-sm btn-secondary">Tutup</button>
          </div>
        )}

        {/* VIEW 1: PETA POSISI KELAS (Antigravity Precision Plot) */}
        {activeTab === 'peta' && (
          <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span className="mono-tag" style={{
                background: '#f1f3f4',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--radius-pill)',
                color: '#4b5563',
                marginBottom: '0.75rem',
                display: 'inline-block'
              }}>
                [ 2D SPECTRUM MAP ]
              </span>
              <h2 style={{ fontSize: '2rem', color: '#111827', letterSpacing: '-0.03em' }}>
                Peta Sebaran Posisi Nalar
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '650px', margin: '0 auto' }}>
                AI memetakan orientasi penalaran sekelas ke dalam 4 kuadran perspektif.
              </p>
            </div>

            <div style={{
              width: '100%',
              height: '420px',
              borderRadius: 'var(--radius-card)',
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)'
            }}>
              {/* Axes */}
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#e5e7eb', borderTop: '1px dashed #cbd5e1' }} />
              <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#e5e7eb', borderLeft: '1px dashed #cbd5e1' }} />

              {/* Quadrant Labels */}
              <span className="mono-tag" style={{ position: 'absolute', top: '15px', left: '20px', color: '#111827', background: '#f1f3f4', padding: '4px 8px', borderRadius: '6px' }}>
                [A] REGULASI KETAT
              </span>
              <span className="mono-tag" style={{ position: 'absolute', top: '15px', right: '20px', color: '#111827', background: '#f1f3f4', padding: '4px 8px', borderRadius: '6px' }}>
                [B] ADAPTIF PROMPTING
              </span>
              <span className="mono-tag" style={{ position: 'absolute', bottom: '15px', left: '20px', color: '#111827', background: '#f1f3f4', padding: '4px 8px', borderRadius: '6px' }}>
                [C] OTENTIK MANDIRI
              </span>
              <span className="mono-tag" style={{ position: 'absolute', bottom: '15px', right: '20px', color: '#111827', background: '#f1f3f4', padding: '4px 8px', borderRadius: '6px' }}>
                [D] MODEL HIBRIDA
              </span>

              {/* Student Opinion Nodes */}
              {relevantPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    position: 'absolute',
                    left: `${post.posisiX || 50}%`,
                    top: `${post.posisiY || 50}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    zIndex: 10
                  }}
                  title={`${post.siswaNama}: ${post.kutub}`}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      color: '#ffffff',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
                      border: '2px solid #ffffff'
                    }}>
                      {post.siswaNama.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="mono-tag" style={{
                      fontSize: '0.7rem',
                      background: '#ffffff',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      color: '#111827',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                      {post.siswaNama}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: FORUM ARGUMEN */}
        {activeTab === 'forum' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className="mono-tag" style={{ fontSize: '1rem', color: '#111827' }}>
                // THREAD DISKUSI ({relevantPosts.length} KONTRIBUSI LISAN)
              </h2>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                AUTO-POST FROM TRANSCRIPT
              </span>
            </div>

            {relevantPosts.map((post) => (
              <div key={post.id} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#ffffff'
                    }}>
                      {post.siswaNama.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#111827' }}>{post.siswaNama}</div>
                      <div className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {post.siswaRole} • {post.waktu}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mono-tag" style={{ color: '#111827', background: '#f1f3f4', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-pill)' }}>
                      {post.kutub}
                    </span>
                    <span className="mono-tag" style={{ color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.55rem', borderRadius: 'var(--radius-pill)' }}>
                      SKOR: {post.skorArgumen}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-card-sm)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  marginBottom: '1.25rem',
                  fontSize: '0.96rem',
                  lineHeight: 1.65,
                  color: '#1f2937'
                }}>
                  "{post.transkrip}"
                </div>

                {/* Sub-Replies */}
                {post.replies && post.replies.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginTop: '1rem',
                    paddingLeft: '1.5rem',
                    borderLeft: '2px solid rgba(0,0,0,0.08)'
                  }}>
                    {post.replies.map((rep) => {
                      const badgeInfo = getLabelBadge(rep.label);
                      return (
                        <div key={rep.id} className="glass-card" style={{ padding: '0.85rem 1.15rem', background: '#f8f9fa' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>{rep.siswaNama}</span>
                              <span className="mono-tag" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                padding: '0.15rem 0.5rem',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '0.68rem',
                                background: badgeInfo.bg,
                                color: badgeInfo.color,
                                border: `1px solid ${badgeInfo.border}`
                              }}>
                                {badgeInfo.icon}
                                {rep.label}
                              </span>
                            </div>
                            <span className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{rep.waktu}</span>
                          </div>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            {rep.isi}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Reply Form */}
                <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                  {activeReplyingPostId !== post.id ? (
                    <button
                      onClick={() => setActiveReplyingPostId(post.id)}
                      className="btn btn-sm btn-secondary"
                    >
                      <MessageSquare size={13} /> Beri Balasan Berlabel
                    </button>
                  ) : (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>LABEL RESPONS:</span>
                        {['Menguatkan', 'Menyanggah', 'Bertanya', 'Menambah bukti'].map((lbl) => {
                          const info = getLabelBadge(lbl);
                          return (
                            <button
                              key={lbl}
                              type="button"
                              onClick={() => setReplyLabel(lbl)}
                              className={`btn btn-sm ${replyLabel === lbl ? 'btn-primary' : 'btn-secondary'}`}
                              style={{ fontSize: '0.78rem', padding: '0.25rem 0.75rem' }}
                            >
                              {info.icon} {lbl}
                            </button>
                          );
                        })}
                      </div>

                      <textarea
                        className="textarea-custom"
                        rows={2}
                        placeholder={`Tulis argumenmu (Format: ${replyLabel}). AI Moderator aktif memantau nalar...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          🛡️ AI MODERATOR AKTIF
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => { setActiveReplyingPostId(null); setReplyText(''); }}
                            className="btn btn-sm btn-secondary"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleSubmitReply(post.id)}
                            disabled={!replyText.trim()}
                            className="btn btn-sm btn-primary"
                          >
                            <Send size={12} /> Kirim
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
