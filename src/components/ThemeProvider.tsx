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
  ...options
}: React.PropsWithChildren<UseThemeManagerOptions>) {
  const { theme, setTheme, availableThemes } = useThemeManager(options);
  const value = { theme, setTheme, themes: availableThemes };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
