"use client";

import React, { useState, useEffect } from "react";

const MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 🤦",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara code… 🚆",
  "Checking how many StackOverflow tabs were harmed… 💻",
  "Evaluating computational complexity and desi drama… 🌶️",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8 sm:p-12 flex-grow flex flex-col items-center justify-center text-center">
      {/* Tilted Outlined Square Spinner */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-mustard brutal-border brutal-shadow rounded-2xl animate-spin [animation-duration:6s] flex items-center justify-center">
          <div className="w-8 h-8 bg-white brutal-border flex items-center justify-center">
            <span className="font-mono text-base font-black animate-pulse">/</span>
          </div>
        </div>
      </div>

      {/* Heading */}
      <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-ink mb-2">
        Analyzing Code / <span className="text-mustard">भाजून काढत आहे...</span>
      </h3>

      {/* Rotating Message */}
      <p className="text-sm font-mono font-bold text-ink bg-white brutal-border brutal-shadow-sm px-4 py-2 rounded-xl max-w-sm mb-4 transition-all min-h-[44px] flex items-center justify-center">
        {MESSAGES[index]}
      </p>

      <span className="text-[11px] font-mono text-mutedInk">
        Google Gemini is diagnosing your syntax sins...
      </span>
    </div>
  );
}
