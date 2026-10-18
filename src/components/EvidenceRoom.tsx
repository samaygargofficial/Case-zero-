import React, { useState } from 'react';
import { CaseDefinition, Clue } from '../types/case';
import { Star, MapPin, Clock, FileSearch, ArrowRight, X, User, Sparkles } from 'lucide-react';

interface EvidenceRoomProps {
  activeCase: CaseDefinition;
  discoveredClueIds: string[];
  importantClueIds: string[];
  clueNotes: Record<string, string>;
  onDiscoverClue: (clueId: string) => void;
  onToggleImportant: (clueId: string) => void;
  onSaveClueNote: (clueId: string, note: string) => void;
  onCompareWithStatements: (clueId: string) => void;
}

export const EvidenceRoom: React.FC<EvidenceRoomProps> = ({
  activeCase,
  discoveredClueIds,
  importantClueIds,
  clueNotes,
  onDiscoverClue,
  onToggleImportant,
  onSaveClueNote,
  onCompareWithStatements,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [inspectingClue, setInspectingClue] = useState<Clue | null>(null);
  const [currentNote, setCurrentNote] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Exhibits' },
    { id: 'log', label: 'Security & Logs' },
    { id: 'forensic', label: 'Forensic Traces' },
    { id: 'document', label: 'Official Documents' },
    { id: 'physical', label: 'Physical Clues' },
  ];

  const filteredClues = activeCase.clues.filter((c) => {
    if (filterCategory === 'all') return true;
    return c.category === filterCategory;
  });

  const discoveredCount = activeCase.clues.filter((c) =>
    discoveredClueIds.includes(c.id)
  ).length;
  const totalCount = activeCase.clues.length;

  const handleOpenInspect = (clue: Clue) => {
    onDiscoverClue(clue.id);
    setInspectingClue(clue);
    setCurrentNote(clueNotes[clue.id] || '');
  };

  const handleSaveNote = () => {
    if (inspectingClue) {
      onSaveClueNote(inspectingClue.id, currentNote);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Forensic Vault
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Evidence Room & Exhibit Locker
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-[#9ca3af]">
            Scanned Exhibits:{' '}
            <strong className="text-[#ede8df] font-mono-tabular">
              {discoveredCount} / {totalCount}
            </strong>
          </span>
          <span className="text-[#71717a]">·</span>
          <span className="text-[#b91c1c]">
            Priority Starred:{' '}
            <strong className="font-mono-tabular">{importantClueIds.length}</strong>
          </span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#1b2230] pb-3">
        {categories.map((cat) => {
          const isActive = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#1e2535] text-[#ede8df] border border-[#333e54]'
                  : 'text-[#9ca3af] hover:text-[#ede8df] hover:bg-[#141822]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClues.map((clue) => {
          const isDiscovered = discoveredClueIds.includes(clue.id);
          const isImportant = importantClueIds.includes(clue.id);
          const hasNote = Boolean(clueNotes[clue.id]?.trim());

          return (
            <div
              key={clue.id}
              onClick={() => handleOpenInspect(clue)}
              className={`group rounded-lg p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                isImportant
                  ? 'bg-[#151924] border-[#9f1239]/60 hover:border-[#b91c1c]'
                  : 'bg-[#10141d] border-[#1f2637] hover:border-[#38435b]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1b212f]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-[#b91c1c] tracking-wider">
                      {clue.id}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717a]">
                      · {clue.category}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleImportant(clue.id);
                    }}
                    className={`p-1 rounded hover:bg-[#1a2130] transition-colors cursor-pointer ${
                      isImportant
                        ? 'text-amber-400'
                        : 'text-[#4b5563] hover:text-[#9ca3af]'
                    }`}
                    title={isImportant ? 'Remove star' : 'Mark as critical evidence'}
                  >
                    <Star size={16} fill={isImportant ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <h3 className="font-cinzel text-base font-bold text-[#ede8df] mt-3 group-hover:text-white transition-colors">
                  {clue.title}
                </h3>

                <div className="mt-2.5 space-y-1 text-xs text-[#9ca3af]">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin size={13} className="text-[#a89580] shrink-0" />
                    <span className="truncate">{clue.discoveryLocation}</span>
                  </div>
                  {clue.relevantTimestamp && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#a89580]">
                      <Clock size={12} className="shrink-0" />
                      <span>Timestamp: {clue.relevantTimestamp}</span>
                    </div>
                  )}
                </div>

                <p className="mt-3 text-xs text-[#cbd5e1] line-clamp-2 leading-relaxed">
                  {clue.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1b212f] flex items-center justify-between text-xs text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase ${
                      isDiscovered ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {isDiscovered ? 'Verified' : 'Click to Scan'}
                  </span>
                  {hasNote && (
                    <span className="text-[10px] uppercase tracking-wider text-sky-400 font-mono">
                      · Noted
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-medium uppercase tracking-wider text-[#ede8df] group-hover:text-white flex items-center gap-1">
                  Inspect <ArrowRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Inspection Modal */}
      {inspectingClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0f131b] border border-[#222938] rounded-lg shadow-2xl p-6 sm:p-8 text-left my-8">
            <div className="flex items-start justify-between pb-4 border-b border-[#1e2535]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#b91c1c]">
                    {inspectingClue.id}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#a89580]">
                    · {inspectingClue.category}
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#ede8df] mt-1">
                  {inspectingClue.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleImportant(inspectingClue.id)}
                  className={`p-2 rounded hover:bg-[#1a2130] transition-colors cursor-pointer ${
                    importantClueIds.includes(inspectingClue.id)
                      ? 'text-amber-400'
                      : 'text-[#6b7280] hover:text-[#9ca3af]'
                  }`}
                >
                  <Star
                    size={20}
                    fill={
                      importantClueIds.includes(inspectingClue.id)
                        ? 'currentColor'
                        : 'none'
                    }
                  />
                </button>
                <button
                  onClick={() => setInspectingClue(null)}
                  className="text-[#9ca3af] hover:text-white cursor-pointer p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#131722] border border-[#1f2637] rounded text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                    Discovery Location
                  </span>
                  <span className="text-[#ede8df] font-medium">
                    {inspectingClue.discoveryLocation}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#71717a] block">
                    Relevant Time Marker
                  </span>
                  <span className="text-[#ede8df] font-mono">
                    {inspectingClue.relevantTimestamp || 'Static Forensic Property'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#a89580] mb-1.5">
                  Laboratory Examination
                </h4>
                <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed bg-[#11151f] p-4 rounded border border-[#1e2535]">
                  {inspectingClue.description}
                </p>
              </div>

              <div className="p-4 bg-[#1f1519] border border-[#881337]/50 rounded">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#b91c1c] mb-1.5 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  What This Clue Establishes
                </h4>
                <p className="text-xs sm:text-sm text-[#ede8df] leading-relaxed">
                  {inspectingClue.establishes}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#9ca3af] mb-2">
                  Implicated Persons of Interest
                </h4>
                <div className="flex flex-wrap gap-2">
                  {inspectingClue.relatedSuspectIds.map((sid) => {
                    const suspect = activeCase.suspects.find((s) => s.id === sid);
                    if (!suspect) return null;
                    return (
                      <span
                        key={sid}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#141924] border border-[#232c3d] rounded text-xs text-[#ede8df]"
                      >
                        <User size={12} className="text-[#b91c1c]" />
                        <span>{suspect.name}</span>
                        <span className="text-[10px] text-[#71717a]">({suspect.role})</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#ede8df]">
                    Private Case Notebook Entry
                  </h4>
                  <span className="text-[10px] text-[#71717a]">Auto-saved</span>
                </div>
                <textarea
                  rows={2}
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onBlur={handleSaveNote}
                  placeholder="Record your forensic note on this clue..."
                  className="w-full bg-[#121620] border border-[#232c3d] rounded p-3 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c]"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1e2535] flex items-center justify-between">
              <button
                onClick={() => {
                  handleSaveNote();
                  setInspectingClue(null);
                }}
                className="px-4 py-2 bg-[#141822] hover:bg-[#1a2130] text-[#9ca3af] text-xs rounded transition-colors cursor-pointer"
              >
                Close Exhibit
              </button>

              <button
                onClick={() => {
                  handleSaveNote();
                  const clueId = inspectingClue.id;
                  setInspectingClue(null);
                  onCompareWithStatements(clueId);
                }}
                className="px-4 py-2 bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-semibold tracking-wider uppercase rounded shadow transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileSearch size={14} />
                <span>Test for Contradictions</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
