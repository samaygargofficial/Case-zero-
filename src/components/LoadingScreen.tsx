import React from 'react';
import { ShieldAlert, Search } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0c10] text-[#ede8df] p-6">
      <div className="relative flex flex-col items-center space-y-6 max-w-sm text-center">
        {/* Animated Scanner Ring */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#222938]" />
          <div className="absolute inset-0 rounded-full border-t-2 border-[#b91c1c] animate-spin" />
          <div className="w-12 h-12 rounded-full bg-[#11141c] border border-[#2b3548] flex items-center justify-center">
            <Search size={20} className="text-[#ede8df] animate-pulse" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-cinzel text-xl font-bold tracking-widest text-[#ede8df]">
            CASE ZERO
          </h2>
          <p className="font-cinzel text-xs tracking-[0.2em] text-[#a89580] uppercase">
            The AI Mystery Lab
          </p>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-[#b91c1c] to-transparent my-3" />
          <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider animate-pulse">
            Accessing Forensic Repository...
          </p>
        </div>
      </div>
    </div>
  );
};
