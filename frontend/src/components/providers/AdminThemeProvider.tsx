"use client";

import { createContext, useContext } from "react";

import { useLocalThemeState, Theme } from "@/hooks/useLocalThemeState";

interface AdminThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

export function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme, mounted } = useLocalThemeState("admin-theme");

  return (
    <AdminThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={mounted && theme === "dark" ? "dark" : undefined}>{children}</div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const ctx = useContext(AdminThemeContext);

  if (!ctx) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }

  return ctx;
}
