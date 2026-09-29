"use client";

import React, { useRef, useState, useEffect } from "react";
import { LANGUAGES, LIMITS } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  // Sync scroll from textarea to line gutter
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Track cursor position
  const handleSelect = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = code.slice(0, pos);
    const lineNum = textBefore.split("\n").length;
    const lastNewline = textBefore.lastIndexOf("\n");
    const colNum = lastNewline === -1 ? pos + 1 : pos - lastNewline;
    setCursor({ line: lineNum, col: colNum });
  };

  // Handle Tab key (insert 4 spaces without blurring)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const updated = code.substring(0, start) + "    " + code.substring(end);
      onChange(updated);

      setTimeout(() => {
        if (textarea) {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const currentLang = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div className="flex flex-col h-full bg-editorBg text-editorInk font-mono select-none">
      {/* 40px Header Strip */}
      <div className="h-11 px-4 sm:px-5 bg-[#202020] border-b border-[#303030] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold tracking-widest uppercase text-mustard bg-mustard/15 px-2 py-0.5 rounded border border-mustard/30">
            INPUT // SRC
          </span>
          <span className="font-bold text-[#E5E0D5] tracking-wider uppercase">
            YOUR CODE
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <button
            type="button"
            onClick={onLoadSample}
            className="hover:text-mustard text-white font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <span>⚡</span> SAMPLE BUG
          </button>
          <span className="text-[#444]">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="hover:text-gRed text-mutedInk transition cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Main Canvas (Gutter + Textarea) */}
      <div className="relative flex flex-grow min-h-[360px] sm:min-h-[440px] overflow-hidden">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 sm:w-14 bg-[#1a1a1a] border-r border-[#2e2e2e] text-right py-4 pr-3 text-xs text-[#55524B] select-none overflow-hidden font-mono leading-relaxed"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`transition-colors ${
                  isError
                    ? "text-gRed font-black bg-gRed/20 -mr-3 pr-3"
                    : "text-[#55524B]"
                }`}
              >
                {String(lineNum).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea Code Input */}
        <div className="relative flex-grow h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            onSelect={handleSelect}
            onKeyDown={handleKeyDown}
            maxLength={LIMITS.maxCodeLength}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            placeholder={`// Paste your ${currentLang.label} code here...\n// Or click "⚡ SAMPLE BUG" above for a quick demo.`}
            className="w-full h-full p-4 bg-transparent text-editorInk placeholder:text-[#555] font-mono text-xs sm:text-[13px] leading-relaxed resize-none focus:outline-none whitespace-pre overflow-auto"
          />

          {/* Visual highlight bar overlay if errorLine is detected */}
          {errorLine && errorLine <= lines.length && (
            <div
              className="pointer-events-none absolute left-0 right-0 h-[22px] bg-gRed/15 border-l-2 border-gRed -z-10"
              style={{
                top: `${(errorLine - 1) * 22 + 16}px`,
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="px-4 py-2 bg-[#1B1B1B] border-t border-[#303030] flex flex-wrap items-center justify-between text-[11px] text-[#9E9A90] font-mono">
        <div className="flex items-center gap-3">
          <span>
            Ln {cursor.line}, Col {cursor.col}
          </span>
          <span className="text-[#444]">•</span>
          <span className="text-white font-bold">{currentLang.label}</span>
          <span className="hidden sm:inline text-mutedInk">· Tab Size: 4</span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={
              code.length >= LIMITS.maxCodeLength * 0.9
                ? "text-gRed font-bold"
                : "text-mutedInk"
            }
          >
            {code.length.toLocaleString()} / {LIMITS.maxCodeLength.toLocaleString()} chars
          </span>
          <span className="w-2 h-2 rounded-full bg-gGreen inline-block"></span>
        </div>
      </div>
    </div>
  );
}
