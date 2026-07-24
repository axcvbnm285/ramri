"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

interface Props {
  className?: string;
}

export default function ThemeToggle({ className = "" }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The persisted theme is only known client-side (localStorage), so the
  // icon must stay neutral until after mount to avoid a server/client
  // mismatch — same reasoning as useCountdown's initial-render guard.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className={`rounded-lg p-2 transition ${className}`}
    >
      {mounted && (isDark ? <Sun size={18} /> : <Moon size={18} />)}
    </button>
  );
}
