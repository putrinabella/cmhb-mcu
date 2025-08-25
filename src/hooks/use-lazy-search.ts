import { useState, useEffect, useRef, type ChangeEvent } from "react";

type UseLazySearchProps = {
  initialValue?: string;
  delay?: number;
  onSearch: (keyword: string) => void | Promise<void>;
};

export function useLazySearch({
  initialValue = "",
  delay = 300,
  onSearch,
}: UseLazySearchProps) {
  const [searchKey, setSearchKey] = useState(initialValue);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKey(value);

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      onSearch(value);
    }, delay);
  };

  const resetSearch = () => {
    setSearchKey("");
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    onSearch("");
  };

  // Cleanup timeout saat component unmount
  useEffect(() => {
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);

  return { searchKey, handleChange, resetSearch };
}
