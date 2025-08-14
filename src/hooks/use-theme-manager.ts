import { useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved ?? "system";
  } catch {
    return "system";
  }
}

function computeResolved(theme: Theme, mql: MediaQueryList): ResolvedTheme {
  if (theme === "system") return mql.matches ? "dark" : "light";
  return theme;
}

function applyThemeToDOM(resolved: ResolvedTheme) {
  const d = document.documentElement;
  const isDark = resolved === "dark";
  d.classList.toggle(DARK_CLASS, isDark);
  d.setAttribute("data-theme", isDark ? "dark" : "light");
}

export function useThemeManager() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const mql = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    []
  );

  const resolvedTheme = useMemo(
    () => computeResolved(theme, mql),
    [theme, mql]
  );

  useEffect(() => {
    applyThemeToDOM(resolvedTheme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  }, [resolvedTheme, theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const handler = () => applyThemeToDOM(computeResolved("system", mql));
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [theme, mql]);

  return { theme, resolvedTheme, setTheme };
}
