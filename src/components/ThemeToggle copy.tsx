import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const themes = ["light", "dark", "system"] as const;

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

      <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
        Active: <strong>{resolvedTheme}</strong>
      </span>
    </div>
  );
}
