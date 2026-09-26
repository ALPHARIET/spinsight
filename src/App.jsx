import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPendamping } from './pages/DashboardPendamping';
import { SpinArena } from './pages/SpinArena';
import { ForumDiskusi } from './pages/ForumDiskusi';
import { ArenaPage } from './pages/ArenaPage';
import { JurnalSiswa } from './pages/JurnalSiswa';

export const MainContent = () => {
  const { isAuthenticated, currentUser, activePage } = useApp();

  // 1. Initial Page before Login: Landing Page
  // Sesuai permintaan user: "pada halaman pertama saat login itu landing page"
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // 2. Guru Role & Siswa Role with Unified Design System
  // Keduanya menggunakan Navbar terapung konsisten dan tema SpinSight yang sama
  const isGuru = currentUser?.role === 'pendamping' || currentUser?.role === 'guru';
  const effectivePage = (activePage === 'landing' || activePage === 'pendamping') ? 'spin' : activePage;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {isGuru ? (
          <DashboardPendamping />
        ) : (
          <>
            {effectivePage === 'spin' && <SpinArena />}
            {effectivePage === 'forum' && <ForumDiskusi />}
            {effectivePage === 'arena' && <ArenaPage />}
            {effectivePage === 'jurnal' && <JurnalSiswa />}
          </>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
