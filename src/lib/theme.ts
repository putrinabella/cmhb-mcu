export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "theme";

export function getStoredTheme(): Theme | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "system") return raw;
  return null;
}
export function storeTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const effectiveDark = theme === "system" ? prefersDark : theme === "dark";

  root.classList.toggle("dark", effectiveDark);
}

/** Listen perubahan OS ketika theme === 'system' */
export function subscribeSystemTheme(cb: () => void) {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => cb();
  // modern
  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }
  // fallback
  mql.addListener(handler);
  return () => mql.removeListener(handler);
}
