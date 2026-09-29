import React from "react";

interface EmptyStateProps {
  onLoadSample?: () => void;
}

export default function EmptyState({ onLoadSample }: EmptyStateProps) {
  return (
    <div className="p-8 sm:p-12 flex-grow flex flex-col items-center justify-center text-center">
      {/* Warli Tilted Diamond Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-paleYellow brutal-border brutal-shadow rounded-2xl rotate-12 flex items-center justify-center transform transition-transform hover:rotate-6">
          <div className="w-10 h-10 bg-mustard brutal-border -rotate-12 flex items-center justify-center">
            <span className="font-mono text-xl font-black text-ink">?_?</span>
          </div>
        </div>
        {/* Decorative sparks */}
        <span className="absolute -top-2 -right-3 text-gRed font-black text-xl animate-bounce">
          ✦
        </span>
        <span className="absolute -bottom-1 -left-3 text-gBlue font-black text-lg">
          ✦
        </span>
      </div>

      {/* Main Heading */}
      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-ink mb-2">
        Your code is suspiciously quiet.
      </h3>

      {/* Body Copy */}
      <p className="text-mutedInk font-medium text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
        Paste some code on the left, pick your roast spice level, and press{" "}
        <kbd className="px-1.5 py-0.5 bg-white brutal-border rounded font-mono font-bold text-ink">
          Ctrl + Enter
        </kbd>{" "}
        or click &quot;Roast Me&quot; to see why the compiler is sweating.
      </p>

      {/* Action Button */}
      {onLoadSample && (
        <button
          type="button"
          onClick={onLoadSample}
          className="brutal-btn bg-white hover:bg-cream text-ink brutal-border brutal-shadow rounded-full px-5 py-2.5 text-xs sm:text-sm font-mono font-extrabold uppercase tracking-wide flex items-center gap-2 cursor-pointer"
        >
          <span>[ TRY SAMPLE BUG → ]</span>
        </button>
      )}

      {/* Local Marathi/Nashik flavor note */}
      <div className="mt-8 pt-6 border-t border-dashed border-ink/20 w-full max-w-xs flex flex-col items-center gap-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-mutedInk">
          Nashik Special Notice:
        </span>
        <span className="text-xs font-bold text-ink italic">
          &quot;Nashik chi misal spicy ahe, pan ha roast azun zanzanit asel!&quot; 🔥
        </span>
      </div>
    </div>
  );
}
