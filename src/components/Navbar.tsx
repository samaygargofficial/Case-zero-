import React, { useState } from 'react';
import { Menu, X, Pause, Clock } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenVerdict: () => void;
  onOpenPause: () => void;
  remainingSeconds: number;
  levelNumber: number;
  caseCode: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenVerdict,
  onOpenPause,
  remainingSeconds,
  levelNumber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'crimescene', label: 'Crime Scene' },
    { id: 'suspects', label: 'Suspects' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'interrogation', label: 'Interrogate' },
    { id: 'contradictions', label: 'Contradictions' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'theory', label: 'Theory Board' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const mins = Math.floor(Math.max(0, remainingSeconds) / 60);
  const secs = Math.max(0, remainingSeconds) % 60;
  const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isLowTime = remainingSeconds <= 60;

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/95 backdrop-blur border-b border-[#202530]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={onOpenPause}
            className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-[#ede8df] hover:text-white transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer focus:outline-none"
            title="Open Pause & Level Menu"
          >
            CASE ZERO
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 text-xs uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-[#ede8df] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#b91c1c]'
                      : 'text-[#9ca3af] hover:text-[#ede8df]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Countdown Timer, Pause & Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPause}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono-tabular transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isLowTime
                  ? 'bg-[#2a0f15] border-[#dc2626] text-[#fca5a5]'
                  : 'bg-[#131822] border-[#242d3f] text-[#ede8df] hover:border-[#3b4761]'
              }`}
              title={`Level ${levelNumber} Countdown Timer — Click to Pause`}
            >
              <Clock size={13} className={isLowTime ? 'text-[#ef4444]' : 'text-[#a89580]'} />
              <span className="font-semibold">{formattedTime}</span>
              <Pause size={12} className="text-[#9ca3af] ml-0.5" />
            </button>

            <button
              onClick={onOpenVerdict}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#881337] hover:bg-[#9f1239] transition-colors rounded whitespace-nowrap shrink-0 shadow-sm border border-[#9f1239]/50 cursor-pointer"
            >
              File Verdict
            </button>

            {/* Mobile/Tablet menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#9ca3af] hover:text-[#ede8df] focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#202530] bg-[#0d0f14] px-4 pt-3 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider rounded font-medium ${
                  isActive
                    ? 'bg-[#1b202c] text-[#ede8df]'
                    : 'text-[#9ca3af] hover:bg-[#161a23] hover:text-[#ede8df]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
