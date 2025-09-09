import { useState, useEffect } from "react";

export function useSearchableResource<T>(queryFn: () => Promise<T[]>) {
  const [data, setData] = useState<T[]>([]);
  const [filtered, setFiltered] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    queryFn()
      .then((res) => {
        setData(res);
        setFiltered(res);
      })
      .catch((err) => setError(err.message || "Terjadi kesalahan"))
      .finally(() => setLoading(false));
  }, [queryFn]);

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
    if (!keyword) {
      setFiltered(data);
    } else {
      setFiltered(
        data.filter((item: any) =>
          item.company_employee?.name
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
        )
      );
    }
  };

  const resetSearch = () => {
    setSearch("");
    setFiltered(data);
  };

  return {
    data: filtered,
    loading,
    error,
    search,
    handleSearch,
    resetSearch,
  };
}
