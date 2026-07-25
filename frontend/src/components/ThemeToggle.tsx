"use client";

import { Moon, Sun } from "lucide-react";

import { Theme } from "@/hooks/useLocalThemeState";

interface Props {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

export default function ThemeToggle({ theme, onToggle, className = "" }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={`rounded-lg p-2 transition ${className}`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
