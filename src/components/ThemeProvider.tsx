// ThemeProvider.tsx
import React, { createContext, useContext } from "react";
import {
  useThemeManager,
  type Theme,
  type UseThemeManagerOptions,
} from "@/hooks/use-theme-manager";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  themes: Theme[];
};

const ThemeContext = createContext<Ctx | null>(null);

export function ThemeProvider({
  children,
  themes,
  defaultTheme,
  storageKey,
}: React.PropsWithChildren<UseThemeManagerOptions>) {
  const value = {
    ...useThemeManager({ themes, defaultTheme, storageKey }),
    themes,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
