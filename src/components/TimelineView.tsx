import React, { useState } from 'react';
import { CaseDefinition } from '../types/case';
import { Clock, AlertTriangle, User, FileText, ArrowRight } from 'lucide-react';

interface TimelineViewProps {
  activeCase: CaseDefinition;
  onInspectClue: (clueId: string) => void;
  onInterrogateSuspect: (suspectId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  activeCase,
  onInspectClue,
  onInterrogateSuspect,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'conflicts' | 'confirmed'>('all');
  const [selectedSuspectFilter, setSelectedSuspectFilter] = useState<string>('all');

  const timelineEvents = activeCase.timeline.filter((ev) => {
    if (filterMode === 'conflicts' && ev.status !== 'CONTRADICTED') return false;
    if (filterMode === 'confirmed' && ev.status !== 'CONFIRMED') return false;
    if (selectedSuspectFilter !== 'all' && ev.suspectId !== selectedSuspectFilter) return false;
    return true;
  });

  const conflictCount = activeCase.timeline.filter((e) => e.status === 'CONTRADICTED').length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Chronological Audit
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Incident Sequence & Alibi Timeline
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-[#9ca3af]">Total Sequence Events: {activeCase.timeline.length}</span>
          <span>·</span>
          <span className="text-[#dc2626] font-semibold flex items-center gap-1">
            <AlertTriangle size={13} /> {conflictCount} Active Conflicts Detected
          </span>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#11141c] border border-[#1f2637] rounded-lg">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#9ca3af]">
            Filter Events:
          </span>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#1e2535] text-[#ede8df] font-semibold'
                : 'text-[#9ca3af] hover:text-[#ede8df]'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterMode('conflicts')}
            className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              filterMode === 'conflicts'
                ? 'bg-[#881337] text-white font-semibold'
                : 'text-[#9ca3af] hover:text-[#ede8df]'
            }`}
          >
            <AlertTriangle size={12} className="text-[#f87171]" />
            Conflicts Only ({conflictCount})
          </button>
          <button
            onClick={() => setFilterMode('confirmed')}
            className={`px-3 py-1 text-xs rounded transition-colors cursor-pointer ${
              filterMode === 'confirmed'
                ? 'bg-[#1e2535] text-[#ede8df] font-semibold'
                : 'text-[#9ca3af] hover:text-[#ede8df]'
            }`}
          >
            Confirmed Only
          </button>
        </div>

        {/* Suspect Filter */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wider text-[#9ca3af]">
            Suspect Focus:
          </span>
          <select
            value={selectedSuspectFilter}
            onChange={(e) => setSelectedSuspectFilter(e.target.value)}
            className="bg-[#151a24] border border-[#252f42] rounded px-3 py-1 text-xs text-[#ede8df] focus:outline-none focus:border-[#b91c1c]"
          >
            <option value="all">All Suspects & System Logs</option>
            {activeCase.suspects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chronological Rail */}
      <div className="relative border-l border-[#232b3c] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
        {timelineEvents.map((event) => {
          const isConflict = event.status === 'CONTRADICTED';
          const suspect = activeCase.suspects.find((s) => s.id === event.suspectId);
          const clue = activeCase.clues.find((c) => c.id === event.clueId);

          return (
            <div key={event.id} className="relative group">
              {/* Bullet Node */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                  isConflict
                    ? 'bg-[#881337] border-[#dc2626] ring-4 ring-[#881337]/30'
                    : 'bg-[#151a24] border-[#4b5563]'
                }`}
              />

              {/* Event Card */}
              <div
                className={`p-5 rounded-lg border transition-all ${
                  isConflict
                    ? 'bg-[#181115] border-[#881337] shadow-lg shadow-[#881337]/10'
                    : 'bg-[#10141d] border-[#1e2535] hover:border-[#2b3548]'
                }`}
              >
                {/* Event Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#1b212f]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-[#ede8df] bg-[#161c28] px-2.5 py-0.5 rounded border border-[#252e40] flex items-center gap-1.5">
                      <Clock size={13} className="text-[#a89580]" />
                      {event.displayTime}
                    </span>
                    <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
                      {event.title}
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-semibold self-start sm:self-auto ${
                      isConflict
                        ? 'bg-[#3b1219] text-[#f87171] border border-[#881337]'
                        : 'bg-[#161d28] text-emerald-400'
                    }`}
                  >
                    {isConflict ? 'CONFLICT WITH ALIBI' : 'VERIFIED EVENT'}
                  </span>
                </div>

                {/* Event Description */}
                <p className="mt-3 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {event.description}
                </p>

                {/* Conflict Explanation Note */}
                {event.conflictNote && (
                  <div className="mt-3 p-3 bg-[#240e14] border-l-2 border-[#dc2626] rounded-r text-xs text-[#fca5a5]">
                    <strong className="font-mono uppercase text-[10px] block mb-0.5">
                      Forensic Discrepancy Note:
                    </strong>
                    {event.conflictNote}
                  </div>
                )}

                {/* Event Metadata Ribbon */}
                <div className="mt-4 pt-3 border-t border-[#1b212f] flex flex-wrap items-center justify-between gap-3 text-xs text-[#9ca3af]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px]">
                      <FileText size={12} className="text-[#71717a]" />
                      Source: <strong className="text-[#ede8df]">{event.source}</strong>
                    </span>

                    {suspect && (
                      <button
                        onClick={() => onInterrogateSuspect(suspect.id)}
                        className="flex items-center gap-1 text-[11px] text-[#ede8df] hover:text-white underline underline-offset-2 decoration-[#b91c1c] cursor-pointer"
                        title="Question this suspect"
                      >
                        <User size={12} className="text-[#b91c1c]" />
                        {suspect.name}
                      </button>
                    )}
                  </div>

                  {clue && (
                    <button
                      onClick={() => onInspectClue(clue.id)}
                      className="text-[11px] font-mono text-[#b91c1c] hover:text-[#ef4444] flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <span>Clue: {clue.id}</span>
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
