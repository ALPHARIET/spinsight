import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCw, 
  Clock, 
  Mic, 
  MicOff,
  Sparkles, 
  ArrowRight, 
  Edit3, 
  ShieldCheck, 
  ExternalLink, 
  Users, 
  Zap,
  CheckCircle2,
  Award,
  BookOpen,
  BookMarked,
  Send,
  Trash2,
  FileText,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PromptSpinner } from '../components/PromptSpinner';

export const SpinArena = () => {
  const { 
    cases, 
    activeCaseId, 
    setActiveCaseId, 
    submitStudentResponse, 
    setActivePage,
    materials
  } = useApp();

  const activeCases = cases.filter(c => c.aktif);
  const activeCase = activeCases.find(c => c.id === activeCaseId) || activeCases[0] || cases[0];
  const activeMaterial = materials.find(m => m.id === activeCase?.materialId);

  // Wheel State
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [mode, setMode] = useState('solo');
  const [selectedStudentSpeaker, setSelectedStudentSpeaker] = useState('');

  // Flow Stage: 'input' (default ready to type) | 'insight' (after evaluation)
  const [stage, setStage] = useState('input');

  // Think Timer State
  const [thinkSecondsLeft, setThinkSecondsLeft] = useState(activeCase?.durasi || 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Student Answer Textarea State (METODE UTAMA: PENGETIKAN TEKS)
  const [studentAnswer, setStudentAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  // Speech-to-Text State (FITUR PENDUKUNG / SIDE FEATURE: WEB SPEECH API)
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechToast, setSpeechToast] = useState('');
  const recognitionRef = useRef(null);

  const CLASS_STUDENTS = [
    'Jason Pratama (Kamu)', 'Nabila Putri', 'Budi Prakoso', 'Aisyah Maharani',
    'Farhan Maulana', 'Zahra Amelia', 'Rafi Ramadhan', 'Dina Lestari'
  ];

  const ANTIGRAVITY_PALETTE = [
    '#18181b', '#2563eb', '#059669', '#d97706', '#4b5563', '#7c3aed'
  ];

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Update think timer when active case changes
  useEffect(() => {
    if (activeCase?.durasi) {
      setThinkSecondsLeft(activeCase.durasi);
    }
  }, [activeCase]);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && thinkSecondsLeft > 0) {
      interval = setInterval(() => {
        setThinkSecondsLeft(t => t - 1);
      }, 1000);
    } else if (thinkSecondsLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, thinkSecondsLeft]);

  // Wheel Spin Logic
  const handleSpin = () => {
    if (isSpinning || activeCases.length === 0) return;
    setIsSpinning(true);
    setEvaluationResult(null);
    setStage('input');

    const targetIdx = Math.floor(Math.random() * activeCases.length);
    const targetCase = activeCases[targetIdx];

    const extraTurns = 5;
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
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 2800);
  };

  // Toggle Web Speech API recording
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechToast('Browser ini belum mendukung Web Speech API native. Gunakan preset suara atau ketik langsung.');
      setTimeout(() => setSpeechToast(''), 4500);
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setSpeechToast('Perekaman suara selesai. Teks telah ditambahkan ke lembar jawaban.');
      setTimeout(() => setSpeechToast(''), 3000);
    } else {
      // Start listening
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechToast('🎙️ Mendengarkan suara... Silakan berbicara dalam Bahasa Indonesia.');
        };

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript + ' ';
          }
          if (currentTranscript.trim()) {
            setStudentAnswer((prev) => {
              const separator = prev.trim() ? ' ' : '';
              return prev.trim() + separator + currentTranscript.trim();
            });
          }
        };

        recognition.onerror = (event) => {
          setIsListening(false);
          setSpeechToast('Kendala mikrofon: ' + (event.error === 'not-allowed' ? 'Izin mikrofon ditolak.' : event.error));
          setTimeout(() => setSpeechToast(''), 4000);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        setIsListening(false);
        setSpeechToast('Gagal mengaktifkan mikrofon browser.');
        setTimeout(() => setSpeechToast(''), 3500);
      }
    }
  };

  // Insert Simulated Voice Presets
  const insertVoicePreset = (presetNumber) => {
    let presetText = '';
    if (presetNumber === 1) {
      presetText = 'Menurut saya, melarang total penggunaan AI saat ujian akhir tidak menyelesaikan persoalan integritas. Karena di masa depan, keterampilan menguji kebenaran rujukan adalah kunci orisinalitas nalar yang sesungguhnya. Sekolah seharusnya menguji kemampuan verifikasi prompt siswa dengan sumber primer.';
    } else {
      presetText = 'Bagi saya, solusi yang adil adalah format ujian hibrida dua tahap. Tahap pertama 45 menit tanpa gawai sama sekali untuk mengukur memori kerja dan konsep dasar. Tahap kedua 45 menit dengan AI, di mana siswa diminta memecahkan studi kasus kompleks yang memerlukan sintesis tingkat tinggi.';
    }

    setStudentAnswer((prev) => {
      const separator = prev.trim() ? '\n\n' : '';
      return prev.trim() + separator + presetText;
    });

    setSpeechToast(`Preset suara #${presetNumber} berhasil disisipkan ke area pengetikan teks.`);
    setTimeout(() => setSpeechToast(''), 3000);
  };

  // Insert Structure Helper Pill
  const insertTemplatePill = (type) => {
    let snippet = '';
    if (type === 'klaim') snippet = 'Menurut pendapat saya, ';
    else if (type === 'alasan') snippet = ' Hal ini dikarenakan ';
    else if (type === 'bukti') snippet = ' Sebagai bukti konkret, misalnya ';

    setStudentAnswer((prev) => prev + snippet);
  };

  // Submit Answer to AI for Comprehensive Evaluation
  const handleSubmitAnswer = () => {
    if (!studentAnswer.trim()) {
      alert('Mohon ketikkan argumen atau analisis jawaban Anda terlebih dahulu!');
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    setIsEvaluating(true);

    setTimeout(() => {
      const res = submitStudentResponse({
        caseId: activeCase.id,
        transcript: studentAnswer.trim(),
        durasiPikir: activeCase.durasi,
        durasiBicara: '01:20'
      });

      setEvaluationResult(res);
      setStage('insight');
      setIsEvaluating(false);

      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.5 }
      });
    }, 900);
  };

  const wordCount = studentAnswer.trim().split(/\s+/).filter(Boolean).length;

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
              <span style={{ background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-pill)', fontSize: '0.72rem', fontWeight: 600 }}>
                Aktivitas Pembelajaran Siswa
              </span>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Latihan Nalar Spontan</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Roda Putar & Lembar Jawaban Siswa
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Putar roda untuk mendapatkan tantangan studi kasus, ketikkan analisis argumenmu, dan dapatkan evaluasi AI seketika.
            </p>
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
              Mode Mandiri
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

        {/* NOTIFICATION TOAST */}
        {speechToast && (
          <div style={{
            background: '#111827',
            color: '#ffffff',
            padding: '0.85rem 1.4rem',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.86rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <Sparkles size={16} color="#38bdf8" />
            <span>{speechToast}</span>
          </div>
        )}

        {/* SECTION 1: PROMPT REEL SPINNER (SESUAI DESAIN ACUAN USER) */}
        <section style={{ marginBottom: '2.5rem' }}>
          <PromptSpinner
            cases={cases}
            activeCaseId={activeCaseId}
            onSelectCase={(id) => {
              setActiveCaseId(id);
              setEvaluationResult(null);
            }}
            onStartTimer={(caseItem) => {
              if (caseItem?.id) setActiveCaseId(caseItem.id);
              setIsTimerRunning(true);
              const answerEl = document.getElementById('modul-jawaban');
              if (answerEl) {
                answerEl.scrollIntoView({ behavior: 'smooth' });
                const textarea = answerEl.querySelector('textarea');
                if (textarea) textarea.focus();
              }
            }}
            materials={materials}
          />

          {/* Skenario Kasus Terpilih & Panduan Berpikir */}
          <div className="glass-card" style={{ maxWidth: '780px', margin: '1.5rem auto 0', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`badge ${
                  activeCase?.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                  activeCase?.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                }`}>
                  Taksonomi {activeCase?.levelBloom || 'Analisis'}
                </span>
                <span className="mono-tag" style={{ color: 'var(--text-secondary)' }}>
                  {activeCase?.kategori}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="btn btn-sm btn-secondary"
                  style={{ fontSize: '0.78rem', gap: '0.35rem', padding: '0.25rem 0.75rem' }}
                >
                  <Clock size={13} />
                  {isTimerRunning ? `${thinkSecondsLeft}s Berjalan` : `${thinkSecondsLeft}s Timer Pikir`}
                </button>
              </div>
            </div>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.96rem',
              lineHeight: 1.7,
              marginBottom: '1rem'
            }}>
              {activeCase?.teksKasus}
            </p>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {activeCase?.kataKunci?.map((k, i) => (
                <span key={i} className="mono-tag" style={{ fontSize: '0.72rem', background: '#f8f9fa', padding: '0.2rem 0.55rem', border: '1px solid #e5e7eb' }}>
                  #{k}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: MODUL JAWABAN SISWA (PENGETIKAN TEKS UTAMA & SPEECH-TO-TEXT OPSIONAL) */}
        <section id="modul-jawaban" className="glass-panel" style={{ padding: '2.5rem', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ background: '#f1f5f9', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#334155', fontSize: '0.75rem', fontWeight: 600 }}>
                Lembar Jawaban Siswa
              </span>
              <h3 style={{ fontSize: '1.5rem', marginTop: '0.35rem', color: '#111827', letterSpacing: '-0.02em' }}>
                Tuliskan Analisis & Kerangka Argumenmu
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Gunakan kotak teks di bawah untuk merumuskan argumen. Gunakan tombol mikrofon jika ingin mendiktekan dengan suara.
              </p>
            </div>

            {/* Quick Template Helper Buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => insertTemplatePill('klaim')}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                title="Sisipkan frasa klaim pokok"
              >
                + Frasa Klaim
              </button>
              <button
                type="button"
                onClick={() => insertTemplatePill('alasan')}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                title="Sisipkan frasa alasan logis"
              >
                + Frasa Alasan
              </button>
              <button
                type="button"
                onClick={() => insertTemplatePill('bukti')}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                title="Sisipkan frasa bukti nyata"
              >
                + Frasa Bukti
              </button>
            </div>
          </div>

          {/* Speech-to-Text Toolbar & Controls (Side Feature) */}
          <div style={{
            background: '#f8f9fa',
            border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 'var(--radius-card-sm)',
            padding: '1rem 1.25rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Voice Dictation Button */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`btn btn-sm ${isListening ? 'btn-danger recording-pulse' : 'btn-primary'}`}
                style={{ gap: '0.45rem', padding: '0.45rem 1rem' }}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                {isListening ? 'Berhenti Mendikte (Merekam...)' : 'Dikte Suara (Speech-to-Text)'}
              </button>

              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                {isListening ? '🔴 Berbicara sekarang...' : 'Web Speech API (Opsional)'}
              </span>
            </div>

            {/* Presets Fallback */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="mono-tag" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                CONTOH CEPAT:
              </span>
              <button
                type="button"
                onClick={() => insertVoicePreset(1)}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
              >
                <Zap size={12} /> Preset 1
              </button>
              <button
                type="button"
                onClick={() => insertVoicePreset(2)}
                className="btn btn-sm btn-secondary"
                style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
              >
                <Zap size={12} /> Preset 2
              </button>
            </div>
          </div>

          {/* MAIN TEXTAREA FOR STUDENT ARGUMENT (METODE UTAMA) */}
          <div style={{ marginBottom: '1.25rem' }}>
            <textarea
              className="textarea-custom"
              rows={8}
              placeholder="Ketikkan argumenmu di sini secara leluasa...&#10;&#10;Contoh struktur nalar yang baik:&#10;1. Klaim: Sikap/solusi pokok yang kamu tawarkan.&#10;2. Alasan: 'Hal ini dikarenakan...' (hubungan sebab-akibat yang logis).&#10;3. Bukti: 'Sebagai contoh konkret...' (data empiris, komparasi rujukan, atau situasi nyata)."
              value={studentAnswer}
              onChange={(e) => setStudentAnswer(e.target.value)}
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                padding: '1.2rem',
                borderColor: isListening ? '#e11d48' : undefined,
                boxShadow: isListening ? '0 0 0 3px rgba(225, 29, 72, 0.15)' : undefined
              }}
            />
          </div>

          {/* Action Row: Word Counter & Submit */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="mono-tag" style={{ color: wordCount >= 20 ? '#059669' : 'var(--text-muted)' }}>
                {wordCount} Kata {wordCount >= 20 ? '✓ (Cukup mendalam)' : '(Minimal ~20 kata disarankan)'}
              </span>

              {studentAnswer.trim() && (
                <button
                  type="button"
                  onClick={() => setStudentAnswer('')}
                  className="mono-tag"
                  style={{ background: 'none', border: 'none', color: '#e11d48', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Trash2 size={12} /> Bersihkan Teks
                </button>
              )}
            </div>

            <button
              onClick={handleSubmitAnswer}
              disabled={isEvaluating || !studentAnswer.trim()}
              className="btn btn-primary btn-lg"
              style={{ padding: '0.85rem 2.2rem' }}
            >
              <Sparkles size={18} />
              {isEvaluating ? 'AI Sedang Mengevaluasi Nalar...' : 'Kirim Jawaban untuk Evaluasi AI'}
            </button>
          </div>
        </section>

        {/* SECTION 3: HASIL EVALUASI AI (PILAR 3 — INSIGHT PANEL) */}
        {evaluationResult && (
          <section style={{ marginBottom: '3.5rem' }}>
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
                  <span style={{ background: '#f1f5f9', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', color: '#334155', fontSize: '0.75rem', fontWeight: 600 }}>
                    Hasil Evaluasi Formatif
                  </span>
                  <span style={{ color: '#047857', background: '#ecfdf5', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-pill)', fontSize: '0.75rem', fontWeight: 600 }}>
                    Tersimpan di Rekap Kelas & Portofolio
                  </span>
                </div>
                <h2 style={{ fontSize: '2rem', color: '#111827', letterSpacing: '-0.03em' }}>
                  Evaluasi Nalar & Perspektif AI
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActivePage('forum')}
                  className="btn btn-primary"
                  style={{ gap: '0.6rem' }}
                >
                  <BookOpen size={16} />
                  Bahas di Forum Diskusi
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => setActivePage('jurnal')}
                  className="btn btn-secondary"
                  style={{ gap: '0.5rem' }}
                >
                  <BookMarked size={16} />
                  Lihat Jurnal Reflektif
                </button>
              </div>
            </div>

            {/* SCORE HIGHLIGHT & STATUS CARD */}
            <div className="glass-panel" style={{
              padding: '2rem',
              marginBottom: '2rem',
              border: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>PREDIKAT KETEPATAN NALAR:</span>
                <h3 style={{ fontSize: '1.6rem', color: '#111827', margin: '0.3rem 0', letterSpacing: '-0.02em' }}>
                  {evaluationResult.statusKetepatan}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                  Jawaban telah dianalisis berdasarkan struktur klaim, logika kausalitas, dan relevansi konsep bahan ajar.
                </p>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: '#f8f9fa',
                padding: '1rem 1.75rem',
                borderRadius: 'var(--radius-card-sm)',
                border: '1px solid rgba(0,0,0,0.08)'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: evaluationResult.skor >= 85 ? '#ecfdf5' : '#eff6ff',
                  color: evaluationResult.skor >= 85 ? '#059669' : '#1d4ed8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={28} />
                </div>
                <div>
                  <div className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>SKOR PEMAHAMAN</div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#111827', lineHeight: 1.1 }}>
                    {evaluationResult.skor} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 CORE PILLARS OF EVALUATION */}
            <div className="grid-3" style={{ marginBottom: '2rem' }}>
              {/* KARTU 1: FEEDBACK KONSTRUKTIF AI */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={16} /> Umpan Balik Konstruktif
                  </h3>
                </div>

                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '14px',
                  padding: '1.1rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#065f46',
                  flex: 1
                }}>
                  {evaluationResult.feedback}
                </div>
              </div>

              {/* KARTU 2: PENJELASAN KOMPREHENSIF / KUNCI KONSEP */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <BookOpen size={16} /> Kunci Konsep & Penjelasan
                  </h3>
                </div>

                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '14px',
                  padding: '1.1rem',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  color: '#1e40af',
                  flex: 1
                }}>
                  {evaluationResult.penjelasanKonsep}
                </div>
              </div>

              {/* KARTU 3: CERMIN STRUKTUR ARGUMEN (Klaim, Alasan, Bukti) */}
              <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Edit3 size={15} /> Struktur Argumen
                  </h3>
                  <span className="mono-tag" style={{ color: '#059669', fontWeight: 700 }}>
                    Kerapian: {evaluationResult.cermin.clarityScore}%
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.83rem', flex: 1 }}>
                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.15rem' }}>📌 Klaim:</strong>
                    <div style={{ background: '#f8f9fa', padding: '0.55rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {evaluationResult.cermin.klaim}
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.15rem' }}>🧠 Alasan:</strong>
                    <div style={{ background: '#f8f9fa', padding: '0.55rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {evaluationResult.cermin.alasan}
                    </div>
                  </div>
                  <div>
                    <strong style={{ color: '#111827', display: 'block', marginBottom: '0.15rem' }}>🔍 Bukti:</strong>
                    <div style={{ background: '#f8f9fa', padding: '0.55rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                      {evaluationResult.cermin.bukti}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VERIFIED FACTS COMPARISON (WHITELIST CITATIONS) */}
            {evaluationResult.fakta && (
              <div className="glass-panel" style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShieldCheck size={18} color="#0f172a" />
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a' }}>
                      Komparasi Rujukan Resmi Terverifikasi
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Sumber Akademik (Kemdikbud/UNESCO/Garuda)</span>
                </div>

                <div className="grid-3" style={{ gap: '1rem' }}>
                  {evaluationResult.fakta.map((f) => (
                    <div key={f.id} className="glass-card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span className={`badge ${f.tipe === 'Menguatkan' ? 'badge-bloom-analisis' : 'badge-bloom-evaluasi'}`} style={{ fontSize: '0.68rem' }}>
                          {f.tipe}
                        </span>
                        <a href={f.link} target="_blank" rel="noreferrer" style={{ color: '#111827', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                          Rujukan <ExternalLink size={11} />
                        </a>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.84rem', marginBottom: '0.3rem', color: '#111827' }}>
                        {f.sumber}
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                        {f.ringkasan}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
