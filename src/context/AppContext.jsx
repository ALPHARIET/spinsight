import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_MATERIALS, 
  INITIAL_CASES, 
  INITIAL_ARENA_POSTS, 
  INITIAL_SYNTHESIS, 
  INITIAL_STUDENT_JOURNAL,
  INITIAL_EVALUATION_RECORDS,
  INITIAL_FORUM_POSTS
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

  // Rekapitulasi Evaluasi Siswa (AI) untuk Guru & Siswa
  const [evaluationRecords, setEvaluationRecords] = useState(() => {
    const saved = localStorage.getItem('spinsight_evaluations');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATION_RECORDS;
  });

  // Forum Diskusi Studi Kasus Akademik (Pilar Baru)
  const [forumPosts, setForumPosts] = useState(() => {
    const saved = localStorage.getItem('spinsight_forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_FORUM_POSTS;
  });

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

  // Current active navigation page with initial URL pathname support
  const [activePage, setActivePageState] = useState(() => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    const validPages = ['landing', 'spin', 'forum', 'arena', 'pendamping', 'jurnal'];
    return validPages.includes(path) ? path : 'landing';
  });

  // Teacher dashboard active sub-tab ('rekap_ai' | 'materi' | 'bank_kasus' | 'moderasi')
  const [teacherTab, setTeacherTab] = useState('rekap_ai');

  const setActivePage = (page) => {
    setActivePageState(page);
    try {
      const targetPath = page === 'landing' ? '/' : `/${page}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page }, '', targetPath);
      }
    } catch (e) {
      // Ignore in environments where pushState is constrained
    }
  };

  // Sync back/forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const validPages = ['landing', 'spin', 'forum', 'arena', 'pendamping', 'jurnal'];
      if (validPages.includes(path)) {
        setActivePageState(path);
      } else if (path === '') {
        setActivePageState('landing');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    localStorage.setItem('spinsight_evaluations', JSON.stringify(evaluationRecords));
  }, [evaluationRecords]);

  useEffect(() => {
    localStorage.setItem('spinsight_forum_posts', JSON.stringify(forumPosts));
  }, [forumPosts]);

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

  // Authentication Gate State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('spinsight_is_authenticated') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('spinsight_is_authenticated', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Actions: Login & Logout
  const login = (role = 'siswa', customName = null) => {
    let user;
    if (role === 'pendamping' || role === 'guru') {
      user = {
        id: 'usr-pendamping-1',
        nama: customName || 'Dra. Sri Wahyuni, M.Pd.',
        role: 'pendamping',
        kelas: '12-IPA 2 (SMA Cerdas Mandiri)',
        avatar: 'SW',
        email: 'guru@spinsight.edu'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      setActivePage('pendamping');
    } else {
      user = {
        id: 'usr-siswa-1',
        nama: customName || 'Jason Pratama',
        role: 'siswa',
        kelas: 'XI-IPA 2 (SMA Cerdas Mandiri)',
        avatar: 'JP',
        email: 'siswa@spinsight.edu'
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      setActivePage('spin');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('spinsight_is_authenticated');
    setActivePage('landing');
  };

  const switchRole = (newRole) => {
    login(newRole);
  };

  // Case Forge: Add teaching material and optionally generate cases
  const addTeachingMaterial = async ({ judul, deskripsi, fileName, fileSize, textSample, autoGenerate = true }) => {
    const newMaterial = {
      id: 'mat-' + Date.now(),
      kelasId: currentUser.kelas || 'XI-IPA 2',
      judul: judul || 'Modul Pembelajaran Baru',
      fileName: fileName || 'catatan_materi.pdf',
      fileSize: fileSize || '1.5 MB',
      tanggalUpload: new Date().toISOString().split('T')[0],
      status: 'selesai',
      deskripsi: deskripsi || 'Catatan bahan ajar dan studi kasus yang dimasukkan oleh pendamping.'
    };

    setMaterials(prev => [newMaterial, ...prev]);

    let newCases = [];
    if (autoGenerate) {
      newCases = await aiService.generateCasesFromMaterial(newMaterial.judul, textSample || deskripsi || '');
      newCases.forEach(c => { c.materialId = newMaterial.id; });
      setCases(prev => [...newCases, ...prev]);
    }

    return { material: newMaterial, generatedCases: newCases };
  };

  // Case Forge: Upload material and generate cases (legacy wrapper)
  const addMaterialAndGenerateCases = async (judul, fileName, textSample) => {
    const res = await addTeachingMaterial({
      judul,
      fileName,
      textSample,
      autoGenerate: true
    });
    return res.generatedCases;
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

  // Evaluation Records management
  const addEvaluationRecord = (record) => {
    setEvaluationRecords(prev => [record, ...prev]);
  };

  // Forum: Add new academic discussion thread
  const addForumPost = ({ materiId, materiJudul, kategori, judul, isi }) => {
    const matchedMaterial = materials.find(m => m.id === materiId);
    const newPost = {
      id: 'fp-' + Date.now(),
      materiId: materiId || (materials[0]?.id || 'mat-1'),
      materiJudul: materiJudul || (matchedMaterial?.judul || 'Materi Pembelajaran'),
      kategori: kategori || 'Diskusi Kasus',
      judul: judul.trim(),
      penulisNama: currentUser.nama,
      penulisRole: currentUser.role,
      penulisAvatar: currentUser.avatar || (currentUser.role === 'pendamping' ? 'SW' : 'JP'),
      isi: isi.trim(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      comments: []
    };
    setForumPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  // Forum: Add comment to a discussion thread
  const addComment = (postId, isi) => {
    if (!isi || !isi.trim()) return null;
    const newComment = {
      id: 'fpc-' + Date.now(),
      penulisNama: currentUser.nama,
      penulisRole: currentUser.role,
      penulisAvatar: currentUser.avatar || (currentUser.role === 'pendamping' ? 'SW' : 'JP'),
      isi: isi.trim(),
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    }));

    return newComment;
  };

  // Forum: Upvote/Like toggle
  const toggleLikeForumPost = (postId) => {
    setForumPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    }));
  };

  /**
   * Fitur 2: Submit student response (Spin Wheel & Modul Jawaban Siswa -> Evaluasi AI)
   * Integrasi tertutup:
   * 1. Evaluasi AI via aiService.evaluateStudentAnswer
   * 2. Simpan ke evaluationRecords (otomatis masuk ke rekapitulasi guru)
   * 3. Simpan ke journals (portofolio jurnal siswa)
   * 4. Buka akses Arena & post ke forum arena
   */
  const submitStudentResponse = ({ caseId, transcript, durasiPikir, durasiBicara }) => {
    const targetCase = cases.find(c => c.id === caseId) || cases[0];
    const targetMaterial = materials.find(m => m.id === targetCase.materialId);

    // Call AI Service for comprehensive 3-pillar evaluation
    const evalResult = aiService.evaluateStudentAnswer(targetCase, transcript);

    const insightPayload = {
      caseId: targetCase.id,
      caseJudul: targetCase.judulKasus,
      skor: evalResult.skor,
      statusKetepatan: evalResult.statusKetepatan,
      feedback: evalResult.feedback,
      penjelasanKonsep: evalResult.penjelasanKonsep,
      cermin: evalResult.cermin,
      fakta: evalResult.fakta,
      trend: evalResult.trend,
      transcript,
      durasiPikir,
      durasiBicara: durasiBicara || '01:15'
    };

    setActiveInsight(insightPayload);

    // 1. Simpan ke Rekapitulasi Evaluasi Guru (AI Automatic Evaluation Record)
    const newEvalRecord = {
      id: 'eval-' + Date.now(),
      siswaId: currentUser.id,
      siswaNama: currentUser.nama,
      kelas: currentUser.kelas || 'XI-IPA 2',
      caseId: targetCase.id,
      topikKasus: targetCase.judulKasus,
      materiJudul: targetMaterial ? targetMaterial.judul : 'Modul Pembelajaran',
      jawabanTeks: transcript,
      skor: evalResult.skor,
      statusKetepatan: evalResult.statusKetepatan,
      feedback: evalResult.feedback,
      penjelasanKonsep: evalResult.penjelasanKonsep,
      durasiPengerjaan: durasiBicara || '01:15',
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setEvaluationRecords(prev => [newEvalRecord, ...prev]);

    // 2. Simpan ke Jurnal Reflektif Siswa
    const newJournalEntry = {
      id: 'jrn-' + Date.now(),
      tanggal: new Date().toISOString().replace('T', ' ').slice(0, 16),
      caseJudul: targetCase.judulKasus,
      levelBloom: targetCase.levelBloom,
      durasiPikir,
      durasiBicara: durasiBicara || '01:15',
      skorArgumen: evalResult.skor,
      statusKetepatan: evalResult.statusKetepatan,
      feedback: evalResult.feedback,
      penjelasanKonsep: evalResult.penjelasanKonsep,
      transkrip: transcript,
      cermin: evalResult.cermin,
      dimensi: {
        kejelasanKlaim: evalResult.cermin.clarityScore,
        kekuatanAlasan: evalResult.cermin.alasan.includes('Belum') ? 72 : 90,
        ketajamanBukti: evalResult.cermin.bukti.includes('Belum') ? 70 : 88,
        kelancaranLisan: Math.max(72, 100 - (evalResult.cermin.fillerHits * 5)),
        kemandirianNalar: evalResult.skor
      },
      faktaCount: evalResult.fakta.length,
      statusArena: 'Selesai Dievaluasi'
    };

    setJournals(prev => [newJournalEntry, ...prev]);

    // 3. Simpan ke Arena Posts dan Buka Gembok
    const newPost = {
      id: 'post-' + Date.now(),
      caseId: targetCase.id,
      siswaNama: currentUser.nama,
      siswaRole: `Siswa (${currentUser.kelas})`,
      avatarColor: '#38bdf8',
      kutub: evalResult.skor > 85 ? 'Sintetis Kritis' : 'Eksplorasi Argumen',
      posisiX: Math.floor(Math.random() * 40) + 30,
      posisiY: Math.floor(Math.random() * 50) + 25,
      transkrip: transcript,
      skorArgumen: evalResult.skor,
      cermin: evalResult.cermin,
      waktu: 'Baru saja',
      replies: []
    };

    setArenaPosts(prev => [newPost, ...prev]);

    if (!unlockedCases.includes(targetCase.id)) {
      setUnlockedCases(prev => [...prev, targetCase.id]);
    }

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
    setEvaluationRecords(INITIAL_EVALUATION_RECORDS);
    setForumPosts(INITIAL_FORUM_POSTS);
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
      isAuthenticated,
      login,
      logout,
      switchRole,
      materials,
      cases,
      activeCaseId,
      setActiveCaseId,
      unlockedCases,
      activeInsight,
      setActiveInsight,
      evaluationRecords,
      addEvaluationRecord,
      forumPosts,
      addForumPost,
      addComment,
      toggleLikeForumPost,
      arenaPosts,
      syntheses,
      closedRooms,
      journals,
      activePage,
      setActivePage,
      teacherTab,
      setTeacherTab,
      addTeachingMaterial,
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
