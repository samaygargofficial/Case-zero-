import React, { useState, useEffect } from 'react';
import { CaseDefinition } from '../types/case';
import { AlertTriangle, HelpCircle, ShieldCheck, Flame } from 'lucide-react';

interface ContradictionDetectorProps {
  activeCase: CaseDefinition;
  initialStatementId?: string | null;
  initialClueId?: string | null;
  confirmedContradictionIds: string[];
  onConfirmContradiction: (ruleId: string) => void;
}

export const ContradictionDetector: React.FC<ContradictionDetectorProps> = ({
  activeCase,
  initialStatementId,
  initialClueId,
  confirmedContradictionIds,
  onConfirmContradiction,
}) => {
  const allStatements = activeCase.suspects.flatMap((s) =>
    s.statements.map((stmt) => ({
      ...stmt,
      suspectName: s.name,
      suspectRole: s.role,
    }))
  );

  const [selectedStatementId, setSelectedStatementId] = useState<string>(
    initialStatementId && allStatements.some((s) => s.id === initialStatementId)
      ? initialStatementId
      : allStatements[0]?.id || ''
  );
  const [selectedClueId, setSelectedClueId] = useState<string>(
    initialClueId && activeCase.clues.some((c) => c.id === initialClueId)
      ? initialClueId
      : activeCase.clues[0]?.id || ''
  );

  useEffect(() => {
    if (
      initialStatementId &&
      allStatements.some((s) => s.id === initialStatementId)
    ) {
      setSelectedStatementId(initialStatementId);
    }
  }, [initialStatementId]);

  useEffect(() => {
    if (
      initialClueId &&
      activeCase.clues.some((c) => c.id === initialClueId)
    ) {
      setSelectedClueId(initialClueId);
    }
  }, [initialClueId]);

  const [activeAnalysis, setActiveAnalysis] = useState<{
    verdict: 'CONTRADICTION' | 'INCONSISTENCY' | 'UNVERIFIED' | 'INCONCLUSIVE';
    title: string;
    explanation: string;
    ruleId?: string;
  } | null>(null);

  const selectedStatement =
    allStatements.find((s) => s.id === selectedStatementId) || allStatements[0];
  const selectedClue =
    activeCase.clues.find((c) => c.id === selectedClueId) ||
    activeCase.clues[0];

  const handleAnalyze = () => {
    if (!selectedStatement || !selectedClue) return;

    const matchedRule = activeCase.contradictionRules.find(
      (r) =>
        r.statementId === selectedStatement.id &&
        r.clueId === selectedClue.id
    );

    if (matchedRule) {
      setActiveAnalysis({
        verdict: matchedRule.verdict,
        title: matchedRule.title,
        explanation: matchedRule.explanation,
        ruleId: matchedRule.id,
      });

      if (matchedRule.verdict === 'CONTRADICTION') {
        onConfirmContradiction(matchedRule.id);
      }
    } else {
      setActiveAnalysis({
        verdict: 'INCONCLUSIVE',
        title: 'No Direct Forensic Contradiction',
        explanation: `Comparing statement ${selectedStatement.id} ("${selectedStatement.topic}") with ${selectedClue.id} (${selectedClue.title}) does not produce a direct physical or chronological contradiction. Try pairing statements with the specific timestamped logs or forensic traces that test their claim.`,
      });
    }
  };

  const totalCaseContradictions = activeCase.contradictionRules.filter(
    (r) => r.verdict === 'CONTRADICTION'
  ).length;

  const confirmedRules = activeCase.contradictionRules.filter(
    (r) =>
      confirmedContradictionIds.includes(r.id) &&
      r.verdict === 'CONTRADICTION'
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Forensic Logic Engine
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Contradiction Detector
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-[#9ca3af]">Proven Contradictions Found:</span>
          <strong className="text-[#dc2626] font-mono-tabular text-sm">
            {confirmedRules.length} / {totalCaseContradictions}
          </strong>
        </div>
      </div>

      {/* Comparison Engine Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1: Select Suspect Statement */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ede8df]">
              1. Select Suspect Statement
            </span>
            <span className="text-[10px] font-mono text-[#71717a]">
              {allStatements.length} statements cataloged
            </span>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Choose Statement to Cross-Examine:
            </label>
            <select
              value={selectedStatement?.id || ''}
              onChange={(e) => {
                setSelectedStatementId(e.target.value);
                setActiveAnalysis(null);
              }}
              className="w-full bg-[#151a24] border border-[#252f42] rounded px-3 py-2 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
            >
              {activeCase.suspects.map((suspect) => (
                <optgroup key={suspect.id} label={suspect.name}>
                  {suspect.statements.map((stmt) => (
                    <option key={stmt.id} value={stmt.id}>
                      [{stmt.id}] {stmt.topic} — {suspect.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {selectedStatement && (
            <div className="p-3.5 bg-[#141822] border border-[#1f2637] rounded space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#ede8df]">
                  {selectedStatement.suspectName}
                </span>
                <span className="font-mono text-[#a89580]">
                  {selectedStatement.suspectRole}
                </span>
              </div>
              <p className="font-serif italic text-xs text-[#cbd5e1] leading-relaxed">
                “{selectedStatement.quote}”
              </p>
            </div>
          )}
        </div>

        {/* Step 2: Select Piece of Evidence */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#ede8df]">
              2. Select Forensic Evidence
            </span>
            <span className="text-[10px] font-mono text-[#71717a]">
              {activeCase.clues.length} exhibits available
            </span>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Choose Evidence Item to Compare:
            </label>
            <select
              value={selectedClue?.id || ''}
              onChange={(e) => {
                setSelectedClueId(e.target.value);
                setActiveAnalysis(null);
              }}
              className="w-full bg-[#151a24] border border-[#252f42] rounded px-3 py-2 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
            >
              {activeCase.clues.map((clue) => (
                <option key={clue.id} value={clue.id}>
                  [{clue.id}] {clue.title} ({clue.category})
                </option>
              ))}
            </select>
          </div>

          {selectedClue && (
            <div className="p-3.5 bg-[#141822] border border-[#1f2637] rounded space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#ede8df]">
                  {selectedClue.title}
                </span>
                <span className="font-mono text-[#b91c1c]">
                  {selectedClue.id}
                </span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                {selectedClue.description}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Comparison */}
      <div className="text-center pt-2">
        <button
          onClick={handleAnalyze}
          className="px-8 py-3 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-widest rounded shadow-md border border-[#b91c1c]/50 transition-all cursor-pointer flex items-center gap-2 mx-auto"
        >
          <Flame size={15} />
          <span>Submit Forensic Comparison</span>
        </button>
      </div>

      {/* Verdict Result */}
      {activeAnalysis && (
        <div
          className={`p-6 rounded-lg border transition-all ${
            activeAnalysis.verdict === 'CONTRADICTION'
              ? 'bg-[#240e13] border-[#b91c1c] text-white shadow-xl'
              : activeAnalysis.verdict === 'INCONSISTENCY'
              ? 'bg-[#241a0d] border-[#d97706] text-white'
              : 'bg-[#121620] border-[#222c3d] text-[#ede8df]'
          }`}
        >
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            {activeAnalysis.verdict === 'CONTRADICTION' ? (
              <AlertTriangle className="text-[#ef4444] shrink-0" size={24} />
            ) : activeAnalysis.verdict === 'INCONSISTENCY' ? (
              <HelpCircle className="text-amber-400 shrink-0" size={24} />
            ) : (
              <ShieldCheck className="text-slate-400 shrink-0" size={24} />
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase font-bold text-[#fca5a5]">
                {activeAnalysis.verdict === 'CONTRADICTION'
                  ? 'PROVEN CONTRADICTION (+4 PTS BONUS)'
                  : activeAnalysis.verdict === 'INCONSISTENCY'
                  ? 'SUSPICIOUS INCONSISTENCY'
                  : 'COMPATIBLE / NO DIRECT CLASH'}
              </span>
              <span>·</span>
              <span className="font-cinzel text-base font-bold">
                {activeAnalysis.title}
              </span>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#ede8df]">
            {activeAnalysis.explanation}
          </p>
        </div>
      )}

      {/* Confirmed Contradictions Ledger */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="font-cinzel text-lg font-bold text-[#ede8df]">
            Confirmed Contradictions Ledger ({confirmedRules.length}/{totalCaseContradictions})
          </h3>
          <span className="text-xs text-[#9ca3af]">
            Each confirmed contradiction adds bonus points to your Final Verdict.
          </span>
        </div>

        {confirmedRules.length === 0 ? (
          <div className="p-6 bg-[#10141d] border border-[#1b2230] rounded text-center text-xs text-[#71717a] italic">
            No contradictions confirmed yet for {activeCase.code}. Compare suspect alibis against timestamped logs above.
          </div>
        ) : (
          <div className="space-y-3">
            {confirmedRules.map((rule) => {
              const stmt = allStatements.find((s) => s.id === rule.statementId);
              const clue = activeCase.clues.find((c) => c.id === rule.clueId);

              return (
                <div
                  key={rule.id}
                  className="p-4 bg-[#181116] border border-[#881337] rounded-lg text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel font-bold text-[#ede8df] text-sm">
                      {rule.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#b91c1c] uppercase font-semibold">
                      {rule.id}
                    </span>
                  </div>

                  <p className="text-[#cbd5e1] leading-relaxed">
                    {rule.explanation}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-[#9ca3af] pt-1">
                    <span>
                      Statement:{' '}
                      <strong className="text-[#ede8df]">
                        {stmt?.id} ({stmt?.suspectName})
                      </strong>
                    </span>
                    <span>·</span>
                    <span>
                      Evidence:{' '}
                      <strong className="text-[#ede8df]">
                        {clue?.id} ({clue?.title})
                      </strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
