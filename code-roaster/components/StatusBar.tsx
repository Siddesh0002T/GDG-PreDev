import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="w-full bg-cream border-t-2 border-ink py-2.5 px-4 sm:px-6 font-mono text-[11px] text-mutedInk select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-[#d97706] font-bold flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#d97706] inline-block"></span>
              PROCESSING...
            </span>
          ) : (
            <span className="text-gGreen font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gGreen inline-block"></span>
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[#777]">| ENGINE: GOOGLE GEMINI</span>
        </div>

        {/* Right Tag */}
        <div className="font-bold text-ink uppercase tracking-wider">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Mandatory exact workshop attribution line */}
      <div className="text-center text-[10px] text-mutedInk/80 mt-1.5 pt-1 border-t border-ink/10">
        {APP.attribution}
      </div>
    </footer>
  );
}
