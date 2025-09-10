import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

interface HeaderProps {
  greeting?: string;
  name: string;
  icon?: ComponentType<LucideProps>;
  iconSize?: number;
}

export function Header({
  greeting = "",
  name,
  icon,
  iconSize = 128,
}: HeaderProps) {
  const IconComponent = icon;

  return (
    <div className="relative bg-primary/20 rounded-2xl p-6 flex items-center shadow-md">
      <div className="flex-1 flex flex-col pr-[30vw] sm:pr-2">
        <h1 className="text-xl sm:text-3xl font-bold text-base-content">
          {greeting} {name}
        </h1>
        <p className="text-sm sm:text-base text-base-content/70 mt-1">
          {/* optional subtitle */}
        </p>
      </div>

      {IconComponent && (
        <div className="absolute right-4 -top-6 sm:right-10 sm:-top-10 opacity-60">
          <IconComponent
            width={iconSize}
            height={iconSize}
            className="text-primary"
          />
        </div>
      )}
    </div>
  );
}
