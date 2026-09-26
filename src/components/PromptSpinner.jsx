import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ChevronDown, RotateCw, ArrowRight, Sparkles } from 'lucide-react';

export const PromptSpinner = ({ 
  cases = [], 
  activeCaseId, 
  onSelectCase, 
  onStartTimer,
  materials = []
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [filterBloom, setFilterBloom] = useState('Semua');
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Filtered pool of cases based on top pills
  const availableCases = cases.filter(c => {
    if (!c.aktif) return false;
    const matchBloom = filterBloom === 'Semua' || c.levelBloom === filterBloom;
    const matchCat = filterCategory === 'Semua' || c.kategori === filterCategory;
    return matchBloom && matchCat;
  });

  const pool = availableCases.length > 0 ? availableCases : cases;
  
  // Find current index
  const currentIndex = pool.findIndex(c => c.id === activeCaseId);
  const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
  const currentCase = pool[safeCurrentIndex] || pool[0];

  // Previous and Next cases for the reel window
  const prevIndex = (safeCurrentIndex - 1 + pool.length) % pool.length;
  const nextIndex = (safeCurrentIndex + 1) % pool.length;

  const prevCase = pool[prevIndex];
  const nextCase = pool[nextIndex];

  // Dynamic reel rolling index during spin
  const [reelDisplayIndex, setReelDisplayIndex] = useState(safeCurrentIndex);
  const spinIntervalRef = useRef(null);

  useEffect(() => {
    setReelDisplayIndex(safeCurrentIndex);
  }, [safeCurrentIndex]);

  // Spin Logic: Smooth Vertical Slot Reel Roll
  const handleSpin = () => {
    if (isSpinning || pool.length === 0) return;
    setIsSpinning(true);

    let speed = 75; // initial fast tick in ms
    let iterations = 0;
    const maxIterations = 24 + Math.floor(Math.random() * 8);
    let currentSlot = safeCurrentIndex;

    const tick = () => {
      currentSlot = (currentSlot + 1) % pool.length;
      setReelDisplayIndex(currentSlot);
      iterations++;

      if (iterations < maxIterations) {
        // Decelerate smoothly as we approach the final pick
        if (iterations > maxIterations - 8) {
          speed += 40;
        } else if (iterations > maxIterations - 4) {
          speed += 70;
        }
        spinIntervalRef.current = setTimeout(tick, speed);
      } else {
        // Land on the final chosen case
        const finalCase = pool[currentSlot];
        onSelectCase(finalCase.id);
        setIsSpinning(false);
        confetti({
          particleCount: 45,
          spread: 55,
          origin: { y: 0.6 }
        });
      }
    };

    spinIntervalRef.current = setTimeout(tick, speed);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearTimeout(spinIntervalRef.current);
    };
  }, []);

  const displayedCenterCase = pool[reelDisplayIndex] || currentCase;
  const displayedPrevCase = pool[(reelDisplayIndex - 1 + pool.length) % pool.length] || prevCase;
  const displayedNextCase = pool[(reelDisplayIndex + 1) % pool.length] || nextCase;

  // Distinct categories from cases
  const categories = Array.from(new Set(cases.map(c => c.kategori).filter(Boolean)));

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      border: '1px solid #e2e8f0',
      padding: '2.5rem 2rem',
      maxWidth: '780px',
      margin: '0 auto',
      boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
      position: 'relative'
    }}>
      {/* TOP FILTER PILLS */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Pill 1: Bloom Level */}
        <div style={{ position: 'relative' }}>
          <select
            value={filterBloom}
            onChange={(e) => setFilterBloom(e.target.value)}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '9999px',
              padding: '0.45rem 1.85rem 0.45rem 1.15rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              outline: 'none'
            }}
          >
            <option value="Semua">Tingkat: Semua Kategori</option>
            <option value="Analisis">Tingkat: Analisis</option>
            <option value="Evaluasi">Tingkat: Evaluasi</option>
            <option value="Kreasi">Tingkat: Kreasi</option>
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
        </div>

        {/* Pill 2: Topic / Category */}
        <div style={{ position: 'relative' }}>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '9999px',
              padding: '0.45rem 1.85rem 0.45rem 1.15rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              outline: 'none'
            }}
          >
            <option value="Semua">Topik: Semua Bidang</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>Topik: {cat}</option>
            ))}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }} />
        </div>
      </div>

      {/* REEL WINDOW */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '260px',
        position: 'relative',
        userSelect: 'none'
      }}>
        {/* Previous Prompt */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: '#94a3b8',
          opacity: 0.65,
          lineHeight: 1.4,
          padding: '0.5rem 1.5rem',
          maxWidth: '560px',
          filter: isSpinning ? 'blur(1.5px)' : 'none',
          transition: 'all 0.15s ease'
        }}>
          {displayedPrevCase?.judulKasus || 'Kasus Sebelumnya'}
        </div>

        {/* Upper Divider */}
        <div style={{
          width: '90%',
          maxWidth: '680px',
          height: '1px',
          backgroundColor: '#e2e8f0',
          margin: '1.25rem 0'
        }} />

        {/* Center Active Prompt */}
        <div style={{
          textAlign: 'center',
          padding: '0.75rem 1rem',
          maxWidth: '660px',
          filter: isSpinning ? 'blur(2px)' : 'none',
          transform: isSpinning ? 'scale(0.98)' : 'scale(1)',
          transition: 'all 0.12s ease'
        }}>
          <div style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.95rem',
            fontWeight: 700,
            color: '#0f172a',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            marginBottom: '0.75rem'
          }}>
            {displayedCenterCase?.judulKasus || 'Pilih atau Putar Kasus'}
          </div>

          {/* Clean Case Metadata Badges */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
              background: '#eff6ff',
              color: '#1d4ed8',
              border: '1px solid #dbeafe'
            }}>
              Taksonomi {displayedCenterCase?.levelBloom || 'Analisis'}
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
              background: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0'
            }}>
              {displayedCenterCase?.kategori || 'Etika Digital'}
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '0.15rem 0.55rem',
              borderRadius: '9999px',
              background: '#fef3c7',
              color: '#92400e',
              border: '1px solid #fde68a'
            }}>
              Waktu: {displayedCenterCase?.durasi || 60} Detik
            </span>
          </div>
        </div>

        {/* Lower Divider */}
        <div style={{
          width: '90%',
          maxWidth: '680px',
          height: '1px',
          backgroundColor: '#e2e8f0',
          margin: '1.25rem 0'
        }} />

        {/* Next Prompt */}
        <div style={{
          textAlign: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: '#94a3b8',
          opacity: 0.65,
          lineHeight: 1.4,
          padding: '0.5rem 1.5rem',
          maxWidth: '560px',
          filter: isSpinning ? 'blur(1.5px)' : 'none',
          transition: 'all 0.15s ease'
        }}>
          {displayedNextCase?.judulKasus || 'Kasus Berikutnya'}
        </div>
      </div>

      {/* BOTTOM ACTION PILLS */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.85rem',
        marginTop: '2.5rem',
        flexWrap: 'wrap'
      }}>
        {/* Solid Dark Button: Putar Kasus */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="btn btn-primary btn-lg"
          style={{
            minWidth: '160px',
            cursor: isSpinning ? 'default' : 'pointer'
          }}
        >
          <RotateCw size={16} className={isSpinning ? 'animate-spin' : ''} />
          {isSpinning ? 'Memutar...' : 'Putar Kasus Acak'}
        </button>

        {/* Outlined Button: Mulai Sesi Latihan */}
        <button
          onClick={() => onStartTimer && onStartTimer(displayedCenterCase)}
          disabled={isSpinning}
          className="btn btn-secondary btn-lg"
        >
          Mulai Latihan Kasus
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
