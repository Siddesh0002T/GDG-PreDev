import React from "react";
import { LIMITS } from "@/config/app.config";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-lavender border-b-2 border-ink p-3 sm:p-4 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono font-bold tracking-wider text-ink uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gRed inline-block"></span>
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono font-bold text-mutedInk hover:text-ink cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded hover:bg-white border border-transparent hover:border-ink transition"
        >
          Dismiss ✕
        </button>
      </div>

      <div className="relative">
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={LIMITS.maxErrorMessageLength}
          placeholder="Paste traceback or error here... e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list' at line 4"
          className="w-full bg-white brutal-border rounded-xl p-3 font-mono text-xs text-ink placeholder:text-mutedInk/60 focus:outline-none focus:ring-2 focus:ring-mustard"
        />
        <div className="text-right text-[10px] font-mono text-mutedInk mt-1">
          {value.length.toLocaleString()} / {LIMITS.maxErrorMessageLength.toLocaleString()} chars
        </div>
      </div>
    </div>
  );
}
