import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({
  number,
  title,
  children,
}: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b-2 border-ink">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs sm:text-sm font-black tracking-wider text-ink uppercase bg-paleYellow px-2 py-0.5 rounded brutal-border-sm">
          {paddedNumber} // {title}
        </span>
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
