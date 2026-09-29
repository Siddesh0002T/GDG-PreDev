import React from "react";
import Image from "next/image";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children?: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="w-full pt-4 sm:pt-6 pb-2 px-3 sm:px-6 max-w-7xl mx-auto sticky top-0 z-40">
      <nav className="bg-white/95 backdrop-blur-md brutal-border brutal-shadow rounded-full min-h-[64px] sm:h-[72px] px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 transition-all">
        {/* Left: GDG Nashik Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-1.5 py-1 px-2.5 bg-cream brutal-border brutal-shadow-sm rounded-lg">
            {/* GDG Logo 4-color brackets */}
            <div className="flex items-center text-sm sm:text-base font-black tracking-tighter">
              <span className="text-gRed select-none">&lt;</span>
              <span className="text-gBlue select-none">/</span>
              <span className="text-gGreen select-none">&gt;</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-gYellow border border-ink"></div>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-tight text-ink leading-tight">
              Google Developer Groups
            </span>
            <span className="text-[10px] font-bold text-mutedInk tracking-wider uppercase">
              Nashik Chapter
            </span>
          </div>
        </div>

        {/* Center: Wordmark Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-cream px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full brutal-border brutal-shadow-sm">
            <span className="font-display font-black text-xs sm:text-sm tracking-tight uppercase flex items-center gap-1.5">
              {APP.name}
              <span className="inline-block px-1.5 py-0.2 bg-mustard text-[10px] font-black rounded brutal-border">
                {APP.version}
              </span>
            </span>
            <span className="ml-1 text-sm select-none">🌶️</span>
          </div>
        </div>

        {/* Right: DevFest Nashik '26 Badge & Optional Slot */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-lavender px-3 py-1.5 rounded-full brutal-border brutal-shadow-sm text-[10px] sm:text-xs font-black uppercase tracking-wider text-ink">
            <span className="w-2 h-2 rounded-full bg-mustard border border-ink"></span>
            <span>DevFest '26</span>
            <span className="hidden sm:inline text-mutedInk">Nashik</span>
          </div>
        </div>
      </nav>

      {/* Render Sub-controls row if children provided */}
      {children && (
        <div className="mt-3 flex items-center justify-end">
          {children}
        </div>
      )}
    </header>
  );
}
