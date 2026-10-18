import React, { useState } from 'react';
import { CaseDefinition, Clue } from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import {
  Search,
  MapPin,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Compass,
  Sparkles,
  Eye,
} from 'lucide-react';

interface CrimeSceneViewProps {
  activeCase: CaseDefinition;
  discoveredClueIds: string[];
  hintsUsed: number;
  onDiscoverClue: (clueId: string) => void;
  onDiscoverAllClues: () => void;
  onUseHint: () => void;
  onNavigateTab: (tab: string) => void;
}

export const CrimeSceneView: React.FC<CrimeSceneViewProps> = ({
  activeCase,
  discoveredClueIds,
  hintsUsed,
  onDiscoverClue,
  onDiscoverAllClues,
  onUseHint,
  onNavigateTab,
}) => {
  const [selectedHotspotClue, setSelectedHotspotClue] = useState<Clue | null>(
    activeCase.clues[0] || null
  );

  const handleHotspotClick = (clue: Clue) => {
    onDiscoverClue(clue.id);
    setSelectedHotspotClue(clue);
  };

  const discoveredCount = activeCase.clues.filter((c) =>
    discoveredClueIds.includes(c.id)
  ).length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Case Level Header & Briefing */}
      <div className="bg-[#10141d] border border-[#202738] rounded-lg p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Target Visual */}
          <div className="w-full lg:w-64 shrink-0 space-y-3">
            <div className="w-full h-44">
              <SuspectPortrait theme="painting" className="w-full h-full" />
            </div>
            <div className="p-3 bg-[#141925] border border-[#222a3a] rounded text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89580] block">
                Target Exhibit / Asset
              </span>
              <p className="font-serif font-semibold text-[#ede8df]">
                {activeCase.victimItem.title}
              </p>
              <p className="text-[#9ca3af] text-[11px]">
                {activeCase.victimItem.artistOrOwner} ({activeCase.victimItem.yearOrCode})
              </p>
              <p className="font-mono text-[11px] text-[#b91c1c] font-semibold">
                {activeCase.victimItem.estimatedValue}
              </p>
            </div>
          </div>

          {/* Case Briefing Text */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1d2434] pb-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b91c1c] font-bold">
                  LEVEL {activeCase.levelNumber} · {activeCase.code} · {activeCase.difficulty}
                </span>
                <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-0.5">
                  {activeCase.title}
                </h1>
              </div>
              <div className="text-left sm:text-right text-xs font-mono text-[#a89580]">
                <p>{activeCase.location}</p>
                <p className="text-[#9ca3af]">{activeCase.timeframe}</p>
              </div>
            </div>

            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {activeCase.premise}
            </p>

            <div className="p-3.5 bg-[#131824] border border-[#222b3d] rounded text-xs text-[#9ca3af] leading-relaxed">
              <strong className="text-[#ede8df] uppercase tracking-wider font-mono text-[11px] block mb-1">
                Crime Scene Recon:
              </strong>
              {activeCase.crimeSceneDescription}
            </div>

            {/* Quick Navigation Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('suspects')}
                className="px-4 py-2 bg-[#182030] hover:bg-[#222d42] text-[#ede8df] border border-[#2d3a54] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Examine 4 Suspects</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => onNavigateTab('interrogation')}
                className="px-4 py-2 bg-[#182030] hover:bg-[#222d42] text-[#ede8df] border border-[#2d3a54] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Interrogate Suspects</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => onNavigateTab('contradictions')}
                className="px-4 py-2 bg-[#881337] hover:bg-[#9f1239] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Contradiction Detector</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tactical Crime Scene Map & Hotspot Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Architectural Crime Scene Blueprint */}
        <div className="lg:col-span-2 bg-[#0e121a] border border-[#222a3a] rounded-lg p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1c2331] pb-3">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-[#ede8df] flex items-center gap-2">
                <Compass size={18} className="text-[#b91c1c]" />
                Interactive Crime Scene Tactical Blueprint
              </h2>
              <p className="text-xs text-[#9ca3af]">
                Click the pulsing forensic markers on the floorplan to scan and log physical evidence.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tabular text-[#a89580]">
                Clues Scanned: <strong className="text-[#ede8df]">{discoveredCount}/{activeCase.clues.length}</strong>
              </span>
              {discoveredCount < activeCase.clues.length && (
                <button
                  onClick={onDiscoverAllClues}
                  className="px-3 py-1 bg-[#182030] hover:bg-[#232f46] text-[#ede8df] border border-[#2e3c56] rounded text-[11px] font-mono uppercase cursor-pointer flex items-center gap-1"
                >
                  <Eye size={12} /> Scan All
                </button>
              )}
            </div>
          </div>

          {/* Interactive Floorplan Canvas */}
          <div className="relative w-full h-80 sm:h-96 bg-[#090c12] border border-[#1f293a] rounded overflow-hidden select-none">
            {/* Blueprint Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#161e2e_1px,transparent_1px),linear-gradient(to_bottom,#161e2e_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

            {/* 4 Architectural Quadrant Rooms */}
            <div className="absolute inset-4 grid grid-cols-2 grid-rows-2 gap-3 pointer-events-none">
              {activeCase.crimeSceneZoneNames.map((zoneName, idx) => (
                <div
                  key={idx}
                  className="border border-[#263248]/80 bg-[#0d131f]/40 rounded p-3 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#64748b]">
                    SECTOR 0{idx + 1} · {zoneName}
                  </span>
                  <div className="w-8 h-8 border-b border-l border-[#2a364f]/50" />
                </div>
              ))}
            </div>

            {/* Clickable Clue Hotspots */}
            {activeCase.clues.map((clue, idx) => {
              const x = clue.hotspotX ?? 18 + ((idx * 19) % 68);
              const y = clue.hotspotY ?? 22 + ((idx * 23) % 60);
              const isDiscovered = discoveredClueIds.includes(clue.id);
              const isSelected = selectedHotspotClue?.id === clue.id;

              return (
                <button
                  key={clue.id}
                  onClick={() => handleHotspotClick(clue)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer focus:outline-none transition-transform hover:scale-110`}
                  title={`${clue.id}: ${clue.title}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-colors ${
                      isSelected
                        ? 'bg-[#b91c1c] border-white text-white scale-110'
                        : isDiscovered
                        ? 'bg-[#14261d] border-emerald-400 text-emerald-300'
                        : 'bg-[#2a1015] border-[#ef4444] text-[#fca5a5] animate-pulse'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Hotspot Readout & Hint Station */}
        <div className="space-y-6">
          {/* Forensic Scanner Readout */}
          <div className="bg-[#10141d] border border-[#202738] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c2331] pb-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-[#a89580] flex items-center gap-1.5">
                <Search size={14} className="text-[#b91c1c]" />
                Forensic Field Scanner
              </span>
              {selectedHotspotClue && (
                <span className="font-mono text-xs font-bold text-[#b91c1c]">
                  {selectedHotspotClue.id}
                </span>
              )}
            </div>

            {selectedHotspotClue ? (
              <div className="space-y-3 text-xs">
                <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
                  {selectedHotspotClue.title}
                </h3>
                <p className="text-[11px] font-mono text-[#a89580] flex items-center gap-1">
                  <MapPin size={12} /> {selectedHotspotClue.discoveryLocation}
                  {selectedHotspotClue.relevantTimestamp &&
                    ` · ${selectedHotspotClue.relevantTimestamp}`}
                </p>
                <p className="text-[#cbd5e1] leading-relaxed bg-[#141925] p-3 rounded border border-[#1f2738]">
                  {selectedHotspotClue.description}
                </p>
                <div className="p-3 bg-[#1d1317] border border-[#881337]/50 rounded">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#f87171] font-bold block mb-1">
                    Forensic Deduction:
                  </span>
                  <p className="text-[#ede8df] leading-relaxed">
                    {selectedHotspotClue.establishes}
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('evidence')}
                  className="w-full py-2 bg-[#182030] hover:bg-[#222d42] text-[#ede8df] rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Open Full Evidence Vault</span>
                </button>
              </div>
            ) : (
              <p className="text-xs text-[#9ca3af] italic">
                Select any numbered marker on the crime scene blueprint to inspect the physical evidence.
              </p>
            )}
          </div>

          {/* Investigative Hints Panel */}
          <div className="bg-[#10141d] border border-[#202738] rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1c2331] pb-2.5">
              <h3 className="font-cinzel text-sm font-bold text-[#ede8df] flex items-center gap-2">
                <Lightbulb size={15} className="text-amber-400" />
                Detective Bureau Hints ({hintsUsed}/{activeCase.hints.length})
              </h3>
              <span className="text-[10px] font-mono text-[#9ca3af]">
                -5 pts per hint
              </span>
            </div>

            {hintsUsed === 0 ? (
              <p className="text-xs text-[#9ca3af] leading-relaxed">
                Stuck on an alibi or lock mechanism? Request a progressive forensic lead. Solving with zero hints awards the Pure Deduction bonus.
              </p>
            ) : (
              <div className="space-y-2">
                {activeCase.hints.slice(0, hintsUsed).map((hintText, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#191712] border border-amber-500/40 rounded text-xs text-amber-100 leading-relaxed"
                  >
                    <strong className="font-mono text-[10px] uppercase text-amber-400 block mb-0.5">
                      Lead #{i + 1}:
                    </strong>
                    {hintText}
                  </div>
                ))}
              </div>
            )}

            {hintsUsed < activeCase.hints.length && (
              <button
                onClick={onUseHint}
                className="w-full py-2 bg-[#1f1a12] hover:bg-[#2b2418] text-amber-300 border border-amber-600/50 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Reveal Hint #{hintsUsed + 1} (-5 pts)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
