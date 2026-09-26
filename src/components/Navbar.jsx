import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  RotateCw, 
  Users, 
  BookMarked, 
  MessageSquare,
  LogOut
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    isAuthenticated,
    logout,
    activePage, 
    setActivePage, 
    unlockedCases, 
    activeCaseId,
    teacherTab,
    setTeacherTab
  } = useApp();

  // If not authenticated, do not render inner app navbar
  if (!isAuthenticated) return null;

  const isGuru = currentUser?.role === 'pendamping' || currentUser?.role === 'guru';
  const isArenaUnlocked = unlockedCases.includes(activeCaseId);

  // Student Nav Items
  const studentNavItems = [
    { id: 'spin', label: 'Roda Putar', icon: <RotateCw size={15} /> },
    { id: 'forum', label: 'Forum Diskusi', icon: <MessageSquare size={15} /> },
    { id: 'arena', label: 'Arena Debat', icon: <Users size={15} />, badge: isArenaUnlocked },
    { id: 'jurnal', label: 'Jurnal Siswa', icon: <BookMarked size={15} /> }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: '0.85rem',
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      padding: '0 1rem'
    }}>
      <nav style={{
        pointerEvents: 'auto',
        width: '100%',
        maxWidth: '1240px',
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
        <div 
          onClick={() => {
            if (isGuru) {
              setTeacherTab('rekap_ai');
            } else {
              setActivePage('spin');
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            cursor: 'pointer'
          }}
        >
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
          <span style={{ 
            fontWeight: 800, 
            fontSize: '1.05rem',
            letterSpacing: '-0.03em',
            color: '#0f172a'
          }}>
            SPINSIGHT
          </span>
        </div>

        {/* Center Nav: Student Tabs (hidden for Guru) */}
        {!isGuru && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: '#f1f5f9',
            padding: '0.2rem',
            borderRadius: 'var(--radius-pill)'
          }}>
            {studentNavItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="btn btn-sm"
                  style={{
                    background: isActive ? '#0f172a' : 'transparent',
                    color: isActive ? '#ffffff' : '#475569',
                    border: 'none',
                    position: 'relative',
                    padding: '0.35rem 0.9rem',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 500
                  }}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#10b981'
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Right Controls: User Profile & Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* User Info Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-pill)'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: isGuru ? '#7c3aed' : '#2563eb',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {currentUser?.avatar || (isGuru ? 'SW' : 'JP')}
            </div>
            <span style={{ 
              fontSize: '0.82rem', 
              fontWeight: 600, 
              color: '#0f172a', 
              maxWidth: '220px', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }}>
              {currentUser?.nama || (isGuru ? 'Dra. Sri Wahyuni, M.Pd.' : 'Jason Pratama')}
            </span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              padding: '0.12rem 0.45rem',
              borderRadius: '6px',
              background: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0',
              lineHeight: 1
            }}>
              {isGuru ? 'Guru' : 'Siswa'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="btn btn-sm btn-secondary"
            style={{ fontSize: '0.78rem', gap: '0.35rem', padding: '0.35rem 0.85rem' }}
            title="Keluar dari akun dan kembali ke Beranda"
          >
            <LogOut size={13} color="#dc2626" />
            Keluar
          </button>
        </div>
      </nav>
    </header>
  );
};
