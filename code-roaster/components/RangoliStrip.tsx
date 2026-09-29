import React from "react";

export default function RangoliStrip() {
  return (
    <div className="w-full bg-paleYellow border-y-2 border-ink py-2 overflow-hidden select-none">
      <div className="flex justify-around items-center text-xs font-black tracking-widest text-ink/85">
        <span>▲ ▼ ▲ ▼</span>
        <span className="text-gRed font-bold">•</span>
        <span className="hidden sm:inline">▲ ▼ ▲ ▼</span>
        <span className="text-gBlue font-bold">•</span>
        <span>▲ ▼ ▲ ▼</span>
        <span className="text-gGreen font-bold">•</span>
        <span className="hidden md:inline">▲ ▼ ▲ ▼</span>
        <span className="text-mustard font-bold">•</span>
        <span>▲ ▼ ▲ ▼</span>
        <span className="text-gRed font-bold">•</span>
        <span>▲ ▼ ▲ ▼</span>
      </div>
    </div>
  );
}
