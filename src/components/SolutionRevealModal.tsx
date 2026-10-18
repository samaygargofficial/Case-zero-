import React from 'react';
import { CaseDefinition } from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import { X, CheckCircle, RotateCcw, Play } from 'lucide-react';

interface SolutionRevealModalProps {
  activeCase: CaseDefinition;
  isOpen: boolean;
  onClose: () => void;
  onRestartCase: () => void;
  onNextLevel?: () => void;
}

export const SolutionRevealModal: React.FC<SolutionRevealModalProps> = ({
  activeCase,
  isOpen,
  onClose,
  onRestartCase,
  onNextLevel,
}) => {
  if (!isOpen) return null;

  const { solution } = activeCase;
  const culpritSuspect =
    activeCase.suspects.find((s) => s.id === solution.culpritId) ||
    activeCase.suspects[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0c0f15] border border-[#2b3548] rounded-lg shadow-2xl p-6 sm:p-8 text-left my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1f2738]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#a89580]">
              Level {activeCase.levelNumber} · {activeCase.code} · Official Resolution Declassified
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Title */}
        <div className="mt-6 text-center space-y-2 pb-6 border-b border-[#1f2738]">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] tracking-wide">
            {activeCase.code}: {activeCase.title}
          </h2>
          <p className="font-serif italic text-sm text-[#cbd5e1] max-w-xl mx-auto">
            Complete forensic reconstruction and official bureau indictment record.
          </p>
        </div>

        {/* Culprit Reveal Banner */}
        <div className="mt-6 p-6 rounded-lg bg-[#1a1116] border border-[#881337] flex flex-col sm:flex-row items-center gap-6">
          <SuspectPortrait
            theme={culpritSuspect.portraitTheme}
            size="lg"
            className="ring-2 ring-[#b91c1c]"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dc2626] font-bold">
              Convicted Culprit
            </span>
            <h3 className="font-cinzel text-xl font-bold text-[#ede8df]">
              {solution.culpritName} ({culpritSuspect.role})
            </h3>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Decisive Exhibits: {solution.decisiveClueIds.join(', ')}
            </p>
          </div>
        </div>

        {/* Core Case Truth Sections */}
        <div className="mt-6 space-y-6 text-xs sm:text-sm">
          {/* Section 1: The Secret Motive */}
          <div className="p-5 bg-[#10141d] border border-[#1e2535] rounded-lg space-y-2">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#ede8df] flex items-center gap-2">
              <span className="text-[#b91c1c]">1.</span> The True Motive
            </h4>
            <p className="text-[#cbd5e1] leading-relaxed">
              {solution.motiveSummary}
            </p>
          </div>

          {/* Section 2: Opportunity & Security Bypass */}
          <div className="p-5 bg-[#10141d] border border-[#1e2535] rounded-lg space-y-2">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#ede8df] flex items-center gap-2">
              <span className="text-[#b91c1c]">2.</span> The Method & Opportunity
            </h4>
            <p className="text-[#cbd5e1] leading-relaxed">
              {solution.opportunitySummary}
            </p>
          </div>

          {/* Section 3: Exact Sequence of Events */}
          <div className="p-5 bg-[#10141d] border border-[#1e2535] rounded-lg space-y-3">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#ede8df] flex items-center gap-2">
              <span className="text-[#b91c1c]">3.</span> Chronological Reconstruction
            </h4>
            <ol className="space-y-2">
              {solution.actualSequence.map((step, idx) => (
                <li
                  key={idx}
                  className="p-2.5 bg-[#141822] border border-[#1e2535] rounded text-xs text-[#cbd5e1] leading-relaxed"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Section 4: Recovery Location */}
          <div className="p-5 bg-[#151a24] border border-[#2b3548] rounded-lg space-y-2">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle size={16} /> Target Asset Recovery Location
            </h4>
            <p className="text-[#ede8df] leading-relaxed">
              {solution.keyTargetLocation}
            </p>
          </div>

          {/* Section 5: Why Alternative Suspects Are Exonerated */}
          <div className="p-5 bg-[#10141d] border border-[#1e2535] rounded-lg space-y-3">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#ede8df] flex items-center gap-2">
              <span className="text-[#b91c1c]">4.</span> Exoneration of Innocent Suspects
            </h4>
            <div className="space-y-2">
              {solution.clearedSuspectsExplanation.map((cleared) => {
                const suspect = activeCase.suspects.find(
                  (s) => s.id === cleared.suspectId
                );
                return (
                  <div
                    key={cleared.suspectId}
                    className="p-3 bg-[#131722] border border-[#1e2535] rounded"
                  >
                    <span className="font-semibold text-[#ede8df] block mb-1">
                      {suspect?.name} ({suspect?.role})
                    </span>
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      {cleared.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-4 border-t border-[#1f2738] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#141822] hover:bg-[#1a2130] text-[#ede8df] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Return to Case File
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRestartCase}
              className="px-5 py-2.5 bg-[#1a2232] hover:bg-[#232d42] text-[#ede8df] border border-[#32405a] text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Replay Level {activeCase.levelNumber}</span>
            </button>

            {activeCase.levelNumber < 10 && onNextLevel && (
              <button
                onClick={onNextLevel}
                className="px-6 py-2.5 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Play size={14} fill="currentColor" />
                <span>Next Case: Level {activeCase.levelNumber + 1}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
