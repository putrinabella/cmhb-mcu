// use-theme-manager.ts
import { useEffect, useState } from "react";

export type Theme = string; // Bisa string apapun

export interface UseThemeManagerOptions {
  themes: Theme[];
  defaultTheme?: Theme;
  storageKey?: string;
}

export function useThemeManager({
  themes,
  defaultTheme = "system",
  storageKey = "theme",
}: UseThemeManagerOptions) {
  const getInitialTheme = (): Theme => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && themes.includes(saved)) return saved;
      return defaultTheme;
    } catch {
      return defaultTheme;
    }
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      root.classList.toggle("dark", theme === "dark");
      root.setAttribute("data-theme", theme);
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const handler = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      root.classList.toggle("dark", e.matches);
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
    };

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [theme]);

  return { theme, setTheme };
}
