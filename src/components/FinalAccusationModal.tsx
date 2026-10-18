import React, { useState, useEffect } from 'react';
import {
  CaseDefinition,
  VerdictEvaluation,
  VerdictSubmission,
} from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import {
  X,
  Scale,
  Award,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Play,
} from 'lucide-react';

interface FinalAccusationModalProps {
  activeCase: CaseDefinition;
  initialCulpritId: string | null;
  initialMotiveId: string;
  initialOpportunityId: string;
  initialSupportingClueIds: string[];
  remainingSeconds: number;
  elapsedSeconds: number;
  hintsUsed: number;
  confirmedContradictionsCount: number;
  wrongAccusations: number;
  isOpen: boolean;
  onClose: () => void;
  onSubmitVerdict: (submission: VerdictSubmission) => Promise<VerdictEvaluation>;
  onProceedToReveal: () => void;
  onNextLevel?: () => void;
}

export const FinalAccusationModal: React.FC<FinalAccusationModalProps> = ({
  activeCase,
  initialCulpritId,
  initialMotiveId,
  initialOpportunityId,
  initialSupportingClueIds,
  remainingSeconds,
  elapsedSeconds,
  hintsUsed,
  confirmedContradictionsCount,
  wrongAccusations,
  isOpen,
  onClose,
  onSubmitVerdict,
  onProceedToReveal,
  onNextLevel,
}) => {
  const [culpritId, setCulpritId] = useState<string>(
    initialCulpritId || activeCase.suspects[0].id
  );
  const [motiveId, setMotiveId] = useState<string>(
    initialMotiveId || activeCase.motiveOptions[0]?.id || ''
  );
  const [opportunityId, setOpportunityId] = useState<string>(
    initialOpportunityId || activeCase.opportunityOptions[0]?.id || ''
  );
  const [motiveText, setMotiveText] = useState<string>('');
  const [opportunityText, setOpportunityText] = useState<string>('');
  const [sequenceOfEvents, setSequenceOfEvents] = useState<string>('');
  const [supportingClueIds, setSupportingClueIds] = useState<string[]>(
    initialSupportingClueIds
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<VerdictEvaluation | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCulpritId(initialCulpritId || activeCase.suspects[0].id);
      setMotiveId(initialMotiveId || activeCase.motiveOptions[0]?.id || '');
      setOpportunityId(
        initialOpportunityId || activeCase.opportunityOptions[0]?.id || ''
      );
      if (initialSupportingClueIds.length > 0) {
        setSupportingClueIds(initialSupportingClueIds);
      }
    }
  }, [
    isOpen,
    activeCase.id,
    initialCulpritId,
    initialMotiveId,
    initialOpportunityId,
    initialSupportingClueIds,
  ]);

  if (!isOpen) return null;

  const toggleClue = (cid: string) => {
    setSupportingClueIds((prev) =>
      prev.includes(cid) ? prev.filter((id) => id !== cid) : [...prev, cid]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!culpritId) return;

    setIsSubmitting(true);
    try {
      const selectedMotiveOption =
        activeCase.motiveOptions.find((m) => m.id === motiveId)?.text || '';
      const selectedOppOption =
        activeCase.opportunityOptions.find((o) => o.id === opportunityId)
          ?.text || '';

      const result = await onSubmitVerdict({
        caseId: activeCase.id,
        culpritId,
        motiveId,
        opportunityId,
        motiveText: `${selectedMotiveOption} ${motiveText}`.trim(),
        opportunityText: `${selectedOppOption} ${opportunityText}`.trim(),
        sequenceOfEvents,
        supportingClueIds,
        remainingSeconds,
        elapsedSeconds,
        hintsUsed,
        confirmedContradictionsCount,
        wrongAccusations,
      });
      setEvaluation(result);
    } catch (err) {
      console.error('Error submitting verdict:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e1219] border border-[#232a3a] rounded-lg shadow-2xl p-6 sm:p-8 text-left my-8 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#1d2433]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89580]">
              Level {activeCase.levelNumber} · {activeCase.code} · Official Indictment
            </span>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ede8df] mt-0.5">
              Final Accusation: {activeCase.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
          >
            <X size={20} />
          </button>
        </div>

        {evaluation ? (
          /* Evaluation & Detective Scoreboard */
          <div className="mt-6 space-y-6">
            {/* Rank Banner */}
            <div
              className={`p-6 rounded-lg border text-center space-y-2 ${
                evaluation.isCulpritCorrect && evaluation.totalScore >= 85
                  ? 'bg-[#15241b] border-emerald-500/50 shadow-xl'
                  : evaluation.isCulpritCorrect
                  ? 'bg-[#221c13] border-amber-500/50'
                  : 'bg-[#241116] border-[#881337]'
              }`}
            >
              <Award
                className={`mx-auto ${
                  evaluation.isCulpritCorrect
                    ? 'text-amber-400'
                    : 'text-[#ef4444]'
                }`}
                size={38}
              />
              <span className="text-xs font-mono uppercase tracking-widest text-[#9ca3af]">
                Detective Performance Evaluation
              </span>
              <h3 className="font-cinzel text-3xl font-bold text-[#ede8df]">
                RANK {evaluation.rank}
              </h3>
              <p className="text-2xl font-mono-tabular font-bold text-[#ede8df]">
                {evaluation.totalScore}{' '}
                <span className="text-sm font-normal text-[#9ca3af]">
                  / 100 Points
                </span>
              </p>
              <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-xl mx-auto pt-1 leading-relaxed">
                {evaluation.feedbackSummary}
              </p>
            </div>

            {/* Score Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  1. Culprit Identification (Max 30)
                </span>
                <span className="text-lg font-mono-tabular font-bold text-[#ede8df]">
                  +{evaluation.culpritScore} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {evaluation.breakdown.culpritFeedback}
                </p>
              </div>

              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  2. Motive Deduction (Max 20)
                </span>
                <span className="text-lg font-mono-tabular font-bold text-[#ede8df]">
                  +{evaluation.motiveScore} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {evaluation.breakdown.motiveFeedback}
                </p>
              </div>

              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  3. Method & Opportunity (Max 20)
                </span>
                <span className="text-lg font-mono-tabular font-bold text-[#ede8df]">
                  +{evaluation.opportunityScore} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {evaluation.breakdown.opportunityFeedback}
                </p>
              </div>

              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  4. Decisive Evidence (Max 20)
                </span>
                <span className="text-lg font-mono-tabular font-bold text-[#ede8df]">
                  +{evaluation.evidenceScore} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {evaluation.breakdown.evidenceFeedback}
                </p>
              </div>

              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  5. Contradictions Bonus (Max 10)
                </span>
                <span className="text-lg font-mono-tabular font-bold text-emerald-400">
                  +{evaluation.contradictionBonus} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {confirmedContradictionsCount} proven contradiction(s) logged.
                </p>
              </div>

              <div className="p-3.5 bg-[#121620] border border-[#1e2535] rounded">
                <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                  6. Time Bonus & Modifiers
                </span>
                <span className="text-lg font-mono-tabular font-bold text-amber-400">
                  +{evaluation.timeBonus} / -{evaluation.hintPenalty + evaluation.wrongAccusationPenalty} pts
                </span>
                <p className="text-[11px] text-[#9ca3af] mt-1">
                  {evaluation.breakdown.timeFeedback}
                </p>
              </div>
            </div>

            {/* Evaluation Actions */}
            <div className="pt-4 border-t border-[#1d2433] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setEvaluation(null)}
                className="px-4 py-2 bg-[#141822] hover:bg-[#1a2130] text-[#9ca3af] text-xs rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Revise Accusation & Retry</span>
              </button>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    setEvaluation(null);
                    onProceedToReveal();
                  }}
                  className="px-5 py-2.5 bg-[#1c2436] hover:bg-[#263149] text-[#ede8df] border border-[#344361] text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Declassify Full Case Solution</span>
                  <ArrowRight size={14} />
                </button>

                {evaluation.isCulpritCorrect &&
                  activeCase.levelNumber < 10 &&
                  onNextLevel && (
                    <button
                      onClick={() => {
                        setEvaluation(null);
                        onNextLevel();
                      }}
                      className="px-6 py-2.5 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Play size={14} fill="currentColor" />
                      <span>Proceed to Level {activeCase.levelNumber + 1}</span>
                    </button>
                  )}
              </div>
            </div>
          </div>
        ) : (
          /* Form Entry */
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <p className="text-xs text-[#9ca3af]">
              Select the responsible culprit, establish their motive and method, and attach the decisive forensic evidence to seal the indictment before the timer expires.
            </p>

            {/* Step 1: Select Suspect */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#ede8df] mb-3">
                1. Name the Responsible Culprit <span className="text-[#b91c1c]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeCase.suspects.map((suspect) => {
                  const isSelected = culpritId === suspect.id;
                  return (
                    <button
                      type="button"
                      key={suspect.id}
                      onClick={() => setCulpritId(suspect.id)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-[#221016] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                          : 'bg-[#121620] border-[#1e2535] hover:bg-[#161c28]'
                      }`}
                    >
                      <SuspectPortrait theme={suspect.portraitTheme} size="sm" />
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isSelected ? 'text-[#fca5a5]' : 'text-[#ede8df]'
                          }`}
                        >
                          {suspect.name}
                        </p>
                        <p className="text-[10px] text-[#9ca3af] truncate">
                          {suspect.role}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Motive + Optional Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#ede8df]">
                  2. Establish Perpetrator’s Motive <span className="text-[#b91c1c]">*</span>
                </label>
                <select
                  value={motiveId}
                  onChange={(e) => setMotiveId(e.target.value)}
                  className="w-full bg-[#121620] border border-[#232c3d] rounded p-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
                >
                  {activeCase.motiveOptions.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.text}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={2}
                  value={motiveText}
                  onChange={(e) => setMotiveText(e.target.value)}
                  placeholder="Optional additional motive notes..."
                  className="w-full bg-[#121620] border border-[#232c3d] rounded p-2.5 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                />
              </div>

              {/* Step 3: Opportunity / Method */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#ede8df]">
                  3. Establish Opportunity & Method <span className="text-[#b91c1c]">*</span>
                </label>
                <select
                  value={opportunityId}
                  onChange={(e) => setOpportunityId(e.target.value)}
                  className="w-full bg-[#121620] border border-[#232c3d] rounded p-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
                >
                  {activeCase.opportunityOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.text}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={2}
                  value={opportunityText}
                  onChange={(e) => setOpportunityText(e.target.value)}
                  placeholder="Optional additional method / hiding location details..."
                  className="w-full bg-[#121620] border border-[#232c3d] rounded p-2.5 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                />
              </div>
            </div>

            {/* Step 4: Supporting Clues */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#ede8df] mb-2">
                4. Attach Decisive Supporting Clues ({supportingClueIds.length} selected)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 max-h-[210px] overflow-y-auto pr-1">
                {activeCase.clues.map((clue) => {
                  const isChecked = supportingClueIds.includes(clue.id);

                  return (
                    <button
                      type="button"
                      key={clue.id}
                      onClick={() => toggleClue(clue.id)}
                      className={`p-2.5 rounded border text-left text-xs transition-colors cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#1b212f] border-[#38455e] text-[#ede8df]'
                          : 'bg-[#121620] border-[#1e2535] text-[#9ca3af] hover:text-[#ede8df]'
                      }`}
                    >
                      <div className="truncate mr-2">
                        <span className="font-mono text-[10px] text-[#b91c1c] font-bold block">
                          {clue.id}
                        </span>
                        <span className="truncate block font-medium">
                          {clue.title}
                        </span>
                      </div>
                      {isChecked ? (
                        <CheckCircle size={15} className="text-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded border border-[#4b5563] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#1d2433] flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#141822] hover:bg-[#1a2130] text-[#9ca3af] text-xs rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#881337] hover:bg-[#9f1239] disabled:opacity-50 text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Scale size={14} />
                <span>
                  {isSubmitting
                    ? 'Evaluating Indictment...'
                    : 'Submit Final Accusation'}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
