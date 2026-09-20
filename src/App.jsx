import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPendamping } from './pages/DashboardPendamping';
import { SpinArena } from './pages/SpinArena';
import { ArenaPage } from './pages/ArenaPage';
import { JurnalSiswa } from './pages/JurnalSiswa';

export const MainContent = () => {
  const { activePage } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {activePage === 'landing' && <LandingPage />}
        {activePage === 'pendamping' && <DashboardPendamping />}
        {activePage === 'spin' && <SpinArena />}
        {activePage === 'arena' && <ArenaPage />}
        {activePage === 'jurnal' && <JurnalSiswa />}
      </main>
    </div>
  );
};

export default function App() {
  return <MainContent />;
}
