"use client";

import React, { useState, useCallback, useEffect } from "react";
import TopBar from "./TopBar";
import RoastControls from "./RoastControls";
import ErrorMessageInput from "./ErrorMessageInput";
import CodeEditor from "./CodeEditor";
import RoastReport from "./RoastReport";
import StatusBar from "./StatusBar";
import RangoliStrip from "./RangoliStrip";
import { APP, DEFAULTS, SAMPLE } from "@/config/app.config";
import { requestRoast } from "@/lib/api";
import type {
  LanguageId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";

export default function Workspace() {
  // State
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [persona, setPersona] = useState<string>(DEFAULTS.persona);
  const [code, setCode] = useState<string>(SAMPLE.code);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  // Error line highlight: only active when editor matches roastedCode exactly
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  // Handle Roast Action
  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");
    setRoastResult(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
        persona,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
      setReportState("error");
    }
  }, [code, language, roastLevel, errorMessage, persona, isRoasting]);

  // Load sample bug
  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  // Apply fixed code
  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Ctrl/Cmd + Enter global shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleRoast]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* 1. Floating Pill TopBar */}
      <TopBar />

      {/* 2. Hero Section */}
      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 pt-6 pb-12 w-full">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paleYellow brutal-border brutal-shadow-sm text-xs sm:text-sm font-mono font-bold tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-gRed animate-pulse"></span>
            <span>{APP.eyebrow}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-ink leading-tight sm:leading-none mb-3">
            {APP.name}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg font-bold text-ink/90 tracking-tight max-w-xl mx-auto mb-2.5">
            {APP.subtitle}
          </p>

          {/* Microcopy badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-mutedInk bg-white px-3 py-1 rounded-full border border-ink/40">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gBlue"></span>
            <span>Desi debugging, powered by Google Gemini</span>
            <span className="text-ink font-bold">· Nashik DevFest Special</span>
          </div>
        </div>

        {/* 3. Main Tool Card (Split-Pane Workstation) */}
        <div className="bg-white brutal-border-3 brutal-shadow rounded-[24px] overflow-hidden flex flex-col transition-all">
          {/* Control Bar across top */}
          <RoastControls
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            language={language}
            onLanguageChange={setLanguage}
            persona={persona}
            onPersonaChange={setPersona}
            onRoast={handleRoast}
            isRoasting={isRoasting}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
          />

          {/* Error Message Collapsible Drawer */}
          {errorDrawerOpen && (
            <ErrorMessageInput
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Panes: Left Editor (col-span-6) / Right Report (col-span-6) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Pane: Code Editor */}
            <div className="lg:col-span-6 border-b-2 lg:border-b-0 lg:border-r-2 border-ink">
              <CodeEditor
                code={code}
                onChange={setCode}
                language={language}
                errorLine={errorLine}
                onLoadSample={handleLoadSample}
              />
            </div>

            {/* Right Pane: Roast Report */}
            <div className="lg:col-span-6">
              <RoastReport
                state={reportState}
                roastLevel={roastLevel}
                language={language}
                result={roastResult}
                errorMsg={apiError}
                onRetry={handleRoast}
                onApplyFix={handleApplyFix}
                onLoadSample={handleLoadSample}
              />
            </div>
          </div>
        </div>

        {/* 4. Live Feature Cards Teaser */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl brutal-border brutal-shadow flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gRed/20 text-gRed brutal-border flex items-center justify-center font-mono font-bold text-sm shrink-0">
              !
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gRed">
                SAVAGE ACCURACY
              </span>
              <h4 className="font-extrabold text-sm text-ink">Zero Generic AI Fluff</h4>
              <p className="text-xs text-mutedInk mt-0.5">
                Strictly roasts the logic defects, syntax sins, and architectural panic.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl brutal-border brutal-shadow flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-mustard/30 text-ink brutal-border flex items-center justify-center font-mono font-bold text-sm shrink-0">
              ★
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-mustard">
                STAMPED AUDIT
              </span>
              <h4 className="font-extrabold text-sm text-ink">Score Stamp Certificate</h4>
              <p className="text-xs text-mutedInk mt-0.5">
                Physical ink rubber-stamp rating ready for quick WhatsApp & LinkedIn sharing.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl brutal-border brutal-shadow flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gGreen/20 text-gGreen brutal-border flex items-center justify-center font-mono font-bold text-sm shrink-0">
              ✓
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-gGreen">
                REDEMPTION ARC
              </span>
              <h4 className="font-extrabold text-sm text-ink">Actionable Usable Fix</h4>
              <p className="text-xs text-mutedInk mt-0.5">
                After getting roasted, copy or apply the clean production-ready code with 1 click.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 5. Rangoli Decorative Border Strip */}
      <RangoliStrip />

      {/* 6. Status Footer */}
      <StatusBar isRoasting={isRoasting} />
    </div>
  );
}
