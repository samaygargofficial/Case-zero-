import React, { useState } from 'react';
import { ALL_CASES, ACHIEVEMENTS_LIST } from '../data/allCases';
import {
  LevelStats,
  GameSettings,
  ActiveLevelState,
} from '../types/case';
import {
  Play,
  Lock,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Settings,
  FolderOpen,
  ShieldAlert,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface MainMenuProps {
  levelStats: Record<string, LevelStats>;
  activeLevelState: ActiveLevelState | null;
  unlockedAchievementIds: string[];
  settings: GameSettings;
  onStartLevel: (levelNumber: number) => void;
  onContinueActiveLevel: () => void;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onResetAllProgress: () => void;
  onOpenTutorial: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  levelStats,
  activeLevelState,
  unlockedAchievementIds,
  settings,
  onStartLevel,
  onContinueActiveLevel,
  onUpdateSettings,
  onResetAllProgress,
  onOpenTutorial,
}) => {
  const [activeSubView, setActiveSubView] = useState<
    'levels' | 'casefiles' | 'achievements' | 'settings'
  >('levels');

  // Calculate campaign summary stats
  const completedLevelsCount = Object.values(levelStats).filter((s) => s.completed).length;
  const totalScoreSum = Object.values(levelStats).reduce((acc, s) => acc + (s.bestScore || 0), 0);

  // Highest unlocked level for quick Play button
  const highestUnlockedLevel = ALL_CASES.reduce((highest, c) => {
    const st = levelStats[c.id];
    if (st?.unlocked || settings.sandboxUnlockAll) {
      if (!st?.completed && highest === 1) return c.levelNumber;
      return Math.max(highest, c.levelNumber);
    }
    return highest;
  }, 1);

  const nextToPlayLevel =
    ALL_CASES.find((c) => {
      const st = levelStats[c.id];
      return (st?.unlocked || settings.sandboxUnlockAll) && !st?.completed;
    })?.levelNumber || highestUnlockedLevel;

  const getRankBadgeClass = (rank: string | null) => {
    switch (rank) {
      case 'S':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      case 'A':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50';
      case 'B':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/50';
      case 'C':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
      case 'F':
        return 'bg-red-900/30 text-red-400 border-red-700/50';
      default:
        return 'bg-[#161b26] text-[#71717a] border-[#252f42]';
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] text-[#ede8df] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Header */}
        <div className="text-center space-y-4 border-b border-[#1d2331] pb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#a89580]">
            <ShieldAlert size={14} className="text-[#b91c1c]" />
            <span>Special Investigations Bureau · 10-Level Campaign</span>
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl font-bold tracking-widest text-[#ede8df]">
            CASE ZERO
          </h1>
          <p className="font-cinzel text-base sm:text-lg tracking-[0.25em] text-[#a39f97] uppercase">
            The AI Mystery Lab
          </p>
          <p className="font-serif italic text-sm sm:text-base text-[#cbd5e1]/90 max-w-xl mx-auto">
            “Every story has a secret. Every clue has a purpose.”
          </p>

          {/* Primary Play / Continue Action Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            {activeLevelState && !activeLevelState.caseCompleted && !activeLevelState.caseFailed ? (
              <button
                onClick={onContinueActiveLevel}
                className="px-7 py-3.5 bg-[#881337] hover:bg-[#9f1239] text-white rounded text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-lg border border-[#b91c1c]/60 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Play size={16} fill="currentColor" />
                <span>
                  Continue Level {activeLevelState.levelNumber} ({Math.floor(activeLevelState.remainingSeconds / 60)}:
                  {String(activeLevelState.remainingSeconds % 60).padStart(2, '0')} Left)
                </span>
              </button>
            ) : null}

            <button
              onClick={() => onStartLevel(nextToPlayLevel)}
              className="px-7 py-3.5 bg-[#1a2232] hover:bg-[#232d42] text-[#ede8df] rounded text-xs sm:text-sm font-semibold uppercase tracking-widest border border-[#32405a] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play size={15} className="text-[#b91c1c]" />
              <span>
                {completedLevelsCount === 0
                  ? 'Start Campaign (Level 1)'
                  : `Play Level ${nextToPlayLevel}`}
              </span>
            </button>

            <button
              onClick={onOpenTutorial}
              className="px-5 py-3.5 bg-[#121620] hover:bg-[#191f2d] text-[#a39f97] hover:text-[#ede8df] rounded text-xs font-semibold uppercase tracking-wider border border-[#232b3c] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle size={15} className="text-[#a89580]" />
              <span>Detective Tutorial</span>
            </button>
          </div>

          {/* Campaign Telemetry Ribbon */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-[#9ca3af] font-mono-tabular">
            <span>
              Cases Solved: <strong className="text-[#ede8df]">{completedLevelsCount} / 10</strong>
            </span>
            <span>·</span>
            <span>
              Campaign Score: <strong className="text-[#ede8df]">{totalScoreSum} pts</strong>
            </span>
            <span>·</span>
            <span>
              Achievements: <strong className="text-[#b91c1c]">{unlockedAchievementIds.length} / {ACHIEVEMENTS_LIST.length}</strong>
            </span>
          </div>
        </div>

        {/* Main Menu Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1d2331] pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveSubView('levels')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeSubView === 'levels'
                  ? 'bg-[#881337] text-white'
                  : 'bg-[#121620] text-[#9ca3af] hover:text-[#ede8df] border border-[#202738]'
              }`}
            >
              <FolderOpen size={14} />
              <span>Level Select (10 Cases)</span>
            </button>

            <button
              onClick={() => setActiveSubView('casefiles')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeSubView === 'casefiles'
                  ? 'bg-[#881337] text-white'
                  : 'bg-[#121620] text-[#9ca3af] hover:text-[#ede8df] border border-[#202738]'
              }`}
            >
              <BookOpen size={14} />
              <span>Declassified Case Files</span>
            </button>

            <button
              onClick={() => setActiveSubView('achievements')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeSubView === 'achievements'
                  ? 'bg-[#881337] text-white'
                  : 'bg-[#121620] text-[#9ca3af] hover:text-[#ede8df] border border-[#202738]'
              }`}
            >
              <Award size={14} />
              <span>Achievements ({unlockedAchievementIds.length}/{ACHIEVEMENTS_LIST.length})</span>
            </button>

            <button
              onClick={() => setActiveSubView('settings')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                activeSubView === 'settings'
                  ? 'bg-[#881337] text-white'
                  : 'bg-[#121620] text-[#9ca3af] hover:text-[#ede8df] border border-[#202738]'
              }`}
            >
              <Settings size={14} />
              <span>Settings</span>
            </button>
          </div>

          {/* Quick Sandbox Unlock Toggle for Convenience */}
          <button
            onClick={() =>
              onUpdateSettings({ sandboxUnlockAll: !settings.sandboxUnlockAll })
            }
            className={`px-3 py-1.5 rounded text-[11px] font-mono border transition-colors cursor-pointer ${
              settings.sandboxUnlockAll
                ? 'bg-emerald-950/50 border-emerald-600/60 text-emerald-300'
                : 'bg-[#121620] border-[#232b3c] text-[#9ca3af] hover:text-[#ede8df]'
            }`}
          >
            {settings.sandboxUnlockAll ? 'All 10 Levels Unlocked (Sandbox ON)' : 'Unlock All Levels (Sandbox Mode)'}
          </button>
        </div>

        {/* SUBVIEW 1: LEVEL SELECT (10 CASES) */}
        {activeSubView === 'levels' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_CASES.map((caseItem) => {
              const st = levelStats[caseItem.id] || {
                levelNumber: caseItem.levelNumber,
                caseId: caseItem.id,
                unlocked: caseItem.levelNumber === 1,
                completed: false,
                bestScore: 0,
                bestRank: null,
                fastestTimeSeconds: null,
                attempts: 0,
              };
              const isUnlocked = st.unlocked || settings.sandboxUnlockAll;
              const adjustedTimeSeconds = Math.round(
                caseItem.timeLimitSeconds * settings.timerMultiplier
              );

              return (
                <div
                  key={caseItem.id}
                  className={`rounded-lg border p-6 flex flex-col justify-between transition-all ${
                    isUnlocked
                      ? st.completed
                        ? 'bg-[#111621] border-[#2a364d] hover:border-[#43567a]'
                        : 'bg-[#12151f] border-[#881337]/60 hover:border-[#b91c1c]'
                      : 'bg-[#0d1017] border-[#191f2b] opacity-65'
                  }`}
                >
                  <div>
                    {/* Top Row: Level Number & Rank/Lock Status */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#1c2333]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#b91c1c]">
                          LEVEL {String(caseItem.levelNumber).padStart(2, '0')}
                        </span>
                        <span className="text-[#4b5563]">·</span>
                        <span className="font-mono text-[11px] text-[#a89580]">
                          {caseItem.code}
                        </span>
                      </div>

                      {!isUnlocked ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-[#6b7280]">
                          <Lock size={12} /> LOCKED
                        </span>
                      ) : st.completed ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                            <CheckCircle2 size={13} /> SOLVED
                          </span>
                          {st.bestRank && (
                            <span
                              className={`px-2 py-0.5 text-xs font-mono font-bold rounded border ${getRankBadgeClass(
                                st.bestRank
                              )}`}
                            >
                              RANK {st.bestRank}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                          ACTIVE DOSSIER
                        </span>
                      )}
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-cinzel text-lg font-bold text-[#ede8df] mt-3">
                      {caseItem.title}
                    </h3>
                    <p className="text-xs text-[#a89580] font-medium mt-0.5">
                      {caseItem.subtitle}
                    </p>

                    {/* Premise Snippet */}
                    <p className="text-xs text-[#9ca3af] mt-3 line-clamp-3 leading-relaxed">
                      {caseItem.premise}
                    </p>

                    {/* Metadata Line (Zero-Pill Unboxed Text) */}
                    <div className="mt-4 pt-3 border-t border-[#1a202e] flex flex-wrap items-center gap-2 text-[11px] font-mono-tabular text-[#9ca3af]">
                      <span className="flex items-center gap-1 text-[#ede8df]">
                        <Clock size={12} className="text-[#b91c1c]" />
                        {Math.floor(adjustedTimeSeconds / 60)}m {adjustedTimeSeconds % 60}s
                      </span>
                      <span>·</span>
                      <span>{caseItem.difficulty}</span>
                      <span>·</span>
                      <span>{caseItem.suspects.length} Suspects</span>
                      <span>·</span>
                      <span>{caseItem.clues.length} Clues</span>
                    </div>
                  </div>

                  {/* Card Footer: Stats & Launch Button */}
                  <div className="mt-5 pt-3 border-t border-[#1c2333] flex items-center justify-between gap-3">
                    <div className="text-[11px] font-mono-tabular text-[#9ca3af]">
                      {st.bestScore > 0 ? (
                        <span>
                          Best: <strong className="text-[#ede8df]">{st.bestScore} pts</strong>
                          {st.fastestTimeSeconds !== null && (
                            <span className="text-[#71717a]">
                              {' '}
                              ({Math.floor(st.fastestTimeSeconds / 60)}m {st.fastestTimeSeconds % 60}s)
                            </span>
                          )}
                        </span>
                      ) : (
                        <span className="text-[#6b7280]">No record yet</span>
                      )}
                    </div>

                    {isUnlocked ? (
                      <button
                        onClick={() => onStartLevel(caseItem.levelNumber)}
                        className="px-4 py-2 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>{st.completed ? 'Replay Case' : 'Investigate'}</span>
                        <ArrowRight size={13} />
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-[#4b5563]">
                        Complete Level {caseItem.levelNumber - 1} first
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SUBVIEW 2: DECLASSIFIED CASE FILES ARCHIVE */}
        {activeSubView === 'casefiles' && (
          <div className="space-y-6">
            <div className="p-6 bg-[#10141d] border border-[#202738] rounded-lg space-y-2">
              <h2 className="font-cinzel text-xl font-bold text-[#ede8df]">
                Declassified Bureau Archive & Syndicate Thread
              </h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Complete levels in the campaign to declassify their official forensic solutions and trace the overarching conspiracy leading to Level 10: CASE ZERO.
              </p>
            </div>

            <div className="space-y-4">
              {ALL_CASES.map((c) => {
                const st = levelStats[c.id];
                const isSolved = st?.completed;

                return (
                  <div
                    key={c.id}
                    className="p-5 bg-[#10141d] border border-[#1e2535] rounded-lg space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1b2230] pb-2">
                      <div>
                        <span className="font-mono text-xs text-[#b91c1c] font-bold">
                          LEVEL {c.levelNumber} · {c.code}
                        </span>
                        <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
                          {c.title} — {c.location}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-[#a89580]">
                        {isSolved ? `SOLVED (Best: ${st.bestScore} pts · Rank ${st.bestRank})` : 'CLASSIFIED — SOLVE LEVEL TO UNLOCK'}
                      </span>
                    </div>

                    {isSolved ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#cbd5e1]">
                        <div>
                          <strong className="text-[#ede8df] block mb-1">
                            Convicted Culprit: {c.solution.culpritName}
                          </strong>
                          <p className="leading-relaxed text-[#9ca3af]">
                            {c.solution.motiveSummary}
                          </p>
                        </div>
                        <div>
                          <strong className="text-[#ede8df] block mb-1">
                            Modus Operandi & Recovery:
                          </strong>
                          <p className="leading-relaxed text-[#9ca3af]">
                            {c.solution.opportunitySummary}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-[#6b7280] italic">
                        {c.premise} (Complete Level {c.levelNumber} to declassify the culprit and forensic resolution.)
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBVIEW 3: ACHIEVEMENTS */}
        {activeSubView === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACHIEVEMENTS_LIST.map((ach) => {
              const isUnlocked = unlockedAchievementIds.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-5 rounded-lg border transition-all ${
                    isUnlocked
                      ? 'bg-[#141925] border-amber-500/40'
                      : 'bg-[#0e121a] border-[#1b2230] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Sparkles
                      size={20}
                      className={isUnlocked ? 'text-amber-400' : 'text-[#4b5563]'}
                    />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#9ca3af]">
                      {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>
                  <h3 className="font-cinzel text-sm font-bold text-[#ede8df]">
                    {ach.title}
                  </h3>
                  <p className="text-xs text-[#9ca3af] mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* SUBVIEW 4: SETTINGS */}
        {activeSubView === 'settings' && (
          <div className="max-w-2xl mx-auto p-6 bg-[#10141d] border border-[#202738] rounded-lg space-y-6">
            <h2 className="font-cinzel text-xl font-bold text-[#ede8df] border-b border-[#1e2535] pb-3">
              Investigation Lab Settings
            </h2>

            {/* Sound Effects */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#ede8df]">
                  Interface Sound Effects
                </h4>
                <p className="text-xs text-[#9ca3af]">
                  Procedural audio cues for discovering clues, confirming contradictions, and verdicts.
                </p>
              </div>
              <button
                onClick={() =>
                  onUpdateSettings({ soundEnabled: !settings.soundEnabled })
                }
                className="px-4 py-2 bg-[#161c28] hover:bg-[#1f2738] border border-[#2b3548] rounded text-xs font-medium text-[#ede8df] flex items-center gap-2 cursor-pointer"
              >
                {settings.soundEnabled ? <Volume2 size={15} className="text-emerald-400" /> : <VolumeX size={15} className="text-[#ef4444]" />}
                <span>{settings.soundEnabled ? 'Enabled' : 'Muted'}</span>
              </button>
            </div>

            {/* Timer Allowance Multiplier */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#1b2230]">
              <div>
                <h4 className="text-sm font-semibold text-[#ede8df]">
                  Investigation Countdown Pacing
                </h4>
                <p className="text-xs text-[#9ca3af]">
                  Scale the countdown timer for newly started cases.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {([1, 1.5, 2] as const).map((mult) => (
                  <button
                    key={mult}
                    onClick={() => onUpdateSettings({ timerMultiplier: mult })}
                    className={`px-3 py-1.5 rounded text-xs font-mono cursor-pointer border ${
                      settings.timerMultiplier === mult
                        ? 'bg-[#881337] text-white border-[#b91c1c]'
                        : 'bg-[#161c28] text-[#9ca3af] border-[#252f42]'
                    }`}
                  >
                    {mult === 1 ? '1x Standard' : mult === 1.5 ? '1.5x Extended' : '2x Relaxed'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Mode */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1b2230]">
              <div>
                <h4 className="text-sm font-semibold text-[#ede8df]">
                  Sandbox Mode (Unlock All 10 Levels)
                </h4>
                <p className="text-xs text-[#9ca3af]">
                  Allow jumping directly into any of the 10 cases without sequential lock restrictions.
                </p>
              </div>
              <button
                onClick={() =>
                  onUpdateSettings({ sandboxUnlockAll: !settings.sandboxUnlockAll })
                }
                className={`px-4 py-2 rounded text-xs font-semibold cursor-pointer border ${
                  settings.sandboxUnlockAll
                    ? 'bg-emerald-900/40 text-emerald-300 border-emerald-600'
                    : 'bg-[#161c28] text-[#9ca3af] border-[#2b3548]'
                }`}
              >
                {settings.sandboxUnlockAll ? 'Active' : 'Disabled'}
              </button>
            </div>

            {/* Reset Campaign Data */}
            <div className="flex items-center justify-between pt-4 border-t border-[#1b2230]">
              <div>
                <h4 className="text-sm font-semibold text-[#ef4444]">
                  Reset Campaign Progress
                </h4>
                <p className="text-xs text-[#9ca3af]">
                  Erase all saved scores, ranks, unlocked levels, and notes from local storage.
                </p>
              </div>
              <button
                onClick={onResetAllProgress}
                className="px-4 py-2 bg-[#2a1015] hover:bg-[#3d151d] border border-[#881337] rounded text-xs font-semibold text-[#fca5a5] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Erase Save Data</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
