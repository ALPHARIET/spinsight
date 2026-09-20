import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCw, 
  Clock, 
  Mic, 
  Square, 
  Sparkles, 
  ArrowRight, 
  Edit3, 
  ShieldCheck, 
  ExternalLink, 
  Users, 
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SpinArena = () => {
  const { 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    submitStudentResponse, 
    setActivePage
  } = useApp();

  const activeCase = cases.find(c => c.id === activeCaseId) || cases[0];

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [mode, setMode] = useState('solo');
  const [selectedStudentSpeaker, setSelectedStudentSpeaker] = useState('');

  // Step flow: 'spin' -> 'think' -> 'record' -> 'insight'
  const [stage, setStage] = useState('spin');

  // Think Timer State
  const [thinkSecondsLeft, setThinkSecondsLeft] = useState(activeCase?.durasi || 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [insightResult, setInsightResult] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const recordIntervalRef = useRef(null);

  const CLASS_STUDENTS = [
    'Jason Pratama (Kamu)', 'Nabila Putri', 'Budi Prakoso', 'Aisyah Maharani',
    'Farhan Maulana', 'Zahra Amelia', 'Rafi Ramadhan', 'Dina Lestari'
  ];

  const ANTIGRAVITY_PALETTE = [
    '#18181b', '#2563eb', '#059669', '#d97706', '#4b5563', '#7c3aed'
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setInsightResult(null);

    const activeCases = cases.filter(c => c.aktif);
    const targetIdx = Math.floor(Math.random() * activeCases.length);
    const targetCase = activeCases[targetIdx];

    const extraTurns = 6;
    const sliceDeg = 360 / activeCases.length;
    const newRotation = wheelRotation + (extraTurns * 360) + (targetIdx * sliceDeg);

    setWheelRotation(newRotation);

    if (mode === 'kelas') {
      const randomStudent = CLASS_STUDENTS[Math.floor(Math.random() * CLASS_STUDENTS.length)];
      setSelectedStudentSpeaker(randomStudent);
    }

    setTimeout(() => {
      setIsSpinning(false);
      setActiveCaseId(targetCase.id);
      setThinkSecondsLeft(targetCase.durasi);
      setStage('think');
      setIsTimerRunning(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 2800);
  };

  useEffect(() => {
    if (isTimerRunning && stage === 'think') {
      timerIntervalRef.current = setInterval(() => {
        setThinkSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            setStage('record');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, stage]);

  const skipToRecord = () => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);
    setStage('record');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordSeconds(0);

      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds(s => s + 1);
      }, 1000);
    } catch (err) {
      setIsRecording(true);
      setRecordSeconds(0);
      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds(s => s + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (recordIntervalRef.current) clearInterval(recordIntervalRef.current);
    setIsRecording(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    if (!transcript) {
      setTranscript(
        'Menurut saya, kebijakan sekolah seharusnya tidak melarang total penggunaan AI melainkan mengajarkan cara memverifikasi akurasi faktualnya. Karena di masa depan, keterampilan menguji kebenaran rujukan adalah kunci orisinalitas nalar yang sesungguhnya.'
      );
    }
  };

  const loadFastDemoResponse = (presetIdx = 1) => {
    if (presetIdx === 1) {
      setTranscript(
        'Saya berpendapat bahwa melarang penggunaan AI saat ujian akhir tidak sepenuhnya menyelesaikan masalah integritas. Sebab siswa tetap akan menggunakannya di luar kelas tanpa bimbingan etis. Yang terpenting adalah melatih siswa membongkar asumsi dan menyertakan bukti empiris dari jurnal resmi, bukan sekadar menghafal jawaban instan.'
      );
    } else {
      setTranscript(
        'Menurut pandangan saya, ujian akhir harus tetap bebas dari alat bantu AI untuk menguji memori kerja siswa secara mandiri. Akan tetapi, pada tugas proyek mingguan, siswa wajib memanfaatkan AI dengan melampirkan riwayat prompt dan bukti komparasi sumber.'
      );
    }
  };

  const handleProcessTranscript = () => {
    if (!transcript.trim()) {
      alert('Mohon isi atau rekam pendapat lisan Anda terlebih dahulu!');
      return;
    }

    const mins = Math.floor(recordSeconds / 60);
    const secs = recordSeconds % 60;
    const durasiBicaraStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

    const res = submitStudentResponse({
      caseId: activeCase.id,
      transcript: transcript.trim(),
      durasiPikir: activeCase.durasi,
      durasiBicara: recordSeconds > 0 ? durasiBicaraStr : '01:12'
    });

    setInsightResult(res);
    setStage('insight');

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Breadcrumb */}
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
              <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', color: '#111827' }}>
                // PILAR 2 : SPIN ARENA
              </span>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>THINK-PAIR-SHARE</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Mesin Berpikir Spontan & Rekam Nalar
            </h1>
          </div>

          {/* Mode Switcher */}
          <div style={{
            display: 'flex',
            background: '#f1f3f4',
            padding: '0.25rem',
            borderRadius: 'var(--radius-pill)'
          }}>
            <button
              onClick={() => setMode('solo')}
              className={`btn btn-sm ${mode === 'solo' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', padding: '0.35rem 1rem' }}
            >
              Mode Solo
            </button>
            <button
              onClick={() => setMode('kelas')}
              className={`btn btn-sm ${mode === 'kelas' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ border: 'none', padding: '0.35rem 1rem' }}
            >
              <Users size={14} />
              Mode Kelas
            </button>
          </div>
        </div>

        {/* STAGE 1: WHEEL & ACTIVE CASE */}
        <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            {/* Visual Wheel */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {/* Pointer */}
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
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning ? 'transform 2.8s cubic-bezier(0.12, 0.9, 0.15, 1)' : 'none',
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
                onClick={handleSpin}
                disabled={isSpinning}
                className="btn btn-primary btn-lg"
                style={{ marginTop: '2rem', width: '260px' }}
              >
                <RotateCw size={18} />
                {isSpinning ? 'Mengacak Kasus...' : 'Putar Roda Kasus'}
              </button>

              {mode === 'kelas' && selectedStudentSpeaker && (
                <div className="mono-tag" style={{
                  marginTop: '1rem',
                  padding: '0.4rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  background: '#f1f3f4',
                  color: '#111827'
                }}>
                  🎯 GILIRAN: <strong>{selectedStudentSpeaker}</strong>
                </div>
              )}
            </div>

            {/* Case Card */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span className={`badge ${
                  activeCase.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                  activeCase.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                }`}>
                  // BLOOM: {activeCase.levelBloom}
                </span>

                <span className="mono-tag" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Clock size={13} /> {activeCase.durasi}s Pikir
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827', letterSpacing: '-0.02em' }}>
                {activeCase.judulKasus}
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem'
              }}>
                {activeCase.teksKasus}
              </p>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {activeCase.kataKunci?.map((k, i) => (
                  <span key={i} className="mono-tag" style={{ fontSize: '0.72rem', background: '#f8f9fa', padding: '0.2rem 0.55rem', border: '1px solid #e5e7eb' }}>
                    #{k}
                  </span>
                ))}
              </div>

              <div style={{
                padding: '0.85rem 1.2rem',
                background: '#f8f9fa',
                borderRadius: 'var(--radius-card-sm)',
                border: '1px solid rgba(0,0,0,0.06)',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                💡 <strong>Productive Failure:</strong> Susun kerangka nalar sendiri sebelum fakta rujukan tampil.
              </div>
            </div>
          </div>
        </div>

        {/* STAGE 2: THINKING TIMER */}
        {stage === 'think' && (
          <div className="glass-panel" style={{
            padding: '2.5rem',
            textAlign: 'center',
            marginBottom: '2.5rem',
            border: '1px solid rgba(0,0,0,0.1)'
          }}>
            <span className="mono-tag" style={{
              background: '#f1f3f4',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              color: '#111827',
              marginBottom: '0.75rem',
              display: 'inline-block'
            }}>
              [ TIMER BERPIKIR ]
            </span>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Susun Kerangka Argumenmu Sekarang
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 1.5rem' }}>
              Fokuskan pada: <strong>Klaim</strong> pokok, <strong>Alasan</strong> logis, dan contoh <strong>Bukti</strong> nyata.
            </p>

            <div style={{
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              margin: '0 auto 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#ffffff',
              border: '3px solid #000000',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}>
              <span style={{ fontSize: '2.6rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#111827' }}>
                {thinkSecondsLeft}
              </span>
              <span className="mono-tag" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Detik
              </span>
            </div>

            <button onClick={skipToRecord} className="btn btn-primary btn-lg">
              <Mic size={17} />
              Saya Siap Bicara Sekarang
            </button>
          </div>
        )}

        {/* STAGE 3: RECORD SPEECH & AUTO-TRANSCRIPTION */}
        {(stage === 'record' || stage === 'insight') && (
          <div className="glass-panel" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div>
                <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#111827' }}>
                  // PEREKAMAN AUDIO BROWSER
                </span>
                <h3 style={{ fontSize: '1.4rem', marginTop: '0.35rem', color: '#111827' }}>
                  Rekam Jawaban Lisanmu Langsung
                </h3>
              </div>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                MediaRecorder API Native
              </span>
            </div>

            <div className="grid-2" style={{ alignItems: 'start' }}>
              {/* Recording Box */}
              <div style={{
                background: '#f8f9fa',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 'var(--radius-card-sm)',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '85px',
                  height: '85px',
                  borderRadius: '50%',
                  margin: '0 auto 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isRecording ? '#fee2e2' : '#000000',
                  border: isRecording ? '2px solid #e11d48' : 'none',
                  cursor: 'pointer'
                }}
                className={isRecording ? 'recording-pulse' : ''}
                onClick={isRecording ? stopRecording : startRecording}
                >
                  <Mic size={34} color={isRecording ? '#e11d48' : '#ffffff'} />
                </div>

                <div style={{ fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: '0.4rem', color: '#111827' }}>
                  {Math.floor(recordSeconds / 60)}:{(recordSeconds % 60).toString().padStart(2, '0')}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {isRecording ? '🔴 Merekam audio... Klik tombol untuk berhenti.' : 'Klik tombol di atas untuk mulai merekam.'}
                </p>

                {isRecording && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', height: '30px', marginBottom: '1.25rem' }}>
                    {[...Array(16)].map((_, i) => (
                      <span key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {isRecording ? (
                    <button onClick={stopRecording} className="btn btn-danger btn-sm">
                      <Square size={14} /> Selesai Merekam
                    </button>
                  ) : (
                    <button onClick={startRecording} className="btn btn-primary btn-sm">
                      <Mic size={14} /> Mulai Rekam
                    </button>
                  )}

                  <button onClick={() => loadFastDemoResponse(1)} className="btn btn-secondary btn-sm" title="Muat contoh suara cepat">
                    <Zap size={13} /> Preset 1
                  </button>
                  <button onClick={() => loadFastDemoResponse(2)} className="btn btn-secondary btn-sm" title="Muat contoh suara 2">
                    <Zap size={13} /> Preset 2
                  </button>
                </div>
              </div>

              {/* Transcription Box */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111827' }}>
                    <Edit3 size={15} color="#111827" />
                    Transkrip Jawaban Lisan (Koreksi Akses Lokal)
                  </label>
                  <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                    Mitigasi Bab 10
                  </span>
                </div>

                <textarea
                  className="textarea-custom"
                  rows={6}
                  placeholder="Hasil transkripsi suara otomatis akan muncul di sini. Kamu bebas mengedit teks jika dialek lokal kurang terbaca sempurna oleh mic..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                    {transcript.split(/\s+/).filter(Boolean).length} kata terdeteksi
                  </span>

                  <button
                    onClick={handleProcessTranscript}
                    disabled={!transcript.trim()}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.6rem' }}
                  >
                    <Sparkles size={16} />
                    Uji Struktur Nalar & Buka Arena
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: PILAR 3 — INSIGHT PANEL (3 Cards) */}
        {insightResult && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span className="mono-tag" style={{ background: '#f1f3f4', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#111827' }}>
                    // PILAR 3 : INSIGHT PANEL
                  </span>
                </div>
                <h2 style={{ fontSize: '1.9rem', color: '#111827', letterSpacing: '-0.03em' }}>
                  Evaluasi Nalar & Perspektif Terverifikasi
                </h2>
              </div>

              <button
                onClick={() => setActivePage('arena')}
                className="btn btn-primary btn-lg"
                style={{ gap: '0.75rem' }}
              >
                <Users size={18} />
                Buka Arena Diskusi Kelas
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Note alert */}
            <div style={{
              background: '#f8f9fa',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 'var(--radius-card-sm)',
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <ShieldCheck size={20} color="#111827" />
              <div>
                <strong>Prinsip Anti-Kebenaran Tunggal:</strong> Sistem tidak pernah menyebut "jawaban yang benar". Framing yang digunakan adalah "perspektif dari sumber terpercaya", melatih kerendahan hati nalar siswa.
              </div>
            </div>

            {/* THE 3 CARDS */}
            <div className="grid-3">
              {/* KARTU 1: CERMIN ARGUMEN */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 className="mono-tag" style={{ fontSize: '0.9rem', color: '#111827' }}>[ 01 ] CERMIN ARGUMEN</h3>
                  <span className="mono-tag" style={{ color: '#059669', fontWeight: 700 }}>
                    SKOR: {insightResult.cermin.skorArgumen}/100
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, fontSize: '0.86rem' }}>
                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.2rem' }}>
                      📌 Klaim Pokok:
                    </strong>
                    <div style={{ color: 'var(--text-secondary)', background: '#f8f9fa', padding: '0.65rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {insightResult.cermin.klaim}
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.2rem' }}>
                      🧠 Alasan:
                    </strong>
                    <div style={{ color: 'var(--text-secondary)', background: '#f8f9fa', padding: '0.65rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {insightResult.cermin.alasan}
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.2rem' }}>
                      🔍 Bukti:
                    </strong>
                    <div style={{ color: 'var(--text-secondary)', background: '#f8f9fa', padding: '0.65rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {insightResult.cermin.bukti}
                    </div>
                  </div>

                  <div>
                    <strong style={{ color: '#d97706', display: 'block', marginBottom: '0.2rem' }}>
                      ⚠️ Asumsi Belum Teruji:
                    </strong>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                      {insightResult.cermin.asumsiBelumDiuji}
                    </div>
                  </div>

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(0,0,0,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span className="mono-tag">Fillers: {insightResult.cermin.fillerHits}</span>
                    <span className="mono-tag">Clarity: {insightResult.cermin.clarityScore}%</span>
                  </div>
                </div>
              </div>

              {/* KARTU 2: FAKTA TERVERIFIKASI */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 className="mono-tag" style={{ fontSize: '0.9rem', color: '#111827' }}>[ 02 ] FAKTA TERVERIFIKASI</h3>
                  <span className="mono-tag" style={{ color: '#2563eb' }}>WHITELIST RAG</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1, fontSize: '0.86rem' }}>
                  {insightResult.fakta.map((f) => (
                    <div key={f.id} className="glass-card" style={{ padding: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span className={`badge ${f.tipe === 'Menguatkan' ? 'badge-bloom-analisis' : 'badge-bloom-evaluasi'}`} style={{ fontSize: '0.68rem' }}>
                          // {f.tipe}
                        </span>
                        <a href={f.link} target="_blank" rel="noreferrer" style={{ color: '#111827', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                          Rujukan <ExternalLink size={11} />
                        </a>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', marginBottom: '0.25rem', color: '#111827' }}>
                        {f.sumber}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.45 }}>
                        {f.ringkasan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* KARTU 3: TREND & FAKTA UNIK */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 className="mono-tag" style={{ fontSize: '0.9rem', color: '#111827' }}>[ 03 ] TREND & FAKTA UNIK</h3>
                  <span className="mono-tag" style={{ color: '#7c3aed' }}>GLOBAL PULSE</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, fontSize: '0.86rem' }}>
                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.3rem' }}>
                      🌐 Gelombang Perbincangan:
                    </strong>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, background: '#f8f9fa', padding: '0.75rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {insightResult.trend.trend}
                    </p>
                  </div>

                  <div>
                    <strong style={{ color: '#7c3aed', display: 'block', marginBottom: '0.3rem' }}>
                      💡 Fakta Menarik Pembuka Pikiran:
                    </strong>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, background: '#faf5ff', padding: '0.75rem', borderRadius: '10px', border: '1px solid #f3e8ff' }}>
                      {insightResult.trend.faktaUnik}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', paddingTop: '0.75rem' }}>
                    {insightResult.trend.kataMutiara}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
