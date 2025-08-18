import { useTheme } from "./ThemeProvider";
import {
  Sun,
  Moon,
  TreePine,
  Briefcase,
  Headphones,
  Flower,
  Blend,
  Contrast,
  Feather,
} from "lucide-react";

const themeIcons: Record<string, React.ElementType> = {
  light: Sun,
  dark: Moon,
  corporate: Briefcase,
  lofi: Headphones,
  garden: Flower,
  forest: TreePine,
  cmyk: Blend,
  dim: Contrast,
  silk: Feather,
};

export default function ThemeToggle() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="bg-base-100 text-base-content">
      {/* <div className="grid gap-4 grid-cols-3 md:grid-cols-9"> */}
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9">
        {themes.map((t) => {
          const Icon = themeIcons[t];

          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-full aspect-square flex flex-col items-center justify-center rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 ${
                theme === t
                  ? "bg-gradient-to-tr from-primary to-secondary text-primary-content"
                  : "bg-base-200 text-base-content/80 hover:bg-base-300"
              }`}
            >
              {Icon && <Icon className="w-6 h-6 mb-2" />}
              <span className="font-medium">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
