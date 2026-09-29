import React from "react";
import SectionHeader from "./SectionHeader";
import IssueCard from "./IssueCard";
import FixedCode from "./FixedCode";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { ROAST_LEVELS } from "@/config/app.config";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
  onLoadSample?: () => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
  onLoadSample,
}: RoastReportProps) {
  const currentLevel = ROAST_LEVELS.find((r) => r.id === roastLevel);
  const roastLevelDisplay = currentLevel?.label || roastLevel;

  return (
    <div className="flex flex-col h-full bg-[#FCFAF5] justify-between">
      {/* 40px Header Strip */}
      <div className="h-11 px-4 sm:px-5 bg-cream border-b-2 border-ink flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] font-bold tracking-widest uppercase bg-lavender px-2 py-0.5 rounded border border-ink text-ink">
            AUDIT // REPORT
          </span>
          <span className="font-bold text-ink tracking-wider uppercase">
            ROAST REPORT
          </span>
        </div>

        <span className="text-[10px] sm:text-[11px] font-bold uppercase text-mutedInk bg-white px-2 py-0.5 rounded brutal-border-sm">
          {state === "results"
            ? "Status: Roasted 🔥"
            : state === "loading"
            ? "Status: Analyzing..."
            : state === "error"
            ? "Status: Failed"
            : "Status: Awaiting Code"}
        </span>
      </div>

      {/* Main Panel Content */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState onLoadSample={onLoadSample} />}

        {state === "loading" && <LoadingState />}

        {state === "error" && (
          <ErrorState error={errorMsg} onRetry={onRetry} />
        )}

        {state === "results" && result && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Section 1: Roast & Stamp */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs font-bold text-mutedInk uppercase">
                  STYLE: {roastLevelDisplay}
                </span>
              </SectionHeader>

              {/* Rubber-Stamp Score Badge & Savage Headline */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 bg-white brutal-border brutal-shadow rounded-2xl mb-4">
                <div className="flex-1">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-mutedInk block mb-1">
                    VERDICT // CRITIQUE
                  </span>
                  <blockquote className="text-base sm:text-lg font-black text-ink leading-snug italic">
                    &ldquo;{result.roast}&rdquo;
                  </blockquote>
                </div>

                {/* Physical Rubber Stamp */}
                <div className="rubber-stamp bg-paleYellow text-ink px-4 py-2 rounded-xl text-center shrink-0 self-center sm:self-auto">
                  <div className="text-2xl sm:text-3xl font-black font-mono leading-none">
                    {result.roastScore ?? 78}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-ink mt-0.5">
                    ROAST SCORE
                  </div>
                  <div className="text-[9px] font-bold text-gRed uppercase border-t border-ink/40 pt-0.5 mt-0.5">
                    {result.scoreBadge ?? "ATTENDANCE SHORT, CODE BHI SHORT"}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: What's Wrong (Issues) */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-xs font-bold text-ink bg-white px-2 py-0.5 rounded border border-ink/30">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="p-4 bg-gGreen/10 border border-gGreen/30 rounded-xl text-gGreen font-mono text-xs font-bold">
                  ✓ No issues found. Suspiciously clean code!
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Corrected Code) */}
            {result.correctedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4 (or 3 if no code): Takeaway */}
            {result.takeaway && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-ink/20">
                <SectionHeader
                  number={result.correctedCode ? 4 : 3}
                  title="Takeaway"
                />
                <div className="p-4 bg-white brutal-border brutal-shadow-sm rounded-xl">
                  <p className="font-mono text-xs sm:text-sm text-ink leading-relaxed font-bold">
                    💡 {result.takeaway}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Pane Bottom Strip */}
      <div className="px-4 py-2.5 bg-cream border-t-2 border-ink flex items-center justify-between text-xs font-mono text-mutedInk">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gYellow border border-ink"></span>
          Gemini 2.5 Flash Roaster
        </span>
        <span className="font-bold text-ink">DevFest Nashik Edition</span>
      </div>
    </div>
  );
}
