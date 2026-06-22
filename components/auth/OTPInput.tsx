"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OTPInput({ length = 4, value, onChange }: OTPInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, char: string) => {
    if (!/^\d*$/.test(char)) return;
    const next = [...value];
    next[index] = char.slice(-1);
    onChange(next);
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = [...value];
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    onChange(next);
    const lastFilled = Math.min(pasted.length, length - 1);
    refs.current[lastFilled]?.focus();
  };

  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-16 h-16 bg-[#EEF3F8] border-2 rounded-xl text-center text-xl font-semibold text-[#0D1B2A] outline-none transition-all duration-200
            ${value[i] ? "border-[#0D1B2A]" : "border-[#C8D8E8]"}
            focus:border-[#0D1B2A] focus:bg-white`}
        />
      ))}
    </div>
  );
}
