import React from "react";
import { HeartPlus } from "lucide-react";

type HistoryItem = {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
};

type ListProps = {
  items: HistoryItem[];
  className?: string;
  emptyMessage?: string;
};

export function List({
  items,
  className = "",
  emptyMessage = "Tidak ada riwayat",
}: ListProps) {
  if (items.length === 0) {
    return (
      <div className={`text-base-content/60 text-center p-4 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-3 p-4 rounded-xl shadow-sm border border-base-300 bg-base-100 hover:bg-base-200 transition"
        >
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-content">
            {item.icon ?? <HeartPlus size={20} />}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-base-content">{item.title}</p>
            {item.description && (
              <p className="text-sm text-base-content/70">{item.description}</p>
            )}
            <p className="text-xs text-base-content/50 mt-1">
              {item.timestamp}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
