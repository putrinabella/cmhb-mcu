// ThemeToggle.tsx
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="inline-flex items-center gap-2 rounded-2xl p-2 shadow-sm border bg-base-100 dark:bg-base-200">
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`btn btn-sm ${theme === t ? "btn-primary" : "btn-ghost"}`}
          aria-pressed={theme === t}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
}
