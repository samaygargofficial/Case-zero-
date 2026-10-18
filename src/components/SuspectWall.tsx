import React, { useState } from 'react';
import { CaseDefinition, Suspect, Clue, SuspectStatement } from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import { MessageSquare, ArrowRight, X, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SuspectWallProps {
  activeCase: CaseDefinition;
  onInterrogate: (suspectId: string) => void;
  onTestContradiction: (statementId: string) => void;
  discoveredClueIds: string[];
  confirmedContradictionIds: string[];
}

export const SuspectWall: React.FC<SuspectWallProps> = ({
  activeCase,
  onInterrogate,
  onTestContradiction,
  discoveredClueIds,
  confirmedContradictionIds,
}) => {
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);

  const getSuspectRelatedClues = (suspectId: string): Clue[] => {
    return activeCase.clues.filter(
      (c) => c.relatedSuspectIds.includes(suspectId) && discoveredClueIds.includes(c.id)
    );
  };

  const getSuspectContradictionsCount = (suspectId: string): number => {
    const suspectStmtIds = new Set(
      activeCase.suspects
        .find((s) => s.id === suspectId)
        ?.statements.map((st) => st.id) || []
    );
    return activeCase.contradictionRules.filter(
      (r) =>
        suspectStmtIds.has(r.statementId) &&
        confirmedContradictionIds.includes(r.id) &&
        r.verdict === 'CONTRADICTION'
    ).length;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Suspect Dossiers
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Suspect Wall & Alibi Registry
          </h2>
        </div>
        <p className="text-xs text-[#9ca3af] max-w-md">
          Four persons of interest were present at {activeCase.location}. Open any dossier to inspect sworn statements or cross-examine.
        </p>
      </div>

      {/* Suspects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeCase.suspects.map((suspect) => {
          const contradictionsCount = getSuspectContradictionsCount(suspect.id);
          const relatedClues = getSuspectRelatedClues(suspect.id);

          return (
            <div
              key={suspect.id}
              onClick={() => setSelectedSuspect(suspect)}
              className="group bg-[#11141c] hover:bg-[#151924] border border-[#202738] hover:border-[#384257] rounded-lg p-6 shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <SuspectPortrait
                    theme={suspect.portraitTheme}
                    size="lg"
                    className="group-hover:ring-1 group-hover:ring-[#b91c1c]/50 transition-all"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-cinzel text-lg font-bold text-[#ede8df] truncate">
                        {suspect.name}
                      </h3>
                      <span className="text-[11px] font-mono text-[#9ca3af]">
                        Age {suspect.age}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#b91c1c] tracking-wide mt-0.5">
                      {suspect.role}
                    </p>
                    <p className="text-xs text-[#9ca3af] mt-2 line-clamp-2 leading-relaxed">
                      {suspect.personality}
                    </p>
                  </div>
                </div>

                {/* Initial Alibi Quote */}
                <div className="mt-4 p-3 bg-[#0c0e14] border border-[#1b2230] rounded">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#71717a] block mb-1">
                    Initial Alibi Claim
                  </span>
                  <p className="font-serif italic text-xs text-[#cbd5e1] line-clamp-2">
                    “{suspect.initialAlibi}”
                  </p>
                </div>
              </div>

              {/* Card Footer Indicators */}
              <div className="mt-5 pt-3 border-t border-[#1b2230] flex items-center justify-between text-xs text-[#9ca3af]">
                <div className="flex items-center gap-3">
                  <span>
                    Linked Clues:{' '}
                    <strong className="text-[#ede8df] font-mono-tabular">
                      {relatedClues.length}
                    </strong>
                  </span>
                  {contradictionsCount > 0 && (
                    <span className="text-[#dc2626] font-semibold flex items-center gap-1">
                      <AlertCircle size={13} />
                      {contradictionsCount} Contradiction{contradictionsCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <span className="text-[#ede8df] group-hover:text-white font-medium text-[11px] uppercase tracking-wider flex items-center gap-1">
                  Open Dossier <ArrowRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Dossier Modal */}
      {selectedSuspect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#0f131b] border border-[#222938] rounded-lg shadow-2xl p-6 sm:p-8 text-left my-8">
            <div className="flex items-start justify-between pb-4 border-b border-[#1e2535]">
              <div className="flex items-center gap-4">
                <SuspectPortrait theme={selectedSuspect.portraitTheme} size="lg" />
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ede8df]">
                      {selectedSuspect.name}
                    </h3>
                    <span className="text-xs font-mono text-[#9ca3af]">
                      Age {selectedSuspect.age}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#b91c1c] uppercase tracking-wide">
                    {selectedSuspect.role}
                  </p>
                  <p className="text-xs text-[#9ca3af] mt-1">
                    Connection: {selectedSuspect.relationshipToCase}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSuspect(null)}
                className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
                aria-label="Close dossier"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-6 max-h-[65vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#141822] border border-[#212838] rounded">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#a89580] mb-1">
                    Investigative Suspicions & Motive
                  </h4>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {selectedSuspect.possibleMotive}
                  </p>
                </div>

                <div className="p-4 bg-[#141822] border border-[#212838] rounded">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#a89580] mb-1">
                    Psychological Profile
                  </h4>
                  <p className="text-xs text-[#cbd5e1] leading-relaxed">
                    {selectedSuspect.personality}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#121620] border border-[#222b3d] rounded">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] mb-1">
                  Sworn Public Statement
                </h4>
                <p className="font-serif italic text-xs text-[#ede8df] leading-relaxed">
                  “{selectedSuspect.publicStatement}”
                </p>
              </div>

              {/* Cataloged Statements */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ede8df] mb-3 flex items-center justify-between">
                  <span>Cataloged Statements</span>
                  <span className="text-[11px] font-normal text-[#9ca3af]">
                    Cross-examine against physical evidence
                  </span>
                </h4>
                <div className="space-y-3">
                  {selectedSuspect.statements.map((stmt: SuspectStatement) => {
                    const isContradicted = activeCase.contradictionRules.some(
                      (r) =>
                        r.statementId === stmt.id &&
                        confirmedContradictionIds.includes(r.id) &&
                        r.verdict === 'CONTRADICTION'
                    );

                    return (
                      <div
                        key={stmt.id}
                        className={`p-3 rounded border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          isContradicted
                            ? 'bg-[#211215] border-[#881337]'
                            : 'bg-[#141822] border-[#202738]'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-[#9ca3af]">
                              {stmt.id}
                            </span>
                            <span className="text-[11px] font-medium text-[#ede8df]">
                              {stmt.topic}
                            </span>
                            {isContradicted && (
                              <span className="text-[10px] uppercase font-bold text-[#dc2626]">
                                · Contradiction Proven
                              </span>
                            )}
                          </div>
                          <p className="font-serif italic text-[#cbd5e1]">
                            “{stmt.quote}”
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedSuspect(null);
                            onTestContradiction(stmt.id);
                          }}
                          className="px-3 py-1.5 bg-[#1b2230] hover:bg-[#252f42] text-[#ede8df] text-[11px] rounded font-medium tracking-wide uppercase transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
                        >
                          Compare with Clues
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Linked Evidence */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ede8df] mb-2">
                  Discovered Evidence Linked to Suspect
                </h4>
                {getSuspectRelatedClues(selectedSuspect.id).length === 0 ? (
                  <p className="text-xs text-[#71717a] italic">
                    Scan clues in the Crime Scene or Evidence Room to link them here.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {getSuspectRelatedClues(selectedSuspect.id).map((clue) => (
                      <div
                        key={clue.id}
                        className="p-2.5 bg-[#121620] border border-[#1f2637] rounded flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono text-[10px] text-[#b91c1c] block">
                            {clue.id}
                          </span>
                          <span className="text-[#ede8df] font-medium">
                            {clue.title}
                          </span>
                        </div>
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedSuspect(null)}
                className="px-4 py-2 bg-[#141822] hover:bg-[#1a2130] text-[#9ca3af] text-xs rounded transition-colors cursor-pointer"
              >
                Close Dossier
              </button>

              <button
                onClick={() => {
                  const id = selectedSuspect.id;
                  setSelectedSuspect(null);
                  onInterrogate(id);
                }}
                className="px-5 py-2 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Interrogate Suspect</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
