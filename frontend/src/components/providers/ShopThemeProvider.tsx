"use client";

import { createContext, useContext } from "react";

import { useLocalThemeState, Theme } from "@/hooks/useLocalThemeState";

interface ShopThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ShopThemeContext = createContext<ShopThemeContextValue | null>(null);

export function ShopThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, mounted } = useLocalThemeState("shop-theme");

  return (
    <ShopThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted && theme === "dark" ? "dark" : undefined}>{children}</div>
    </ShopThemeContext.Provider>
  );
}

export function useShopTheme() {
  const ctx = useContext(ShopThemeContext);

  if (!ctx) {
    throw new Error("useShopTheme must be used within ShopThemeProvider");
  }

  return ctx;
}
