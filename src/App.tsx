import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MainMenu } from './components/MainMenu';
import { CrimeSceneView } from './components/CrimeSceneView';
import { SuspectWall } from './components/SuspectWall';
import { EvidenceRoom } from './components/EvidenceRoom';
import { InterrogationRoom } from './components/InterrogationRoom';
import { ContradictionDetector } from './components/ContradictionDetector';
import { TimelineView } from './components/TimelineView';
import { TheoryBoard } from './components/TheoryBoard';
import { FinalAccusationModal } from './components/FinalAccusationModal';
import { SolutionRevealModal } from './components/SolutionRevealModal';
import { LoadingScreen } from './components/LoadingScreen';
import {
  ALL_CASES,
  getCaseById,
  getCaseByLevel,
  evaluateCaseAccusation,
} from './data/allCases';
import {
  ActiveLevelState,
  ChatMessage,
  GameSettings,
  LevelStats,
  VerdictEvaluation,
  VerdictSubmission,
} from './types/case';
import { soundFX } from './utils/sound';
import {
  AlertTriangle,
  RotateCcw,
  Home,
  Play,
  Volume2,
  VolumeX,
  HelpCircle,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

const STATS_STORAGE_KEY = 'case_zero_campaign_stats_v2';
const ACTIVE_LEVEL_STORAGE_KEY = 'case_zero_active_level_v2';
const ACHIEVEMENTS_STORAGE_KEY = 'case_zero_achievements_v2';
const SETTINGS_STORAGE_KEY = 'case_zero_settings_v2';

function createInitialStats(): Record<string, LevelStats> {
  const initial: Record<string, LevelStats> = {};
  for (const c of ALL_CASES) {
    initial[c.id] = {
      levelNumber: c.levelNumber,
      caseId: c.id,
      unlocked: c.levelNumber === 1,
      completed: false,
      bestScore: 0,
      bestRank: null,
      fastestTimeSeconds: null,
      attempts: 0,
    };
  }
  return initial;
}

function createFreshActiveLevel(
  levelNumber: number,
  timerMultiplier: number
): ActiveLevelState {
  const targetCase = getCaseByLevel(levelNumber);
  const scaledSeconds = Math.round(
    targetCase.timeLimitSeconds * timerMultiplier
  );
  return {
    caseId: targetCase.id,
    levelNumber: targetCase.levelNumber,
    remainingSeconds: scaledSeconds,
    elapsedSeconds: 0,
    discoveredClueIds: [targetCase.clues[0]?.id, targetCase.clues[1]?.id].filter(
      Boolean
    ),
    importantClueIds: [],
    clueNotes: {},
    questionedSuspectIds: [],
    confirmedContradictionIds: [],
    investigationNotes: '',
    suspectedCulpritId: null,
    selectedMotiveId: targetCase.motiveOptions[0]?.id || '',
    selectedOpportunityId: targetCase.opportunityOptions[0]?.id || '',
    linkedClueIds: [],
    unansweredQuestions: [
      `Who had physical access to ${targetCase.location} during ${targetCase.timeframe}?`,
      `Which suspect’s alibi conflicts with the forensic timestamp logs?`,
      `Where is ${targetCase.victimItem.title} currently hidden?`,
    ],
    hintsUsed: 0,
    wrongAccusations: 0,
    caseCompleted: false,
    caseFailed: false,
    chatHistory: {},
  };
}

export default function App() {
  const [isInitializing, setIsInitializing] = useState(true);
  const [gameMode, setGameMode] = useState<'menu' | 'playing'>('menu');
  const [currentTab, setCurrentTab] = useState<string>('crimescene');

  // Modals & Overlays
  const [isVerdictOpen, setIsVerdictOpen] = useState(false);
  const [isRevealOpen, setIsRevealOpen] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Contradiction detector pre-selections
  const [statementForContradiction, setStatementForContradiction] = useState<
    string | null
  >(null);
  const [clueForContradiction, setClueForContradiction] = useState<
    string | null
  >(null);

  // Settings State
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      soundEnabled: true,
      timerMultiplier: 1,
      sandboxUnlockAll: false,
      tutorialSeen: false,
    };
  });

  // Campaign Level Stats
  const [levelStats, setLevelStats] = useState<Record<string, LevelStats>>(
    () => {
      try {
        const saved = localStorage.getItem(STATS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...createInitialStats(), ...parsed };
        }
      } catch {
        // ignore
      }
      return createInitialStats();
    }
  );

  // Active Level Investigation State
  const [activeLevelState, setActiveLevelState] =
    useState<ActiveLevelState | null>(() => {
      try {
        const saved = localStorage.getItem(ACTIVE_LEVEL_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
      return null;
    });

  // Active Suspect inside Interrogation Room
  const [activeSuspectId, setActiveSuspectId] = useState<string>('');

  // Achievements State
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<
    string[]
  >(() => {
    try {
      const saved = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Sync sound setting
  useEffect(() => {
    soundFX.enabled = settings.soundEnabled;
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Save level stats
  useEffect(() => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(levelStats));
    } catch {
      // ignore
    }
  }, [levelStats]);

  // Save active level state
  useEffect(() => {
    try {
      if (activeLevelState) {
        localStorage.setItem(
          ACTIVE_LEVEL_STORAGE_KEY,
          JSON.stringify(activeLevelState)
        );
      } else {
        localStorage.removeItem(ACTIVE_LEVEL_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [activeLevelState]);

  // Save achievements
  useEffect(() => {
    try {
      localStorage.setItem(
        ACHIEVEMENTS_STORAGE_KEY,
        JSON.stringify(unlockedAchievementIds)
      );
    } catch {
      // ignore
    }
  }, [unlockedAchievementIds]);

  // Initial loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Proper Level Countdown Timer with Clean-up
  useEffect(() => {
    if (
      gameMode !== 'playing' ||
      !activeLevelState ||
      activeLevelState.caseCompleted ||
      activeLevelState.caseFailed ||
      isPauseOpen ||
      isRevealOpen ||
      isTutorialOpen
    ) {
      return;
    }

    const interval = setInterval(() => {
      setActiveLevelState((prev) => {
        if (!prev || prev.caseCompleted || prev.caseFailed) return prev;
        if (prev.remainingSeconds <= 1) {
          return {
            ...prev,
            remainingSeconds: 0,
            elapsedSeconds: prev.elapsedSeconds + 1,
            caseFailed: true,
          };
        }
        return {
          ...prev,
          remainingSeconds: prev.remainingSeconds - 1,
          elapsedSeconds: prev.elapsedSeconds + 1,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [
    gameMode,
    activeLevelState?.caseId,
    activeLevelState?.caseCompleted,
    activeLevelState?.caseFailed,
    isPauseOpen,
    isRevealOpen,
    isTutorialOpen,
  ]);

  const unlockAchievement = (achId: string) => {
    setUnlockedAchievementIds((prev) =>
      prev.includes(achId) ? prev : [...prev, achId]
    );
  };

  // Start a specific level (1..10)
  const handleStartLevel = (levelNumber: number) => {
    soundFX.playClick();
    const fresh = createFreshActiveLevel(levelNumber, settings.timerMultiplier);
    const targetCase = getCaseByLevel(levelNumber);

    setActiveLevelState(fresh);
    setActiveSuspectId(targetCase.suspects[0]?.id || '');
    setStatementForContradiction(null);
    setClueForContradiction(null);
    setIsVerdictOpen(false);
    setIsRevealOpen(false);
    setIsPauseOpen(false);
    setCurrentTab('crimescene');
    setGameMode('playing');

    setLevelStats((prev) => {
      const existing = prev[targetCase.id] || {
        levelNumber,
        caseId: targetCase.id,
        unlocked: true,
        completed: false,
        bestScore: 0,
        bestRank: null,
        fastestTimeSeconds: null,
        attempts: 0,
      };
      return {
        ...prev,
        [targetCase.id]: {
          ...existing,
          unlocked: true,
          attempts: existing.attempts + 1,
        },
      };
    });

    if (!settings.tutorialSeen && levelNumber === 1) {
      setIsTutorialOpen(true);
      setSettings((s) => ({ ...s, tutorialSeen: true }));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueActiveLevel = () => {
    if (!activeLevelState) return;
    soundFX.playClick();
    const targetCase = getCaseById(activeLevelState.caseId);
    setActiveSuspectId(targetCase.suspects[0]?.id || '');
    setIsPauseOpen(false);
    setGameMode('playing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartCurrentLevel = () => {
    if (!activeLevelState) return;
    handleStartLevel(activeLevelState.levelNumber);
  };

  const activeCase = activeLevelState
    ? getCaseById(activeLevelState.caseId)
    : ALL_CASES[0];

  // Clue Discovery & Notes Handlers
  const handleDiscoverClue = (clueId: string) => {
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      if (prev.discoveredClueIds.includes(clueId)) return prev;
      soundFX.playClueDiscovered();
      return {
        ...prev,
        discoveredClueIds: [...prev.discoveredClueIds, clueId],
      };
    });
  };

  const handleDiscoverAllClues = () => {
    soundFX.playClueDiscovered();
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        discoveredClueIds: activeCase.clues.map((c) => c.id),
      };
    });
  };

  const handleToggleImportantClue = (clueId: string) => {
    soundFX.playClick();
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      const exists = prev.importantClueIds.includes(clueId);
      return {
        ...prev,
        importantClueIds: exists
          ? prev.importantClueIds.filter((id) => id !== clueId)
          : [...prev.importantClueIds, clueId],
      };
    });
  };

  const handleSaveClueNote = (clueId: string, note: string) => {
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        clueNotes: {
          ...prev.clueNotes,
          [clueId]: note,
        },
      };
    });
  };

  const handleUseHint = () => {
    soundFX.playClick();
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        hintsUsed: Math.min(activeCase.hints.length, prev.hintsUsed + 1),
      };
    });
  };

  // Interrogation Handlers
  const handleInterrogateSuspect = (suspectId: string) => {
    soundFX.playClick();
    setActiveSuspectId(suspectId);
    setCurrentTab('interrogation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (
    suspectId: string,
    questionText: string,
    replyText: string,
    isFallback: boolean
  ) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const userMsg: ChatMessage = {
      id: `MSG-${Date.now()}-u`,
      sender: 'player',
      suspectId,
      text: questionText,
      timestamp: timeStr,
    };
    const replyMsg: ChatMessage = {
      id: `MSG-${Date.now()}-s`,
      sender: 'suspect',
      suspectId,
      text: replyText,
      timestamp: timeStr,
      isFallback,
    };

    setActiveLevelState((prev) => {
      if (!prev) return prev;
      const existingChat = prev.chatHistory[suspectId] || [];
      const qSuspects = prev.questionedSuspectIds.includes(suspectId)
        ? prev.questionedSuspectIds
        : [...prev.questionedSuspectIds, suspectId];

      return {
        ...prev,
        questionedSuspectIds: qSuspects,
        chatHistory: {
          ...prev.chatHistory,
          [suspectId]: [...existingChat, userMsg, replyMsg],
        },
      };
    });
  };

  const handleClearHistory = (suspectId: string) => {
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        chatHistory: {
          ...prev.chatHistory,
          [suspectId]: [],
        },
      };
    });
  };

  // Contradiction Handlers
  const handleConfirmContradiction = (ruleId: string) => {
    setActiveLevelState((prev) => {
      if (!prev) return prev;
      if (prev.confirmedContradictionIds.includes(ruleId)) return prev;
      soundFX.playContradictionFound();
      const updated = [...prev.confirmedContradictionIds, ruleId];
      if (updated.length >= 2) {
        unlockAchievement('contradiction_hunter');
      }
      return {
        ...prev,
        confirmedContradictionIds: updated,
      };
    });
  };

  // Final Accusation Submission
  const handleSubmitVerdict = async (
    submission: VerdictSubmission
  ): Promise<VerdictEvaluation> => {
    let evaluation: VerdictEvaluation;
    try {
      const res = await fetch('/api/evaluate-verdict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
      if (res.ok) {
        evaluation = await res.json();
      } else {
        evaluation = evaluateCaseAccusation(activeCase, submission);
      }
    } catch {
      evaluation = evaluateCaseAccusation(activeCase, submission);
    }

    if (evaluation.isCulpritCorrect) {
      soundFX.playSuccessFanfare();

      setActiveLevelState((prev) =>
        prev
          ? {
              ...prev,
              caseCompleted: true,
              lastEvaluation: evaluation,
            }
          : prev
      );

      // Update Level Stats and Unlock Next Level
      setLevelStats((prev) => {
        const cur = prev[activeCase.id] || {
          levelNumber: activeCase.levelNumber,
          caseId: activeCase.id,
          unlocked: true,
          completed: false,
          bestScore: 0,
          bestRank: null,
          fastestTimeSeconds: null,
          attempts: 1,
        };

        const rankOrder: Record<string, number> = {
          S: 5,
          A: 4,
          B: 3,
          C: 2,
          F: 1,
        };
        const newBestRank =
          !cur.bestRank ||
          rankOrder[evaluation.rank] > rankOrder[cur.bestRank]
            ? evaluation.rank
            : cur.bestRank;

        const nextCase = ALL_CASES.find(
          (c) => c.levelNumber === activeCase.levelNumber + 1
        );

        const nextStats = {
          ...prev,
          [activeCase.id]: {
            ...cur,
            completed: true,
            bestScore: Math.max(cur.bestScore, evaluation.totalScore),
            bestRank: newBestRank,
            fastestTimeSeconds:
              cur.fastestTimeSeconds === null
                ? submission.elapsedSeconds
                : Math.min(cur.fastestTimeSeconds, submission.elapsedSeconds),
          },
        };

        if (nextCase && nextStats[nextCase.id]) {
          nextStats[nextCase.id] = {
            ...nextStats[nextCase.id],
            unlocked: true,
          };
        }

        // Check campaign achievements
        const solvedCount = Object.values(nextStats).filter(
          (s) => s.completed
        ).length;
        if (activeCase.levelNumber === 1) unlockAchievement('first_case_solved');
        if (submission.remainingSeconds >= 180)
          unlockAchievement('speed_sleuth');
        if (submission.hintsUsed === 0) unlockAchievement('no_hints_needed');
        if (evaluation.rank === 'S') unlockAchievement('rank_s_master');
        if (solvedCount >= 5) unlockAchievement('halfway_there');
        if (activeCase.levelNumber === 10)
          unlockAchievement('architect_unmasked');
        if (solvedCount >= 10) unlockAchievement('perfectionist');

        return nextStats;
      });
    } else {
      // Wrong accusation penalty & increment
      setActiveLevelState((prev) =>
        prev
          ? {
              ...prev,
              wrongAccusations: prev.wrongAccusations + 1,
              lastEvaluation: evaluation,
            }
          : prev
      );
    }

    return evaluation;
  };

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0e12] text-[#ede8df] selection:bg-[#7f1d1d] selection:text-[#ede8df]">
      {gameMode === 'menu' || !activeLevelState ? (
        <main className="flex-1">
          <MainMenu
            levelStats={levelStats}
            activeLevelState={activeLevelState}
            unlockedAchievementIds={unlockedAchievementIds}
            settings={settings}
            onStartLevel={handleStartLevel}
            onContinueActiveLevel={handleContinueActiveLevel}
            onUpdateSettings={(partial) =>
              setSettings((prev) => ({ ...prev, ...partial }))
            }
            onResetAllProgress={() => setIsResetConfirmOpen(true)}
            onOpenTutorial={() => setIsTutorialOpen(true)}
          />
        </main>
      ) : (
        <>
          {/* Top Bar adhering strictly to the 3-zone Top Bar Contract */}
          <Navbar
            currentTab={currentTab}
            onNavigate={(tab) => {
              soundFX.playClick();
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVerdict={() => {
              soundFX.playClick();
              setIsVerdictOpen(true);
            }}
            onOpenPause={() => {
              soundFX.playClick();
              setIsPauseOpen(true);
            }}
            remainingSeconds={activeLevelState.remainingSeconds}
            levelNumber={activeCase.levelNumber}
            caseCode={activeCase.code}
          />

          {/* Main Active Investigation Area */}
          <main className="flex-1">
            {currentTab === 'crimescene' && (
              <CrimeSceneView
                activeCase={activeCase}
                discoveredClueIds={activeLevelState.discoveredClueIds}
                hintsUsed={activeLevelState.hintsUsed}
                onDiscoverClue={handleDiscoverClue}
                onDiscoverAllClues={handleDiscoverAllClues}
                onUseHint={handleUseHint}
                onNavigateTab={(tab) => {
                  soundFX.playClick();
                  setCurrentTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'suspects' && (
              <SuspectWall
                activeCase={activeCase}
                onInterrogate={handleInterrogateSuspect}
                onTestContradiction={(stmtId) => {
                  setStatementForContradiction(stmtId);
                  setCurrentTab('contradictions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                discoveredClueIds={activeLevelState.discoveredClueIds}
                confirmedContradictionIds={
                  activeLevelState.confirmedContradictionIds
                }
              />
            )}

            {currentTab === 'evidence' && (
              <EvidenceRoom
                activeCase={activeCase}
                discoveredClueIds={activeLevelState.discoveredClueIds}
                importantClueIds={activeLevelState.importantClueIds}
                clueNotes={activeLevelState.clueNotes}
                onDiscoverClue={handleDiscoverClue}
                onToggleImportant={handleToggleImportantClue}
                onSaveClueNote={handleSaveClueNote}
                onCompareWithStatements={(clueId) => {
                  setClueForContradiction(clueId);
                  setCurrentTab('contradictions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'interrogation' && (
              <InterrogationRoom
                activeCase={activeCase}
                activeSuspectId={activeSuspectId}
                onSelectSuspect={setActiveSuspectId}
                chatHistory={activeLevelState.chatHistory}
                onSendMessage={handleSendMessage}
                onClearHistory={handleClearHistory}
              />
            )}

            {currentTab === 'contradictions' && (
              <ContradictionDetector
                activeCase={activeCase}
                initialStatementId={statementForContradiction}
                initialClueId={clueForContradiction}
                confirmedContradictionIds={
                  activeLevelState.confirmedContradictionIds
                }
                onConfirmContradiction={handleConfirmContradiction}
              />
            )}

            {currentTab === 'timeline' && (
              <TimelineView
                activeCase={activeCase}
                onInspectClue={() => {
                  setCurrentTab('evidence');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onInterrogateSuspect={handleInterrogateSuspect}
              />
            )}

            {currentTab === 'theory' && (
              <TheoryBoard
                activeCase={activeCase}
                suspectedCulpritId={activeLevelState.suspectedCulpritId}
                onSelectSuspect={(suspectId) =>
                  setActiveLevelState((prev) =>
                    prev ? { ...prev, suspectedCulpritId: suspectId } : prev
                  )
                }
                selectedMotiveId={activeLevelState.selectedMotiveId}
                onSelectMotive={(motiveId) =>
                  setActiveLevelState((prev) =>
                    prev ? { ...prev, selectedMotiveId: motiveId } : prev
                  )
                }
                selectedOpportunityId={activeLevelState.selectedOpportunityId}
                onSelectOpportunity={(oppId) =>
                  setActiveLevelState((prev) =>
                    prev ? { ...prev, selectedOpportunityId: oppId } : prev
                  )
                }
                linkedClueIds={activeLevelState.linkedClueIds}
                onToggleLinkedClue={(clueId) =>
                  setActiveLevelState((prev) => {
                    if (!prev) return prev;
                    const exists = prev.linkedClueIds.includes(clueId);
                    return {
                      ...prev,
                      linkedClueIds: exists
                        ? prev.linkedClueIds.filter((id) => id !== clueId)
                        : [...prev.linkedClueIds, clueId],
                    };
                  })
                }
                investigationNotes={activeLevelState.investigationNotes}
                onUpdateNotes={(notes) =>
                  setActiveLevelState((prev) =>
                    prev ? { ...prev, investigationNotes: notes } : prev
                  )
                }
                unansweredQuestions={activeLevelState.unansweredQuestions}
                onAddQuestion={(question) =>
                  setActiveLevelState((prev) =>
                    prev
                      ? {
                          ...prev,
                          unansweredQuestions: [
                            ...prev.unansweredQuestions,
                            question,
                          ],
                        }
                      : prev
                  )
                }
                onRemoveQuestion={(index) =>
                  setActiveLevelState((prev) =>
                    prev
                      ? {
                          ...prev,
                          unansweredQuestions: prev.unansweredQuestions.filter(
                            (_, i) => i !== index
                          ),
                        }
                      : prev
                  )
                }
                confirmedContradictionIds={
                  activeLevelState.confirmedContradictionIds
                }
                onProceedToVerdict={() => setIsVerdictOpen(true)}
              />
            )}
          </main>

          {/* Final Accusation Modal */}
          <FinalAccusationModal
            activeCase={activeCase}
            initialCulpritId={activeLevelState.suspectedCulpritId}
            initialMotiveId={activeLevelState.selectedMotiveId}
            initialOpportunityId={activeLevelState.selectedOpportunityId}
            initialSupportingClueIds={activeLevelState.linkedClueIds}
            remainingSeconds={activeLevelState.remainingSeconds}
            elapsedSeconds={activeLevelState.elapsedSeconds}
            hintsUsed={activeLevelState.hintsUsed}
            confirmedContradictionsCount={
              activeLevelState.confirmedContradictionIds.length
            }
            wrongAccusations={activeLevelState.wrongAccusations}
            isOpen={isVerdictOpen}
            onClose={() => setIsVerdictOpen(false)}
            onSubmitVerdict={handleSubmitVerdict}
            onProceedToReveal={() => {
              setIsVerdictOpen(false);
              setIsRevealOpen(true);
            }}
            onNextLevel={
              activeCase.levelNumber < 10
                ? () => handleStartLevel(activeCase.levelNumber + 1)
                : undefined
            }
          />

          {/* Official Case Solution Reveal Modal */}
          <SolutionRevealModal
            activeCase={activeCase}
            isOpen={isRevealOpen}
            onClose={() => setIsRevealOpen(false)}
            onRestartCase={() => {
              setIsRevealOpen(false);
              handleRestartCurrentLevel();
            }}
            onNextLevel={
              activeCase.levelNumber < 10
                ? () => {
                    setIsRevealOpen(false);
                    handleStartLevel(activeCase.levelNumber + 1);
                  }
                : undefined
            }
          />

          {/* TIME-UP FAILURE SCREEN MODAL */}
          {activeLevelState.caseFailed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
              <div className="w-full max-w-lg bg-[#140d10] border-2 border-[#dc2626] rounded-lg shadow-2xl p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#2a0f15] border border-[#ef4444] flex items-center justify-center mx-auto">
                  <AlertTriangle size={32} className="text-[#ef4444]" />
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#f87171]">
                    Investigation Window Expired · 00:00 Remaining
                  </span>
                  <h2 className="font-cinzel text-3xl font-bold text-[#ede8df]">
                    TIME UP — CASE COLD
                  </h2>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                    The countdown clock reached zero before a formal indictment was sealed for{' '}
                    <strong>
                      Level {activeCase.levelNumber}: {activeCase.title}
                    </strong>
                    . The perpetrator destroyed the remaining trail.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleRestartCurrentLevel}
                    className="w-full sm:w-auto px-6 py-3 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-widest rounded shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={15} />
                    <span>Retry Level {activeCase.levelNumber}</span>
                  </button>

                  <button
                    onClick={() => setGameMode('menu')}
                    className="w-full sm:w-auto px-5 py-3 bg-[#161c28] hover:bg-[#1f2839] text-[#ede8df] border border-[#2b364b] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Home size={15} />
                    <span>Return to Main Menu</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PAUSE & LEVEL NAVIGATION MODAL */}
          {isPauseOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
              <div className="w-full max-w-md bg-[#0f131b] border border-[#242d3f] rounded-lg shadow-2xl p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-[#1d2433] pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89580]">
                      Investigation Paused
                    </span>
                    <h3 className="font-cinzel text-xl font-bold text-[#ede8df]">
                      Level {activeCase.levelNumber}: {activeCase.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsPauseOpen(false)}
                    className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-3.5 bg-[#141925] border border-[#222b3d] rounded flex items-center justify-between text-xs font-mono">
                  <span className="text-[#9ca3af] flex items-center gap-1.5">
                    <Clock size={14} className="text-[#b91c1c]" />
                    Remaining Clock:
                  </span>
                  <strong className="text-sm text-[#ede8df]">
                    {Math.floor(activeLevelState.remainingSeconds / 60)}m{' '}
                    {activeLevelState.remainingSeconds % 60}s
                  </strong>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setIsPauseOpen(false)}
                    className="w-full py-2.5 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Resume Investigation</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPauseOpen(false);
                      setIsTutorialOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#151a26] hover:bg-[#1c2333] text-[#ede8df] border border-[#252f42] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <HelpCircle size={14} className="text-[#a89580]" />
                    <span>Detective Field Manual / Tutorial</span>
                  </button>

                  <button
                    onClick={() =>
                      setSettings((s) => ({
                        ...s,
                        soundEnabled: !s.soundEnabled,
                      }))
                    }
                    className="w-full py-2.5 bg-[#151a26] hover:bg-[#1c2333] text-[#ede8df] border border-[#252f42] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {settings.soundEnabled ? (
                      <Volume2 size={14} className="text-emerald-400" />
                    ) : (
                      <VolumeX size={14} className="text-[#ef4444]" />
                    )}
                    <span>
                      Sound Effects: {settings.soundEnabled ? 'ON' : 'MUTED'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPauseOpen(false);
                      handleRestartCurrentLevel();
                    }}
                    className="w-full py-2.5 bg-[#151a26] hover:bg-[#1c2333] text-amber-300 border border-[#252f42] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Restart Level {activeCase.levelNumber}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsPauseOpen(false);
                      setGameMode('menu');
                    }}
                    className="w-full py-2.5 bg-[#121620] hover:bg-[#191f2d] text-[#9ca3af] hover:text-white border border-[#202738] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Home size={14} />
                    <span>Main Menu & Level Select</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* DETECTIVE TUTORIAL / ONBOARDING MODAL */}
      {isTutorialOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0f131b] border border-[#263044] rounded-lg shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-[#1e2636] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#b91c1c] font-bold">
                  Special Investigations Bureau · Onboarding
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#ede8df] mt-0.5">
                  How to Solve a Case Zero Mystery
                </h3>
              </div>
              <button
                onClick={() => setIsTutorialOpen(false)}
                className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#131824] border border-[#222b3d] rounded space-y-1.5">
                <span className="font-mono text-[#b91c1c] font-bold">
                  STEP 01 · CRIME SCENE & CLUES
                </span>
                <h4 className="font-cinzel font-bold text-[#ede8df] text-sm">
                  Scan Physical Exhibits
                </h4>
                <p className="text-[#9ca3af] leading-relaxed">
                  Click numbered markers on the Crime Scene tactical blueprint or inspect the 8 exhibits in the Evidence Room to uncover timestamps and forensic traces.
                </p>
              </div>

              <div className="p-4 bg-[#131824] border border-[#222b3d] rounded space-y-1.5">
                <span className="font-mono text-[#b91c1c] font-bold">
                  STEP 02 · SUSPECTS & INTERROGATION
                </span>
                <h4 className="font-cinzel font-bold text-[#ede8df] text-sm">
                  Cross-Examine Alibis
                </h4>
                <p className="text-[#9ca3af] leading-relaxed">
                  Review all 4 suspect dossiers and question them in the Interrogation Room using predefined leads or custom natural-language questions.
                </p>
              </div>

              <div className="p-4 bg-[#131824] border border-[#222b3d] rounded space-y-1.5">
                <span className="font-mono text-[#b91c1c] font-bold">
                  STEP 03 · CONTRADICTION DETECTOR
                </span>
                <h4 className="font-cinzel font-bold text-[#ede8df] text-sm">
                  Prove Who Lied
                </h4>
                <p className="text-[#9ca3af] leading-relaxed">
                  Pair a suspect’s sworn statement with a physical clue in the Contradiction Detector. Proven contradictions break alibis and award bonus points.
                </p>
              </div>

              <div className="p-4 bg-[#131824] border border-[#222b3d] rounded space-y-1.5">
                <span className="font-mono text-[#b91c1c] font-bold">
                  STEP 04 · VERDICT BEFORE TIME EXPIRES
                </span>
                <h4 className="font-cinzel font-bold text-[#ede8df] text-sm">
                  File Final Indictment
                </h4>
                <p className="text-[#9ca3af] leading-relaxed">
                  Click &ldquo;File Verdict&rdquo; before the countdown timer hits zero. Name the culprit, select their motive and method, and attach decisive clues to unlock the next level!
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e2636] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#a89580] flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-400" />
                Tip: Pause the clock anytime by clicking the timer in the top bar.
              </span>
              <button
                onClick={() => setIsTutorialOpen(false)}
                className="px-6 py-2.5 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-wider rounded cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 size={14} />
                <span>Begin Investigation</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET PROGRESS CONFIRMATION MODAL (No window.confirm used) */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#12151e] border border-[#881337] rounded-lg p-6 space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-[#ede8df]">
              Erase All Campaign Save Data?
            </h3>
            <p className="text-xs text-[#9ca3af] leading-relaxed">
              This will reset all unlocked levels, best scores, ranks, and achievements back to Level 1.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-[#181f2c] text-[#9ca3af] hover:text-white rounded text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setLevelStats(createInitialStats());
                  setActiveLevelState(null);
                  setUnlockedAchievementIds([]);
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold rounded text-xs cursor-pointer"
              >
                Confirm Erase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Professional Footer with Samay Garg Credit & Feedback */}
      <Footer />
    </div>
  );
}
