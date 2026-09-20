import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Clock, 
  Calendar, 
  Filter
} from 'lucide-react';

export const JurnalSiswa = () => {
  const { journals, currentUser } = useApp();
  const [filterBloom, setFilterBloom] = useState('Semua');

  const filteredJournals = journals.filter(j => {
    if (filterBloom === 'Semua') return true;
    return j.levelBloom === filterBloom;
  });

  const averages = journals.reduce((acc, j) => {
    const dim = j.dimensi || {
      kejelasanKlaim: 85,
      kekuatanAlasan: 82,
      ketajamanBukti: 80,
      kelancaranLisan: 88,
      kemandirianNalar: 86
    };
    acc.klaim += dim.kejelasanKlaim;
    acc.alasan += dim.kekuatanAlasan;
    acc.bukti += dim.ketajamanBukti;
    acc.kelancaran += dim.kelancaranLisan;
    acc.kemandirian += dim.kemandirianNalar;
    acc.totalScore += j.skorArgumen;
    return acc;
  }, { klaim: 0, alasan: 0, bukti: 0, kelancaran: 0, kemandirian: 0, totalScore: 0 });

  const count = journals.length || 1;
  const avgMetrics = {
    klaim: Math.round(averages.klaim / count),
    alasan: Math.round(averages.alasan / count),
    bukti: Math.round(averages.bukti / count),
    kelancaran: Math.round(averages.kelancaran / count),
    kemandirian: Math.round(averages.kemandirian / count),
    overall: Math.round(averages.totalScore / count)
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {/* Header Jurnal */}
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
                // JURNAL & TELEMETRI
              </span>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>REFLECTIVE PORTFOLIO</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', color: '#111827', letterSpacing: '-0.03em' }}>Rekam Jejak Nalar Lisan</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Apa yang kamu ucapkan tidak hilang saat bel berbunyi. Ini adalah portofolio kematangan berpikirmu.
            </p>
          </div>

          <div className="glass-panel" style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SISWA</div>
              <div style={{ fontWeight: 700, color: '#111827' }}>{currentUser.nama}</div>
            </div>
            <div style={{ height: '20px', width: '1px', background: 'rgba(0,0,0,0.1)' }} />
            <div>
              <div className="mono-tag" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>RATA-RATA NALAR</div>
              <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.15rem' }}>
                {avgMetrics.overall} / 100
              </div>
            </div>
          </div>
        </div>

        {/* 5 DIMENSI KEMAMPUAN BERNALAR */}
        <div className="glass-panel" style={{ padding: '2.25rem', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 className="mono-tag" style={{ fontSize: '1rem', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} /> // METRIK 5 DIMENSI KEMAMPUAN NALAR
            </h2>
            <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>AI ARGUMENT MIRROR</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem'
          }}>
            {[
              { label: 'Kejelasan Klaim', score: avgMetrics.klaim, desc: 'Kemampuan menyatakan posisi secara lugas' },
              { label: 'Kekuatan Alasan', score: avgMetrics.alasan, desc: 'Logika kausalitas dan rasionalitas' },
              { label: 'Ketajaman Bukti', score: avgMetrics.bukti, desc: 'Penggunaan data empiris & rujukan' },
              { label: 'Kelancaran Lisan', score: avgMetrics.kelancaran, desc: 'Minimnya kata pengisi (fillers)' },
              { label: 'Kemandirian Nalar', score: avgMetrics.kemandirian, desc: 'Kedalaman berpikir tanpa bias tiru' },
            ].map((m, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center', background: '#ffffff' }}>
                <div className="mono-tag" style={{ fontSize: '0.78rem', marginBottom: '0.65rem', color: '#111827' }}>
                  {m.label}
                </div>

                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  margin: '0 auto 0.75rem',
                  border: '2px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: '#111827',
                  background: '#f8f9fa'
                }}>
                  {m.score}%
                </div>

                <div style={{ width: '100%', height: '4px', background: '#e5e7eb', borderRadius: '2px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ width: `${m.score}%`, height: '100%', background: '#111827' }} />
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ARSIP HISTORI TRANSKRIP */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontSize: '1.6rem', color: '#111827', letterSpacing: '-0.03em' }}>
              Riwayat Sesi Diskusi ({filteredJournals.length} Catatan)
            </h2>

            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <Filter size={14} color="var(--text-muted)" style={{ marginRight: '0.2rem' }} />
              {['Semua', 'Analisis', 'Evaluasi', 'Kreasi'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFilterBloom(lvl)}
                  className={`btn btn-sm ${filterBloom === lvl ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredJournals.map((j) => (
              <div key={j.id} className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span className={`badge ${
                        j.levelBloom === 'Evaluasi' ? 'badge-bloom-evaluasi' :
                        j.levelBloom === 'Kreasi' ? 'badge-bloom-kreasi' : 'badge-bloom-analisis'
                      }`}>
                        // {j.levelBloom}
                      </span>
                      <span className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Calendar size={12} /> {j.tanggal}
                      </span>
                      <span className="mono-tag" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={12} /> {j.durasiBicara} durasi
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', color: '#111827', letterSpacing: '-0.02em' }}>{j.caseJudul}</h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', fontFamily: 'var(--font-mono)' }}>
                      {j.skorArgumen} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ 100</span>
                    </div>
                    <span className="mono-tag" style={{ color: '#059669', fontSize: '0.7rem' }}>
                      {j.statusArena}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '1.15rem 1.25rem',
                  borderRadius: 'var(--radius-card-sm)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  marginBottom: '1rem',
                  fontSize: '0.94rem',
                  lineHeight: 1.65,
                  color: '#1f2937'
                }}>
                  "{j.transkrip}"
                </div>

                {j.cermin && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '0.75rem',
                    fontSize: '0.84rem',
                    background: '#ffffff',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-card-sm)',
                    border: '1px solid rgba(0,0,0,0.07)'
                  }}>
                    <div>
                      <strong className="mono-tag" style={{ color: '#111827' }}>// KLAIM:</strong> {j.cermin.klaim}
                    </div>
                    <div>
                      <strong className="mono-tag" style={{ color: '#111827' }}>// ALASAN:</strong> {j.cermin.alasan}
                    </div>
                    <div>
                      <strong className="mono-tag" style={{ color: '#111827' }}>// BUKTI:</strong> {j.cermin.bukti}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
