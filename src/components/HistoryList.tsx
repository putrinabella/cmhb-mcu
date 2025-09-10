import { useEffect, useState } from "react";
import { List } from "./List";
import { LoadingIndicator } from "./LoadingIndicator";
import type { HistoryItem } from "@/types/history";

type HistoryListProps = {
  fetchData: () => Promise<HistoryItem[]>;
  emptyMessage?: string;
  onItemClick?: (item: HistoryItem) => void;
};

export default function HistoryList({
  fetchData,
  emptyMessage = "Tidak ada riwayat",
  onItemClick,
}: HistoryListProps) {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchData();
        setItems(result);
      } catch (err) {
        console.error("Failed to load history:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchData]);

  if (loading) return <LoadingIndicator />;

  return (
    <List items={items} emptyMessage={emptyMessage} onItemClick={onItemClick} />
  );
}
