import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  RotateCw, 
  Users, 
  BookOpen, 
  BookMarked, 
  UserCheck, 
  RefreshCw
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser, 
    switchRole, 
    activePage, 
    setActivePage, 
    unlockedCases, 
    activeCaseId,
    resetToDefault 
  } = useApp();

  const isArenaUnlocked = unlockedCases.includes(activeCaseId);

  return (
    <header style={{
      position: 'fixed',
      top: '1rem',
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
        maxWidth: '1160px',
        height: '3.8rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.25rem'
      }}>
        {/* Brand Logo (Antigravity Style) */}
        <div 
          onClick={() => setActivePage('landing')}
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
            borderRadius: '50%',
            background: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <RotateCw size={16} color="#ffffff" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: 800, 
              fontSize: '1.15rem',
              letterSpacing: '-0.03em',
              color: '#111827'
            }}>
              SPINSIGHT
            </span>
            <span className="mono-tag" style={{
              fontSize: '0.65rem',
              color: '#4b5563',
              background: '#f1f3f4',
              padding: '0.15rem 0.5rem',
              borderRadius: 'var(--radius-pill)'
            }}>
              RafaTech
            </span>
          </div>
        </div>

        {/* Center Nav Links (Antigravity Pill Navigation) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: '#f1f3f4',
          padding: '0.22rem',
          borderRadius: 'var(--radius-pill)'
        }}>
          {[
            { id: 'landing', label: 'Landing', icon: <Compass size={14} /> },
            { id: 'spin', label: 'Spin Arena', icon: <RotateCw size={14} /> },
            { id: 'arena', label: 'Arena', icon: <Users size={14} />, badge: isArenaUnlocked },
            { id: 'jurnal', label: 'Jurnal', icon: <BookMarked size={14} /> },
            { id: 'pendamping', label: 'Dashboard Guru', icon: <BookOpen size={14} />, action: () => {
              if (currentUser.role !== 'pendamping') switchRole('pendamping');
              setActivePage('pendamping');
            }}
          ].map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={item.action || (() => setActivePage(item.id))}
                className="btn btn-sm"
                style={{
                  background: isActive ? '#000000' : 'transparent',
                  color: isActive ? '#ffffff' : '#4b5563',
                  border: 'none',
                  position: 'relative',
                  padding: '0.35rem 0.9rem'
                }}
              >
                {item.icon}
                {item.label}
                {item.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#059669'
                  }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => switchRole(currentUser.role === 'siswa' ? 'pendamping' : 'siswa')}
            className="btn btn-sm btn-secondary"
            style={{ fontSize: '0.78rem', gap: '0.35rem', padding: '0.35rem 0.85rem' }}
            title="Klik untuk beralih mode Siswa atau Guru/Pendamping"
          >
            <UserCheck size={13} />
            {currentUser.role === 'pendamping' ? 'Guru' : 'Siswa'}
          </button>

          <button
            onClick={resetToDefault}
            className="btn btn-sm btn-secondary"
            title="Reset data demo"
            style={{ padding: '0.35rem 0.6rem' }}
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </nav>
    </header>
  );
};
