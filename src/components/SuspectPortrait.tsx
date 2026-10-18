import React from 'react';

interface SuspectPortraitProps {
  theme: 'curator' | 'restorer' | 'heir' | 'security' | 'painting';
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const SuspectPortrait: React.FC<SuspectPortraitProps> = ({
  theme,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  }[size];

  if (theme === 'painting') {
    return (
      <div
        className={`relative overflow-hidden rounded border border-[#3a2e22] bg-[#12100d] shadow-2xl flex items-center justify-center ${className}`}
      >
        {/* Artistic Canvas Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1510] via-[#0d141c] to-[#0a0c10] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#382a1b]/40 via-transparent to-black" />
        
        {/* Venetian Canal & Bridge Silhouette */}
        <svg
          viewBox="0 0 200 150"
          className="relative z-10 w-full h-full text-[#9c8973]/70 drop-shadow"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Moon & Glow */}
          <circle cx="150" cy="40" r="14" fill="#ede8df" fillOpacity="0.85" stroke="none" />
          <circle cx="150" cy="40" r="22" fill="#ede8df" fillOpacity="0.1" stroke="none" />

          {/* Distant Venetian Palace Facade */}
          <path
            d="M20 70 L20 110 L80 110 L80 65 L60 65 L60 55 L50 55 L50 65 L20 70 Z"
            fill="#141820"
            fillOpacity="0.8"
            stroke="#45382b"
          />
          {/* Venetian Arched Windows */}
          <path d="M30 80 Q35 72 40 80 V95 H30 Z" fill="#2d2216" />
          <path d="M48 80 Q53 72 58 80 V95 H48 Z" fill="#2d2216" />

          {/* Arched Stone Bridge */}
          <path
            d="M70 120 Q120 75 180 120 L180 135 Q120 95 70 135 Z"
            fill="#1e1913"
            stroke="#5c4a38"
          />
          {/* Bridge Balustrade */}
          <path d="M75 105 L175 105" stroke="#7a634c" strokeWidth="1" strokeDasharray="3 3" />

          {/* Canal Water & Moonlight Reflections */}
          <path
            d="M0 125 Q50 120 100 126 T200 123"
            stroke="#5b6d80"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <path
            d="M30 135 Q80 132 140 137 T200 134"
            stroke="#75889e"
            strokeWidth="1.2"
            strokeOpacity="0.4"
          />
          <path
            d="M130 130 L160 130 M120 140 L170 140"
            stroke="#ede8df"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Moored Gondola Silhouette */}
          <path
            d="M110 125 Q135 132 165 125 Q168 118 165 116 Q135 120 112 118 Z"
            fill="#090b0e"
            stroke="#2e3540"
          />
          <line x1="165" y1="116" x2="168" y2="108" stroke="#3e4756" strokeWidth="1.5" />
        </svg>

        {/* Vintage Museum Stencil Badge */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none text-[9px] font-mono uppercase tracking-widest text-[#a89580] bg-black/70 px-2 py-0.5 rounded border border-[#3d3326]">
          <span>GMM-CAT #1894-04</span>
          <span className="text-[#dc2626]">MISSING</span>
        </div>
      </div>
    );
  }

  // Suspect Icons & Silhouettes
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-[#232936] bg-[#12161f] shadow-md flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}
      title={name || theme}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-[#141a24] to-[#1c2433]" />

      {theme === 'curator' && (
        <svg viewBox="0 0 100 100" className="relative z-10 w-4/5 h-4/5 text-[#d4af37]" fill="currentColor">
          {/* Head & Silver Hair */}
          <circle cx="50" cy="32" r="16" fill="#3a4454" />
          <path d="M34 32 C34 18 66 18 66 32 C66 22 55 20 50 20 C45 20 34 22 34 32 Z" fill="#9ca3af" />
          {/* Wire-Rimmed Spectacles */}
          <circle cx="43" cy="33" r="5" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
          <circle cx="57" cy="33" r="5" fill="none" stroke="#e5e7eb" strokeWidth="1.5" />
          <line x1="48" y1="33" x2="52" y2="33" stroke="#e5e7eb" strokeWidth="1.5" />
          {/* Tweed Vest and Collar */}
          <path d="M22 88 C22 62 38 52 50 52 C62 52 78 62 78 88 Z" fill="#2d3748" />
          <path d="M42 53 L50 68 L58 53 Z" fill="#e2e8f0" />
          <path d="M47 62 L50 78 L53 62 Z" fill="#991b1b" /> {/* Crimson Silk Tie */}
          <path d="M36 60 L44 88 M64 60 L56 88" stroke="#1a202c" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      )}

      {theme === 'restorer' && (
        <svg viewBox="0 0 100 100" className="relative z-10 w-4/5 h-4/5 text-[#38bdf8]" fill="currentColor">
          {/* Head & Pinned Back Hair */}
          <circle cx="50" cy="34" r="15" fill="#3b4252" />
          <path d="M33 34 C33 16 67 16 67 34 C67 22 60 20 50 20 C40 20 33 22 33 34 Z" fill="#1f2937" />
          <circle cx="50" cy="18" r="4" fill="#1f2937" /> {/* Hair Bun */}
          {/* Lab Coat & Magnifier */}
          <path d="M24 88 C24 64 36 54 50 54 C64 54 76 64 76 88 Z" fill="#e2e8f0" />
          <path d="M42 54 L50 74 L58 54 Z" fill="#0f172a" />
          {/* Surgical Tweezers / Scalpel Motif */}
          <line x1="68" y1="65" x2="80" y2="52" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="52" r="3" fill="#38bdf8" />
        </svg>
      )}

      {theme === 'heir' && (
        <svg viewBox="0 0 100 100" className="relative z-10 w-4/5 h-4/5 text-[#f59e0b]" fill="currentColor">
          {/* Head & Styled Modern Hair */}
          <circle cx="50" cy="33" r="16" fill="#475569" />
          <path d="M34 28 C36 16 64 16 68 28 C64 20 54 18 50 18 C44 18 36 22 34 28 Z" fill="#0f172a" />
          {/* Velvet Gala Tuxedo with unfastened collar */}
          <path d="M22 88 C22 62 36 52 50 52 C64 52 78 62 78 88 Z" fill="#0f172a" />
          <path d="M40 53 L50 72 L60 53 Z" fill="#f8fafc" />
          {/* Loosened Black Bowtie */}
          <path d="M46 56 L54 60 M54 56 L46 60" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {theme === 'security' && (
        <svg viewBox="0 0 100 100" className="relative z-10 w-4/5 h-4/5 text-[#ef4444]" fill="currentColor">
          {/* Head & Guard Cap / Hair */}
          <circle cx="50" cy="34" r="15" fill="#334155" />
          <path d="M32 30 C34 18 66 18 68 30 Z" fill="#090d16" />
          {/* Earpiece wire */}
          <path d="M64 34 Q68 40 64 48 L60 56" fill="none" stroke="#94a3b8" strokeWidth="1" />
          {/* Uniform Blazer & Silver Security Badge */}
          <path d="M24 88 C24 64 36 54 50 54 C64 54 76 64 76 88 Z" fill="#0d131f" />
          <path d="M44 54 L50 66 L56 54 Z" fill="#cbd5e1" />
          {/* Security Badge Shield */}
          <path d="M34 68 L38 65 L42 68 L40 76 L38 78 L36 76 Z" fill="#94a3b8" stroke="#f1f5f9" strokeWidth="0.5" />
        </svg>
      )}

      {/* Subtle Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
    </div>
  );
};
