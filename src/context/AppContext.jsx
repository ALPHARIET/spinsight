import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_MATERIALS, 
  INITIAL_CASES, 
  INITIAL_ARENA_POSTS, 
  INITIAL_SYNTHESIS, 
  INITIAL_STUDENT_JOURNAL 
} from '../data/seedData';
import { aiService } from '../services/aiService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // User & Class state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('spinsight_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-siswa-1',
      nama: 'Jason Pratama',
      role: 'siswa', // 'siswa' | 'pendamping'
      kelas: 'XI-IPA 2 (SMA Cerdas Mandiri)',
      avatar: 'JP'
    };
  });

  // Materials (Case Forge)
  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('spinsight_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  // Cases (Bank Kasus)
  const [cases, setCases] = useState(() => {
    const saved = localStorage.getItem('spinsight_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  // Active Selected Case for Spinning/Current Session
  const [activeCaseId, setActiveCaseId] = useState(() => {
    return INITIAL_CASES[0].id;
  });

  // Unlocked Arena cases (Only accessible after answering orally)
  const [unlockedCases, setUnlockedCases] = useState(() => {
    const saved = localStorage.getItem('spinsight_unlocked_cases');
    return saved ? JSON.parse(saved) : ['case-1']; // default case-1 is accessible in demo
  });

  // Active Session Insight result (Pilar 3)
  const [activeInsight, setActiveInsight] = useState(null);

  // Arena Posts & Discussions
  const [arenaPosts, setArenaPosts] = useState(() => {
    const saved = localStorage.getItem('spinsight_arena_posts');
    return saved ? JSON.parse(saved) : INITIAL_ARENA_POSTS;
  });

  // Class Synthesis (when closed by teacher)
  const [syntheses, setSyntheses] = useState(() => {
    const saved = localStorage.getItem('spinsight_synthesis');
    return saved ? JSON.parse(saved) : { 'case-1': INITIAL_SYNTHESIS };
  });

  // Discussion room closed status
  const [closedRooms, setClosedRooms] = useState(() => {
    const saved = localStorage.getItem('spinsight_closed_rooms');
    return saved ? JSON.parse(saved) : {};
  });

  // Student Journal
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('spinsight_journals');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_JOURNAL;
  });

  // Current active navigation page
  const [activePage, setActivePage] = useState('landing'); // 'landing' | 'spin' | 'arena' | 'pendamping' | 'jurnal'

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('spinsight_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('spinsight_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('spinsight_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('spinsight_unlocked_cases', JSON.stringify(unlockedCases));
  }, [unlockedCases]);

  useEffect(() => {
    localStorage.setItem('spinsight_arena_posts', JSON.stringify(arenaPosts));
  }, [arenaPosts]);

  useEffect(() => {
    localStorage.setItem('spinsight_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('spinsight_synthesis', JSON.stringify(syntheses));
  }, [syntheses]);

  useEffect(() => {
    localStorage.setItem('spinsight_closed_rooms', JSON.stringify(closedRooms));
  }, [closedRooms]);

  // Actions
  const switchRole = (newRole) => {
    if (newRole === 'pendamping') {
      setCurrentUser({
        id: 'usr-pendamping-1',
        nama: 'Dra. Sri Wahyuni, M.Pd.',
        role: 'pendamping',
        kelas: 'XI-IPA 2 (SMA Cerdas Mandiri)',
        avatar: 'SW'
      });
      setActivePage('pendamping');
    } else {
      setCurrentUser({
        id: 'usr-siswa-1',
        nama: 'Jason Pratama',
        role: 'siswa',
        kelas: 'XI-IPA 2 (SMA Cerdas Mandiri)',
        avatar: 'JP'
      });
      setActivePage('spin');
    }
  };

  // Case Forge: Upload material and generate cases
  const addMaterialAndGenerateCases = async (judul, fileName, textSample) => {
    const newMaterial = {
      id: 'mat-' + Date.now(),
      kelasId: 'kls-1',
      judul: judul || 'Dokumen Pelajaran Baru',
      fileName: fileName || 'modul_pembelajaran.pdf',
      fileSize: '1.8 MB',
      tanggalUpload: new Date().toISOString().split('T')[0],
      status: 'selesai',
      deskripsi: 'Kasus diekstrak otomatis oleh AI dari dokumen yang diunggah pendamping.'
    };

    setMaterials(prev => [newMaterial, ...prev]);

    // Call AI Service to generate Bloom cases
    const newCases = await aiService.generateCasesFromMaterial(newMaterial.judul, textSample || '');
    newCases.forEach(c => { c.materialId = newMaterial.id; });
    setCases(prev => [...newCases, ...prev]);
    return newCases;
  };

  const toggleCaseActive = (id) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, aktif: !c.aktif } : c));
  };

  const deleteCase = (id) => {
    setCases(prev => prev.filter(c => c.id !== id));
  };

  const updateCase = (id, updatedFields) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
  };

  /**
   * Submit student oral response (Spin Arena -> Insight Panel -> Unlock Arena)
   * Implements the closed loop:
   * 1. Transkrip masuk ke AI Cermin Argumen
   * 2. Menghasilkan Fakta Terverifikasi & Trend
   * 3. Otomatis menjadi post pembuka siswa di Arena
   * 4. Membuka kunci ruang Arena kasus tersebut
   * 5. Masuk ke Jurnal Siswa
   */
  const submitStudentResponse = ({ caseId, transcript, durasiPikir, durasiBicara }) => {
    const targetCase = cases.find(c => c.id === caseId) || cases[0];
    const cermin = aiService.analyzeArgumentStructure(transcript);
    const fakta = aiService.getVerifiedFactsForTopic(targetCase, transcript);
    const trend = aiService.getTrendAndUniqueFact(targetCase);

    const insightPayload = {
      caseId: targetCase.id,
      caseJudul: targetCase.judulKasus,
      cermin,
      fakta,
      trend,
      transcript,
      durasiPikir,
      durasiBicara
    };

    setActiveInsight(insightPayload);

    // 1. Create automatic Arena post from student voice transcript
    const newPost = {
      id: 'post-' + Date.now(),
      caseId: targetCase.id,
      siswaNama: currentUser.nama,
      siswaRole: `Siswa (${currentUser.kelas})`,
      avatarColor: '#38bdf8',
      kutub: cermin.skorArgumen > 85 ? 'Sintetis Kritis' : 'Eksplorasi Argumen',
      posisiX: Math.floor(Math.random() * 40) + 30,
      posisiY: Math.floor(Math.random() * 50) + 25,
      transkrip: transcript,
      skorArgumen: cermin.skorArgumen,
      cermin,
      waktu: 'Baru saja',
      replies: []
    };

    setArenaPosts(prev => [newPost, ...prev]);

    // 2. Unlock the arena for this case (Think-Pair-Share rule)
    if (!unlockedCases.includes(targetCase.id)) {
      setUnlockedCases(prev => [...prev, targetCase.id]);
    }

    // 3. Save to Student Journal (Reflective Journaling)
    const newJournalEntry = {
      id: 'jrn-' + Date.now(),
      tanggal: new Date().toISOString().replace('T', ' ').slice(0, 16),
      caseJudul: targetCase.judulKasus,
      levelBloom: targetCase.levelBloom,
      durasiPikir,
      durasiBicara: durasiBicara || '01:05',
      skorArgumen: cermin.skorArgumen,
      transkrip: transcript,
      cermin,
      dimensi: {
        kejelasanKlaim: cermin.clarityScore,
        kekuatanAlasan: cermin.alasan.includes('Belum') ? 70 : 88,
        ketajamanBukti: cermin.bukti.includes('Belum') ? 68 : 86,
        kelancaranLisan: Math.max(70, 100 - (cermin.fillerHits * 5)),
        kemandirianNalar: cermin.skorArgumen
      },
      faktaCount: fakta.length,
      statusArena: 'Menunggu Tanggapan'
    };

    setJournals(prev => [newJournalEntry, ...prev]);

    return insightPayload;
  };

  // Add labeled reply to arena post
  const addArenaReply = (postId, replyData) => {
    setArenaPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          replies: [
            ...p.replies,
            {
              id: 'rep-' + Date.now(),
              siswaNama: currentUser.nama,
              label: replyData.label,
              isi: replyData.isi,
              waktu: 'Baru saja'
            }
          ]
        };
      }
      return p;
    }));
  };

  // Close discussion room & trigger AI Synthesis
  const closeDiscussionRoom = (caseId) => {
    const relevantPosts = arenaPosts.filter(p => p.caseId === caseId);
    const synth = aiService.generateClassSynthesis(relevantPosts);
    setSyntheses(prev => ({ ...prev, [caseId]: synth }));
    setClosedRooms(prev => ({ ...prev, [caseId]: true }));
  };

  // Reset demo
  const resetToDefault = () => {
    localStorage.clear();
    setMaterials(INITIAL_MATERIALS);
    setCases(INITIAL_CASES);
    setArenaPosts(INITIAL_ARENA_POSTS);
    setUnlockedCases(['case-1']);
    setSyntheses({ 'case-1': INITIAL_SYNTHESIS });
    setClosedRooms({});
    setJournals(INITIAL_STUDENT_JOURNAL);
    setActiveCaseId(INITIAL_CASES[0].id);
    setActiveInsight(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      switchRole,
      materials,
      cases,
      activeCaseId,
      setActiveCaseId,
      unlockedCases,
      activeInsight,
      setActiveInsight,
      arenaPosts,
      syntheses,
      closedRooms,
      journals,
      activePage,
      setActivePage,
      addMaterialAndGenerateCases,
      toggleCaseActive,
      deleteCase,
      updateCase,
      submitStudentResponse,
      addArenaReply,
      closeDiscussionRoom,
      resetToDefault
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
