import React, { useState } from 'react';
import { CaseDefinition } from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import { Pin, CheckSquare, Square, Plus, Trash2, Scale, FileEdit, Compass } from 'lucide-react';

interface TheoryBoardProps {
  activeCase: CaseDefinition;
  suspectedCulpritId: string | null;
  onSelectSuspect: (suspectId: string) => void;
  selectedMotiveId: string;
  onSelectMotive: (motiveId: string) => void;
  selectedOpportunityId: string;
  onSelectOpportunity: (oppId: string) => void;
  linkedClueIds: string[];
  onToggleLinkedClue: (clueId: string) => void;
  investigationNotes: string;
  onUpdateNotes: (notes: string) => void;
  unansweredQuestions: string[];
  onAddQuestion: (question: string) => void;
  onRemoveQuestion: (index: number) => void;
  confirmedContradictionIds: string[];
  onProceedToVerdict: () => void;
}

export const TheoryBoard: React.FC<TheoryBoardProps> = ({
  activeCase,
  suspectedCulpritId,
  onSelectSuspect,
  selectedMotiveId,
  onSelectMotive,
  selectedOpportunityId,
  onSelectOpportunity,
  linkedClueIds,
  onToggleLinkedClue,
  investigationNotes,
  onUpdateNotes,
  unansweredQuestions,
  onAddQuestion,
  onRemoveQuestion,
  confirmedContradictionIds,
  onProceedToVerdict,
}) => {
  const [newQuestionText, setNewQuestionText] = useState('');

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onAddQuestion(newQuestionText.trim());
    setNewQuestionText('');
  };

  const confirmedRules = activeCase.contradictionRules.filter(
    (r) => confirmedContradictionIds.includes(r.id) && r.verdict === 'CONTRADICTION'
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Case Synthesis
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Investigation Board & Theory Wall
          </h2>
        </div>

        <button
          onClick={onProceedToVerdict}
          className="px-5 py-2.5 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold uppercase tracking-wider rounded shadow transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Scale size={15} />
          <span>Prepare Final Accusation</span>
        </button>
      </div>

      {/* Top Split: Prime Suspect, Motive/Method Hypotheses, & Pinned Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Primary Suspect Selection */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <h3 className="font-cinzel text-base font-bold text-[#ede8df] flex items-center gap-2">
              <Pin size={16} className="text-[#b91c1c]" />
              1. Prime Suspect Hypothesis
            </h3>
            <span className="text-[10px] font-mono text-[#a89580]">
              Who did it?
            </span>
          </div>

          <div className="space-y-2.5">
            {activeCase.suspects.map((suspect) => {
              const isSelected = suspectedCulpritId === suspect.id;

              return (
                <button
                  key={suspect.id}
                  onClick={() => onSelectSuspect(suspect.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#201217] border-[#b91c1c] ring-1 ring-[#b91c1c]'
                      : 'bg-[#141822] border-[#222a3a] hover:bg-[#181d29]'
                  }`}
                >
                  <SuspectPortrait theme={suspect.portraitTheme} size="sm" />
                  <div className="min-w-0 flex-1">
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
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-[#dc2626] bg-[#3a1219] px-2 py-0.5 rounded">
                      Prime
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Working Motive & Method Selection */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <h3 className="font-cinzel text-base font-bold text-[#ede8df] flex items-center gap-2">
              <Compass size={16} className="text-[#b91c1c]" />
              2. Motive & Method Theory
            </h3>
            <span className="text-[10px] font-mono text-[#a89580]">
              Why & How?
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#a89580] mb-1.5">
                Suspected Motive:
              </label>
              <select
                value={selectedMotiveId}
                onChange={(e) => onSelectMotive(e.target.value)}
                className="w-full bg-[#141925] border border-[#252f42] rounded p-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
              >
                <option value="">-- Select a Working Motive --</option>
                {activeCase.motiveOptions.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.text}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#a89580] mb-1.5">
                Suspected Opportunity / Method:
              </label>
              <select
                value={selectedOpportunityId}
                onChange={(e) => onSelectOpportunity(e.target.value)}
                className="w-full bg-[#141925] border border-[#252f42] rounded p-2.5 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
              >
                <option value="">-- Select a Working Method --</option>
                {activeCase.opportunityOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.text}
                  </option>
                ))}
              </select>
            </div>

            {/* Verified Contradictions Summary */}
            <div className="pt-2 border-t border-[#1b2230]">
              <span className="text-[11px] font-mono uppercase text-[#dc2626] block mb-1.5">
                Confirmed Contradictions ({confirmedRules.length})
              </span>
              {confirmedRules.length === 0 ? (
                <p className="text-xs text-[#71717a] italic">
                  Use the Contradiction Detector to prove alibi lies.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-[125px] overflow-y-auto pr-1">
                  {confirmedRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="p-2 bg-[#191116] border border-[#881337] rounded text-[11px] text-[#ede8df]"
                    >
                      <strong>{rule.title}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Pinned Evidence to Hypothesis */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
              3. Pinned Clues ({linkedClueIds.length})
            </h3>
            <span className="text-[10px] font-mono text-[#a89580]">
              Supporting Exhibits
            </span>
          </div>

          <p className="text-xs text-[#9ca3af]">
            Select the decisive forensic clues that prove your theory (automatically pre-filled in Final Accusation):
          </p>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {activeCase.clues.map((clue) => {
              const isPinned = linkedClueIds.includes(clue.id);

              return (
                <button
                  key={clue.id}
                  onClick={() => onToggleLinkedClue(clue.id)}
                  className={`w-full p-2.5 rounded border text-left text-xs transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                    isPinned
                      ? 'bg-[#1b212f] border-[#38455e] text-[#ede8df]'
                      : 'bg-[#121620] border-[#1e2535] text-[#9ca3af] hover:text-[#ede8df]'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[10px] font-bold text-[#b91c1c]">
                        {clue.id}
                      </span>
                      <span className="font-medium truncate">{clue.title}</span>
                    </div>
                  </div>
                  {isPinned ? (
                    <CheckSquare size={16} className="text-emerald-400 shrink-0" />
                  ) : (
                    <Square size={16} className="text-[#4b5563] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Split: Questions Checklist & Freeform Detective Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Unanswered Questions Checklist */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
              Investigative Questions & Leads
            </h3>
            <span className="text-[10px] font-mono text-[#a89580]">
              Active Checklist
            </span>
          </div>

          <form onSubmit={handleAddQuestion} className="flex items-center gap-2">
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="Add an inquiry or discrepancy to verify..."
              className="flex-1 bg-[#151a24] border border-[#252f42] rounded px-3 py-1.5 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#1e2535] hover:bg-[#283247] text-[#ede8df] rounded text-xs flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-2 max-h-[240px] overflow-y-auto">
            {unansweredQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-[#131722] border border-[#1e2535] rounded flex items-center justify-between gap-3 text-xs"
              >
                <span className="text-[#ede8df] leading-relaxed">{q}</span>
                <button
                  onClick={() => onRemoveQuestion(idx)}
                  className="text-[#64748b] hover:text-[#ef4444] cursor-pointer p-1 shrink-0"
                  title="Remove lead"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Freeform Master Investigation Scratchpad */}
        <div className="p-5 bg-[#10141d] border border-[#202738] rounded-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1b2230]">
            <h3 className="font-cinzel text-base font-bold text-[#ede8df] flex items-center gap-2">
              <FileEdit size={16} className="text-[#a89580]" />
              Detective’s Case Notebook
            </h3>
            <span className="text-[10px] font-mono text-emerald-400">
              Auto-Saved Locally
            </span>
          </div>

          <textarea
            rows={9}
            value={investigationNotes}
            onChange={(e) => onUpdateNotes(e.target.value)}
            placeholder="Document your working deductions, suspect timelines, and physical evidence alignments here..."
            className="w-full bg-[#121620] border border-[#232c3d] rounded p-3 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c] leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
