import React, { useState, useRef, useEffect } from 'react';
import { CaseDefinition, ChatMessage } from '../types/case';
import { SuspectPortrait } from './SuspectPortrait';
import { Send, RefreshCw, HelpCircle } from 'lucide-react';
import { getDeterministicInterrogationAnswer } from '../data/allCases';

interface InterrogationRoomProps {
  activeCase: CaseDefinition;
  activeSuspectId: string;
  onSelectSuspect: (suspectId: string) => void;
  chatHistory: Record<string, ChatMessage[]>;
  onSendMessage: (
    suspectId: string,
    text: string,
    reply: string,
    isFallback: boolean
  ) => void;
  onClearHistory: (suspectId: string) => void;
}

export const InterrogationRoom: React.FC<InterrogationRoomProps> = ({
  activeCase,
  activeSuspectId,
  onSelectSuspect,
  chatHistory,
  onSendMessage,
  onClearHistory,
}) => {
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentSuspect =
    activeCase.suspects.find((s) => s.id === activeSuspectId) ||
    activeCase.suspects[0];
  const messages = chatHistory[currentSuspect.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleAsk = async (questionText: string) => {
    const q = questionText.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setInputQuestion('');

    try {
      const response = await fetch('/api/interrogate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId: activeCase.id,
          suspectId: currentSuspect.id,
          question: q,
          history: messages
            .slice(-6)
            .map((m) => ({ sender: m.sender, text: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      onSendMessage(
        currentSuspect.id,
        q,
        data.response,
        data.isFallback || false
      );
    } catch {
      const fallback = getDeterministicInterrogationAnswer(
        activeCase.id,
        currentSuspect.id,
        q
      );
      onSendMessage(currentSuspect.id, q, fallback, true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#202530] pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#a89580]">
            Level {activeCase.levelNumber} · {activeCase.code} · Cross-Examination
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#ede8df] mt-1">
            Interrogation Chambers
          </h2>
        </div>
        <p className="text-xs text-[#9ca3af] max-w-md">
          Select predefined investigative questions or type custom questions in natural language.
        </p>
      </div>

      {/* Suspect Selector Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {activeCase.suspects.map((suspect) => {
          const isSelected = suspect.id === currentSuspect.id;
          const msgCount = Math.floor((chatHistory[suspect.id] || []).length / 2);

          return (
            <button
              key={suspect.id}
              onClick={() => onSelectSuspect(suspect.id)}
              className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'bg-[#1b212f] border-[#881337] ring-1 ring-[#b91c1c]/50'
                  : 'bg-[#11141c] border-[#1e2535] hover:bg-[#151924] hover:border-[#2b3548]'
              }`}
            >
              <SuspectPortrait theme={suspect.portraitTheme} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#ede8df] truncate">
                  {suspect.name}
                </p>
                <p className="text-[10px] text-[#9ca3af] truncate">
                  {suspect.role}
                </p>
                {msgCount > 0 && (
                  <span className="text-[9px] font-mono text-[#b91c1c] block mt-0.5">
                    {msgCount} Question{msgCount > 1 ? 's' : ''} Asked
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interrogation Chamber */}
      <div className="bg-[#0f131b] border border-[#202738] rounded-lg shadow-xl overflow-hidden flex flex-col h-[580px]">
        {/* Header */}
        <div className="p-4 bg-[#141924] border-b border-[#202738] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <SuspectPortrait theme={currentSuspect.portraitTheme} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base font-bold text-[#ede8df]">
                  {currentSuspect.name}
                </h3>
                <span className="text-[10px] font-mono text-[#a89580]">
                  · {currentSuspect.role}
                </span>
              </div>
              <p className="text-xs text-[#9ca3af] mt-0.5 line-clamp-1">
                Alibi: {currentSuspect.initialAlibi}
              </p>
            </div>
          </div>

          <button
            onClick={() => onClearHistory(currentSuspect.id)}
            className="px-2.5 py-1 text-[11px] text-[#9ca3af] hover:text-[#ede8df] bg-[#121620] border border-[#232c3d] rounded hover:bg-[#1a2130] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={11} />
            <span>Clear Transcript</span>
          </button>
        </div>

        {/* Transcript */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Initial Sworn Statement */}
          <div className="flex items-start gap-3">
            <SuspectPortrait
              theme={currentSuspect.portraitTheme}
              size="sm"
              className="mt-1"
            />
            <div className="max-w-[85%] bg-[#151a24] border border-[#232a39] p-3.5 rounded-lg text-xs leading-relaxed text-[#ede8df]">
              <span className="text-[10px] font-mono text-[#a89580] block mb-1 uppercase tracking-wider">
                {currentSuspect.name} · Opening Statement
              </span>
              <p className="font-serif italic">“{currentSuspect.publicStatement}”</p>
            </div>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'player' ? 'flex-row-reverse' : ''
              }`}
            >
              {msg.sender === 'suspect' ? (
                <SuspectPortrait
                  theme={currentSuspect.portraitTheme}
                  size="sm"
                  className="mt-1"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-[#881337] border border-[#b91c1c] text-white flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-1">
                  YOU
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-lg text-xs leading-relaxed ${
                  msg.sender === 'player'
                    ? 'bg-[#1b2230] border border-[#2e3a50] text-[#f8fafc]'
                    : 'bg-[#151a24] border border-[#232a39] text-[#ede8df]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9ca3af]">
                    {msg.sender === 'player'
                      ? 'Investigator'
                      : currentSuspect.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#64748b]">
                    {msg.timestamp}
                  </span>
                </div>
                <p className={msg.sender === 'suspect' ? 'font-serif italic' : ''}>
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <SuspectPortrait
                theme={currentSuspect.portraitTheme}
                size="sm"
                className="mt-1 opacity-70 animate-pulse"
              />
              <div className="bg-[#151a24] border border-[#232a39] p-3 rounded-lg text-xs text-[#9ca3af]">
                <span className="animate-pulse">
                  {currentSuspect.name} is responding...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Predefined Case-Specific Questions */}
        <div className="px-4 py-2.5 bg-[#121620] border-t border-[#1d2433] space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#a89580] flex items-center gap-1">
            <HelpCircle size={12} className="text-[#b91c1c]" /> Case-Specific Interrogation Leads (Click to Ask):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {currentSuspect.interrogationQA.map((qa, i) => (
              <button
                key={i}
                onClick={() => handleAsk(qa.question)}
                disabled={isLoading}
                className="px-2.5 py-1 bg-[#181f2c] hover:bg-[#222c3f] text-[#cbd5e1] hover:text-white rounded border border-[#252f42] text-[11px] transition-colors cursor-pointer disabled:opacity-50 text-left"
              >
                “{qa.question}”
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div className="p-4 bg-[#141924] border-t border-[#202738]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(inputQuestion);
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              disabled={isLoading}
              placeholder={`Ask ${currentSuspect.name} any custom question...`}
              className="flex-1 bg-[#0f131c] border border-[#242d3d] rounded px-3.5 py-2.5 text-xs text-[#ede8df] placeholder-[#4b5563] focus:outline-none focus:border-[#b91c1c] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuestion.trim()}
              className="px-5 py-2.5 bg-[#881337] hover:bg-[#9f1239] disabled:opacity-50 text-white rounded font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Send size={13} />
              <span>Inquire</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
