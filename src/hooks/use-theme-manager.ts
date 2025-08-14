// use-theme-manager.ts
import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system" | "valentine";

const STORAGE_KEY = "theme";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? "system";
  } catch {
    return "system";
  }
}

export function useThemeManager() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      root.classList.toggle("dark", theme === "dark");
      // Untuk valentine, DaisyUI hanya pakai data-theme, tidak perlu dark class
      root.setAttribute("data-theme", theme);
    }

    try {
      localStorage.setItem(STORAGE_KEY, theme);
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
