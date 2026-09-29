import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="p-8 sm:p-12 flex-grow flex flex-col items-center justify-center text-center">
      {/* Accent Square with '!' */}
      <div className="w-16 h-16 bg-gRed/10 border-2 border-gRed brutal-shadow-sm rounded-2xl flex items-center justify-center mb-6">
        <span className="font-mono text-3xl font-black text-gRed">!</span>
      </div>

      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gRed mb-2">
        ROAST // INTERRUPTED
      </h3>

      {/* Subhead in Hinglish */}
      <p className="font-mono font-bold text-xs text-ink mb-3">
        Bhau, Gemini ne chai break le li lagta hai. ☕
      </p>

      {/* Error Message */}
      <div className="bg-white border border-gRed/40 rounded-xl p-3.5 max-w-md font-mono text-xs text-ink/80 mb-6 text-left leading-relaxed">
        {error || "An unknown error occurred during code evaluation. Please try again."}
      </div>

      {/* Retry Button */}
      <button
        type="button"
        onClick={onRetry}
        className="brutal-btn bg-mustard text-ink brutal-border brutal-shadow rounded-full px-6 py-2.5 text-xs sm:text-sm font-mono font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
      >
        <span>RETRY ANALYSIS ↵</span>
      </button>
    </div>
  );
}
