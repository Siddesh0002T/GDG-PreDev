import React from "react";
import type { RoastIssue } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyleMap = {
  "FATAL BUG": {
    badgeBg: "bg-gRed/15 text-gRed border-gRed/40",
    borderLeft: "border-gRed",
    icon: "💀",
  },
  "CODE SMELL": {
    badgeBg: "bg-mustard/20 text-ink border-mustard/60",
    borderLeft: "border-mustard",
    icon: "👃",
  },
  OPTIMIZATION: {
    badgeBg: "bg-gGreen/15 text-gGreen border-gGreen/40",
    borderLeft: "border-gGreen",
    icon: "⚡",
  },
};

export default function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const style = severityStyleMap[issue.severity] || severityStyleMap["CODE SMELL"];

  return (
    <div className="bg-white brutal-border brutal-shadow-sm rounded-xl p-3.5 sm:p-4 mb-3 transition-all hover:translate-x-0.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-ink/10">
        <div className="flex items-center gap-2">
          {/* Index Chip */}
          <span className="bg-ink text-white text-[10px] font-mono font-black px-1.5 py-0.5 rounded">
            #{paddedIndex}
          </span>

          {/* Line Pill */}
          <span className="font-mono text-xs font-black text-ink">
            LINE {issue.line}
          </span>

          {/* Severity Badge */}
          <span
            className={`font-mono text-[10px] font-black uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${style.badgeBg}`}
          >
            <span>{style.icon}</span>
            <span>{issue.severity}</span>
          </span>
        </div>

        {/* Issue Title */}
        <span className="text-xs font-bold text-mutedInk text-right flex-grow">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Box */}
      {issue.codeSnippet && (
        <div className={`my-2 pl-3 py-1.5 bg-[#171717] text-editorInk rounded-lg border-l-4 ${style.borderLeft} font-mono text-xs overflow-x-auto`}>
          <code>{issue.codeSnippet}</code>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="space-y-1.5 text-xs font-mono mt-2.5 pt-1">
        <div className="text-gRed leading-relaxed">
          <span className="font-black mr-1 text-sm">✕</span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-ink mr-1">
            Diagnosis:
          </span>
          <span className="text-ink/90">{issue.diagnosis}</span>
        </div>

        <div className="text-gGreen leading-relaxed">
          <span className="font-black mr-1 text-sm">✓</span>
          <span className="font-bold uppercase tracking-wider text-[11px] text-ink mr-1">
            Expected:
          </span>
          <span className="text-ink/90">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
