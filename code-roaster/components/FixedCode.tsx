"use client";

import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export default function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const ext = langConfig?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="mt-6 pt-4 border-t-2 border-dashed border-ink/20">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-[11px] font-black text-gGreen uppercase bg-gGreen/10 px-2 py-0.5 rounded border border-gGreen/30">
          CORRECTED CODE (REDEMPTION ARC)
        </span>
      </SectionHeader>

      <div className="bg-editorBg text-editorInk rounded-xl brutal-border overflow-hidden mb-3">
        {/* Header strip */}
        <div className="px-4 py-2.5 bg-[#202020] border-b border-[#303030] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gGreen"></span>
            <span className="font-bold text-white">solution.{ext}</span>
          </div>
          <span className="text-[11px] text-gGreen font-bold tracking-wider">
            READY TO APPLY ✓
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-4 text-xs sm:text-[13px] font-mono leading-relaxed overflow-x-auto whitespace-pre selection:bg-mustard selection:text-ink">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleCopy}
          className="brutal-btn bg-white hover:bg-cream text-ink brutal-border brutal-shadow-sm rounded-lg px-4 py-2 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="brutal-btn bg-mustard hover:bg-[#e0a430] text-ink brutal-border brutal-shadow-sm rounded-lg px-4 py-2 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <span>APPLY TO EDITOR ↵</span>
        </button>
      </div>
    </div>
  );
}
