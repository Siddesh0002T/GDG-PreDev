import React from "react";
import { LANGUAGES, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  persona?: string;
  onPersonaChange?: (persona: string) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  persona = "standup",
  onPersonaChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="w-full bg-cream border-b-2 border-ink p-3.5 sm:p-5 flex flex-wrap items-center justify-between gap-4">
      {/* Controls Group */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono font-bold">
        {/* 1. Roast Level Segmented Control */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-mutedInk">
            ROAST LEVEL
          </span>
          <div className="inline-flex bg-white brutal-border rounded-full p-1 shadow-sm">
            {ROAST_LEVELS.map((level) => {
              const isSelected = roastLevel === level.id;
              return (
                <button
                  key={level.id}
                  type="button"
                  title={level.description}
                  onClick={() => onRoastLevelChange(level.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? "bg-mustard text-ink brutal-border brutal-shadow-sm font-black"
                      : "text-ink hover:bg-cream"
                  }`}
                >
                  {level.desiLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Persona Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-mutedInk">
            PERSONA
          </span>
          <div className="relative">
            <select
              value={persona}
              onChange={(e) => onPersonaChange?.(e.target.value)}
              className="appearance-none bg-white brutal-border rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-mustard shadow-sm"
            >
              {PERSONAS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-ink font-black text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* 3. Language Selector */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-mutedInk">
            LANGUAGE
          </span>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
              className="appearance-none bg-white brutal-border rounded-xl px-3.5 py-1.5 pr-8 text-xs font-bold text-ink cursor-pointer focus:outline-none focus:ring-2 focus:ring-mustard shadow-sm"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label} (.{lang.extension})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-ink font-black text-[10px]">
              ▼
            </div>
          </div>
        </div>

        {/* 4. Error Toggle Button */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold tracking-widest text-mutedInk">
            CONTEXT
          </span>
          <button
            type="button"
            onClick={onToggleErrorDrawer}
            className={`border-2 border-dashed px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer ${
              errorDrawerOpen
                ? "bg-ink text-white border-ink"
                : "border-ink/80 text-ink hover:border-ink hover:bg-white"
            }`}
          >
            <span className={errorDrawerOpen ? "text-mustard" : "text-gRed"}>
              {errorDrawerOpen ? "−" : "+"}
            </span>{" "}
            ERROR MESSAGE
          </button>
        </div>
      </div>

      {/* 5. Primary CTA Button */}
      <div className="w-full sm:w-auto">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className="w-full sm:w-auto brutal-btn bg-mustard text-ink brutal-border brutal-shadow rounded-full px-6 sm:px-8 py-3 text-sm sm:text-base font-black tracking-tight uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isRoasting ? (
            <span className="flex items-center gap-2 animate-pulse">
              <span className="inline-block animate-spin">⏳</span>
              <span>ANALYZING CODE...</span>
            </span>
          ) : (
            <>
              <span>
                Roast Me / <span className="font-bold">भाजून काढ</span>
              </span>
              <span className="text-xl">🔥</span>
              <span className="font-mono font-bold">→</span>
              <span className="hidden md:inline-block ml-1 px-1.5 py-0.5 bg-ink text-white text-[10px] font-mono rounded">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
