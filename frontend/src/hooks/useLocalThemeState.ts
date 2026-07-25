"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

// Starts "light" for both server and first client render (no localStorage
// access during SSR), then syncs from storage/system preference once
// mounted — same hydration-safety reasoning as useCountdown's initial guard.
export function useLocalThemeState(storageKey: string) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }

    setMounted(true);
  }, [storageKey]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      return next;
    });
  };

  return { theme, toggleTheme, mounted };
}
